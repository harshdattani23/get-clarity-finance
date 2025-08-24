'use client';

import React, { useMemo } from 'react';
import { Stock } from '@/lib/trading-data';
import TradeModal from './TradeModal';
import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { useStockDataFromDB } from '@/hooks/useRealTimeStockData';

interface HoldingsTableProps {
  stocks: Stock[];
}

const HoldingsTable: React.FC<HoldingsTableProps> = ({ stocks }) => {
  const router = useRouter();
  const { portfolio } = usePortfolio();
  
  // Get tickers from stocks
  const tickers = useMemo(() => stocks.map(s => s.ticker), [stocks]);
  
  // Fetch real-time stock data from database
  const { stockData } = useStockDataFromDB(tickers);

  const formatCurrency = (value: number | unknown) => {
    const numValue = typeof value === 'number' ? value : Number(value);
    return `₹${numValue.toFixed(2)}`;
  };
  const formatPercent = (value: number | unknown) => {
    const numValue = typeof value === 'number' ? value : Number(value);
    const color = numValue >= 0 ? 'text-green-500' : 'text-red-500';
    const sign = numValue >= 0 ? '+' : '';
    return <span className={color}>{`${sign}${numValue.toFixed(2)}%`}</span>;
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-4">Your Holdings</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700 text-xs text-gray-400">
              <th className="p-2">Symbol</th>
              <th className="p-2 text-right">Qty</th>
              <th className="p-2 text-right">Avg Buy Price</th>
              <th className="p-2 text-right">Current Price</th>
              <th className="p-2 text-right">Investment</th>
              <th className="p-2 text-right">Current Value</th>
              <th className="p-2 text-right">P&L</th>
              <th className="p-2 text-right">P&L %</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length > 0 ? (
              stocks.map((stock) => {
                const holding = portfolio?.holdings.find(h => h.ticker === stock.ticker);
                if (!holding) return null;

                // Get current price from database, fallback to static data if not available
                const dbStock = stockData.get(stock.ticker);
                const currentPrice = Number(dbStock?.price ?? stock.price);
                const currentChange = Number(dbStock?.change ?? stock.change);
                
                const investmentValue = holding.quantity * Number(holding.averagePrice);
                const currentValue = holding.quantity * currentPrice;
                const pnl = currentValue - investmentValue;
                const pnlPercent = (pnl / investmentValue) * 100;
                const isProfit = pnl >= 0;

                return (
                  <tr
                    key={stock.ticker}
                    className="border-b border-slate-800 hover:bg-slate-700 cursor-pointer"
                    onClick={() => router.push(`/virtual-trading/stock/${stock.ticker}`)}
                  >
                    <td className="p-2">
                      <div className="font-bold">{stock.ticker}</div>
                      <div className="text-xs text-gray-400">{stock.name}</div>
                    </td>
                    <td className="p-2 text-right font-mono">
                      {holding.quantity}
                    </td>
                    <td className="p-2 text-right font-mono">
                      {formatCurrency(holding.averagePrice)}
                    </td>
                    <td className="p-2 text-right font-mono">
                      {formatCurrency(currentPrice)}
                      <div className={`text-xs ${currentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {currentChange >= 0 ? '+' : ''}{currentChange.toFixed(2)}
                      </div>
                    </td>
                    <td className="p-2 text-right font-mono">
                      {formatCurrency(investmentValue)}
                    </td>
                    <td className="p-2 text-right font-mono">
                      {formatCurrency(currentValue)}
                    </td>
                    <td className={`p-2 text-right font-mono ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                      {isProfit ? '+' : ''}{formatCurrency(Math.abs(pnl))}
                    </td>
                    <td className="p-2 text-right font-mono">
                      {formatPercent(pnlPercent)}
                    </td>
                    <td className="p-2" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center">
                        <TradeModal stock={stock} />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="text-center p-8 text-gray-500">
                  No holdings to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Summary Row */}
        {stocks.length > 0 && portfolio && (
          <div className="mt-4 p-3 bg-slate-700 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Total Investment:</span>
                <span className="ml-2 font-semibold">
                  {formatCurrency(
                    portfolio.holdings.reduce((sum, h) => sum + (h.quantity * Number(h.averagePrice)), 0)
                  )}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Current Value:</span>
                <span className="ml-2 font-semibold">
                  {formatCurrency(
                    stocks.reduce((sum, stock) => {
                      const holding = portfolio.holdings.find(h => h.ticker === stock.ticker);
                      const dbStock = stockData.get(stock.ticker);
                      const currentPrice = Number(dbStock?.price ?? stock.price);
                      return sum + (holding ? holding.quantity * currentPrice : 0);
                    }, 0)
                  )}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Total P&L:</span>
                <span className="ml-2 font-semibold">
                  {(() => {
                    const totalPnl = stocks.reduce((sum, stock) => {
                      const holding = portfolio.holdings.find(h => h.ticker === stock.ticker);
                      if (holding) {
                        const dbStock = stockData.get(stock.ticker);
                        const currentPrice = Number(dbStock?.price ?? stock.price);
                        const pnl = (currentPrice - Number(holding.averagePrice)) * holding.quantity;
                        return sum + pnl;
                      }
                      return sum;
                    }, 0);
                    const isProfit = totalPnl >= 0;
                    return (
                      <span className={isProfit ? 'text-green-500' : 'text-red-500'}>
                        {isProfit ? '+' : ''}{formatCurrency(Math.abs(totalPnl))}
                      </span>
                    );
                  })()}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Total P&L %:</span>
                <span className="ml-2 font-semibold">
                  {(() => {
                    const totalInvestment = portfolio.holdings.reduce((sum, h) => sum + (h.quantity * Number(h.averagePrice)), 0);
                    const totalCurrent = stocks.reduce((sum, stock) => {
                      const holding = portfolio.holdings.find(h => h.ticker === stock.ticker);
                      const dbStock = stockData.get(stock.ticker);
                      const currentPrice = Number(dbStock?.price ?? stock.price);
                      return sum + (holding ? holding.quantity * currentPrice : 0);
                    }, 0);
                    const pnlPercent = totalInvestment > 0 ? ((totalCurrent - totalInvestment) / totalInvestment) * 100 : 0;
                    return formatPercent(pnlPercent);
                  })()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoldingsTable;
