// src/contexts/virtual-trading/PortfolioContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Stock } from '@/lib/trading-data';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

interface Holding {
  ticker: string;
  quantity: number;
  averagePrice: number;
}

interface Portfolio {
  cash: number;
  holdings: Holding[];
  watchlist: string[];
}

interface PortfolioContextType {
  portfolio: Portfolio;
  buyStock: (ticker: string, quantity: number, price: number) => void;
  sellStock: (ticker: string, quantity: number, price: number) => void;
  addToWatchlist: (ticker: string) => Promise<void>;
  removeFromWatchlist: (ticker: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useUser();
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 100000, // Initial virtual cash
    holdings: [],
    watchlist: [],
  });

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (isSignedIn) {
        try {
          const response = await fetch('/api/portfolio');
          if (response.ok) {
            const data = await response.json();
            setPortfolio((prev) => ({
              ...prev,
              cash: parseFloat(data.virtualCash),
              holdings: data.holdings.map((h: any) => ({
                ...h,
                averagePrice: parseFloat(h.averagePrice),
              })),
            }));
          }
        } catch (error) {
          console.error('Failed to fetch portfolio', error);
        }
      }
    };

    const fetchWatchlist = async () => {
      if (isSignedIn) {
        try {
          const response = await fetch('/api/watchlist');
          if (response.ok) {
            const watchlist = await response.json();
            setPortfolio((prev) => ({
              ...prev,
              watchlist: watchlist.map((item: any) => item.ticker),
            }));
          }
        } catch (error) {
          console.error('Failed to fetch watchlist', error);
        }
      }
    };

    fetchPortfolio();
    fetchWatchlist();
  }, [isSignedIn]);

  const buyStock = async (ticker: string, quantity: number, price: number) => {
    if (!portfolio) {
      toast.error("Portfolio not loaded yet.");
      return;
    }

    const cost = quantity * price;
    if (portfolio.cash < cost) {
      toast.error("Insufficient funds to complete this transaction.");
      return;
    }

    const promise = fetch('/api/trade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticker, quantity, price, tradeType: 'BUY' }),
    });

    toast.promise(promise, {
      loading: 'Processing transaction...',
      success: 'Successfully purchased stock!',
      error: (err) => `Failed to buy stock: ${err.message}`,
    });

    const response = await promise;
    if (response.ok) {
      // Optimistically update the UI
      const cost = quantity * price;
      setPortfolio((prev) => {
        if (!prev) return prev;
        const existingHolding = prev.holdings.find((h) => h.ticker === ticker);
        let newHoldings;
        if (existingHolding) {
          newHoldings = prev.holdings.map((h) =>
            h.ticker === ticker ? { ...h, quantity: h.quantity + quantity } : h
          );
        } else {
          newHoldings = [...prev.holdings, { ticker, quantity, averagePrice: price }];
        }

        const newWatchlist = prev.watchlist.includes(ticker)
          ? prev.watchlist
          : [...prev.watchlist, ticker];

        return {
          ...prev,
          cash: prev.cash - cost,
          holdings: newHoldings,
          watchlist: newWatchlist,
        };
      });
    }
  };

  const sellStock = async (ticker: string, quantity: number, price: number) => {
    const promise = fetch('/api/trade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticker, quantity, price, tradeType: 'SELL' }),
    });

    toast.promise(promise, {
      loading: 'Processing transaction...',
      success: 'Successfully sold stock!',
      error: (err) => `Failed to sell stock: ${err.message}`,
    });

    const response = await promise;
    if (response.ok) {
      // Optimistically update the UI
      const revenue = quantity * price;
      setPortfolio((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          cash: prev.cash + revenue,
          holdings: prev.holdings.map((h) =>
            h.ticker === ticker ? { ...h, quantity: h.quantity - quantity } : h
          ).filter(h => h.quantity > 0),
        };
      });
    }
  };

  const addToWatchlist = async (ticker: string) => {
    const promise = fetch('/api/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticker }),
    });

    toast.promise(promise, {
        loading: 'Adding to watchlist...',
        success: 'Successfully added to watchlist!',
        error: 'Failed to add to watchlist',
    });
    
    const response = await promise;
    if (response.ok) {
      setPortfolio((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          watchlist: [...prev.watchlist, ticker],
        }
      });
    }
  };

  const removeFromWatchlist = async (ticker: string) => {
    const promise = fetch('/api/watchlist', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticker }),
    });

    toast.promise(promise, {
        loading: 'Removing from watchlist...',
        success: 'Successfully removed from watchlist!',
        error: 'Failed to remove from watchlist',
    });

    const response = await promise;
    if (response.ok) {
      setPortfolio((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          watchlist: prev.watchlist.filter((t) => t !== ticker),
        }
      });
    }
  };

  return (
    <PortfolioContext.Provider
      value={{ portfolio, buyStock, sellStock, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
