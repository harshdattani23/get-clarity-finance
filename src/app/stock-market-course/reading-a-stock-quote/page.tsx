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
import { Trophy } from 'lucide-react';

export default function ReadingAStockQuote() {
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
      title: "Understanding Stock Quotes",
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
              In this lesson, you&apos;ll learn to decode the numbers and symbols in a stock quote to quickly understand a stock&apos;s performance and valuation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What is a Stock Quote?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A stock quote is a snapshot of a stock&apos;s essential financial information. It might look like a jumble of numbers at first, but it&apos;s easy to understand once you know what to look for.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Think of it as a &quot;vital signs&quot; monitor for a company&apos;s stock - showing you the current price, how it&apos;s performing today, and key metrics that help you make informed decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Components</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Current price and change</li>
                <li>• Trading volume and market cap</li>
                <li>• High/low prices for the day</li>
                <li>• P/E ratio and dividend yield</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Why It Matters</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Quick performance assessment</li>
                <li>• Comparison with other stocks</li>
                <li>• Entry/exit timing decisions</li>
                <li>• Risk and reward evaluation</li>
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
              title="Reading a Stock Quote - Audio Summary"
              description="Listen to a comprehensive audio summary of how to read stock quotes, available in multiple languages."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/reading-a-stock-quote-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/reading-a-stock-quote-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/reading-a-stock-quote-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/reading-a-stock-quote-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/reading-a-stock-quote-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/reading-a-stock-quote-ta.m4a"
              hindiTranscript="स्टॉक कोट कैसे पढ़ें - मूल्य, परिवर्तन, मात्रा और अन्य महत्वपूर्ण मेट्रिक्स को समझना।"
              englishTranscript="Reading a Stock Quote - Understanding price, change, volume, and other important metrics."
              bengaliTranscript="স্টক কোট কীভাবে পড়বেন - মূল্য, পরিবর্তন, পরিমাণ এবং অন্যান্য গুরুত্বপূর্ণ মেট্রিক্স বোঝা।"
              marathiTranscript="स्टॉक कोट कसे वाचावे - किंमत, बदल, खंड आणि इतर महत्त्वाचे मेट्रिक्स समजून घेणे।"
              gujaratiTranscript="સ્ટોક કોટ કેવી રીતે વાંચવું - કિંમત, ફેરફાર, વોલ્યુમ અને અન્ય મહત્વપૂર્ણ મેટ્રિક્સ સમજવા।"
              tamilTranscript="பங்கு விலைப்படுத்தலை எவ்வாறு படிப்பது - விலை, மாற்றம், அளவு மற்றும் பிற முக்கியமான அளவீடுகளைப் புரிந்துகொள்வது."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand that a stock quote shows essential financial information",
              "I recognize that stock quotes help in making investment decisions"
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
      id: "basic-components",
      title: "Basic Stock Quote Components",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              📊 Essential Elements of a Stock Quote
            </h3>
            <p className="text-green-700 leading-relaxed">
              Every stock quote contains several key pieces of information that help you understand the stock&apos;s current status and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Current Price</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                The most important number - the current market price for one share of the stock.
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Example:</h5>
                <p className="text-blue-700 text-sm">₹1,250.50</p>
                <p className="text-blue-600 text-xs mt-1">This means one share costs ₹1,250.50</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Price Change</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Shows how much the stock price has moved since the previous day&apos;s closing price.
              </p>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Example:</h5>
                <p className="text-green-700 text-sm">+25.10 (2.05%)</p>
                <p className="text-green-600 text-xs mt-1">Price increased by ₹25.10 or 2.05%</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Trading Volume</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                The total number of shares traded during the current trading day.
              </p>
              <div className="bg-purple-50 p-3 rounded border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">Example:</h5>
                <p className="text-purple-700 text-sm">2.5M shares</p>
                <p className="text-purple-600 text-xs mt-1">2.5 million shares traded today</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Market Cap</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                The total value of all the company&apos;s shares in the market.
              </p>
              <div className="bg-orange-50 p-3 rounded border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-2">Example:</h5>
                <p className="text-orange-700 text-sm">₹15,000 Cr</p>
                <p className="text-orange-600 text-xs mt-1">Total company value is ₹15,000 crore</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Why These Matter</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Price & Change:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Shows current value and momentum</li>
                  <li>• Helps assess entry/exit timing</li>
                  <li>• Indicates market sentiment</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Volume & Market Cap:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Volume shows trading interest</li>
                  <li>• Market cap indicates company size</li>
                  <li>• Helps with risk assessment</li>
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
      title: "Basic Components Quiz",
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: "current-price",
              question: "What does the current price in a stock quote represent?",
              options: [
                "The price from yesterday",
                "The current market price for one share",
                "The average price over the week",
                "The highest price ever reached"
              ],
              correctAnswer: 1,
              explanation: "Correct! The current price shows the current market price for one share of the stock at this moment."
            },
            {
              id: "price-change",
              question: "What does a positive price change (+₹15.20) indicate?",
              options: [
                "The stock price decreased",
                "The stock price increased",
                "The stock price stayed the same",
                "The stock price is unknown"
              ],
              correctAnswer: 1,
              explanation: "Great! A positive price change means the stock price increased by ₹15.20 since the previous day&apos;s close."
            },
            {
              id: "trading-volume",
              question: "What does high trading volume typically indicate?",
              options: [
                "Low investor interest",
                "High investor interest",
                "No change in interest",
                "Volume doesn&apos;t matter"
              ],
              correctAnswer: 1,
              explanation: "Excellent! High trading volume indicates high investor interest and activity in that particular stock."
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
      id: "advanced-metrics",
      title: "Advanced Stock Quote Metrics",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              🔍 Beyond the Basics - Advanced Metrics
            </h3>
            <p className="text-blue-700">
              Stock quotes also contain more sophisticated metrics that help you evaluate a stock&apos;s valuation and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">P/E Ratio (Price-to-Earnings)</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Compares the stock price to the company&apos;s earnings per share. Helps assess if a stock is overvalued or undervalued.
              </p>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Example:</h5>
                <p className="text-green-700 text-sm">P/E = 15.2</p>
                <p className="text-green-600 text-xs mt-1">Stock price is 15.2 times annual earnings</p>
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded text-blue-800 text-xs">
                <strong>Interpretation:</strong> Lower P/E may indicate undervalued stock, higher P/E may indicate growth expectations
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Dividend Yield</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Shows the annual dividend payment as a percentage of the current stock price.
              </p>
              <div className="bg-purple-50 p-3 rounded border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">Example:</h5>
                <p className="text-purple-700 text-sm">Dividend Yield = 2.5%</p>
                <p className="text-purple-600 text-xs mt-1">Annual dividend is 2.5% of current price</p>
              </div>
              <div className="mt-3 p-2 bg-orange-100 rounded text-orange-800 text-xs">
                <strong>Interpretation:</strong> Higher yield means more income, but may indicate higher risk
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">52-Week High/Low</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Shows the highest and lowest prices the stock has reached in the past 52 weeks.
              </p>
              <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                <h5 className="font-medium text-yellow-800 mb-2">Example:</h5>
                <p className="text-yellow-700 text-sm">High: ₹1,500 | Low: ₹800</p>
                <p className="text-yellow-600 text-xs mt-1">Range shows volatility and current position</p>
              </div>
              <div className="mt-3 p-2 bg-red-100 rounded text-red-800 text-xs">
                <strong>Interpretation:</strong> Shows price range and helps assess current position within historical context
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Beta</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Measures how volatile a stock is compared to the overall market (usually Nifty 50 or Sensex).
              </p>
              <div className="bg-indigo-50 p-3 rounded border border-indigo-200">
                <h5 className="font-medium text-indigo-800 mb-2">Example:</h5>
                <p className="text-indigo-700 text-sm">Beta = 1.2</p>
                <p className="text-indigo-600 text-xs mt-1">20% more volatile than the market</p>
              </div>
              <div className="mt-3 p-2 bg-gray-100 rounded text-gray-800 text-xs">
                <strong>Interpretation:</strong> Beta &gt; 1 = more volatile, Beta &lt; 1 = less volatile than market
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
      title: "Metric Matching Exercise",
      content: (
        <InteractiveSelection
          title="Match each metric with its correct interpretation"
          description="Select the correct interpretation for each stock quote metric. This will help you understand how to use these numbers."
          options={[
            {
              id: "pe-ratio",
              text: "P/E Ratio of 25 means the stock price is 25 times annual earnings",
              isCorrect: true,
              explanation: "Correct! A P/E ratio of 25 means investors are paying ₹25 for every ₹1 of annual earnings, indicating growth expectations."
            },
            {
              id: "dividend-yield",
              text: "Dividend Yield of 3% means ₹3 dividend for every ₹100 invested",
              isCorrect: true,
              explanation: "Correct! A 3% dividend yield means you receive ₹3 in annual dividends for every ₹100 invested in the stock."
            },
            {
              id: "beta",
              text: "Beta of 0.8 means the stock is 20% less volatile than the market",
              isCorrect: true,
              explanation: "Correct! A beta of 0.8 means the stock moves 20% less than the overall market, making it less volatile."
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
      id: "practical-examples",
      title: "Real-World Examples",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              💡 How to Read Real Stock Quotes
            </h3>
            <p className="text-green-700">
              Let&apos;s look at some real examples to understand how to interpret stock quotes in practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Example 1: Large-Cap Stock</h4>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Current Price:</span>
                    <span className="text-blue-700">₹1,250.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Change:</span>
                    <span className="text-green-600">+25.10 (+2.05%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Volume:</span>
                    <span className="text-blue-700">5.2M shares</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Market Cap:</span>
                    <span className="text-blue-700">₹15,000 Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">P/E Ratio:</span>
                    <span className="text-blue-700">18.5</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-2 bg-green-100 rounded text-green-800 text-xs">
                <strong>Analysis:</strong> Stable large-cap stock with moderate growth, good volume, reasonable valuation
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Example 2: Growth Stock</h4>
              <div className="bg-purple-50 p-4 rounded border border-purple-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Current Price:</span>
                    <span className="text-purple-700">₹450.75</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Change:</span>
                    <span className="text-green-600">+45.25 (+11.15%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Volume:</span>
                    <span className="text-purple-700">12.8M shares</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Market Cap:</span>
                    <span className="text-purple-700">₹2,500 Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">P/E Ratio:</span>
                    <span className="text-purple-700">45.2</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-2 bg-orange-100 rounded text-orange-800 text-xs">
                <strong>Analysis:</strong> High-growth stock with high P/E, significant price movement, high trading interest
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Key Insights from These Examples</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Price Movement:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Large-cap: Stable, moderate changes</li>
                  <li>• Growth stock: Volatile, large changes</li>
                  <li>• Volume often follows price movement</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Valuation:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Lower P/E = more conservative</li>
                  <li>• Higher P/E = growth expectations</li>
                  <li>• Context matters for interpretation</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Risk Profile:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Large-cap: Lower risk, stable returns</li>
                  <li>• Growth stock: Higher risk, higher potential</li>
                  <li>• Volume indicates market interest</li>
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
          description="Answer these questions to ensure you&apos;ve grasped the key concepts about reading stock quotes."
          questions={[
            {
              id: "basic-components",
              question: "What are the four basic components of a stock quote and why are they important?",
              hint: "Think about price, change, volume, and market cap - what each tells you about the stock.",
              correctAnswer: "current price price change trading volume market cap performance valuation risk assessment",
              explanation: "Great! The four basic components are: 1) Current price - shows what you pay for one share, 2) Price change - indicates momentum and performance, 3) Trading volume - shows investor interest and liquidity, 4) Market cap - indicates company size and risk level. Together they give you a complete picture of the stock&apos;s current status."
            },
            {
              id: "advanced-metrics",
              question: "How do P/E ratio and dividend yield help in stock evaluation?",
              hint: "Consider what these metrics tell you about valuation and income potential.",
              correctAnswer: "pe ratio price earnings valuation dividend yield income return investment strategy",
              explanation: "Perfect! P/E ratio helps assess valuation by comparing price to earnings - lower P/E may indicate undervalued stock, higher P/E may show growth expectations. Dividend yield shows income potential - higher yield means more dividend income but may indicate higher risk. Both help determine if a stock fits your investment strategy."
            },
            {
              id: "practical-application",
              question: "How would you use stock quote information to make an investment decision?",
              hint: "Think about combining multiple metrics and considering your investment goals.",
              correctAnswer: "multiple metrics price trends volume analysis risk assessment investment goals time horizon",
              explanation: "Excellent! You would combine multiple metrics: look at price trends and changes for momentum, analyze volume for interest levels, assess P/E ratio for valuation, consider market cap for company size, and evaluate dividend yield for income. Then match this analysis with your investment goals, risk tolerance, and time horizon to make an informed decision."
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
              Congratulations! You&apos;ve completed the &quot;Reading a Stock Quote&quot; lesson. 
              Here&apos;s a summary of the key concepts you now understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Basic Components</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Current price and price change</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Trading volume and market capitalization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>High/low prices and 52-week range</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>P/E ratio and dividend yield</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Practical Skills</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Interpret price movements and trends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Assess stock valuation using P/E ratios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Evaluate risk using volume and market cap</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Make informed investment decisions</span>
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
                <h5 className="font-medium text-yellow-800 mb-1">Practice</h5>
                <p className="text-yellow-700 text-sm">Read real stock quotes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Learn More</h5>
                <p className="text-yellow-700 text-sm">Continue with next lessons</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Apply</h5>
                <p className="text-yellow-700 text-sm">Use in investment decisions</p>
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
        description="Congratulations on completing the &apos;Reading a Stock Quote&apos; lesson"
        lessonSlug="reading-a-stock-quote"
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
            You&apos;ve successfully learned how to read stock quotes and demonstrated 
            your understanding through various interactive exercises. You&apos;re now 
            ready to continue your stock market education journey!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Course Home
            </a>
          </div>
        </div>
      </LessonLayout>
    );
  }

  return (
    <LessonLayout
      title="Reading a Stock Quote"
      description="Learn to decode the numbers and symbols in a stock quote to quickly understand a stock&apos;s performance and valuation."
      lessonSlug="reading-a-stock-quote"
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
