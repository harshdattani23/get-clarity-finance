// src/app/virtual-trading/page.tsx
'use client';

import { useState, useMemo } from 'react';
import MarketView from '@/components/virtual-trading/MarketView';
import PortfolioDashboard from '@/components/virtual-trading/PortfolioDashboard';
import IndexTicker from '@/components/virtual-trading/IndexTicker';
import ScrollingTicker from '@/components/virtual-trading/ScrollingTicker';
import MarketFilters from '@/components/virtual-trading/MarketFilters';
import Pagination from '@/components/virtual-trading/Pagination';
import { allStocks } from '@/lib/trading-data';

const ITEMS_PER_PAGE = 10;

export default function VirtualTradingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<{ index?: string; industry?: string }>({});
  const [activeSort, setActiveSort] = useState({ key: 'name', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  const handleApplyFilters = (filters: any, sort: any) => {
    setActiveFilters(filters);
    setActiveSort(sort);
    setCurrentPage(1); // Reset to first page on new filter application
  };

  const filteredAndSortedStocks = useMemo(() => {
    let stocks = allStocks;

    // Filtering
    if (searchTerm) {
      stocks = stocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeFilters.index && activeFilters.index !== '') {
      if (activeFilters.index === 'SENSEX') {
        stocks = stocks.filter(stock => stock.indices.includes('SENSEX') || stock.indices.includes('SENSEX 30'));
      } else {
        stocks = stocks.filter(stock => stock.indices.includes(activeFilters.index!));
      }
    }
    if (activeFilters.industry && activeFilters.industry !== '') {
      stocks = stocks.filter(stock => stock.industry === activeFilters.industry);
    }

    // Sorting
    return [...stocks].sort((a, b) => {
      if (activeSort.key === 'name') {
        return activeSort.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (activeSort.key === 'price') {
        // @ts-ignore
        return activeSort.order === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (activeSort.key === 'marketCap') {
        const marketCapA = parseFloat(a.marketCap);
        const marketCapB = parseFloat(b.marketCap);
        return activeSort.order === 'asc' ? marketCapA - marketCapB : marketCapB - marketCapA;
      }
      if (activeSort.key === 'change') {
        // @ts-ignore
        return activeSort.order === 'asc' ? a.change - b.change : b.change - a.change;
      }
      return 0;
    });
  }, [searchTerm, activeFilters, activeSort]);

  const paginatedStocks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedStocks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedStocks, currentPage]);


  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <IndexTicker />
      <ScrollingTicker />
      <div className="container mx-auto p-4">
        <div className="bg-gray-800 border-l-4 border-yellow-500 text-yellow-200 p-4 mb-4" role="alert">
          <p className="font-bold">Disclaimer</p>
          <p>This virtual trading platform is for educational purposes only. All data is simulated and should not be used for real financial decisions.</p>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Virtual Trading Terminal</h1>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for a stock..."
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <MarketFilters onApplyFilters={handleApplyFilters} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MarketView stocks={paginatedStocks} />
            <Pagination
              totalItems={filteredAndSortedStocks.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
          <div>
            <PortfolioDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
