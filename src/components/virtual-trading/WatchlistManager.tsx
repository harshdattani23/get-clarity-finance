'use client';

import { useState } from 'react';
import { useWatchlist } from '@/contexts/virtual-trading/WatchlistContext';
import WatchlistView from './WatchlistView';

export default function WatchlistManager() {
  const { watchlists, createWatchlist } = useWatchlist();
  const [newWatchlistName, setNewWatchlistName] = useState('');

  const handleCreate = () => {
    if (newWatchlistName.trim()) {
      createWatchlist(newWatchlistName.trim());
      setNewWatchlistName('');
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Create New Watchlist</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            placeholder="New watchlist name"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
          <button
            onClick={handleCreate}
            disabled={watchlists.length >= 3}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-500"
          >
            Create
          </button>
        </div>
        {watchlists.length >= 3 && (
            <p className="text-xs text-red-500 mt-1">You have reached the maximum of 3 watchlists.</p>
        )}
      </div>

      <WatchlistView />
    </div>
  );
}
