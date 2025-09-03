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
// import quizData from '@/data/quizzes/insider-trading.json';
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
  Scale,
  UserX,
  FileText,
  Search,
  AlertCircle,
  Gavel,
  Building,
  Globe,
  Network
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

// Mock quiz data - Advanced insider trading questions
const quizData = {
  questions: [
    {
      id: "it1",
      question: "What constitutes insider trading under SEBI regulations?",
      options: [
        "Trading based on public information",
        "Trading by company employees with proper disclosure",
        "Trading on material non-public information by insiders or tippees",
        "High-frequency trading algorithms"
      ],
      correctAnswer: "Trading on material non-public information by insiders or tippees"
    },
    {
      id: "it2",
      question: "What is the maximum penalty for insider trading under SEBI Act?",
      options: [
        "₹1 crore or 3 times the profit made",
        "₹25 crores or 3 times the profit made, whichever is higher",
        "₹10 crores only",
        "₹5 crores or 2 times the profit made"
      ],
      correctAnswer: "₹25 crores or 3 times the profit made, whichever is higher"
    },
    {
      id: "it3",
      question: "Which of the following is a form of market manipulation?",
      options: [
        "Circular trading",
        "Wash trading", 
        "Spoofing",
        "All of the above"
      ],
      correctAnswer: "All of the above"
    }
  ]
};

