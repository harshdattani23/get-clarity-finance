"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { useTranslation } from "@/hooks/useTranslation";
import { TrendingUp, TrendingDown, Target, CheckCircle, BarChart3, Activity } from 'lucide-react';
import Image from 'next/image';

export default function HowToReadCandlestickChartsPage() {
  const { t } = useTranslation('stock-market-course.how-to-read-candlestick-charts');
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Handle lesson completion
  const handleLessonComplete = (totalScore: number) => {
    setFinalScore(totalScore);
    setLessonCompleted(true);
  };

  // Handle part completion
  const handlePartComplete = (partId: string, score: number) => {
    console.log(`Part ${partId} completed with score: ${score}`);
  };

  // Create confirmation handler for interactive parts
  const createConfirmationHandler = (partId: string) => {
    return (partIdParam: string, score: number) => {
      console.log(`Part ${partIdParam} completed with score: ${score}`);
      
      // Call the MultiPartLesson's completion handler directly
      if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
        (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete(partIdParam, score);
      }
    };
  };

  // Define lesson parts
  const lessonParts = [
    {
      id: "introduction-with-audio",
      title: "How to Read Candlestick Charts",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              What You'll Learn
            </h3>
            <p className="text-blue-700">
              Learn to interpret the most popular type of financial chart and understand the story each candlestick tells about the battle between buyers and sellers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What are Candlestick Charts?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Candlestick charts are the most popular way to visualize stock price movements. Each 'candlestick' provides a wealth of information about the price action within a specific time period.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Think of each candlestick as a "footprint" that shows you exactly what happened during that time period - who was in control (buyers or sellers), how much they pushed the price, and what the final outcome was.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-lg font-semibold text-green-800">
                Candlesticks tell the story of the battle between bulls and bears!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Visual price action representation</li>
                <li>• Quick pattern recognition</li>
                <li>• Market psychology insights</li>
                <li>• Entry/exit timing signals</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
              <ul className="text-orange-800 space-y-1 text-sm">
                <li>• Use with volume confirmation</li>
                <li>• Patterns work best in trends</li>
                <li>• Multiple timeframes matter</li>
                <li>• Practice pattern recognition</li>
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
              title="Candlestick Charts - Audio Summary"
              description="Listen to a comprehensive audio summary of how to read candlestick charts, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/candlestick-charts-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/candlestick-charts-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/candlestick-charts-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/candlestick-charts-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/candlestick-charts-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/candlestick-charts-ta.m4a"
              hindiTranscript="कैंडलस्टिक चार्ट पढ़ना सीखें - प्रत्येक कैंडलस्टिक खरीदारों और विक्रेताओं के बीच की लड़ाई की कहानी बताता है।"
              englishTranscript="Learn to Read Candlestick Charts: Understand the story each candlestick tells about the battle between buyers and sellers. Master the anatomy and patterns for better trading decisions."
              bengaliTranscript="ক্যান্ডেলস্টিক চার্ট পড়া শিখুন - প্রতিটি ক্যান্ডেলস্টিক ক্রেতা এবং বিক্রেতাদের মধ্যে যুদ্ধের গল্প বলে।"
              marathiTranscript="कॅंडलस्टिक चार्ट वाचणे शिका - प्रत्येक कॅंडलस्टिक खरेदीदार आणि विक्रेत्यांमधील लढाईची कहाणी सांगतो."
              gujaratiTranscript="કેન્ડલસ્ટિક ચાર્ટ વાંચવાનું શીખો - દરેક કેન્ડલસ્ટિક ખરીદદારો અને વેચાણકારો વચ્ચેની લડાઈની વાર્તા કહે છે."
              tamilTranscript="மெழுகுவர்த்தி வரைபடங்களைப் படிக்கக் கற்றுக்கொள்ளுங்கள் - ஒவ்வொரு மெழுகுவர்த்தியும் வாங்குபவர்கள் மற்றும் விற்பனையாளர்களுக்கு இடையேயான போரின் கதையை சொல்கிறது."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand what candlestick charts represent",
              "I recognize that each candlestick tells a story"
            ]}
            partId="introduction-with-audio"
            onPartComplete={createConfirmationHandler("introduction-with-audio")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "candlestick-anatomy",
      title: "The Anatomy of a Candlestick",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Understanding the Structure
            </h3>
            <p className="text-green-700">
              Each candlestick represents a period and has four key data points: Open, High, Low, and Close. These create two main parts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">The Body</h4>
              </div>
              <p className="text-gray-700 mb-4">
                The wide part, representing the range between the open and close prices.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">Body Characteristics:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Shows open to close range</li>
                  <li>• Indicates buying/selling pressure</li>
                  <li>• Larger body = stronger move</li>
                  <li>• Small body = indecision</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">The Wicks (Shadows)</h4>
              </div>
              <p className="text-gray-700 mb-4">
                The thin lines above and below the body, representing the highest and lowest prices.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">Wick Information:</h5>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Upper wick = highest price</li>
                  <li>• Lower wick = lowest price</li>
                  <li>• Long wicks = price rejection</li>
                  <li>• Short wicks = controlled move</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Color Coding: Bullish vs Bearish
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <h4 className="text-lg font-semibold text-green-800">Green (Bullish)</h4>
                </div>
                <p className="text-green-700 mb-3">
                  A green (or hollow) candle is bullish, meaning the close price is higher than the open price.
                </p>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Close &gt; Open</li>
                  <li>• Buyers in control</li>
                  <li>• Upward price movement</li>
                  <li>• Positive sentiment</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                  <h4 className="text-lg font-semibold text-red-800">Red (Bearish)</h4>
                </div>
                <p className="text-red-700 mb-3">
                  A red (or filled) candle is bearish, meaning the close price is lower than the open price.
                </p>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Close &lt; Open</li>
                  <li>• Sellers in control</li>
                  <li>• Downward price movement</li>
                  <li>• Negative sentiment</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              💡 Key Insight
            </h3>
            <p className="text-yellow-700">
              The body size relative to the wicks tells you about market conviction. A large body with small wicks means strong conviction in that direction. 
              Small bodies with long wicks suggest indecision and potential reversals.
            </p>
          </div>

          <ConfirmationCheck
            title="Anatomy Understanding Check"
            description="Please confirm your understanding of candlestick anatomy:"
            checkboxes={[
              "I understand what the body represents",
              "I understand what the wicks show",
              "I can identify bullish vs bearish candles"
            ]}
            partId="candlestick-anatomy"
            onPartComplete={createConfirmationHandler("candlestick-anatomy")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "common-patterns",
      title: "Common Candlestick Patterns",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              Pattern Recognition
            </h3>
            <p className="text-purple-700">
              Certain candlestick formations have specific meanings and can signal potential reversals or continuations in price trends.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Doji Pattern - The Indecision Signal
              </h3>
              <p className="text-gray-700 mb-4">
                A Doji occurs when the open and close prices are virtually equal, creating a very small body. This pattern indicates indecision in the market.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">What it means:</h4>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li>• Market indecision</li>
                  <li>• Potential trend reversal</li>
                  <li>• Buyers and sellers in balance</li>
                  <li>• Wait for confirmation</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm text-center">Doji Pattern Visualization</p>
                  <div className="w-16 h-8 bg-gray-300 rounded mx-auto mt-2"></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Hammer Pattern - The Reversal Signal
              </h3>
              <p className="text-gray-700 mb-4">
                A Hammer has a small body at the top with a long lower wick. It often appears at the bottom of downtrends and signals potential bullish reversal.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                <h4 className="font-semibold text-green-800 mb-2">What it means:</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Potential bullish reversal</li>
                  <li>• Sellers exhausted</li>
                  <li>• Buyers stepping in</li>
                  <li>• Look for confirmation</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm text-center">Hammer Pattern Visualization</p>
                  <div className="w-4 h-8 bg-green-300 rounded mx-auto mt-2"></div>
                  <div className="w-1 h-6 bg-gray-400 mx-auto mt-1"></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Engulfing Pattern - The Trend Change Signal
              </h3>
              <p className="text-gray-700 mb-4">
                An Engulfing pattern occurs when one candle completely engulfs the previous candle's body. This is a strong reversal signal.
              </p>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
                <h4 className="font-semibold text-orange-800 mb-2">What it means:</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Strong reversal signal</li>
                  <li>• Previous trend exhausted</li>
                  <li>• New trend beginning</li>
                  <li>• High probability setup</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm text-center">Engulfing Pattern Visualization</p>
                  <div className="space-y-2">
                    <div className="w-8 h-4 bg-red-300 rounded mx-auto"></div>
                    <div className="w-12 h-6 bg-green-300 rounded mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ConfirmationCheck
            title="Pattern Recognition Check"
            description="Please confirm your understanding of these patterns:"
            checkboxes={[
              "I understand what a Doji pattern indicates",
              "I recognize the Hammer pattern",
              "I can identify Engulfing patterns"
            ]}
            partId="common-patterns"
            onPartComplete={createConfirmationHandler("common-patterns")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "interactive-quiz",
      title: "Test Your Knowledge",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Quiz: Candlestick Chart Mastery
            </h3>
            <p className="text-blue-700">
              Test your understanding of candlestick charts and patterns. Answer correctly to proceed to the next part!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 1: What does a green candlestick indicate?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) The stock price went down</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) The stock price went up (close &gt; open)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) The stock price stayed the same</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 2: What does a Doji pattern typically indicate?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Strong upward trend</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Market indecision</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Strong downward trend</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 3: What do the wicks (shadows) of a candlestick show?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Only the open and close prices</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) The highest and lowest prices reached</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) The trading volume</span>
              </label>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Submit Your Answers
            </h3>
            <p className="text-green-700 mb-4">
              Select your answers for all three questions above, then click the button below to check your understanding.
            </p>
            <button
              onClick={() => {
                // Simple quiz validation - in a real app, this would be more sophisticated
                const q1 = document.querySelector('input[name="q1"]:checked') as HTMLInputElement;
                const q2 = document.querySelector('input[name="q2"]:checked') as HTMLInputElement;
                const q3 = document.querySelector('input[name="q3"]:checked') as HTMLInputElement;
                
                if (q1 && q2 && q3) {
                  let score = 0;
                  if (q1.value === 'b') score += 33.33;
                  if (q2.value === 'b') score += 33.33;
                  if (q3.value === 'b') score += 33.33;
                  
                  // Call completion handler
                  if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
                    (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete("interactive-quiz", score);
                  }
                } else {
                  alert("Please answer all questions before submitting!");
                }
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Submit Quiz Answers
            </button>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'quiz' as const,
      minScore: 60,
      skipAllowed: false
    },
    {
      id: "key-takeaways",
      title: "Key Takeaways & Next Steps",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Target className="w-8 h-8 text-green-600 mr-3" />
              Key Takeaways
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Candlestick Structure</h4>
                    <p className="text-gray-600 text-sm">Each candlestick shows open, high, low, and close prices.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Body and Wicks</h4>
                    <p className="text-gray-600 text-sm">Body shows open-close range, wicks show high-low range.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Color Coding</h4>
                    <p className="text-gray-600 text-sm">Green = bullish (up), Red = bearish (down).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Pattern Recognition</h4>
                    <p className="text-gray-600 text-sm">Doji, Hammer, and Engulfing patterns signal reversals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              🚀 What's Next?
            </h3>
            <p className="text-gray-700 mb-6">
              You've now mastered candlestick charts! In the upcoming lessons, you'll learn about:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Trend Analysis</h4>
                <p className="text-blue-700 text-sm">Identify support, resistance, and trend changes.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Technical Indicators</h4>
                <p className="text-green-700 text-sm">Master RSI, MACD, moving averages, and more.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Advanced Patterns</h4>
                <p className="text-purple-700 text-sm">Learn complex reversal and continuation patterns.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Volume Analysis</h4>
                <p className="text-orange-700 text-sm">Combine price action with volume confirmation.</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              💡 Practice Makes Perfect
            </h3>
            <p className="text-yellow-700">
              Start applying what you've learned by practicing with real charts. Try to:
            </p>
            <ul className="text-yellow-700 mt-3 space-y-1">
              <li>• Identify different candlestick types</li>
              <li>• Look for Doji, Hammer, and Engulfing patterns</li>
              <li>• Practice reading body vs wick relationships</li>
              <li>• Compare patterns across different timeframes</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              ⚠️ Important Reminder
            </h3>
            <p className="text-red-700">
              Candlestick patterns are not 100% reliable. Always use them in conjunction with other technical analysis tools, 
              consider the overall market context, and practice proper risk management. Patterns work best when confirmed by volume and trend analysis.
            </p>
          </div>

          <ConfirmationCheck
            title="Final Understanding Check"
            description="Please confirm that you're ready to move forward:"
            checkboxes={[
              "I understand candlestick anatomy and structure",
              "I can identify bullish vs bearish candles",
              "I recognize common candlestick patterns"
            ]}
            partId="key-takeaways"
            onPartComplete={createConfirmationHandler("key-takeaways")}
          />
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
        description="Congratulations on completing the 'How to Read Candlestick Charts' lesson"
        lessonSlug="how-to-read-candlestick-charts"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <BarChart3 className="w-12 h-12 text-green-600" />
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
            You've successfully learned how to read candlestick charts and demonstrated 
            your understanding through various interactive exercises. You're now ready to 
            learn about trend analysis and support/resistance levels!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/identifying-trends-support-and-resistance"
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
      title="How to Read Candlestick Charts"
      description="Learn to interpret the most popular type of financial chart and understand the story each candlestick tells about the battle between buyers and sellers."
      lessonSlug="how-to-read-candlestick-charts"
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
