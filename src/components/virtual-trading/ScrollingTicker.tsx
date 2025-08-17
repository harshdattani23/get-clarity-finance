// src/components/virtual-trading/ScrollingTicker.tsx
'use client';

import { allStocks } from '@/lib/trading-data';
import React, { useMemo } from 'react';
import { useStockDataFromDB } from '@/hooks/useRealTimeStockData';

const ScrollingTicker = () => {
  const duplicatedStocks = useMemo(() => [...allStocks, ...allStocks], []); // Duplicate for seamless scrolling
  const tickers = useMemo(() => Array.from(new Set(allStocks.map(s => s.ticker))), []);
  const { getStockData } = useStockDataFromDB(tickers);

  return (
    <div className="bg-black overflow-hidden whitespace-nowrap relative h-10 border-t border-b border-gray-700">
      <div className="absolute top-0 left-0 h-full flex items-center animate-scrolling-ticker">
        {duplicatedStocks.map((stock, index) => {
          const db = getStockData(stock.ticker);
          const price = db?.price ?? stock.price;
          const percentChange = db?.percentChange ?? (
            stock.price && stock.price - stock.change !== 0
              ? (stock.change / (stock.price - stock.change)) * 100
              : 0
          );
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
