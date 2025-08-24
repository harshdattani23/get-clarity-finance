// src/components/virtual-trading/PortfolioSummary.tsx
'use client';

import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { useStockDataFromDB } from '@/hooks/useRealTimeStockData';
import { Eye, EyeOff } from 'lucide-react';
import { useMemo, useState } from 'react';

const PortfolioSummary = () => {
  const { portfolio } = usePortfolio();
  const [isCensored, setIsCensored] = useState(false);
  const censor = (value: string) => (isCensored ? '₹ ******' : value);
  
  // Get tickers from portfolio holdings
  const tickers = useMemo(() => {
    return portfolio?.holdings.map(h => h.ticker) || [];
  }, [portfolio]);
  
  // Fetch real-time stock data from database
  const { stockData } = useStockDataFromDB(tickers);

  const { investmentValue, currentValue, overallPnl, todayPnl } = useMemo(() => {
    if (!portfolio || !portfolio.holdings) {
      return { investmentValue: 0, currentValue: 0, overallPnl: { value: 0, percent: 0 }, todayPnl: { value: 0, percent: 0 } };
    }

    let investmentValue = 0;  // Total cost basis (what you paid)
    let currentValue = 0;      // Current market value
    let todayPnlValue = 0;     // Today's change in value
    let yesterdayValue = 0;   // Yesterday's value (for today's P&L calculation)

    portfolio.holdings.forEach(holding => {
      // First try to get data from database
      const dbStockData = stockData.get(holding.ticker);
      
      if (dbStockData) {
        // Investment value is what you actually paid (purchase price × quantity)
        const holdingInvestment = holding.averagePrice * holding.quantity;
        investmentValue += holdingInvestment;
        
        // Current value is the current market price from database × quantity
        const holdingCurrentValue = dbStockData.price * holding.quantity;
        currentValue += holdingCurrentValue;
        
        // Today's P&L calculation
        // If we have previousClose from database, use it for accurate calculation
        // Otherwise fall back to using change value
        let holdingTodayPnl: number;
        let yesterdayPrice: number;
        
        if (dbStockData.previousClose !== null && dbStockData.previousClose !== undefined) {
          // Use actual previous close for accurate calculation
          yesterdayPrice = dbStockData.previousClose;
          holdingTodayPnl = (dbStockData.price - dbStockData.previousClose) * holding.quantity;
        } else {
          // Fallback: calculate yesterday's price from today's change
          yesterdayPrice = dbStockData.price - dbStockData.change;
          holdingTodayPnl = dbStockData.change * holding.quantity;
        }
        
        todayPnlValue += holdingTodayPnl;
        yesterdayValue += yesterdayPrice * holding.quantity;
        
        console.log(`Stock ${holding.ticker}:`, {
          purchasePrice: holding.averagePrice,
          currentPrice: dbStockData.price,
          previousClose: dbStockData.previousClose,
          todayChange: dbStockData.change,
          calculatedYesterdayPrice: yesterdayPrice,
          quantity: holding.quantity,
          todayPnl: holdingTodayPnl
        });
      } else {
        // If stock data not found in database, use purchase price as current price (failsafe)
        const holdingValue = holding.averagePrice * holding.quantity;
        investmentValue += holdingValue;
        currentValue += holdingValue;
        yesterdayValue += holdingValue; // Assume no change if no data
        // Today's P&L is 0 if we don't have real-time data
        // todayPnlValue += 0;
      }
    });
    
    // Overall P&L is the difference between current market value and what you paid
    const overallPnlValue = currentValue - investmentValue;
    const overallPnlPercent = investmentValue !== 0 ? (overallPnlValue / investmentValue) * 100 : 0;
    
    // Today's P&L percentage should be relative to yesterday's value, not current value
    const todayPnlPercent = yesterdayValue !== 0 ? (todayPnlValue / yesterdayValue) * 100 : 0;

    // Debug logging to understand the values
    console.log('Portfolio P&L Calculation:', {
      investmentValue,
      currentValue,
      yesterdayValue,
      overallPnlValue,
      overallPnlPercent,
      todayPnlValue,
      todayPnlPercent,
      holdings: portfolio.holdings.length,
      stockDataCount: stockData.size
    });

    return { 
      investmentValue, 
      currentValue, 
      overallPnl: { value: overallPnlValue, percent: overallPnlPercent },
      todayPnl: { value: todayPnlValue, percent: todayPnlPercent }
    };

  }, [portfolio, stockData]);

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

  // Calculate Net Worth = Holdings Current Value + Available Cash
  const netWorth = currentValue + (portfolio.cash || 0);
  
  const summaryData: Array<{ label: string; value: string | React.ReactElement; highlight?: boolean }> = [
    { label: 'Net Worth', value: formatCurrency(netWorth), highlight: true },
    { label: 'Holdings Value', value: formatCurrency(currentValue) },
    { label: 'Available Cash', value: formatCurrency(portfolio.cash) },
    { label: 'Overall P&L', value: formatPnl(overallPnl) },
    { label: "Today's P&L", value: formatPnl(todayPnl) },
  ];

  return (
    <div className="bg-slate-900 p-6 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Portfolio</h2>
        <button onClick={() => setIsCensored(!isCensored)} className="text-gray-400 hover:text-white">
          {isCensored ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      
      {/* Highlight Net Worth as main card */}
      <div className="mb-4">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-300 text-sm mb-1">
                Net Worth <span className="text-xs opacity-75">(Stocks + Cash)</span>
              </p>
              <div className="text-3xl font-bold">
                {censor(formatCurrency(netWorth))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">Today's P&L</div>
              <div className="text-lg font-semibold">{formatPnl(todayPnl)}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Other metrics in a grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Holdings Value</p>
          <div className="text-lg font-semibold">{censor(formatCurrency(currentValue))}</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Available Cash</p>
          <div className="text-lg font-semibold">{censor(formatCurrency(portfolio.cash))}</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Overall P&L</p>
          <div className="text-lg font-semibold">{formatPnl(overallPnl)}</div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
