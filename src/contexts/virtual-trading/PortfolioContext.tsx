// src/contexts/virtual-trading/PortfolioContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
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
  refreshPortfolio: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useUser();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  const fetchPortfolio = useCallback(async () => {
    if (isSignedIn) {
      try {
        const response = await fetch('/api/portfolio');
        if (response.ok) {
          const data = await response.json();
          console.log('Portfolio data fetched:', data);
          setPortfolio({
            cash: parseFloat(data.virtualCash),
            holdings: data.holdings.map((h: { ticker: string; quantity: number; averagePrice: string | number }) => ({
              ...h,
              averagePrice: parseFloat(h.averagePrice.toString()),
            })),
          });
        }
      } catch (error) {
        console.error('Failed to fetch portfolio', error);
      }
    }
  }, [isSignedIn]);

  const refreshPortfolio = async () => {
    console.log('Refreshing portfolio...');
    await fetchPortfolio();
  };

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const buyStock = async (ticker: string, quantity: number, price: number) => {
    if (!portfolio) {
      toast.error("Portfolio not loaded yet.");
      return;
    }

    const cost = quantity * price;
    console.log(`Buying ${quantity} shares of ${ticker} at ₹${price} each. Total cost: ₹${cost}`);
    console.log(`Current cash before trade: ₹${portfolio.cash}`);
    
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
      console.log('Trade successful, refreshing portfolio...');
      // Refresh portfolio data from server to get accurate cash balance
      await refreshPortfolio();
    } else {
      console.error('Trade failed:', response.status, response.statusText);
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
      // Refresh portfolio data from server to get accurate cash balance
      await refreshPortfolio();
    }
  };

  return (
    <PortfolioContext.Provider
      value={{ portfolio, buyStock, sellStock, refreshPortfolio }}
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
