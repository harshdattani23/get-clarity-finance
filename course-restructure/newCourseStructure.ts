// src/lib/newCourseStructure.ts

export interface Lesson {
  slug: string;
  title: string;
  href: string;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
}

export interface Module {
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  duration: string;
  totalLessons: number;
  prerequisites: string[];
  modules: Module[];
  learningOutcomes: string[];
  careerPaths: string[];
}

// Course 1: Stock Market Fundamentals & Traditional Trading
export const fundamentalsTraditionalTradingCourse: Course = {
  id: 'fundamentals-traditional-trading',
  title: 'Stock Market Fundamentals & Traditional Trading',
  description: 'Complete foundation in stock market basics and traditional trading methods',
  targetAudience: 'Beginners to Intermediate Traders',
  duration: '8-12 weeks',
  totalLessons: 22,
  prerequisites: ['None'],
  modules: [
    {
      title: 'Stock Market Basics (Foundation)',
      description: 'Understanding the fundamental concepts of stocks and markets',
      duration: '2 weeks',
      lessons: [
        { slug: 'what-is-a-stock', title: 'What is a Stock?', href: '/course1/what-is-a-stock', difficulty: 'beginner' },
        { slug: 'different-types-of-stocks', title: 'Different Types of Stocks', href: '/course1/different-types-of-stocks', difficulty: 'beginner' },
        { slug: 'what-is-a-stock-market', title: 'What is a Stock Market?', href: '/course1/what-is-a-stock-market', difficulty: 'beginner' },
        { slug: 'how-stocks-are-traded', title: 'How Stocks Are Traded', href: '/course1/how-stocks-are-traded', difficulty: 'beginner' },
        { slug: 'reading-a-stock-quote', title: 'Reading a Stock Quote', href: '/course1/reading-a-stock-quote', difficulty: 'beginner' }
      ]
    },
    {
      title: 'Market Mechanics & Regulation',
      description: 'Understanding market operations and regulatory framework',
      duration: '1.5 weeks',
      lessons: [
        { slug: 'bull-vs-bear-markets', title: 'Bull vs Bear Markets', href: '/course1/bull-vs-bear-markets', difficulty: 'beginner' },
        { slug: 'market-indices', title: 'Market Indices', href: '/course1/market-indices', difficulty: 'beginner' },
        { slug: 'role-of-sebi', title: 'Role of SEBI', href: '/course1/role-of-sebi', difficulty: 'beginner' },
        { slug: 'different-players-in-market', title: 'The Different Players in the Market', href: '/course1/different-players-in-market', difficulty: 'intermediate' }
      ]
    },
    {
      title: 'Getting Started in Trading',
      description: 'Practical steps to begin trading',
      duration: '1.5 weeks',
      lessons: [
        { slug: 'opening-demat-trading-account', title: 'Opening a Demat and Trading Account', href: '/course1/opening-demat-trading-account', difficulty: 'beginner' },
        { slug: 'kyc-process', title: 'The Know Your Customer (KYC) Process', href: '/course1/kyc-process', difficulty: 'beginner' },
        { slug: 'placing-first-trade', title: 'Placing Your First Trade Order Types', href: '/course1/placing-first-trade', difficulty: 'intermediate' },
        { slug: 'risk-management-basics', title: 'Risk Management Basics', href: '/course1/risk-management-basics', difficulty: 'intermediate' }
      ]
    },
    {
      title: 'Fundamental Analysis',
      description: 'Analyzing companies using financial statements',
      duration: '2 weeks',
      lessons: [
        { slug: 'intro-fundamental-analysis', title: 'Introduction to Fundamental Analysis', href: '/course1/intro-fundamental-analysis', difficulty: 'intermediate' },
        { slug: 'reading-balance-sheet', title: 'Reading the Balance Sheet', href: '/course1/reading-balance-sheet', difficulty: 'intermediate' },
        { slug: 'reading-pl-statement', title: 'Reading the Profit & Loss (P&L) Statement', href: '/course1/reading-pl-statement', difficulty: 'intermediate' },
        { slug: 'reading-cash-flow-statement', title: 'Reading the Cash Flow Statement', href: '/course1/reading-cash-flow-statement', difficulty: 'intermediate' },
        { slug: 'key-financial-ratios', title: 'Using Key Financial Ratios (EPS, P/E, P/B, ROE)', href: '/course1/key-financial-ratios', difficulty: 'intermediate' }
      ]
    },
    {
      title: 'Technical Analysis',
      description: 'Chart-based analysis for trading decisions',
      duration: '2 weeks',
      lessons: [
        { slug: 'intro-technical-analysis', title: 'Introduction to Technical Analysis', href: '/course1/intro-technical-analysis', difficulty: 'intermediate' },
        { slug: 'reading-candlestick-charts', title: 'How to Read Candlestick Charts', href: '/course1/reading-candlestick-charts', difficulty: 'intermediate' },
        { slug: 'trends-support-resistance', title: 'Identifying Trends, Support and Resistance', href: '/course1/trends-support-resistance', difficulty: 'intermediate' },
        { slug: 'essential-technical-indicators', title: 'Using Essential Technical Indicators', href: '/course1/essential-technical-indicators', difficulty: 'intermediate' }
      ]
    }
  ],
  learningOutcomes: [
    'Understand market fundamentals and trading mechanics',
    'Conduct basic fundamental and technical analysis',
    'Execute trades safely with proper risk management',
    'Make informed investment decisions'
  ],
  careerPaths: [
    'Equity Research Analyst',
    'Investment Banking Analyst',
    'Retail Trading Professional',
    'Financial Markets Specialist'
  ]
};

