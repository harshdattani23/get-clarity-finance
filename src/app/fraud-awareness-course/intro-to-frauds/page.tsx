"use client";

import { useState } from 'react';
import Link from 'next/link';
import FraudSimulator from '@/components/fraud-awareness/FraudSimulator';
import { 
  ArrowLeft,
  ChevronRight,
  PlayCircle,
  BookOpen,
  AlertTriangle,
  Shield,
  CheckCircle,
  Clock,
  Trophy
} from 'lucide-react';

export default function IntroToFraudsPage() {
  const [currentSection, setCurrentSection] = useState<'overview' | 'simulator' | 'quiz'>('overview');
  const [lessonProgress, setLessonProgress] = useState(33);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/fraud-awareness-course"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <p className="text-xs text-gray-500">Module 1</p>
                <h1 className="text-lg font-semibold">Introduction to Stock Market Frauds</h1>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden md:flex items-center gap-4">
              <div className="w-48">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Lesson Progress</span>
                  <span>{lessonProgress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${lessonProgress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>+100 XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setCurrentSection('overview')}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Overview
              </div>
            </button>
            <button
              onClick={() => {
                setCurrentSection('simulator');
                setLessonProgress(66);
              }}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'simulator'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Practice Simulator
              </div>
            </button>
            <button
              onClick={() => {
                setCurrentSection('quiz');
                setLessonProgress(100);
              }}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'quiz'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Quiz
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {currentSection === 'overview' && (
          <div className="max-w-4xl mx-auto">
            {/* Video Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg">Video: What is Securities Fraud?</p>
                  <p className="text-sm text-gray-400 mt-2">Duration: 8 minutes</p>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              <section className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  What is Securities Fraud?
                </h2>
                <p className="text-gray-700 mb-4">
                  Securities fraud, also known as stock fraud or investment fraud, is a deceptive practice in the stock 
                  or commodities markets that induces investors to make purchase or sale decisions based on false information.
                </p>
                <p className="text-gray-700 mb-4">
                  In India, these frauds have become increasingly sophisticated, often targeting retail investors through:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Social media platforms (WhatsApp, Telegram, Instagram)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Fake investment advisory services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Ponzi and pyramid schemes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Pump and dump operations</span>
                  </li>
                </ul>
              </section>

              <section className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Common Types of Stock Market Frauds</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-red-600 mb-2">Ponzi Schemes</h3>
                    <p className="text-sm text-gray-600">
                      Fraudulent investing scams promising high rates of return with little risk to investors
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-red-600 mb-2">Pump & Dump</h3>
                    <p className="text-sm text-gray-600">
                      Artificially inflating stock prices through false promotions, then selling at peak
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-red-600 mb-2">Insider Trading</h3>
                    <p className="text-sm text-gray-600">
                      Trading based on material, non-public information about a company
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-red-600 mb-2">Fake Advisors</h3>
                    <p className="text-sm text-gray-600">
                      Unregistered individuals offering guaranteed returns and stock tips
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-yellow-600" />
                  SEBI's Role in Investor Protection
                </h2>
                <p className="text-gray-700 mb-3">
                  The Securities and Exchange Board of India (SEBI) is the regulatory body that protects investors from fraudulent activities:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Registers and monitors all legitimate investment advisors</li>
                  <li>• Takes action against fraudulent schemes and operators</li>
                  <li>• Maintains a list of registered intermediaries on their website</li>
                  <li>• Issues regular warnings about ongoing scams</li>
                </ul>
              </section>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setCurrentSection('simulator');
                    setLessonProgress(66);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Continue to Practice
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentSection === 'simulator' && (
          <div>
            <FraudSimulator />
            <div className="max-w-4xl mx-auto mt-8 flex justify-end">
              <button
                onClick={() => {
                  setCurrentSection('quiz');
                  setLessonProgress(100);
                  window.scrollTo(0, 0);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Continue to Quiz
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {currentSection === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Test Your Knowledge</h2>
              <p className="text-gray-600 mb-8">
                Answer these questions to complete the lesson and earn your XP rewards!
              </p>
              
              {/* Sample quiz questions */}
              <div className="space-y-6">
                <div className="border rounded-lg p-6">
                  <p className="font-semibold mb-4">1. What is the primary role of SEBI in preventing fraud?</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="q1" className="w-4 h-4" />
                      <span>Guaranteeing investment returns</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="q1" className="w-4 h-4" />
                      <span>Regulating and monitoring market participants</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="q1" className="w-4 h-4" />
                      <span>Providing stock tips</span>
                    </label>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <p className="font-semibold mb-4">2. Which of these is a red flag for fraud?</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="q2" className="w-4 h-4" />
                      <span>Guaranteed high returns with no risk</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="q2" className="w-4 h-4" />
                      <span>SEBI registration number provided</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="q2" className="w-4 h-4" />
                      <span>Transparent fee structure</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Submit Quiz
                  </button>
                </div>
              </div>
            </div>

            {/* Completion Card */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center mt-8">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Lesson Complete!</h3>
              <p className="mb-4">You've earned 100 XP</p>
              <Link
                href="/fraud-awareness-course"
                className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Back to Course
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
