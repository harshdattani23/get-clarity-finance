import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const prisma = new PrismaClient();

interface AdvisorVerification {
  isRegistered: boolean;
  registrationType: string;
  registrationDetails?: {
    registrationNumber?: string;
    name?: string;
    tradeName?: string;
    category?: string;
    subcategory?: string;
    validity?: string;
    contactInfo?: {
      email?: string;
      phone?: string;
      address?: string;
      city?: string;
      state?: string;
    };
  };
  verificationStatus: {
    legitimacy: 'verified' | 'suspicious' | 'fraudulent' | 'unregistered';
    confidence: number;
    riskScore: number;
  };
  fraudIndicators: string[];
  recommendations: string[];
  dataSource: string;
  lastUpdated: string;
}

export async function POST(request: NextRequest) {
  try {
    const { 
      name,
      registrationNumber,
      checkType = 'both' // 'name', 'registration', or 'both'
    } = await request.json();

    if (!name && !registrationNumber) {
      return NextResponse.json(
        { error: 'Name or registration number is required' },
        { status: 400 }
      );
    }

    // Search in SEBI database
    let intermediary = null;
    
    // Search by registration number first (more accurate)
    if (registrationNumber) {
      intermediary = await prisma.sEBIIntermediary.findUnique({
        where: { registrationNumber: registrationNumber.toUpperCase() }
      });
    }
    
    // If not found by registration, search by name
    if (!intermediary && name) {
      // Search for exact match first
      intermediary = await prisma.sEBIIntermediary.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive'
          }
        }
      });
      
      // If no exact match, search for partial match
      if (!intermediary) {
        intermediary = await prisma.sEBIIntermediary.findFirst({
          where: {
            OR: [
              {
                name: {
                  contains: name,
                  mode: 'insensitive'
                }
              },
              {
                tradeName: {
                  contains: name,
                  mode: 'insensitive'
                }
              }
            ]
          }
        });
      }
    }

    // Also search for similar names to detect impersonation
    const similarNames = name ? await prisma.sEBIIntermediary.findMany({
      where: {
        OR: [
          {
            name: {
              contains: name.split(' ')[0], // Search by first word
              mode: 'insensitive'
            }
          }
        ]
      },
      take: 5
    }) : [];

    // Use AI to analyze for fraud patterns
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL_NAME || "gemini-2.5-flash" });
    
    const fraudAnalysisPrompt = `
      Analyze this search for potential investment fraud:
      
      Search Query:
      - Name: ${name || 'Not provided'}
      - Registration Number: ${registrationNumber || 'Not provided'}
      
      SEBI Database Result:
      - Found: ${intermediary ? 'YES' : 'NO'}
      ${intermediary ? `
      - Registered Name: ${intermediary.name}
      - Registration: ${intermediary.registrationNumber}
      - Category: ${intermediary.category}
      - Status: ${intermediary.status}
      ` : ''}
      
      Similar Registered Names Found (${similarNames.length}):
      ${similarNames.map(s => `- ${s.name} (${s.registrationNumber})`).join('\n')}
      
      Check for:
      1. Exact match vs impersonation (similar but not exact names)
      2. Registration number format validity
      3. Category misrepresentation (e.g., broker claiming to be advisor)
      4. Common impersonation patterns
      
      Return JSON with:
      - impersonationRisk: 'low'/'medium'/'high'/'critical'
      - suspiciousPatterns: array of detected issues
      - legitimacyScore: 0-100
      - specificWarnings: array of warnings
    `;

    const aiResult = await model.generateContent(fraudAnalysisPrompt);
    const aiAnalysis = await aiResult.response.text();
    
    let fraudAssessment;
    try {
      const jsonMatch = aiAnalysis.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        fraudAssessment = JSON.parse(jsonMatch[0]);
      } else {
        fraudAssessment = {
          impersonationRisk: 'medium',
          suspiciousPatterns: [],
          legitimacyScore: 50,
          specificWarnings: []
        };
      }
    } catch {
      fraudAssessment = {
        impersonationRisk: 'medium',
        suspiciousPatterns: [],
        legitimacyScore: 50,
        specificWarnings: []
      };
    }

    // Calculate risk score
    let riskScore = 0;
    if (!intermediary) {
      riskScore += 50;
    }
    if (fraudAssessment.impersonationRisk === 'high' || fraudAssessment.impersonationRisk === 'critical') {
      riskScore += 30;
    }
    if (similarNames.length > 0 && !intermediary) {
      riskScore += 20; // Possible impersonation
    }
    
    // Determine legitimacy
    const legitimacy = intermediary && riskScore < 30 ? 'verified' :
                      !intermediary && riskScore > 70 ? 'fraudulent' :
                      !intermediary ? 'unregistered' : 'suspicious';

    // Build verification response
    const verification: AdvisorVerification = {
      isRegistered: !!intermediary,
      registrationType: intermediary?.category || 'Not Found',
      registrationDetails: intermediary ? {
        registrationNumber: intermediary.registrationNumber,
        name: intermediary.name,
        tradeName: intermediary.tradeName || undefined,
        category: intermediary.category,
        subcategory: intermediary.subcategory || undefined,
        validity: intermediary.validity || undefined,
        contactInfo: {
          email: intermediary.email || undefined,
          phone: intermediary.phone || undefined,
          address: intermediary.address || undefined,
          city: intermediary.city || undefined,
          state: intermediary.state || undefined
        }
      } : undefined,
      verificationStatus: {
        legitimacy,
        confidence: intermediary ? 95 : 10,
        riskScore
      },
      fraudIndicators: [
        ...fraudAssessment.suspiciousPatterns,
        ...(similarNames.length > 0 && !intermediary ? ['Similar names found - possible impersonation'] : [])
      ],
      recommendations: generateRecommendations(legitimacy, intermediary, similarNames),
      dataSource: 'Official SEBI Database (Aug 26, 2025)',
      lastUpdated: 'Aug 26, 2025'
    };

    // Log verification attempt
    await prisma.verificationLog.create({
      data: {
        searchQuery: name || registrationNumber || '',
        searchType: checkType,
        found: !!intermediary,
        riskScore,
        legitimacyStatus: legitimacy,
        intermediaryId: intermediary?.id
      }
    });

    // Log high-risk cases
    if (legitimacy === 'fraudulent' || (legitimacy === 'suspicious' && riskScore > 60)) {
      await prisma.fraudReport.create({
        data: {
          reportId: `GC-FR-${Date.now()}`,
          entityName: name || 'Unknown',
          registrationClaim: registrationNumber,
          fraudType: legitimacy === 'fraudulent' ? 'unregistered' : 'suspicious',
          riskScore,
          evidence: {
            searchQuery: { name, registrationNumber },
            similarNames: similarNames.map(s => s.name),
            aiAnalysis: fraudAssessment
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      verification,
      similarRegisteredEntities: similarNames.map(s => ({
        name: s.name,
        registrationNumber: s.registrationNumber,
        category: s.category
      })),
      message: generateSummaryMessage(verification),
      totalRecordsSearched: await prisma.sEBIIntermediary.count(),
      sebiUrls: {
        verifyOnline: 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes',
        reportFraud: 'https://scores.sebi.gov.in/',
        helpline: '1800-266-7575'
      }
    });

  } catch (error) {
    console.error('Advisor verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify advisor' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

function generateRecommendations(
  legitimacy: string,
  intermediary: Record<string, unknown> | null,
  similarNames: Array<Record<string, unknown>>
): string[] {
  const recommendations = [];
  
  switch (legitimacy) {
    case 'verified':
      recommendations.push(
        `✅ ${intermediary?.name} is SEBI registered`,
        `📋 Registration: ${intermediary?.registrationNumber}`,
        `🏢 Category: ${intermediary?.category}`,
        '⚡ Still verify services match their registration',
        '📞 Contact SEBI if you have concerns: 1800-266-7575'
      );
      break;
      
    case 'unregistered':
      recommendations.push(
        '❌ NOT FOUND in SEBI database',
        '⚠️ Operating without SEBI registration is ILLEGAL',
        '🚫 DO NOT engage or transfer money',
        '📞 Report to SEBI: 1800-266-7575',
        '💻 File complaint: https://scores.sebi.gov.in/'
      );
      if (similarNames.length > 0) {
        recommendations.push(
          `⚠️ Similar registered names exist - possible impersonation`,
          `Did you mean: ${similarNames[0]?.name}?`
        );
      }
      break;
      
    case 'suspicious':
      recommendations.push(
        '⚠️ Verification inconclusive',
        '🔍 Verify directly on SEBI website',
        '📞 Call SEBI for confirmation: 1800-266-7575',
        '❌ Do not transfer money until verified',
        '💾 Save all communication as evidence'
      );
      break;
      
    case 'fraudulent':
      recommendations.push(
        '🚨 HIGH FRAUD RISK DETECTED',
        '❌ DO NOT ENGAGE OR TRANSFER MONEY',
        '📞 Report immediately to SEBI: 1800-266-7575',
        '💻 File complaint at https://scores.sebi.gov.in/',
        '👮 Consider filing police complaint',
        '⚠️ Warn others about this fraud'
      );
      break;
  }
  
  return recommendations;
}

function generateSummaryMessage(verification: AdvisorVerification): string {
  const { legitimacy, riskScore } = verification.verificationStatus;
  
  if (legitimacy === 'verified') {
    return `✅ VERIFIED: ${verification.registrationDetails?.name} is a SEBI-registered ${verification.registrationType}`;
  } else if (legitimacy === 'fraudulent') {
    return `🚨 FRAUD ALERT: High risk of fraud (Risk Score: ${riskScore}/100). DO NOT ENGAGE.`;
  } else if (legitimacy === 'unregistered') {
    return `❌ NOT REGISTERED: No SEBI registration found. Be extremely cautious.`;
  }
  return `⚠️ NEEDS VERIFICATION: Unable to confirm registration. Contact SEBI.`;
}

// Bulk search endpoint
export async function PUT(request: NextRequest) {
  try {
    const { searches } = await request.json();
    
    if (!searches || !Array.isArray(searches)) {
      return NextResponse.json(
        { error: 'Searches array is required' },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      searches.map(async (search) => {
        const response = await POST(
          new NextRequest(request.url, {
            method: 'POST',
            body: JSON.stringify(search)
          })
        );
        return response.json();
      })
    );

    const summary = {
      total: searches.length,
      verified: results.filter(r => r.verification?.verificationStatus?.legitimacy === 'verified').length,
      unregistered: results.filter(r => r.verification?.verificationStatus?.legitimacy === 'unregistered').length,
      suspicious: results.filter(r => r.verification?.verificationStatus?.legitimacy === 'suspicious').length,
      fraudulent: results.filter(r => r.verification?.verificationStatus?.legitimacy === 'fraudulent').length
    };

    return NextResponse.json({
      success: true,
      results,
      summary
    });

  } catch (error) {
    console.error('Bulk verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify entities' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
