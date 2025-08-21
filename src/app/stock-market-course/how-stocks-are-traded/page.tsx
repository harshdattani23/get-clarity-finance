"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function HowStocksAreTradedPage() {
  const lessonData = {
    title: "How Stocks are Traded",
    description: "Discover how stocks are traded, from IPOs to daily trading, understand the key players involved, and learn about the complete trading process.",
    lessonSlug: "how-stocks-are-traded",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/how-stocks-are-traded-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/how-stocks-are-traded-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/how-stocks-are-traded-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/how-stocks-are-traded-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/how-stocks-are-traded-mr.m4a"
    },
    transcript: {
      en: "How Stocks are Traded: Discover how stocks are traded, from IPOs to daily trading, understand the key players involved, and learn about the complete trading process.",
      hi: "स्टॉक कैसे ट्रेड किए जाते हैं: जानें कि स्टॉक कैसे ट्रेड किए जाते हैं, आईपीओ से लेकर दैनिक ट्रेडिंग तक, शामिल प्रमुख खिलाड़ियों को समझें।",
      bn: "কীভাবে স্টক ট্রেড হয়: আবিষ্কার করুন কীভাবে স্টক ট্রেড হয়, আইপিও থেকে দৈনিক ট্রেডিং পর্যন্ত, জড়িত মূল খেলোয়াড়দের বুঝুন।",
      ta: "பங்குகள் எவ்வாறு வர்த்தகம் செய்யப்படுகின்றன: பங்குகள் எவ்வாறு வர்த்தகம் செய்யப்படுகின்றன என்பதைக் கண்டறியுங்கள், IPO முதல் தினசரி வர்த்தகம் வரை.",
      mr: "स्टॉक कसे ट्रेड केले जातात: स्टॉक कसे ट्रेड केले जातात ते शोधा, IPO पासून दैनिक ट्रेडिंग पर्यंत, सामील असलेल्या प्रमुख खेळाडूंना समजून घ्या."
    },
    parts: [
      {
        id: 'introduction',
        title: 'Understanding Stock Trading',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you'll discover how stocks are traded, from IPOs to daily trading, understand the key players involved, and learn about the complete trading process.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                The Mechanics of Stock Trading
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding how stocks are traded is essential for any investor. This lesson will take you through the entire process, from when a company first goes public to how millions of shares change hands every day.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You'll learn about primary vs secondary markets, the trading process, key players, and best practices for successful trading.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Concepts</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Primary vs Secondary markets</li>
                  <li>• Trading process and order types</li>
                  <li>• Key players in stock trading</li>
                  <li>• Settlement and risk management</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Practical Skills</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Understand order execution</li>
                  <li>• Learn about trading costs</li>
                  <li>• Master risk management</li>
                  <li>• Follow best practices</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'primary-secondary',
        title: 'Primary vs Secondary Markets',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Two Types of Stock Markets
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Stocks are traded in two different types of markets, each serving a specific purpose in the investment ecosystem.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Primary Market</h4>
                <p className="text-blue-700 mb-3">
                  Where companies first sell their shares to the public through Initial Public Offerings (IPOs).
                </p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✓ New Shares</p>
                    <p className="text-blue-700 text-sm">Companies issue new shares to raise capital</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✓ Direct Purchase</p>
                    <p className="text-blue-700 text-sm">You buy directly from the company</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✓ IPO Process</p>
                    <p className="text-blue-700 text-sm">Initial public offering of shares</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✗ Limited Access</p>
                    <p className="text-blue-700 text-sm">Only available during IPO periods</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Secondary Market</h4>
                <p className="text-green-700 mb-3">
                  Where investors trade existing shares among themselves on stock exchanges.
                </p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✓ Existing Shares</p>
                    <p className="text-green-700 text-sm">Trading of already-issued shares</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✓ Continuous Trading</p>
                    <p className="text-green-700 text-sm">Available during market hours</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✓ Price Discovery</p>
                    <p className="text-green-700 text-sm">Market determines share prices</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✓ High Liquidity</p>
                    <p className="text-green-700 text-sm">Easy to buy and sell</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
              <p className="text-lg font-semibold text-yellow-800">
                Most individual investors trade in the secondary market through stock exchanges!
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'trading-process',
        title: 'The Trading Process',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                How a Trade Happens
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you place an order to buy or sell stocks, here's what happens behind the scenes:
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-blue-800">Place Order</h4>
                  <p className="text-blue-700 text-sm">You place a buy/sell order through your broker</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-green-800">Order Routing</h4>
                  <p className="text-green-700 text-sm">Your broker sends the order to the exchange</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex items-center">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-purple-800">Order Matching</h4>
                  <p className="text-purple-700 text-sm">Exchange matches your order with a counterparty</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex items-center">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-orange-800">Execution</h4>
                  <p className="text-orange-700 text-sm">Trade is executed and confirmed</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-center">
                <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-red-800">Settlement</h4>
                  <p className="text-red-700 text-sm">Money and shares change hands (T+2 in India)</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-700 text-center">
                <strong>T+2 Settlement:</strong> In India, when you buy stocks on Monday, you get them in your demat account on Wednesday!
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
                Stock Trading Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of how stocks are traded!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Where do companies first sell their shares to the public?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Secondary market</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Primary market</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>Stock exchange</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What does T+2 settlement mean?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Trade happens in 2 minutes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>Shares are delivered 2 days after purchase</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>You pay 2 days after buying</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. Most individual investors trade in which market?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Primary market</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Secondary market</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Both markets equally</span>
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
