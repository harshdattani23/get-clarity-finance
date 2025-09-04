import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { randomUUID } from 'crypto';

// Define a simple level calculation: level up every 500 XP
const calculateLevel = (xp: number) => {
  return Math.floor(xp / 500) + 1;
};

// Cache XP values as constants for better performance
const MODULE_XP_VALUES = {
  'intro-to-frauds': 100,
  'intermediate-frauds': 200,
  'ponzi-schemes': 150,
  'pump-dump': 150,
  'fake-advisors': 150,
  'insider-trading': 200,
  'digital-frauds': 150
} as const;

const COURSE_SLUGS = ['investment-security-course', 'fraud-awareness-course'];
const DEFAULT_STATS = {
  userLevel: 1,
  totalXP: 0,
  totalModules: 7,
  totalTime: 6,
  courseStatus: 'ENROLLED' as const,
};

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Try both course slugs in a single query for better performance
    const courseData = await db.course.findFirst({
      where: {
        slug: {
          in: COURSE_SLUGS,
        },
      },
      include: {
        _count: {
          select: { CourseModule: true },
        },
        CourseEnrollment: {
          where: {
            userClerkId: userId,
          },
          select: {
            totalXpEarned: true,
            status: true,
          },
        },
      },
    });

    // If no course found in database, calculate from localStorage-style progress
    if (!courseData) {
      console.log('Course not found in database, checking localStorage progress');
      
      // Get progress data directly from localStorage storage without nested API calls
      try {
        const progressKey = `investment_security_progress_${userId}`;
        const unlockedKey = `investment_security_unlocked_${userId}`;
        
        // In a real implementation, you might want to check a Redis cache or similar
        // For now, return basic enrolled status for demo
        return NextResponse.json(DEFAULT_STATS);
      } catch (progressError) {
        console.log('Could not fetch progress data:', progressError);
        return NextResponse.json(DEFAULT_STATS);
      }
    }

    // Get enrollment data (already included in the course query)
    const enrollmentData = courseData.CourseEnrollment[0];

    // Auto-enroll user if not enrolled (async without blocking response)
    if (!enrollmentData) {
      // Don't wait for enrollment - do it asynchronously
      db.courseEnrollment.create({
        data: {
          id: randomUUID(),
          userClerkId: userId,
          courseId: courseData.id,
          totalXpEarned: 0,
          status: 'ENROLLED',
        },
      }).then(() => {
        console.log(`Auto-enrolled user ${userId} in course ${courseData.slug}`);
      }).catch((enrollError) => {
        console.log('Could not auto-enroll user:', enrollError);
      });
    }

    // Check legacy course progress for completed modules (optimized query)
    const legacyXP = await db.courseProgress.findMany({
      where: {
        userClerkId: userId,
        status: 'COMPLETED',
        OR: [
          { courseId: 'fraud-awareness-course', lessonId: 'intro-to-frauds' },
          { courseId: { startsWith: 'intro-to-frauds-' } },
        ],
      },
      select: {
        courseId: true,
        lessonId: true,
      },
    }).then(progress => {
      let xp = 0;
      const introCompleted = progress.some(p => 
        p.courseId === 'fraud-awareness-course' && p.lessonId === 'intro-to-frauds'
      );
      if (introCompleted) {
        xp += 100; // Base XP for intro module
        // Add additional XP for activities
        const activityCount = progress.filter(p => 
          p.courseId.startsWith('intro-to-frauds-')
        ).length;
        xp += activityCount * 15; // 15 XP per activity
      }
      return xp;
    });

    // 3. Prepare the data for the response
    const enrollmentXP = enrollmentData?.totalXpEarned ?? 0;
    const totalXP = enrollmentXP + legacyXP;
    const userLevel = calculateLevel(totalXP);
    const totalModules = courseData._count.CourseModule || DEFAULT_STATS.totalModules;
    const totalTime = courseData.estimatedHours || DEFAULT_STATS.totalTime;
    const courseStatus = enrollmentData?.status ?? DEFAULT_STATS.courseStatus;

    return NextResponse.json({
      userLevel,
      totalXP,
      totalModules,
      totalTime,
      courseStatus,
    });
  } catch (error) {
    console.error('[COURSE_STATS_GET]', error);
    
    // Fallback to demo data even on error
    return NextResponse.json(DEFAULT_STATS);
  }
}
