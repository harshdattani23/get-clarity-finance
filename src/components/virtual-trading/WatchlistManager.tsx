'use client';

import { useWatchlist } from '@/contexts/virtual-trading/WatchlistContext';
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';
import LoginPrompt from './LoginPrompt';

const WatchlistView = dynamic(() => import('./WatchlistView'), { ssr: false });

export default function WatchlistManager() {
  const { watchlist, loading } = useWatchlist();
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <LoginPrompt />;
  }

  if (loading) {
    return <div className="text-center p-4">Loading watchlist...</div>;
  }
  
  if (!watchlist) {
    return <div className="text-center p-4">No watchlist found.</div>;
  }

  return (
    <div className="bg-slate-900 rounded-lg">
      <WatchlistView watchlist={watchlist} />
    </div>
  );
}
