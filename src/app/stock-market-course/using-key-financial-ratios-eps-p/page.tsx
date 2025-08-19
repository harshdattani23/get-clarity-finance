"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { useTranslation } from "@/hooks/useTranslation";
import { Calculator, TrendingUp, Target, BarChart3, CheckCircle, DollarSign, Activity, BookOpen } from 'lucide-react';

export default function KeyFinancialRatiosPage() {
  const { t } = useTranslation('stock-market-course.using-key-financial-ratios-eps-p.e-p.b-roe');
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
      title: "Using Key Financial Ratios (EPS, P/E, P/B, ROE)",
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
              Unlock the stories hidden in the numbers. This lesson will teach you how to use four of the most powerful financial ratios to evaluate a company's health, profitability, and value.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Why Financial Ratios Matter
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Financial statements are full of raw data. To make sense of it, we use <strong>financial ratios</strong>. These are simple calculations that help us compare companies, analyze performance, and make informed investment decisions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Think of ratios as the "translator" between raw numbers and meaningful insights. They help you understand if a company is performing well, if it's fairly valued, and how it compares to competitors.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-lg font-semibold text-green-800">
                Let's dive into four essential ratios that every investor should know!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Compare companies easily</li>
                <li>• Identify undervalued stocks</li>
                <li>• Assess company performance</li>
                <li>• Make informed decisions</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Use ratios together</li>
                <li>• Compare with industry</li>
                <li>• Look for trends</li>
                <li>• Consider context</li>
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
              title="Key Financial Ratios - Audio Summary"
              description="Listen to a comprehensive audio summary of key financial ratios, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/key-financial-ratios-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/key-financial-ratios-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/key-financial-ratios-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/key-financial-ratios-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/key-financial-ratios-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/key-financial-ratios-ta.m4a"
              hindiTranscript="मुख्य वित्तीय अनुपात - EPS, P/E, P/B, ROE की ABCD। कंपनी की लाभप्रदता, मूल्यांकन और दक्षता का विश्लेषण करने के लिए इन अनुपातों का उपयोग करें।"
              englishTranscript="Master Key Financial Ratios: Your Guide to Company Analysis. Learn EPS, P/E, P/B, and ROE ratios to evaluate profitability, valuation, and efficiency. Discover how to use these powerful tools for informed investment decisions!"
              bengaliTranscript="মূল আর্থিক অনুপাত - EPS, P/E, P/B, ROE এর ABCD। কোম্পানির লাভজনকতা, মূল্যায়ন এবং দক্ষতা বিশ্লেষণের জন্য এই অনুপাতগুলি ব্যবহার করুন।"
              marathiTranscript="मुख्य आर्थिक गुणोत्तरे - EPS, P/E, P/B, ROE ची ABCD। कंपनीची नफाकारकता, मूल्यांकन आणि कार्यक्षमता विश्लेषणासाठी या गुणोत्तरांचा वापर करा।"
              gujaratiTranscript="મુખ્ય નાણાકીય ગુણોત્તર - EPS, P/E, P/B, ROE ની ABCD. કંપનીની નફાકારકતા, મૂલ્યાંકન અને કાર્યક્ષમતાનું વિશ્લેષણ કરવા માટે આ ગુણોત્તરોનો ઉપયોગ કરો."
              tamilTranscript="முக்கிய நிதி விகிதங்கள் - EPS, P/E, P/B, ROE இன் ABCD. நிறுவனத்தின் லாபம், மதிப்பீடு மற்றும் திறனை பகுப்பாய்வு செய்ய இந்த விகிதங்களைப் பயன்படுத்துங்கள்."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand why financial ratios are important",
              "I recognize that ratios help translate raw numbers into insights"
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
      id: "eps-analysis",
      title: "Earnings Per Share (EPS): The Profitability Snapshot",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Understanding EPS
            </h3>
            <p className="text-green-700">
              EPS is one of the most fundamental measures of a company's profitability. It tells you how much profit each share of stock represents.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What is Earnings Per Share (EPS)?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>What it is:</strong> EPS shows how much profit a company makes for each share of its stock. It's a fundamental measure of a company's profitability on a per-share basis.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-4">
              <h4 className="font-bold text-blue-800 text-lg mb-3">Formula</h4>
              <p className="text-blue-700 font-mono text-xl">
                EPS = (Net Income - Preferred Dividends) / Average Outstanding Shares
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>What it tells you:</strong> A higher EPS generally indicates a more profitable company. More importantly, consistent growth in EPS over time is a strong positive sign.
            </p>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Example</h4>
              <p className="text-yellow-700">
                If Company A has a net income of ₹10 Crores, no preferred dividends, and 1 Crore outstanding shares, its EPS is ₹10.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">High EPS Benefits</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Higher profitability per share</li>
                <li>• Better dividend potential</li>
                <li>• Stronger company performance</li>
                <li>• More attractive to investors</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">What to Watch For</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• EPS growth trends</li>
                <li>• Industry comparisons</li>
                <li>• Consistency over time</li>
                <li>• Quality of earnings</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              💡 Key Insight
            </h3>
            <p className="text-purple-700">
              EPS growth is often more important than absolute EPS levels. A company with EPS growing from ₹5 to ₹7 is often more attractive than one with stable EPS of ₹10. 
              Look for consistent, sustainable growth rather than just high numbers.
            </p>
          </div>

          <ConfirmationCheck
            title="EPS Understanding Check"
            description="Please confirm your understanding of EPS:"
            checkboxes={[
              "I understand what EPS measures",
              "I can identify the EPS formula"
            ]}
            partId="eps-analysis"
            onPartComplete={createConfirmationHandler("eps-analysis")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "pe-ratio",
      title: "Price-to-Earnings (P/E) Ratio: The Valuation Checker",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Understanding P/E Ratio
            </h3>
            <p className="text-blue-700">
              The P/E ratio is one of the most widely used valuation metrics. It helps you understand if a stock is overvalued or undervalued relative to its earnings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What is the Price-to-Earnings (P/E) Ratio?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>What it is:</strong> The P/E ratio compares a company's current share price to its earnings per share. It's one of the most widely used valuation metrics.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-4">
              <h4 className="font-bold text-blue-800 text-lg mb-3">Formula</h4>
              <p className="text-blue-700 font-mono text-xl">
                P/E Ratio = Market Price per Share / Earnings Per Share (EPS)
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>What it tells you:</strong> It indicates how much investors are willing to pay for each rupee of a company's earnings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">High P/E Ratio</h4>
              <p className="text-green-700 text-sm mb-2">
                A <strong>High P/E</strong> might suggest that investors expect high future growth (but could also mean the stock is overvalued).
              </p>
              <ul className="text-green-700 space-y-1 text-xs">
                <li>• Growth expectations</li>
                <li>• Market optimism</li>
                <li>• Potential overvaluation</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Low P/E Ratio</h4>
              <p className="text-orange-700 text-sm mb-2">
                A <strong>Low P/E</strong> might indicate that a stock is undervalued, or that the company is facing challenges.
              </p>
              <ul className="text-orange-700 space-y-1 text-xs">
                <li>• Potential value</li>
                <li>• Market pessimism</li>
                <li>• Company challenges</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              🎯 How to Use P/E Ratio
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Industry Comparison</h4>
                  <p className="text-yellow-700 text-sm">Compare P/E ratios within the same industry for meaningful analysis.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Historical Context</h4>
                  <p className="text-yellow-700 text-sm">Compare current P/E with the company's historical P/E ratios.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Growth Expectations</h4>
                  <p className="text-yellow-700 text-sm">High P/E often reflects expectations of future growth.</p>
                </div>
              </div>
            </div>
          </div>

          <ConfirmationCheck
            title="P/E Ratio Understanding Check"
            description="Please confirm your understanding of P/E ratio:"
            checkboxes={[
              "I understand what P/E ratio measures",
              "I can interpret high vs low P/E ratios"
            ]}
            partId="pe-ratio"
            onPartComplete={createConfirmationHandler("pe-ratio")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "pb-roe-ratios",
      title: "P/B Ratio & ROE: Asset Value & Efficiency",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              Understanding P/B and ROE
            </h3>
            <p className="text-purple-700">
              These two ratios help you understand asset value and management efficiency. They're particularly useful for different types of companies.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Price-to-Book (P/B) Ratio: The 'Net Worth' Multiple
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>What it is:</strong> The P/B ratio compares a company's market capitalization to its book value. Book value is the net asset value of a company, calculated as Total Assets - Total Liabilities.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-4">
                <h4 className="font-bold text-blue-800 text-lg mb-3">Formula</h4>
                <p className="text-blue-700 font-mono text-xl">
                  P/B Ratio = Market Price per Share / Book Value per Share
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>What it tells you:</strong> It helps you understand if you're paying a fair price for what the company's assets are worth on its books.
              </p>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Value Indicator</h4>
                <p className="text-green-700">
                  A P/B ratio under 1 is often considered a sign of a potentially undervalued stock. It's particularly useful for valuing companies with significant tangible assets, like banks or manufacturing firms.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Return on Equity (ROE): The Efficiency Engine
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>What it is:</strong> ROE measures how effectively a company's management is using shareholders' money to generate profits.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-4">
                <h4 className="font-bold text-blue-800 text-lg mb-3">Formula</h4>
                <p className="text-blue-700 font-mono text-xl">
                  ROE = Net Income / Total Shareholder Equity
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>What it tells you:</strong> A higher ROE suggests that the company is more efficient at generating profit from its equity base.
              </p>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Quality Indicator</h4>
                <p className="text-yellow-700">
                  Look for a stable and high ROE over several years. A consistently high ROE (e.g., above 15-20%) is often a hallmark of a quality company.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Comparison Table
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-800">Ratio</th>
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-800">What it Measures</th>
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-800">Rule of Thumb</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-semibold text-blue-800">EPS</td>
                    <td className="py-3 px-4">Profitability per share</td>
                    <td className="py-3 px-4">Higher is better; look for growth.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-semibold text-green-800">P/E</td>
                    <td className="py-3 px-4">Market's valuation of earnings</td>
                    <td className="py-3 px-4">Compare with industry peers.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-semibold text-purple-800">P/B</td>
                    <td className="py-3 px-4">Price vs. book value</td>
                    <td className="py-3 px-4">Under 1 may indicate value.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-orange-800">ROE</td>
                    <td className="py-3 px-4">Efficiency in using equity</td>
                    <td className="py-3 px-4">Consistently high is a great sign.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <ConfirmationCheck
            title="P/B & ROE Understanding Check"
            description="Please confirm your understanding of these ratios:"
            checkboxes={[
              "I understand what P/B ratio measures",
              "I understand what ROE measures"
            ]}
            partId="pb-roe-ratios"
            onPartComplete={createConfirmationHandler("pb-roe-ratios")}
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
              Quiz: Financial Ratios Mastery
            </h3>
            <p className="text-blue-700">
              Test your understanding of the key financial ratios we've covered. Answer correctly to proceed to the next part!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 1: What does EPS measure?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Company's total revenue</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Profit per share of stock</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Company's market value</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 2: What does a high P/E ratio typically indicate?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) The stock is undervalued</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) High growth expectations or overvaluation</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) The company has no earnings</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 3: What does ROE measure?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Company's total assets</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) How efficiently management uses equity</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Company's debt levels</span>
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
                    <h4 className="font-semibold text-gray-800">EPS</h4>
                    <p className="text-gray-600 text-sm">Tells you about a company's per-share profit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">P/E Ratio</h4>
                    <p className="text-gray-600 text-sm">Helps gauge if a stock is overvalued or undervalued relative to earnings.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">P/B Ratio</h4>
                    <p className="text-gray-600 text-sm">Compares stock price to book value, useful for asset-heavy industries.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">ROE</h4>
                    <p className="text-gray-600 text-sm">Shows how well a company generates profits from shareholder investments.</p>
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
              You've now mastered the key financial ratios! In the upcoming lessons, you'll learn about:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Advanced Analysis</h4>
                <p className="text-blue-700 text-sm">Combine all statements and ratios for complete company evaluation.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Industry Comparison</h4>
                <p className="text-green-700 text-sm">Learn to benchmark companies against industry standards.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Valuation Techniques</h4>
                <p className="text-purple-700 text-sm">Learn methods to determine company value.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Technical Analysis</h4>
                <p className="text-orange-700 text-sm">Move beyond fundamentals to chart analysis.</p>
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
              <li>• Calculate all four ratios for a company</li>
              <li>• Compare ratios with industry competitors</li>
              <li>• Look for trends over the past few years</li>
              <li>• Identify which ratios are most relevant for that industry</li>
            </ul>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              ⚠️ Important Reminder
            </h3>
            <p className="text-red-700">
              No single ratio tells the whole story. Use them together for a more complete picture. 
              Always consider the company's industry, business model, and growth stage when interpreting ratios.
            </p>
          </div>

          <ConfirmationCheck
            title="Final Understanding Check"
            description="Please confirm that you're ready to move forward:"
            checkboxes={[
              "I understand how to use the four key financial ratios",
              "I recognize the importance of using ratios together"
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
        description="Congratulations on completing the 'Key Financial Ratios' lesson"
        lessonSlug="using-key-financial-ratios-eps-p"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Calculator className="w-12 h-12 text-green-600" />
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
            You've successfully learned how to use key financial ratios and demonstrated 
            your understanding through various interactive exercises. You're now ready to 
            move on to advanced analysis and technical analysis!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/introduction-to-technical-analysis"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Next Module
            </a>
          </div>
        </div>
      </LessonLayout>
    );
  }

  return (
    <LessonLayout
      title="Using Key Financial Ratios (EPS, P/E, P/B, ROE)"
      description="Unlock the stories hidden in the numbers. This lesson will teach you how to use four of the most powerful financial ratios to evaluate a company's health, profitability, and value."
      lessonSlug="using-key-financial-ratios-eps-p"
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
