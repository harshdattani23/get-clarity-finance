'use client';

import { useState } from 'react';
import { useWatchlist } from '@/contexts/virtual-trading/WatchlistContext';

export default function WatchlistManager() {
  const { watchlists, createWatchlist, renameWatchlist, deleteWatchlist } = useWatchlist();
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [renameInfo, setRenameInfo] = useState<{ id: number; name: string } | null>(null);

  const handleCreate = () => {
    if (newWatchlistName.trim()) {
      createWatchlist(newWatchlistName.trim());
      setNewWatchlistName('');
    }
  };

  const handleRename = () => {
    if (renameInfo && renameInfo.name.trim()) {
      renameWatchlist(renameInfo.id, renameInfo.name.trim());
      setRenameInfo(null);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <h3 className="text-xl font-bold mb-4">Manage Watchlists</h3>
      
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

      <div>
        <h4 className="font-semibold mb-2">Existing Watchlists</h4>
        <ul className="space-y-2">
          {watchlists.map((wl) => (
            <li key={wl.id} className="flex justify-between items-center bg-gray-700 p-2 rounded">
              {renameInfo?.id === wl.id ? (
                <input
                  type="text"
                  value={renameInfo.name}
                  onChange={(e) => setRenameInfo({ ...renameInfo, name: e.target.value })}
                  className="w-full p-1 bg-gray-600 border border-gray-500 rounded"
                />
              ) : (
                <span>{wl.name}</span>
              )}
              <div className="flex gap-2">
                {renameInfo?.id === wl.id ? (
                  <button onClick={handleRename} className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs rounded">Save</button>
                ) : (
                  <button onClick={() => setRenameInfo({ id: wl.id, name: wl.name })} className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 text-xs rounded">Rename</button>
                )}
                <button onClick={() => deleteWatchlist(wl.id)} className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
