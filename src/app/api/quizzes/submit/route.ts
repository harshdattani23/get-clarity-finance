import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { lessonId, courseId, score, answers } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!lessonId || !courseId || score === undefined || !answers) {
      return new NextResponse('Missing required fields', { status: 400 });
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
      return new NextResponse('Not enrolled in this course', { status: 403 });
    }

    const quiz = await db.courseQuiz.findUnique({
        where: { lessonId }
    });

    if (!quiz) {
        // If quiz doesn't exist, create it
        const newQuiz = await db.courseQuiz.create({
            data: {
                id: `quiz-${lessonId}`,
                lessonId,
                updatedAt: new Date(),
            }
        });
        await db.quizAttempt.create({
          data: {
            id: `${enrollment.id}-${newQuiz.id}`,
            enrollmentId: enrollment.id,
            quizId: newQuiz.id,
            score,
            answers,
            passed: score >= newQuiz.passingScore,
          },
        });
    } else {
        await db.quizAttempt.create({
          data: {
            id: `${enrollment.id}-${quiz.id}`,
            enrollmentId: enrollment.id,
            quizId: quiz.id,
            score,
            answers,
            passed: score >= quiz.passingScore,
          },
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[QUIZ_SUBMIT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
