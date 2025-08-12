'use client';

import { useState, useMemo } from 'react';
import MarketView from '@/components/virtual-trading/MarketView';
import PortfolioDashboard from '@/components/virtual-trading/PortfolioDashboard';
import IndexTicker from '@/components/virtual-trading/IndexTicker';
import ScrollingTicker from '@/components/virtual-trading/ScrollingTicker';
import MarketFilters from '@/components/virtual-trading/MarketFilters';
import Pagination from '@/components/virtual-trading/Pagination';
import Tooltip from '@/components/virtual-trading/Tooltip';
import AcknowledgementModal from '@/components/virtual-trading/AcknowledgementModal';
import { allStocks } from '@/lib/trading-data';
import { PortfolioProvider } from '@/contexts/virtual-trading/PortfolioContext';
import { WatchlistProvider, useWatchlist, Watchlist } from '@/contexts/virtual-trading/WatchlistContext';
import WatchlistManager from './WatchlistManager';

const ITEMS_PER_PAGE = 10;

function WatchlistTabView({ watchlist }: { watchlist: Watchlist }) {
    const { removeStockFromWatchlist } = useWatchlist();
  
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{watchlist.name}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ticker</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 divide-y divide-gray-600">
              {watchlist.items.length > 0 ? (
                watchlist.items.map((item) => {
                  const stock = allStocks.find((s) => s.ticker === item.ticker);
                  return (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.ticker}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₹{stock?.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => removeStockFromWatchlist(watchlist.id, item.ticker)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-400">This watchlist is empty.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

function TradingTabs({ 
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    currentPage,
    handleApplyFilters,
    paginatedStocks,
    filteredAndSortedStocks,
    ITEMS_PER_PAGE,
 } : any) {
  const { watchlists } = useWatchlist();
  const [activeTab, setActiveTab] = useState('market');

  return (
    <>
      <div className="flex border-b border-gray-700 mb-4">
        <button
            className={`px-4 py-2 text-lg font-semibold ${activeTab === 'market' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('market')}
        >
            Market
        </button>
        <button
          className={`px-4 py-2 text-lg font-semibold ${activeTab === 'portfolio' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
          onClick={() => setActiveTab('portfolio')}
        >
          Portfolio
        </button>
        {watchlists.map((watchlist) => (
          <button
            key={watchlist.id}
            className={`px-4 py-2 text-lg font-semibold ${activeTab === `watchlist-${watchlist.id}` ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab(`watchlist-${watchlist.id}`)}
          >
            {watchlist.name}
          </button>
        ))}
        <button
            className={`px-4 py-2 text-lg font-semibold ${activeTab === 'manage' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('manage')}
        >
            Manage
        </button>
      </div>
      
      {activeTab === 'market' && (
        <div>
            <div className="mb-4">
            <Tooltip text="Search for stocks by name or ticker symbol (e.g., 'Reliance' or 'RELIANCE').">
                <input
                type="text"
                placeholder="Search for a stock..."
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
                />
            </Tooltip>
            </div>
            <Tooltip text="Filter stocks by market index or industry, and sort the results.">
            <MarketFilters onApplyFilters={handleApplyFilters} />
            </Tooltip>
            <div className="mt-4">
            <Tooltip text="This is the main market view. Click on a stock to see more details and place a trade.">
                <MarketView stocks={paginatedStocks} />
            </Tooltip>
            <Pagination
                totalItems={filteredAndSortedStocks.length}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
            </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div>
          <Tooltip text="Your portfolio dashboard shows your virtual cash, holdings, and performance.">
            <PortfolioDashboard />
          </Tooltip>
        </div>
      )}

        {watchlists.map((watchlist) => (
            activeTab === `watchlist-${watchlist.id}` && (
                <WatchlistTabView key={watchlist.id} watchlist={watchlist} />
            )
        ))}

        {activeTab === 'manage' && <WatchlistManager />}
    </>
  );
}

export default function VirtualTradingClient() {
  const [activeTab, setActiveTab] = useState('market');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<{ index?: string; industry?: string }>({});
  const [activeSort, setActiveSort] = useState({ key: 'name', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  const handleApplyFilters = (filters: any, sort: any) => {
    setActiveFilters(filters);
    setActiveSort(sort);
    setCurrentPage(1); // Reset to first page on new filter application
  };

  const filteredAndSortedStocks = useMemo(() => {
    let stocks = allStocks;

    // Filtering
    if (searchTerm) {
      stocks = stocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeFilters.index && activeFilters.index !== '') {
      if (activeFilters.index === 'SENSEX') {
        stocks = stocks.filter(stock => stock.indices.includes('SENSEX') || stock.indices.includes('SENSEX 30'));
      } else {
        stocks = stocks.filter(stock => stock.indices.includes(activeFilters.index!));
      }
    }
    if (activeFilters.industry && activeFilters.industry !== '') {
      stocks = stocks.filter(stock => stock.industry === activeFilters.industry);
    }

    // Sorting
    return [...stocks].sort((a, b) => {
      if (activeSort.key === 'name') {
        return activeSort.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (activeSort.key === 'price') {
        // @ts-ignore
        return activeSort.order === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (activeSort.key === 'marketCap') {
        const marketCapA = parseFloat(a.marketCap);
        const marketCapB = parseFloat(b.marketCap);
        return activeSort.order === 'asc' ? marketCapA - marketCapB : marketCapB - marketCapA;
      }
      if (activeSort.key === 'change') {
        // @ts-ignore
        return activeSort.order === 'asc' ? a.change - b.change : b.change - a.change;
      }
      return 0;
    });
  }, [searchTerm, activeFilters, activeSort]);

  const paginatedStocks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedStocks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedStocks, currentPage]);


  return (
    <PortfolioProvider>
      <WatchlistProvider>
        <div className="bg-gray-900 text-white min-h-screen">
          <AcknowledgementModal />
          <IndexTicker />
          <ScrollingTicker />
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Virtual Trading Terminal</h1>
            
            <TradingTabs 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                handleApplyFilters={handleApplyFilters}
                paginatedStocks={paginatedStocks}
                filteredAndSortedStocks={filteredAndSortedStocks}
                ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            />

          </div>
        </div>
      </WatchlistProvider>
    </PortfolioProvider>
  );
}
