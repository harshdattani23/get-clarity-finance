"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function DifferentTypesOfStocksPage() {
  const lessonData = {
    title: "Different Types of Stocks",
    description: "Discover the different ways stocks are classified and categorized. Learn about common vs preferred stocks, market capitalization categories, and how to build a diversified portfolio.",
    lessonSlug: "different-types-of-stocks",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/different-types-of-stocks-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/different-types-of-stocks-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/different-types-of-stocks-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/different-types-of-stocks-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/different-types-of-stocks-mr.m4a"
    },
    transcript: {
      en: "Different Types of Stocks: Discover the different ways stocks are classified and categorized. Learn about common vs preferred stocks, market capitalization categories, and how to build a diversified portfolio based on your risk tolerance.",
      hi: "विभिन्न प्रकार के स्टॉक: जानें कि स्टॉक को कैसे वर्गीकृत और श्रेणीबद्ध किया जाता है। कॉमन बनाम प्रेफर्ड स्टॉक, मार्केट कैपिटलाइज़ेशन श्रेणियां सीखें।",
      bn: "বিভিন্ন ধরনের স্টক: আবিষ্কার করুন কীভাবে স্টকগুলি শ্রেণীবদ্ধ এবং বিভাগীকৃত হয়। কমন বনাম পছন্দের স্টক, মার্কেট ক্যাপিটালাইজেশন বিভাগ সম্পর্কে জানুন।",
      ta: "பங்குகளின் வெவ்வேறு வகைகள்: பங்குகள் எவ்வாறு வகைப்படுத்தப்பட்டு பிரிக்கப்படுகின்றன என்பதைக் கண்டறியுங்கள். பொதுவான மற்றும் விருப்பமான பங்குகள், சந்தை மூலதன வகைகள் பற்றி அறியுங்கள்।",
      mr: "स्टॉकचे विविध प्रकार: स्टॉक कसे वर्गीकृत आणि श्रेणीबद्ध केले जातात ते शोधा। कॉमन विरुद्ध प्राधान्य स्टॉक, मार्केट कॅपिटलायझेशन श्रेणी जाणून घ्या।"
    },
    parts: [
      {
        id: 'introduction',
        title: 'Understanding Stock Classification',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you'll discover the different ways stocks are classified and categorized. Learn about common vs preferred stocks, market capitalization categories, and how to build a diversified portfolio based on your risk tolerance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why Stock Classification Matters
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Just like there are different types of cars (sedans, SUVs, sports cars), there are different types of stocks, each with unique characteristics, risks, and potential rewards. Understanding these differences is crucial for building a well-balanced portfolio.
              </p>
              <p className="text-gray-700 leading-relaxed">
                In this lesson, we'll explore the major ways stocks are classified and how each type fits into different investment strategies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Classifications</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Common vs Preferred stocks</li>
                  <li>• Market capitalization (Large/Mid/Small cap)</li>
                  <li>• Investment style (Growth vs Value)</li>
                  <li>• Sector-based classification</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Investment Benefits</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Build diversified portfolios</li>
                  <li>• Match investments to risk tolerance</li>
                  <li>• Understand risk-return profiles</li>
                  <li>• Make informed investment decisions</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'common-vs-preferred',
        title: 'Common vs Preferred Stocks',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                The Two Main Types
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Every company can issue two basic types of stock: common stock and preferred stock. Each comes with different rights and characteristics.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Common Stock</h4>
                <p className="text-blue-700 mb-3">
                  The most common type of stock that gives you ownership in a company and voting rights.
                </p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✓ Voting Rights</p>
                    <p className="text-blue-700 text-sm">Vote on company decisions and board members</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✓ Dividends (Maybe)</p>
                    <p className="text-blue-700 text-sm">May receive dividends, but not guaranteed</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✓ Capital Appreciation</p>
                    <p className="text-blue-700 text-sm">Benefit from stock price increases</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✗ Last in Line</p>
                    <p className="text-blue-700 text-sm">Last to get paid if company goes bankrupt</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Preferred Stock</h4>
                <p className="text-green-700 mb-3">
                  A hybrid between stocks and bonds, offering more predictable income but less growth potential.
                </p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✓ Fixed Dividends</p>
                    <p className="text-green-700 text-sm">Guaranteed dividend payments before common stockholders</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✓ Priority</p>
                    <p className="text-green-700 text-sm">Get paid before common stockholders in bankruptcy</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✗ No Voting Rights</p>
                    <p className="text-green-700 text-sm">Usually no say in company decisions</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✗ Limited Upside</p>
                    <p className="text-green-700 text-sm">Less potential for capital appreciation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
              <p className="text-lg font-semibold text-yellow-800">
                Most individual investors buy common stock for the growth potential!
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'market-cap',
        title: 'Market Capitalization Categories',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Size Matters: Market Cap Classification
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Market capitalization (market cap) is the total value of a company's shares. It's calculated by multiplying the stock price by the number of outstanding shares.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <p className="text-lg font-semibold text-blue-800">
                  Market Cap = Stock Price × Number of Outstanding Shares
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Large Cap (₹20,000+ Crores)</h4>
                <p className="text-green-700 mb-3">
                  Well-established, stable companies with proven business models.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-green-800 font-medium mb-2">Characteristics:</p>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Stable and mature companies</li>
                      <li>• Lower volatility</li>
                      <li>• Often pay dividends</li>
                      <li>• Blue-chip stocks</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-800 font-medium mb-2">Examples:</p>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Reliance Industries</li>
                      <li>• TCS</li>
                      <li>• HDFC Bank</li>
                      <li>• Infosys</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Mid Cap (₹5,000-20,000 Crores)</h4>
                <p className="text-blue-700 mb-3">
                  Growing companies with good potential but more risk than large caps.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-800 font-medium mb-2">Characteristics:</p>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Growth-oriented companies</li>
                      <li>• Moderate volatility</li>
                      <li>• Expanding market presence</li>
                      <li>• Good growth potential</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-blue-800 font-medium mb-2">Examples:</p>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Zomato</li>
                      <li>• Nykaa</li>
                      <li>• Paytm</li>
                      <li>• Policy Bazaar</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">Small Cap (Less than ₹5,000 Crores)</h4>
                <p className="text-purple-700 mb-3">
                  Smaller, emerging companies with high growth potential but also high risk.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-purple-800 font-medium mb-2">Characteristics:</p>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• High growth potential</li>
                      <li>• High volatility</li>
                      <li>• Less liquid</li>
                      <li>• Riskier investments</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-purple-800 font-medium mb-2">Risk Factors:</p>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Business uncertainty</li>
                      <li>• Limited resources</li>
                      <li>• Market competition</li>
                      <li>• Regulatory changes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'quiz',
        title: 'Test Your Knowledge',
        isRequired: true,
        type: 'quiz' as const,
        minScore: 70,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Stock Types Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of different types of stocks!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the main advantage of common stock?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Guaranteed dividends</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Voting rights and growth potential</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>No risk of loss</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. A company with market cap of ₹15,000 crores is classified as:</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Large Cap</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>Mid Cap</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Small Cap</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. Which type of stock typically offers more stability?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Small Cap stocks</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Large Cap stocks</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>All stocks are equally stable</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]
  };

  const handleComplete = () => {
    // Lesson completion handled
  };

  const handlePartComplete = () => {
    // Part completion handled
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