import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface DeepfakeAnalysis {
  isDeepfake: boolean;
  confidence: number;
  indicators: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  technicalDetails: {
    audioInconsistencies?: string[];
    visualAnomalies?: string[];
    metadataIssues?: string[];
  };
  contentSummary?: {
    title?: string;
    description?: string;
    mainTopics?: string[];
    speakerClaims?: string[];
    investmentClaims?: string[];
    duration?: string;
    channelName?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { mediaUrl, mediaType, transcript, metadata } = await request.json();

    if (!mediaUrl && !transcript) {
      return NextResponse.json(
        { error: 'Media URL or transcript is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL_NAME || "gemini-2.0-flash" });

    // Check if it's a YouTube URL
    let isYouTubeVideo = false;
    let videoUrl = '';
    
    const inputContent = transcript || mediaUrl || '';
    
    // Simple check for YouTube URL
    if (inputContent.includes('youtube.com/watch') || inputContent.includes('youtu.be/')) {
      isYouTubeVideo = true;
      videoUrl = inputContent.trim();
      console.log('Analyzing YouTube video:', videoUrl);
    }

    // Generate unique session ID to prevent caching
    const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Analyze for deepfake indicators
    const prompt = `
      SESSION ID: ${sessionId}
      TIMESTAMP: ${new Date().toISOString()}
      
      ANALYZE THIS SPECIFIC CONTENT:
      ${isYouTubeVideo ? `YouTube Video URL: ${videoUrl}` : `Content: ${inputContent}`}
      
      As a deepfake detection expert for SEBI (Securities and Exchange Board of India), analyze the EXACT content provided above for potential fraud.
      
      DO NOT analyze any other video or content. DO NOT use cached information from previous analyses.
      Each analysis request is independent - analyze the content fresh.
      
      Media Type: ${isYouTubeVideo ? 'YouTube Video' : mediaType || 'text'}
      
      ${isYouTubeVideo ? `IMPORTANT: Analyze THIS SPECIFIC YouTube video from the URL above.
      First, extract the ACTUAL content from THIS video:
      1. The ACTUAL video title
      2. The ACTUAL channel name 
      3. What THIS video is specifically about
      4. Topics discussed in THIS video
      5. Speaker claims made in THIS video
      6. Investment claims made in THIS video
      7. Duration of THIS video` : 'Analyze this content:'}
      
      Check for these deepfake indicators:
      1. Unnatural speech patterns or lip sync issues
      2. Inconsistent lighting or shadows
      3. Unusual eye movements or blinking patterns
      4. Audio quality inconsistencies
      5. Background anomalies
      6. Metadata tampering signs
      7. Known deepfake generation artifacts
      
      Also check for securities fraud patterns:
      - Impersonation of SEBI officials or market leaders
      - False regulatory announcements  
      - Pump and dump scheme indicators (coordinated buying, exit timing)
      - Fake IPO allotment promises with payment requests
      - GUARANTEED return promises (not predictions or targets)
      - Unregistered investment advisory asking for fees
      
      IMPORTANT DISTINCTION:
      - Market predictions (e.g., "Sensex may reach 1 lakh") = NOT FRAUD
      - Guaranteed returns (e.g., "200% assured profit") = FRAUD
      - Stock recommendations with analysis = NOT FRAUD  
      - "Pay us for secret tips" = FRAUD
      - Educational content about markets = NOT FRAUD
      - "Transfer money to this account" = FRAUD
      
      Provide analysis in JSON format with:
      - isDeepfake (boolean)
      - confidence (0-100)
      - indicators (array of detected issues)
      - riskLevel (low/medium/high/critical)
      - recommendations (array of action items)
      - technicalDetails (object with specific technical findings)
      - contentSummary (object with title, description, mainTopics, speakerClaims, investmentClaims, duration, channelName)
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();
    
    // Parse AI response
    let analysis: DeepfakeAnalysis;
    try {
      // Extract JSON from response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback analysis based on keywords
        analysis = {
          isDeepfake: analysisText.toLowerCase().includes('deepfake') || 
                      analysisText.toLowerCase().includes('fake') ||
                      analysisText.toLowerCase().includes('manipulated'),
          confidence: 75,
          indicators: extractIndicators(analysisText),
          riskLevel: determineRiskLevel(analysisText),
          recommendations: extractRecommendations(analysisText),
          technicalDetails: {}
        };
      }
    } catch (e) {
      analysis = generateFallbackAnalysis(analysisText);
    }

    // Log suspicious content to database for regulatory reporting
    if (analysis.riskLevel === 'high' || analysis.riskLevel === 'critical') {
      await logSuspiciousContent({
        reportId: generateReportId(),
        isDeepfake: analysis.isDeepfake,
        riskLevel: analysis.riskLevel,
        confidence: analysis.confidence,
        indicators: analysis.indicators,
        timestamp: new Date().toISOString()
      });
    }

    // Generate detailed response based on analysis
    const detailedResponse = generateDetailedResponse(analysis, isYouTubeVideo);
    
    return NextResponse.json({
      success: true,
      analysis,
      reportId: generateReportId(),
      message: detailedResponse.summary,
      detailed: detailedResponse,
      videoAnalyzed: isYouTubeVideo,
      mediaType: isYouTubeVideo ? 'YouTube Video' : mediaType || 'Text/Transcript',
      videoUrl: isYouTubeVideo ? videoUrl : undefined
    });

  } catch (error) {
    console.error('Deepfake detection error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze media for deepfake' },
      { status: 500 }
    );
  }
}

function extractIndicators(text: string): string[] {
  const indicators: string[] = [];
  const patterns = [
    'lip sync', 'eye movement', 'lighting inconsist', 'audio quality',
    'background anomal', 'metadata tamper', 'artificial', 'generated',
    'impersonat', 'fake announcement', 'pump and dump'
  ];
  
  patterns.forEach(pattern => {
    if (text.toLowerCase().includes(pattern)) {
      indicators.push(`Detected: ${pattern}`);
    }
  });
  
  return indicators.length > 0 ? indicators : ['No specific indicators detected'];
}

function determineRiskLevel(text: string): 'low' | 'medium' | 'high' | 'critical' {
  // More accurate fraud detection keywords
  const criticalKeywords = [
    'guaranteed return', 
    'assured profit',
    'transfer money immediately',
    'sebi official impersonation',
    'pay now for tips'
  ];
  
  const highKeywords = [
    'deepfake detected',
    'voice manipulation',
    'face swap',
    'impersonating',
    'fake identity',
    'ponzi scheme',
    'pyramid scheme'
  ];
  
  const mediumKeywords = [
    'suspicious pattern',
    'unusual claim',
    'unverified source',
    'be cautious'
  ];
  
  // Keywords that indicate legitimate content (should lower risk)
  const legitimateKeywords = [
    'market analysis',
    'educational',
    'opinion',
    'may reach',
    'could achieve',
    'prediction',
    'forecast',
    'technical analysis'
  ];
  
  const lowerText = text.toLowerCase();
  
  // Check for legitimate content indicators first
  const hasLegitimateIndicators = legitimateKeywords.some(keyword => lowerText.includes(keyword));
  const hasCriticalIndicators = criticalKeywords.some(keyword => lowerText.includes(keyword));
  const hasHighIndicators = highKeywords.some(keyword => lowerText.includes(keyword));
  const hasMediumIndicators = mediumKeywords.some(keyword => lowerText.includes(keyword));
  
  // If it has legitimate indicators and no critical/high fraud indicators, it's likely safe
  if (hasLegitimateIndicators && !hasCriticalIndicators && !hasHighIndicators) {
    return 'low';
  }
  
  if (hasCriticalIndicators) {
    return 'critical';
  }
  if (hasHighIndicators) {
    return 'high';
  }
  if (hasMediumIndicators) {
    return 'medium';
  }
  
  return 'low';
}

function extractRecommendations(text: string): string[] {
  const baseRecommendations = [
    'Verify speaker identity through official channels',
    'Check SEBI website for official announcements',
    'Do not act on investment advice from unverified sources',
    'Cross-verify information with multiple trusted sources'
  ];
  
  // Add SCORES reporting as first priority for fraud cases
  const riskLevel = determineRiskLevel(text);
  if (riskLevel === 'high' || riskLevel === 'critical') {
    return [
      '🚨 REPORT IMMEDIATELY: File a complaint at SEBI SCORES portal - https://scores.sebi.gov.in/',
      'Call SEBI Toll-Free: 1800-266-7575 or 1800-22-7575 (9 AM - 6 PM)',
      ...baseRecommendations,
      'Save all evidence (screenshots, URLs, transcripts) for your complaint'
    ];
  }
  
  return [
    'Report any suspicious activity at SEBI SCORES - https://scores.sebi.gov.in/',
    ...baseRecommendations
  ];
}

function generateFallbackAnalysis(text: string): DeepfakeAnalysis {
  return {
    isDeepfake: false,
    confidence: 50,
    indicators: ['Analysis inconclusive - manual review recommended'],
    riskLevel: 'medium',
    recommendations: [
      'Exercise caution with this content',
      'Verify information through official channels',
      'Report to SEBI if suspicious'
    ],
    technicalDetails: {}
  };
}

interface SuspiciousContent {
  reportId?: string;
  isDeepfake?: boolean;
  riskLevel?: string;
  confidence?: number;
  indicators?: string[];
  timestamp?: string;
}

async function logSuspiciousContent(data: SuspiciousContent) {
  // Log to database for regulatory reporting
  // This would connect to your Prisma database
  console.log('Logging suspicious content:', data);
}

function generateReportId(): string {
  return `SEBI-DF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateDetailedResponse(analysis: DeepfakeAnalysis, isYouTubeVideo?: boolean) {
  const riskEmoji = {
    'critical': '🚨',
    'high': '⚠️',
    'medium': '⚡',
    'low': '✅'
  };

  const riskMessages = {
    'critical': 'CRITICAL RISK: Extremely high probability of fraudulent content.',
    'high': 'HIGH RISK: Strong indicators of manipulation detected.',
    'medium': 'MEDIUM RISK: Some suspicious elements found.',
    'low': 'LOW RISK: Content appears relatively authentic.'
  };

  const emoji = riskEmoji[analysis.riskLevel] || '✅';
  const baseMessage = riskMessages[analysis.riskLevel] || 'Content analysis complete.';

  // Add video content summary if available
  let videoSummary = '';
  if (analysis.contentSummary) {
    const cs = analysis.contentSummary;
    if (cs.title) {
      videoSummary = `Video: "${cs.title}"`;  
    }
    if (cs.channelName) {
      videoSummary += ` by ${cs.channelName}`;  
    }
    if (cs.description) {
      videoSummary += `. ${cs.description}`;  
    }
  }

  // Build detailed insights
  const insights: string[] = [];
  
  if (analysis.indicators && analysis.indicators.length > 0) {
    const realIndicators = analysis.indicators.filter(i => !i.includes('No specific indicators'));
    if (realIndicators.length > 0) {
      insights.push(`Found ${realIndicators.length} suspicious indicator(s)`);
    }
  }

  if (analysis.confidence >= 80) {
    insights.push('AI confidence: Very High');
  } else if (analysis.confidence >= 60) {
    insights.push('AI confidence: Moderate');
  } else {
    insights.push('AI confidence: Low - manual review recommended');
  }

  // Technical analysis summary
  const technicalFindings: string[] = [];
  if (analysis.technicalDetails?.audioInconsistencies?.length) {
    technicalFindings.push(`${analysis.technicalDetails.audioInconsistencies.length} audio anomalies`);
  }
  if (analysis.technicalDetails?.visualAnomalies?.length) {
    technicalFindings.push(`${analysis.technicalDetails.visualAnomalies.length} visual irregularities`);
  }
  if (analysis.technicalDetails?.metadataIssues?.length) {
    technicalFindings.push(`${analysis.technicalDetails.metadataIssues.length} metadata concerns`);
  }

  // Build comprehensive summary
  let summary = `${emoji} ${baseMessage}`;
  
  if (analysis.isDeepfake) {
    summary += ` This content shows strong signs of manipulation and should NOT be trusted for investment decisions.`;
  } else if (analysis.riskLevel === 'low') {
    summary += ` However, always verify investment advice with SEBI-registered advisors before making decisions.`;
  } else {
    summary += ` Exercise caution and verify all claims through official channels.`;
  }

  // Investment-specific warnings
  const investmentWarnings: string[] = [];
  const lowerContent = (analysis.indicators || []).join(' ').toLowerCase();
  
  if (lowerContent.includes('guaranteed') || lowerContent.includes('return')) {
    investmentWarnings.push('⚠️ Promises of guaranteed returns detected - major red flag');
  }
  if (lowerContent.includes('pump') || lowerContent.includes('dump')) {
    investmentWarnings.push('📊 Potential pump and dump scheme indicators');
  }
  if (lowerContent.includes('impersonat')) {
    investmentWarnings.push('🎭 Possible impersonation of authority figures');
  }
  if (lowerContent.includes('ipo')) {
    investmentWarnings.push('📈 IPO-related claims - verify with official sources');
  }

  return {
    summary,
    videoSummary,
    contentSummary: analysis.contentSummary,
    riskLevel: analysis.riskLevel,
    confidence: analysis.confidence,
    insights,
    technicalFindings,
    investmentWarnings,
    keyFindings: analysis.indicators?.filter(i => !i.includes('No specific indicators')) || [],
    actionItems: analysis.recommendations || [],
    sebiReportRequired: analysis.riskLevel === 'critical' || analysis.riskLevel === 'high',
    timestamp: new Date().toISOString(),
    mediaAnalyzed: isYouTubeVideo ? 'YouTube Video Analysis' : 'Text/Transcript Analysis'
  };
}
