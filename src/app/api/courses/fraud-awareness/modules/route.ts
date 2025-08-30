import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { CourseDifficulty, ProgressStatus } from '@prisma/client';

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
    return new NextResponse('Internal Error', { status: 500 });
  }
}