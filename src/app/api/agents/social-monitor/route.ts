import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';
import { logAgentQuery, getRequestMetadata } from '@/lib/agentLogger';
import { auth } from '@clerk/nextjs/server';
import { validateSocialMonitorPayload } from '@/lib/agentValidation';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const prisma = new PrismaClient();

interface SocialMediaThreat {
  platform: string;
  threatType: 'pump_dump' | 'fake_tips' | 'impersonation' | 'ponzi' | 'fake_ipo';
  confidence: number;
  affectedStocks?: string[];
  suspiciousPatterns: string[];
  userCount?: number;
  coordinatedActivity: boolean;
  riskScore: number;
  evidence: {
    messages?: string[];
    usernames?: string[];
    timestamps?: string[];
    unusualPatterns?: string[];
  };
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let reportId: string | undefined;
  
  try {
    // Get user info and request metadata
    const { userId } = await auth();
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const userIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
    
    const body = await request.json();
    const { 
      content, 
      platform, 
      groupName, 
      userCount, 
      messageHistory,
      stockMentions 
    } = body;

    const v = validateSocialMonitorPayload(body);
    if (!v.valid) {
      return NextResponse.json({ error: v.error, code: 'INVALID_INPUT_NOT_CHAT' }, { status: 400 });
    }
    
    // Generate report ID for this query
    reportId = generateReportId('SM');

    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL_NAME! });

    // Comprehensive suspicious activity detection prompt
    const prompt = `
      As a SEBI suspicious activity detection specialist, analyze this social media content for investment suspicious activity:
      
      Platform: ${platform || 'Unknown'}
      Group/Channel: ${groupName || 'Unknown'}
      User Count: ${userCount || 'Unknown'}
      Content: ${content}
      Message History: ${messageHistory ? JSON.stringify(messageHistory.slice(0, 10)) : 'Not available'}
      Stocks Mentioned: ${stockMentions ? stockMentions.join(', ') : 'None identified'}
      
      Detect these suspicious patterns:
      
      1. PUMP AND DUMP SCHEMES:
         - Coordinated buying messages
         - "Buy now" urgency tactics
         - Promise of quick gains
         - Sudden promotion of penny stocks
         - Exit timing signals
      
      2. FAKE INVESTMENT TIPS:
         - Guaranteed returns claims
         - "Inside information" claims
         - Fake success stories
         - Pressure to invest immediately
         - Request for upfront payments
      
      3. IMPERSONATION:
         - Claiming to be SEBI registered
         - Using official-looking logos
         - Fake advisor credentials
         - Mimicking legitimate firms
      
      4. PONZI/MLM SCHEMES:
         - Recruitment focused messages
         - Tiered investment structures
         - Referral bonuses
         - Unrealistic return promises
      
      5. FAKE IPO ALLOTMENTS:
         - Guaranteed IPO allocation claims
         - Requests for advance payments
         - Unofficial application channels
         - False broker representations
      
      Analyze for:
      - Coordinated messaging patterns
      - Suspicious timing of messages
      - Unusual trading volume correlation
      - Bot-like behavior
      - Regulatory compliance violations
      
      Return analysis as JSON with:
      - threatType (pump_dump/fake_tips/impersonation/ponzi/fake_ipo)
      - confidence (0-100)
      - affectedStocks (array)
      - suspiciousPatterns (array of detected patterns)
      - coordinatedActivity (boolean)
      - riskScore (0-100)
      - evidence (object with specific findings)
      - recommendations (array of actions for THE USER/INVESTOR to take, NOT for SEBI. Include:
        * DO NOT invest or send money warnings
        * Block and report the sender/group
        * Save evidence (screenshots)
        * Report to SEBI SCORES portal at https://scores.sebi.gov.in/
        * Call SEBI helpline 1800-266-7575 or 1800-22-7575
        * Warn others about the scam
        * Verify advisor registration
        * General safety tips)
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();
    
    // Parse the AI response
    let threat: SocialMediaThreat & { recommendations: string[] };
    try {
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        threat = JSON.parse(jsonMatch[0]);
      } else {
        threat = generateDefaultThreatAnalysis(content);
      }
    } catch (e) {
      threat = generateDefaultThreatAnalysis(content);
    }

    // Check against known suspicious patterns in database
    const knownPatterns = await checkKnownSuspiciousPatterns(content, stockMentions);
    
    // Enhance risk score based on database patterns
    if (knownPatterns.length > 0) {
      threat.riskScore = Math.min(100, threat.riskScore + 20);
      threat.suspiciousPatterns = [...threat.suspiciousPatterns, ...knownPatterns];
    }

    // Log high-risk threats
    if (threat.riskScore > 70) {
      await logThreatToDatabase({
        platform,
        groupName,
        threat,
        timestamp: new Date(),
        content: content.substring(0, 500) // Store truncated content
      });
    }

    // Generate alert if pump and dump detected with specific stocks
    const threatTypes = Array.isArray(threat.threatType) ? threat.threatType : [threat.threatType];
    const alert = threatTypes.includes('pump_dump') && threat.affectedStocks?.length 
      ? await generateMarketAlert(threat.affectedStocks, platform, groupName)
      : null;

    // Handle threatType as array or string
    const primaryThreatType = Array.isArray(threat.threatType) 
      ? threat.threatType[0] 
      : threat.threatType;
    
    const executionTime = Date.now() - startTime;
    const responseData = {
      success: true,
      threat,
      alert,
      reportId, // Use the report ID generated earlier
      actionRequired: threat.riskScore > 70,
      message: getAlertMessage(threat.riskScore, primaryThreatType)
    };
    
    // Log query using new AgentQuery system
    await logAgentQuery({
      agentType: 'social-monitor',
      query: `Platform: ${platform || 'Unknown'}, Group: ${groupName || 'N/A'}, Content: ${content.substring(0, 200)}...`,
      response: JSON.stringify({
        threatType: primaryThreatType,
        riskScore: threat.riskScore,
        coordinatedActivity: threat.coordinatedActivity,
        affectedStocks: threat.affectedStocks || [],
        message: getAlertMessage(threat.riskScore, primaryThreatType)
      }),
      success: true,
      executionTime,
      userId: userId || undefined,
      userAgent,
      ipAddress: userIP
    });
    
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Social media monitoring error:', error);
    
    // Log error if we have a reportId
    if (reportId) {
      const executionTime = Date.now() - startTime;
      try {
        const { userId } = await auth();
        const userAgent = request.headers.get('user-agent') || 'Unknown';
        const userIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
        
        await logAgentQuery({
          agentType: 'social-monitor',
          query: 'Error occurred during processing',
          response: JSON.stringify({ error: 'Failed to analyze social media content' }),
          success: false,
          executionTime,
          userId: userId || undefined,
          userAgent,
          ipAddress: userIP,
          error: error instanceof Error ? error.message : String(error)
        });
      } catch (logError) {
        console.error('Failed to log error:', logError);
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze social media content' },
      { status: 500 }
    );
  }
}

async function checkKnownSuspiciousPatterns(content: string, _stocks?: string[]): Promise<string[]> {
  const patterns: string[] = [];
  const suspiciousKeywords = [
    'guaranteed returns',
    'insider information',
    'buy now sell tomorrow',
    'confirm profit',
    '100% sure',
    'rocket to moon',
    'pump it',
    'coordinate buying',
    'exit at',
    'target achieved'
  ];

  suspiciousKeywords.forEach(keyword => {
    if (content.toLowerCase().includes(keyword)) {
      patterns.push(`Known suspicious pattern: "${keyword}"`);
    }
  });

  return patterns;
}

async function generateMarketAlert(stocks: string[], platform: string, groupName?: string) {
  return {
    type: 'MARKET_MANIPULATION_ALERT',
    stocks,
    source: { platform, groupName },
    timestamp: new Date(),
    message: `Potential pump and dump scheme detected affecting ${stocks.join(', ')}`,
    suggestedAction: 'Monitor trading volumes and price movements for unusual patterns'
  };
}

interface ThreatData {
  platform: string;
  groupName?: string;
  threat: unknown;
  timestamp: Date;
  content: string;
}

async function logThreatToDatabase(data: ThreatData) {
  try {
    // This would log to your Prisma database
    console.log('Logging threat to database:', data);
    // await prisma.socialMediaThreat.create({ data });
  } catch (error) {
    console.error('Failed to log threat:', error);
  }
}

function generateDefaultThreatAnalysis(content: string): SocialMediaThreat & { recommendations: string[] } {
  return {
    platform: 'Unknown',
    threatType: 'fake_tips',
    confidence: 60,
    affectedStocks: [],
    suspiciousPatterns: ['Content requires manual review'],
    coordinatedActivity: false,
    riskScore: 50,
    evidence: {
      messages: [content.substring(0, 200)]
    },
    recommendations: [
      'DO NOT invest or transfer any money based on this suspicious content',
      'Take screenshots of all messages as evidence before any action',
      'Block and report this sender/group immediately on the platform',
      'Report this suspicious activity at SEBI SCORES portal: https://scores.sebi.gov.in/',
      'Call SEBI toll-free helpline: 1800-266-7575 or 1800-22-7575 (9 AM - 6 PM)',
      'Warn your friends and family about this potential scam',
      'Verify advisor registration at: https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes',
      'Remember: SEBI-registered advisors never guarantee returns or claim insider information'
    ]
  };
}

function getAlertMessage(riskScore: number, threatType: string): string {
  if (riskScore > 80) {
    return `🚨 CRITICAL: High-risk ${threatType.replace('_', ' ')} scheme detected. DO NOT engage. Report to SEBI immediately.`;
  } else if (riskScore > 60) {
    return `⚠️ WARNING: Suspicious ${threatType.replace('_', ' ')} activity detected. Exercise extreme caution.`;
  } else if (riskScore > 40) {
    return `⚡ CAUTION: Potential suspicious activity. Verify all information through official channels.`;
  }
  return `ℹ️ Monitor: Low-risk content, but always verify investment advice.`;
}

function generateReportId(prefix: string): string {
  return `GC-${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Additional endpoint for bulk monitoring
export async function PUT(request: NextRequest) {
  try {
    const { messages, platform } = await request.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const analyses = await Promise.all(
      messages.map(async (message) => {
        const response = await POST(
          new NextRequest(request.url, {
            method: 'POST',
            body: JSON.stringify({ ...message, platform })
          })
        );
        return response.json();
      })
    );

    // Identify coordinated patterns across messages
    const coordinatedThreats = identifyCoordinatedActivity(analyses);

    return NextResponse.json({
      success: true,
      individualAnalyses: analyses,
      coordinatedThreats,
      summary: {
        totalMessages: messages.length,
        highRiskCount: analyses.filter(a => a.threat?.riskScore > 70).length,
        threatTypes: [...new Set(analyses.map(a => a.threat?.threatType).filter(Boolean))]
      }
    });

  } catch (error) {
    console.error('Bulk monitoring error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze messages' },
      { status: 500 }
    );
  }
}

interface Analysis {
  threat?: {
    affectedStocks?: string[];
    riskScore?: number;
    threatType?: string | string[];
  };
}

interface CoordinatedThreat {
  stock: string;
  messageCount: number;
  threat: string;
  confidence: number;
}

function identifyCoordinatedActivity(analyses: Analysis[]): CoordinatedThreat[] {
  const coordinated: CoordinatedThreat[] = [];
  const stockMentions: { [key: string]: number } = {};
  
  // Count stock mentions across messages
  analyses.forEach(analysis => {
    if (analysis.threat?.affectedStocks) {
      analysis.threat.affectedStocks.forEach((stock: string) => {
        stockMentions[stock] = (stockMentions[stock] || 0) + 1;
      });
    }
  });

  // Flag stocks mentioned multiple times as potentially coordinated
  Object.entries(stockMentions).forEach(([stock, count]) => {
    if (count > 3) {
      coordinated.push({
        stock,
        messageCount: count,
        threat: 'Potential coordinated manipulation',
        confidence: Math.min(95, 60 + (count * 5))
      });
    }
  });

  return coordinated;
}
