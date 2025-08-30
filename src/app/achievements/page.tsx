"use client";

import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Trophy, Lock, CheckCircle } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  tier: string;
  icon: string;
  points: number;
  unlocked: boolean;
}

const AchievementsPage: NextPage = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/achievements');
        if (response.ok) {
          const data = await response.json();
          setAchievements(data);
        }
      } catch (error) {
        console.error('Failed to fetch achievements', error);
      }
      setLoading(false);
    };

    fetchAchievements();
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'bronze':
        return 'bg-yellow-700';
      case 'silver':
        return 'bg-gray-400';
      case 'gold':
        return 'bg-yellow-500';
      case 'platinum':
        return 'bg-blue-400';
      case 'diamond':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading achievements...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Achievements</h1>
      <p className="text-lg text-gray-600 mb-8">Complete tasks and challenges to unlock badges and earn points!</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`border rounded-lg p-6 flex flex-col items-center text-center transition-all ${
              achievement.unlocked ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
            }`}
          >
            <div className={`relative mb-4`}>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl ${getTierColor(achievement.tier)}`}>
                <Trophy />
              </div>
              {achievement.unlocked ? (
                <CheckCircle className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full text-green-500" />
              ) : (
                <Lock className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full text-gray-400" />
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900">{achievement.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
            <div className="text-sm font-bold text-yellow-600">{achievement.points} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;