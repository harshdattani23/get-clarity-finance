'use client';

import { useWatchlist, Watchlist } from '@/contexts/virtual-trading/WatchlistContext';

interface AddToWatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticker: string;
}

export default function AddToWatchlistModal({ isOpen, onClose, ticker }: AddToWatchlistModalProps) {
  const { watchlists, addStockToWatchlist } = useWatchlist();

  if (!isOpen) return null;

  const handleAdd = (watchlistId: number) => {
    addStockToWatchlist(watchlistId, ticker);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Add {ticker} to a Watchlist</h2>
        <ul className="space-y-2">
          {watchlists.map((wl) => {
            const isFull = wl.items.length >= 10;
            return (
              <li key={wl.id} className="flex items-center justify-between">
                <span className={`${isFull ? 'text-gray-500' : ''}`}>{wl.name}</span>
                <button
                  onClick={() => handleAdd(wl.id)}
                  disabled={isFull}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-500"
                >
                  Add
                </button>
              </li>
            );
          })}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
