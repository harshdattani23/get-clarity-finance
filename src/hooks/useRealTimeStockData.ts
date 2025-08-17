import { useState, useEffect, useCallback, useMemo } from 'react';

export interface StockData {
  ticker: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
  lastUpdatedAt: string;
}

export function useStockDataFromDB(tickers: string[]) {
  const [stockData, setStockData] = useState<Map<string, StockData>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tickersKey = useMemo(() => (tickers || []).join(','), [tickers]);

  const fetchStockData = useCallback(async () => {
    if (!tickers || tickers.length === 0) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/stock-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tickers }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch stock data: ${response.statusText}`);
      }

      const data: StockData[] = await response.json();
      
      // Convert to Map for easy lookup
      const newStockData = new Map<string, StockData>();
      data.forEach(stock => {
        newStockData.set(stock.ticker, stock);
      });
      
      setStockData(newStockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stock data');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  }, [tickers]);

  useEffect(() => {
    fetchStockData();
  }, [fetchStockData, tickersKey]);

  const getStockData = (ticker: string): StockData | null => {
    return stockData.get(ticker) || null;
  };

  return {
    stockData,
    loading,
    error,
    fetchStockData,
    getStockData,
  };
}
