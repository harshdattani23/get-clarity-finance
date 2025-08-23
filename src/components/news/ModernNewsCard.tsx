import React from 'react';
import { TrendingUp, TrendingDown, Clock, ExternalLink, Hash, AlertCircle, ChevronRight, Bot } from 'lucide-react';
import styles from '@/styles/news.module.css';

interface NewsCardProps {
  title: string;
  category: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  priority?: 'high' | 'medium' | 'low';
  summary: string;
  keyPoints?: string[];
  metrics?: Array<{
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
  tags?: string[];
  source?: string;
  timestamp: string;
  accentColor?: string;
}

export default function ModernNewsCard({
  title,
  category,
  sentiment = 'neutral',
  priority = 'medium',
  summary,
  keyPoints = [],
  metrics = [],
  tags = [],
  source,
  timestamp,
  accentColor = 'blue'
}: NewsCardProps) {
  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getSentimentBg = () => {
    switch (sentiment) {
      case 'positive': return 'bg-green-500/10 border-green-500/20';
      case 'negative': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  const getSentimentIcon = () => {
    switch (sentiment) {
      case 'positive': return '↗';
      case 'negative': return '↘';
      default: return '→';
    }
  };

  const getAccentStyles = () => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-emerald-500 to-green-600',
      yellow: 'from-amber-500 to-yellow-600',
      purple: 'from-purple-500 to-purple-600'
    };
    return colors[accentColor as keyof typeof colors] || colors.blue;
  };

  return (
    <div className={`${styles.newsCard} rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-800`}>
      {/* Header Accent Bar */}
      <div className={`h-1 bg-gradient-to-r ${getAccentStyles()}`} />
      
      <div className="p-6">
        {/* Top Meta Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {category}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 bg-gray-800/50 text-gray-500 text-xs rounded-full">
              <Bot className="w-3 h-3" />
              AI Analysis
            </span>
            {priority === 'high' && (
              <span className="flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                <AlertCircle className="w-3 h-3" />
                High Priority
              </span>
            )}
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getSentimentBg()}`}>
            <span className={`text-lg ${getSentimentColor()}`}>{getSentimentIcon()}</span>
            <span className={`text-xs font-medium ${getSentimentColor()}`}>
              {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className={`${styles.newsHeadline} text-lg mb-3 group-hover:text-blue-400 transition-colors`}>
          {title
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .trim()}
        </h3>

        {/* Summary */}
        {summary && (
          <p className={`${styles.newsText} text-sm mb-4`}>
            {summary
              .replace(/\*\*([^*]+)\*\*/g, '$1')
              .replace(/\*([^*]+)\*/g, '$1')
              .substring(0, 200)}
            {summary.length > 200 && '...'}
          </p>
        )}

        {/* Key Metrics - Visual Cards */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {metrics.slice(0, 4).map((metric, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
                <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                <div className="flex items-center justify-between">
                  <span className={`${styles.newsMetric} text-lg font-bold text-white`}>{metric.value}</span>
                  {metric.trend && (
                    <span className={metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}>
                      {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : 
                       metric.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
                    </span>
                  )}
                </div>
                {metric.change && (
                  <div className={`text-xs mt-1 ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                    {metric.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Key Points */}
        {keyPoints.length > 0 && (
          <div className="mb-4">
            <div className="space-y-2">
              {keyPoints.slice(0, 3).map((point, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span key={idx} className="flex items-center gap-1 px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-lg">
                <Hash className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(timestamp).toLocaleString()}
              </span>
              {source && (
                <span className="flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  {source}
                </span>
              )}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/50">
            <p className="text-xs text-gray-600 italic">
              <span className="text-amber-600">⚠</span> AI-generated summary. Not investment advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
