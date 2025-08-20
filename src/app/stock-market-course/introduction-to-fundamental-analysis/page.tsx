"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { useTranslation } from "@/hooks/useTranslation";
import { BookOpen, BarChart, FileText, Activity, Target, TrendingUp, CheckCircle } from 'lucide-react';

export default function IntroFundamentalAnalysisPage() {
    const { t } = useTranslation('stock-market-course.introduction-to-fundamental-analysis');
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
      title: "Introduction to Fundamental Analysis",
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
              In this lesson, you'll discover how to evaluate a company's financial health and intrinsic value, moving beyond just the stock price. Learn the art and science of fundamental analysis!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What is Fundamental Analysis?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fundamental analysis is a method of evaluating a security by examining related economic and financial factors to measure its intrinsic value. It's about understanding the business you're investing in.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The core belief is that the market price of a stock can be wrong in the short term. By calculating a company's intrinsic value, you can identify if a stock is currently overpriced or underpriced.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Find undervalued stocks</li>
                <li>• Understand business fundamentals</li>
                <li>• Make informed investment decisions</li>
                <li>• Long-term investment approach</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Requires thorough research</li>
                <li>• Market timing is less critical</li>
                <li>• Focus on long-term value</li>
                <li>• Consider multiple factors</li>
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
              title="Introduction to Fundamental Analysis - Audio Summary"
              description="Listen to a comprehensive audio summary of fundamental analysis, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/introduction-to-fundamental-analysis-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/introduction-to-fundamental-analysis-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/introduction-to-fundamental-analysis-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/introduction-to-fundamental-analysis-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/introduction-to-fundamental-analysis-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/introduction-to-fundamental-analysis-ta.m4a"
              hindiTranscript="फंडामेंटल एनालिसिस की ABCD - कंपनी की वित्तीय सेहत और आंतरिक मूल्य का मूल्यांकन। यह सिर्फ शेयर की कीमत से आगे जाकर व्यवसाय को समझने का तरीका है।"
              englishTranscript="Fundamental Analysis 101: Understanding Company Value Beyond Stock Price. Learn how to evaluate a company's financial health and intrinsic value through economic and financial factors. Discover the art and science of fundamental analysis!"
              bengaliTranscript="ফান্ডামেন্টাল অ্যানালাইসিস - কোম্পানির আর্থিক স্বাস্থ্য এবং অন্তর্নিহিত মূল্য মূল্যায়ন। শুধুমাত্র স্টক মূল্য নয়, ব্যবসার মৌলিক বিষয়গুলি বোঝার পদ্ধতি।"
              marathiTranscript="फंडामेंटल अॅनालिसिस - कंपनीचे आर्थिक आरोग्य आणि आंतर्गत मूल्य मूल्यांकन करण्याची पद्धत। फक्त स्टॉक किंमतीपेक्षा व्यवसाय समजून घेणे महत्वाचे आहे।"
              gujaratiTranscript="ફન્ડામેન્ટલ એનાલિસિસ - કંપનીની નાણાકીય સ્વાસ્થ્ય અને આંતરિક મૂલ્યનું મૂલ્યાંકન. માત્ર સ્ટોક કિંમતથી આગળ વધીને વ્યવસાયને સમજવાની પદ્ધતિ."
              tamilTranscript="அடிப்படை பகுப்பாய்வு - நிறுவனத்தின் நிதி நிலை மற்றும் உள்ளார்ந்த மதிப்பை மதிப்பிடுதல். பங்கு விலையைத் தாண்டி வணிகத்தைப் புரிந்துகொள்வதற்கான முறை."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand that fundamental analysis evaluates intrinsic value",
              "I recognize that market price can be wrong in the short term"
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
      id: "core-components",
      title: "Core Components of Fundamental Analysis",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              Understanding the Two Pillars
            </h3>
            <p className="text-yellow-700">
              Fundamental analysis combines both qualitative and quantitative factors to give you a complete picture of a company's value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="font-bold text-lg text-yellow-800 flex items-center mb-2">
                <BookOpen className="w-5 h-5 mr-2" />
                Qualitative Factors (The 'Art')
              </h3>
              <p className="text-gray-700 mb-4">
                These are the non-numerical aspects of a business, such as its business model, competitive advantage, and management quality.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Business Model</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Competitive Advantage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Management Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Brand Value</span>
                </div>
              </div>
          </div>
            
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-lg text-green-800 flex items-center mb-2">
                <BarChart className="w-5 h-5 mr-2" />
                Quantitative Factors (The 'Science')
              </h3>
              <p className="text-gray-700 mb-4">
                This involves digging into the numbers, primarily from the company's financial statements: the Balance Sheet, P&L Statement, and Cash Flow Statement.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Financial Ratios</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Revenue Growth</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Profit Margins</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Debt Levels</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Why Both Matter
            </h3>
            <p className="text-blue-700">
              Think of qualitative factors as the "story" behind the numbers. A company might have great financials, but if the business model is flawed or management is poor, 
              the numbers won't matter in the long run. Conversely, a great business model with poor financials might not be sustainable.
            </p>
          </div>

          <ConfirmationCheck
            title="Understanding Check"
            description="Please confirm your understanding of the core components:"
            checkboxes={[
              "I understand the difference between qualitative and quantitative factors",
              "I can identify examples of each type of factor"
            ]}
            partId="core-components"
            onPartComplete={createConfirmationHandler("core-components")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "key-documents",
      title: "Key Documents to Analyze",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              The Three Pillars of Financial Analysis
            </h3>
            <p className="text-purple-700">
              These three financial statements provide the foundation for fundamental analysis. Understanding them is crucial for making informed investment decisions.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <FileText className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">The Balance Sheet</h3>
                  <p className="text-gray-700 mb-4">
                    A snapshot of the company's assets, liabilities, and shareholder equity at a specific point in time. Think of it as a company's financial "photograph."
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-800 text-sm">Assets</h4>
                      <p className="text-blue-700 text-xs">What the company owns</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-red-800 text-sm">Liabilities</h4>
                      <p className="text-red-700 text-xs">What the company owes</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-green-800 text-sm">Equity</h4>
                      <p className="text-green-700 text-xs">Owner's investment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <Activity className="w-8 h-8 text-red-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">The Profit & Loss (P&L) Statement</h3>
                  <p className="text-gray-700 mb-4">
                    Shows the company's revenues, costs, and profits over a period of time. This is like a company's "income report card."
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-green-800 text-sm">Revenue</h4>
                      <p className="text-green-700 text-xs">Money coming in</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-orange-800 text-sm">Expenses</h4>
                      <p className="text-orange-700 text-xs">Money going out</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-800 text-sm">Net Income</h4>
                      <p className="text-blue-700 text-xs">Final profit/loss</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <TrendingUp className="w-8 h-8 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">The Cash Flow Statement</h3>
                  <p className="text-gray-700 mb-4">
                    Tracks how cash moves in and out of the business. This shows the company's ability to generate and manage cash.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-800 text-sm">Operating</h4>
                      <p className="text-blue-700 text-xs">Business activities</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-purple-800 text-sm">Investing</h4>
                      <p className="text-purple-700 text-xs">Asset purchases/sales</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-orange-800 text-sm">Financing</h4>
                      <p className="text-orange-700 text-xs">Debt/equity changes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              💡 Pro Tip
            </h3>
            <p className="text-yellow-700">
              Don't analyze these statements in isolation. Look at them together to get a complete picture. For example, 
              high profits on the P&L statement are great, but if the cash flow statement shows poor cash management, 
              there might be underlying issues.
            </p>
          </div>

          <ConfirmationCheck
            title="Document Understanding Check"
            description="Please confirm your understanding of the key financial documents:"
            checkboxes={[
              "I understand what each financial statement shows",
              "I recognize the importance of analyzing all three together"
            ]}
            partId="key-documents"
            onPartComplete={createConfirmationHandler("key-documents")}
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
              Quiz: Fundamental Analysis Basics
            </h3>
            <p className="text-blue-700">
              Test your understanding of the key concepts we've covered. Answer correctly to proceed to the next part!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 1: What is the main goal of fundamental analysis?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) To predict short-term stock price movements</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) To evaluate a company's intrinsic value</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) To follow market trends and momentum</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 2: Which of the following is a qualitative factor in fundamental analysis?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Company's debt-to-equity ratio</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Management quality and experience</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Revenue growth percentage</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 3: What does the Balance Sheet show?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Company's performance over time</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Cash flow in and out of the business</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Company's assets, liabilities, and equity at a point in time</span>
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
                  if (q3.value === 'c') score += 33.33;
                  
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
                    <h4 className="font-semibold text-gray-800">Intrinsic Value Focus</h4>
                    <p className="text-gray-600 text-sm">Fundamental analysis evaluates a company's intrinsic value based on its business fundamentals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Dual Approach</h4>
                    <p className="text-gray-600 text-sm">It combines both qualitative (business model, management) and quantitative (financial statements) factors.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-gray-800">Undervalued Opportunities</h4>
                    <p className="text-gray-600 text-sm">The goal is to find stocks that are undervalued by the market.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-gray-800">Long-term Perspective</h4>
                    <p className="text-gray-600 text-sm">Fundamental analysis is best suited for long-term investment strategies.</p>
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
              You've now mastered the basics of fundamental analysis! In the upcoming lessons, you'll dive deeper into:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Lesson 12: Reading the Balance Sheet</h4>
                <p className="text-blue-700 text-sm">Learn to analyze assets, liabilities, and equity in detail.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Lesson 13: Reading the P&L Statement</h4>
                <p className="text-green-700 text-sm">Understand revenue, costs, and profitability analysis.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Lesson 14: Reading the Cash Flow Statement</h4>
                <p className="text-purple-700 text-sm">Master cash flow analysis and management.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Lesson 15: Key Financial Ratios</h4>
                <p className="text-orange-700 text-sm">Learn essential ratios for company evaluation.</p>
              </div>
            </div>
                </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              💡 Practice Makes Perfect
            </h3>
            <p className="text-yellow-700">
              Start applying what you've learned by analyzing real companies. Pick a company you're interested in and try to:
            </p>
            <ul className="text-yellow-700 mt-3 space-y-1">
              <li>• Read their latest financial statements</li>
              <li>• Identify their business model and competitive advantages</li>
              <li>• Look for both qualitative and quantitative factors</li>
              <li>• Compare with competitors in the same industry</li>
            </ul>
        </div>

          <ConfirmationCheck
            title="Final Understanding Check"
            description="Please confirm that you're ready to move forward:"
            checkboxes={[
              "I understand the key concepts of fundamental analysis",
              "I'm ready to learn more about reading financial statements"
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
        description="Congratulations on completing the 'Introduction to Fundamental Analysis' lesson"
        lessonSlug="introduction-to-fundamental-analysis"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Target className="w-12 h-12 text-green-600" />
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
            You've successfully learned the fundamentals of fundamental analysis and demonstrated 
            your understanding through various interactive exercises. You're now ready to dive deeper 
            into reading financial statements!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/reading-the-balance-sheet"
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
      title="Introduction to Fundamental Analysis"
      description="Learn how to evaluate a company's financial health and intrinsic value, moving beyond just the stock price."
      lessonSlug="introduction-to-fundamental-analysis"
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
