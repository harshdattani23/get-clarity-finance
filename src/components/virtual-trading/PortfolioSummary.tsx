// src/components/virtual-trading/PortfolioSummary.tsx
'use client';

import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { allStocks } from '@/lib/trading-data';
import { Eye, EyeOff } from 'lucide-react';
import { useMemo, useState } from 'react';

const PortfolioSummary = () => {
  const { portfolio } = usePortfolio();
  const [isCensored, setIsCensored] = useState(false);
  const censor = (value: string) => (isCensored ? '₹ ******' : value);

  const { investmentValue, currentValue, overallPnl, todayPnl } = useMemo(() => {
    if (!portfolio || !portfolio.holdings) {
      return { investmentValue: 0, currentValue: 0, overallPnl: { value: 0, percent: 0 }, todayPnl: { value: 0, percent: 0 } };
    }

    let investmentValue = 0;
    let currentValue = 0;
    let todayPnlValue = 0;

    portfolio.holdings.forEach(holding => {
      const stockData = allStocks.find(s => s.ticker === holding.ticker);
      if (stockData) {
        investmentValue += holding.averagePrice * holding.quantity;
        currentValue += stockData.price * holding.quantity;
        todayPnlValue += stockData.change * holding.quantity;
      }
    });
    
    const overallPnlValue = currentValue - investmentValue;
    const overallPnlPercent = investmentValue !== 0 ? (overallPnlValue / investmentValue) * 100 : 0;
    const todayPnlPercent = investmentValue !== 0 ? (todayPnlValue / investmentValue) * 100 : 0;

    return { 
      investmentValue, 
      currentValue, 
      overallPnl: { value: overallPnlValue, percent: overallPnlPercent },
      todayPnl: { value: todayPnlValue, percent: todayPnlPercent }
    };

  }, [portfolio]);

  if (!portfolio) {
    return (
      <div className="bg-slate-900 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">My Portfolio</h2>
        <div className="text-center py-8">
          <p className="text-gray-400">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => `₹ ${value.toFixed(2)}`;
  const formatPnl = (pnl: { value: number, percent: number }) => {
    const sign = pnl.value >= 0 ? '+' : '-';
    const color = pnl.value >= 0 ? 'text-green-500' : 'text-red-500';
    return <span className={color}>{`${sign}${formatCurrency(Math.abs(pnl.value))} (${pnl.percent.toFixed(2)}%)`}</span>;
  };

  const summaryData = [
    { label: 'Investment', value: formatCurrency(investmentValue) },
    { label: 'Current Value', value: formatCurrency(currentValue) },
    { label: 'Overall Profits', value: formatPnl(overallPnl) },
    { label: "Today's Profit", value: formatPnl(todayPnl) },
    { label: 'Available Cash', value: formatCurrency(portfolio.cash) }
  ];

  return (
    <div className="bg-slate-900 p-6 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Portfolio</h2>
        <button onClick={() => setIsCensored(!isCensored)} className="text-gray-400 hover:text-white">
          {isCensored ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {summaryData.map((item, index) => (
          <div key={index} className="bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">{item.label}</p>
            <div className="text-lg font-semibold">{typeof item.value === 'string' ? censor(item.value) : item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSummary;
