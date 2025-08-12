// src/components/virtual-trading/MarketView.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { Stock } from '@/lib/trading-data';
import TradeModal from './TradeModal';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Tooltip from './Tooltip';
import AddToWatchlistModal from './AddToWatchlistModal';

interface MarketViewProps {
  stocks: Stock[];
}

export default function MarketView({ stocks }: MarketViewProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [addToWatchlistModalOpen, setAddToWatchlistModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const { buyStock, sellStock } = usePortfolio();

  const handleTrade = (ticker: string, quantity: number, price: number, type: 'buy' | 'sell') => {
    if (!isSignedIn) {
      router.push('/sign-in');
    } else {
      if (type === 'buy') {
        buyStock(ticker, quantity, price);
      } else {
        sellStock(ticker, quantity, price);
      }
    }
  };

  const handleOpenModal = (stock: Stock, type: 'buy' | 'sell') => {
    if (!isSignedIn) {
      router.push('/sign-in');
    } else {
      setSelectedStock(stock);
      setTradeType(type);
      setTradeModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedStock(null);
    setTradeModalOpen(false);
  };

  const openAddToWatchlistModal = (stock: Stock) => {
    setSelectedStock(stock);
    setAddToWatchlistModalOpen(true);
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
              <p className="text-gray-400">Industry: {stock.industry}</p>
              <p className="text-gray-400 text-sm mt-1">{stock.indices.join(', ')}</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => openAddToWatchlistModal(stock)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded w-full"
              >
                Add to Watchlist
              </button>
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
          isOpen={tradeModalOpen}
          onClose={handleCloseModal}
          initialTradeType={tradeType}
        />
      )}
      {selectedStock && (
        <AddToWatchlistModal
            isOpen={addToWatchlistModalOpen}
            onClose={() => setAddToWatchlistModalOpen(false)}
            ticker={selectedStock.ticker}
        />
      )}
    </div>
  );
}
