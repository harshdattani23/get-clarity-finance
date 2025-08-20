"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { useTranslation } from "@/hooks/useTranslation";
import { TrendingUp, Target, CheckCircle, BarChart3, Activity, Zap, Layers } from 'lucide-react';

export default function AdvancedTechnicalAnalysisPage() {
  const { t } = useTranslation('stock-market-course.advanced-technical-analysis');
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
      title: "Advanced Technical Analysis",
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
              Deepen your technical analysis skills with Elliott Waves, Fibonacci retracements, and Volume Profile concepts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Advanced Concepts Overview
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              This module explores advanced technical analysis concepts that help identify market structure, potential reversal zones, and high-interest price areas.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              These advanced tools go beyond basic indicators and provide deeper insights into market psychology and structure.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-lg font-semibold text-green-800">
                Master these concepts to become an advanced technical analyst!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-800">Elliott Waves</h4>
              <p className="text-blue-700 text-sm">Market structure and psychology</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800">Fibonacci</h4>
              <p className="text-green-700 text-sm">Retracement and continuation zones</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
              <Layers className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-purple-800">Volume Profile</h4>
              <p className="text-purple-700 text-sm">Price-volume relationships</p>
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
              title="Advanced Technical Analysis - Audio Summary"
              description="Listen to a comprehensive audio summary of advanced technical analysis concepts, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-ta-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-ta-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-ta-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-ta-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-ta-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-ta-ta.m4a"
              hindiTranscript="उन्नत तकनीकी विश्लेषण - इलियट वेव्स, फिबोनैची रिट्रेसमेंट और वॉल्यूम प्रोफाइल की ABCD।"
              englishTranscript="Advanced Technical Analysis: Master Elliott Waves, Fibonacci retracements, and Volume Profile concepts for deeper market insights and better trading decisions."
              bengaliTranscript="উন্নত প্রযুক্তিগত বিশ্লেষণ - এলিয়ট ওয়েভস, ফিবোনাচি রিট্রেসমেন্ট এবং ভলিউম প্রোফাইল এর ABCD।"
              marathiTranscript="प्रगत तांत्रिक विश्लेषण - इलियट वेव्ह्स, फिबोनाची रिट्रेसमेंट आणि व्हॉल्यूम प्रोफाइल ची ABCD."
              gujaratiTranscript="ઉન્નત તકનીકી વિશ્લેષણ - એલિયટ વેવ્સ, ફિબોનાકી રિટ્રેસમેન્ટ અને વોલ્યુમ પ્રોફાઇલ ની ABCD."
              tamilTranscript="மேம்பட்ட தொழில்நுட்ப பகுப்பாய்வு - எலியட் அலைகள், ஃபிபோனாசி பின்வாங்கல் மற்றும் வால்யூம் புரோஃபைல் ABCD."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand what advanced technical analysis covers",
              "I recognize the three main advanced concepts"
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
      id: "elliott-waves",
      title: "Elliott Wave Theory",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Market Structure Framework
            </h3>
            <p className="text-green-700">
              Elliott Wave Theory views market prices as fractal wave structures driven by investor psychology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Impulse Waves</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Impulse waves move in the direction of the main trend, typically in five-wave structures.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">Characteristics:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• 5-wave structure (1-2-3-4-5)</li>
                  <li>• Wave 3 is usually the strongest</li>
                  <li>• Wave 4 doesn't overlap with Wave 1</li>
                  <li>• Shows trend continuation</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Corrective Waves</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Corrective waves move against the main trend, typically in three-wave structures.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="font-semibold text-red-800 mb-2">Characteristics:</h5>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• 3-wave structure (A-B-C)</li>
                  <li>• Wave B retraces Wave A</li>
                  <li>• Wave C completes the correction</li>
                  <li>• Shows trend pause/reversal</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              💡 Key Insight
            </h3>
            <p className="text-yellow-700">
              Wave patterns repeat at multiple timeframes, creating a fractal market structure. The same patterns you see on a daily chart 
              can appear on hourly, weekly, or even monthly charts, just at different scales.
            </p>
          </div>

          <ConfirmationCheck
            title="Elliott Waves Understanding Check"
            description="Please confirm your understanding of Elliott Wave Theory:"
            checkboxes={[
              "I understand what impulse waves are",
              "I understand what corrective waves are",
              "I recognize the fractal nature of waves"
            ]}
            partId="elliott-waves"
            onPartComplete={createConfirmationHandler("elliott-waves")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "fibonacci-retracements",
      title: "Fibonacci Retracements",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              Natural Retracement Levels
            </h3>
            <p className="text-purple-700">
              Use Fibonacci ratios to anticipate potential pullback and continuation zones based on natural mathematical relationships.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Key Fibonacci Levels
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">23.6% Retracement</h4>
                <p className="text-green-700 text-sm">
                  Shallow pullback often seen in strong trends. Indicates minimal selling pressure and strong trend continuation.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">38.2% Retracement</h4>
                <p className="text-blue-700 text-sm">
                  Common retracement level offering potential entries. Many traders use this as a key support/resistance level.
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">50.0% Retracement</h4>
                <p className="text-orange-700 text-sm">
                  Psychological level where price often finds support or resistance. Not a Fibonacci ratio but widely watched.
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">61.8% Retracement</h4>
                <p className="text-red-700 text-sm">
                  Deep retracement level. If price goes beyond this, the trend may be in trouble.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              🔍 How to Use Fibonacci
            </h3>
            <p className="text-blue-700">
              Draw Fibonacci retracements from swing high to swing low (in uptrends) or swing low to swing high (in downtrends). 
              These levels often act as support/resistance and can help identify potential entry and exit points.
            </p>
          </div>

          <ConfirmationCheck
            title="Fibonacci Understanding Check"
            description="Please confirm your understanding of Fibonacci retracements:"
            checkboxes={[
              "I understand the key Fibonacci levels",
              "I recognize how to use them for trading",
              "I understand they show natural retracement zones"
            ]}
            partId="fibonacci-retracements"
            onPartComplete={createConfirmationHandler("fibonacci-retracements")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "volume-profile",
      title: "Volume Profile Analysis",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">
              Price-Volume Relationships
            </h3>
            <p className="text-orange-700">
              Analyze traded volume at price levels to find zones of support/resistance and understand market interest.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Core Volume Profile Concepts
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">POC (Point of Control)</h4>
                  <p className="text-blue-700 text-sm">
                    Price level with the highest traded volume. Often acts as strong support/resistance.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">VAH (Value Area High)</h4>
                  <p className="text-green-700 text-sm">
                    Upper bound of the value area where significant volume occurred. Upper resistance zone.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">VAL (Value Area Low)</h4>
                  <p className="text-purple-700 text-sm">
                    Lower bound of the value area indicating demand. Lower support zone.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                How Volume Profile Works
              </h3>
              <p className="text-gray-700 mb-4">
                Volume Profile shows you where the most trading activity occurred at each price level. Areas with high volume 
                indicate strong market interest and often act as support or resistance levels.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Key Benefits:</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Identify high-interest price levels</li>
                  <li>• Find strong support/resistance zones</li>
                  <li>• Understand market structure</li>
                  <li>• Improve entry/exit timing</li>
                </ul>
              </div>
            </div>
          </div>

          <ConfirmationCheck
            title="Volume Profile Understanding Check"
            description="Please confirm your understanding of Volume Profile:"
            checkboxes={[
              "I understand what POC, VAH, and VAL represent",
              "I recognize how volume relates to price levels",
              "I understand the benefits of Volume Profile analysis"
            ]}
            partId="volume-profile"
            onPartComplete={createConfirmationHandler("volume-profile")}
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
              Quiz: Advanced Technical Analysis Mastery
            </h3>
            <p className="text-blue-700">
              Test your understanding of Elliott Waves, Fibonacci retracements, and Volume Profile. Answer correctly to proceed to the next part!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 1: How many waves are in an Elliott Wave impulse pattern?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) 3 waves</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) 5 waves</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) 7 waves</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 2: What does the 38.2% Fibonacci retracement level represent?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) A shallow pullback in strong trends</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) A common retracement level offering potential entries</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) A deep retracement indicating trend trouble</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 3: What does POC stand for in Volume Profile analysis?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Point of Control</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Price of Control</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Point of Change</span>
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
                    <h4 className="font-semibold text-gray-800">Elliott Waves</h4>
                    <p className="text-gray-600 text-sm">Describe impulse and corrective market structures.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Fibonacci Retracements</h4>
                    <p className="text-gray-600 text-sm">Highlight likely pullback and continuation zones.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Volume Profile</h4>
                    <p className="text-gray-600 text-sm">Reveals price levels with strong market interest.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Combination Power</h4>
                    <p className="text-gray-600 text-sm">Use tools together for confluence, not in isolation.</p>
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
              You've now mastered advanced technical analysis! In the upcoming lessons, you'll learn about:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Trading Strategies</h4>
                <p className="text-blue-700 text-sm">Combine all tools into complete trading systems.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Risk Management</h4>
                <p className="text-green-700 text-sm">Learn to protect your capital while trading.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Portfolio Management</h4>
                <p className="text-purple-700 text-sm">Build and manage a diversified investment portfolio.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Advanced Derivatives</h4>
                <p className="text-orange-700 text-sm">Learn about options, futures, and complex strategies.</p>
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
              <li>• Identify Elliott Wave patterns on different timeframes</li>
              <li>• Draw Fibonacci retracements on trending stocks</li>
              <li>• Analyze Volume Profile for support/resistance</li>
              <li>• Combine multiple tools for stronger signals</li>
                </ul>
              </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              ⚠️ Important Reminder
            </h3>
            <p className="text-red-700">
              Advanced technical analysis tools are sophisticated and require practice to master. Start with simple applications 
              and gradually build complexity. Always use proper risk management and remember that no tool guarantees profits.
            </p>
          </div>

          <ConfirmationCheck
            title="Final Understanding Check"
            description="Please confirm that you're ready to move forward:"
            checkboxes={[
              "I understand Elliott Wave Theory basics",
              "I can identify Fibonacci retracement levels",
              "I recognize Volume Profile concepts"
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
        description="Congratulations on completing the 'Advanced Technical Analysis' lesson"
        lessonSlug="advanced-technical-analysis"
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
            You've successfully learned advanced technical analysis concepts and demonstrated 
            your understanding through various interactive exercises. You're now ready to 
            learn about trading strategies and portfolio management!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/advanced-option-strategies"
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
      title="Advanced Technical Analysis"
      description="Deepen your TA skills with Elliott Waves, Fibonacci retracements, and Volume Profile concepts."
      lessonSlug="advanced-technical-analysis"
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
