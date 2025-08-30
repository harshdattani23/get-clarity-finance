import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { checkAndAwardAchievements } from '@/lib/achievements';
import { ProgressStatus } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { lessonId, courseId } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!lessonId || !courseId) {
      return new NextResponse('Missing lessonId or courseId', { status: 400 });
    }

    const enrollment = await db.courseEnrollment.findUnique({
      where: {
        userClerkId_courseId: {
          userClerkId: userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      // If user is not enrolled, enroll them
      await db.courseEnrollment.create({
        data: {
            id: `${userId}-${courseId}`,
            userClerkId: userId,
            courseId,
        }
      });
    }

    const enrollmentId = enrollment ? enrollment.id : `${userId}-${courseId}`;

    await db.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollmentId,
          lessonId,
        },
      },
      update: {
        status: ProgressStatus.COMPLETED,
      },
      create: {
        id: `${enrollmentId}-${lessonId}`,
        enrollmentId: enrollmentId,
        lessonId,
        status: ProgressStatus.COMPLETED,
      },
    });

    // Check for achievements after completing a lesson
    await checkAndAwardAchievements(userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[LESSON_COMPLETE_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
