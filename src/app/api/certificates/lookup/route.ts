import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId') || 'fraud-awareness-course';
    const moduleId = searchParams.get('moduleId') || 'intro-to-frauds';

    const certificate = await db.certificate.findUnique({
      where: {
        userClerkId_courseId_moduleId: {
          userClerkId: userId,
          courseId: courseId,
          moduleId: moduleId
        }
      }
    });

    if (certificate) {
      return NextResponse.json({
        success: true,
        exists: true,
        certificate: certificate,
        publicUrl: certificate.publicUrl
      });
    } else {
      return NextResponse.json({
        success: true,
        exists: false,
        certificate: null,
        publicUrl: null
      });
    }

  } catch (error) {
    console.error('[CERTIFICATES_LOOKUP]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
