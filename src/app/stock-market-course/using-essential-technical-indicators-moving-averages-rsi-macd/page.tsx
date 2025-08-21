"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function TechnicalIndicatorsPage() {
  const lessonData = {
    title: "Using Essential Technical Indicators (Moving Averages, RSI, MACD)",
    description: "Learn to use the most important technical indicators - Moving Averages, RSI, and MACD - to time your trades and identify market trends.",
    lessonSlug: "using-essential-technical-indicators-moving-averages-rsi-macd",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-indicators-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-indicators-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-indicators-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-indicators-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/technical-indicators-mr.m4a"
    },
    transcript: {
      en: "Technical Indicators: Learn to use the most important technical indicators - Moving Averages, RSI, and MACD - to time your trades and identify market trends effectively.",
      hi: "तकनीकी संकेतक: व्यापार का समय निर्धारित करने और बाजार के रुझान की पहचान करने के लिए सबसे महत्वपूर्ण तकनीकी संकेतक - मूविंग एवरेजेस, RSI, और MACD का उपयोग करना सीखें।",
      bn: "প্রযুক্তিগত নির্দেশক: ট্রেডের সময় নির্ধারণ এবং বাজারের প্রবণতা চিহ্নিত করার জন্য সবচেয়ে গুরুত্বপূর্ণ প্রযুক্তিগত নির্দেশক - মুভিং অ্যাভারেজ, RSI, এবং MACD ব্যবহার করতে শিখুন।",
      ta: "தொழில்நுட்ப குறிகாட்டிகள்: வர்த்தகத்தின் நேரத்தை நிர்ணயிக்க மற்றும் சந்தைப் போக்குகளை அடையாளம் காண மிக முக்கியமான தொழில்நுட்ப குறிகாட்டிகள் - மூவிங் அவரேஜ், RSI, மற்றும் MACD ஐப் பயன்படுத்த கற்றுக்கொள்ளுங்கள்.",
      mr: "तांत्रिक निर्देशक: व्यापाराची वेळ ठरवण्यासाठी आणि बाजारातील ट्रेंड ओळखण्यासाठी सर्वात महत्वाचे तांत्रिक निर्देशक - मूव्हिंग अॅव्हरेजेस, RSI, आणि MACD वापरणे शिका."
    },
    parts: [
      {
        id: 'introduction',
        title: 'Understanding Technical Indicators',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Learn to use the most important technical indicators - Moving Averages, RSI, and MACD - to time your trades and identify market trends.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What are Technical Indicators?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Technical indicators are mathematical calculations based on a stock's price and volume data. They help traders and investors make informed decisions about when to buy or sell stocks.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Think of them as the "vital signs" of a stock - just like doctors use heart rate and blood pressure to assess health, traders use technical indicators to assess market conditions.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  📊 Technical Analysis = Reading Market Psychology Through Charts
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">What We'll Cover</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Moving Averages (trend direction)</li>
                  <li>• RSI (overbought/oversold)</li>
                  <li>• MACD (momentum changes)</li>
                  <li>• How to use them together</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• No indicator is 100% accurate</li>
                  <li>• Use multiple indicators</li>
                  <li>• Practice on paper first</li>
                  <li>• Combine with fundamental analysis</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'moving-averages',
        title: 'Moving Averages',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What are Moving Averages?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A Moving Average (MA) smooths out price data by creating a constantly updated average price over a specific time period. It's like finding the "average mood" of a stock over the last few days or weeks.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <p className="text-lg font-semibold text-blue-800">
                  Moving Average = Sum of Closing Prices ÷ Number of Days
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Types of Moving Averages</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium mb-2">Simple MA (SMA)</p>
                    <p className="text-blue-700 text-sm">Equal weight to all prices</p>
                    <p className="text-blue-700 text-sm">Example: 20-day SMA</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium mb-2">Exponential MA (EMA)</p>
                    <p className="text-blue-700 text-sm">More weight to recent prices</p>
                    <p className="text-blue-700 text-sm">More sensitive to changes</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Common Time Periods</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">Short-term</p>
                    <p className="text-green-700 text-sm">5, 10, 20 days</p>
                    <p className="text-green-700 text-sm">For quick signals</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">Medium-term</p>
                    <p className="text-green-700 text-sm">50, 100 days</p>
                    <p className="text-green-700 text-sm">For trend analysis</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">Long-term</p>
                    <p className="text-green-700 text-sm">200 days</p>
                    <p className="text-green-700 text-sm">For major trends</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">Trading Signals</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">✅ Buy Signal</p>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Price crosses above MA</li>
                      <li>• Short MA crosses above long MA</li>
                      <li>• "Golden Cross" (50 above 200)</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">❌ Sell Signal</p>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Price crosses below MA</li>
                      <li>• Short MA crosses below long MA</li>
                      <li>• "Death Cross" (50 below 200)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'rsi-macd',
        title: 'RSI and MACD',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                RSI and MACD: Momentum Indicators
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                While moving averages show trend direction, RSI and MACD help you understand momentum - how strong the buying or selling pressure is.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">RSI (Relative Strength Index)</h4>
                <p className="text-blue-700 mb-3">
                  RSI measures how fast and how much a stock's price is changing. It ranges from 0 to 100.
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">RSI &gt; 70</p>
                    <p className="text-blue-700 text-sm">Overbought</p>
                    <p className="text-blue-700 text-sm">Consider selling</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">RSI 30-70</p>
                    <p className="text-blue-700 text-sm">Normal range</p>
                    <p className="text-blue-700 text-sm">No clear signal</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">RSI &lt; 30</p>
                    <p className="text-blue-700 text-sm">Oversold</p>
                    <p className="text-blue-700 text-sm">Consider buying</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">MACD (Moving Average Convergence Divergence)</h4>
                <p className="text-green-700 mb-3">
                  MACD shows the relationship between two moving averages and helps identify momentum changes.
                </p>
                <div className="bg-white p-4 rounded border border-green-200">
                  <p className="text-green-800 font-medium mb-2">MACD Components:</p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• <strong>MACD Line:</strong> 12-day EMA minus 26-day EMA</li>
                    <li>• <strong>Signal Line:</strong> 9-day EMA of MACD line</li>
                    <li>• <strong>Histogram:</strong> MACD line minus Signal line</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">MACD Trading Signals</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">✅ Bullish Signals</p>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• MACD crosses above Signal line</li>
                      <li>• MACD crosses above zero</li>
                      <li>• Bullish divergence</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">❌ Bearish Signals</p>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• MACD crosses below Signal line</li>
                      <li>• MACD crosses below zero</li>
                      <li>• Bearish divergence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
              <p className="text-lg font-semibold text-yellow-800">
                💡 Pro Tip: Use all three indicators together for stronger signals!
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
                Technical Indicators Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of technical indicators!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What does RSI above 70 typically indicate?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Stock is oversold</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Stock is overbought</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>Stock is fairly valued</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What is a "Golden Cross"?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>50-day MA crosses above 200-day MA</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>50-day MA crosses below 200-day MA</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Price crosses above moving average</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What does MACD help identify?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Company fundamentals</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Momentum changes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Company earnings</span>
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