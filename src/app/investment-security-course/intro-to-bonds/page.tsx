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
  DollarSign,
  Shield,
  CheckCircle,
  Trophy,
  TrendingUp,
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
  PieChart
} from 'lucide-react';

export default function IntroToBondsPage() {
  const { t } = useTranslation('courses.intro-to-bonds');
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
    const totalActivities = 11; // video + audio + 3 bond scenarios + 3 bond type interactions + 2 games + simulator
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
        const response = await fetch('/api/lessons/interactions?lessonId=intro-to-bonds', {
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
          lessonId: 'intro-to-bonds',
          interactionId: activityId,
          xpEarned: amount,
          interactionType: activityId.includes('bond-scenario') ? 'SCENARIO' : 'DECISION',
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

  const scenarios = [
    {
      id: 1,
      text: "A company offers you a bond with a 12% annual return, saying it's backed by government guarantees. They require immediate payment through cryptocurrency and promise monthly payouts.",
      options: [
        "This looks legitimate because of the government guarantee",
        "This is likely fraudulent due to cryptocurrency payment and unrealistic returns",
        "The monthly payouts make this a solid investment"
      ],
      correct: 1,
      explanation: "Legitimate government bonds don't require cryptocurrency payments and 12% returns are unrealistic for government-backed securities. This shows classic signs of bond fraud."
    },
    {
      id: 2,
      text: "You're researching a corporate bond with a 7% yield when government bonds offer 4%. The company has a BBB credit rating and operates in the renewable energy sector.",
      options: [
        "The higher yield compensates for the credit risk - this could be legitimate",
        "Any yield above government bonds is suspicious",
        "Corporate bonds should never yield more than government bonds"
      ],
      correct: 0,
      explanation: "Higher yields on corporate bonds compared to government bonds are normal and reflect the additional credit risk. A BBB rating indicates investment-grade quality."
    },
    {
      id: 3,
      text: "An investment advisor claims their bond fund has never lost money and consistently delivers 8-10% annual returns regardless of market conditions.",
      options: [
        "This shows excellent fund management",
        "Consistent returns suggest possible fraud or misrepresentation",
        "Bond funds should always deliver positive returns"
      ],
      correct: 1,
      explanation: "No investment is immune to market forces. Consistently positive returns regardless of market conditions is a major red flag suggesting fraudulent activity."
    }
  ];

  const bondTypes = [
    {
      id: 'government',
      icon: <Landmark className="w-8 h-8" />,
      title: 'Government Bonds',
      description: 'Securities issued by governments, considered the safest bond investments',
      features: ['Low risk', 'Regular interest payments', 'Government backing'],
      example: 'Indian Government Securities (G-Secs), Treasury Bills'
    },
    {
      id: 'corporate',
      icon: <Building2 className="w-8 h-8" />,
      title: 'Corporate Bonds',
      description: 'Bonds issued by companies to raise capital for business operations',
      features: ['Higher yields', 'Credit risk', 'Various ratings'],
      example: 'Reliance Industries bonds, Tata group bonds'
    },
    {
      id: 'municipal',
      icon: <Users className="w-8 h-8" />,
      title: 'Municipal Bonds',
      description: 'Bonds issued by local governments for public projects',
      features: ['Tax benefits', 'Local development', 'Lower yields'],
      example: 'Municipal corporation bonds, State development loans'
    }
  ];

  const bondFeatures = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Face Value',
      description: 'The principal amount that will be repaid at maturity'
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'Coupon Rate',
      description: 'The interest rate paid periodically to bondholders'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Maturity Date',
      description: 'When the bond expires and principal is repaid'
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: 'Yield to Maturity',
      description: 'Total return if bond is held until maturity'
    }
  ];

  const handleBondTypeClick = (bondType: any) => {
    addXP(15, `bond-type-${bondType.id}`);
    setModalContent({
      title: bondType.title,
      description: `${bondType.description}\n\nKey Features:\n${bondType.features.join(', ')}\n\nExample: ${bondType.example}`
    });
    setIsModalOpen(true);
  };

  const handleScenarioComplete = (scenarioId: number, isCorrect: boolean) => {
    if (isCorrect) {
      addXP(20, `bond-scenario-${scenarioId}`);
      setCurrentQuizScore(prev => prev + 1);
      
      if (currentQuizScore + 1 === 3) {
        setAchievements(prev => [...prev, 'Bond Detective']);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  };

  const calculateLevel = (xp: number) => Math.floor(xp / 100) + 1;
  const getXPForNextLevel = (xp: number) => ((Math.floor(xp / 100) + 1) * 100) - xp;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-lg font-medium text-blue-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading Bond Investment Course...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/investment-security-course"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Course Hub
              </Link>
              <div className="h-6 w-px bg-blue-200"></div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-blue-900">Bond Investment Fundamentals</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Progress Bar */}
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-sm font-medium text-blue-700">Progress:</span>
                <div className="w-32 bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${lessonProgress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-blue-700">{Math.round(lessonProgress)}%</span>
              </div>
              
              {/* XP Display */}
              <div className="flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-blue-900">{currentXP} XP</span>
                <span className="text-xs text-blue-600">Level {calculateLevel(currentXP)}</span>
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
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Achievement Unlocked!</h2>
            <p className="text-blue-700">Bond Detective - Master of identifying bond characteristics!</p>
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
                <div className="bg-blue-100 rounded-full p-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-900">Introduction to Bond Investments</h2>
                  <p className="text-blue-600">Foundation • 45 minutes • 100 XP</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-700">Lesson Progress</span>
                  <span className="text-sm text-blue-600">{Math.round(lessonProgress)}% complete</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
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
                        ? 'bg-blue-600 text-white'
                        : overviewStep > step
                        ? 'bg-blue-100 text-blue-800'
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
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">What Are Bonds?</h3>
                    <p className="text-blue-700 mb-4">
                      Bonds are essentially loans that you give to governments or companies. In return, they promise to pay you regular interest and return your principal amount at maturity.
                    </p>
                  </div>

                  <ClientOnly>
                    <Module1VideoPlayer 
                      onComplete={() => addXP(25, 'intro-video-watched')}
                    />
                  </ClientOnly>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {bondFeatures.map((feature, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-blue-600 mb-2 flex justify-center">
                          {feature.icon}
                        </div>
                        <h4 className="font-semibold text-blue-900 mb-1">{feature.title}</h4>
                        <p className="text-xs text-blue-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setOverviewStep(2)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Continue to Bond Types
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
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Types of Bonds</h3>
                    <p className="text-blue-700 mb-4">
                      Different types of bonds offer varying levels of risk and return. Understanding these differences is crucial for making informed investment decisions.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {bondTypes.map((bondType) => (
                      <motion.div
                        key={bondType.id}
                        className="bg-blue-50 rounded-lg p-4 cursor-pointer hover:bg-blue-100 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleBondTypeClick(bondType)}
                      >
                        <div className="text-blue-600 mb-3 flex justify-center">
                          {bondType.icon}
                        </div>
                        <h4 className="font-semibold text-blue-900 mb-2">{bondType.title}</h4>
                        <p className="text-sm text-blue-600 mb-3">{bondType.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {bondType.features.map((feature, idx) => (
                            <span key={idx} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <ClientOnly>
                    <CourseAudioPlayer 
                      onComplete={() => addXP(20, 'bond-types-audio')}
                      courseId="module1"
                      language="en"
                    />
                  </ClientOnly>

                  <button
                    onClick={() => setOverviewStep(3)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Continue to Scenarios
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
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Test Your Bond Knowledge</h3>
                    <p className="text-blue-700 mb-4">
                      Apply what you've learned by analyzing these real-world bond investment scenarios.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {scenarios.map((scenario) => (
                      <div key={scenario.id} className="bg-blue-50 rounded-lg p-6">
                        <h4 className="font-semibold text-blue-900 mb-3">Scenario {scenario.id}</h4>
                        <p className="text-blue-700 mb-4">{scenario.text}</p>
                        
                        <div className="space-y-2">
                          {scenario.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                const isCorrect = index === scenario.correct;
                                handleScenarioComplete(scenario.id, isCorrect);
                                alert(`${isCorrect ? '✅ Correct!' : '❌ Incorrect.'} ${scenario.explanation}`);
                              }}
                              className="w-full text-left p-3 bg-white rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
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
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Complete Course
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
                    <h3 className="text-2xl font-bold text-blue-900 mb-3">Congratulations!</h3>
                    <p className="text-blue-700 mb-4">
                      You've completed the Introduction to Bond Investments course. You've earned <strong>{currentXP} XP</strong> and unlocked valuable bond investment knowledge.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">What You've Learned:</h4>
                    <ul className="text-left text-blue-700 space-y-2">
                      <li>✅ Bond fundamentals and key concepts</li>
                      <li>✅ Different types of bonds and their characteristics</li>
                      <li>✅ How to evaluate bond investment opportunities</li>
                      <li>✅ Red flags in bond investment offers</li>
                      <li>✅ Basic bond market mechanics</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <Link
                      href="/investment-security-course/comprehensive-bond-strategies"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      Continue to Advanced Bond Strategies
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Link>
                    
                    <Link
                      href="/investment-security-course"
                      className="w-full bg-blue-100 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-200 transition-colors flex items-center justify-center"
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
              <h3 className="font-semibold text-blue-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-600">Level {calculateLevel(currentXP)}</span>
                    <span className="text-blue-600">{getXPForNextLevel(currentXP)} XP to next level</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${((currentXP % 100) / 100) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">{currentXP}</div>
                    <div className="text-xs text-blue-500">Total XP</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">{completedActivities.size}</div>
                    <div className="text-xs text-blue-500">Activities</div>
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
                <h3 className="font-semibold text-blue-900 mb-4">Achievements</h3>
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

            {/* Next Steps */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-blue-900 mb-4">Next Steps</h3>
              <div className="space-y-3">
                <Link
                  href="/investment-security-course/comprehensive-bond-strategies"
                  className="block bg-blue-50 rounded-lg p-3 hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">Advanced Bond Strategies</div>
                      <div className="text-xs text-blue-600">2 hours • 250 XP</div>
                    </div>
                  </div>
                </Link>
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
            className="bg-white rounded-xl p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-blue-900 mb-3">{modalContent.title}</h3>
            <p className="text-blue-700 whitespace-pre-line">{modalContent.description}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
