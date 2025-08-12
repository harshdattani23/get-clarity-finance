'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  watchlists: Watchlist[];
  loading: boolean;
  createWatchlist: (name: string) => Promise<void>;
  renameWatchlist: (id: number, newName: string) => Promise<void>;
  deleteWatchlist: (id: number) => Promise<void>;
  addStockToWatchlist: (watchlistId: number, ticker: string) => Promise<void>;
  removeStockFromWatchlist: (watchlistId: number, ticker: string) => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useUser();
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchlists = async () => {
    if (isSignedIn) {
      try {
        setLoading(true);
        const response = await fetch('/api/watchlist');
        if (response.ok) {
          const data = await response.json();
          setWatchlists(data);
        }
      } catch (error) {
        console.error('Failed to fetch watchlists', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWatchlists();
  }, [isSignedIn]);

  const createWatchlist = async (name: string) => {
    const promise = fetch('/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    toast.promise(promise, {
      loading: 'Creating watchlist...',
      success: 'Watchlist created!',
      error: 'Failed to create watchlist',
    });

    await promise;
    await fetchWatchlists();
  };

  const renameWatchlist = async (id: number, newName: string) => {
    const promise = fetch('/api/watchlist', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, newName }),
    });

    toast.promise(promise, {
        loading: 'Renaming watchlist...',
        success: 'Watchlist renamed!',
        error: 'Failed to rename watchlist',
    });

    await promise;
    await fetchWatchlists();
  };

  const deleteWatchlist = async (id: number) => {
    const promise = fetch('/api/watchlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    });

    toast.promise(promise, {
        loading: 'Deleting watchlist...',
        success: 'Watchlist deleted!',
        error: 'Failed to delete watchlist',
    });

    await promise;
    await fetchWatchlists();
  };

  const addStockToWatchlist = async (watchlistId: number, ticker: string) => {
    const promise = fetch('/api/watchlist/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ watchlistId, ticker }),
    });

    toast.promise(promise, {
      loading: 'Adding stock to watchlist...',
      success: 'Stock added!',
      error: 'Failed to add stock',
    });

    await promise;
    await fetchWatchlists();
  };

  const removeStockFromWatchlist = async (watchlistId: number, ticker: string) => {
    const promise = fetch('/api/watchlist/items', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ watchlistId, ticker }),
    });

    toast.promise(promise, {
        loading: 'Removing stock from watchlist...',
        success: 'Stock removed!',
        error: 'Failed to remove stock',
    });
    
    await promise;
    await fetchWatchlists();
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlists,
        loading,
        createWatchlist,
        renameWatchlist,
        deleteWatchlist,
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
