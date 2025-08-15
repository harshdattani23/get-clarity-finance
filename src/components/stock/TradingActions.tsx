'use client';

import { useState } from 'react';
import { Stock } from '@/lib/trading-data';
import BuyModal from '@/components/virtual-trading/BuyModal';
import SellModal from '@/components/virtual-trading/SellModal';
import AddToWatchlistModal from '@/components/virtual-trading/AddToWatchlistModal';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';

interface TradingActionsProps {
  stock: Stock;
}

export default function TradingActions({ stock }: TradingActionsProps) {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [addToWatchlistModalOpen, setAddToWatchlistModalOpen] = useState(false);
  const { portfolio, sellStock } = usePortfolio();

  const holding = portfolio?.holdings.find(h => h.ticker === stock.ticker);
  const maxSellQuantity = holding ? holding.quantity : 0;

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setBuyModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold"
          >
            Buy
          </button>
          <button
            onClick={() => setSellModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold"
            disabled={maxSellQuantity === 0}
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

      <BuyModal
        stock={stock}
        isOpen={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
      />
      
      <SellModal
        isOpen={sellModalOpen}
        onClose={() => setSellModalOpen(false)}
        ticker={stock.ticker}
        maxQuantity={maxSellQuantity}
        onConfirm={(quantity) => sellStock(stock.ticker, quantity, stock.price)}
      />

      <AddToWatchlistModal
        isOpen={addToWatchlistModalOpen}
        onClose={() => setAddToWatchlistModalOpen(false)}
        ticker={stock.ticker}
      />
    </>
  );
}
