"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function ReadingAStockQuotePage() {
  const lessonData = {
    title: "Reading a Stock Quote",
    description: "Learn to decode the numbers and symbols in a stock quote to quickly understand a stock's performance and valuation.",
    lessonSlug: "reading-a-stock-quote",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/reading-a-stock-quote-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/reading-a-stock-quote-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/reading-a-stock-quote-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/reading-a-stock-quote-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/reading-a-stock-quote-mr.m4a"
    },
    transcript: {
      en: "Reading a Stock Quote: Learn to decode the numbers and symbols in a stock quote to quickly understand a stock's performance and valuation. Master the language of stock market data.",
      hi: "स्टॉक कोट पढ़ना: स्टॉक कोट में संख्याओं और प्रतीकों को डिकोड करना सीखें ताकि स्टॉक के प्रदर्शन और मूल्यांकन को जल्दी से समझ सकें।",
      bn: "স্টক কোট পড়া: স্টক কোটে সংখ্যা এবং অক্ষরগুলি ডিকোড করতে শিখুন যাতে স্টকের পারফরম্যান্স এবং মূল্যায়ন দ্রুত বুঝতে পারেন।",
      ta: "பங்கு விலை படித்தல்: பங்கின் செயல்திறன் மற்றும் மதிப்பீட்டை விரைவாகப் புரிந்துகொள்ள பங்கு விலையில் உள்ள எண்கள் மற்றும் குறியீடுகளை படிக்க கற்றுக்கொள்ளுங்கள்.",
      mr: "स्टॉक कोट वाचणे: स्टॉकचे कामगिरी आणि मूल्यांकन जलद समजून घेण्यासाठी स्टॉक कोटमधील संख्या आणि चिन्हे डिकोड करणे शिका."
    },
    parts: [
      {
        id: 'introduction',
        title: 'Understanding Stock Quotes',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you'll learn to decode the numbers and symbols in a stock quote to quickly understand a stock's performance and valuation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is a Stock Quote?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A stock quote is a snapshot of a stock's essential financial information. It might look like a jumble of numbers at first, but it's easy to understand once you know what to look for.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Think of it as a "vital signs" monitor for a company's stock - showing you the current price, how it's performing today, and key metrics that help you make informed decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Components</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Current price and change</li>
                  <li>• Trading volume and market cap</li>
                  <li>• High/low prices for the day</li>
                  <li>• P/E ratio and dividend yield</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Why It Matters</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Quick performance assessment</li>
                  <li>• Comparison with other stocks</li>
                  <li>• Entry/exit timing decisions</li>
                  <li>• Risk and reward evaluation</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'key-components',
        title: 'Key Components of a Stock Quote',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Breaking Down the Numbers
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Let's examine each component of a stock quote and understand what it tells you about the stock.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Price Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-800 font-medium mb-2">Current Price:</p>
                    <p className="text-blue-700 text-sm">The latest trading price of the stock</p>
                  </div>
                  <div>
                    <p className="text-blue-800 font-medium mb-2">Change:</p>
                    <p className="text-blue-700 text-sm">How much the price moved today (+/-)</p>
                  </div>
                  <div>
                    <p className="text-blue-800 font-medium mb-2">% Change:</p>
                    <p className="text-blue-700 text-sm">Percentage change from previous close</p>
                  </div>
                  <div>
                    <p className="text-blue-800 font-medium mb-2">Previous Close:</p>
                    <p className="text-blue-700 text-sm">Yesterday's closing price</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Trading Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-green-800 font-medium mb-2">Volume:</p>
                    <p className="text-green-700 text-sm">Number of shares traded today</p>
                  </div>
                  <div>
                    <p className="text-green-800 font-medium mb-2">Market Cap:</p>
                    <p className="text-green-700 text-sm">Total value of all company shares</p>
                  </div>
                  <div>
                    <p className="text-green-800 font-medium mb-2">Day Range:</p>
                    <p className="text-green-700 text-sm">Highest and lowest prices today</p>
                  </div>
                  <div>
                    <p className="text-green-800 font-medium mb-2">52-Week Range:</p>
                    <p className="text-green-700 text-sm">Highest and lowest prices in a year</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">Valuation Metrics</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-purple-800 font-medium mb-2">P/E Ratio:</p>
                    <p className="text-purple-700 text-sm">Price-to-Earnings ratio</p>
                  </div>
                  <div>
                    <p className="text-purple-800 font-medium mb-2">Dividend Yield:</p>
                    <p className="text-purple-700 text-sm">Annual dividend as % of price</p>
                  </div>
                  <div>
                    <p className="text-purple-800 font-medium mb-2">Beta:</p>
                    <p className="text-purple-700 text-sm">Stock's volatility vs market</p>
                  </div>
                  <div>
                    <p className="text-purple-800 font-medium mb-2">EPS:</p>
                    <p className="text-purple-700 text-sm">Earnings per share</p>
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
                Stock Quote Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of stock quotes!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What does the "Change" column in a stock quote show?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Total change over the year</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>How much the price moved today</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>The price when you buy</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What does "Volume" represent?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Stock price</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>Number of shares traded today</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Company size</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What does P/E ratio stand for?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Price and Earnings</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Price-to-Earnings ratio</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Profit and Equity</span>
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
