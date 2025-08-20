"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function IntroductionToAlgoTradingPage() {
  const lessonData = {
    title: "Introduction to Algorithmic Trading",
    description: "Discover the fundamentals of algorithmic trading and how automated strategies are used in modern markets.",
    lessonSlug: "introduction-to-algo-trading",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/specialized-topics/introduction-to-algo-trading-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/specialized-topics/introduction-to-algo-trading-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/specialized-topics/introduction-to-algo-trading-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/specialized-topics/introduction-to-algo-trading-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/specialized-topics/introduction-to-algo-trading-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/specialized-topics/introduction-to-algo-trading-ta.m4a"
    },
    transcript: {
      en: "Algorithmic trading, or algo trading, uses computer programs to execute trades automatically based on predefined rules and strategies. It has revolutionized modern financial markets.",
      hi: "एल्गोरिथमिक ट्रेडिंग, या एल्गो ट्रेडिंग, पूर्वनिर्धारित नियमों और रणनीतियों के आधार पर स्वचालित रूप से ट्रेड निष्पादित करने के लिए कंप्यूटर प्रोग्राम का उपयोग करती है। इसने आधुनिक वित्तीय बाजारों में क्रांति ला दी है।",
      bn: "অ্যালগরিদমিক ট্রেডিং, বা অ্যালগো ট্রেডিং, পূর্বনির্ধারিত নিয়ম এবং কৌশলগুলির ভিত্তিতে স্বয়ংক্রিয়ভাবে ট্রেড কার্যকর করার জন্য কম্পিউটার প্রোগ্রাম ব্যবহার করে। এটি আধুনিক আর্থিক বাজারে বিপ্লব এনেছে।",
      mr: "अल्गोरिथमिक ट्रेडिंग, किंवा अल्गो ट्रेडिंग, पूर्वनिर्धारित नियम आणि धोरणांच्या आधारावर स्वयंचलितपणे व्यापार कार्यान्वित करण्यासाठी संगणक प्रोग्राम वापरते. याने आधुनिक आर्थिक बाजारांमध्ये क्रांती आणली आहे.",
      gu: "અલ્ગોરિથમિક ટ્રેડિંગ, અથવા અલ્ગો ટ્રેડિંગ, પૂર્વનિર્ધારિત નિયમો અને વ્યૂહરચનાઓના આધારે સ્વયંચાલિત રીતે ટ્રેડ કાર્યાન્વિત કરવા માટે કમ્પ્યુટર પ્રોગ્રામ્સનો ઉપયોગ કરે છે. તે આધુનિક નાણાકીય બજારોમાં ક્રાંતિ લાવ્યું છે.",
      ta: "அல்காரிதம் வர்த்தகம், அல்லது அல்கோ வர்த்தகம், முன்னரே தீர்மானிக்கப்பட்ட விதிகள் மற்றும் மூலோபாயங்களின் அடிப்படையில் வர்த்தகத்தை தானாகவே செயல்படுத்த கணினி நிரல்களைப் பயன்படுத்துகிறது. இது நவீன நிதி சந்தைகளில் புரட்சியை ஏற்படுத்தியுள்ளது."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Algorithmic Trading",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                The Future of Trading
              </h3>
              <p className="text-blue-700">
                Algorithmic trading, or algo trading, uses computer programs to execute trades automatically based on predefined rules and strategies. It has revolutionized modern financial markets.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">What You'll Learn</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Fundamentals of algorithmic trading</li>
                  <li>• Types of trading algorithms</li>
                  <li>• Advantages and risks</li>
                  <li>• System components</li>
                  <li>• Getting started strategies</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Key Benefits</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• High-speed execution</li>
                  <li>• Emotion-free trading</li>
                  <li>• Consistent strategy execution</li>
                  <li>• 24/7 market monitoring</li>
                  <li>• Scalable operations</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Quick Knowledge Check",
        isRequired: true,
        type: 'quiz' as const,
        minScore: 70,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Test Your Understanding
              </h3>
              <p className="text-purple-700 mb-4">
                Let's see how much you already know about algorithmic trading!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the main advantage of algorithmic trading?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Guaranteed profits</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) High-speed execution</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) No need for internet</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Free trading</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which type of algorithm bets on prices returning to average levels?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Trend following</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Mean reversion</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Arbitrage</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Market making</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "what-is-algo-trading",
        title: "What is Algorithmic Trading?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                Understanding the Basics
              </h3>
              <p className="text-yellow-700">
                Algorithmic trading involves using computer algorithms to automatically execute trading strategies without human intervention. These algorithms can analyze market data, identify opportunities, and execute trades at high speeds and frequencies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Core Concept</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Automated Execution:</strong> No human intervention required</p>
                  <p>• <strong>Rule-Based Trading:</strong> Predefined strategies and conditions</p>
                  <p>• <strong>High-Speed Processing:</strong> Millisecond response times</p>
                  <p>• <strong>Data-Driven Decisions:</strong> Based on market analysis</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Key Features</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Speed:</strong> Execute trades in milliseconds</p>
                  <p>• <strong>Accuracy:</strong> Follow rules precisely</p>
                  <p>• <strong>Scalability:</strong> Handle multiple strategies</p>
                  <p>• <strong>Consistency:</strong> Eliminate human emotions</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">How It Works</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Data Input</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🧠</span>
                  </div>
                  <p className="text-blue-700 text-sm">Analysis</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">⚡</span>
                  </div>
                  <p className="text-blue-700 text-sm">Decision</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📈</span>
                  </div>
                  <p className="text-blue-700 text-sm">Execution</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "types-of-algorithms",
        title: "Types of Trading Algorithms",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Different Approaches
              </h3>
              <p className="text-green-700">
                Various types of algorithms exist for different market conditions and trading strategies. Understanding these helps in choosing the right approach for your goals.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Trend Following</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Logic:</strong> Identify and follow market trends</p>
                  <p>• <strong>Strategy:</strong> Buy when prices rise, sell when they fall</p>
                  <p>• <strong>Best For:</strong> Trending markets, momentum trading</p>
                  <p>• <strong>Examples:</strong> Moving average crossovers, breakout strategies</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Mean Reversion</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Logic:</strong> Prices return to average levels</p>
                  <p>• <strong>Strategy:</strong> Buy oversold, sell overbought</p>
                  <p>• <strong>Best For:</strong> Range-bound markets</p>
                  <p>• <strong>Examples:</strong> RSI strategies, Bollinger Bands</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Arbitrage</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Logic:</strong> Exploit price differences</p>
                  <p>• <strong>Strategy:</strong> Buy low, sell high simultaneously</p>
                  <p>• <strong>Best For:</strong> Market inefficiencies</p>
                  <p>• <strong>Examples:</strong> Cross-exchange, statistical arbitrage</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Market Making</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Logic:</strong> Provide liquidity continuously</p>
                  <p>• <strong>Strategy:</strong> Quote both buy and sell prices</p>
                  <p>• <strong>Best For:</strong> Liquid markets, high volume</p>
                  <p>• <strong>Examples:</strong> Spread capture, inventory management</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "interactive-selection",
        title: "Interactive Selection",
        isRequired: true,
        type: 'selection' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                Match Algorithm Types with Market Conditions
              </h3>
              <p className="text-indigo-700 mb-4">
                Test your understanding by matching different algorithm types with the market conditions they work best in.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">Match the algorithm with its best market condition:</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Trend Following:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select condition...</option>
                        <option value="a">A) Sideways markets</option>
                        <option value="b">B) Trending markets</option>
                        <option value="c">C) High volatility periods</option>
                        <option value="d">D) Low liquidity conditions</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Mean Reversion:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select condition...</option>
                        <option value="a">A) Strong uptrends</option>
                        <option value="b">B) Range-bound markets</option>
                        <option value="c">C) Breakout scenarios</option>
                        <option value="d">D) News-driven volatility</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Arbitrage:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select condition...</option>
                        <option value="a">A) Efficient markets</option>
                        <option value="b">B) Market inefficiencies</option>
                        <option value="c">C) Trending markets</option>
                        <option value="d">D) Low volatility periods</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "advantages",
        title: "Advantages of Algorithmic Trading",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Why Choose Algo Trading?
              </h3>
              <p className="text-green-700">
                Algorithmic trading offers several significant advantages over traditional manual trading, making it attractive for both individual and institutional traders.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-4">Speed & Efficiency</h4>
                <div className="space-y-3 text-blue-700">
                  <p>• <strong>High-Speed Execution:</strong> React to market changes in milliseconds</p>
                  <p>• <strong>24/7 Operation:</strong> Monitor markets continuously</p>
                  <p>• <strong>Instant Analysis:</strong> Process vast amounts of data quickly</p>
                  <p>• <strong>Reduced Latency:</strong> Minimize execution delays</p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-4">Emotional Control</h4>
                <div className="space-y-3 text-purple-700">
                  <p>• <strong>No Emotions:</strong> Eliminate fear and greed</p>
                  <p>• <strong>Consistent Execution:</strong> Follow rules precisely</p>
                  <p>• <strong>Disciplined Trading:</strong> Stick to predefined strategies</p>
                  <p>• <strong>Reduced Bias:</strong> Avoid human cognitive errors</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Scalability & Testing</h4>
                <div className="space-y-3 text-yellow-700">
                  <p>• <strong>Multiple Strategies:</strong> Run several algorithms simultaneously</p>
                  <p>• <strong>Backtesting:</strong> Validate strategies on historical data</p>
                  <p>• <strong>Paper Trading:</strong> Test without financial risk</p>
                  <p>• <strong>Easy Replication:</strong> Scale successful strategies</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-800 mb-4">Cost Benefits</h4>
                <div className="space-y-3 text-indigo-700">
                  <p>• <strong>Reduced Commissions:</strong> Optimize trade execution</p>
                  <p>• <strong>Lower Slippage:</strong> Minimize market impact</p>
                  <p>• <strong>Efficient Routing:</strong> Find best execution venues</p>
                  <p>• <strong>Bulk Trading:</strong> Handle large orders efficiently</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "risks",
        title: "Disadvantages and Risks",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">
                Understanding the Risks
              </h3>
              <p className="text-red-700">
                While algorithmic trading offers many benefits, it also comes with significant risks that must be understood and managed properly.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Technical Risks</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>System Failures:</strong> Software crashes and hardware malfunctions</p>
                  <p>• <strong>Data Errors:</strong> Incorrect or delayed market data</p>
                  <p>• <strong>Connectivity Issues:</strong> Internet or network problems</p>
                  <p>• <strong>Programming Bugs:</strong> Errors in algorithm logic</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Market Risks</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Flash Crashes:</strong> Rapid market movements</p>
                  <p>• <strong>Liquidity Issues:</strong> Difficulty executing large orders</p>
                  <p>• <strong>Regime Changes:</strong> Market behavior shifts</p>
                  <p>• <strong>Correlation Breakdown:</strong> Unexpected market relationships</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Operational Risks</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Complexity:</strong> Difficult to understand and monitor</p>
                  <p>• <strong>Human Oversight:</strong> Lack of intervention capability</p>
                  <p>• <strong>Regulatory Compliance:</strong> Changing legal requirements</p>
                  <p>• <strong>Cybersecurity:</strong> Hacking and data theft risks</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-4">Risk Mitigation Strategies</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p>• <strong>Circuit Breakers:</strong> Automatic trading halts</p>
                  <p>• <strong>Position Limits:</strong> Maximum exposure controls</p>
                  <p>• <strong>Real-Time Monitoring:</strong> Continuous oversight</p>
                </div>
                <div className="space-y-2">
                  <p>• <strong>Backup Systems:</strong> Redundant infrastructure</p>
                  <p>• <strong>Manual Override:</strong> Human intervention capability</p>
                  <p>• <strong>Regular Testing:</strong> System validation</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "components",
        title: "Key Components of an Algo Trading System",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Building Blocks
              </h3>
              <p className="text-purple-700">
                A complete algorithmic trading system consists of several interconnected components that work together to execute trades automatically.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Data & Analysis</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Market Data Feeds:</strong> Real-time price and volume data</p>
                  <p>• <strong>Data Processing:</strong> Clean and format incoming data</p>
                  <p>• <strong>Technical Analysis:</strong> Calculate indicators and patterns</p>
                  <p>• <strong>News & Sentiment:</strong> Fundamental data integration</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Strategy Engine</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Trading Logic:</strong> Implement strategy rules</p>
                  <p>• <strong>Signal Generation:</strong> Buy/sell decision making</p>
                  <p>• <strong>Parameter Optimization:</strong> Strategy fine-tuning</p>
                  <p>• <strong>Multi-Strategy Support:</strong> Run multiple algorithms</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Execution & Risk</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Order Management:</strong> Place and track orders</p>
                  <p>• <strong>Risk Management:</strong> Position sizing and limits</p>
                  <p>• <strong>Broker Integration:</strong> API connections</p>
                  <p>• <strong>Execution Optimization:</strong> Minimize market impact</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Monitoring & Control</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Real-Time Monitoring:</strong> Track system performance</p>
                  <p>• <strong>Performance Analytics:</strong> Measure results</p>
                  <p>• <strong>Alert Systems:</strong> Notify of issues</p>
                  <p>• <strong>Manual Override:</strong> Human intervention capability</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "short-questions",
        title: "Deep Understanding Check",
        isRequired: true,
        type: 'short-answer' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-semibold text-red-800 mb-4">
                Critical Thinking Questions
              </h3>
              <p className="text-red-700 mb-4">
                Answer these questions to demonstrate your understanding of algorithmic trading.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Why might a trend-following algorithm perform poorly in a range-bound market?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the key differences between arbitrage and market making strategies?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How can you minimize the technical risks associated with algorithmic trading?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
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
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                What You've Learned
              </h3>
              <p className="text-green-700">
                Congratulations! You've completed the introduction to algorithmic trading. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Core Concepts</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Algorithmic trading automates trade execution</li>
                  <li>✅ Multiple algorithm types for different markets</li>
                  <li>✅ High-speed, emotion-free trading</li>
                  <li>✅ Requires sophisticated risk management</li>
                  <li>✅ Technical expertise is essential</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Best Practices</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Start with simple strategies</li>
                  <li>✅ Thorough testing and validation</li>
                  <li>✅ Implement proper risk controls</li>
                  <li>✅ Monitor performance continuously</li>
                  <li>✅ Have manual override capability</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Next Steps</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🐍</span>
                  </div>
                  <p className="text-blue-700 text-sm">Learn programming</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Practice backtesting</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🔧</span>
                  </div>
                  <p className="text-blue-700 text-sm">Build simple bot</p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]
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
            marathiAudioUrl={lessonData.audioFiles.mr}
            gujaratiAudioUrl={lessonData.audioFiles.gu}
            tamilAudioUrl={lessonData.audioFiles.ta}
            hindiTranscript={lessonData.transcript.hi}
            englishTranscript={lessonData.transcript.en}
            bengaliTranscript={lessonData.transcript.bn}
            marathiTranscript={lessonData.transcript.mr}
            gujaratiTranscript={lessonData.transcript.gu}
            tamilTranscript={lessonData.transcript.ta}
          />
        </div>
        
        <MultiPartLesson 
          parts={lessonData.parts}
          onComplete={(totalScore) => console.log('Lesson completed with score:', totalScore)}
          onPartComplete={(partId, score) => console.log('Part completed:', partId, 'Score:', score)}
        />
      </div>
    </div>
  );
}
