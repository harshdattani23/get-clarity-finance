"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function BuildingATradingBotPage() {
  const lessonData = {
    title: "Building a Simple Trading Bot",
    description: "Learn the practical steps to create a basic algorithmic trading bot, from strategy design to implementation.",
    lessonSlug: "building-a-trading-bot",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/specialized-topics/building-a-trading-bot-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/specialized-topics/building-a-trading-bot-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/specialized-topics/building-a-trading-bot-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/specialized-topics/building-a-trading-bot-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/specialized-topics/building-a-trading-bot-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/specialized-topics/building-a-trading-bot-ta.m4a"
    },
    transcript: {
      en: "Building a trading bot can seem daunting, but with the right approach, you can create a simple yet effective automated trading system. Let's break down the process into manageable steps.",
      hi: "ट्रेडिंग बॉट बनाना कठिन लग सकता है, लेकिन सही दृष्टिकोण के साथ, आप एक सरल लेकिन प्रभावी स्वचालित ट्रेडिंग सिस्टम बना सकते हैं। आइए प्रक्रिया को प्रबंधनीय चरणों में विभाजित करें।",
      bn: "একটি ট্রেডিং বট তৈরি করা কঠিন মনে হতে পারে, তবে সঠিক দৃষ্টিভঙ্গি নিয়ে আপনি একটি সহজ কিন্তু কার্যকর স্বয়ংক্রিয় ট্রেডিং সিস্টেম তৈরি করতে পারেন। আসুন প্রক্রিয়াটিকে পরিচালনাযোগ্য ধাপে ভেঙে ফেলি।",
      mr: "ट्रेडिंग बॉट बनवणे कठीण वाटू शकते, पण योग्य दृष्टिकोणासह, आपण एक सोपा पण प्रभावी स्वयंचलित ट्रेडिंग सिस्टम तयार करू शकता. चला प्रक्रियेला व्यवस्थापनीय टप्प्यांमध्ये विभाजित करूया.",
      gu: "ટ્રેડિંગ બોટ બનાવવું મુશ્કેલ લાગી શકે છે, પરંતુ યોગ્ય અભિગમ સાથે, તમે એક સરળ પરંતુ અસરકારક સ્વયંચાલિત ટ્રેડિંગ સિસ્ટમ બનાવી શકો છો. ચાલો પ્રક્રિયાને વ્યવસ્થાપનીય પગલાંઓમાં વિભાજિત કરીએ.",
      ta: "ஒரு வர்த்தக போட் கட்டுவது கடினமாகத் தோன்றலாம், ஆனால் சரியான அணுகுமுறையுடன், நீங்கள் ஒரு எளிமையான ஆனால் பயனுள்ள தானியங்கி வர்த்தக அமைப்பை உருவாக்கலாம். செயல்முறையை நிர்வகிக்கக்கூடிய படிகளாக பிரிப்போம்."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Building Trading Bots",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Automated Trading Systems
              </h3>
              <p className="text-blue-700">
                Building a trading bot can seem daunting, but with the right approach, you can create a simple yet effective automated trading system. Let's break down the process into manageable steps.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">What You'll Learn</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Strategy design and planning</li>
                  <li>• Technical requirements and setup</li>
                  <li>• Bot structure and components</li>
                  <li>• Implementation and testing</li>
                  <li>• Risk management integration</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Key Benefits</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• 24/7 market monitoring</li>
                  <li>• Emotion-free trading decisions</li>
                  <li>• Consistent strategy execution</li>
                  <li>• Scalable trading operations</li>
                  <li>• Reduced manual errors</li>
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
                Let's see how much you already know about building trading bots!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the first step in building a trading bot?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Writing code immediately</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Defining your trading strategy</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) Buying expensive software</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Opening a brokerage account</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which programming language is recommended for beginners?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Assembly language</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Python</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) COBOL</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Fortran</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "planning-phase",
        title: "Planning Phase",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                Foundation First
              </h3>
              <p className="text-yellow-700">
                Before writing any code, you need to establish a solid foundation for your trading bot. Proper planning saves time and prevents costly mistakes later.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Strategy Definition</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Clear Rules:</strong> Define entry and exit conditions</p>
                  <p>• <strong>Market Selection:</strong> Choose specific markets and instruments</p>
                  <p>• <strong>Time Horizon:</strong> Determine short-term vs. long-term focus</p>
                  <p>• <strong>Risk Tolerance:</strong> Set acceptable loss limits</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Risk Management</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Position Sizing:</strong> How much to invest per trade</p>
                  <p>• <strong>Stop-Loss Rules:</strong> Automatic exit on losses</p>
                  <p>• <strong>Portfolio Limits:</strong> Maximum exposure per strategy</p>
                  <p>• <strong>Correlation Management:</strong> Avoid over-concentration</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-4">Performance Goals</h4>
              <div className="space-y-3 text-green-700">
                <p>• <strong>Return Targets:</strong> Annual percentage goals</p>
                <p>• <strong>Risk Metrics:</strong> Maximum drawdown limits</p>
                <p>• <strong>Benchmarks:</strong> Compare against market indices</p>
                <p>• <strong>Timeframes:</strong> Short-term vs. long-term performance</p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "strategy-design",
        title: "Strategy Design",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Simple and Effective
              </h3>
              <p className="text-green-700">
                Start with a simple strategy that you can understand and test thoroughly. Complex strategies often lead to overfitting and poor performance.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Moving Average Crossover</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Logic:</strong> Buy when short-term MA crosses above long-term MA</p>
                  <p>• <strong>Advantages:</strong> Simple, trend-following, widely used</p>
                  <p>• <strong>Parameters:</strong> Short-term (10-20 days), Long-term (50-200 days)</p>
                  <p>• <strong>Best For:</strong> Trending markets, medium-term holding</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">RSI Strategy</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Logic:</strong> Buy when RSI is oversold (&lt;30), sell when overbought (&gt;70)</p>
                  <p>• <strong>Advantages:</strong> Mean reversion, clear entry/exit signals</p>
                  <p>• <strong>Parameters:</strong> RSI period (14), oversold/overbought levels</p>
                  <p>• <strong>Best For:</strong> Range-bound markets, contrarian approach</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Breakout Strategy</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Logic:</strong> Buy when price breaks above resistance, sell when below support</p>
                  <p>• <strong>Advantages:</strong> Captures momentum, clear risk levels</p>
                  <p>• <strong>Parameters:</strong> Support/resistance levels, breakout confirmation</p>
                  <p>• <strong>Best For:</strong> Volatile markets, momentum trading</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "technical-requirements",
        title: "Technical Requirements",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Building Blocks
              </h3>
              <p className="text-purple-700">
                Understanding the technical requirements helps you choose the right tools and platforms for your trading bot development.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-4">Programming Language</h4>
                <div className="space-y-3 text-blue-700">
                  <p>• <strong>Python (Recommended):</strong> Rich libraries and easy learning</p>
                  <p>• <strong>Key Libraries:</strong> pandas, numpy, yfinance, ta-lib</p>
                  <p>• <strong>Community Support:</strong> Extensive documentation and forums</p>
                  <p>• <strong>Integration:</strong> Easy API connections and data handling</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">Data Requirements</h4>
                <div className="space-y-3 text-green-700">
                  <p>• <strong>Historical Data:</strong> Price, volume, and indicator data</p>
                  <p>• <strong>Real-Time Feeds:</strong> Live market data for execution</p>
                  <p>• <strong>Data Quality:</strong> Clean, adjusted, and reliable sources</p>
                  <p>• <strong>Storage:</strong> Efficient database or file storage</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Trading Platform</h4>
                <div className="space-y-3 text-yellow-700">
                  <p>• <strong>API Access:</strong> Programmatic trading capabilities</p>
                  <p>• <strong>Paper Trading:</strong> Risk-free testing environment</p>
                  <p>• <strong>Reasonable Fees:</strong> Competitive commission structure</p>
                  <p>• <strong>Reliability:</strong> Stable and fast execution</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-4">Infrastructure</h4>
                <div className="space-y-3 text-red-700">
                  <p>• <strong>Server/Cloud:</strong> Reliable hosting environment</p>
                  <p>• <strong>Internet Connection:</strong> Stable and fast connectivity</p>
                  <p>• <strong>Backup Systems:</strong> Data and strategy redundancy</p>
                  <p>• <strong>Monitoring:</strong> System health and performance tracking</p>
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
                Match Strategy Types with Applications
              </h3>
              <p className="text-indigo-700 mb-4">
                Test your understanding by matching different trading strategies with their best market conditions.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">Match the strategy with its best market condition:</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Moving Average Crossover:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select condition...</option>
                        <option value="a">A) Range-bound markets</option>
                        <option value="b">B) Trending markets</option>
                        <option value="c">C) High volatility periods</option>
                        <option value="d">D) Low liquidity conditions</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">RSI Strategy:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select condition...</option>
                        <option value="a">A) Strong uptrends</option>
                        <option value="b">B) Range-bound markets</option>
                        <option value="c">C) Breakout scenarios</option>
                        <option value="d">D) News-driven volatility</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Breakout Strategy:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select condition...</option>
                        <option value="a">A) Sideways markets</option>
                        <option value="b">B) Low volatility periods</option>
                        <option value="c">C) Volatile markets</option>
                        <option value="d">D) Trending markets</option>
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
        id: "bot-structure",
        title: "Basic Bot Structure",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Modular Architecture
              </h3>
              <p className="text-orange-700">
                A simple trading bot typically includes several key components that work together to execute your strategy automatically.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Data Collection Module</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Market Data:</strong> Price, volume, and indicator feeds</p>
                  <p>• <strong>Data Processing:</strong> Clean and format incoming data</p>
                  <p>• <strong>Storage:</strong> Historical data management</p>
                  <p>• <strong>Validation:</strong> Check data quality and completeness</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Analysis Engine</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Technical Analysis:</strong> Calculate indicators and signals</p>
                  <p>• <strong>Strategy Logic:</strong> Implement trading rules</p>
                  <p>• <strong>Signal Generation:</strong> Buy/sell decision logic</p>
                  <p>• <strong>Confirmation:</strong> Multiple signal validation</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Execution Module</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Order Management:</strong> Place and track orders</p>
                  <p>• <strong>Position Tracking:</strong> Monitor open positions</p>
                  <p>• <strong>Broker Interface:</strong> API communication</p>
                  <p>• <strong>Order Types:</strong> Market, limit, stop orders</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Risk Management</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Position Sizing:</strong> Calculate trade amounts</p>
                  <p>• <strong>Stop-Loss Management:</strong> Automatic loss protection</p>
                  <p>• <strong>Portfolio Limits:</strong> Exposure controls</p>
                  <p>• <strong>Correlation Checks:</strong> Diversification monitoring</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">Supporting Components</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Logging & Monitoring</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🔧</span>
                  </div>
                  <p className="text-blue-700 text-sm">Configuration Management</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📈</span>
                  </div>
                  <p className="text-blue-700 text-sm">Performance Tracking</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "implementation-steps",
        title: "Implementation Steps",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Step-by-Step Development
              </h3>
              <p className="text-green-700">
                Follow these steps to build your trading bot systematically, ensuring each component works correctly before moving to the next.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Phase 1: Environment Setup</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Development Environment:</strong> Install Python, IDE, and libraries</p>
                  <p>• <strong>Version Control:</strong> Set up Git repository for code management</p>
                  <p>• <strong>Testing Framework:</strong> Configure unit testing tools</p>
                  <p>• <strong>Documentation:</strong> Create project structure and requirements</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Phase 2: Core Development</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Data Module:</strong> Build data collection and processing</p>
                  <p>• <strong>Strategy Engine:</strong> Implement trading logic and signals</p>
                  <p>• <strong>Risk Management:</strong> Add position sizing and stop-loss rules</p>
                  <p>• <strong>Execution Interface:</strong> Connect to broker APIs</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Phase 3: Testing & Validation</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Unit Testing:</strong> Test individual components</p>
                  <p>• <strong>Backtesting:</strong> Validate strategy on historical data</p>
                  <p>• <strong>Paper Trading:</strong> Test with real-time data</p>
                  <p>• <strong>Performance Analysis:</strong> Evaluate results and optimize</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Phase 4: Deployment & Monitoring</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Live Testing:</strong> Start with small amounts</p>
                  <p>• <strong>Performance Monitoring:</strong> Track real-time results</p>
                  <p>• <strong>Risk Monitoring:</strong> Ensure safety limits are respected</p>
                  <p>• <strong>Continuous Improvement:</strong> Optimize based on results</p>
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
                Answer these questions to demonstrate your understanding of building trading bots.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Why is it important to start with a simple strategy when building your first trading bot?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the key differences between backtesting and paper trading, and why do you need both?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How would you integrate risk management into your trading bot to protect against large losses?</p>
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
                Congratulations! You've completed the introduction to building trading bots. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Core Principles</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Start with simple, well-defined strategies</li>
                  <li>✅ Python is excellent for bot development</li>
                  <li>✅ Modular architecture enables easy maintenance</li>
                  <li>✅ Risk management must be built-in from start</li>
                  <li>✅ Thorough testing prevents costly mistakes</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Development Best Practices</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Plan thoroughly before coding</li>
                  <li>✅ Test each component individually</li>
                  <li>✅ Use paper trading before live deployment</li>
                  <li>✅ Monitor performance continuously</li>
                  <li>✅ Document everything for future reference</li>
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
                  <p className="text-blue-700 text-sm">Learn Python basics</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Practice with data</p>
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
