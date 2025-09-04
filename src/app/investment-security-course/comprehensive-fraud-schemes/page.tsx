"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import FraudSimulator from '@/components/fraud-awareness/FraudSimulator';

import Module1VideoPlayer from '@/components/investment-security-course/Module1VideoPlayer';
import Module1AudioPlayer from '@/components/investment-security-course/Module1AudioPlayer';
import ClientOnly from '@/components/ClientOnly';
import { useTranslation } from '@/hooks/useTranslation';
import InteractiveInfographic from '@/components/fraud-awareness/InteractiveInfographic';
import FraudMatchingGame from '@/components/fraud-awareness/FraudMatchingGame';
import TimelineBuilder from '@/components/fraud-awareness/TimelineBuilder';
import ProgressiveRedFlagQuiz from '@/components/fraud-awareness/ProgressiveRedFlagQuiz';
import CourseCompletionCertificate from '@/components/certificates/CourseCompletionCertificate';
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
  Network,
  TrendingDown,
  PlayCircle
} from 'lucide-react';

export default function ComprehensiveFraudSchemesPage() {
  const { t } = useTranslation('courses.comprehensive-fraud-schemes');
  const { user: clerkUser, isLoaded } = useUser();
  const [overviewStep, setOverviewStep] = useState(1);
  const [currentSection, setCurrentSection] = useState<'overview' | 'simulator' | 'quiz'>('overview');
  
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
    const totalActivities = 15; // video + audio + 5 sections + 4 case studies + interactive games
    const completedCount = completedActivities.size;
    
    // Progress based on current step and activities completed
    const stepProgress = (overviewStep / 5) * 100;
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
        const response = await fetch('/api/lessons/interactions?lessonId=comprehensive-fraud-schemes', {
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
          lessonId: 'comprehensive-fraud-schemes',
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

  // Quiz questions
  const quizQuestions = useMemo(() => {
    const q1Options = t('quiz.q1.options');
    const q2Options = t('quiz.q2.options');
    const q3Options = t('quiz.q3.options');
    
    return [
      {
        id: 'q1',
        question: t('quiz.q1.question') as string,
        options: Array.isArray(q1Options) ? q1Options : [],
        correctAnswer: 1 // "They combine legitimate business operations with fraudulent investments"
      },
      {
        id: 'q2', 
        question: t('quiz.q2.question') as string,
        options: Array.isArray(q2Options) ? q2Options : [],
        correctAnswer: 1 // "Coordinated multi-platform campaigns with algorithmic support"
      },
      {
        id: 'q3',
        question: t('quiz.q3.question') as string,
        options: Array.isArray(q3Options) ? q3Options : [],
        correctAnswer: 1 // "Implement a multi-layer verification process"
      }
    ];
  }, [t]);

  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmitQuiz = async () => {
    let correctAnswers = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / quizQuestions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    
    // Award XP for completing quiz
    await addXP(100, 'comprehensive-quiz-completed');
    
    if (score >= 70) {
      await addXP(300, 'comprehensive-module-completed');
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-6 py-8">
          <Link href="/investment-security-course" 
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-orange-200 text-sm font-medium mb-2">
                {t('header.module') as string}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {t('header.title') as string}
              </h1>
              <div className="text-orange-200">
                {t('header.xp') as string} • {Math.round(lessonProgress)}% Complete
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-orange-300 mr-2" />
                <span className="text-orange-100">{currentXP} XP</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-orange-200 mb-2">
              <span>{t('header.progress') as string}</span>
              <span>{Math.round(lessonProgress)}%</span>
            </div>
            <div className="w-full bg-orange-800 rounded-full h-2">
              <motion.div 
                className="bg-orange-300 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${lessonProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {(['overview', 'simulator', 'quiz'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentSection(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  currentSection === tab
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t(`tabs.${tab}`) as string}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-12">
        {currentSection === 'overview' && (
          <div className="max-w-4xl mx-auto">
            {/* Video Section */}
            <div className="mb-12">
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-4">
                <div className="text-center text-white">
                  <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <h3 className="text-xl font-semibold mb-2">{t('overview.video.title') as string}</h3>
                  <p className="text-gray-300">{t('overview.video.duration') as string}</p>
                </div>
              </div>
              <button 
                onClick={() => addXP(50, 'video-watched')}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                ▶ Watch Advanced Fraud Detection Video
              </button>
            </div>

            {/* Section Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4, 5].map((step) => (
                  <button
                    key={step}
                    onClick={() => setOverviewStep(step)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      overviewStep === step
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            {overviewStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Network className="w-6 h-6 text-orange-600 mr-2" />
                  {t('overview.section1.title') as string}
                </h2>
                <p className="text-gray-700 mb-4">{t('overview.section1.p1') as string}</p>
                <p className="text-gray-700 mb-4">{t('overview.section1.p2') as string}</p>
                <p className="text-gray-700 mb-4">{t('overview.section1.p3') as string}</p>
                <ul className="space-y-2 mb-8">
                  {(() => {
                    const listItems = t('overview.section1.list');
                    const items = Array.isArray(listItems) ? listItems : [];
                    return items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ));
                  })()} 
                </ul>
                <button 
                  onClick={() => {
                    addXP(25, 'section1-completed');
                    setOverviewStep(2);
                  }}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Continue to Advanced Schemes →
                </button>
              </motion.div>
            )}

            {/* Continue with other sections... */}
            {overviewStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingDown className="w-6 h-6 text-orange-600 mr-2" />
                  {t('overview.section2.title') as string}
                </h2>
                <p className="text-gray-700 mb-6">{t('overview.section2.p1') as string}</p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">
                      {t('overview.section2.modernPonzi.title') as string}
                    </h3>
                    <p className="text-orange-800 text-sm">
                      {t('overview.section2.modernPonzi.description') as string}
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">
                      {t('overview.section2.hybridSchemes.title') as string}
                    </h3>
                    <p className="text-red-800 text-sm">
                      {t('overview.section2.hybridSchemes.description') as string}
                    </p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                      {t('overview.section2.legitimateFronts.title') as string}
                    </h3>
                    <p className="text-yellow-800 text-sm">
                      {t('overview.section2.legitimateFronts.description') as string}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    addXP(25, 'section2-completed');
                    setOverviewStep(3);
                  }}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Continue to Market Manipulation →
                </button>
              </motion.div>
            )}

            {/* Add more sections as needed... */}
            <div className="mt-12 text-center">
              <button
                onClick={() => setCurrentSection('simulator')}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium inline-flex items-center"
              >
                {t('overview.button.practice') as string}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {currentSection === 'simulator' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Advanced Fraud Detection Simulator</h2>
            <FraudSimulator />
            <div className="text-center mt-8">
              <button
                onClick={() => setCurrentSection('quiz')}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium inline-flex items-center"
              >
                {t('simulator.button.quiz') as string}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {currentSection === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">{t('quiz.title') as string}</h2>
            <p className="text-center text-gray-600 mb-8">{t('quiz.subtitle') as string}</p>
            
            {!quizSubmitted ? (
              <div className="space-y-8">
                {quizQuestions.map((question, qIndex) => (
                  <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
                    <div className="space-y-3">
                      {question.options.map((option, oIndex) => (
                        <label key={oIndex} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={question.id}
                            value={oIndex}
                            onChange={() => handleAnswerChange(question.id, oIndex)}
                            className="mr-3"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="text-center">
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(userAnswers).length !== quizQuestions.length}
                    className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {t('quiz.button.submit') as string}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className={`p-8 rounded-lg ${quizScore >= 70 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className={`text-4xl font-bold mb-4 ${quizScore >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                    {quizScore}%
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${quizScore >= 70 ? 'text-green-800' : 'text-red-800'}`}>
                    {quizScore >= 70 ? t('completion.title') as string : 'Quiz Complete'}
                  </h3>
                  <p className={`${quizScore >= 70 ? 'text-green-700' : 'text-red-700'}`}>
                    {quizScore >= 70 ? t('completion.subtitle') as string : 'You need 70% to pass. Please try again.'}
                  </p>
                </div>
                
                <Link
                  href="/investment-security-course"
                  className="inline-block mt-8 bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  {t('completion.button') as string}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* XP Animation */}
      {showXPAnimation && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.5 }}
          className="fixed top-20 right-6 bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg z-50"
        >
          +{lastXPEarned} XP
        </motion.div>
      )}

      {/* Celebration Animation */}
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 text-center max-w-md mx-4"
          >
            <Trophy className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
            <p className="text-gray-600 mb-4">You've completed the Advanced Fraud Detection module!</p>
            <div className="text-3xl font-bold text-orange-600">+400 XP</div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
