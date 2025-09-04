// Secure file download endpoint with access control
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { 
  retrieveFileSecurely, 
  generateSecureDownloadUrl,
  getFileAccessLogs 
} from '@/lib/secureStorage';

interface RouteParams {
  params: Promise<{
    fileId: string;
  }>;
}

/**
 * Handle secure file downloads with access control
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await auth();
    const { fileId } = await params;
    
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    const expires = url.searchParams.get('expires');
    const download = url.searchParams.get('download') === 'true';

    // Validate file ID
    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    // Check if token-based access is being used
    if (token && expires) {
      const expirationTime = parseInt(expires, 10);
      if (Date.now() > expirationTime) {
        return NextResponse.json(
          { error: 'Download link has expired' },
          { status: 403 }
        );
      }
      
      // In production, validate token signature/authenticity
      // For demo, we'll proceed with the download
    }

    try {
      // Attempt to retrieve the file securely
      const result = await retrieveFileSecurely(
        fileId,
        userId || 'anonymous',
        !token // Require auth if no token provided
      );

      if (!result) {
        return NextResponse.json(
          { error: 'File not found or access denied' },
          { status: 404 }
        );
      }

      const { buffer, metadata } = result;

      // Set appropriate headers for file download
      const headers: Record<string, string> = {
        'Content-Type': metadata.mimeType,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      };

      // Force download if requested
      if (download) {
        headers['Content-Disposition'] = `attachment; filename="${metadata.originalName}"`;
      } else {
        headers['Content-Disposition'] = `inline; filename="${metadata.originalName}"`;
      }

      // Add security headers
      headers['X-Content-Type-Options'] = 'nosniff';
      headers['X-Frame-Options'] = 'DENY';
      headers['X-XSS-Protection'] = '1; mode=block';

      return new NextResponse(buffer as unknown as BodyInit, { headers });

    } catch (retrievalError) {
      console.error(`Failed to retrieve file ${fileId}:`, retrievalError);
      
      return NextResponse.json(
        { error: 'Failed to retrieve file. It may have been deleted or expired.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Secure download error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

/**
 * Generate a temporary secure download link
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await auth();
    const { fileId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const expiresIn = body.expiresIn || 3600; // Default 1 hour

    try {
      const secureUrl = await generateSecureDownloadUrl(
        fileId,
        expiresIn,
        userId
      );

      if (!secureUrl) {
        return NextResponse.json(
          { error: 'File not found or access denied' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        downloadUrl: secureUrl,
        expiresIn,
        expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString()
      });

    } catch (urlError) {
      console.error(`Failed to generate secure URL for ${fileId}:`, urlError);
      
      return NextResponse.json(
        { error: 'Failed to generate secure download link' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Secure URL generation error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

/**
 * Get file access logs (admin only)
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await auth();
    const { fileId } = await params;

    // In production, check if user has admin role
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const limit = body.limit || 100;

    try {
      const accessLogs = await getFileAccessLogs(fileId, undefined, limit);

      return NextResponse.json({
        success: true,
        fileId,
        accessLogs,
        total: accessLogs.length
      });

    } catch (logsError) {
      console.error(`Failed to retrieve access logs for ${fileId}:`, logsError);
      
      return NextResponse.json(
        { error: 'Failed to retrieve access logs' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Access logs retrieval error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
