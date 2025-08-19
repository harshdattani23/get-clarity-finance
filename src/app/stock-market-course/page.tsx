"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function StockMarketCoursePage() {
  const { t } = useTranslation('stock-market-course');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Define all course modules with proper titles and descriptions
  const allModules = [
    {
      id: 'basics',
      title: 'Market Fundamentals',
      description: 'Start with the absolute basics - understanding what stocks are and how the market works.',
      category: 'basics',
      lessons: [
        { title: 'What is a Stock?', href: "/stock-market-course/what-is-a-stock" },
        { title: 'Different Types of Stocks', href: "/stock-market-course/different-types-of-stocks" },
        { title: 'What is a Stock Market?', href: "/stock-market-course/what-is-a-stock-market" },
        { title: 'How Stocks Are Traded', href: "/stock-market-course/how-stocks-are-traded" }
      ]
    },
    {
      id: 'market-mechanics',
      title: 'Market Mechanics & Regulation',
      description: 'Learn about market mechanics, indices, and the role of regulators.',
      category: 'basics',
      lessons: [
        { title: 'Reading a Stock Quote', href: "/stock-market-course/reading-a-stock-quote" },
        { title: 'Bull vs Bear Markets', href: "/stock-market-course/bull-vs-bear-markets" },
        { title: 'Market Indices', href: "/stock-market-course/market-indices" },
        { title: 'Role of SEBI', href: "/stock-market-course/role-of-sebi" }
      ]
    },
    {
      id: 'getting-started',
      title: 'Getting Started in Trading',
      description: 'Take your first steps into the market with practical guidance.',
      category: 'practical',
      lessons: [
        { title: 'Opening a Demat and Trading Account', href: "/stock-market-course/opening-a-demat-and-trading-account" },
        { title: 'The KYC Process', href: "/stock-market-course/the-know-your-customer-kyc-process" },
        { title: 'Placing Your First Trade', href: "/stock-market-course/placing-your-first-trade-order-types" },
        { title: 'Different Players in the Market', href: "/stock-market-course/the-different-players-in-the-market" }
      ]
    },
    {
      id: 'fundamental-analysis',
      title: 'Fundamental Analysis',
      description: 'Master the art of stock selection through fundamental analysis.',
      category: 'analysis',
      lessons: [
        { title: 'Introduction to Fundamental Analysis', href: "/stock-market-course/introduction-to-fundamental-analysis" },
        { title: 'Reading the Balance Sheet', href: "/stock-market-course/reading-the-balance-sheet" },
        { title: 'Reading the P&L Statement', href: "/stock-market-course/reading-the-profit-loss-p&l-statement" },
        { title: 'Reading the Cash Flow Statement', href: "/stock-market-course/reading-the-cash-flow-statement" },
        { title: 'Key Financial Ratios', href: "/stock-market-course/using-key-financial-ratios-eps-p/e/p/b-roe" }
      ]
    },
    {
      id: 'technical-analysis',
      title: 'Technical Analysis',
      description: 'Learn the science of timing through technical analysis.',
      category: 'analysis',
      lessons: [
        { title: 'Introduction to Technical Analysis', href: "/stock-market-course/introduction-to-technical-analysis" },
        { title: 'Reading Candlestick Charts', href: "/stock-market-course/how-to-read-candlestick-charts" },
        { title: 'Trends, Support and Resistance', href: "/stock-market-course/identifying-trends-support-and-resistance" },
        { title: 'Essential Technical Indicators', href: "/stock-market-course/using-essential-technical-indicators-moving-averages-rsi-macd" }
      ]
    },
    {
      id: 'ipos-and-new-listings',
      title: t('course-modules.iposAndNewListings.title'),
      description: t('course-modules.iposAndNewListings.description'),
      category: 'practical',
      lessons: [
        { title: t('course-modules.iposAndNewListings.lessons.understandingIpos'), href: "/stock-market-course/understanding-ipos" },
        { title: t('course-modules.iposAndNewListings.lessons.howToApplyForIpos'), href: "/stock-market-course/how-to-apply-for-ipos" },
        { title: t('course-modules.iposAndNewListings.lessons.evaluatingIpoValuations'), href: "/stock-market-course/evaluating-ipo-valuations" },
        { title: t('course-modules.iposAndNewListings.lessons.ipoRisksAndRewards'), href: "/stock-market-course/ipo-risks-and-rewards" },
        { title: t('course-modules.iposAndNewListings.lessons.smeIposAndNseEmerge'), href: "/stock-market-course/sme-ipos-and-nse-emerge" }
      ]
    },
    {
      id: 'mutual-funds',
      title: t('course-modules.mutualFunds.title'),
      description: t('course-modules.mutualFunds.description'),
      category: 'investment',
      lessons: [
        { title: t('course-modules.mutualFunds.lessons.introductionToMutualFunds'), href: "/stock-market-course/introduction-to-mutual-funds" },
        { title: t('course-modules.mutualFunds.lessons.typesOfMutualFunds'), href: "/stock-market-course/types-of-mutual-funds" },
        { title: t('course-modules.mutualFunds.lessons.howToChooseTheRightFund'), href: "/stock-market-course/how-to-choose-the-right-fund" },
        { title: t('course-modules.mutualFunds.lessons.systematicInvestmentPlans'), href: "/stock-market-course/systematic-investment-plans-sips" },
        { title: t('course-modules.mutualFunds.lessons.exchangeTradedFunds'), href: "/stock-market-course/exchange-traded-funds-etfs" },
        { title: t('course-modules.mutualFunds.lessons.indexFundsAndPassiveInvesting'), href: "/stock-market-course/index-funds-and-passive-investing" }
      ]
    },
    {
      id: 'gold-and-commodities',
      title: t('course-modules.goldAndCommodities.title'),
      description: t('course-modules.goldAndCommodities.description'),
      category: 'investment',
      lessons: [
        { title: t('course-modules.goldAndCommodities.lessons.investingInGold'), href: "/stock-market-course/investing-in-gold" },
        { title: t('course-modules.goldAndCommodities.lessons.goldEtfsAndSovereignGoldBonds'), href: "/stock-market-course/gold-etfs-and-sovereign-gold-bonds" },
        { title: t('course-modules.goldAndCommodities.lessons.silverAndPreciousMetals'), href: "/stock-market-course/silver-and-precious-metals" },
        { title: t('course-modules.goldAndCommodities.lessons.agriculturalCommodities'), href: "/stock-market-course/agricultural-commodities" },
        { title: t('course-modules.goldAndCommodities.lessons.energyCommodities'), href: "/stock-market-course/energy-commodities-oil-gas" },
        { title: t('course-modules.goldAndCommodities.lessons.commodityTradingStrategies'), href: "/stock-market-course/commodity-trading-strategies" }
      ]
    },
    {
      id: 'currency-trading',
      title: t('course-modules.currencyTrading.title'),
      description: t('course-modules.currencyTrading.description'),
      category: 'advanced',
      lessons: [
        { title: t('course-modules.currencyTrading.lessons.introductionToCurrencyMarkets'), href: "/stock-market-course/introduction-to-currency-markets" },
        { title: t('course-modules.currencyTrading.lessons.majorCurrencyPairs'), href: "/stock-market-course/major-currency-pairs" },
        { title: t('course-modules.currencyTrading.lessons.forexTradingStrategies'), href: "/stock-market-course/forex-trading-strategies" },
        { title: t('course-modules.currencyTrading.lessons.currencyDerivatives'), href: "/stock-market-course/currency-derivatives" },
        { title: t('course-modules.currencyTrading.lessons.riskManagementInForex'), href: "/stock-market-course/risk-management-in-forex" }
      ]
    },
    {
      id: 'derivatives',
      title: 'Derivatives & Advanced Instruments',
      description: 'Explore advanced instruments and strategies.',
      category: 'advanced',
      lessons: [
        { title: 'Introduction to Derivatives', href: "/stock-market-course/introduction-to-derivatives" },
        { title: 'Understanding Futures Contracts', href: "/stock-market-course/understanding-futures-contracts" },
        { title: 'Understanding Options Contracts', href: "/stock-market-course/understanding-options-contracts-calls-and-puts" },
        { title: 'Hedging and Speculation Strategies', href: "/stock-market-course/introduction-to-hedging-and-speculation-strategies" }
      ]
    },
    {
      id: 'portfolio-management',
      title: 'Portfolio Management',
      description: 'Build and manage a resilient portfolio.',
      category: 'advanced',
      lessons: [
        { title: 'Portfolio Diversification', href: "/stock-market-course/the-principle-of-portfolio-diversification" },
        { title: 'Asset Allocation Strategies', href: "/stock-market-course/asset-allocation-strategies" },
        { title: 'Risk Management & Position Sizing', href: "/stock-market-course/risk-management-position-sizing-and-stop-loss-orders" },
        { title: 'Managing Psychological Biases', href: "/stock-market-course/the-investors-mind-managing-psychological-biases" }
      ]
    },
    {
      id: 'advanced-technical',
      title: 'Advanced Technical Analysis',
      description: 'Master advanced technical analysis techniques.',
      category: 'advanced',
      lessons: [
        { title: 'Advanced Candlestick Patterns', href: "/stock-market-course/advanced-candlestick-patterns" },
        { title: 'Elliott Wave Theory', href: "/stock-market-course/elliott-wave-theory" },
        { title: 'Fibonacci Retracements', href: "/stock-market-course/fibonacci-retracements" },
        { title: 'Volume Profile Analysis', href: "/stock-market-course/volume-profile-analysis" }
      ]
    },
    {
      id: 'advanced-derivatives',
      title: 'Advanced Derivatives Strategies',
      description: 'Learn advanced derivatives strategies and risk management.',
      category: 'advanced',
      lessons: [
        { title: 'Option Greeks', href: "/stock-market-course/option-greeks" },
        { title: 'Basic Option Strategies', href: "/stock-market-course/basic-option-strategies" },
        { title: 'Spread Strategies', href: "/stock-market-course/spread-strategies" },
        { title: 'Advanced Option Strategies', href: "/stock-market-course/advanced-option-strategies" }
      ]
    },
    {
      id: 'other-markets',
      title: 'Exploring Other Markets',
      description: 'Explore other investment markets beyond stocks.',
      category: 'advanced',
      lessons: [
        { title: 'Currency and Commodity Markets', href: "/stock-market-course/currency-and-commodity-markets" },
        { title: 'Real Estate Investing', href: "/stock-market-course/real-estate-investing" },
        { title: 'Bonds and Fixed Income', href: "/stock-market-course/bonds-and-fixed-income" },
        { title: 'Alternative Investments', href: "/stock-market-course/alternative-investments" }
      ]
    },
    {
      id: 'quantitative-trading',
      title: 'Quantitative & Algorithmic Trading',
      description: 'Learn quantitative and algorithmic trading approaches.',
      category: 'advanced',
      lessons: [
        { title: 'Introduction to Algorithmic Trading', href: "/stock-market-course/introduction-to-algo-trading" },
        { title: 'Building a Trading Bot', href: "/stock-market-course/building-a-trading-bot" },
        { title: 'Backtesting Strategies', href: "/stock-market-course/backtesting-strategies" },
        { title: 'Machine Learning in Finance', href: "/stock-market-course/machine-learning-in-finance" }
      ]
    },
    {
      id: 'financial-planning',
      title: 'Financial Planning & Wealth Management',
      description: 'Plan your financial future and build wealth systematically.',
      category: 'planning',
      lessons: [
        { title: 'Creating a Financial Plan', href: "/stock-market-course/creating-a-financial-plan" },
        { title: 'Retirement Planning', href: "/stock-market-course/retirement-planning" },
        { title: 'Tax Planning for Investors', href: "/stock-market-course/tax-planning-for-investors" },
        { title: 'Estate Planning and Wills', href: "/stock-market-course/estate-planning-and-wills" }
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

  const totalLessons = allModules.reduce((sum, module) => sum + module.lessons.length, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Complete Indian Stock Market Course
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              From absolute beginner to confident investor, this comprehensive course will guide you through everything you need to know to navigate the Indian stock market.
            </p>
            
            {/* Course Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-green-600">{allModules.length}</div>
                <div className="text-sm text-gray-600">Course Modules</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">{totalLessons}</div>
                <div className="text-sm text-gray-600">Total Lessons</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">Hours of Content</div>
              </div>
            </div>
          </header>

          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                                 <input
                   type="text"
                   placeholder="Search courses and lessons..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                 />
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
            <p className="text-gray-600">
              Showing {filteredModules.length} of {allModules.length} modules
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Course Modules Grid */}
          <div className="grid gap-8">
            {filteredModules.map((module) => (
              <div key={module.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                        {module.category === 'basics' ? 'Basics' :
                         module.category === 'practical' ? 'Practical' :
                         module.category === 'analysis' ? 'Analysis' :
                         module.category === 'advanced' ? 'Advanced' :
                         module.category === 'investment' ? 'Investment' :
                         module.category === 'planning' ? 'Planning' : module.category}
                      </span>
                      <span className="text-sm text-gray-500">{module.lessons.length} lessons</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      {module.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                  <Link
                    href={module.lessons[0]?.href || '#'}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
                  >
                    Start Module
                  </Link>
                </div>
                
                {/* Lessons Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <Link
                      key={lessonIndex}
                      href={lesson.href}
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100 hover:border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">
                          {lesson.title}
                        </h3>
                        <span className="text-green-600 text-sm">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredModules.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
              <p className="text-gray-500">
                No modules found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
