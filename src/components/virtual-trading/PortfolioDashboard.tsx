// src/components/virtual-trading/PortfolioDashboard.tsx
'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { allStocks } from '@/lib/trading-data';
import { Stock } from '@/lib/trading-data';
import Link from 'next/link';
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

  const getStockPrice = (ticker: string) => {
    const stock = allStocks.find((s) => s.ticker === ticker);
    return stock ? stock.price : 0;
  };

  const totalHoldingsValue = portfolio.holdings.reduce((acc, holding) => {
    return acc + holding.quantity * getStockPrice(holding.ticker);
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
          to view your holdings and watchlist.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Portfolio Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold">Virtual Cash</h3>
          <p>₹{portfolio.cash.toFixed(2)}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold">Total Holdings Value</h3>
          <p>₹{totalHoldingsValue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold">Total Portfolio Value</h3>
          <p>₹{totalPortfolioValue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold">Total P/L</h3>
          <p className={totalPL >= 0 ? 'text-green-500' : 'text-red-500'}>
            {totalPL.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">Holdings</h3>
          <div className="bg-gray-700 rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Average Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Current Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">P/L</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-600">
                {portfolio.holdings.length > 0 ? (
                  portfolio.holdings.map((holding) => {
                    const currentValue = holding.quantity * getStockPrice(holding.ticker);
                    const investmentValue = holding.quantity * holding.averagePrice;
                    const pl = currentValue - investmentValue;
                    return (
                      <tr key={holding.ticker}>
                        <td className="px-6 py-4 whitespace-nowrap">{holding.ticker}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{holding.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">₹{holding.averagePrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">₹{currentValue.toFixed(2)}</td>
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
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-400">No holdings yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
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
