// src/components/virtual-trading/MarketView.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { Stock } from '@/lib/trading-data';
import TradeModal from './TradeModal';

export default function MarketView({ stocks }: { stocks: Stock[] }) {
  const { addToWatchlist, removeFromWatchlist, portfolio } = usePortfolio();
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const handleOpenModal = (stock: Stock, type: 'buy' | 'sell') => {
    setSelectedStock(stock);
    setTradeType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStock(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Market</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock) => (
          <div key={stock.ticker} className="bg-gray-700 p-4 rounded-lg flex flex-col justify-between">
            <div>
              <Link href={`/virtual-trading/stock/${stock.ticker}`}>
                <h3 className="text-xl font-semibold text-blue-400 hover:underline">{stock.name} ({stock.ticker})</h3>
              </Link>
              <p>Price: ₹{stock.price.toFixed(2)}</p>
              <p className={stock.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                Change: {stock.change.toFixed(2)}%
              </p>
              <p>Market Cap: {stock.marketCap}</p>
              <p>Industry: {stock.industry}</p>
              <p className="text-xs text-gray-400">{stock.indices.join(', ')}</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {portfolio.watchlist.includes(stock.ticker) ? (
                <button
                  onClick={() => removeFromWatchlist(stock.ticker)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded w-full"
                >
                  In Watchlist
                </button>
              ) : (
                <button
                  onClick={() => addToWatchlist(stock.ticker)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded w-full"
                >
                  Add to Watchlist
                </button>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(stock, 'buy')}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded w-full"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleOpenModal(stock, 'sell')}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded w-full"
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedStock && (
        <TradeModal
          stock={selectedStock}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialTradeType={tradeType}
        />
      )}
    </div>
  );
}
