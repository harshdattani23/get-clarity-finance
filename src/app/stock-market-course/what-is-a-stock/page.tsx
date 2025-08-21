"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, BookOpen, Target, CheckCircle, ArrowRight, Home, BarChart3 } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import Link from 'next/link';

export default function WhatIsAStockPage() {
  const [currentPart, setCurrentPart] = useState(0);
  const [completedParts, setCompletedParts] = useState<Set<number>>(new Set());
  const [showAudio, setShowAudio] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const lessonData = {
    title: "What is a Stock?",
    description: "Understand what stocks are, how they represent ownership in companies, and why people buy and sell them.",
    lessonSlug: "what-is-a-stock",
    hasAudio: true,
    audioParts: [
      {
        id: 'introduction',
        title: 'Introduction to Stocks',
        audioUrl: 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/what-is-a-stock-en.m4a',
        duration: 180,
        transcript: "What is a Stock: Understand what stocks are, how they represent ownership in companies, and why people buy and sell them. Learn the fundamentals of stock ownership."
      },
      {
        id: 'ownership-rights',
        title: 'Rights of Stock Ownership',
        audioUrl: 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/what-is-a-stock-en.m4a',
        duration: 240,
        transcript: "When you own stocks, you're not just holding a piece of paper. You get real rights as a part-owner of the company including voting rights, dividend rights, and capital appreciation."
      },
      {
        id: 'why-buy-stocks',
        title: 'Why Do People Buy Stocks?',
        audioUrl: 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/what-is-a-stock-en.m4a',
        duration: 200,
        transcript: "People buy stocks for various reasons, but the main goals are usually to grow their wealth and beat inflation through wealth growth and passive income."
      }
    ],
    parts: [
      {
        id: 'introduction',
        title: 'Understanding Stocks',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                🎯 What You'll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you'll understand what stocks are, how they represent ownership in companies, and why people buy and sell them.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is a Stock?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>stock</strong> (also called a share or equity) represents a small piece of ownership in a company. When you buy a stock, you become a part-owner of that company.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Think of it like this: If a company is like a pizza, then stocks are like slices of that pizza. When you buy a stock, you're buying a slice of the company.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  🍕 Company = Pizza | 📈 Stock = Slice of Pizza
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">✅ Benefits of Owning Stocks</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Share in company profits</li>
                  <li>• Vote on company decisions</li>
                  <li>• Potential for value appreciation</li>
                  <li>• Dividend payments</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">⚠️ Important to Remember</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Stock prices can go up or down</li>
                  <li>• No guarantee of profits</li>
                  <li>• Research before investing</li>
                  <li>• Diversify your investments</li>
                </ul>
              </div>
            </div>

            {/* Interactive Example */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">💡 Interactive Example</h4>
              <p className="text-blue-700 mb-4">
                Let's say you buy 10 shares of a company at ₹100 each. You've invested ₹1,000 and now own a small piece of that company!
              </p>
              <div className="bg-white p-4 rounded-lg border border-blue-300">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">₹100</div>
                    <div className="text-sm text-gray-600">Price per share</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">10</div>
                    <div className="text-sm text-gray-600">Shares owned</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">₹1,000</div>
                    <div className="text-sm text-gray-600">Total investment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'ownership-rights',
        title: 'Rights of Stock Ownership',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What Rights Do You Get?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you own stocks, you're not just holding a piece of paper. You get real rights as a part-owner of the company.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl mb-2">🗳️</div>
                  <h4 className="font-semibold text-blue-800 mb-2">Voting Rights</h4>
                  <p className="text-blue-700 text-sm">
                    You can vote on important company decisions like board elections and major business changes.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl mb-2">💰</div>
                  <h4 className="font-semibold text-green-800 mb-2">Dividend Rights</h4>
                  <p className="text-green-700 text-sm">
                    You may receive a share of the company's profits in the form of dividends.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl mb-2">📈</div>
                  <h4 className="font-semibold text-purple-800 mb-2">Capital Appreciation</h4>
                  <p className="text-purple-700 text-sm">
                    If the company grows, your shares may increase in value over time.
                  </p>
                </div>
              </div>
            </div>

            {/* Real World Example */}
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">🌍 Real World Example</h4>
              <p className="text-yellow-700 mb-4">
                Imagine you own shares in a popular restaurant chain. As the company opens new locations and profits grow:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">1</div>
                  <span className="text-yellow-800">Your shares might increase in value</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">2</div>
                  <span className="text-yellow-800">You might receive dividend payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">3</div>
                  <span className="text-yellow-800">You can vote on company decisions</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'why-buy-stocks',
        title: 'Why Do People Buy Stocks?',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why Invest in Stocks?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                People buy stocks for various reasons, but the main goals are usually to grow their wealth and beat inflation.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3">📈 Wealth Growth</h4>
                  <p className="text-green-700 text-sm mb-3">
                    Stocks have historically provided higher returns than other investments like bonds or savings accounts.
                  </p>
                  <div className="bg-white p-3 rounded border border-green-300">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">7-10%</div>
                      <div className="text-xs text-gray-600">Average annual return</div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">🛡️ Beat Inflation</h4>
                  <p className="text-blue-700 text-sm mb-3">
                    Stock returns typically outpace inflation, helping preserve your purchasing power over time.
                  </p>
                  <div className="bg-white p-3 rounded border border-blue-300">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">2-3%</div>
                      <div className="text-xs text-gray-600">Average inflation rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Goals */}
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-4">🎯 Common Investment Goals</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-300">
                  <div className="text-2xl mb-2">🏠</div>
                  <h5 className="font-semibold text-purple-800 mb-2">Buy a Home</h5>
                  <p className="text-purple-700 text-sm">Save for a down payment on your dream home</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-300">
                  <div className="text-2xl mb-2">🎓</div>
                  <h5 className="font-semibold text-purple-800 mb-2">Education</h5>
                  <p className="text-purple-700 text-sm">Fund your children's education expenses</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-300">
                  <div className="text-2xl mb-2">🌅</div>
                  <h5 className="font-semibold text-purple-800 mb-2">Retirement</h5>
                  <p className="text-purple-700 text-sm">Build a comfortable retirement nest egg</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'quiz',
        title: 'Knowledge Check',
        isRequired: true,
        type: 'quiz' as const,
        questions: [
          {
            question: "What does a stock represent?",
            options: ["A loan to a company", "Ownership in a company", "A government bond", "A savings account"],
            correct: 1,
            explanation: "A stock represents ownership in a company. When you buy a stock, you become a part-owner of that company."
          },
          {
            question: "Which of the following is NOT a right of stock ownership?",
            options: ["Voting rights", "Dividend payments", "Guaranteed profits", "Capital appreciation"],
            correct: 2,
            explanation: "There are no guaranteed profits in stock investing. Stock prices can go up or down, and there's always risk involved."
          },
          {
            question: "Why do people typically invest in stocks?",
            options: ["To avoid all risk", "To grow wealth and beat inflation", "To get immediate cash", "To avoid taxes"],
            correct: 1,
            explanation: "People invest in stocks primarily to grow their wealth over time and beat inflation, though there are no guarantees."
          }
        ]
      }
    ]
  };

  const handlePartComplete = () => {
    setCompletedParts(prev => new Set([...prev, currentPart]));
    if (currentPart < lessonData.parts.length - 1) {
      setCurrentPart(currentPart + 1);
    }
  };

  const getProgressPercentage = () => {
    return Math.round(((currentPart + 1) / lessonData.parts.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/stock-market-course/market-fundamentals"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Course
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAudio(!showAudio)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showAudio ? <Volume2 className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                {showAudio ? 'Audio Mode' : 'Text Mode'}
              </button>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                <BarChart3 className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">
                  {getProgressPercentage()}% Complete
                </span>
              </div>
            </div>
          </div>

          {/* Lesson Header */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{lessonData.title}</h1>
              <p className="text-gray-600 mb-6">{lessonData.description}</p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <span>Part {currentPart + 1} of {lessonData.parts.length}</span>
                <span>•</span>
                <span>{completedParts.size} completed</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {lessonData.parts[currentPart].title}
              </h2>
              {completedParts.has(currentPart) && (
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Completed</span>
                </div>
              )}
            </div>
            
            {lessonData.parts[currentPart].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setCurrentPart(Math.max(0, currentPart - 1))}
              disabled={currentPart === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Part
            </button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Part {currentPart + 1} of {lessonData.parts.length}
              </span>
            </div>
            
            <button 
              onClick={handlePartComplete}
              disabled={currentPart === lessonData.parts.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {currentPart === lessonData.parts.length - 1 ? 'Complete Lesson' : 'Next Part'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}