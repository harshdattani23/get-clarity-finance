'use client';

// The Stock type is now passed down from the parent page.
// We'll rely on TypeScript inference for the props.
interface StockInfoProps {
  stock: {
    name: string;
    description: string;
    marketCap: number;
    peRatio?: number | null;
    eps?: number | null;
    dividendYield?: number | null;
    week52High?: number | null;
    week52Low?: number | null;
  };
}

export default function StockInfo({ stock }: StockInfoProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">About {stock.name}</h2>
      <p className="text-gray-400 mb-6">{stock.description || 'No description available.'}</p>

      <h3 className="text-xl font-bold mb-4">Key Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-400">Market Cap</h4>
          <p>{stock.marketCap ? `₹${stock.marketCap.toLocaleString('en-IN')}` : 'N/A'}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-400">P/E Ratio</h4>
          <p>{stock.peRatio ? stock.peRatio.toFixed(2) : 'N/A'}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-400">EPS</h4>
          <p>{stock.eps ? stock.eps.toFixed(2) : 'N/A'}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-400">Dividend Yield</h4>
          <p>{stock.dividendYield ? `${stock.dividendYield.toFixed(2)}%` : 'N/A'}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-400">52-Week High</h4>
          <p>{stock.week52High ? `₹${stock.week52High.toLocaleString('en-IN')}` : 'N/A'}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-400">52-Week Low</h4>
          <p>{stock.week52Low ? `₹${stock.week52Low.toLocaleString('en-IN')}` : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
