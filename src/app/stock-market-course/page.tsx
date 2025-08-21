"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import CourseHubSkeleton from '@/components/stock-market-course/CourseHubSkeleton';
import { Play, BookOpen, Target, Star, ArrowRight, Search, Volume2, CheckCircle, Clock } from 'lucide-react';

export default function StockMarketCoursePage() {
  const { translations } = useTranslation('stock-market-course.course-modules');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Check if translations are still loading
  const isLoading = Object.keys(translations).length === 0;

  // Define course modules with categories
  const allModules = [
    {
      id: 'basics',
      title: 'Market Fundamentals',
      description: 'Start with the absolute basics - understanding what stocks are and how the market works.',
      category: 'basics',
      hasAudio: true,
      duration: '4 hours',
      lessons: [
        { title: 'What is a Stock?', href: "/stock-market-course/what-is-a-stock" },
        { title: 'Different Types of Stocks', href: "/stock-market-course/different-types-of-stocks" },
        { title: 'What is a Stock Market?', href: "/stock-market-course/what-is-a-stock-market" },
        { title: 'How Stocks Are Traded', href: "/stock-market-course/how-stocks-are-traded" }
      ]
    },
    {
      id: 'technical-analysis',
      title: 'Technical Analysis',
      description: 'Learn to read charts and use technical indicators for trading decisions.',
      category: 'analysis',
      hasAudio: true,
      duration: '6 hours',
      lessons: [
        { title: 'Chart Patterns', href: "#" },
        { title: 'Moving Averages', href: "#" },
        { title: 'RSI & MACD', href: "#" },
        { title: 'Support & Resistance', href: "#" }
      ]
    },
    {
      id: 'fundamental-analysis',
      title: 'Fundamental Analysis',
      description: 'Analyze company financials and business models for long-term investing.',
      category: 'analysis',
      hasAudio: true,
      duration: '5 hours',
      lessons: [
        { title: 'Financial Statements', href: "#" },
        { title: 'Valuation Methods', href: "#" },
        { title: 'Industry Analysis', href: "#" },
        { title: 'Economic Indicators', href: "#" }
      ]
    },
    {
      id: 'options-trading',
      title: 'Options Trading',
      description: 'Master options strategies for advanced trading and risk management.',
      category: 'advanced',
      hasAudio: true,
      duration: '8 hours',
      lessons: [
        { title: 'Call & Put Options', href: "#" },
        { title: 'Options Strategies', href: "#" },
        { title: 'Risk Management', href: "#" },
        { title: 'Advanced Techniques', href: "#" }
      ]
    },
    {
      id: 'portfolio-management',
      title: 'Portfolio Management',
      description: 'Build and manage a diversified investment portfolio.',
      category: 'investment',
      hasAudio: true,
      duration: '4 hours',
      lessons: [
        { title: 'Asset Allocation', href: "#" },
        { title: 'Diversification', href: "#" },
        { title: 'Rebalancing', href: "#" },
        { title: 'Risk Assessment', href: "#" }
      ]
    },
    {
      id: 'mutual-funds',
      title: 'Mutual Funds',
      description: 'Understand mutual funds and how to invest in them.',
      category: 'investment',
      hasAudio: true,
      duration: '3 hours',
      lessons: [
        { title: 'Types of Funds', href: "#" },
        { title: 'NAV & Returns', href: "#" },
        { title: 'Fund Selection', href: "#" },
        { title: 'SIP vs Lump Sum', href: "#" }
      ]
    },
    {
      id: 'derivatives',
      title: 'Derivatives Trading',
      description: 'Learn about futures, options, and other derivative instruments.',
      category: 'advanced',
      hasAudio: true,
      duration: '7 hours',
      lessons: [
        { title: 'Futures Contracts', href: "#" },
        { title: 'Options Basics', href: "#" },
        { title: 'Derivatives Strategies', href: "#" },
        { title: 'Risk Management', href: "#" }
      ]
    },
    {
      id: 'algo-trading',
      title: 'Algorithmic Trading',
      description: 'Introduction to automated trading systems and strategies.',
      category: 'advanced',
      hasAudio: true,
      duration: '6 hours',
      lessons: [
        { title: 'Trading Algorithms', href: "#" },
        { title: 'Backtesting', href: "#" },
        { title: 'Risk Controls', href: "#" },
        { title: 'Platform Setup', href: "#" }
      ]
    },
    {
      id: 'commodity-trading',
      title: 'Commodity Trading',
      description: 'Trade in gold, silver, oil, and other commodities.',
      category: 'advanced',
      hasAudio: true,
      duration: '5 hours',
      lessons: [
        { title: 'Gold Trading', href: "#" },
        { title: 'Oil & Gas', href: "#" },
        { title: 'Agricultural Commodities', href: "#" },
        { title: 'Commodity ETFs', href: "#" }
      ]
    },
    {
      id: 'currency-trading',
      title: 'Currency Trading',
      description: 'Learn forex trading and currency market dynamics.',
      category: 'advanced',
      hasAudio: true,
      duration: '6 hours',
      lessons: [
        { title: 'Forex Basics', href: "#" },
        { title: 'Currency Pairs', href: "#" },
        { title: 'Trading Strategies', href: "#" },
        { title: 'Risk Management', href: "#" }
      ]
    },
    {
      id: 'ipo-trading',
      title: 'IPO Trading',
      description: 'Invest in initial public offerings and new listings.',
      category: 'advanced',
      hasAudio: true,
      duration: '4 hours',
      lessons: [
        { title: 'IPO Process', href: "#" },
        { title: 'Company Analysis', href: "#" },
        { title: 'Listing Day Trading', href: "#" },
        { title: 'Post-IPO Performance', href: "#" }
      ]
    },
    {
      id: 'bond-trading',
      title: 'Bond Trading',
      description: 'Understand government and corporate bonds.',
      category: 'advanced',
      hasAudio: true,
      duration: '4 hours',
      lessons: [
        { title: 'Bond Types', href: "#" },
        { title: 'Yield & Price', href: "#" },
        { title: 'Bond Strategies', href: "#" },
        { title: 'Risk Assessment', href: "#" }
      ]
    },
    {
      id: 'practical-trading',
      title: 'Practical Trading',
      description: 'Real-world trading scenarios and case studies.',
      category: 'practical',
      hasAudio: true,
      duration: '5 hours',
      lessons: [
        { title: 'Trading Psychology', href: "#" },
        { title: 'Market Timing', href: "#" },
        { title: 'Case Studies', href: "#" },
        { title: 'Common Mistakes', href: "#" }
      ]
    },
    {
      id: 'risk-management',
      title: 'Risk Management',
      description: 'Essential risk management techniques for traders.',
      category: 'practical',
      hasAudio: true,
      duration: '4 hours',
      lessons: [
        { title: 'Position Sizing', href: "#" },
        { title: 'Stop Losses', href: "#" },
        { title: 'Portfolio Risk', href: "#" },
        { title: 'Emotional Control', href: "#" }
      ]
    },
    {
      id: 'financial-planning',
      title: 'Financial Planning',
      description: 'Plan your financial future with proper investment strategies.',
      category: 'planning',
      hasAudio: true,
      duration: '5 hours',
      lessons: [
        { title: 'Goal Setting', href: "#" },
        { title: 'Investment Planning', href: "#" },
        { title: 'Tax Planning', href: "#" },
        { title: 'Retirement Planning', href: "#" }
      ]
    }
  ];

  // Filter modules based on search and category
  const filteredModules = allModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.lessons.some(lesson => lesson.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get category counts
  const categoryCounts = {
    all: allModules.length,
    basics: allModules.filter(m => m.category === 'basics').length,
    practical: allModules.filter(m => m.category === 'practical').length,
    analysis: allModules.filter(m => m.category === 'analysis').length,
    advanced: allModules.filter(m => m.category === 'advanced').length,
    investment: allModules.filter(m => m.category === 'investment').length,
    planning: allModules.filter(m => m.category === 'planning').length
  };

  // Calculate total lessons and hours
  const totalLessons = allModules.reduce((sum, module) => sum + module.lessons.length, 0);
  const totalHours = allModules.reduce((sum, module) => sum + parseInt(module.duration), 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <CourseHubSkeleton />
          ) : (
            <>
              {/* Header Section */}
              <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  The Complete Indian Stock Market Course
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  From absolute beginner to confident investor, this comprehensive course will guide you through everything you need to know to navigate the Indian stock market.
                </p>
                
                {/* Course Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">{allModules.length}</div>
                    <div className="text-sm text-gray-600">Course Modules</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">{totalLessons}</div>
                    <div className="text-sm text-gray-600">Total Lessons</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="text-2xl font-bold text-purple-600">{totalHours}+</div>
                    <div className="text-sm text-gray-600">Hours of Content</div>
                  </div>
                </div>
              </header>

              {/* Search and Filters Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Search */}
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search courses and lessons..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(categoryCounts).map(([category, count]) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category === 'all' ? 'All Categories' : 
                         category === 'basics' ? 'Basics' :
                         category === 'practical' ? 'Practical' :
                         category === 'analysis' ? 'Analysis' :
                         category === 'advanced' ? 'Advanced' :
                         category === 'investment' ? 'Investment' :
                         category === 'planning' ? 'Planning' : category}
                        <span className="ml-2 text-xs">({count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-300">
                  Showing {filteredModules.length} of {allModules.length} modules
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>

              {/* Course Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredModules.map((module) => (
                  <div key={module.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          {module.category === 'basics' ? 'Basics' :
                           module.category === 'practical' ? 'Practical' :
                           module.category === 'analysis' ? 'Analysis' :
                           module.category === 'advanced' ? 'Advanced' :
                           module.category === 'investment' ? 'Investment' :
                           module.category === 'planning' ? 'Planning' : module.category}
                        </span>
                        <span className="text-xs text-gray-500">{module.lessons.length} lessons</span>
                        {module.hasAudio && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                            🎧
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                        {module.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                        {module.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex gap-2 mb-3">
                        <Link
                          href="/stock-market-course/market-fundamentals"
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm text-center"
                        >
                          Start
                        </Link>
                        {module.hasAudio && (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                            Audio
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results Message */}
              {filteredModules.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No results found</h3>
                  <p className="text-gray-400">
                    No modules found matching your search criteria.
                  </p>
                </div>
              )}

              {/* Call to Action */}
              <div className="text-center mt-12">
                <h2 className="text-2xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
                <p className="text-gray-300 mb-6">Join thousands of learners who have already mastered the basics of stock markets.</p>
                <Link 
                  href="/stock-market-course/market-fundamentals"
                  className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  <Play className="w-6 h-6" />
                  Start Learning Now
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
