'use client';

import ClientOnly from '@/components/ClientOnly';
import VirtualTradingClient from '@/components/virtual-trading/VirtualTradingClient';

export default function VirtualTradingPage() {
  return (
    <ClientOnly>
      <VirtualTradingClient />
    </ClientOnly>
  );
}