// Course 2: High-Frequency Trading & Algorithmic Trading
export const hftAlgorithmicTradingCourse: Course = {
  id: 'hft-algorithmic-trading',
  title: 'High-Frequency Trading & Algorithmic Trading',
  description: 'Advanced course in algorithmic trading, HFT strategies, and quantitative methods',
  targetAudience: 'Advanced Traders, Quantitative Analysts, Technology Professionals',
  duration: '12-16 weeks',
  totalLessons: 28,
  prerequisites: ['Course 1 completion OR equivalent trading experience + programming knowledge'],
  modules: [
    {
      title: 'Algorithmic Trading Foundations',
      description: 'Core concepts and infrastructure for algorithmic trading',
      duration: '2 weeks',
      lessons: [
        { slug: 'intro-algorithmic-trading', title: 'Introduction to Algorithmic Trading', href: '/course2/intro-algorithmic-trading', difficulty: 'advanced' },
        { slug: 'market-microstructure-order-flow', title: 'Market Microstructure & Order Flow', href: '/course2/market-microstructure-order-flow', difficulty: 'advanced' },
        { slug: 'trading-infrastructure-tech-stack', title: 'Trading Infrastructure & Technology Stack', href: '/course2/trading-infrastructure-tech-stack', difficulty: 'advanced' },
        { slug: 'programming-for-trading', title: 'Programming for Trading (Python/C++)', href: '/course2/programming-for-trading', difficulty: 'advanced' }
      ]
    },
    {
      title: 'High-Frequency Trading (HFT) Strategies',
      description: 'Specialized HFT strategies and techniques',
      duration: '3 weeks',
      lessons: [
        { slug: 'intro-hft', title: 'Introduction to High-Frequency Trading', href: '/course2/intro-hft', difficulty: 'advanced' },
        { slug: 'market-making-strategies', title: 'Market Making Strategies', href: '/course2/market-making-strategies', difficulty: 'advanced' },
        { slug: 'arbitrage-strategies', title: 'Arbitrage Strategies', href: '/course2/arbitrage-strategies', difficulty: 'advanced' },
        { slug: 'momentum-mean-reversion-hft', title: 'Momentum & Mean Reversion HFT', href: '/course2/momentum-mean-reversion-hft', difficulty: 'advanced' },
        { slug: 'latency-arbitrage-speed-trading', title: 'Latency Arbitrage & Speed Trading', href: '/course2/latency-arbitrage-speed-trading', difficulty: 'advanced' },
        { slug: 'order-flow-prediction-execution', title: 'Order Flow Prediction & Execution', href: '/course2/order-flow-prediction-execution', difficulty: 'advanced' }
      ]
    },
    {
      title: 'Quantitative Strategy Development',
      description: 'Building systematic trading strategies',
      duration: '3 weeks',
      lessons: [
        { slug: 'quantitative-research-methods', title: 'Quantitative Research Methods', href: '/course2/quantitative-research-methods', difficulty: 'advanced' },
        { slug: 'signal-generation-feature-engineering', title: 'Signal Generation & Feature Engineering', href: '/course2/signal-generation-feature-engineering', difficulty: 'advanced' },
        { slug: 'portfolio-construction-algo-trading', title: 'Portfolio Construction for Algo Trading', href: '/course2/portfolio-construction-algo-trading', difficulty: 'advanced' },
        { slug: 'alternative-data-news-analytics', title: 'Alternative Data & News Analytics', href: '/course2/alternative-data-news-analytics', difficulty: 'advanced' },
        { slug: 'cross-asset-algorithmic-strategies', title: 'Cross-Asset Algorithmic Strategies', href: '/course2/cross-asset-algorithmic-strategies', difficulty: 'advanced' },
        { slug: 'derivatives-algorithmic-trading', title: 'Derivatives in Algorithmic Trading', href: '/course2/derivatives-algorithmic-trading', difficulty: 'advanced' }
      ]
    },
    {
      title: 'Machine Learning & AI in Trading',
      description: 'Applying AI and ML to trading strategies',
      duration: '2.5 weeks',
      lessons: [
        { slug: 'machine-learning-for-trading', title: 'Machine Learning for Trading', href: '/course2/machine-learning-for-trading', difficulty: 'advanced' },
        { slug: 'deep-learning-applications', title: 'Deep Learning Applications', href: '/course2/deep-learning-applications', difficulty: 'advanced' },
        { slug: 'nlp-natural-language-processing', title: 'Natural Language Processing (NLP)', href: '/course2/nlp-natural-language-processing', difficulty: 'advanced' },
        { slug: 'reinforcement-learning-trading', title: 'Reinforcement Learning in Trading', href: '/course2/reinforcement-learning-trading', difficulty: 'advanced' },
        { slug: 'ai-powered-risk-management', title: 'AI-Powered Risk Management', href: '/course2/ai-powered-risk-management', difficulty: 'advanced' }
      ]
    },
    {
      title: 'System Development & Backtesting',
      description: 'Building and testing trading systems',
      duration: '2.5 weeks',
      lessons: [
        { slug: 'building-trading-bot', title: 'Building a Trading Bot', href: '/course2/building-trading-bot', difficulty: 'advanced' },
        { slug: 'backtesting-strategies', title: 'Backtesting Strategies', href: '/course2/backtesting-strategies', difficulty: 'advanced' },
        { slug: 'performance-attribution-analysis', title: 'Performance Attribution & Analysis', href: '/course2/performance-attribution-analysis', difficulty: 'advanced' },
        { slug: 'risk-management-systems', title: 'Risk Management Systems', href: '/course2/risk-management-systems', difficulty: 'advanced' },
        { slug: 'production-deployment-monitoring', title: 'Production Deployment & Monitoring', href: '/course2/production-deployment-monitoring', difficulty: 'advanced' }
      ]
    },
    {
      title: 'Advanced Topics & Professional Practice',
      description: 'Professional and regulatory aspects',
      duration: '1 week',
      lessons: [
        { slug: 'regulatory-compliance-aspects', title: 'Regulatory & Compliance Aspects', href: '/course2/regulatory-compliance-aspects', difficulty: 'advanced' },
        { slug: 'professional-trading-career-paths', title: 'Professional Trading Career Paths', href: '/course2/professional-trading-career-paths', difficulty: 'advanced' }
      ]
    }
  ],
  learningOutcomes: [
    'Design and implement HFT systems',
    'Develop quantitative trading strategies',
    'Deploy production trading bots',
    'Apply advanced analytics and ML to trading'
  ],
  careerPaths: [
    'Quantitative Analyst (Quant)',
    'Algorithmic Trading Developer',
    'High-Frequency Trading Specialist',
    'Trading Technology Consultant',
    'Independent Algo Trader'
  ]
};

