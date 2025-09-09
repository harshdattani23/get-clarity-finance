import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { storeFileSecurely } from '@/lib/secureStorage';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Video configuration
const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo', // .avi
  'video/x-ms-wmv',  // .wmv
  'video/3gpp',      // .3gp
  'video/x-flv',     // .flv
  'video/x-matroska' // .mkv
];

const ALLOWED_VIDEO_EXTENSIONS = [
  '.mp4', '.webm', '.mov', '.avi', '.wmv', '.3gp', '.flv', '.mkv'
];

interface VideoMetadata {
  originalName: string;
  size: number;
  mimeType: string;
  duration?: number;
  dimensions?: {
    width: number;
    height: number;
  };
  bitrate?: number;
  frameRate?: number;
  codec?: string;
}

interface VideoUploadResponse {
  success: boolean;
  videoId: string;
  fileId: string;
  metadata: VideoMetadata;
  uploadUrl?: string;
  analysisId?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Authentication check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Get user info
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const userIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';

    console.log('📹 Video Upload Request:', {
      userId,
      userAgent: userAgent.substring(0, 100),
      userIP,
      timestamp: new Date().toISOString()
    });

    // Parse multipart form data
    const formData = await request.formData();
    const videoFile = formData.get('video') as File;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string;
    const analysisType = formData.get('analysisType') as string || 'comprehensive';

    if (!videoFile) {
      return NextResponse.json(
        { error: 'No video file provided', code: 'NO_FILE' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_VIDEO_TYPES.includes(videoFile.type)) {
      const allowedExts = ALLOWED_VIDEO_EXTENSIONS.join(', ');
      return NextResponse.json(
        { 
          error: `Invalid video format. Allowed formats: ${allowedExts}`,
          code: 'INVALID_FORMAT',
          allowedFormats: ALLOWED_VIDEO_EXTENSIONS
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (videoFile.size > MAX_VIDEO_SIZE) {
      const maxSizeMB = Math.round(MAX_VIDEO_SIZE / (1024 * 1024));
      return NextResponse.json(
        { 
          error: `Video file too large. Maximum size: ${maxSizeMB}MB`,
          code: 'FILE_TOO_LARGE',
          maxSize: maxSizeMB,
          receivedSize: Math.round(videoFile.size / (1024 * 1024))
        },
        { status: 400 }
      );
    }

    // Validate filename
    const fileName = videoFile.name;
    const fileExtension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    if (!ALLOWED_VIDEO_EXTENSIONS.includes(fileExtension)) {
      return NextResponse.json(
        { 
          error: `Invalid file extension: ${fileExtension}`,
          code: 'INVALID_EXTENSION'
        },
        { status: 400 }
      );
    }

    console.log('✅ Video validation passed:', {
      fileName: videoFile.name,
      size: `${Math.round(videoFile.size / (1024 * 1024))}MB`,
      type: videoFile.type,
      extension: fileExtension
    });

    // Convert file to buffer
    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());

    // Extract basic metadata
    const videoMetadata: VideoMetadata = {
      originalName: videoFile.name,
      size: videoFile.size,
      mimeType: videoFile.type
    };

    // Generate unique video ID
    const videoId = `video_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;

    console.log('📤 Uploading video to secure storage...', { videoId });

    // Store video securely in Google Cloud Storage
    const fileMetadata = await storeFileSecurely(
      videoBuffer,
      videoFile.name,
      videoFile.type,
      userId,
      undefined // No analysisReportId yet, will be updated after analysis
    );

    console.log('✅ Video stored securely:', {
      fileId: fileMetadata.id,
      encryptedPath: fileMetadata.encryptedPath,
      size: fileMetadata.fileSize
    });

    // Create video record in database
    const videoRecord = await prisma.videoUpload.create({
      data: {
        id: videoId,
        fileId: fileMetadata.id,
        originalName: videoFile.name,
        fileSize: videoFile.size,
        mimeType: videoFile.type,
        uploadedBy: userId,
        uploadedAt: new Date(),
        description: description || null,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        analysisType,
        status: 'UPLOADED',
        metadata: videoMetadata as any,
        userAgent,
        ipAddress: userIP
      }
    });

    console.log('📊 Video record created in database:', {
      videoId: videoRecord.id,
      status: videoRecord.status
    });

    const uploadTime = Date.now() - startTime;
    const response: VideoUploadResponse = {
      success: true,
      videoId: videoRecord.id,
      fileId: fileMetadata.id,
      metadata: videoMetadata,
      message: `Video "${videoFile.name}" uploaded successfully. Ready for analysis.`,
    };

    console.log('🎉 Video upload completed:', {
      videoId,
      uploadTime: `${uploadTime}ms`,
      fileSize: `${Math.round(videoFile.size / (1024 * 1024))}MB`
    });

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('💥 Video upload error:', error);

    const uploadTime = Date.now() - startTime;
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to upload video',
        details: error instanceof Error ? error.message : 'Unknown error',
        code: 'UPLOAD_FAILED',
        timestamp: new Date().toISOString(),
        uploadTime: `${uploadTime}ms`
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve video info
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
    const videoId = url.searchParams.get('videoId');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    if (videoId) {
      // Get specific video
      const video = await prisma.videoUpload.findFirst({
        where: {
          id: videoId,
          uploadedBy: userId
        },
        include: {
          analyses: {
            orderBy: { startedAt: 'desc' },
            take: 5
          }
        }
      });

      if (!video) {
        return NextResponse.json(
          { error: 'Video not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ video });
    } else {
      // Get user's videos
      const videos = await prisma.videoUpload.findMany({
        where: {
          uploadedBy: userId
        },
        orderBy: { uploadedAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          analyses: {
            orderBy: { startedAt: 'desc' },
            take: 1 // Just the latest analysis
          }
        }
      });

      const total = await prisma.videoUpload.count({
        where: { uploadedBy: userId }
      });

      return NextResponse.json({
        videos,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      });
    }

  } catch (error) {
    console.error('Error retrieving videos:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve videos' },
      { status: 500 }
    );
  }
}
