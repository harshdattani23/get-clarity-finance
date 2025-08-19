"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { useTranslation } from "@/hooks/useTranslation";
import { TrendingUp, Activity, BarChart3, Target, CheckCircle, Calculator, Gauge } from 'lucide-react';

export default function UsingEssentialTechnicalIndicatorsPage() {
  const { t } = useTranslation('stock-market-course.using-essential-technical-indicators-moving-averages-rsi-macd');
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
      title: "Essential Technical Indicators",
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
              Go beyond basic charts. This lesson will equip you with three of the most powerful and widely-used technical indicators: Moving Averages, RSI, and MACD.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What are Technical Indicators?
                </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              While price charts and trends give you the lay of the land, technical indicators are like your GPS, providing specific signals about market momentum, potential reversals, and trend strength.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              They are mathematical calculations based on a stock's price, volume, or open interest that help you make more informed trading decisions.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-lg font-semibold text-green-800">
                Think of indicators as your trading dashboard!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-800">Moving Averages</h4>
              <p className="text-blue-700 text-sm">Trend identification and smoothing</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <Gauge className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800">RSI</h4>
              <p className="text-green-700 text-sm">Momentum and overbought/oversold</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-purple-800">MACD</h4>
              <p className="text-purple-700 text-sm">Trend momentum and signals</p>
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
              title="Technical Indicators - Audio Summary"
              description="Listen to a comprehensive audio summary of essential technical indicators, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-indicators-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-indicators-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-indicators-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-indicators-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-indicators-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-indicators-ta.m4a"
              hindiTranscript="आवश्यक तकनीकी संकेतक - मूविंग एवरेज, RSI, MACD की ABCD। बाजार की गति और प्रवृत्ति परिवर्तनों को समझने के लिए इन संकेतकों का उपयोग करें।"
              englishTranscript="Essential Technical Indicators: Master Moving Averages, RSI, and MACD to understand market momentum, trend changes, and generate trading signals."
              bengaliTranscript="প্রয়োজনীয় প্রযুক্তিগত সূচক - মুভিং এভারেজ, RSI, MACD এর ABCD। বাজারের গতি এবং প্রবণতা পরিবর্তন বোঝার জন্য এই সূচকগুলি ব্যবহার করুন।"
              marathiTranscript="आवश्यक तांत्रिक निर्देशक - मूव्हिंग एव्हरेज, RSI, MACD ची ABCD। बाजाराची गती आणि प्रवृत्ती बदल समजून घेण्यासाठी या निर्देशकांचा वापर करा।"
              gujaratiTranscript="આવશ્યક તકનીકી સૂચકો - મૂવિંગ એવરેજ, RSI, MACD ની ABCD. બજારની ગતિ અને વલણના ફેરફારો સમજવા માટે આ સૂચકોનો ઉપયોગ કરો."
              tamilTranscript="அத்தியாவசிய தொழில்நுட்ப குறிகாட்டிகள் - மூவிங் அவரேஜ், RSI, MACD இன் ABCD. சந்தையின் வேகம் மற்றும் போக்கு மாற்றங்களைப் புரிந்துகொள்ள இந்த குறிகாட்டிகளைப் பயன்படுத்துங்கள்."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand what technical indicators are",
              "I recognize the three main indicators we'll cover"
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
      id: "moving-averages",
      title: "Moving Averages: Trend Identification",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Smoothing the Path
                </h3>
            <p className="text-green-700">
              A Moving Average is one of the most basic but powerful technical indicators. It smooths out price data to highlight the underlying trend direction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Simple Moving Average (SMA)</h4>
              </div>
              <p className="text-gray-700 mb-4">
                The SMA is calculated by adding up the closing prices for a specific number of periods and then dividing by that number.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">Key Signals:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Golden Cross: 50-day SMA crosses above 200-day SMA (bullish)</li>
                  <li>• Death Cross: 50-day SMA crosses below 200-day SMA (bearish)</li>
                  <li>• Price above SMA = uptrend</li>
                  <li>• Price below SMA = downtrend</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Exponential Moving Average (EMA)</h4>
              </div>
              <p className="text-gray-700 mb-4">
                The EMA gives more weight to recent prices, making it more responsive to new information and sudden changes.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">Key Signals:</h5>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• 12-day EMA crosses above 26-day EMA (buy signal)</li>
                  <li>• 12-day EMA crosses below 26-day EMA (sell signal)</li>
                  <li>• More sensitive to price changes</li>
                  <li>• Better for short-term trading</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              💡 Key Insight
            </h3>
            <p className="text-yellow-700">
              Moving averages work best in trending markets. In sideways or choppy markets, they can give false signals. 
              Always use them in combination with other indicators for confirmation.
            </p>
          </div>

          <ConfirmationCheck
            title="Moving Averages Understanding Check"
            description="Please confirm your understanding of moving averages:"
            checkboxes={[
              "I understand the difference between SMA and EMA",
              "I can identify Golden Cross and Death Cross signals",
              "I recognize how to use MAs for trend identification"
            ]}
            partId="moving-averages"
            onPartComplete={createConfirmationHandler("moving-averages")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "rsi-indicator",
      title: "RSI: The Momentum Gauge",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              Momentum Oscillator
            </h3>
            <p className="text-purple-700">
              The RSI is a momentum oscillator that measures the speed and magnitude of price changes. It oscillates between 0 and 100.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              How RSI Works
            </h3>
            <p className="text-gray-700 mb-4">
              The RSI, typically calculated over 14 periods, helps traders identify overbought or oversold conditions by comparing the average gain on up-days to the average loss on down-days.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Overbought (RSI &gt; 70)</h4>
                <p className="text-red-700 text-sm">
                  When RSI rises above 70, it suggests the stock may be overvalued and a price correction could be imminent.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Oversold (RSI &lt; 30)</h4>
                <p className="text-green-700 text-sm">
                  When RSI falls below 30, it indicates the stock may be undervalued and a price bounce is likely.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              🔄 Divergence - The Powerful Signal
            </h3>
            <p className="text-blue-700">
              A powerful signal occurs when the price makes a new high, but the RSI fails to make a new high (bearish divergence), 
              or when the price makes a new low, but the RSI makes a higher low (bullish divergence). This often precedes a trend reversal.
            </p>
          </div>

          <ConfirmationCheck
            title="RSI Understanding Check"
            description="Please confirm your understanding of RSI:"
            checkboxes={[
              "I understand what overbought and oversold mean",
              "I can identify RSI divergence signals",
              "I recognize RSI as a momentum indicator"
            ]}
            partId="rsi-indicator"
            onPartComplete={createConfirmationHandler("rsi-indicator")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "macd-indicator",
      title: "MACD: Trend Momentum",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">
              Trend-Following Momentum
            </h3>
            <p className="text-orange-700">
              The MACD shows the relationship between two Exponential Moving Averages and reveals changes in trend strength, direction, and momentum.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                MACD Components
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">MACD Line</h4>
                  <p className="text-blue-700 text-sm">
                    Calculated by subtracting the 26-period EMA from the 12-period EMA. This is the 'fast' line.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Signal Line</h4>
                  <p className="text-green-700 text-sm">
                    A 9-period EMA of the MACD Line. This is the 'slow' line that acts as a trigger for signals.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Histogram</h4>
                  <p className="text-purple-700 text-sm">
                    The MACD Line minus the Signal Line. Shows the distance between the two lines.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                MACD Trading Signals
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Bullish Crossover</h4>
                  <p className="text-green-700 text-sm">
                    When the MACD Line crosses above the Signal Line, it's a buy signal, suggesting momentum is shifting to the upside.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Bearish Crossover</h4>
                  <p className="text-red-700 text-sm">
                    When the MACD Line crosses below the Signal Line, it's a sell signal, indicating momentum is shifting to the downside.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ConfirmationCheck
            title="MACD Understanding Check"
            description="Please confirm your understanding of MACD:"
            checkboxes={[
              "I understand the three MACD components",
              "I can identify bullish and bearish crossovers",
              "I recognize MACD as a trend momentum indicator"
            ]}
            partId="macd-indicator"
            onPartComplete={createConfirmationHandler("macd-indicator")}
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
              Quiz: Technical Indicators Mastery
            </h3>
            <p className="text-blue-700">
              Test your understanding of Moving Averages, RSI, and MACD. Answer correctly to proceed to the next part!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 1: What is a Golden Cross?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) When gold prices go up</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) When 50-day SMA crosses above 200-day SMA</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) When RSI goes above 70</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 2: What does RSI &gt; 70 indicate?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) The stock is oversold</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) The stock is overbought</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) The stock is neutral</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 3: What is a bullish MACD crossover?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) MACD line crosses below signal line</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) MACD line crosses above signal line</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) RSI goes above 70</span>
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
                    <h4 className="font-semibold text-gray-800">Moving Averages</h4>
                    <p className="text-gray-600 text-sm">Help identify and confirm trends by smoothing price data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">RSI</h4>
                    <p className="text-gray-600 text-sm">Momentum gauge for overbought/oversold conditions and divergence.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">MACD</h4>
                    <p className="text-gray-600 text-sm">Provides clear buy/sell signals through crossovers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Combination Power</h4>
                    <p className="text-gray-600 text-sm">Use indicators together for stronger confirmation signals.</p>
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
              You've now mastered the essential technical indicators! In the upcoming lessons, you'll learn about:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Advanced Patterns</h4>
                <p className="text-blue-700 text-sm">Learn complex chart patterns and formations.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Volume Analysis</h4>
                <p className="text-green-700 text-sm">Combine price action with volume confirmation.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Risk Management</h4>
                <p className="text-purple-700 text-sm">Learn to protect your capital while trading.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Trading Strategies</h4>
                <p className="text-orange-700 text-sm">Combine all tools into complete trading systems.</p>
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
              <li>• Identify Golden Cross and Death Cross signals</li>
              <li>• Look for RSI overbought/oversold conditions</li>
              <li>• Practice spotting MACD crossovers</li>
              <li>• Combine multiple indicators for confirmation</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              ⚠️ Important Reminder
            </h3>
            <p className="text-red-700">
              Technical indicators are tools, not crystal balls. Their real power is unlocked when used in combination to confirm signals, 
              rather than in isolation. Always consider the overall market context and practice proper risk management.
            </p>
          </div>

          <ConfirmationCheck
            title="Final Understanding Check"
            description="Please confirm that you're ready to move forward:"
            checkboxes={[
              "I understand how to use Moving Averages",
              "I can interpret RSI signals",
              "I recognize MACD crossover patterns"
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
        description="Congratulations on completing the 'Essential Technical Indicators' lesson"
        lessonSlug="using-essential-technical-indicators-moving-averages-rsi-macd"
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
            You've successfully learned about essential technical indicators and demonstrated 
            your understanding through various interactive exercises. You're now ready to 
            learn about advanced patterns and trading strategies!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/advanced-technical-analysis"
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
      title="Using Essential Technical Indicators (Moving Averages, RSI, MACD)"
      description="Go beyond basic charts. This lesson will equip you with three of the most powerful and widely-used technical indicators: Moving Averages, the Relative Strength Index (RSI), and the Moving Average Convergence Divergence (MACD)."
      lessonSlug="using-essential-technical-indicators-moving-averages-rsi-macd"
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
