"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { useTranslation } from "@/hooks/useTranslation";
import { ChartBar, TrendingUp, History, Target, CheckCircle, BarChart3, Activity } from 'lucide-react';
import TradingViewWidget from "@/components/tradingview/AdvancedChart";

export default function IntroTechnicalAnalysisPage() {
  const { t } = useTranslation('stock-market-course.introduction-to-technical-analysis');
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
      title: "Introduction to Technical Analysis",
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
              Shift your focus from a company's fundamentals to its market statistics. Learn the basics of technical analysis and how it uses charts to predict future price movements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What is Technical Analysis?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Technical analysis is a trading discipline that evaluates investments and identifies trading opportunities by analyzing statistical trends gathered from trading activity, such as price movement and volume.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The core assumption is that all known information is already priced into the stock, and that history tends to repeat itself.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-lg font-semibold text-green-800">
                Think of technical analysis as reading the "footprints" that price leaves behind!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Identify entry and exit points</li>
                <li>• Spot trend reversals early</li>
                <li>• Manage risk effectively</li>
                <li>• Time your trades better</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
              <ul className="text-orange-800 space-y-1 text-sm">
                <li>• Use with fundamental analysis</li>
                <li>• No method is 100% accurate</li>
                <li>• Practice with paper trading</li>
                <li>• Start with simple patterns</li>
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
              title="Technical Analysis Introduction - Audio Summary"
              description="Listen to a comprehensive audio summary of technical analysis basics, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-analysis-intro-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-analysis-intro-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-analysis-intro-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-analysis-intro-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-analysis-intro-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-analysis-intro-ta.m4a"
              hindiTranscript="तकनीकी विश्लेषण का परिचय - शेयर बाजार में मूल्य आंदोलनों का विश्लेषण करने के लिए चार्ट और संकेतकों का उपयोग करें।"
              englishTranscript="Introduction to Technical Analysis: Learn how to analyze price movements in the stock market using charts and indicators. Discover the three core principles and key tools for market timing."
              bengaliTranscript="টেকনিক্যাল অ্যানালাইসিসের পরিচয় - চার্ট এবং সূচক ব্যবহার করে শেয়ার বাজারে মূল্য আন্দোলন বিশ্লেষণ করুন।"
              marathiTranscript="तांत्रिक विश्लेषणाचा परिचय - चार्ट आणि निर्देशक वापरून शेअर बाजारातील किंमत हालचालींचे विश्लेषण करा।"
              gujaratiTranscript="ટેક્નિકલ એનાલિસિસનો પરિચય - ચાર્ટ અને સૂચકોનો ઉપયોગ કરીને શેર બજારમાં કિંમતની હલચલનું વિશ્લેષણ કરો."
              tamilTranscript="தொழில்நுட்ப பகுப்பாய்வு அறிமுகம் - வரைபடங்கள் மற்றும் குறிகாட்டிகளைப் பயன்படுத்தி பங்கு சந்தையில் விலை இயக்கங்களை பகுப்பாய்வு செய்யுங்கள்."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand what technical analysis is",
              "I recognize the core assumption of technical analysis"
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
      id: "core-tenets",
      title: "Core Tenets of Technical Analysis",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              The Three Pillars
            </h3>
            <p className="text-green-700">
              Technical analysis is built on three fundamental principles that guide all analysis and decision-making.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Market Action Discounts Everything</h4>
                  <p className="text-gray-700">
                    All information, from fundamentals to market psychology, is reflected in the stock price. This means you don't need to analyze news separately - it's already priced in.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Prices Move in Trends</h4>
                  <p className="text-gray-700">
                    Prices move in recognizable trends and are likely to continue until a clear reversal occurs. This is why trend-following strategies work.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <History className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">History Tends to Repeat Itself</h4>
                  <p className="text-gray-700">
                    Recurring price patterns are attributed to consistent market psychology. Human emotions and behavior patterns don't change much over time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              💡 Key Insight
            </h3>
            <p className="text-yellow-700">
              These three principles work together. When you see a price pattern that has worked before, it's likely to work again because market psychology remains consistent, 
              and all relevant information is already reflected in the current price.
            </p>
          </div>

          <ConfirmationCheck
            title="Core Tenets Understanding Check"
            description="Please confirm your understanding of the three core tenets:"
            checkboxes={[
              "I understand the 'Market Action Discounts Everything' principle",
              "I understand the 'Prices Move in Trends' principle",
              "I understand the 'History Repeats Itself' principle"
            ]}
            partId="core-tenets"
            onPartComplete={createConfirmationHandler("core-tenets")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "key-tools",
      title: "Key Tools of the Trade",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              Your Technical Analysis Toolkit
            </h3>
            <p className="text-purple-700">
              Technical analysts use a variety of tools to analyze the market. Let's explore the two main categories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ChartBar className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Charts</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Visual representations of price action over time, such as candlestick charts, line charts, and bar charts.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">Chart Types:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Candlestick charts (most popular)</li>
                  <li>• Line charts (simple trend view)</li>
                  <li>• Bar charts (OHLC data)</li>
                  <li>• Point & figure charts</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Indicators</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Mathematical calculations based on price and/or volume, such as moving averages and RSI.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">Indicator Categories:</h5>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Trend indicators (moving averages)</li>
                  <li>• Momentum indicators (RSI, MACD)</li>
                  <li>• Volume indicators</li>
                  <li>• Volatility indicators</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Live Chart Example
            </h3>
            <p className="text-gray-700 mb-4">
              Here's a real-time chart to help you visualize what technical analysis looks like in practice:
            </p>
            <div style={{ height: '400px' }}>
              <TradingViewWidget />
            </div>
          </div>

          <ConfirmationCheck
            title="Tools Understanding Check"
            description="Please confirm your understanding of the key tools:"
            checkboxes={[
              "I understand the difference between charts and indicators",
              "I can identify the main chart types",
              "I recognize the main indicator categories"
            ]}
            partId="key-tools"
            onPartComplete={createConfirmationHandler("key-tools")}
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
              Quiz: Technical Analysis Basics
            </h3>
            <p className="text-blue-700">
              Test your understanding of the key concepts we've covered. Answer correctly to proceed to the next part!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 1: What is the core assumption of technical analysis?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Company fundamentals drive prices</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) All known information is already priced into the stock</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) News events cause immediate price changes</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 2: Which of these is NOT a core tenet of technical analysis?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Market action discounts everything</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Prices move in trends</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Company earnings drive all decisions</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 3: What are the two main categories of technical analysis tools?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Charts and indicators</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) News and fundamentals</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Volume and price</span>
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
                  if (q2.value === 'c') score += 33.33;
                  if (q3.value === 'a') score += 33.33;
                  
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
                    <h4 className="font-semibold text-gray-800">Technical Analysis Purpose</h4>
                    <p className="text-gray-600 text-sm">Uses historical price and volume data to predict future price movements.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Three Core Principles</h4>
                    <p className="text-gray-600 text-sm">Market discounts everything, prices move in trends, history repeats itself.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Market Timing Tool</h4>
                    <p className="text-gray-600 text-sm">Helps identify good entry and exit points for trades.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Complementary Approach</h4>
                    <p className="text-gray-600 text-sm">Best used with fundamental analysis for comprehensive strategy.</p>
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
              You've now mastered the basics of technical analysis! In the upcoming lessons, you'll learn about:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Candlestick Charts</h4>
                <p className="text-blue-700 text-sm">Learn to read price patterns and market psychology.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Trend Analysis</h4>
                <p className="text-green-700 text-sm">Identify support, resistance, and trend changes.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Technical Indicators</h4>
                <p className="text-purple-700 text-sm">Master RSI, MACD, moving averages, and more.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Pattern Recognition</h4>
                <p className="text-orange-700 text-sm">Spot chart patterns that signal opportunities.</p>
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
              <li>• Identify trends in different timeframes</li>
              <li>• Look for the three core principles in action</li>
              <li>• Practice recognizing chart patterns</li>
              <li>• Compare different chart types</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              ⚠️ Important Reminder
            </h3>
            <p className="text-red-700">
              Technical analysis is a tool for timing, not a crystal ball. Always use proper risk management, 
              and remember that no method guarantees profits. Combine technical analysis with fundamental analysis 
              for the best results.
            </p>
          </div>

          <ConfirmationCheck
            title="Final Understanding Check"
            description="Please confirm that you're ready to move forward:"
            checkboxes={[
              "I understand the basics of technical analysis",
              "I can identify the three core principles",
              "I recognize the main tools and their purposes"
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
        description="Congratulations on completing the 'Introduction to Technical Analysis' lesson"
        lessonSlug="introduction-to-technical-analysis"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <ChartBar className="w-12 h-12 text-green-600" />
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
            You've successfully learned the basics of technical analysis and demonstrated 
            your understanding through various interactive exercises. You're now ready to 
            learn about candlestick charts and pattern recognition!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/reading-candlestick-charts"
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
      title="Introduction to Technical Analysis"
      description="Shift your focus from a company's fundamentals to its market statistics. Learn the basics of technical analysis and how it uses charts to predict future price movements."
      lessonSlug="introduction-to-technical-analysis"
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
