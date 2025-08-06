// src/components/virtual-trading/NewsFeed.tsx
'use client';

export default function NewsFeed({ symbol }: { symbol: string }) {
  // TODO: Fetch and display news from the Stock News API
  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">News Feed for {symbol}</h2>
      <p className="text-gray-400">News feed coming soon...</p>
    </div>
  );
}
