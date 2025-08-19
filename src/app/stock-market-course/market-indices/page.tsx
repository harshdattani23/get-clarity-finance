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

export default function MarketIndices() {
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
      title: "Understanding Market Indices",
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
              In this lesson, you&apos;ll learn how market indices work as a barometer for the overall health of the stock market.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What are Market Indices?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A market index is a statistical measure of the performance of a specific group of stocks. It provides a snapshot of the market&apos;s health and direction.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In India, the two most famous indices are the BSE Sensex and NSE Nifty 50, which serve as benchmarks for the overall market performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Concepts</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• What market indices represent</li>
                <li>• BSE Sensex and NSE Nifty 50</li>
                <li>• How indices are calculated</li>
                <li>• Why indices matter to investors</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Why It Matters</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Market health indicator</li>
                <li>• Investment performance benchmark</li>
                <li>• Economic sentiment gauge</li>
                <li>• Portfolio comparison tool</li>
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
              title="Market Indices - Audio Summary"
              description="Listen to a comprehensive audio summary of market indices, available in multiple languages."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/market-indices-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/market-indices-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/market-indices-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/market-indices-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/market-indices-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/market-indices-ta.m4a"
              hindiTranscript="बाजार सूचकांक - सेंसेक्स और निफ्टी के माध्यम से बाजार के स्वास्थ्य को समझना।"
              englishTranscript="Market Indices - Understanding market health through Sensex and Nifty."
              bengaliTranscript="বাজার সূচক - সেনসেক্স এবং নিফটি এর মাধ্যমে বাজারের স্বাস্থ্য বোঝা।"
              marathiTranscript="बाजार निर्देशांक - सेंसेक्स आणि निफ्टी द्वारे बाजाराचे आरोग्य समजून घेणे।"
              gujaratiTranscript="બજાર સૂચકાંકો - સેન્સેક્સ અને નિફ્ટી દ્વારા બજારનું સ્વાસ્થ્ય સમજવું।"
              tamilTranscript="சந்தை குறியீடுகள் - சென்செக்ஸ் மற்றும் நிஃப்டி மூலம் சந்தையின் ஆரோக்கியத்தைப் புரிந்துகொள்வது."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand that market indices measure the performance of groups of stocks",
              "I recognize that indices serve as market health indicators"
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
      id: "sensex",
      title: "BSE Sensex",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              📈 BSE Sensex - India&apos;s Oldest Market Index
            </h3>
            <p className="text-green-700 leading-relaxed">
              The Sensex is the benchmark index of the Bombay Stock Exchange (BSE) and one of the most widely followed market indicators in India.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">What is the Sensex?</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>Sensex</strong> is the benchmark index of the <strong>Bombay Stock Exchange (BSE)</strong>. It comprises 30 of the largest and most actively-traded stocks on the exchange, providing a sample of the overall market.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Key Features:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Tracks 30 major stocks</li>
                  <li>• Market cap weighted</li>
                  <li>• Free float methodology</li>
                  <li>• Base year: 1978-79</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Representation:</h5>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Large-cap companies</li>
                  <li>• High liquidity stocks</li>
                  <li>• Diverse sectors</li>
                  <li>• Market leaders</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Sensex Components</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Financial Sector:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• HDFC Bank</li>
                  <li>• ICICI Bank</li>
                  <li>• SBI</li>
                  <li>• Kotak Bank</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Technology:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• TCS</li>
                  <li>• Infosys</li>
                  <li>• Wipro</li>
                  <li>• HCL Tech</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Others:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Reliance Industries</li>
                  <li>• ITC</li>
                  <li>• HUL</li>
                  <li>• Maruti Suzuki</li>
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
      id: "nifty",
      title: "NSE Nifty 50",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              🎯 NSE Nifty 50 - Broader Market Representation
            </h3>
            <p className="text-blue-700 leading-relaxed">
              The Nifty 50 is the benchmark index of the National Stock Exchange (NSE) and provides a broader view of the Indian equity market.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">What is the Nifty 50?</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>Nifty 50</strong> is the benchmark index of the <strong>National Stock Exchange (NSE)</strong>. It comprises 50 of the largest Indian companies, representing a broad cross-section of the economy.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Key Features:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Tracks 50 major stocks</li>
                  <li>• Market cap weighted</li>
                  <li>• Free float methodology</li>
                  <li>• Base year: 1995</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">Advantages:</h5>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Broader representation</li>
                  <li>• Better diversification</li>
                  <li>• More sectors covered</li>
                  <li>• Higher liquidity</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Nifty 50 Sector Breakdown</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Major Sectors:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Financial Services (40%)</li>
                  <li>• Information Technology (15%)</li>
                  <li>• Oil & Gas (12%)</li>
                  <li>• Consumer Goods (10%)</li>
                  <li>• Others (23%)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Key Companies:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Reliance Industries</li>
                  <li>• HDFC Bank</li>
                  <li>• TCS</li>
                  <li>• ICICI Bank</li>
                  <li>• Infosys</li>
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
      title: "Market Indices Quiz",
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: "sensex-definition",
              question: "What does the BSE Sensex track?",
              options: [
                "50 major stocks",
                "30 major stocks",
                "100 major stocks",
                "All stocks on BSE"
              ],
              correctAnswer: 1,
              explanation: "Correct! The BSE Sensex tracks 30 of the largest and most actively-traded stocks on the Bombay Stock Exchange."
            },
            {
              id: "nifty-definition",
              question: "What does the NSE Nifty 50 track?",
              options: [
                "30 major stocks",
                "50 major stocks",
                "100 major stocks",
                "All stocks on NSE"
              ],
              correctAnswer: 1,
              explanation: "Great! The NSE Nifty 50 tracks 50 of the largest Indian companies, providing broader market representation than the Sensex."
            },
            {
              id: "index-purpose",
              question: "What is the main purpose of market indices?",
              options: [
                "To predict future stock prices",
                "To serve as a barometer for market health",
                "To replace individual stock analysis",
                "To guarantee investment returns"
              ],
              correctAnswer: 1,
              explanation: "Excellent! Market indices serve as a barometer for the overall health and direction of the stock market."
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
      id: "index-calculation",
      title: "How Indices Are Calculated",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              🧮 Understanding Index Calculation
            </h3>
            <p className="text-blue-700">
              Market indices use sophisticated mathematical formulas to provide a single number that represents the performance of multiple stocks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Market Cap Weighted</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Both Sensex and Nifty use market capitalization weighting, meaning larger companies have more influence on the index.
              </p>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Formula:</h5>
                <p className="text-green-700 text-xs">Index Value = Σ(Price × Shares × Weight) / Base Value</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Free Float Methodology</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Only freely tradable shares are considered, excluding promoter holdings and strategic investments.
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Benefits:</h5>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• More accurate representation</li>
                  <li>• Better liquidity reflection</li>
                  <li>• Fairer weighting</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Why This Matters</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">For Investors:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Benchmark performance</li>
                  <li>• Market sentiment gauge</li>
                  <li>• Portfolio comparison</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">For Traders:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Market direction</li>
                  <li>• Volatility measurement</li>
                  <li>• Risk assessment</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">For Analysts:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Economic indicators</li>
                  <li>• Sector performance</li>
                  <li>• Market trends</li>
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
      title: "Index Matching Exercise",
      content: (
        <InteractiveSelection
          title="Match each index with its correct description"
          description="Select the correct description for each market index. This will help you understand the differences between them."
          options={[
            {
              id: "sensex-description",
              text: "Tracks 30 major stocks on BSE and is India's oldest market index",
              isCorrect: true,
              explanation: "Correct! The BSE Sensex tracks 30 major stocks and has been around since 1978-79, making it India's oldest market index."
            },
            {
              id: "nifty-description",
              text: "Tracks 50 major stocks on NSE and provides broader market representation",
              isCorrect: true,
              explanation: "Correct! The NSE Nifty 50 tracks 50 stocks and provides broader representation of the Indian equity market."
            },
            {
              id: "index-purpose",
              text: "Both indices serve as barometers for overall market health and direction",
              isCorrect: true,
              explanation: "Correct! Both Sensex and Nifty serve as barometers for the overall health and direction of the Indian stock market."
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
          description="Answer these questions to ensure you&apos;ve grasped the key concepts about market indices."
          questions={[
            {
              id: "index-differences",
              question: "What are the key differences between BSE Sensex and NSE Nifty 50?",
              hint: "Think about the number of stocks, exchange, and representation.",
              correctAnswer: "sensex 30 stocks bse nifty 50 stocks nse broader representation",
              explanation: "Great! The BSE Sensex tracks 30 major stocks on the Bombay Stock Exchange, while the NSE Nifty 50 tracks 50 stocks on the National Stock Exchange, providing broader market representation."
            },
            {
              id: "index-importance",
              question: "Why are market indices important for investors?",
              hint: "Consider their role as benchmarks and indicators.",
              correctAnswer: "market health indicator benchmark performance economic sentiment portfolio comparison",
              explanation: "Perfect! Market indices are important because they serve as indicators of market health, benchmarks for investment performance, gauges of economic sentiment, and tools for portfolio comparison."
            },
            {
              id: "calculation-methodology",
              question: "How do market cap weighting and free float methodology affect index calculation?",
              hint: "Think about representation and accuracy.",
              correctAnswer: "market cap weighting larger companies influence free float methodology tradable shares accurate representation",
              explanation: "Excellent! Market cap weighting means larger companies have more influence on the index, while free float methodology considers only freely tradable shares, providing more accurate representation of the market."
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
              Congratulations! You&apos;ve completed the &quot;Market Indices&quot; lesson. 
              Here&apos;s a summary of the key concepts you now understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Index Understanding</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>BSE Sensex tracks 30 major stocks on BSE</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>NSE Nifty 50 tracks 50 major stocks on NSE</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Both use market cap weighting and free float methodology</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Indices serve as market health barometers</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Practical Applications</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Benchmark for investment performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Gauge of economic sentiment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Portfolio comparison tool</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Market direction indicator</span>
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
                <p className="text-yellow-700 text-sm">Monitor index movements</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Research</h5>
                <p className="text-yellow-700 text-sm">Study index components</p>
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
        description="Congratulations on completing the &apos;Market Indices&apos; lesson"
        lessonSlug="market-indices"
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
            You&apos;ve successfully learned about market indices and demonstrated 
            your understanding through various interactive exercises. You&apos;re now 
            ready to learn about the role of SEBI!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/role-of-sebi"
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
      title="Market Indices (Sensex & Nifty)"
      description="Learn how market indices work as a barometer for the overall health of the stock market."
      lessonSlug="market-indices"
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
