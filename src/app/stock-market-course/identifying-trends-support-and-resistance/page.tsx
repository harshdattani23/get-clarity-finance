"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function IdentifyingTrendsSupportAndResistancePage() {
  const lessonData = {
    title: "Identifying Trends, Support, and Resistance",
    description: "Learn to identify the market's direction and key price levels where buying and selling pressure is expected to be strong.",
    lessonSlug: "identifying-trends-support-and-resistance",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/identifying-trends-support-resistance-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/identifying-trends-support-resistance-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/identifying-trends-support-resistance-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/identifying-trends-support-resistance-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/identifying-trends-support-resistance-mr.m4a"
    },
    transcript: {
      en: "Identifying Trends, Support, and Resistance: Learn to identify the market's direction and key price levels where buying and selling pressure is expected to be strong. This fundamental skill helps traders make more informed decisions and manage risk effectively.",
      hi: "ट्रेंड, सपोर्ट और रेजिस्टेंस की पहचान: बाजार की दिशा और महत्वपूर्ण मूल्य स्तरों की पहचान करना सीखें जहां खरीद और बिक्री का दबाव मजबूत होने की उम्मीद है।",
      bn: "ট্রেন্ড, সাপোর্ট এবং রেজিস্ট্যান্স চিহ্নিত করা: বাজারের দিকনির্দেশনা এবং মূল মূল্য স্তরগুলি চিহ্নিত করা শিখুন যেখানে কেনা এবং বিক্রির চাপ শক্তিশালী হওয়ার আশা করা হয়।",
      ta: "பிரிவுகள், ஆதரவு மற்றும் எதிர்ப்பை அடையாளம் காணுதல்: சந்தையின் திசையையும், வாங்குதல் மற்றும் விற்பனை அழுத்தம் வலுவாக இருக்கும் என்று எதிர்பார்க்கப்படும் முக்கிய விலை நிலைகளையும் அடையாளம் காண்பதற்கான வழிகளைக் கற்றுக்கொள்ளுங்கள்.",
      mr: "ट्रेंड, सपोर्ट आणि रेझिस्टन्स ओळखणे: बाजाराची दिशा आणि महत्वाचे किंमत स्तर ओळखणे शिका जिथे खरेदी आणि विक्रीचा दाब मजबूत असण्याची अपेक्षा आहे."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Trends, Support, and Resistance",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Learn to identify the market's direction and key price levels where buying and selling pressure is expected to be strong.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why Trends, Support, and Resistance Matter
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding the market's direction and identifying key price levels are fundamental skills in technical analysis. These concepts help traders make more informed decisions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Think of trends as the "road" the market is traveling on, while support and resistance are like "speed bumps" and "ceilings" that can change the market's direction.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  Master these concepts to become a better market navigator!
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Identify market direction</li>
                  <li>• Find entry and exit points</li>
                  <li>• Manage risk effectively</li>
                  <li>• Anticipate reversals</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
                <ul className="text-orange-800 space-y-1 text-sm">
                  <li>• Use multiple timeframes</li>
                  <li>• Look for confirmation</li>
                  <li>• Support can become resistance</li>
                  <li>• Trends can change</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "trends",
        title: "Understanding Market Trends",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                What is a Trend?
              </h3>
              <p className="text-blue-700 text-lg mb-4">
                A trend is the general direction in which a stock's price is moving. Understanding trends is crucial for making informed trading decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Uptrend (Bullish)</h4>
                <p className="text-green-700 mb-3">
                  Characterized by a series of 'higher highs' and 'higher lows'.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>Key Pattern:</strong> Each peak and trough is higher than the previous one, indicating upward momentum.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-red-800 mb-3">Downtrend (Bearish)</h4>
                <p className="text-red-700 mb-3">
                  Characterized by a series of 'lower highs' and 'lower lows'.
                </p>
                <div className="bg-white p-3 rounded border border-red-200">
                  <p className="text-sm text-red-700">
                    <strong>Key Pattern:</strong> Each peak and trough is lower than the previous one, indicating downward momentum.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Sideways Trend (Ranging)</h4>
                <p className="text-gray-700 mb-3">
                  Occurs when the price trades within a relatively narrow range.
                </p>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-sm text-gray-700">
                    <strong>Key Pattern:</strong> Price moves horizontally with no clear upward or downward direction.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-3">💡 Trend Identification Tips</h4>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Use multiple timeframes to confirm trend direction</li>
                <li>• Look for at least 2-3 higher highs/lows for uptrends</li>
                <li>• Consider volume to confirm trend strength</li>
                <li>• Remember that trends can change - always use stop losses</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "support",
        title: "Support: The Price Floor",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Support: The Price Floor
              </h3>
              <p className="text-green-700 text-lg mb-4">
                A price level where a downtrend can be expected to pause due to a concentration of demand. It's a level where buyers are likely to step in and buy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
                <h4 className="text-xl font-semibold text-green-700 mb-3">How Support Works</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Price bounces off support levels</li>
                  <li>• Multiple touches strengthen support</li>
                  <li>• Volume often increases at support</li>
                  <li>• Support can become resistance when broken</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
                <h4 className="text-xl font-semibold text-green-700 mb-3">Types of Support</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Psychological levels (round numbers)</li>
                  <li>• Previous resistance levels</li>
                  <li>• Moving averages</li>
                  <li>• Trend lines</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-3">🎯 Trading Support Levels</h4>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• Buy near support with stop loss below</li>
                <li>• Look for price rejection candlesticks</li>
                <li>• Confirm with volume and other indicators</li>
                <li>• Don't assume support will always hold</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "resistance",
        title: "Resistance: The Price Ceiling",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-red-800 mb-4">
                Resistance: The Price Ceiling
              </h3>
              <p className="text-red-700 text-lg mb-4">
                A price level where an uptrend can be expected to pause due to a concentration of supply. It's a level where sellers are likely to step in and sell.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
                <h4 className="text-xl font-semibold text-red-700 mb-3">How Resistance Works</h4>
                <ul className="space-y-2 text-red-700">
                  <li>• Price falls back from resistance levels</li>
                  <li>• Multiple touches strengthen resistance</li>
                  <li>• Volume often increases at resistance</li>
                  <li>• Resistance can become support when broken</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
                <h4 className="text-xl font-semibold text-red-700 mb-3">Types of Resistance</h4>
                <ul className="space-y-2 text-red-700">
                  <li>• Psychological levels (round numbers)</li>
                  <li>• Previous support levels</li>
                  <li>• Moving averages</li>
                  <li>• Trend lines</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-3">🎯 Trading Resistance Levels</h4>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li>• Sell near resistance with stop loss above</li>
                <li>• Look for price rejection candlesticks</li>
                <li>• Confirm with volume and other indicators</li>
                <li>• Don't assume resistance will always hold</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Trends, Support & Resistance Quiz",
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
                Answer these questions to check your understanding of trends, support, and resistance concepts.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What characterizes an uptrend?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Higher highs and higher lows</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Lower highs and lower lows</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Sideways price movement</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. What happens at a support level?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Price is expected to fall</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Price is expected to bounce</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Price continues moving down</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What is resistance?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">A price floor where buyers step in</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">A price ceiling where sellers step in</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">A trend continuation pattern</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    4. How can you confirm a trend?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">By looking at only one time frame</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">By using multiple time frames and volume</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">By ignoring other technical indicators</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    5. What happens when support is broken?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">It becomes stronger support</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">It can become resistance</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">The trend continues unchanged</span>
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
        title: "Strategy Selection",
        isRequired: true,
        type: "selection" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Choose Your Trading Strategy
              </h3>
              <p className="text-green-700 mb-6">
                Select the strategies that best fit your trading style and risk tolerance.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Trend Following Strategies</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Buy on pullbacks in uptrends</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Sell on rallies in downtrends</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Use moving averages for trend confirmation</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Follow the trend until it breaks</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Support & Resistance Strategies</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Buy at support levels</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Sell at resistance levels</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Use breakouts for entry signals</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Wait for confirmation before trading</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Risk Management</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Always use stop losses</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Position size based on risk</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Don't fight the trend</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Keep detailed trading journal</span>
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
                      <h4 className="font-medium text-green-800">Uptrend Pattern</h4>
                      <p className="text-green-700 text-sm">An <strong>uptrend</strong> consists of higher highs and higher lows, indicating upward momentum.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Support Level</h4>
                      <p className="text-green-700 text-sm"><strong>Support</strong> is a price level where buying pressure is strong enough to potentially halt a downtrend.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Resistance Level</h4>
                      <p className="text-green-700 text-sm"><strong>Resistance</strong> is a price level where selling pressure is strong enough to potentially halt an uptrend.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Core Skill</h4>
                      <p className="text-green-700 text-sm">Identifying these levels is a core skill for anticipating potential market turning points.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice identifying trends on historical charts</li>
                  <li>• Draw support and resistance lines on your favorite stocks</li>
                  <li>• Use multiple timeframes to confirm levels</li>
                  <li>• Combine with other technical indicators for confirmation</li>
                  <li>• Keep a trading journal to track your analysis accuracy</li>
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
