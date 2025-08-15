'use client';

import { useState, useEffect } from 'react';
import VirtualTradingClient from '@/components/virtual-trading/VirtualTradingClient';

export default function VirtualTradingPage() {
  const [initialStocks, setInitialStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      // We can pass searchParams from client if needed, for now it's simple
      const response = await fetch('/api/virtual-trading/stocks');
      const data = await response.json();
      setInitialStocks(data);
      setLoading(false);
    };
    fetchStocks();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }

  return <VirtualTradingClient initialStocks={initialStocks} />;
}
