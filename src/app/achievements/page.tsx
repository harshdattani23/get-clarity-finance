"use client";

import { useState, useEffect } from 'react';
import { Trophy, Target, Flame, Star, TrendingUp, Award, CheckCircle, Lock, Zap, DollarSign, BarChart3, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  tier: string;
  icon: string;
  points: number;
  unlocked: boolean;
  progress: number;
  unlockedAt: string | null;
  requirement: Record<string, unknown>;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements');
      const data = await response.json();
      setAchievements(data.achievements || []);
      setTotalPoints(data.totalPoints || 0);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (icon: string, size: string = "w-8 h-8") => {
    switch (icon) {
      case 'trophy': return <Trophy className={size} />;
      case 'fire': return <Flame className={size} />;
      case 'star': return <Star className={size} />;
      case 'chart': return <TrendingUp className={size} />;
      case 'coins': return <DollarSign className={size} />;
      case 'gem': return <Sparkles className={size} />;
      default: return <Award className={size} />;
    }
  };

  const getTierColor = (tier: string, unlocked: boolean) => {
    if (!unlocked) return 'text-gray-400 bg-gray-100';
    
    switch (tier) {
      case 'BRONZE': return 'text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100';
      case 'SILVER': return 'text-gray-600 bg-gradient-to-br from-gray-50 to-gray-100';
      case 'GOLD': return 'text-yellow-600 bg-gradient-to-br from-yellow-50 to-yellow-100';
      case 'PLATINUM': return 'text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100';
      case 'DIAMOND': return 'text-blue-600 bg-gradient-to-br from-blue-50 to-cyan-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTierBorderColor = (tier: string, unlocked: boolean) => {
    if (!unlocked) return 'border-gray-200 hover:border-gray-300';
    
    switch (tier) {
      case 'BRONZE': return 'border-orange-300 hover:border-orange-400 shadow-orange-100';
      case 'SILVER': return 'border-gray-300 hover:border-gray-400 shadow-gray-100';
      case 'GOLD': return 'border-yellow-300 hover:border-yellow-400 shadow-yellow-100';
      case 'PLATINUM': return 'border-purple-300 hover:border-purple-400 shadow-purple-100';
      case 'DIAMOND': return 'border-blue-300 hover:border-blue-400 shadow-blue-100';
      default: return 'border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'TRADING': return <BarChart3 className="w-5 h-5" />;
      case 'PROFIT': return <DollarSign className="w-5 h-5" />;
      case 'STREAK': return <Flame className="w-5 h-5" />;
      case 'PORTFOLIO': return <Target className="w-5 h-5" />;
      case 'SPECIAL': return <Sparkles className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'TRADING': return 'bg-blue-100 text-blue-700';
      case 'PROFIT': return 'bg-green-100 text-green-700';
      case 'STREAK': return 'bg-orange-100 text-orange-700';
      case 'PORTFOLIO': return 'bg-purple-100 text-purple-700';
      case 'SPECIAL': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const categories = ['ALL', 'TRADING', 'PROFIT', 'STREAK', 'PORTFOLIO', 'SPECIAL'];
  
  const filteredAchievements = selectedCategory === 'ALL' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const completionPercentage = achievements.length > 0 
    ? Math.round((unlockedCount / achievements.length) * 100) 
    : 0;

  // Group achievements by tier for better display
  const achievementsByTier = {
    BRONZE: filteredAchievements.filter(a => a.tier === 'BRONZE'),
    SILVER: filteredAchievements.filter(a => a.tier === 'SILVER'),
    GOLD: filteredAchievements.filter(a => a.tier === 'GOLD'),
    PLATINUM: filteredAchievements.filter(a => a.tier === 'PLATINUM'),
    DIAMOND: filteredAchievements.filter(a => a.tier === 'DIAMOND'),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">Achievement Gallery</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track your trading journey and unlock achievements as you grow. Each achievement brings you points and recognition!
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Total Points</p>
                  <p className="text-3xl font-bold">{totalPoints}</p>
                </div>
                <Star className="w-10 h-10 text-blue-300" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">Unlocked</p>
                  <p className="text-3xl font-bold">{unlockedCount}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-300" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Available</p>
                  <p className="text-3xl font-bold">{achievements.length}</p>
                </div>
                <Target className="w-10 h-10 text-purple-300" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm mb-1">Progress</p>
                  <p className="text-3xl font-bold">{completionPercentage}%</p>
                </div>
                <Zap className="w-10 h-10 text-orange-300" />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${completionPercentage}%` }}
            >
              {completionPercentage > 10 && (
                <span className="text-xs text-white font-semibold">{completionPercentage}%</span>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filter by Category</h2>
            <Link 
              href="/virtual-trading"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium"
            >
              Start Trading to Unlock
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category !== 'ALL' && getCategoryIcon(category)}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Achievement Tiers */}
        {Object.entries(achievementsByTier).map(([tier, tierAchievements]) => {
          if (tierAchievements.length === 0) return null;
          
          return (
            <div key={tier} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`px-4 py-2 rounded-lg font-bold ${
                  tier === 'BRONZE' ? 'bg-orange-100 text-orange-700' :
                  tier === 'SILVER' ? 'bg-gray-100 text-gray-700' :
                  tier === 'GOLD' ? 'bg-yellow-100 text-yellow-700' :
                  tier === 'PLATINUM' ? 'bg-purple-100 text-purple-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {tier} TIER
                </div>
                <span className="text-sm text-gray-500">
                  {tierAchievements.filter(a => a.unlocked).length}/{tierAchievements.length} unlocked
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tierAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`relative bg-white rounded-xl shadow-sm border-2 transition-all hover:shadow-xl hover:scale-[1.02] ${
                      getTierBorderColor(achievement.tier, achievement.unlocked)
                    } ${achievement.unlocked ? '' : 'opacity-90'}`}
                  >
                    {/* Progress Bar */}
                    {!achievement.unlocked && achievement.progress > 0 && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-xl overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${getTierColor(achievement.tier, achievement.unlocked)}`}>
                          {getIconComponent(achievement.icon)}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-800">+{achievement.points}</p>
                          <p className="text-xs text-gray-500 uppercase">points</p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {achievement.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${
                          getCategoryColor(achievement.category)
                        }`}>
                          {getCategoryIcon(achievement.category)}
                          {achievement.category}
                        </span>
                        
                        {achievement.unlocked ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-bold">Unlocked!</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-gray-500">
                            <Lock className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {achievement.progress > 0 ? `${achievement.progress}% Complete` : 'Locked'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Progress Indicator */}
                      {!achievement.unlocked && (
                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-2">How to unlock:</p>
                          <p className="text-sm font-medium text-gray-800">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {achievement.requirement?.type === 'TRADES_COUNT' && `Complete ${(achievement.requirement as any).value} trades`}
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {achievement.requirement?.type === 'TOTAL_PROFIT' && `Earn ₹${((achievement.requirement as any).value as number).toLocaleString()} in profits`}
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {achievement.requirement?.type === 'WIN_STREAK' && `Win ${(achievement.requirement as any).value} trades in a row`}
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {achievement.requirement?.type === 'VOLUME' && `Trade ₹${((achievement.requirement as any).value as number).toLocaleString()} in total volume`}
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {achievement.requirement?.type === 'WIN_RATE' && `Maintain ${(achievement.requirement as any).value}% win rate (min ${(achievement.requirement as any).minTrades} trades)`}
                            {achievement.requirement?.type === 'SPECIAL' && 'Complete special conditions'}
                          </p>
                        </div>
                      )}
                      
                      {achievement.unlocked && achievement.unlockedAt && (
                        <p className="text-xs text-gray-500 mt-3 text-center">
                          🎉 Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Motivational Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-3">Ready to Unlock More Achievements?</h2>
          <p className="text-lg mb-6 text-blue-100">
            Start your trading journey now and watch your achievements grow!
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/virtual-trading"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
            >
              Start Trading
            </Link>
            <Link 
              href="/stock-market-course"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all border border-blue-500"
            >
              Learn First
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
