'use client';

import { useState } from 'react';
import Link from 'next/link';
import SellModal from './SellModal';
import AddToWatchlistModal from './AddToWatchlistModal';
import BuyModal from './BuyModal';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { useRouter, useSearchParams } from 'next/navigation';

interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  marketCap: string;
  industry: string;
  indices: string[];
  percentChange: number;
  volume: string;
}

interface ScreenerViewProps {
  paginatedStocks: Stock[];
  totalStocks: number;
  itemsPerPage: number;
  currentPage: number;
}

const ScreenerView = ({
  paginatedStocks,
  totalStocks,
  itemsPerPage,
  currentPage,
}: ScreenerViewProps) => {
  const { portfolio, sellStock } = usePortfolio();
  const [filter, setFilter] = useState('most_actives');
  const [isBuyModalOpen, setBuyModalOpen] = useState(false);
  const [isSellModalOpen, setSellModalOpen] = useState(false);
  const [isWatchlistModalOpen, setWatchlistModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const openBuyModal = (stock: Stock) => {
    setSelectedStock(stock);
    setBuyModalOpen(true);
  };

  const openSellModal = (stock: Stock) => {
    setSelectedStock(stock);
    setSellModalOpen(true);
  };

  const openWatchlistModal = (stock: Stock) => {
    setSelectedStock(stock);
    setWatchlistModalOpen(true);
  };

  const handleSell = (ticker: string, quantity: number, price: number) => {
    sellStock(ticker, quantity, price);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', newPage.toString());
    router.push(`/virtual-trading?${params.toString()}`);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('search', e.target.value);
    params.set('page', '1');
    router.push(`/virtual-trading?${params.toString()}`);
  };

  return (
    <div className="bg-[#0D1117] p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#161B22] border border-[#30363D] rounded-md px-3 py-2 text-white"
          >
            <option value="most_actives">Most Actives</option>
            {/* Add other filter options here */}
          </select>
          <input
            type="text"
            placeholder="Filter company..."
            defaultValue={searchParams?.get('search') || ''}
            onChange={handleSearchChange}
            className="bg-[#161B22] border border-[#30363D] rounded-md px-3 py-2 text-white w-64"
          />
        </div>
        <div>
          <button className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#30363D]">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">% Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Market Cap</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#0D1117] divide-y divide-[#30363D]">
            {paginatedStocks.map((stock: Stock) => {
              const holding = portfolio?.holdings.find((h) => h.ticker === stock.ticker);
              const userQuantity = holding ? holding.quantity : 0;

              return (
                <tr key={stock.ticker}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/stock/${stock.ticker}`} className="text-blue-400 hover:underline">
                      {stock.ticker}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{stock.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">₹{stock.price.toFixed(2)}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.percentChange.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{stock.volume}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{stock.marketCap}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => openBuyModal(stock)} className="text-green-500 hover:text-green-400 px-2 py-1 rounded bg-green-900 bg-opacity-50">Buy</button>
                      <button 
                        onClick={() => openSellModal(stock)} 
                        className="text-red-500 hover:text-red-400 px-2 py-1 rounded bg-red-900 bg-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={userQuantity === 0}
                      >
                        Sell
                      </button>
                      <button onClick={() => openWatchlistModal(stock)} className="text-blue-400 hover:text-blue-300 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-400">
          Rows per page:
          <select className="bg-[#161B22] border border-[#30363D] rounded-md px-2 py-1 ml-2 text-white">
            <option>15</option>
          </select>
        </div>
        <div className="text-sm text-gray-400">
          Page {currentPage} of {Math.ceil(totalStocks / itemsPerPage)}
        </div>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-[#161B22] border border-[#30363D] rounded-md px-3 py-1 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalStocks / itemsPerPage)}
            className="bg-[#161B22] border border-[#30363D] rounded-md px-3 py-1 ml-2 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      
      {selectedStock && (
        <>
          <BuyModal
            isOpen={isBuyModalOpen}
            onClose={() => setBuyModalOpen(false)}
            stock={selectedStock}
          />
          <SellModal
            isOpen={isSellModalOpen}
            onClose={() => setSellModalOpen(false)}
            onConfirm={(quantity) => handleSell(selectedStock.ticker, quantity, selectedStock.price)}
            ticker={selectedStock.ticker}
            maxQuantity={portfolio?.holdings.find((h) => h.ticker === selectedStock.ticker)?.quantity || 0}
          />
          <AddToWatchlistModal
            isOpen={isWatchlistModalOpen}
            onClose={() => setWatchlistModalOpen(false)}
            ticker={selectedStock.ticker}
          />
        </>
      )}
    </div>
  );
};

export default ScreenerView;
