// src/app/virtual-trading/layout.tsx
'use client';

import { PortfolioProvider } from '@/contexts/virtual-trading/PortfolioContext';

export default function VirtualTradingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortfolioProvider>{children}</PortfolioProvider>;
}
