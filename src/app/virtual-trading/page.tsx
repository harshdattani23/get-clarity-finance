import VirtualTradingClient from '@/components/virtual-trading/VirtualTradingClient';
import { allStocks } from '@/lib/trading-data';
import { parseMarketCap } from '@/lib/utils';

export default async function VirtualTradingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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

  const searchTerm = typeof searchParams.search === 'string' ? searchParams.search : '';
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const index = typeof searchParams.index === 'string' ? searchParams.index : '';
  const industry = typeof searchParams.industry === 'string' ? searchParams.industry : '';
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'name-asc';
  
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
      return sortOrder === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
    }
    return 0;
  });

  return (
      <VirtualTradingClient
        initialStocks={filteredStocks}
      />
  );
}
