// src/components/virtual-trading/ScrollingTicker.tsx
'use client';

import { nifty50Stocks } from '@/lib/trading-data';
import React, { useMemo } from 'react';
import { useStockDataFromDB } from '@/hooks/useRealTimeStockData';

const ScrollingTicker = () => {
  // Use only Nifty 50 stocks for better performance and to avoid rate limiting
  const duplicatedStocks = useMemo(() => [...nifty50Stocks, ...nifty50Stocks], []); // Duplicate for seamless scrolling
  const tickers = useMemo(() => Array.from(new Set(nifty50Stocks.map(s => s.ticker))), []);
  // Disable real-time data in ticker to prevent excessive API calls
  const { getStockData } = useStockDataFromDB([], false); // Pass empty array and disabled

  return (
    <div className="bg-black overflow-hidden whitespace-nowrap relative h-10 border-t border-b border-gray-700">
      <div className="absolute top-0 left-0 h-full flex items-center animate-scrolling-ticker">
        {duplicatedStocks.map((stock, index) => {
          // Use static data instead of real-time data to prevent API overload
          const price = stock.price;
          const percentChange = stock.price && stock.price - stock.change !== 0
            ? (stock.change / (stock.price - stock.change)) * 100
            : 0;
          const isUp = percentChange >= 0;
          return (
            <React.Fragment key={index}>
              <span className="text-white mx-4 font-mono">
                {stock.ticker}
              </span>
              <span className={isUp ? 'text-green-400' : 'text-red-400'}>
                ₹{price.toFixed(2)} ({percentChange.toFixed(2)}%)
              </span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollingTicker;
