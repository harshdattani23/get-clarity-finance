// src/components/virtual-trading/MarketFilters.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const MarketFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    params.set('page', '1');
    router.push(`/virtual-trading?${params.toString()}`);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Index Filter */}
        <div>
          <label htmlFor="index-filter" className="block mb-2 text-sm font-medium">Index</label>
          <select 
            id="index-filter" 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            onChange={(e) => handleFilterChange('index', e.target.value)}
          >
            <option value="">All Indices</option>
            {/* Assuming indices is defined elsewhere or needs to be imported */}
            {/* For now, using a placeholder or assuming it's available in scope */}
            {/* Example: {Object.values(indices).map(index => <option key={index.name} value={index.name}>{index.name}</option>)} */}
          </select>
        </div>

        {/* Industry Filter */}
        <div>
          <label htmlFor="industry-filter" className="block mb-2 text-sm font-medium">Industry</label>
          <select 
            id="industry-filter" 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            onChange={(e) => handleFilterChange('industry', e.target.value)}
          >
            <option value="">All Industries</option>
            {/* Assuming industries is defined elsewhere or needs to be imported */}
            {/* For now, using a placeholder or assuming it's available in scope */}
            {/* Example: {industries.map(industry => <option key={industry} value={industry}>{industry}</option>)} */}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sort-by" className="block mb-2 text-sm font-medium">Sort By</label>
          <select 
            id="sort-by" 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            onChange={(e) => {
              const [key, order] = e.target.value.split('-');
              handleFilterChange('sort', `${key}-${order}`);
            }}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="marketCap-desc">Market Cap (High to Low)</option>
            <option value="marketCap-asc">Market Cap (Low to High)</option>
            <option value="change-desc">Change % (High to Low)</option>
            <option value="change-asc">Change % (Low to High)</option>
          </select>
        </div>

        {/* Apply Button */}
        <div>
          <label className="block mb-2 text-sm font-medium text-transparent">.</label>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('page', '1');
              router.push(`/virtual-trading?${params.toString()}`);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketFilters;
