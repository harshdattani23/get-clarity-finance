import { useState, useEffect, useCallback, useMemo } from 'react';

export interface StockData {
  ticker: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
  previousClose: number | null;
  lastUpdatedAt: string;
}

// Client-side cache to prevent duplicate requests
const clientCache = new Map<string, { data: Map<string, StockData>; timestamp: number }>();
const CLIENT_CACHE_DURATION = 5 * 60 * 1000; // Increased to 5 minutes to reduce API load

// Track ongoing requests to prevent duplicates
const ongoingRequests = new Map<string, Promise<Map<string, StockData>>>();

export function useStockDataFromDB(tickers: string[], enabled: boolean = true) {
  const [stockData, setStockData] = useState<Map<string, StockData>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tickersKey = useMemo(() => {
    if (!tickers || tickers.length === 0) return '';
    return tickers.sort().join(',');
  }, [tickers]);

  const fetchStockData = useCallback(async (): Promise<Map<string, StockData>> => {
    if (!enabled || !tickers || tickers.length === 0) {
      return new Map();
    }

    // Check client-side cache first
    const cacheEntry = clientCache.get(tickersKey);
    if (cacheEntry && (Date.now() - cacheEntry.timestamp) < CLIENT_CACHE_DURATION) {
      setStockData(cacheEntry.data);
      return cacheEntry.data;
    }

    // Check if there's an ongoing request for the same tickers
    const ongoingRequest = ongoingRequests.get(tickersKey);
    if (ongoingRequest) {
      try {
        const result = await ongoingRequest;
        setStockData(result);
        return result;
      } catch (err) {
        // Handle error from ongoing request
        setError(err instanceof Error ? err.message : 'Failed to fetch stock data');
        return new Map();
      }
    }

    // Create new request
    const requestPromise = (async () => {
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
        if (Array.isArray(data)) {
          data.forEach(stock => {
            if (stock && stock.ticker) {
              newStockData.set(stock.ticker, stock);
            }
          });
        }
        
        // Cache the result
        clientCache.set(tickersKey, {
          data: newStockData,
          timestamp: Date.now()
        });
        
        setStockData(newStockData);
        return newStockData;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stock data');
        console.error('Error fetching stock data:', err);
        return new Map();
      } finally {
        setLoading(false);
        ongoingRequests.delete(tickersKey);
      }
    })();

    ongoingRequests.set(tickersKey, requestPromise);
    return await requestPromise;
  }, [tickers, tickersKey, enabled]);

  useEffect(() => {
    if (!enabled || !tickersKey) return;
    
    let isMounted = true;
    
    // Increased debounce time to prevent excessive calls
    const timeoutId = setTimeout(async () => {
      if (isMounted) {
        await fetchStockData();
      }
    }, 800); // Increased to 800ms debounce
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [fetchStockData, tickersKey, enabled]);

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
