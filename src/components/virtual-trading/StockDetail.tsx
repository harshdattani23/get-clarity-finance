// src/components/virtual-trading/StockDetail.tsx
'use client';

import { useState } from 'react';
import { allStocks, Stock } from '@/lib/trading-data';
import TradeModal from './TradeModal';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';

const dummyCompanyInfo = {
  description: "This is a sample description for the company. It provides a brief overview of the company's operations, history, and market position. This data is for demonstration purposes only.",
  sector: 'Technology',
  marketCap: '1T',
  peRatio: '25.0',
  dividendYield: '1.5%',
  ceo: 'John Doe',
};

const dummyFinancialResults = {
  'Revenue': { 'Q1': '10B', 'Q2': '12B', 'Q3': '11B', 'Q4': '13B' },
  'Net Income': { 'Q1': '2B', 'Q2': '2.5B', 'Q3': '2.2B', 'Q4': '2.8B' },
  'EPS': { 'Q1': '1.00', 'Q2': '1.25', 'Q3': '1.10', 'Q4': '1.40' },
};

const dummyCorporateActions = [
  { exDate: '2023-01-15', purpose: 'Dividend payout of $0.50 per share' },
  { exDate: '2023-03-20', purpose: 'Stock split 2-for-1' },
];

const dummyNews = [
  { headline: 'Company Announces Record Profits for Q4', date: '2023-04-01', link: '#', short_description: 'A brief summary of the news article will appear here.' },
  { headline: 'New Product Launching Next Month', date: '2023-03-15', link: '#', short_description: 'Details about the upcoming product and its features.' },
];

export default function StockDetail({ ticker }: { ticker: string }) {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [activeTab, setActiveTab] = useState('info');
  const { addToWatchlist, removeFromWatchlist, portfolio } = usePortfolio();

  const stock = allStocks.find((s) => s.ticker === ticker);

  const handleOpenModal = (stock: Stock, type: 'buy' | 'sell') => {
    setSelectedStock(stock);
    setTradeType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStock(null);
    setIsModalOpen(false);
  };

  if (!stock) {
    return <div className="text-white">Stock not found</div>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{stock.name} ({stock.ticker})</h1>
          <p className="text-lg text-gray-400">{stock.industry}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">₹{stock.price.toFixed(2)}</p>
          <p className={`text-xl ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stock.change.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        {portfolio.watchlist.includes(stock.ticker) ? (
          <button
            onClick={() => removeFromWatchlist(stock.ticker)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-bold"
          >
            In Watchlist
          </button>
        ) : (
          <button
            onClick={() => addToWatchlist(stock.ticker)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold"
          >
            Add to Watchlist
          </button>
        )}
        <button
          onClick={() => handleOpenModal(stock, 'buy')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold"
        >
          Buy
        </button>
        <button
          onClick={() => handleOpenModal(stock, 'sell')}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold"
        >
          Sell
        </button>
      </div>

      <div className="mt-8">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('info')} className={`${activeTab === 'info' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Company Info</button>
            <button onClick={() => setActiveTab('results')} className={`${activeTab === 'results' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Financial Results</button>
            <button onClick={() => setActiveTab('actions')} className={`${activeTab === 'actions' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Corporate Actions</button>
            <button onClick={() => setActiveTab('news')} className={`${activeTab === 'news' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>News</button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'info' && (
            <div>
              <h3 className="text-xl font-bold">About {stock.name}</h3>
              <p className="mt-4 text-gray-300">{dummyCompanyInfo.description}</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(dummyCompanyInfo).map(([key, value]) => (
                      key !== 'description' &&
                      <div key={key} className="bg-gray-700 p-4 rounded-lg">
                          <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-lg font-semibold">{value}</p>
                      </div>
                  ))}
              </div>
            </div>
          )}
          {activeTab === 'results' && (
            <div>
              <h3 className="text-xl font-bold">Quarterly Results</h3>
              <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700 mt-4">
                      <thead className="bg-gray-600">
                          <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Metric</th>
                              {Object.keys(dummyFinancialResults.Revenue).map(quarter => (
                                  <th key={quarter} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{quarter}</th>
                              ))}
                          </tr>
                      </thead>
                      <tbody className="bg-gray-700 divide-y divide-gray-600">
                          {Object.entries(dummyFinancialResults).map(([metric, values]) => (
                              <tr key={metric}>
                                  <td className="px-6 py-4 whitespace-nowrap font-medium">{metric}</td>
                                  {Object.values(values).map((value: any, index) => (
                                      <td key={index} className="px-6 py-4 whitespace-nowrap">{value}</td>
                                  ))}
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
            </div>
          )}
          {activeTab === 'actions' && (
             <div>
              <h3 className="text-xl font-bold">Corporate Actions</h3>
              {dummyCorporateActions.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {dummyCorporateActions.map((action, index) => (
                    <li key={index} className="p-4 bg-gray-700 rounded-lg">
                      <p><strong>Ex-Date:</strong> {action.exDate}</p>
                      <p><strong>Purpose:</strong> {action.purpose}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No corporate actions found.</p>
              )}
            </div>
          )}
          {activeTab === 'news' && (
            <div>
              <h3 className="text-xl font-bold">Recent News</h3>
              {dummyNews.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {dummyNews.map((newsItem, index) => (
                    <li key={index} className="p-4 bg-gray-700 rounded-lg">
                      <a href={newsItem.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        <h4 className="text-lg font-semibold">{newsItem.headline}</h4>
                        <p className="text-sm text-gray-400 mt-1">{new Date(newsItem.date).toLocaleDateString()}</p>
                        <p className="mt-2 text-gray-300">{newsItem.short_description}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent news found.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedStock && (
        <TradeModal
          stock={selectedStock}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialTradeType={tradeType}
        />
      )}
    </div>
  );
}
