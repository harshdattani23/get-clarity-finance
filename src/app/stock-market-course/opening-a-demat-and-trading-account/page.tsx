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
import { Trophy, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ArrowRight, BarChart3, DollarSign, BookOpen, UserCheck, MapPin, Calendar, ChartBar, Handshake, Rocket, ShieldCheck, Clock, PieChart, Layers, Target as TargetIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Minus, Plus, CreditCard, Lock, ShoppingCart, Building2, FileText, CheckCircle2 } from 'lucide-react';

export default function OpeningDematAndTradingAccount() {
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
      title: "Understanding Demat and Trading Accounts",
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
              In this lesson, you&apos;ll understand the two essential accounts you need to start investing and trading in India.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Your Gateway to the Stock Market
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before you can buy or sell your first stock, you need to set up two key accounts. They might sound complex, but they serve very distinct and simple purposes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Think of them as two different doors to the same house - each serves a specific function but together they give you complete access to the stock market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Concepts</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• What is a Demat Account</li>
                <li>• What is a Trading Account</li>
                <li>• How they work together</li>
                <li>• Account opening process</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Why It Matters</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Essential for stock trading</li>
                <li>• Secure investment storage</li>
                <li>• Regulatory compliance</li>
                <li>• Market access</li>
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
              title="Opening Demat and Trading Account - Audio Summary"
              description="Listen to a comprehensive audio summary of opening demat and trading accounts, available in multiple languages."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/opening-demat-trading-account-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/opening-demat-trading-account-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/opening-demat-trading-account-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/opening-demat-trading-account-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/opening-demat-trading-account-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/opening-demat-trading-account-ta.m4a"
              hindiTranscript="डीमैट और ट्रेडिंग अकाउंट खोलना - शेयर बाजार में निवेश के लिए आवश्यक खाते।"
              englishTranscript="Opening Demat and Trading Account - Essential accounts for stock market investment."
              bengaliTranscript="ডিম্যাট এবং ট্রেডিং অ্যাকাউন্ট খোলা - শেয়ার বাজারে বিনিয়োগের জন্য প্রয়োজনীয় অ্যাকাউন্ট।"
              marathiTranscript="डीमॅट आणि ट्रेडिंग खाते उघडणे - शेअर बाजारात गुंतवणूकीसाठी आवश्यक खाती।"
              gujaratiTranscript="ડીમેટ અને ટ્રેડિંગ એકાઉન્ટ ખોલવું - શેર બજારમાં રોકાણ માટે જરૂરી એકાઉન્ટ્સ."
              tamilTranscript="டிமேட் மற்றும் டிரேடிங் கணக்கு திறப்பது - பங்கு சந்தையில் முதலீட்டிற்கான அவசியமான கணக்குகள்."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand that I need two accounts to start trading stocks",
              "I recognize that these accounts serve different but complementary purposes"
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
      id: "demat-account",
      title: "The Demat Account: Your Digital Vault",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🏦 Demat Account: Your Digital Vault
            </h3>
            <p className="text-green-700 leading-relaxed">
              A <strong>Demat Account</strong> (short for Dematerialized Account) is like a digital vault or a bank account for your securities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">What is a Demat Account?</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Instead of holding physical share certificates, your stocks, bonds, mutual funds, and other investments are held in an electronic (dematerialized) format.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Purpose:</h5>
                <p className="text-blue-700 text-sm">To hold your investments securely in electronic format</p>
              </div>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Analogy:</h5>
                <p className="text-green-700 text-sm">It&apos;s the locker where you store your financial assets</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">What Can You Hold in a Demat Account?</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Equity Securities:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Common stocks</li>
                  <li>• Preferred stocks</li>
                  <li>• Rights and warrants</li>
                  <li>• Bonus shares</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Other Investments:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Government bonds</li>
                  <li>• Corporate bonds</li>
                  <li>• Mutual fund units</li>
                  <li>• ETFs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">Benefits of Demat Accounts</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Security:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• No physical certificates to lose</li>
                  <li>• Protected from damage</li>
                  <li>• Secure electronic storage</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Convenience:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Easy transfer of securities</li>
                  <li>• Quick settlement</li>
                  <li>• No paperwork hassles</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Cost-Effective:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Lower transaction costs</li>
                  <li>• No stamp duty</li>
                  <li>• Reduced brokerage fees</li>
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
      id: "trading-account",
      title: "The Trading Account: Your Marketplace Access",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              🛒 Trading Account: Your Marketplace Access
            </h3>
            <p className="text-blue-700 leading-relaxed">
              A <strong>Trading Account</strong> is your link to the stock exchanges (like the NSE and BSE). This is the account you use to actually place buy and sell orders for stocks and other securities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">What is a Trading Account?</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              The trading account acts as your interface with the stock market, allowing you to execute buy and sell orders through your broker.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Purpose:</h5>
                <p className="text-blue-700 text-sm">To execute transactions (buy and sell orders)</p>
              </div>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Analogy:</h5>
                <p className="text-green-700 text-sm">It&apos;s the shopping cart you use to buy or sell items at the financial supermarket</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Trading Account Features</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Order Management:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Place buy orders</li>
                  <li>• Place sell orders</li>
                  <li>• Modify existing orders</li>
                  <li>• Cancel orders</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Market Access:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• NSE (National Stock Exchange)</li>
                  <li>• BSE (Bombay Stock Exchange)</li>
                  <li>• Currency derivatives</li>
                  <li>• Commodity trading</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">Trading Account Benefits</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Real-time Trading:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Live market prices</li>
                  <li>• Instant order execution</li>
                  <li>• Real-time portfolio updates</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Multiple Order Types:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Market orders</li>
                  <li>• Limit orders</li>
                  <li>• Stop-loss orders</li>
                  <li>• GTC orders</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Research Tools:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Technical charts</li>
                  <li>• Company research</li>
                  <li>• Market news</li>
                  <li>• Portfolio analytics</li>
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
      title: "Account Types Quiz",
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: "demat-purpose",
              question: "What is the primary purpose of a Demat Account?",
              options: [
                "To execute buy and sell orders",
                "To hold your investments securely in electronic format",
                "To provide market research tools",
                "To calculate your portfolio value"
              ],
              correctAnswer: 1,
              explanation: "Correct! A Demat Account is designed to hold your investments securely in electronic format, replacing the need for physical share certificates."
            },
            {
              id: "trading-purpose",
              question: "What is the primary purpose of a Trading Account?",
              options: [
                "To store your securities electronically",
                "To execute buy and sell orders on the stock exchange",
                "To provide investment advice",
                "To calculate dividends"
              ],
              correctAnswer: 1,
              explanation: "Great! A Trading Account is used to execute buy and sell orders on the stock exchange, acting as your interface with the market."
            },
            {
              id: "account-relationship",
              question: "How do Demat and Trading accounts work together?",
              options: [
                "They are completely independent of each other",
                "Trading account buys/sells, Demat account holds the securities",
                "Demat account trades, Trading account stores securities",
                "They serve the same purpose and are interchangeable"
              ],
              correctAnswer: 1,
              explanation: "Excellent! The Trading account is used to buy and sell securities, while the Demat account holds the purchased securities securely in electronic format."
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
      id: "how-they-work",
      title: "How They Work Together",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              🔄 The Complete Trading Process
            </h3>
            <p className="text-blue-700">
              Understanding how your Demat and Trading accounts work together is crucial for successful stock market participation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">Buying Process (Step by Step)</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Place Buy Order</h5>
                  <p className="text-gray-700 text-sm">You place a &apos;buy&apos; order through your Trading Account</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Fund Deduction</h5>
                  <p className="text-gray-700 text-sm">The funds are taken from your linked bank account</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Purchase Execution</h5>
                  <p className="text-gray-700 text-sm">The shares are purchased on the stock exchange</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Securities Deposit</h5>
                  <p className="text-gray-700 text-sm">The purchased shares are deposited into your Demat Account for safekeeping</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-3">Selling Process</h4>
            <p className="text-green-700 leading-relaxed mb-4">
              The selling process is the reverse: you sell from your Trading Account, and the shares are taken out of your Demat Account.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-medium text-gray-800 mb-2">Sell Order:</h5>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Place sell order via Trading Account</li>
                  <li>• Specify quantity and price</li>
                  <li>• Order executed on exchange</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-medium text-gray-800 mb-2">Settlement:</h5>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Shares removed from Demat Account</li>
                  <li>• Funds credited to bank account</li>
                  <li>• Transaction completed</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Key Benefits of This System</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Efficiency:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Quick settlement (T+2)</li>
                  <li>• Automated processes</li>
                  <li>• Reduced paperwork</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Security:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• No physical certificates</li>
                  <li>• Electronic verification</li>
                  <li>• Fraud prevention</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Transparency:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Real-time updates</li>
                  <li>• Clear audit trail</li>
                  <li>• Easy tracking</li>
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
      title: "Account Functions Exercise",
      content: (
        <InteractiveSelection
          title="Match each account type with its correct function"
          description="Select the correct function for each account type. This will help you understand the distinct roles of Demat and Trading accounts."
          options={[
            {
              id: "demat-function",
              text: "Demat Account: Holds your securities electronically and provides secure storage",
              isCorrect: true,
              explanation: "Correct! The Demat Account is designed to hold your securities electronically and provide secure storage, replacing physical share certificates."
            },
            {
              id: "trading-function",
              text: "Trading Account: Executes buy and sell orders on the stock exchange",
              isCorrect: true,
              explanation: "Correct! The Trading Account is your interface with the stock market, used to execute buy and sell orders for various securities."
            },
            {
              id: "working-together",
              text: "Both accounts work together: Trading account trades, Demat account stores",
              isCorrect: true,
              explanation: "Correct! The accounts work together seamlessly - the Trading account handles transactions while the Demat account stores the purchased securities."
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
          description="Answer these questions to ensure you&apos;ve grasped the key concepts about Demat and Trading accounts."
          questions={[
            {
              id: "account-differences",
              question: "What are the key differences between a Demat Account and a Trading Account?",
              hint: "Think about their purposes and functions in the trading process.",
              correctAnswer: "demat account holds securities electronic storage trading account executes orders buy sell stock exchange",
              explanation: "Great! A Demat Account holds your securities electronically and provides secure storage, while a Trading Account executes buy and sell orders on the stock exchange. They serve different but complementary purposes."
            },
            {
              id: "trading-process",
              question: "Explain how the buying process works with both accounts.",
              hint: "Consider the step-by-step process from placing an order to receiving securities.",
              correctAnswer: "place buy order trading account funds deducted bank account shares purchased exchange securities deposited demat account",
              explanation: "Perfect! The process involves: 1) Placing a buy order through the Trading Account, 2) Funds deducted from linked bank account, 3) Shares purchased on the exchange, 4) Securities deposited into Demat Account for safekeeping."
            },
            {
              id: "account-necessity",
              question: "Why do you need both accounts to start investing in stocks?",
              hint: "Think about the distinct functions each account serves.",
              correctAnswer: "trading account market access order execution demat account secure storage electronic holding regulatory requirement",
              explanation: "Excellent! You need both accounts because: the Trading Account provides market access and order execution capabilities, while the Demat Account provides secure electronic storage for your securities. This separation is also a regulatory requirement for safe and transparent trading."
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
              Congratulations! You&apos;ve completed the &quot;Opening a Demat and Trading Account&quot; lesson. 
              Here&apos;s a summary of the key concepts you now understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Account Types</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Demat Account: Electronic storage for securities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Trading Account: Market access and order execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Both accounts are essential for stock trading</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>They work together seamlessly</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Trading Process</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Buy: Trading Account → Exchange → Demat Account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Sell: Demat Account → Exchange → Bank Account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Automated settlement process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Secure and transparent</span>
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
                <p className="text-yellow-700 text-sm">Understand account opening process</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Research</h5>
                <p className="text-yellow-700 text-sm">Compare different brokers</p>
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
        description="Congratulations on completing the &apos;Opening a Demat and Trading Account&apos; lesson"
        lessonSlug="opening-a-demat-and-trading-account"
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
            You&apos;ve successfully learned about Demat and Trading accounts and demonstrated 
            your understanding through various interactive exercises. You&apos;re now 
            ready to learn about the KYC process!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/the-kyc-process"
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
      title="Opening a Demat and Trading Account"
      description="Your gateway to the stock market. This lesson breaks down the two essential accounts you need to start investing and trading in India."
      lessonSlug="opening-a-demat-and-trading-account"
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
