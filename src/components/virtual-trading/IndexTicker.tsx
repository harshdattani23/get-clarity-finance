// src/components/virtual-trading/IndexTicker.tsx
'use client';

import { indices } from '@/lib/trading-data';

export default function IndexTicker() {
  return (
    <div className="bg-gray-800 text-white p-2 mb-4">
      <div className="container mx-auto flex justify-around">
        {Object.values(indices).map((index) => (
          <div key={index.name} className="text-center">
            <p className="font-bold">{index.name}</p>
            <p className={index.change >= 0 ? 'text-green-400' : 'text-red-400'}>
              {index.value.toFixed(2)} ({index.change.toFixed(2)}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
