// src/components/virtual-trading/PortfolioDashboard.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { allStocks } from '@/lib/trading-data';
import { Stock } from '@/lib/trading-data';
import Link from 'next/link';

export default function PortfolioDashboard() {
  const { isSignedIn } = useUser();
  const { portfolio, removeFromWatchlist } = usePortfolio();

  const getStockPrice = (ticker: string) => {
    const stock = allStocks.find((s) => s.ticker === ticker);
    return stock ? stock.price : 0;
  };

  const totalHoldingsValue = portfolio.holdings.reduce((acc, holding) => {
    return acc + holding.quantity * getStockPrice(holding.ticker);
  }, 0);

  const totalPortfolioValue = portfolio.cash + totalHoldingsValue;

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
      <div className="grid grid-cols-1 gap-4 mb-4">
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
      </div>

      <h3 className="text-xl font-bold mb-2">Holdings</h3>
      <div className="bg-gray-700 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Current Value</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-gray-600">
            {portfolio.holdings.length > 0 ? (
              portfolio.holdings.map((holding) => (
                <tr key={holding.ticker}>
                  <td className="px-6 py-4 whitespace-nowrap">{holding.ticker}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{holding.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{(holding.quantity * getStockPrice(holding.ticker)).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-400">No holdings yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold mt-4 mb-2">Watchlist</h3>
      <div className="bg-gray-700 rounded-lg p-4">
        {portfolio.watchlist.length > 0 ? (
          <ul>
            {portfolio.watchlist.map((ticker) => {
              const stock = allStocks.find(s => s.ticker === ticker);
              return (
                <li key={ticker} className="flex justify-between items-center py-2">
                  <div>
                    <span className="font-semibold">{ticker}</span>
                    {stock && <span className="text-gray-400 ml-4">₹{stock.price.toFixed(2)}</span>}
                  </div>
                  <button
                    onClick={() => removeFromWatchlist(ticker)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs rounded"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-400">Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
}
