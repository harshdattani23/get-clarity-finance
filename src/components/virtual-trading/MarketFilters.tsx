// src/components/virtual-trading/MarketFilters.tsx
'use client';

import { indices } from '@/lib/trading-data';
import React, { useState } from 'react';

const industries = [
  'Financial Services',
  'Healthcare',
  'Information Technology',
  'Automobile and Auto Components',
  'Metals & Mining',
  'Consumer Durables',
  'Fast Moving Consumer Goods',
  'Oil, Gas & Consumable Fuels',
  'Construction',
  'Power',
  'Services',
  'Telecommunication',
  'Realty',
  'Chemicals',
  'Capital Goods',
];

interface MarketFiltersProps {
  onApplyFilters: (filters: any, sort: any) => void;
}

const MarketFilters: React.FC<MarketFiltersProps> = ({ onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState({});
  const [localSort, setLocalSort] = useState({ key: 'name', order: 'asc' });

  const handleFilterChange = (newFilters: any) => {
    setLocalFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (newSort: any) => {
    setLocalSort(newSort);
  };

  const handleApply = () => {
    onApplyFilters(localFilters, localSort);
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
            onChange={(e) => handleFilterChange({ index: e.target.value })}
          >
            <option value="">All Indices</option>
            {Object.values(indices).map(index => <option key={index.name} value={index.name}>{index.name}</option>)}
          </select>
        </div>

        {/* Industry Filter */}
        <div>
          <label htmlFor="industry-filter" className="block mb-2 text-sm font-medium">Industry</label>
          <select 
            id="industry-filter" 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            onChange={(e) => handleFilterChange({ industry: e.target.value })}
          >
            <option value="">All Industries</option>
            {industries.map(industry => <option key={industry} value={industry}>{industry}</option>)}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sort-by" className="block mb-2 text-sm font-medium">Sort By</label>
          <select 
            id="sort-by" 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            onChange={(e) => handleSortChange({ key: e.target.value.split('-')[0], order: e.target.value.split('-')[1] })}
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
            onClick={handleApply}
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
