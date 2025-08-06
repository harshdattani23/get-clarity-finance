// src/app/virtual-trading/stock/[ticker]/page.tsx
'use client';

import StockDetail from '@/components/virtual-trading/StockDetail';
import { useParams } from 'next/navigation';

export default function StockDetailPage() {
  const params = useParams();
  const ticker = params && typeof params.ticker === 'string' ? params.ticker : '';

  if (!ticker) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <StockDetail ticker={ticker} />
    </div>
  );
}
