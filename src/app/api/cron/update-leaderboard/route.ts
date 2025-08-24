import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

// This API route will be called by Google Cloud Scheduler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  try {
    // Verify the request is from Google Cloud Scheduler
    const headersList = await headers();
    
    // Google Cloud Scheduler sends these headers
    // const userAgent = headersList.get('user-agent'); // For future use
    const cronJobName = headersList.get('x-cloudscheduler-jobname');
    const cronScheduleTime = headersList.get('x-cloudscheduler-scheduletime');
    
    // Additional security: Check for a secret token
    const authToken = headersList.get('authorization');
    const expectedToken = process.env.CRON_SECRET_TOKEN;
    
    // Log the cron job execution
    console.log(`[CRON] Leaderboard update triggered at ${new Date().toISOString()}`);
    console.log(`[CRON] Job Name: ${cronJobName}`);
    console.log(`[CRON] Schedule Time: ${cronScheduleTime}`);
    
    // Verify authentication (optional but recommended)
    if (expectedToken && authToken !== `Bearer ${expectedToken}`) {
      console.error('[CRON] Unauthorized request - invalid token');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Calculate leaderboard for all periods
    const periods = ['DAILY', 'WEEKLY', 'MONTHLY', 'ALL_TIME'] as const;
    const results = [];

    for (const period of periods) {
      console.log(`[CRON] Calculating ${period} leaderboard...`);
      const result = await calculateLeaderboard(period);
      results.push({ period, ...result });
    }

    // Clean up old leaderboard entries (keep only last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const cleanupResult = await prisma.leaderboardEntry.deleteMany({
      where: {
        calculatedAt: {
          lt: thirtyDaysAgo
        }
      }
    });
    
    console.log(`[CRON] Cleaned up ${cleanupResult.count} old leaderboard entries`);

    // Log success
    const response = { 
      success: true, 
      message: 'Leaderboard updated successfully',
      results,
      cleanedUpEntries: cleanupResult.count,
      timestamp: new Date().toISOString(),
      jobName: cronJobName || 'manual'
    };
    
    console.log('[CRON] Leaderboard update completed successfully', response);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('[CRON] Error updating leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to update leaderboard', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Also support POST for flexibility
export async function POST(request: Request) {
  return GET(request);
}

async function calculateLeaderboard(period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME') {
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
    where: {
      virtualTrades: {
        some: {
          tradedAt: {
            gte: startDate,
          },
        },
      },
    },
    include: {
      holdings: true,
      virtualTrades: {
        where: {
          tradedAt: {
            gte: startDate,
          },
        },
        orderBy: {
          tradedAt: 'asc',
        },
      },
      tradingStats: true,
    },
  });

  console.log(`[CRON] Processing ${users.length} users for ${period} leaderboard`);

  // Calculate metrics for each user
  const userMetrics = await Promise.all(users.map(async (user) => {
    const trades = user.virtualTrades;
    const totalTrades = trades.length;
    
    // Calculate profit/loss for each completed trade (sells)
    let profitableTrades = 0;
    let totalProfit = 0;
    let totalLoss = 0;
    let totalReturn = 0;
    
    // Group trades by ticker
    const tradesByTicker = trades.reduce((acc, trade) => {
      if (!acc[trade.ticker]) {
        acc[trade.ticker] = { buys: [], sells: [] };
      }
      if (trade.tradeType === 'BUY') {
        acc[trade.ticker].buys.push(trade);
      } else {
        acc[trade.ticker].sells.push(trade);
      }
      return acc;
    }, {} as Record<string, { buys: typeof trades, sells: typeof trades }>);

    // Calculate P&L for each ticker
    for (const ticker in tradesByTicker) {
      const { buys, sells } = tradesByTicker[ticker];
      
      if (sells.length > 0 && buys.length > 0) {
        // Calculate weighted average buy price
        const totalBuyQuantity = buys.reduce((sum, t) => sum + t.quantity, 0);
        const totalBuyCost = buys.reduce((sum, t) => sum + (Number(t.price) * t.quantity), 0);
        const avgBuyPrice = totalBuyCost / totalBuyQuantity;
        
        // Calculate profit/loss for each sell
        for (const sell of sells) {
          const profit = (Number(sell.price) - avgBuyPrice) * sell.quantity;
          if (profit > 0) {
            profitableTrades++;
            totalProfit += profit;
          } else {
            totalLoss += Math.abs(profit);
          }
          totalReturn += profit;
        }
      }
    }

    // Calculate current portfolio value (stocks at current market value + cash)
    const currentHoldingsValue = user.holdings.reduce((sum, holding) => {
      // Using average price as current price (in production, fetch real-time price)
      return sum + (Number(holding.averagePrice) * holding.quantity);
    }, 0);
    
    // Net Worth = Stock Holdings Value + Available Cash
    const portfolioValue = currentHoldingsValue + Number(user.virtualCash);
    const initialCapital = 100000; // Default starting amount
    const percentReturn = ((portfolioValue - initialCapital) / initialCapital) * 100;
    const winRate = totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0;

    return {
      userClerkId: user.clerkId,
      totalReturn: percentReturn,
      winRate,
      totalTrades,
      profitableTrades,
      portfolioValue,
      totalProfit,
      totalLoss,
    };
  }));

  // Sort by total return and assign ranks
  userMetrics.sort((a, b) => b.totalReturn - a.totalReturn);
  
  // Delete existing entries for this period from the current calculation time
  await prisma.leaderboardEntry.deleteMany({
    where: {
      period,
      calculatedAt: {
        gte: new Date(now.getTime() - 1000 * 60 * 5), // Within the last 5 minutes
        lte: now
      },
    },
  });
  
  // Create leaderboard entries
  const leaderboardEntries = userMetrics.map((metric, index) => ({
    userClerkId: metric.userClerkId,
    period,
    rank: index + 1,
    totalReturn: metric.totalReturn,
    winRate: metric.winRate,
    totalTrades: metric.totalTrades,
    profitableTrades: metric.profitableTrades,
    portfolioValue: metric.portfolioValue,
    calculatedAt: now,
  }));

  // Batch insert leaderboard entries
  if (leaderboardEntries.length > 0) {
    await prisma.leaderboardEntry.createMany({
      data: leaderboardEntries,
      skipDuplicates: true,
    });
  }

  // Update trading stats for users
  for (const metric of userMetrics) {
    await prisma.tradingStats.upsert({
      where: { userClerkId: metric.userClerkId },
      update: {
        totalTrades: metric.totalTrades,
        profitableTrades: metric.profitableTrades,
        totalProfit: metric.totalProfit,
        totalLoss: metric.totalLoss,
        updatedAt: now,
      },
      create: {
        userClerkId: metric.userClerkId,
        totalTrades: metric.totalTrades,
        profitableTrades: metric.profitableTrades,
        totalProfit: metric.totalProfit,
        totalLoss: metric.totalLoss,
      },
    });
  }

  return {
    usersProcessed: userMetrics.length,
    entriesCreated: leaderboardEntries.length,
  };
}
