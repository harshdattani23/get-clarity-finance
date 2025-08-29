"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import type { JSX } from 'react';

import { 
  Shield, 
  AlertTriangle, 
  TrendingDown, 
  Users, 
  Zap, 
  Lock,
  PlayCircle,
  Trophy,
  Target,
  Brain,
  CheckCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Award,
  BookOpen,
  MessageSquareWarning,
  DollarSign,
  Repeat,
  Briefcase
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  progress: number;
  locked: boolean;
  lessons: {
    id: string;
    title: string;
    type: 'video' | 'interactive' | 'quiz' | 'case-study';
    completed: boolean;
  }[];
  color: string;
}

interface FetchedModule {
  id: string;
  slug: string;
  locked: boolean;
  progress: string;
}

const FraudAwarenessCoursePage: NextPage = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'intro-to-frauds',
      title: 'Introduction to Stock Market Frauds',
      description: 'Learn about common fraud patterns and red flags in the Indian stock market',
      icon: <AlertTriangle className="w-6 h-6" />,
      duration: '45 mins',
      difficulty: 'Beginner',
      xpReward: 100,
      progress: 0,
      locked: false,
      lessons: [
        { id: 'what-is-fraud', title: 'What is Securities Fraud?', type: 'video', completed: false },
        { id: 'common-patterns', title: 'Common Fraud Patterns', type: 'interactive', completed: false },
        { id: 'red-flags', title: 'Spot the Red Flags', type: 'quiz', completed: false },
        { id: 'sebi-role', title: "SEBI's Role in Protection", type: 'video', completed: false },
        { id: 'satyam-scam', title: 'The Satyam Saga: Uncovering Corporate Fraud', type: 'case-study', completed: false },
        { id: 'harshad-mehta-scam', title: 'Harshad Mehta: The 1992 Securities Scam', type: 'case-study', completed: false }
      ],
      color: 'red'
    },
    {
      id: 'ponzi-schemes',
      title: 'Ponzi & Pyramid Schemes',
      description: 'Understand how Ponzi schemes work and how to identify them',
      icon: <TrendingDown className="w-6 h-6" />,
      duration: '60 mins',
      difficulty: 'Intermediate',
      xpReward: 150,
      progress: 0,
      locked: true,
      lessons: [
        { id: 'ponzi-mechanics', title: 'How Ponzi Schemes Work', type: 'interactive', completed: false },
        { id: 'famous-cases', title: 'Famous Indian Cases', type: 'case-study', completed: false },
        { id: 'pyramid-vs-ponzi', title: 'Pyramid vs Ponzi', type: 'video', completed: false },
        { id: 'identify-ponzi', title: 'Identify the Scheme', type: 'quiz', completed: false }
      ],
      color: 'orange'
    },
    {
      id: 'pump-dump',
      title: 'Pump & Dump Operations',
      description: 'Learn how operators manipulate stock prices and how to avoid being trapped',
      icon: <Zap className="w-6 h-6" />,
      duration: '55 mins',
      difficulty: 'Intermediate',
      xpReward: 150,
      progress: 0,
      locked: true,
      lessons: [
        { id: 'pump-mechanics', title: 'The Pump Phase', type: 'interactive', completed: false },
        { id: 'dump-phase', title: 'The Dump Phase', type: 'video', completed: false },
        { id: 'social-media-pumps', title: 'Social Media Manipulation', type: 'case-study', completed: false },
        { id: 'protect-yourself', title: 'Protection Strategies', type: 'quiz', completed: false }
      ],
      color: 'yellow'
    },
    {
      id: 'insider-trading',
      title: 'Insider Trading & Market Manipulation',
      description: 'Understand illegal insider trading and market manipulation tactics',
      icon: <Lock className="w-6 h-6" />,
      duration: '50 mins',
      difficulty: 'Advanced',
      xpReward: 200,
      progress: 0,
      locked: true,
      lessons: [
        { id: 'what-is-insider', title: 'Understanding Insider Trading', type: 'video', completed: false },
        { id: 'manipulation-tactics', title: 'Market Manipulation Tactics', type: 'interactive', completed: false },
        { id: 'real-cases', title: 'Case Studies', type: 'case-study', completed: false },
        { id: 'circular-trading', title: 'Circular Trading Explained', type: 'case-study', completed: false },
        { id: 'legal-consequences', title: 'Legal Consequences', type: 'quiz', completed: false }
      ],
      color: 'purple'
    },
    {
      id: 'fake-advisors',
      title: 'Fake Investment Advisors',
      description: 'Identify unregistered advisors and tip providers',
      icon: <Users className="w-6 h-6" />,
      duration: '40 mins',
      difficulty: 'Beginner',
      xpReward: 100,
      progress: 0,
      locked: false,
      lessons: [
        { id: 'registered-vs-fake', title: 'SEBI Registered vs Fake', type: 'interactive', completed: false },
        { id: 'verify-advisor', title: 'How to Verify Advisors', type: 'video', completed: false },
        { id: 'telegram-scams', title: 'Telegram & WhatsApp Scams', type: 'case-study', completed: false },
        { id: 'test-knowledge', title: 'Test Your Knowledge', type: 'quiz', completed: false }
      ],
      color: 'blue'
    },
    {
      id: 'digital-frauds',
      title: 'Digital & Cyber Frauds',
      description: 'Protect yourself from phishing, fake apps, and digital scams',
      icon: <Shield className="w-6 h-6" />,
      duration: '45 mins',
      difficulty: 'Intermediate',
      xpReward: 150,
      progress: 0,
      locked: true,
      lessons: [
        { id: 'phishing-attacks', title: 'Phishing Attacks', type: 'interactive', completed: false },
        { id: 'fake-trading-apps', title: 'Fake Trading Apps', type: 'video', completed: false },
        { id: 'deepfake-scams', title: 'Deepfake Investment Scams', type: 'case-study', completed: false },
        { id: 'digital-safety', title: 'Digital Safety Quiz', type: 'quiz', completed: false }
      ],
      color: 'green'
    },
    {
      id: 'advanced-fee-schemes',
      title: 'Advanced Fee & High-Yield Schemes',
      description: 'Learn to identify schemes that promise high returns for a small upfront fee.',
      icon: <DollarSign className="w-6 h-6" />,
      duration: '45 mins',
      difficulty: 'Intermediate',
      xpReward: 150,
      progress: 0,
      locked: true,
      lessons: [
        { id: 'advance-fee-intro', title: 'Understanding Advance Fee Fraud', type: 'video', completed: false },
        { id: 'high-yield-red-flags', title: 'Red Flags of High-Yield Scams', type: 'interactive', completed: false },
        { id: 'case-study-advance-fee', title: 'Case Study: The Nigerian Prince Scam (Finance Edition)', type: 'case-study', completed: false },
        { id: 'quiz-advance-fee', title: 'Quiz: Identify the Scheme', type: 'quiz', completed: false }
      ],
      color: 'teal'
    },
    {
      id: 'spoofing-wash-trading',
      title: 'Spoofing & Wash Trading',
      description: 'Understand complex manipulations like fake orders and artificial volume.',
      icon: <Repeat className="w-6 h-6" />,
      duration: '60 mins',
      difficulty: 'Advanced',
      xpReward: 200,
      progress: 0,
      locked: true,
      lessons: [
        { id: 'spoofing-intro', title: 'What is Spoofing?', type: 'video', completed: false },
        { id: 'wash-trading-intro', title: 'What is Wash Trading?', type: 'video', completed: false },
        { id: 'market-data-analysis', title: 'Analyzing Market Data for Manipulation', type: 'interactive', completed: false },
        { id: 'quiz-market-manipulation', title: 'Quiz: Spot the Manipulation', type: 'quiz', completed: false }
      ],
      color: 'cyan'
    },
    {
      id: 'broker-fraud',
      title: 'Broker-Related Fraud',
      description: 'Learn about churning, embezzlement, and other broker-related risks.',
      icon: <Briefcase className="w-6 h-6" />,
      duration: '50 mins',
      difficulty: 'Intermediate',
      xpReward: 150,
      progress: 0,
      locked: true,
      lessons: [
        { id: 'churning-intro', title: 'Understanding Account Churning', type: 'video', completed: false },
        { id: 'embezzlement-risks', title: 'Broker Embezzlement Risks', type: 'interactive', completed: false },
        { id: 'case-study-broker-fraud', title: 'Case Study: A Broker\'s Betrayal', type: 'case-study', completed: false },
        { id: 'quiz-broker-fraud', title: 'Quiz: Is Your Broker a Fraud?', type: 'quiz', completed: false }
      ],
      color: 'indigo'
    }
  ]);

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [courseStats, setCourseStats] = useState({ totalModules: 6, totalTime: 5 });
  const [showAnimation, setShowAnimation] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    // Simulate loading animation
    setTimeout(() => setShowAnimation(false), 1000);

    const fetchData = async () => {
      try {
        // Fetch stats and modules in parallel
        const [statsRes, modulesRes] = await Promise.all([
          fetch('/api/courses/fraud-awareness/stats'),
          fetch('/api/courses/fraud-awareness/modules'),
        ]);

        if (statsRes.ok) {
          const data = await statsRes.json();
          setTotalXP(data.totalXP);
          setUserLevel(data.userLevel);
          setCourseStats({
            totalModules: data.totalModules,
            totalTime: data.totalTime,
          });
        }

        if (modulesRes.ok) {
          const fetchedModules: FetchedModule[] = await modulesRes.json();
          setModules(currentModules =>
            currentModules.map(module => {
              const fetchedModule = fetchedModules.find(fm => fm.slug === module.id);
              if (fetchedModule) {
                return {
                  ...module,
                  locked: fetchedModule.locked,
                  // Note: progress calculation would also go here if the API provided it
                };
              }
              return module;
            })
          );
        }
      } catch (error) {
        console.error('Failed to fetch course data', error);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedModules = useMemo(() => {
    const difficultyOrder = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
    };

    return modules
      .filter(module => {
        if (activeFilter === 'All') return true;
        return module.difficulty === activeFilter;
      })
      .sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  }, [modules, activeFilter]);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; light: string }> = {
      red: { 
        bg: 'bg-red-500', 
        border: 'border-red-500', 
        text: 'text-red-600', 
        light: 'bg-red-50' 
      },
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
      purple: { 
        bg: 'bg-purple-500', 
        border: 'border-purple-500', 
        text: 'text-purple-600', 
        light: 'bg-purple-50' 
      },
      blue: { 
        bg: 'bg-blue-500', 
        border: 'border-blue-500', 
        text: 'text-blue-600', 
        light: 'bg-blue-50' 
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
      cyan: {
        bg: 'bg-cyan-500',
        border: 'border-cyan-500',
        text: 'text-cyan-600',
        light: 'bg-cyan-50'
      },
      indigo: {
        bg: 'bg-indigo-500',
        border: 'border-indigo-500',
        text: 'text-indigo-600',
        light: 'bg-indigo-50'
      }
    };
    return colors[color] || colors.blue;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-4 h-4" />;
      case 'interactive': return <Sparkles className="w-4 h-4" />;
      case 'quiz': return <Brain className="w-4 h-4" />;
      case 'case-study': return <BookOpen className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#163300] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-lime-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-lime-400 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 pt-12 md:pt-14 pb-20 md:pb-24 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-10 h-10 text-lime-400" />
              <span className="text-lime-400 font-semibold text-sm uppercase tracking-wide">Protect Your Investments</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Fraud Awareness Course
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Master the art of identifying and avoiding stock market frauds with real case studies from SEBI's database
            </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-lime-400" />
                <span className="text-sm text-white/70">Your Level</span>
              </div>
              <p className="text-2xl font-bold">Level {userLevel}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-lime-400" />
                <span className="text-sm text-white/70">Total XP</span>
              </div>
              <p className="text-2xl font-bold">{totalXP} XP</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-lime-400" />
                <span className="text-sm text-white/70">Modules</span>
              </div>
              <p className="text-2xl font-bold">{courseStats.totalModules} Modules</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-lime-400" />
                <span className="text-sm text-white/70">Total Time</span>
              </div>
              <p className="text-2xl font-bold">{courseStats.totalTime} Hours</p>
            </div>
          </div>

          {/* Interactive Elements Preview */}
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-lime-400" />
              Interactive Simulations
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm flex items-center gap-2">
              <MessageSquareWarning className="w-4 h-4 text-lime-400" />
              Case Studies
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-lime-400" />
              Earn Certificates
            </span>
          </div>
        </div>
        </div>
      </div>

      {/* Course Modules */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Course Modules</h2>
          <div className="flex justify-center gap-2">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${ 
                  activeFilter === filter
                    ? 'bg-lime-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedModules.map((module, index) => {
            const colors = getColorClasses(module.color);
            const isAccessible = !module.locked;
            
            return (
              <div
                key={module.id}
                className={`relative group ${!isAccessible ? 'opacity-60' : ''} ${ 
                  showAnimation ? 'animate-fadeIn' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${ 
                    isAccessible ? 'border-gray-200 hover:border-gray-300 cursor-pointer transform transition-all hover:scale-105' : 'border-gray-300'
                  }`}
                  onClick={() => isAccessible && setSelectedModule(module)}
                >
                  {/* Module Header */}
                  <div className={`p-6 ${colors.light}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 bg-gray-100 rounded-lg ${colors.text}`}>
                        {module.icon}
                      </div>
                      {module.locked && (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                    
                    {/* Module Meta */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {module.duration}
                      </span>
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        +{module.xpReward} XP
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${colors.bg} transition-all duration-500`}
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Lessons Preview */}
                    <div className="space-y-2">
                      {module.lessons.slice(0, 3).map((lesson) => (
                        <div key={lesson.id} className="flex items-center gap-2 text-xs text-gray-600">
                          {getLessonIcon(lesson.type)}
                          <span className="truncate">{lesson.title}</span>
                          {lesson.completed && (
                            <CheckCircle className="w-3 h-3 text-green-500 ml-auto" />
                          )}
                        </div>
                      ))}
                      {module.lessons.length > 3 && (
                        <p className="text-xs text-gray-500">+{module.lessons.length - 3} more lessons</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="px-6 py-4 border-t border-gray-200">
                    <button
                      className={`w-full flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2 transition-all transform ${ 
                        isAccessible
                          ? 'bg-lime-400 text-black hover:bg-lime-500 hover:scale-105'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isAccessible}
                    >
                      {module.locked ? (
                        <>Complete previous modules to unlock</>
                      ) : module.progress > 0 ? (
                        <>Continue Learning <ChevronRight className="w-4 h-4" /></>
                      ) : (
                        <>Start Module <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="bg-[#163300] rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-10 right-10 w-32 h-32 bg-lime-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-lime-400 rounded-full blur-3xl opacity-20"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Become Fraud-Proof?</h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Start with the basics and work your way up to advanced fraud detection techniques
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/fraud-awareness-course/intro-to-frauds"
                  className="inline-flex items-center gap-2 bg-lime-400 text-black px-6 py-3 rounded-full font-bold hover:bg-lime-500 transition-all transform hover:scale-105"
                >
                  Start First Lesson
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/sign-up"
                  className="inline-flex items-center gap-2 bg-white text-[#163300] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FraudAwarenessCoursePage;