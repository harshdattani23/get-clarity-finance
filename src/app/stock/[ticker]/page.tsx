'use client';

import TradingViewWidget from '@/components/tradingview/AdvancedChart';
import { useParams } from 'next/navigation';
import { allStocks, indices } from '@/lib/trading-data';
import StockInfo from '@/components/stock/StockInfo';
import TradingActions from '@/components/stock/TradingActions';
import UserHoldings from '@/components/stock/UserHoldings';
import CompanyNews from '@/components/stock/CompanyNews';
import { PortfolioProvider } from '@/contexts/virtual-trading/PortfolioContext';
import { WatchlistProvider } from '@/contexts/virtual-trading/WatchlistContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StockDetailPage() {
  const params = useParams();
  const ticker = params?.ticker as string;

  if (!ticker) {
    return <div>Loading...</div>;
  }
  
  const stock = allStocks.find((s) => s.ticker === ticker);

  if (!stock) {
    return <div>Stock not found</div>;
  }

  // Show main indices
  const mainIndices = ['nifty', 'sensex', 'bankNifty'] as const;
  const displayedIndices = mainIndices.map(key => indices[key]);

  return (
    <PortfolioProvider>
      <WatchlistProvider>
        <div className="container mx-auto p-4 text-white">
          {/* Market Indices Overview */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-gray-300">Market Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayedIndices.map((index) => (
                <div key={index.name} className="text-center p-3 bg-gray-700 rounded-md">
                  <div className="text-sm text-gray-400 mb-1">{index.name}</div>
                  <div className="text-lg font-bold text-white mb-1">
                    {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className={`flex items-center justify-center gap-1 text-sm font-medium ${
                    index.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {index.change >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Specific Info */}
          <h1 className="text-3xl font-bold mb-4">{stock.name} ({stock.ticker})</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-[500px] mb-8">
                <TradingViewWidget symbol={stock.ticker} theme="dark" />
              </div>
              <CompanyNews stock={stock} />
            </div>
            
            <div className="space-y-8">
              <TradingActions stock={stock} />
              <UserHoldings stock={stock} />
              <StockInfo stock={stock} />
            </div>
          </div>
        </div>
      </WatchlistProvider>
    </PortfolioProvider>
  );
}
