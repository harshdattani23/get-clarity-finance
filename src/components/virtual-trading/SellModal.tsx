'use client';

import { useState } from 'react';
import { allStocks } from '@/lib/trading-data';

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  ticker: string;
  maxQuantity: number;
}

export default function SellModal({ isOpen, onClose, onConfirm, ticker, maxQuantity }: SellModalProps) {
  const [quantity, setQuantity] = useState(1);
  const stock = allStocks.find((s) => s.ticker === ticker);

  if (!isOpen || !stock) return null;

  const handleConfirm = () => {
    onConfirm(quantity);
    onClose();
  };
  
  const estimatedProceeds = quantity * stock.price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Sell {ticker}</h2>
        <p className="mb-4">You currently hold {maxQuantity} shares.</p>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
            Quantity to Sell
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max={maxQuantity}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4 space-y-2">
          <div className="flex justify-between">
            <span>Market Price:</span>
            <span>₹{stock.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Estimated Proceeds:</span>
            <span>₹{estimatedProceeds.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Confirm Sell
          </button>
        </div>
      </div>
    </div>
  );
}
