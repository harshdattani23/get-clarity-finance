// src/components/MarketIndices.tsx
'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface IndexData {
  name: string;
  value: number;
  change: number;
  prevClose: number;
  changeValue: number;
}

export default function MarketIndices() {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIndices() {
      try {
        setLoading(true);
        const tickers = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'FINNIFTY'];
        const res = await fetch('/api/stock-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tickers }),
        });
        if (!res.ok) throw new Error('Failed to load indices');
        const data: { ticker: string; price: number; percentChange: number }[] = await res.json();
        
        const TickerToName: Record<string, string> = {
          'NIFTY': 'NIFTY 50',
          'SENSEX': 'SENSEX 30',
          'BANKNIFTY': 'BANK NIFTY',
          'FINNIFTY': 'FINNIFTY'
        };

        const formattedData = data.map(item => {
          const prevClose = item.price / (1 + item.percentChange / 100);
          const changeValue = item.price - prevClose;
          return {
            name: TickerToName[item.ticker],
            value: item.price,
            change: item.percentChange,
            prevClose: prevClose,
            changeValue: changeValue,
          };
        });

        setIndices(formattedData);
      } catch (error) {
        console.error("Failed to fetch market indices:", error);
        setIndices([]);
      } finally {
        setLoading(false);
      }
    }

    fetchIndices();
  }, []);


  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Live Market Indices
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with real-time performance and previous day closures of major Indian market indices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 text-center animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mt-2"></div>
              </div>
            ))
          ) : (
            indices.map((index) => (
              <div key={index.name} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <h3 className="font-semibold text-gray-700 mb-3 text-sm">{index.name}</h3>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`flex items-center justify-center gap-2 text-sm font-medium ${
                  index.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {index.change >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{index.change >= 0 ? '+' : ''}{index.changeValue.toFixed(2)}</span>
                  <span>({index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}%)</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Prev. Close: {index.prevClose.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="/virtual-trading" 
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
          >
            View All Stocks & Start Trading
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
