import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import pdfParse from 'pdf-parse';
import { createWorker } from 'tesseract.js';
import sharp from 'sharp';
import { fileTypeFromBuffer } from 'file-type';
import {
  analyzeDocumentText,
  generateRecommendations,
  calculateRiskLevel,
  analyzeDocumentMetadata,
  DocumentAnalysisResult,
  DocumentMetadata,
  FraudIndicator
} from '@/lib/documentValidation';
import {
  storeFileSecurely,
  retrieveFileSecurely,
  deleteFileSecurely,
  SecureFileMetadata
} from '@/lib/secureStorage';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const prisma = new PrismaClient();

// Maximum file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Supported file types
const SUPPORTED_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp',
  'text/plain'
];

interface DocumentAnalysisResponse {
  success: boolean;
  reportId: string;
  analysis: DocumentAnalysisResult;
  processingTime: number;
  message: string;
  sebiUrls: {
    verifyRegistration: string;
    reportFraud: string;
    helpline: string;
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
    
    // Generate report ID for this analysis
    reportId = generateReportId();

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('document') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No document provided', code: 'MISSING_DOCUMENT' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`, code: 'FILE_TOO_LARGE' },
        { status: 400 }
      );
    }

    // Get file buffer and validate type
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileTypeResult = await fileTypeFromBuffer(fileBuffer);
    const mimeType = fileTypeResult?.mime || file.type;

    if (!SUPPORTED_TYPES.includes(mimeType)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${mimeType}`, code: 'UNSUPPORTED_FILE_TYPE' },
        { status: 400 }
      );
    }

    // Extract text based on file type
    let extractedText = '';
    let metadata: DocumentMetadata = {
      fileType: mimeType,
      fileSize: file.size,
      creationDate: new Date(),
      isScanned: false
    };
    
    if (mimeType === 'application/pdf') {
      const result = await extractTextFromPDF(fileBuffer);
      extractedText = result.text;
      metadata = result.metadata;
    } else if (mimeType.startsWith('image/')) {
      const result = await extractTextFromImage(fileBuffer);
      extractedText = result.text;
      metadata = result.metadata;
    } else if (mimeType === 'text/plain') {
      extractedText = fileBuffer.toString('utf-8');
      metadata = {
        fileType: mimeType,
        fileSize: file.size,
        creationDate: new Date(),
        isScanned: false
      };
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Could not extract meaningful text from document. Please ensure the document contains readable text.', code: 'NO_TEXT_EXTRACTED' },
        { status: 400 }
      );
    }

    // Analyze document text for fraud indicators
    const textAnalysis = analyzeDocumentText(extractedText);
    
    // Analyze metadata
    const metadataAnalysis = analyzeDocumentMetadata(metadata);

    // Calculate overall risk level
    const riskLevel = calculateRiskLevel(textAnalysis.riskScore, textAnalysis.fraudIndicators);

    // Use AI for additional analysis
    const aiAnalysis = await performAIAnalysis(extractedText, textAnalysis.documentType);

    // Combine all analyses
    const analysisResult: DocumentAnalysisResult = {
      isSuspicious: riskLevel !== 'low',
      riskScore: textAnalysis.riskScore,
      confidence: calculateConfidence(textAnalysis.fraudIndicators, extractedText.length),
      riskLevel,
      fraudIndicators: textAnalysis.fraudIndicators,
      documentType: textAnalysis.documentType,
      recommendations: [],
      extractedText: extractedText.substring(0, 2000), // Limit text in response
      metadata,
      sebiVerification: textAnalysis.sebiVerification
    };

    // Generate recommendations
    analysisResult.recommendations = generateRecommendations(analysisResult);
    
    // Add metadata concerns to recommendations
    if (metadataAnalysis.suspiciousMetadata.length > 0) {
      analysisResult.recommendations.push(...metadataAnalysis.recommendations);
      analysisResult.fraudIndicators.push({
        type: 'suspicious_formatting' as any,
        severity: 'medium',
        description: 'Suspicious document metadata detected',
        matches: metadataAnalysis.suspiciousMetadata,
        pattern: 'metadata_analysis',
        guidance: 'Document metadata shows signs of possible manipulation'
      });
    }

    // Add AI insights to recommendations
    if (aiAnalysis && aiAnalysis.insights) {
      analysisResult.recommendations.push(...aiAnalysis.insights);
    }

    // Store all analyzed documents securely in Google Cloud Storage
    let secureFileMetadata: SecureFileMetadata | null = null;
    try {
      secureFileMetadata = await storeFileSecurely(
        fileBuffer,
        file.name,
        mimeType,
        userId || 'anonymous',
        reportId
      );
      console.log(`Document stored securely in GCS: ${secureFileMetadata.id}`);
      
      // Add storage info to analysis result
      analysisResult.metadata = {
        ...analysisResult.metadata,
        storedSecurely: true,
        storageId: secureFileMetadata.id,
        storagePath: secureFileMetadata.encryptedPath
      } as any;
      
    } catch (storageError) {
      console.error('Failed to store document securely:', storageError);
      // Don't fail the analysis if storage fails, but log it
      analysisResult.metadata = {
        ...analysisResult.metadata,
        storedSecurely: false,
        storageError: 'Failed to store in cloud storage'
      } as any;
    }

    // Log high-risk documents for regulatory reporting
    if (riskLevel === 'critical' || riskLevel === 'high') {
      await logSuspiciousDocument({
        reportId,
        documentType: textAnalysis.documentType,
        riskLevel,
        riskScore: textAnalysis.riskScore,
        fraudIndicators: textAnalysis.fraudIndicators,
        userId: userId || undefined,
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          fileType: mimeType,
          extractedTextLength: extractedText.length
        }
      });
    }

    const executionTime = Date.now() - startTime;
    const responseData: DocumentAnalysisResponse = {
      success: true,
      reportId,
      analysis: analysisResult,
      processingTime: executionTime,
      message: generateSummaryMessage(analysisResult),
      sebiUrls: {
        verifyRegistration: 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes',
        reportFraud: 'https://scores.sebi.gov.in/',
        helpline: '1800-266-7575'
      }
    };

    // Log the analysis query
    await logAnalysisQuery({
      agentType: 'document-analyzer',
      query: `File: ${file.name} (${mimeType})`,
      response: JSON.stringify({
        riskLevel: analysisResult.riskLevel,
        riskScore: analysisResult.riskScore,
        documentType: analysisResult.documentType,
        fraudIndicators: analysisResult.fraudIndicators.length
      }),
      success: true,
      executionTime,
      userId: userId || undefined,
      userAgent,
      ipAddress: userIP,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        fileType: mimeType
      }
    });

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Document analysis error:', error);
    
    // Log error if we have a reportId
    if (reportId) {
      const executionTime = Date.now() - startTime;
      try {
        const { userId } = await auth();
        const userAgent = request.headers.get('user-agent') || 'Unknown';
        const userIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
        
        await logAnalysisQuery({
          agentType: 'document-analyzer',
          query: 'Error occurred during document analysis',
          response: JSON.stringify({ error: 'Failed to analyze document' }),
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
        error: 'Failed to analyze document. Please try again or contact support.',
        code: 'ANALYSIS_FAILED'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Extract text from PDF document
 */
async function extractTextFromPDF(buffer: Buffer): Promise<{
  text: string;
  metadata: DocumentMetadata;
}> {
  try {
    const data = await pdfParse(buffer);
    
    const metadata: DocumentMetadata = {
      fileType: 'application/pdf',
      fileSize: buffer.length,
      pageCount: data.numpages,
      creationDate: data.info?.CreationDate ? new Date(data.info.CreationDate) : undefined,
      modificationDate: data.info?.ModDate ? new Date(data.info.ModDate) : undefined,
      author: data.info?.Author || undefined,
      creator: data.info?.Creator || undefined,
      producer: data.info?.Producer || undefined,
      title: data.info?.Title || undefined,
      hasImages: false, // Would need additional parsing to detect images
      hasEmbeddedFonts: false, // Would need additional parsing
      isScanned: data.text.length < 100 && data.numpages > 0 // Heuristic for scanned documents
    };

    return {
      text: data.text,
      metadata
    };
  } catch (error) {
    throw new Error(`Failed to extract text from PDF: ${error}`);
  }
}

/**
 * Extract text from image using OCR
 */
async function extractTextFromImage(buffer: Buffer): Promise<{
  text: string;
  metadata: DocumentMetadata;
}> {
  try {
    // Optimize image for OCR
    const optimizedBuffer = await sharp(buffer)
      .resize(2000, 2000, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .grayscale()
      .normalize()
      .sharpen()
      .png()
      .toBuffer();

    // Perform OCR
    const worker = await createWorker('eng');
    
    const { data: { text, confidence } } = await worker.recognize(optimizedBuffer);
    await worker.terminate();

    if (confidence < 50) {
      console.warn(`Low OCR confidence: ${confidence}%`);
    }

    const metadata: DocumentMetadata = {
      fileType: 'image',
      fileSize: buffer.length,
      pageCount: 1,
      creationDate: new Date(),
      hasImages: true,
      isScanned: true
    };

    return {
      text: text.trim(),
      metadata
    };
  } catch (error) {
    throw new Error(`Failed to extract text from image: ${error}`);
  }
}

/**
 * Perform AI analysis for additional insights
 */
async function performAIAnalysis(text: string, documentType: string) {
  try {
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL_NAME! });
    
    const prompt = `
      As a SEBI fraud detection expert, analyze this document for additional suspicious patterns:
      
      Document Type: ${documentType}
      Document Text: ${text.substring(0, 3000)}
      
      Provide analysis in JSON format with:
      - additionalRisks (array of any risks not caught by rules)
      - sophisticationLevel (how sophisticated the fraud attempt is)
      - targetAudience (who this document seems to target)
      - psychologyTactics (manipulation techniques used)
      - insights (array of actionable insights)
      - genuineProbability (0-100, how likely this is a genuine document)
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();
    
    try {
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.warn('Failed to parse AI analysis JSON:', e);
    }

    return null;
  } catch (error) {
    console.warn('AI analysis failed:', error);
    return null;
  }
}

