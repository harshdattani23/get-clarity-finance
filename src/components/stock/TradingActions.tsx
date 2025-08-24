'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import BuyModal from '@/components/virtual-trading/BuyModal';
import SellModal from '@/components/virtual-trading/SellModal';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { useWatchlist } from '@/contexts/virtual-trading/WatchlistContext';
import { Check, Plus, Zap } from 'lucide-react';

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
  
  // Check if this is an index
  const indexTickers = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'FINNIFTY'];
  const isIndex = indexTickers.includes(stock.ticker.toUpperCase());

  if (!isSignedIn) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-center">
        <p>Please sign in to virtual trade and learn</p>
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

  // Show special message for indices
  if (isIndex) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="bg-yellow-900 border border-yellow-600 p-4 rounded-md">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">📊</span>
            <span className="text-yellow-200 font-semibold">Index - View Only</span>
          </div>
          <p className="text-yellow-100 text-sm">
            {stock.ticker} is a market index and cannot be traded directly.
          </p>
          <p className="text-yellow-100 text-xs mt-2">
            Indices are used for market reference and tracking overall market performance.
          </p>
        </div>
        <div className="mt-4 bg-gray-700 p-3 rounded-md">
          <p className="text-gray-300 text-sm">
            💡 <strong>Tip:</strong> To gain exposure to this index, consider trading individual stocks that are part of the {stock.ticker} index.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      {/* Virtual Trading Notice */}
      <div className="mb-4 bg-gray-700 border border-gray-500 p-3 rounded-md">
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-green-400" />
          <span className="text-green-300 font-medium text-sm">Virtual Trading</span>
        </div>
        <p className="text-gray-300 text-xs mt-1">Practice with virtual money - Learn risk-free!</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setBuyModalOpen(true)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          Virtual Buy
        </button>
        <button
          onClick={() => setSellModalOpen(true)}
          disabled={maxSellQuantity === 0}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded disabled:opacity-50 transition-colors"
        >
          Virtual Sell
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
