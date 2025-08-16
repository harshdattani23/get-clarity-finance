// src/components/stock-market-course/PortfolioAllocator.tsx
"use client";
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Allocation {
  name: string;
  value: number;
  color: string;
}

const PortfolioAllocator = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([
    { name: 'Stocks', value: 40, color: '#8884d8' },
    { name: 'Bonds', value: 30, color: '#82ca9d' },
    { name: 'Real Estate', value: 20, color: '#ffc658' },
    { name: 'Commodities', value: 10, color: '#ff8042' },
  ]);

  const handleSliderChange = (index: number, newValue: number) => {
    const newAllocations = [...allocations];
    const oldValue = newAllocations[index].value;
    const diff = newValue - oldValue;

    newAllocations[index].value = newValue;

    // Adjust other sliders
    const otherAllocations = newAllocations.filter((_, i) => i !== index);
    const totalOtherValue = otherAllocations.reduce((sum, alloc) => sum + alloc.value, 0);

    if (totalOtherValue - diff < 0) {
        // Cannot decrease others enough
        return;
    }
    
    let remainingDiff = diff;
    for (let i = 0; i < otherAllocations.length; i++) {
        const alloc = otherAllocations[i];
        const maxDecrease = alloc.value;
        const decreaseBy = Math.min(maxDecrease, remainingDiff / (otherAllocations.length - i));
        
        const originalAlloc = newAllocations.find(a => a.name === alloc.name);
        if(originalAlloc) {
            originalAlloc.value -= decreaseBy;
            remainingDiff -= decreaseBy;
        }
    }


    setAllocations(newAllocations);
  };

  const totalValue = useMemo(() => allocations.reduce((sum, alloc) => sum + alloc.value, 0), [allocations]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
      <h4 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        Interactive Portfolio Allocator
      </h4>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          {allocations.map((alloc, index) => (
            <div key={alloc.name} className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                {alloc.name}: {alloc.value.toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={alloc.value}
                onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                style={{ accentColor: alloc.color }}
              />
            </div>
          ))}
           <div className="text-right font-bold text-lg dark:text-gray-200">Total: {totalValue.toFixed(0)}%</div>
        </div>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                <Pie
                    data={allocations}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                >
                    {allocations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAllocator;
