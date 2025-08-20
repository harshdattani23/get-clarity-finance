"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function QuantitativeAndAlgorithmicTradingPage() {
  const lessonData = {
    title: "Quantitative and Algorithmic Trading",
    description: "Systematic approaches to trading using rules, data, and automation to create consistent, testable strategies.",
    lessonSlug: "quantitative-and-algorithmic-trading",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/specialized-topics/quantitative-and-algorithmic-trading-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/specialized-topics/quantitative-and-algorithmic-trading-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/specialized-topics/quantitative-and-algorithmic-trading-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/specialized-topics/quantitative-and-algorithmic-trading-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/specialized-topics/quantitative-and-algorithmic-trading-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/specialized-topics/quantitative-and-algorithmic-trading-ta.m4a"
    },
    transcript: {
      en: "Quant and algo trading use statistics and software to create consistent, testable strategies. These systematic approaches reduce emotional decision-making and provide a framework for disciplined trading.",
      hi: "क्वांट और अल्गो ट्रेडिंग सुसंगत, परीक्षण योग्य रणनीतियां बनाने के लिए आंकड़ों और सॉफ्टवेयर का उपयोग करते हैं। ये व्यवस्थित दृष्टिकोण भावनात्मक निर्णय लेने को कम करते हैं और अनुशासित ट्रेडिंग के लिए एक ढांचा प्रदान करते हैं।",
      bn: "কোয়ান্ট এবং অ্যালগো ট্রেডিং সামঞ্জস্যপূর্ণ, পরীক্ষাযোগ্য কৌশল তৈরি করতে পরিসংখ্যান এবং সফ্টওয়্যার ব্যবহার করে। এই পদ্ধতিগত দৃষ্টিভঙ্গি আবেগিক সিদ্ধান্ত গ্রহণ কমায় এবং শৃঙ্খলাবদ্ধ ট্রেডিংয়ের জন্য একটি কাঠামো প্রদান করে।",
      mr: "क्वांट आणि अल्गो ट्रेडिंग सुसंगत, चाचणी करता येणारे धोरण तयार करण्यासाठी आकडेवारी आणि सॉफ्टवेअर वापरते. हे पद्धतशीर दृष्टिकोण भावनिक निर्णय घेणे कमी करतात आणि शिस्तबद्ध व्यापारासाठी एक चौकट प्रदान करतात.",
      gu: "ક્વોન્ટ અને અલ્ગો ટ્રેડિંગ સુસંગત, પરીક્ષણ કરી શકાય તેવી વ્યૂહરચનાઓ બનાવવા માટે આંકડા અને સોફ્ટવેરનો ઉપયોગ કરે છે. આ પદ્ધતિસરની અભિગમો ભાવનાત્મક નિર્ણય લેવાને ઘટાડે છે અને શિસ્તબદ્ધ ટ્રેડિંગ માટે એક ફ્રેમવર્ક પ્રદાન કરે છે.",
      ta: "குவாண்ட் மற்றும் அல்கோ வர்த்தகம் நிலையான, சோதிக்கக்கூடிய மூலோபாயங்களை உருவாக்க புள்ளிவிவரங்கள் மற்றும் மென்பொருளைப் பயன்படுத்துகிறது. இந்த முறையான அணுகுமுறைகள் உணர்ச்சி அடிப்படையிலான முடிவெடுப்பதைக் குறைத்து, ஒழுங்கமைவான வர்த்தகத்திற்கான கட்டமைப்பை வழங்குகின்றன."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Quantitative Trading",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Data-Driven Trading
              </h3>
              <p className="text-blue-700">
                Quant and algo trading use statistics and software to create consistent, testable strategies. These systematic approaches reduce emotional decision-making and provide a framework for disciplined trading.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">What You'll Learn</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Quantitative analysis methods</li>
                  <li>• Algorithmic trading systems</li>
                  <li>• Trading bot development</li>
                  <li>• Backtesting strategies</li>
                  <li>• Machine learning integration</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Key Benefits</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Systematic approach to trading</li>
                  <li>• Emotion-free decision making</li>
                  <li>• Testable and repeatable strategies</li>
                  <li>• Scalable trading operations</li>
                  <li>• Risk management integration</li>
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
                Let's see how much you already know about quantitative and algorithmic trading!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the main advantage of quantitative trading?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Guaranteed profits</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Systematic, emotion-free approach</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) No need for market knowledge</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Free trading software</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Why is backtesting important in quantitative trading?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) It guarantees future profits</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) It validates strategies before live trading</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) It reduces trading costs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) It eliminates all risks</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quantitative-analysis",
        title: "Quantitative Analysis Methods",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                Statistical Approaches
              </h3>
              <p className="text-yellow-700">
                Quantitative analysis uses mathematical and statistical methods to identify trading opportunities and manage risk. This systematic approach provides objective criteria for decision-making.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Statistical Methods</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Mean Reversion:</strong> Identify overbought/oversold conditions</p>
                  <p>• <strong>Correlation Analysis:</strong> Find relationships between assets</p>
                  <p>• <strong>Volatility Modeling:</strong> Predict market risk levels</p>
                  <p>• <strong>Regression Analysis:</strong> Model price relationships</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Mathematical Models</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Time Series Analysis:</strong> Forecast future prices</p>
                  <p>• <strong>Monte Carlo Simulation:</strong> Risk assessment</p>
                  <p>• <strong>Optimization Algorithms:</strong> Portfolio construction</p>
                  <p>• <strong>Stochastic Processes:</strong> Random walk modeling</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">Key Quantitative Indicators</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Sharpe Ratio</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📈</span>
                  </div>
                  <p className="text-blue-700 text-sm">Beta</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📉</span>
                  </div>
                  <p className="text-blue-700 text-sm">VaR</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🔍</span>
                  </div>
                  <p className="text-blue-700 text-sm">Alpha</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "algorithmic-systems",
        title: "Algorithmic Trading Systems",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Automated Execution
              </h3>
              <p className="text-green-700">
                Algorithmic trading systems automatically execute predefined strategies with minimal human intervention. These systems provide speed, consistency, and scalability for quantitative strategies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">System Components</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Data Feed:</strong> Real-time market information</p>
                  <p>• <strong>Strategy Engine:</strong> Decision-making logic</p>
                  <p>• <strong>Risk Manager:</strong> Position and exposure controls</p>
                  <p>• <strong>Execution Engine:</strong> Order placement and management</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Execution Types</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>High-Frequency Trading:</strong> Ultra-fast execution</p>
                  <p>• <strong>Statistical Arbitrage:</strong> Mean reversion strategies</p>
                  <p>• <strong>Market Making:</strong> Liquidity provision</p>
                  <p>• <strong>Trend Following:</strong> Momentum strategies</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-4">System Architecture</h4>
              <div className="space-y-3 text-purple-700">
                <p>• <strong>Modular Design:</strong> Separate components for easy maintenance</p>
                <p>• <strong>Real-Time Processing:</strong> Handle market data streams</p>
                <p>• <strong>Fault Tolerance:</strong> Backup systems and error handling</p>
                <p>• <strong>Scalability:</strong> Handle multiple strategies and markets</p>
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
                Match Trading Concepts with Applications
              </h3>
              <p className="text-indigo-700 mb-4">
                Test your understanding by matching different quantitative trading concepts with their practical applications.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">Match the concept with its application:</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Mean Reversion:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select application...</option>
                        <option value="a">A) Trend following</option>
                        <option value="b">B) Buying oversold assets</option>
                        <option value="c">C) High-frequency trading</option>
                        <option value="d">D) Market making</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Correlation Analysis:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select application...</option>
                        <option value="a">A) Portfolio diversification</option>
                        <option value="b">B) Single asset trading</option>
                        <option value="c">C) Market timing</option>
                        <option value="d">D) Risk assessment</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Monte Carlo Simulation:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select application...</option>
                        <option value="a">A) Price prediction</option>
                        <option value="b">B) Risk assessment</option>
                        <option value="c">C) Technical analysis</option>
                        <option value="d">D) Order execution</option>
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
        id: "trading-bots",
        title: "Trading Bot Development",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Automated Trading Programs
              </h3>
              <p className="text-orange-700">
                Trading bots implement strategy logic, risk controls, and order execution automatically. They can handle multiple strategies simultaneously and operate 24/7 without human intervention.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Bot Capabilities</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Strategy Implementation:</strong> Code trading rules</p>
                  <p>• <strong>Risk Management:</strong> Position sizing and limits</p>
                  <p>• <strong>Order Execution:</strong> Market and limit orders</p>
                  <p>• <strong>Performance Tracking:</strong> Monitor results</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Development Process</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Strategy Design:</strong> Define trading rules</p>
                  <p>• <strong>Backtesting:</strong> Validate on historical data</p>
                  <p>• <strong>Paper Trading:</strong> Test without risk</p>
                  <p>• <strong>Live Deployment:</strong> Gradual implementation</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">Programming Languages</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🐍</span>
                  </div>
                  <p className="text-blue-700 text-sm">Python</p>
                  <p className="text-blue-600 text-xs">Most popular</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">R</p>
                  <p className="text-blue-600 text-xs">Statistical focus</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">☕</span>
                  </div>
                  <p className="text-blue-700 text-sm">Java</p>
                  <p className="text-blue-600 text-xs">High performance</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "backtesting",
        title: "Backtesting Strategies",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Strategy Validation
              </h3>
              <p className="text-green-700">
                Backtesting evaluates strategies using historical data before going live. It's a crucial step that helps identify potential issues and optimize strategy parameters.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Backtesting Process</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Data Collection:</strong> Gather historical market data</p>
                  <p>• <strong>Strategy Implementation:</strong> Code trading rules</p>
                  <p>• <strong>Simulation:</strong> Run strategy on historical data</p>
                  <p>• <strong>Performance Analysis:</strong> Calculate metrics and returns</p>
                  <p>• <strong>Optimization:</strong> Adjust parameters for better results</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Key Metrics</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Total Return:</strong> Overall strategy performance</p>
                  <p>• <strong>Sharpe Ratio:</strong> Risk-adjusted returns</p>
                  <p>• <strong>Maximum Drawdown:</strong> Largest peak-to-trough decline</p>
                  <p>• <strong>Win Rate:</strong> Percentage of profitable trades</p>
                  <p>• <strong>Profit Factor:</strong> Gross profits vs. gross losses</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Common Pitfalls</h4>
                <div className="space-y-3 text-yellow-700">
                  <p>• <strong>Overfitting:</strong> Strategy works on historical data but fails live</p>
                  <p>• <strong>Survivorship Bias:</strong> Only successful companies remain in data</p>
                  <p>• <strong>Look-Ahead Bias:</strong> Using future information in backtest</p>
                  <p>• <strong>Transaction Costs:</strong> Ignoring realistic trading costs</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "machine-learning",
        title: "Machine Learning Integration",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                AI-Powered Trading
              </h3>
              <p className="text-purple-700">
                Machine learning can enhance trading strategies through prediction, classification, and portfolio optimization. However, it must address overfitting and ensure robust validation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">ML Applications</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Price Prediction:</strong> Forecast future asset prices</p>
                  <p>• <strong>Pattern Recognition:</strong> Identify trading signals</p>
                  <p>• <strong>Risk Assessment:</strong> Predict market volatility</p>
                  <p>• <strong>Portfolio Optimization:</strong> Asset allocation strategies</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">ML Techniques</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Supervised Learning:</strong> Regression and classification</p>
                  <p>• <strong>Unsupervised Learning:</strong> Clustering and dimensionality reduction</p>
                  <p>• <strong>Reinforcement Learning:</strong> Strategy optimization</p>
                  <p>• <strong>Deep Learning:</strong> Neural networks for complex patterns</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-4">Challenges & Solutions</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p>• <strong>Overfitting:</strong> Use cross-validation and regularization</p>
                  <p>• <strong>Data Quality:</strong> Clean and validate input data</p>
                  <p>• <strong>Model Interpretability:</strong> Choose explainable algorithms</p>
                </div>
                <div className="space-y-2">
                  <p>• <strong>Market Regime Changes:</strong> Regular model retraining</p>
                  <p>• <strong>Feature Engineering:</strong> Create relevant input variables</p>
                  <p>• <strong>Ensemble Methods:</strong> Combine multiple models</p>
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
                Answer these questions to demonstrate your understanding of quantitative and algorithmic trading.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. How can you prevent overfitting when developing quantitative trading strategies?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the key differences between traditional discretionary trading and quantitative algorithmic trading?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How would you integrate risk management into an algorithmic trading system?</p>
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
                Congratulations! You've completed the introduction to quantitative and algorithmic trading. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Core Principles</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Rules-based systems reduce emotional decision-making</li>
                  <li>✅ Quantitative analysis provides objective criteria</li>
                  <li>✅ Algorithmic systems enable automated execution</li>
                  <li>✅ Backtesting and risk controls are mandatory</li>
                  <li>✅ Machine learning can enhance strategies</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Implementation Best Practices</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Start with simple, well-defined strategies</li>
                  <li>✅ Use out-of-sample testing to prevent overfitting</li>
                  <li>✅ Implement comprehensive risk management</li>
                  <li>✅ Monitor performance continuously</li>
                  <li>✅ Regular model validation and updates</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Next Steps</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Learn statistics</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🐍</span>
                  </div>
                  <p className="text-blue-700 text-sm">Master Python</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🔬</span>
                  </div>
                  <p className="text-blue-700 text-sm">Practice backtesting</p>
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
