'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import BuyModal from '@/components/virtual-trading/BuyModal';
import SellModal from '@/components/virtual-trading/SellModal';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { useWatchlist } from '@/contexts/virtual-trading/WatchlistContext';
import { Check, Plus } from 'lucide-react';

// This should align with the Stock type defined in the parent page
interface StockData {
  ticker: string;
  price: number;
  name: string; // Adding name for modals
}

export default function TradingActions({ stock }: { stock: StockData }) {
  const { isSignedIn } = useUser();
  const { portfolio, sellStock } = usePortfolio();
  const { watchlist, addStockToWatchlist, removeStockFromWatchlist } = useWatchlist();
  const [isBuyModalOpen, setBuyModalOpen] = useState(false);
  const [isSellModalOpen, setSellModalOpen] = useState(false);

  if (!isSignedIn) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-center">
        <p>Please sign in to trade.</p>
      </div>
    );
  }

  const userHolding = portfolio?.holdings.find(h => h.ticker === stock.ticker);
  const maxSellQuantity = userHolding ? userHolding.quantity : 0;
  const isInWatchlist = watchlist?.items.some(item => item.ticker === stock.ticker);

  const handleSell = (quantity: number) => {
    sellStock(stock.ticker, quantity, stock.price);
  };
  
  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeStockFromWatchlist(stock.ticker);
    } else {
      addStockToWatchlist(stock.ticker);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setBuyModalOpen(true)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded"
        >
          Buy
        </button>
        <button
          onClick={() => setSellModalOpen(true)}
          disabled={maxSellQuantity === 0}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded disabled:opacity-50"
        >
          Sell
        </button>
        <button
          onClick={handleWatchlistToggle}
          className={`p-3 rounded transition-colors ${isInWatchlist ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          {isInWatchlist ? <Check className="text-white" /> : <Plus className="text-white" />}
        </button>
      </div>
      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        stock={stock}
      />
      <SellModal
        isOpen={isSellModalOpen}
        onClose={() => setSellModalOpen(false)}
        onConfirm={handleSell}
        ticker={stock.ticker}
        maxQuantity={maxSellQuantity}
      />
    </div>
  );
}
