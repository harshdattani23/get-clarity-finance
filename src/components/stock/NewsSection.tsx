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
    // Clean up the line first
    let cleanedLine = line.trim();
    
    // Remove redundant asterisks and fix formatting
    cleanedLine = cleanedLine
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove **text** and keep just text
      .replace(/\*\*([^*:]+):\*\*/g, '**$1:**') // Standardize **heading:** format
      .replace(/\*\*([^*:]+)\*\*:/g, '**$1:**'); // Fix **heading**: format
    
    // Handle links
    const linkMatch = cleanedLine.match(/`?\[([^\]]+)\]\(([^)]+)\)`?/);
    if (linkMatch) {
      const [fullMatch, linkText, linkUrl] = linkMatch;
      const textBeforeLink = cleanedLine.replace(fullMatch, '').trim();

      return (
        <div key={index} className="mb-3 leading-relaxed">
          {textBeforeLink && <span className="text-gray-300">{textBeforeLink} </span>}
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

    // Handle section headings (bold text with colons)
    if (cleanedLine.match(/^\*\*[^*:]+:\*\*/) || cleanedLine.includes(':**')) {
      const colorClass = type === 'company' ? 'text-blue-300' : type === 'financial' ? 'text-green-300' : 'text-purple-300';
      const headingText = cleanedLine.replace(/\*\*/g, ''); // Remove remaining asterisks
      return (
        <div key={index} className={`font-semibold ${colorClass} mb-3 mt-4 text-base border-b border-gray-600 pb-1`}>
          {headingText}
        </div>
      );
    }

    // Handle bullet points and lists
    if (cleanedLine.startsWith('•') || cleanedLine.startsWith('-') || cleanedLine.match(/^\s*[-•]/)) {
      return (
        <div key={index} className="ml-4 mb-2 text-gray-300 leading-relaxed flex items-start">
          <span className="text-gray-500 mr-2 flex-shrink-0">•</span>
          <span className="break-words overflow-hidden">{cleanedLine.replace(/^[-•]\s*/, '')}</span>
        </div>
      );
    }

    // Handle numbered lists
    if (cleanedLine.match(/^\d+\./)) {
      return (
        <div key={index} className="ml-4 mb-2 text-gray-300 leading-relaxed break-words overflow-hidden">
          {cleanedLine}
        </div>
      );
    }

    // Handle key-value pairs or data points
    if (cleanedLine.includes(':') && !cleanedLine.includes('**')) {
      const parts = cleanedLine.split(':');
      if (parts.length === 2) {
        return (
          <div key={index} className="mb-2 flex items-start justify-between bg-gray-750 p-2 rounded gap-2">
            <span className="text-gray-400 text-sm flex-1 break-words">{parts[0].trim()}</span>
            <span className="text-white font-medium text-sm ml-2 break-words">{parts[1].trim()}</span>
          </div>
        );
      }
    }

    // Handle regular paragraphs
    if (cleanedLine) {
      return (
        <div key={index} className="mb-3 text-gray-300 leading-relaxed break-words overflow-hidden">
          {cleanedLine}
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
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => {
              setSelectedTimeframe('24h');
              setExpandedNews({ company: false, financial: false, market: false });
            }}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex-shrink-0 ${selectedTimeframe === '24h'
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
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex-shrink-0 ${selectedTimeframe === '30d'
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
          <div className="w-full">
            <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 lg:gap-6 auto-rows-fr">
              {/* Company News Card */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg min-h-fit">
                <div className="p-4 lg:p-6 border-b border-gray-700">
                  <h3 className="text-lg lg:text-xl font-semibold text-white flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                    <span className="truncate">Latest Company Updates</span>
                  </h3>
                </div>
                <div className="p-4 lg:p-6 overflow-hidden">
                  {newsCache[selectedTimeframe].company ? (
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm mb-4 break-words">
                              {formatNewsContent(newsCache[selectedTimeframe].company.formattedNews || newsCache[selectedTimeframe].company.news, 'company')}
                            </div>
                            {renderSources(newsCache[selectedTimeframe].company.sources, 'company')}
                            {newsCache[selectedTimeframe].company.news.split('\n').filter(line => line.trim()).length > 8 && (
                              <button
                                onClick={() => toggleNewsExpansion('company')}
                                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm mt-3 font-medium"
                              >
                                {expandedNews.company ? 'Show Less' : 'Read More'}
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expandedNews.company ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                              </button>
                            )}
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <span className={`inline-block px-3 py-1 text-white text-xs font-medium rounded-full ${
                              newsCache[selectedTimeframe].company.sentiment === 'positive' ? 'bg-green-600' : 
                              newsCache[selectedTimeframe].company.sentiment === 'negative' ? 'bg-red-600' : 'bg-blue-600'
                            }`}>
                              {newsCache[selectedTimeframe].company.sentiment || 'Neutral'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-700">
                          <span>Updated {new Date(newsCache[selectedTimeframe].company.timestamp).toLocaleDateString()}</span>
                          {newsCache[selectedTimeframe].company.sources && newsCache[selectedTimeframe].company.sources.length > 0 && (
                            <span className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                              </svg>
                              {newsCache[selectedTimeframe].company.sources.length} source{newsCache[selectedTimeframe].company.sources.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center py-12">
                      <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      <p>No company news available</p>
                      <p className="text-sm mt-1">Check back later for updates</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Financial News Card */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg min-h-fit">
                <div className="p-4 lg:p-6 border-b border-gray-700">
                  <h3 className="text-lg lg:text-xl font-semibold text-white flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                    <span className="truncate">Financial Performance</span>
                  </h3>
                </div>
                <div className="p-4 lg:p-6 overflow-hidden">
                  {newsCache[selectedTimeframe].financial ? (
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm mb-4 break-words">
                              {formatNewsContent(newsCache[selectedTimeframe].financial.formattedNews || newsCache[selectedTimeframe].financial.news, 'financial')}
                            </div>
                            {renderSources(newsCache[selectedTimeframe].financial.sources, 'financial')}
                            {newsCache[selectedTimeframe].financial.news.split('\n').filter(line => line.trim()).length > 8 && (
                              <button
                                onClick={() => toggleNewsExpansion('financial')}
                                className="inline-flex items-center text-green-400 hover:text-green-300 text-sm mt-3 font-medium"
                              >
                                {expandedNews.financial ? 'Show Less' : 'Read More'}
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expandedNews.financial ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                              </button>
                            )}
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <span className={`inline-block px-3 py-1 text-white text-xs font-medium rounded-full ${
                              newsCache[selectedTimeframe].financial.sentiment === 'positive' ? 'bg-green-600' : 
                              newsCache[selectedTimeframe].financial.sentiment === 'negative' ? 'bg-red-600' : 'bg-blue-600'
                            }`}>
                              {newsCache[selectedTimeframe].financial.sentiment || 'Neutral'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-700">
                          <span>Updated {new Date(newsCache[selectedTimeframe].financial.timestamp).toLocaleDateString()}</span>
                          {newsCache[selectedTimeframe].financial.sources && newsCache[selectedTimeframe].financial.sources.length > 0 && (
                            <span className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                              </svg>
                              {newsCache[selectedTimeframe].financial.sources.length} source{newsCache[selectedTimeframe].financial.sources.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center py-12">
                      <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p>No financial news available</p>
                      <p className="text-sm mt-1">Check back later for updates</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Market News Card */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg min-h-fit">
                <div className="p-4 lg:p-6 border-b border-gray-700">
                  <h3 className="text-lg lg:text-xl font-semibold text-white flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                    <span className="truncate">Market Overview</span>
                  </h3>
                </div>
                <div className="p-4 lg:p-6 overflow-hidden">
                  {newsCache[selectedTimeframe].market ? (
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm mb-4 break-words">
                              {formatNewsContent(newsCache[selectedTimeframe].market.formattedNews || newsCache[selectedTimeframe].market.news, 'market')}
                            </div>
                            {renderSources(newsCache[selectedTimeframe].market.sources, 'market')}
                            {newsCache[selectedTimeframe].market.news.split('\n').filter(line => line.trim()).length > 8 && (
                              <button
                                onClick={() => toggleNewsExpansion('market')}
                                className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm mt-3 font-medium"
                              >
                                {expandedNews.market ? 'Show Less' : 'Read More'}
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expandedNews.market ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                              </button>
                            )}
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <span className={`inline-block px-3 py-1 text-white text-xs font-medium rounded-full ${
                              newsCache[selectedTimeframe].market.sentiment === 'positive' ? 'bg-green-600' : 
                              newsCache[selectedTimeframe].market.sentiment === 'negative' ? 'bg-red-600' : 'bg-purple-600'
                            }`}>
                              {newsCache[selectedTimeframe].market.sentiment || 'Neutral'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-700">
                          <span>Updated {new Date(newsCache[selectedTimeframe].market.timestamp).toLocaleDateString()}</span>
                          {newsCache[selectedTimeframe].market.sources && newsCache[selectedTimeframe].market.sources.length > 0 && (
                            <span className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                              </svg>
                              {newsCache[selectedTimeframe].market.sources.length} source{newsCache[selectedTimeframe].market.sources.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center py-12">
                      <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <p>No market news available</p>
                      <p className="text-sm mt-1">Check back later for updates</p>
                    </div>
                  )}
                </div>
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
    </div>
  );
}
