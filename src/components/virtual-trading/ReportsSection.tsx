// src/components/virtual-trading/ReportsSection.tsx
'use client';

export default function ReportsSection({ symbol }: { symbol: string }) {
  // TODO: Fetch and display reports from SEBI, BSE, and NSE
  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Reports for {symbol}</h2>
      <p className="text-gray-400">Reports section coming soon...</p>
    </div>
  );
}
