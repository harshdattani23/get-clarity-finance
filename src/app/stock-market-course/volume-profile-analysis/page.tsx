"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function VolumeProfileAnalysisPage() {
  const lessonData = {
    title: "Volume Profile Analysis",
    description: "Understand how volume distribution across price levels can reveal the true structure of the market and identify key trading levels.",
    lessonSlug: "volume-profile-analysis",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/volume-profile-analysis-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/volume-profile-analysis-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/volume-profile-analysis-bn.m4a",
      te: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/volume-profile-analysis-te.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/volume-profile-analysis-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/volume-profile-analysis-mr.m4a"
    },
    transcript: {
      en: "Volume Profile Analysis: Understand how volume distribution across price levels can reveal the true structure of the market and identify key trading levels for better decision making.",
      hi: "वॉल्यूम प्रोफाइल विश्लेषण: समझें कि मूल्य स्तरों में वॉल्यूम वितरण कैसे बाजार की वास्तविक संरचना को प्रकट कर सकता है और बेहतर निर्णय लेने के लिए महत्वपूर्ण ट्रेडिंग स्तरों की पहचान कर सकता है।",
      bn: "ভলিউম প্রোফাইল বিশ্লেষণ: বুঝুন কীভাবে মূল্য স্তরে ভলিউম বিतরণ বাজারের প্রকৃত কাঠামো প্রকাশ করতে পারে এবং মূল ট্রেডিং স্তরগুলি চিহ্নিত করতে পারে।",
      te: "వాల్యూమ్ ప్రొఫైల్ విశ్లేషణ: ధర స్థాయిలలో వాల్యూమ్ పంపిణీ మార్కెట్ యొక్క నిజమైన నిర్మాణాన్ని ఎలా వెల్లడించగలదో మరియు ముఖ్యమైన ట్రేడింగ్ స్థాయిలను ఎలా గుర్తించగలదో అర్థం చేసుకోండి.",
      ta: "வால்யூம் புரோஃபைல் பகுப்பாய்வு: விலை நிலைகளில் வால்யூம் விநியோகம் சந்தையின் உண்மையான கட்டமைப்பை எவ்வாறு வெளிப்படுத்தும் மற்றும் முக்கியமான வர்த்தக நிலைகளை அடையாளம் காணும்.",
      mr: "व्हॉल्यूम प्रोफाइल विश्लेषण: किंमत पातळ्यांवर व्हॉल्यूम वितरण बाजाराची खरी रचना कशी उघड करू शकते आणि महत्त्वाच्या व्यापार पातळ्या कशा ओळखू शकतात ते समजून घ्या."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Volume Profile",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Beyond Traditional Volume Analysis
              </h2>
              <p className="text-blue-800 text-lg leading-relaxed">
                Volume Profile Analysis goes beyond traditional volume indicators by showing how trading volume 
                is distributed across different price levels. This provides insights into where the most 
                significant trading activity occurs and reveals the true structure of the market.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Why Volume Profile Matters</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Market Structure</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Identify fair value zones</li>
                    <li>• Understand price distribution</li>
                    <li>• Find institutional interest levels</li>
                    <li>• Map market memory</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Trading Advantages</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Better entry/exit points</li>
                    <li>• Stronger support/resistance</li>
                    <li>• Risk management insights</li>
                    <li>• Position sizing guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "what-is-volume-profile",
        title: "What is Volume Profile?",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Understanding Volume Distribution
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-700 mb-3">Traditional vs. Volume Profile</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-700 mb-2">Traditional Volume</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Shows volume over time</li>
                        <li>• Vertical bars on chart</li>
                        <li>• Time-based analysis</li>
                        <li>• Limited price context</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-700 mb-2">Volume Profile</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Shows volume at price levels</li>
                        <li>• Horizontal histogram</li>
                        <li>• Price-based analysis</li>
                        <li>• Rich price context</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-700 mb-3">How It Works</h4>
                  <p className="text-gray-700 mb-4">
                    Volume Profile is a charting technique that displays volume information horizontally across price levels, 
                    rather than vertically over time. It shows where the most trading activity has occurred at each price level, 
                    creating a visual representation of market interest.
                  </p>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <h5 className="font-medium text-yellow-800 mb-2">💡 Key Insight</h5>
                    <p className="text-yellow-700 text-sm">
                      Volume Profile reveals where the "smart money" has been active, showing you the price levels 
                      that institutions and large traders consider important.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-3">📊 Visual Representation</h4>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Horizontal histogram on the right side of price chart</li>
                    <li>• Taller bars = higher volume at that price</li>
                    <li>• Shorter bars = lower volume at that price</li>
                    <li>• Creates a "profile" of market activity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "key-components",
        title: "Key Components of Volume Profile",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                The Building Blocks
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-3">Point of Control (POC)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">Definition</h5>
                      <p className="text-sm text-blue-700">
                        The price level with the highest trading volume. This often acts as a strong support 
                        or resistance level.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">Trading Significance</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Strong support/resistance</li>
                        <li>• Fair value reference</li>
                        <li>• Institutional interest level</li>
                        <li>• Mean reversion target</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-3">Value Area</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">Definition</h5>
                      <p className="text-sm text-blue-700">
                        The price range where 70% of the trading volume occurred. This represents the 'fair value' 
                        zone for the asset.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">Components</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Value Area High (VAH)</li>
                        <li>• Value Area Low (VAL)</li>
                        <li>• 70% volume threshold</li>
                        <li>• Dynamic support/resistance</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-3">Volume Nodes</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">High Volume Nodes</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Above-average volume</li>
                        <li>• Strong market interest</li>
                        <li>• Support/resistance levels</li>
                        <li>• Institutional activity</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">Low Volume Nodes</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Below-average volume</li>
                        <li>• Weak market interest</li>
                        <li>• Potential breakout zones</li>
                        <li>• Easy price movement</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-3">🎯 Practical Application</h4>
                  <ul className="space-y-2 text-purple-700 text-sm">
                    <li>• Use POC as primary support/resistance</li>
                    <li>• Trade within Value Area for mean reversion</li>
                    <li>• Look for breakouts at Low Volume Nodes</li>
                    <li>• Confirm moves with High Volume Nodes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "trading-applications",
        title: "Trading Applications",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
                Putting Volume Profile to Work
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-medium text-indigo-700 mb-3">Entry and Exit Strategies</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">Entry Points</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Buy at Value Area Low (VAL)</li>
                        <li>• Enter at Point of Control (POC)</li>
                        <li>• Look for bounces at High Volume Nodes</li>
                        <li>• Use Low Volume Nodes for breakouts</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">Exit Points</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Take profits at Value Area High (VAH)</li>
                        <li>• Exit at Point of Control (POC)</li>
                        <li>• Use High Volume Nodes as targets</li>
                        <li>• Set stops below Low Volume Nodes</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-medium text-indigo-700 mb-3">Risk Management</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">Position Sizing</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Larger positions at High Volume Nodes</li>
                        <li>• Smaller positions at Low Volume Nodes</li>
                        <li>• Consider volume distribution</li>
                        <li>• Adjust based on Value Area width</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">Stop Losses</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Place below High Volume Nodes</li>
                        <li>• Use Low Volume Nodes as guides</li>
                        <li>• Consider Value Area boundaries</li>
                        <li>• Avoid Point of Control levels</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-medium text-indigo-700 mb-3">Market Analysis</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">Trend Analysis</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Identify fair value zones</li>
                        <li>• Spot institutional accumulation</li>
                        <li>• Find distribution patterns</li>
                        <li>• Measure market efficiency</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">Volatility Insights</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Low Volume Nodes = high volatility</li>
                        <li>• High Volume Nodes = low volatility</li>
                        <li>• Value Area width indicates range</li>
                        <li>• POC stability shows market balance</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-3">🚀 Advanced Strategies</h4>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>• Volume Profile Divergence: Price vs. volume patterns</li>
                    <li>• Multiple Timeframe Analysis: Align profiles across timeframes</li>
                    <li>• Institutional Footprint: Track large volume clusters</li>
                    <li>• Market Structure: Use profiles to map trends and ranges</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Volume Profile Quiz",
        isRequired: true,
        type: "quiz" as const,
        minScore: 4,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Test Your Knowledge of Volume Profile
              </h3>
              <p className="text-blue-700 mb-4">
                Answer these questions to check your understanding of Volume Profile Analysis.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What does POC stand for in Volume Profile Analysis?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Point of Control</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Price of Control</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Point of Change</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. What percentage of trading volume defines the Value Area?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">50%</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">70%</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">90%</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What do Low Volume Nodes typically indicate?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Strong support/resistance</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Potential breakout zones</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Institutional interest</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    4. How is Volume Profile displayed on a chart?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Vertical bars over time</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Horizontal histogram on the right</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Line chart below price</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    5. What is the main advantage of Volume Profile over traditional volume analysis?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">It shows volume over time</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">It provides price context for volume</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">It's easier to read</span>
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
        title: "Volume Profile Strategy Selection",
        isRequired: true,
        type: "selection" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Choose Your Volume Profile Trading Strategies
              </h3>
              <p className="text-green-700 mb-6">
                Select the strategies that align with your trading style and risk tolerance.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Mean Reversion Strategies</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Buy at Value Area Low (VAL)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Sell at Value Area High (VAH)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Trade within Value Area</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Use POC as pivot point</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Breakout Strategies</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Break above VAH</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Break below VAL</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Use Low Volume Nodes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Volume confirmation</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Risk Management</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Stop below High Volume Nodes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Position size based on volume</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Use Value Area boundaries</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Monitor POC stability</span>
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
                      <h4 className="font-medium text-green-800">Volume Distribution Reveals Market Structure</h4>
                      <p className="text-green-700 text-sm">Volume Profile shows where the most trading activity occurs across price levels, revealing fair value zones and institutional interest.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Point of Control is Key</h4>
                      <p className="text-green-700 text-sm">The POC (price level with highest volume) often acts as a strong support/resistance level and fair value reference.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Low Volume Nodes Signal Breakouts</h4>
                      <p className="text-green-700 text-sm">Areas with below-average volume can indicate potential breakout zones where price moves easily.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Combination is Key</h4>
                      <p className="text-green-700 text-sm">Volume Profile works best when combined with other technical analysis tools for confirmation and better decision making.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice identifying POC, VAH, and VAL on your charts</li>
                  <li>• Look for Value Areas in your favorite stocks</li>
                  <li>• Combine Volume Profile with trend lines and moving averages</li>
                  <li>• Use Volume Profile to improve your entry and exit timing</li>
                  <li>• Study how institutional activity creates volume clusters</li>
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
