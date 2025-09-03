import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { CourseDifficulty } from '@prisma/client';
import { randomUUID } from 'crypto';

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if course already exists with new slug
    let course = await db.course.findUnique({
      where: { slug: 'investment-security-course' },
    });

    if (!course) {
      // Try to find the old course and update it
      const oldCourse = await db.course.findUnique({
        where: { slug: 'fraud-awareness-course' },
      });

      if (oldCourse) {
        // Update the existing course
        course = await db.course.update({
          where: { id: oldCourse.id },
          data: {
            slug: 'investment-security-course',
            category: 'Investment Security',
            updatedAt: new Date(),
          },
        });
        console.log('Updated existing course slug to investment-security-course');
      } else {
        // Create new course
        course = await db.course.create({
          data: {
            id: 'clx2no2g0000008l8g8r8g8r8',
            slug: 'investment-security-course',
            category: 'Investment Security',
            difficulty: CourseDifficulty.BEGINNER,
            estimatedHours: 6,
            xpReward: 1500,
            isPublished: true,
            order: 1,
            imageUrl: '/images/investment-security-course/course-thumbnail.png',
            updatedAt: new Date(),
          },
        });
        console.log('Created new investment security course');
      }
    }

    // Auto-enroll the current user
    const existingEnrollment = await db.courseEnrollment.findUnique({
      where: {
        userClerkId_courseId: {
          userClerkId: userId,
          courseId: course.id,
        },
      },
    });

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

    // Ensure basic modules exist
    const modules = [
      {
        slug: 'intro-to-frauds',
        title: 'Introduction to Investment Frauds',
        order: 1,
        difficulty: CourseDifficulty.BEGINNER,
        xpReward: 100,
      },
      {
        slug: 'intermediate-frauds',
        title: 'Intermediate Fraud Schemes',
        order: 2,
        difficulty: CourseDifficulty.INTERMEDIATE,
        xpReward: 200,
      },
      {
        slug: 'ponzi-schemes',
        title: 'Ponzi Schemes',
        order: 3,
        difficulty: CourseDifficulty.INTERMEDIATE,
        xpReward: 150,
      },
      {
        slug: 'pump-dump',
        title: 'Pump & Dump Schemes',
        order: 4,
        difficulty: CourseDifficulty.INTERMEDIATE,
        xpReward: 150,
      },
      {
        slug: 'fake-advisors',
        title: 'Fake Investment Advisors',
        order: 5,
        difficulty: CourseDifficulty.INTERMEDIATE,
        xpReward: 150,
      },
      {
        slug: 'insider-trading',
        title: 'Insider Trading & Market Manipulation',
        order: 6,
        difficulty: CourseDifficulty.ADVANCED,
        xpReward: 200,
      },
    ];

    for (const moduleData of modules) {
      await db.courseModule.upsert({
        where: { courseId_slug: { courseId: course.id, slug: moduleData.slug } },
        update: { ...moduleData, courseId: course.id, updatedAt: new Date() },
        create: { ...moduleData, id: randomUUID(), courseId: course.id, updatedAt: new Date() },
      });
    }

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
