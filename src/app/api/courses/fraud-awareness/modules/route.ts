import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { CourseDifficulty, ProgressStatus } from '@prisma/client';

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const courseSlug = 'fraud-awareness-course';

    const course = await db.course.findUnique({
      where: { slug: courseSlug },
      include: {
        CourseModule: {
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
        where: { userClerkId_courseId: { userId, courseId: course.id } },
        include: { ModuleProgress: true },
    });

    const moduleProgressMap = new Map(
      userEnrollment?.ModuleProgress.map((p) => [p.moduleId, p.status])
    );

    const beginnerModules = course.CourseModule.filter(
      (m) => m.difficulty === CourseDifficulty.BEGINNER
    );
    const intermediateModules = course.CourseModule.filter(
      (m) => m.difficulty === CourseDifficulty.INTERMEDIATE
    );
    const advancedModules = course.CourseModule.filter(
      (m) => m.difficulty === CourseDifficulty.ADVANCED
    );

    const allBeginnerCompleted = beginnerModules.every(
      (m) => moduleProgressMap.get(m.id) === ProgressStatus.COMPLETED
    );

    const allIntermediateCompleted = intermediateModules.every(
      (m) => moduleProgressMap.get(m.id) === ProgressStatus.COMPLETED
    );

    const processedModules = course.CourseModule.map((module) => {
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

      return {
        ...module,
        progress: moduleProgressMap.get(module.id) || ProgressStatus.NOT_STARTED,
        locked,
      };
    });

    return NextResponse.json(processedModules);
  } catch (error) {
    console.error('[COURSE_MODULES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
