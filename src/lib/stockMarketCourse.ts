// src/lib/stockMarketCourse.ts

export interface Lesson {
  slug: string;
  title: string;
  href: string;
}

export interface Module {
  title: string;
  description: string;
  lessons: Lesson[];
}

export const stockMarketCourseStructure: Module[] = [
  {
    title: "stockMarketCourse.module1.title",
    description: "stockMarketCourse.module1.description",
    lessons: [
      { slug: "what-is-a-stock", title: "what-is-a-stock.title", href: "/stock-market-course/what-is-a-stock" },
      { slug: "different-types-of-stocks", title: "different-types-of-stocks.title", href: "/stock-market-course/different-types-of-stocks" },
      { slug: "what-is-a-stock-market", title: "what-is-a-stock-market.title", href: "/stock-market-course/what-is-a-stock-market" },
      { slug: "how-stocks-are-traded", title: "how-stocks-are-traded.title", href: "/stock-market-course/how-stocks-are-traded" },
      { slug: "reading-a-stock-quote", title: "reading-a-stock-quote.title", href: "/stock-market-course/reading-a-stock-quote" },
    ],
  },
  {
    title: "stockMarketCourse.module2.title",
    description: "stockMarketCourse.module2.description",
    lessons: [
        { slug: "bull-vs-bear-markets", title: "bull-vs-bear-markets.title", href: "/stock-market-course/bull-vs-bear-markets" },
        { slug: "market-indices", title: "market-indices.title", href: "/stock-market-course/market-indices" },
        { slug: "role-of-sebi", title: "role-of-sebi.title", href: "/stock-market-course/role-of-sebi" },
    ]
  },
  {
    title: "stockMarketCourse.module3.title",
    description: "stockMarketCourse.module3.description",
    lessons: [
        { slug: "opening-a-demat-and-trading-account", title: "opening-a-demat-and-trading-account.title", href: "/stock-market-course/opening-a-demat-and-trading-account" },
        { slug: "the-know-your-customer-kyc-process", title: "the-know-your-customer-kyc-process.title", href: "/stock-market-course/the-know-your-customer-kyc-process" },
        { slug: "placing-your-first-trade-order-types", title: "placing-your-first-trade-order-types.title", href: "/stock-market-course/placing-your-first-trade-order-types" },
        { slug: "the-different-players-in-the-market", title: "the-different-players-in-the-market.title", href: "/stock-market-course/the-different-players-in-the-market" },
    ]
  },
  {
    title: "stockMarketCourse.module4.title",
    description: "stockMarketCourse.module4.description",
    lessons: [
        { slug: "introduction-to-fundamental-analysis", title: "introduction-to-fundamental-analysis.title", href: "/stock-market-course/introduction-to-fundamental-analysis" },
        { slug: "reading-the-balance-sheet", title: "reading-the-balance-sheet.title", href: "/stock-market-course/reading-the-balance-sheet" },
        { slug: "reading-the-profit-loss-p&l-statement", title: "reading-the-profit-loss-p&l-statement.title", href: "/stock-market-course/reading-the-profit-loss-p&l-statement" },
        { slug: "reading-the-cash-flow-statement", title: "reading-the-cash-flow-statement.title", href: "/stock-market-course/reading-the-cash-flow-statement" },
        { slug: "using-key-financial-ratios-eps-p/e-p/b-roe", title: "using-key-financial-ratios-eps-p/e-p/b-roe.title", href: "/stock-market-course/using-key-financial-ratios-eps-p/e-p/b-roe" },
    ]
  },
  {
    title: "stockMarketCourse.module5.title",
    description: "stockMarketCourse.module5.description",
    lessons: [
        { slug: "introduction-to-technical-analysis", title: "introduction-to-technical-analysis.title", href: "/stock-market-course/introduction-to-technical-analysis" },
        { slug: "how-to-read-candlestick-charts", title: "how-to-read-candlestick-charts.title", href: "/stock-market-course/how-to-read-candlestick-charts" },
        { slug: "identifying-trends-support-and-resistance", title: "identifying-trends-support-and-resistance.title", href: "/stock-market-course/identifying-trends-support-and-resistance" },
        { slug: "using-essential-technical-indicators-moving-averages-rsi-macd", title: "using-essential-technical-indicators-moving-averages-rsi-macd.title", href: "/stock-market-course/using-essential-technical-indicators-moving-averages-rsi-macd" },
    ]
  },
  {
    title: "stockMarketCourse.module6.title",
    description: "stockMarketCourse.module6.description",
    lessons: [
        { slug: "introduction-to-derivatives", title: "introduction-to-derivatives.title", href: "/stock-market-course/introduction-to-derivatives" },
        { slug: "understanding-futures-contracts", title: "understanding-futures-contracts.title", href: "/stock-market-course/understanding-futures-contracts" },
        { slug: "understanding-options-contracts-calls-and-puts", title: "understanding-options-contracts-calls-and-puts.title", href: "/stock-market-course/understanding-options-contracts-calls-and-puts" },
        { slug: "introduction-to-hedging-and-speculation-strategies", title: "introduction-to-hedging-and-speculation-strategies.title", href: "/stock-market-course/introduction-to-hedging-and-speculation-strategies" },
    ]
  },
  {
    title: "stockMarketCourse.module7.title",
    description: "stockMarketCourse.module7.description",
    lessons: [
        { slug: "the-principle-of-portfolio-diversification", title: "the-principle-of-portfolio-diversification.title", href: "/stock-market-course/the-principle-of-portfolio-diversification" },
        { slug: "asset-allocation-strategies", title: "asset-allocation-strategies.title", href: "/stock-market-course/asset-allocation-strategies" },
        { slug: "risk-management-position-sizing-and-stop-loss-orders", title: "risk-management-position-sizing-and-stop-loss-orders.title", href: "/stock-market-course/risk-management-position-sizing-and-stop-loss-orders" },
        { slug: "the-investors-mind-managing-psychological-biases", title: "the-investors-mind-managing-psychological-biases.title", href: "/stock-market-course/the-investors-mind-managing-psychological-biases" },
    ]
  },
  {
    title: "stockMarketCourse.module8.title",
    description: "stockMarketCourse.module8.description",
    lessons: [
        { slug: "advanced-candlestick-patterns", title: "advanced-candlestick-patterns.title", href: "/stock-market-course/advanced-candlestick-patterns" },
        { slug: "elliott-wave-theory", title: "elliott-wave-theory.title", href: "/stock-market-course/elliott-wave-theory" },
        { slug: "fibonacci-retracements", title: "fibonacci-retracements.title", href: "/stock-market-course/fibonacci-retracements" },
        { slug: "volume-profile-analysis", title: "volume-profile-analysis.title", href: "/stock-market-course/volume-profile-analysis" },
    ]
  },
  {
    title: "stockMarketCourse.module9.title",
    description: "stockMarketCourse.module9.description",
    lessons: [
        { slug: "option-greeks", title: "option-greeks.title", href: "/stock-market-course/option-greeks" },
        { slug: "basic-option-strategies", title: "basic-option-strategies.title", href: "/stock-market-course/basic-option-strategies" },
        { slug: "spread-strategies", title: "spread-strategies.title", href: "/stock-market-course/spread-strategies" },
        { slug: "advanced-option-strategies", title: "advanced-option-strategies.title", href: "/stock-market-course/advanced-option-strategies" },
    ]
  },
  {
    title: "stockMarketCourse.module10.title",
    description: "stockMarketCourse.module10.description",
    lessons: [
        { slug: "currency-and-commodity-markets", title: "currency-and-commodity-markets.title", href: "/stock-market-course/currency-and-commodity-markets" },
        { slug: "real-estate-investing", title: "real-estate-investing.title", href: "/stock-market-course/real-estate-investing" },
        { slug: "bonds-and-fixed-income", title: "bonds-and-fixed-income.title", href: "/stock-market-course/bonds-and-fixed-income" },
        { slug: "alternative-investments", title: "alternative-investments.title", href: "/stock-market-course/alternative-investments" },
    ]
  },
    {
    title: "stockMarketCourse.module11.title",
    description: "stockMarketCourse.module11.description",
    lessons: [
        { slug: "introduction-to-algo-trading", title: "introduction-to-algo-trading.title", href: "/stock-market-course/introduction-to-algo-trading" },
        { slug: "building-a-trading-bot", title: "building-a-trading-bot.title", href: "/stock-market-course/building-a-trading-bot" },
        { slug: "backtesting-strategies", title: "backtesting-strategies.title", href: "/stock-market-course/backtesting-strategies" },
        { slug: "machine-learning-in-finance", title: "machine-learning-in-finance.title", href: "/stock-market-course/machine-learning-in-finance" },
    ]
    },
    {
    title: "stockMarketCourse.module12.title",
    description: "stockMarketCourse.module12.description",
    lessons: [
        { slug: "creating-a-financial-plan", title: "creating-a-financial-plan.title", href: "/stock-market-course/creating-a-financial-plan" },
        { slug: "retirement-planning", title: "retirement-planning.title", href: "/stock-market-course/retirement-planning" },
        { slug: "tax-planning-for-investors", title: "tax-planning-for-investors.title", href: "/stock-market-course/tax-planning-for-investors" },
        { slug: "estate-planning-and-wills", title: "estate-planning-and-wills.title", href: "/stock-market-course/estate-planning-and-wills" },
    ]
    }
];

// A helper function to get the next and previous lesson for this specific course
export function getStockMarketLessonNavigation(currentSlug: string) {
  const allLessons = stockMarketCourseStructure.flatMap(module => module.lessons);
  const currentIndex = allLessons.findIndex(lesson => lesson.slug === currentSlug);

  if (currentIndex === -1) {
    return { prevLesson: null, nextLesson: null };
  }

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return { prevLesson, nextLesson };
}
