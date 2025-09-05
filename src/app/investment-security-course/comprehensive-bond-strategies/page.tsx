"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';

import Module1VideoPlayer from '@/components/investment-security-course/Module1VideoPlayer';
import CourseAudioPlayer from '@/components/CourseAudioPlayer';
import ClientOnly from '@/components/ClientOnly';
import { useTranslation } from '@/hooks/useTranslation';
import SpotTheRedFlag from '@/components/fraud-awareness/SpotTheRedFlag';
import ProgressiveRedFlagQuiz from '@/components/fraud-awareness/ProgressiveRedFlagQuiz';
import InteractiveInfographic from '@/components/fraud-awareness/InteractiveInfographic';
import CaseStudyModal from '@/components/fraud-awareness/CaseStudyModal';
import FraudMatchingGame from '@/components/fraud-awareness/FraudMatchingGame';
import TimelineBuilder from '@/components/fraud-awareness/TimelineBuilder';
import CourseCompletionCertificate from '@/components/certificates/CourseCompletionCertificate';
import { moduleProgressStore } from '@/lib/module-progress-store';
import { 
  ArrowLeft,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Shield,
  CheckCircle,
  Trophy,
  LineChart,
  Users,
  Zap,
  Lock,
  Repeat,
  Briefcase,
  Brain,
  Target,
  Calculator,
  MessageCircle,
  Phone,
  Clock,
  Landmark,
  Building2,
  PieChart,
  BarChart3,
  Layers,
  Network,
  Bot,
  DollarSign
} from 'lucide-react';

