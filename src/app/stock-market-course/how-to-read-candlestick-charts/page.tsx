"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function HowToReadCandlestickChartsPage() {
  const lessonData = {
    title: "How to Read Candlestick Charts",
    description: "Learn to interpret the most popular type of financial chart and understand the story each candlestick tells about the battle between buyers and sellers.",
    lessonSlug: "how-to-read-candlestick-charts",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/how-to-read-candlestick-charts-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/how-to-read-candlestick-charts-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/how-to-read-candlestick-charts-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/how-to-read-candlestick-charts-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/how-to-read-candlestick-charts-mr.m4a"
    },
    transcript: {
      en: "How to Read Candlestick Charts: Learn to interpret the most popular type of financial chart and understand the story each candlestick tells about the battle between buyers and sellers. Master the anatomy of candlesticks and learn to read market sentiment.",
      hi: "कैंडलस्टिक चार्ट कैसे पढ़ें: सबसे लोकप्रिय प्रकार के वित्तीय चार्ट की व्याख्या करना सीखें और समझें कि प्रत्येक कैंडलस्टिक खरीदारों और विक्रेताओं के बीच की लड़ाई के बारे में क्या कहता है।",
      bn: "ক্যান্ডেলস্টিক চার্ট কীভাবে পড়তে হয়: সবচেয়ে জনপ্রিয় ধরনের আর্থিক চার্টের ব্যাখ্যা করা শিখুন এবং বুঝুন যে প্রতিটি ক্যান্ডেলস্টিক ক্রেতা এবং বিক্রেতাদের মধ্যে লড়াই সম্পর্কে কী বলে।",
      ta: "மெழுகுவர்த்தி விளக்கப்படங்களை எப்படி படிப்பது: மிகவும் பிரபலமான வகை நிதி விளக்கப்படங்களை விளக்குவதற்கான வழிகளைக் கற்றுக்கொள்ளுங்கள் மற்றும் ஒவ்வொரு மெழுகுவர்த்தியும் வாங்குபவர்கள் மற்றும் விற்பவர்களுக்கு இடையேயான போராட்டத்தைப் பற்றி என்ன சொல்கிறது என்பதைப் புரிந்துகொள்ளுங்கள்.",
      mr: "कॅंडलस्टिक चार्ट कसे वाचावे: सर्वात लोकप्रिय प्रकारचा आर्थिक चार्टचा अर्थ लावणे शिका आणि प्रत्येक कॅंडलस्टिक खरेदीदार आणि विक्रेत्यांमधील लढाईबद्दल काय सांगतो ते समजून घ्या."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Candlestick Charts",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Learn to interpret the most popular type of financial chart and understand the story each candlestick tells about the battle between buyers and sellers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why Candlestick Charts Matter
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Candlestick charts are the most popular way to visualize stock price movements. Each 'candlestick' provides a wealth of information about the price action within a specific time period.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unlike simple line charts, candlesticks show you the open, high, low, and close prices for each period, giving you a complete picture of market sentiment and price action.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  Master candlestick reading to become a better market analyst!
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Visual price action representation</li>
                  <li>• Market sentiment indicators</li>
                  <li>• Entry and exit point identification</li>
                  <li>• Pattern recognition skills</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
                <ul className="text-orange-800 space-y-1 text-sm">
                  <li>• Each candlestick tells a story</li>
                  <li>• Color coding is crucial</li>
                  <li>• Body and wicks have meaning</li>
                  <li>• Timeframe matters</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "anatomy",
        title: "The Anatomy of a Candlestick",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">
                The Anatomy of a Candlestick
              </h3>
              <p className="text-purple-700 text-lg mb-4">
                Each candlestick represents a period and has four key data points: Open, High, Low, and Close. These create two main parts that tell the complete story.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">The Body</h4>
                <p className="text-gray-700 mb-3">
                  The wide part, representing the range between the open and close prices.
                </p>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Key Insight:</strong> The body shows the battle between buyers and sellers during that period.
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-700">Green body = Close &gt; Open (Bullish)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-700">Red body = Close &lt; Open (Bearish)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">The Wicks (Shadows)</h4>
                <p className="text-gray-700 mb-3">
                  The thin lines above and below the body, representing the highest and lowest prices.
                </p>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>Key Insight:</strong> Wicks show the extreme price movements and rejection levels.
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-6 bg-gray-400 rounded"></div>
                    <span className="text-sm text-gray-700">Upper wick = Highest price reached</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1 h-6 bg-gray-400 rounded"></div>
                    <span className="text-sm text-gray-700">Lower wick = Lowest price reached</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-3">💡 Understanding the Story</h4>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Large body = Strong buying/selling pressure</li>
                <li>• Small body = Indecision or low volatility</li>
                <li>• Long wicks = Price rejection at those levels</li>
                <li>• Short wicks = Price stayed within a tight range</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "color-coding",
        title: "Color Coding and Market Sentiment",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-red-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Color Coding and Market Sentiment
              </h3>
              <p className="text-gray-700 text-lg mb-4">
                Color coding helps identify bullish vs bearish periods and provides immediate visual cues about market sentiment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Green Candles (Bullish)</h4>
                <p className="text-green-700 mb-3">
                  A green (or hollow) candle indicates that the closing price is higher than the opening price.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>Market Sentiment:</strong> Buyers are in control, pushing prices higher.
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-green-700">Close &gt; Open</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-green-700">Positive momentum</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-green-700">Good for long positions</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-red-800 mb-3">Red Candles (Bearish)</h4>
                <p className="text-red-700 mb-3">
                  A red (or filled) candle indicates that the closing price is lower than the opening price.
                </p>
                <div className="bg-white p-3 rounded border border-red-200">
                  <p className="text-sm text-red-700">
                    <strong>Market Sentiment:</strong> Sellers are in control, pushing prices lower.
                  </p>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm text-red-700">Close &lt; Open</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm text-red-700">Negative momentum</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm text-red-700">Good for short positions</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-3">🎨 Color Variations</h4>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• Some platforms use hollow/filled instead of green/red</li>
                                    <li>• Hollow = Bullish (close &gt; open)</li>
                                  <li>• Filled = Bearish (close &lt; open)</li>
                <li>• Always check your platform's color scheme</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Candlestick Chart Quiz",
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
                Answer these questions to check your understanding of candlestick charts.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What does the body of a candlestick represent?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">The highest and lowest prices</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">The range between open and close prices</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">The total volume traded</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. What do the wicks (shadows) show?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">The open and close prices</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">The highest and lowest prices reached</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">The trading volume</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What does a green candlestick indicate?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">The price went down</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">The price went up</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">The price stayed the same</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    4. What does a long upper wick suggest?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Strong buying pressure</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Price rejection at that level</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Low trading volume</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    5. What does a small body indicate?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Strong trend</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Indecision or low volatility</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">High trading volume</span>
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
        title: "Chart Analysis Practice",
        isRequired: true,
        type: "selection" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Practice Your Chart Reading Skills
              </h3>
              <p className="text-green-700 mb-6">
                Select the skills you want to focus on when analyzing candlestick charts.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Basic Analysis Skills</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Identify bullish vs bearish candles</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Read open, high, low, close prices</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Understand body and wick relationships</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Recognize color coding patterns</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Advanced Analysis Skills</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Identify support and resistance levels</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Spot trend reversals</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Analyze volume confirmation</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Recognize candlestick patterns</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Trading Applications</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Entry and exit timing</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Stop loss placement</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Position sizing decisions</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Risk management strategies</span>
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
                      <h4 className="font-medium text-green-800">Price Data Points</h4>
                      <p className="text-green-700 text-sm">Candlestick charts show <strong>open, high, low, and close</strong> prices for each period.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Body Significance</h4>
                      <p className="text-green-700 text-sm">The <strong>body</strong> shows the range between open and close prices.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Wick Information</h4>
                      <p className="text-green-700 text-sm">The <strong>wicks</strong> show the highest and lowest prices reached.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Color Coding</h4>
                      <p className="text-green-700 text-sm">Color coding helps identify <strong>bullish</strong> (green) vs <strong>bearish</strong> (red) periods.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice reading candlestick charts on real stocks</li>
                  <li>• Learn to identify common candlestick patterns</li>
                  <li>• Combine with volume analysis for confirmation</li>
                  <li>• Study different timeframes (1min, 5min, daily, weekly)</li>
                  <li>• Practice drawing trend lines and support/resistance</li>
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
