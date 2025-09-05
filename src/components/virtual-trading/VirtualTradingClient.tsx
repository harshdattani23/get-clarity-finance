'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MarketFilters from './MarketFilters';
import ScreenerView from './ScreenerView';
import WarningBanner from './WarningBanner';
import AcknowledgementModal from './AcknowledgementModal';
import { PortfolioProvider } from '@/contexts/virtual-trading/PortfolioContext';
import { WatchlistProvider } from '@/contexts/virtual-trading/WatchlistContext';
import ClientOnly from '../ClientOnly';

// Lazy load ticker components for better initial performance
const IndexTicker = lazy(() => import('./IndexTicker'));
const ScrollingTicker = lazy(() => import('./ScrollingTicker'));
import PortfolioSummary from './PortfolioSummary';
import TradingActions from './TradingActions';
import Pagination from './Pagination';
import { usePathname } from 'next/navigation';
import WatchlistManager from './WatchlistManager';
import { useUser } from '@clerk/nextjs';
import LoginPrompt from './LoginPrompt';
import { Stock } from '@/lib/trading-data';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

// Lazy load heavy components
const PortfolioView = lazy(() => import('./PortfolioView'));
const Leaderboard = lazy(() => import('./Leaderboard'));
const Achievements = lazy(() => import('./Achievements'));

const VirtualTradingClient = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [allStocks, setAllStocks] = useState<Stock[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [allStocksLoading, setAllStocksLoading] = useState(false);
  const [leftColumnView, setLeftColumnView] = useState<'markets' | 'watchlists'>('markets');
  const [rightColumnView, setRightColumnView] = useState<'summary' | 'portfolio' | 'leaderboard' | 'achievements'>('summary');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  
  // Performance monitoring
  const { markMilestone } = usePerformanceMonitor('VirtualTradingClient');

  useEffect(() => {
    if (!isSignedIn) {
      setLeftColumnView('markets');
      setRightColumnView('summary');
    }
  }, [isSignedIn]);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(searchParams?.toString());
        const response = await fetch('/api/stock-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(params.entries())),
        });
        const data = await response.json();
        setStocks(data.stocks);
        setTotalCount(data.totalCount);
        markMilestone('Market data loaded');
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
  }, [searchParams, markMilestone]);

  // Load all stocks only when needed (for portfolio view)
  useEffect(() => {
    if (rightColumnView === 'portfolio' && allStocks.length === 0 && isSignedIn) {
      const fetchAllStocks = async () => {
        setAllStocksLoading(true);
        try {
          const cacheKey = 'all_stocks_cache';
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            const isValid = (Date.now() - timestamp) < 5 * 60 * 1000; // 5 minutes cache
            if (isValid) {
              setAllStocks(data);
              markMilestone('All stocks loaded from cache');
              setAllStocksLoading(false);
              return;
            }
          }

          const response = await fetch('/api/stock-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          });
          const data = await response.json();
          setAllStocks(data.stocks);
          
          // Cache the data
          localStorage.setItem(cacheKey, JSON.stringify({
            data: data.stocks,
            timestamp: Date.now()
          }));
          markMilestone('All stocks loaded from API');
        } catch (error) {
          console.error('Failed to fetch all stocks:', error);
        } finally {
          setAllStocksLoading(false);
        }
      };
      fetchAllStocks();
    }
  }, [rightColumnView, allStocks.length, isSignedIn, markMilestone]);

  const currentPage = Number(searchParams?.get('page')) || 1;
  const itemsPerPage = 15;

  return (
    <PortfolioProvider>
      <WatchlistProvider>
        <div className="bg-slate-900 text-white min-h-screen">
          <WarningBanner />
          <AcknowledgementModal />
          <ClientOnly>
            <Suspense fallback={
              <div className="bg-slate-800 border-b border-slate-700">
                <div className="h-16 flex items-center justify-center">
                  <div className="animate-pulse text-gray-400">Loading market data...</div>
                </div>
              </div>
            }>
              <IndexTicker />
            </Suspense>
            <Suspense fallback={
              <div className="bg-slate-800 border-b border-slate-700">
                <div className="h-12 flex items-center justify-center">
                  <div className="animate-pulse text-gray-400">Loading ticker...</div>
                </div>
              </div>
            }>
              <ScrollingTicker />
            </Suspense>
          </ClientOnly>
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 bg-slate-900 p-4 rounded-lg">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setLeftColumnView('markets')}
                    className={`px-3 py-2 rounded-md font-semibold flex-1 ${leftColumnView === 'markets' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                  >
                    Markets
                  </button>
                  {isSignedIn && (
                    <button
                      onClick={() => setLeftColumnView('watchlists')}
                      className={`px-3 py-2 rounded-md font-semibold flex-1 ${leftColumnView === 'watchlists' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                    >
                      Watchlists
                    </button>
                  )}
                </div>

                {leftColumnView === 'markets' && (
                  <>
                    <MarketFilters />
                    <ScreenerView
                      stocks={stocks}
                      loading={loading}
                    />
                    <Pagination
                      totalCount={totalCount}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      pathname={pathname || ''}
                      searchParams={searchParams || new URLSearchParams()}
                    />
                  </>
                )}

                {leftColumnView === 'watchlists' && <WatchlistManager />}
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3">
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setRightColumnView('summary')}
                    className={`px-3 py-2 rounded-md font-semibold flex-1 ${rightColumnView === 'summary' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                  >
                    Summary
                  </button>
                  {isSignedIn && (
                    <>
                      <button
                        onClick={() => setRightColumnView('portfolio')}
                        className={`px-3 py-2 rounded-md font-semibold flex-1 ${rightColumnView === 'portfolio' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                      >
                        Portfolio
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setRightColumnView('leaderboard')}
                    className={`px-3 py-2 rounded-md font-semibold flex-1 ${rightColumnView === 'leaderboard' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                  >
                    Leaderboard
                  </button>
                  {isSignedIn && (
                    <button
                      onClick={() => setRightColumnView('achievements')}
                      className={`px-3 py-2 rounded-md font-semibold flex-1 ${rightColumnView === 'achievements' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                    >
                      Achievements
                    </button>
                  )}
                </div>
                {rightColumnView === 'leaderboard' ? (
                  <Suspense fallback={
                    <div className="bg-slate-800 rounded-lg p-8">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
                        <span className="text-gray-300">Loading leaderboard...</span>
                      </div>
                    </div>
                  }>
                    <Leaderboard />
                  </Suspense>
                ) : isSignedIn ? (
                  <>
                    {rightColumnView === 'summary' && (
                      <>
                        <PortfolioSummary />
                        <TradingActions />
                      </>
                    )}
                    {rightColumnView === 'portfolio' && (
                      <Suspense fallback={
                        <div className="bg-slate-800 rounded-lg p-8">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
                            <span className="text-gray-300">
                              {allStocksLoading ? 'Loading portfolio data...' : 'Loading portfolio view...'}
                            </span>
                          </div>
                        </div>
                      }>
                        <PortfolioView allStocks={allStocks} />
                      </Suspense>
                    )}
                    {rightColumnView === 'achievements' && (
                      <Suspense fallback={
                        <div className="bg-slate-800 rounded-lg p-8">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
                            <span className="text-gray-300">Loading achievements...</span>
                          </div>
                        </div>
                      }>
                        <Achievements />
                      </Suspense>
                    )}
                  </>
                ) : (
                  <LoginPrompt />
                )}
              </div>
            </div>
          </div>
        </div>
      </WatchlistProvider>
    </PortfolioProvider>
  );
};

export default VirtualTradingClient;

