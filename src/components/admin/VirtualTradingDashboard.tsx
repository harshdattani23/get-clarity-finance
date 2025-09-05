"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  PieChart,
  BarChart3,
  Trophy,
  AlertTriangle,
  Target,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  WifiOff,
  RefreshCw
} from 'lucide-react';

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

export function VirtualTradingDashboard() {
  const [analytics, setAnalytics] = useState<TradingAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchTradingData = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/virtual-trading');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setAnalytics(result.data);
        setError(null);
      } else {
        throw new Error(result.error || 'Failed to fetch trading analytics');
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Trading analytics fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTradingData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchTradingData, 30000);
    
    return () => clearInterval(interval);
  }, [fetchTradingData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN');
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const getPnLColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600 bg-green-100';
    if (score < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <WifiOff className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Virtual Trading Analytics - Connection Error</h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 mb-2">Failed to fetch trading data:</p>
          <code className="text-sm text-red-800 bg-red-100 px-2 py-1 rounded">{error}</code>
        </div>
        <button 
          onClick={() => {setLoading(true); fetchTradingData();}}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Connection
        </button>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            Virtual Trading Analytics Dashboard
          </h2>
          <p className="text-sm text-gray-500">Real-time trading platform performance and user activity</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-green-700 bg-green-100">
            <Activity className="w-3 h-3 animate-pulse" />
            Live Data
          </div>
          <div className="text-xs text-gray-500">
            Updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Users */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-200 rounded-lg">
              <Users className="w-5 h-5 text-blue-700" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-medium text-blue-700 bg-blue-200">
              {analytics.overview.activeTraders} Active
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700">Total Traders</p>
            <p className="text-2xl font-bold text-blue-900">{formatNumber(analytics.overview.totalUsers)}</p>
            <p className="text-xs text-blue-600 mt-1">{analytics.overview.activeTraders} have trades</p>
          </div>
        </div>

        {/* Total Portfolio Value */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-200 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-700" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-medium text-green-700 bg-green-200">
              Virtual
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-green-700">Portfolio Value</p>
            <p className="text-xl font-bold text-green-900">{formatCurrency(analytics.overview.totalPortfolioValue)}</p>
            <p className="text-xs text-green-600 mt-1">Avg: {formatCurrency(analytics.overview.averagePortfolioSize)}</p>
          </div>
        </div>

        {/* Total P&L */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-200 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-700" />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPnLColor(analytics.overview.totalPnL)} ${analytics.overview.totalPnL > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {analytics.overview.totalPnL > 0 ? '+' : ''}{formatPercentage((analytics.overview.totalPnL / analytics.overview.totalPortfolioValue) * 100)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-purple-700">Total P&L</p>
            <p className={`text-xl font-bold ${getPnLColor(analytics.overview.totalPnL)}`}>
              {analytics.overview.totalPnL > 0 ? '+' : ''}{formatCurrency(analytics.overview.totalPnL)}
            </p>
            <p className="text-xs text-purple-600 mt-1">{analytics.riskMetrics.portfoliosInProfit} in profit</p>
          </div>
        </div>

        {/* Total Trades */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-200 rounded-lg">
              <Activity className="w-5 h-5 text-orange-700" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-medium text-orange-700 bg-orange-200">
              {analytics.tradingActivity.tradesLast24h} today
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-orange-700">Total Trades</p>
            <p className="text-2xl font-bold text-orange-900">{formatNumber(analytics.overview.totalTrades)}</p>
            <p className="text-xs text-orange-600 mt-1">{analytics.tradingActivity.tradesLast7d} this week</p>
          </div>
        </div>
      </div>

      {/* Trading Activity and Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Most Traded Stocks */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Most Traded Stocks (24h)
          </h3>
          {analytics.tradingActivity.mostTradedStocks.length > 0 ? (
            <div className="space-y-3">
              {analytics.tradingActivity.mostTradedStocks.slice(0, 5).map((stock, index) => (
                <div key={stock.ticker} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{stock.ticker}</div>
                      <div className="text-xs text-gray-500">{stock.tradeCount} trades</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{formatCurrency(stock.avgPrice)}</div>
                    <div className="text-xs text-gray-500">{formatCurrency(stock.volume)} vol</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No trading activity in the last 24 hours</p>
            </div>
          )}
        </div>

        {/* Top Performers */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-600" />
            Top Performers
          </h3>
          {analytics.tradingActivity.topPerformers.length > 0 ? (
            <div className="space-y-3">
              {analytics.tradingActivity.topPerformers.slice(0, 5).map((performer, index) => (
                <div key={performer.userId} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-600' : 
                      index === 1 ? 'bg-gray-100 text-gray-600' : 
                      index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{performer.userName}</div>
                      <div className="text-xs text-gray-500">{performer.totalTrades} trades</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${getPnLColor(performer.totalPnL)}`}>
                      {performer.totalPnL > 0 ? '+' : ''}{formatCurrency(performer.totalPnL)}
                    </div>
                    <div className="text-xs text-gray-500">{formatPercentage(performer.winRate)} win rate</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No active traders yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Statistics and Risk Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Holdings */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Most Popular Holdings
          </h3>
          {analytics.portfolioStats.topHoldings.length > 0 ? (
            <div className="space-y-3">
              {analytics.portfolioStats.topHoldings.slice(0, 5).map((holding, index) => (
                <div key={holding.ticker} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{holding.ticker}</span>
                      <span className="text-sm text-gray-600">{holding.holdersCount} holders</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(holding.totalValue / analytics.portfolioStats.topHoldings[0].totalValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-sm font-semibold text-gray-900">{formatCurrency(holding.totalValue)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <PieChart className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No holdings data available</p>
            </div>
          )}
        </div>

        {/* Risk Metrics */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Risk Analysis
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Portfolios in Profit</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">{analytics.riskMetrics.portfoliosInProfit}</span>
                <ArrowUpRight className="w-3 h-3 text-green-500" />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Portfolios in Loss</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-red-600">{analytics.riskMetrics.portfoliosInLoss}</span>
                <ArrowDownRight className="w-3 h-3 text-red-500" />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Risk Score</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(analytics.riskMetrics.averageRiskScore)}`}>
                {analytics.riskMetrics.averageRiskScore.toFixed(1)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">High Risk Portfolios</span>
              <span className="font-semibold text-orange-600">{analytics.riskMetrics.highRiskPortfolios}</span>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Largest Gain</span>
                <span className="font-semibold text-green-600">
                  +{formatCurrency(analytics.riskMetrics.largestGain)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">Largest Loss</span>
                <span className="font-semibold text-red-600">
                  {formatCurrency(analytics.riskMetrics.largestLoss)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Engagement Metrics */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" />
          User Engagement
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{analytics.userEngagement.dailyActiveUsers}</div>
            <div className="text-xs text-gray-500">Daily Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{analytics.userEngagement.avgSessionDuration}m</div>
            <div className="text-xs text-gray-500">Avg Session</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{analytics.userEngagement.newTradersLast7d}</div>
            <div className="text-xs text-gray-500">New Traders (7d)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{formatPercentage(analytics.userEngagement.churnRate)}</div>
            <div className="text-xs text-gray-500">Churn Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">{formatPercentage(analytics.userEngagement.retentionRate)}</div>
            <div className="text-xs text-gray-500">Retention</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-green-600">
            <Zap className="w-4 h-4" />
            <span>Trading platform operational</span>
          </div>
          <div className="text-gray-500">
            Auto-refresh every 30 seconds • Data from {new Date(analytics.timestamp).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
