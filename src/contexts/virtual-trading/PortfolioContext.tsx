// src/contexts/virtual-trading/PortfolioContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Stock } from '@/lib/trading-data';

interface Holding {
  ticker: string;
  quantity: number;
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
  addToWatchlist: (ticker: string) => void;
  removeFromWatchlist: (ticker: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 100000, // Initial virtual cash
    holdings: [],
    watchlist: [],
  });

  const buyStock = (ticker: string, quantity: number, price: number) => {
    const cost = quantity * price;
    if (portfolio.cash >= cost) {
      setPortfolio((prev) => {
        const existingHolding = prev.holdings.find((h) => h.ticker === ticker);
        let newHoldings;
        if (existingHolding) {
          newHoldings = prev.holdings.map((h) =>
            h.ticker === ticker ? { ...h, quantity: h.quantity + quantity } : h
          );
        } else {
          newHoldings = [...prev.holdings, { ticker, quantity }];
        }
        return {
          ...prev,
          cash: prev.cash - cost,
          holdings: newHoldings,
        };
      });
    } else {
      alert('Not enough cash to buy!');
    }
  };

  const sellStock = (ticker: string, quantity: number, price: number) => {
    const existingHolding = portfolio.holdings.find((h) => h.ticker === ticker);
    if (existingHolding && existingHolding.quantity >= quantity) {
      const revenue = quantity * price;
      setPortfolio((prev) => ({
        ...prev,
        cash: prev.cash + revenue,
        holdings: prev.holdings.map((h) =>
          h.ticker === ticker ? { ...h, quantity: h.quantity - quantity } : h
        ).filter(h => h.quantity > 0),
      }));
    } else {
      alert('Not enough stock to sell!');
    }
  };

  const addToWatchlist = (ticker: string) => {
    setPortfolio((prev) => ({
      ...prev,
      watchlist: [...prev.watchlist, ticker],
    }));
  };

  const removeFromWatchlist = (ticker: string) => {
    setPortfolio((prev) => ({
      ...prev,
      watchlist: prev.watchlist.filter((t) => t !== ticker),
    }));
  };

_old_string:  return (
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
