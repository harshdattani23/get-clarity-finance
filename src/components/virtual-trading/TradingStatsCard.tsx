'use client';

import React from 'react';
import { FaChartLine, FaShieldAlt, FaTachometerAlt, FaStar } from 'react-icons/fa';
import { TradingMetrics, getRiskLevel, getPerformanceRating } from '@/lib/trading-statistics';

interface TradingStatsCardProps {
  metrics: TradingMetrics;
  expanded?: boolean;
}

const TradingStatsCard: React.FC<TradingStatsCardProps> = ({ metrics, expanded = false }) => {
  const riskLevel = getRiskLevel(metrics);
  const rating = getPerformanceRating(metrics);

  const formatMetric = (value: number, suffix: string = '') => {
    if (value === 999) return '∞';
    if (value === 0) return '0' + suffix;
    return value.toFixed(2) + suffix;
  };

  const getMetricColor = (value: number, type: 'higher' | 'lower' | 'neutral' = 'higher') => {
    if (type === 'higher') {
      if (value > 2) return 'text-green-400';
      if (value > 1) return 'text-blue-400';
      if (value > 0) return 'text-yellow-400';
      return 'text-red-400';
    } else if (type === 'lower') {
      if (value < 10) return 'text-green-400';
      if (value < 20) return 'text-yellow-400';
      return 'text-red-400';
    }
    return 'text-gray-300';
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
          />
        ))}
      </div>
    );
  };

  if (!expanded) {
    // Compact view for leaderboard table
    return (
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <FaChartLine className="text-gray-500" />
          <span className={getMetricColor(metrics.sharpeRatio)}>
            {formatMetric(metrics.sharpeRatio)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FaShieldAlt className="text-gray-500" />
          <span className={riskLevel.color}>{riskLevel.level}</span>
        </div>
        <div className="flex items-center gap-1">
          {renderStars(rating.rating)}
        </div>
      </div>
    );
  }

  // Expanded view for detailed stats
  return (
    <div className="bg-slate-700/50 rounded-lg p-4 space-y-4">
      {/* Header with Rating */}
      <div className="flex justify-between items-center border-b border-slate-600 pb-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Trading Statistics</h3>
          <p className="text-sm text-gray-400">Advanced performance metrics</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            {renderStars(rating.rating)}
            <span className={`font-semibold ${rating.color}`}>{rating.label}</span>
          </div>
          <div className={`text-sm mt-1 ${riskLevel.color}`}>
            Risk: {riskLevel.level}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Sharpe Ratio */}
        <div className="bg-slate-800/50 p-3 rounded">
          <div className="flex items-center gap-2 mb-1">
            <FaChartLine className="text-blue-400 text-sm" />
            <span className="text-xs text-gray-400">Sharpe Ratio</span>
          </div>
          <div className={`text-xl font-bold ${getMetricColor(metrics.sharpeRatio)}`}>
            {formatMetric(metrics.sharpeRatio)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {metrics.sharpeRatio > 2 ? 'Excellent' : 
             metrics.sharpeRatio > 1 ? 'Good' : 
             metrics.sharpeRatio > 0 ? 'Average' : 'Poor'}
          </div>
        </div>

        {/* Max Drawdown */}
        <div className="bg-slate-800/50 p-3 rounded">
          <div className="flex items-center gap-2 mb-1">
            <FaShieldAlt className="text-red-400 text-sm" />
            <span className="text-xs text-gray-400">Max Drawdown</span>
          </div>
          <div className={`text-xl font-bold ${getMetricColor(metrics.maxDrawdown, 'lower')}`}>
            {formatMetric(metrics.maxDrawdown, '%')}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {metrics.maxDrawdown < 10 ? 'Low Risk' : 
             metrics.maxDrawdown < 20 ? 'Moderate' : 'High Risk'}
          </div>
        </div>

        {/* Consistency Score */}
        <div className="bg-slate-800/50 p-3 rounded">
          <div className="flex items-center gap-2 mb-1">
            <FaTachometerAlt className="text-green-400 text-sm" />
            <span className="text-xs text-gray-400">Consistency</span>
          </div>
          <div className={`text-xl font-bold ${getMetricColor(metrics.consistencyScore / 50)}`}>
            {metrics.consistencyScore}%
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {metrics.consistencyScore > 80 ? 'Very Stable' : 
             metrics.consistencyScore > 60 ? 'Stable' : 
             metrics.consistencyScore > 40 ? 'Variable' : 'Unstable'}
          </div>
        </div>

        {/* Profit Factor */}
        <div className="bg-slate-800/50 p-3 rounded">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-400">Profit Factor</span>
          </div>
          <div className={`text-xl font-bold ${getMetricColor(metrics.profitFactor)}`}>
            {formatMetric(metrics.profitFactor, 'x')}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {metrics.profitFactor > 2 ? 'Excellent' : 
             metrics.profitFactor > 1.5 ? 'Good' : 
             metrics.profitFactor > 1 ? 'Profitable' : 'Loss Making'}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-3 border-t border-slate-600">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Avg Daily Return</span>
          <span className={`text-sm font-semibold ${metrics.avgDailyReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatMetric(metrics.avgDailyReturn, '%')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Volatility</span>
          <span className={`text-sm font-semibold ${getMetricColor(metrics.volatility, 'lower')}`}>
            {formatMetric(metrics.volatility, '%')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Recovery Factor</span>
          <span className={`text-sm font-semibold ${getMetricColor(metrics.recoveryFactor)}`}>
            {formatMetric(metrics.recoveryFactor, 'x')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Calmar Ratio</span>
          <span className={`text-sm font-semibold ${getMetricColor(metrics.calmarRatio)}`}>
            {formatMetric(metrics.calmarRatio)}
          </span>
        </div>
      </div>

      {/* Risk Description */}
      <div className="bg-slate-800/50 p-3 rounded">
        <p className={`text-sm ${riskLevel.color}`}>
          <span className="font-semibold">Risk Profile:</span> {riskLevel.description}
        </p>
      </div>
    </div>
  );
};

export default TradingStatsCard;
