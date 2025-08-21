"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function IntroFundamentalAnalysisPage() {
  const lessonData = {
    title: "Introduction to Fundamental Analysis",
    description: "Learn how to evaluate a company's financial health and intrinsic value, moving beyond just the stock price.",
    lessonSlug: "introduction-to-fundamental-analysis",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/introduction-to-fundamental-analysis-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/introduction-to-fundamental-analysis-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/introduction-to-fundamental-analysis-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/introduction-to-fundamental-analysis-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/fundamental-analysis/introduction-to-fundamental-analysis-mr.m4a"
    },
    transcript: {
      en: "Introduction to Fundamental Analysis: Learn how to evaluate a company's financial health and intrinsic value, moving beyond just the stock price. Discover the art and science of fundamental analysis.",
      hi: "मौलिक विश्लेषण का परिचय: कंपनी के वित्तीय स्वास्थ्य और आंतरिक मूल्य का मूल्यांकन करना सीखें, सिर्फ शेयर की कीमत से आगे बढ़कर।",
      bn: "মৌলিক বিশ্লেষণের পরিচয়: শুধুমাত্র স্টক মূল্য ছাড়িয়ে কোম্পানির আর্থিক স্বাস্থ্য এবং অন্তর্নিহিত মূল্য মূল্যায়ন করা শিখুন।",
      ta: "அடிப்படை பகுப்பாய்வு அறிமுகம்: நிறுவனத்தின் நிதி நிலை மற்றும் உள்ளார்ந்த மதிப்பை மதிப்பிடுவதற்கான வழிகளைக் கற்றுக்கொள்ளுங்கள், பங்கு விலையை மட்டும் கடந்து செல்வதற்கான வழிகளைக் கற்றுக்கொள்ளுங்கள்.",
      mr: "मूलभूत विश्लेषणाचा परिचय: कंपनीचे आर्थिक आरोग्य आणि अंतर्गत मूल्य मूल्यांकन करणे शिका, फक्त स्टॉक किंमतीपेक्षा पुढे जाऊन."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Fundamental Analysis",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you'll discover how to evaluate a company's financial health and intrinsic value, moving beyond just the stock price. Learn the art and science of fundamental analysis!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is Fundamental Analysis?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Fundamental analysis is a method of evaluating a security by examining related economic and financial factors to measure its intrinsic value. It's about understanding the business you're investing in.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The core belief is that the market price of a stock can be wrong in the short term. By calculating a company's intrinsic value, you can identify if a stock is currently overpriced or underpriced.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Find undervalued stocks</li>
                  <li>• Understand business fundamentals</li>
                  <li>• Make informed investment decisions</li>
                  <li>• Long-term investment approach</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
                <ul className="text-orange-800 space-y-1 text-sm">
                  <li>• Requires thorough research</li>
                  <li>• Market timing is less critical</li>
                  <li>• Focus on long-term value</li>
                  <li>• Consider multiple factors</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "core-components",
        title: "Core Components of Fundamental Analysis",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">
                Core Components of Fundamental Analysis
              </h3>
              <p className="text-purple-700 text-lg mb-4">
                Fundamental analysis combines both qualitative and quantitative factors to give you a complete picture of a company's value.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">1. Qualitative Factors (The 'Art')</h4>
                <p className="text-gray-700 mb-3">
                  These are the non-numerical aspects of a business, such as its business model, competitive advantage, and management quality.
                </p>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Key Areas:</strong> Business model, competitive moat, management quality, brand value, industry position.
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-700">Business model sustainability</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-700">Competitive advantages</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-700">Management track record</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">2. Quantitative Factors (The 'Science')</h4>
                <p className="text-gray-700 mb-3">
                  This involves digging into the numbers, primarily from the company's financial statements: the Balance Sheet, P&L Statement, and Cash Flow Statement.
                </p>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>Key Areas:</strong> Revenue growth, profitability, debt levels, cash flow, financial ratios.
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-700">Financial statement analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-700">Ratio calculations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-700">Trend analysis</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-3">💡 The Perfect Balance</h4>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Qualitative factors give you the "why" behind the numbers</li>
                <li>• Quantitative factors give you the "what" and "how much"</li>
                <li>• Together, they provide a complete investment thesis</li>
                <li>• Don't rely on just one type of analysis</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "key-documents",
        title: "Key Documents to Analyze",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Key Documents to Analyze
              </h3>
              <p className="text-green-700 text-lg mb-4">
                These three financial statements are the foundation of fundamental analysis and provide the data you need to make informed decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">The Balance Sheet</h4>
                <p className="text-gray-700 mb-3">
                  A snapshot of the company's assets, liabilities, and shareholder equity at a specific point in time.
                </p>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Key Questions:</strong> What does the company own? What does it owe? What's left for shareholders?
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-700">Assets (what it owns)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-700">Liabilities (what it owes)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-700">Equity (net worth)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">The Profit & Loss (P&L) Statement</h4>
                <p className="text-gray-700 mb-3">
                  Shows the company's revenues, costs, and profits over a period of time.
                </p>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>Key Questions:</strong> Is the company profitable? Are revenues growing? Are costs under control?
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-700">Revenue (top line)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-700">Expenses (costs)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-700">Net income (bottom line)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">The Cash Flow Statement</h4>
                <p className="text-gray-700 mb-3">
                  Tracks the actual cash coming in and going out of the business.
                </p>
                <div className="bg-purple-50 p-3 rounded border border-purple-200">
                  <p className="text-sm text-purple-700">
                    <strong>Key Questions:</strong> Is the company generating cash? Can it pay its bills? Is it investing wisely?
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-sm text-gray-700">Operating cash flow</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-sm text-gray-700">Investing activities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-sm text-gray-700">Financing activities</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-3">🎯 Analysis Strategy</h4>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• Start with the P&L to understand profitability trends</li>
                <li>• Check the balance sheet for financial strength</li>
                <li>• Verify cash flow to ensure sustainability</li>
                <li>• Compare with industry peers and historical data</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Fundamental Analysis Quiz",
        isRequired: true,
        type: "quiz" as const,
        minScore: 4,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Test Your Knowledge
              </h3>
              <p className="text-blue-700 mb-4">
                Answer these questions to check your understanding of fundamental analysis concepts.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What is the main goal of fundamental analysis?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">To predict short-term price movements</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">To determine a company's intrinsic value</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">To time the market perfectly</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. Which of the following is a qualitative factor?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Revenue growth rate</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Management quality</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Debt-to-equity ratio</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What does the balance sheet show?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Company's performance over time</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Company's financial position at a point in time</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Cash flow movements</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    4. Which statement shows profitability over time?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Balance Sheet</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Profit & Loss Statement</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Cash Flow Statement</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    5. What is the core belief of fundamental analysis?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Market prices are always correct</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Market prices can be wrong in the short term</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Technical analysis is more reliable</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "interactive-selection",
        title: "Analysis Focus Areas",
        isRequired: true,
        type: "selection" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Choose Your Analysis Focus Areas
              </h3>
              <p className="text-green-700 mb-6">
                Select the areas of fundamental analysis you want to focus on in your investment research.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Qualitative Analysis</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Business model analysis</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Competitive advantage assessment</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Management quality evaluation</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Industry position analysis</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Quantitative Analysis</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Financial statement analysis</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Ratio calculations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Trend analysis</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Peer comparison</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Investment Strategy</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Value investing</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Growth investing</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Dividend investing</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Long-term holding</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Intrinsic Value Focus</h4>
                      <p className="text-green-700 text-sm">Fundamental analysis evaluates a company's <strong>intrinsic value</strong> based on its business fundamentals.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Dual Approach</h4>
                      <p className="text-green-700 text-sm">It combines both <strong>qualitative</strong> (business model, management) and <strong>quantitative</strong> (financial statements) factors.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Undervalued Opportunities</h4>
                      <p className="text-green-700 text-sm">The goal is to find stocks that are <strong>undervalued</strong> by the market.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Long-term Perspective</h4>
                      <p className="text-green-700 text-sm">Fundamental analysis is best suited for long-term investment decisions.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice analyzing real company financial statements</li>
                  <li>• Learn to calculate key financial ratios</li>
                  <li>• Study successful value investors' methodologies</li>
                  <li>• Compare companies within the same industry</li>
                  <li>• Build your own fundamental analysis checklist</li>
                </ul>
              </div>
            </div>
          </div>
        )
      }
    ]
  };

  const handleComplete = () => {
    console.log('Lesson completed!');
  };

  const handlePartComplete = (partId: string) => {
    console.log(`Part ${partId} completed!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {lessonData.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {lessonData.description}
          </p>
          
          <AudioSummary
            title={lessonData.title}
            description={lessonData.description}
            hindiAudioUrl={lessonData.audioFiles.hi}
            englishAudioUrl={lessonData.audioFiles.en}
            bengaliAudioUrl={lessonData.audioFiles.bn}
            tamilAudioUrl={lessonData.audioFiles.ta}
            marathiAudioUrl={lessonData.audioFiles.mr}
            hindiTranscript={lessonData.transcript.hi}
            englishTranscript={lessonData.transcript.en}
            bengaliTranscript={lessonData.transcript.bn}
            tamilTranscript={lessonData.transcript.ta}
            marathiTranscript={lessonData.transcript.mr}
          />
        </div>
        
        <MultiPartLesson
          parts={lessonData.parts}
          onComplete={handleComplete}
          onPartComplete={handlePartComplete}
        />
      </div>
    </div>
  );
}
