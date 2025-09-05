import { useState, useEffect, useCallback } from 'react';
import yahooFinanceService, { StockInfo, HistoricalPrice, NewsItem } from '@/services/yahooFinanceApi';

export interface StockDataState {
  stockInfo: StockInfo | null;
  historicalData: HistoricalPrice[];
  newsData: NewsItem[];
  loading: boolean;
  error: string | null;
}

export interface UseStockDataResult extends StockDataState {
  fetchStockData: (ticker: string) => Promise<void>;
  refetch: () => Promise<void>;
  clearData: () => void;
  currentTicker: string | null;
}

/**
 * Custom hook for managing stock data fetching and state
 */
export const useStockData = (initialTicker?: string): UseStockDataResult => {
  const [currentTicker, setCurrentTicker] = useState<string | null>(initialTicker || null);
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalPrice[]>([]);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = useCallback(async (ticker: string) => {
    if (!ticker?.trim()) {
      setError('Please provide a valid ticker symbol');
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentTicker(ticker);

    try {
      // Fetch stock info first (most important)
      const stockInfoPromise = yahooFinanceService.getStockInfo(ticker);
      
      // Fetch other data in parallel but handle failures gracefully
      const [stockInfoResult, historicalResult, newsResult] = await Promise.allSettled([
        stockInfoPromise,
        yahooFinanceService.getHistoricalPrices(ticker, '1mo', '1d'),
        yahooFinanceService.getStockNews(ticker),
      ]);

      // Handle stock info (required)
      if (stockInfoResult.status === 'fulfilled') {
        setStockInfo(stockInfoResult.value);
      } else {
        throw new Error(stockInfoResult.reason?.message || 'Failed to fetch stock information');
      }

      // Handle historical data (optional)
      if (historicalResult.status === 'fulfilled') {
        setHistoricalData(historicalResult.value);
      } else {
        console.warn('Failed to fetch historical data:', historicalResult.reason);
        setHistoricalData([]);
      }

      // Handle news data (optional)
      if (newsResult.status === 'fulfilled') {
        setNewsData(newsResult.value);
      } else {
        console.warn('Failed to fetch news data:', newsResult.reason);
        setNewsData([]);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error fetching stock data:', err);
      setError(errorMessage);
      
      // Clear data on error
      setStockInfo(null);
      setHistoricalData([]);
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    if (currentTicker) {
      await fetchStockData(currentTicker);
    }
  }, [currentTicker, fetchStockData]);

  const clearData = useCallback(() => {
    setStockInfo(null);
    setHistoricalData([]);
    setNewsData([]);
    setError(null);
    setCurrentTicker(null);
  }, []);

  // Auto-fetch on initial ticker
  useEffect(() => {
    if (initialTicker) {
      fetchStockData(initialTicker);
    }
  }, [initialTicker, fetchStockData]);

  return {
    stockInfo,
    historicalData,
    newsData,
    loading,
    error,
    currentTicker,
    fetchStockData,
    refetch,
    clearData,
  };
};

export default useStockData;