/**
 * Calculate confidence score based on analysis quality
 */
function calculateConfidence(fraudIndicators: FraudIndicator[], textLength: number): number {
  let confidence = 70; // Base confidence

  // More text generally means more reliable analysis
  if (textLength > 1000) confidence += 20;
  else if (textLength > 500) confidence += 10;
  else if (textLength < 200) confidence -= 20;

  // Multiple indicators increase confidence
  if (fraudIndicators.length > 3) confidence += 10;
  else if (fraudIndicators.length === 0) confidence -= 10;

  // Critical indicators are usually very clear
  const criticalIndicators = fraudIndicators.filter(i => i.severity === 'critical');
  if (criticalIndicators.length > 0) confidence += 15;

  return Math.min(100, Math.max(30, confidence));
}

/**
 * Generate summary message for the analysis
 */
function generateSummaryMessage(result: DocumentAnalysisResult): string {
  const emoji = {
    critical: '🚨',
    high: '⚠️',
    medium: '⚡',
    low: '✅'
  }[result.riskLevel];

  const riskMessages = {
    critical: 'CRITICAL RISK DETECTED',
    high: 'HIGH RISK DETECTED',
    medium: 'MEDIUM RISK DETECTED',
    low: 'LOW RISK - Document appears relatively safe'
  };

  let message = `${emoji} ${riskMessages[result.riskLevel]}`;

  if (result.fraudIndicators.length > 0) {
    message += ` | Found ${result.fraudIndicators.length} suspicious pattern(s)`;
  }

  if (result.sebiVerification?.suspiciousSebiClaims.length) {
    message += ` | SEBI-related concerns detected`;
  }

  if (result.riskLevel === 'critical') {
    message += ` | DO NOT PROCEED - Report to SEBI`;
  } else if (result.riskLevel === 'high') {
    message += ` | Exercise extreme caution`;
  }

  return message;
}

