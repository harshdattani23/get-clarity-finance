'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, BookOpen, Target } from 'lucide-react';
import { PortfolioProvider } from '@/contexts/virtual-trading/PortfolioContext';
import { WatchlistProvider } from '@/contexts/virtual-trading/WatchlistContext';
import TradingViewWidget from '@/components/tradingview/AdvancedChart';
import TradingActions from '@/components/stock/TradingActions';
import UserHoldings from '@/components/stock/UserHoldings';
import StockInfo from '@/components/stock/StockInfo';
import { useParams } from 'next/navigation';
import NewsSection from '@/components/stock/NewsSection';

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
  const [activeTab, setActiveTab] = useState<'details' | 'news'>('details');

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
            <NewsSection ticker={ticker} />
          )}
        </div>
      </WatchlistProvider>
    </PortfolioProvider>
  );
}
