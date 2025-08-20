"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function BacktestingStrategiesPage() {
  const lessonData = {
    title: "Backtesting and Paper Trading",
    description: "Learn how to test your trading strategies using historical data and practice with paper trading before risking real money.",
    lessonSlug: "backtesting-strategies",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/specialized-topics/backtesting-strategies-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/specialized-topics/backtesting-strategies-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/specialized-topics/backtesting-strategies-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/specialized-topics/backtesting-strategies-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/specialized-topics/backtesting-strategies-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/specialized-topics/backtesting-strategies-ta.m4a"
    },
    transcript: {
      en: "Before implementing any trading strategy with real money, it's essential to test it thoroughly. Backtesting and paper trading provide safe ways to validate your strategies and understand their potential performance.",
      hi: "वास्तविक पैसे के साथ किसी भी ट्रेडिंग रणनीति को लागू करने से पहले, इसे पूरी तरह से परीक्षण करना आवश्यक है। बैकटेस्टिंग और पेपर ट्रेडिंग आपकी रणनीतियों को मान्य करने और उनके संभावित प्रदर्शन को समझने के लिए सुरक्षित तरीके प्रदान करते हैं।",
      bn: "বাস্তব অর্থ দিয়ে কোনও ট্রেডিং কৌশল বাস্তবায়নের আগে, এটি সম্পূর্ণভাবে পরীক্ষা করা অত্যাবশ্যক। ব্যাকটেস্টিং এবং পেপার ট্রেডিং আপনার কৌশলগুলি যাচাই করার এবং তাদের সম্ভাব্য পারফরম্যান্স বোঝার জন্য নিরাপদ উপায় প্রদান করে।",
      mr: "वास्तविक पैश्यासह कोणत्याही ट्रेडिंग स्ट्रॅटेजी लागू करण्यापूर्वी, ती पूर्णपणे चाचणी करणे आवश्यक आहे. बॅकटेस्टिंग आणि पेपर ट्रेडिंग आपल्या स्ट्रॅटेजी मान्य करण्यासाठी आणि त्यांच्या संभाव्य कामगिरी समजून घेण्यासाठी सुरक्षित मार्ग प्रदान करते.",
      gu: "વાસ્તવિક પૈસા સાથે કોઈપણ ટ્રેડિંગ વ્યૂહરચના લાગુ કરતા પહેલા, તેને સંપૂર્ણપણે પરીક્ષણ કરવું આવશ્યક છે. બેકટેસ્ટિંગ અને પેપર ટ્રેડિંગ તમારી વ્યૂહરચનાઓને માન્ય કરવા અને તેમના સંભવિત પ્રદર્શનને સમજવા માટે સલામત માર્ગો પ્રદાન કરે છે.",
      ta: "உண்மையான பணத்துடன் எந்தவொரு வர்த்தக மூலோபாயத்தையும் செயல்படுத்துவதற்கு முன், அதை முழுமையாக சோதிக்க வேண்டும். பின்னோக்கி சோதனை மற்றும் காகித வர்த்தகம் உங்கள் மூலோபாயங்களை சரிபார்த்து அவற்றின் சாத்தியமான செயல்திறனைப் புரிந்துகொள்ள பாதுகாப்பான வழிகளை வழங்குகிறது."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Backtesting and Paper Trading",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Safe Strategy Testing
              </h3>
              <p className="text-blue-700">
                Before implementing any trading strategy with real money, it's essential to test it thoroughly. Backtesting and paper trading provide safe ways to validate your strategies and understand their potential performance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">What You'll Learn</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Backtesting fundamentals and process</li>
                  <li>• Performance metrics and analysis</li>
                  <li>• Paper trading best practices</li>
                  <li>• Common pitfalls and limitations</li>
                  <li>• Transitioning to live trading</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Key Benefits</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Validate strategies without risk</li>
                  <li>• Optimize parameters and timing</li>
                  <li>• Understand risk-return profiles</li>
                  <li>• Build confidence before live trading</li>
                  <li>• Identify strategy flaws early</li>
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
                Let's see how much you already know about backtesting and paper trading!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the main purpose of backtesting?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) To guarantee future profits</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) To test strategies on historical data</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) To avoid paying taxes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) To impress other traders</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which of the following is a limitation of backtesting?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) It's too expensive</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) It takes too long</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Overfitting to historical data</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) It requires special software</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "what-is-backtesting",
        title: "What is Backtesting?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                Understanding the Basics
              </h3>
              <p className="text-yellow-700">
                Backtesting involves testing a trading strategy using historical market data to see how it would have performed in the past. The goal is to understand the strategy's potential performance and identify any issues before going live.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Core Concept</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Historical Simulation:</strong> Test strategies on past market data</p>
                  <p>• <strong>Performance Analysis:</strong> Calculate returns and risk metrics</p>
                  <p>• <strong>Strategy Validation:</strong> Identify strengths and weaknesses</p>
                  <p>• <strong>Parameter Optimization:</strong> Fine-tune strategy settings</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Key Benefits</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Risk-Free Testing:</strong> No real money at stake</p>
                  <p>• <strong>Data-Driven Decisions:</strong> Base decisions on historical evidence</p>
                  <p>• <strong>Strategy Refinement:</strong> Improve before live implementation</p>
                  <p>• <strong>Confidence Building:</strong> Understand expected outcomes</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "backtesting-process",
        title: "The Backtesting Process",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Step-by-Step Approach
              </h3>
              <p className="text-green-700">
                A proper backtesting process follows a systematic approach to ensure accurate and reliable results.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">1. Define Strategy Rules</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Entry Conditions:</strong> Clear criteria for entering positions</p>
                  <p>• <strong>Exit Conditions:</strong> When to close positions</p>
                  <p>• <strong>Position Sizing:</strong> How much to invest per trade</p>
                  <p>• <strong>Risk Management:</strong> Stop-loss and take-profit levels</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">2. Collect Historical Data</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Time Period:</strong> Sufficient historical coverage</p>
                  <p>• <strong>Data Quality:</strong> Accurate and complete information</p>
                  <p>• <strong>Market Coverage:</strong> All relevant instruments</p>
                  <p>• <strong>Frequency:</strong> Appropriate time intervals</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">3. Implement and Test</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Code Strategy:</strong> Convert rules to executable code</p>
                  <p>• <strong>Run Simulation:</strong> Execute on historical data</p>
                  <p>• <strong>Track Results:</strong> Record all trades and outcomes</p>
                  <p>• <strong>Calculate Metrics:</strong> Performance and risk statistics</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "performance-metrics",
        title: "Key Performance Metrics",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Measuring Success
              </h3>
              <p className="text-purple-700">
                When analyzing backtesting results, focus on key metrics that provide insights into strategy performance and risk characteristics.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-4">Return Metrics</h4>
                <div className="space-y-3 text-blue-700">
                  <p>• <strong>Total Return:</strong> Overall percentage gain or loss</p>
                  <p>• <strong>Annualized Return:</strong> Yearly performance rate</p>
                  <p>• <strong>Compound Growth:</strong> Reinvestment effects</p>
                  <p>• <strong>Benchmark Comparison:</strong> vs. market indices</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-4">Risk Metrics</h4>
                <div className="space-y-3 text-red-700">
                  <p>• <strong>Volatility:</strong> Price fluctuation measure</p>
                  <p>• <strong>Maximum Drawdown:</strong> Largest peak-to-trough decline</p>
                  <p>• <strong>Value at Risk (VaR):</strong> Potential loss at confidence level</p>
                  <p>• <strong>Downside Deviation:</strong> Negative return variability</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">Efficiency Metrics</h4>
                <div className="space-y-3 text-green-700">
                  <p>• <strong>Sharpe Ratio:</strong> Risk-adjusted returns</p>
                  <p>• <strong>Sortino Ratio:</strong> Downside risk adjustment</p>
                  <p>• <strong>Calmar Ratio:</strong> Return vs. max drawdown</p>
                  <p>• <strong>Information Ratio:</strong> Active return vs. tracking error</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Trading Metrics</h4>
                <div className="space-y-3 text-yellow-700">
                  <p>• <strong>Win Rate:</strong> Percentage of profitable trades</p>
                  <p>• <strong>Profit Factor:</strong> Gross profits vs. gross losses</p>
                  <p>• <strong>Average Win/Loss:</strong> Size of winning vs. losing trades</p>
                  <p>• <strong>Recovery Factor:</strong> Return vs. max drawdown</p>
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
                Match Metrics with Descriptions
              </h3>
              <p className="text-indigo-700 mb-4">
                Test your understanding by matching performance metrics with their correct descriptions.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">Match the metric with its description:</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Sharpe Ratio:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select description...</option>
                        <option value="a">A) Risk-adjusted return measure</option>
                        <option value="b">B) Maximum loss from peak</option>
                        <option value="c">C) Percentage of winning trades</option>
                        <option value="d">D) Total return over time</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Maximum Drawdown:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select description...</option>
                        <option value="a">A) Annual return rate</option>
                        <option value="b">B) Largest peak-to-trough decline</option>
                        <option value="c">C) Risk-adjusted performance</option>
                        <option value="d">D) Win rate percentage</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Win Rate:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select description...</option>
                        <option value="a">A) Total return measure</option>
                        <option value="b">B) Risk assessment tool</option>
                        <option value="c">C) Percentage of profitable trades</option>
                        <option value="d">D) Volatility indicator</option>
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
        id: "limitations",
        title: "Limitations of Backtesting",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">
                Understanding the Drawbacks
              </h3>
              <p className="text-red-700">
                While backtesting is valuable, it's important to understand its limitations and potential pitfalls to avoid overconfidence in results.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Overfitting</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Definition:</strong> Strategy works well on historical data but fails in live trading</p>
                  <p>• <strong>Causes:</strong> Too many parameters, insufficient data, data mining</p>
                  <p>• <strong>Prevention:</strong> Use out-of-sample testing, limit parameters</p>
                  <p>• <strong>Warning Signs:</strong> Unrealistically high returns, perfect timing</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Data Quality Issues</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Slippage:</strong> Historical data may not reflect actual execution prices</p>
                  <p>• <strong>Survivorship Bias:</strong> Only successful companies remain in data</p>
                  <p>• <strong>Corporate Actions:</strong> Splits, dividends, mergers not properly adjusted</p>
                  <p>• <strong>Market Microstructure:</strong> Bid-ask spreads, liquidity changes</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Market Regime Changes</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Definition:</strong> Market conditions may have changed since historical period</p>
                  <p>• <strong>Examples:</strong> Regulation changes, technology shifts, economic cycles</p>
                  <p>• <strong>Impact:</strong> Historical patterns may not repeat</p>
                  <p>• <strong>Mitigation:</strong> Use multiple time periods, stress testing</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "paper-trading",
        title: "Paper Trading",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Risk-Free Practice
              </h3>
              <p className="text-green-700">
                Paper trading involves practicing your strategy with simulated money in real-time market conditions, providing valuable experience without financial risk.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-4">Benefits of Paper Trading</h4>
                <div className="space-y-3 text-blue-700">
                  <p>• <strong>Risk-Free Practice:</strong> Execute strategy without financial loss</p>
                  <p>• <strong>Psychological Training:</strong> Understand emotional aspects of trading</p>
                  <p>• <strong>Execution Testing:</strong> Test order timing and placement</p>
                  <p>• <strong>Strategy Refinement:</strong> Improve based on real-time feedback</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Best Practices</h4>
                <div className="space-y-3 text-yellow-700">
                  <p>• <strong>Treat Seriously:</strong> Act as if using real money</p>
                  <p>• <strong>Realistic Execution:</strong> Use realistic prices and timing</p>
                  <p>• <strong>Detailed Records:</strong> Track all trades and decisions</p>
                  <p>• <strong>Regular Review:</strong> Analyze performance and learn</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Transitioning to Live Trading</h4>
              <div className="space-y-3 text-gray-700">
                <p>• <strong>Consistent Profitability:</strong> Ensure success in paper trading first</p>
                <p>• <strong>Small Positions:</strong> Start with minimal position sizes</p>
                <p>• <strong>Close Monitoring:</strong> Watch performance carefully</p>
                <p>• <strong>Psychological Preparation:</strong> Be ready for emotional challenges</p>
                <p>• <strong>Loss Management:</strong> Have a plan for handling losses</p>
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
                Answer these questions to demonstrate your understanding of backtesting and paper trading.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Why might a strategy that performs well in backtesting fail in live trading?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What steps would you take to validate a strategy before moving to paper trading?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How can you minimize the risk of overfitting when backtesting a strategy?</p>
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
                Congratulations! You've completed the introduction to backtesting and paper trading. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Core Concepts</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Backtesting validates strategies using historical data</li>
                  <li>✅ Paper trading provides risk-free practice</li>
                  <li>✅ Performance metrics include returns, risk, and efficiency</li>
                  <li>✅ Common limitations include overfitting and data quality</li>
                  <li>✅ Systematic process ensures reliable results</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Best Practices</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Use out-of-sample testing to prevent overfitting</li>
                  <li>✅ Focus on realistic data and execution</li>
                  <li>✅ Monitor multiple performance metrics</li>
                  <li>✅ Treat paper trading as seriously as live trading</li>
                  <li>✅ Only transition to live after consistent success</li>
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
                  <p className="text-blue-700 text-sm">Practice backtesting</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📝</span>
                  </div>
                  <p className="text-blue-700 text-sm">Start paper trading</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🔬</span>
                  </div>
                  <p className="text-blue-700 text-sm">Analyze results</p>
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