/**
 * Log suspicious documents for regulatory reporting
 */
async function logSuspiciousDocument(data: {
  reportId: string;
  documentType: string;
  riskLevel: string;
  riskScore: number;
  fraudIndicators: FraudIndicator[];
  userId?: string;
  metadata: any;
}) {
  try {
    await prisma.fraudReport.create({
      data: {
        reportId: data.reportId,
        entityName: `Document Analysis - ${data.documentType}`,
        fraudType: 'suspicious_document',
        riskScore: data.riskScore,
        evidence: {
          documentType: data.documentType,
          riskLevel: data.riskLevel,
          fraudIndicators: data.fraudIndicators.map(i => ({
            type: i.type,
            severity: i.severity,
            description: i.description,
            matches: i.matches
          })),
          metadata: data.metadata,
          analysisTimestamp: new Date().toISOString()
        },
        reportedBy: data.userId,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Failed to log suspicious document:', error);
  }
}

/**
 * Log analysis queries for monitoring and analytics
 */
async function logAnalysisQuery(data: {
  agentType: string;
  query: string;
  response: string;
  success: boolean;
  executionTime: number;
  userId?: string;
  userAgent: string;
  ipAddress: string;
  metadata?: any;
  error?: string;
}) {
  try {
    await prisma.agentQuery.create({
      data: {
        agentType: data.agentType,
        query: data.query,
        response: data.response,
        success: data.success,
        executionTime: data.executionTime,
        userId: data.userId,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
        metadata: data.metadata,
        error: data.error
      }
    });
  } catch (error) {
    console.error('Failed to log analysis query:', error);
  }
}

/**
 * Generate unique report ID
 */
function generateReportId(): string {
  return `GC-DA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
