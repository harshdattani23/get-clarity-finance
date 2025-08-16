// src/components/virtual-trading/MarketFilters.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { industries } from '@/lib/trading-data';
import { Search } from 'lucide-react';

const MarketFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams?.entries() || []));
    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };
  
  const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const current = new URLSearchParams(Array.from(searchParams?.entries() || []));
    
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        current.set(key, value);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  }

  return (
    <div className="mb-4">
        <form onSubmit={applyFilters} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-slate-800 p-4 rounded-lg mb-4">
            <div>
                <label htmlFor="index" className="text-sm font-medium text-gray-400 block mb-1">Index</label>
                <select id="index" name="index" defaultValue={searchParams?.get('index') || 'all'} className="w-full bg-slate-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Indices</option>
                    <option value="NIFTY 50">NIFTY 50</option>
                    <option value="SENSEX 30">SENSEX 30</option>
                    <option value="BANK NIFTY">BANK NIFTY</option>
                </select>
            </div>
            <div>
                <label htmlFor="industry" className="text-sm font-medium text-gray-400 block mb-1">Industry</label>
                <select id="industry" name="industry" defaultValue={searchParams?.get('industry') || 'all'} className="w-full bg-slate-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Industries</option>
                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="sort" className="text-sm font-medium text-gray-400 block mb-1">Sort By</label>
                <select id="sort" name="sort" defaultValue={searchParams?.get('sort') || 'name-asc'} className="w-full bg-slate-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="price-asc">Price (Low to High)</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white font-semibold rounded-md p-2 hover:bg-blue-700 transition w-full">Apply</button>
        </form>

        <div className="flex items-center space-x-4">
            <select className="bg-slate-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Most Actives</option>
                <option>Top Gainers</option>
                <option>Top Losers</option>
            </select>
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="search"
                    placeholder="Filter company..."
                    className="w-full bg-slate-800 text-white rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    defaultValue={searchParams?.get('search') || ''}
                />
            </div>
        </div>
    </div>
  );
};

export default MarketFilters;
