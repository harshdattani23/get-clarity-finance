"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { useTranslation } from "@/hooks/useTranslation";
import { Landmark, HandCoins, ShieldCheck, Target, Calculator, TrendingUp, CheckCircle, DollarSign } from 'lucide-react';

export default function ReadingBalanceSheetPage() {
    const { t } = useTranslation('stock-market-course.reading-the-balance-sheet');
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
      title: "Reading the Balance Sheet",
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
              In this lesson, you'll learn to read and understand a company's balance sheet, a critical financial statement that provides a snapshot of its financial health.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What is the Balance Sheet?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Balance Sheet provides a snapshot of a company's financial position at a single point in time. It's based on the fundamental accounting equation, which must always balance.
            </p>
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
              <p className="text-2xl font-bold text-yellow-800">
                Assets = Liabilities + Shareholder Equity
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              Think of it like a company's financial "photograph" - it shows exactly what the company owns, what it owes, and what's left over for shareholders at a specific moment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Understand financial health</li>
                <li>• Assess company stability</li>
                <li>• Compare with competitors</li>
                <li>• Make informed decisions</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Shows point-in-time data</li>
                <li>• Must always balance</li>
                <li>• Compare with industry</li>
                <li>• Look for trends over time</li>
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
              title="Reading the Balance Sheet - Audio Summary"
              description="Listen to a comprehensive audio summary of how to read balance sheets, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-balance-sheet-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-balance-sheet-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-balance-sheet-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-balance-sheet-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-balance-sheet-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/reading-the-balance-sheet-ta.m4a"
              hindiTranscript="बैलेंस शीट पढ़ने की कला - कंपनी की वित्तीय सेहत का स्नैपशॉट। संपत्ति, देनदारी और शेयरहोल्डर इक्विटी को समझें।"
              englishTranscript="Master the Balance Sheet: Your Guide to Company Financial Health. Learn to read and understand assets, liabilities, and shareholder equity. Discover how to assess a company's financial stability!"
              bengaliTranscript="ব্যালেন্স শীট পড়ার শিল্প - কোম্পানির আর্থিক স্বাস্থ্যের স্ন্যাপশট। সম্পদ, দায় এবং শেয়ারহোল্ডার ইক্যুইটি বুঝুন।"
              marathiTranscript="बॅलन्स शीट वाचण्याची कला - कंपनीच्या आर्थिक आरोग्याचा स्न౅पशॉट। मालमत्ता, दायित्वे आणि शेअरहोल्डर इक्विटी समजून घ्या।"
              gujaratiTranscript="બેલેન્સ શીટ વાંચવાની કલા - કંપનીની નાણાકીય સ્વાસ્થ્યનો સ્નેપશોટ. માલિકી, દેવું અને શેરહોલ્ડર ઇક્વિટી સમજો."
              tamilTranscript="பலன்ஸ் ஷீட் படிக்கும் கலை - நிறுவனத்தின் நிதி நிலையின் ஸ்னாப்ஷாட். சொத்துக்கள், பொறுப்புகள் மற்றும் பங்குதாரர் பங்கு மூலதனத்தை புரிந்துகொள்ளுங்கள்."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand what a balance sheet shows",
              "I recognize the fundamental equation: Assets = Liabilities + Equity"
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
      title: "Core Components of the Balance Sheet",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              The Three Pillars of Financial Position
            </h3>
            <p className="text-purple-700">
              Every balance sheet is built on these three fundamental components. Understanding each one is crucial for financial analysis.
            </p>
        </div>

          <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2">
                <Landmark className="w-5 h-5 mr-2" />
                Assets: What the Company Owns
              </h3>
              <p className="text-gray-700 mb-4">
                Economic resources owned by the company that have future economic value, such as cash, inventory, and property.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Cash & Cash Equivalents</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Accounts Receivable</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Inventory</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Property & Equipment</span>
                </div>
              </div>
          </div>
            
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="font-bold text-lg text-red-800 flex items-center mb-2">
                <HandCoins className="w-5 h-5 mr-2" />
                Liabilities: What the Company Owes
              </h3>
              <p className="text-gray-700 mb-4">
                A company's financial obligations to other parties, such as loans and accounts payable.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Accounts Payable</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Short-term Debt</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Long-term Debt</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Accrued Expenses</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-lg text-green-800 flex items-center mb-2">
                <ShieldCheck className="w-5 h-5 mr-2" />
                Shareholder Equity: The Net Worth
              </h3>
              <p className="text-gray-700 mb-4">
                The net worth of a company, representing the amount that would be returned to shareholders if all assets were liquidated and all debts paid off.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Common Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Retained Earnings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Additional Paid-in Capital</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Treasury Stock</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              💡 Key Insight
            </h3>
            <p className="text-yellow-700">
              The balance sheet equation must always balance. If you add up all assets and they don't equal liabilities plus equity, 
              there's an error in the financial statements. This is why it's called a "balance" sheet!
            </p>
          </div>

          <ConfirmationCheck
            title="Understanding Check"
            description="Please confirm your understanding of the core components:"
            checkboxes={[
              "I understand what assets, liabilities, and equity represent",
              "I recognize that the equation must always balance"
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
      id: "practical-examples",
      title: "Practical Examples & Analysis",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Real-World Application
            </h3>
            <p className="text-green-700">
              Let's look at practical examples to understand how to analyze balance sheets in real companies.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Example: Tech Startup vs. Established Company
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Tech Startup</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cash:</span>
                    <span className="font-semibold text-green-600">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Debt:</span>
                    <span className="font-semibold text-green-600">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Assets:</span>
                    <span className="font-semibold text-orange-600">Limited</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Equity:</span>
                    <span className="font-semibold text-blue-600">High</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Established Company</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cash:</span>
                    <span className="font-semibold text-green-600">Moderate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Debt:</span>
                    <span className="font-semibold text-orange-600">Moderate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Assets:</span>
                    <span className="font-semibold text-green-600">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Equity:</span>
                    <span className="font-semibold text-green-600">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Key Ratios to Calculate
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Current Ratio</h4>
                <p className="text-sm text-gray-700 mb-2">Current Assets ÷ Current Liabilities</p>
                <p className="text-xs text-gray-600">Measures ability to pay short-term obligations</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Debt-to-Equity</h4>
                <p className="text-sm text-gray-700 mb-2">Total Debt ÷ Shareholder Equity</p>
                <p className="text-xs text-gray-600">Shows financial leverage and risk</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Working Capital</h4>
                <p className="text-sm text-gray-700 mb-2">Current Assets - Current Liabilities</p>
                <p className="text-xs text-gray-600">Indicates operational efficiency</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Asset Turnover</h4>
                <p className="text-sm text-gray-700 mb-2">Revenue ÷ Total Assets</p>
                <p className="text-xs text-gray-600">Shows how efficiently assets generate revenue</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              🚨 Red Flags to Watch For
            </h3>
            <ul className="text-yellow-700 space-y-2">
              <li>• <strong>High debt-to-equity ratio:</strong> Company may be over-leveraged</li>
              <li>• <strong>Low current ratio:</strong> May struggle to pay short-term bills</li>
              <li>• <strong>Declining cash reserves:</strong> Could indicate cash flow problems</li>
              <li>• <strong>High accounts receivable:</strong> Customers may not be paying on time</li>
            </ul>
          </div>

          <ConfirmationCheck
            title="Analysis Understanding Check"
            description="Please confirm your understanding of balance sheet analysis:"
            checkboxes={[
              "I can identify different company types from balance sheets",
              "I understand key ratios and what they indicate"
            ]}
            partId="practical-examples"
            onPartComplete={createConfirmationHandler("practical-examples")}
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
              Quiz: Balance Sheet Mastery
            </h3>
            <p className="text-blue-700">
              Test your understanding of balance sheet concepts and analysis. Answer correctly to proceed to the next part!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 1: What is the fundamental equation of the balance sheet?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Revenue - Expenses = Profit</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Assets = Liabilities + Shareholder Equity</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q1" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Cash In - Cash Out = Net Cash Flow</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 2: Which of the following is NOT an asset?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) Cash in the bank</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) Money owed to suppliers</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q2" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) Company buildings</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Question 3: What does a high debt-to-equity ratio typically indicate?
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="a"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">A) The company is very profitable</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="b"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">B) The company has high financial risk</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="q3" 
                  value="c"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">C) The company has no debt</span>
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
                    <h4 className="font-semibold text-gray-800">Financial Health Snapshot</h4>
                    <p className="text-gray-600 text-sm">The Balance Sheet is a snapshot of financial health at a specific point in time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Fundamental Equation</h4>
                    <p className="text-gray-600 text-sm">It's based on the equation: Assets = Liabilities + Shareholder Equity.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Three Components</h4>
                    <p className="text-gray-600 text-sm">It shows what a company owns (Assets), what it owes (Liabilities), and its net worth (Equity).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Stability Indicator</h4>
                    <p className="text-gray-600 text-sm">A strong balance sheet is a sign of a financially stable company.</p>
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
              You've now mastered reading balance sheets! In the upcoming lessons, you'll learn about:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Lesson 13: Reading the P&L Statement</h4>
                <p className="text-blue-700 text-sm">Learn to analyze revenue, costs, and profitability over time.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Lesson 14: Reading the Cash Flow Statement</h4>
                <p className="text-green-700 text-sm">Understand how cash moves through the business.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Lesson 15: Key Financial Ratios</h4>
                <p className="text-purple-700 text-sm">Master essential ratios for comprehensive analysis.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Advanced Analysis</h4>
                <p className="text-orange-700 text-sm">Combine all statements for complete company evaluation.</p>
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
              <li>• Download their latest balance sheet from their website</li>
              <li>• Calculate the key ratios we discussed</li>
              <li>• Compare with competitors in the same industry</li>
              <li>• Look for trends over the past few years</li>
            </ul>
        </div>

          <ConfirmationCheck
            title="Final Understanding Check"
            description="Please confirm that you're ready to move forward:"
            checkboxes={[
              "I understand how to read and analyze balance sheets",
              "I'm ready to learn about income statements and cash flow"
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
        description="Congratulations on completing the 'Reading the Balance Sheet' lesson"
        lessonSlug="reading-the-balance-sheet"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Landmark className="w-12 h-12 text-green-600" />
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
            You've successfully learned how to read and analyze balance sheets and demonstrated 
            your understanding through various interactive exercises. You're now ready to dive deeper 
            into income statements and cash flow analysis!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/reading-the-profit-loss-p&l-statement"
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
      title="Reading the Balance Sheet"
      description="Learn to read and understand a company's balance sheet, a critical financial statement that provides a snapshot of its financial health."
      lessonSlug="reading-the-balance-sheet"
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
