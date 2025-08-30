import { db } from './db';
import { Achievement, UserAchievement, ProgressStatus } from '@prisma/client';

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
            }
          }
        }
        break;
      case 'COMPLETE_COURSE':
        // TODO: Implement logic to check if a course is complete
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