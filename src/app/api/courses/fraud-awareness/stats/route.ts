import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

// Define a simple level calculation: level up every 500 XP
const calculateLevel = (xp: number) => {
  return Math.floor(xp / 500) + 1;
};

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // The slug for the fraud awareness course
    const courseSlug = 'fraud-awareness-course';

    // 1. Find the course to get its ID and module count
    const courseData = await db.course.findUnique({
      where: { slug: courseSlug },
      include: {
        _count: {
          select: { CourseModule: true },
        },
      },
    });

    if (!courseData) {
      return new NextResponse('Course not found', { status: 404 });
    }

    // 2. Find the user's enrollment record for this course
    const enrollmentData = await db.courseEnrollment.findUnique({
      where: {
        userClerkId_courseId: {
          userClerkId: userId,
          courseId: courseData.id,
        },
      },
    });

    // 3. Prepare the data for the response
    const totalXP = enrollmentData?.totalXpEarned ?? 0;
    const userLevel = calculateLevel(totalXP);
    const totalModules = courseData._count.CourseModule;
    const totalTime = courseData.estimatedHours;

    return NextResponse.json({
      userLevel,
      totalXP,
      totalModules,
      totalTime,
    });
  } catch (error) {
    console.error('[COURSE_STATS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
