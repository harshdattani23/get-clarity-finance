'use client';

import React from 'react';
import { Stock } from '@/lib/trading-data';
import StockTable from './StockTable';

interface ScreenerViewProps {
  stocks: Stock[];
  loading: boolean;
}

const ScreenerView: React.FC<ScreenerViewProps> = ({ stocks, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <StockTable stocks={stocks} title="Market Screener" />
  );
};

export default ScreenerView;
