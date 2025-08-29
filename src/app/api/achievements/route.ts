import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get user achievements
export async function GET() {
  try {
    const session = await auth();
    const userId = session?.userId;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all achievements with user progress
    const achievements = await prisma.achievement.findMany({
      include: {
        users: {
          where: {
            userClerkId: userId,
          },
        },
      },
      orderBy: [
        { category: 'asc' },
        { tier: 'asc' },
        { points: 'asc' },
      ],
    });

    // Format achievements with user progress
    const formattedAchievements = achievements.map(achievement => ({
      ...achievement,
      unlocked: achievement.users.length > 0,
      unlockedAt: achievement.users[0]?.unlockedAt || null,
      progress: achievement.users[0]?.progress || 0,
    }));

    // Get user's total points
    const userAchievements = await prisma.userAchievement.findMany({
      where: {
        userClerkId: userId,
      },
      include: {
        achievement: true,
      },
    });
    
    const totalPoints = userAchievements.reduce((sum, ua) => 
      sum + (ua.achievement?.points || 0), 0
    );

    return NextResponse.json({
      achievements: formattedAchievements,
      totalPoints: totalPoints || 0,
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    );
  }
}

// Check and update achievements after a trade
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.userId;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, data } = body;

    // Update trading stats
    await updateTradingStats(userId, action, data);

    // Check for new achievements
    const newAchievements = await checkAchievements(userId);

    return NextResponse.json({
      newAchievements,
      success: true,
    });
  } catch (error) {
    console.error('Error updating achievements:', error);
    return NextResponse.json(
      { error: 'Failed to update achievements' },
      { status: 500 }
    );
  }
}

interface TradeData {
  profit?: number;
  volume?: number;
}

async function updateTradingStats(userId: string, action: string, data: TradeData) {
  const stats = await prisma.tradingStats.upsert({
    where: { userClerkId: userId },
    create: { userClerkId: userId },
    update: {},
  });

  switch (action) {
    case 'TRADE_COMPLETED':
      const { profit = 0, volume = 0 } = data;
      const isProfitable = profit > 0;
      
      await prisma.tradingStats.update({
        where: { userClerkId: userId },
        data: {
          totalTrades: { increment: 1 },
          profitableTrades: isProfitable ? { increment: 1 } : undefined,
          totalProfit: isProfitable ? { increment: profit } : undefined,
          totalLoss: !isProfitable ? { increment: Math.abs(profit) } : undefined,
          bestTrade: isProfitable && profit > Number(stats.bestTrade) ? profit : undefined,
          worstTrade: !isProfitable && profit < Number(stats.worstTrade) ? profit : undefined,
          currentStreak: isProfitable 
            ? stats.currentStreak + 1
            : 0,
          longestWinStreak: isProfitable && stats.currentStreak + 1 > stats.longestWinStreak
            ? stats.currentStreak + 1
            : undefined,
          totalVolume: { increment: volume },
        },
      });
      break;
  }
}

async function checkAchievements(userId: string) {
  const stats = await prisma.tradingStats.findUnique({
    where: { userClerkId: userId },
  });

  if (!stats) return [];

  const achievements = await prisma.achievement.findMany();
  const userAchievements = await prisma.userAchievement.findMany({
    where: { userClerkId: userId },
  });

  const unlockedAchievementIds = userAchievements.map(ua => ua.achievementId);
  const newAchievements = [];

  for (const achievement of achievements) {
    if (unlockedAchievementIds.includes(achievement.id)) continue;

    const requirement = achievement.requirement as Record<string, unknown>;
    let unlocked = false;
    let progress = 0;

    // Check requirements based on achievement type
    switch (requirement.type) {
      case 'TRADES_COUNT':
        progress = (stats.totalTrades / (requirement.value as number)) * 100;
        unlocked = stats.totalTrades >= (requirement.value as number);
        break;
      
      case 'WIN_RATE':
        const winRate = stats.totalTrades > 0 
          ? (stats.profitableTrades / stats.totalTrades) * 100 
          : 0;
        progress = (winRate / (requirement.value as number)) * 100;
        unlocked = winRate >= (requirement.value as number) && stats.totalTrades >= (requirement.minTrades as number);
        break;
      
      case 'WIN_STREAK':
        progress = (stats.longestWinStreak / (requirement.value as number)) * 100;
        unlocked = stats.longestWinStreak >= (requirement.value as number);
        break;
      
      case 'TOTAL_PROFIT':
        progress = (Number(stats.totalProfit) / (requirement.value as number)) * 100;
        unlocked = Number(stats.totalProfit) >= (requirement.value as number);
        break;
      
      case 'VOLUME':
        progress = (Number(stats.totalVolume) / (requirement.value as number)) * 100;
        unlocked = Number(stats.totalVolume) >= (requirement.value as number);
        break;
    }

    // Update or create user achievement
    if (unlocked || progress > 0) {
      await prisma.userAchievement.upsert({
        where: {
          userClerkId_achievementId: {
            userClerkId: userId,
            achievementId: achievement.id,
          },
        },
        create: {
          userClerkId: userId,
          achievementId: achievement.id,
          progress: Math.min(100, Math.round(progress)),
        },
        update: {
          progress: Math.min(100, Math.round(progress)),
          unlockedAt: unlocked ? new Date() : undefined,
        },
      });

      if (unlocked) {
        newAchievements.push(achievement);
      }
    }
  }

  return newAchievements;
}
