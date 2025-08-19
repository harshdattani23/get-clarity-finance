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
import { Trophy, Building, TrendingUp, Shield, Target, Zap, CheckCircle, ArrowRight, BarChart3, DollarSign, BookOpen, UserCheck, AlertTriangle, MapPin, Calendar, ChartBar, Handshake, Rocket, ShieldCheck, Clock, TrendingDown, PieChart, Layers, Target as TargetIcon } from 'lucide-react';

export default function HowStocksAreTraded() {
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
      title: "Understanding Stock Trading",
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
              In this lesson, you&apos;ll discover how stocks are traded, from IPOs to daily trading, understand the key players involved, and learn about the complete trading process.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              The Mechanics of Stock Trading
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding how stocks are traded is essential for any investor. This lesson will take you through the entire process, from when a company first goes public to how millions of shares change hands every day.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You&apos;ll learn about primary vs secondary markets, the trading process, key players, and best practices for successful trading.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Concepts</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Primary vs Secondary markets</li>
                <li>• Trading process and order types</li>
                <li>• Key players in stock trading</li>
                <li>• Settlement and risk management</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Practical Skills</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Understand order execution</li>
                <li>• Learn about trading costs</li>
                <li>• Master risk management</li>
                <li>• Follow best practices</li>
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
              title="How Stocks Are Traded - Audio Summary"
              description="Listen to a comprehensive audio summary of how stocks are traded, available in multiple languages."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/how-stocks-are-traded-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/how-stocks-are-traded-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/how-stocks-are-traded-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/how-stocks-are-traded-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/how-stocks-are-traded-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/how-stocks-are-traded-ta.m4a"
              hindiTranscript="स्टॉक कैसे ट्रेड किए जाते हैं - प्राथमिक बनाम द्वितीयक बाजार, ट्रेडिंग प्रक्रिया, और मुख्य खिलाड़ियों की समझ।"
              englishTranscript="How Stocks Are Traded - Understanding primary vs secondary markets, trading process, and key players involved."
              bengaliTranscript="স্টক কীভাবে ট্রেড করা হয় - প্রাথমিক বনাম মাধ্যমিক বাজার, ট্রেডিং প্রক্রিয়া, এবং মূল খেলোয়াড়দের বোঝা।"
              marathiTranscript="स्टॉक्स कसे ट्रेड केले जातात - प्राथमिक बनाम दुय्यम बाजार, ट्रेडिंग प्रक्रिया, आणि मुख्य खेळाडूंची समज।"
              gujaratiTranscript="સ્ટોક્સ કેવી રીતે ટ્રેડ કરવામાં આવે છે - પ્રાથમિક બનામ દ્વિતીય બજાર, ટ્રેડિંગ પ્રક્રિયા, અને મુખ્ય ખેલાડીઓની સમજણ।"
              tamilTranscript="பங்குகள் எவ்வாறு வர்த்தகம் செய்யப்படுகின்றன - முதன்மை மற்றும் இரண்டாம் நிலை சந்தைகள், வர்த்தக செயல்முறை, மற்றும் முக்கிய வீரர்களைப் புரிந்துகொள்வது."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand that stock trading involves different markets and processes",
              "I recognize that there are key players involved in every transaction"
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
      id: "primary-secondary-markets",
      title: "Primary vs Secondary Markets",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🏢 Two Distinct Markets for Stock Trading
            </h3>
            <p className="text-green-700 leading-relaxed">
              Stock trading happens in two distinct markets, each serving a different purpose in the financial ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Primary Market</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                This is where stocks are born. When a company holds an Initial Public Offering (IPO), it sells its shares directly to investors for the first time.
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Key Features:</h5>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Company raises capital directly</li>
                  <li>• Shares are sold for the first time</li>
                  <li>• Money goes to the company</li>
                  <li>• Regulated by SEBI and exchanges</li>
                  <li>• Limited to IPO participants</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Secondary Market</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                This is what we typically call &apos;the stock market.&apos; It&apos;s where investors trade stocks among themselves without the company&apos;s involvement.
              </p>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Key Features:</h5>
                <ul className="text-green-700 text-xs space-y-1">
                  <li>• Investors trade with each other</li>
                  <li>• Company doesn&apos;t receive money</li>
                  <li>• Price determined by market forces</li>
                  <li>• High liquidity and volume</li>
                  <li>Available to all investors</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Key Differences</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Primary Market:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• New stock issuance</li>
                  <li>• Company receives funds</li>
                  <li>• One-time event (IPO)</li>
                  <li>• Fixed price initially</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Secondary Market:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Existing stock trading</li>
                  <li>• Company doesn&apos;t receive funds</li>
                  <li>• Continuous trading</li>
                  <li>• Market-determined prices</li>
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
              id: "primary-market",
              question: "Where do companies first sell their shares to the public?",
              options: [
                "Secondary market",
                "Primary market",
                "Both markets",
                "Neither market"
              ],
              correctAnswer: 1,
              explanation: "Correct! The primary market is where companies hold IPOs and sell shares for the first time, with the money going directly to the company."
            },
            {
              id: "secondary-market",
              question: "Where do most daily stock trading activities occur?",
              options: [
                "Primary market",
                "Secondary market",
                "Both markets equally",
                "Depends on the stock"
              ],
              correctAnswer: 1,
              explanation: "Great! The secondary market is where most daily trading happens - investors trading existing shares with each other without company involvement."
            },
            {
              id: "company-funds",
              question: "Which market provides funds directly to the company?",
              options: [
                "Secondary market",
                "Primary market",
                "Both markets",
                "Neither market"
              ],
              correctAnswer: 1,
              explanation: "Excellent! Only the primary market provides funds directly to the company through IPOs. The secondary market is just investors trading among themselves."
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
      id: "trading-process",
      title: "The Complete Trading Process",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              📊 Step-by-Step Trading Process
            </h3>
            <p className="text-blue-700">
              Understanding the step-by-step process helps demystify how your buy and sell orders are executed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Step 1: Place Your Order</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                You place a buy or sell order through your broker&apos;s platform.
              </p>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">What you do:</h5>
                <ul className="text-green-700 text-xs space-y-1">
                  <li>• Choose stock and quantity</li>
                  <li>• Set price (market or limit)</li>
                  <li>• Select order type</li>
                  <li>• Review and confirm</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Step 2: Order Routing</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Your broker routes the order to the appropriate exchange.
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">What happens:</h5>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Broker validates order</li>
                  <li>• Routes to NSE or BSE</li>
                  <li>• Checks for best prices</li>
                  <li>• Matches with counterparty</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Step 3: Order Matching</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                The exchange matches your order with a willing seller/buyer.
              </p>
              <div className="bg-purple-50 p-3 rounded border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">Matching process:</h5>
                <ul className="text-purple-700 text-xs space-y-1">
                  <li>• Price-time priority</li>
                  <li>• Best bid/ask matching</li>
                  <li>• Partial fills possible</li>
                  <li>• Real-time execution</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Step 4: Trade Execution</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Your order is executed and shares are transferred.
              </p>
              <div className="bg-orange-50 p-3 rounded border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-2">Final steps:</h5>
                <ul className="text-orange-700 text-xs space-y-1">
                  <li>• Trade confirmation</li>
                  <li>• Settlement process</li>
                  <li>• Demat account update</li>
                  <li>• Brokerage charges</li>
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
      id: "key-players",
      title: "Key Players in Stock Trading",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              👥 Who Makes Stock Trading Possible?
            </h3>
            <p className="text-green-700">
              Several entities work together to make stock trading possible, each with specific roles and responsibilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Stock Exchanges</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                These are the organized marketplaces where trading occurs. In India, the two main exchanges are the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE).
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Responsibilities:</h5>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Provide trading platform</li>
                  <li>• Ensure market integrity</li>
                  <li>• Set trading rules</li>
                  <li>• Maintain order books</li>
                  <li>• Handle settlements</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Stock Brokers</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Retail investors can&apos;t trade directly on an exchange. They need a licensed intermediary called a stockbroker to execute trades on their behalf.
              </p>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Services:</h5>
                <ul className="text-green-700 text-xs space-y-1">
                  <li>• Order execution</li>
                  <li>• Market research</li>
                  <li>• Trading platform</li>
                  <li>• Customer support</li>
                  <li>• Compliance assistance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Other Important Players</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Depositories:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• NSDL and CDSL</li>
                  <li>• Hold shares electronically</li>
                  <li>• Process corporate actions</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Clearing Corporations:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• NSE Clearing Ltd</li>
                  <li>• BSE Clearing Ltd</li>
                  <li>• Ensure settlement</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Regulators:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• SEBI oversight</li>
                  <li>• RBI coordination</li>
                  <li>• Market supervision</li>
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
      title: "Trading Process Matching",
      content: (
        <InteractiveSelection
          title="Match each trading step with its description"
          description="Select the correct trading step for each description. This will help you understand the complete trading process."
          options={[
            {
              id: "order-placement",
              text: "You choose stock, quantity, and price through your broker",
              isCorrect: true,
              explanation: "Correct! This is the first step where you place your order through the broker&apos;s platform."
            },
            {
              id: "order-routing",
              text: "Your broker sends the order to the appropriate exchange",
              isCorrect: true,
              explanation: "Correct! This is the routing step where your broker validates and sends the order to NSE or BSE."
            },
            {
              id: "order-matching",
              text: "The exchange finds a willing buyer or seller for your order",
              isCorrect: true,
              explanation: "Correct! This is the matching step where the exchange pairs your order with a counterparty."
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
          description="Answer these questions to ensure you&apos;ve grasped the key concepts about how stocks are traded."
          questions={[
            {
              id: "market-differences",
              question: "Explain the key differences between primary and secondary markets.",
              hint: "Think about who receives money, when trading occurs, and who can participate.",
              correctAnswer: "primary market ipo company money first time secondary market investors trade existing shares",
              explanation: "Great! Primary market is for IPOs where companies sell shares for the first time and receive money directly. Secondary market is where investors trade existing shares with each other without company involvement."
            },
            {
              id: "trading-steps",
              question: "What are the four main steps in the stock trading process?",
              hint: "Consider the sequence from placing an order to final execution.",
              correctAnswer: "place order order routing order matching trade execution",
              explanation: "Perfect! The four steps are: 1) Place your order through broker, 2) Order routing to exchange, 3) Order matching with counterparty, 4) Trade execution and settlement."
            },
            {
              id: "key-players",
              question: "Why are stock brokers necessary for retail investors?",
              hint: "Think about direct access to exchanges and regulatory requirements.",
              correctAnswer: "retail investors cannot trade directly exchanges need licensed intermediary regulatory compliance",
              explanation: "Excellent! Retail investors cannot trade directly on exchanges due to regulatory requirements and technical limitations. Brokers provide the necessary infrastructure, compliance, and access to execute trades on behalf of investors."
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
              Congratulations! You&apos;ve completed the &quot;How Stocks Are Traded&quot; lesson. 
              Here&apos;s a summary of the key concepts you now understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Market Understanding</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Primary market for IPOs and new stock issuance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Secondary market for daily trading of existing stocks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Complete trading process from order to settlement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Key players and their roles in the ecosystem</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Practical Knowledge</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>How orders are placed and executed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Role of brokers and exchanges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Understanding of trading infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Importance of proper order management</span>
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
                <p className="text-yellow-700 text-sm">Apply concepts to real trading</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Research</h5>
                <p className="text-yellow-700 text-sm">Study different order types</p>
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
        description="Congratulations on completing the &apos;How Stocks Are Traded&apos; lesson"
        lessonSlug="how-stocks-are-traded"
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
            You&apos;ve successfully learned about how stocks are traded and demonstrated 
            your understanding through various interactive exercises. You&apos;re now 
            ready to learn about reading stock quotes!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/reading-a-stock-quote"
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
      title="How Stocks Are Traded"
      description="Go behind the scenes to understand the difference between the primary and secondary markets, and the key players involved in every transaction."
      lessonSlug="how-stocks-are-traded"
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
