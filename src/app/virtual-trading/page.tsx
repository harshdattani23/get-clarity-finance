import VirtualTradingClient from '@/components/virtual-trading/VirtualTradingClient';
import { Suspense } from 'react';

export default function VirtualTradingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VirtualTradingClient />
    </Suspense>
  );
}
