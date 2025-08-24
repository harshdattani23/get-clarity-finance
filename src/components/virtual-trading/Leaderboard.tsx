'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { FaTrophy, FaMedal, FaCrown, FaFire } from 'react-icons/fa';
import { getUserBadges, getRankBadge, RANK_EFFECTS, calculateLevel, getNextMilestone, type UserStats } from '@/lib/leaderboard-badges';

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
    const effect = RANK_EFFECTS[rank as keyof typeof RANK_EFFECTS];
    if (effect) {
      return `${effect.background} ${effect.border} ${effect.glow}`;
    }
    return 'bg-slate-800/50 hover:bg-slate-700/50';
  };

  const formatReturn = (value: number | unknown) => {
    const numValue = typeof value === 'number' ? value : Number(value);
    const formatted = numValue.toFixed(2);
    return numValue >= 0 ? `+${formatted}%` : `${formatted}%`;
  };

  const formatCurrency = (value: number | unknown) => {
    const numValue = typeof value === 'number' ? value : Number(value);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <FaTrophy className="text-yellow-400" />
          Leaderboard
        </h2>
        
        <div className="flex gap-1 sm:gap-2 flex-wrap">
          {(['DAILY', 'WEEKLY', 'MONTHLY', 'ALL_TIME'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md font-semibold text-sm sm:text-base transition-colors ${
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
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold text-blue-400">#{userRank.rank}</div>
              <div>
                <p className="text-white font-semibold">Your Ranking</p>
                <p className="text-gray-400 text-sm">
                  {getNextMilestone({
                    rank: userRank.rank,
                    totalReturn: Number(userRank.totalReturn),
                    winRate: Number(userRank.winRate),
                    totalTrades: userRank.totalTrades,
                    portfolioValue: Number(userRank.portfolioValue),
                  })}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className={`text-xl font-bold ${Number(userRank.totalReturn) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatReturn(userRank.totalReturn)}
                </p>
                <p className="text-gray-400 text-xs">Return</p>
              </div>
              <div>
                <p className="text-xl font-bold text-yellow-400">
                  {Number(userRank.winRate).toFixed(1)}%
                </p>
                <p className="text-gray-400 text-xs">Win Rate</p>
              </div>
              <div>
                <p className="text-xl font-bold text-purple-400">
                  {userRank.totalTrades}
                </p>
                <p className="text-gray-400 text-xs">Trades</p>
              </div>
            </div>
          </div>
          {/* User's Badges */}
          {getUserBadges({
            rank: userRank.rank,
            totalReturn: Number(userRank.totalReturn),
            winRate: Number(userRank.winRate),
            totalTrades: userRank.totalTrades,
            portfolioValue: Number(userRank.portfolioValue),
          }).length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {getUserBadges({
                rank: userRank.rank,
                totalReturn: Number(userRank.totalReturn),
                winRate: Number(userRank.winRate),
                totalTrades: userRank.totalTrades,
                portfolioValue: Number(userRank.portfolioValue),
              }).map(badge => (
                <span
                  key={badge.id}
                  className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r ${badge.color} text-white font-semibold inline-flex items-center gap-1`}
                  title={badge.description}
                >
                  <span>{badge.icon}</span>
                  <span>{badge.name}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Leaderboard Table */}
      {loading ? (
        <div className="animate-pulse space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-slate-700/50 rounded"></div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-slate-700">
                <th className="text-left py-3 px-2 font-semibold">Rank</th>
                <th className="text-left py-3 px-2 font-semibold">Trader</th>
                <th className="text-right py-3 px-2 font-semibold hidden sm:table-cell">Return</th>
                <th className="text-right py-3 px-2 font-semibold">Win Rate</th>
                <th className="text-right py-3 px-2 font-semibold hidden md:table-cell">Trades</th>
                <th className="text-right py-3 px-2 font-semibold hidden lg:table-cell">Portfolio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {leaderboard.map((entry) => {
                const isCurrentUser = user?.id === entry.user.clerkId;
                const rankBadge = getRankBadge(entry.rank);
                const level = calculateLevel(entry.totalTrades, Number(entry.winRate));
                
                return (
                  <tr
                    key={entry.id}
                    className={`transition-all hover:bg-slate-700/30 ${
                      isCurrentUser 
                        ? 'bg-blue-900/20' 
                        : entry.rank <= 3 ? getRankClass(entry.rank) : ''
                    }`}
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center">
                        {getRankIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex flex-col">
                        <p className="text-white font-semibold flex items-center gap-1">
                          {entry.user.username || entry.user.email.split('@')[0]}
                          {isCurrentUser && <span className="text-blue-400 text-xs">(You)</span>}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-xs text-gray-500">Lvl {level}</span>
                          {rankBadge && (
                            <span className={`text-xs px-1.5 py-0.5 rounded-full bg-gradient-to-r ${rankBadge.color} text-white`}>
                              {rankBadge.icon}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right hidden sm:table-cell">
                      <span className={`font-bold ${Number(entry.totalReturn) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatReturn(entry.totalReturn)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-white font-semibold">{Number(entry.winRate).toFixed(1)}%</span>
                        {Number(entry.winRate) >= 70 && <span title="Consistent Winner">🎯</span>}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right hidden md:table-cell">
                      <span className="text-gray-300">{entry.totalTrades}</span>
                    </td>
                    <td className="py-3 px-2 text-right hidden lg:table-cell">
                      <span className="text-gray-300">{formatCurrency(entry.portfolioValue)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
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
