'use client';

import React, { useState } from 'react';
import ModernNewsCard from './ModernNewsCard';
import { Newspaper, Building2, DollarSign, BarChart3, Filter, RefreshCw, Calendar, Sparkles, AlertTriangle, Bot } from 'lucide-react';

interface NewsSource {
  title: string;
  url: string;
  date: string;
  last_updated: string;
}

interface ParsedNewsSection {
  type: string;
  content: string;
  metadata?: {
    label?: string;
    value?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
    isImportant?: boolean;
  };
}

interface FormattedNews {
  headline?: string;
  keyMetrics: Array<{
    label: string;
    value: string;
    change?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
  }>;
  highlights: string[];
  details: ParsedNewsSection[];
  summary: string;
  lastUpdated?: string;
}

interface CompanyMetrics {
  quarterlyResults?: {
    quarter: string;
    profit?: string;
    revenue?: string;
    yoy?: string;
  };
  stockMetrics?: {
    currentPrice?: string;
    targetPrice?: string;
    weekRange?: string;
    volume?: string;
  };
  dates?: {
    announcementDate?: string;
    meetingDate?: string;
    resultDate?: string;
  };
}

interface NewsData {
  news: string;
  timestamp: string;
  sources: NewsSource[];
  summary?: string;
  formattedNews?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  structuredData?: FormattedNews;
  category?: string;
  tags?: string[];
  priority?: 'high' | 'medium' | 'low';
  metrics?: CompanyMetrics;
}

interface NewsDisplayLayoutProps {
  newsData: {
    company: NewsData | null;
    financial: NewsData | null;
    market: NewsData | null;
  };
  timeframe: '24h' | '30d';
  onTimeframeChange: (timeframe: '24h' | '30d') => void;
  onRefresh: () => void;
  isLoading?: boolean;
  ticker?: string;
}

