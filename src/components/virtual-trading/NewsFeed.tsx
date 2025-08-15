// src/components/virtual-trading/NewsFeed.tsx
'use client';

import { useEffect, useState } from 'react';

interface NewsArticle {
  headline: string;
  summary: string;
  source: string;
}

export default function NewsFeed({ symbol }: { symbol: string }) {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/news?symbol=${symbol}`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Failed to fetch news', error);
      }
      setLoading(false);
    };

    fetchNews();
  }, [symbol]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">
        {symbol === 'general' ? 'Market News' : `News for ${symbol}`}
      </h2>
      {loading ? (
        <p className="text-gray-400">Loading news...</p>
      ) : (
        <div className="space-y-4">
          {news.map((article, index) => (
            <div key={index} className="border-b border-gray-700 pb-4">
              <h3 className="text-xl font-bold">{article.headline}</h3>
              <p className="text-gray-400 mt-2">{article.summary}</p>
              <p className="text-xs text-gray-500 mt-2">Source: {article.source}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
