"use client";

import { useState } from "react";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import InteractiveQuiz from "@/components/stock-market-course/InteractiveQuiz";
import InteractiveSelection from "@/components/stock-market-course/InteractiveSelection";
import ShortQuestions from "@/components/stock-market-course/ShortQuestions";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ArrowRight, BarChart3, DollarSign, BookOpen, UserCheck, MapPin, Calendar, ChartBar, Handshake, Rocket, ShieldCheck, Clock, PieChart, Layers, Target as TargetIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Minus, Plus } from 'lucide-react';

export default function BullVsBearMarkets() {
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleLessonComplete = (totalScore: number) => {
    setFinalScore(totalScore);
    setLessonCompleted(true);
  };

  const handlePartComplete = (partId: string, score: number) => {
    console.log(`Part ${partId} completed with score: ${score}`);
  };

  const createCompletionHandler = (partId: string) => {
    return (score: number, total?: number) => {
      const scaledScore = total ? Math.round((score / total) * 100) : score;
      if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
        (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete(partId, scaledScore);
      }
    };
  };

  const createConfirmationHandler = (partId: string) => {
    return (partIdParam: string, score: number) => {
      if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
        (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete(partIdParam, score);
      }
    };
  };

  const lessonParts = [
    {
      id: "introduction-with-audio",
      title: "Understanding Bull vs Bear Markets",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              What You&apos;ll Learn
            </h3>
            <p className="text-blue-700">
              In this lesson, you&apos;ll understand the two major market trends and the investor sentiment that defines them.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Market Trends and Sentiment
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You&apos;ll often hear commentators talk about &apos;bull&apos; and &apos;bear&apos; markets. These terms describe the overall direction and mood of the market.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Understanding these market cycles is crucial for making informed investment decisions and managing your portfolio effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Concepts</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Bull market characteristics</li>
                <li>• Bear market characteristics</li>
                <li>• Market cycle patterns</li>
                <li>• Investment strategies for each</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Why It Matters</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Understand market direction</li>
                <li>• Adjust investment strategies</li>
                <li>• Manage risk effectively</li>
                <li>• Identify opportunities</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              🎧 Listen to the Multi-Language Audio Summary
            </h3>
            <p className="text-purple-700 mb-6">
              Take a moment to listen to this comprehensive audio summary available in multiple languages including Hindi, English, Bengali, Marathi, Gujarati, and Tamil.
            </p>
            
            <AudioSummary
              title="Bull vs Bear Markets - Audio Summary"
              description="Listen to a comprehensive audio summary of bull vs bear markets, available in multiple languages."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/bull-vs-bear-markets-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/bull-vs-bear-markets-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/bull-vs-bear-markets-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/bull-vs-bear-markets-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/bull-vs-bear-markets-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/bull-vs-bear-markets-ta.m4a"
              hindiTranscript="बुल बनाम बेयर मार्केट - बाजार के रुझानों और निवेशक भावनाओं को समझना।"
              englishTranscript="Bull vs Bear Markets - Understanding market trends and investor sentiment."
              bengaliTranscript="বুল বনাম বেয়ার মার্কেট - বাজার প্রবণতা এবং বিনিয়োগকারীদের অনুভূতি বোঝা।"
              marathiTranscript="बुल बनाम बेअर मार्केट - बाजार प्रवृत्ती आणि गुंतवणूकदारांच्या भावना समजून घेणे।"
              gujaratiTranscript="બુલ બનામ બેર માર્કેટ - બજારની વલણો અને રોકાણકારોની ભાવનાઓ સમજવી।"
              tamilTranscript="புல் மற்றும் பேர் சந்தைகள் - சந்தை போக்குகள் மற்றும் முதலீட்டாளர்களின் உணர்வுகளைப் புரிந்துகொள்வது."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand that bull and bear markets describe market direction and sentiment",
              "I recognize that these market cycles affect investment strategies"
            ]}
            partId="introduction-with-audio"
            onPartComplete={createConfirmationHandler("introduction-with-audio")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'interactive' as const,
      skipAllowed: false
    },
    {
      id: "bull-market",
      title: "Bull Market Characteristics",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🚀 Bull Market - The Market is Charging Ahead!
            </h3>
            <p className="text-green-700 leading-relaxed">
              A bull market is characterized by optimism, investor confidence, and expectations that strong results should continue for an extended period.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">Key Characteristics</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">📈 Price Movement</h5>
                <p className="text-green-700 text-sm">Prices are rising consistently over time</p>
              </div>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">😊 Investor Sentiment</h5>
                <p className="text-blue-700 text-sm">Investor confidence is high and optimistic</p>
              </div>
              <div className="bg-purple-50 p-4 rounded border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">🏗️ Economic Conditions</h5>
                <p className="text-purple-700 text-sm">The economy is strong and growing</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Bull Market Indicators</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Technical Indicators:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Rising stock prices across sectors</li>
                  <li>• Increasing trading volumes</li>
                  <li>• Higher market participation</li>
                  <li>• Positive price momentum</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Fundamental Indicators:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Strong corporate earnings</li>
                  <li>• Low unemployment rates</li>
                  <li>• GDP growth</li>
                  <li>• Consumer confidence</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "bear-market",
      title: "Bear Market Characteristics",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-xl font-semibold text-red-800 mb-4">
              🐻 Bear Market - The Market is Hibernating
            </h3>
            <p className="text-red-700 leading-relaxed">
              A bear market is characterized by pessimism, investor fear, and expectations that weak results should continue for an extended period.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">Key Characteristics</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-red-50 p-4 rounded border border-red-200">
                <h5 className="font-medium text-red-800 mb-2">📉 Price Movement</h5>
                <p className="text-red-700 text-sm">Prices are falling (typically by 20% or more)</p>
              </div>
              <div className="bg-orange-50 p-4 rounded border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-2">😰 Investor Sentiment</h5>
                <p className="text-orange-700 text-sm">Investor confidence is low and fearful</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                <h5 className="font-medium text-yellow-800 mb-2">🏚️ Economic Conditions</h5>
                <p className="text-yellow-700 text-sm">The economy is weakening or in recession</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Bear Market Indicators</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Technical Indicators:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Declining stock prices across sectors</li>
                  <li>• Decreasing trading volumes</li>
                  <li>• Lower market participation</li>
                  <li>• Negative price momentum</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Fundamental Indicators:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Weak corporate earnings</li>
                  <li>• High unemployment rates</li>
                  <li>• GDP contraction</li>
                  <li>• Low consumer confidence</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "quiz-1",
      title: "Market Types Quiz",
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: "bull-characteristics",
              question: "Which of the following characterizes a bull market?",
              options: [
                "Falling prices and low confidence",
                "Rising prices and high confidence",
                "Stable prices and neutral sentiment",
                "Volatile prices with no clear direction"
              ],
              correctAnswer: 1,
              explanation: "Correct! A bull market is characterized by rising prices and high investor confidence, indicating optimism about future growth."
            },
            {
              id: "bear-market-definition",
              question: "What typically defines a bear market?",
              options: [
                "Prices falling by 5% or more",
                "Prices falling by 20% or more",
                "Prices staying the same",
                "Prices rising slowly"
              ],
              correctAnswer: 1,
              explanation: "Great! A bear market is typically defined as prices falling by 20% or more from recent highs, indicating significant market decline."
            },
            {
              id: "market-cycles",
              question: "Are bull and bear markets permanent or cyclical?",
              options: [
                "Permanent - once a bull, always a bull",
                "Cyclical - they naturally alternate over time",
                "Random - no pattern exists",
                "Dependent only on government policy"
              ],
              correctAnswer: 1,
              explanation: "Excellent! Bull and bear markets are cyclical and naturally alternate over time as part of the normal market cycle."
            }
          ]}
          onComplete={createCompletionHandler("quiz-1")}
        />
      ),
      isRequired: true,
      type: 'quiz' as const,
      minScore: 50,
      skipAllowed: false
    },
    {
      id: "investment-strategies",
      title: "Investment Strategies for Each Market",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              💡 Adapting Your Strategy to Market Conditions
            </h3>
            <p className="text-blue-700">
              Different market conditions require different investment approaches. Learn how to adjust your strategy for bull and bear markets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Bull Market Strategies</h4>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Growth-Oriented Approach:</h5>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Invest in growth stocks</li>
                  <li>• Consider sector rotation</li>
                  <li>• Use momentum strategies</li>
                  <li>• Maintain longer time horizons</li>
                </ul>
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded text-blue-800 text-xs">
                <strong>Key Principle:</strong> Ride the upward momentum while managing risk
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Bear Market Strategies</h4>
              <div className="bg-red-50 p-4 rounded border border-red-200">
                <h5 className="font-medium text-red-800 mb-2">Defensive Approach:</h5>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Focus on defensive stocks</li>
                  <li>• Increase cash positions</li>
                  <li>• Use dollar-cost averaging</li>
                  <li>• Consider inverse ETFs</li>
                </ul>
              </div>
              <div className="mt-3 p-2 bg-orange-100 rounded text-orange-800 text-xs">
                <strong>Key Principle:</strong> Preserve capital and look for opportunities
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Universal Principles</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Diversification:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Spread risk across assets</li>
                  <li>• Don&apos;t put all eggs in one basket</li>
                  <li>• Consider different sectors</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Risk Management:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Set stop-loss orders</li>
                  <li>• Maintain emergency funds</li>
                  <li>• Don&apos;t invest more than you can afford to lose</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Long-term Perspective:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Markets recover over time</li>
                  <li>• Stay invested for the long haul</li>
                  <li>• Avoid emotional decisions</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "selection-exercise",
      title: "Strategy Matching Exercise",
      content: (
        <InteractiveSelection
          title="Match each market condition with the appropriate investment strategy"
          description="Select the correct investment strategy for each market condition. This will help you understand how to adapt your approach."
          options={[
            {
              id: "bull-strategy",
              text: "In a bull market, focus on growth stocks and momentum strategies",
              isCorrect: true,
              explanation: "Correct! Bull markets are characterized by rising prices and optimism, making growth stocks and momentum strategies more effective."
            },
            {
              id: "bear-strategy",
              text: "In a bear market, focus on defensive stocks and capital preservation",
              isCorrect: true,
              explanation: "Correct! Bear markets require defensive strategies to preserve capital and minimize losses during declining prices."
            },
            {
              id: "universal-principles",
              text: "Regardless of market conditions, always maintain diversification and risk management",
              isCorrect: true,
              explanation: "Correct! Diversification and risk management are universal principles that apply in all market conditions."
            }
          ]}
          onComplete={createCompletionHandler("selection-exercise")}
        />
      ),
      isRequired: true,
      type: 'selection' as const,
      minScore: 50,
      skipAllowed: false
    },
    {
      id: "short-questions",
      title: "Understanding Check",
      content: (
        <ShortQuestions
          title="Test Your Understanding"
          description="Answer these questions to ensure you&apos;ve grasped the key concepts about bull vs bear markets."
          questions={[
            {
              id: "market-definitions",
              question: "Explain the key differences between bull and bear markets.",
              hint: "Think about price movements, investor sentiment, and economic conditions.",
              correctAnswer: "bull market rising prices high confidence strong economy bear market falling prices low confidence weak economy",
              explanation: "Great! Bull markets feature rising prices, high investor confidence, and strong economic conditions. Bear markets feature falling prices (typically 20%+), low investor confidence, and weak economic conditions."
            },
            {
              id: "investment-adaptation",
              question: "How should you adapt your investment strategy for different market conditions?",
              hint: "Consider the different approaches needed for bull vs bear markets.",
              correctAnswer: "bull market growth stocks momentum strategies bear market defensive stocks capital preservation diversification risk management",
              explanation: "Perfect! In bull markets, focus on growth stocks and momentum strategies. In bear markets, focus on defensive stocks and capital preservation. Always maintain diversification and risk management regardless of market conditions."
            },
            {
              id: "market-cycles",
              question: "Why is it important to understand that markets are cyclical?",
              hint: "Think about long-term investment planning and emotional decision-making.",
              correctAnswer: "long term planning emotional decisions market recovery patience investment opportunities",
              explanation: "Excellent! Understanding market cycles helps with long-term planning, prevents emotional decisions during downturns, reminds us that markets recover over time, and helps identify investment opportunities in different phases."
            }
          ]}
          onComplete={createCompletionHandler("short-questions")}
        />
      ),
      isRequired: true,
      type: 'short-answer' as const,
      minScore: 0,
      skipAllowed: false
    },
    {
      id: "key-takeaways",
      title: "Key Takeaways",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🎯 What You&apos;ve Learned
            </h3>
            <p className="text-green-700">
              Congratulations! You&apos;ve completed the &quot;Bull vs Bear Markets&quot; lesson. 
              Here&apos;s a summary of the key concepts you now understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Market Understanding</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Bull markets: rising prices, high confidence, strong economy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Bear markets: falling prices (20%+), low confidence, weak economy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Markets are cyclical and naturally alternate over time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Different market conditions require different strategies</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Investment Strategies</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Bull market: growth stocks and momentum strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Bear market: defensive stocks and capital preservation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Universal principles: diversification and risk management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Long-term perspective prevents emotional decisions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Next Steps</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Learn More</h5>
                <p className="text-yellow-700 text-sm">Continue with next lessons</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Practice</h5>
                <p className="text-yellow-700 text-sm">Apply concepts to real markets</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Research</h5>
                <p className="text-yellow-700 text-sm">Study current market conditions</p>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    }
  ];

  if (lessonCompleted) {
    return (
      <LessonLayout
        title="Lesson Completed!"
        description="Congratulations on completing the &apos;Bull vs Bear Markets&apos; lesson"
        lessonSlug="bull-vs-bear-markets"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Trophy className="w-12 h-12 text-green-600" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎉 Lesson Completed Successfully!
          </h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Performance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{finalScore}/{lessonParts.length * 100}</div>
                <div className="text-gray-600">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round((finalScore / (lessonParts.length * 100)) * 100)}%
                </div>
                <div className="text-gray-600">Overall Performance</div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            You&apos;ve successfully learned about bull vs bear markets and demonstrated 
            your understanding through various interactive exercises. You&apos;re now 
            ready to learn about market indices!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/market-indices"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Next Lesson
            </a>
          </div>
        </div>
      </LessonLayout>
    );
  }

  return (
    <LessonLayout
      title="Bull vs. Bear Markets"
      description="Understand the two major market trends and the investor sentiment that defines them."
      lessonSlug="bull-vs-bear-markets"
    >
      <MultiPartLesson
        parts={lessonParts}
        onComplete={handleLessonComplete}
        onPartComplete={handlePartComplete}
        onPartCompleteDirect={handlePartComplete}
      />
    </LessonLayout>
  );
}
