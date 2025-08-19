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

export default function DifferentTypesOfStocks() {
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
      title: "Understanding Stock Classification",
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
              In this lesson, you&apos;ll discover the different ways stocks are classified and categorized. Learn about common vs preferred stocks, market capitalization categories, and how to build a diversified portfolio based on your risk tolerance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Why Stock Classification Matters
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Just like there are different types of cars (sedans, SUVs, sports cars), there are different types of stocks, each with unique characteristics, risks, and potential rewards. Understanding these differences is crucial for building a well-balanced portfolio.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In this lesson, we&apos;ll explore the major ways stocks are classified and how each type fits into different investment strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Classifications</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Common vs Preferred stocks</li>
                <li>• Market capitalization (Large/Mid/Small cap)</li>
                <li>• Investment style (Growth vs Value)</li>
                <li>• Sector-based classification</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Investment Benefits</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Build diversified portfolios</li>
                <li>• Match investments to risk tolerance</li>
                <li>• Understand different risk profiles</li>
                <li>• Make informed investment decisions</li>
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
              title="Different Types of Stocks - Audio Summary"
              description="Listen to a comprehensive audio summary of different types of stocks, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/different-types-of-stocks-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/different-types-of-stocks-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/different-types-of-stocks-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/different-types-of-stocks-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/different-types-of-stocks-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/different-types-of-stocks-ta.m4a"
              hindiTranscript="स्टॉक के विभिन्न प्रकार - आम बनाम पसंदीदा स्टॉक, बाजार पूंजीकरण के आधार पर वर्गीकरण, और निवेश रणनीतियों के लिए महत्वपूर्ण अंतर्दृष्टि।"
              englishTranscript="Different Types of Stocks - Common vs Preferred stocks, classification by market capitalization, and crucial insights for investment strategies."
              bengaliTranscript="স্টকের বিভিন্ন প্রকার - সাধারণ বনাম পছন্দের স্টক, বাজার মূলধনের ভিত্তিতে শ্রেণীবিন্যাস, এবং বিনিয়োগ কৌশলের জন্য গুরুত্বপূর্ণ অন্তর্দৃষ্টি।"
              marathiTranscript="स्टॉक्सचे विविध प्रकार - सामान्य बनाम पसंती स्टॉक्स, बाजार भांडवलानुसार वर्गीकरण, आणि गुंतवणूक धोरणांसाठी महत्त्वाचे अंतर्दृष्टी।"
              gujaratiTranscript="સ્ટોક્સના વિવિધ પ્રકારો - સામાન્ય બનામ પસંદગીના સ્ટોક્સ, બજાર મૂડીકરણના આધારે વર્ગીકરણ, અને રોકાણ વ્યૂહરચના માટે મહત્વપૂર્ણ અંતર્દૃષ્ટિ।"
              tamilTranscript="பங்குகளின் பல்வேறு வகைகள் - பொதுவான மற்றும் விருப்ப பங்குகள், சந்தை மூலதனத்தின் அடிப்படையில் வகைப்பாடு, மற்றும் முதலீட்டு உத்திகளுக்கான முக்கியமான நுண்ணறிவு."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand that stocks can be classified in different ways",
              "I recognize that different stock types have different risk profiles"
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
      id: "common-vs-preferred",
      title: "Common vs Preferred Stocks",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🏢 Two Main Types of Stock Ownership
            </h3>
            <p className="text-green-700 leading-relaxed">
              Understanding the difference between common and preferred stocks is fundamental to stock market investing. Each type offers different rights, benefits, and risks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Common Stock</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                This is what most people mean when they talk about stocks. It grants voting rights, giving shareholders a say in company decisions.
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Key Features:</h5>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Voting rights on company decisions</li>
                  <li>• May receive dividends (not guaranteed)</li>
                  <li>• Unlimited growth potential</li>
                  <li>• Highest risk - can lose entire investment</li>
                  <li>• Last priority for company assets</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Preferred Stock</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                These stocks generally do not have voting rights but typically pay a fixed dividend that is paid out before common stock dividends.
              </p>
              <div className="bg-purple-50 p-3 rounded border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">Key Features:</h5>
                <ul className="text-purple-700 text-xs space-y-1">
                  <li>• Fixed dividend rate</li>
                  <li>• Higher claim on company assets</li>
                  <li>• No voting rights</li>
                  <li>• Limited growth potential</li>
                  <li>• Company can buy back shares</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Real-World Examples</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Common Stock Examples:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Reliance Industries - Most widely held in India</li>
                  <li>• TCS - Regular dividend payments</li>
                  <li>• HDFC Bank - Voting rights and growth potential</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Preferred Stock Examples:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Tata Motors - Has issued preferred shares</li>
                  <li>• Some PSUs - Government companies</li>
                  <li>• Note: Less common in India vs US</li>
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
      title: "Stock Types Quiz",
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: "common-stock",
              question: "Which type of stock gives shareholders voting rights?",
              options: [
                "Preferred stock",
                "Common stock",
                "Both types",
                "Neither type"
              ],
              correctAnswer: 1,
              explanation: "Correct! Common stock grants voting rights, allowing shareholders to participate in company decisions at shareholder meetings."
            },
            {
              id: "preferred-dividend",
              question: "Which type of stock typically pays a fixed dividend?",
              options: [
                "Common stock",
                "Preferred stock",
                "Both types",
                "Neither type"
              ],
              correctAnswer: 1,
              explanation: "Great! Preferred stock typically pays a fixed dividend rate, while common stock dividends are not guaranteed and can vary."
            },
            {
              id: "risk-profile",
              question: "Which type of stock has the highest risk and growth potential?",
              options: [
                "Preferred stock",
                "Common stock",
                "Both have equal risk",
                "Risk depends on company size"
              ],
              correctAnswer: 1,
              explanation: "Excellent! Common stock has the highest risk (you can lose your entire investment) but also offers unlimited growth potential."
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
      id: "market-cap-classification",
      title: "Market Capitalization Classification",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              📊 Understanding Market Capitalization
            </h3>
            <p className="text-blue-700">
              Market capitalization (or &apos;market cap&apos;) is the total value of a company&apos;s shares. It&apos;s calculated by multiplying the current share price by the total number of outstanding shares.
            </p>
            <div className="bg-white p-4 rounded border border-blue-200 mt-4">
              <p className="text-blue-800 font-medium">Formula: Market Cap = Share Price × Number of Shares</p>
              <p className="text-blue-700 text-sm mt-2">Example: If HDFC Bank has 5.5 billion shares at ₹1,500 each, Market Cap = ₹1,500 × 5.5 billion = ₹8.25 trillion</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Large-Cap Stocks</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Companies with market cap over ₹20,000 crore. These are the biggest, most established companies.
              </p>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Characteristics:</h5>
                <ul className="text-green-700 text-xs space-y-1">
                  <li>• Stable and less volatile</li>
                  <li>• Often pay regular dividends</li>
                  <li>• Steady but slower growth</li>
                  <li>• Lower risk</li>
                  <li>• High liquidity</li>
                </ul>
              </div>
              <div className="mt-3 p-2 bg-green-100 rounded text-green-800 text-xs">
                <strong>Examples:</strong> Reliance Industries, TCS, HDFC Bank, Infosys, ITC
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Mid-Cap Stocks</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Companies with market cap between ₹5,000-20,000 crore. Balance of growth potential and stability.
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Characteristics:</h5>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Higher growth potential</li>
                  <li>• Moderate risk and volatility</li>
                  <li>• Can become large caps over time</li>
                  <li>• May or may not pay dividends</li>
                  <li>Good liquidity</li>
                </ul>
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded text-blue-800 text-xs">
                <strong>Examples:</strong> Tata Elxsi, Mindtree, L&T Technology Services
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Small-Cap Stocks</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Companies with market cap under ₹5,000 crore. Emerging companies with high growth potential.
              </p>
              <div className="bg-orange-50 p-3 rounded border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-2">Characteristics:</h5>
                <ul className="text-orange-700 text-xs space-y-1">
                  <li>• Highest growth potential</li>
                  <li>• Highest risk and volatility</li>
                  <li>• Rarely pay dividends</li>
                  <li>• Lower trading volumes</li>
                  <li>Can become mid/large caps</li>
                </ul>
              </div>
              <div className="mt-3 p-2 bg-orange-100 rounded text-orange-800 text-xs">
                <strong>Examples:</strong> Emerging tech companies, startup companies, regional companies
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
      title: "Market Cap Matching Exercise",
      content: (
        <InteractiveSelection
          title="Match each market cap category with its characteristics"
          description="Select the correct market cap category for each description. This will help you understand the differences between large, mid, and small-cap stocks."
          options={[
            {
              id: "large-cap",
              text: "Stable companies with regular dividends and lower risk",
              isCorrect: true,
              explanation: "Correct! This describes large-cap stocks - the biggest, most established companies that are generally stable and often pay regular dividends."
            },
            {
              id: "mid-cap",
              text: "Companies with balanced growth potential and moderate risk",
              isCorrect: true,
              explanation: "Correct! This describes mid-cap stocks - companies that offer a balance between growth potential and stability."
            },
            {
              id: "small-cap",
              text: "Emerging companies with highest growth potential but highest risk",
              isCorrect: true,
              explanation: "Correct! This describes small-cap stocks - emerging companies with high growth potential but also the highest risk and volatility."
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
      id: "investment-strategies",
      title: "Building Investment Strategies",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🎯 Portfolio Allocation Strategies
            </h3>
            <p className="text-green-700">
              Understanding different stock types helps you build a diversified portfolio that matches your investment goals and risk tolerance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Conservative Strategy</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                For conservative investors who prioritize safety over growth.
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Allocation:</h5>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• 70% Large-cap stocks</li>
                  <li>• 20% Mid-cap stocks</li>
                  <li>• 10% Small-cap stocks</li>
                  <li>• Focus on value stocks</li>
                  <li>• Defensive sectors</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Moderate Strategy</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                For moderate investors who want balance between growth and stability.
              </p>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Allocation:</h5>
                <ul className="text-green-700 text-xs space-y-1">
                  <li>• 50% Large-cap stocks</li>
                  <li>• 30% Mid-cap stocks</li>
                  <li>• 20% Small-cap stocks</li>
                  <li>• Mix of growth and value</li>
                  <li>• Diversified sectors</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Aggressive Strategy</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                For aggressive investors who prioritize growth over safety.
              </p>
              <div className="bg-orange-50 p-3 rounded border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-2">Allocation:</h5>
                <ul className="text-orange-700 text-xs space-y-1">
                  <li>• 30% Large-cap stocks</li>
                  <li>• 40% Mid-cap stocks</li>
                  <li>• 30% Small-cap stocks</li>
                  <li>• Focus on growth stocks</li>
                  <li>• Emerging sectors</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Key Diversification Principles</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Sector Diversification:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Don&apos;t put more than 20-25% in any single sector</li>
                  <li>• Include defensive sectors (consumer, healthcare)</li>
                  <li>• Include cyclical sectors (banking, automobile)</li>
                  <li>• Consider emerging sectors (technology, renewable energy)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Risk Management:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Large-cap: Lower risk, lower potential returns</li>
                  <li>• Mid-cap: Moderate risk, moderate potential returns</li>
                  <li>• Small-cap: Higher risk, higher potential returns</li>
                  <li>• Consider liquidity before investing</li>
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
          description="Answer these questions to ensure you&apos;ve grasped the key concepts about different types of stocks."
          questions={[
            {
              id: "stock-types",
              question: "Explain the main differences between common and preferred stocks.",
              hint: "Think about voting rights, dividends, and risk profiles.",
              correctAnswer: "common stock voting rights dividends growth potential preferred stock fixed dividend priority assets",
              explanation: "Great! Common stock gives voting rights, may pay variable dividends, has unlimited growth potential, but highest risk. Preferred stock has no voting rights, pays fixed dividends, has higher claim on assets, but limited growth potential."
            },
            {
              id: "market-cap",
              question: "What are the three main market capitalization categories and their characteristics?",
              hint: "Consider the size, risk, and growth potential of each category.",
              correctAnswer: "large cap mid cap small cap market capitalization risk growth potential",
              explanation: "Perfect! Large-cap stocks (₹20,000+ crore) are stable with lower risk and steady growth. Mid-cap stocks (₹5,000-20,000 crore) offer balanced growth and moderate risk. Small-cap stocks (under ₹5,000 crore) have highest growth potential but also highest risk."
            },
            {
              id: "diversification",
              question: "Why is diversification important when investing in different types of stocks?",
              hint: "Think about risk management and capturing opportunities.",
              correctAnswer: "risk management portfolio balance different sectors market conditions growth opportunities",
              explanation: "Excellent! Diversification is crucial because it helps manage risk by spreading investments across different stock types, sectors, and market conditions. It reduces the impact of any single investment&apos;s poor performance and captures growth opportunities across different areas."
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
              Congratulations! You&apos;ve completed the &quot;Different Types of Stocks&quot; lesson. 
              Here&apos;s a summary of the key concepts you now understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Stock Classifications</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Common vs Preferred stocks with different rights and benefits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Market capitalization categories (Large/Mid/Small cap)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Investment style classification (Growth vs Value)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Sector-based classification for diversification</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Investment Strategy</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Portfolio allocation based on risk tolerance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Conservative, Moderate, and Aggressive strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Importance of diversification across sectors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Risk management through balanced allocation</span>
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
                <p className="text-yellow-700 text-sm">Apply concepts to real stocks</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Research</h5>
                <p className="text-yellow-700 text-sm">Study different stock types</p>
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
        description="Congratulations on completing the &apos;Different Types of Stocks&apos; lesson"
        lessonSlug="different-types-of-stocks"
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
            You&apos;ve successfully learned about different types of stocks and demonstrated 
            your understanding through various interactive exercises. You&apos;re now 
            ready to explore how stocks are traded!
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
      title="Different Types of Stocks"
      description="Learn about the various categories of stocks, their unique characteristics, risk profiles, and how to build diversified portfolios based on your investment goals."
      lessonSlug="different-types-of-stocks"
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