export default function ComprehensiveBondStrategiesPage() {
  const { t } = useTranslation('courses.comprehensive-bond-strategies');
  const { user: clerkUser, isLoaded } = useUser();
  const [overviewStep, setOverviewStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });
  
  // Track engagement and XP
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [currentXP, setCurrentXP] = useState(0);
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const [lastXPEarned, setLastXPEarned] = useState(0);
  
  // Gamification state
  const [streakCount, setStreakCount] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [currentQuizScore, setCurrentQuizScore] = useState(0);
  
  // Certificate state
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

  const lessonProgress = useMemo(() => {
    // Base activities that contribute to progress
    const totalActivities = 15; // video + audio + 5 advanced scenarios + 4 strategy interactions + 3 games + calculator tools
    const completedCount = completedActivities.size;
    
    // Progress based on current step and activities completed
    const stepProgress = (overviewStep / 4) * 100;
    const activityProgress = (completedCount / totalActivities) * 100;
    return Math.min(100, Math.max(stepProgress, activityProgress));
  }, [overviewStep, completedActivities]);

  // Load existing progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      console.log('Clerk user data:', clerkUser);
      if (clerkUser) {
        console.log('User authenticated with Clerk:', {
          id: clerkUser.id,
          fullName: clerkUser.fullName,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          username: clerkUser.username,
          primaryEmailAddress: clerkUser.primaryEmailAddress?.emailAddress
        });
      } else {
        console.log('No Clerk user found - user not signed in');
      }

      // Load progress data
      try {
        const response = await fetch('/api/lessons/interactions?lessonId=comprehensive-bond-strategies', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Loaded progress from database:', data);
          setCurrentXP(data.totalXpEarned || 0);
          setCompletedActivities(new Set(data.completedActivities || []));
        } else if (response.status === 401) {
          console.log('User not authenticated, starting with fresh progress');
          setCurrentXP(0);
          setCompletedActivities(new Set());
        } else {
          console.log('Database unavailable, starting with fresh progress');
          setCurrentXP(0);
          setCompletedActivities(new Set());
        }
      } catch (error) {
        console.log('Database connection failed, starting with fresh progress:', error);
        setCurrentXP(0);
        setCompletedActivities(new Set());
      }
    };

    loadProgress();
  }, [clerkUser]);

  const addXP = async (amount: number, activityId: string) => {
    if (completedActivities.has(activityId)) {
      console.log(`XP already awarded for ${activityId}`);
      return;
    }
    
    console.log(`Awarding ${amount} XP for ${activityId}`);
    
    // Always update UI immediately for better user experience
    setCompletedActivities(prev => new Set([...prev, activityId]));
    setCurrentXP(prev => {
      const newXP = prev + amount;
      console.log(`XP updated from ${prev} to ${newXP}`);
      return newXP;
    });
    setLastXPEarned(amount);
    setShowXPAnimation(true);
    setTimeout(() => setShowXPAnimation(false), 2000);
    
    // Try to save to database in background
    try {
      const response = await fetch('/api/lessons/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          lessonId: 'comprehensive-bond-strategies',
          interactionId: activityId,
          xpEarned: amount,
          interactionType: activityId.includes('advanced-scenario') ? 'SCENARIO' : 'STRATEGY',
          response: 'completed',
          isCorrect: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('XP saved to database:', data);
      } else if (response.status === 401) {
        console.log('User not authenticated, XP saved locally only');
      } else {
        console.log('Database save failed, but UI already updated');
      }
    } catch (error) {
      console.error('Failed to save XP to database:', error);
      console.log('UI already updated optimistically');
    }
  };

  const advancedScenarios = [
    {
      id: 1,
      text: "A AAA-rated corporate bond is trading at a 150 basis points spread over government securities. The company announces a major acquisition funded by debt, which will increase their debt-to-equity ratio from 0.3 to 0.8. Credit rating agencies indicate they're reviewing the rating for potential downgrade.",
      options: [
        "Hold the bond as AAA rating provides safety buffer",
        "Sell immediately to avoid potential rating downgrade impact",
        "Analyze the acquisition's strategic value and long-term cash flow impact before deciding"
      ],
      correct: 2,
      explanation: "Professional bond investors analyze the underlying fundamentals. The rating review requires careful assessment of how the acquisition affects the company's ability to service debt, not just the immediate rating implications."
    },
    {
      id: 2,
      text: "You're managing a bond portfolio during a period when the yield curve is inverting. 10-year government bonds yield 3.2% while 2-year bonds yield 3.8%. Your portfolio duration is currently 7.2 years, and you expect interest rates to rise further.",
      options: [
        "Increase duration to lock in current yields",
        "Reduce portfolio duration and increase floating rate positions", 
        "Maintain current duration as yield curve will normalize"
      ],
      correct: 1,
      explanation: "In an inverted yield curve environment with expectations of rising rates, reducing duration minimizes interest rate risk. Floating rate bonds provide protection against rising rates as their payments adjust upward."
    },
    {
      id: 3,
      text: "An emerging market corporate bond denominated in USD offers a 9.5% yield. The same issuer's local currency bonds yield 12.8%. The local currency has depreciated 15% against USD in the past year, and inflation is running at 8%.",
      options: [
        "Choose USD bond to eliminate currency risk",
        "Select local currency bond for higher nominal yield",
        "Hedge currency exposure and choose based on real yield analysis"
      ],
      correct: 2,
      explanation: "Sophisticated investors consider real yields after inflation and currency risk. Hedging allows you to separate credit risk from currency risk and make optimal allocation decisions based on risk-adjusted returns."
    },
    {
      id: 4,
      text: "A municipal bond offers a 4.2% tax-free yield. Your marginal tax rate is 35%, and equivalent taxable corporate bonds yield 6.8%. However, the municipality faces budget challenges and has unfunded pension obligations of $2.1 billion.",
      options: [
        "Choose municipal bond for tax-equivalent yield of 6.46%",
        "Accept the corporate bond's higher after-tax yield",
        "Assess the municipality's fiscal sustainability before deciding"
      ],
      correct: 2,
      explanation: "While the tax-equivalent yield (4.2% ÷ 0.65 = 6.46%) appears attractive, unfunded pension obligations represent a significant credit risk that requires thorough analysis of the municipality's ability to meet obligations."
    },
    {
      id: 5,
      text: "You're considering a convertible bond with a 3.5% coupon, convertible into stock at $45 per share. The stock currently trades at $42, has 28% volatility, and the bond trades at 102% of par. The bond has 5 years to maturity.",
      options: [
        "Buy for bond floor protection with equity upside",
        "Wait for stock price to approach conversion level",
        "Evaluate the option value using Black-Scholes framework"
      ],
      correct: 2,
      explanation: "Convertible bonds contain embedded options that require sophisticated valuation. The option value depends on volatility, time to expiration, and the relationship between stock price and conversion price, not just current price levels."
    }
  ];

  const bondStrategies = [
    {
      id: 'duration_matching',
      icon: <Clock className="w-8 h-8" />,
      title: 'Duration Matching',
      description: 'Align bond portfolio duration with investment horizon to minimize interest rate risk',
      techniques: ['Asset-Liability matching', 'Immunization strategies', 'Duration hedging'],
      example: 'A pension fund matches 15-year average duration with 15-year liability duration'
    },
    {
      id: 'yield_curve',
      icon: <LineChart className="w-8 h-8" />,
      title: 'Yield Curve Strategies',
      description: 'Capitalize on yield curve shape changes through positioning and timing',
      techniques: ['Barbell strategy', 'Bullet strategy', 'Butterfly spreads'],
      example: 'Combining 2-year and 30-year bonds (barbell) vs 10-year bonds (bullet)'
    },
    {
      id: 'credit_analysis',
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Credit Analysis',
      description: 'Deep fundamental analysis for credit risk assessment and opportunity identification',
      techniques: ['Cash flow analysis', 'Peer comparison', 'Scenario modeling'],
      example: 'Analyzing debt coverage ratios and business cycle sensitivity for corporate bonds'
    },
    {
      id: 'sector_rotation',
      icon: <Layers className="w-8 h-8" />,
      title: 'Sector Rotation',
      description: 'Tactical allocation across sectors based on economic cycles and credit conditions',
      techniques: ['Economic cycle analysis', 'Sector spread monitoring', 'Relative value assessment'],
      example: 'Overweighting utilities in recession, technology in expansion phases'
    }
  ];

  const advancedConcepts = [
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'Convexity Analysis',
      description: 'Second-order price sensitivity for advanced duration management'
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: 'Credit Derivatives',
      description: 'CDS, synthetic bonds, and credit risk transfer mechanisms'
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'Quantitative Models',
      description: 'Monte Carlo simulation, option-adjusted spreads, and risk modeling'
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: 'Portfolio Optimization',
      description: 'Modern portfolio theory application to bond portfolio construction'
    }
  ];

  const handleStrategyClick = (strategy: any) => {
    addXP(20, `strategy-${strategy.id}`);
    setModalContent({
      title: strategy.title,
      description: `${strategy.description}\n\nKey Techniques:\n${strategy.techniques.join(', ')}\n\nExample: ${strategy.example}`
    });
    setIsModalOpen(true);
  };

  const handleScenarioComplete = (scenarioId: number, isCorrect: boolean) => {
    if (isCorrect) {
      addXP(30, `advanced-scenario-${scenarioId}`);
      setCurrentQuizScore(prev => prev + 1);
      
      if (currentQuizScore + 1 === 5) {
        setAchievements(prev => [...prev, 'Bond Strategist Master']);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  };

  const calculateLevel = (xp: number) => Math.floor(xp / 100) + 1;
  const getXPForNextLevel = (xp: number) => ((Math.floor(xp / 100) + 1) * 100) - xp;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-lg font-medium text-green-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading Advanced Bond Strategies...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/investment-security-course"
                className="flex items-center text-green-600 hover:text-green-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Course Hub
              </Link>
              <div className="h-6 w-px bg-green-200"></div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h1 className="text-xl font-bold text-green-900">Comprehensive Bond Strategies</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Progress Bar */}
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-sm font-medium text-green-700">Progress:</span>
                <div className="w-32 bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${lessonProgress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-green-700">{Math.round(lessonProgress)}%</span>
              </div>
              
              {/* XP Display */}
              <div className="flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-green-900">{currentXP} XP</span>
                <span className="text-xs text-green-600">Level {calculateLevel(currentXP)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* XP Animation */}
      {showXPAnimation && (
        <motion.div
          className="fixed top-24 right-8 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-lg z-50"
          initial={{ opacity: 0, y: -50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
        >
          +{lastXPEarned} XP
        </motion.div>
      )}

      {/* Celebration Animation */}
      {showCelebration && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white rounded-xl p-8 shadow-2xl text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-900 mb-2">Achievement Unlocked!</h2>
            <p className="text-green-700">Bond Strategist Master - Expert in professional bond strategies!</p>
          </div>
        </motion.div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-100 rounded-full p-2">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-green-900">Professional Bond Strategy Mastery</h2>
                  <p className="text-green-600">Advanced • 2 hours • 250 XP</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-700">Course Progress</span>
                  <span className="text-sm text-green-600">{Math.round(lessonProgress)}% complete</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${lessonProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex space-x-1 mb-6">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    onClick={() => setOverviewStep(step)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      overviewStep === step
                        ? 'bg-green-600 text-white'
                        : overviewStep > step
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Step {step}
                  </button>
                ))}
              </div>

              {/* Step Content */}
              {overviewStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Advanced Bond Portfolio Management</h3>
                    <p className="text-green-700 mb-4">
                      Master institutional-grade bond strategies including duration management, yield curve positioning, credit analysis, and sophisticated risk management techniques used by professional portfolio managers.
                    </p>
                  </div>

                  <ClientOnly>
                    <Module1VideoPlayer 
                      onComplete={() => addXP(30, 'advanced-intro-video-watched')}
                    />
                  </ClientOnly>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {advancedConcepts.map((concept, index) => (
                      <div key={index} className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-green-600 mb-2 flex justify-center">
                          {concept.icon}
                        </div>
                        <h4 className="font-semibold text-green-900 mb-1">{concept.title}</h4>
                        <p className="text-xs text-green-600">{concept.description}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setOverviewStep(2)}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    Continue to Professional Strategies
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </motion.div>
              )}

              {overviewStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Professional Bond Strategies</h3>
                    <p className="text-green-700 mb-4">
                      Explore sophisticated strategies used by institutional investors, hedge funds, and professional bond managers to optimize risk-adjusted returns across different market environments.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {bondStrategies.map((strategy) => (
                      <motion.div
                        key={strategy.id}
                        className="bg-green-50 rounded-lg p-4 cursor-pointer hover:bg-green-100 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleStrategyClick(strategy)}
                      >
                        <div className="text-green-600 mb-3 flex justify-center">
                          {strategy.icon}
                        </div>
                        <h4 className="font-semibold text-green-900 mb-2">{strategy.title}</h4>
                        <p className="text-sm text-green-600 mb-3">{strategy.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {strategy.techniques.map((technique, idx) => (
                            <span key={idx} className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                              {technique}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <ClientOnly>
                    <CourseAudioPlayer 
                      onComplete={() => addXP(25, 'advanced-strategies-audio')}
                      courseId="module1"
                      language="en"
                    />
                  </ClientOnly>

                  <button
                    onClick={() => setOverviewStep(3)}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    Continue to Advanced Scenarios
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </motion.div>
              )}

              {overviewStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Advanced Decision Scenarios</h3>
                    <p className="text-green-700 mb-4">
                      Test your mastery with complex, real-world scenarios that require sophisticated analysis and professional-level decision making skills.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {advancedScenarios.map((scenario) => (
                      <div key={scenario.id} className="bg-green-50 rounded-lg p-6">
                        <h4 className="font-semibold text-green-900 mb-3">Advanced Scenario {scenario.id}</h4>
                        <p className="text-green-700 mb-4">{scenario.text}</p>
                        
                        <div className="space-y-2">
                          {scenario.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                const isCorrect = index === scenario.correct;
                                handleScenarioComplete(scenario.id, isCorrect);
                                alert(`${isCorrect ? '✅ Excellent Analysis!' : '❌ Consider This:'} ${scenario.explanation}`);
                              }}
                              className="w-full text-left p-3 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setOverviewStep(4)}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    Complete Advanced Course
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </motion.div>
              )}

              {overviewStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6 text-center"
                >
                  <div>
                    <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-900 mb-3">Professional Mastery Achieved!</h3>
                    <p className="text-green-700 mb-4">
                      You've mastered advanced bond strategies and earned <strong>{currentXP} XP</strong>. You're now equipped with institutional-level bond investment expertise.
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Advanced Skills Acquired:</h4>
                    <ul className="text-left text-green-700 space-y-2">
                      <li>✅ Professional portfolio management techniques</li>
                      <li>✅ Sophisticated yield curve strategies</li>
                      <li>✅ Advanced credit risk assessment</li>
                      <li>✅ Institutional-level decision making</li>
                      <li>✅ Quantitative bond analysis methods</li>
                      <li>✅ Professional risk management approaches</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Professional Certification Ready</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        You've completed both bond courses and are qualified for advanced bond investment certification.
                      </p>
                    </div>
                    
                    <Link
                      href="/investment-security-course"
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      Return to Course Hub
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Stats */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-semibold text-green-900 mb-4">Advanced Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-600">Level {calculateLevel(currentXP)}</span>
                    <span className="text-green-600">{getXPForNextLevel(currentXP)} XP to next level</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${((currentXP % 100) / 100) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{currentXP}</div>
                    <div className="text-xs text-green-500">Total XP</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{completedActivities.size}</div>
                    <div className="text-xs text-green-500">Activities</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            {achievements.length > 0 && (
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-semibold text-green-900 mb-4">Professional Achievements</h3>
                <div className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-yellow-50 rounded-lg p-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-800">{achievement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Course Prerequisites */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-green-900 mb-4">Prerequisites Met</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">Bond Investment Fundamentals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">Financial Market Knowledge</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">Risk Management Basics</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            className="bg-white rounded-xl p-6 max-w-lg w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-green-900 mb-3">{modalContent.title}</h3>
            <p className="text-green-700 whitespace-pre-line">{modalContent.description}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
