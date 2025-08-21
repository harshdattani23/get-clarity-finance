// src/components/virtual-trading/BuyModal.tsx
'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { Stock } from '@/lib/trading-data';

interface BuyModalProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
}

export default function BuyModal({ stock, isOpen, onClose }: BuyModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [customPrice, setCustomPrice] = useState(stock.price);
  const { portfolio, buyStock } = usePortfolio();

  // Reset custom price when stock changes
  React.useEffect(() => {
    setCustomPrice(stock.price);
  }, [stock.price]);

  const handleBuy = () => {
    buyStock(stock.ticker, quantity, customPrice);
    onClose();
    setQuantity(1); // Reset quantity after buying
  };

  if (!isOpen) return null;

  const estimatedCost = quantity * customPrice;
  const availableFunds = portfolio?.cash || 0;
  const canAfford = availableFunds >= estimatedCost;

  // Show loading state if portfolio is not loaded yet
  if (!portfolio) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Loading portfolio...</h2>
        </div>
      </div>
    );
  }

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
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            min="1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">Price per share</label>
          <input
            type="number"
            id="price"
            value={customPrice}
            onChange={(e) => setCustomPrice(Math.max(0.01, parseFloat(e.target.value) || stock.price))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="mb-4 space-y-2">
          <div className="flex justify-between">
            <span>Market Price:</span>
            <span>₹{stock.price.toFixed(2)}</span>
          </div>
          {customPrice !== stock.price && (
            <div className="flex justify-between text-yellow-400">
              <span>Custom Price:</span>
              <span>₹{customPrice.toFixed(2)}</span>
            </div>
          )}
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
