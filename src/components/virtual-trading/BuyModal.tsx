// src/components/virtual-trading/BuyModal.tsx
'use client';

import { useState } from 'react';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { Stock } from '@/lib/trading-data';

interface BuyModalProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
}

export default function BuyModal({ stock, isOpen, onClose }: BuyModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { portfolio, buyStock } = usePortfolio();

  const handleBuy = () => {
    buyStock(stock.ticker, quantity, stock.price);
    onClose();
  };

  if (!isOpen) return null;

  const estimatedCost = quantity * stock.price;
  const availableFunds = portfolio?.cash || 0;
  const canAfford = availableFunds >= estimatedCost;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Buy {stock.ticker}</h2>
        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-2">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            min="1"
          />
        </div>
        <div className="mb-4 space-y-2">
          <div className="flex justify-between">
            <span>Market Price:</span>
            <span>₹{stock.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Cost:</span>
            <span>₹{estimatedCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Available Funds:</span>
            <span>₹{availableFunds.toFixed(2)}</span>
          </div>
          {!canAfford && <p className="text-red-500 text-sm text-center">Insufficient funds</p>}
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-500 px-4 py-2 rounded">Cancel</button>
          <button
            onClick={handleBuy}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-500"
            disabled={!canAfford}
          >
            Confirm Buy
          </button>
        </div>
      </div>
    </div>
  );
}
