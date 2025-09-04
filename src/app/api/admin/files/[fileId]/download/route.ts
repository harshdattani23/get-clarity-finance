import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { retrieveFileSecurely } from '@/lib/secureStorage';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { userId } = await auth();
    const { fileId } = await params;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify admin access
    const user = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!user.ok) {
      return NextResponse.json({ error: 'Failed to verify admin' }, { status: 403 });
    }

    const userData = await user.json();
    const userEmail = userData.email_addresses?.find((email: any) => email.id === userData.primary_email_address_id)?.email_address;

    if (userEmail !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Retrieve the file securely
    const fileResult = await retrieveFileSecurely(
      fileId,
      userId, // Admin user ID for logging
      false   // Admin doesn't need auth check
    );

    if (!fileResult) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const { buffer, metadata } = fileResult;

    // Set appropriate headers for file download
    const headers = new Headers();
    headers.set('Content-Type', metadata.mimeType);
    headers.set('Content-Length', buffer.length.toString());
    headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(metadata.originalName)}"`);
    
    // Add security headers
    headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('File download error:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}

// Preview endpoint (for PDFs, images, etc.)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { userId } = await auth();
    const { fileId } = await params;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify admin access (same as GET)
    const user = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!user.ok) {
      return NextResponse.json({ error: 'Failed to verify admin' }, { status: 403 });
    }

    const userData = await user.json();
    const userEmail = userData.email_addresses?.find((email: any) => email.id === userData.primary_email_address_id)?.email_address;

    if (userEmail !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Retrieve the file for preview
    const fileResult = await retrieveFileSecurely(
      fileId,
      userId,
      false
    );

    if (!fileResult) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const { buffer, metadata } = fileResult;

    // For preview, return inline content
    const headers = new Headers();
    headers.set('Content-Type', metadata.mimeType);
    headers.set('Content-Length', buffer.length.toString());
    headers.set('Content-Disposition', `inline; filename="${encodeURIComponent(metadata.originalName)}"`);
    
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('File preview error:', error);
    return NextResponse.json(
      { error: 'Failed to preview file' },
      { status: 500 }
    );
  }
}