export default function InsiderTradingPage() {
  const { t } = useTranslation('courses.insider-trading');
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
    // Base activities that contribute to progress (more activities due to advanced nature)
    const totalActivities = 16; // video + audio + 5 insider types + 4 manipulation tactics + 3 legal scenarios + 2 games + case studies
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
        const response = await fetch('/api/lessons/interactions?lessonId=insider-trading');
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
          lessonId: 'insider-trading',
          interactionId: activityId,
          xpEarned: amount,
          interactionType: activityId.includes('legal') ? 'SCENARIO' : 'DECISION',
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
          lessonId: 'insider-trading',
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
          lessonId: 'insider-trading',
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
                <p className="text-xs text-gray-500">Module 4 (Advanced)</p>
                <h1 className="text-lg font-semibold">Insider Trading & Market Manipulation</h1>
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
                  ? 'border-purple-600 text-purple-600'
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
                  ? 'border-purple-600 text-purple-600'
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
                  ? 'border-purple-600 text-purple-600'
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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <div className={`h-1 flex-1 ${overviewStep >= 2 ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 2 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <div className={`h-1 flex-1 ${overviewStep >= 3 ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 3 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                <div className={`h-1 flex-1 ${overviewStep >= 4 ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 4 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
              </div>
            </div>

            {/* Step 1: Understanding Insider Trading */}
            {overviewStep === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-purple-500" />
                  Understanding Insider Trading
                </h2>
                
                {/* Video Section */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">📹 Insider Trading Explained</h3>
                  <p className="text-sm text-gray-600 mb-4">Duration: 12 minutes</p>
                  
                  <div className="relative mb-4">
                    <ClientOnly>
                      <Module1VideoPlayer 
                        onComplete={() => addXP(25, 'insider-trading-video-completed')}
                        isCompleted={completedActivities.has('insider-trading-video-completed')}
                      />
                    </ClientOnly>
                  </div>
                  
                  {completedActivities.has('insider-trading-video-completed') && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Video completed (+25 XP)</span>
                    </div>
                  )}
                </div>

                
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 mb-6 border border-purple-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-purple-600" />
                    What is Insider Trading?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Insider trading is the buying or selling of securities by individuals who have access to material, non-public information about the company. Under SEBI regulations, this practice is strictly prohibited and carries severe penalties.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-700 mb-2">Who are "Insiders"?</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Company directors and officers</li>
                        <li>• Employees with access to material information</li>
                        <li>• Investment bankers and consultants</li>
                        <li>• Auditors and lawyers</li>
                        <li>• Government officials</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded p-4 border border-red-200">
                      <h4 className="font-semibold text-red-700 mb-2">Material Information Includes:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Earnings reports before release</li>
                        <li>• Merger and acquisition plans</li>
                        <li>• Product launches or failures</li>
                        <li>• Legal proceedings</li>
                        <li>• Management changes</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">SEBI Penalties</span>
                    </div>
                    <p className="text-sm text-red-700">
                      Maximum penalty: <strong>₹25 crores or 3 times the profit made, whichever is higher</strong>. 
                      Additional criminal prosecution possible with up to 10 years imprisonment.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button onClick={() => setOverviewStep(2)} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">Next: Types of Insiders</button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Types of Insiders */}
            {overviewStep === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Network className="w-6 h-6 text-purple-500" />
                  Categories of Insiders & Information Flow
                </h2>
                
                {/* Interactive Insider Types */}
                <div className="space-y-6">
                  {[
                    {
                      id: 'primary-insiders',
                      title: 'Primary Insiders',
                      description: 'Direct access to material non-public information through their role in the company.',
                      icon: <Building className="w-6 h-6" />,
                      color: 'red',
                      examples: [
                        'Board of Directors',
                        'CEO, CFO, and C-suite executives',
                        'Company employees in key positions',
                        'Major shareholders (>10% ownership)'
                      ],
                      riskLevel: 'Highest Risk',
                      penalties: 'Maximum penalties apply'
                    },
                    {
                      id: 'secondary-insiders',
                      title: 'Secondary Insiders (Temporary)',
                      description: 'Gain temporary access to material information through professional relationships.',
                      icon: <Briefcase className="w-6 h-6" />,
                      color: 'orange',
                      examples: [
                        'Investment bankers handling deals',
                        'Lawyers working on transactions',
                        'Auditors and accountants',
                        'Consultants and advisors'
                      ],
                      riskLevel: 'High Risk',
                      penalties: 'Severe penalties apply'
                    },
                    {
                      id: 'tippees',
                      title: 'Tippees',
                      description: 'Individuals who receive material information from insiders, directly or indirectly.',
                      icon: <Users className="w-6 h-6" />,
                      color: 'yellow',
                      examples: [
                        'Friends and family of insiders',
                        'Business associates',
                        'Professional contacts',
                        'Anyone who receives tips'
                      ],
                      riskLevel: 'High Risk',
                      penalties: 'Same as primary insiders'
                    },
                    {
                      id: 'constructive-insiders',
                      title: 'Constructive Insiders',
                      description: 'Not officially insiders but have temporary access through special circumstances.',
                      icon: <UserX className="w-6 h-6" />,
                      color: 'blue',
                      examples: [
                        'Journalists investigating companies',
                        'Government officials in regulatory roles',
                        'Technology service providers',
                        'Anyone with temporary material access'
                      ],
                      riskLevel: 'Moderate to High Risk',
                      penalties: 'Case-by-case penalties'
                    },
                    {
                      id: 'institutional-insiders',
                      title: 'Institutional Insiders',
                      description: 'Financial institutions and their employees with access to material information.',
                      icon: <Building className="w-6 h-6" />,
                      color: 'green',
                      examples: [
                        'Mutual fund managers',
                        'Investment research analysts',
                        'Portfolio managers',
                        'Financial institutions\' key personnel'
                      ],
                      riskLevel: 'High Risk',
                      penalties: 'Institutional and personal penalties'
                    }
                  ].map((insiderType, index) => (
                    <motion.div 
                      key={insiderType.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        addXP(20, `insider-type-${insiderType.id}`);
                        if (!completedActivities.has(`insider-type-${insiderType.id}`)) {
                          setShowCelebration(true);
                          setTimeout(() => setShowCelebration(false), 2000);
                        }
                      }}
                      className={`bg-white rounded-xl p-6 border-2 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl ${
                        completedActivities.has(`insider-type-${insiderType.id}`) 
                          ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            insiderType.color === 'red' ? 'bg-red-100 text-red-600' :
                            insiderType.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                            insiderType.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                            insiderType.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {insiderType.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{insiderType.title}</h3>
                            <p className="text-gray-700 mb-3">{insiderType.description}</p>
                            
                            <div className="grid gap-2 mb-3">
                              {insiderType.examples.map((example, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                                  <span>{example}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                insiderType.color === 'red' ? 'bg-red-100 text-red-700' :
                                insiderType.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                                insiderType.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                                insiderType.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {insiderType.riskLevel}
                              </span>
                              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                {insiderType.penalties}
                              </span>
                            </div>
                          </div>
                        </div>
                        {completedActivities.has(`insider-type-${insiderType.id}`) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                      
                      {!completedActivities.has(`insider-type-${insiderType.id}`) && (
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          <p className="text-xs text-purple-600 font-medium">Click to explore (+20 XP)</p>
                        </div>
                      )}
                      
                      {completedActivities.has(`insider-type-${insiderType.id}`) && (
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <p className="text-xs text-green-600 font-medium">Category mastered! +20 XP</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-8">
                  <button onClick={() => setOverviewStep(1)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button onClick={() => setOverviewStep(3)} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">Next: Manipulation Tactics</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Market Manipulation Tactics */}
            {overviewStep === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-red-500" />
                  Advanced Market Manipulation Tactics
                </h2>
                
                {/* Interactive Manipulation Tactics */}
                <div className="space-y-6">
                  {[
                    {
                      id: 'circular-trading',
                      title: 'Circular Trading',
                      description: 'Trading between related parties to create artificial volume and mislead investors about market activity.',
                      mechanism: 'Entity A sells to Entity B, Entity B sells to Entity C, Entity C sells back to Entity A',
                      detection: ['Unusual trading patterns between related accounts', 'High volume with minimal price impact', 'Repetitive trading sequences'],
                      penalties: '₹10 crores or 3 times profits + market ban'
                    },
                    {
                      id: 'wash-trading',
                      title: 'Wash Trading',
                      description: 'Simultaneously or near-simultaneously buying and selling the same security to create misleading activity.',
                      mechanism: 'Trader places buy and sell orders for same quantity at similar prices',
                      detection: ['Orders from same beneficial owner', 'Matching buy/sell quantities', 'No actual change in beneficial ownership'],
                      penalties: '₹15 crores or 3 times profits + criminal charges'
                    },
                    {
                      id: 'spoofing',
                      title: 'Spoofing',
                      description: 'Placing large orders with intent to cancel them before execution to manipulate market prices.',
                      mechanism: 'Place large buy order to drive price up, then cancel and sell at higher price',
                      detection: ['High order-to-trade ratios', 'Large orders followed by quick cancellations', 'Pattern of deceptive orders'],
                      penalties: '₹25 crores + criminal prosecution possible'
                    },
                    {
                      id: 'front-running',
                      title: 'Front Running',
                      description: 'Trading securities based on advance knowledge of pending large orders from clients or institutions.',
                      mechanism: 'Broker learns of large client order, trades for own account first, then executes client order',
                      detection: ['Trading ahead of client orders', 'Unusual trading patterns by intermediaries', 'Timing analysis of trades'],
                      penalties: '₹20 crores + license revocation + criminal charges'
                    }
                  ].map((tactic, index) => {
                    const activityId = `manipulation-${tactic.id}`;
                    const isCompleted = completedActivities.has(activityId);
                    
                    return (
                      <div key={tactic.id} className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <span className="text-sm font-medium text-red-600">Manipulation Tactic #{index + 1}</span>
                        </div>
                        
                        <motion.div 
                          onClick={() => addXP(25, activityId)}
                          className={`cursor-pointer transition-all ${
                            isCompleted ? 'opacity-100' : 'hover:bg-red-50'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-800">{tactic.title}</h3>
                            {isCompleted && (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            )}
                          </div>
                          
                          <p className="text-gray-700 mb-4">{tactic.description}</p>
                          
                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-blue-50 border border-blue-200 rounded p-3">
                              <h4 className="font-semibold text-blue-800 mb-2">How it Works:</h4>
                              <p className="text-sm text-blue-700">{tactic.mechanism}</p>
                            </div>
                            
                            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                              <h4 className="font-semibold text-yellow-800 mb-2">Detection Methods:</h4>
                              <ul className="text-sm text-yellow-700 space-y-1">
                                {tactic.detection.map((method, i) => (
                                  <li key={i} className="flex items-start gap-1">
                                    <span>•</span>
                                    <span>{method}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-red-50 border border-red-200 rounded p-3">
                              <h4 className="font-semibold text-red-800 mb-2">SEBI Penalties:</h4>
                              <p className="text-sm text-red-700 font-medium">{tactic.penalties}</p>
                            </div>
                          </div>
                          
                          {!isCompleted && (
                            <p className="text-xs text-purple-600 font-medium">Click to learn more (+25 XP)</p>
                          )}
                          
                          {isCompleted && (
                            <p className="text-xs text-green-600 font-medium">Tactic understood! +25 XP earned</p>
                          )}
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between mt-8">
                  <button onClick={() => setOverviewStep(2)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button onClick={() => setOverviewStep(4)} className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">Next: Legal Framework</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Legal Framework & Cases */}
            {overviewStep === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Gavel className="w-6 h-6 text-purple-500" />
                  Legal Framework & Case Studies
                </h2>
                
                <div className="text-center mb-6">
                  <p className="text-gray-600">Learn from real cases and understand the legal consequences!</p>
                </div>

                {/* Legal Scenario Challenge */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">⚖️ Legal Scenario Analysis</h3>
                  
                  {[
                    {
                      id: 1,
                      scenario: "A software engineer working for a company learns during a team meeting that their company will announce a major partnership next week. He immediately buys ₹50,000 worth of company stock.",
                      question: "What are the potential legal consequences?",
                      options: [
                        "No consequences as he's just an employee",
                        "Minor fine as the amount is small",
                        "Serious insider trading violation with penalties up to ₹1.5 lakh or 3 times profit"
                      ],
                      correct: "Serious insider trading violation with penalties up to ₹1.5 lakh or 3 times profit",
                      explanation: "Any employee with material non-public information is considered an insider. SEBI penalties apply regardless of the trading amount."
                    },
                    {
                      id: 2,
                      scenario: "A mutual fund manager receives a tip from his college friend (who works at a listed company) about poor quarterly results. The manager sells fund holdings worth ₹10 crores before the results are announced.",
                      question: "What violations occurred and what are the penalties?",
                      options: [
                        "Only the friend violated insider trading laws",
                        "Both violated - friend as tipper (₹25 crores penalty) and manager as tippee (₹30 crores + fund penalties)",
                        "No violation as it was just a personal conversation"
                      ],
                      correct: "Both violated - friend as tipper (₹25 crores penalty) and manager as tippee (₹30 crores + fund penalties)",
                      explanation: "Both tipper and tippee are equally liable. The fund manager faces additional institutional penalties and license risks."
                    },
                    {
                      id: 3,
                      scenario: "An investment banking team working on a secret merger creates fake trading accounts and buys target company shares worth ₹2 crores before the merger announcement.",
                      question: "What charges can SEBI bring?",
                      options: [
                        "Only insider trading charges",
                        "Insider trading + market manipulation + criminal charges with up to 10 years imprisonment",
                        "Just a warning as they are professionals"
                      ],
                      correct: "Insider trading + market manipulation + criminal charges with up to 10 years imprisonment",
                      explanation: "This involves multiple violations: insider trading, market manipulation through fake accounts, and criminal conspiracy. Maximum penalties apply."
                    }
                  ].map((scenario) => {
                    const activityId = `legal-scenario-${scenario.id}`;
                    const isCompleted = completedActivities.has(activityId);
                    
                    return (
                      <div key={scenario.id} className="mb-8 last:mb-0">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Case {scenario.id}:</h4>
                          <p className="text-gray-800 mb-3">{scenario.scenario}</p>
                          <p className="text-purple-700 font-medium">{scenario.question}</p>
                        </div>
                        
                        <div className="grid gap-3">
                          {scenario.options.map((option, index) => {
                            const isCorrect = option === scenario.correct;
                            
                            return (
                              <button
                                key={index}
                                onClick={() => {
                                  if (isCorrect && !isCompleted) {
                                    addXP(30, activityId);
                                  }
                                }}
                                disabled={isCompleted}
                                className={`p-4 text-left border rounded-lg transition-all ${
                                  isCompleted
                                    ? isCorrect
                                      ? 'border-green-500 bg-green-50 text-green-800'
                                      : 'border-gray-300 bg-gray-50 text-gray-500'
                                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{option}</span>
                                  {isCompleted && isCorrect && (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  )}
                                </div>
                                {!isCompleted && isCorrect && (
                                  <p className="text-xs text-purple-600 mt-1">Correct legal analysis (+30 XP)</p>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        
                        {isCompleted && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                            <strong>Correct Legal Analysis!</strong> {scenario.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Famous Insider Trading Cases */}
                <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-500" />
                    Landmark Indian Insider Trading Cases
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        id: 'dly-case',
                        title: 'DLF Insider Trading Case (2007-2009)',
                        description: 'SEBI found DLF promoters and connected entities guilty of insider trading before the company\'s IPO.',
                        penalty: '₹630 crores penalty imposed',
                        lesson: 'Promoter trading before material announcements is closely monitored'
                      },
                      {
                        id: 'rajat-gupta',
                        title: 'Rajat Gupta McKinsey Case (2012)',
                        description: 'Former McKinsey CEO convicted of insider trading in US courts, also impacted Indian regulatory framework.',
                        penalty: '2 years imprisonment + $5 million fine',
                        lesson: 'Cross-border insider trading has international consequences'
                      },
                      {
                        id: 'sebi-vs-kris',
                        title: 'SEBI vs. Kris Gopalakrishnan (2019)',
                        description: 'Infosys co-founder\'s wife accused of insider trading before quarterly results announcement.',
                        penalty: '₹15 lakhs penalty (later contested)',
                        lesson: 'Family members of insiders are equally liable'
                      },
                      {
                        id: 'bank-nifty',
                        title: 'Bank Nifty Options Manipulation (2020)',
                        description: 'Coordinated manipulation of Bank Nifty options expiry through circular trading.',
                        penalty: '₹25 crores penalty + market ban for multiple entities',
                        lesson: 'Derivatives manipulation carries enhanced penalties'
                      }
                    ].map((case_study, index) => (
                      <motion.div
                        key={case_study.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => addXP(20, `case-${case_study.id}`)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          completedActivities.has(`case-${case_study.id}`)
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-800">{case_study.title}</h4>
                          {completedActivities.has(`case-${case_study.id}`) && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{case_study.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Penalty: {case_study.penalty}</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Lesson: {case_study.lesson}</span>
                        </div>
                        {!completedActivities.has(`case-${case_study.id}`) && (
                          <p className="text-xs text-purple-600 mt-2">Click to study case (+20 XP)</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Advanced Detection Game */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5 text-purple-500" />
                    Fraud Type Matching Challenge
                  </h3>
                  <p className="text-gray-600 mb-6">Match warning signs with their corresponding fraud types to test your knowledge!</p>
                  
                  <FraudMatchingGame 
                    onComplete={(score) => {
                      addXP(35, 'advanced-detection-completed');
                      setCurrentQuizScore(score);
                      if (score >= 80) {
                        setShowCelebration(true);
                        setTimeout(() => setShowCelebration(false), 3000);
                      }
                    }}
                    isCompleted={completedActivities.has('advanced-detection-completed')}
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
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                Take Advanced Quiz
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {currentSection === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Advanced Insider Trading Quiz</h2>
              <p className="text-gray-600 mb-8">Test your knowledge of insider trading laws and market manipulation tactics</p>
              
              {!quizResult ? (
                <div className="space-y-6">
                  {quizQuestions.map((q, index) => (
                    <div key={q.id} className="border rounded-lg p-6">
                      <p className="font-semibold mb-4">{index + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, i) => (
                          <label key={i} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            userAnswers[q.id] === option ? 'bg-purple-100 border-purple-300' : 'hover:bg-gray-50'
                          }`}>
                            <input
                              type="radio"
                              name={q.id}
                              value={option}
                              checked={userAnswers[q.id] === option}
                              onChange={() => handleAnswerChange(q.id, option)}
                              className="w-4 h-4 text-purple-600 focus:ring-purple-500"
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
                    <p className="text-xl text-gray-600 mt-2">Your Score: <span className="font-bold text-purple-600">{quizResult.score}%</span></p>
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
                      className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
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


