'use client';

import TradingViewWidget from '@/components/tradingview/AdvancedChart';
import { useParams } from 'next/navigation';
import { allStocks } from '@/lib/trading-data';
import StockInfo from '@/components/stock/StockInfo';
import TradingActions from '@/components/stock/TradingActions';
import UserHoldings from '@/components/stock/UserHoldings';
import CompanyNews from '@/components/stock/CompanyNews';
import { PortfolioProvider } from '@/contexts/virtual-trading/PortfolioContext';
import { WatchlistProvider } from '@/contexts/virtual-trading/WatchlistContext';

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

  return (
    <PortfolioProvider>
      <WatchlistProvider>
        <div className="container mx-auto p-4 text-white">
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
