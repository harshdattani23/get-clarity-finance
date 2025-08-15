'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import MarketFilters from './MarketFilters';
import ScreenerView from './ScreenerView';
import PortfolioDashboard from './PortfolioDashboard';
import WatchlistManager from './WatchlistManager';
import WarningBanner from './WarningBanner';
import LoginPrompt from './LoginPrompt';
import IndexTicker from './IndexTicker';
import ScrollingTicker from './ScrollingTicker';
import AcknowledgementModal from './AcknowledgementModal';
import { PortfolioProvider } from '@/contexts/virtual-trading/PortfolioContext';
import { WatchlistProvider } from '@/contexts/virtual-trading/WatchlistContext';
import NewsFeed from './NewsFeed';

const ITEMS_PER_PAGE = 15;

export default function VirtualTradingClient({ initialStocks: serverStocks }: { initialStocks: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn } = useUser();

  const [view, setView] = useState('screener');
  const [stocks, setStocks] = useState(serverStocks);
  const [loading, setLoading] = useState(false);
  
  const page = searchParams?.get('page') ? Number(searchParams.get('page')) : 1;

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      const params = new URLSearchParams(searchParams?.toString());
      const response = await fetch(`/api/virtual-trading/stocks?${params.toString()}`);
      const data = await response.json();
      setStocks(data);
      setLoading(false);
    };
    // Fetch stocks whenever searchParams change
    fetchStocks();
  }, [searchParams]);

  const paginatedStocks = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return stocks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [stocks, page]);

  return (
    <PortfolioProvider>
      <WatchlistProvider>
        <div className="bg-gray-900 text-white min-h-screen">
          <WarningBanner />
          <AcknowledgementModal />
          <IndexTicker />
          <ScrollingTicker />
          <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">
                {view === 'screener' && 'Markets'}
                {view === 'portfolio' && 'Portfolio'}
                {view === 'watchlist' && 'Watchlist'}
                {view === 'news' && 'News'}
              </h1>
              <div className="flex space-x-2">
                <button
                  onClick={() => setView('screener')}
                  className={`px-4 py-2 rounded ${view === 'screener' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Markets
                </button>
                <button
                  onClick={() => setView('portfolio')}
                  className={`px-4 py-2 rounded ${view === 'portfolio' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Portfolio
                </button>
                <button
                  onClick={() => setView('watchlist')}
                  className={`px-4 py-2 rounded ${view === 'watchlist' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  Watchlist
                </button>
                <button
                  onClick={() => setView('news')}
                  className={`px-4 py-2 rounded ${view === 'news' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  News
                </button>
              </div>
            </div>

            {view === 'screener' && (
              <>
                <MarketFilters />
                <ScreenerView
                  paginatedStocks={paginatedStocks}
                  totalStocks={stocks.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={page}
                />
              </>
            )}
            
            {view === 'portfolio' && (isSignedIn ? <PortfolioDashboard /> : <LoginPrompt />)}

            {view === 'watchlist' && (isSignedIn ? <WatchlistManager /> : <LoginPrompt />)}

            {view === 'news' && <NewsFeed symbol="general" />}
          </div>
        </div>
      </WatchlistProvider>
    </PortfolioProvider>
  );
}
