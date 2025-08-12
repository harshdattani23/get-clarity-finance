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
          {watchlists.map((wl) => (
            <li key={wl.id}>
              <button
                onClick={() => handleAdd(wl.id)}
                className="w-full text-left bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                {wl.name}
              </button>
            </li>
          ))}
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
