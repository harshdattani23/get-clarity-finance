"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Brain, Shield, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface ExpertiseLevel {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const expertiseLevels: ExpertiseLevel[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'New to investing, learning the basics',
    icon: <Brain className="w-6 h-6" />
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'Some experience, understanding key concepts',
    icon: <Target className="w-6 h-6" />
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Experienced investor, deep market knowledge',
    icon: <TrendingUp className="w-6 h-6" />
  }
];

const fraudProtectionQuestions = [
  {
    question: "What should you do if someone promises guaranteed high returns?",
    options: [
      "Invest immediately to not miss out",
      "Be skeptical and research thoroughly",
      "Ask friends for their opinion",
      "Trust them if they seem professional"
    ],
    correctAnswer: 1,
    explanation: "Guaranteed high returns are a major red flag. Legitimate investments carry risk and no one can guarantee returns."
  },
  {
    question: "Which of these is a common fraud tactic?",
    options: [
      "Providing detailed financial statements",
      "Creating urgency to invest quickly",
      "Offering transparent fee structures",
      "Providing regulatory compliance documents"
    ],
    correctAnswer: 1,
    explanation: "Creating urgency is a classic fraud tactic to pressure victims into making hasty decisions."
  },
  {
    question: "What's the best way to verify an investment opportunity?",
    options: [
      "Trust the salesperson's word",
      "Check with regulatory authorities",
      "Ask other investors in the scheme",
      "Look at their website design"
    ],
    correctAnswer: 1,
    explanation: "Always verify with regulatory authorities like SEBI, RBI, or other relevant bodies."
  }
];

const investmentQuestions: Question[] = [
  {
    id: 1,
    question: "What is diversification in investing?",
    options: [
      "Putting all money in one stock",
      "Spreading investments across different assets",
      "Investing only in bonds",
      "Keeping all money in savings account"
    ],
    correctAnswer: 1,
    explanation: "Diversification reduces risk by spreading investments across different assets, sectors, and geographies.",
    category: "Risk Management"
  },
  {
    id: 2,
    question: "What does P/E ratio stand for?",
    options: [
      "Price to Earnings ratio",
      "Profit to Expense ratio",
      "Purchase to Equity ratio",
      "Performance to Expectation ratio"
    ],
    correctAnswer: 0,
    explanation: "P/E ratio measures a company's stock price relative to its earnings per share.",
    category: "Valuation"
  },
  {
    id: 3,
    question: "What is compound interest?",
    options: [
      "Interest only on the principal amount",
      "Interest earned on both principal and accumulated interest",
      "Interest paid monthly",
      "Interest calculated annually"
    ],
    correctAnswer: 1,
    explanation: "Compound interest is interest earned on both the initial principal and accumulated interest from previous periods.",
    category: "Basic Concepts"
  },
  {
    id: 4,
    question: "What is a mutual fund?",
    options: [
      "A single stock investment",
      "A pool of money from multiple investors",
      "A government bond",
      "A bank savings account"
    ],
    correctAnswer: 1,
    explanation: "A mutual fund pools money from multiple investors to invest in a diversified portfolio of securities.",
    category: "Investment Products"
  },
  {
    id: 5,
    question: "What is market volatility?",
    options: [
      "Steady market growth",
      "Rapid and unpredictable price changes",
      "Low trading volume",
      "High interest rates"
    ],
    correctAnswer: 1,
    explanation: "Market volatility refers to the degree of variation in trading prices over time.",
    category: "Market Concepts"
  },
  {
    id: 6,
    question: "What is a bull market?",
    options: [
      "A market that's falling",
      "A market that's rising",
      "A market with low volume",
      "A market with high volatility"
    ],
    correctAnswer: 1,
    explanation: "A bull market is characterized by rising prices and optimistic investor sentiment.",
    category: "Market Concepts"
  },
  {
    id: 7,
    question: "What is the primary purpose of bonds?",
    options: [
      "To provide high growth potential",
      "To provide regular income and preserve capital",
      "To speculate on price movements",
      "To avoid all investment risk"
    ],
    correctAnswer: 1,
    explanation: "Bonds primarily provide regular income through interest payments and help preserve capital.",
    category: "Investment Products"
  },
  {
    id: 8,
    question: "What is asset allocation?",
    options: [
      "Choosing individual stocks",
      "Dividing investments among different asset classes",
      "Timing the market",
      "Selecting mutual funds"
    ],
    correctAnswer: 1,
    explanation: "Asset allocation is the process of dividing investments among different asset classes like stocks, bonds, and cash.",
    category: "Portfolio Management"
  },
  {
    id: 9,
    question: "What is inflation's impact on investments?",
    options: [
      "It increases real returns",
      "It reduces purchasing power of returns",
      "It has no impact",
      "It only affects bonds"
    ],
    correctAnswer: 1,
    explanation: "Inflation reduces the purchasing power of investment returns over time.",
    category: "Economic Concepts"
  },
  {
    id: 10,
    question: "What is the risk-return tradeoff?",
    options: [
      "Higher risk always means higher returns",
      "Generally, higher potential returns come with higher risk",
      "Lower risk investments always perform better",
      "Risk and return are unrelated"
    ],
    correctAnswer: 1,
    explanation: "The risk-return tradeoff means that investments with higher potential returns typically carry higher risk.",
    category: "Risk Management"
  }
];

