import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { CourseDifficulty, ProgressStatus } from '@prisma/client';

// Mock storage for demo purposes when database is not available
const mockModuleProgress: Record<string, number> = {};

// Override storage to unlock all modules
const unlockOverride: Record<string, boolean> = {};

// Cache constants for better performance
const COURSE_SLUGS = ['investment-security-course', 'fraud-awareness-course'];
const MOCK_MODULES = [
  {
    id: 'intro-to-frauds',
    slug: 'intro-to-frauds',
    title: 'Introduction to Investment Frauds',
    difficulty: 'BEGINNER' as const,
    order: 1,
    locked: false,
    progress: 0
  },
  {
    id: 'intermediate-frauds',
    slug: 'intermediate-frauds',
    title: 'Intermediate Fraud Schemes',
    difficulty: 'INTERMEDIATE' as const,
    order: 2,
    locked: false,
    progress: 0
  },
  {
    id: 'ponzi-schemes', 
    slug: 'ponzi-schemes',
    title: 'Ponzi Schemes',
    difficulty: 'INTERMEDIATE' as const,
    order: 3,
    locked: false,
    progress: 0
  },
  {
    id: 'pump-dump',
    slug: 'pump-dump',
    title: 'Pump & Dump Schemes',
    difficulty: 'INTERMEDIATE' as const,
    order: 4,
    locked: false,
    progress: 0
  },
  {
    id: 'fake-advisors',
    slug: 'fake-advisors',
    title: 'Fake Investment Advisors',
    difficulty: 'INTERMEDIATE' as const,
    order: 5,
    locked: false,
    progress: 0
  },
  {
    id: 'insider-trading',
    slug: 'insider-trading',
    title: 'Insider Trading & Market Manipulation',
    difficulty: 'ADVANCED' as const,
    order: 6,
    locked: false, 
    progress: 0
  },
  {
    id: 'digital-frauds',
    slug: 'digital-frauds',
    title: 'Digital Investment Frauds',
    difficulty: 'INTERMEDIATE' as const,
    order: 7,
    locked: false,
    progress: 0
  }
] as const;

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Single optimized query for course with all required data
    const course = await db.course.findFirst({
      where: {
        slug: {
          in: COURSE_SLUGS,
        },
      },
      include: {
        CourseModule: {
          include: {
            CourseLesson: {
              select: { id: true },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
        CourseEnrollment: {
          where: {
            userClerkId: userId,
          },
          include: {
            ModuleProgress: {
              select: {
                moduleId: true,
                status: true,
              },
            },
            LessonProgress: {
              where: { status: ProgressStatus.COMPLETED },
              select: { lessonId: true },
            },
          },
        },
      },
    });

    if (!course) {
      console.log('Course not found in database, returning mock data');
      return NextResponse.json(MOCK_MODULES);
    }

    // Use enrollment data already fetched with the course
    const userEnrollment = course.CourseEnrollment[0];

    const moduleProgressMap = new Map(
      userEnrollment?.ModuleProgress.map(p => [p.moduleId, p.status]) || []
    );

    const completedLessonIds = new Set(
      userEnrollment?.LessonProgress.map(lp => lp.lessonId) || []
    );

    // Check legacy course progress for intro-to-frauds completion (optimized query)
    const introToFraudsCompleted = await db.courseProgress.findFirst({
      where: {
        userClerkId: userId,
        courseId: 'fraud-awareness-course',
        lessonId: 'intro-to-frauds',
        status: 'COMPLETED'
      },
      select: { id: true }
    }).then(result => Boolean(result));

    const beginnerModules = course.CourseModule.filter(
      m => m.difficulty === CourseDifficulty.BEGINNER
    );
    const intermediateModules = course.CourseModule.filter(
      m => m.difficulty === CourseDifficulty.INTERMEDIATE
    );

    const allBeginnerCompleted = beginnerModules.every(
      m => moduleProgressMap.get(m.id) === ProgressStatus.COMPLETED
    ) || introToFraudsCompleted; // Include legacy progress check

    const allIntermediateCompleted = intermediateModules.every(
      m => moduleProgressMap.get(m.id) === ProgressStatus.COMPLETED
    );

    const processedModules = course.CourseModule.map(module => {
      // All modules are unlocked by default
      let locked = false;

      const totalLessons = module.CourseLesson.length;
      const completedLessons = module.CourseLesson.filter(l =>
        completedLessonIds.has(l.id)
      ).length;
      
      // Calculate progress, with special handling for intro-to-frauds
      let progress = 0;
      if (module.slug === 'intro-to-frauds' && introToFraudsCompleted) {
        progress = 100;
      } else {
        progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      }

      return {
        id: module.id,
        slug: module.slug,
        title: module.title,
        difficulty: module.difficulty,
        order: module.order,
        progress,
        locked,
      };
    });

    return NextResponse.json(processedModules);
  } catch (error) {
    console.error('[COURSE_MODULES_GET]', error);
    
    // Get userId for fallback case
    let fallbackUserId = '';
    try {
      const authResult = await auth();
      fallbackUserId = authResult.userId || '';
    } catch (e) {
      // Ignore auth errors in fallback
    }
    
    // Simple fallback without additional API calls for better performance
    const fallbackModules = MOCK_MODULES.map(module => ({
      ...module,
      progress: mockModuleProgress[module.slug] || 0,
      locked: false // All modules are unlocked by default
    }));
    
    return NextResponse.json(fallbackModules);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { moduleId, progress, unlockAll } = body;

    // Handle unlock all request
    if (unlockAll) {
      unlockOverride[userId] = true;
      console.log(`Unlock override enabled for user ${userId}`);
      return NextResponse.json({
        success: true,
        message: 'All modules unlocked successfully!',
        unlockOverride: true
      });
    }

    if (!moduleId || progress === undefined) {
      return NextResponse.json(
        { error: 'moduleId and progress are required' },
        { status: 400 }
      );
    }

    // For demo purposes, just update mock progress
    // In a real app, you would update the database here
    mockModuleProgress[moduleId] = progress;
    
    console.log(`Updated module ${moduleId} progress to ${progress}%`);

    return NextResponse.json({
      success: true,
      moduleId,
      progress,
      message: `Module ${moduleId} progress updated to ${progress}%`
    });

  } catch (error) {
    console.error('Failed to update module progress:', error);
    return NextResponse.json(
      { error: 'Failed to update module progress' },
      { status: 500 }
    );
  }
}
