// src/components/virtual-trading/ScrollingTicker.tsx
'use client';

import { allStocks } from '@/lib/trading-data';
import React from 'react';

const ScrollingTicker = () => {
  const duplicatedStocks = [...allStocks, ...allStocks]; // Duplicate for seamless scrolling

  return (
    <div className="bg-black overflow-hidden whitespace-nowrap relative h-10 border-t border-b border-gray-700">
      <div className="absolute top-0 left-0 h-full flex items-center animate-scrolling-ticker">
        {duplicatedStocks.map((stock, index) => (
          <React.Fragment key={index}>
            <span className="text-white mx-4 font-mono">
              {stock.ticker}
            </span>
            <span className={stock.change >= 0 ? 'text-green-400' : 'text-red-400'}>
              ₹{stock.price.toFixed(2)} ({stock.change.toFixed(2)}%)
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScrollingTicker;