// Course 3: Investment & Portfolio Management
export const investmentPortfolioManagementCourse: Course = {
  id: 'investment-portfolio-management',
  title: 'Investment & Portfolio Management',
  description: 'Comprehensive course in long-term wealth building and professional portfolio management',
  targetAudience: 'Long-term Investors, Wealth Managers, Financial Advisors',
  duration: '10-14 weeks',
  totalLessons: 24,
  prerequisites: ['Course 1 completion OR equivalent basic market knowledge'],
  modules: [
    {
      title: 'Investment Philosophy & Portfolio Theory',
      description: 'Foundational concepts in investment and portfolio theory',
      duration: '2 weeks',
      lessons: [
        { slug: 'intro-long-term-investing', title: 'Introduction to Long-Term Investing', href: '/course3/intro-long-term-investing', difficulty: 'intermediate' },
        { slug: 'modern-portfolio-theory', title: 'Modern Portfolio Theory', href: '/course3/modern-portfolio-theory', difficulty: 'intermediate' },
        { slug: 'portfolio-diversification-principle', title: 'The Principle of Portfolio Diversification', href: '/course3/portfolio-diversification-principle', difficulty: 'intermediate' },
        { slug: 'asset-allocation-strategies', title: 'Asset Allocation Strategies', href: '/course3/asset-allocation-strategies', difficulty: 'intermediate' }
      ]
    },
    {
      title: 'Investment Vehicles & Products',
      description: 'Understanding various investment options',
      duration: '2.5 weeks',
      lessons: [
        { slug: 'mutual-funds-deep-dive', title: 'Mutual Funds Deep Dive', href: '/course3/mutual-funds-deep-dive', difficulty: 'intermediate' },
        { slug: 'exchange-traded-funds-etfs', title: 'Exchange-Traded Funds (ETFs)', href: '/course3/exchange-traded-funds-etfs', difficulty: 'intermediate' },
        { slug: 'bonds-fixed-income-securities', title: 'Bonds and Fixed Income Securities', href: '/course3/bonds-fixed-income-securities', difficulty: 'intermediate' },
        { slug: 'alternative-investments', title: 'Alternative Investments', href: '/course3/alternative-investments', difficulty: 'advanced' },
        { slug: 'international-investing', title: 'International Investing', href: '/course3/international-investing', difficulty: 'advanced' }
      ]
    },
    {
      title: 'Advanced Portfolio Management',
      description: 'Professional portfolio management techniques',
      duration: '2.5 weeks',
      lessons: [
        { slug: 'risk-management-position-sizing', title: 'Risk Management & Position Sizing', href: '/course3/risk-management-position-sizing', difficulty: 'advanced' },
        { slug: 'investor-psychology-biases', title: 'The Investor\'s Mind: Managing Psychological Biases', href: '/course3/investor-psychology-biases', difficulty: 'intermediate' },
        { slug: 'technical-analysis-long-term', title: 'Advanced Technical Analysis for Long-term Investors', href: '/course3/technical-analysis-long-term', difficulty: 'intermediate' },
        { slug: 'elliott-wave-market-cycles', title: 'Elliott Wave Theory & Market Cycles', href: '/course3/elliott-wave-market-cycles', difficulty: 'advanced' },
        { slug: 'volume-profile-investment-decisions', title: 'Volume Profile Analysis for Investment Decisions', href: '/course3/volume-profile-investment-decisions', difficulty: 'advanced' }
      ]
    },
    {
      title: 'Derivatives for Portfolio Management',
      description: 'Using derivatives for hedging and income generation',
      duration: '2 weeks',
      lessons: [
        { slug: 'derivatives-intro-investors', title: 'Introduction to Derivatives for Investors', href: '/course3/derivatives-intro-investors', difficulty: 'intermediate' },
        { slug: 'options-hedging', title: 'Understanding Options for Hedging', href: '/course3/options-hedging', difficulty: 'intermediate' },
        { slug: 'advanced-option-strategies-portfolios', title: 'Advanced Option Strategies for Portfolios', href: '/course3/advanced-option-strategies-portfolios', difficulty: 'advanced' },
        { slug: 'futures-hedging-strategies', title: 'Futures and Hedging Strategies', href: '/course3/futures-hedging-strategies', difficulty: 'advanced' }
      ]
    },
    {
      title: 'Comprehensive Financial Planning',
      description: 'Holistic financial planning and wealth management',
      duration: '2 weeks',
      lessons: [
        { slug: 'creating-financial-plan', title: 'Creating a Comprehensive Financial Plan', href: '/course3/creating-financial-plan', difficulty: 'intermediate' },
        { slug: 'retirement-planning-pension', title: 'Retirement Planning & Pension Management', href: '/course3/retirement-planning-pension', difficulty: 'intermediate' },
        { slug: 'tax-planning-investors', title: 'Tax Planning for Investors', href: '/course3/tax-planning-investors', difficulty: 'intermediate' },
        { slug: 'estate-planning-wealth-transfer', title: 'Estate Planning and Wealth Transfer', href: '/course3/estate-planning-wealth-transfer', difficulty: 'advanced' }
      ]
    },
    {
      title: 'Professional Practice & Advanced Topics',
      description: 'Professional wealth management practice',
      duration: '1 week',
      lessons: [
        { slug: 'real-estate-investing', title: 'Real Estate Investing', href: '/course3/real-estate-investing', difficulty: 'intermediate' },
        { slug: 'investment-advisory-practice', title: 'Building Your Investment Advisory Practice', href: '/course3/investment-advisory-practice', difficulty: 'advanced' }
      ]
    }
  ],
  learningOutcomes: [
    'Build comprehensive investment portfolios',
    'Conduct long-term investment analysis',
    'Implement professional risk management',
    'Provide comprehensive financial planning'
  ],
  careerPaths: [
    'SEBI Registered Investment Advisor',
    'Portfolio Manager (PMS/Mutual Funds)',
    'Wealth Manager (Banks/NBFCs)',
    'Financial Planner',
    'Independent Investment Consultant'
  ]
};

// Export all courses
export const allCourses: Course[] = [
  fundamentalsTraditionalTradingCourse,
  hftAlgorithmicTradingCourse,
  investmentPortfolioManagementCourse
];

// Helper functions
export function getCourseById(courseId: string): Course | undefined {
  return allCourses.find(course => course.id === courseId);
}

export function getLessonNavigation(courseId: string, currentSlug: string) {
  const course = getCourseById(courseId);
  if (!course) return { prevLesson: null, nextLesson: null };

  const allLessons = course.modules.flatMap(module => module.lessons);
  const currentIndex = allLessons.findIndex(lesson => lesson.slug === currentSlug);

  if (currentIndex === -1) {
    return { prevLesson: null, nextLesson: null };
  }

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return { prevLesson, nextLesson };
}

export function getCourseProgress(courseId: string, completedLessons: string[]): number {
  const course = getCourseById(courseId);
  if (!course) return 0;

  const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
  const completed = completedLessons.length;

  return Math.round((completed / totalLessons) * 100);
}
