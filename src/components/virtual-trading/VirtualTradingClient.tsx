'use client';

import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
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
  const [error, setError] = useState<string | null>(null);
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

  // Memoize search parameters to prevent unnecessary refetches
  const searchParamsString = useMemo(() => {
    if (!searchParams) return '';
    const params = new URLSearchParams(searchParams.toString());
    // Remove any unstable params that might cause re-renders
    const stableParams = new URLSearchParams();
    const relevantKeys = ['page', 'search', 'sort', 'index', 'industry'];
    relevantKeys.forEach(key => {
      const value = params.get(key);
      if (value) stableParams.set(key, value);
    });
    return stableParams.toString();
  }, [searchParams]);

  const fetchStocks = useCallback(async (params: string) => {
    try {
      setError(null);
      const urlParams = new URLSearchParams(params);
      console.log('[VirtualTradingClient] Fetching stocks with params:', Object.fromEntries(urlParams.entries()));
      
      const response = await fetch('/api/stock-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(urlParams.entries())),
      });
      
      console.log('[VirtualTradingClient] Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('[VirtualTradingClient] Received data:', { stocksCount: data.stocks?.length || 0, totalCount: data.totalCount });
      
      // Only update state if we have valid data
      if (data.stocks && Array.isArray(data.stocks)) {
        setStocks(data.stocks);
        setTotalCount(data.totalCount || 0);
        markMilestone('Market data loaded');
      } else {
        console.warn('[VirtualTradingClient] Received invalid data format');
        setError('Invalid data format received');
      }
    } catch (error) {
      console.error('[VirtualTradingClient] Failed to fetch stocks:', {
        error: error,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      setError(error instanceof Error ? error.message : 'Failed to fetch stocks');
      // Don't clear stocks on error to prevent flickering
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadStocks = async () => {
      // Set loading state at the beginning
      setLoading(true);
      
      // Await the fetch operation
      await fetchStocks(searchParamsString);
      
      // Reset loading state only if the component is still mounted
      if (isMounted) {
        setLoading(false);
      }
    };
    
    // Debounce to prevent rapid calls, but the core logic is now safer
    const timeoutId = setTimeout(loadStocks, 800);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  // The dependency array is now stable, preventing infinite loops.
  }, [searchParamsString, fetchStocks]);

  // Optimized all stocks loading with better caching
  const loadAllStocks = useCallback(async () => {
    if (allStocksLoading || allStocks.length > 0) return; // Prevent duplicate calls
    
    setAllStocksLoading(true);
    try {
      const cacheKey = 'all_stocks_cache';
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          const isValid = (Date.now() - timestamp) < 10 * 60 * 1000; // 10 minutes cache
          if (isValid && Array.isArray(data) && data.length > 0) {
            setAllStocks(data);
            markMilestone('All stocks loaded from cache');
            return;
          }
        } catch (cacheError) {
          console.warn('[VirtualTradingClient] Cache parse error:', cacheError);
          localStorage.removeItem(cacheKey);
        }
      }

      console.log('[VirtualTradingClient] Fetching all stocks for portfolio view');
      
      const response = await fetch('/api/stock-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('[VirtualTradingClient] All stocks received:', { count: data.stocks?.length || 0 });
      
      if (data.stocks && Array.isArray(data.stocks)) {
        setAllStocks(data.stocks);
        
        // Cache the data
        try {
          localStorage.setItem(cacheKey, JSON.stringify({
            data: data.stocks,
            timestamp: Date.now()
          }));
        } catch (storageError) {
          console.warn('[VirtualTradingClient] Failed to cache data:', storageError);
        }
        markMilestone('All stocks loaded from API');
      }
    } catch (error) {
      console.error('[VirtualTradingClient] Failed to fetch all stocks:', {
        error: error,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setAllStocksLoading(false);
    }
  }, [allStocksLoading, allStocks.length, markMilestone]);

  useEffect(() => {
    if (rightColumnView === 'portfolio' && isSignedIn && allStocks.length === 0) {
      loadAllStocks();
    }
  }, [rightColumnView, isSignedIn, allStocks.length, loadAllStocks]);

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
                      error={error}
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

