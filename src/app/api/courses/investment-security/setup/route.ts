import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { CourseDifficulty } from '@prisma/client';
import { randomUUID } from 'crypto';

// Cache constants for better performance
const COURSE_SLUGS = ['investment-security-course', 'fraud-awareness-course'];
const DEFAULT_COURSE_DATA = {
  slug: 'investment-security-course',
  category: 'Investment Security',
  difficulty: CourseDifficulty.BEGINNER,
  estimatedHours: 6,
  xpReward: 1500,
  isPublished: true,
  order: 1,
  imageUrl: '/images/investment-security-course/course-thumbnail.png',
} as const;

const COURSE_MODULES = [
  {
    slug: 'intro-to-frauds',
    title: 'Introduction to Investment Frauds',
    order: 1,
    difficulty: CourseDifficulty.BEGINNER,
    xpReward: 100,
  },
  {
    slug: 'comprehensive-fraud-schemes',
    title: 'Comprehensive Fraud Schemes',
    order: 2,
    difficulty: CourseDifficulty.ADVANCED,
    xpReward: 250,
  },
] as const;

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Find or create course in a single optimized query
    let course = await db.course.findFirst({
      where: {
        slug: {
          in: COURSE_SLUGS,
        },
      },
      include: {
        CourseEnrollment: {
          where: {
            userClerkId: userId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (!course) {
      // Create new course
      course = await db.course.create({
        data: {
          id: 'clx2no2g0000008l8g8r8g8r8',
          ...DEFAULT_COURSE_DATA,
          updatedAt: new Date(),
        },
        include: {
          CourseEnrollment: {
            where: {
              userClerkId: userId,
            },
            select: {
              id: true,
            },
          },
        },
      });
      console.log('Created new investment security course');
    } else if (course.slug !== 'investment-security-course') {
      // Update slug if it's the old one
      course = await db.course.update({
        where: { id: course.id },
        data: {
          slug: 'investment-security-course',
          category: 'Investment Security',
          updatedAt: new Date(),
        },
        include: {
          CourseEnrollment: {
            where: {
              userClerkId: userId,
            },
            select: {
              id: true,
            },
          },
        },
      });
      console.log('Updated existing course slug to investment-security-course');
    }

    // Auto-enroll the current user (enrollment already checked in course query)
    const existingEnrollment = course.CourseEnrollment[0];

    if (!existingEnrollment) {
      await db.courseEnrollment.create({
        data: {
          id: randomUUID(),
          userClerkId: userId,
          courseId: course.id,
          totalXpEarned: 0,
          status: 'ENROLLED',
        },
      });
      console.log(`Auto-enrolled user ${userId} in investment security course`);
    }

    // Ensure basic modules exist using bulk upsert for better performance
    const moduleUpsertPromises = COURSE_MODULES.map(moduleData => 
      db.courseModule.upsert({
        where: { courseId_slug: { courseId: course.id, slug: moduleData.slug } },
        update: { ...moduleData, courseId: course.id, updatedAt: new Date() },
        create: { ...moduleData, id: randomUUID(), courseId: course.id, updatedAt: new Date() },
      })
    );

    await Promise.all(moduleUpsertPromises);

    return NextResponse.json({
      success: true,
      message: 'Investment Security Course setup completed',
      courseId: course.id,
      enrolled: true,
    });
  } catch (error) {
    console.error('[COURSE_SETUP_POST]', error);
    return NextResponse.json(
      { error: 'Failed to setup course' },
      { status: 500 }
    );
  }
}
