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
          const cashValue = parseFloat(data.virtualCash);
          console.log('Cash value parsed:', cashValue);
          
          if (isNaN(cashValue)) {
            console.error('Invalid cash value received:', data.virtualCash);
            toast.error('Failed to load portfolio balance');
            return;
          }
          
          setPortfolio({
            cash: cashValue,
            holdings: data.holdings.map((h: { ticker: string; quantity: number; averagePrice: string | number }) => ({
              ...h,
              averagePrice: parseFloat(h.averagePrice.toString()),
            })),
          });
        } else {
          console.error('Portfolio API response not ok:', response.status);
          toast.error('Failed to load portfolio');
        }
      } catch (error) {
        console.error('Failed to fetch portfolio', error);
        toast.error('Failed to connect to portfolio service');
      }
    }
  }, [isSignedIn]);

  const refreshPortfolio = async () => {
    console.log('Refreshing portfolio...');
    await fetchPortfolio();
  };

  interface TradeAchievementData {
    ticker: string;
    quantity: number;
    price: number;
    volume: number;
    profit?: number;
    tradeType?: 'BUY' | 'SELL';
  }
  
  const checkAchievements = async (tradeType: 'BUY' | 'SELL', data: TradeAchievementData) => {
    try {
      const response = await fetch('/api/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'TRADE_COMPLETED',
          data: {
            ...data,
            tradeType,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.newAchievements && result.newAchievements.length > 0) {
          result.newAchievements.forEach((achievement: { name: string; points: number }) => {
            toast.success(
              <div>
                <strong>🏆 Achievement Unlocked!</strong>
                <p>{achievement.name}</p>
                <p className="text-sm">+{achievement.points} points</p>
              </div>,
              { duration: 5000 }
            );
          });
        }
      }
    } catch (error) {
      console.error('Failed to check achievements:', error);
    }
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
      
      // Check for achievements after successful trade
      await checkAchievements('BUY', { ticker, quantity, price, volume: cost });
    } else {
      console.error('Trade failed:', response.status, response.statusText);
    }
  };

  const sellStock = async (ticker: string, quantity: number, price: number) => {
    // Calculate profit/loss for achievement tracking
    const holding = portfolio?.holdings.find(h => h.ticker === ticker);
    const profit = holding ? (price - holding.averagePrice) * quantity : 0;
    
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
      
      // Check for achievements after successful trade
      await checkAchievements('SELL', { 
        ticker, 
        quantity, 
        price, 
        volume: quantity * price,
        profit 
      });
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
