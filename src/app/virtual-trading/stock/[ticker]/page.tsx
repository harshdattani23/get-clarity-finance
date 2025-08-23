'use client';

import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, BookOpen, Target } from 'lucide-react';
import { PortfolioProvider } from '@/contexts/virtual-trading/PortfolioContext';
import { WatchlistProvider } from '@/contexts/virtual-trading/WatchlistContext';
import TradingViewWidget from '@/components/tradingview/AdvancedChart';
import TradingActions from '@/components/stock/TradingActions';
import UserHoldings from '@/components/stock/UserHoldings';
import StockInfo from '@/components/stock/StockInfo';
import { useParams } from 'next/navigation';

// Define the types for the stock and index data
interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  marketCap: number;
  volume: number;
  avgVolume: number;
  peRatio: number | null;
  eps: number | null;
  dividendYield: number | null;
  beta: number;
  high: number;
  low: number;
  open: number;
  close: number;
  description: string;
  industry: string;
  sector: string;
  website: string;
  ceo: string;
  headquarters: string;
  employees: number;
  week52High: number | null;
  week52Low: number | null;
}

interface Index {
  name: string;
  ticker: string;
  price: number;
  change: number;
  percentChange: number;
}

interface ApiIndexData {
  ticker: string;
  price: number;
  change: number;
  percentChange: number;
}

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

