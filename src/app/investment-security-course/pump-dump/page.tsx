"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FraudSimulator from '@/components/fraud-awareness/FraudSimulator';

import Module1VideoPlayer from '@/components/investment-security-course/Module1VideoPlayer';
import ClientOnly from '@/components/ClientOnly';
import { useTranslation } from '@/hooks/useTranslation';
import TimelineBuilder from '@/components/fraud-awareness/TimelineBuilder';
import FraudMatchingGame from '@/components/fraud-awareness/FraudMatchingGame';
// import quizData from '@/data/quizzes/pump-dump.json';
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
  MessageSquare,
  Smartphone,
  BarChart3,
  Activity,
  Eye,
  Volume2,
  ThumbsUp,
  Share2,
  Megaphone
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

// Mock quiz data - we'll create the actual JSON file later
const quizData = {
  questions: [
    {
      id: "pd1",
      question: "What is the main characteristic of a pump and dump scheme?",
      options: [
        "Long-term investment strategy",
        "Artificially inflating stock price then selling quickly",
        "Legitimate market research",
        "Government-backed investment"
      ],
      correctAnswer: "Artificially inflating stock price then selling quickly"
    },
    {
      id: "pd2",
      question: "Which platform is commonly used for pump and dump schemes?",
      options: [
        "Official stock exchanges only",
        "Social media and messaging apps",
        "Bank websites",
        "Government portals"
      ],
      correctAnswer: "Social media and messaging apps"
    }
  ]
};

