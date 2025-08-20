"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { useTranslation } from "@/hooks/useTranslation";
import { TrendingUp, TrendingDown, DollarSign, Target, Calculator, BarChart3, CheckCircle, Activity } from 'lucide-react';

export default function ReadingPandLStatementPage() {
    const { t } = useTranslation('stock-market-course.reading-the-profit-loss-p&l-statement');
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
      title: "Reading the Profit & Loss (P&L) Statement",
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
              In this lesson, you'll understand how to read a P&L statement to see how profitable a company has been over a period of time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What is the P&L Statement?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Profit & Loss (P&L) statement, or Income Statement, summarizes a company's revenues, costs, and expenses over a specific period. It shows how profitable a company is.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The P&L statement follows a simple formula: <strong>Revenue - Expenses = Net Income</strong>.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-lg font-semibold text-green-800">
                Think of it as a company's "income report card" - it tells you how well the company performed financially over a specific time period.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Understand profitability</li>
                <li>• Track performance over time</li>
                <li>• Compare with competitors</li>
                <li>• Identify trends</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Shows period performance</li>
                <li>• Different from balance sheet</li>
                <li>• Look for consistency</li>
                <li>• Consider seasonality</li>
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
              title="Reading the P&L Statement - Audio Summary"
              description="Listen to a comprehensive audio summary of how to read P&L statements, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-p&l-statement-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-p&l-statement-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-p&l-statement-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-p&l-statement-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-p&l-statement-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-p&l-statement-ta.m4a"
              hindiTranscript="P&L स्टेटमेंट पढ़ने की कला - कंपनी की लाभप्रदता और परिचालन दक्षता को समझें। राजस्व से लेकर शुद्ध आय तक का विश्लेषण।"
              englishTranscript="Master the P&L Statement: Your Guide to Company Profitability. Learn to read and understand revenue, costs, expenses, and net income. Discover how to analyze operational efficiency and profitability trends!"
              bengaliTranscript="P&L স্টেটমেন্ট পড়ার শিল্প - কোম্পানির লাভজনকতা এবং পরিচালন দক্ষতা বুঝুন। রাজস্ব থেকে নেট আয় পর্যন্ত বিশ্লেষণ।"
              marathiTranscript="P&L स्टेटमेंट वाचण्याची कला - कंपनीची लाभदायकता आणि परिचालन कार्यक्षमता समजून घ्या. महसूल ते निव्वळ उत्पन्न पर्यंतचे विश्लेषण."
              gujaratiTranscript="P&L સ્ટેટમેન્ટ વાંચવાની કલા - કંપનીની નફાકારકતા અને ઓપરેશનલ કાર્યક્ષમતા સમજો. ર venueજ્યથી નેટ આવક સુધીનું વિશ્લેષણ."
              tamilTranscript="P&L அறிக்கையைப் படிக்கும் கலை - நிறுவனத்தின் லாபம் மற்றும் செயல்பாட்டு திறனைப் புரிந்துகொள்ளுங்கள். வருவாய் முதல் நிகர வருமானம் வரை பகுப்பாய்வு."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand what a P&L statement shows",
              "I recognize the basic formula: Revenue - Expenses = Net Income"
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
      id: "key-components",
      title: "Key Components of the P&L Statement",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              From Top Line to Bottom Line
            </h3>
            <p className="text-purple-700">
              The P&L statement flows from revenue at the top to net income at the bottom, with each line item building on the previous one.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <TrendingUp className="w-8 h-8 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">Revenue (Top Line)</h3>
                  <p className="text-gray-700 mb-4">
                    The total amount of money generated from sales. This is the starting point and represents the company's ability to generate business.
                  </p>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-800 text-sm">Examples:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Product sales</li>
                      <li>• Service fees</li>
                      <li>• Subscription revenue</li>
                      <li>• Licensing fees</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <TrendingDown className="w-8 h-8 text-red-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">Cost of Goods Sold (COGS)</h3>
                  <p className="text-gray-700 mb-4">
                    Direct costs related to producing goods or delivering services. These are the costs that directly relate to what you're selling.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-red-800 text-sm">Examples:</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Raw materials</li>
                      <li>• Direct labor</li>
                      <li>• Manufacturing costs</li>
                      <li>• Direct service costs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <Calculator className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0 mt-1" />
      <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">Gross Profit</h3>
 <p className="text-gray-700 mb-4">
                    Revenue minus COGS. This shows how efficiently the company produces goods or delivers services.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-800 text-sm">Formula:</h4>
                    <p className="text-blue-700 text-sm font-mono">Gross Profit = Revenue - COGS</p>
                    <p className="text-blue-700 text-xs mt-1">Higher gross profit margins indicate better production efficiency.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <DollarSign className="w-8 h-8 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">Net Income (Bottom Line)</h3>
                  <p className="text-gray-700 mb-4">
                    The final profit after all expenses, including taxes and interest, are deducted. This is what's left for shareholders.
                  </p>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-800 text-sm">What it includes:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Operating expenses</li>
                      <li>• Interest expenses</li>
                      <li>• Tax expenses</li>
                      <li>• Other income/expenses</li>
          </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              💡 Key Insight
            </h3>
            <p className="text-yellow-700">
              The P&L statement is like a company's "income story" - it tells you not just how much money came in, but how efficiently the company converted that revenue into profit. 
              Look for companies with growing revenue AND improving profit margins.
            </p>
          </div>

          <ConfirmationCheck
            title="Understanding Check"
            description="Please confirm your understanding of the key components:"
            checkboxes={[
              "I understand the flow from revenue to net income",
              "I can identify the purpose of each component"
            ]}
            partId="key-components"
            onPartComplete={createConfirmationHandler("key-components")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "sample-analysis",
      title: "Sample P&L Statement Analysis",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Real-World Example
            </h3>
            <p className="text-green-700">
              Let's analyze a sample P&L statement to understand how all the components work together.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Sample P&L Statement
            </h3>
          <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
              <thead>
                  <tr className="bg-gray-200">
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-800">Particulars</th>
                    <th className="py-3 px-4 border-b text-right font-semibold text-gray-800">Amount (in ₹)</th>
                    <th className="py-3 px-4 border-b text-center font-semibold text-gray-800">Analysis</th>
                </tr>
              </thead>
              <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-semibold text-green-700">Revenue</td>
                    <td className="py-3 px-4 text-right font-mono">1,000,000</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Top line - total sales</td>
                </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-red-700">Cost of Goods Sold (COGS)</td>
                    <td className="py-3 px-4 text-right font-mono text-red-700">(600,000)</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Direct production costs</td>
                </tr>
                  <tr className="border-b bg-green-50">
                    <td className="py-3 px-4 font-bold text-green-800">Gross Profit</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-green-800">400,000</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Revenue - COGS</td>
                </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-red-700">Operating Expenses</td>
                    <td className="py-3 px-4 text-right font-mono text-red-700">(150,000)</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Admin, marketing, etc.</td>
                </tr>
                  <tr className="border-b bg-blue-50">
                    <td className="py-3 px-4 font-bold text-blue-800">Profit Before Tax (PBT)</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-blue-800">250,000</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Gross Profit - Expenses</td>
                </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-red-700">Tax</td>
                    <td className="py-3 px-4 text-right font-mono text-red-700">(50,000)</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Income tax</td>
                </tr>
                  <tr className="bg-green-100">
                    <td className="py-3 px-4 font-bold text-green-800 text-lg">Net Income</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-green-800 text-lg">200,000</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Bottom line - final profit</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Key Calculations</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Gross Profit Margin:</span>
                  <span className="font-semibold text-blue-600">40%</span>
                </div>
                <div className="text-xs text-gray-600">400,000 ÷ 1,000,000 × 100</div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Net Profit Margin:</span>
                  <span className="font-semibold text-blue-600">20%</span>
                </div>
                <div className="text-xs text-gray-600">200,000 ÷ 1,000,000 × 100</div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Expense Ratio:</span>
                  <span className="font-semibold text-blue-600">15%</span>
                </div>
                <div className="text-xs text-gray-600">150,000 ÷ 1,000,000 × 100</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">What This Tells Us</h4>
              <ul className="text-yellow-700 text-sm space-y-2">
                <li>• <strong>Good gross margin:</strong> 40% indicates efficient production</li>
                <li>• <strong>Reasonable expenses:</strong> 15% of revenue is manageable</li>
                <li>• <strong>Healthy net margin:</strong> 20% is quite good</li>
                <li>• <strong>Tax efficiency:</strong> 20% tax rate is reasonable</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              🚨 Red Flags to Watch For
            </h3>
            <ul className="text-purple-700 space-y-2">
              <li>• <strong>Declining gross margins:</strong> May indicate pricing pressure or rising costs</li>
              <li>• <strong>Rising expense ratios:</strong> Could signal operational inefficiency</li>
              <li>• <strong>Inconsistent profitability:</strong> Look for stable trends over time</li>
              <li>• <strong>High tax rates:</strong> May indicate poor tax planning</li>
            </ul>
          </div>

          <ConfirmationCheck
            title="Analysis Understanding Check"
            description="Please confirm your understanding of P&L analysis:"
            checkboxes={[
              "I can read and understand a P&L statement",
              "I understand how to calculate key ratios"
            ]}
            partId="sample-analysis"
            onPartComplete={createConfirmationHandler("sample-analysis")}
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
              Quiz: P&L Statement Mastery
            </h3>
            <p className="text-blue-700">
              Test your understanding of P&L statements and profitability analysis. Answer correctly to proceed to the next part!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 1: What is the "top line" in a P&L statement?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Net Income</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Revenue</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Gross Profit</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 2: How do you calculate Gross Profit?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Revenue - Operating Expenses</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Revenue - Cost of Goods Sold</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Revenue - Taxes</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 3: What does a declining gross profit margin typically indicate?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) The company is becoming more profitable</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) The company is becoming less efficient</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) The company has no expenses</span>
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
                    <h4 className="font-semibold text-gray-800">Performance Over Time</h4>
                    <p className="text-gray-600 text-sm">The P&L statement shows a company's financial performance over a period.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Top to Bottom Flow</h4>
                    <p className="text-gray-600 text-sm">It starts with the 'top line' (Revenue) and ends with the 'bottom line' (Net Income).</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Profitability Analysis</h4>
                    <p className="text-gray-600 text-sm">Analyzing the P&L helps you understand profitability and operational efficiency.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Growth Indicators</h4>
                    <p className="text-gray-600 text-sm">Look for consistent growth in both revenue and net income.</p>
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
              You've now mastered reading P&L statements! In the upcoming lessons, you'll learn about:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Lesson 14: Reading the Cash Flow Statement</h4>
                <p className="text-blue-700 text-sm">Learn to analyze how cash moves through the business.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Lesson 15: Key Financial Ratios</h4>
                <p className="text-green-700 text-sm">Master essential ratios for comprehensive analysis.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Advanced Analysis</h4>
                <p className="text-purple-700 text-sm">Combine all statements for complete company evaluation.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Industry Comparison</h4>
                <p className="text-orange-700 text-sm">Learn to benchmark companies against industry standards.</p>
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
              <li>• Download their latest P&L statement from their website</li>
              <li>• Calculate gross profit and net profit margins</li>
              <li>• Compare margins with competitors in the same industry</li>
              <li>• Look for trends over the past few years</li>
          </ul>
          </div>

          <ConfirmationCheck
            title="Final Understanding Check"
            description="Please confirm that you're ready to move forward:"
            checkboxes={[
              "I understand how to read and analyze P&L statements",
              "I'm ready to learn about cash flow statements and financial ratios"
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
        description="Congratulations on completing the 'Reading the P&L Statement' lesson"
        lessonSlug="reading-the-profit-loss-p&l-statement"
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
            You've successfully learned how to read and analyze P&L statements and demonstrated 
            your understanding through various interactive exercises. You're now ready to dive deeper 
            into cash flow analysis and financial ratios!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/reading-the-cash-flow-statement"
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
      title="Reading the Profit & Loss (P&L) Statement"
      description="Understand how to read a P&L statement to see how profitable a company has been over a period of time."
      lessonSlug="reading-the-profit-loss-p&l-statement"
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
