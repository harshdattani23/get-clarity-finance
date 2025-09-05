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
  DollarSign,
  TrendingUp,
  Shield, 
  Calculator,
  PieChart,
  BarChart3,
  Building2,
  Landmark,
  Target,
  Trophy,
  Lock,
  PlayCircle,
  CheckCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Award,
  BookOpen,
  LineChart,
  Briefcase,
  Search,
  AlertTriangle,
  Users,
  Calendar,
  Percent,
  TrendingDown,
  RefreshCw,
  Layers,
  Globe,
  CreditCard,
  Wallet
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
    type: 'video' | 'interactive' | 'quiz' | 'case-study' | 'calculator';
    completed: boolean;
  }[];
  color: string;
  course: 'bond_fundamentals' | 'government_bonds' | 'corporate_bonds' | 'bond_analysis' | 'bond_portfolio' | 'advanced_bonds';
  prerequisites: string[];
  tags: string[];
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

const BondsCourse: NextPage = () => {
  const { t } = useTranslation('bonds-course');
  const { user: clerkUser } = useUser();
  
  const [modules, setModules] = useState<Module[]>([
    // Bond Fundamentals Course
    {
      id: 'bond-basics',
      icon: <BookOpen className="w-6 h-6" />,
      duration: '90 mins',
      difficulty: 'Beginner',
      xpReward: 150,
      progress: 0,
      locked: false,
      course: 'bond_fundamentals',
      prerequisites: [],
      lessons: [
        { id: 'what-are-bonds', title: 'What are Bonds?', type: 'video', completed: false },
        { id: 'bonds-vs-stocks', title: 'Bonds vs Stocks', type: 'interactive', completed: false },
        { id: 'bond-terminology', title: 'Key Bond Terms', type: 'interactive', completed: false },
        { id: 'how-bonds-work', title: 'How Bonds Generate Income', type: 'video', completed: false },
        { id: 'bond-basics-quiz', title: 'Bond Basics Quiz', type: 'quiz', completed: false }
      ],
      color: 'blue',
      tags: ['Fundamentals', 'Beginner']
    },
    {
      id: 'bond-types',
      icon: <Layers className="w-6 h-6" />,
      duration: '2 hours',
      difficulty: 'Beginner',
      xpReward: 200,
      progress: 0,
      locked: false,
      course: 'bond_fundamentals',
      prerequisites: ['bond-basics'],
      lessons: [
        { id: 'government-bonds-intro', title: 'Government Bonds Overview', type: 'video', completed: false },
        { id: 'corporate-bonds-intro', title: 'Corporate Bonds Overview', type: 'video', completed: false },
        { id: 'municipal-bonds', title: 'Municipal Bonds', type: 'interactive', completed: false },
        { id: 'indian-bond-market', title: 'Indian Bond Market Structure', type: 'video', completed: false },
        { id: 'bond-etfs-intro', title: 'Bond ETFs and Mutual Funds', type: 'interactive', completed: false },
        { id: 'bond-types-quiz', title: 'Bond Types Quiz', type: 'quiz', completed: false }
      ],
      color: 'green',
      tags: ['Types', 'Classification']
    },
    {
      id: 'bond-pricing',
      icon: <Calculator className="w-6 h-6" />,
      duration: '2.5 hours',
      difficulty: 'Intermediate',
      xpReward: 250,
      progress: 0,
      locked: true,
      course: 'bond_analysis',
      prerequisites: ['bond-basics', 'bond-types'],
      lessons: [
        { id: 'present-value', title: 'Present Value Concepts', type: 'video', completed: false },
        { id: 'yield-calculations', title: 'Yield to Maturity (YTM)', type: 'interactive', completed: false },
        { id: 'price-yield-relationship', title: 'Price-Yield Relationship', type: 'interactive', completed: false },
        { id: 'bond-calculator', title: 'Bond Pricing Calculator', type: 'calculator', completed: false },
        { id: 'duration-convexity', title: 'Duration and Convexity', type: 'video', completed: false },
        { id: 'pricing-quiz', title: 'Bond Pricing Mastery', type: 'quiz', completed: false }
      ],
      color: 'purple',
      tags: ['Pricing', 'Mathematics', 'Analysis']
    },
    {
      id: 'government-bonds',
      icon: <Landmark className="w-6 h-6" />,
      duration: '2 hours',
      difficulty: 'Intermediate',
      xpReward: 200,
      progress: 0,
      locked: true,
      course: 'government_bonds',
      prerequisites: ['bond-types'],
      lessons: [
        { id: 'treasury-bills', title: 'Treasury Bills (T-Bills)', type: 'video', completed: false },
        { id: 'government-securities', title: 'Government Securities (G-Secs)', type: 'video', completed: false },
        { id: 'state-development-loans', title: 'State Development Loans (SDLs)', type: 'interactive', completed: false },
        { id: 'rbi-auction-process', title: 'RBI Auction Process', type: 'video', completed: false },
        { id: 'sovereign-gold-bonds', title: 'Sovereign Gold Bonds', type: 'interactive', completed: false },
        { id: 'govt-bonds-case-study', title: 'Government Bond Investment Strategy', type: 'case-study', completed: false }
      ],
      color: 'yellow',
      tags: ['Government', 'Risk-Free', 'RBI']
    },
    {
      id: 'corporate-bonds',
      icon: <Building2 className="w-6 h-6" />,
      duration: '2.5 hours',
      difficulty: 'Intermediate',
      xpReward: 275,
      progress: 0,
      locked: true,
      course: 'corporate_bonds',
      prerequisites: ['government-bonds'],
      lessons: [
        { id: 'corporate-bond-structure', title: 'Corporate Bond Structure', type: 'video', completed: false },
        { id: 'credit-ratings', title: 'Credit Ratings & Risk Assessment', type: 'interactive', completed: false },
        { id: 'issuer-analysis', title: 'Analyzing Bond Issuers', type: 'video', completed: false },
        { id: 'indian-corporate-bonds', title: 'Major Indian Corporate Bond Issuers', type: 'interactive', completed: false },
        { id: 'nbfc-bonds', title: 'NBFC and Bank Bonds', type: 'video', completed: false },
        { id: 'default-risk', title: 'Understanding Default Risk', type: 'case-study', completed: false },
        { id: 'corporate-bonds-quiz', title: 'Corporate Bond Analysis', type: 'quiz', completed: false }
      ],
      color: 'orange',
      tags: ['Corporate', 'Credit Risk', 'Analysis']
    },
    {
      id: 'bond-risks-returns',
      icon: <TrendingDown className="w-6 h-6" />,
      duration: '2 hours',
      difficulty: 'Intermediate',
      xpReward: 225,
      progress: 0,
      locked: true,
      course: 'bond_analysis',
      prerequisites: ['bond-pricing'],
      lessons: [
        { id: 'interest-rate-risk', title: 'Interest Rate Risk', type: 'video', completed: false },
        { id: 'credit-risk-analysis', title: 'Credit Risk Deep Dive', type: 'interactive', completed: false },
        { id: 'inflation-risk', title: 'Inflation & Real Returns', type: 'video', completed: false },
        { id: 'liquidity-risk', title: 'Liquidity Risk in Bonds', type: 'interactive', completed: false },
        { id: 'bond-vs-stock-returns', title: 'Bond Returns vs Stock Returns', type: 'case-study', completed: false },
        { id: 'risk-management-quiz', title: 'Bond Risk Management', type: 'quiz', completed: false }
      ],
      color: 'red',
      tags: ['Risk Management', 'Returns', 'Analysis']
    },
    {
      id: 'bond-trading-investing',
      icon: <Target className="w-6 h-6" />,
      duration: '2 hours',
      difficulty: 'Intermediate',
      xpReward: 250,
      progress: 0,
      locked: true,
      course: 'bond_portfolio',
      prerequisites: ['corporate-bonds', 'bond-risks-returns'],
      lessons: [
        { id: 'primary-vs-secondary', title: 'Primary vs Secondary Markets', type: 'video', completed: false },
        { id: 'bond-buying-process', title: 'How to Buy Bonds in India', type: 'interactive', completed: false },
        { id: 'bond-etfs-trading', title: 'Trading Bond ETFs', type: 'video', completed: false },
        { id: 'fractional-bonds', title: 'Fractional Bond Investing', type: 'interactive', completed: false },
        { id: 'bond-platforms', title: 'Digital Bond Trading Platforms', type: 'video', completed: false },
        { id: 'trading-strategies', title: 'Bond Trading Strategies', type: 'case-study', completed: false }
      ],
      color: 'indigo',
      tags: ['Trading', 'Investing', 'Platforms']
    },
    {
      id: 'bond-portfolio-management',
      icon: <PieChart className="w-6 h-6" />,
      duration: '3 hours',
      difficulty: 'Advanced',
      xpReward: 350,
      progress: 0,
      locked: true,
      course: 'bond_portfolio',
      prerequisites: ['bond-trading-investing'],
      lessons: [
        { id: 'asset-allocation', title: 'Bonds in Asset Allocation', type: 'video', completed: false },
        { id: 'bond-laddering', title: 'Bond Laddering Strategy', type: 'interactive', completed: false },
        { id: 'duration-matching', title: 'Duration Matching', type: 'video', completed: false },
        { id: 'bond-diversification', title: 'Bond Portfolio Diversification', type: 'interactive', completed: false },
        { id: 'rebalancing', title: 'Portfolio Rebalancing with Bonds', type: 'video', completed: false },
        { id: 'tax-efficiency', title: 'Tax-Efficient Bond Investing', type: 'interactive', completed: false },
        { id: 'portfolio-case-study', title: 'Complete Portfolio Construction', type: 'case-study', completed: false }
      ],
      color: 'pink',
      tags: ['Portfolio', 'Strategy', 'Advanced']
    },
    {
      id: 'advanced-bond-strategies',
      icon: <Sparkles className="w-6 h-6" />,
      duration: '3.5 hours',
      difficulty: 'Advanced',
      xpReward: 400,
      progress: 0,
      locked: true,
      course: 'advanced_bonds',
      prerequisites: ['bond-portfolio-management'],
      lessons: [
        { id: 'yield-curve-strategies', title: 'Yield Curve Strategies', type: 'video', completed: false },
        { id: 'bond-arbitrage', title: 'Bond Arbitrage Opportunities', type: 'interactive', completed: false },
        { id: 'international-bonds', title: 'International Bond Investing', type: 'video', completed: false },
        { id: 'callable-bonds', title: 'Callable and Puttable Bonds', type: 'interactive', completed: false },
        { id: 'bond-derivatives', title: 'Bond Futures and Options', type: 'video', completed: false },
        { id: 'macro-bond-investing', title: 'Macroeconomic Bond Investing', type: 'case-study', completed: false },
        { id: 'advanced-strategies-quiz', title: 'Advanced Bond Strategies', type: 'quiz', completed: false }
      ],
      color: 'cyan',
      tags: ['Advanced', 'Strategies', 'Professional']
    }
  ]);

  const [courses] = useState<Course[]>([
    {
      id: 'bond_fundamentals',
      title: 'Bond Market Fundamentals',
      description: 'Master the basics of bonds, types, and market structure',
      color: 'blue',
      icon: <BookOpen className="w-8 h-8" />,
      moduleCount: 2,
      totalDuration: '3.5 hours',
      difficulty: 'Beginner',
      certification: 'Bond Fundamentals Certificate'
    },
    {
      id: 'government_bonds',
      title: 'Government Securities',
      description: 'Complete guide to government bonds and treasury securities',
      color: 'yellow',
      icon: <Landmark className="w-8 h-8" />,
      moduleCount: 1,
      totalDuration: '2 hours',
      difficulty: 'Intermediate',
      certification: 'Government Securities Specialist'
    },
    {
      id: 'corporate_bonds',
      title: 'Corporate Bond Analysis',
      description: 'Analyze corporate bonds, credit risk, and issuer evaluation',
      color: 'orange',
      icon: <Building2 className="w-8 h-8" />,
      moduleCount: 1,
      totalDuration: '2.5 hours',
      difficulty: 'Intermediate',
      certification: 'Corporate Bond Analyst'
    },
    {
      id: 'bond_analysis',
      title: 'Bond Pricing & Risk Analysis',
      description: 'Advanced bond pricing, yield calculations, and risk management',
      color: 'purple',
      icon: <Calculator className="w-8 h-8" />,
      moduleCount: 2,
      totalDuration: '4.5 hours',
      difficulty: 'Intermediate to Advanced',
      certification: 'Bond Analysis Professional'
    },
    {
      id: 'bond_portfolio',
      title: 'Bond Portfolio Management',
      description: 'Professional bond portfolio construction and management',
      color: 'indigo',
      icon: <PieChart className="w-8 h-8" />,
      moduleCount: 2,
      totalDuration: '5 hours',
      difficulty: 'Advanced',
      certification: 'Bond Portfolio Manager'
    },
    {
      id: 'advanced_bonds',
      title: 'Advanced Bond Strategies',
      description: 'Sophisticated bond strategies and institutional techniques',
      color: 'cyan',
      icon: <Sparkles className="w-8 h-8" />,
      moduleCount: 1,
      totalDuration: '3.5 hours',
      difficulty: 'Advanced',
      certification: 'Advanced Bond Strategist'
    }
  ]);

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [courseStats, setCourseStats] = useState({ totalModules: 9, totalTime: 21 });
  const [courseStatus, setCourseStatus] = useState('NOT_ENROLLED');
  const [showAnimation, setShowAnimation] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCourseFilter, setActiveCourseFilter] = useState('all');
  const [activeTagFilter, setActiveTagFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  // Calculate user level based on XP
  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 1000) + 1;
  };

  // Calculate XP required for next level
  const getXPForNextLevel = (level: number) => {
    return level * 1000;
  };

  // Filter and search functionality
  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      const matchesSearch = searchTerm === '' || 
        module.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter = activeFilter === 'all' || 
        (activeFilter === 'unlocked' && !module.locked) ||
        (activeFilter === 'completed' && module.progress === 100) ||
        (activeFilter === 'beginner' && module.difficulty === 'Beginner') ||
        (activeFilter === 'intermediate' && module.difficulty === 'Intermediate') ||
        (activeFilter === 'advanced' && module.difficulty === 'Advanced');

      const matchesCourse = activeCourseFilter === 'all' || module.course === activeCourseFilter;

      const matchesTag = activeTagFilter === 'all' || module.tags.includes(activeTagFilter);

      return matchesSearch && matchesFilter && matchesCourse && matchesTag;
    });
  }, [modules, searchTerm, activeFilter, activeCourseFilter, activeTagFilter]);

  // Get unique tags for filter
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    modules.forEach(module => module.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [modules]);

  // Unlock next modules when prerequisites are completed
  useEffect(() => {
    const updatedModules = modules.map(module => {
      if (module.prerequisites.length === 0) {
        return { ...module, locked: false };
      }
      
      const prerequisitesMet = module.prerequisites.every(prereqId => {
        const prereqModule = modules.find(m => m.id === prereqId);
        return prereqModule && prereqModule.progress === 100;
      });
      
      return { ...module, locked: !prerequisitesMet };
    });

    setModules(updatedModules);
  }, []);

  // Handle module completion
  const handleModuleComplete = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, progress: 100 }
        : module
    ));
    
    const completedModule = modules.find(m => m.id === moduleId);
    if (completedModule) {
      const newTotalXP = totalXP + completedModule.xpReward;
      setTotalXP(newTotalXP);
      setUserLevel(calculateLevel(newTotalXP));
      
      // Check if all modules are completed for certificate
      const allCompleted = modules.every(m => m.progress === 100);
      if (allCompleted) {
        setShowCertificate(true);
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCourseColor = (course: string) => {
    const courseObj = courses.find(c => c.id === course);
    return courseObj?.color || 'blue';
  };

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full mr-4">
                <DollarSign className="w-12 h-12" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Master Bond Investing
              </h1>
            </div>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              From Government Securities to Corporate Bonds - Learn to build a professional fixed-income portfolio
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{courseStats.totalModules}</div>
                <div className="text-sm text-blue-200">Modules</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{courseStats.totalTime}h</div>
                <div className="text-sm text-blue-200">Content</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{userLevel}</div>
                <div className="text-sm text-blue-200">Your Level</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{totalXP}</div>
                <div className="text-sm text-blue-200">Total XP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Course Progress</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${(modules.filter(m => m.progress === 100).length / modules.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {modules.filter(m => m.progress === 100).length} / {modules.length} completed
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Level {userLevel} • {totalXP} XP
              </div>
              <div className="text-xs text-gray-500">
                {getXPForNextLevel(userLevel) - totalXP} XP to next level
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Overview Cards */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Bond Investment Learning Path</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course, index) => {
            const courseModules = modules.filter(m => m.course === course.id);
            const completedModules = courseModules.filter(m => m.progress === 100);
            const progressPercentage = courseModules.length > 0 
              ? (completedModules.length / courseModules.length) * 100 
              : 0;

            return (
              <div key={course.id} className={`bg-white rounded-xl shadow-lg border-l-4 border-${course.color}-500 hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${course.color}-100`}>
                      {course.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{course.difficulty}</div>
                      <div className="text-sm font-medium text-gray-700">{course.totalDuration}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${course.color}-500 h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {completedModules.length} of {courseModules.length} modules completed
                    </div>
                  </div>

                  {progressPercentage === 100 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center">
                      <Trophy className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        Earn: {course.certification}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Modules</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Modules</option>
                <option value="unlocked">Available</option>
                <option value="completed">Completed</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Course</label>
              <select
                value={activeCourseFilter}
                onChange={(e) => setActiveCourseFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Tag</label>
              <select
                value={activeTagFilter}
                onChange={(e) => setActiveTagFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, index) => (
            <div
              key={module.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                module.locked ? 'opacity-60' : 'hover:scale-105'
              } ${showAnimation ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${getCourseColor(module.course)}-100 text-${getCourseColor(module.course)}-600`}>
                    {module.icon}
                  </div>
                  <div className="flex items-center space-x-2">
                    {module.locked ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : module.progress === 100 ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <PlayCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {module.title || `Module ${index + 1}`}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {module.description || 'Comprehensive learning module covering essential concepts'}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {module.duration}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lessons</span>
                    <span className="font-medium">{module.lessons.length} lessons</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">XP Reward</span>
                    <span className="font-medium text-yellow-600">+{module.xpReward} XP</span>
                  </div>
                </div>

                {module.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mb-4">
                  {module.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {module.prerequisites.length > 0 && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                    <div className="text-xs text-yellow-800 font-medium mb-1">Prerequisites:</div>
                    <div className="text-xs text-yellow-700">
                      Complete {module.prerequisites.join(', ')} first
                    </div>
                  </div>
                )}

                <Link
                  href={module.locked ? '#' : `/bonds-course/${module.id}`}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    module.locked
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : module.progress === 100
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                  onClick={(e) => {
                    if (module.locked) {
                      e.preventDefault();
                    }
                  }}
                >
                  {module.locked ? (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Locked
                    </>
                  ) : module.progress === 100 ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Review
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Start Learning
                    </>
                  )}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-16">
            <div className="w-64 h-64 mx-auto mb-8 opacity-50">
              <Search className="w-full h-full text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No modules found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <CourseCompletionCertificate 
              userName={clerkUser?.firstName + ' ' + clerkUser?.lastName || 'Bond Master'}
              courseName="Complete Bond Investment Mastery"
              completionDate={new Date().toISOString()}
              certificateId={`bond-cert-${Date.now()}`}
              moduleCount={modules.length}
              completedModules={modules.map(m => ({
                id: m.id,
                title: m.title || `Module ${m.id}`,
                completed: m.progress >= 100,
                xpEarned: m.xpReward
              }))}
            />
            <div className="p-6 border-t">
              <button
                onClick={() => setShowCertificate(false)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BondsCourse;
