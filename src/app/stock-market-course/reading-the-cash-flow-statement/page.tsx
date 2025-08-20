"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { useTranslation } from "@/hooks/useTranslation";
import { TrendingUp, TrendingDown, DollarSign, Target, Calculator, BarChart3, CheckCircle, Activity, ArrowUpDown } from 'lucide-react';

export default function ReadingCashFlowStatementPage() {
    const { t } = useTranslation('stock-market-course.reading-the-cash-flow-statement');
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
      title: "Reading the Cash Flow Statement",
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
              In this lesson, you'll learn to analyze the Cash Flow Statement to see how a company is generating and using cash.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What is the Cash Flow Statement?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Cash Flow Statement (CFS) provides a detailed look at all the cash that comes into and goes out of a company over a specific period. It deals only with cash and is crucial for understanding a company's liquidity.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              It's often said that 'cash is king,' and this statement tells you exactly where the cash is coming from and where it's going.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-lg font-semibold text-green-800">
                Think of it as a company's "cash diary" - it tracks every rupee that flows in and out, showing the company's ability to generate and manage cash.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Understand cash generation</li>
                <li>• Assess liquidity</li>
                <li>• Identify cash burn</li>
                <li>• Evaluate sustainability</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Shows actual cash movement</li>
                <li>• Different from P&L statement</li>
                <li>• Critical for survival</li>
                <li>• Reveals hidden issues</li>
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
              title="Reading the Cash Flow Statement - Audio Summary"
              description="Listen to a comprehensive audio summary of how to read cash flow statements, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-cash-flow-statement-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-cash-flow-statement-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-cash-flow-statement-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-cash-flow-statement-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-cash-flow-statement-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-cash-flow-statement-ta.m4a"
              hindiTranscript="नकदी प्रवाह विवरण पढ़ने की कला - कंपनी की तरलता और नकदी प्रबंधन को समझें। परिचालन, निवेश और वित्तपोषण गतिविधियों का विश्लेषण।"
              englishTranscript="Master the Cash Flow Statement: Your Guide to Company Liquidity. Learn to read and understand operating, investing, and financing cash flows. Discover how to assess a company's cash generation and management!"
              bengaliTranscript="নগদ প্রবাহ বিবরণী পড়ার শিল্প - কোম্পানির তরলতা এবং নগদ ব্যবস্থাপনা বুঝুন। পরিচালনা, বিনিয়োগ এবং অর্থায়ন কার্যক্রমের বিশ্লেষণ।"
              marathiTranscript="रोख प्रवाह विवरण वाचण्याची कला - कंपनीची तरलता आणि रोख व्यवस्थापन समजून घ्या. परिचालन, गुंतवणूक आणि वित्तपुरवठा क्रियाकलापांचे विश्लेषण."
              gujaratiTranscript="રોકડ પ્રવાહ નિવેદન વાંચવાની કલા - કંપનીની તરલતા અને રોકડ વ્યવસ્થાપન સમજો. ઓપરેટિંગ, રોકાણ અને નાણાકીય પ્રવૃત્તિઓનું વિશ્લેષણ."
              tamilTranscript="பணப்புழக்க அறிக்கையைப் படிக்கும் கலை - நிறுவனத்தின் பணப்புழக்கம் மற்றும் பண மேலாண்மையைப் புரிந்துகொள்ளுங்கள். செயல்பாடு, முதலீடு மற்றும் நிதியளிப்பு நடவடிக்கைகளின் பகுப்பாய்வு."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand what a cash flow statement shows",
              "I recognize that cash flow is different from profit"
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
      id: "three-sections",
      title: "The Three Sections of the Cash Flow Statement",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              Understanding Cash Flow Categories
            </h3>
            <p className="text-purple-700">
              The Cash Flow Statement is divided into three main sections, each telling a different part of the company's cash story.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <Activity className="w-8 h-8 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">Cash Flow from Operating Activities (CFO)</h3>
                  <p className="text-gray-700 mb-4">
                    Cash generated from a company's normal business operations. A positive CFO is a strong sign of financial health.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 text-sm mb-2">What it includes:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Net Income (from P&L statement)</li>
                      <li>• Depreciation & Amortization (added back)</li>
                      <li>• Changes in working capital</li>
                      <li>• Operating cash receipts and payments</li>
                    </ul>
                  </div>
                  <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-700 text-sm">
                      <strong>Why it matters:</strong> This shows if the company can generate cash from its core business operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <TrendingUp className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0 mt-1" />
      <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">Cash Flow from Investing Activities (CFI)</h3>
                  <p className="text-gray-700 mb-4">
                    Cash used for or generated from a company's investments, such as the purchase or sale of assets.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 text-sm mb-2">What it includes:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Purchase of property, plant & equipment</li>
                      <li>• Sale of assets</li>
                      <li>• Acquisitions of other companies</li>
                      <li>• Investments in securities</li>
                    </ul>
                  </div>
                  <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
                    <p className="text-yellow-700 text-sm">
                      <strong>Note:</strong> Negative CFI is often normal for growing companies as they invest in future growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <ArrowUpDown className="w-8 h-8 text-purple-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3">Cash Flow from Financing Activities (CFF)</h3>
                  <p className="text-gray-700 mb-4">
                    Cash flow between a company and its owners and creditors, including issuing stock and paying dividends.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 text-sm mb-2">What it includes:</h4>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Issuance of new shares</li>
                      <li>• Repurchase of shares</li>
                      <li>• Borrowing money (debt)</li>
                      <li>• Repaying debt</li>
                      <li>• Paying dividends</li>
          </ul>
                  </div>
                  <div className="mt-3 bg-orange-50 p-3 rounded-lg">
                    <p className="text-orange-700 text-sm">
                      <strong>Key insight:</strong> This shows how the company funds its operations and growth.
                    </p>
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
              The three sections work together to tell the complete cash story: Operating activities generate cash, 
              investing activities use cash for growth, and financing activities show how the company funds its operations. 
              A healthy company typically has positive operating cash flow.
            </p>
          </div>

          <ConfirmationCheck
            title="Understanding Check"
            description="Please confirm your understanding of the three sections:"
            checkboxes={[
              "I understand the purpose of each cash flow section",
              "I can identify examples of activities in each section"
            ]}
            partId="three-sections"
            onPartComplete={createConfirmationHandler("three-sections")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "sample-analysis",
      title: "Sample Cash Flow Statement Analysis",
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
              Let's analyze a sample cash flow statement to understand how all the sections work together.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Sample Cash Flow Statement
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
                  <tr className="border-b bg-green-50">
                    <td className="py-3 px-4 font-bold text-green-800" colSpan={2}>Cash Flow from Operating Activities</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Core business cash generation</td>
                </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 pl-8">Net Income</td>
                    <td className="py-3 px-4 text-right font-mono">200,000</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Starting point from P&L</td>
                </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 pl-8">Depreciation</td>
                    <td className="py-3 px-4 text-right font-mono">25,000</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Non-cash expense added back</td>
                </tr>
                  <tr className="border-b bg-green-100">
                    <td className="py-3 px-4 font-bold text-green-800">Net Cash from Operating Activities</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-green-800">225,000</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Positive - good sign!</td>
                </tr>
                  <tr className="border-b bg-blue-50">
                    <td className="py-3 px-4 font-bold text-blue-800" colSpan={2}>Cash Flow from Investing Activities</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Asset investments</td>
                </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 pl-8">Purchase of Equipment</td>
                    <td className="py-3 px-4 text-right font-mono text-red-700">(150,000)</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Cash outflow for growth</td>
                </tr>
                  <tr className="border-b bg-blue-100">
                    <td className="py-3 px-4 font-bold text-blue-800">Net Cash from Investing Activities</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-blue-800">(150,000)</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Negative - investing in future</td>
                </tr>
                  <tr className="border-b bg-purple-50">
                    <td className="py-3 px-4 font-bold text-purple-800" colSpan={2}>Cash Flow from Financing Activities</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Funding sources</td>
                </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 pl-8">Issuance of Debt</td>
                    <td className="py-3 px-4 text-right font-mono text-green-700">50,000</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Borrowing money</td>
                </tr>
                  <tr className="border-b bg-purple-100">
                    <td className="py-3 px-4 font-bold text-purple-800">Net Cash from Financing Activities</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-purple-800">50,000</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Positive - external funding</td>
                </tr>
                  <tr className="bg-blue-100">
                    <td className="py-3 px-4 font-bold text-blue-800 text-lg">Net Increase in Cash</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-blue-800 text-lg">125,000</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">Overall cash position improved</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Key Insights from This Example</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-blue-800">Strong Operations:</span>
                    <p className="text-blue-700 text-xs">₹225,000 positive operating cash flow</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-blue-800">Growth Investment:</span>
                    <p className="text-blue-700 text-xs">₹150,000 invested in equipment</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-blue-800">External Funding:</span>
                    <p className="text-blue-700 text-xs">₹50,000 borrowed for growth</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">What This Tells Us</h4>
              <ul className="text-yellow-700 text-sm space-y-2">
                <li>• <strong>Healthy business:</strong> Generates cash from operations</li>
                <li>• <strong>Growth focused:</strong> Investing in future capabilities</li>
                <li>• <strong>Well managed:</strong> Uses debt strategically</li>
                <li>• <strong>Cash positive:</strong> Overall cash position improved</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              🚨 Red Flags to Watch For
            </h3>
            <ul className="text-red-700 space-y-2">
              <li>• <strong>Negative operating cash flow:</strong> Company may not be generating cash from core business</li>
              <li>• <strong>Excessive debt financing:</strong> Could indicate cash flow problems</li>
              <li>• <strong>Declining operating cash flow:</strong> May signal operational issues</li>
              <li>• <strong>Cash burn rate:</strong> High negative cash flow without clear path to profitability</li>
            </ul>
          </div>

          <ConfirmationCheck
            title="Analysis Understanding Check"
            description="Please confirm your understanding of cash flow analysis:"
            checkboxes={[
              "I can read and understand a cash flow statement",
              "I understand what each section reveals about the company"
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
              Quiz: Cash Flow Statement Mastery
            </h3>
            <p className="text-blue-700">
              Test your understanding of cash flow statements and liquidity analysis. Answer correctly to proceed to the next part!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 1: What is the most important section of the cash flow statement?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Investing Activities</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Operating Activities</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Financing Activities</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 2: What does a negative cash flow from investing activities typically indicate?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) The company is in financial trouble</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) The company is investing in growth</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) The company has no assets</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 3: Why is depreciation added back to net income in the operating cash flow section?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Because depreciation is a cash expense</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Because depreciation is not a cash expense</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Because depreciation increases cash flow</span>
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
                    <h4 className="font-semibold text-gray-800">Cash Generation</h4>
                    <p className="text-gray-600 text-sm">The CFS shows how a company generates and uses cash.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Three Sections</h4>
                    <p className="text-gray-600 text-sm">It is divided into Operating, Investing, and Financing activities.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Operating Cash Flow</h4>
                    <p className="text-gray-600 text-sm">A strong, positive Cash Flow from Operations is a vital sign of a healthy business.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Transparency</h4>
                    <p className="text-gray-600 text-sm">The CFS provides a more transparent picture of a company's health than the P&L statement alone.</p>
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
              You've now mastered reading cash flow statements! In the upcoming lessons, you'll learn about:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Lesson 15: Key Financial Ratios</h4>
                <p className="text-blue-700 text-sm">Master essential ratios for comprehensive analysis.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Advanced Analysis</h4>
                <p className="text-green-700 text-sm">Combine all statements for complete company evaluation.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Industry Comparison</h4>
                <p className="text-purple-700 text-sm">Learn to benchmark companies against industry standards.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Valuation Techniques</h4>
                <p className="text-orange-700 text-sm">Learn methods to determine company value.</p>
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
              <li>• Download their latest cash flow statement from their website</li>
              <li>• Analyze the three sections separately</li>
              <li>• Compare operating cash flow with net income</li>
              <li>• Look for trends over the past few years</li>
          </ul>
          </div>

          <ConfirmationCheck
            title="Final Understanding Check"
            description="Please confirm that you're ready to move forward:"
            checkboxes={[
              "I understand how to read and analyze cash flow statements",
              "I'm ready to learn about financial ratios and advanced analysis"
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
        description="Congratulations on completing the 'Reading the Cash Flow Statement' lesson"
        lessonSlug="reading-the-cash-flow-statement"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <ArrowUpDown className="w-12 h-12 text-green-600" />
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
            You've successfully learned how to read and analyze cash flow statements and demonstrated 
            your understanding through various interactive exercises. You're now ready to dive deeper 
            into financial ratios and advanced analysis!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/using-key-financial-ratios-eps-p"
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
      title="Reading the Cash Flow Statement"
      description="Learn to analyze the Cash Flow Statement to see how a company is generating and using cash."
      lessonSlug="reading-the-cash-flow-statement"
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
