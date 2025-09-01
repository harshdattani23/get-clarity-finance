import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface CourseCompletionRequest {
  courseId: string;
  courseName: string;
  totalXP: number;
  completedModules: {
    id: string;
    title: string;
    xpEarned: number;
    completedAt: string;
  }[];
}

export async function POST(request: NextRequest) {
  try {
    const body: CourseCompletionRequest = await request.json();
    const { courseId, courseName, totalXP, completedModules } = body;

    // Get user info from session/auth
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session-token');
    
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // For now, we'll use mock user data since auth isn't fully implemented
    const mockUser = {
      id: 'user_123',
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    // Generate unique certificate ID
    const certificateId = `CERT-${courseId.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // In a real app, you would:
    // 1. Verify user authentication
    // 2. Validate course completion in database
    // 3. Store certificate record in database
    // 4. Send completion notification

    const certificateData = {
      id: certificateId,
      userId: mockUser.id,
      userName: mockUser.name,
      userEmail: mockUser.email,
      courseId,
      courseName,
      totalXP,
      moduleCount: completedModules.length,
      completedModules,
      completionDate: new Date().toISOString(),
      issuedAt: new Date().toISOString(),
      verificationUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sebiverify.com'}/certificates/${certificateId}`
    };

    // TODO: Store in database
    
    return NextResponse.json({
      success: true,
      certificate: certificateData,
      message: 'Course completed successfully! Certificate generated.'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to complete course' },
      { status: 500 }
    );
  }
}

// GET endpoint to verify/retrieve certificate
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const certificateId = searchParams.get('id');

    if (!certificateId) {
      return NextResponse.json(
        { error: 'Certificate ID required' },
        { status: 400 }
      );
    }

    // TODO: Retrieve from database
    // For now, return mock verification data
    const mockCertificate = {
      id: certificateId,
      valid: true,
      userName: 'John Doe',
      courseName: 'Fraud Awareness Course',
      completionDate: new Date().toISOString(),
      verifiedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      certificate: mockCertificate,
      verified: true
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify certificate' },
      { status: 500 }
    );
  }
}
