import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { CourseDifficulty, ProgressStatus } from '@prisma/client';

// Mock storage for demo purposes when database is not available
const mockModuleProgress: Record<string, number> = {};

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Try both old and new course slugs for backward compatibility
    const courseSlugs = ['investment-security-course', 'fraud-awareness-course'];
    let course = null;

    for (const courseSlug of courseSlugs) {
      course = await db.course.findUnique({
        where: { slug: courseSlug },
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
        },
      });
      if (course) break;
    }

    if (!course) {
      return new NextResponse('Course not found', { status: 404 });
    }

    const userEnrollment = await db.courseEnrollment.findUnique({
      where: { userClerkId_courseId: { userClerkId: userId, courseId: course.id } },
      include: {
        ModuleProgress: true,
        LessonProgress: {
          where: { status: ProgressStatus.COMPLETED },
          select: { lessonId: true },
        },
      },
    });

    const moduleProgressMap = new Map(
      userEnrollment?.ModuleProgress.map(p => [p.moduleId, p.status])
    );

    const completedLessonIds = new Set(
      userEnrollment?.LessonProgress.map(lp => lp.lessonId) || []
    );

    const beginnerModules = course.CourseModule.filter(
      m => m.difficulty === CourseDifficulty.BEGINNER
    );
    const intermediateModules = course.CourseModule.filter(
      m => m.difficulty === CourseDifficulty.INTERMEDIATE
    );

    const allBeginnerCompleted = beginnerModules.every(
      m => moduleProgressMap.get(m.id) === ProgressStatus.COMPLETED
    );

    const allIntermediateCompleted = intermediateModules.every(
      m => moduleProgressMap.get(m.id) === ProgressStatus.COMPLETED
    );

    const processedModules = course.CourseModule.map(module => {
      let locked = true;
      if (module.difficulty === CourseDifficulty.BEGINNER) {
        locked = false;
      } else if (
        module.difficulty === CourseDifficulty.INTERMEDIATE &&
        allBeginnerCompleted
      ) {
        locked = false;
      } else if (
        module.difficulty === CourseDifficulty.ADVANCED &&
        allBeginnerCompleted &&
        allIntermediateCompleted
      ) {
        locked = false;
      }

      const totalLessons = module.CourseLesson.length;
      const completedLessons = module.CourseLesson.filter(l =>
        completedLessonIds.has(l.id)
      ).length;
      const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

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
    
    // Fallback to mock data for demo purposes
    // Try to get module progress from our complete-module endpoint
    try {
      const progressResponse = await fetch(
        `${request.nextUrl.origin}/api/courses/investment-security/complete-module`,
        {
          headers: {
            cookie: request.headers.get('cookie') || '',
          },
        }
      );
      
      if (progressResponse.ok) {
        const { userProgress, unlockedModules } = await progressResponse.json();
        
        const mockModules = [
          {
            id: 'intro-to-frauds',
            slug: 'intro-to-frauds',
            locked: false,
            progress: userProgress['intro-to-frauds']?.progress || mockModuleProgress['intro-to-frauds'] || 0
          },
          {
            id: 'intermediate-frauds',
            slug: 'intermediate-frauds',
            locked: !unlockedModules['intermediate-frauds']?.unlocked,
            progress: userProgress['intermediate-frauds']?.progress || mockModuleProgress['intermediate-frauds'] || 0
          },
          {
            id: 'ponzi-schemes', 
            slug: 'ponzi-schemes',
            locked: !unlockedModules['ponzi-schemes']?.unlocked,
            progress: userProgress['ponzi-schemes']?.progress || mockModuleProgress['ponzi-schemes'] || 0
          },
          {
            id: 'pump-dump',
            slug: 'pump-dump', 
            locked: !unlockedModules['pump-dump']?.unlocked,
            progress: userProgress['pump-dump']?.progress || mockModuleProgress['pump-dump'] || 0
          },
          {
            id: 'insider-trading',
            slug: 'insider-trading',
            locked: !unlockedModules['insider-trading']?.unlocked, 
            progress: userProgress['insider-trading']?.progress || mockModuleProgress['insider-trading'] || 0
          },
          {
            id: 'fake-advisors',
            slug: 'fake-advisors',
            locked: !unlockedModules['fake-advisors']?.unlocked,
            progress: userProgress['fake-advisors']?.progress || mockModuleProgress['fake-advisors'] || 0
          },
          {
            id: 'digital-frauds',
            slug: 'digital-frauds',
            locked: !unlockedModules['digital-frauds']?.unlocked,
            progress: userProgress['digital-frauds']?.progress || mockModuleProgress['digital-frauds'] || 0
          }
        ];
        
        return NextResponse.json(mockModules);
      }
    } catch (progressError) {
      console.log('Could not fetch progress from complete-module endpoint:', progressError);
    }
    
    // Ultimate fallback
    const mockModules = [
      {
        id: 'intro-to-frauds',
        slug: 'intro-to-frauds',
        locked: false,
        progress: mockModuleProgress['intro-to-frauds'] || 0
      },
      {
        id: 'intermediate-frauds',
        slug: 'intermediate-frauds',
        locked: true,
        progress: mockModuleProgress['intermediate-frauds'] || 0
      },
      {
        id: 'ponzi-schemes', 
        slug: 'ponzi-schemes',
        locked: true,
        progress: mockModuleProgress['ponzi-schemes'] || 0
      },
      {
        id: 'pump-dump',
        slug: 'pump-dump', 
        locked: true,
        progress: mockModuleProgress['pump-dump'] || 0
      },
      {
        id: 'insider-trading',
        slug: 'insider-trading',
        locked: true, 
        progress: mockModuleProgress['insider-trading'] || 0
      },
      {
        id: 'fake-advisors',
        slug: 'fake-advisors',
        locked: true,
        progress: mockModuleProgress['fake-advisors'] || 0
      },
      {
        id: 'digital-frauds',
        slug: 'digital-frauds',
        locked: true,
        progress: mockModuleProgress['digital-frauds'] || 0
      }
    ];
    
    return NextResponse.json(mockModules);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { moduleId, progress } = body;

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