export default function StockDetailPage() {
  const params = useParams();
  const ticker = params?.ticker as string;
  const [stock, setStock] = useState<Stock | null>(null);
  const [indices, setIndices] = useState<Index[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'news'>('details');
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
  const [expandedNews, setExpandedNews] = useState<{
    company: boolean;
    financial: boolean;
    market: boolean;
  }>({
    company: false,
    financial: false,
    market: false
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '30d'>('24h');

  useEffect(() => {
    if (ticker) {
      const fetchStockData = async () => {
        try {
          const res = await fetch(`/api/stock/${ticker}`);
          if (!res.ok) {
            throw new Error('Stock not found');
          }
          const data = await res.json();
          setStock(data);
        } catch (err) {
          setError((err as Error).message);
        }
      };

      const fetchIndicesData = async () => {
        try {
          const mainIndices = ['^NSEI', '^BSESN', '^NSEBANK'];
          const res = await fetch('/api/stock-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tickers: mainIndices }),
          });
          if (!res.ok) {
            throw new Error('Failed to fetch indices data');
          }
          const data = await res.json();

          const formattedIndices = data.map((d: ApiIndexData) => ({
            name: d.ticker === '^NSEI' ? 'Nifty 50' : d.ticker === '^BSESN' ? 'Sensex' : 'Bank Nifty',
            ticker: d.ticker,
            price: d.price,
            change: d.change,
            percentChange: d.percentChange,
          }));
          setIndices(formattedIndices);

        } catch (err) {
            console.error((err as Error).message)
          // Handle indices fetch error silently or show a smaller error message
        }
      };

      const fetchAllData = async () => {
        setLoading(true);
        await Promise.all([fetchStockData(), fetchIndicesData()]);
        setLoading(false);
      };

      fetchAllData();
    }
  }, [ticker]);

  // Function to fetch all news data for both timeframes (called once on page load)
  const fetchAllNewsData = useCallback(async () => {
    if (!ticker || newsLoading || newsLoaded) return;
    
    setNewsLoading(true);
    try {
      // Fetch news for both timeframes in parallel
      const [
        company24h, financial24h, market24h,
        company30d, financial30d, market30d
      ] = await Promise.all([
        // 24h timeframe
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
        // 30d timeframe
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

      // Parse all responses
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

      // Update cache with all data
      setNewsCache({
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
      });
      
      setNewsLoaded(true);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setNewsLoading(false);
    }
  }, [ticker, newsLoading, newsLoaded]);

  // Fetch all news data once when component mounts
  useEffect(() => {
    if (ticker && !newsLoaded) {
      // Start fetching news in background immediately when page loads
      fetchAllNewsData();
    }
  }, [ticker, newsLoaded, fetchAllNewsData]);

  // Helper function to format news content with links
  const formatNewsContent = (newsText: string, type: 'company' | 'financial' | 'market'): React.ReactNode[] => {
    if (!newsText) return [];

    const lines = newsText.split('\n').filter((line: string) => line.trim());
    const isExpanded = expandedNews[type];

    // If not expanded, show only first few lines
    if (!isExpanded && lines.length > 8) {
      return lines.slice(0, 8).map((line, index) => formatNewsLine(line, index, type));
    }

    return lines.map((line, index) => formatNewsLine(line, index, type));
  };

  // Helper function to format individual news lines with links
  const formatNewsLine = (line: string, index: number, type: 'company' | 'financial' | 'market'): React.ReactNode => {
    // Check if line contains markdown links [text](url)
    const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);

    if (linkMatch) {
      const [, linkText, linkUrl] = linkMatch;
      const textBeforeLink = line.replace(/\[([^\]]+)\]\(([^)]+)\)/, '');

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

    // Format section headers
    if (line.trim().startsWith('**') && line.includes('**:')) {
      const colorClass = type === 'company' ? 'text-blue-300' : type === 'financial' ? 'text-green-300' : 'text-yellow-300';
      return (
        <div key={index} className={`font-semibold ${colorClass} mb-2`}>
          {line}
        </div>
      );
    }

    // Format bullet points
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <div key={index} className="ml-4 mb-2">
          {line}
        </div>
      );
    }

    // Format numbered lists
    if (line.trim().match(/^\d+\./)) {
      return (
        <div key={index} className="ml-4 mb-2">
          {line}
        </div>
      );
    }

    // Regular text
    if (line.trim()) {
      return (
        <div key={index} className="mb-2">
          {line}
        </div>
      );
    }

    return null;
  };

  // Helper function to render sources
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

  // Toggle news expansion
  const toggleNewsExpansion = (type: 'company' | 'financial' | 'market') => {
    setExpandedNews(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stock) {
    return <div>Stock not found</div>;
  }

  return (
    <PortfolioProvider>
      <WatchlistProvider>
        <div className="container mx-auto p-4 text-white">
          {/* Combined Virtual Trading Banner */}
          <div className="mb-6 bg-gray-800 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center space-x-4">
              <Target className="h-6 w-6 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold">Virtual Trading Environment</span>
                    <span className="text-blue-300">Practice trading with virtual money - No real money at risk!</span>
                  </div>
                  <div className="hidden lg:flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-amber-400" />
                      <span className="text-amber-300 font-medium">Educational Purpose Only</span>
                      <span className="text-gray-300">All trades are simulated for learning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <span className="text-red-300 font-medium">Risk Disclaimer</span>
                      <span className="text-gray-300">Real investments involve risk of loss</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {indices.length > 0 && (
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <h2 className="text-lg font-semibold mb-3 text-gray-300">Market Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {indices.map((index) => (
                  <div key={index.name} className="text-center p-3 bg-gray-700 rounded-md">
                    <div className="text-sm text-gray-400 mb-1">{index.name}</div>
                    <div className="text-lg font-bold text-white mb-1">
                      {index.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`flex items-center justify-center gap-1 text-sm font-medium ${
                      index.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {index.change >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.percentChange.toFixed(2)}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-2">{stock.name} ({stock.ticker})</h1>
          <div className="flex items-center space-x-4 mb-6">
            <p className="text-3xl font-bold">₹{stock.price.toLocaleString('en-IN')}</p>
            <div className={`flex items-center text-xl font-semibold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stock.change >= 0 ? <TrendingUp className="mr-1 h-5 w-5" /> : <TrendingDown className="mr-1 h-5 w-5" />}
              <span>{stock.change.toFixed(2)} ({stock.percentChange.toFixed(2)}%)</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex border-b border-gray-600">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'details'
                    ? 'text-white border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Stock Details & Chart
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'news'
                    ? 'text-white border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                News
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-[500px] mb-8">
                  <TradingViewWidget symbol={stock.ticker} theme="dark" />
                </div>
              </div>
              
              <div className="space-y-8">
                <TradingActions stock={stock} />
                <UserHoldings stock={stock} />
                <StockInfo stock={stock} />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Time Period Tabs */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => {
                    setSelectedTimeframe('24h');
                    setExpandedNews({ company: false, financial: false, market: false });
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedTimeframe === '24h'
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
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedTimeframe === '30d'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Last 30 Days
                </button>
              </div>

              {/* News Sections Grid - Vertically Divided */}
              {newsLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <p className="mt-2 text-gray-400">Fetching latest news from Perplexity...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Company News Section */}
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
                              <span className={`inline-block px-2 py-1 text-white text-xs rounded ${
                                newsCache[selectedTimeframe].company.sentiment === 'positive' ? 'bg-green-600' :
                                newsCache[selectedTimeframe].company.sentiment === 'negative' ? 'bg-red-600' : 'bg-blue-600'
                              }`}>
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

                  {/* Financial News Section */}
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
                              <span className={`inline-block px-2 py-1 text-white text-xs rounded ${
                                newsCache[selectedTimeframe].financial.sentiment === 'positive' ? 'bg-green-600' :
                                newsCache[selectedTimeframe].financial.sentiment === 'negative' ? 'bg-red-600' : 'bg-blue-600'
                              }`}>
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

                  {/* Market News Section */}
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
                              <span className={`inline-block px-2 py-1 text-white text-xs rounded ${
                                newsCache[selectedTimeframe].market.sentiment === 'positive' ? 'bg-green-600' :
                                newsCache[selectedTimeframe].market.sentiment === 'negative' ? 'bg-red-600' : 'bg-blue-600'
                              }`}>
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

              {/* Refresh News Button */}
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
          )}
        </div>
      </WatchlistProvider>
    </PortfolioProvider>
  );
}
