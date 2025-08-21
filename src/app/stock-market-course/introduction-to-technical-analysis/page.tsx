"use client";

import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";

export default function IntroTechnicalAnalysisPage() {
  const lessonData = {
    title: "Introduction to Technical Analysis",
    description: "Shift your focus from a company's fundamentals to its market statistics. Learn the basics of technical analysis and how it uses charts to predict future price movements.",
    lessonSlug: "introduction-to-technical-analysis",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/introduction-to-technical-analysis-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/introduction-to-technical-analysis-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/introduction-to-technical-analysis-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/introduction-to-technical-analysis-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/introduction-to-technical-analysis-mr.m4a"
    },
    transcript: {
      en: "Introduction to Technical Analysis: Shift your focus from a company's fundamentals to its market statistics. Learn the basics of technical analysis and how it uses charts to predict future price movements.",
      hi: "तकनीकी विश्लेषण का परिचय: कंपनी के मौलिक सिद्धांतों से उसके बाजार आंकड़ों पर ध्यान केंद्रित करें।",
      bn: "প্রযুক্তিগত বিশ্লেষণের পরিচয়: একটি কোম্পানির মৌলিক নীতি থেকে তার বাজার পরিসংখ্যানে আপনার ফোকাস পরিবর্তন করুন।",
      ta: "தொழில்நுட்ப பகுப்பாய்வு அறிமுகம்: நிறுவனத்தின் அடிப்படைக் கொள்கைகளிலிருந்து அதன் சந்தை புள்ளிவிவரங்களுக்கு உங்கள் கவனத்தை மாற்றுங்கள்.",
      mr: "तांत्रिक विश्लेषणाचा परिचय: कंपनीच्या मूलभूत तत्त्वांपासून त्याच्या बाजार आकडेवारीकडे तुमचे लक्ष वळवा."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Technical Analysis",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Shift your focus from a company's fundamentals to its market statistics. Learn the basics of technical analysis and how it uses charts to predict future price movements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is Technical Analysis?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Technical analysis is a trading discipline that evaluates investments and identifies trading opportunities by analyzing statistical trends gathered from trading activity, such as price movement and volume.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The core assumption is that all known information is already priced into the stock, and that history tends to repeat itself.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  Think of technical analysis as reading the "footprints" that price leaves behind!
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Identify entry and exit points</li>
                  <li>• Spot trend reversals early</li>
                  <li>• Manage risk effectively</li>
                  <li>• Time your trades better</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
                <ul className="text-orange-800 space-y-1 text-sm">
                  <li>• Use with fundamental analysis</li>
                  <li>• No method is 100% accurate</li>
                  <li>• Practice with paper trading</li>
                  <li>• Start with simple patterns</li>
                </ul>
              </div>
            </div>

            <AudioSummary
              title="Introduction to Technical Analysis"
              description="Shift your focus from a company's fundamentals to its market statistics. Learn the basics of technical analysis and how it uses charts to predict future price movements."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/introduction-to-technical-analysis-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/introduction-to-technical-analysis-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/introduction-to-technical-analysis-bn.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/introduction-to-technical-analysis-ta.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/introduction-to-technical-analysis-mr.m4a"
              hindiTranscript="तकनीकी विश्लेषण का परिचय: कंपनी के मौलिक सिद्धांतों से उसके बाजार आंकड़ों पर ध्यान केंद्रित करें।"
              englishTranscript="Introduction to Technical Analysis: Shift your focus from a company's fundamentals to its market statistics. Learn the basics of technical analysis and how it uses charts to predict future price movements."
              bengaliTranscript="প্রযুক্তিগত বিশ্লেষণের পরিচয়: একটি কোম্পানির মৌলিক নীতি থেকে তার বাজার পরিসংখ্যানে আপনার ফোকাস পরিবর্তন করুন।"
              tamilTranscript="தொழில்நுட்ப பகுப்பாய்வு அறிமுகம்: நிறுவனத்தின் அடிப்படைக் கொள்கைகளிலிருந்து அதன் சந்தை புள்ளிவிவரங்களுக்கு உங்கள் கவனத்தை மாற்றுங்கள்."
              marathiTranscript="तांत्रिक विश्लेषणाचा परिचय: कंपनीच्या मूलभूत तत्त्वांपासून त्याच्या बाजार आकडेवारीकडे तुमचे लक्ष वळवा."
            />
          </div>
        )
      },
      {
        id: "core-principles",
        title: "Core Principles of Technical Analysis",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">
                🔍 Core Principles of Technical Analysis
              </h3>
              <p className="text-purple-700 text-lg">
                Understanding these fundamental principles will help you become a better technical analyst.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">1. Price Discounts Everything</h4>
                <p className="text-gray-700 mb-3">
                  All known information about a company is already reflected in its stock price. This includes earnings, news, and market sentiment.
                </p>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Example:</strong> When a company announces good earnings, the price often moves before you can react.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">2. Price Moves in Trends</h4>
                <p className="text-gray-700 mb-3">
                  Prices tend to move in identifiable trends rather than randomly. These trends can be upward, downward, or sideways.
                </p>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>Key Insight:</strong> "The trend is your friend" - trading with the trend is often more profitable.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">3. History Repeats Itself</h4>
                <p className="text-gray-700 mb-3">
                  Human psychology and market behavior patterns tend to repeat over time. Chart patterns and indicators work because of this principle.
                </p>
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="text-sm text-yellow-700">
                    <strong>Remember:</strong> While patterns repeat, they're not identical - context matters.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">4. Volume Confirms Price</h4>
                <p className="text-gray-700 mb-3">
                  Volume is the fuel that drives price movements. High volume during price moves confirms the strength of the move.
                </p>
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <p className="text-sm text-red-700">
                    <strong>Warning:</strong> Low volume price moves are often less reliable and can reverse quickly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "chart-types",
        title: "Types of Charts",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                📊 Types of Charts
              </h3>
              <p className="text-green-700 text-lg">
                Different chart types provide different perspectives on price action. Learn to use each one effectively.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">1. Line Charts</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Simplest form of chart that connects closing prices with lines.</p>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>Best for:</strong> Getting a quick overview of price trends
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>Limitation:</strong> Doesn't show price range or volume
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">2. Bar Charts</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Show open, high, low, and close prices for each period.</p>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-sm text-green-700">
                      <strong>Best for:</strong> Analyzing price ranges and volatility
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-sm text-green-700">
                      <strong>Advantage:</strong> More detailed than line charts
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">3. Candlestick Charts</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Most popular chart type that shows price action with colored candles.</p>
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <p className="text-sm text-purple-700">
                      <strong>Best for:</strong> Pattern recognition and market psychology
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <p className="text-sm text-purple-700">
                      <strong>Features:</strong> Shows open, high, low, close, and price direction
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">4. Volume Charts</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Display trading volume alongside price action.</p>
                  <div className="bg-orange-50 p-3 rounded border border-orange-200">
                    <p className="text-sm text-orange-700">
                      <strong>Best for:</strong> Confirming price movements and finding support/resistance
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded border border-orange-200">
                    <p className="text-sm text-orange-700">
                      <strong>Key Use:</strong> Volume profile analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Technical Analysis Quiz",
        isRequired: true,
        type: "quiz" as const,
        minScore: 3,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Test Your Knowledge
              </h3>
              <p className="text-blue-700 mb-4">
                Answer these questions to check your understanding of technical analysis basics.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What is the core assumption of technical analysis?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">All information is already priced in</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Fundamentals drive all price movements</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">News events cause all price changes</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. Which chart type is most popular for pattern recognition?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Line charts</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Candlestick charts</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Bar charts</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What does volume confirm in technical analysis?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Company earnings</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Price movements</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Market news</span>
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
                      <h4 className="font-medium text-green-800">Core Principles</h4>
                      <p className="text-green-700 text-sm">Understand the <strong>four key principles</strong> that make technical analysis work.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Chart Types</h4>
                      <p className="text-green-700 text-sm">Learn to use <strong>different chart types</strong> for different analysis purposes.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Volume Analysis</h4>
                      <p className="text-green-700 text-sm">Use <strong>volume</strong> to confirm price movements and find support/resistance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Practice First</h4>
                      <p className="text-green-700 text-sm">Start with <strong>paper trading</strong> to practice without risk.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Learn about support and resistance levels</li>
                  <li>• Study basic chart patterns (head and shoulders, triangles)</li>
                  <li>• Understand moving averages and trend indicators</li>
                  <li>• Practice identifying trends on different timeframes</li>
                  <li>• Combine technical analysis with fundamental analysis</li>
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
