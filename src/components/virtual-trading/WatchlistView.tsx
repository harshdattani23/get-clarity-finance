// src/components/virtual-trading/WatchlistView.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useWatchlist } from '@/contexts/virtual-trading/WatchlistContext';
import { allStocks } from '@/lib/trading-data';

const WatchlistView = () => {
  const { watchlists, removeStockFromWatchlist, renameWatchlist, deleteWatchlist } = useWatchlist();
  const [renameInfo, setRenameInfo] = useState<{ id: number; name: string } | null>(null);

  const handleRename = () => {
    if (renameInfo && renameInfo.name.trim()) {
      renameWatchlist(renameInfo.id, renameInfo.name.trim());
      setRenameInfo(null);
    }
  };

  return (
    <div>
      {watchlists.map((watchlist) => (
        <div key={watchlist.id} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            {renameInfo?.id === watchlist.id ? (
              <>
                <input
                  type="text"
                  value={renameInfo.name}
                  onChange={(e) => setRenameInfo({ ...renameInfo, name: e.target.value })}
                  className="w-full p-1 bg-gray-600 border border-gray-500 rounded text-xl font-bold"
                  onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                />
                <button onClick={handleRename} className="p-1 text-green-500 hover:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold">{watchlist.name}</h3>
                <button onClick={() => setRenameInfo({ id: watchlist.id, name: watchlist.name })} className="p-1 text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
                  </svg>
                </button>
                <button onClick={() => deleteWatchlist(watchlist.id)} className="p-1 text-gray-400 hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#30363D]">
              <thead className="">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Change</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">% Change</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Market Cap</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-[#0D1117] divide-y divide-[#30363D]">
                {watchlist.items.map((item) => {
                  const stock = allStocks.find((s) => s.ticker === item.ticker);
                  if (!stock) return null;
                  
                  const previousPrice = stock.price - stock.change;
                  const percentChange = previousPrice ? (stock.change / previousPrice) * 100 : 0;

                  return (
                    <tr key={item.ticker}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/stock/${stock.ticker}`} className="text-blue-400 hover:underline">
                          {stock.ticker}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{stock.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">₹{stock.price.toFixed(2)}</td>
                      <td className={`px-6 py-4 whitespace-nowrap ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.change.toFixed(2)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {percentChange.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{stock.marketCap}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => removeStockFromWatchlist(watchlist.id, item.ticker)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WatchlistView;
