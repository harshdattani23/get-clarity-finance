'use client';

import React, { useState } from 'react';
import { Stock } from '@/lib/trading-data';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';

interface TradeModalProps {
  stock: Stock;
}

const TradeModal: React.FC<TradeModalProps> = ({ stock }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState(1);
  const { portfolio, buyStock, sellStock } = usePortfolio();

  const userHolding = portfolio?.holdings.find(h => h.ticker === stock.ticker);
  const maxSellQuantity = userHolding ? userHolding.quantity : 0;

  const handleOpen = (type: 'BUY' | 'SELL', e: React.MouseEvent) => {
    e.stopPropagation();
    setTradeType(type);
    setQuantity(1);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tradeType === 'BUY') {
      buyStock(stock.ticker, quantity, stock.price);
    } else {
      sellStock(stock.ticker, quantity, stock.price);
    }
    handleClose();
  };
  
  const totalCost = (quantity * stock.price).toFixed(2);

  return (
    <>
      <div className="flex items-center justify-center space-x-2">
        <button onClick={(e) => handleOpen('BUY', e)} className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-colors">Buy</button>
        <button 
          onClick={(e) => handleOpen('SELL', e)} 
          className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={maxSellQuantity === 0}
        >
          Sell
        </button>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div 
            className="bg-slate-800 rounded-lg p-8 w-full max-w-md text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{tradeType === 'BUY' ? 'Buy' : 'Sell'} {stock.ticker}</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Company</span>
                <span>{stock.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Price</span>
                <span className="font-mono">₹{stock.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="quantity" className="text-gray-400">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={tradeType === 'SELL' ? maxSellQuantity : undefined}
                  className="bg-slate-700 border border-slate-600 rounded-md p-2 w-24 text-right"
                />
              </div>
              {tradeType === 'SELL' && (
                 <p className="text-xs text-right text-gray-400">You own: {maxSellQuantity} shares</p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700">
              <div className="flex justify-between font-bold text-lg">
                <span>Total {tradeType === 'BUY' ? 'Cost' : 'Proceeds'}</span>
                <span className="font-mono">₹{totalCost}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button 
                onClick={handleClose} 
                className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm}
                className={`${tradeType === 'BUY' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'} text-white px-6 py-2 rounded-md transition-colors`}
              >
                Confirm {tradeType}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TradeModal;
