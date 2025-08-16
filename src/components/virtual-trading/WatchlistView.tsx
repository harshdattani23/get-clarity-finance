// src/components/virtual-trading/WatchlistView.tsx
'use client';

import React from 'react';
import { allStocks } from '@/lib/trading-data';
import StockTable from './StockTable';

interface WatchlistItem {
  ticker: string;
}

interface Watchlist {
  name: string;
  items: WatchlistItem[];
}

const WatchlistView = ({ watchlist }: { watchlist: Watchlist }) => {
  if (!watchlist || !watchlist.items) {
    return <div className="text-center p-4">No watchlist items to display.</div>;
  }

  const watchlistStocks = allStocks.filter(stock => 
    watchlist.items.some((item: WatchlistItem) => item.ticker === stock.ticker)
  );

  return (
    <StockTable stocks={watchlistStocks} title={watchlist.name} />
  );
};

export default WatchlistView;
