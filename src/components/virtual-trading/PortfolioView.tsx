'use client';

import React from 'react';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { Stock } from '@/lib/trading-data';
import StockTable from './StockTable';
import PortfolioSummary from './PortfolioSummary'; // Import PortfolioSummary

interface PortfolioViewProps {
  allStocks: Stock[];
}

const PortfolioView: React.FC<PortfolioViewProps> = ({ allStocks }) => {
  const { portfolio } = usePortfolio();

  if (!portfolio) {
    return (
      <div className="bg-slate-800 p-6 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Loading Portfolio...</h2>
      </div>
    );
  }

  const portfolioStocks = allStocks.filter(stock => 
    portfolio.holdings.some(holding => holding.ticker === stock.ticker)
  );

  return (
    <div className="space-y-6">
      <PortfolioSummary />
      <StockTable stocks={portfolioStocks} title="Your Holdings" showQuantity={true} />
    </div>
  );
};

export default PortfolioView;
