'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Newspaper, Clock, TrendingUp, AlertCircle, Filter, ExternalLink } from 'lucide-react';

interface NewsSource {
  title: string;
  url: string;
  date: string;
  last_updated: string;
}

interface NewsData {
  news: string;
  timestamp: string;
  sources: NewsSource[];
  summary?: string;
  formattedNews?: string;
}

interface CompanyNewsProps {
  ticker?: string;
}

type NewsType = 'financial' | 'market' | 'company' | 'general';
type Timeframe = '1h' | '24h' | '7d' | '30d';

export default function CompanyNews({ ticker }: CompanyNewsProps) {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [newsType, setNewsType] = useState<NewsType>('financial');
  const [timeframe, setTimeframe] = useState<Timeframe>('24h');

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ticker: ticker || undefined, 
          newsType, 
          timeframe 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setNewsData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }, [ticker, newsType, timeframe]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const formatNewsContent = (content: string) => {
    // Split content by lines and filter empty lines
    const lines = content.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => {
      // Check if line contains markdown links [text](url)
      const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
      
      if (linkMatch) {
        const [, linkText, linkUrl] = linkMatch;
        return (
          <p key={index} className="mb-2 text-gray-300 leading-relaxed text-sm">
            {line.replace(/\[([^\]]+)\]\(([^)]+)\)/, '')}
            <a 
              href={linkUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline ml-1"
            >
              {linkText}
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        );
      }
      
      return (
        <p key={index} className="mb-2 text-gray-300 leading-relaxed text-sm">
          {line.trim()}
        </p>
      );
    });
  };

  const renderSources = (sources: NewsSource[]) => {
    if (!sources || sources.length === 0) return null;
    
    return (
      <div className="bg-gray-700/30 p-4 rounded-lg">
        <h4 className="font-medium text-blue-300 mb-3 text-sm">Sources</h4>
        <div className="space-y-2">
          {sources.map((source, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline flex items-center gap-2 flex-1 min-w-0"
              >
                <span className="truncate">{source.title}</span>
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
              <span className="text-gray-500 text-xs ml-2 flex-shrink-0">
                {source.date !== 'Unknown' ? source.date : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getNewsTypeLabel = (type: NewsType) => {
    switch (type) {
      case 'financial': return 'Financial';
      case 'market': return 'Market';
      case 'company': return 'Company';
      case 'general': return 'General';
      default: return 'News';
    }
  };

  const getTimeframeLabel = (tf: Timeframe) => {
    switch (tf) {
      case '1h': return '1H';
      case '24h': return '24H';
      case '7d': return '7D';
      case '30d': return '30D';
      default: return '24H';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      {/* Header - Compact */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Newspaper className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">
            {ticker ? `${ticker} News` : 'Market News'}
          </h2>
        </div>
        <button
          onClick={fetchNews}
          disabled={loading}
          className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-sm transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters - Horizontal, Compact */}
      <div className="flex items-center justify-between p-4 bg-gray-750 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={newsType}
              onChange={(e) => setNewsType(e.target.value as NewsType)}
              className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="financial">Financial</option>
              <option value="market">Market</option>
              <option value="company">Company</option>
              <option value="general">General</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as Timeframe)}
              className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="1h">1 Hour</option>
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
            </select>
          </div>
        </div>

        {lastUpdated && (
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{formatTimeAgo(lastUpdated.toISOString())}</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3 text-gray-400">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Fetching latest {newsType} news...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-3 p-4 bg-red-900/20 border border-red-700/30 rounded-md">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-red-400 font-medium text-sm">Error fetching news</p>
              <p className="text-red-300 text-xs">{error}</p>
            </div>
          </div>
        )}

        {newsData && !loading && !error && (
          <div className="space-y-4">
            {/* Summary - Compact */}
            {newsData.summary && (
              <div className="bg-blue-900/10 border-l-4 border-blue-500 p-3 rounded-r">
                <h4 className="font-medium text-blue-300 mb-1 text-sm">Summary</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{newsData.summary}</p>
              </div>
            )}

            {/* Main News - Clean Layout */}
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white mb-3 text-base">Latest Updates</h3>
                  <div className="text-gray-300 space-y-2">
                    {formatNewsContent(newsData.formattedNews || newsData.news)}
                  </div>
                </div>
              </div>
            </div>

            {/* Sources */}
            {renderSources(newsData.sources)}
            
            {/* Footer - Minimal */}
            <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-700">
              Powered by Perplexity AI • {getNewsTypeLabel(newsType)} • {getTimeframeLabel(timeframe)}
            </div>
          </div>
        )}

        {!newsData && !loading && !error && (
          <div className="text-center py-12 text-gray-400">
            <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No news available</p>
            <p className="text-xs">Try refreshing to get updates</p>
          </div>
        )}
      </div>
    </div>
  );
}
