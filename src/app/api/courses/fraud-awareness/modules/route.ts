import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { CourseDifficulty, ProgressStatus } from '@prisma/client';

// Mock storage for demo purposes when database is not available
const mockModuleProgress: Record<string, number> = {};

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const courseSlug = 'fraud-awareness-course';

    const course = await db.course.findUnique({
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
    const mockModules = [
      {
        id: 'intro-to-frauds',
        slug: 'intro-to-frauds',
        locked: false,
        progress: mockModuleProgress['intro-to-frauds'] || 0
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
        locked: false,
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
