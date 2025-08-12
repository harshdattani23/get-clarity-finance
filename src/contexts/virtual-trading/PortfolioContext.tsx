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
}

interface PortfolioContextType {
  portfolio: Portfolio | null;
  buyStock: (ticker: string, quantity: number, price: number) => void;
  sellStock: (ticker: string, quantity: number, price: number) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useUser();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (isSignedIn) {
        try {
          const response = await fetch('/api/portfolio');
          if (response.ok) {
            const data = await response.json();
            setPortfolio({
              cash: parseFloat(data.virtualCash),
              holdings: data.holdings.map((h: any) => ({
                ...h,
                averagePrice: parseFloat(h.averagePrice),
              })),
            });
          }
        } catch (error) {
          console.error('Failed to fetch portfolio', error);
        }
      }
    };

    fetchPortfolio();
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

        return {
          ...prev,
          cash: prev.cash - cost,
          holdings: newHoldings,
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

  return (
    <PortfolioContext.Provider
      value={{ portfolio, buyStock, sellStock }}
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
