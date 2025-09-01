import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Debug: Checking database for user:', userId);

    // Query all CourseProgress records for this user
    const courseProgressRecords = await prisma.courseProgress.findMany({
      where: {
        userClerkId: userId,
      },
    });

    console.log('CourseProgress records found:', courseProgressRecords);

    // Also try to check CourseEnrollment and LessonProgress if they exist
    let enrollmentRecords: unknown[] = [];
    const lessonProgressRecords: unknown[] = [];

    try {
      enrollmentRecords = await prisma.courseEnrollment.findMany({
        where: {
          userClerkId: userId,
        },
      });
      console.log('CourseEnrollment records found:', enrollmentRecords);
    } catch (enrollmentError) {
      console.log('No CourseEnrollment records or table not accessible');
    }

    try {
      // Get lesson progress via enrollment
      if (enrollmentRecords.length > 0) {
        for (const enrollment of enrollmentRecords) {
          // Type assertion for the enrollment record
          const enrollmentRecord = enrollment as { id: string };
          const lessonProgress = await prisma.lessonProgress.findMany({
            where: {
              enrollmentId: enrollmentRecord.id,
            },
          });
          lessonProgressRecords.push(...lessonProgress);
        }
      }
      console.log('LessonProgress records found:', lessonProgressRecords);
    } catch (lessonError) {
      console.log('No LessonProgress records or error accessing them');
    }

    return NextResponse.json({
      userId: userId,
      courseProgress: courseProgressRecords,
      courseEnrollment: enrollmentRecords,
      lessonProgress: lessonProgressRecords,
      summary: {
        totalCourseProgressRecords: courseProgressRecords.length,
        totalEnrollmentRecords: enrollmentRecords.length,
        totalLessonProgressRecords: lessonProgressRecords.length,
      }
    });

  } catch (error) {
    console.error('Database debug error:', error);
    return NextResponse.json({
      error: 'Database query failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
