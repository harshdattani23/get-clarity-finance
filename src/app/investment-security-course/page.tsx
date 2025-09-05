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
  Network,
  Bot,
  LineChart
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

const FinancialSecurityEducationHub: NextPage = () => {
  const { t } = useTranslation('financial-security-education-hub');
  const { user: clerkUser } = useUser();
  const [modules, setModules] = useState<Module[]>([
    // Investment Security Course Modules (Only modules with existing pages)
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
      color: 'red',
      tags: ['Fraud Awareness']
    },
    {
      id: 'comprehensive-fraud-schemes',
      icon: <TrendingDown className="w-6 h-6" />,
      duration: '2 hours',
      difficulty: 'Advanced',
      xpReward: 250,
      progress: 0,
      locked: false,
      course: 'fraud_awareness',
      prerequisites: ['intro-to-frauds'],
      lessons: [
        { id: 'advanced-networks', title: 'Multi-Layered Fraud Networks', type: 'interactive', completed: false },
        { id: 'technology-integration', title: 'AI-Driven Market Manipulation', type: 'video', completed: false },
        { id: 'regulatory-arbitrage', title: 'Regulatory Arbitrage Exploitation', type: 'case-study', completed: false },
        { id: 'professional-enablers', title: 'Professional Enablers & Corruption', type: 'interactive', completed: false },
        { id: 'detection-advanced', title: 'Advanced Detection Techniques', type: 'quiz', completed: false }
      ],
      color: 'orange',
      tags: ['Fraud Awareness']
    }
  ]);

  const [courses] = useState<Course[]>([
    {
      id: 'fraud_awareness',
      title: 'Fraud Awareness & Protection',
      description: 'Complete protection against financial frauds and market manipulation',
      color: 'red',
      icon: <Shield className="w-8 h-8" />,
      moduleCount: 3,
      totalDuration: '6 hours',
      difficulty: 'Beginner to Advanced',
      certification: 'Fraud Detection Specialist'
    },
    {
      id: 'fundamentals',
      title: 'Stock Market Fundamentals',
      description: 'Comprehensive market knowledge from basics to advanced analysis',
      color: 'blue',
      icon: <PieChart className="w-8 h-8" />,
      moduleCount: 1,
      totalDuration: '4 hours',
      difficulty: 'Intermediate',
      certification: 'Market Analysis Professional'
    },
    {
      id: 'algorithmic_trading',
      title: 'Advanced Algorithmic & HFT Trading',
      description: 'Complete mastery of algorithmic trading, HFT, and machine learning',
      color: 'purple',
      icon: <Cpu className="w-8 h-8" />,
      moduleCount: 1,
      totalDuration: '12 hours',
      difficulty: 'Advanced',
      certification: 'Algorithmic Trading Master'
    },
    {
      id: 'portfolio_management',
      title: 'Investment & Portfolio Management',
      description: 'Professional wealth management and long-term investing',
      color: 'green',
      icon: <TrendingUp className="w-8 h-8" />,
      moduleCount: 2,
      totalDuration: '7 hours',
      difficulty: 'Intermediate to Advanced',
      certification: 'Portfolio Management Professional'
    }
  ]);

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [courseStats, setCourseStats] = useState({ totalModules: 7, totalTime: 29 });
  const [courseStatus, setCourseStatus] = useState('NOT_ENROLLED');
  const [showAnimation, setShowAnimation] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCourseFilter, setActiveCourseFilter] = useState('all');
  const [activeTagFilter, setActiveTagFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState<{
    id: string;
    userName: string;
    courseName: string;
    totalXP: number;
    moduleCount: number;
    completedModules: Array<{
      id: string;
      title: string;
      xpEarned: number;
      completedAt: string;
      completed: boolean;
    }>;
    completionDate: string;
    publicUrl?: string;
  } | null>(null);
  useEffect(() => {
    // Simulate loading animation
    setTimeout(() => setShowAnimation(false), 500); // Reduced from 1000ms to 500ms

    // Early return if no user
    if (!clerkUser?.id) {
      console.log('No user logged in, skipping data fetch');
      return;
    }

    const fetchData = async () => {
      try {
        console.log('Starting data fetch...');
        const startTime = Date.now();

        // Check localStorage first for immediate updates
        const userProgress = moduleProgressStore.getUserProgress(clerkUser.id);
        const unlockedModules = moduleProgressStore.getUnlockedModules(clerkUser.id);
        
        if (userProgress) {
          console.log('Found localStorage progress, updating immediately');
          setModules(currentModules =>
            currentModules.map(module => {
              const moduleProgress = userProgress.modules[module.id];
              const isUnlocked = unlockedModules[module.id];
              
              return {
                ...module,
                locked: !isUnlocked,
                progress: moduleProgress?.progress || module.progress,
              };
            })
          );
          
          // Calculate total XP from individual module XP
          const calculatedTotalXP = Object.values(userProgress.modules)
            .reduce((total, moduleProgress) => total + (moduleProgress.xpEarned || 0), 0);
          setTotalXP(calculatedTotalXP);
          setUserLevel(Math.floor(calculatedTotalXP / 100) + 1);
        }

        // Fetch all data in parallel with timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

        try {
          const [setupRes, statsRes, modulesRes] = await Promise.all([
            fetch('/api/courses/investment-security/setup', {
              method: 'POST',
              credentials: 'include',
              signal: controller.signal,
            }).catch(err => {
              console.log('Setup request failed:', err.message);
              return { ok: false };
            }),
            fetch('/api/courses/investment-security/stats', {
              credentials: 'include',
              signal: controller.signal,
            }).catch(err => {
              console.log('Stats request failed:', err.message);
              return { ok: false };
            }),
            fetch('/api/courses/investment-security/modules', {
              credentials: 'include',
              signal: controller.signal,
            }).catch(err => {
              console.log('Modules request failed:', err.message);
              return { ok: false };
            }),
          ]);

          clearTimeout(timeout);

          // Process stats response
          if (statsRes.ok && 'json' in statsRes) {
            try {
              const data = await statsRes.json();
              console.log('Stats data received:', data);
              setTotalXP(data.totalXP || 0);
              setUserLevel(data.userLevel || 1);
              setCourseStats({
                totalModules: data.totalModules || 7,
                totalTime: data.totalTime || 29,
              });
              setCourseStatus(data.courseStatus || 'NOT_ENROLLED');
            } catch (jsonError) {
              console.error('Failed to parse stats JSON:', jsonError);
            }
          } else {
            console.log('Stats request failed, using fallback values');
            setCourseStats({ totalModules: 7, totalTime: 29 });
            setCourseStatus('NOT_ENROLLED');
          }

          // Process modules response
          if (modulesRes.ok && 'json' in modulesRes) {
            try {
              const fetchedModules: FetchedModule[] = await modulesRes.json();
              console.log('Modules data received:', fetchedModules.length, 'modules');
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
            } catch (jsonError) {
              console.error('Failed to parse modules JSON:', jsonError);
            }
          }

          const endTime = Date.now();
          console.log(`Data fetch completed in ${endTime - startTime}ms`);
        } catch (fetchError) {
          clearTimeout(timeout);
          if (fetchError instanceof Error && fetchError.name === 'AbortError') {
            console.log('Fetch timeout after 10 seconds');
          } else {
            console.error('Fetch error:', fetchError);
          }
        }
      } catch (error) {
        console.error('Failed to fetch course data:', error);
        // Set fallback values
        setCourseStats({ totalModules: 7, totalTime: 29 });
        setCourseStatus('NOT_ENROLLED');
      }
    };

    fetchData();
  }, [clerkUser?.id]); // Only re-fetch when user ID changes

  useEffect(() => {
    if (selectedModule) {
      window.location.href = `/investment-security-course/${selectedModule.id}`;
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
        
        const searchMatch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const difficultyMatch = activeFilter === 'all' || 
                               module.difficulty.toLowerCase() === activeFilter;
        
        const courseMatch = activeCourseFilter === 'all' || 
                           module.course === activeCourseFilter;
        
        const tagMatch = activeTagFilter === 'all' || 
                        module.tags.some(tag => tag.toLowerCase() === activeTagFilter.toLowerCase());

        return searchMatch && difficultyMatch && courseMatch && tagMatch;
      })
      .sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  }, [modules, activeFilter, activeCourseFilter, activeTagFilter, searchTerm, t]);

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

  const handleCourseCompletion = async () => {
    if (!clerkUser?.id) {
      alert('Please sign in to get your certificate!');
      return;
    }

    // Check if user has completed the intro module (for demo purposes)
    const introModule = modules.find(m => m.id === 'intro-to-frauds');
    if (!introModule || introModule.progress < 100) {
      alert('Please complete the Introduction to Frauds module first!');
      return;
    }

    try {
      // First, check if certificate already exists
      const lookupResponse = await fetch('/api/certificates/lookup?moduleId=intro-to-frauds&courseId=fraud-awareness-course', {
        credentials: 'include'
      });

      if (lookupResponse.ok) {
        const lookupData = await lookupResponse.json();
        
        if (lookupData.exists && lookupData.certificate) {
          // Certificate already exists, show it
          console.log('Found existing certificate:', lookupData.certificate);
          setCertificateData({
            id: lookupData.certificate.id,
            userName: lookupData.certificate.userName,
            courseName: lookupData.certificate.courseName,
            totalXP: lookupData.certificate.totalXP || 0,
            moduleCount: lookupData.certificate.moduleCount,
            completedModules: lookupData.certificate.certificateData?.completedModules || [],
            completionDate: lookupData.certificate.completionDate,
            publicUrl: lookupData.certificate.publicUrl
          });
          setShowCertificate(true);
          return;
        }
      }

      // Certificate doesn't exist, create a new one
      const completedModules = modules
        .filter(m => m.progress === 100)
        .map(m => ({
          id: m.id,
          title: t(`modules.${m.id}.title`) as string,
          xpEarned: m.xpReward,
          completedAt: new Date().toISOString(),
          completed: true
        }));

      // Get user name from Clerk user or use fallback
      const userName = clerkUser?.fullName || 
        (clerkUser?.firstName && clerkUser?.lastName ? `${clerkUser.firstName} ${clerkUser.lastName}` : null) ||
        clerkUser?.firstName ||
        clerkUser?.username ||
        clerkUser?.primaryEmailAddress?.emailAddress ||
        'Course Participant';

      // Use a reasonable completion date (fallback to historical date for existing completions)
      const completionDate = new Date('2025-08-13T00:00:00.000Z').toISOString();

      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userClerkId: clerkUser.id,
          moduleId: 'intro-to-frauds',
          courseId: 'fraud-awareness-course',
          courseName: 'Fraud Awareness Course - Introduction to Stock Market Frauds',
          userName: userName,
          totalXP: totalXP || completedModules.reduce((sum, m) => sum + m.xpEarned, 0),
          moduleCount: completedModules.length,
          completedModules: completedModules,
          completionDate: completionDate
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Certificate created successfully:', data);
        setCertificateData({
          id: data.certificate.id,
          userName: data.certificate.userName,
          courseName: data.certificate.courseName,
          totalXP: totalXP || completedModules.reduce((sum, m) => sum + m.xpEarned, 0),
          moduleCount: data.certificate.moduleCount,
          completedModules: completedModules,
          completionDate: data.certificate.completionDate,
          publicUrl: data.certificate.publicUrl
        });
        setShowCertificate(true);
      } else {
        const error = await response.json();
        console.error('Certificate creation failed:', error);
        alert(error.error || 'Failed to generate certificate');
      }
    } catch (error) {
      console.error('Course completion error:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        error: error
      });
      alert(`Failed to get certificate. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
                  onClick={() => setActiveFilter(filter.toLowerCase())}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${ 
                    activeFilter === filter.toLowerCase()
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
        
        {/* Course Category Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setActiveCourseFilter(course.id === activeCourseFilter ? 'all' : course.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCourseFilter === course.id
                    ? 'bg-[#163300] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {course.icon}
                {course.title}
              </button>
            ))}
            <button
              onClick={() => setActiveCourseFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeCourseFilter === 'all'
                  ? 'bg-[#163300] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Courses
            </button>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveTagFilter('all')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTagFilter === 'all'
                  ? 'bg-lime-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Target className="w-4 h-4" />
              All Tags
            </button>
            <button
              onClick={() => setActiveTagFilter('awareness')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTagFilter === 'awareness'
                  ? 'bg-lime-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Shield className="w-4 h-4" />
              Awareness
            </button>
            <button
              onClick={() => setActiveTagFilter('market knowledge')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTagFilter === 'market knowledge'
                  ? 'bg-lime-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Market Knowledge
            </button>
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
                    {module.progress === 100 ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                          <Trophy className="w-4 h-4" />
                          <span>Module Completed!</span>
                        </div>
                        {module.id === 'intro-to-frauds' && (
                          clerkUser ? (
                            <button
                              onClick={handleCourseCompletion}
                              className="w-full flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105"
                            >
                              <Award className="w-4 h-4" />
                              Get Certificate
                            </button>
                          ) : (
                            <Link
                              href="/sign-up"
                              className="w-full flex items-center justify-center gap-2 text-sm font-bold rounded-full px-4 py-2 bg-lime-400 text-black hover:bg-lime-500 transition-all transform hover:scale-105"
                            >
                              <Award className="w-4 h-4" />
                              Sign Up for Certificate
                            </Link>
                          )
                        )}
                      </div>
                    ) : (
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
                    )}
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
          moduleCount={certificateData.moduleCount}
          completedModules={certificateData.completedModules}
          certificateId={certificateData.id}
          publicUrl={certificateData.publicUrl}
          onClose={() => setShowCertificate(false)}
        />
      )}
      
    </div>
  );
};

export default FinancialSecurityEducationHub;