export default function NewsDisplayLayout({
  newsData,
  timeframe,
  onTimeframeChange,
  onRefresh,
  isLoading = false,
  ticker
}: NewsDisplayLayoutProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'company' | 'financial' | 'market'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'list' | 'timeline'>('cards');

  // Helper function to prepare news card data
  const prepareCardData = (data: NewsData | null, type: 'company' | 'financial' | 'market') => {
    if (!data) return null;

    const accentColors = {
      company: 'blue',
      financial: 'green',
      market: 'yellow'
    };

    const categoryNames = {
      company: 'Company Updates',
      financial: 'Financial News',
      market: 'Market Analysis'
    };

    // Extract title from structured data or create one
    let title = data.structuredData?.headline || '';
    
    // If no headline, create a cleaner one from the news content
    if (!title && data.news) {
      // Try to extract first meaningful sentence
      const firstSentence = data.news.match(/[^.!?]+[.!?]/)?.[0];
      if (firstSentence) {
        // Clean up the sentence
        title = firstSentence
          .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markers
          .replace(/^In the last \d+ (?:hours?|days?),?\s*/i, '') // Remove time prefix
          .trim();
        
        // If title is too long, truncate smartly
        if (title.length > 120) {
          title = title.substring(0, 117) + '...';
        }
      }
    }
    
    // Fallback to generic title if still empty
    if (!title) {
      title = `${categoryNames[type]} Update for ${ticker || 'Stock'}`;
    }

    // Extract key points
    const keyPoints = data.structuredData?.highlights || [];

    // Prepare metrics
    const metrics: { label: string; value: string; trend: "up" | "down" | "neutral"; change: string | undefined; }[] = [];
    if (data.structuredData?.keyMetrics) {
      data.structuredData.keyMetrics.forEach((metric: { label: string; value: string; sentiment?: 'positive' | 'negative' | 'neutral'; change?: string; }) => {
        metrics.push({
          label: metric.label,
          value: metric.value,
          trend: metric.sentiment === 'positive' ? 'up' : 
                 metric.sentiment === 'negative' ? 'down' : 'neutral',
          change: metric.change
        });
      });
    }

    return {
      title,
      category: data.category || categoryNames[type],
      sentiment: data.sentiment,
      priority: data.priority,
      summary: data.summary || data.structuredData?.summary || '',
      keyPoints,
      metrics,
      tags: data.tags,
      source: data.sources?.[0]?.title,
      timestamp: data.timestamp,
      accentColor: accentColors[type]
    };
  };

  const companyCard = prepareCardData(newsData.company, 'company');
  const financialCard = prepareCardData(newsData.financial, 'financial');
  const marketCard = prepareCardData(newsData.market, 'market');

  const allCards = [companyCard, financialCard, marketCard].filter(card => card !== null);
  
  const getFilteredCards = () => {
    switch (selectedCategory) {
      case 'company': return companyCard ? [companyCard] : [];
      case 'financial': return financialCard ? [financialCard] : [];
      case 'market': return marketCard ? [marketCard] : [];
      default: return allCards;
    }
  };

  const filteredCards = getFilteredCards();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Fetching latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Market Intelligence</h2>
              <p className="text-sm text-gray-400">Real-time news and analysis</p>
            </div>
          </div>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => onTimeframeChange('24h')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  timeframe === '24h' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                24 Hours
              </button>
              <button
                onClick={() => onTimeframeChange('30d')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  timeframe === '30d' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                All News
              </button>
              <button
                onClick={() => setSelectedCategory('company')}
                className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === 'company'
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3 h-3" />
                Company
              </button>
              <button
                onClick={() => setSelectedCategory('financial')}
                className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === 'financial'
                    ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-3 h-3" />
                Financial
              </button>
              <button
                onClick={() => setSelectedCategory('market')}
                className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === 'market'
                    ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3 h-3" />
                Market
              </button>
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                viewMode === 'cards'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* AI Disclaimer */}
      <div className="bg-amber-900/20 border border-amber-600/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 bg-amber-600/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-amber-400">AI-Generated Analysis Disclaimer</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              The sentiment analysis and news summaries displayed are generated by AI and are for informational purposes only. 
              This is <span className="text-amber-400 font-medium">NOT investment advice</span>. 
              Always conduct your own research and consult with qualified financial advisors before making investment decisions. 
              Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {companyCard && (
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 relative">
            <div className="absolute top-2 right-2">
              <div className="group relative">
                <Bot className="w-3 h-3 text-gray-600 cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-800 text-xs text-gray-300 rounded-lg p-2 w-48 border border-gray-700">
                    AI-generated sentiment analysis
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 uppercase">Company Sentiment</span>
              <Building2 className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${
                companyCard.sentiment === 'positive' ? 'text-green-400' : 
                companyCard.sentiment === 'negative' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {companyCard.sentiment === 'positive' ? '↗' : 
                 companyCard.sentiment === 'negative' ? '↘' : '→'}
              </span>
              <span className="text-sm text-gray-300 capitalize">{companyCard.sentiment || 'Neutral'}</span>
            </div>
          </div>
        )}
        
        {financialCard && (
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 relative">
            <div className="absolute top-2 right-2">
              <div className="group relative">
                <Bot className="w-3 h-3 text-gray-600 cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-800 text-xs text-gray-300 rounded-lg p-2 w-48 border border-gray-700">
                    AI-generated sentiment analysis
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 uppercase">Financial Outlook</span>
              <DollarSign className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${
                financialCard.sentiment === 'positive' ? 'text-green-400' : 
                financialCard.sentiment === 'negative' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {financialCard.sentiment === 'positive' ? '↗' : 
                 financialCard.sentiment === 'negative' ? '↘' : '→'}
              </span>
              <span className="text-sm text-gray-300 capitalize">{financialCard.sentiment || 'Neutral'}</span>
            </div>
          </div>
        )}
        
        {marketCard && (
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 relative">
            <div className="absolute top-2 right-2">
              <div className="group relative">
                <Bot className="w-3 h-3 text-gray-600 cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-800 text-xs text-gray-300 rounded-lg p-2 w-48 border border-gray-700">
                    AI-generated sentiment analysis
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 uppercase">Market Trend</span>
              <BarChart3 className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${
                marketCard.sentiment === 'positive' ? 'text-green-400' : 
                marketCard.sentiment === 'negative' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {marketCard.sentiment === 'positive' ? '↗' : 
                 marketCard.sentiment === 'negative' ? '↘' : '→'}
              </span>
              <span className="text-sm text-gray-300 capitalize">{marketCard.sentiment || 'Neutral'}</span>
            </div>
          </div>
        )}
      </div>

      {/* News Cards Display */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCards.map((card, index) => (
            card && <ModernNewsCard key={index} {...card} />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredCards.map((card, index) => (
            card && (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {card.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        card.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                        card.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {card.sentiment}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{card.summary}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{new Date(card.timestamp).toLocaleString()}</span>
                      {card.source && <span>• {card.source}</span>}
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No news available for the selected filters</p>
        </div>
      )}
    </div>
  );
}
