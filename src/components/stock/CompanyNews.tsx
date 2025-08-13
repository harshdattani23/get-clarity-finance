'use client';

import { Stock } from '@/lib/trading-data';

interface CompanyNewsProps {
  stock: Stock;
}

export default function CompanyNews({ stock }: CompanyNewsProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Recent News</h2>
      <ul className="space-y-4">
        {stock.news && stock.news.length > 0 ? (
          stock.news.map((article: { title: string; source: string; date: string }, index: number) => (
            <li key={index} className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-400">
                {article.source} -{' '}
                {new Date(article.date).toLocaleDateString()}
              </p>
            </li>
          ))
        ) : (
          <p>No recent news.</p>
        )}
      </ul>
    </div>
  );
}
