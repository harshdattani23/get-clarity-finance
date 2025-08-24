// Leaderboard Badges and Achievements Configuration

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  condition: (stats: UserStats) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserStats {
  rank: number;
  totalReturn: number;
  winRate: number;
  totalTrades: number;
  portfolioValue: number;
  streak?: number;
  period?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL_TIME';
}

// Rank-based badges
export const RANK_BADGES = {
  CHAMPION: {
    id: 'champion',
    name: 'Champion',
    description: 'Ranked #1 on the leaderboard',
    icon: '👑',
    color: 'from-yellow-400 to-yellow-600',
    glowColor: 'shadow-yellow-400/50',
  },
  RUNNER_UP: {
    id: 'runner_up',
    name: 'Runner Up',
    description: 'Ranked #2 on the leaderboard',
    icon: '🥈',
    color: 'from-gray-300 to-gray-500',
    glowColor: 'shadow-gray-400/50',
  },
  THIRD_PLACE: {
    id: 'third_place',
    name: 'Bronze Medal',
    description: 'Ranked #3 on the leaderboard',
    icon: '🥉',
    color: 'from-orange-400 to-orange-600',
    glowColor: 'shadow-orange-400/50',
  },
  TOP_10: {
    id: 'top_10',
    name: 'Elite Trader',
    description: 'Ranked in top 10',
    icon: '⭐',
    color: 'from-purple-400 to-purple-600',
    glowColor: 'shadow-purple-400/50',
  },
};

// Performance-based badges
export const PERFORMANCE_BADGES: Badge[] = [
  {
    id: 'profit_master',
    name: 'Profit Master',
    description: '50%+ returns',
    icon: '💰',
    color: 'from-green-400 to-green-600',
    condition: (stats) => stats.totalReturn >= 50,
    rarity: 'legendary',
  },
  {
    id: 'consistent_winner',
    name: 'Consistent Winner',
    description: '70%+ win rate',
    icon: '🎯',
    color: 'from-blue-400 to-blue-600',
    condition: (stats) => stats.winRate >= 70,
    rarity: 'epic',
  },
  {
    id: 'high_roller',
    name: 'High Roller',
    description: 'Portfolio value over ₹200K',
    icon: '💎',
    color: 'from-indigo-400 to-indigo-600',
    condition: (stats) => stats.portfolioValue >= 200000,
    rarity: 'epic',
  },
  {
    id: 'active_trader',
    name: 'Active Trader',
    description: '100+ trades completed',
    icon: '⚡',
    color: 'from-orange-400 to-red-500',
    condition: (stats) => stats.totalTrades >= 100,
    rarity: 'rare',
  },
  {
    id: 'day_trader',
    name: 'Day Trader',
    description: '50+ trades completed',
    icon: '📈',
    color: 'from-cyan-400 to-blue-500',
    condition: (stats) => stats.totalTrades >= 50,
    rarity: 'common',
  },
  {
    id: 'risk_taker',
    name: 'Risk Taker',
    description: 'High volatility trader',
    icon: '🔥',
    color: 'from-red-400 to-orange-500',
    condition: (stats) => stats.totalTrades >= 20 && Math.abs(stats.totalReturn) >= 30,
    rarity: 'rare',
  },
  {
    id: 'steady_growth',
    name: 'Steady Growth',
    description: 'Positive returns with 60%+ win rate',
    icon: '📊',
    color: 'from-teal-400 to-green-500',
    condition: (stats) => stats.totalReturn > 10 && stats.winRate >= 60,
    rarity: 'common',
  },
];

// Special achievement badges
export const ACHIEVEMENT_BADGES = {
  PERFECT_WEEK: {
    id: 'perfect_week',
    name: 'Perfect Week',
    description: 'No losses for a week',
    icon: '💯',
    color: 'from-pink-400 to-purple-600',
    rarity: 'legendary',
  },
  COMEBACK_KID: {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    description: 'Recovered from -20% to positive',
    icon: '🚀',
    color: 'from-red-400 to-green-500',
    rarity: 'epic',
  },
  MARATHON_TRADER: {
    id: 'marathon_trader',
    name: 'Marathon Trader',
    description: 'Active for 30+ days',
    icon: '🏃',
    color: 'from-blue-400 to-purple-500',
    rarity: 'rare',
  },
};

// Animated effects for top performers
export const RANK_EFFECTS = {
  1: {
    animation: 'animate-pulse',
    glow: 'shadow-lg shadow-yellow-500/50',
    border: 'border-2 border-yellow-400',
    background: 'bg-gradient-to-r from-yellow-900/20 via-yellow-800/30 to-yellow-900/20',
  },
  2: {
    animation: 'animate-pulse',
    glow: 'shadow-lg shadow-gray-400/50',
    border: 'border-2 border-gray-400',
    background: 'bg-gradient-to-r from-gray-800/20 via-gray-700/30 to-gray-800/20',
  },
  3: {
    animation: 'animate-pulse',
    glow: 'shadow-lg shadow-orange-500/50',
    border: 'border-2 border-orange-400',
    background: 'bg-gradient-to-r from-orange-900/20 via-orange-800/30 to-orange-900/20',
  },
};

// Function to get user's badges based on stats
export function getUserBadges(stats: UserStats): Badge[] {
  const badges: Badge[] = [];
  
  // Check performance badges
  PERFORMANCE_BADGES.forEach(badge => {
    if (badge.condition(stats)) {
      badges.push(badge);
    }
  });
  
  return badges;
}

// Function to get rank badge
export function getRankBadge(rank: number) {
  switch (rank) {
    case 1:
      return RANK_BADGES.CHAMPION;
    case 2:
      return RANK_BADGES.RUNNER_UP;
    case 3:
      return RANK_BADGES.THIRD_PLACE;
    default:
      if (rank <= 10) {
        return RANK_BADGES.TOP_10;
      }
      return null;
  }
}

// Function to calculate user level based on experience
export function calculateLevel(totalTrades: number, winRate: number): number {
  const experiencePoints = totalTrades * 10 + winRate * 5;
  return Math.floor(experiencePoints / 100) + 1;
}

// Function to get next milestone
export function getNextMilestone(stats: UserStats): string {
  if (stats.totalTrades < 50) {
    return `${50 - stats.totalTrades} trades to Day Trader badge`;
  }
  if (stats.totalTrades < 100) {
    return `${100 - stats.totalTrades} trades to Active Trader badge`;
  }
  if (stats.winRate < 60) {
    return `${Math.ceil(60 - stats.winRate)}% win rate to Steady Growth badge`;
  }
  if (stats.winRate < 70) {
    return `${Math.ceil(70 - stats.winRate)}% win rate to Consistent Winner badge`;
  }
  if (stats.totalReturn < 50) {
    return `${Math.ceil(50 - stats.totalReturn)}% returns to Profit Master badge`;
  }
  return 'Keep trading to unlock more achievements!';
}
