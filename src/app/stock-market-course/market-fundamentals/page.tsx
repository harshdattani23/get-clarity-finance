"use client";

import { useState, useRef } from 'react';
import { Home, Play, Pause } from 'lucide-react';
import Link from 'next/link';

export default function MarketFundamentalsPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const sections = [
    {
      title: "Welcome to Market Fundamentals",
      content: "Let's start your journey into the world of stock markets",
      type: "welcome",
      audioUrl: "/audio/welcome-to-market-fundamentals.mp3"
    },
    {
      title: "What is a Stock?",
      content: "Understanding stock ownership and company shares",
      type: "lesson",
      audioUrl: "/audio/what-is-a-stock.mp3"
    },
    {
      title: "Different Types of Stocks",
      content: "Common, preferred, growth, and value stocks",
      type: "lesson",
      audioUrl: "/audio/different-types-of-stocks.mp3"
    },
    {
      title: "What is a Stock Market?",
      content: "How exchanges work and facilitate trading",
      type: "lesson",
      audioUrl: "/audio/what-is-a-stock-market.mp3"
    },
    {
      title: "How Stocks Are Traded",
      content: "Order types, brokers, and trading process",
      type: "lesson",
      audioUrl: "/audio/how-stocks-are-traded.mp3"
    }
  ];

  const handleAudioToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderContent = () => {
    const section = sections[currentSection];
    
    if (section.type === 'welcome') {
      return (
        <div className="space-y-6">
          {/* Audio Player for Welcome Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAudioToggle}
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <div>
                  <h4 className="font-semibold text-gray-800">Welcome Audio</h4>
                  <p className="text-sm text-gray-600">Listen to course introduction</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {section.audioUrl ? 'Audio available' : 'Audio coming soon'}
              </div>
            </div>
            <audio
              ref={audioRef}
              src={section.audioUrl}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Market Fundamentals!</h2>
            <p className="text-lg text-gray-600 mb-6">
              You're about to embark on an exciting journey into the world of stock markets. 
              This course will teach you everything you need to know to get started with investing.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="font-semibold text-gray-800">4 Interactive Lessons</h3>
                <p className="text-sm text-gray-600">Learn at your own pace</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl mb-2">🎧</div>
                <h3 className="font-semibold text-gray-800">Audio & Text</h3>
                <p className="text-sm text-gray-600">Choose your learning style</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl mb-2">🏆</div>
                <h3 className="font-semibold text-gray-800">Quizzes & Assessments</h3>
                <p className="text-sm text-gray-600">Test your knowledge</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Overview</h3>
            <p className="text-gray-600 mb-4">
              This course covers the essential basics of stock markets including what stocks are, 
              different types of stocks, how stock markets function, and the trading process.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">What You'll Learn:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Understanding stock ownership</li>
                  <li>• Different types of stocks</li>
                  <li>• How stock markets work</li>
                  <li>• Trading process and mechanics</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Course Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Interactive lessons</li>
                  <li>• Audio and text modes</li>
                  <li>• Knowledge assessments</li>
                  <li>• Real-world examples</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Audio Player */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAudioToggle}
                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <div>
                <h4 className="font-semibold text-gray-800">Audio Lesson</h4>
                <p className="text-sm text-gray-600">Listen to this section</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {section.audioUrl ? 'Audio available' : 'Audio coming soon'}
            </div>
          </div>
          <audio
            ref={audioRef}
            src={section.audioUrl}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{section.title}</h3>
          <p className="text-gray-600 mb-4">{section.content}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Lesson Content:</h4>
            <p className="text-sm text-gray-600">
              This lesson will cover the fundamental concepts of {section.title.toLowerCase()}. 
              You'll learn through interactive examples and real-world scenarios.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back to Course Hub link removed */}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {sections[currentSection].title}
            </h2>
            <p className="text-gray-600">
              {sections[currentSection].content}
            </p>
          </div>

          {/* Responsive Navigation */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Course Progress</h3>
              <div className="text-sm text-gray-600">
                {currentSection + 1} of {sections.length}
              </div>
            </div>
            
            {/* Desktop: Horizontal tabs with full names */}
            <div className="hidden md:flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    currentSection === index 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      currentSection === index 
                        ? 'bg-blue-600 text-white' 
                        : index < currentSection 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-300 text-gray-600'
                    }`}>
                      {index < currentSection ? '✓' : index + 1}
                    </span>
                    <span className="text-xs leading-tight">{section.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile: Dropdown */}
            <div className="md:hidden">
              <select 
                value={currentSection}
                onChange={(e) => setCurrentSection(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sections.map((section, index) => (
                  <option key={index} value={index}>
                    {index + 1}. {section.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Start</span>
                <span>{Math.round(((currentSection + 1) / sections.length) * 100)}% Complete</span>
                <span>Finish</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            {renderContent()}
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentSection === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-800'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-500">Section</div>
                <div className="text-lg font-semibold text-gray-800">
                  {currentSection + 1} of {sections.length}
                </div>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
              disabled={currentSection === sections.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentSection === sections.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
