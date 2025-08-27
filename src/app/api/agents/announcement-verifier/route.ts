import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface AnnouncementVerification {
  isAuthentic: boolean;
  confidenceScore: number;
  verificationPoints: {
    sourceVerified: boolean;
    contentConsistency: boolean;
    historicalAlignment: boolean;
    regulatoryCompliance: boolean;
    counterpartyConfirmation: boolean;
  };
  anomalies: string[];
  credibilityScore: number;
  recommendations: string[];
  comparisonWithHistory?: {
    similarAnnouncements: number;
    deviationFromNorm: number;
    suspiciousPatterns: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    const {
      announcement,
      company,
      announcementType,
      source,
      date,
      historicalData,
      relatedCompanies
    } = await request.json();

    if (!announcement || !company) {
      return NextResponse.json(
        { error: 'Announcement and company name are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL_NAME || "gemini-2.0-flash" });

    // Comprehensive verification prompt
    const prompt = `
      As a SEBI compliance expert, verify the authenticity of this corporate announcement:
      
      Company: ${company}
      Announcement Type: ${announcementType || 'General'}
      Source: ${source || 'Unknown'}
      Date: ${date || 'Not specified'}
      
      ANNOUNCEMENT CONTENT:
      ${announcement}
      
      HISTORICAL CONTEXT:
      ${historicalData ? JSON.stringify(historicalData) : 'No historical data available'}
      
      RELATED COMPANIES:
      ${relatedCompanies ? relatedCompanies.join(', ') : 'None specified'}
      
      VERIFY AGAINST THESE CRITERIA:
      
      1. SOURCE AUTHENTICITY:
         - Is it from official stock exchange platforms (BSE/NSE)?
         - Does it follow standard announcement formats?
         - Are regulatory filing numbers present?
         - Is the language professional and consistent?
      
      2. CONTENT ANALYSIS:
         - Realistic financial figures
         - Consistency with company's business model
         - Alignment with industry trends
         - Logical business rationale
         - Proper disclosure requirements met
      
      3. RED FLAGS TO CHECK:
         - Sudden dramatic changes without explanation
         - Unrealistic growth projections
         - Missing mandatory disclosures
         - Contradictions with recent filings
         - Unusual timing of announcement
         - Grammar/spelling errors indicating fake content
      
      4. HISTORICAL CONSISTENCY:
         - Compare with past announcements
         - Check for sudden strategy changes
         - Verify against recent quarterly results
         - Look for pattern breaks
      
      5. REGULATORY COMPLIANCE:
         - SEBI disclosure norms
         - Listing agreement requirements
         - Insider trading regulations
         - Related party transaction rules
      
      Provide verification results as JSON with:
      - isAuthentic (boolean)
      - confidenceScore (0-100)
      - verificationPoints (object with boolean checks)
      - anomalies (array of detected issues)
      - credibilityScore (0-100)
      - recommendations (array of action items)
      - comparisonWithHistory (object if historical data available)
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const verificationText = response.text();
    
    // Parse verification results
    let verification: AnnouncementVerification;
    try {
      const jsonMatch = verificationText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        verification = JSON.parse(jsonMatch[0]);
      } else {
        verification = performBasicVerification(announcement, company);
      }
    } catch {
      verification = performBasicVerification(announcement, company);
    }

    // Cross-verify with external sources if needed
    if (verification.credibilityScore < 50) {
      verification.recommendations.push(
        'Immediately verify with official BSE/NSE websites',
        'Check company\'s official website for confirmation',
        'Contact company\'s investor relations department',
        'Report to SEBI if found to be fraudulent'
      );
    }

    // Generate alert for suspicious announcements
    const alert = verification.credibilityScore < 30 ? {
      level: 'CRITICAL',
      message: 'HIGH PROBABILITY OF FRAUDULENT ANNOUNCEMENT',
      actions: [
        'DO NOT act on this information',
        'Report immediately to SEBI',
        'Warn other investors',
        'Document all evidence'
      ]
    } : null;

    return NextResponse.json({
      success: true,
      verification,
      alert,
      reportId: generateReportId('AV'),
      summary: getSummaryMessage(verification),
      nextSteps: getNextSteps(verification.credibilityScore)
    });

  } catch (error) {
    console.error('Announcement verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify announcement' },
      { status: 500 }
    );
  }
}

function performBasicVerification(announcement: string, company: string): AnnouncementVerification {
  const anomalies = [];
  const lowerAnnouncement = announcement.toLowerCase();
  
  // Check for obvious red flags
  const redFlags = [
    'guaranteed profit',
    'insider information',
    '100% returns',
    'limited time offer',
    'act now',
    'exclusive opportunity'
  ];
  
  redFlags.forEach(flag => {
    if (lowerAnnouncement.includes(flag)) {
      anomalies.push(`Red flag detected: "${flag}"`);
    }
  });

  // Check for spelling/grammar issues (simplified)
  if (announcement.includes('  ') || announcement.includes('..')) {
    anomalies.push('Formatting issues detected');
  }

  const hasAnomalies = anomalies.length > 0;
  const credibilityScore = hasAnomalies ? Math.max(20, 70 - (anomalies.length * 10)) : 70;

  return {
    isAuthentic: !hasAnomalies,
    confidenceScore: credibilityScore,
    verificationPoints: {
      sourceVerified: false,
      contentConsistency: !hasAnomalies,
      historicalAlignment: false,
      regulatoryCompliance: !hasAnomalies,
      counterpartyConfirmation: false
    },
    anomalies,
    credibilityScore,
    recommendations: [
      'Manual verification required',
      'Check official stock exchange websites',
      'Compare with company\'s investor relations page'
    ]
  };
}

function getSummaryMessage(verification: AnnouncementVerification): string {
  if (verification.credibilityScore >= 80) {
    return '✅ Announcement appears authentic based on available checks';
  } else if (verification.credibilityScore >= 60) {
    return '⚠️ Announcement has some inconsistencies - verify through official channels';
  } else if (verification.credibilityScore >= 40) {
    return '⚡ WARNING: Multiple red flags detected - high risk of fraudulent content';
  }
  return '🚨 CRITICAL: Strong indicators of fake announcement - DO NOT trust this information';
}

function getNextSteps(credibilityScore: number): string[] {
  if (credibilityScore < 50) {
    return [
      '🚨 REPORT NOW: File complaint at SEBI SCORES - https://scores.sebi.gov.in/',
      'Contact SEBI Toll-Free: 1800-266-7575 or 1800-22-7575 (9 AM - 6 PM)',
      'Check BSE/NSE official announcements for verification',
      'Alert other investors about potential fraud',
      'Save all evidence (screenshots, URLs, full text) for regulatory action',
      'Email for technical help: scoreshelp@sebi.gov.in'
    ];
  } else if (credibilityScore < 70) {
    return [
      'Report concerns at SEBI SCORES if needed - https://scores.sebi.gov.in/',
      'Verify on official exchange websites',
      'Check company investor relations section',
      'Wait for official confirmation before acting',
      'Monitor for clarifications or corrections'
    ];
  }
  return [
    'Continue monitoring official sources',
    'Cross-reference with multiple sources',
    'Proceed with normal due diligence',
    'For any concerns, visit SEBI SCORES - https://scores.sebi.gov.in/'
  ];
}

function generateReportId(prefix: string): string {
  return `SEBI-${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Bulk verification endpoint
export async function PUT(request: NextRequest) {
  try {
    const { announcements } = await request.json();
    
    if (!announcements || !Array.isArray(announcements)) {
      return NextResponse.json(
        { error: 'Announcements array is required' },
        { status: 400 }
      );
    }

    const verifications = await Promise.all(
      announcements.map(async (ann) => {
        const response = await POST(
          new NextRequest(request.url, {
            method: 'POST',
            body: JSON.stringify(ann)
          })
        );
        return response.json();
      })
    );

    const summary = {
      total: announcements.length,
      authentic: verifications.filter(v => v.verification?.isAuthentic).length,
      suspicious: verifications.filter(v => v.verification?.credibilityScore < 50).length,
      needsVerification: verifications.filter(v => 
        v.verification?.credibilityScore >= 50 && 
        v.verification?.credibilityScore < 80
      ).length
    };

    return NextResponse.json({
      success: true,
      verifications,
      summary,
      criticalAlerts: verifications
        .filter(v => v.alert?.level === 'CRITICAL')
        .map(v => ({
          company: (announcements[verifications.indexOf(v)] as Record<string, unknown>)?.company,
          alert: v.alert
        }))
    });

  } catch (error) {
    console.error('Bulk verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify announcements' },
      { status: 500 }
    );
  }
}
