"use client";

import { useState, useEffect, useMemo, type ReactElement } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FraudSimulator from '@/components/fraud-awareness/FraudSimulator';
import Module1AudioPlayer from '@/components/stock-market-course/Module1AudioPlayer';
import Module1VideoPlayer from '@/components/investment-security-course/Module1VideoPlayer';
import ClientOnly from '@/components/ClientOnly';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  ArrowLeft,
  ChevronRight,
  BookOpen,
  AlertTriangle,
  Shield,
  CheckCircle,
  Trophy,
  TrendingDown,
  Users,
  Zap,
  Lock,
  DollarSign,
  Repeat,
  Briefcase,
  Smartphone,
  Clock,
  Target,
  Brain,
  Sparkles,
  Layers,
  PlayCircle
} from 'lucide-react';

interface FraudType {
  id: string;
  title: string;
  icon: ReactElement;
  description: string;
  lessons: {
    id: string;
    title: string;
    type: 'video' | 'interactive' | 'quiz';
    xp: number;
  }[];
  color: string;
  warningSignals: string[];
  realWorldExample: string;
}

export default function IntermediateFraudsPage() {
  const { t } = useTranslation('courses.intermediate-frauds');
  const [currentSection, setCurrentSection] = useState<'overview' | 'fraudTypes' | 'simulator' | 'quiz'>('overview');
  const [selectedFraud, setSelectedFraud] = useState<string | null>(null);
  
  // Track engagement and XP
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [currentXP, setCurrentXP] = useState(0);
  const [showXPAnimation, setShowXPAnimation] = useState(false);

  const fraudTypes: FraudType[] = [
    {
      id: 'ponzi-schemes',
      title: 'Ponzi Schemes',
      icon: <TrendingDown className="w-6 h-6" />,
      description: 'Investment scams where returns for existing investors are generated using new investors\' money.',
      lessons: [
        { id: 'ponzi-video', title: 'How Ponzi Schemes Work', type: 'video', xp: 20 },
        { id: 'ponzi-interactive', title: 'Identify Ponzi Red Flags', type: 'interactive', xp: 25 },
        { id: 'ponzi-quiz', title: 'Ponzi Scheme Quiz', type: 'quiz', xp: 15 }
      ],
      color: 'orange',
      warningSignals: [
        'Guaranteed high returns with no risk',
        'Consistent returns regardless of market conditions',
        'Difficulty withdrawing funds',
        'Pressure to recruit new investors'
      ],
      realWorldExample: 'Saradha Group Scam (2013) - ₹2,500 crores, 1.7 million victims'
    },
    {
      id: 'pump-dump',
      title: 'Pump & Dump Schemes',
      icon: <Zap className="w-6 h-6" />,
      description: 'Artificially inflating stock prices through false promotions, then selling at peak.',
      lessons: [
        { id: 'pump-video', title: 'The Pump & Dump Process', type: 'video', xp: 20 },
        { id: 'pump-interactive', title: 'Spot Social Media Pumps', type: 'interactive', xp: 25 },
        { id: 'pump-quiz', title: 'Pump & Dump Detection Quiz', type: 'quiz', xp: 15 }
      ],
      color: 'yellow',
      warningSignals: [
        'Sudden price spikes with no news',
        'Heavy social media promotion',
        'Claims of "guaranteed" profits',
        'Pressure to buy immediately'
      ],
      realWorldExample: 'Wolf of Wall Street - Jordan Belfort manipulated penny stocks'
    },
    {
      id: 'digital-frauds',
      title: 'Digital & Cyber Frauds',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Online scams using fake apps, phishing, and deepfakes to steal money.',
      lessons: [
        { id: 'digital-video', title: 'Common Digital Frauds', type: 'video', xp: 20 },
        { id: 'digital-interactive', title: 'Identify Fake Trading Apps', type: 'interactive', xp: 25 },
        { id: 'digital-quiz', title: 'Digital Safety Quiz', type: 'quiz', xp: 15 }
      ],
      color: 'green',
      warningSignals: [
        'Unsolicited messages with investment tips',
        'Apps not on official app stores',
        'Requests for passwords or OTPs',
        'Fake celebrity endorsements'
      ],
      realWorldExample: 'Fake trading apps scammed investors of ₹500+ crores in 2023'
    },
    {
      id: 'advance-fee',
      title: 'Advance Fee Frauds',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'Scams requiring upfront payment for promised large returns or services.',
      lessons: [
        { id: 'fee-video', title: 'Understanding Advance Fee Fraud', type: 'video', xp: 20 },
        { id: 'fee-interactive', title: 'Red Flags Detection', type: 'interactive', xp: 25 },
        { id: 'fee-quiz', title: 'Advance Fee Quiz', type: 'quiz', xp: 15 }
      ],
      color: 'teal',
      warningSignals: [
        'Upfront fees for "processing" or "taxes"',
        'Promise of large inheritance or lottery wins',
        'Urgency and secrecy demanded',
        'Poor grammar in communications'
      ],
      realWorldExample: 'Nigerian Prince scams evolved into sophisticated investment frauds'
    },
    {
      id: 'broker-fraud',
      title: 'Broker & Advisor Frauds',
      icon: <Briefcase className="w-6 h-6" />,
      description: 'Unauthorized trading, churning accounts, and fake advisor scams.',
      lessons: [
        { id: 'broker-video', title: 'Types of Broker Fraud', type: 'video', xp: 20 },
        { id: 'broker-interactive', title: 'Verify Your Advisor', type: 'interactive', xp: 25 },
        { id: 'broker-quiz', title: 'Broker Fraud Quiz', type: 'quiz', xp: 15 }
      ],
      color: 'indigo',
      warningSignals: [
        'Excessive trading in your account',
        'Unregistered advisors',
        'Guaranteed return promises',
        'Pressure to invest in specific products'
      ],
      realWorldExample: 'Karvy Stock Broking misused ₹2,000+ crores of client securities'
    }
  ];

  const lessonProgress = useMemo(() => {
    const totalActivities = fraudTypes.length * 3; // 3 lessons per fraud type
    const completedCount = completedActivities.size;
    return Math.round((completedCount / totalActivities) * 100);
  }, [completedActivities, fraudTypes.length]);

  // Load existing progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await fetch('/api/lessons/interactions?lessonId=intermediate-frauds');
        if (response.ok) {
          const data = await response.json();
          setCurrentXP(data.totalXpEarned || 0);
          setCompletedActivities(new Set(data.completedActivities || []));
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    };

    loadProgress();
  }, []);

  const addXP = async (amount: number, activityId: string) => {
    if (completedActivities.has(activityId)) return;
    
    try {
      const response = await fetch('/api/lessons/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: 'intermediate-frauds',
          interactionId: activityId,
          xpEarned: amount,
          interactionType: activityId.includes('quiz') ? 'QUIZ' : 'DECISION',
          response: 'completed',
          isCorrect: true,
        }),
      });

      if (response.ok) {
        setCompletedActivities(prev => new Set([...prev, activityId]));
        setCurrentXP(prev => prev + amount);
        setShowXPAnimation(true);
        setTimeout(() => setShowXPAnimation(false), 2000);
      }
    } catch (error) {
      console.error('Failed to save XP:', error);
      // Still update UI optimistically
      setCompletedActivities(prev => new Set([...prev, activityId]));
      setCurrentXP(prev => prev + amount);
      setShowXPAnimation(true);
      setTimeout(() => setShowXPAnimation(false), 2000);
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; light: string }> = {
      orange: { 
        bg: 'bg-orange-500', 
        border: 'border-orange-500', 
        text: 'text-orange-600', 
        light: 'bg-orange-50' 
      },
      yellow: { 
        bg: 'bg-yellow-500', 
        border: 'border-yellow-500', 
        text: 'text-yellow-600', 
        light: 'bg-yellow-50' 
      },
      green: { 
        bg: 'bg-green-500', 
        border: 'border-green-500', 
        text: 'text-green-600', 
        light: 'bg-green-50' 
      },
      teal: {
        bg: 'bg-teal-500',
        border: 'border-teal-500',
        text: 'text-teal-600',
        light: 'bg-teal-50'
      },
      indigo: {
        bg: 'bg-indigo-500',
        border: 'border-indigo-500',
        text: 'text-indigo-600',
        light: 'bg-indigo-50'
      }
    };
    return colors[color] || colors.orange;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/investment-security-course"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <p className="text-xs text-gray-500">Module 2</p>
                <h1 className="text-lg font-semibold">Common Investment Frauds</h1>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden md:flex items-center gap-4">
              <div className="w-48">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{lessonProgress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${lessonProgress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm relative">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>{currentXP} XP</span>
                {showXPAnimation && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-6 left-0 text-green-500 font-bold text-sm pointer-events-none"
                  >
                    +XP
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setCurrentSection('overview')}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Overview
              </div>
            </button>
            <button
              onClick={() => setCurrentSection('fraudTypes')}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'fraudTypes'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Fraud Types
              </div>
            </button>
            <button
              onClick={() => setCurrentSection('simulator')}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'simulator'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Simulator
              </div>
            </button>
            <button
              onClick={() => setCurrentSection('quiz')}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'quiz'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Quiz
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {currentSection === 'overview' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Module Overview</h2>
            
            {/* Module Introduction Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                Common Investment Frauds in India
              </h3>
              <p className="text-gray-700 mb-4">
                This comprehensive module covers the most common investment frauds targeting Indian investors. 
                Learn to identify, understand, and protect yourself from these sophisticated scams that have 
                caused losses worth thousands of crores.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">What You'll Learn:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• 5 major types of investment frauds</li>
                    <li>• Red flags and warning signals</li>
                    <li>• Real-world case studies</li>
                    <li>• Protection strategies</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Module Stats:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Duration: 3 hours</li>
                    <li>• Total XP: 300</li>
                    <li>• 15 interactive lessons</li>
                    <li>• Difficulty: Intermediate</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Navigation to Fraud Types */}
            <h3 className="text-xl font-semibold mb-4">Fraud Types Covered</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {fraudTypes.map((fraud) => {
                const colors = getColorClasses(fraud.color);
                return (
                  <motion.div
                    key={fraud.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setCurrentSection('fraudTypes');
                      setSelectedFraud(fraud.id);
                    }}
                    className={`p-4 border-2 ${colors.border} ${colors.light} rounded-lg cursor-pointer transition-all`}
                  >
                    <div className={`flex items-center gap-3 mb-2 ${colors.text}`}>
                      {fraud.icon}
                      <h4 className="font-semibold">{fraud.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{fraud.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Start Learning Button */}
            <div className="text-center">
              <button
                onClick={() => setCurrentSection('fraudTypes')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Learning
                <ChevronRight className="inline-block ml-2 w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {currentSection === 'fraudTypes' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Detailed Fraud Analysis</h2>
            
            {/* Fraud Type Selector */}
            <div className="flex flex-wrap gap-2 mb-8">
              {fraudTypes.map((fraud) => {
                const colors = getColorClasses(fraud.color);
                return (
                  <button
                    key={fraud.id}
                    onClick={() => setSelectedFraud(fraud.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedFraud === fraud.id
                        ? `${colors.bg} text-white`
                        : `${colors.light} ${colors.text} border ${colors.border}`
                    }`}
                  >
                    {fraud.title}
                  </button>
                );
              })}
            </div>

            {/* Selected Fraud Type Details */}
            {selectedFraud && (() => {
              const fraud = fraudTypes.find(f => f.id === selectedFraud);
              if (!fraud) return null;
              const colors = getColorClasses(fraud.color);
              
              return (
                <div className="space-y-6">
                  {/* Fraud Header */}
                  <div className={`${colors.light} rounded-lg p-6 border ${colors.border}`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${colors.bg} text-white rounded-lg`}>
                        {fraud.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{fraud.title}</h3>
                        <p className="text-gray-700">{fraud.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Warning Signals */}
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      Warning Signals
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {fraud.warningSignals.map((signal, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{signal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Real World Example */}
                  <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5 text-yellow-600" />
                      Real World Example
                    </h4>
                    <p className="text-gray-700">{fraud.realWorldExample}</p>
                  </div>

                  {/* Interactive Lessons */}
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold mb-4">Interactive Lessons</h4>
                    <div className="space-y-3">
                      {fraud.lessons.map((lesson) => {
                        const isCompleted = completedActivities.has(`${fraud.id}-${lesson.id}`);
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => addXP(lesson.xp, `${fraud.id}-${lesson.id}`)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              isCompleted
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {lesson.type === 'video' && <PlayCircle className="w-5 h-5 text-blue-500" />}
                                {lesson.type === 'interactive' && <Brain className="w-5 h-5 text-purple-500" />}
                                {lesson.type === 'quiz' && <Target className="w-5 h-5 text-orange-500" />}
                                <div>
                                  <p className="font-medium">{lesson.title}</p>
                                  <p className="text-xs text-gray-500">+{lesson.xp} XP</p>
                                </div>
                              </div>
                              {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {!selectedFraud && (
              <div className="text-center py-12">
                <p className="text-gray-500">Select a fraud type above to learn more</p>
              </div>
            )}
          </motion.div>
        )}

        {currentSection === 'simulator' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Fraud Detection Simulator</h2>
            <FraudSimulator />
          </div>
        )}

        {currentSection === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Module 2 Quiz</h2>
              <p className="text-gray-600 mb-8">Test your knowledge of common investment frauds</p>
              
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Quiz coming soon!</p>
                <p className="text-sm text-gray-400 mt-2">Complete all fraud type lessons first</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

