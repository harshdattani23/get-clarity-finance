'use client';

import { useState, useEffect } from 'react';
import { Newspaper, TrendingUp, AlertCircle, Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import SourceAttribution from './SourceAttribution';
import { DEFAULT_TOPICS, MARKET_SECTORS } from '@/config/news';
import type { NewsItem as NewsItemType, NewsApiResponse } from '@/types/news';

interface ExplainedNewsWidgetProps {
  topics?: string[];
  query?: string;
  sector?: string;
  maxItems?: number;
}

const ExplainedNewsWidget: React.FC<ExplainedNewsWidgetProps> = ({ 
  topics, 
  query, 
  sector,
  maxItems = 5 
}) => {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | undefined>(sector);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNews = async () => {
    try {
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (query) {
        params.append('query', query);
      } else if (topics && topics.length > 0) {
        params.append('topics', topics.join(','));
      } else if (!selectedSector) {
        // Use default topics if no specific query/topics/sector
        params.append('topics', DEFAULT_TOPICS.slice(0, 3).join(','));
      }
      
      if (selectedSector) {
        params.append('sector', selectedSector);
      }
      
      params.append('maxItems', maxItems.toString());
      params.append('lang', 'en'); // TODO: Get from i18n context
      
      // Fetch from API
      const response = await fetch(`/api/news/synthesize?${params}`);
      const data: NewsApiResponse = await response.json();
      
      if (!response.ok) {
        // Handle missing API key specifically
        if (data.error && data.error.includes('PERPLEXITY_API_KEY')) {
          setNews([]);
          setError('News service configuration pending. Please check back later.');
          return;
        }
        throw new Error(data.warnings?.[0] || 'Failed to fetch news');
      }
      
      setNews(data.items);
      
      // Show warnings if any
      if (data.warnings && data.warnings.length > 0) {
        console.warn('News API warnings:', data.warnings);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedSector]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchNews();
  };

  const handleSectorChange = (sectorId: string | undefined) => {
    setSelectedSector(sectorId);
    setLoading(true);
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-4 h-4" />;
      case 'negative': return <AlertCircle className="w-4 h-4" />;
      default: return <Newspaper className="w-4 h-4" />;
    }
  };

  if (loading && !isRefreshing) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-6 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error && !isRefreshing) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-red-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
          <button
            onClick={handleRefresh}
            className="text-red-600 hover:text-red-800 font-medium text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sector Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSectorChange(undefined)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              !selectedSector
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Sectors
          </button>
          {['regulatory', 'banking', 'it', 'pharma', 'auto'].map((sectorId) => {
            const sector = MARKET_SECTORS.find(s => s.id === sectorId);
            if (!sector) return null;
            return (
            <button
              key={sector.id}
              onClick={() => handleSectorChange(sector.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedSector === sector.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sector.icon} {sector.label}
            </button>
            );
          })}
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          {isRefreshing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* News Items */}
      {news.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
          No news available for the selected criteria
        </div>
      ) : (
        news.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <div className="flex items-center gap-3 text-sm">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(item.sentiment)}`}>
                    {getSentimentIcon(item.sentiment)}
                    {item.sentiment || 'neutral'}
                  </span>
                  {item.tickers && item.tickers.length > 0 && (
                    <div className="flex gap-1">
                      {item.tickers.map((ticker, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-mono">
                          {ticker}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <p className="text-gray-600 mb-4">{item.summary}</p>

            {/* Key Points */}
            {item.keyPoints && item.keyPoints.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Key Insights
                </div>
                <ul className="space-y-1">
                  {item.keyPoints.map((point, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Source Attribution */}
            {item.sources && item.sources.length > 0 && (
              <div className="mt-4">
                <SourceAttribution sources={item.sources} compact={true} />
              </div>
            )}
          </div>
        ))
      )}
      
      {/* Disclaimer */}
      <div className="text-xs text-gray-500 text-center mt-6 p-4 bg-gray-50 rounded">
        <p>This content is AI-synthesized from multiple sources for educational purposes only.</p>
        <p>Not investment advice. Please verify information independently.</p>
      </div>
    </div>
  );
};

export default ExplainedNewsWidget;
