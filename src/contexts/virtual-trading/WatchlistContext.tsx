'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

export interface WatchlistItem {
  id: number;
  ticker: string;
}

export interface Watchlist {
  id: number;
  name: string;
  items: WatchlistItem[];
}

interface WatchlistContextType {
  watchlist: Watchlist | null;
  loading: boolean;
  addStockToWatchlist: (ticker: string) => Promise<void>;
  removeStockFromWatchlist: (ticker: string) => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useUser();
  const [watchlist, setWatchlist] = useState<Watchlist | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = useCallback(async () => {
    if (isSignedIn) {
      try {
        setLoading(true);
        const response = await fetch('/api/watchlist');
        if (response.ok) {
          const data = await response.json();
          // The API now returns a single watchlist object or null
          setWatchlist(data);
        }
      } catch (error) {
        console.error('Failed to fetch watchlist', error);
      } finally {
        setLoading(false);
      }
    }
  }, [isSignedIn]);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const addStockToWatchlist = async (ticker: string) => {
    if (!watchlist) return;
    if (watchlist.items && watchlist.items.length >= 20) { // Increased limit for a single list
      toast.error('Watchlist is full (max 20 stocks).');
      return;
    }

    const promise = fetch('/api/watchlist/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ watchlistId: watchlist.id, ticker }),
    });

    toast.promise(promise, {
      loading: 'Adding stock to watchlist...',
      success: 'Stock added!',
      error: 'Failed to add stock',
    });

    await promise;
    await fetchWatchlist();
  };

  const removeStockFromWatchlist = async (ticker: string) => {
    if (!watchlist) return;
    const promise = fetch('/api/watchlist/items', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ watchlistId: watchlist.id, ticker }),
    });

    toast.promise(promise, {
        loading: 'Removing stock from watchlist...',
        success: 'Stock removed!',
        error: 'Failed to remove stock',
    });
    
    await promise;
    await fetchWatchlist();
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        loading,
        addStockToWatchlist,
        removeStockFromWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
