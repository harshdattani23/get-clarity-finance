// src/components/stock/Markets.tsx
'use client';

const markets = [
  { name: 'S&P 500 Futures', value: '5255.75', change: '+58.50', percent: '+1.13%', color: 'text-green-500' },
  { name: 'NASDAQ Futures', value: '18311.00', change: '+234.25', percent: '+1.30%', color: 'text-green-500' },
  { name: 'Dow Jones Futures', value: '39246.00', change: '+330.00', percent: '+0.85%', color: 'text-green-500' },
  { name: 'Russell 2000 Futures', value: '2083.20', change: '+8.80', percent: '+0.42%', color: 'text-green-500' },
  { name: 'Crude Oil', value: '86.73', change: '+0.14', percent: '+0.16%', color: 'text-green-500' },
  { name: 'Gold', value: '2349.10', change: '+40.60', percent: '+1.76%', color: 'text-green-500' },
  { name: 'Silver', value: '27.60', change: '+0.35', percent: '+1.30%', color: 'text-green-500' },
  { name: 'EUR/USD', value: '1.08', change: '0.00', percent: '0.00%', color: 'text-gray-400' },
  { name: '10 Year Bond', value: '4.38', change: '+0.07', percent: '+1.60%', color: 'text-green-500' },
  { name: 'Bitcoin', value: '67754.81', change: '+1151.08', percent: '+1.73%', color: 'text-green-500' },
];

const Markets = () => {
  return (
    <div className="bg-[#161B22] p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Markets</h2>
      <table className="w-full">
        <tbody>
          {markets.map((market) => (
            <tr key={market.name} className="border-b border-gray-700">
              <td className="py-2">{market.name}</td>
              <td className="py-2 text-right">{market.value}</td>
              <td className={`py-2 text-right ${market.color}`}>{market.change}</td>
              <td className={`py-2 text-right ${market.color}`}>{market.percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Markets;
