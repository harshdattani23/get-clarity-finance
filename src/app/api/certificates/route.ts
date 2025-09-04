import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      userClerkId,
      courseId,
      moduleId,
      courseName,
      userName,
      totalXP,
      moduleCount,
      completedModules,
      completionDate
    } = body;

    // Verify user matches authenticated user
    if (userClerkId !== userId) {
      return NextResponse.json(
        { error: 'User mismatch' },
        { status: 403 }
      );
    }

    // Check if certificate already exists
    const existingCert = await db.certificate.findUnique({
      where: {
        userClerkId_courseId_moduleId: {
          userClerkId: userId,
          courseId: courseId || 'fraud-awareness-course',
          moduleId: moduleId || 'intro-to-frauds'
        }
      }
    });

    if (existingCert) {
      console.log('Certificate already exists, returning existing certificate:', existingCert.id);
      return NextResponse.json({
        success: true,
        certificate: existingCert,
        publicUrl: existingCert.publicUrl,
        message: 'Certificate already exists'
      });
    }

    // Get user's actual total XP from their course enrollments
    let actualTotalXP = totalXP || 0;
    try {
      const enrollments = await db.courseEnrollment.findMany({
        where: { userClerkId: userId },
        select: { totalXpEarned: true }
      });
      const calculatedTotalXP = enrollments.reduce((sum, enrollment) => sum + enrollment.totalXpEarned, 0);
      if (calculatedTotalXP > 0) {
        actualTotalXP = calculatedTotalXP;
      }
    } catch (error) {
      console.log('Could not fetch user total XP, using provided value:', error);
    }

    // Create new certificate
    const certificate = await db.certificate.create({
      data: {
        userClerkId: userId,
        courseId: courseId || 'fraud-awareness-course',
        moduleId: moduleId || 'intro-to-frauds',
        courseName,
        userName,
        totalXP: actualTotalXP,
        moduleCount: moduleCount || 1,
        completionDate: new Date(completionDate),
        certificateData: {
          completedModules,
          courseName,
          moduleCount,
          totalXP: actualTotalXP
        },
        publicUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/certificates/${Math.random().toString(36).substring(2, 15)}`
      }
    });

    console.log('Created new certificate:', certificate.id);

    return NextResponse.json({
      success: true,
      certificate: certificate,
      publicUrl: certificate.publicUrl,
      message: 'Certificate created successfully'
    });

  } catch (error) {
    console.error('[CERTIFICATES_POST]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
