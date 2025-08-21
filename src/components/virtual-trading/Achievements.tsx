'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { FaTrophy, FaStar, FaLock, FaChartLine, FaCoins, FaGraduationCap, FaFire, FaBriefcase, FaUsers, FaGem } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'TRADING' | 'PROFIT' | 'LEARNING' | 'STREAK' | 'PORTFOLIO' | 'SOCIAL' | 'SPECIAL';
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt: string | null;
  progress: number;
  requirement: Record<string, unknown>;
}

const Achievements: React.FC = () => {
  const { isSignedIn } = useUser();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);
  const [showUnlocked, setShowUnlocked] = useState<Achievement | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      fetchAchievements();
    }
  }, [isSignedIn]);

  const fetchAchievements = async () => {
    setLoading(true);
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'TRADING': return <FaChartLine />;
      case 'PROFIT': return <FaCoins />;
      case 'LEARNING': return <FaGraduationCap />;
      case 'STREAK': return <FaFire />;
      case 'PORTFOLIO': return <FaBriefcase />;
      case 'SOCIAL': return <FaUsers />;
      case 'SPECIAL': return <FaGem />;
      default: return <FaStar />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'BRONZE': return 'text-orange-600 bg-orange-900/20 border-orange-600/30';
      case 'SILVER': return 'text-gray-300 bg-gray-700/20 border-gray-400/30';
      case 'GOLD': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'PLATINUM': return 'text-cyan-300 bg-cyan-900/20 border-cyan-400/30';
      case 'DIAMOND': return 'text-purple-400 bg-purple-900/20 border-purple-500/30';
      default: return 'text-gray-400 bg-gray-800/20 border-gray-600/30';
    }
  };

  const getAchievementIcon = (iconName: string) => {
    // Map icon names to actual icons or use emojis
    const iconMap: { [key: string]: React.ReactElement } = {
      trophy: <FaTrophy />,
      star: <FaStar />,
      chart: <FaChartLine />,
      coins: <FaCoins />,
      fire: <FaFire />,
      gem: <FaGem />,
    };
    return iconMap[iconName] || <FaStar />;
  };

  const categories = ['ALL', 'TRADING', 'PROFIT', 'LEARNING', 'STREAK', 'PORTFOLIO', 'SOCIAL', 'SPECIAL'];

  const filteredAchievements = achievements.filter(
    (achievement) => selectedCategory === 'ALL' || achievement.category === selectedCategory
  );

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const completionPercentage = achievements.length > 0 ? (unlockedCount / achievements.length) * 100 : 0;

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaTrophy className="text-yellow-400" />
            Achievements
          </h2>
          <div className="text-right">
            <p className="text-3xl font-bold text-yellow-400">{totalPoints}</p>
            <p className="text-sm text-gray-400">Total Points</p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-400">{unlockedCount}</p>
            <p className="text-xs text-green-300">Unlocked</p>
          </div>
          <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-400">{achievements.filter(a => !a.unlocked && a.progress > 0).length}</p>
            <p className="text-xs text-blue-300">In Progress</p>
          </div>
          <div className="bg-gray-900/30 border border-gray-600/30 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-gray-400">{achievements.filter(a => !a.unlocked && a.progress === 0).length}</p>
            <p className="text-xs text-gray-300">Locked</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-yellow-500 h-full flex items-center justify-end pr-2"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {completionPercentage > 10 && (
              <span className="text-xs text-white font-bold">{completionPercentage.toFixed(0)}%</span>
            )}
          </motion.div>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Practice investing and learn market dynamics to unlock achievements!
        </p>
      </div>

      {/* Category Filter with Counts */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const categoryAchievements = category === 'ALL' 
              ? achievements 
              : achievements.filter(a => a.category === category);
            const categoryUnlocked = categoryAchievements.filter(a => a.unlocked).length;
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md font-semibold transition-colors flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {category !== 'ALL' && getCategoryIcon(category)}
                <span>{category}</span>
                <span className="text-xs opacity-75">({categoryUnlocked}/{categoryAchievements.length})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Achievement to Unlock */}
      {filteredAchievements.filter(a => !a.unlocked && a.progress > 50).length > 0 && (
        <div className="mb-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-600/30 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-300 mb-3">🎯 Close to Unlocking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredAchievements
              .filter(a => !a.unlocked && a.progress > 50)
              .sort((a, b) => b.progress - a.progress)
              .slice(0, 2)
              .map(achievement => (
                <div key={achievement.id} className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3">
                  <div className="text-2xl">{getAchievementIcon(achievement.icon)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{achievement.name}</p>
                    <div className="mt-1 bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{achievement.progress}% complete</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-yellow-400">+{achievement.points}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Achievements Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-700/50 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: achievement.unlocked ? 1.02 : 1 }}
              className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer ${
                achievement.unlocked
                  ? getTierColor(achievement.tier)
                  : 'bg-slate-900/50 border-slate-700 opacity-75'
              }`}
              onClick={() => achievement.unlocked && setShowUnlocked(achievement)}
            >
              {/* Lock Icon for Locked Achievements */}
              {!achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <FaLock className="text-gray-500" />
                </div>
              )}

              {/* Achievement Icon */}
              <div className="text-3xl mb-2">
                {achievement.unlocked ? (
                  getAchievementIcon(achievement.icon)
                ) : (
                  <div className="text-gray-600">{getAchievementIcon(achievement.icon)}</div>
                )}
              </div>

              {/* Achievement Details */}
              <h3 className={`font-bold mb-1 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                {achievement.name}
              </h3>
              <p className="text-xs text-gray-400 mb-2">{achievement.description}</p>
              
              {/* How to Unlock (for locked achievements) */}
              {!achievement.unlocked && achievement.progress === 0 && (
                <div className="mt-2 p-2 bg-slate-800/50 rounded text-xs text-gray-500">
                  {/* eslint-disable @typescript-eslint/no-explicit-any */}
                  💡 {achievement.requirement?.type === 'TRADES_COUNT' && `Practice with ${(achievement.requirement as any).value} virtual investments`}
                  {achievement.requirement?.type === 'TOTAL_PROFIT' && `Build ₹${((achievement.requirement as any).value as number).toLocaleString()} in virtual portfolio value`}
                  {achievement.requirement?.type === 'WIN_STREAK' && `Make ${(achievement.requirement as any).value} successful investment decisions`}
                  {achievement.requirement?.type === 'VOLUME' && `Practice with ₹${((achievement.requirement as any).value as number).toLocaleString()} in virtual investments`}
                  {achievement.requirement?.type === 'WIN_RATE' && `Achieve ${(achievement.requirement as any).value}% successful investment rate`}
                  {/* eslint-enable @typescript-eslint/no-explicit-any */}
                </div>
              )}

              {/* Progress Bar */}
              {!achievement.unlocked && achievement.progress > 0 && (
                <div className="mt-2">
                  <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full transition-all"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{achievement.progress}% complete</p>
                </div>
              )}

              {/* Points */}
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs font-semibold uppercase ${
                  achievement.unlocked ? '' : 'text-gray-500'
                }`}>
                  {achievement.tier}
                </span>
                <span className={`text-sm font-bold ${
                  achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'
                }`}>
                  +{achievement.points} pts
                </span>
              </div>

              {/* Unlocked Date */}
              {achievement.unlocked && achievement.unlockedAt && (
                <p className="text-xs text-gray-400 mt-2">
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Achievement Unlocked Modal */}
      <AnimatePresence>
        {showUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowUnlocked(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className={`p-8 rounded-lg border-2 max-w-md ${getTierColor(showUnlocked.tier)}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4 flex justify-center">
                  {getAchievementIcon(showUnlocked.icon)}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Achievement Unlocked!</h2>
                <h3 className="text-xl text-yellow-400 mb-2">{showUnlocked.name}</h3>
                <p className="text-gray-300 mb-4">{showUnlocked.description}</p>
                <div className="flex justify-center gap-4">
                  <span className="text-sm font-semibold uppercase">{showUnlocked.tier}</span>
                  <span className="text-yellow-400 font-bold">+{showUnlocked.points} points</span>
                </div>
                <button
                  onClick={() => setShowUnlocked(null)}
                  className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition-colors"
                >
                  Awesome!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Motivation Section */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-600/30 rounded-lg p-6 text-center">
          <FaTrophy className="text-4xl text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Keep Learning and Practicing!</h3>
          <p className="text-sm text-gray-300 mb-4">
            You've unlocked {unlockedCount} out of {achievements.length} learning milestones.
            {achievements.length - unlockedCount > 0 && (
              <> Continue your investment education journey - {achievements.length - unlockedCount} achievements to discover!</>
            )}
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-2xl font-bold text-green-400">{unlockedCount}</p>
              <p className="text-xs text-gray-400">Unlocked</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-400">{totalPoints}</p>
              <p className="text-xs text-gray-400">Points Earned</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">
                {achievements.reduce((sum, a) => sum + (a.unlocked ? 0 : a.points), 0)}
              </p>
              <p className="text-xs text-gray-400">Points Available</p>
            </div>
          </div>
          
          {/* Next Easy Achievement */}
          {filteredAchievements.filter(a => !a.unlocked && a.tier === 'BRONZE').length > 0 && (
            <div className="mt-4 p-3 bg-slate-800/50 rounded-lg text-left">
              <p className="text-xs text-gray-400 mb-2">🎯 Easy Achievement to Unlock:</p>
              {filteredAchievements
                .filter(a => !a.unlocked && a.tier === 'BRONZE')
                .slice(0, 1)
                .map(achievement => (
                  <div key={achievement.id} className="flex items-center gap-3">
                    <div className="text-xl">{getAchievementIcon(achievement.icon)}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-orange-400">{achievement.name}</p>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                    <p className="text-sm font-bold text-yellow-400">+{achievement.points} pts</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
