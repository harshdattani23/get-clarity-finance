// src/contexts/virtual-trading/PortfolioContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Stock } from '@/lib/trading-data';
import { useUser } from '@clerk/nextjs';

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
    try {
      const response = await fetch('/api/trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker, quantity, price, tradeType: 'BUY' }),
      });

      if (response.ok) {
        // Optimistically update the UI
        const cost = quantity * price;
        setPortfolio((prev) => {
          const existingHolding = prev.holdings.find((h) => h.ticker === ticker);
          let newHoldings;
          if (existingHolding) {
            newHoldings = prev.holdings.map((h) =>
              h.ticker === ticker ? { ...h, quantity: h.quantity + quantity } : h
            );
          } else {
            newHoldings = [...prev.holdings, { ticker, quantity, averagePrice: price }];
          }
          return {
            ...prev,
            cash: prev.cash - cost,
            holdings: newHoldings,
          };
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to buy stock: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Failed to buy stock', error);
      alert('An error occurred while buying the stock.');
    }
  };

  const sellStock = async (ticker: string, quantity: number, price: number) => {
    try {
      const response = await fetch('/api/trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker, quantity, price, tradeType: 'SELL' }),
      });

      if (response.ok) {
        // Optimistically update the UI
        const revenue = quantity * price;
        setPortfolio((prev) => ({
          ...prev,
          cash: prev.cash + revenue,
          holdings: prev.holdings.map((h) =>
            h.ticker === ticker ? { ...h, quantity: h.quantity - quantity } : h
          ).filter(h => h.quantity > 0),
        }));
      } else {
        const errorData = await response.json();
        alert(`Failed to sell stock: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Failed to sell stock', error);
      alert('An error occurred while selling the stock.');
    }
  };

  const addToWatchlist = async (ticker: string) => {
    try {
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker }),
      });
      if (response.ok) {
        setPortfolio((prev) => ({
          ...prev,
          watchlist: [...prev.watchlist, ticker],
        }));
      }
    } catch (error) {
      console.error('Failed to add to watchlist', error);
    }
  };

  const removeFromWatchlist = async (ticker: string) => {
    try {
      const response = await fetch('/api/watchlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker }),
      });
      if (response.ok) {
        setPortfolio((prev) => ({
          ...prev,
          watchlist: prev.watchlist.filter((t) => t !== ticker),
        }));
      }
    } catch (error) {
      console.error('Failed to remove from watchlist', error);
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
