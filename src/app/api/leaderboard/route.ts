import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || 'WEEKLY';
    const limit = parseInt(searchParams.get('limit') || '100');

    // Get the latest leaderboard entries for the specified period
    const leaderboard = await prisma.leaderboardEntry.findMany({
      where: {
        period: period as 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME',
      },
      orderBy: {
        rank: 'asc',
      },
      take: limit,
      include: {
        user: {
          select: {
            username: true,
            email: true,
            clerkId: true,
          },
        },
      },
    });

    // Get current user's rank if logged in
    let userRank = null;
    if (userId) {
      userRank = await prisma.leaderboardEntry.findFirst({
        where: {
          userClerkId: userId,
          period: period as 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME',
        },
        orderBy: {
          calculatedAt: 'desc',
        },
      });
    }

    return NextResponse.json({
      leaderboard,
      userRank,
      period,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}

// Update leaderboard (called by cron job or after trades)
export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Calculate leaderboard for all periods
    const periods = ['DAILY', 'WEEKLY', 'MONTHLY', 'ALL_TIME'];
    
    for (const period of periods) {
      await calculateLeaderboard(period);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to update leaderboard' },
      { status: 500 }
    );
  }
}

async function calculateLeaderboard(period: string) {
  // Get time range based on period
  const now = new Date();
  let startDate = new Date();
  
  switch (period) {
    case 'DAILY':
      startDate.setDate(now.getDate() - 1);
      break;
    case 'WEEKLY':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'MONTHLY':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'ALL_TIME':
      startDate = new Date(0);
      break;
  }

  // Get all users with trades in the period
  const users = await prisma.user.findMany({
    include: {
      holdings: true,
      virtualTrades: {
        where: {
          tradedAt: {
            gte: startDate,
          },
        },
      },
    },
  });

  // Calculate metrics for each user
  const userMetrics = users.map(user => {
    const trades = user.virtualTrades;
    const totalTrades = trades.length;
    
    // Calculate profit/loss for each trade
    let profitableTrades = 0;
    
    trades.forEach(trade => {
      if (trade.tradeType === 'SELL') {
        // Find corresponding buy trades
        const buyTrades = trades.filter(t => 
          t.ticker === trade.ticker && 
          t.tradeType === 'BUY' && 
          t.tradedAt < trade.tradedAt
        );
        
        if (buyTrades.length > 0) {
          const avgBuyPrice = buyTrades.reduce((sum, t) => sum + Number(t.price), 0) / buyTrades.length;
          const profit = (Number(trade.price) - avgBuyPrice) * trade.quantity;
          if (profit > 0) profitableTrades++;
        }
      }
    });

    // Calculate portfolio value
    const portfolioValue = user.holdings.reduce((sum, holding) => {
      return sum + (Number(holding.averagePrice) * holding.quantity);
    }, Number(user.virtualCash));

    const winRate = totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0;
    const totalReturn = ((portfolioValue - 100000) / 100000) * 100; // Assuming starting cash is 100000

    return {
      userClerkId: user.clerkId,
      totalReturn,
      winRate,
      totalTrades,
      profitableTrades,
      portfolioValue,
    };
  });

  // Sort by total return and assign ranks
  userMetrics.sort((a, b) => b.totalReturn - a.totalReturn);
  
  // Create leaderboard entries
  const leaderboardEntries = userMetrics.map((metric, index) => ({
    ...metric,
    period: period as 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME',
    rank: index + 1,
    totalReturn: metric.totalReturn,
    winRate: metric.winRate,
    calculatedAt: now,
  }));

  // Batch insert leaderboard entries
  await prisma.leaderboardEntry.createMany({
    data: leaderboardEntries,
    skipDuplicates: true,
  });
}
