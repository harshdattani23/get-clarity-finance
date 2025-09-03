"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import type { JSX } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import CourseCompletionCertificate from '@/components/certificates/CourseCompletionCertificate';
import { useUser } from '@clerk/nextjs';
import { moduleProgressStore } from '@/lib/module-progress-store';

import { 
  Shield, 
  AlertTriangle, 
  TrendingDown,
  TrendingUp,
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
  Search,
  Cpu,
  BarChart3,
  PieChart,
  Calculator,
  Layers,
  Activity,
  Settings,
  Network,
  Bot,
  Workflow,
  Database,
  LineChart,
  Filter
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
  course: 'fraud_awareness' | 'fundamentals' | 'algorithmic_trading' | 'portfolio_management';
  prerequisites: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: JSX.Element;
  moduleCount: number;
  totalDuration: string;
  difficulty: string;
  certification: string;
}

interface FetchedModule {
  id: string;
  slug: string;
  locked: boolean;
  progress: number;
}

const FinancialSecurityEducationHub: NextPage = () => {
  const { t } = useTranslation('financial-security-education-hub');
  const { user: clerkUser } = useUser();
  
  const [modules, setModules] = useState<Module[]>([
    // Fraud Awareness Modules
    {
      id: 'intro-to-frauds',
      icon: <AlertTriangle className="w-6 h-6" />,
      duration: '45 mins',
      difficulty: 'Beginner',
      xpReward: 100,
      progress: 0,
      locked: false,
      course: 'fraud_awareness',
      prerequisites: [],
      lessons: [
        { id: 'what-is-fraud', title: 'What is Securities Fraud?', type: 'video', completed: false },
        { id: 'common-patterns', title: 'Common Fraud Patterns', type: 'interactive', completed: false },
        { id: 'red-flags', title: 'Spot the Red Flags', type: 'quiz', completed: false },
        { id: 'sebi-role', title: "SEBI's Role in Protection", type: 'video', completed: false },
        { id: 'case-studies', title: 'Major Fraud Case Studies', type: 'case-study', completed: false }
      ],
      color: 'red'
    },
    {
      id: 'ponzi-schemes',
      icon: <TrendingDown className="w-6 h-6" />,
      duration: '60 mins',
      difficulty: 'Beginner',
      xpReward: 150,
      progress: 0,
      locked: true,
      course: 'fraud_awareness',
      prerequisites: ['intro-to-frauds'],
      lessons: [
        { id: 'ponzi-mechanics', title: 'How Ponzi Schemes Work', type: 'interactive', completed: false },
        { id: 'pyramid-vs-ponzi', title: 'Pyramid vs Ponzi Schemes', type: 'video', completed: false },
        { id: 'indian-cases', title: 'Indian Ponzi Scheme Cases', type: 'case-study', completed: false },
        { id: 'detection-quiz', title: 'Ponzi Detection Quiz', type: 'quiz', completed: false }
      ],
      color: 'orange'
    },
    {
      id: 'pump-dump',
      icon: <BarChart3 className="w-6 h-6" />,
      duration: '50 mins',
      difficulty: 'Intermediate',
      xpReward: 150,
      progress: 0,
      locked: true,
      course: 'fraud_awareness',
      prerequisites: ['intro-to-frauds'],
      lessons: [
        { id: 'pump-dump-mechanics', title: 'Pump & Dump Process', type: 'interactive', completed: false },
        { id: 'social-media-role', title: 'Social Media Manipulation', type: 'video', completed: false },
        { id: 'penny-stock-risks', title: 'Penny Stock Scams', type: 'case-study', completed: false },
        { id: 'detection-tools', title: 'Detection Tools & Techniques', type: 'quiz', completed: false }
      ],
      color: 'yellow'
    },
    {
      id: 'insider-trading',
      icon: <Lock className="w-6 h-6" />,
      duration: '70 mins',
      difficulty: 'Advanced',
      xpReward: 200,
      progress: 0,
      locked: true,
      course: 'fraud_awareness',
      prerequisites: ['ponzi-schemes', 'pump-dump'],
      lessons: [
        { id: 'insider-definition', title: 'What is Insider Trading?', type: 'video', completed: false },
        { id: 'manipulation-tactics', title: 'Market Manipulation Tactics', type: 'interactive', completed: false },
        { id: 'circular-trading', title: 'Circular Trading Explained', type: 'case-study', completed: false },
        { id: 'legal-consequences', title: 'Legal Consequences', type: 'quiz', completed: false }
      ],
      color: 'purple'
    },
    {
      id: 'advanced-market-manipulation',
      icon: <Network className="w-6 h-6" />,
      duration: '90 mins',
      difficulty: 'Advanced',
      xpReward: 300,
      progress: 0,
      locked: true,
      course: 'fraud_awareness',
      prerequisites: ['insider-trading', 'spoofing-wash-trading', 'broker-fraud'],
      lessons: [
        { id: 'sophisticated-schemes', title: 'Sophisticated Market Manipulation', type: 'interactive', completed: false },
        { id: 'cross-border-frauds', title: 'Cross-Border Investment Scams', type: 'case-study', completed: false },
        { id: 'ai-powered-frauds', title: 'AI-Powered Market Manipulation', type: 'video', completed: false },
        { id: 'professional-detection', title: 'Professional Detection Techniques', type: 'quiz', completed: false }
      ],
      color: 'indigo'
    },

    // Stock Market Fundamentals
    {
      id: 'stock-market-fundamentals',
      icon: <PieChart className="w-6 h-6" />,
      duration: '2 hours',
      difficulty: 'Beginner',
      xpReward: 200,
      progress: 0,
      locked: false,
      course: 'fundamentals',
      prerequisites: [],
      lessons: [
        { id: 'what-is-stock', title: 'What is a Stock?', type: 'video', completed: false },
        { id: 'stock-types', title: 'Types of Stocks', type: 'interactive', completed: false },
        { id: 'market-mechanics', title: 'How Markets Work', type: 'video', completed: false },
        { id: 'trading-basics', title: 'Trading Basics', type: 'quiz', completed: false }
      ],
      color: 'blue'
    },
    {
      id: 'fundamental-analysis',
      icon: <Calculator className="w-6 h-6" />,
      duration: '3 hours',
      difficulty: 'Intermediate',
      xpReward: 250,
      progress: 0,
      locked: true,
      course: 'fundamentals',
      prerequisites: ['stock-market-fundamentals'],
      lessons: [
        { id: 'financial-statements', title: 'Reading Financial Statements', type: 'interactive', completed: false },
        { id: 'ratio-analysis', title: 'Financial Ratio Analysis', type: 'video', completed: false },
        { id: 'valuation-methods', title: 'Company Valuation', type: 'case-study', completed: false },
        { id: 'analysis-quiz', title: 'Fundamental Analysis Quiz', type: 'quiz', completed: false }
      ],
      color: 'green'
    },
    {
      id: 'technical-analysis',
      icon: <LineChart className="w-6 h-6" />,
      duration: '2.5 hours',
      difficulty: 'Intermediate',
      xpReward: 250,
      progress: 0,
      locked: true,
      course: 'fundamentals',
      prerequisites: ['stock-market-fundamentals'],
      lessons: [
        { id: 'chart-patterns', title: 'Chart Pattern Recognition', type: 'interactive', completed: false },
        { id: 'technical-indicators', title: 'Technical Indicators', type: 'video', completed: false },
        { id: 'support-resistance', title: 'Support & Resistance', type: 'video', completed: false },
        { id: 'technical-quiz', title: 'Technical Analysis Quiz', type: 'quiz', completed: false }
      ],
      color: 'teal'
    },
    {
      id: 'risk-management-basics',
      icon: <Shield className="w-6 h-6" />,
      duration: '2 hours',
      difficulty: 'Intermediate',
      xpReward: 200,
      progress: 0,
      locked: true,
      course: 'fundamentals',
      prerequisites: ['fundamental-analysis', 'technical-analysis'],
      lessons: [
        { id: 'position-sizing', title: 'Position Sizing Strategies', type: 'interactive', completed: false },
        { id: 'stop-losses', title: 'Stop Loss Orders', type: 'video', completed: false },
        { id: 'trading-psychology', title: 'Trading Psychology', type: 'video', completed: false },
        { id: 'risk-quiz', title: 'Risk Management Quiz', type: 'quiz', completed: false }
      ],
      color: 'cyan'
    },

    // Algorithmic Trading
    {
      id: 'algorithmic-trading-foundations',
      icon: <Cpu className="w-6 h-6" />,
      duration: '4 hours',
      difficulty: 'Advanced',
      xpReward: 400,
      progress: 0,
      locked: true,
      course: 'algorithmic_trading',
      prerequisites: ['risk-management-basics'],
      lessons: [
        { id: 'algo-intro', title: 'Introduction to Algorithmic Trading', type: 'video', completed: false },
        { id: 'market-microstructure', title: 'Market Microstructure', type: 'interactive', completed: false },
        { id: 'trading-infrastructure', title: 'Trading Infrastructure', type: 'video', completed: false },
        { id: 'programming-basics', title: 'Programming for Trading', type: 'interactive', completed: false }
      ],
      color: 'blue'
    },
    {
      id: 'hft-strategies',
      icon: <Zap className="w-6 h-6" />,
      duration: '5 hours',
      difficulty: 'Advanced',
      xpReward: 500,
      progress: 0,
      locked: true,
      course: 'algorithmic_trading',
      prerequisites: ['algorithmic-trading-foundations'],
      lessons: [
        { id: 'hft-intro', title: 'High-Frequency Trading Basics', type: 'video', completed: false },
        { id: 'market-making', title: 'Market Making Strategies', type: 'interactive', completed: false },
        { id: 'arbitrage-strategies', title: 'Arbitrage Techniques', type: 'case-study', completed: false },
        { id: 'latency-optimization', title: 'Latency Optimization', type: 'video', completed: false }
      ],
      color: 'purple'
    },
    {
      id: 'machine-learning-trading',
      icon: <Bot className="w-6 h-6" />,
      duration: '6 hours',
      difficulty: 'Advanced',
      xpReward: 600,
      progress: 0,
      locked: true,
      course: 'algorithmic_trading',
      prerequisites: ['quantitative-strategy-development'],
      lessons: [
        { id: 'ml-basics', title: 'Machine Learning Fundamentals', type: 'video', completed: false },
        { id: 'feature-engineering', title: 'Feature Engineering', type: 'interactive', completed: false },
        { id: 'deep-learning', title: 'Deep Learning Applications', type: 'case-study', completed: false },
        { id: 'nlp-trading', title: 'NLP for Trading', type: 'interactive', completed: false }
      ],
      color: 'indigo'
    },

    // Portfolio Management
    {
      id: 'investment-philosophy',
      icon: <TrendingUp className="w-6 h-6" />,
      duration: '3 hours',
      difficulty: 'Intermediate',
      xpReward: 300,
      progress: 0,
      locked: true,
      course: 'portfolio_management',
      prerequisites: ['risk-management-basics'],
      lessons: [
        { id: 'investment-principles', title: 'Investment Principles', type: 'video', completed: false },
        { id: 'portfolio-theory', title: 'Modern Portfolio Theory', type: 'interactive', completed: false },
        { id: 'diversification', title: 'Diversification Strategies', type: 'video', completed: false },
        { id: 'asset-allocation', title: 'Asset Allocation Models', type: 'quiz', completed: false }
      ],
      color: 'green'
    },
    {
      id: 'investment-vehicles',
      icon: <Layers className="w-6 h-6" />,
      duration: '4 hours',
      difficulty: 'Intermediate',
      xpReward: 350,
      progress: 0,
      locked: true,
      course: 'portfolio_management',
      prerequisites: ['investment-philosophy'],
      lessons: [
        { id: 'mutual-funds', title: 'Mutual Funds Deep Dive', type: 'video', completed: false },
        { id: 'etfs', title: 'Exchange-Traded Funds', type: 'interactive', completed: false },
        { id: 'bonds', title: 'Fixed Income Securities', type: 'video', completed: false },
        { id: 'alternatives', title: 'Alternative Investments', type: 'case-study', completed: false }
      ],
      color: 'teal'
    },
    {
      id: 'professional-wealth-management',
      icon: <Briefcase className="w-6 h-6" />,
      duration: '3 hours',
      difficulty: 'Advanced',
      xpReward: 400,
      progress: 0,
      locked: true,
      course: 'portfolio_management',
      prerequisites: ['financial-planning'],
      lessons: [
        { id: 'advisory-practice', title: 'Building Advisory Practice', type: 'video', completed: false },
        { id: 'sebi-compliance', title: 'SEBI Compliance', type: 'interactive', completed: false },
        { id: 'client-management', title: 'Client Relationship Management', type: 'case-study', completed: false },
        { id: 'professional-ethics', title: 'Professional Ethics', type: 'quiz', completed: false }
      ],
      color: 'purple'
    }
  ]);

  const [courses] = useState<Course[]>([
    {
      id: 'fraud_awareness',
      title: 'Fraud Awareness & Protection',
      description: 'Complete protection against financial frauds and market manipulation',
      color: 'red',
      icon: <Shield className="w-8 h-8" />,
      moduleCount: 10,
      totalDuration: '12-16 hours',
      difficulty: 'Beginner to Advanced',
      certification: 'Fraud Detection Specialist'
    },
    {
      id: 'fundamentals',
      title: 'Stock Market Fundamentals',
      description: 'Essential foundation for all trading and investment activities',
      color: 'blue',
      icon: <PieChart className="w-8 h-8" />,
      moduleCount: 4,
      totalDuration: '8-12 hours',
      difficulty: 'Beginner to Intermediate',
      certification: 'Market Fundamentals Certificate'
    },
    {
      id: 'algorithmic_trading',
      title: 'High-Frequency & Algorithmic Trading',
      description: 'Advanced trading technology and quantitative methods',
      color: 'purple',
      icon: <Cpu className="w-8 h-8" />,
      moduleCount: 6,
      totalDuration: '20-30 hours',
      difficulty: 'Advanced',
      certification: 'Algorithmic Trading Professional'
    },
    {
      id: 'portfolio_management',
      title: 'Investment & Portfolio Management',
      description: 'Professional wealth management and long-term investing',
      color: 'green',
      icon: <TrendingUp className="w-8 h-8" />,
      moduleCount: 6,
      totalDuration: '15-25 hours',
      difficulty: 'Intermediate to Advanced',
      certification: 'Portfolio Management Professional'
    }
  ]);

  const [totalXP, setTotalXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [courseStats, setCourseStats] = useState({ totalModules: 26, totalTime: 55 });
  const [showAnimation, setShowAnimation] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCourseFilter, setActiveCourseFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => setShowAnimation(false), 1000);
    // Fetch user progress and update modules
  }, [clerkUser]);

  const filteredAndSortedModules = useMemo(() => {
    const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };

    return modules
      .filter(module => {
        const title = t(`modules.${module.id}.title`) as string;
        const description = t(`modules.${module.id}.description`) as string;
        
        const searchMatch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const difficultyMatch = activeFilter === 'all' || 
                               module.difficulty.toLowerCase() === activeFilter;
        
        const courseMatch = activeCourseFilter === 'all' || 
                           module.course === activeCourseFilter;

        return searchMatch && difficultyMatch && courseMatch;
      })
      .sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  }, [modules, activeFilter, activeCourseFilter, searchTerm, t]);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; light: string }> = {
      red: { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-600', light: 'bg-red-50' },
      orange: { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
      yellow: { bg: 'bg-yellow-500', border: 'border-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' },
      purple: { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
      blue: { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
      green: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-600', light: 'bg-green-50' },
      teal: { bg: 'bg-teal-500', border: 'border-teal-500', text: 'text-teal-600', light: 'bg-teal-50' },
      cyan: { bg: 'bg-cyan-500', border: 'border-cyan-500', text: 'text-cyan-600', light: 'bg-cyan-50' },
      indigo: { bg: 'bg-indigo-500', border: 'border-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-50' }
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
              <span className="text-lime-400 font-semibold text-sm uppercase tracking-wide">
                {t('hero.supertitle') as string}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {t('hero.title') as string}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl">
              {t('hero.subtitle') as string}
            </p>

            {/* Course Categories Preview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {courses.map((course) => {
                const colors = getColorClasses(course.color);
                return (
                  <div key={course.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${colors.light}`}>
                        <div className={colors.text}>{course.icon}</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{course.title}</p>
                        <p className="text-xs text-white/70">{course.moduleCount} Modules</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Elements Preview */}
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lime-400" />
                {t('hero.previews.simulations') as string}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm flex items-center gap-2">
                <Bot className="w-4 h-4 text-lime-400" />
                {t('hero.previews.trading') as string}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm flex items-center gap-2">
                <PieChart className="w-4 h-4 text-lime-400" />
                {t('hero.previews.portfolio') as string}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-lime-400" />
                {t('hero.previews.certificates') as string}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Categories Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('coursesSection.title') as string}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('coursesSection.subtitle') as string}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {courses.map((course) => {
            const colors = getColorClasses(course.color);
            const moduleCount = modules.filter(m => m.course === course.id).length;
            
            return (
              <div key={course.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all p-6 group hover:scale-105">
                <div className={`p-4 rounded-lg ${colors.light} mb-4 group-hover:scale-110 transition-transform`}>
                  <div className={colors.text}>{course.icon}</div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Modules:</span>
                    <span className="font-medium">{moduleCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{course.totalDuration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Level:</span>
                    <span className="font-medium">{course.difficulty}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveCourseFilter(course.id)}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                    activeCourseFilter === course.id
                      ? `${colors.bg} text-white`
                      : `${colors.light} ${colors.text} hover:${colors.bg} hover:text-white`
                  }`}
                >
                  View Modules
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters and Modules */}
      <div className="container mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{t('modulesSection.title') as string}</h2>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
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

            {/* Course Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveCourseFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCourseFilter === 'all'
                    ? 'bg-lime-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t('filters.all') as string}
              </button>
              <button
                onClick={() => setActiveCourseFilter('fraud_awareness')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCourseFilter === 'fraud_awareness'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Fraud Awareness
              </button>
              <button
                onClick={() => setActiveCourseFilter('algorithmic_trading')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCourseFilter === 'algorithmic_trading'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Algo Trading
              </button>
              <button
                onClick={() => setActiveCourseFilter('portfolio_management')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCourseFilter === 'portfolio_management'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Portfolio Mgmt
              </button>
            </div>

            {/* Difficulty Filter */}
            <div className="flex gap-2">
              {['all', 'beginner', 'intermediate', 'advanced'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeFilter === filter
                      ? 'bg-lime-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t(`filters.${filter}`) as string}
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
                <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
                  isAccessible ? 'border-gray-200 hover:border-gray-300' : 'border-gray-300'
                }`}>
                  {/* Module Header */}
                  <div className="p-6 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 bg-gray-100 rounded-lg ${colors.text}`}>
                        {module.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        {module.progress === 100 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-700 font-medium">Complete</span>
                          </div>
                        )}
                        {module.locked && (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {t(`modules.${module.id}.title`) as string}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {t(`modules.${module.id}.description`) as string}
                    </p>
                    
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
                        <p className="text-xs text-gray-500">+{module.lessons.length - 3} more lessons</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="px-6 py-4 border-t border-gray-200">
                    <button
                onClick={() => isAccessible && window.open(`/investment-security-course/${module.id}`, '_self')}
                      className={`w-full flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2 transition-all transform ${
                        isAccessible
                          ? 'bg-lime-400 text-black hover:bg-lime-500 hover:scale-105'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!isAccessible}
                    >
                      {module.locked ? (
                        <>Complete prerequisites to unlock</>
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
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title') as string}</h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                {t('cta.subtitle') as string}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/investment-security-course/intro-to-frauds"
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
      
      {/* Certificate Modal */}
      {showCertificate && certificateData && (
        <CourseCompletionCertificate
          userName={certificateData.userName}
          courseName={certificateData.courseName}
          completionDate={certificateData.completionDate}
          totalXP={certificateData.totalXP}
          moduleCount={certificateData.moduleCount}
          completedModules={certificateData.completedModules}
          certificateId={certificateData.id}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default FinancialSecurityEducationHub;


