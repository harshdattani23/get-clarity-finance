'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { FaTrophy, FaMedal, FaCrown, FaFire } from 'react-icons/fa';

interface LeaderboardEntry {
  id: number;
  rank: number;
  totalReturn: number;
  winRate: number;
  totalTrades: number;
  portfolioValue: number;
  user: {
    username: string | null;
    email: string;
    clerkId: string;
  };
}

type Period = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME';

const Leaderboard: React.FC = () => {
  const { user } = useUser();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);
  const [period, setPeriod] = useState<Period>('WEEKLY');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/leaderboard?period=${period}&limit=100`);
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
        setUserRank(data.userRank);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [period]);


  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaCrown className="text-yellow-400 text-xl" />;
      case 2:
        return <FaTrophy className="text-gray-300 text-lg" />;
      case 3:
        return <FaMedal className="text-orange-600 text-lg" />;
      default:
        return <span className="text-gray-400 text-sm font-semibold">#{rank}</span>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-900/20 to-yellow-700/20 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-700/20 to-gray-600/20 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-orange-900/20 to-orange-700/20 border-orange-500/30';
      default:
        return 'bg-slate-800/50 hover:bg-slate-700/50';
    }
  };

  const formatReturn = (value: number) => {
    const formatted = value.toFixed(2);
    return value >= 0 ? `+${formatted}%` : `${formatted}%`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaTrophy className="text-yellow-400" />
          Leaderboard
        </h2>
        
        <div className="flex gap-2">
          {(['DAILY', 'WEEKLY', 'MONTHLY', 'ALL_TIME'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {p.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* User's Current Rank */}
      {userRank && (
        <div className="mb-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-400">#{userRank.rank}</div>
              <div>
                <p className="text-white font-semibold">Your Ranking</p>
                <p className="text-gray-400 text-sm">Keep trading to climb higher!</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-lg font-bold ${userRank.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatReturn(userRank.totalReturn)}
              </p>
              <p className="text-gray-400 text-sm">Total Return</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      {loading ? (
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-700/50 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-gray-400 text-sm font-semibold">
            <div className="col-span-1">Rank</div>
            <div className="col-span-3">Trader</div>
            <div className="col-span-2 text-right">Return</div>
            <div className="col-span-2 text-right">Win Rate</div>
            <div className="col-span-2 text-right">Trades</div>
            <div className="col-span-2 text-right">Portfolio</div>
          </div>

          {/* Table Rows */}
          {leaderboard.map((entry) => {
            const isCurrentUser = user?.id === entry.user.clerkId;
            return (
              <div
                key={entry.id}
                className={`grid grid-cols-12 gap-4 px-4 py-3 rounded-lg border transition-all ${
                  isCurrentUser 
                    ? 'bg-blue-900/20 border-blue-500/30' 
                    : getRankClass(entry.rank)
                } ${entry.rank <= 3 ? 'border' : ''}`}
              >
                <div className="col-span-1 flex items-center">
                  {getRankIcon(entry.rank)}
                </div>
                <div className="col-span-3">
                  <p className="text-white font-semibold truncate">
                    {entry.user.username || entry.user.email.split('@')[0]}
                    {isCurrentUser && <span className="ml-2 text-blue-400 text-xs">(You)</span>}
                  </p>
                  {entry.rank <= 3 && (
                    <p className="text-xs text-gray-400">
                      {entry.rank === 1 ? 'Champion' : entry.rank === 2 ? 'Runner-up' : 'Third Place'}
                    </p>
                  )}
                </div>
                <div className="col-span-2 text-right">
                  <span className={`font-bold ${entry.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatReturn(entry.totalReturn)}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-white font-semibold">{entry.winRate.toFixed(1)}%</span>
                    {entry.winRate >= 60 && <FaFire className="text-orange-400 text-sm" />}
                  </div>
                </div>
                <div className="col-span-2 text-right text-gray-300">
                  {entry.totalTrades}
                </div>
                <div className="col-span-2 text-right text-gray-300">
                  {formatCurrency(entry.portfolioValue)}
                </div>
              </div>
            );
          })}

          {leaderboard.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>No traders on the leaderboard yet.</p>
              <p className="text-sm mt-2">Start trading to appear here!</p>
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <FaCrown className="text-yellow-400" />
            <span>Champion</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTrophy className="text-gray-300" />
            <span>Runner-up</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMedal className="text-orange-600" />
            <span>Third Place</span>
          </div>
          <div className="flex items-center gap-2">
            <FaFire className="text-orange-400" />
            <span>Hot Streak (60%+ Win Rate)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
