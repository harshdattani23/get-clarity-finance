import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { logAgentQuery } from '@/lib/agentLogger';
import { auth } from '@clerk/nextjs/server';
import { validateDeepfakePayload } from '@/lib/agentValidation';

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
    [key: string]: any;
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
  const startTime = Date.now();
  let reportId: string | undefined;
  
  try {
    // Get user info and request metadata
    const { userId } = await auth();
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const userIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
    
    const body = await request.json();
    const { mediaUrl, mediaType, transcript, metadata } = body;

    const v = validateDeepfakePayload(body);
    if (!v.valid) {
      return NextResponse.json({ error: v.error, code: 'INVALID_INPUT_NOT_CHAT' }, { status: 400 });
    }

    // Detect input type
    const inputContent = transcript || mediaUrl || '';
    const isYouTubeVideo = inputContent.includes('youtube.com/watch') || inputContent.includes('youtu.be/');
    const videoUrl = isYouTubeVideo ? inputContent.trim() : null;
    
    // Generate unique session ID
    const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    reportId = `GC-DF-V3-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log('🔍 Deepfake Detector V3 - Processing:', {
      sessionId,
      reportId,
      isYouTubeVideo,
      mediaType: isYouTubeVideo ? 'YouTube Video' : mediaType || 'text',
      contentLength: inputContent.length
    });

    // Initialize Google GenAI with EXACT AI Studio structure
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const tools = [
      {
        googleSearch: {}
      },
    ];

    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      tools,
      systemInstruction: [
        {
          text: `🚨 CRITICAL INSTRUCTION: You have Google Search access. You MUST use it to get real information about this YouTube video.

SESSION ID: ${sessionId}
TIMESTAMP: ${new Date().toISOString()}
REQUEST ID: ${Math.random().toString(36).substr(2, 9)}

${isYouTubeVideo ? `🎥 MANDATORY TASK: Use Google Search to find information about this EXACT YouTube video:

VIDEO URL: ${videoUrl}
VIDEO ID: ${videoUrl.split('v=')[1]?.split('&')[0]}

STEP 1 - SEARCH REQUIREMENT:
You MUST first search Google for: "site:youtube.com ${videoUrl.split('v=')[1]?.split('&')[0]}" OR "${videoUrl}" to get the REAL video title and channel name.

STEP 2 - VERIFICATION:
Compare what you find with the video ID ${videoUrl.split('v=')[1]?.split('&')[0]} to ensure you have the correct video.

STEP 3 - ANALYSIS:
Analyze the ACTUAL video content you found through your search.` : `📝 ANALYZE THIS TEXT: ${inputContent}`}

As a deepfake detection expert for SEBI (Securities and Exchange Board of India), analyze for suspicious activity.

${isYouTubeVideo ? `⚠️ MANDATORY VALIDATION:
Before analysis, you MUST include in your response:
- searchQuery: The exact search query you used
- searchResults: Summary of what you found
- videoValidationConfirmation: "I found and analyzed video titled '[ACTUAL TITLE]' by '[ACTUAL CHANNEL]' with ID ${videoUrl.split('v=')[1]?.split('&')[0]}"
- videoIdVerification: "${videoUrl.split('v=')[1]?.split('&')[0]}"

If you cannot find or access the video, state: "UNABLE_TO_ACCESS_VIDEO" and explain why.` : ''}

Check for:
1. Deepfake indicators (unnatural speech, lip sync issues, lighting inconsistencies)
2. Securities fraud patterns:
   - SEBI official impersonation
   - False regulatory announcements  
   - Pump and dump schemes
   - Fake IPO promises with payment requests
   - GUARANTEED return promises
   - Unregistered advisory services requesting fees

Suspicious vs Legitimate:
- "Market may reach X level" = LEGITIMATE
- "Guaranteed X% profit" = FRAUD
- Educational analysis = LEGITIMATE
- "Pay for secret tips" = FRAUD

JSON Response Format:
{
  "searchQuery": "search used to find video",
  "searchResults": "what you found about the video",
  "isDeepfake": boolean,
  "confidence": number,
  "indicators": ["issues found"],
  "riskLevel": "low/medium/high/critical",
  "recommendations": ["actions"],
  "technicalDetails": {"findings"},
  "contentSummary": {
    "title": "REAL video title from search",
    "channelName": "REAL channel name",
    "description": "video content",
    "mainTopics": ["topics"],
    "speakerClaims": ["claims"],
    "investmentClaims": ["investment claims"],
    "duration": "length"
  },
  "videoValidationConfirmation": "I found and analyzed...",
  "videoIdVerification": "${isYouTubeVideo ? videoUrl.split('v=')[1]?.split('&')[0] : ''}"
}`,
        }
      ],
    };

    const model = process.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash'; // Use configured model
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: isYouTubeVideo ? videoUrl! : inputContent,
          },
        ],
      },
    ];

    console.log('🤖 Generating analysis with AI Studio structure...');

    // Generate response using streaming - EXACT AI Studio method
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    
    // Collect the streamed response - EXACT AI Studio loop
    let fullResponse = '';
    let fileIndex = 0;
    for await (const chunk of response) {
      if (chunk.text) {
        fullResponse += chunk.text;
        console.log(`📝 Chunk ${fileIndex++}:`, chunk.text.substring(0, 100) + '...');
      }
    }

    console.log('✅ Full AI Response Length:', fullResponse.length);

    // Parse the JSON from response with enhanced error handling
    let analysis: DeepfakeAnalysis;
    try {
      // First attempt: Look for JSON within code blocks
      const codeBlockMatch = fullResponse.match(/```json\s*(\{[\s\S]*?\})\s*```/i);
      if (codeBlockMatch) {
        analysis = JSON.parse(codeBlockMatch[1]);
        console.log('✅ Parsed JSON from code block');
      } else {
        // Second attempt: Look for any JSON object
        const jsonMatches = fullResponse.match(/\{[\s\S]*?\}(?=\s*$|\s*```|\s*\{)/g);
        if (jsonMatches && jsonMatches.length > 0) {
          // Use the largest JSON object (likely the most complete)
          const largestJson = jsonMatches.reduce((prev, current) => 
            prev.length > current.length ? prev : current
          );
          analysis = JSON.parse(largestJson);
          console.log('✅ Parsed JSON from response matching');
        } else {
          // Third attempt: Try to parse the whole response
          const cleanResponse = fullResponse.trim();
          if (cleanResponse.startsWith('{') && cleanResponse.endsWith('}')) {
            analysis = JSON.parse(cleanResponse);
            console.log('✅ Parsed entire response as JSON');
          } else {
            throw new Error('No valid JSON found in response');
          }
        }
      }

      // Validate required fields and set defaults
      analysis = validateAndEnhanceAnalysis(analysis);
      
      // Video validation for YouTube content
      if (isYouTubeVideo && videoUrl) {
        analysis = validateVideoAnalysis(analysis, videoUrl);
      }

    } catch (parseError) {
      console.error('❌ Failed to parse AI response:', parseError);
      console.log('📋 Raw response preview:', fullResponse.substring(0, 500));
      
      // Generate enhanced fallback analysis
      analysis = generateEnhancedFallbackAnalysis(fullResponse, inputContent, isYouTubeVideo);
    }

    // Generate comprehensive detailed response
    const detailedResponse = generateComprehensiveResponse(analysis, isYouTubeVideo, sessionId);

    // Log suspicious content for regulatory compliance
    if (analysis.riskLevel === 'high' || analysis.riskLevel === 'critical') {
      await logSuspiciousContentForCompliance({
        reportId,
        sessionId,
        analysis,
        inputContent: isYouTubeVideo ? videoUrl : inputContent,
        userInfo: { userId, userAgent, userIP }
      });
    }

    const executionTime = Date.now() - startTime;
    const responseData = {
      success: true,
      version: 'v3-ai-studio',
      analysis,
      reportId,
      sessionId,
      message: detailedResponse.summary,
      detailed: detailedResponse,
      videoAnalyzed: isYouTubeVideo,
      mediaType: isYouTubeVideo ? 'YouTube Video' : mediaType || 'Text/Transcript',
      videoUrl: isYouTubeVideo ? videoUrl : undefined,
      timestamp: new Date().toISOString(),
      processingTime: `${executionTime}ms`
    };
    
    // Log query for analytics
    await logAgentQuery({
      agentType: 'deepfake-detector-v3',
      query: isYouTubeVideo ? videoUrl || inputContent : inputContent.substring(0, 500),
      response: JSON.stringify({
        isDeepfake: analysis.isDeepfake,
        riskLevel: analysis.riskLevel,
        confidence: analysis.confidence,
        summary: detailedResponse.summary
      }),
      success: true,
      executionTime,
      userId: userId || undefined,
      userAgent,
      ipAddress: userIP
    });
    
    console.log('🎉 Analysis completed successfully:', {
      reportId,
      riskLevel: analysis.riskLevel,
      confidence: analysis.confidence,
      isDeepfake: analysis.isDeepfake,
      executionTime: `${executionTime}ms`
    });
    
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('💥 Deepfake detection V3 error:', error);
    
    const executionTime = Date.now() - startTime;
    
    // Enhanced error logging
    try {
      const { userId } = await auth();
      const userAgent = request.headers.get('user-agent') || 'Unknown';
      const userIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
      
      await logAgentQuery({
        agentType: 'deepfake-detector-v3',
        query: 'Error occurred during processing',
        response: JSON.stringify({ 
          error: 'Failed to analyze media for deepfake',
          errorType: error instanceof Error ? error.constructor.name : 'UnknownError'
        }),
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
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze media for deepfake',
        version: 'v3-ai-studio',
        reportId,
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

function validateAndEnhanceAnalysis(analysis: any): DeepfakeAnalysis {
  return {
    isDeepfake: Boolean(analysis.isDeepfake),
    confidence: Math.min(Math.max(Number(analysis.confidence) || 50, 0), 100),
    indicators: Array.isArray(analysis.indicators) ? analysis.indicators : ['Analysis completed with limited indicators'],
    riskLevel: ['low', 'medium', 'high', 'critical'].includes(analysis.riskLevel) 
      ? analysis.riskLevel 
      : 'medium',
    recommendations: Array.isArray(analysis.recommendations) 
      ? analysis.recommendations 
      : ['Verify information through official channels', 'Report suspicious content to SEBI'],
    technicalDetails: analysis.technicalDetails || {},
    contentSummary: analysis.contentSummary || {}
  };
}

function validateVideoAnalysis(analysis: any, expectedVideoUrl: string): DeepfakeAnalysis {
  const expectedVideoId = expectedVideoUrl.split('v=')[1]?.split('&')[0];
  
  // Check multiple fields for video validation
  const analysisText = JSON.stringify(analysis).toLowerCase();
  const hasVideoId = analysisText.includes(expectedVideoId?.toLowerCase() || '');
  const hasVideoUrl = analysisText.includes(expectedVideoUrl.toLowerCase());
  
  // Check if the AI provided video validation confirmation
  const hasValidationConfirmation = analysis.videoValidationConfirmation;
  const hasVideoIdVerification = analysis.videoIdVerification === expectedVideoId;
  
  console.log('🔍 Video Validation Check:', {
    expectedVideoId,
    expectedVideoUrl,
    hasVideoId,
    hasVideoUrl,
    hasValidationConfirmation: !!hasValidationConfirmation,
    hasVideoIdVerification,
    actualVideoIdFromAI: analysis.videoIdVerification
  });
  
  // More strict validation
  const isValidAnalysis = hasVideoIdVerification || hasVideoId || hasVideoUrl;
  
  if (!isValidAnalysis && expectedVideoId) {
    console.error('❌ CRITICAL: AI analyzed wrong video or failed to access the video!');
    console.log('Expected Video ID:', expectedVideoId);
    console.log('AI Video ID Verification:', analysis.videoIdVerification);
    console.log('AI Validation Confirmation:', analysis.videoValidationConfirmation);
    
    return {
      ...analysis,
      indicators: [
        '🚨 CRITICAL ERROR: AI may have analyzed the wrong video or failed to access the specified video',
        '⚠️ Video title/channel may not match the provided URL',
        ...analysis.indicators
      ],
      riskLevel: 'medium', // Always flag as medium risk if video validation fails
      confidence: Math.min(analysis.confidence || 50, 60), // Reduce confidence
      technicalDetails: {
        ...analysis.technicalDetails,
        videoValidationError: true,
        expectedVideoId,
        expectedUrl: expectedVideoUrl,
        aiVideoIdVerification: analysis.videoIdVerification,
        aiValidationConfirmation: analysis.videoValidationConfirmation,
        validationFailed: true,
        warning: 'CRITICAL: Analysis may be for wrong video - manual verification required'
      }
    };
  }
  
  // If validation passed, add confirmation to technical details
  return {
    ...analysis,
    technicalDetails: {
      ...analysis.technicalDetails,
      videoValidation: {
        expectedVideoId,
        expectedUrl: expectedVideoUrl,
        verified: true,
        aiConfirmation: analysis.videoValidationConfirmation,
        videoIdMatch: hasVideoIdVerification
      }
    }
  };
}

function generateEnhancedFallbackAnalysis(
  response: string, 
  inputContent: string, 
  isYouTubeVideo: boolean
): DeepfakeAnalysis {
  const responseText = response.toLowerCase();
  
  // Enhanced keyword detection
  const suspiciousKeywords = [
    'deepfake', 'fake', 'manipulated', 'artificial', 'generated',
    'guaranteed returns', 'assured profit', 'transfer money',
    'impersonat', 'suspicious', 'fraud', 'scam'
  ];
  
  const legitimateKeywords = [
    'educational', 'analysis', 'opinion', 'prediction', 'forecast',
    'market outlook', 'investment strategy'
  ];
  
  const suspiciousCount = suspiciousKeywords.filter(k => responseText.includes(k)).length;
  const legitimateCount = legitimateKeywords.filter(k => responseText.includes(k)).length;
  
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'medium';
  let confidence = 50;
  
  if (suspiciousCount > legitimateCount + 2) {
    riskLevel = 'high';
    confidence = 70;
  } else if (legitimateCount > suspiciousCount) {
    riskLevel = 'low';
    confidence = 60;
  }
  
  return {
    isDeepfake: suspiciousCount > 2,
    confidence,
    indicators: [
      'Fallback analysis used due to response parsing issues',
      `Found ${suspiciousCount} suspicious indicators`,
      `Found ${legitimateCount} legitimate content indicators`
    ],
    riskLevel,
    recommendations: [
      'Manual review recommended due to parsing issues',
      'Verify content through multiple sources',
      'Contact SEBI if concerned about potential fraud'
    ],
    technicalDetails: {
      fallbackAnalysis: true,
      responseLengthChars: response.length,
      suspiciousKeywordCount: suspiciousCount,
      legitimateKeywordCount: legitimateCount
    }
  };
}

async function logSuspiciousContentForCompliance(data: {
  reportId: string;
  sessionId: string;
  analysis: DeepfakeAnalysis;
  inputContent: string;
  userInfo: any;
}) {
  console.log('🚨 REGULATORY LOG - Suspicious content detected:', {
    reportId: data.reportId,
    riskLevel: data.analysis.riskLevel,
    isDeepfake: data.analysis.isDeepfake,
    confidence: data.analysis.confidence,
    timestamp: new Date().toISOString()
  });
  
  // Here you could add database logging for regulatory compliance
  // await prisma.suspiciousContent.create({ data: ... });
}

function generateComprehensiveResponse(
  analysis: DeepfakeAnalysis, 
  isYouTubeVideo: boolean,
  sessionId: string
) {
  const riskEmojis = {
    'critical': '🚨',
    'high': '⚠️',
    'medium': '⚡',
    'low': '✅'
  };

  const riskMessages = {
    'critical': 'CRITICAL THREAT: This content poses severe fraud risk and should be reported immediately.',
    'high': 'HIGH RISK: Strong indicators of manipulation or fraudulent activity detected.',
    'medium': 'MEDIUM RISK: Some concerning elements require careful verification.',
    'low': 'LOW RISK: Content appears relatively authentic but still verify claims.'
  };

  const emoji = riskEmojis[analysis.riskLevel];
  const baseMessage = riskMessages[analysis.riskLevel];

  let summary = `${emoji} ${baseMessage}`;
  
  if (analysis.isDeepfake) {
    summary += ` This content shows signs of deepfake manipulation and should NOT be trusted for investment decisions.`;
  }

  // Enhanced insights
  const insights = [];
  
  if (analysis.indicators.length > 0) {
    const realIndicators = analysis.indicators.filter(i => 
      !i.includes('No specific indicators') && 
      !i.includes('Analysis completed')
    );
    if (realIndicators.length > 0) {
      insights.push(`🔍 ${realIndicators.length} security indicator(s) detected`);
    }
  }

  insights.push(`🎯 AI Confidence: ${analysis.confidence}%`);
  
  if (analysis.confidence >= 80) {
    insights.push('📊 High confidence analysis');
  } else if (analysis.confidence < 60) {
    insights.push('⚠️ Low confidence - manual review recommended');
  }

  // Investment warnings
  const investmentWarnings: string[] = [];
  const indicatorText = analysis.indicators.join(' ').toLowerCase();
  
  const warningChecks = [
    { keywords: ['guaranteed', 'assured'], warning: '💰 Guaranteed return promises detected - major red flag' },
    { keywords: ['pump', 'dump'], warning: '📈 Potential market manipulation scheme' },
    { keywords: ['impersonat', 'fake identity'], warning: '🎭 Identity fraud indicators' },
    { keywords: ['transfer money', 'payment'], warning: '💳 Payment requests detected - high fraud risk' },
    { keywords: ['sebi official'], warning: '🏛️ SEBI impersonation suspected' }
  ];

  warningChecks.forEach(check => {
    if (check.keywords.some(keyword => indicatorText.includes(keyword))) {
      investmentWarnings.push(check.warning);
    }
  });

  return {
    summary,
    riskLevel: analysis.riskLevel,
    confidence: analysis.confidence,
    insights,
    investmentWarnings,
    contentSummary: analysis.contentSummary,
    technicalFindings: analysis.technicalDetails,
    keyFindings: analysis.indicators.filter(i => 
      !i.includes('No specific indicators') && 
      !i.includes('Analysis completed')
    ),
    actionItems: analysis.recommendations,
    sebiReportRequired: analysis.riskLevel === 'critical' || analysis.riskLevel === 'high',
    complianceInfo: {
      reportId: `GC-DF-V3-${Date.now()}`,
      sessionId,
      requiresReporting: analysis.riskLevel === 'critical' || analysis.riskLevel === 'high',
      sebiPortal: 'https://scores.sebi.gov.in/',
      sebiTollFree: '1800-266-7575'
    },
    timestamp: new Date().toISOString(),
    mediaAnalyzed: isYouTubeVideo ? 'YouTube Video Analysis' : 'Text/Transcript Analysis',
    version: 'v3-ai-studio-enhanced'
  };
}
