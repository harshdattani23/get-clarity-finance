import { db } from './db';
import { Achievement, UserAchievement, ProgressStatus, EnrollmentStatus } from '@prisma/client';

// This is a placeholder for the achievement requirement structure.
// In a real application, this would be more robust.
interface AchievementRequirement {
  type: 'COMPLETE_MODULE' | 'COMPLETE_COURSE' | 'MAKE_TRADES';
  moduleId?: string;
  courseId?: string;
  count?: number;
}

export async function checkAndAwardAchievements(userId: string) {
  const allAchievements = await db.achievement.findMany();
  const userAchievements = await db.userAchievement.findMany({
    where: { userClerkId: userId },
    select: { achievementId: true },
  });

  const unlockedAchievementIds = new Set(
    userAchievements.map(ua => ua.achievementId)
  );

  for (const achievement of allAchievements) {
    if (unlockedAchievementIds.has(achievement.id)) {
      continue; // Already unlocked
    }

    const requirement = achievement.requirement as unknown as AchievementRequirement;
    let isAchieved = false;

    switch (requirement.type) {
      case 'COMPLETE_MODULE':
        if (requirement.moduleId) {
          const courseModule = await db.courseModule.findUnique({
            where: { id: requirement.moduleId },
            include: { CourseLesson: { select: { id: true } } },
          });

          if (courseModule) {
            const lessonIds = courseModule.CourseLesson.map(l => l.id);
            const userLessonProgress = await db.lessonProgress.findMany({
              where: {
                lessonId: { in: lessonIds },
                CourseEnrollment: { userClerkId: userId },
                status: ProgressStatus.COMPLETED,
              },
            });

            if (userLessonProgress.length === lessonIds.length) {
              isAchieved = true;

              const enrollment = await db.courseEnrollment.findFirst({
                  where: { userClerkId: userId, courseId: courseModule.courseId }
              });

              if (enrollment) {
                  const moduleProgress = await db.moduleProgress.findFirst({
                      where: {
                          enrollmentId: enrollment.id,
                          moduleId: requirement.moduleId
                      }
                  });

                  if (moduleProgress) {
                      await db.moduleProgress.update({
                          where: { id: moduleProgress.id },
                          data: { status: ProgressStatus.COMPLETED }
                      });
                  }
              }
            }
          }
        }
        break;
      case 'COMPLETE_COURSE':
        if (requirement.courseId) {
          const course = await db.course.findUnique({
            where: { id: requirement.courseId },
            include: { CourseModule: { select: { id: true } } },
          });

          if (course) {
            const moduleIds = course.CourseModule.map(m => m.id);
            const userModuleProgress = await db.moduleProgress.findMany({
              where: {
                moduleId: { in: moduleIds },
                CourseEnrollment: { userClerkId: userId },
                status: ProgressStatus.COMPLETED,
              },
            });

            if (userModuleProgress.length === moduleIds.length) {
              isAchieved = true;

              const enrollment = await db.courseEnrollment.findUnique({
                  where: { userClerkId_courseId: { userClerkId: userId, courseId: requirement.courseId } }
              });
              if (enrollment) {
                  await db.courseEnrollment.update({
                      where: { id: enrollment.id },
                      data: { status: EnrollmentStatus.COMPLETED }
                  });
              }
            }
          }
        }
        break;
      case 'MAKE_TRADES':
        // TODO: Implement logic to check the number of trades
        break;
    }

    if (isAchieved) {
      await db.userAchievement.create({
        data: {
          userClerkId: userId,
          achievementId: achievement.id,
        },
      });
    }
  }
}