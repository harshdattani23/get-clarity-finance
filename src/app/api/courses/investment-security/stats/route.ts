import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { randomUUID } from 'crypto';

// Define a simple level calculation: level up every 500 XP
const calculateLevel = (xp: number) => {
  return Math.floor(xp / 500) + 1;
};

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Try both old and new course slugs for backward compatibility
    const courseSlugs = ['investment-security-course', 'fraud-awareness-course'];
    let courseData = null;

    for (const courseSlug of courseSlugs) {
      courseData = await db.course.findUnique({
        where: { slug: courseSlug },
        include: {
          _count: {
            select: { CourseModule: true },
          },
        },
      });
      if (courseData) break;
    }

    // If no course found in database, return demo/default data
    if (!courseData) {
      console.log('Course not found in database, returning demo data');
      
      // Check localStorage-style progress from complete-module endpoint
      try {
        const progressResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/courses/investment-security/complete-module`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${userId}`,
            },
          }
        );
        
        if (progressResponse.ok) {
          const { userProgress } = await progressResponse.json();
          
          // Calculate XP based on completed modules
          let totalXP = 0;
          const moduleXPValues = {
            'intro-to-frauds': 100,
            'intermediate-frauds': 200,
            'ponzi-schemes': 150,
            'pump-dump': 150,
            'fake-advisors': 150,
            'insider-trading': 200,
            'digital-frauds': 150
          };
          
          for (const [moduleId, progress] of Object.entries(userProgress)) {
            if ((progress as any)?.completed) {
              totalXP += moduleXPValues[moduleId as keyof typeof moduleXPValues] || 100;
            }
          }
          
          const userLevel = calculateLevel(totalXP);
          
          return NextResponse.json({
            userLevel,
            totalXP,
            totalModules: 7,
            totalTime: 6,
            courseStatus: totalXP > 0 ? 'ENROLLED' : 'NOT_ENROLLED',
          });
        }
      } catch (progressError) {
        console.log('Could not fetch progress data:', progressError);
      }
      
      // Ultimate fallback - return basic enrolled status so user can start
      return NextResponse.json({
        userLevel: 1,
        totalXP: 0,
        totalModules: 7,
        totalTime: 6,
        courseStatus: 'ENROLLED', // Auto-enroll for demo
      });
    }

    // 2. Find the user's enrollment record for this course
    const enrollmentData = await db.courseEnrollment.findUnique({
      where: {
        userClerkId_courseId: {
          userClerkId: userId,
          courseId: courseData.id,
        },
      },
      select: {
        totalXpEarned: true,
        status: true,
      },
    });

    // Auto-enroll user if not enrolled
    if (!enrollmentData) {
      try {
        await db.courseEnrollment.create({
          data: {
            id: randomUUID(),
            userClerkId: userId,
            courseId: courseData.id,
            totalXpEarned: 0,
            status: 'ENROLLED',
          },
        });
        console.log(`Auto-enrolled user ${userId} in course ${courseData.slug}`);
      } catch (enrollError) {
        console.log('Could not auto-enroll user, continuing with demo data');
      }
    }

    // 3. Prepare the data for the response
    const totalXP = enrollmentData?.totalXpEarned ?? 0;
    const userLevel = calculateLevel(totalXP);
    const totalModules = courseData._count.CourseModule || 7;
    const totalTime = courseData.estimatedHours || 6;
    const courseStatus = enrollmentData?.status ?? 'ENROLLED';

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
    return NextResponse.json({
      userLevel: 1,
      totalXP: 0,
      totalModules: 7,
      totalTime: 6,
      courseStatus: 'ENROLLED',
    });
  }
}
