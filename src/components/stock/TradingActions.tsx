'use client';

import { useState } from 'react';
import { Stock } from '@/lib/trading-data';
import TradeModal from '@/components/virtual-trading/TradeModal';
import AddToWatchlistModal from '@/components/virtual-trading/AddToWatchlistModal';

interface TradingActionsProps {
  stock: Stock;
}

export default function TradingActions({ stock }: TradingActionsProps) {
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [addToWatchlistModalOpen, setAddToWatchlistModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const openTradeModal = (type: 'buy' | 'sell') => {
    setTradeType(type);
    setTradeModalOpen(true);
  };

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => openTradeModal('buy')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold"
          >
            Buy
          </button>
          <button
            onClick={() => openTradeModal('sell')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold"
          >
            Sell
          </button>
          <button
            onClick={() => setAddToWatchlistModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold"
          >
            Add to Watchlist
          </button>
        </div>
      </div>

      <TradeModal
        stock={stock}
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        initialTradeType={tradeType}
      />

      <AddToWatchlistModal
        isOpen={addToWatchlistModalOpen}
        onClose={() => setAddToWatchlistModalOpen(false)}
        ticker={stock.ticker}
      />
    </>
  );
}
