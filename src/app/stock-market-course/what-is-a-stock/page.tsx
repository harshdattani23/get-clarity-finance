"use client";

import { useState } from "react";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import InteractiveQuiz from "@/components/stock-market-course/InteractiveQuiz";
import InteractiveSelection from "@/components/stock-market-course/InteractiveSelection";
import ShortQuestions from "@/components/stock-market-course/ShortQuestions";

import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export default function WhatIsAStock() {
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleLessonComplete = (totalScore: number) => {
    setFinalScore(totalScore);
    setLessonCompleted(true);
  };

  const handlePartComplete = (partId: string, score: number) => {
    console.log(`Part ${partId} completed with score: ${score}`);
    // This function is called by MultiPartLesson when a part is completed
    // The actual completion logic is handled by MultiPartLesson internally
  };

  // Create a completion handler that can be passed to interactive components
  const createCompletionHandler = (partId: string) => {
    return (score: number, total?: number) => {
      // Convert score to 0-100 scale if total is provided
      const scaledScore = total ? Math.round((score / total) * 100) : score;
      console.log(`Part ${partId} completed:`);
      console.log(`- Raw score: ${score}`);
      console.log(`- Total questions: ${total}`);
      console.log(`- Scaled score: ${scaledScore}/100`);
      
      // Call the MultiPartLesson's completion handler directly
      if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
        (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete(partId, scaledScore);
      }
    };
  };

  // Create a completion handler for ConfirmationCheck component
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
      title: "What is a Stock?",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              What You&apos;ll Learn
            </h3>
            <p className="text-blue-700">
                             In this lesson, you&apos;ll discover what stocks are, how they work, and why they&apos;re fundamental to investing. Get ready to understand the building blocks of the stock market!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What is a Stock?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
                             A stock represents ownership in a company. When you buy a stock, you&apos;re purchasing a small piece of that company, making you a shareholder. This means you have a claim on the company&apos;s assets and earnings.
            </p>
            <p className="text-gray-700 leading-relaxed">
                             Think of it like owning a slice of a pizza - you don&apos;t own the entire pizza, but you own a portion of it. As the pizza becomes more valuable, so does your slice!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Potential for growth and profits</li>
                <li>• Ownership in real companies</li>
                <li>• Dividend income possibilities</li>
                <li>• Portfolio diversification</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Stock prices can go up or down</li>
                <li>• Past performance doesn&apos;t guarantee future results</li>
                <li>• Research companies before investing</li>
                <li>• Consider your risk tolerance</li>
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
               title="What is a Stock? - Audio Summary"
              description="Listen to a comprehensive audio summary of what stocks are, available in multiple languages. Perfect for auditory learners and those who prefer listening over reading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-ta.m4a"
              hindiTranscript="स्टॉक्स की ABCD - पिज़्ज़ा से समझें हिस्सेदारी, प्रकार और निवेश के बुनियादी सिद्धांत। जब आप किसी कंपनी का स्टॉक खरीदते हैं, तो आप उस कंपनी के एक छोटे हिस्से के मालिक बन जाते हैं।"
              englishTranscript="Stocks 101: Your Slice of the Market, from Pizza to Portfolios. Learn the ABCs of stocks through the pizza analogy. Understand ownership, types, and basic investment principles. When you buy a stock, you become a partial owner of that company. Think of it like buying a slice of a pizza - you own a portion of the whole pizza, and as the pizza becomes more valuable, so does your slice!"
              bengaliTranscript="স্টক কী - পিজ্জার স্লাইস থেকে রিলায়েন্সের উত্থান। শেয়ার বাজারে বিনিয়োগের ক, খ, গ। যখন আপনি কোন কোম্পানির স্টক কিনেন, তখন আপনি সেই কোম্পানির একটি ছোট অংশের মালিক হন।"
              marathiTranscript="स्टॉक म्हणजे काय - प्रकार, फायदे, तोटे आणि गुंतवणुकीची मानसिकता। जेव्हा तुम्ही एखाद्या कंपनीचा स्टॉक खरेदी करता, तेव्हा तुम्ही त्या कंपनीच्या एका लहान भागाचे मालक बनता।"
              gujaratiTranscript="સ્ટોક્સ - રોકાણના મૂળભૂત સિદ્ધાંતો, પ્રકારો અને જોખમનું વ્યવસ્થાપન। જ્યારે તમે કોઈ કંપનીનો સ્ટોક ખરીદો છો, ત્યારે તમે તે કંપનીના એક નાના ભાગના માલિક બનો છો।"
              tamilTranscript="பங்குகளின் உலகத்தில் - உங்கள் முதலீட்டு வழிகாட்டி. ரிஸ்க், லாபம், மற்றும் நீண்ட கால உத்திகள்! நீங்கள் ஒரு நிறுவனத்தின் பங்குகளை வாங்கும்போது, நீங்கள் அந்த நிறுவனத்தின் ஒரு சிறிய பகுதியின் உரிமையாளராக மாறுகிறீர்கள்."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand that stocks represent ownership in companies",
              "I recognize that stock prices can go up or down"
            ]}
            partId="introduction-with-audio"
            onPartComplete={createConfirmationHandler("introduction-with-audio")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'interactive' as const,
      skipAllowed: false
    },
    {
      id: "pizza-analogy",
      title: "The Pizza Analogy",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              🍕 Understanding Stocks Through Pizza
            </h3>
            <p className="text-purple-700 leading-relaxed mb-4">
              Let&apos;s break down stocks using a simple pizza analogy that makes 
              everything crystal clear!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">The Pizza Company</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Imagine a pizza company that wants to expand. They need money to buy 
                new ovens, hire more chefs, and open new locations. Instead of taking 
                a loan, they decide to sell shares of their company.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Your Investment</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                You buy 10 shares at ₹100 each, investing ₹1,000 total. Now you own 
                10 slices of the pizza company. If the company does well and grows, 
                your shares become more valuable.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Real Example: Indian Companies</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-yellow-800">Reliance Industries</h5>
                <p className="text-yellow-700">Started small, now one of India&apos;s largest companies</p>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800">TCS (Tata Consultancy)</h5>
                <p className="text-yellow-700">IT giant that grew from a small division</p>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800">HDFC Bank</h5>
                <p className="text-yellow-700">Started in 1994, now a banking leader</p>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "quiz-1",
      title: "Stock Basics Quiz",
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: "ownership",
              question: "What does owning a stock mean?",
              options: [
                "You lend money to the company",
                "You own a small piece of the company",
                "You work for the company",
                "You are the company's customer"
              ],
              correctAnswer: 1,
              explanation: "Correct! When you buy a stock, you become a partial owner of that company. This means you have a claim on the company's assets and earnings."
            },
            {
              id: "investment",
              question: "If you buy 5 shares of a company at ₹200 each, how much did you invest?",
              options: [
                "₹200",
                "₹400",
                "₹1,000",
                "₹5,000"
              ],
              correctAnswer: 2,
              explanation: "Great! 5 shares × ₹200 = ₹1,000. This is your total investment in the company."
            },
            {
              id: "growth",
              question: "What happens to your stock value if the company grows and becomes more successful?",
              options: [
                "Your stock value stays the same",
                "Your stock value decreases",
                "Your stock value increases",
                "You lose your investment"
              ],
              correctAnswer: 2,
              explanation: "Excellent! When a company grows and becomes more successful, the value of your stock typically increases because the company is worth more."
            }
          ]}
          onComplete={createCompletionHandler("quiz-1")}
        />
      ),
      isRequired: true,
      type: 'quiz' as const,
      minScore: 50,
      skipAllowed: false
    },
    {
      id: "types-of-stocks",
      title: "Different Types of Stocks",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              Different Categories of Stocks
            </h3>
            <p className="text-blue-700">
              Stocks come in different types, each with its own characteristics and 
              risk levels. Understanding these helps you make better investment decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Large-Cap Stocks</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                These are shares of large, well-established companies with market 
                values typically above ₹20,000 crores.
              </p>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Indian Examples:</h5>
                <ul className="text-green-700 text-xs space-y-1">
                  <li>• Reliance Industries</li>
                  <li>• TCS</li>
                  <li>• HDFC Bank</li>
                  <li>• Infosys</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Mid-Cap Stocks</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Medium-sized companies with market values between ₹5,000-20,000 crores. 
                They offer growth potential with moderate risk.
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Indian Examples:</h5>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Bajaj Finance</li>
                  <li>• Titan Company</li>
                  <li>• Maruti Suzuki</li>
                  <li>• Asian Paints</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-3">Small-Cap Stocks</h4>
            <p className="text-orange-700 leading-relaxed mb-3">
              Small companies with market values below ₹5,000 crores. They have 
              high growth potential but also higher risk.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-orange-800 mb-2">High Growth Potential:</h5>
                <ul className="text-orange-700 text-sm space-y-1">
                  <li>• Can grow rapidly</li>
                  <li>• Undiscovered gems</li>
                  <li>• Higher returns possible</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-orange-800 mb-2">Higher Risk:</h5>
                <ul className="text-orange-700 text-sm space-y-1">
                  <li>• Less established</li>
                  <li>• More volatile</li>
                  <li>• Higher chance of loss</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "selection-exercise",
      title: "Stock Classification Exercise",
      content: (
        <InteractiveSelection
          title="Classify these Indian companies by their stock type"
          description="Select the correct category for each company. This will help you understand how to classify stocks based on company size and characteristics."
          options={[
            {
              id: "reliance",
              text: "Reliance Industries - ₹15 lakh crore market value, oil & gas giant",
              isCorrect: true,
              explanation: "Correct! Reliance Industries is a large-cap stock with market value above ₹20,000 crores."
            },
            {
              id: "tcs",
              text: "TCS - ₹12 lakh crore market value, IT services leader",
              isCorrect: true,
              explanation: "Correct! TCS is a large-cap stock with market value above ₹20,000 crores."
            },
            {
              id: "bajaj-finance",
              text: "Bajaj Finance - ₹1.2 lakh crore market value, consumer finance",
              isCorrect: true,
              explanation: "Correct! Bajaj Finance is a mid-cap stock with market value between ₹5,000-20,000 crores."
            },
            {
              id: "titan",
              text: "Titan Company - ₹2.8 lakh crore market value, watches & jewelry",
              isCorrect: true,
              explanation: "Correct! Titan Company is a mid-cap stock with market value between ₹5,000-20,000 crores."
            },
            {
              id: "small-company",
              text: "ABC Tech - ₹800 crore market value, new software startup",
              isCorrect: true,
              explanation: "Correct! ABC Tech is a small-cap stock with market value below ₹5,000 crores."
            }
          ]}
                     onComplete={createCompletionHandler("selection-exercise")}
        />
      ),
      isRequired: true,
      type: 'selection' as const,
      minScore: 50,
      skipAllowed: false
    },
    {
      id: "real-world-examples",
      title: "Real World Examples",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🌟 Success Stories from Indian Markets
            </h3>
            <p className="text-green-700">
              Let&apos;s look at some real examples of how stocks have performed 
              in the Indian market over time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Reliance Industries</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Started:</span>
                  <span className="font-medium">1977</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Initial Price:</span>
                  <span className="font-medium">₹10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Price:</span>
                  <span className="font-medium text-green-600">₹2,500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Growth:</span>
                  <span className="font-medium text-green-600">25,000%+</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">TCS (Tata Consultancy)</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Started:</span>
                  <span className="font-medium">1968</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">IPO Price:</span>
                  <span className="font-medium">₹850</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Price:</span>
                  <span className="font-medium text-green-600">₹3,800+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Growth:</span>
                  <span className="font-medium text-green-600">350%+</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">Key Learning Points</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Long-term Perspective:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Stocks can grow significantly over decades</li>
                  <li>• Patience is key to wealth building</li>
                  <li>• Quality companies tend to perform well</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Risk Management:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Not all companies succeed</li>
                  <li>• Diversification reduces risk</li>
                  <li>• Research before investing</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "short-questions",
      title: "Understanding Check",
      content: (
        <ShortQuestions
          title="Test Your Understanding"
          description="Answer these questions to ensure you've grasped the key concepts about stocks."
          questions={[
            {
              id: "ownership",
              question: "Explain in your own words what it means to own a stock.",
              hint: "Think about what you actually own when you buy shares of a company.",
              correctAnswer: "stock ownership company piece share",
              explanation: "Great! When you own a stock, you own a small piece of that company. This means you have a claim on the company's assets and earnings, and you may receive dividends if the company pays them."
            },
            {
              id: "investment",
              question: "If you want to invest ₹5,000 in a company whose stock costs ₹250 per share, how many shares can you buy?",
              hint: "Divide your total investment by the price per share.",
              correctAnswer: "20",
              explanation: "Perfect! ₹5,000 ÷ ₹250 = 20 shares. You can buy 20 shares of the company with your ₹5,000 investment."
            },
            {
              id: "growth",
              question: "Why do stock prices change over time?",
              hint: "Consider what factors make a company more or less valuable.",
              correctAnswer: "company performance earnings growth market demand",
              explanation: "Excellent! Stock prices change based on company performance, earnings, growth prospects, market demand, economic conditions, and investor sentiment. Good news typically increases prices, while bad news decreases them."
            }
          ]}
                     onComplete={createCompletionHandler("short-questions")}
        />
      ),
             isRequired: true,
       type: 'short-answer' as const,
       minScore: 0,
       skipAllowed: false
    },

    {
      id: "key-takeaways",
      title: "Key Takeaways",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🎯 What You&apos;ve Learned
            </h3>
            <p className="text-green-700">
              Congratulations! You&apos;ve completed the &quot;What is a Stock?&quot; lesson. 
              Here&apos;s a summary of the key concepts you now understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Core Concepts</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Stocks represent ownership in companies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>You become a shareholder when you buy stocks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Stock prices reflect company value and performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Different types: large-cap, mid-cap, small-cap</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Investment Principles</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Long-term perspective is key</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Research companies before investing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Diversification reduces risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Past performance doesn&apos;t guarantee future results</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Next Steps</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Practice</h5>
                <p className="text-yellow-700 text-sm">Use virtual trading to practice</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Research</h5>
                <p className="text-yellow-700 text-sm">Study real companies</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Learn More</h5>
                <p className="text-yellow-700 text-sm">Continue with next lessons</p>
              </div>
            </div>
          </div>
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
        description="Congratulations on completing the 'What is a Stock?' lesson"
        lessonSlug="what-is-a-stock"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Trophy className="w-12 h-12 text-green-600" />
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
            You&apos;ve successfully learned the fundamentals of stocks and demonstrated 
            your understanding through various interactive exercises. You&apos;re now 
            ready to explore more advanced concepts!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course/what-is-a-stock-market"
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
      title="What is a Stock?"
      description="Learn the fundamentals of stocks, ownership, and investing through interactive lessons and real-world examples."
      lessonSlug="what-is-a-stock"
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
