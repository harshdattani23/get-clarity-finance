import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { logAgentQuery, getRequestMetadata } from '@/lib/agentLogger';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let reportId: string | undefined;
  
  try {
    // Get user info and request metadata
    const { userId } = await auth();
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const userIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
    
    const { mediaUrl, mediaType, transcript, metadata } = await request.json();

    if (!mediaUrl && !transcript) {
      return NextResponse.json(
        { error: 'Media URL or transcript is required' },
        { status: 400 }
      );
    }

    // Initialize Google GenAI
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Detect input type
    const inputContent = transcript || mediaUrl || '';
    const isYouTubeVideo = inputContent.includes('youtube.com/watch') || inputContent.includes('youtu.be/');
    const videoUrl = isYouTubeVideo ? inputContent.trim() : null;
    
    // Generate unique session ID
    const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Configuration with thinking and tools (enhanced approach)
    const tools = [
      {
        googleSearch: {}
      }
    ];
    
    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      tools,
      systemInstruction: [
        {
          text: `SESSION ID: ${sessionId}
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
- contentSummary (object with title, description, mainTopics, speakerClaims, investmentClaims, duration, channelName)`,
        }
      ],
    };

    const model = process.env.GEMINI_MODEL_NAME!;
    
    // Prepare content based on input type
    let contents;
    if (isYouTubeVideo) {
      // For YouTube videos, use fileData approach (works in newer API versions)
      contents = [
        {
          role: 'user',
          parts: [
            {
              fileData: {
                fileUri: videoUrl,
                mimeType: 'video/*',
              }
            },
            {
              text: `Analyze this YouTube video for deepfake and fraud indicators following the instructions provided in the system prompt.`,
            }
          ],
        },
      ];
    } else {
      // For text content
      contents = [
        {
          role: 'user',
          parts: [
            {
              text: inputContent,
            },
          ],
        },
      ];
    }

    // Log for debugging
    console.log('Analyzing content:', isYouTubeVideo ? videoUrl : 'Text content');
    console.log('Session ID:', sessionId);
    console.log('Using model:', model);

    // Generate response using streaming
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    // Collect the streamed response
    let fullResponse = '';
    for await (const chunk of response) {
      if (chunk.text) {
        fullResponse += chunk.text;
      }
    }

    console.log('Raw AI Response:', fullResponse);

    // Parse the JSON from response
    let analysis;
    try {
      // Try to extract JSON from the response
      const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON found, try to parse the entire response
        analysis = JSON.parse(fullResponse);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      
      // Fallback analysis
      analysis = {
        isDeepfake: false,
        confidence: 50,
        indicators: ['Analysis completed but response format was unexpected'],
        riskLevel: 'medium',
        recommendations: [
          'Manual review recommended',
          'Verify information through official channels',
          'Report to SEBI if suspicious'
        ],
        technicalDetails: {
          error: 'Response parsing failed',
          rawResponse: fullResponse.substring(0, 500)
        },
        contentSummary: {}
      };
    }

    // Generate report ID (move this to beginning after user auth)
    reportId = `GC-DF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare detailed response
    const detailedResponse = generateDetailedResponse(analysis, isYouTubeVideo);

    const executionTime = Date.now() - startTime;
    const responseData = {
      success: true,
      analysis,
      reportId,
      sessionId,
      message: detailedResponse.summary,
      detailed: detailedResponse,
      videoAnalyzed: isYouTubeVideo,
      mediaType: isYouTubeVideo ? 'YouTube Video' : mediaType || 'Text/Transcript',
      videoUrl: isYouTubeVideo ? videoUrl : undefined,
      timestamp: new Date().toISOString()
    };
    
    // Log query using new AgentQuery system
    await logAgentQuery({
      agentType: 'deepfake-detector-v2',
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
    
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Deepfake detection error:', error);
    
    // Log error if we have a reportId
    if (reportId) {
      const executionTime = Date.now() - startTime;
      try {
        const { userId } = await auth();
        const userAgent = request.headers.get('user-agent') || 'Unknown';
        const userIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
        
        await logAgentQuery({
          agentType: 'deepfake-detector-v2',
          query: 'Error occurred during processing',
          response: JSON.stringify({ error: 'Failed to analyze media for deepfake' }),
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
      { 
        error: 'Failed to analyze media for deepfake',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

interface AnalysisType {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  indicators?: string[];
  isDeepfake?: boolean;
  contentSummary?: Record<string, unknown>;
  technicalDetails?: Record<string, unknown>;
  recommendations?: string[];
}

function generateDetailedResponse(analysis: AnalysisType, isYouTubeVideo: boolean) {
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

  const emoji = riskEmoji[analysis.riskLevel as keyof typeof riskEmoji] || '✅';
  const baseMessage = riskMessages[analysis.riskLevel as keyof typeof riskMessages] || 'Content analysis complete.';

  // Build detailed insights
  const insights = [];
  
  if (analysis.indicators && analysis.indicators.length > 0) {
    const realIndicators = analysis.indicators.filter((i: string) => !i.includes('No specific indicators'));
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
  const investmentWarnings = [];
  const indicatorText = (analysis.indicators || []).join(' ').toLowerCase();
  
  if (indicatorText.includes('guaranteed') || indicatorText.includes('return')) {
    investmentWarnings.push('⚠️ Promises of guaranteed returns detected - major red flag');
  }
  if (indicatorText.includes('pump') || indicatorText.includes('dump')) {
    investmentWarnings.push('📊 Potential pump and dump scheme indicators');
  }
  if (indicatorText.includes('impersonat')) {
    investmentWarnings.push('🎭 Possible impersonation of authority figures');
  }
  if (indicatorText.includes('ipo')) {
    investmentWarnings.push('📈 IPO-related claims - verify with official sources');
  }

  return {
    summary,
    riskLevel: analysis.riskLevel,
    confidence: analysis.confidence,
    insights,
    investmentWarnings,
    contentSummary: analysis.contentSummary,
    technicalFindings: analysis.technicalDetails,
    keyFindings: analysis.indicators || [],
    actionItems: analysis.recommendations || [],
    sebiReportRequired: analysis.riskLevel === 'critical' || analysis.riskLevel === 'high',
    timestamp: new Date().toISOString(),
    mediaAnalyzed: isYouTubeVideo ? 'YouTube Video Analysis' : 'Text/Transcript Analysis'
  };
}
