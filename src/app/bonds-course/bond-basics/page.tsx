"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { 
  BookOpen,
  PlayCircle,
  CheckCircle,
  Clock,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Target,
  Users,
  DollarSign,
  TrendingUp,
  Calculator,
  Award,
  Lock,
  Star
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'interactive' | 'quiz' | 'case-study';
  duration: string;
  content: {
    introduction: string;
    keyPoints: string[];
    examples?: string[];
    videoUrl?: string;
    interactiveElements?: any[];
  };
  completed: boolean;
}

const BondBasicsModule = () => {
  const { user } = useUser();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<boolean[]>([false, false, false, false, false]);

  const lessons: Lesson[] = [
    {
      id: 'what-are-bonds',
      title: 'What are Bonds?',
      type: 'video',
      duration: '15 mins',
      content: {
        introduction: "Welcome to the world of bonds! In this lesson, we'll explore what bonds are and why they're such an important part of the financial markets.",
        keyPoints: [
          "A bond is essentially an I.O.U. - when you buy a bond, you're lending money to the issuer",
          "Bonds have three key components: Face Value (Principal), Coupon Rate (Interest), and Maturity Date",
          "Unlike stocks, bonds have a definite maturity date when the principal is repaid",
          "Bonds provide regular income through interest payments (coupons)",
          "They are considered safer investments compared to stocks but offer lower potential returns"
        ],
        examples: [
          "Government of India 10-year bond with 6% coupon rate",
          "HDFC Bank corporate bond maturing in 5 years with 7.5% annual interest",
          "State Bank of India bond worth ₹1,00,000 paying ₹8,000 annually"
        ],
        videoUrl: "/videos/what-are-bonds.mp4"
      },
      completed: false
    },
    {
      id: 'bonds-vs-stocks',
      title: 'Bonds vs Stocks',
      type: 'interactive',
      duration: '12 mins',
      content: {
        introduction: "Understanding the key differences between bonds and stocks is crucial for making informed investment decisions.",
        keyPoints: [
          "Ownership vs Lending: Stocks make you a part-owner, bonds make you a lender",
          "Risk Profile: Bonds are generally less risky than stocks",
          "Returns: Stocks offer potentially higher returns, bonds provide steady income",
          "Priority in Bankruptcy: Bondholders get paid before stockholders",
          "Volatility: Bond prices are typically less volatile than stock prices"
        ],
        examples: [
          "Reliance Industries stock vs Reliance Industries bond comparison",
          "During 2008 crisis: Stock market fell 50%+ while government bonds provided stability",
          "Long-term returns: Nifty 50 averaged 12% vs Government bonds at 7%"
        ]
      },
      completed: false
    },
    {
      id: 'bond-terminology',
      title: 'Key Bond Terms',
      type: 'interactive',
      duration: '18 mins',
      content: {
        introduction: "Master the essential vocabulary of bond investing. These terms form the foundation of bond analysis.",
        keyPoints: [
          "Face Value/Par Value: The amount paid back at maturity (usually ₹1,000 or ₹10,000)",
          "Coupon Rate: The annual interest rate paid on the bond's face value",
          "Yield to Maturity (YTM): The total return if held until maturity",
          "Duration: Measure of price sensitivity to interest rate changes",
          "Credit Rating: Assessment of the issuer's ability to repay (AAA, AA, BBB, etc.)",
          "Maturity Date: When the principal amount is repaid to the bondholder"
        ],
        examples: [
          "₹10,000 face value bond with 8% coupon = ₹800 annual interest",
          "AAA-rated government bond vs BB-rated corporate bond risk difference",
          "Short-term (1-3 years) vs Long-term (10+ years) bond characteristics"
        ]
      },
      completed: false
    },
    {
      id: 'how-bonds-work',
      title: 'How Bonds Generate Income',
      type: 'video',
      duration: '20 mins',
      content: {
        introduction: "Learn the mechanics of how bonds create wealth for investors through regular income and capital appreciation.",
        keyPoints: [
          "Regular Interest Payments: Most bonds pay interest semi-annually or annually",
          "Capital Appreciation: Bond prices can increase if interest rates fall",
          "Reinvestment Income: Interest can be reinvested to compound returns",
          "Tax Implications: Interest income is taxable, capital gains have different rates",
          "Inflation Impact: Real returns = Nominal returns - Inflation rate"
        ],
        examples: [
          "₹1,00,000 bond at 7% pays ₹7,000 annually for 5 years + ₹1,00,000 at maturity",
          "If interest rates fall from 7% to 5%, bond price increases to provide better value",
          "Tax calculation: 30% tax on ₹7,000 interest = ₹2,100 annual tax"
        ],
        videoUrl: "/videos/how-bonds-work.mp4"
      },
      completed: false
    },
    {
      id: 'bond-basics-quiz',
      title: 'Bond Basics Quiz',
      type: 'quiz',
      duration: '10 mins',
      content: {
        introduction: "Test your understanding of bond fundamentals with this comprehensive quiz covering all key concepts.",
        keyPoints: [
          "10 multiple choice questions covering bond basics",
          "Real-world scenarios and calculations",
          "Immediate feedback on each answer",
          "Minimum 70% score required to pass",
          "Unlimited attempts to improve your score"
        ]
      },
      completed: false
    }
  ];

  useEffect(() => {
    // Calculate progress based on completed lessons
    const completed = completedLessons.filter(Boolean).length;
    setProgress((completed / lessons.length) * 100);
  }, [completedLessons, lessons.length]);

  const handleLessonComplete = (lessonIndex: number) => {
    const newCompleted = [...completedLessons];
    newCompleted[lessonIndex] = true;
    setCompletedLessons(newCompleted);
    
    // Move to next lesson if available
    if (lessonIndex < lessons.length - 1) {
      setCurrentLesson(lessonIndex + 1);
    }
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const currentLessonData = lessons[currentLesson];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/bonds-course" className="text-blue-600 hover:text-blue-800 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bond Basics</h1>
                <p className="text-gray-600">Foundation of Bond Investment</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="font-semibold text-gray-900">{Math.round(progress)}%</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-semibold text-gray-900">90 mins</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-blue-500 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Lesson Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Lessons</h3>
              <div className="space-y-3">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      currentLesson === index
                        ? 'bg-blue-50 border-2 border-blue-200 text-blue-900'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{lesson.title}</span>
                      {completedLessons[index] ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : currentLesson === index ? (
                        <PlayCircle className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {lesson.duration}
                      <span className="mx-2">•</span>
                      <span className="capitalize">{lesson.type}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Trophy className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-800">XP Reward</span>
                </div>
                <p className="text-sm text-yellow-700">Complete this module to earn 150 XP!</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Lesson Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{currentLessonData.title}</h2>
                    <div className="flex items-center text-blue-100">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{currentLessonData.duration}</span>
                      <span className="mx-3">•</span>
                      <span className="capitalize">{currentLessonData.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-blue-200">Lesson {currentLesson + 1} of {lessons.length}</div>
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="p-6">
                {/* Introduction */}
                <div className="mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {currentLessonData.content.introduction}
                  </p>
                </div>

                {/* Video Player (for video lessons) */}
                {currentLessonData.type === 'video' && currentLessonData.content.videoUrl && (
                  <div className="mb-8 bg-black rounded-lg overflow-hidden">
                    <div className="aspect-video flex items-center justify-center bg-gray-900">
                      <div className="text-center text-white">
                        <PlayCircle className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-lg">Video: {currentLessonData.title}</p>
                        <p className="text-sm text-gray-400">Duration: {currentLessonData.duration}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Points */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Learning Points</h3>
                  <div className="space-y-3">
                    {currentLessonData.content.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                {currentLessonData.content.examples && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-World Examples</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="space-y-4">
                        {currentLessonData.content.examples.map((example, index) => (
                          <div key={index} className="flex items-start">
                            <Target className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                            <p className="text-green-800">{example}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Quiz Section */}
                {currentLessonData.type === 'quiz' && (
                  <div className="mb-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-purple-900 mb-2">Quiz Time!</h3>
                      <p className="text-purple-700 mb-6">Test your knowledge with our interactive quiz</p>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                        Start Quiz
                      </button>
                    </div>
                  </div>
                )}

                {/* Interactive Elements */}
                {currentLessonData.type === 'interactive' && (
                  <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calculator className="w-8 h-8 text-yellow-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-yellow-900 mb-2">Interactive Learning</h3>
                      <p className="text-yellow-700 mb-6">Engage with interactive tools and simulations</p>
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                        Start Interactive Session
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <button
                    onClick={prevLesson}
                    disabled={currentLesson === 0}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentLesson === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Previous
                  </button>

                  <div className="flex items-center space-x-4">
                    {!completedLessons[currentLesson] && (
                      <button
                        onClick={() => handleLessonComplete(currentLesson)}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Mark Complete
                      </button>
                    )}

                    <button
                      onClick={nextLesson}
                      disabled={currentLesson === lessons.length - 1}
                      className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                        currentLesson === lessons.length - 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      Next
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Module Completion */}
            {progress === 100 && (
              <div className="mt-8 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg p-8 text-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Congratulations!</h3>
                <p className="text-lg mb-6">You've completed the Bond Basics module!</p>
                <div className="flex items-center justify-center space-x-8 mb-6">
                  <div>
                    <div className="text-2xl font-bold">+150 XP</div>
                    <div className="text-sm opacity-90">Experience Points</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">90 mins</div>
                    <div className="text-sm opacity-90">Learning Time</div>
                  </div>
                </div>
                <Link
                  href="/bonds-course"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                >
                  Continue to Next Module
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondBasicsModule;
