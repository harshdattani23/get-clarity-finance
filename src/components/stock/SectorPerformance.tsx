// src/components/stock/SectorPerformance.tsx
'use client';

const sectors = [
  { name: 'All sectors', change: '+1.43%', color: 'text-green-500' },
  { name: 'Materials', change: '+1.52%', color: 'text-green-500' },
  { name: 'Communication Services', change: '+1.74%', color: 'text-green-500' },
  { name: 'Consumer Cyclical', change: '+1.16%', color: 'text-green-500' },
  { name: 'Consumer Defensive', change: '+0.87%', color: 'text-green-500' },
  { name: 'Energy', change: '+1.47%', color: 'text-green-500' },
  { name: 'Financials', change: '+0.61%', color: 'text-green-500' },
  { name: 'Health Care', change: '+0.96%', color: 'text-green-500' },
  { name: 'Industrials', change: '+1.07%', color: 'text-green-500' },
  { name: 'Utilities', change: '+3.44%', color: 'text-green-500' },
];

const SectorPerformance = () => {
  return (
    <div className="bg-[#161B22] p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Sector Performance</h2>
      <div className="grid grid-cols-2 gap-4">
        {sectors.map((sector) => (
          <div key={sector.name} className="flex justify-between">
            <span>{sector.name}</span>
            <span className={sector.color}>{sector.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorPerformance;
