import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      // Return a default set of achievements for logged-out users
      const allAchievements = await db.achievement.findMany({
        orderBy: {
          points: 'asc',
        },
      });
      return NextResponse.json(allAchievements.map(a => ({ ...a, unlocked: false })));
    }

    const [allAchievements, userAchievements] = await Promise.all([
      db.achievement.findMany({
        orderBy: {
          points: 'asc',
        },
      }),
      db.userAchievement.findMany({
        where: {
          userClerkId: userId,
        },
        select: {
          achievementId: true,
        },
      }),
    ]);

    const unlockedAchievementIds = new Set(
      userAchievements.map(ua => ua.achievementId)
    );

    const achievementsWithUnlockStatus = allAchievements.map(achievement => ({
      ...achievement,
      unlocked: unlockedAchievementIds.has(achievement.id),
    }));

    return NextResponse.json(achievementsWithUnlockStatus);
  } catch (error) {
    console.error('[ACHIEVEMENTS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}