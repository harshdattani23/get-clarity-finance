'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import MarketFilters from './MarketFilters';
import ScreenerView from './ScreenerView';
import WarningBanner from './WarningBanner';
import AcknowledgementModal from './AcknowledgementModal';
import { PortfolioProvider } from '@/contexts/virtual-trading/PortfolioContext';
import { WatchlistProvider } from '@/contexts/virtual-trading/WatchlistContext';
import ClientOnly from '../ClientOnly';
import IndexTicker from './IndexTicker';
import ScrollingTicker from './ScrollingTicker';
import PortfolioSummary from './PortfolioSummary';
import TradingActions from './TradingActions';
import Pagination from './Pagination'; // Import Pagination
import { usePathname } from 'next/navigation'; // Get pathname
import WatchlistManager from './WatchlistManager';
import { useUser } from '@clerk/nextjs';
import LoginPrompt from './LoginPrompt';
import PortfolioView from './PortfolioView'; // Import the new component
import Leaderboard from './Leaderboard';
import Achievements from './Achievements';
import { Stock } from '@/lib/trading-data';

const VirtualTradingClient = ({ initialData }: { initialData: { stocks: Stock[], totalCount: number } }) => {
  const [leftColumnView, setLeftColumnView] = useState<'markets' | 'watchlists' | 'leaderboard'>('markets');
  const [rightColumnView, setRightColumnView] = useState<'summary' | 'portfolio' | 'achievements'>('summary');
  const searchParams = useSearchParams();
  const pathname = usePathname(); // Get pathname
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      setLeftColumnView('markets');
      setRightColumnView('summary');
    }
  }, [isSignedIn]);

  const filteredAndSortedStocks = useMemo(() => {
    const searchTerm = searchParams?.get('search') || '';
    const index = searchParams?.get('index') || 'all';
    const industry = searchParams?.get('industry') || 'all';
    const sort = searchParams?.get('sort') || 'name-asc';

    let filteredStocks = [...initialData.stocks];

    if (searchTerm) {
      filteredStocks = filteredStocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (index !== 'all') {
      filteredStocks = filteredStocks.filter((stock) => stock.indices.includes(index));
    }
    if (industry !== 'all') {
      filteredStocks = filteredStocks.filter((stock) => stock.industry === industry);
    }

    const [sortKey, sortOrder] = sort.split('-');
    filteredStocks.sort((a: Stock, b: Stock) => {
      if (sortKey === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (['price', 'change', 'marketCapValue', 'percentChange'].includes(sortKey)) {
        const aValue = (a as Stock & { [key: string]: number })[sortKey] || 0;
        const bValue = (b as Stock & { [key: string]: number })[sortKey] || 0;
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    return filteredStocks;
  }, [searchParams, initialData.stocks]);

  const currentPage = Number(searchParams?.get('page')) || 1;
  const itemsPerPage = 15;
  const paginatedStocks = filteredAndSortedStocks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <PortfolioProvider>
      <WatchlistProvider>
        <div className="bg-slate-900 text-white min-h-screen">
          <WarningBanner />
          <AcknowledgementModal />
          <ClientOnly>
            <IndexTicker />
            <ScrollingTicker />
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
                  <button
                    onClick={() => setLeftColumnView('leaderboard')}
                    className={`px-3 py-2 rounded-md font-semibold flex-1 ${leftColumnView === 'leaderboard' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                  >
                    Leaderboard
                  </button>
                </div>

                {leftColumnView === 'markets' && (
                  <>
                    <MarketFilters />
                    <ScreenerView
                      paginatedStocks={paginatedStocks}
                    />
                    <Pagination
                      totalItems={filteredAndSortedStocks.length}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      pathname={pathname || ''}
                      searchParams={searchParams || new URLSearchParams()}
                    />
                  </>
                )}

                {leftColumnView === 'watchlists' && <WatchlistManager />}
                {leftColumnView === 'leaderboard' && <Leaderboard />}
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
                      <button
                        onClick={() => setRightColumnView('achievements')}
                        className={`px-3 py-2 rounded-md font-semibold flex-1 ${rightColumnView === 'achievements' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
                      >
                        Achievements
                      </button>
                    </>
                  )}
                </div>
                {isSignedIn ? (
                  <>
                    {rightColumnView === 'summary' && (
                      <>
                        <PortfolioSummary />
                        <TradingActions />
                      </>
                    )}
                    {rightColumnView === 'portfolio' && <PortfolioView allStocks={initialData.stocks} />}
                    {rightColumnView === 'achievements' && <Achievements />}
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
