"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import type { JSX } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

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
  Briefcase,
  Search
} from 'lucide-react';

interface Module {
  id: string;
  title?: string;
  description?: string;
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
  progress: number;
}

const FraudAwarenessCoursePage: NextPage = () => {
  const { t } = useTranslation('fraud-awareness-course');
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'intro-to-frauds',
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
  const [courseStatus, setCourseStatus] = useState('NOT_ENROLLED');
  const [showAnimation, setShowAnimation] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

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
          setCourseStatus(data.courseStatus);
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
                  progress: fetchedModule.progress,
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

  useEffect(() => {
    if (selectedModule) {
      window.location.href = `/fraud-awareness-course/${selectedModule.id}`;
    }
  }, [selectedModule]);

  const filteredAndSortedModules = useMemo(() => {
    const difficultyOrder = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
    };

    return modules
      .filter(module => {
        const title = t(`modules.${module.id}.title`) as string;
        const description = t(`modules.${module.id}.description`) as string;
        const searchMatch =
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase());

        const filterMatch = activeFilter === 'All' || module.difficulty === activeFilter;

        return searchMatch && filterMatch;
      })
      .sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  }, [modules, activeFilter, searchTerm, t]);

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
              <span className="text-lime-400 font-semibold text-sm uppercase tracking-wide">{t('hero.supertitle') as string}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {t('hero.title') as string}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              {t('hero.subtitle') as string}
            </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-lime-400" />
                <span className="text-sm text-white/70">{t('hero.stats.level') as string}</span>
              </div>
              <p className="text-2xl font-bold">Level {userLevel}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-lime-400" />
                <span className="text-sm text-white/70">{t('hero.stats.xp') as string}</span>
              </div>
              <p className="text-2xl font-bold">{totalXP} XP</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-lime-400" />
                <span className="text-sm text-white/70">{t('hero.stats.modules') as string}</span>
              </div>
              <p className="text-2xl font-bold">{courseStats.totalModules} Modules</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-lime-400" />
                <span className="text-sm text-white/70">{t('hero.stats.time') as string}</span>
              </div>
              <p className="text-2xl font-bold">{courseStats.totalTime} Hours</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-lime-400" />
                <span className="text-sm text-white/70">{t('hero.stats.status') as string}</span>
              </div>
              <p className="text-2xl font-bold capitalize">{courseStatus.replace('_', ' ').toLowerCase()}</p>
            </div>
          </div>

          {/* Interactive Elements Preview */}
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-lime-400" />
              {t('hero.previews.simulations') as string}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm flex items-center gap-2">
              <MessageSquareWarning className="w-4 h-4 text-lime-400" />
              {t('hero.previews.cases') as string}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-lime-400" />
              {t('hero.previews.certificates') as string}
            </span>
            <Link
              href="/achievements"
              className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm flex items-center gap-2 text-white hover:bg-white/30 transition-colors"
            >
              <Trophy className="w-4 h-4 text-lime-400" />
              {t('hero.previews.achievements') as string}
            </Link>
          </div>
        </div>
        </div>
      </div>

      {/* Course Modules */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{t('modulesSection.title') as string}</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('filters.search') as string}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full w-64"
              />
            </div>
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
                  {t(`filters.${filter.toLowerCase()}`) as string}
                </button>
              ))}
            </div>
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
                    isAccessible ? 'border-gray-200 hover:border-gray-300' : 'border-gray-300'
                  }`}
                >
                  {/* Module Header */}
                  <div className="p-6 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 bg-gray-100 rounded-lg ${colors.text}`}>
                        {module.icon}
                      </div>
                      {module.locked && (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t(`modules.${module.id}.title`) as string}</h3>
                    <p className="text-sm text-gray-600 mb-4">{t(`modules.${module.id}.description`) as string}</p>
                    
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
                        {(t('module.meta.xp') as string).replace('{xpReward}', module.xpReward.toString())}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{t('module.progress') as string}</span>
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
                        <p className="text-xs text-gray-500">{(t('module.lessons_more') as string).replace('{count}', (module.lessons.length - 3).toString())}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="px-6 py-4 border-t border-gray-200">
                    <button
                      onClick={() => isAccessible && setSelectedModule(module)}
                      className={`w-full flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2 transition-all transform ${ 
                        isAccessible
                          ? 'bg-lime-400 text-black hover:bg-lime-500 hover:scale-105'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isAccessible}
                    >
                      {module.locked ? (
                        <>{t('module.button.unlock_prompt') as string}</>
                      ) : module.progress > 0 ? (
                        <>{t('module.button.continue') as string} <ChevronRight className="w-4 h-4" /></>
                      ) : (
                        <>{t('module.button.start') as string} <ChevronRight className="w-4 h-4" /></>
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
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title') as string}</h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                {t('cta.subtitle') as string}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/fraud-awareness-course/intro-to-frauds"
                  className="inline-flex items-center gap-2 bg-lime-400 text-black px-6 py-3 rounded-full font-bold hover:bg-lime-500 transition-all transform hover:scale-105"
                >
                  {t('cta.start_lesson') as string}
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/sign-up"
                  className="inline-flex items-center gap-2 bg-white text-[#163300] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  {t('cta.create_account') as string}
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