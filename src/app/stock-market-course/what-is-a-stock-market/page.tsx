"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function WhatIsAStockMarketPage() {
  const lessonData = {
    title: "What is a Stock Market?",
    description: "Discover what a stock market is, how it functions, and its crucial role in the Indian economy.",
    lessonSlug: "what-is-a-stock-market",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/what-is-a-stock-market-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/what-is-a-stock-market-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/what-is-a-stock-market-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/what-is-a-stock-market-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/what-is-a-stock-market-mr.m4a"
    },
    transcript: {
      en: "What is a Stock Market? Discover what a stock market is, how it functions, and its crucial role in the Indian economy. Learn about the major exchanges, trading hours, and how to get started.",
      hi: "स्टॉक मार्केट क्या है? जानें कि स्टॉक मार्केट क्या है, यह कैसे काम करता है, और भारतीय अर्थव्यवस्था में इसकी महत्वपूर्ण भूमिका।",
      bn: "স্টক মার্কেট কী? আবিষ্কার করুন স্টক মার্কেট কী, এটি কীভাবে কাজ করে এবং ভারতীয় অর্থনীতিতে এর গুরুত্বপূর্ণ ভূমিকা।",
      ta: "பங்குச் சந்தை என்றால் என்ன? பங்குச் சந்தை என்றால் என்ன, அது எவ்வாறு செயல்படுகிறது மற்றும் இந்திய பொருளாதாரத்தில் அதன் முக்கிய பங்கை கண்டறியுங்கள்।",
      mr: "स्टॉक मार्केट म्हणजे काय? स्टॉक मार्केट काय आहे, ते कसे कार्य करते आणि भारतीय अर्थव्यवस्थेतील त्याची महत्वपूर्ण भूमिका शोधा."
    },
    parts: [
      {
        id: 'introduction',
        title: 'What is a Stock Market?',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you'll discover what a stock market is, how it functions, and its crucial role in the Indian economy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is a Stock Market?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A stock market is a public marketplace where shares of publicly traded companies are bought, sold, and traded. In India, it's a complex ecosystem that includes stock exchanges like NSE and BSE, brokers, investors, and regulatory bodies like SEBI.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Think of it like a giant, well-organized supermarket in Mumbai's Crawford Market. But instead of selling fruits and vegetables, it sells stocks (ownership pieces) of publicly listed Indian companies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Functions</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Capital formation for Indian companies</li>
                  <li>• Provides liquidity for investors</li>
                  <li>• Enables price discovery</li>
                  <li>• Wealth creation opportunities</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Regulated by SEBI for investor protection</li>
                  <li>• Trading hours: 9:15 AM to 3:30 PM IST</li>
                  <li>• Operates Monday through Friday</li>
                  <li>• Multiple asset classes available</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'major-exchanges',
        title: 'Major Indian Stock Exchanges',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                NSE and BSE: India's Twin Pillars
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                India has two major stock exchanges where most trading happens: the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE).
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">NSE (National Stock Exchange)</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Established:</strong> 1992</li>
                  <li>• <strong>Location:</strong> Mumbai</li>
                  <li>• <strong>Key Index:</strong> Nifty 50</li>
                  <li>• <strong>Trading System:</strong> Fully electronic</li>
                  <li>• <strong>Market Cap:</strong> Larger than BSE</li>
                  <li>• <strong>Specialty:</strong> Derivatives trading</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">BSE (Bombay Stock Exchange)</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>Established:</strong> 1875</li>
                  <li>• <strong>Location:</strong> Mumbai</li>
                  <li>• <strong>Key Index:</strong> Sensex</li>
                  <li>• <strong>Historic:</strong> Asia's oldest stock exchange</li>
                  <li>• <strong>Listed Companies:</strong> More companies listed</li>
                  <li>• <strong>Specialty:</strong> SME platform</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
              <p className="text-lg font-semibold text-yellow-800">
                Both exchanges operate simultaneously and offer similar services to investors!
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'how-it-works',
        title: 'How the Stock Market Works',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                The Trading Process
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you want to buy or sell stocks, here's what happens behind the scenes:
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-blue-800">You Place an Order</h4>
                  <p className="text-blue-700 text-sm">Through your broker's app or website</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-green-800">Broker Processes Order</h4>
                  <p className="text-green-700 text-sm">Your broker sends the order to the exchange</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex items-center">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-purple-800">Exchange Matches Orders</h4>
                  <p className="text-purple-700 text-sm">The exchange finds a buyer for your sell order (or vice versa)</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex items-center">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-orange-800">Settlement Happens</h4>
                  <p className="text-orange-700 text-sm">Money and stocks change hands (T+2 settlement in India)</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-700 text-center">
                <strong>T+2 Settlement:</strong> When you buy stocks on Monday, you get them in your demat account on Wednesday!
              </p>
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
                Stock Market Basics Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of the stock market!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What are India's two major stock exchanges?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>NSE and BSE</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>SEBI and RBI</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>NYSE and NASDAQ</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are normal trading hours in India?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>9:15 AM to 3:30 PM</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>10:00 AM to 4:00 PM</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>24 hours a day</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What does T+2 settlement mean?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Stocks are delivered 2 days after purchase</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>You pay 2 days after buying</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Trading happens for 2 days</span>
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