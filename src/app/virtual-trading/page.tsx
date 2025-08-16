import VirtualTradingClient from '@/components/virtual-trading/VirtualTradingClient';
import { allStocks } from '@/lib/trading-data';
import { parseMarketCap } from '@/lib/utils';
import { Suspense } from 'react';

function getStocks() {
  const processedStocks = allStocks.map((stock) => {
    const previousPrice = stock.price - stock.change;
    const percentChange = previousPrice ? (stock.change / previousPrice) * 100 : 0;
    return {
      ...stock,
      percentChange,
      volume: 'N/A', // Placeholder
      marketCapValue: parseMarketCap(stock.marketCap),
    };
  });
  
  // All filtering and pagination is now handled on the client
  return { stocks: processedStocks, totalCount: processedStocks.length };
}


export default function VirtualTradingPage() {
  const initialData = getStocks();
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VirtualTradingClient initialData={initialData} />
    </Suspense>
  );
}
