// src/app/api/virtual-trading/stocks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { allStocks } from '@/lib/trading-data';
import { parseMarketCap } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const processedStocks = allStocks.map((stock) => {
    const previousPrice = stock.price - stock.change;
    const percentChange = previousPrice ? (stock.change / previousPrice) * 100 : 0;
    return {
      ...stock,
      percentChange,
      volume: 'N/A',
      marketCapValue: parseMarketCap(stock.marketCap),
    };
  });

  const searchTerm = searchParams.get('search') || '';
  const index = searchParams.get('index') || '';
  const industry = searchParams.get('industry') || '';
  const sort = searchParams.get('sort') || 'name-asc';
  
  const [sortKey, sortOrder] = sort.split('-');

  let filteredStocks = processedStocks;

  if (searchTerm) {
    filteredStocks = filteredStocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (index) {
    filteredStocks = filteredStocks.filter((stock) => stock.indices.includes(index));
  }
  if (industry) {
    filteredStocks = filteredStocks.filter((stock) => stock.industry === industry);
  }

  filteredStocks.sort((a, b) => {
    if (sortKey === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (sortKey === 'price' || sortKey === 'change' || sortKey === 'marketCapValue') {
      // @ts-ignore
      return sortOrder === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
    }
    return 0;
  });

  return NextResponse.json(filteredStocks);
}
