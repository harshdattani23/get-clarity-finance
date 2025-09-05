import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";

interface TradingAnalytics {
  timestamp: string;
  overview: {
    totalUsers: number;
    activeTraders: number;
    totalTrades: number;
    totalPortfolioValue: number;
    totalPnL: number;
    averagePortfolioSize: number;
  };
  tradingActivity: {
    tradesLast24h: number;
    tradesLast7d: number;
    volumeLast24h: number;
    mostTradedStocks: Array<{
      ticker: string;
      name: string;
      tradeCount: number;
      volume: number;
      avgPrice: number;
    }>;
    topPerformers: Array<{
      userId: string;
      userName: string;
      totalPnL: number;
      portfolioValue: number;
      totalTrades: number;
      winRate: number;
    }>;
  };
  portfolioStats: {
    totalPortfolios: number;
    averageHoldings: number;
    topHoldings: Array<{
      ticker: string;
      name: string;
      totalQuantity: number;
      totalValue: number;
      holdersCount: number;
    }>;
    sectorDistribution: Array<{
      sector: string;
      value: number;
      percentage: number;
    }>;
  };
  riskMetrics: {
    portfoliosInProfit: number;
    portfoliosInLoss: number;
    highRiskPortfolios: number;
    averageRiskScore: number;
    largestGain: number;
    largestLoss: number;
  };
  userEngagement: {
    dailyActiveUsers: number;
    avgSessionDuration: number;
    newTradersLast7d: number;
    churnRate: number;
    retentionRate: number;
  };
}