export default function PumpDumpPage() {
  const { t } = useTranslation('courses.pump-dump');
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
  const [pumpSimulationStep, setPumpSimulationStep] = useState(1);

  const lessonProgress = useMemo(() => {
    // Base activities that contribute to progress
    const totalActivities = 14; // video + audio + 4 phase interactions + 3 warning sign scenarios + 2 games + 3 case studies
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
        const response = await fetch('/api/lessons/interactions?lessonId=pump-dump');
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
    
    // Set quiz questions
    setQuizQuestions(quizData.questions);
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
          lessonId: 'pump-dump',
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
          lessonId: 'pump-dump',
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
          lessonId: 'pump-dump',
          courseId: 'clx2no2g0000008l8g8r8g8r8',
        }),
      });
    } catch (error) {
      console.error('Failed to mark lesson as complete', error);
    }
  };

  const restartQuiz = () => {
    setQuizQuestions(quizData.questions);
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
                href="/investment-security-course"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <p className="text-xs text-gray-500">Module 3</p>
                <h1 className="text-lg font-semibold">Pump & Dump Schemes</h1>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden md:flex items-center gap-4">
              <div className="w-48">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
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
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Overview
              </div>
            </button>
            <button
              onClick={() => setCurrentSection('simulator')}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'simulator'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Simulator
              </div>
            </button>
            <button
              onClick={() => {
                setCurrentSection('quiz');
              }}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'quiz'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Quiz
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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <div className={`h-1 flex-1 ${overviewStep >= 2 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 2 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <div className={`h-1 flex-1 ${overviewStep >= 3 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 3 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                <div className={`h-1 flex-1 ${overviewStep >= 4 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 4 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
              </div>
            </div>

            {/* Step 1: What Are Pump & Dump Schemes? */}
            {overviewStep === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  Understanding Pump & Dump Schemes
                </h2>
                
                {/* Video Section */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">📹 How Pump & Dump Works</h3>
                  <p className="text-sm text-gray-600 mb-4">Duration: 9 minutes</p>
                  
                  <div className="relative mb-4">
                    <ClientOnly>
                      <Module1VideoPlayer 
                        onComplete={() => addXP(20, 'pump-dump-video-completed')}
                        isCompleted={completedActivities.has('pump-dump-video-completed')}
                      />
                    </ClientOnly>
                  </div>
                  
                  {completedActivities.has('pump-dump-video-completed') && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Video completed (+20 XP)</span>
                    </div>
                  )}
                </div>

                
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 mb-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    What is a Pump & Dump Scheme?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    A pump and dump scheme is a form of securities fraud where perpetrators artificially inflate the price of a stock through false and misleading positive statements (the "pump"), then sell their shares at the inflated price (the "dump"), leaving other investors with worthless stock.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded p-4 border border-yellow-200">
                      <h4 className="font-semibold text-yellow-700 mb-2">The "Pump" Phase:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• False positive news and rumors</li>
                        <li>• Coordinated social media campaigns</li>
                        <li>• Fake endorsements and testimonials</li>
                        <li>• Artificial trading volume increases</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded p-4 border border-red-200">
                      <h4 className="font-semibold text-red-700 mb-2">The "Dump" Phase:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Mass selling by perpetrators</li>
                        <li>• Stock price crashes rapidly</li>
                        <li>• Investors left with losses</li>
                        <li>• Promoters disappear or go silent</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button onClick={() => setOverviewStep(2)} className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">Next: The Process</button>
                </div>
              </motion.div>
            )}

            {/* Step 2: The Pump & Dump Process */}
            {overviewStep === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-yellow-500" />
                  The 4-Phase Pump & Dump Process
                </h2>
                
                {/* Interactive Process Cards */}
                <div className="space-y-6">
                  {[
                    {
                      id: 'phase-1',
                      phase: 'Phase 1: Target Selection',
                      title: 'Finding the Right Stock',
                      description: 'Fraudsters target low-priced, thinly-traded stocks (penny stocks) with small market caps.',
                      icon: <Target className="w-6 h-6" />,
                      color: 'blue',
                      details: [
                        'Usually priced under ₹10',
                        'Low trading volume',
                        'Small market capitalization',
                        'Limited public information'
                      ],
                      warning: 'These stocks are easier to manipulate due to low liquidity'
                    },
                    {
                      id: 'phase-2',
                      phase: 'Phase 2: Accumulation',
                      title: 'Quietly Buying Shares',
                      description: 'Perpetrators secretly accumulate large positions in the target stock at low prices.',
                      icon: <DollarSign className="w-6 h-6" />,
                      color: 'green',
                      details: [
                        'Buy large quantities quietly',
                        'Use multiple accounts to hide activity',
                        'Keep prices stable during accumulation',
                        'Build substantial position before promotion'
                      ],
                      warning: 'This phase can last weeks or months'
                    },
                    {
                      id: 'phase-3',
                      phase: 'Phase 3: Promotion (PUMP)',
                      title: 'Creating Artificial Demand',
                      description: 'Launch aggressive marketing campaigns with false or misleading information to drive up price.',
                      icon: <Megaphone className="w-6 h-6" />,
                      color: 'yellow',
                      details: [
                        'Social media campaigns',
                        'Fake news and press releases',
                        'Celebrity or influencer endorsements',
                        'WhatsApp/Telegram group promotions'
                      ],
                      warning: 'This is where most investors get trapped'
                    },
                    {
                      id: 'phase-4',
                      phase: 'Phase 4: Distribution (DUMP)',
                      title: 'Selling at Peak Prices',
                      description: 'Perpetrators sell their accumulated shares at inflated prices, causing the stock to crash.',
                      icon: <TrendingDown className="w-6 h-6" />,
                      color: 'red',
                      details: [
                        'Mass selling at peak prices',
                        'Price collapses rapidly',
                        'Promotion suddenly stops',
                        'New investors suffer massive losses'
                      ],
                      warning: 'The dump phase can happen in hours or days'
                    }
                  ].map((phase, index) => (
                    <motion.div 
                      key={phase.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        addXP(18, `pump-dump-${phase.id}`);
                        if (!completedActivities.has(`pump-dump-${phase.id}`)) {
                          setShowCelebration(true);
                          setTimeout(() => setShowCelebration(false), 2000);
                        }
                      }}
                      className={`bg-white rounded-xl p-6 border-2 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl ${
                        completedActivities.has(`pump-dump-${phase.id}`) 
                          ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100' 
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            phase.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                            phase.color === 'green' ? 'bg-green-100 text-green-600' :
                            phase.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {phase.icon}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">{phase.phase}</div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{phase.title}</h3>
                            <p className="text-gray-700 mb-3">{phase.description}</p>
                            
                            <div className="grid gap-2 mb-3">
                              {phase.details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                  <span>{detail}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="bg-red-50 border border-red-200 rounded p-2">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                                <span className="text-sm text-red-700 font-medium">Warning:</span>
                              </div>
                              <p className="text-sm text-red-700 mt-1">{phase.warning}</p>
                            </div>
                          </div>
                        </div>
                        {completedActivities.has(`pump-dump-${phase.id}`) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                      
                      {!completedActivities.has(`pump-dump-${phase.id}`) && (
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-yellow-500" />
                          <p className="text-xs text-yellow-600 font-medium">Click to explore (+18 XP)</p>
                        </div>
                      )}
                      
                      {completedActivities.has(`pump-dump-${phase.id}`) && (
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <p className="text-xs text-green-600 font-medium">Phase mastered! +18 XP</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-8">
                  <button onClick={() => setOverviewStep(1)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button onClick={() => setOverviewStep(3)} className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">Next: Warning Signs</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Warning Signs & Red Flags */}
            {overviewStep === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-red-500" />
                  Spotting Pump & Dump Warning Signs
                </h2>
                
                {/* Interactive Warning Signs */}
                <div className="space-y-6">
                  {[
                    {
                      id: 1,
                      scenario: "You see a stock promoted heavily on social media with claims like 'This stock will 10X in the next week!' with rocket emojis and screenshots of profits.",
                      options: [
                        "Invest immediately to not miss out on the gains",
                        "Research the company fundamentals first",
                        "Avoid it - this looks like a pump scheme"
                      ],
                      correct: "Avoid it - this looks like a pump scheme",
                      explanation: "Exaggerated claims with rocket emojis and urgent language are classic pump scheme tactics."
                    },
                    {
                      id: 2,
                      scenario: "A penny stock you've never heard of suddenly has 50x normal trading volume and is up 200% in one day with no company news.",
                      options: [
                        "Buy immediately before it goes higher",
                        "Wait for the company to announce what's happening",
                        "Suspect manipulation and stay away"
                      ],
                      correct: "Suspect manipulation and stay away",
                      explanation: "Sudden massive price and volume increases without news are red flags for manipulation."
                    },
                    {
                      id: 3,
                      scenario: "A WhatsApp group admin claims to have 'insider information' about a stock and says 'buy now, sell tomorrow for guaranteed 50% profit'.",
                      options: [
                        "Follow the tip since others are also buying",
                        "Report for insider trading and avoid the stock",
                        "Buy a small amount to test the tip"
                      ],
                      correct: "Report for insider trading and avoid the stock",
                      explanation: "Claims of insider information are illegal, and 'guaranteed profits' are impossible in markets."
                    }
                  ].map((scenario) => {
                    const activityId = `warning-sign-${scenario.id}`;
                    const isCompleted = completedActivities.has(activityId);
                    
                    return (
                      <div key={scenario.id} className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span className="text-sm font-medium text-gray-600">Warning Sign #{scenario.id}</span>
                        </div>
                        
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                          <p className="text-gray-800 font-medium">{scenario.scenario}</p>
                        </div>
                        
                        <div className="grid gap-3">
                          {scenario.options.map((option, index) => {
                            const isCorrect = option === scenario.correct;
                            
                            return (
                              <button
                                key={index}
                                onClick={() => {
                                  if (isCorrect && !isCompleted) {
                                    addXP(22, activityId);
                                  }
                                }}
                                disabled={isCompleted}
                                className={`p-4 text-left border rounded-lg transition-all ${
                                  isCompleted
                                    ? isCorrect
                                      ? 'border-green-500 bg-green-50 text-green-800'
                                      : 'border-gray-300 bg-gray-50 text-gray-500'
                                    : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{option}</span>
                                  {isCompleted && isCorrect && (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  )}
                                </div>
                                {!isCompleted && isCorrect && (
                                  <p className="text-xs text-yellow-600 mt-1">Correct answer (+22 XP)</p>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        
                        {isCompleted && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                            <strong>Correct!</strong> {scenario.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between mt-8">
                  <button onClick={() => setOverviewStep(2)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button onClick={() => setOverviewStep(4)} className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">Next: Games & Cases</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Interactive Games & Case Studies */}
            {overviewStep === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  Interactive Games & Real Cases
                </h2>
                
                <div className="text-center mb-6">
                  <p className="text-gray-600">Master pump & dump detection with these engaging activities!</p>
                </div>

                {/* Pump & Dump Timeline Game */}
                <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    Build a Pump & Dump Timeline
                  </h3>
                  <p className="text-gray-600 mb-4">Arrange these events in the correct order of a typical pump & dump scheme:</p>
                  
                  <TimelineBuilder 
                    events={[
                      { id: '1', text: 'Fraudsters identify low-volume penny stock', stage: 'early' },
                      { id: '2', text: 'Quietly accumulate large positions', stage: 'early' },
                      { id: '3', text: 'Launch social media promotion campaign', stage: 'middle' },
                      { id: '4', text: 'Stock price rises due to artificial demand', stage: 'middle' },
                      { id: '5', text: 'Fraudsters sell all shares at peak price', stage: 'end' },
                      { id: '6', text: 'Stock price crashes, investors lose money', stage: 'end' }
                    ]}
                    onComplete={() => addXP(25, 'pump-dump-timeline-completed')}
                    isCompleted={completedActivities.has('pump-dump-timeline-completed')}
                  />
                </div>

                {/* Detection Challenge */}
                <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-yellow-500" />
                    Fraud Type Matching Challenge
                  </h3>
                  <p className="text-gray-600 mb-6">Match warning signs with their corresponding fraud types to test your knowledge!</p>
                  
                  <FraudMatchingGame 
                    onComplete={(score) => {
                      addXP(30, 'pump-dump-detection-completed');
                      setCurrentQuizScore(score);
                      if (score >= 80) {
                        setShowCelebration(true);
                        setTimeout(() => setShowCelebration(false), 3000);
                      }
                    }}
                    isCompleted={completedActivities.has('pump-dump-detection-completed')}
                  />
                </div>

                {/* Famous Case Studies */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-yellow-500" />
                    Famous Pump & Dump Cases
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        id: 'wolf-wall-street',
                        title: 'The Wolf of Wall Street (1990s)',
                        description: 'Jordan Belfort and Stratton Oakmont manipulated penny stocks through cold calling and false promotions.',
                        impact: '$200 million in investor losses',
                        lesson: 'High-pressure sales tactics and guaranteed returns are red flags'
                      },
                      {
                        id: 'social-media-pumps',
                        title: 'Social Media Pump Groups (2020-2021)',
                        description: 'Coordinated campaigns on Discord, Telegram, and Reddit manipulated various cryptocurrency and stock prices.',
                        impact: 'Billions in retail investor losses',
                        lesson: 'Social media coordination for trading is often manipulation'
                      },
                      {
                        id: 'celebrity-crypto-pumps',
                        title: 'Celebrity Crypto Pumps (2021-2022)',
                        description: 'Various celebrities promoted cryptocurrencies without disclosure, leading to massive price manipulation.',
                        impact: 'SEC settlements and investor losses',
                        lesson: 'Celebrity endorsements without proper disclosure are suspicious'
                      }
                    ].map((caseStudy, index) => (
                      <motion.div
                        key={caseStudy.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => addXP(15, `case-study-${caseStudy.id}`)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          completedActivities.has(`case-study-${caseStudy.id}`)
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 hover:border-yellow-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-800">{caseStudy.title}</h4>
                          {completedActivities.has(`case-study-${caseStudy.id}`) && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{caseStudy.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Impact: {caseStudy.impact}</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Lesson: {caseStudy.lesson}</span>
                        </div>
                        {!completedActivities.has(`case-study-${caseStudy.id}`) && (
                          <p className="text-xs text-yellow-600 mt-2">Click to explore (+15 XP)</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
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
                className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center gap-2"
              >
                Take Quiz
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {currentSection === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Pump & Dump Quiz</h2>
              <p className="text-gray-600 mb-8">Test your knowledge about pump and dump schemes</p>
              
              {!quizResult ? (
                <div className="space-y-6">
                  {quizQuestions.map((q, index) => (
                    <div key={q.id} className="border rounded-lg p-6">
                      <p className="font-semibold mb-4">{index + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, i) => (
                          <label key={i} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            userAnswers[q.id] === option ? 'bg-yellow-100 border-yellow-300' : 'hover:bg-gray-50'
                          }`}>
                            <input
                              type="radio"
                              name={q.id}
                              value={option}
                              checked={userAnswers[q.id] === option}
                              onChange={() => handleAnswerChange(q.id, option)}
                              className="w-4 h-4 text-yellow-600 focus:ring-yellow-500"
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
                      Submit Quiz
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900">Quiz Complete!</h3>
                    <p className="text-xl text-gray-600 mt-2">Your Score: <span className="font-bold text-yellow-600">{quizResult.score}%</span></p>
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
                      href="/investment-security-course"
                      className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center gap-2"
                    >
                      Back to Course
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


