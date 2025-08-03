"use client";

import Link from 'next/link';
import ContentAnalyzer from '@/components/ContentAnalyzer';
import { BookOpen, AlertTriangle, Brain } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      
      {/* Main Content Area */}
      <main className="grid md:grid-cols-2 gap-16 items-start">
        
        {/* Left: Greeting and Prompt */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Your Intelligent Investment Shield
              </span>
            </h1>
            <p className="text-xl text-gray-600 mt-2">Analyze suspicious content instantly, or ask our AI to explain investment concepts.</p>
          </div>
          
          <div id="analyzer" className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <ContentAnalyzer />
          </div>
        </div>

        {/* Right: Awareness Hub and Information */}
        <div className="space-y-8 mt-4 md:mt-0">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Investor Awareness Hub</h2>
              <p className="text-gray-600 mb-4">
                Knowledge is your best defense. Explore our Hub for insights on identifying fraud and making safer investment decisions.
              </p>
              <Link href="/awareness" className="text-blue-600 font-semibold hover:underline">
                Explore the Hub →
              </Link>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Brain className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">Test Your Investment Knowledge</h2>
              <p className="text-gray-600 mb-4">
                Take our comprehensive quiz to assess your investment knowledge and fraud protection awareness.
              </p>
              <Link href="/investment-quiz" className="text-green-600 font-semibold hover:underline">
                Start Quiz →
              </Link>
            </div>
          </div>
           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex items-start gap-4">
             <div className="bg-yellow-100 p-3 rounded-full">
               <AlertTriangle className="w-6 h-6 text-yellow-700" />
             </div>
             <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">About Get Clarity Finance</h2>
              <p className="text-gray-600">
                This tool is an AI-powered shield to help you detect potential securities fraud. It is not a financial advisor. Always do your own research (DYOR).
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}