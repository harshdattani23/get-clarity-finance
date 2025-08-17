// src/components/MarketIndices.tsx
'use client';

import { indices } from '@/lib/trading-data';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketIndices() {
  // Show only the main indices on the home page
  const mainIndices = ['nifty', 'sensex', 'bankNifty', 'niftyNext50', 'finnifty'] as const;
  const displayedIndices = mainIndices.map(key => indices[key]);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Live Market Indices
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with real-time performance of major Indian market indices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {displayedIndices.map((index) => (
            <div key={index.name} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <h3 className="font-semibold text-gray-700 mb-3 text-sm">{index.name}</h3>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center justify-center gap-1 text-sm font-medium ${
                index.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {index.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="/virtual-trading" 
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
          >
            View All Stocks & Start Trading
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
