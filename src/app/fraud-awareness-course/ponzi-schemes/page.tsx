"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FraudSimulator from '@/components/fraud-awareness/FraudSimulator';
import Module1AudioPlayer from '@/components/stock-market-course/Module1AudioPlayer';
import Module1VideoPlayer from '@/components/fraud-awareness-course/Module1VideoPlayer';
import ClientOnly from '@/components/ClientOnly';
import { useTranslation } from '@/hooks/useTranslation';
import TimelineBuilder from '@/components/fraud-awareness/TimelineBuilder';
import FraudMatchingGame from '@/components/fraud-awareness/FraudMatchingGame';
import ProgressiveRedFlagQuiz from '@/components/fraud-awareness/ProgressiveRedFlagQuiz';
import quizData from '@/data/quizzes/ponzi-schemes.json';
import redFlagScenarios from '@/data/fraud-scenarios/ponzi-red-flags.json';
import { 
  ArrowLeft,
  ChevronRight,
  PlayCircle,
  BookOpen,
  AlertTriangle,
  Shield,
  CheckCircle,
  Clock,
  Trophy,
  TrendingUp,
  Users,
  Zap,
  Lock,
  Repeat,
  Briefcase,
  RefreshCw,
  Target,
  Brain,
  Sparkles,
  Award,
  DollarSign,
  TrendingDown,
  Layers,
  Phone,
  MessageCircle
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizResult {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  results: { [key: string]: boolean };
}

export default function PonziSchemesPage() {
  const { t } = useTranslation('courses.ponzi-schemes');
  const [currentSection, setCurrentSection] = useState<'overview' | 'simulator' | 'quiz'>('overview');
  const [overviewStep, setOverviewStep] = useState(1);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  
  // Track engagement and XP
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [currentXP, setCurrentXP] = useState(0);
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  
  // Gamification state
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentQuizScore, setCurrentQuizScore] = useState(0);

  const lessonProgress = useMemo(() => {
    // Base activities that contribute to progress
    const totalActivities = 10; // video + audio + 4 case study interactions + 2 games + 2 red flag scenarios
    const completedCount = completedActivities.size;
    
    if (currentSection === 'overview') {
      // Progress based on actual engagement, not just navigation
      return Math.min(33, Math.round((completedCount / totalActivities) * 33));
    }
    if (currentSection === 'simulator') return Math.min(66, 33 + Math.round((completedCount / totalActivities) * 33));
    if (currentSection === 'quiz') return 100;
    return 0;
  }, [currentSection, completedActivities]);

  // Load existing progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await fetch('/api/lessons/interactions?lessonId=ponzi-schemes');
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
    
    // Randomly select 5 questions
    const shuffled = [...quizData.questions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 5));
  }, []);

  const addXP = async (amount: number, activityId: string) => {
    if (completedActivities.has(activityId)) return; // Don't award XP twice
    
    try {
      const response = await fetch('/api/lessons/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: 'ponzi-schemes',
          interactionId: activityId,
          xpEarned: amount,
          interactionType: activityId.includes('red-flag') ? 'SCENARIO' : 'DECISION',
          response: 'completed',
          isCorrect: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCompletedActivities(prev => new Set([...prev, activityId]));
          setCurrentXP(prev => prev + amount);
          setShowXPAnimation(true);
          setTimeout(() => setShowXPAnimation(false), 2000);
        }
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

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitQuiz = async () => {
    let correctAnswers = 0;
    const results: { [key: string]: boolean } = {};

    quizQuestions.forEach(q => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (isCorrect) {
        correctAnswers++;
      }
      results[q.id] = isCorrect;
    });

    const score = Math.round((correctAnswers / quizQuestions.length) * 100);
    setQuizResult({ score, correctAnswers, wrongAnswers: quizQuestions.length - correctAnswers, results });
    handleCompleteLesson();

    try {
      await fetch('/api/quizzes/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: 'ponzi-schemes',
          courseId: 'clx2no2g0000008l8g8r8g8r8',
          score,
          answers: userAnswers,
        }),
      });
    } catch (error) {
      console.error('Failed to save quiz results', error);
    }
  };

  const handleCompleteLesson = async () => {
    try {
      await fetch('/api/lessons/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: 'ponzi-schemes',
          courseId: 'clx2no2g0000008l8g8r8g8r8',
        }),
      });
    } catch (error) {
      console.error('Failed to mark lesson as complete', error);
    }
  };

  const restartQuiz = () => {
    const shuffled = [...quizData.questions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 5));
    setUserAnswers({});
    setQuizResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/fraud-awareness-course"
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
                    +{currentXP > 0 ? '10' : '0'} XP
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
                {t('tabs.overview') as string}
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
                {t('tabs.simulator') as string}
              </div>
            </button>
            <button
              onClick={() => {
                setCurrentSection('quiz');
              }}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'quiz'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {t('tabs.quiz') as string}
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
            {/* Stepper */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <div className={`h-1 flex-1 ${overviewStep >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <div className={`h-1 flex-1 ${overviewStep >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                <div className={`h-1 flex-1 ${overviewStep >= 4 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 4 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
              </div>
            </div>

            {/* Step 1: What Are Ponzi Schemes? */}
            {overviewStep === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <TrendingDown className="w-6 h-6 text-orange-500" />
                  Understanding Ponzi Schemes
                </h2>
                
                {/* Video Section */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">📹 How Ponzi Schemes Work</h3>
                  <p className="text-sm text-gray-600 mb-4">Duration: 8 minutes</p>
                  
                  <div className="relative mb-4">
                    <ClientOnly>
                      <Module1VideoPlayer 
                        onComplete={() => addXP(20, 'ponzi-video-completed')}
                        isCompleted={completedActivities.has('ponzi-video-completed')}
                      />
                    </ClientOnly>
                  </div>
                  
                  {completedActivities.has('ponzi-video-completed') && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Video completed (+20 XP)</span>
                    </div>
                  )}
                </div>

                {/* Audio Section */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">🎧 Audio: Charles Ponzi's Original Scheme</h3>
                  <p className="text-sm text-gray-600 mb-4">Duration: 6 minutes</p>
                  
                  <div className="relative mb-4">
                    <ClientOnly>
                      <Module1AudioPlayer 
                        onComplete={() => addXP(15, 'ponzi-audio-completed')}
                        isCompleted={completedActivities.has('ponzi-audio-completed')}
                      />
                    </ClientOnly>
                  </div>
                  
                  {completedActivities.has('ponzi-audio-completed') && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Audio completed (+15 XP)</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 mb-6 border border-orange-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    What is a Ponzi Scheme?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    A Ponzi scheme is a fraudulent investment operation where returns for existing investors are generated using new investors' money, rather than from legitimate business operations. The scheme creates an illusion of a successful investment opportunity.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded p-4 border border-orange-200">
                      <h4 className="font-semibold text-orange-700 mb-2">Key Characteristics:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Promises of high returns with little risk</li>
                        <li>• Uses new investor money to pay earlier investors</li>
                        <li>• Creates false appearance of legitimacy</li>
                        <li>• Eventually collapses when new investors stop joining</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded p-4 border border-red-200">
                      <h4 className="font-semibold text-red-700 mb-2">Warning Signs:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Unusually consistent high returns</li>
                        <li>• Secretive investment strategies</li>
                        <li>• Pressure to recruit more investors</li>
                        <li>• Difficulty withdrawing funds</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button onClick={() => setOverviewStep(2)} className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">Next: Famous Cases</button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Famous Indian Cases */}
            {overviewStep === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-orange-500" />
                  Famous Indian Ponzi Schemes
                </h2>
                
                {/* Interactive Case Study Cards */}
                <div className="space-y-6">
                  {[
                    {
                      id: 'saradha',
                      title: 'Saradha Group Scam (2013)',
                      amount: '₹2,500 crores',
                      victims: '1.7 million',
                      description: 'West Bengal-based chit fund company that promised high returns through collective investment schemes.',
                      color: 'red',
                      icon: <TrendingDown className="w-6 h-6" />
                    },
                    {
                      id: 'speak-asia',
                      title: 'Speak Asia Scam (2011)',
                      amount: '₹2,300 crores', 
                      victims: '1.2 million',
                      description: 'Online survey company that operated as a pyramid scheme promising income through surveys.',
                      color: 'blue',
                      icon: <Users className="w-6 h-6" />
                    },
                    {
                      id: 'qnet',
                      title: 'QNet Multi-Level Marketing',
                      amount: '₹1,000+ crores',
                      victims: '500,000+',
                      description: 'Hong Kong-based MLM company that used pyramid structure to sell lifestyle products.',
                      color: 'purple',
                      icon: <Layers className="w-6 h-6" />
                    },
                    {
                      id: 'emu-farming',
                      title: 'Emu Farming Ponzi Schemes',
                      amount: '₹500+ crores',
                      victims: '100,000+',
                      description: 'Fraudulent emu farming schemes promising guaranteed returns on emu birds and eggs.',
                      color: 'green',
                      icon: <Target className="w-6 h-6" />
                    }
                  ].map((caseStudy, index) => (
                    <motion.div 
                      key={caseStudy.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        addXP(15, `case-study-${caseStudy.id}`);
                        if (!completedActivities.has(`case-study-${caseStudy.id}`)) {
                          setShowCelebration(true);
                          setTimeout(() => setShowCelebration(false), 2000);
                        }
                      }}
                      className={`bg-white rounded-xl p-6 border-2 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl ${
                        completedActivities.has(`case-study-${caseStudy.id}`) 
                          ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100' 
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            caseStudy.color === 'red' ? 'bg-red-100 text-red-600' :
                            caseStudy.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                            caseStudy.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {caseStudy.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{caseStudy.title}</h3>
                            <div className="flex gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                Loss: {caseStudy.amount}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                Victims: {caseStudy.victims}
                              </span>
                            </div>
                          </div>
                        </div>
                        {completedActivities.has(`case-study-${caseStudy.id}`) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                      
                      <p className="text-gray-700 mb-4">{caseStudy.description}</p>
                      
                      {!completedActivities.has(`case-study-${caseStudy.id}`) && (
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-orange-500" />
                          <p className="text-xs text-orange-600 font-medium">Click to explore (+15 XP)</p>
                        </div>
                      )}
                      
                      {completedActivities.has(`case-study-${caseStudy.id}`) && (
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <p className="text-xs text-green-600 font-medium">Case study explored! +15 XP</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-8">
                  <button onClick={() => setOverviewStep(1)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button onClick={() => setOverviewStep(3)} className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">Next: Red Flags</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Red Flags & Detection */}
            {overviewStep === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  Spotting Red Flags
                </h2>
                
                {/* Progressive Red Flag Quiz */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">🚩 Interactive Red Flag Detection</h3>
                  <p className="text-gray-600 mb-6">Learn to identify Ponzi scheme warning signs through detailed scenarios. Each scenario awards 15 XP when completed correctly.</p>
                  
                  <ProgressiveRedFlagQuiz 
                    scenarios={redFlagScenarios.map(scenario => ({
                      ...scenario,
                      options: scenario.options.map(option => ({
                        ...option,
                        icon: (
                          option.icon === '🚩' ? <AlertTriangle className="w-4 h-4" /> :
                          option.icon === '👑' ? <Trophy className="w-4 h-4" /> :
                          option.icon === '🤖' ? <Brain className="w-4 h-4" /> :
                          option.icon === '💰' ? <DollarSign className="w-4 h-4" /> :
                          option.icon === '🏛️' ? <Shield className="w-4 h-4" /> :
                          option.icon === '🔍' ? <Target className="w-4 h-4" /> :
                          option.icon === '📊' ? <TrendingUp className="w-4 h-4" /> :
                          option.icon === '⏰' ? <Clock className="w-4 h-4" /> :
                          option.icon === '📱' ? <Phone className="w-4 h-4" /> :
                          option.icon === '📸' ? <Users className="w-4 h-4" /> :
                          option.icon === '⚠️' ? <AlertTriangle className="w-4 h-4" /> :
                          option.icon === '🔒' ? <Lock className="w-4 h-4" /> :
                          option.icon === '👥' ? <Users className="w-4 h-4" /> :
                          option.icon === '🔺' ? <TrendingUp className="w-4 h-4" /> :
                          option.icon === '💬' ? <MessageCircle className="w-4 h-4" /> :
                          <AlertTriangle className="w-4 h-4" />
                        )
                      }))
                    }))}
                    onComplete={(scenarioId) => addXP(15, `red-flag-${scenarioId}`)}
                    completedScenarios={completedActivities}
                  />
                </div>
                
                <div className="flex justify-between">
                  <button onClick={() => setOverviewStep(2)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button onClick={() => setOverviewStep(4)} className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">Next: Interactive Games</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Interactive Games */}
            {overviewStep === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  Interactive Learning Games
                </h2>
                
                <div className="text-center mb-6">
                  <p className="text-gray-600">Test your knowledge with these fun interactive challenges!</p>
                </div>

                {/* Ponzi Timeline Builder */}
                <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    Build a Ponzi Scheme Timeline
                  </h3>
                  <p className="text-gray-600 mb-4">Arrange these events in the typical order of a Ponzi scheme's lifecycle:</p>
                  
                  <TimelineBuilder 
                    events={[
                      { id: '1', text: 'Scheme launches with promises of high returns', stage: 'early' },
                      { id: '2', text: 'Early investors receive promised returns', stage: 'early' },
                      { id: '3', text: 'Word spreads, more investors join', stage: 'middle' },
                      { id: '4', text: 'Operator uses new investments to pay old investors', stage: 'middle' },
                      { id: '5', text: 'Recruitment slows, cash flow becomes negative', stage: 'end' },
                      { id: '6', text: 'Scheme collapses, investors lose money', stage: 'end' }
                    ]}
                    onComplete={() => addXP(25, 'timeline-completed')}
                    isCompleted={completedActivities.has('timeline-completed')}
                  />
                </div>

                {/* Fraud Type Matching Game */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-500" />
                    Fraud Type Matching Challenge
                  </h3>
                  <p className="text-gray-600 mb-6">Match warning signs with their corresponding fraud types to test your knowledge!</p>
                  
                  <FraudMatchingGame 
                    onComplete={(score) => {
                      addXP(30, 'ponzi-pyramid-matching-completed');
                      setCurrentQuizScore(score);
                      if (score >= 80) {
                        setShowCelebration(true);
                        setTimeout(() => setShowCelebration(false), 3000);
                      }
                    }}
                    isCompleted={completedActivities.has('ponzi-pyramid-matching-completed')}
                  />
                </div>
                
                <div className="flex justify-between mt-8">
                  <button onClick={() => setOverviewStep(3)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button onClick={() => setCurrentSection('simulator')} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">Continue to Simulator</button>
                </div>
              </motion.div>
            )}

          </motion.div>
        )}

        {currentSection === 'simulator' && (
          <div>
            <FraudSimulator />
            <div className="max-w-4xl mx-auto mt-8 flex justify-end">
              <button
                onClick={() => {
                  setCurrentSection('quiz');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                {t('simulator.button.quiz') as string}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {currentSection === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{t('quiz.title') as string}</h2>
              <p className="text-gray-600 mb-8">{t('quiz.subtitle') as string}</p>
              
              {!quizResult ? (
                <div className="space-y-6">
                  {quizQuestions.map((q, index) => (
                    <div key={q.id} className="border rounded-lg p-6">
                      <p className="font-semibold mb-4">{index + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, i) => (
                          <label key={i} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            userAnswers[q.id] === option ? 'bg-blue-100 border-blue-300' : 'hover:bg-gray-50'
                          }`}>
                            <input
                              type="radio"
                              name={q.id}
                              value={option}
                              checked={userAnswers[q.id] === option}
                              onChange={() => handleAnswerChange(q.id, option)}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center mt-8">
                    <button 
                      onClick={handleSubmitQuiz}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={Object.keys(userAnswers).length !== quizQuestions.length}
                    >
                      {t('quiz.button.submit') as string}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900">Quiz Complete!</h3>
                    <p className="text-xl text-gray-600 mt-2">Your Score: <span className="font-bold text-blue-600">{quizResult.score}%</span></p>
                    <p className="text-gray-500">{quizResult.correctAnswers} correct, {quizResult.wrongAnswers} incorrect</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {quizQuestions.map((q) => (
                      <div key={q.id} className={`border-2 rounded-lg p-4 ${
                        quizResult.results[q.id] ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                      }`}>
                        <p className="font-semibold mb-2">{q.question}</p>
                        <p className={`text-sm ${
                          quizResult.results[q.id] ? 'text-green-700' : 'text-red-700'
                        }`}>
                          Your answer: {userAnswers[q.id] || 'No answer'}
                        </p>
                        {!quizResult.results[q.id] && (
                          <p className="text-sm text-gray-700">Correct answer: {q.correctAnswer}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={restartQuiz}
                      className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Retake Quiz
                    </button>
                    <Link
                      href="/fraud-awareness-course"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      {t('completion.button') as string}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
