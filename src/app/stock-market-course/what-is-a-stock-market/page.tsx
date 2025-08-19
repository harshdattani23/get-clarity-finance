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
import { Trophy, Building, Store, Users, TrendingUp, Shield, Target, Zap, CheckCircle, ArrowRight, BarChart3, DollarSign, BookOpen, UserCheck, AlertTriangle, MapPin, Calendar, ChartBar, Handshake, Rocket, ShieldCheck, Clock, TrendingDown } from 'lucide-react';

export default function WhatIsAStockMarket() {
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleLessonComplete = (totalScore: number) => {
    setFinalScore(totalScore);
    setLessonCompleted(true);
  };

  const handlePartComplete = (partId: string, score: number) => {
    console.log(`Part ${partId} completed with score: ${score}`);
  };

  // Create a completion handler that can be passed to interactive components
  const createCompletionHandler = (partId: string) => {
    return (score: number, total?: number) => {
      const scaledScore = total ? Math.round((score / total) * 100) : score;
      console.log(`Part ${partId} completed:`);
      console.log(`- Raw score: ${score}`);
      console.log(`- Total questions: ${total}`);
      console.log(`- Scaled score: ${scaledScore}/100`);
      
      if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
        (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete(partId, scaledScore);
      }
    };
  };

  // Create a completion handler for ConfirmationCheck component
  const createConfirmationHandler = (partId: string) => {
    return (partIdParam: string, score: number) => {
      console.log(`Part ${partIdParam} completed with score: ${score}`);
      
      if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
        (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete(partIdParam, score);
      }
    };
  };

  // Define lesson parts
  const lessonParts = [
    {
      id: "introduction-with-audio",
      title: "What is a Stock Market?",
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
              In this lesson, you&apos;ll discover what a stock market is, how it functions, and its crucial role in the Indian economy. Learn about the major exchanges, trading hours, and how to get started in the world of stock markets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What is a Stock Market?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A stock market is a public marketplace where shares of publicly traded companies are bought, sold, and traded. In India, it&apos;s a complex ecosystem that includes stock exchanges like NSE and BSE, brokers, investors, and regulatory bodies like SEBI.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Think of it like a giant, well-organized supermarket in Mumbai&apos;s Crawford Market. But instead of selling fruits and vegetables, it sells stocks (ownership pieces) of publicly listed Indian companies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Functions</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Capital formation for Indian companies</li>
                <li>• Provides liquidity for investors</li>
                <li>• Enables price discovery</li>
                <li>• Wealth creation opportunities</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Regulated by SEBI for investor protection</li>
                <li>• Trading hours: 9:15 AM to 3:30 PM IST</li>
                <li>• Major exchanges: NSE and BSE</li>
                <li>• Requires demat and trading accounts</li>
              </ul>
            </div>
          </div>

          {/* Audio Summary Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              🎧 Listen to the Multi-Language Audio Summary
            </h3>
            <p className="text-purple-700 mb-6">
              Take a moment to listen to this comprehensive audio summary available in multiple languages including Hindi, English, Bengali, Marathi, Gujarati, and Tamil. 
              Perfect for auditory learners and those who prefer listening over reading.
            </p>
            
            <AudioSummary
              title="What is a Stock Market? - Audio Summary"
              description="Listen to a comprehensive audio summary of what a stock market is, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-market-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-market-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-market-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-market-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-market-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-market-ta.m4a"
              hindiTranscript="शेयर बाजार क्या है - भारतीय अर्थव्यवस्था का दिल। जहां कंपनियां अपने शेयर बेचती हैं और निवेशक उन्हें खरीदते हैं। NSE और BSE जैसे एक्सचेंजों के माध्यम से पारदर्शी और विनियमित व्यापार।"
              englishTranscript="What is a Stock Market - The Heart of Indian Capitalism. A public marketplace where shares of publicly traded companies are bought, sold, and traded. Transparent and regulated trading through exchanges like NSE and BSE."
              bengaliTranscript="স্টক মার্কেট কী - ভারতীয় অর্থনীতির হৃদয়। যেখানে পাবলিক কোম্পানিগুলির শেয়ার কেনা, বিক্রি এবং ট্রেড করা হয়। NSE এবং BSE এর মতো এক্সচেঞ্জের মাধ্যমে স্বচ্ছ এবং নিয়ন্ত্রিত ট্রেডিং।"
              marathiTranscript="शेअर बाजार म्हणजे काय - भारतीय अर्थव्यवस्थेचे हृदय। जिथे सार्वजनिक कंपन्यांचे शेअर्स खरेदी, विक्री आणि व्यापार केला जातो। NSE आणि BSE सारख्या एक्सचेंजद्वारे पारदर्शी आणि नियंत्रित व्यापार।"
              gujaratiTranscript="સ્ટોક માર્કેટ શું છે - ભારતીય અર્થવ્યવસ્થાનું હૃદય. જ્યાં જાહેર કંપનીઓના શેર ખરીદવા, વેચવા અને વેપાર કરવામાં આવે છે. NSE અને BSE જેવા એક્સચેન્જ દ્વારા પારદર્શક અને નિયંત્રિત વેપાર."
              tamilTranscript="பங்கு சந்தை என்றால் என்ன - இந்திய பொருளாதாரத்தின் இதயம். பொது நிறுவனங்களின் பங்குகள் வாங்கப்படும், விற்கப்படும் மற்றும் வர்த்தகம் செய்யப்படும் இடம். NSE மற்றும் BSE போன்ற பரிமாற்றங்கள் மூலம் வெளிப்படையான மற்றும் கட்டுப்படுத்தப்பட்ட வர்த்தகம்."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand that a stock market is a public marketplace for trading company shares",
              "I recognize that stock markets are regulated and provide liquidity for investors"
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
      id: "supermarket-analogy",
      title: "The Supermarket Analogy",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              🛒 Understanding Stock Markets Through Supermarkets
            </h3>
            <p className="text-purple-700 leading-relaxed mb-4">
              Let&apos;s break down stock markets using a simple supermarket analogy that makes everything crystal clear!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">A Supermarket</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Connects buyers (shoppers) with sellers (farmers, brands). Provides a central location, standardized pricing, and quality assurance. Just like Crawford Market in Mumbai brings together various vendors and customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">A Stock Market</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Connects buyers (investors) with sellers (other investors or companies). Provides a central platform, transparent pricing, and regulatory oversight through SEBI.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Key Similarities</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-yellow-800">Central Location</h5>
                <p className="text-yellow-700">Both provide a single place for transactions</p>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800">Standardized Pricing</h5>
                <p className="text-yellow-700">Clear, transparent pricing for all participants</p>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800">Quality Assurance</h5>
                <p className="text-yellow-700">Regulations ensure fair and safe trading</p>
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
      title: "Stock Market Basics Quiz",
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: "marketplace",
              question: "What is a stock market?",
              options: [
                "A place to buy groceries and household items",
                "A public marketplace where company shares are traded",
                "A bank where you can deposit money",
                "A government office for business registration"
              ],
              correctAnswer: 1,
              explanation: "Correct! A stock market is a public marketplace where shares of publicly traded companies are bought, sold, and traded. It&apos;s like a supermarket but for company ownership."
            },
            {
              id: "regulation",
              question: "Who regulates the Indian stock market?",
              options: [
                "RBI (Reserve Bank of India)",
                "SEBI (Securities and Exchange Board of India)",
                "NSE (National Stock Exchange)",
                "BSE (Bombay Stock Exchange)"
              ],
              correctAnswer: 1,
              explanation: "Great! SEBI (Securities and Exchange Board of India) is the regulatory body that oversees and regulates the Indian stock market to protect investors."
            },
            {
              id: "exchanges",
              question: "Which are the two major stock exchanges in India?",
              options: [
                "NYSE and NASDAQ",
                "NSE and BSE",
                "LSE and TSE",
                "HKEX and SGX"
              ],
              correctAnswer: 1,
              explanation: "Excellent! NSE (National Stock Exchange) and BSE (Bombay Stock Exchange) are the two major stock exchanges in India where most trading takes place."
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
      id: "core-functions",
      title: "Core Functions of Stock Markets",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              Core Functions of a Stock Market
            </h3>
            <p className="text-blue-700">
              The Indian stock market serves several critical functions that are essential for India&apos;s economy and society.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Capital Formation</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Indian companies raise money by selling ownership stakes to the public. This enables business growth, job creation, and economic development.
              </p>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Benefits:</h5>
                <ul className="text-green-700 text-xs space-y-1">
                  <li>• Funds for expansion and innovation</li>
                  <li>• Job creation and economic growth</li>
                  <li>• Research and development funding</li>
                  <li>• Market expansion opportunities</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Liquidity</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Indian investors can easily enter and exit their investments. This provides flexibility and risk management capabilities.
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Benefits:</h5>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Quick access to money when needed</li>
                  <li>• Ability to adjust portfolio allocation</li>
                  <li>• Risk management through diversification</li>
                  <li>• Opportunity to capitalize on market movements</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Price Discovery</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                The Indian market determines fair value through supply and demand. This ensures efficient allocation of capital.
              </p>
              <div className="bg-purple-50 p-3 rounded border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">Benefits:</h5>
                <ul className="text-purple-700 text-xs space-y-1">
                  <li>• Transparent pricing based on real-time information</li>
                  <li>• Efficient allocation of capital in India</li>
                  <li>• Reduced information asymmetry</li>
                  <li>• Fair valuation for all market participants</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Wealth Creation</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Enables Indian individuals to build wealth over time through long-term investment strategies.
              </p>
              <div className="bg-orange-50 p-3 rounded border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-2">Benefits:</h5>
                <ul className="text-orange-700 text-xs space-y-1">
                  <li>• Retirement planning and security</li>
                  <li>• Beat inflation and preserve purchasing power</li>
                  <li>• Passive income through dividends</li>
                  <li>• Long-term wealth building</li>
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
      title: "Function Matching Exercise",
      content: (
        <InteractiveSelection
          title="Match each stock market function with its description"
          description="Select the correct function for each description. This will help you understand the core purposes of stock markets."
          options={[
            {
              id: "capital-formation",
              text: "Companies raise money by selling ownership stakes to the public",
              isCorrect: true,
              explanation: "Correct! This is capital formation - companies get funding for growth while investors get ownership in the company."
            },
            {
              id: "liquidity",
              text: "Investors can easily buy and sell their investments",
              isCorrect: true,
              explanation: "Correct! This is liquidity - the ability to quickly enter and exit investments."
            },
            {
              id: "price-discovery",
              text: "Market determines fair value through supply and demand",
              isCorrect: true,
              explanation: "Correct! This is price discovery - the market mechanism that sets fair prices."
            },
            {
              id: "wealth-creation",
              text: "Individuals build wealth through long-term investing",
              isCorrect: true,
              explanation: "Correct! This is wealth creation - the opportunity for investors to grow their money over time."
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
      id: "major-exchanges",
      title: "Major Stock Exchanges in India",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🌟 Major Stock Exchanges in India
            </h3>
            <p className="text-green-700">
              India has two major stock exchanges that handle most of the trading activity. Understanding these helps you make informed investment decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">NSE (National Stock Exchange)</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Established:</span>
                  <span className="font-medium">1992</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">Mumbai</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Index:</span>
                  <span className="font-medium text-green-600">NIFTY 50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Market Share:</span>
                  <span className="font-medium text-green-600">~80%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">BSE (Bombay Stock Exchange)</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Established:</span>
                  <span className="font-medium">1875</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">Mumbai</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Index:</span>
                  <span className="font-medium text-green-600">SENSEX</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Market Share:</span>
                  <span className="font-medium text-green-600">~20%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">Key Differences</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">NSE Advantages:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Higher trading volumes and liquidity</li>
                  <li>• More modern technology infrastructure</li>
                  <li>• Wider range of financial products</li>
                  <li>• Lower transaction costs</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">BSE Advantages:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Longest operating exchange in Asia</li>
                  <li>• Strong historical presence</li>
                  <li>• Good for small-cap stocks</li>
                  <li>• Traditional trading methods</li>
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
      id: "short-questions",
      title: "Understanding Check",
      content: (
        <ShortQuestions
          title="Test Your Understanding"
          description="Answer these questions to ensure you&apos;ve grasped the key concepts about stock markets."
          questions={[
            {
              id: "exchanges",
              question: "Explain the difference between NSE and BSE in your own words.",
              hint: "Think about their establishment dates, market share, and main indices.",
              correctAnswer: "nse bse exchanges market share nifty sensex",
              explanation: "Great! NSE (established 1992) has about 80% market share and uses NIFTY 50 as its main index. BSE (established 1875) has about 20% market share and uses SENSEX as its main index. NSE is more modern with higher trading volumes."
            },
            {
              id: "functions",
              question: "What are the four core functions of a stock market?",
              hint: "Consider what stock markets do for companies, investors, and the economy.",
              correctAnswer: "capital formation liquidity price discovery wealth creation",
              explanation: "Perfect! The four core functions are: 1) Capital Formation - companies raise money, 2) Liquidity - investors can easily trade, 3) Price Discovery - market sets fair prices, 4) Wealth Creation - long-term investment growth."
            },
            {
              id: "regulation",
              question: "Why is regulation important in stock markets?",
              hint: "Think about protecting investors and ensuring fair trading.",
              correctAnswer: "investor protection fair trading transparency sebi regulation",
              explanation: "Excellent! Regulation is crucial because it protects investors from fraud, ensures fair and transparent trading, maintains market integrity, and builds investor confidence. SEBI oversees the Indian market to maintain these standards."
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
              Congratulations! You&apos;ve completed the &quot;What is a Stock Market?&quot; lesson. 
              Here&apos;s a summary of the key concepts you now understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Core Concepts</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Stock markets are public marketplaces for trading company shares</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>They serve four core functions: capital formation, liquidity, price discovery, and wealth creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>NSE and BSE are the two major exchanges in India</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>SEBI regulates the market for investor protection</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Market Understanding</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Stock markets work like organized supermarkets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>They provide transparency and standardized pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>They enable economic growth and job creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>They offer opportunities for long-term wealth building</span>
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
                <p className="text-yellow-700 text-sm">Use virtual trading to practice</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Research</h5>
                <p className="text-yellow-700 text-sm">Study real market data</p>
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
        description="Congratulations on completing the &apos;What is a Stock Market?&apos; lesson"
        lessonSlug="what-is-a-stock-market"
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
            You&apos;ve successfully learned about stock markets and demonstrated 
            your understanding through various interactive exercises. You&apos;re now 
            ready to explore more advanced concepts!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/how-stocks-are-traded"
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
      title="What is a Stock Market?"
      description="Learn about stock markets, their functions, major exchanges, and how they work in India through interactive lessons and real-world examples."
      lessonSlug="what-is-a-stock-market"
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
