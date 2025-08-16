'use client';

import React from 'react';
import { Stock } from '@/lib/trading-data';
import StockTable from './StockTable';

interface ScreenerViewProps {
  paginatedStocks: Stock[];
}

const ScreenerView: React.FC<ScreenerViewProps> = ({ paginatedStocks }) => {
  return (
    <StockTable stocks={paginatedStocks} title="Market Screener" />
  );
};

export default ScreenerView;
