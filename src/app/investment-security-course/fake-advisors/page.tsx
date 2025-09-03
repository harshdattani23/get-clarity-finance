"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FraudSimulator from '@/components/fraud-awareness/FraudSimulator';
import Module1VideoPlayer from '@/components/investment-security-course/Module1VideoPlayer';
import ClientOnly from '@/components/ClientOnly';
import { useTranslation } from '@/hooks/useTranslation';
import quizData from '@/data/quizzes/fake-advisors.json';
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
  UserCheck,
  Search,
  Sparkles,
  Award,
  FileText,
  ExternalLink,
  MessageSquare,
  Smartphone,
  Globe,
  Target,
  Brain
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

export default function FakeAdvisorsPage() {
  const { t } = useTranslation('courses.fake-advisors');
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
  const [sebiSearchQuery, setSebiSearchQuery] = useState('');
  const [sebiSearchResult, setSebiSearchResult] = useState<'valid' | 'invalid' | null>(null);

  const lessonProgress = useMemo(() => {
    // Base activities that contribute to progress
    const totalActivities = 12; // video + audio + 5 advisor verification checks + 3 red flag scenarios + advisor search game
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
        const response = await fetch('/api/lessons/interactions?lessonId=fake-advisors');
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
          lessonId: 'fake-advisors',
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

  const simulateSebiSearch = (query: string) => {
    // Simulate SEBI advisor search with some pre-defined valid/invalid results
    const validAdvisors = ['SEBI001', 'SEBI123', 'SEBI456', 'VALID123', 'REG001'];
    const isValid = validAdvisors.includes(query.toUpperCase()) || query.toLowerCase().includes('sebi');
    setSebiSearchResult(isValid ? 'valid' : 'invalid');
    
    if (!completedActivities.has('sebi-search-completed')) {
      addXP(15, 'sebi-search-completed');
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
          lessonId: 'fake-advisors',
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
          lessonId: 'fake-advisors',
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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <div className={`h-1 flex-1 ${overviewStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <div className={`h-1 flex-1 ${overviewStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                <div className={`h-1 flex-1 ${overviewStep >= 4 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${overviewStep >= 4 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
              </div>
            </div>

            {/* Step 1: Understanding Fake Advisors */}
            {overviewStep === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-500" />
                  Identifying Fake Investment Advisors
                </h2>
                
                {/* Video Section */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">📹 How to Spot Fake Advisors</h3>
                  <p className="text-sm text-gray-600 mb-4">Duration: 7 minutes</p>
                  
                  <div className="relative mb-4">
                    <ClientOnly>
                      <Module1VideoPlayer 
                        onComplete={() => addXP(20, 'advisor-video-completed')}
                        isCompleted={completedActivities.has('advisor-video-completed')}
                      />
                    </ClientOnly>
                  </div>
                  
                  {completedActivities.has('advisor-video-completed') && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Video completed (+20 XP)</span>
                    </div>
                  )}
                </div>

                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                    What Makes an Advisor "Fake"?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    A fake investment advisor is someone who provides financial advice without proper registration with SEBI (Securities and Exchange Board of India) or misrepresents their credentials and expertise.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Red Flags:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• No SEBI registration number</li>
                        <li>• Promises guaranteed returns</li>
                        <li>• Pressures you to invest immediately</li>
                        <li>• Operates only through social media</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded p-4 border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Legitimate Advisors:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Have valid SEBI registration</li>
                        <li>• Provide detailed disclosures</li>
                        <li>• Explain risks transparently</li>
                        <li>• Have verifiable credentials</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button onClick={() => setOverviewStep(2)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">Next: Verification Process</button>
                </div>
              </motion.div>
            )}

            {/* Step 2: SEBI Verification Process */}
            {overviewStep === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-blue-500" />
                  SEBI Advisor Verification Process
                </h2>
                
                {/* Interactive Verification Steps */}
                <div className="space-y-6">
                  {[
                    {
                      id: 'step-1',
                      title: 'Step 1: Ask for SEBI Registration Number',
                      description: 'Every legitimate investment advisor must have a SEBI registration number starting with "INH".',
                      icon: <FileText className="w-6 h-6" />,
                      color: 'blue',
                      example: 'Example: INH000000123'
                    },
                    {
                      id: 'step-2', 
                      title: 'Step 2: Visit SEBI Official Website',
                      description: 'Go to sebi.gov.in and navigate to the "Intermediaries" section.',
                      icon: <Globe className="w-6 h-6" />,
                      color: 'green',
                      example: 'URL: www.sebi.gov.in > Intermediaries > Investment Advisors'
                    },
                    {
                      id: 'step-3',
                      title: 'Step 3: Search in SEBI Database',
                      description: 'Use the "Search Registered Investment Advisors" feature to verify.',
                      icon: <Search className="w-6 h-6" />,
                      color: 'purple', 
                      example: 'Search by name or registration number'
                    },
                    {
                      id: 'step-4',
                      title: 'Step 4: Verify Contact Details',
                      description: 'Match the contact information with what the advisor provided you.',
                      icon: <Smartphone className="w-6 h-6" />,
                      color: 'orange',
                      example: 'Compare phone, email, and address'
                    },
                    {
                      id: 'step-5',
                      title: 'Step 5: Check Advisory Agreement',
                      description: 'Legitimate advisors provide detailed written agreements.',
                      icon: <FileText className="w-6 h-6" />,
                      color: 'red',
                      example: 'Must include fees, services, and risk disclosures'
                    }
                  ].map((step, index) => (
                    <motion.div 
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        addXP(12, `verification-${step.id}`);
                        if (!completedActivities.has(`verification-${step.id}`)) {
                          setShowCelebration(true);
                          setTimeout(() => setShowCelebration(false), 1500);
                        }
                      }}
                      className={`bg-white rounded-xl p-6 border-2 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl ${
                        completedActivities.has(`verification-${step.id}`) 
                          ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            step.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                            step.color === 'green' ? 'bg-green-100 text-green-600' :
                            step.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                            step.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {step.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                            <p className="text-gray-700 mb-2">{step.description}</p>
                            <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                              {step.example}
                            </p>
                          </div>
                        </div>
                        {completedActivities.has(`verification-${step.id}`) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                      
                      {!completedActivities.has(`verification-${step.id}`) && (
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-500" />
                          <p className="text-xs text-blue-600 font-medium">Click to learn (+12 XP)</p>
                        </div>
                      )}
                      
                      {completedActivities.has(`verification-${step.id}`) && (
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <p className="text-xs text-green-600 font-medium">Step learned! +12 XP</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-8">
                  <button onClick={() => setOverviewStep(1)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button onClick={() => setOverviewStep(3)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">Next: Try Verification</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Interactive SEBI Search */}
            {overviewStep === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Search className="w-6 h-6 text-blue-500" />
                  Practice SEBI Advisor Verification
                </h2>
                
                {/* Mock SEBI Search Interface */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">🔍 Mock SEBI Advisor Search</h3>
                  <p className="text-gray-600 mb-6">Try searching for these advisor IDs to practice verification:</p>
                  
                  <div className="max-w-md mx-auto">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={sebiSearchQuery}
                        onChange={(e) => setSebiSearchQuery(e.target.value)}
                        placeholder="Enter SEBI ID (try: SEBI001, FAKE123)"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => simulateSebiSearch(sebiSearchQuery)}
                      className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                    >
                      Search SEBI Database
                    </button>
                  </div>
                  
                  {sebiSearchResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-6 p-4 rounded-lg border-2 ${
                        sebiSearchResult === 'valid' 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-red-300 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          sebiSearchResult === 'valid' 
                            ? 'bg-green-100' 
                            : 'bg-red-100'
                        }`}>
                          {sebiSearchResult === 'valid' ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                        <div>
                          {sebiSearchResult === 'valid' ? (
                            <div>
                              <h4 className="font-semibold text-green-800">✅ Valid SEBI Registered Advisor</h4>
                              <p className="text-sm text-green-700">This advisor is registered with SEBI and can provide investment advice.</p>
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-semibold text-red-800">❌ Not Found in SEBI Database</h4>
                              <p className="text-sm text-red-700">This advisor is not registered with SEBI. Do not take investment advice from them!</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Test Valid IDs:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• SEBI001</li>
                        <li>• SEBI123</li>
                        <li>• VALID123</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Test Invalid IDs:</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• FAKE123</li>
                        <li>• SCAM999</li>
                        <li>• INVALID</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button onClick={() => setOverviewStep(2)} className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button onClick={() => setOverviewStep(4)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">Next: Red Flags</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Common Scam Scenarios */}
            {overviewStep === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-red-500" />
                  Common Fake Advisor Scams
                </h2>
                
                {/* Red Flag Scenarios */}
                <div className="space-y-6">
                  {[
                    {
                      id: 1,
                      scenario: "Someone contacts you on WhatsApp claiming to be a 'SEBI certified expert' and promises 30% monthly returns with screenshots of 'success stories'.",
                      options: [
                        "Ask for their SEBI registration number and verify it",
                        "Trust them since they have screenshots",
                        "Invest a small amount to test"
                      ],
                      correct: "Ask for their SEBI registration number and verify it",
                      explanation: "Always verify SEBI registration first. Screenshots can be easily faked.",
                      platform: "WhatsApp"
                    },
                    {
                      id: 2,
                      scenario: "A Telegram channel admin claims to have 'insider information' and asks you to pay ₹5000 for 'premium tips' that will make you rich.",
                      options: [
                        "Pay for the premium tips",
                        "Report them for insider trading claims",
                        "Ask other members if it's legitimate"
                      ],
                      correct: "Report them for insider trading claims",
                      explanation: "Claiming insider information is illegal. No legitimate advisor would make such claims.",
                      platform: "Telegram"
                    },
                    {
                      id: 3,
                      scenario: "An Instagram 'financial guru' with 100K followers offers a 'guaranteed profit' investment scheme and says 'limited time offer - invest now!'.",
                      options: [
                        "Invest immediately to not miss out",
                        "Check if they have SEBI registration",
                        "Follow other people's comments and invest"
                      ],
                      correct: "Check if they have SEBI registration",
                      explanation: "Social media followers don't equal legitimacy. Always check SEBI registration.",
                      platform: "Instagram"
                    }
                  ].map((scenario) => {
                    const activityId = `red-flag-advisor-${scenario.id}`;
                    const isCompleted = completedActivities.has(activityId);
                    
                    return (
                      <div key={scenario.id} className="bg-white rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                          {scenario.platform === 'WhatsApp' && <MessageSquare className="w-5 h-5 text-green-500" />}
                          {scenario.platform === 'Telegram' && <MessageSquare className="w-5 h-5 text-blue-500" />}
                          {scenario.platform === 'Instagram' && <MessageSquare className="w-5 h-5 text-pink-500" />}
                          <span className="text-sm font-medium text-gray-600">{scenario.platform} Scam</span>
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
                                    addXP(25, activityId);
                                  }
                                }}
                                disabled={isCompleted}
                                className={`p-4 text-left border rounded-lg transition-all ${
                                  isCompleted
                                    ? isCorrect
                                      ? 'border-green-500 bg-green-50 text-green-800'
                                      : 'border-gray-300 bg-gray-50 text-gray-500'
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{option}</span>
                                  {isCompleted && isCorrect && (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  )}
                                </div>
                                {!isCompleted && isCorrect && (
                                  <p className="text-xs text-blue-600 mt-1">Correct answer (+25 XP)</p>
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
                      href="/investment-security-course"
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


