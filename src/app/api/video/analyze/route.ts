import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { GoogleGenAI } from '@google/genai';
import { retrieveFileSecurely } from '@/lib/secureStorage';
import { PrismaClient } from '@prisma/client';
import { logAgentQuery } from '@/lib/agentLogger';

const prisma = new PrismaClient();

interface VideoAnalysisResult {
  analysisId: string;
  videoId: string;
  isDeepfake: boolean;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  indicators: string[];
  recommendations: string[];
  fraudAnalysis: {
    isFraudulent: boolean;
    fraudType?: string[];
    sebiViolations?: string[];
    investmentScamIndicators?: string[];
  };
  technicalDetails: {
    videoQuality?: string;
    compressionArtifacts?: string[];
    editingMarkers?: string[];
    metadataAnalysis?: any;
  };
  contentAnalysis: {
    transcript?: string;
    keyTopics?: string[];
    financialClaims?: string[];
    speakerAnalysis?: string;
    duration?: number;
  };
  timestamp: string;
  processingTime: string;
}

interface VideoAnalysisRequest {
  videoId: string;
  analysisType?: 'basic' | 'comprehensive' | 'fraud_focus';
  generateTranscript?: boolean;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let analysisId: string | undefined;

  try {
    // Authentication check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const body: VideoAnalysisRequest = await request.json();
    const { videoId, analysisType = 'comprehensive', generateTranscript = true } = body;

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required', code: 'MISSING_VIDEO_ID' },
        { status: 400 }
      );
    }

    console.log('🔍 Video Analysis Request:', {
      videoId,
      analysisType,
      generateTranscript,
      userId,
      timestamp: new Date().toISOString()
    });

    // Get video record
    const videoRecord = await prisma.videoUpload.findFirst({
      where: {
        id: videoId,
        uploadedBy: userId
      }
    });

    if (!videoRecord) {
      return NextResponse.json(
        { error: 'Video not found or access denied', code: 'VIDEO_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check if video is already being analyzed
    const existingAnalysis = await prisma.videoAnalysis.findFirst({
      where: {
        videoId,
        status: 'ANALYZING'
      }
    });

    if (existingAnalysis) {
      return NextResponse.json(
        { 
          error: 'Video is currently being analyzed',
          code: 'ANALYSIS_IN_PROGRESS',
          analysisId: existingAnalysis.id
        },
        { status: 409 }
      );
    }

    // Generate analysis ID
    analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;

    // Create analysis record
    const analysisRecord = await prisma.videoAnalysis.create({
      data: {
        id: analysisId,
        videoId,
        analysisType,
        status: 'ANALYZING',
        startedAt: new Date(),
        userId
      }
    });

    console.log('📊 Analysis record created:', { analysisId, status: 'analyzing' });

    // Update video status
    await prisma.videoUpload.update({
      where: { id: videoId },
      data: { 
        status: 'ANALYZING',
        lastAnalyzedAt: new Date()
      }
    });

    // Retrieve encrypted video file
    console.log('📥 Retrieving encrypted video file...');
    const fileData = await retrieveFileSecurely(videoRecord.fileId, userId, true);

    if (!fileData) {
      await prisma.videoAnalysis.update({
        where: { id: analysisId },
        data: { 
          status: 'FAILED',
          error: 'Failed to retrieve video file',
          completedAt: new Date()
        }
      });

      return NextResponse.json(
        { error: 'Failed to retrieve video file', code: 'FILE_RETRIEVAL_FAILED' },
        { status: 500 }
      );
    }

    console.log('✅ Video file retrieved successfully:', {
      originalName: fileData.metadata.originalName,
      fileSize: fileData.metadata.fileSize
    });

    // For demo purposes, we'll analyze video metadata and use AI for content analysis
    // In production, you might want to use specialized video analysis libraries

    // Initialize Google GenAI for content analysis
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    // Prepare analysis prompt based on video metadata
    const videoAnalysisPrompt = `
Analyze this video file for potential deepfake content and financial fraud indicators.

Video Details:
- Filename: ${videoRecord.originalName}
- File size: ${Math.round(videoRecord.fileSize / (1024 * 1024))}MB
- MIME type: ${videoRecord.mimeType}
- Upload date: ${videoRecord.uploadedAt}
- Description: ${videoRecord.description || 'No description provided'}
- Tags: ${videoRecord.tags?.join(', ') || 'No tags'}

Analysis Type: ${analysisType.toUpperCase()}

As a deepfake detection and fraud analysis expert for SEBI (Securities and Exchange Board of India), perform a ${analysisType} analysis focusing on:

DEEPFAKE DETECTION:
1. Video quality inconsistencies that might indicate digital manipulation
2. Potential temporal inconsistencies in file metadata
3. File compression patterns that might suggest re-encoding after editing
4. Any technical markers suggesting AI generation or deep manipulation

FRAUD ANALYSIS:
1. Based on filename, description, and metadata, assess potential for:
   - Securities fraud schemes
   - Investment scam indicators
   - SEBI regulation violations
   - Pump and dump scheme markers
   - False guarantee claims
   - Unauthorized advisory services

CONTENT RISK ASSESSMENT:
1. Evaluate the likelihood of fraudulent investment content
2. Check for common fraud indicators in file naming patterns
3. Assess risk level for financial consumers

Please provide analysis in the following JSON format:

{
  "isDeepfake": boolean,
  "confidence": number (0-100),
  "riskLevel": "low/medium/high/critical",
  "indicators": ["list of specific indicators found"],
  "recommendations": ["specific recommendations for users/regulators"],
  "fraudAnalysis": {
    "isFraudulent": boolean,
    "fraudType": ["types of potential fraud"],
    "sebiViolations": ["potential SEBI violations"],
    "investmentScamIndicators": ["specific scam indicators"]
  },
  "technicalDetails": {
    "videoQuality": "assessment",
    "compressionArtifacts": ["artifacts found"],
    "editingMarkers": ["editing indicators"],
    "metadataAnalysis": {"key": "value"}
  },
  "contentAnalysis": {
    "keyTopics": ["inferred topics from metadata"],
    "financialClaims": ["potential financial claims"],
    "speakerAnalysis": "analysis based on available info",
    "riskFactors": ["identified risk factors"]
  }
}`;

    console.log('🤖 Starting AI analysis...');

    // Generate analysis using AI - using streaming like the working deepfake detector
    const model = process.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash';
    const response = await ai.models.generateContentStream({
      model,
      contents: [
        {
          role: 'user',
          parts: [{ text: videoAnalysisPrompt }]
        }
      ]
    });

    // Collect the streamed response
    let aiResponse = '';
    for await (const chunk of response) {
      if (chunk.text) {
        aiResponse += chunk.text;
      }
    }
    console.log('✅ AI Analysis Response received:', aiResponse.substring(0, 200) + '...');

    // Parse AI response
    let analysisResult: Partial<VideoAnalysisResult>;
    try {
      // Try to extract JSON from response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedResult = JSON.parse(jsonMatch[0]);
        analysisResult = {
          ...parsedResult,
          analysisId,
          videoId,
          timestamp: new Date().toISOString(),
          processingTime: `${Date.now() - startTime}ms`
        };
      } else {
        throw new Error('No JSON found in AI response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      
      // Generate fallback analysis
      analysisResult = {
        analysisId,
        videoId,
        isDeepfake: false,
        confidence: 30,
        riskLevel: 'medium',
        indicators: ['Analysis completed with limited data', 'Manual review recommended'],
        recommendations: [
          'Manual verification recommended',
          'Check video content manually for fraud indicators',
          'Verify source credibility through official channels'
        ],
        fraudAnalysis: {
          isFraudulent: false,
          fraudType: [],
          sebiViolations: [],
          investmentScamIndicators: []
        },
        technicalDetails: {
          videoQuality: 'Unable to determine',
          compressionArtifacts: [],
          editingMarkers: [],
          metadataAnalysis: {
            filename: videoRecord.originalName,
            fileSize: videoRecord.fileSize,
            mimeType: videoRecord.mimeType
          }
        },
        contentAnalysis: {
          keyTopics: [],
          financialClaims: [],
          speakerAnalysis: 'Unable to analyze without video processing',
          duration: 0
        },
        timestamp: new Date().toISOString(),
        processingTime: `${Date.now() - startTime}ms`
      };
    }

    // Update analysis record with results
    await prisma.videoAnalysis.update({
      where: { id: analysisId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        results: analysisResult as any,
        isDeepfake: analysisResult.isDeepfake,
        confidence: analysisResult.confidence,
        riskLevel: analysisResult.riskLevel
      }
    });

    // Update video record
    await prisma.videoUpload.update({
      where: { id: videoId },
      data: {
        status: 'ANALYZED',
        lastAnalyzedAt: new Date()
      }
    });

    // Log the analysis
    await logAgentQuery({
      agentType: 'video-analyzer',
      query: `Video analysis: ${videoRecord.originalName}`,
      response: JSON.stringify({
        isDeepfake: analysisResult.isDeepfake,
        riskLevel: analysisResult.riskLevel,
        confidence: analysisResult.confidence
      }),
      success: true,
      executionTime: Date.now() - startTime,
      userId,
      userAgent: request.headers.get('user-agent') || 'Unknown',
      ipAddress: request.headers.get('x-forwarded-for') || 'Unknown'
    });

    console.log('🎉 Video analysis completed:', {
      analysisId,
      isDeepfake: analysisResult.isDeepfake,
      riskLevel: analysisResult.riskLevel,
      confidence: analysisResult.confidence,
      processingTime: analysisResult.processingTime
    });

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      message: 'Video analysis completed successfully'
    });

  } catch (error) {
    console.error('💥 Video analysis error:', error);

    // Update analysis record if it exists
    if (analysisId) {
      try {
        await prisma.videoAnalysis.update({
          where: { id: analysisId },
          data: {
            status: 'FAILED',
            error: error instanceof Error ? error.message : 'Unknown error',
            completedAt: new Date()
          }
        });
      } catch (updateError) {
        console.error('Failed to update analysis record:', updateError);
      }
    }

    const processingTime = Date.now() - startTime;
    
    return NextResponse.json(
      {
        success: false,
        error: 'Video analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        code: 'ANALYSIS_FAILED',
        timestamp: new Date().toISOString(),
        processingTime: `${processingTime}ms`
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve analysis results
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const analysisId = url.searchParams.get('analysisId');
    const videoId = url.searchParams.get('videoId');

    if (analysisId) {
      // Get specific analysis
      const analysis = await prisma.videoAnalysis.findFirst({
        where: {
          id: analysisId,
          userId
        },
        include: {
          video: true
        }
      });

      if (!analysis) {
        return NextResponse.json(
          { error: 'Analysis not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ analysis });
    } else if (videoId) {
      // Get all analyses for a video
      const analyses = await prisma.videoAnalysis.findMany({
        where: {
          videoId,
          userId
        },
        orderBy: { startedAt: 'desc' },
        include: {
          video: true
        }
      });

      return NextResponse.json({ analyses });
    } else {
      // Get user's recent analyses
      const analyses = await prisma.videoAnalysis.findMany({
        where: {
          userId
        },
        orderBy: { startedAt: 'desc' },
        take: 20,
        include: {
          video: true
        }
      });

      return NextResponse.json({ analyses });
    }

  } catch (error) {
    console.error('Error retrieving analysis:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve analysis' },
      { status: 500 }
    );
  }
}
