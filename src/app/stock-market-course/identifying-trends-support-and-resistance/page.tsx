"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { useTranslation } from "@/hooks/useTranslation";
import { TrendingUp, TrendingDown, Minus, Target, CheckCircle, BarChart3, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';

export default function IdentifyingTrendsSupportAndResistancePage() {
  const { t } = useTranslation('stock-market-course.identifying-trends-support-and-resistance');
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
      title: "Identifying Trends, Support, and Resistance",
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
              Learn to identify the market's direction and key price levels where buying and selling pressure is expected to be strong.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Why Trends, Support, and Resistance Matter
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding the market's direction and identifying key price levels are fundamental skills in technical analysis. These concepts help traders make more informed decisions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Think of trends as the "road" the market is traveling on, while support and resistance are like "speed bumps" and "ceilings" that can change the market's direction.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-lg font-semibold text-green-800">
                Master these concepts to become a better market navigator!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Identify market direction</li>
                <li>• Find entry and exit points</li>
                <li>• Manage risk effectively</li>
                <li>• Anticipate reversals</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
              <ul className="text-orange-800 space-y-1 text-sm">
                <li>• Use multiple timeframes</li>
                <li>• Look for confirmation</li>
                <li>• Support can become resistance</li>
                <li>• Trends can change</li>
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
              title="Trends, Support and Resistance - Audio Summary"
              description="Listen to a comprehensive audio summary of identifying trends, support and resistance levels, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/trends-support-resistance-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/trends-support-resistance-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/trends-support-resistance-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/trends-support-resistance-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/trends-support-resistance-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/trends-support-resistance-ta.m4a"
              hindiTranscript="ट्रेंड, सपोर्ट और रेजिस्टेंस की पहचान करना सीखें - बाजार की दिशा और महत्वपूर्ण मूल्य स्तरों को समझें।"
              englishTranscript="Learn to Identify Trends, Support and Resistance: Master the market's direction and key price levels where buying and selling pressure is expected to be strong."
              bengaliTranscript="ট্রেন্ড, সাপোর্ট এবং রেজিস্ট্যান্স চিহ্নিত করা শিখুন - বাজারের দিকনির্দেশনা এবং গুরুত্বপূর্ণ মূল্য স্তরগুলি বুঝুন।"
              marathiTranscript="ट्रेंड, सपोर्ट आणि रेझिस्टन्स ओळखणे शिका - बाजाराची दिशा आणि महत्त्वाचे किंमत स्तर समजून घ्या."
              gujaratiTranscript="ટ્રેન્ડ, સપોર્ટ અને રેઝિસ્ટન્સ ઓળખવાનું શીખો - બજારની દિશા અને મહત્વપૂર્ણ કિંમતના સ્તરોને સમજો."
              tamilTranscript="பிரவணங்கள், ஆதரவு மற்றும் எதிர்ப்பை அடையாளம் காண்பதைக் கற்றுக்கொள்ளுங்கள் - சந்தையின் திசை மற்றும் முக்கியமான விலை நிலைகளைப் புரிந்துகொள்ளுங்கள்."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand why trends, support, and resistance matter",
              "I recognize they help with trading decisions"
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
      id: "understanding-trends",
      title: "What is a Trend?",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Market Direction
            </h3>
            <p className="text-green-700">
              A trend is the general direction in which a stock's price is moving. Understanding trends is crucial for successful trading.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Uptrend (Bullish)</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Characterized by a series of 'higher highs' and 'higher lows'. The price is consistently making new highs and the lows are also rising.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">Key Characteristics:</h5>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Higher highs and higher lows</li>
                  <li>• Buyers in control</li>
                  <li>• Positive momentum</li>
                  <li>• Good for long positions</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Downtrend (Bearish)</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Characterized by a series of 'lower highs' and 'lower lows'. The price is consistently making new lows and the highs are also falling.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="font-semibold text-red-800 mb-2">Key Characteristics:</h5>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Lower highs and lower lows</li>
                  <li>• Sellers in control</li>
                  <li>• Negative momentum</li>
                  <li>• Good for short positions</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Minus className="w-6 h-6 text-gray-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Sideways (Ranging)</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Occurs when the price trades within a relatively narrow range. No clear direction, often consolidation before a breakout.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-2">Key Characteristics:</h5>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Price moves sideways</li>
                  <li>• No clear direction</li>
                  <li>• Consolidation phase</li>
                  <li>• Wait for breakout</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              💡 Key Insight
            </h3>
            <p className="text-yellow-700">
              Trends can exist on multiple timeframes. A stock might be in an uptrend on the daily chart but a downtrend on the hourly chart. 
              Always consider the timeframe you're trading on and look for alignment across timeframes for stronger signals.
            </p>
          </div>

          <ConfirmationCheck
            title="Trend Understanding Check"
            description="Please confirm your understanding of the three trend types:"
            checkboxes={[
              "I understand what an uptrend is",
              "I understand what a downtrend is",
              "I understand what a sideways trend is"
            ]}
            partId="understanding-trends"
            onPartComplete={createConfirmationHandler("understanding-trends")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "support-and-resistance",
      title: "Support and Resistance Levels",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              Price Barriers
            </h3>
            <p className="text-purple-700">
              Support and resistance are key price levels where the market is likely to pause, reverse, or accelerate. These levels act as psychological barriers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ArrowUp className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Support: The Price Floor</h4>
              </div>
              <p className="text-gray-700 mb-4">
                A price level where a downtrend can be expected to pause due to a concentration of demand. It's a level where buyers are likely to step in and buy.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">Support Characteristics:</h5>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Price bounces up from this level</li>
                  <li>• High buying interest</li>
                  <li>• Can halt downtrends</li>
                  <li>• Good entry point for longs</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <ArrowDown className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Resistance: The Price Ceiling</h4>
              </div>
              <p className="text-gray-700 mb-4">
                A price level where an uptrend can be expected to pause due to a concentration of supply. It's a level where sellers are likely to step in and sell.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="font-semibold text-red-800 mb-2">Resistance Characteristics:</h5>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Price bounces down from this level</li>
                  <li>• High selling interest</li>
                  <li>• Can halt uptrends</li>
                  <li>• Good entry point for shorts</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Visual Example
            </h3>
            <p className="text-gray-700 mb-4">
              Here's a chart showing support and resistance levels in action:
            </p>
            <div className="flex justify-center">
              <Image 
                src="https://www.investopedia.com/thmb/8-DW1s_Gz6_Oo2a_g3p-Xz7x8wM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/support-and-resistance-2-5884ff305a2f434c93c4489a74246821.jpg" 
                alt="Chart showing support and resistance levels" 
                width={800} 
                height={450} 
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              🔄 Role Reversal
            </h3>
            <p className="text-blue-700">
              An important concept: when support is broken, it often becomes resistance. Similarly, when resistance is broken, it often becomes support. 
              This is because these levels represent psychological price points that traders remember.
            </p>
          </div>

          <ConfirmationCheck
            title="Support & Resistance Understanding Check"
            description="Please confirm your understanding of these concepts:"
            checkboxes={[
              "I understand what support levels are",
              "I understand what resistance levels are",
              "I recognize they can reverse roles"
            ]}
            partId="support-and-resistance"
            onPartComplete={createConfirmationHandler("support-and-resistance")}
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
              Quiz: Trends, Support & Resistance Mastery
            </h3>
            <p className="text-blue-700">
              Test your understanding of market trends, support, and resistance levels. Answer correctly to proceed to the next part!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 1: What characterizes an uptrend?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Lower highs and lower lows</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Higher highs and higher lows</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) No clear direction</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 2: What happens at a support level?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Price always goes down</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Price bounces up due to buying pressure</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Nothing happens</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 3: What can happen when support is broken?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) The stock is delisted</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) The broken support often becomes resistance</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) The price always goes up</span>
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
                    <h4 className="font-semibold text-gray-800">Trend Identification</h4>
                    <p className="text-gray-600 text-sm">Uptrends have higher highs/lows, downtrends have lower highs/lows.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Support Levels</h4>
                    <p className="text-gray-600 text-sm">Price floors where buying pressure halts downtrends.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Resistance Levels</h4>
                    <p className="text-gray-600 text-sm">Price ceilings where selling pressure halts uptrends.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Role Reversal</h4>
                    <p className="text-gray-600 text-sm">Broken support becomes resistance, broken resistance becomes support.</p>
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
              You've now mastered trends, support, and resistance! In the upcoming lessons, you'll learn about:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Technical Indicators</h4>
                <p className="text-blue-700 text-sm">Master RSI, MACD, moving averages, and more.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Advanced Patterns</h4>
                <p className="text-green-700 text-sm">Learn complex reversal and continuation patterns.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Volume Analysis</h4>
                <p className="text-purple-700 text-sm">Combine price action with volume confirmation.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Risk Management</h4>
                <p className="text-orange-700 text-sm">Learn to protect your capital while trading.</p>
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
              <li>• Identify trends on different timeframes</li>
              <li>• Mark support and resistance levels</li>
              <li>• Look for trend changes and breakouts</li>
              <li>• Practice drawing trend lines</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              ⚠️ Important Reminder
            </h3>
            <p className="text-red-700">
              Trends, support, and resistance are not 100% reliable. Always use them in conjunction with other technical analysis tools, 
              consider the overall market context, and practice proper risk management. Multiple confirmations increase the probability of success.
            </p>
          </div>

          <ConfirmationCheck
            title="Final Understanding Check"
            description="Please confirm that you're ready to move forward:"
            checkboxes={[
              "I understand the three types of trends",
              "I can identify support and resistance levels",
              "I recognize the concept of role reversal"
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
        description="Congratulations on completing the 'Identifying Trends, Support, and Resistance' lesson"
        lessonSlug="identifying-trends-support-and-resistance"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <TrendingUp className="w-12 h-12 text-green-600" />
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
            You've successfully learned how to identify trends, support, and resistance levels and demonstrated 
            your understanding through various interactive exercises. You're now ready to 
            learn about technical indicators!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/essential-technical-indicators"
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
      title="Identifying Trends, Support, and Resistance"
      description="Learn to identify the market's direction and key price levels where buying and selling pressure is expected to be strong."
      lessonSlug="identifying-trends-support-and-resistance"
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
