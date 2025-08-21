"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function MarketIndicesPage() {
  const lessonData = {
    title: "Market Indices",
    description: "Learn how market indices work as a barometer for the overall health of the stock market.",
    lessonSlug: "market-indices",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/market-indices-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/market-indices-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/market-indices-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/market-indices-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/market-indices-mr.m4a"
    },
    transcript: {
      en: "Market Indices: Learn how market indices work as a barometer for the overall health of the stock market. Understand BSE Sensex and NSE Nifty 50, how they're calculated, and why they matter to investors.",
      hi: "मार्केट इंडेक्स: जानें कि मार्केट इंडेक्स कैसे काम करते हैं और स्टॉक मार्केट के समग्र स्वास्थ्य के लिए बैरोमीटर के रूप में कार्य करते हैं।",
      bn: "মার্কেট ইনডেক্স: শিখুন কীভাবে মার্কেট ইনডেক্স কাজ করে এবং স্টক মার্কেটের সামগ্রিক স্বাস্থ্যের জন্য ব্যারোমিটার হিসাবে কাজ করে।",
      ta: "சந்தை குறியீடுகள்: சந்தை குறியீடுகள் எவ்வாறு வேலை செய்கின்றன மற்றும் பங்குச் சந்தையின் ஒட்டுமொத்த ஆரோக்கியத்திற்கு பரோமீட்டராக எவ்வாறு செயல்படுகின்றன என்பதைக் கற்றுக்கொள்ளுங்கள்.",
      mr: "मार्केट इंडेक्स: मार्केट इंडेक्स कसे काम करतात आणि स्टॉक मार्केटच्या एकूण आरोग्यासाठी बॅरोमीटर म्हणून कसे काम करतात हे शिका."
    },
    parts: [
      {
        id: "introduction",
        title: "Understanding Market Indices",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you'll learn how market indices work as a barometer for the overall health of the stock market.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What are Market Indices?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A market index is a statistical measure of the performance of a specific group of stocks. It provides a snapshot of the market's health and direction.
              </p>
              <p className="text-gray-700 leading-relaxed">
                In India, the two most famous indices are the BSE Sensex and NSE Nifty 50, which serve as benchmarks for the overall market performance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Concepts</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• What market indices represent</li>
                  <li>• BSE Sensex and NSE Nifty 50</li>
                  <li>• How indices are calculated</li>
                  <li>• Why indices matter to investors</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Why It Matters</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Market health indicator</li>
                  <li>• Investment performance benchmark</li>
                  <li>• Economic sentiment gauge</li>
                  <li>• Portfolio comparison tool</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "indian-indices",
        title: "Major Indian Market Indices",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                BSE Sensex
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The BSE Sensex (Sensitive Index) is India's oldest stock index, tracking 30 of the largest and most actively traded stocks on the Bombay Stock Exchange.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium">
                  The Sensex represents about 45% of the total market capitalization of BSE-listed companies.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                NSE Nifty 50
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The NSE Nifty 50 tracks 50 large-cap stocks from the National Stock Exchange, representing diverse sectors of the Indian economy.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium">
                  Nifty 50 represents about 65% of the total market capitalization of NSE-listed companies.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">BSE Sensex</h4>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• 30 stocks</li>
                  <li>• Market cap weighted</li>
                  <li>• Free float methodology</li>
                  <li>• Base year: 1978-79</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">NSE Nifty 50</h4>
                <ul className="text-purple-700 space-y-1 text-sm">
                  <li>• 50 stocks</li>
                  <li>• Market cap weighted</li>
                  <li>• Free float methodology</li>
                  <li>• Base year: 1995</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "how-calculated",
        title: "How Indices are Calculated",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Market Capitalization Weighting
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Both Sensex and Nifty use market capitalization weighting, meaning larger companies have more influence on the index value.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <p className="text-lg font-semibold text-blue-800">
                  Index Value = (Total Market Cap / Base Market Cap) × Base Value
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Free Float Methodology
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Only freely tradable shares are considered, excluding promoter holdings and strategic investments that are not available for trading.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium">
                  This ensures the index reflects actual trading activity and market sentiment.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">What's Included</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Public shareholdings</li>
                  <li>• Institutional holdings</li>
                  <li>• Retail investor shares</li>
                  <li>• Mutual fund holdings</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">What's Excluded</h4>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>• Promoter holdings</li>
                  <li>• Government stakes</li>
                  <li>• Strategic investments</li>
                  <li>• Locked-in shares</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "why-matter",
        title: "Why Market Indices Matter",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Market Health Indicator
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Indices provide a quick snapshot of overall market sentiment and economic health. When indices rise, it generally indicates positive market sentiment.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium">
                  Think of indices as the "pulse" of the market - they tell you if the market is healthy, growing, or facing challenges.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Investment Performance Benchmark
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Investors use indices to compare their portfolio performance. If your portfolio returns 15% but the index returns 20%, you're underperforming the market.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium">
                  This comparison helps you understand if your investment strategy is working or needs adjustment.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Economic Sentiment</h4>
                <ul className="text-purple-700 space-y-1 text-sm">
                  <li>• Economic growth indicator</li>
                  <li>• Investor confidence measure</li>
                  <li>• Global market comparison</li>
                  <li>• Policy impact assessment</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Portfolio Management</h4>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• Performance benchmarking</li>
                  <li>• Risk assessment</li>
                  <li>• Asset allocation decisions</li>
                  <li>• Investment timing</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Test Your Knowledge",
        isRequired: true,
        type: 'quiz' as const,
        minScore: 70,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Market Indices Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of market indices!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What does the BSE Sensex track?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>50 stocks from NSE</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>30 stocks from BSE</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>100 stocks from both exchanges</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which methodology do both Sensex and Nifty use?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Price-weighted</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>Market cap weighted</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Equal-weighted</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What is excluded from index calculations?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Retail investor shares</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Promoter holdings</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Mutual fund holdings</span>
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
