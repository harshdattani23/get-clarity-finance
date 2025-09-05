'use client';

import React, { memo, useMemo } from 'react';
import { Stock } from '@/lib/trading-data';
import StockTable from './StockTable';

interface ScreenerViewProps {
  stocks: Stock[];
  loading: boolean;
  error?: string | null;
}

const ScreenerView: React.FC<ScreenerViewProps> = memo(({ stocks, loading, error }) => {
  // Memoize stocks to prevent unnecessary prop changes
  const memoizedStocks = useMemo(() => stocks || [], [stocks]);
  
  // Show loading state
  if (loading) {
    return (
      <div className="bg-slate-800 p-4 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-4">Market Screener</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
          <span className="text-gray-300">Loading market data...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-slate-800 p-4 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-4">Market Screener</h2>
        <div className="text-center py-8">
          <div className="text-red-400 mb-2">Error loading market data</div>
          <div className="text-gray-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  // Show empty state (but don't flicker during transitions)
  if (!loading && memoizedStocks.length === 0) {
    return (
      <div className="bg-slate-800 p-4 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-4">Market Screener</h2>
        <div className="text-center py-8 text-gray-500">
          No stocks to display.
        </div>
      </div>
    );
  }

  return (
    <StockTable 
      stocks={memoizedStocks} 
      title="Market Screener" 
      enableRealTimeData={false} // Disable real-time updates in screener for better performance
    />
  );
});

ScreenerView.displayName = 'ScreenerView';

export default ScreenerView;
