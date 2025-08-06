// src/components/virtual-trading/TradeModal.tsx
'use client';

import { useState } from 'react';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { Stock } from '@/lib/trading-data';

interface TradeModalProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
  initialTradeType: 'buy' | 'sell';
}

export default function TradeModal({ stock, isOpen, onClose, initialTradeType }: TradeModalProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>(initialTradeType);
  const [quantity, setQuantity] = useState(1);
  const { buyStock, sellStock, portfolio } = usePortfolio();

  const handleTrade = () => {
    if (tradeType === 'buy') {
      buyStock(stock.ticker, quantity, stock.price);
    } else {
      sellStock(stock.ticker, quantity, stock.price);
    }
    onClose();
  };

  const holding = portfolio.holdings.find(h => h.ticker === stock.ticker);
  const maxSellQuantity = holding ? holding.quantity : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Trade {stock.ticker}</h2>
        <div className="mb-4">
          <button
            onClick={() => setTradeType('buy')}
            className={`px-4 py-2 ${tradeType === 'buy' ? 'bg-blue-600 text-white' : 'bg-gray-600'}`}
          >
            Buy
          </button>
          <button
            onClick={() => setTradeType('sell')}
            className={`px-4 py-2 ${tradeType === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-600'}`}
          >
            Sell
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-2">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            min="1"
            max={tradeType === 'sell' ? maxSellQuantity : undefined}
          />
          {tradeType === 'sell' && <p className="text-sm text-gray-500">You own: {maxSellQuantity}</p>}
        </div>
        <div className="mb-4">
          <p>Market Price: ₹{stock.price.toFixed(2)}</p>
          <p>Estimated Cost: ₹{(quantity * stock.price).toFixed(2)}</p>
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-500 px-4 py-2 rounded">Cancel</button>
          <button
            onClick={handleTrade}
            className={`${tradeType === 'buy' ? 'bg-blue-600' : 'bg-red-600'} text-white px-4 py-2 rounded`}
            disabled={tradeType === 'sell' && quantity > maxSellQuantity}
          >
            Confirm {tradeType === 'buy' ? 'Purchase' : 'Sale'}
          </button>
        </div>
      </div>
    </div>
  );
}
