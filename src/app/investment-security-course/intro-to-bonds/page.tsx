"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import FraudSimulator from '@/components/fraud-awareness/FraudSimulator';

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
import introRedFlagScenarios from '@/data/fraud-scenarios/intro-red-flags.json';
import { moduleProgressStore } from '@/lib/module-progress-store';
import { 
  ArrowLeft,
  ChevronRight,
  BookOpen,
  AlertTriangle,
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
  DollarSign,
  MessageCircle,
  Phone,
  Clock,
  Calculator,
  LineChart,
  BarChart3,
  Landmark
} from 'lucide-react';

export default function IntroToBondsPage() {
  const { t } = useTranslation('courses.intro-to-bonds');
  const { user: clerkUser, isLoaded } = useUser(); // Get user data and loading state from Clerk
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
          // User is not authenticated, start with fresh progress
          setCurrentXP(0);
          setCompletedActivities(new Set());
        } else {
          console.log('Database unavailable, starting with fresh progress');
          // Start with fresh progress if database is unavailable
          setCurrentXP(0);
          setCompletedActivities(new Set());
        }
      } catch (error) {
        console.log('Database connection failed, starting with fresh progress:', error);
        // Start with fresh progress if database connection fails
        setCurrentXP(0);
        setCompletedActivities(new Set());
      }
    };

    loadProgress();
  }, [clerkUser]); // Re-run when clerkUser changes

  const addXP = async (amount: number, activityId: string) => {
    if (completedActivities.has(activityId)) {
      console.log(`XP already awarded for ${activityId}`);
      return; // Don't award XP twice
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
          interactionType: activityId.includes('red-flag') ? 'SCENARIO' : 'DECISION',
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
      text: "A company offers you a bond with a 12% annual return, saying it's backed by government guarantees. They require immediate payment through cryptocurrency and promise monthly payouts. The company has no credit rating and their website was created last month.",
      options: [
        "This appears attractive due to high yield and government backing",
        "The cryptocurrency payment requirement and lack of credit rating suggest this is likely a fraudulent scheme disguised as a legitimate bond",
        "The monthly payouts make this a solid investment opportunity"
      ],
      answer: "The cryptocurrency payment requirement and lack of credit rating suggest this is likely a fraudulent scheme disguised as a legitimate bond",
    },
    {
      id: 2,
      text: "An investment advisor offers you 'exclusive access' to corporate bonds yielding 15% annually from well-known companies. However, the bonds aren't traded on any exchange, documentation is minimal, and the advisor pressures you to invest immediately before the 'limited offer expires.'",
      options: [
        "This represents exclusive access to high-yield corporate opportunities",
        "The lack of exchange trading, minimal documentation, and high-pressure tactics indicate potential bond fraud using familiar company names",
        "This reflects normal private bond market operations"
      ],
      answer: "The lack of exchange trading, minimal documentation, and high-pressure tactics indicate potential bond fraud using familiar company names",
    },
    {
      id: 3,
      text: "A municipal bond salesperson claims their bonds are 'completely tax-free' with 8% returns, much higher than similar rated municipals yielding 4%. They avoid discussing specific municipality details and focus on tax benefits. The bonds have complex structures involving multiple jurisdictions.",
      options: [
        "This appears to be normal municipal bond tax optimization",
        "The excessive yield premium, vague municipality details, and complex structures suggest potential municipal bond fraud or tax evasion schemes",
        "This reflects sophisticated tax planning for high-net-worth investors"
      ],
      answer: "The excessive yield premium, vague municipality details, and complex structures suggest potential municipal bond fraud or tax evasion schemes",
    },
  ];

  const handleCompleteLesson = async () => {
    try {
      // Mark lesson as complete in the backend
      await fetch('/api/lessons/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          lessonId: 'intro-to-bonds',
          courseId: 'clx2no2g0000008l8g8r8g8r8',
        }),
      });

      // Mark the entire module as complete and unlock next modules
      const completeResponse = await fetch('/api/courses/bond-intro/complete-module', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          moduleId: 'intro-to-bonds',
        }),
      });

      if (completeResponse.ok) {
        const data = await completeResponse.json();
        console.log('Module completed successfully:', data);
        console.log('Unlocked modules:', data.unlockedModules);
      }
      
      // Also save to localStorage for persistence
      if (clerkUser?.id) {
        moduleProgressStore.markModuleComplete(clerkUser.id, 'intro-to-bonds', currentXP || 100);
        console.log('Module progress saved to localStorage');
      }

      // Generate certificate immediately
      await generateCertificate();

    } catch (error) {
      console.error('Failed to mark lesson as complete', error);
      // Still show certificate even if backend fails
      await generateCertificate();
    }
  };

  const generateCertificate = async () => {
    try {
      if (!clerkUser?.id) {
        console.error('No authenticated user found for certificate generation');
        return;
      }

      // Check if certificate already exists in database
      try {
        const existingCertResponse = await fetch(`/api/certificates/lookup?moduleId=intro-to-bonds&courseId=bond-intro-course`, {
          credentials: 'include'
        });
        
        if (existingCertResponse.ok) {
          const existingCert = await existingCertResponse.json();
          if (existingCert.exists && existingCert.certificate) {
            console.log('Found existing certificate, using stored completion date:', existingCert.certificate.completionDate);
            setCertificateData({
              id: existingCert.certificate.id,
              userName: existingCert.certificate.userName,
              courseName: existingCert.certificate.courseName,
              totalXP: existingCert.certificate.totalXP,
              moduleCount: existingCert.certificate.moduleCount,
              completedModules: existingCert.certificate.certificateData?.completedModules || [],
              completionDate: existingCert.certificate.completionDate,
              publicUrl: existingCert.certificate.publicUrl
            });
            setShowCertificate(true);
            return;
          }
        }
      } catch (checkError) {
        console.log('Could not check existing certificate, will create new one:', checkError);
      }

      // Determine the completion date (for new certificates)
      let completionDate = new Date().toISOString();
      
      // Try to get actual course completion date from the new database structure
      try {
        const moduleProgressResponse = await fetch('/api/courses/investment-security/modules', {
          credentials: 'include'
        });
        
        if (moduleProgressResponse.ok) {
          const moduleData = await moduleProgressResponse.json();
          const bondModule = moduleData.modules.find((m: any) => m.id === 'intro-to-bonds');
          
          if (bondModule && bondModule.progress === 100) {
            // Try to get the completion date from ModuleProgress or CourseEnrollment
            const completionResponse = await fetch('/api/user/course-completion-date?moduleId=intro-to-bonds', {
              credentials: 'include'
            });
            
            if (completionResponse.ok) {
              const completionData = await completionResponse.json();
              if (completionData.completionDate) {
                completionDate = completionData.completionDate;
                console.log('Using actual completion date from course progress:', completionDate);
              }
            }
          }
        }
      } catch (progressError) {
        console.log('Could not get course progress completion date:', progressError);
      }
      
      // Fallback to reasonable historical date if no specific completion date found
      if (completionDate === new Date().toISOString()) {
        try {
          const userResponse = await fetch('/api/user/me', {
            credentials: 'include'
          });
          
          if (userResponse.ok) {
            const userData = await userResponse.json();
            if (userData.createdAt) {
              const userCreatedAt = new Date(userData.createdAt);
              const estimatedCompletion = new Date(userCreatedAt.getTime() + 24 * 60 * 60 * 1000);
              completionDate = estimatedCompletion.toISOString();
              console.log('Using estimated completion date based on user creation:', completionDate);
            }
          }
        } catch (dateError) {
          console.log('Could not get user creation date, using fixed historical date:', dateError);
          completionDate = '2025-08-13T00:00:00.000Z';
        }
      }
      
      const completedModules = [
        {
          id: 'intro-to-bonds',
          title: 'Introduction to Bond Investment',
          xpEarned: currentXP || 100,
          completedAt: completionDate,
          completed: true
        }
      ];

      // Get user name from Clerk user or use fallback
      const userName = clerkUser?.fullName || 
        (clerkUser?.firstName && clerkUser?.lastName ? `${clerkUser.firstName} ${clerkUser.lastName}` : null) ||
        clerkUser?.firstName ||
        clerkUser?.username ||
        clerkUser?.primaryEmailAddress?.emailAddress ||
        'Course Participant';
      
      console.log('Certificate generation - userName selected:', userName, 'from clerkUser:', clerkUser);
      console.log('Certificate completion date:', completionDate);
      
      const certificateData = {
        userName: userName,
        courseName: 'Bond Investment Course - Introduction to Bond Investment',
        totalXP: currentXP || 100,
        moduleCount: 1,
        completedModules,
        completionDate: completionDate
      };

      // Store certificate in database
      try {
        const storeResponse = await fetch('/api/certificates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            userClerkId: clerkUser.id,
            moduleId: 'intro-to-bonds',
            courseId: 'bond-intro-course',
            courseName: certificateData.courseName,
            userName: certificateData.userName,
            totalXP: certificateData.totalXP,
            moduleCount: certificateData.moduleCount,
            completedModules: certificateData.completedModules,
            completionDate: certificateData.completionDate
          })
        });

        if (storeResponse.ok) {
          const storeData = await storeResponse.json();
          console.log('Certificate stored in database:', storeData);
          setCertificateData({
            id: storeData.certificate.id,
            ...certificateData,
            publicUrl: storeData.publicUrl
          });
        } else {
          console.log('Certificate storage failed, using local data');
          setCertificateData({
            id: `CERT-BOND-INTRO-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            ...certificateData
          });
        }
      } catch (storeError) {
        console.log('Certificate storage error, using local data:', storeError);
        setCertificateData({
          id: `CERT-BOND-INTRO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          ...certificateData
        });
      }
      
      setShowCertificate(true);
      
    } catch (error) {
      console.error('Certificate generation error:', error);
      // Fallback: create certificate data directly
      const userName = clerkUser?.fullName || 
        (clerkUser?.firstName && clerkUser?.lastName ? `${clerkUser.firstName} ${clerkUser.lastName}` : null) ||
        clerkUser?.firstName ||
        clerkUser?.username ||
        clerkUser?.primaryEmailAddress?.emailAddress ||
        'Course Participant';
        
      // Use historical date for fallback certificate too
      const historicalCompletionDate = '2025-08-13T00:00:00.000Z';
      
      const fallbackCertificate = {
        id: `CERT-BOND-INTRO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        userName: userName,
        courseName: 'Bond Investment Course - Introduction to Bond Investment',
        totalXP: currentXP || 100,
        moduleCount: 1,
        completedModules: [
          {
            id: 'intro-to-bonds',
            title: 'Introduction to Bond Investment',
            xpEarned: currentXP || 100,
            completedAt: historicalCompletionDate,
            completed: true
          }
        ],
        completionDate: historicalCompletionDate
      };
      setCertificateData(fallbackCertificate);
      setShowCertificate(true);
    }
  };

  const openModal = (title: string, description: string) => {
    setModalContent({ title, description });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  // Show sign-in prompt if user is not authenticated
  if (!clerkUser) {
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
                  <p className="text-xs text-gray-500">Module 1</p>
                  <h1 className="text-lg font-semibold">Introduction to Bond Investment</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign-in Required Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-8 shadow-lg border border-gray-200"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Sign In Required
              </h2>
              
              <p className="text-gray-600 mb-6">
                To access this bond investment course and earn your personalized certificate, 
                please sign in to your account.
              </p>
              
              <div className="space-y-4">
                <SignInButton mode="modal">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    Sign In to Start Course
                  </button>
                </SignInButton>
                
                <div className="text-sm text-gray-500">
                  <p>✓ Track your progress</p>
                  <p>✓ Earn XP and achievements</p>
                  <p>✓ Get your personalized certificate</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

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
                <p className="text-xs text-gray-500">{t('header.module') as string}</p>
                <h1 className="text-lg font-semibold">{t('header.title') as string}</h1>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden md:flex items-center gap-4">
              <div className="w-48">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{t('header.progress') as string}</span>
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
                    +{lastXPEarned} XP
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Stepper */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <div className={`h-1 flex-1 ${overviewStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              <div className={`h-1 flex-1 ${overviewStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
              <div className={`h-1 flex-1 ${overviewStep >= 4 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 4 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
            </div>
          </div>

            {overviewStep === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-4">{t('overview.section1.title') as string}</h2>
                
                {/* XP Overview Section */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 mb-6 border border-yellow-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Earn XP by Learning!</h3>
                      <p className="text-sm text-gray-600">Complete activities to gain experience points and track your progress</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xs">📹</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Watch Video</p>
                        <p className="text-xs text-gray-500">20 XP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-xs">🎵</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Listen Audio</p>
                        <p className="text-xs text-gray-500">15 XP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-xs">🎯</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Interactive</p>
                        <p className="text-xs text-gray-500">10-25 XP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-xs">🚩</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Spot Red Flags</p>
                        <p className="text-xs text-gray-500">15 XP each</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Video Section */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{t('overview.video.title') as string}</h3>
                    <div className="flex items-center gap-2 text-sm bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span className="text-yellow-700 font-medium">+20 XP</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{t('overview.video.duration') as string}</p>
                  
                  <div className="relative mb-4">
                    <ClientOnly>
                      <Module1VideoPlayer 
                        defaultLanguage={clerkUser?.publicMetadata?.language as any || 'en'}
                        courseId="intro-to-bonds"
                        onComplete={() => addXP(20, 'video-completed')}
                        isCompleted={completedActivities.has('video-completed')}
                      />
                    </ClientOnly>
                  </div>
                  
                  {completedActivities.has('video-completed') && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Video completed (+20 XP)</span>
                    </div>
                  )}
                </div>

                {/* Audio Section */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Audio Lesson</h3>
                    <div className="flex items-center gap-2 text-sm bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span className="text-yellow-700 font-medium">+15 XP</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Listen to the comprehensive audio version • 8 minutes</p>
                  
                  <div className="relative mb-4">
                    <ClientOnly>
                      <CourseAudioPlayer 
                        courseId="intro-to-bonds"
                        language={clerkUser?.publicMetadata?.language as any || 'en'}
                        defaultLanguage={clerkUser?.publicMetadata?.language as any || 'en'}
                        className="mb-4"
                        onComplete={() => addXP(15, 'audio-completed')}
                        isCompleted={completedActivities.has('audio-completed')}
                      />
                    </ClientOnly>
                  </div>
                  
                  {completedActivities.has('audio-completed') && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Audio lesson completed (+15 XP)</span>
                    </div>
                  )}
                </div>

                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Introduction to Bond Investment</h3>
                  <p className="text-gray-700 mb-4">{t('overview.section1.p1') as string}</p>
                  <p className="text-gray-700 mb-4">{t('overview.section1.p2') as string}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-3">{t('overview.section1.p3') as string}</h4>
                    <ul className="space-y-2 text-gray-700">
                      {Array.isArray(t('overview.section1.list')) 
                        ? (t('overview.section1.list') as string[]).map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))
                        : [
                            "Face Value: The principal amount repaid at maturity",
                            "Coupon Rate: The annual interest rate paid to bondholders",
                            "Maturity Date: When the bond expires and principal is repaid",
                            "Yield to Maturity: Total return if held until maturity"
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))
                      }
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button onClick={() => setOverviewStep(2)} className="bg-blue-500 text-white px-6 py-2 rounded-lg">Next</button>
                </div>
              </motion.div>
            )}

            {overviewStep === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6">{t('overview.section2.title') as string}</h2>
                
                {/* Basic Bond Type Cards - Educational First */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Major Bond Categories</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {['government_bonds', 'corporate_bonds', 'municipal_bonds'].map((bondType, index) => (
                      <motion.div 
                        key={bondType}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                          addXP(10, `bond-type-${bondType}`);
                          // Add confetti effect for first time clicks
                          if (!completedActivities.has(`bond-type-${bondType}`)) {
                            setShowCelebration(true);
                            setTimeout(() => setShowCelebration(false), 1500);
                          }
                        }}
                        className={`p-6 border rounded-xl cursor-pointer transition-all hover:scale-105 hover:shadow-xl relative overflow-hidden ${
                          completedActivities.has(`bond-type-${bondType}`) 
                            ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100' 
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50'
                        }`}
                      >
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl" />
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${
                                bondType === 'government_bonds' ? 'bg-red-400' :
                                bondType === 'corporate_bonds' ? 'bg-orange-400' : 'bg-purple-400'
                              }`} />
                              <h3 className="font-bold text-gray-800">{
                                bondType === 'government_bonds' ? t('overview.section2.government.title') as string :
                                bondType === 'corporate_bonds' ? t('overview.section2.corporate.title') as string : t('overview.section2.municipal.title') as string
                              }</h3>
                            </div>
                            {completedActivities.has(`bond-type-${bondType}`) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                              >
                                <CheckCircle className="w-6 h-6 text-green-500" />
                              </motion.div>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-4">{
                            bondType === 'government_bonds' ? t('overview.section2.government.description') as string :
                            bondType === 'corporate_bonds' ? t('overview.section2.corporate.description') as string : 
                            t('overview.section2.municipal.description') as string
                          }</p>
                          
                          {!completedActivities.has(`bond-type-${bondType}`) && (
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-blue-500" />
                              <p className="text-xs text-blue-600 font-medium">Click to explore (+10 XP)</p>
                            </div>
                          )}
                          
                          {completedActivities.has(`bond-type-${bondType}`) && (
                            <div className="flex items-center gap-2">
                              <Trophy className="w-4 h-4 text-yellow-500" />
                              <p className="text-xs text-green-600 font-medium">Mastered! +10 XP</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Interactive Games Section */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Bond Investment Analysis Exercises</h3>
                    <p className="text-gray-600">Master bond fundamentals through interactive scenario analysis</p>
                  </div>

                  {/* Bond Portfolio Analysis */}
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Bond Portfolio Construction</h3>
                    <p className="text-gray-600 mb-6">Analyze different bond types and learn how to construct a balanced bond portfolio</p>
                    
                    <FraudMatchingGame 
                      onComplete={(score) => {
                        addXP(35, 'bond-portfolio-analysis-completed');
                        setCurrentQuizScore(score);
                        if (score >= 85) {
                          setShowCelebration(true);
                          setTimeout(() => setShowCelebration(false), 3000);
                        }
                      }}
                      isCompleted={completedActivities.has('bond-portfolio-analysis-completed')}
                    />
                  </div>

                  {/* Bond Investment Timeline Builder */}
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Bond Investment Journey Timeline</h3>
                    <p className="text-gray-600 mb-4">Understand the typical progression of a bond investor from beginner to advanced</p>
                    
                    <TimelineBuilder 
                      events={[
                        { id: '1', text: 'Start with government bonds for safety and learning', stage: 'early' },
                        { id: '2', text: 'Understand bond pricing and yield relationships', stage: 'early' },
                        { id: '3', text: 'Explore investment-grade corporate bonds', stage: 'early' },
                        { id: '4', text: 'Learn about municipal bonds and tax benefits', stage: 'middle' },
                        { id: '5', text: 'Diversify across different sectors and maturities', stage: 'middle' },
                        { id: '6', text: 'Consider international bonds for geographic diversification', stage: 'middle' },
                        { id: '7', text: 'Implement advanced strategies like bond ladders', stage: 'end' },
                        { id: '8', text: 'Monitor and rebalance portfolio based on market conditions', stage: 'end' }
                      ]}
                      onComplete={() => addXP(30, 'bond-journey-timeline-completed')}
                      isCompleted={completedActivities.has('bond-journey-timeline-completed')}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button onClick={() => setOverviewStep(1)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button onClick={() => setOverviewStep(3)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">Next</button>
                </div>
              </motion.div>
            )}

            {overviewStep === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-4">Step 3: Bond Investment Red Flags</h2>
                <p className="text-gray-700 mb-6">Learn to identify suspicious bond offerings and fraudulent investment schemes that target unsuspecting investors. Understanding these red flags is crucial for protecting your capital in the bond market.</p>
                
                {/* Advanced Red Flag Analysis */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('overview.spotTheBondRisk.title') as string}</h3>
                  <p className="text-gray-600 mb-6">Analyze scenarios involving bond investment offers that may contain red flags or fraudulent elements. These scenarios require careful analysis to identify warning signs that suggest problematic investments. Each scenario awards 25 XP when completed correctly.</p>
                  
                  <SpotTheRedFlag 
                    scenarios={scenarios}
                    onScenarioComplete={(scenarioId: number, isCorrect: boolean) => {
                      if (isCorrect) {
                        addXP(25, `bond-red-flag-scenario-${scenarioId}`);
                      }
                    }}
                  />
                </div>
                
                <div className="flex justify-between">
                  <button onClick={() => setOverviewStep(2)} className="bg-gray-200 px-6 py-2 rounded-lg">Back</button>
                  <button onClick={() => setOverviewStep(4)} className="bg-green-500 text-white px-6 py-2 rounded-lg">{t('overview.button.practice') as string}</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Bond Investment Simulator */}
            {overviewStep === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-4">{t('simulator.title') as string}</h2>
                <p className="text-gray-700 mb-6">{t('simulator.description') as string}</p>
                
                <div className="bg-white rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Bond Investment Decision Making</h3>
                    <div className="flex items-center gap-2 text-sm bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span className="text-yellow-700 font-medium">+50 XP</span>
                    </div>
                  </div>
                  
                  <FraudSimulator 
                    onComplete={() => {
                      addXP(50, 'bond-simulator-completed');
                      handleCompleteLesson();
                    }}
                    isCompleted={completedActivities.has('bond-simulator-completed')}
                  />
                  
                  {completedActivities.has('bond-simulator-completed') && (
                    <div className="bg-green-50 rounded-lg p-4 mt-4 border border-green-200">
                      <div className="flex items-center gap-2 text-green-600 text-sm mb-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Bond Investment Course Completed (+50 XP) - Course Complete! 🎉</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Congratulations! You've successfully completed the Introduction to Bond Investment course and now understand the fundamentals of bond investing.</p>
                      <button
                        onClick={() => {
                          console.log('=== CERTIFICATE GENERATION DEBUG ===');
                          console.log('Main View Certificate clicked');
                          console.log('Current certificateData:', certificateData);
                          console.log('Current XP:', currentXP);
                          console.log('Raw clerkUser object:', clerkUser);
                          console.log('clerkUser keys:', clerkUser ? Object.keys(clerkUser) : 'null');
                          console.log('clerkUser.username:', clerkUser?.username);
                          console.log('clerkUser.primaryEmailAddress:', clerkUser?.primaryEmailAddress?.emailAddress);
                          console.log('clerkUser.fullName:', clerkUser?.fullName);
                          console.log('clerkUser.firstName:', clerkUser?.firstName);
                          console.log('clerkUser.lastName:', clerkUser?.lastName);
                          
                          // Try different name fields that might come from Clerk
                          const possibleUserNames = {
                            username: clerkUser?.username,
                            email: clerkUser?.primaryEmailAddress?.emailAddress,
                            fullName: clerkUser?.fullName,
                            firstName: clerkUser?.firstName,
                            lastName: clerkUser?.lastName,
                            publicMetadata: clerkUser?.publicMetadata,
                            unsafeMetadata: clerkUser?.unsafeMetadata
                          };
                          console.log('All possible name fields:', possibleUserNames);
                          
                          // Determine the best user name to use
                          let userName = 'Course Participant';
                          if (clerkUser?.fullName) {
                            userName = clerkUser.fullName;
                            console.log('Using fullName field:', userName);
                          } else if (clerkUser?.firstName && clerkUser?.lastName) {
                            userName = `${clerkUser.firstName} ${clerkUser.lastName}`;
                            console.log('Using firstName + lastName:', userName);
                          } else if (clerkUser?.firstName) {
                            userName = clerkUser.firstName;
                            console.log('Using firstName only:', userName);
                          } else if (clerkUser?.username) {
                            userName = clerkUser.username;
                            console.log('Using username:', userName);
                          } else if (clerkUser?.primaryEmailAddress?.emailAddress) {
                            userName = clerkUser.primaryEmailAddress.emailAddress;
                            console.log('Using email:', userName);
                          } else {
                            console.log('No user data available, using fallback:', userName);
                          }
                          
                          // Use historical date for debug certificate too
                          const historicalCompletionDate = '2025-08-13T00:00:00.000Z';
                          
                          const mainCertificate = {
                            id: `CERT-BOND-INTRO-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                            userName: userName,
                            courseName: 'Bond Investment Course - Introduction to Bond Investment',
                            totalXP: currentXP || 100,
                            moduleCount: 1,
                            completedModules: [
                              {
                                id: 'intro-to-bonds',
                                title: 'Introduction to Bond Investment',
                                xpEarned: currentXP || 100,
                                completedAt: historicalCompletionDate,
                                completed: true
                              }
                            ],
                            completionDate: historicalCompletionDate
                          };
                          
                          console.log('Final userName selected:', userName);
                          console.log('Generated certificate data:', mainCertificate);
                          setCertificateData(mainCertificate);
                          setShowCertificate(true);
                          console.log('Certificate modal should be showing now');
                          console.log('=== END CERTIFICATE DEBUG ===');
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105"
                      >
                        <Trophy className="w-4 h-4" />
                        View Certificate
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <button onClick={() => setOverviewStep(3)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <Link
                    href="/investment-security-course"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Complete Course 🏆
                  </Link>
                </div>
              </motion.div>
            )}

          </motion.div>
      </div>
      <CaseStudyModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={modalContent.title} 
        description={modalContent.description} 
      />
      
      {/* Certificate Modal */}
      {showCertificate && certificateData && (
        <CourseCompletionCertificate
          userName={certificateData.userName}
          courseName={certificateData.courseName}
          completionDate={certificateData.completionDate}
          moduleCount={certificateData.moduleCount}
          completedModules={certificateData.completedModules}
          certificateId={certificateData.id}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}
