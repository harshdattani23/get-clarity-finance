// src/components/virtual-trading/PortfolioDashboard.tsx
'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { allStocks } from '@/lib/trading-data';
import SellModal from './SellModal';

export default function PortfolioDashboard() {
  const { isSignedIn } = useUser();
  const { portfolio, sellStock } = usePortfolio();
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [stockToSell, setStockToSell] = useState<{ ticker: string; quantity: number } | null>(null);

  if (!portfolio) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Portfolio Dashboard</h2>
        <p className="text-gray-400">Loading portfolio...</p>
      </div>
    );
  }

  const handleSellClick = (ticker: string, quantity: number) => {
    setStockToSell({ ticker, quantity });
    setSellModalOpen(true);
  };

  const handleSellConfirm = (sellQuantity: number) => {
    if (stockToSell) {
      const stock = allStocks.find((s) => s.ticker === stockToSell.ticker);
      if (stock) {
        sellStock(stockToSell.ticker, sellQuantity, stock.price);
      }
    }
  };

  const getStockData = (ticker: string) => {
    return allStocks.find((s) => s.ticker === ticker);
  };

  const totalHoldingsValue = portfolio.holdings.reduce((acc, holding) => {
    const stock = getStockData(holding.ticker);
    return acc + holding.quantity * (stock ? stock.price : 0);
  }, 0);

  const totalPortfolioValue = portfolio.cash + totalHoldingsValue;

  const totalInvestmentValue = portfolio.holdings.reduce((acc, holding) => {
    return acc + holding.quantity * holding.averagePrice;
  }, 0);

  const totalPL = totalHoldingsValue - totalInvestmentValue;

  if (!isSignedIn) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Portfolio Dashboard</h2>
        <p className="text-gray-400 mb-6">
          Please{' '}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            sign in
          </Link>{' '}
          to view your holdings.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0D1117] p-4 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-[#161B22] p-4 rounded-lg">
          <h3 className="text-gray-400">Virtual Cash</h3>
          <p className="text-2xl font-bold">₹{portfolio.cash.toFixed(2)}</p>
        </div>
        <div className="bg-[#161B22] p-4 rounded-lg">
          <h3 className="text-gray-400">Holdings Value</h3>
          <p className="text-2xl font-bold">₹{totalHoldingsValue.toFixed(2)}</p>
        </div>
        <div className="bg-[#161B22] p-4 rounded-lg">
          <h3 className="text-gray-400">Total Value</h3>
          <p className="text-2xl font-bold">₹{totalPortfolioValue.toFixed(2)}</p>
        </div>
        <div className="bg-[#161B22] p-4 rounded-lg">
          <h3 className="text-gray-400">Total P/L</h3>
          <p className={`text-2xl font-bold ${totalPL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalPL.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#30363D]">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg. Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Current Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">P/L</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#0D1117] divide-y divide-[#30363D]">
            {portfolio.holdings.map((holding) => {
              const stock = getStockData(holding.ticker);
              if (!stock) return null;

              const currentValue = holding.quantity * stock.price;
              const investmentValue = holding.quantity * holding.averagePrice;
              const pl = currentValue - investmentValue;

              return (
                <tr key={holding.ticker}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/stock/${stock.ticker}`} className="text-blue-400 hover:underline">
                      {stock.ticker}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{stock.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{holding.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">₹{holding.averagePrice.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">₹{stock.price.toFixed(2)}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${pl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {pl.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleSellClick(holding.ticker, holding.quantity)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {stockToSell && (
        <SellModal
          isOpen={sellModalOpen}
          onClose={() => setSellModalOpen(false)}
          onConfirm={handleSellConfirm}
          ticker={stockToSell.ticker}
          maxQuantity={stockToSell.quantity}
        />
      )}
    </div>
  );
}
