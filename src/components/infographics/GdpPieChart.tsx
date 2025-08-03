"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Services', value: 53, color: '#4f46e5' },
  { name: 'Manufacturing', value: 29, color: '#10b981' },
  { name: 'Agriculture', value: 18, color: '#f59e0b' },
];

const GdpPieChart = () => {
  return (
    <div className="w-full h-96 bg-white p-4 rounded-xl shadow-lg border border-gray-200 mt-6 flex flex-col">
        <h3 className="font-bold text-lg text-center text-gray-800 mb-4">India's GDP Composition (Approx.)</h3>
        <div className="flex-grow">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={(entry) => `${entry.name} ${entry.value}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
        <p className="text-xs text-center text-gray-500 mt-2">
            Source: Data adapted from World Bank and national sources.
        </p>
    </div>
  );
};

export default GdpPieChart;
