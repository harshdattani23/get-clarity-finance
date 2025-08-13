'use client';

import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { Stock } from '@/lib/trading-data';

interface UserHoldingsProps {
  stock: Stock;
}

export default function UserHoldings({ stock }: UserHoldingsProps) {
  const { portfolio } = usePortfolio();
  const holding = portfolio?.holdings.find((h) => h.ticker === stock.ticker);

  if (!holding) {
    return null;
  }

  const currentValue = holding.quantity * stock.price;
  const investmentValue = holding.quantity * holding.averagePrice;
  const pl = currentValue - investmentValue;

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Position</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-400">Quantity</h4>
          <p className="text-lg font-bold">{holding.quantity}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-400">Average Price</h4>
          <p className="text-lg font-bold">₹{holding.averagePrice.toFixed(2)}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-400">Profit/Loss</h4>
          <p
            className={`text-lg font-bold ${
              pl >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {pl.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