async function getTradingData() {
  try {
    // Get all users with their holdings, trades, and trading stats
    const users = await prisma.user.findMany({
      include: {
        holdings: true,
        virtualTrades: {
          orderBy: {
            tradedAt: 'desc'
          }
        },
        tradingStats: true
      }
    });

    // Get recent trading activity
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const last7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const recentTrades = await prisma.virtualTrade.findMany({
      where: {
        tradedAt: {
          gte: last24h
        }
      },
      include: {
        user: {
          select: {
            clerkId: true,
            username: true,
            email: true
          }
        }
      }
    });

    const trades7d = await prisma.virtualTrade.findMany({
      where: {
        tradedAt: {
          gte: last7d
        }
      }
    });

    // Calculate overview metrics
    const totalUsers = users.length;
    const activeTraders = users.filter(u => u.virtualTrades.length > 0).length;
    const totalTrades = users.reduce((sum, u) => sum + u.virtualTrades.length, 0);
    const totalPortfolioValue = users.reduce((sum, u) => sum + Number(u.virtualCash || 100000), 0);
    const totalPnL = users.reduce((sum, u) => sum + (u.tradingStats ? Number(u.tradingStats.totalProfit) - Number(u.tradingStats.totalLoss) : 0), 0);
    const averagePortfolioSize = totalUsers > 0 ? totalPortfolioValue / totalUsers : 0;

    // Trading activity metrics
    const tradesLast24h = recentTrades.length;
    const tradesLast7d = trades7d.length;
    const volumeLast24h = recentTrades.reduce((sum, t) => sum + (Number(t.quantity) * Number(t.price)), 0);

    // Most traded stocks
    const stockTradeCount = recentTrades.reduce((acc, trade) => {
      const ticker = trade.ticker;
      if (!acc[ticker]) {
        acc[ticker] = {
          count: 0,
          volume: 0,
          totalPrice: 0,
          name: ticker // In real app, you'd get the company name
        };
      }
      acc[ticker].count++;
      acc[ticker].volume += Number(trade.quantity) * Number(trade.price);
      acc[ticker].totalPrice += Number(trade.price);
      return acc;
    }, {} as Record<string, any>);

    const mostTradedStocks = Object.entries(stockTradeCount)
      .map(([ticker, data]) => ({
        ticker,
        name: data.name,
        tradeCount: data.count,
        volume: data.volume,
        avgPrice: data.totalPrice / data.count
      }))
      .sort((a, b) => b.tradeCount - a.tradeCount)
      .slice(0, 10);

    // Top performers
    const topPerformers = users
      .map(u => ({
        userId: u.clerkId,
        userName: u.username || u.email.split('@')[0],
        totalPnL: u.tradingStats ? Number(u.tradingStats.totalProfit) - Number(u.tradingStats.totalLoss) : 0,
        portfolioValue: Number(u.virtualCash || 100000),
        totalTrades: u.virtualTrades.length,
        winRate: u.tradingStats ? (Number(u.tradingStats.profitableTrades) / Math.max(Number(u.tradingStats.totalTrades), 1)) * 100 : 0
      }))
      .sort((a, b) => b.totalPnL - a.totalPnL)
      .slice(0, 10);

    // Portfolio statistics
    const totalPortfolios = users.length;
    const averageHoldings = users.length > 0 ? 
      users.reduce((sum, u) => sum + u.holdings.length, 0) / users.length : 0;

    // Top holdings across all users
    const holdingsMap = users.reduce((acc, user) => {
      user.holdings.forEach(holding => {
        const ticker = holding.ticker;
        if (!acc[ticker]) {
          acc[ticker] = {
            ticker,
            name: ticker, // In real app, get company name
            totalQuantity: 0,
            totalValue: 0,
            holdersCount: 0
          };
        }
        acc[ticker].totalQuantity += Number(holding.quantity);
        acc[ticker].totalValue += Number(holding.quantity) * Number(holding.averagePrice);
        acc[ticker].holdersCount++;
      });
      return acc;
    }, {} as Record<string, any>);

    const topHoldings = Object.values(holdingsMap)
      .sort((a: any, b: any) => b.totalValue - a.totalValue)
      .slice(0, 10);

    // Risk metrics
    const usersInProfit = users.filter(u => u.tradingStats ? Number(u.tradingStats.totalProfit) - Number(u.tradingStats.totalLoss) > 0 : false).length;
    const usersInLoss = users.filter(u => u.tradingStats ? Number(u.tradingStats.totalProfit) - Number(u.tradingStats.totalLoss) < 0 : false).length;
    const averageRiskScore = 50; // Default risk score since we don't track this yet
    
    const pnlValues = users.map(u => u.tradingStats ? Number(u.tradingStats.totalProfit) - Number(u.tradingStats.totalLoss) : 0);
    const largestGain = pnlValues.length > 0 ? Math.max(...pnlValues, 0) : 0;
    const largestLoss = pnlValues.length > 0 ? Math.min(...pnlValues, 0) : 0;

    // User engagement (simplified calculations)
    const dailyActiveUsers = recentTrades.filter((trade, index, self) => 
      self.findIndex(t => t.userClerkId === trade.userClerkId) === index
    ).length;

    const analytics: TradingAnalytics = {
      timestamp: new Date().toISOString(),
      overview: {
        totalUsers,
        activeTraders,
        totalTrades,
        totalPortfolioValue,
        totalPnL,
        averagePortfolioSize
      },
      tradingActivity: {
        tradesLast24h,
        tradesLast7d,
        volumeLast24h,
        mostTradedStocks,
        topPerformers
      },
      portfolioStats: {
        totalPortfolios,
        averageHoldings,
        topHoldings,
        sectorDistribution: [
          { sector: 'Technology', value: totalPortfolioValue * 0.35, percentage: 35 },
          { sector: 'Finance', value: totalPortfolioValue * 0.20, percentage: 20 },
          { sector: 'Healthcare', value: totalPortfolioValue * 0.15, percentage: 15 },
          { sector: 'Energy', value: totalPortfolioValue * 0.12, percentage: 12 },
          { sector: 'Consumer', value: totalPortfolioValue * 0.18, percentage: 18 }
        ]
      },
      riskMetrics: {
        portfoliosInProfit: usersInProfit,
        portfoliosInLoss: usersInLoss,
        highRiskPortfolios: 0, // We don't track risk scores yet
        averageRiskScore,
        largestGain,
        largestLoss
      },
      userEngagement: {
        dailyActiveUsers,
        avgSessionDuration: 25, // Would need session tracking
        newTradersLast7d: users.filter(u => 
          new Date(u.createdAt) > last7d
        ).length,
        churnRate: 5.2, // Would need proper calculation
        retentionRate: 94.8
      }
    };

    return analytics;

  } catch (error) {
    console.error('Trading analytics error:', error);
    throw error;
  }
}

export async function GET() {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current user and verify admin
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const userEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress;
    
    if (userEmail !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden - Admin access only" }, { status: 403 });
    }

    const analytics = await getTradingData();

    return NextResponse.json({
      success: true,
      data: analytics,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Virtual trading analytics API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch trading analytics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