export default function InvestmentQuiz() {
  const [step, setStep] = useState<'expertise' | 'fraud-protection' | 'quiz' | 'results'>('expertise');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('');
  const [fraudAnswers, setFraudAnswers] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleExpertiseSelection = (expertiseId: string) => {
    setSelectedExpertise(expertiseId);
    setStep('fraud-protection');
  };

  const handleFraudAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...fraudAnswers];
    newAnswers[questionIndex] = answerIndex;
    setFraudAnswers(newAnswers);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < investmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setStep('results');
    }
  };

  const calculateScore = () => {
    return quizAnswers.reduce((score, answer, index) => {
      return score + (answer === investmentQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getFraudProtectionScore = () => {
    return fraudAnswers.reduce((score, answer, index) => {
      return score + (answer === fraudProtectionQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getRecommendations = (score: number) => {
    if (score >= 8) return "Excellent! You have strong investment knowledge. Consider advanced topics like options trading or international markets.";
    if (score >= 6) return "Good foundation! Focus on portfolio diversification and risk management strategies.";
    if (score >= 4) return "Basic understanding. Study fundamental analysis and different investment vehicles.";
    return "Beginner level. Start with basic concepts like compound interest and different asset classes.";
  };

  if (step === 'expertise') {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Investment Knowledge Assessment
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Test your investment knowledge and learn to protect yourself from fraud
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              What's your investment expertise level?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {expertiseLevels.map((level) => (
                <motion.div
                  key={level.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => handleExpertiseSelection(level.id)}
                >
                  <div className="text-center">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      {level.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{level.name}</h3>
                    <p className="text-gray-600">{level.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 'fraud-protection') {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              <Shield className="w-8 h-8 inline mr-2 text-yellow-600" />
              Fraud Protection Assessment
            </h1>
            <p className="text-lg text-gray-600">
              Let's test your ability to identify investment fraud
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Question {fraudAnswers.length + 1} of {fraudProtectionQuestions.length}
                </h2>
              </div>
              
              <p className="text-lg text-gray-700 mb-6">
                {fraudProtectionQuestions[fraudAnswers.length].question}
              </p>

              <div className="space-y-3">
                {fraudProtectionQuestions[fraudAnswers.length].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleFraudAnswer(fraudAnswers.length, index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      fraudAnswers[fraudAnswers.length] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {fraudAnswers.length === fraudProtectionQuestions.length && (
              <div className="text-center">
                <button
                  onClick={() => setStep('quiz')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Continue to Investment Quiz
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 'quiz') {
    const currentQ = investmentQuestions[currentQuestion];
    
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              <Brain className="w-8 h-8 inline mr-2 text-blue-600" />
              Investment Knowledge Quiz
            </h1>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {investmentQuestions.length}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / investmentQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
                {currentQ.category}
              </span>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {currentQ.question}
              </h2>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      quizAnswers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {quizAnswers[currentQuestion] !== undefined && !showExplanation && (
              <div className="text-center">
                <button
                  onClick={() => setShowExplanation(true)}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Submit Answer
                </button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gray-50 rounded-lg"
              >
                <h3 className="font-semibold text-gray-800 mb-2">Explanation:</h3>
                <p className="text-gray-700">{currentQ.explanation}</p>
                <button
                  onClick={nextQuestion}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {currentQuestion === investmentQuestions.length - 1 ? 'See Results' : 'Next Question'}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 'results') {
    const quizScore = calculateScore();
    const fraudScore = getFraudProtectionScore();
    const totalQuestions = investmentQuestions.length;
    const percentage = (quizScore / totalQuestions) * 100;

    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              <CheckCircle className="w-8 h-8 inline mr-2 text-green-600" />
              Quiz Results
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Investment Knowledge Score */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Investment Knowledge
              </h2>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {quizScore}/{totalQuestions}
                </div>
                <div className="text-2xl font-semibold text-gray-600 mb-4">
                  {percentage.toFixed(0)}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-700 mb-4">{getRecommendations(quizScore)}</p>
              </div>
            </div>

            {/* Fraud Protection Score */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                <Shield className="w-6 h-6 inline mr-2 text-yellow-600" />
                Fraud Protection
              </h2>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-yellow-600 mb-2">
                  {fraudScore}/{fraudProtectionQuestions.length}
                </div>
                <div className="text-2xl font-semibold text-gray-600 mb-4">
                  {((fraudScore / fraudProtectionQuestions.length) * 100).toFixed(0)}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-yellow-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${(fraudScore / fraudProtectionQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                {fraudScore === fraudProtectionQuestions.length ? (
                  <p className="text-green-700 font-semibold">Excellent fraud awareness!</p>
                ) : fraudScore >= 2 ? (
                  <p className="text-yellow-700">Good awareness, but stay vigilant!</p>
                ) : (
                  <p className="text-red-700">Please study fraud protection more carefully.</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-8 space-x-4">
            <button
              onClick={() => {
                setStep('expertise');
                setSelectedExpertise('');
                setFraudAnswers([]);
                setQuizAnswers([]);
                setCurrentQuestion(0);
                setShowExplanation(false);
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Take Quiz Again
            </button>
            <Link
              href="/fraud-protection"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-block"
            >
              Fraud Protection Guide
            </Link>
            <Link
              href="/awareness"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}