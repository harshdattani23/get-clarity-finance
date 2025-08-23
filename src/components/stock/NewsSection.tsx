'use client';

import { useState, useEffect, useCallback } from 'react';

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
  sentiment?: 'positive' | 'negative' | 'neutral';
}

interface NewsSectionProps {
  ticker: string;
}

export default function NewsSection({ ticker }: NewsSectionProps) {
  const [newsCache, setNewsCache] = useState<{ 
    '24h': {
      company: NewsData | null;
      financial: NewsData | null;
      market: NewsData | null;
    };
    '30d': {
      company: NewsData | null;
      financial: NewsData | null;
      market: NewsData | null;
    };
  }>({
    '24h': { company: null, financial: null, market: null },
    '30d': { company: null, financial: null, market: null }
  });
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsLoaded, setNewsLoaded] = useState(false);
  const [expandedNews, setExpandedNews] = useState({
    company: false,
    financial: false,
    market: false,
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '30d'>('24h');

  const fetchAllNewsData = useCallback(async () => {
    if (!ticker || newsLoading || newsLoaded) return;

    const cachedNews = localStorage.getItem(`newsCache_${ticker}`);
    if (cachedNews) {
      const { data, timestamp } = JSON.parse(cachedNews);
      const isCacheValid = new Date().toDateString() === new Date(timestamp).toDateString();
      if (isCacheValid) {
        setNewsCache(data);
        setNewsLoaded(true);
        return;
      }
    }
    
    setNewsLoading(true);
    try {
      const [
        company24h, financial24h, market24h,
        company30d, financial30d, market30d
      ] = await Promise.all([
        fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticker, newsType: 'company', timeframe: '24h' }),
        }),
        fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticker, newsType: 'financial', timeframe: '24h' }),
        }),
        fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newsType: 'market', timeframe: '24h' }),
        }),
        fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticker, newsType: 'company', timeframe: '30d' }),
        }),
        fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticker, newsType: 'financial', timeframe: '30d' }),
        }),
        fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newsType: 'market', timeframe: '30d' }),
        }),
      ]);

      const [
        company24hData, financial24hData, market24hData,
        company30dData, financial30dData, market30dData
      ] = await Promise.all([
        company24h.ok ? company24h.json() : null,
        financial24h.ok ? financial24h.json() : null,
        market24h.ok ? market24h.json() : null,
        company30d.ok ? company30d.json() : null,
        financial30d.ok ? financial30d.json() : null,
        market30d.ok ? market30d.json() : null,
      ]);

      const newsData = {
        '24h': {
          company: company24hData,
          financial: financial24hData,
          market: market24hData,
        },
        '30d': {
          company: company30dData,
          financial: financial30dData,
          market: market30dData,
        }
      };

      setNewsCache(newsData);
      localStorage.setItem(`newsCache_${ticker}`, JSON.stringify({ data: newsData, timestamp: new Date() }));
      
      setNewsLoaded(true);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setNewsLoading(false);
    }
  }, [ticker, newsLoading, newsLoaded]);

  useEffect(() => {
    if (ticker && !newsLoaded) {
      fetchAllNewsData();
    }
  }, [ticker, newsLoaded, fetchAllNewsData]);

  const formatNewsContent = (newsText: string, type: 'company' | 'financial' | 'market'): React.ReactNode[] => {
    if (!newsText) return [];

    const lines = newsText.split('\n').filter((line: string) => line.trim());
    const isExpanded = expandedNews[type];

    if (!isExpanded && lines.length > 8) {
      return lines.slice(0, 8).map((line, index) => formatNewsLine(line, index, type));
    }

    return lines.map((line, index) => formatNewsLine(line, index, type));
  };

  const formatNewsLine = (line: string, index: number, type: 'company' | 'financial' | 'market'): React.ReactNode => {
    const linkMatch = line.match(/`\[([^\]]+)\]\(([^)]+)\)`/);

    if (linkMatch) {
      const [, linkText, linkUrl] = linkMatch;
      const textBeforeLink = line.replace(/`\[([^\]]+)\]\(([^)]+)\)`/, '');

      return (
        <div key={index} className="mb-2">
          {textBeforeLink && <span>{textBeforeLink}</span>}
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline ml-1"
          >
            {linkText}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      );
    }

    if (line.trim().startsWith('**') && line.includes('**:')) {
      const colorClass = type === 'company' ? 'text-blue-300' : type === 'financial' ? 'text-green-300' : 'text-yellow-300';
      return (
        <div key={index} className={`font-semibold ${colorClass} mb-2`}>
          {line}
        </div>
      );
    }

    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <div key={index} className="ml-4 mb-2">
          {line}
        </div>
      );
    }

    if (line.trim().match(/^\d+\./)) {
      return (
        <div key={index} className="ml-4 mb-2">
          {line}
        </div>
      );
    }

    if (line.trim()) {
      return (
        <div key={index} className="mb-2">
          {line}
        </div>
      );
    }

    return null;
  };

  const renderSources = (sources: NewsSource[], type: 'company' | 'financial' | 'market') => {
    if (!sources || sources.length === 0) return null;

    const colorClass = type === 'company' ? 'text-blue-400' : type === 'financial' ? 'text-green-400' : 'text-yellow-400';

    return (
      <div className="mt-3 p-3 bg-gray-600 rounded-md">
        <h5 className="text-xs font-medium text-gray-300 mb-2">Sources:</h5>
        <div className="space-y-1">
          {sources.slice(0, 3).map((source, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${colorClass} hover:opacity-80 underline flex items-center gap-1 flex-1 min-w-0`}
              >
                <span className="truncate">{source.title}</span>
                <svg className="w-2 h-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              {source.date !== 'Unknown' && (
                <span className="text-gray-500 ml-2 flex-shrink-0 text-xs">
                  {source.date}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const toggleNewsExpansion = (type: 'company' | 'financial' | 'market') => {
    setExpandedNews(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => {
            setSelectedTimeframe('24h');
            setExpandedNews({ company: false, financial: false, market: false });
          }}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedTimeframe === '24h'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Last 24 Hours
        </button>
        <button
          onClick={() => {
            setSelectedTimeframe('30d');
            setExpandedNews({ company: false, financial: false, market: false });
          }}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedTimeframe === '30d'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Last 30 Days
        </button>
      </div>

      {newsLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-400">Fetching latest news from Perplexity...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              Company News & Updates
            </h3>
            <div className="space-y-4">
              {newsCache[selectedTimeframe].company ? (
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2">Latest Company Updates</h4>
                      <div className="text-gray-300 text-sm mb-3 space-y-2">
                        {formatNewsContent(newsCache[selectedTimeframe].company.formattedNews || newsCache[selectedTimeframe].company.news, 'company')}
                      </div>
                      {renderSources(newsCache[selectedTimeframe].company.sources, 'company')}
                      {newsCache[selectedTimeframe].company.news.split('\n').filter(line => line.trim()).length > 8 && (
                        <button
                          onClick={() => toggleNewsExpansion('company')}
                          className="text-blue-400 hover:text-blue-300 text-xs mt-2"
                        >
                          {expandedNews.company ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                      <div className="flex items-center text-xs text-gray-400">
                        <span>{new Date(newsCache[selectedTimeframe].company.timestamp).toLocaleString()}</span>
                        {newsCache[selectedTimeframe].company.sources && newsCache[selectedTimeframe].company.sources.length > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{newsCache[selectedTimeframe].company.sources[0].title}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-block px-2 py-1 text-white text-xs rounded ${newsCache[selectedTimeframe].company.sentiment === 'positive' ? 'bg-green-600' : newsCache[selectedTimeframe].company.sentiment === 'negative' ? 'bg-red-600' : 'bg-blue-600'}`}>
                        {newsCache[selectedTimeframe].company.sentiment || 'Neutral'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">No company news available</div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              Financial & Earnings
            </h3>
            <div className="space-y-4">
              {newsCache[selectedTimeframe].financial ? (
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2">Financial Performance</h4>
                      <div className="text-gray-300 text-sm mb-3 space-y-2">
                        {formatNewsContent(newsCache[selectedTimeframe].financial.formattedNews || newsCache[selectedTimeframe].financial.news, 'financial')}
                      </div>
                      {renderSources(newsCache[selectedTimeframe].financial.sources, 'financial')}
                      {newsCache[selectedTimeframe].financial.news.split('\n').filter(line => line.trim()).length > 8 && (
                        <button
                          onClick={() => toggleNewsExpansion('financial')}
                          className="text-green-400 hover:text-green-300 text-xs mt-2"
                        >
                          {expandedNews.financial ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                      <div className="flex items-center text-xs text-gray-400">
                        <span>{new Date(newsCache[selectedTimeframe].financial.timestamp).toLocaleString()}</span>
                        {newsCache[selectedTimeframe].financial.sources && newsCache[selectedTimeframe].financial.sources.length > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{newsCache[selectedTimeframe].financial.sources[0].title}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-block px-2 py-1 text-white text-xs rounded ${newsCache[selectedTimeframe].financial.sentiment === 'positive' ? 'bg-green-600' : newsCache[selectedTimeframe].financial.sentiment === 'negative' ? 'bg-red-600' : 'bg-blue-600'}`}>
                        {newsCache[selectedTimeframe].financial.sentiment || 'Neutral'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">No financial news available</div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
              Indian Market & Sector Updates
            </h3>
            <div className="space-y-4">
              {newsCache[selectedTimeframe].market ? (
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2">Market Overview</h4>
                      <div className="text-gray-300 text-sm mb-3 space-y-2">
                        {formatNewsContent(newsCache[selectedTimeframe].market.formattedNews || newsCache[selectedTimeframe].market.news, 'market')}
                      </div>
                      {renderSources(newsCache[selectedTimeframe].market.sources, 'market')}
                      {newsCache[selectedTimeframe].market.news.split('\n').filter(line => line.trim()).length > 8 && (
                        <button
                          onClick={() => toggleNewsExpansion('market')}
                          className="text-yellow-400 hover:text-yellow-300 text-xs mt-2"
                        >
                          {expandedNews.market ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                      <div className="flex items-center text-xs text-gray-400">
                        <span>{new Date(newsCache[selectedTimeframe].market.timestamp).toLocaleString()}</span>
                        {newsCache[selectedTimeframe].market.sources && newsCache[selectedTimeframe].market.sources.length > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{newsCache[selectedTimeframe].market.sources[0].title}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-block px-2 py-1 text-white text-xs rounded ${newsCache[selectedTimeframe].market.sentiment === 'positive' ? 'bg-green-600' : newsCache[selectedTimeframe].market.sentiment === 'negative' ? 'bg-red-600' : 'bg-blue-600'}`}>
                        {newsCache[selectedTimeframe].market.sentiment || 'Neutral'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">No market news available</div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={() => {
            setNewsLoaded(false);
            setNewsCache({
              '24h': { company: null, financial: null, market: null },
              '30d': { company: null, financial: null, market: null }
            });
            fetchAllNewsData();
          }}
          disabled={newsLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {newsLoading ? 'Refreshing...' : 'Refresh News'}
        </button>
      </div>
    </div>
  );
}
