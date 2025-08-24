// Advanced Trading Statistics Calculations

import { VirtualTrade } from '@prisma/client';

export interface TradingMetrics {
  sharpeRatio: number;
  maxDrawdown: number;
  consistencyScore: number;
  avgDailyReturn: number;
  volatility: number;
  profitFactor: number;
  recoveryFactor: number;
  calmarRatio: number;
}

export interface TradeWithPrice {
  ticker: string;
  tradeType: 'BUY' | 'SELL';
  quantity: number;
  price: number | string;
  tradedAt: Date;
}

/**
 * Calculate Sharpe Ratio
 * Measures risk-adjusted returns
 * Higher is better (>1 is good, >2 is very good, >3 is excellent)
 */
export function calculateSharpeRatio(
  trades: TradeWithPrice[],
  initialCapital: number = 100000,
  riskFreeRate: number = 0.05 // 5% annual
): number {
  if (trades.length < 2) return 0;

  // Calculate daily returns
  const dailyReturns: number[] = [];
  let currentCapital = initialCapital;
  const tradesByDay = groupTradesByDay(trades);

  for (const [_, dayTrades] of tradesByDay) {
    const dayStartCapital = currentCapital;
    
    for (const trade of dayTrades) {
      const price = Number(trade.price);
      if (trade.tradeType === 'SELL') {
        currentCapital += price * trade.quantity;
      } else {
        currentCapital -= price * trade.quantity;
      }
    }
    
    const dailyReturn = ((currentCapital - dayStartCapital) / dayStartCapital) * 100;
    dailyReturns.push(dailyReturn);
  }

  if (dailyReturns.length === 0) return 0;

  // Calculate mean and standard deviation
  const meanReturn = dailyReturns.reduce((sum, r) => sum + r, 0) / dailyReturns.length;
  const variance = dailyReturns.reduce((sum, r) => sum + Math.pow(r - meanReturn, 2), 0) / dailyReturns.length;
  const stdDev = Math.sqrt(variance);

  // Annual Sharpe Ratio (assuming 252 trading days)
  const annualizedReturn = meanReturn * 252;
  const annualizedStdDev = stdDev * Math.sqrt(252);
  
  if (annualizedStdDev === 0) return 0;
  
  return (annualizedReturn - riskFreeRate) / annualizedStdDev;
}

/**
 * Calculate Maximum Drawdown
 * Measures the largest peak-to-trough decline
 * Lower is better (closer to 0)
 */
export function calculateMaxDrawdown(
  trades: TradeWithPrice[],
  initialCapital: number = 100000
): number {
  if (trades.length === 0) return 0;

  let peak = initialCapital;
  let maxDrawdown = 0;
  let currentValue = initialCapital;
  
  // Sort trades by date
  const sortedTrades = [...trades].sort((a, b) => 
    new Date(a.tradedAt).getTime() - new Date(b.tradedAt).getTime()
  );

  for (const trade of sortedTrades) {
    const price = Number(trade.price);
    
    if (trade.tradeType === 'SELL') {
      currentValue += price * trade.quantity;
    } else {
      currentValue -= price * trade.quantity;
    }
    
    if (currentValue > peak) {
      peak = currentValue;
    }
    
    const drawdown = ((peak - currentValue) / peak) * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }
  
  return maxDrawdown;
}

/**
 * Calculate Consistency Score
 * Measures how consistently profitable a trader is
 * Scale: 0-100 (higher is better)
 */
export function calculateConsistencyScore(
  trades: TradeWithPrice[],
  winRate: number,
  totalReturn: number
): number {
  if (trades.length === 0) return 0;

  // Factor 1: Win rate (40% weight)
  const winRateScore = Math.min(winRate, 100) * 0.4;

  // Factor 2: Trade frequency consistency (30% weight)
  const tradesByDay = groupTradesByDay(trades);
  const tradingDays = tradesByDay.size;
  const avgTradesPerDay = trades.length / Math.max(tradingDays, 1);
  const frequencyScore = Math.min((avgTradesPerDay / 5) * 100, 100) * 0.3; // Normalized to 5 trades/day as optimal

  // Factor 3: Positive return consistency (30% weight)
  const returnScore = totalReturn > 0 ? Math.min((totalReturn / 50) * 100, 100) * 0.3 : 0; // Normalized to 50% return as excellent

  return Math.round(winRateScore + frequencyScore + returnScore);
}

/**
 * Calculate Profit Factor
 * Ratio of gross profits to gross losses
 * > 1 means profitable, > 1.5 is good, > 2 is excellent
 */
export function calculateProfitFactor(
  totalProfit: number,
  totalLoss: number
): number {
  if (totalLoss === 0) return totalProfit > 0 ? 999 : 0;
  return Math.min(totalProfit / totalLoss, 999);
}

/**
 * Calculate Average Daily Return
 */
