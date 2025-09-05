'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, BookOpen, Target, Activity, DollarSign, BarChart3, TrendingDownIcon, PieChart, Calculator, Building, Users, Award, CreditCard, Briefcase, Percent, Calendar } from 'lucide-react';
import { PortfolioProvider } from '@/contexts/virtual-trading/PortfolioContext';
import { WatchlistProvider } from '@/contexts/virtual-trading/WatchlistContext';
import TradingActions from '@/components/stock/TradingActions';
import UserHoldings from '@/components/stock/UserHoldings';
import StockInfo from '@/components/stock/StockInfo';
import { useParams } from 'next/navigation';
import AIDisclaimer from '@/components/ui/AIDisclaimer';

// Lazy load heavy components for better performance
const TradingViewWidget = lazy(() => import('@/components/tradingview/AdvancedChart'));
const NewsSection = lazy(() => import('@/components/stock/NewsSection'));
// Import our enhanced Yahoo Finance services
import yahooFinanceService, { StockInfo as YahooStockInfo, HistoricalPrice, NewsItem } from '@/services/yahooFinanceApi';
import { getIndianMarketStatus, getMarketStatusColor } from '@/utils/marketStatus';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

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

export default function StockDetailPage() {
  const params = useParams();
  const ticker = params?.ticker as string;
  const [stock, setStock] = useState<Stock | null>(null);
  const [indices, setIndices] = useState<Index[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'news' | 'analysis'>('details');
  
  // Enhanced Yahoo Finance data
  const [enhancedStockData, setEnhancedStockData] = useState<YahooStockInfo | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalPrice[]>([]);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [enhancedLoading, setEnhancedLoading] = useState(false);
  const [marketStatus, setMarketStatus] = useState(getIndianMarketStatus());
  
  // Performance monitoring
  const { markMilestone } = usePerformanceMonitor('StockDetailPage');

  useEffect(() => {
    if (ticker) {
      // Fast initial load - fetch only critical stock data first
      const fetchCriticalData = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/stock/${ticker}`);
          if (!res.ok) {
            throw new Error('Stock not found');
          }
          const data = await res.json();
          setStock(data);
          markMilestone('Critical data loaded');
          setLoading(false); // Page becomes interactive immediately
        } catch (err) {
          setError((err as Error).message);
          setLoading(false);
        }
      };

      // Secondary load - fetch indices data (non-blocking)
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
          console.error((err as Error).message);
        }
      };

      // Tertiary load - fetch enhanced data only when needed (lazy loading)
      const fetchEnhancedData = async () => {
        if (!ticker) return;
        
        // Check cache first
        const cacheKey = `enhanced_${ticker}`;
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const isValid = (Date.now() - timestamp) < 30 * 60 * 1000; // 30 minutes
          if (isValid) {
            setEnhancedStockData(data.stockInfo || null);
            setHistoricalData(data.historical || []);
            setNewsData(data.news || []);
            return;
          }
        }
        
        setEnhancedLoading(true);
        try {
          const yahooTicker = ticker.includes('.') ? ticker : `${ticker}.NS`;
          
          // Fetch with timeout to prevent hanging
          const timeout = (ms: number) => new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), ms)
          );
          
          const [stockInfo, historical, news] = await Promise.allSettled([
            Promise.race([yahooFinanceService.getStockInfo(yahooTicker), timeout(5000)]),
            Promise.race([yahooFinanceService.getHistoricalPrices(yahooTicker, '1mo', '1d'), timeout(5000)]),
            Promise.race([yahooFinanceService.getStockNews(yahooTicker), timeout(3000)]),
          ]);
          
          let enhancedData: any = {};
          
          if (stockInfo.status === 'fulfilled') {
            const stockData = stockInfo.value as YahooStockInfo;
            setEnhancedStockData(stockData);
            enhancedData.stockInfo = stockData;
          }
          if (historical.status === 'fulfilled') {
            const historicalData = historical.value as HistoricalPrice[];
            setHistoricalData(historicalData);
            enhancedData.historical = historicalData;
          }
          if (news.status === 'fulfilled') {
            const newsItems = news.value as NewsItem[];
            setNewsData(newsItems);
            enhancedData.news = newsItems;
          }
          
          // Cache the enhanced data
          if (Object.keys(enhancedData).length > 0) {
            localStorage.setItem(cacheKey, JSON.stringify({
              data: enhancedData,
              timestamp: Date.now()
            }));
          }
        } catch (error) {
          console.warn('Enhanced data fetch failed:', error);
        } finally {
          setEnhancedLoading(false);
        }
      };

      // Progressive loading strategy
      fetchCriticalData(); // Load immediately
      
      // Load secondary data after a short delay
      setTimeout(() => {
        fetchIndicesData();
      }, 100);
      
      // Load enhanced data when user interacts or after delay
      setTimeout(() => {
        fetchEnhancedData();
      }, 1000);
    }
  }, [ticker]);

  // Update market status every minute
  useEffect(() => {
    const updateMarketStatus = () => {
      setMarketStatus(getIndianMarketStatus());
    };
    
    const interval = setInterval(updateMarketStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header skeleton */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-700 rounded w-32 animate-pulse"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-48 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Hero section skeleton */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="h-8 bg-gray-700 rounded w-64 animate-pulse"></div>
                  <div className="h-12 bg-gray-700 rounded w-32 animate-pulse"></div>
                  <div className="flex space-x-4">
                    <div className="h-6 bg-gray-700 rounded w-24 animate-pulse"></div>
                    <div className="h-6 bg-gray-700 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="h-16 bg-gray-800 rounded-lg animate-pulse"></div>
                  <div className="h-16 bg-gray-800 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content skeleton */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-96 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
            <div className="space-y-6">
              <div className="h-32 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="h-48 bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
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
        <div className="min-h-screen bg-gray-900 text-white">
          {/* Header with breadcrumb and market status */}
          <div className="bg-gray-800 border-b border-gray-700">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>Virtual Trading</span>
                  <span>/</span>
                  <span className="text-white">{stock.ticker}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      marketStatus.isOpen ? 'bg-green-400 animate-pulse' : 
                      marketStatus.status === 'Holiday' ? 'bg-purple-400' :
                      marketStatus.status === 'Pre-Market' ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`}></div>
                    <span className={
                      marketStatus.isOpen ? 'text-green-400' : 
                      marketStatus.status === 'Holiday' ? 'text-purple-400' :
                      marketStatus.status === 'Pre-Market' ? 'text-yellow-400' :
                      'text-red-400'
                    }>
                      Market {marketStatus.status}
                      {marketStatus.status === 'Holiday' && marketStatus.holidayName && (
                        <span className="ml-1">({marketStatus.holidayName})</span>
                      )}
                    </span>
                    {!marketStatus.isOpen && (
                      <span className="text-gray-500 text-xs">
                        • Opens {marketStatus.nextEvent.time} (in {marketStatus.nextEvent.timeUntil})
                      </span>
                    )}
                    {marketStatus.isOpen && (
                      <span className="text-gray-500 text-xs">
                        • Closes {marketStatus.nextEvent.time} (in {marketStatus.nextEvent.timeUntil})
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400">Last updated: {new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section - Stock Overview */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left - Stock Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-4xl font-bold">{stock.name}</h1>
                        <span className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm font-medium">
                          {stock.ticker}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-400">
                        {stock.sector && <span>{stock.sector}</span>}
                        {stock.industry && (
                          <>
                            <span>•</span>
                            <span>{stock.industry}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-4 mb-2">
                      <span className="text-5xl font-bold">₹{stock.price.toLocaleString('en-IN')}</span>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
                        stock.change >= 0 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-red-900/30 text-red-400'
                      }`}>
                        {stock.change >= 0 ? (
                          <TrendingUp className="w-5 h-5" />
                        ) : (
                          <TrendingDown className="w-5 h-5" />
                        )}
                        <span className="text-xl font-semibold">
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                        </span>
                        <span className="text-lg">
                          ({stock.percentChange.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-700">
                      <div>
                        <span className="text-gray-400 text-sm block">Day Range</span>
                        <span className="font-semibold">₹{stock.low} - ₹{stock.high}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm block">Volume</span>
                        <span className="font-semibold">{stock.volume?.toLocaleString() || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm block">Market Cap</span>
                        <span className="font-semibold">
                          {stock.marketCap ? `₹${(stock.marketCap / 10000000).toFixed(2)}Cr` : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Trading Actions */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <TradingActions stock={stock} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Overview - Compact */}
          {indices.length > 0 && (
            <div className="border-b border-gray-700">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center space-x-8">
                  <span className="text-gray-400 text-sm font-medium">Market Overview:</span>
                  {indices.map((index) => (
                    <div key={index.name} className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-300">{index.name}</span>
                      <span className="text-sm font-semibold">
                        {index.price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                      <span className={`text-xs font-medium ${
                        index.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {index.change >= 0 ? '+' : ''}{index.percentChange.toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="container mx-auto px-4 py-8">
            {/* Navigation Tabs */}
            <div className="mb-8">
              <nav className="flex space-x-8 border-b border-gray-700">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-4 px-1 text-sm font-medium transition-colors relative ${
                    activeTab === 'details'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Overview & Chart
                </button>
                <button
                  onClick={() => setActiveTab('analysis')}
                  className={`pb-4 px-1 text-sm font-medium transition-colors relative ${
                    activeTab === 'analysis'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Financials & Analysis
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`pb-4 px-1 text-sm font-medium transition-colors relative ${
                    activeTab === 'news'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  News & Updates
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'details' ? (
              <div className="space-y-8">
                {/* Chart Section */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="p-6 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                      Price Chart
                    </h2>
                  </div>
                  <div className="h-[500px]">
                    <Suspense fallback={
                      <div className="flex items-center justify-center h-full bg-gray-900">
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
                          <span className="text-gray-300">Loading chart...</span>
                        </div>
                      </div>
                    }>
                      <TradingViewWidget symbol={stock.ticker} theme="dark" />
                    </Suspense>
                  </div>
                </div>

                {/* Company Info - Full Width */}
                <div className="space-y-6">
                  <StockInfo stock={stock} enhancedData={enhancedStockData} />
                </div>
                
                {/* Holdings */}
                <div className="space-y-6">
                  <UserHoldings stock={stock} />
                </div>
              </div>
            ) : activeTab === 'news' ? (
              <div className="space-y-6">
                <Suspense fallback={
                  <div className="bg-gray-800 rounded-xl border border-gray-700 p-12">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
                      <span className="text-gray-300 text-lg">Loading news and updates...</span>
                      <span className="text-gray-500 text-sm mt-2">Fetching latest market insights</span>
                    </div>
                  </div>
                }>
                  <NewsSection ticker={ticker} />
                </Suspense>
              </div>
            ) : (
              // Advanced Analysis Tab
              <div className="space-y-8">
                {enhancedLoading ? (
                  <div className="bg-gray-800 rounded-xl border border-gray-700 p-12">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
                      <span className="text-gray-300 text-lg">Loading enhanced analysis...</span>
                      <span className="text-gray-500 text-sm mt-2">Fetching comprehensive financial data</span>
                    </div>
                  </div>
                ) : enhancedStockData ? (
                  <>
                    {/* Risk Assessment Card */}
                    {(() => {
                      const riskAssessment = yahooFinanceService.getRiskAssessment(enhancedStockData);
                      const riskColors = {
                        'LOW': 'bg-green-900/20 border-green-500/30 text-green-100',
                        'MEDIUM': 'bg-yellow-900/20 border-yellow-500/30 text-yellow-100',
                        'HIGH': 'bg-orange-900/20 border-orange-500/30 text-orange-100',
                        'VERY HIGH': 'bg-red-900/20 border-red-500/30 text-red-100'
                      };
                      return (
                        <div className={`rounded-xl border-2 p-6 ${riskColors[riskAssessment.level as keyof typeof riskColors]}`}>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <AlertCircle className="h-6 w-6" />
                              <h3 className="text-xl font-bold">Risk Assessment</h3>
                            </div>
                            <span className={`px-4 py-2 rounded-full font-bold text-sm ${
                              riskAssessment.level === 'LOW' ? 'bg-green-500 text-green-900' :
                              riskAssessment.level === 'MEDIUM' ? 'bg-yellow-500 text-yellow-900' :
                              riskAssessment.level === 'HIGH' ? 'bg-orange-500 text-orange-900' :
                              'bg-red-500 text-red-900'
                            }`}>
                              {riskAssessment.level}
                            </span>
                          </div>
                          {riskAssessment.factors.length > 0 && (
                            <div className="space-y-2">
                              {riskAssessment.factors.map((factor, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0"></span>
                                  <span className="text-sm leading-relaxed">{factor}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* AI Disclaimer */}
                          <div className="mt-4 pt-4 border-t border-current/20">
                            <AIDisclaimer 
                              variant="compact" 
                              context="risk-assessment"
                              className="bg-transparent border-none p-0 text-current"
                            />
                          </div>
                        </div>
                      );
                    })()}

                    {/* Key Financial Metrics */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                      <div className="p-6 border-b border-gray-700">
                        <h3 className="text-xl font-bold text-white flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-blue-400" />
                          Key Financial Metrics
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="text-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-3 mx-auto">
                              <DollarSign className="h-6 w-6 text-blue-400" />
                            </div>
                            <div className="text-sm text-gray-400 mb-1">Market Cap</div>
                            <div className="text-lg font-bold text-white">
                              {yahooFinanceService.formatLargeNumber(enhancedStockData.marketCap, enhancedStockData.currency)}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-lg mb-3 mx-auto">
                              <BarChart3 className="h-6 w-6 text-green-400" />
                            </div>
                            <div className="text-sm text-gray-400 mb-1">Revenue (TTM)</div>
                            <div className="text-lg font-bold text-white">
                              {yahooFinanceService.formatLargeNumber(enhancedStockData.totalRevenue, enhancedStockData.currency)}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-lg mb-3 mx-auto">
                              <Activity className="h-6 w-6 text-purple-400" />
                            </div>
                            <div className="text-sm text-gray-400 mb-1">P/E Ratio</div>
                            <div className="text-lg font-bold text-white">
                              {enhancedStockData.trailingPE ? enhancedStockData.trailingPE.toFixed(2) : 'N/A'}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-yellow-600/20 rounded-lg mb-3 mx-auto">
                              <TrendingUp className="h-6 w-6 text-yellow-400" />
                            </div>
                            <div className="text-sm text-gray-400 mb-1">Profit Margin</div>
                            <div className={`text-lg font-bold ${
                              enhancedStockData.profitMargins && enhancedStockData.profitMargins > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {enhancedStockData.profitMargins ? (enhancedStockData.profitMargins * 100).toFixed(2) + '%' : 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Valuation Metrics */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                      <div className="p-6 border-b border-gray-700">
                        <h3 className="text-xl font-bold text-white flex items-center">
                          <Calculator className="w-5 h-5 mr-2 text-blue-400" />
                          Valuation Metrics
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="bg-gray-750 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400 text-sm">Price-to-Book</span>
                              <span className={`text-lg font-bold ${
                                enhancedStockData.priceToBook < 1 ? 'text-green-400' : 
                                enhancedStockData.priceToBook < 3 ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {enhancedStockData.priceToBook ? enhancedStockData.priceToBook.toFixed(2) : 'N/A'}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {enhancedStockData.priceToBook < 1 ? 'Undervalued' : 
                               enhancedStockData.priceToBook < 3 ? 'Fairly valued' : 'Overvalued'}
                            </div>
                          </div>
                          
                          <div className="bg-gray-750 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400 text-sm">Forward P/E</span>
                              <span className="text-lg font-bold text-white">
                                {enhancedStockData.forwardPE ? enhancedStockData.forwardPE.toFixed(2) : 'N/A'}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">Expected earnings multiple</div>
                          </div>
                          
                          <div className="bg-gray-750 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400 text-sm">Book Value</span>
                              <span className="text-lg font-bold text-white">
                                {yahooFinanceService.formatCurrency(enhancedStockData.bookValue, enhancedStockData.currency)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">Net worth per share</div>
                          </div>
                          
                          <div className="bg-gray-750 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400 text-sm">EPS (TTM)</span>
                              <span className={`text-lg font-bold ${
                                enhancedStockData.trailingEps > 0 ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {yahooFinanceService.formatCurrency(enhancedStockData.trailingEps, enhancedStockData.currency)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">Earnings per share</div>
                          </div>
                          
                          <div className="bg-gray-750 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400 text-sm">Dividend Rate</span>
                              <span className="text-lg font-bold text-white">
                                {enhancedStockData.dividendRate ? 
                                  yahooFinanceService.formatCurrency(enhancedStockData.dividendRate, enhancedStockData.currency) : 'N/A'}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Yield: {enhancedStockData.dividendYield ? (enhancedStockData.dividendYield * 100).toFixed(2) + '%' : 'N/A'}
                            </div>
                          </div>
                          
                          <div className="bg-gray-750 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400 text-sm">Target Price</span>
                              <span className="text-lg font-bold text-blue-400">
                                {enhancedStockData.targetMeanPrice ? 
                                  yahooFinanceService.formatCurrency(enhancedStockData.targetMeanPrice, enhancedStockData.currency) : 'N/A'}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {enhancedStockData.numberOfAnalystOpinions ? 
                                `${enhancedStockData.numberOfAnalystOpinions} analysts` : 'No coverage'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Health */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                      <div className="p-6 border-b border-gray-700">
                        <h3 className="text-xl font-bold text-white flex items-center">
                          <CreditCard className="w-5 h-5 mr-2 text-green-400" />
                          Financial Health
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Balance Sheet Metrics */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                              <Building className="w-4 h-4 mr-2 text-blue-400" />
                              Balance Sheet
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                <span className="text-gray-400">Total Cash</span>
                                <span className="text-green-400 font-semibold">
                                  {yahooFinanceService.formatLargeNumber(enhancedStockData.totalCash, enhancedStockData.currency)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                <span className="text-gray-400">Total Debt</span>
                                <span className={`font-semibold ${
                                  enhancedStockData.totalDebt > enhancedStockData.totalCash ? 'text-red-400' : 'text-yellow-400'
                                }`}>
                                  {yahooFinanceService.formatLargeNumber(enhancedStockData.totalDebt, enhancedStockData.currency)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                <span className="text-gray-400">Net Cash</span>
                                <span className={`font-semibold ${
                                  (enhancedStockData.totalCash - enhancedStockData.totalDebt) > 0 ? 'text-green-400' : 'text-red-400'
                                }`}>
                                  {yahooFinanceService.formatLargeNumber(
                                    enhancedStockData.totalCash - enhancedStockData.totalDebt, 
                                    enhancedStockData.currency
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <span className="text-gray-400">Debt-to-Equity</span>
                                <span className={`font-semibold ${
                                  enhancedStockData.debtToEquity < 0.3 ? 'text-green-400' : 
                                  enhancedStockData.debtToEquity < 1 ? 'text-yellow-400' : 'text-red-400'
                                }`}>
                                  {enhancedStockData.debtToEquity ? enhancedStockData.debtToEquity.toFixed(2) : 'N/A'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Performance Metrics */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                              <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                              Performance
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                <span className="text-gray-400">Return on Equity</span>
                                <span className={`font-semibold ${
                                  enhancedStockData.returnOnEquity > 0.15 ? 'text-green-400' : 
                                  enhancedStockData.returnOnEquity > 0.08 ? 'text-yellow-400' : 'text-red-400'
                                }`}>
                                  {enhancedStockData.returnOnEquity ? (enhancedStockData.returnOnEquity * 100).toFixed(2) + '%' : 'N/A'}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                <span className="text-gray-400">Revenue Growth</span>
                                <span className={`font-semibold ${
                                  enhancedStockData.revenueGrowth > 0 ? 'text-green-400' : 'text-red-400'
                                }`}>
                                  {enhancedStockData.revenueGrowth ? (enhancedStockData.revenueGrowth * 100).toFixed(2) + '%' : 'N/A'}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                <span className="text-gray-400">Earnings Growth</span>
                                <span className={`font-semibold ${
                                  enhancedStockData.earningsGrowth > 0 ? 'text-green-400' : 'text-red-400'
                                }`}>
                                  {enhancedStockData.earningsGrowth ? (enhancedStockData.earningsGrowth * 100).toFixed(2) + '%' : 'N/A'}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <span className="text-gray-400">Recommendation</span>
                                <span className={`font-semibold px-3 py-1 rounded-full text-xs ${
                                  enhancedStockData.recommendationKey === 'buy' ? 'bg-green-500/20 text-green-400' :
                                  enhancedStockData.recommendationKey === 'hold' ? 'bg-yellow-500/20 text-yellow-400' :
                                  enhancedStockData.recommendationKey === 'sell' ? 'bg-red-500/20 text-red-400' :
                                  'bg-gray-500/20 text-gray-400'
                                }`}>
                                  {enhancedStockData.recommendationKey ? 
                                    enhancedStockData.recommendationKey.toUpperCase() : 'N/A'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trading Information */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                      <div className="p-6 border-b border-gray-700">
                        <h3 className="text-xl font-bold text-white flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                          Trading Information
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-gray-750 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-white mb-1">
                              {enhancedStockData.volume ? enhancedStockData.volume.toLocaleString() : 'N/A'}
                            </div>
                            <div className="text-sm text-gray-400">Volume</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Avg: {enhancedStockData.averageVolume ? enhancedStockData.averageVolume.toLocaleString() : 'N/A'}
                            </div>
                          </div>
                          
                          <div className="bg-gray-750 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-400 mb-1">
                              {yahooFinanceService.formatCurrency(enhancedStockData.fiftyTwoWeekHigh, enhancedStockData.currency)}
                            </div>
                            <div className="text-sm text-gray-400">52W High</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {((enhancedStockData.currentPrice / enhancedStockData.fiftyTwoWeekHigh - 1) * 100).toFixed(1)}% from high
                            </div>
                          </div>
                          
                          <div className="bg-gray-750 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-red-400 mb-1">
                              {yahooFinanceService.formatCurrency(enhancedStockData.fiftyTwoWeekLow, enhancedStockData.currency)}
                            </div>
                            <div className="text-sm text-gray-400">52W Low</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {((enhancedStockData.currentPrice / enhancedStockData.fiftyTwoWeekLow - 1) * 100).toFixed(1)}% from low
                            </div>
                          </div>
                          
                          <div className="bg-gray-750 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-400 mb-1">
                              {enhancedStockData.exchange}
                            </div>
                            <div className="text-sm text-gray-400">Exchange</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {enhancedStockData.fullExchangeName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Company Information */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                      <div className="p-6 border-b border-gray-700">
                        <h3 className="text-xl font-bold text-white flex items-center">
                          <Building className="w-5 h-5 mr-2 text-indigo-400" />
                          Company Information
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Company Details</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <span className="text-gray-400">Sector</span>
                                <span className="text-white font-semibold text-right">{enhancedStockData.sector}</span>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="text-gray-400">Industry</span>
                                <span className="text-white font-semibold text-right">{enhancedStockData.industry}</span>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="text-gray-400">Country</span>
                                <span className="text-white font-semibold text-right">{enhancedStockData.country || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="text-gray-400">Employees</span>
                                <span className="text-white font-semibold text-right">
                                  {enhancedStockData.fullTimeEmployees ? enhancedStockData.fullTimeEmployees.toLocaleString() : 'N/A'}
                                </span>
                              </div>
                              {enhancedStockData.website && (
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-400">Website</span>
                                  <a 
                                    href={enhancedStockData.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 underline text-right"
                                  >
                                    Visit Website
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {enhancedStockData.longBusinessSummary && (
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-4">Business Overview</h4>
                              <div className="text-gray-300 text-sm leading-relaxed">
                                {enhancedStockData.longBusinessSummary.length > 500 
                                  ? enhancedStockData.longBusinessSummary.substring(0, 500) + '...' 
                                  : enhancedStockData.longBusinessSummary}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price Range Analysis */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                      <div className="p-6 border-b border-gray-700">
                        <h3 className="text-xl font-bold text-white flex items-center">
                          <Target className="w-5 h-5 mr-2 text-orange-400" />
                          Price Analysis
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-6">
                          {/* Current vs Targets */}
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-gray-400">Price Targets</span>
                              <span className="text-sm text-gray-500">
                                Current: {yahooFinanceService.formatCurrency(enhancedStockData.currentPrice, enhancedStockData.currency)}
                              </span>
                            </div>
                            <div className="space-y-2">
                              {enhancedStockData.targetHighPrice && (
                                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                  <span className="text-gray-400">High Target</span>
                                  <span className="text-green-400 font-semibold">
                                    {yahooFinanceService.formatCurrency(enhancedStockData.targetHighPrice, enhancedStockData.currency)}
                                    <span className="text-xs ml-2">(
                                      {((enhancedStockData.targetHighPrice / enhancedStockData.currentPrice - 1) * 100).toFixed(1)}%
                                    )</span>
                                  </span>
                                </div>
                              )}
                              {enhancedStockData.targetMeanPrice && (
                                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                  <span className="text-gray-400">Mean Target</span>
                                  <span className="text-blue-400 font-semibold">
                                    {yahooFinanceService.formatCurrency(enhancedStockData.targetMeanPrice, enhancedStockData.currency)}
                                    <span className="text-xs ml-2">(
                                      {((enhancedStockData.targetMeanPrice / enhancedStockData.currentPrice - 1) * 100).toFixed(1)}%
                                    )</span>
                                  </span>
                                </div>
                              )}
                              {enhancedStockData.targetLowPrice && (
                                <div className="flex justify-between items-center py-2">
                                  <span className="text-gray-400">Low Target</span>
                                  <span className="text-red-400 font-semibold">
                                    {yahooFinanceService.formatCurrency(enhancedStockData.targetLowPrice, enhancedStockData.currency)}
                                    <span className="text-xs ml-2">(
                                      {((enhancedStockData.targetLowPrice / enhancedStockData.currentPrice - 1) * 100).toFixed(1)}%
                                    )</span>
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* 52-Week Range Visualization */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-400">52-Week Range</span>
                              <span className="text-sm text-gray-500">
                                {((enhancedStockData.fiftyTwoWeekHigh - enhancedStockData.fiftyTwoWeekLow) / enhancedStockData.fiftyTwoWeekLow * 100).toFixed(1)}% range
                              </span>
                            </div>
                            <div className="relative h-2 bg-gray-700 rounded-full mb-2">
                              <div 
                                className="absolute h-2 bg-gradient-to-r from-red-500 to-green-500 rounded-full" 
                                style={{ width: '100%' }}
                              ></div>
                              <div 
                                className="absolute w-3 h-3 bg-white rounded-full border-2 border-blue-400 -top-0.5"
                                style={{ 
                                  left: `${((enhancedStockData.currentPrice - enhancedStockData.fiftyTwoWeekLow) / 
                                         (enhancedStockData.fiftyTwoWeekHigh - enhancedStockData.fiftyTwoWeekLow)) * 100}%`,
                                  transform: 'translateX(-50%)'
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{yahooFinanceService.formatCurrency(enhancedStockData.fiftyTwoWeekLow, enhancedStockData.currency)}</span>
                              <span>{yahooFinanceService.formatCurrency(enhancedStockData.fiftyTwoWeekHigh, enhancedStockData.currency)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </>
                ) : (
                  <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
                    <AlertCircle className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-white mb-3">Enhanced Analysis Unavailable</h3>
                    <p className="text-gray-300 max-w-md mx-auto">
                      Unable to load enhanced financial analysis for {ticker}. 
                      This may occur if the stock is not available in our enhanced data source.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </WatchlistProvider>
    </PortfolioProvider>
  );
}
