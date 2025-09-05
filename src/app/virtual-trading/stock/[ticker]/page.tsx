'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, BookOpen, Target, Activity, DollarSign, BarChart3, TrendingDownIcon } from 'lucide-react';
import { PortfolioProvider } from '@/contexts/virtual-trading/PortfolioContext';
import { WatchlistProvider } from '@/contexts/virtual-trading/WatchlistContext';
import TradingViewWidget from '@/components/tradingview/AdvancedChart';
import TradingActions from '@/components/stock/TradingActions';
import UserHoldings from '@/components/stock/UserHoldings';
import StockInfo from '@/components/stock/StockInfo';
import { useParams } from 'next/navigation';
import NewsSection from '@/components/stock/NewsSection';
// Import our enhanced Yahoo Finance services
import yahooFinanceService, { StockInfo as YahooStockInfo, HistoricalPrice, NewsItem } from '@/services/yahooFinanceApi';

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

      // Enhanced Yahoo Finance data fetching
      const fetchEnhancedData = async () => {
        if (!ticker) return;
        
        setEnhancedLoading(true);
        try {
          // Convert ticker to Yahoo Finance format (add .NS for Indian stocks if needed)
          const yahooTicker = ticker.includes('.') ? ticker : `${ticker}.NS`;
          
          const [stockInfo, historical, news] = await Promise.allSettled([
            yahooFinanceService.getStockInfo(yahooTicker),
            yahooFinanceService.getHistoricalPrices(yahooTicker, '1mo', '1d'),
            yahooFinanceService.getStockNews(yahooTicker),
          ]);
          
          if (stockInfo.status === 'fulfilled') {
            setEnhancedStockData(stockInfo.value);
          }
          if (historical.status === 'fulfilled') {
            setHistoricalData(historical.value);
          }
          if (news.status === 'fulfilled') {
            setNewsData(news.value);
          }
        } catch (error) {
          console.warn('Enhanced data fetch failed:', error);
        } finally {
          setEnhancedLoading(false);
        }
      };

      const fetchAllData = async () => {
        setLoading(true);
        await Promise.all([fetchStockData(), fetchIndicesData(), fetchEnhancedData()]);
        setLoading(false);
      };

      fetchAllData();
    }
  }, [ticker]);

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
              <button
                onClick={() => setActiveTab('analysis')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'analysis'
                    ? 'text-white border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Advanced Analysis
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
                <StockInfo stock={stock} enhancedData={enhancedStockData} />
              </div>
            </div>
          ) : activeTab === 'news' ? (
            <NewsSection ticker={ticker} />
          ) : (
            // Advanced Analysis Tab
            <div className="space-y-6">
              {enhancedLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                  <span className="ml-3 text-gray-300">Loading enhanced analysis...</span>
                </div>
              ) : enhancedStockData ? (
                <>
                  {/* Risk Assessment Banner */}
                  {(() => {
                    const riskAssessment = yahooFinanceService.getRiskAssessment(enhancedStockData);
                    const riskColors = {
                      'LOW': 'bg-green-900 border-green-500 text-green-100',
                      'MEDIUM': 'bg-yellow-900 border-yellow-500 text-yellow-100',
                      'HIGH': 'bg-orange-900 border-orange-500 text-orange-100',
                      'VERY HIGH': 'bg-red-900 border-red-500 text-red-100'
                    };
                    return (
                      <div className={`p-4 rounded-lg border-2 ${riskColors[riskAssessment.level as keyof typeof riskColors]}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold">Risk Assessment: {riskAssessment.level}</h3>
                          <AlertCircle className="h-5 w-5" />
                        </div>
                        {riskAssessment.factors.length > 0 && (
                          <ul className="text-sm space-y-1">
                            {riskAssessment.factors.map((factor, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-2 h-2 rounded-full bg-current mr-2 flex-shrink-0"></span>
                                {factor}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })()}

                  {/* Enhanced Financial Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-gray-400">Market Cap</h4>
                        <DollarSign className="h-4 w-4 text-blue-400" />
                      </div>
                      <p className="text-xl font-bold text-white">
                        {yahooFinanceService.formatLargeNumber(enhancedStockData.marketCap, enhancedStockData.currency)}
                      </p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-gray-400">Revenue (TTM)</h4>
                        <BarChart3 className="h-4 w-4 text-green-400" />
                      </div>
                      <p className="text-xl font-bold text-white">
                        {yahooFinanceService.formatLargeNumber(enhancedStockData.totalRevenue, enhancedStockData.currency)}
                      </p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-gray-400">P/E Ratio</h4>
                        <Activity className="h-4 w-4 text-purple-400" />
                      </div>
                      <p className="text-xl font-bold text-white">
                        {enhancedStockData.trailingPE ? enhancedStockData.trailingPE.toFixed(2) : 'N/A'}
                      </p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-gray-400">Profit Margin</h4>
                        <TrendingUp className="h-4 w-4 text-yellow-400" />
                      </div>
                      <p className={`text-xl font-bold ${enhancedStockData.profitMargins && enhancedStockData.profitMargins > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {enhancedStockData.profitMargins ? (enhancedStockData.profitMargins * 100).toFixed(2) + '%' : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Financial Health Indicators */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
                        Financial Health
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Total Cash:</span>
                          <span className="text-white font-medium">
                            {yahooFinanceService.formatLargeNumber(enhancedStockData.totalCash, enhancedStockData.currency)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Total Debt:</span>
                          <span className="text-white font-medium">
                            {yahooFinanceService.formatLargeNumber(enhancedStockData.totalDebt, enhancedStockData.currency)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Debt-to-Equity:</span>
                          <span className={`font-medium ${enhancedStockData.debtToEquity && enhancedStockData.debtToEquity > 100 ? 'text-red-400' : 'text-green-400'}`}>
                            {enhancedStockData.debtToEquity ? enhancedStockData.debtToEquity.toFixed(1) : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Return on Equity:</span>
                          <span className={`font-medium ${enhancedStockData.returnOnEquity && enhancedStockData.returnOnEquity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {enhancedStockData.returnOnEquity ? (enhancedStockData.returnOnEquity * 100).toFixed(2) + '%' : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                        Growth Metrics
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Revenue Growth:</span>
                          <span className={`font-medium ${enhancedStockData.revenueGrowth && enhancedStockData.revenueGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {enhancedStockData.revenueGrowth ? (enhancedStockData.revenueGrowth * 100).toFixed(2) + '%' : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Earnings Growth:</span>
                          <span className={`font-medium ${enhancedStockData.earningsGrowth && enhancedStockData.earningsGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {enhancedStockData.earningsGrowth ? (enhancedStockData.earningsGrowth * 100).toFixed(2) + '%' : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Book Value per Share:</span>
                          <span className="text-white font-medium">
                            {yahooFinanceService.formatCurrency(enhancedStockData.bookValue, enhancedStockData.currency)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">EPS (TTM):</span>
                          <span className={`font-medium ${enhancedStockData.trailingEps && enhancedStockData.trailingEps > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {yahooFinanceService.formatCurrency(enhancedStockData.trailingEps, enhancedStockData.currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Price History */}
                  {historicalData.length > 0 && (
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-purple-400" />
                        Recent Trading Sessions (Last 7 days)
                      </h3>
                      <div className="grid gap-2">
                        {historicalData.slice(-7).reverse().map((day, index) => {
                          const change = day.Close - day.Open;
                          const changePercent = (change / day.Open) * 100;
                          return (
                            <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-700 rounded">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-300">
                                  {new Date(day.Date).toLocaleDateString('en-IN', { 
                                    day: '2-digit', 
                                    month: 'short' 
                                  })}
                                </span>
                                <span className="text-white font-medium">
                                  {yahooFinanceService.formatCurrency(day.Close, enhancedStockData.currency)}
                                </span>
                              </div>
                              <div className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                {change >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Enhanced News Section */}
                  {newsData.length > 0 && (
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                      <h3 className="text-lg font-bold text-white mb-4">Latest Financial News</h3>
                      <div className="space-y-4">
                        {newsData.slice(0, 3).map((article, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                            <h4 className="font-semibold text-white mb-1">{article.title}</h4>
                            <p className="text-sm text-gray-300 mb-2">{article.summary}</p>
                            {article.url && (
                              <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 text-sm underline"
                              >
                                Read more →
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 text-center">
                  <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Enhanced Analysis Unavailable</h3>
                  <p className="text-gray-300">
                    Unable to load enhanced financial analysis for {ticker}. 
                    This may occur if the stock is not available in our enhanced data source.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </WatchlistProvider>
    </PortfolioProvider>
  );
}