export function calculateAvgDailyReturn(
  trades: TradeWithPrice[],
  initialCapital: number = 100000
): number {
  if (trades.length === 0) return 0;

  const tradesByDay = groupTradesByDay(trades);
  let totalReturn = 0;
  let currentCapital = initialCapital;

  for (const [_, dayTrades] of tradesByDay) {
    const dayStartCapital = currentCapital;
    
    for (const trade of dayTrades) {
      const price = Number(trade.price);
      if (trade.tradeType === 'SELL') {
        currentCapital += price * trade.quantity;
      } else {
        currentCapital -= price * trade.quantity;
      }
    }
    
    const dailyReturn = ((currentCapital - dayStartCapital) / dayStartCapital) * 100;
    totalReturn += dailyReturn;
  }

  return tradesByDay.size > 0 ? totalReturn / tradesByDay.size : 0;
}

/**
 * Calculate Volatility (Standard Deviation of Returns)
 */
export function calculateVolatility(
  trades: TradeWithPrice[],
  initialCapital: number = 100000
): number {
  if (trades.length < 2) return 0;

  const dailyReturns: number[] = [];
  let currentCapital = initialCapital;
  const tradesByDay = groupTradesByDay(trades);

  for (const [_, dayTrades] of tradesByDay) {
    const dayStartCapital = currentCapital;
    
    for (const trade of dayTrades) {
      const price = Number(trade.price);
      if (trade.tradeType === 'SELL') {
        currentCapital += price * trade.quantity;
      } else {
        currentCapital -= price * trade.quantity;
      }
    }
    
    const dailyReturn = ((currentCapital - dayStartCapital) / dayStartCapital) * 100;
    dailyReturns.push(dailyReturn);
  }

  if (dailyReturns.length < 2) return 0;

  const meanReturn = dailyReturns.reduce((sum, r) => sum + r, 0) / dailyReturns.length;
  const variance = dailyReturns.reduce((sum, r) => sum + Math.pow(r - meanReturn, 2), 0) / dailyReturns.length;
  
  return Math.sqrt(variance);
}

/**
 * Calculate Recovery Factor
 * Measures how well the portfolio recovers from drawdowns
 * Higher is better
 */
export function calculateRecoveryFactor(
  totalReturn: number,
  maxDrawdown: number
): number {
  if (maxDrawdown === 0) return totalReturn > 0 ? 999 : 0;
  return Math.abs(totalReturn / maxDrawdown);
}

/**
 * Calculate Calmar Ratio
 * Annual return divided by max drawdown
 * Higher is better (>1 is good, >3 is excellent)
 */
export function calculateCalmarRatio(
  annualReturn: number,
  maxDrawdown: number
): number {
  if (maxDrawdown === 0) return annualReturn > 0 ? 999 : 0;
  return annualReturn / maxDrawdown;
}

/**
 * Group trades by day for analysis
 */
function groupTradesByDay(trades: TradeWithPrice[]): Map<string, TradeWithPrice[]> {
  const grouped = new Map<string, TradeWithPrice[]>();
  
  for (const trade of trades) {
    const date = new Date(trade.tradedAt).toISOString().split('T')[0];
    if (!grouped.has(date)) {
      grouped.set(date, []);
    }
    grouped.get(date)!.push(trade);
  }
  
  return grouped;
}

/**
 * Get risk level based on metrics
 */
export function getRiskLevel(metrics: TradingMetrics): {
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  color: string;
  description: string;
} {
  const { sharpeRatio, maxDrawdown, volatility } = metrics;

  if (sharpeRatio > 1.5 && maxDrawdown < 10 && volatility < 15) {
    return {
      level: 'LOW',
      color: 'text-green-400',
      description: 'Conservative trader with stable returns'
    };
  } else if (sharpeRatio > 0.5 && maxDrawdown < 25 && volatility < 30) {
    return {
      level: 'MEDIUM',
      color: 'text-yellow-400',
      description: 'Balanced risk-reward profile'
    };
  } else {
    return {
      level: 'HIGH',
      color: 'text-red-400',
      description: 'Aggressive trader with high volatility'
    };
  }
}

/**
 * Get performance rating based on metrics
 */
export function getPerformanceRating(metrics: TradingMetrics): {
  rating: number; // 1-5 stars
  label: string;
  color: string;
} {
  const { sharpeRatio, profitFactor, consistencyScore } = metrics;
  
  const score = (
    (sharpeRatio > 2 ? 2 : sharpeRatio) + // Max 2 points
    (profitFactor > 2 ? 2 : profitFactor) + // Max 2 points
    (consistencyScore / 100) // Max 1 point
  );

  if (score >= 4.5) {
    return { rating: 5, label: 'Elite', color: 'text-purple-400' };
  } else if (score >= 3.5) {
    return { rating: 4, label: 'Excellent', color: 'text-green-400' };
  } else if (score >= 2.5) {
    return { rating: 3, label: 'Good', color: 'text-blue-400' };
  } else if (score >= 1.5) {
    return { rating: 2, label: 'Average', color: 'text-yellow-400' };
  } else {
    return { rating: 1, label: 'Beginner', color: 'text-gray-400' };
  }
}
