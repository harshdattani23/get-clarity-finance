"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function AdvancedCandlestickPatternsPage() {
  const lessonData = {
    title: "Advanced Candlestick Patterns",
    description: "Move beyond single candles and learn to recognize powerful multi-candlestick patterns that signal trend continuations and reversals.",
    lessonSlug: "advanced-candlestick-patterns",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-candlestick-patterns-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-candlestick-patterns-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-candlestick-patterns-bn.m4a",
      te: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-candlestick-patterns-te.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-candlestick-patterns-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/advanced-candlestick-patterns-mr.m4a"
    },
    transcript: {
      en: "Advanced Candlestick Patterns: Move beyond single candles and learn to recognize powerful multi-candlestick patterns that signal trend continuations and reversals for better trading decisions.",
      hi: "उन्नत कैंडलस्टिक पैटर्न: एकल मोमबत्तियों से आगे बढ़ें और शक्तिशाली बहु-कैंडलस्टिक पैटर्न को पहचानना सीखें जो ट्रेंड जारी रखने और उलटने का संकेत देते हैं।",
      bn: "উন্নত ক্যান্ডেলস্টিক প্যাটার্ন: একক মোমবাতি থেকে এগিয়ে যান এবং শক্তিশালী মাল্টি-ক্যান্ডেলস্টিক প্যাটার্নগুলি চিনতে শিখুন।",
      te: "అధునాతన కాండిల్‌స్టిక్ నమూనాలు: ఒకే కాండిల్‌లను దాటి, ట్రెండ్ కొనసాగింపు మరియు రివర్సల్‌లను సూచించే శక్తివంతమైన బహుళ-కాండిల్‌స్టిక్ నమూనాలను గుర్తించడం నేర్చుకోండి.",
      ta: "மேம்பட்ட மெழுகுவர்த்தி வடிவங்கள்: ஒற்றை மெழுகுவர்த்திகளைத் தாண்டி, போக்கு தொடர்ச்சி மற்றும் தலைகீழ் மாற்றங்களைக் குறிக்கும் சக்திவாய்ந்த பல-மெழுகுவர்த்தி வடிவங்களை அடையாளம் காண்பதற்கு கற்றுக்கொள்ளுங்கள்.",
      mr: "प्रगत कॅंडलस्टिक पॅटर्न: एकल मेणबत्त्यांपासून पुढे जा आणि ट्रेंड सुरू ठेवणे आणि उलटणे दर्शविणारे शक्तिशाली मल्टी-कॅंडलस्टिक पॅटर्न ओळखण्यास शिका."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Advanced Patterns",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Beyond Single Candlesticks
              </h2>
              <p className="text-blue-800 text-lg leading-relaxed">
                While single candlesticks provide valuable information, the real power of candlestick analysis 
                lies in recognizing patterns formed by multiple candles. These patterns can signal potential 
                trend reversals, continuations, or indecision in the market.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Why Multi-Candle Patterns Matter</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Stronger Signals</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Multiple candle confirmation</li>
                    <li>• Reduced false signals</li>
                    <li>• Higher probability setups</li>
                    <li>• Better risk/reward ratios</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Market Psychology</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Shows buyer/seller behavior</li>
                    <li>• Reveals market sentiment</li>
                    <li>• Indicates trend strength</li>
                    <li>• Signals potential reversals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "reversal-patterns",
        title: "Reversal Patterns",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-red-800 mb-4">
                Signs of Trend Change
              </h3>
              <p className="text-red-700 mb-4">
                Reversal patterns suggest that the current trend may be coming to an end and a new trend 
                in the opposite direction may begin.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-700 mb-3">Engulfing Pattern</h4>
                  <p className="text-gray-700 mb-4">
                    A two-candle pattern where the second candle completely engulfs the body of the first candle.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800 mb-2">Bullish Engulfing</h5>
                      <p className="text-green-700 text-sm">
                        A small bearish candle followed by a larger bullish candle that engulfs it. 
                        Signals potential upward reversal.
                      </p>
                      <div className="mt-2 text-xs text-green-600">
                        <strong>Formation:</strong> Small red candle + Large green candle
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h5 className="font-medium text-red-800 mb-2">Bearish Engulfing</h5>
                      <p className="text-red-700 text-sm">
                        A small bullish candle followed by a larger bearish candle that engulfs it. 
                        Signals potential downward reversal.
                      </p>
                      <div className="mt-2 text-xs text-red-600">
                        <strong>Formation:</strong> Small green candle + Large red candle
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-700 mb-3">Hammer and Hanging Man</h4>
                  <p className="text-gray-700 mb-4">
                    Single-candle patterns with long lower shadows and small bodies.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800 mb-2">Hammer</h5>
                      <p className="text-green-700 text-sm">
                        Bullish reversal pattern appearing at the bottom of downtrends.
                      </p>
                      <div className="mt-2 text-xs text-green-600">
                        <strong>Characteristics:</strong> Long lower shadow, small body, appears in downtrend
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h5 className="font-medium text-red-800 mb-2">Hanging Man</h5>
                      <p className="text-red-700 text-sm">
                        Bearish reversal pattern appearing at the top of uptrends.
                      </p>
                      <div className="mt-2 text-xs text-red-600">
                        <strong>Characteristics:</strong> Long lower shadow, small body, appears in uptrend
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-700 mb-3">Doji Patterns</h4>
                  <p className="text-gray-700 mb-4">
                    Candles with very small bodies, indicating indecision in the market.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <h5 className="font-medium text-yellow-800 mb-2">Long-Legged Doji</h5>
                      <p className="text-yellow-700 text-sm">
                        Long upper and lower shadows, strong indecision.
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800 mb-2">Dragonfly Doji</h5>
                      <p className="text-green-700 text-sm">
                        Long lower shadow, no upper shadow, potential bullish reversal.
                      </p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <h5 className="font-medium text-red-800 mb-2">Gravestone Doji</h5>
                      <p className="text-red-700 text-sm">
                        Long upper shadow, no lower shadow, potential bearish reversal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "continuation-patterns",
        title: "Continuation Patterns",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                Trend Resumption Signals
              </h3>
              <p className="text-blue-700 mb-4">
                Continuation patterns suggest that the current trend will continue after a brief pause or consolidation.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-3">Flags and Pennants</h4>
                  <p className="text-gray-700 mb-4">
                    Short consolidation patterns that occur after strong moves.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-700 mb-2">Flag Pattern</h5>
                      <p className="text-blue-700 text-sm">
                        Rectangular consolidation with parallel trend lines.
                      </p>
                      <div className="mt-2 text-xs text-blue-600">
                        <strong>Formation:</strong> Strong move + Parallel consolidation + Breakout
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-700 mb-2">Pennant Pattern</h5>
                      <p className="text-blue-700 text-sm">
                        Triangular consolidation with converging trend lines.
                      </p>
                      <div className="mt-2 text-xs text-blue-600">
                        <strong>Formation:</strong> Strong move + Triangle consolidation + Breakout
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-3">Triangle Patterns</h4>
                  <p className="text-gray-700 mb-4">
                    Consolidation patterns with converging trend lines.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800 mb-2">Ascending Triangle</h5>
                      <p className="text-green-700 text-sm">
                        Flat top with rising bottom, bullish continuation.
                      </p>
                      <div className="mt-2 text-xs text-green-600">
                        <strong>Breakout:</strong> Usually upward
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <h5 className="font-medium text-red-800 mb-2">Descending Triangle</h5>
                      <p className="text-red-700 text-sm">
                        Flat bottom with falling top, bearish continuation.
                      </p>
                      <div className="mt-2 text-xs text-red-600">
                        <strong>Breakout:</strong> Usually downward
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <h5 className="font-medium text-yellow-800 mb-2">Symmetrical Triangle</h5>
                      <p className="text-yellow-700 text-sm">
                        Converging trend lines, continuation in trend direction.
                      </p>
                      <div className="mt-2 text-xs text-yellow-600">
                        <strong>Breakout:</strong> Follows previous trend
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-3">💡 Pattern Recognition Tips</h4>
                  <ul className="space-y-2 text-purple-700 text-sm">
                    <li>• Flags and pennants typically last 1-3 weeks</li>
                    <li>• Volume usually decreases during consolidation</li>
                    <li>• Breakout should occur with increased volume</li>
                    <li>• Measure the flagpole for price target projection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "three-candle-patterns",
        title: "Three-Candle Patterns",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Stronger Confirmation Signals
              </h3>
              <p className="text-green-700 mb-4">
                More complex patterns that provide stronger signals due to the confirmation from multiple candles.
              </p>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-700 mb-3">Morning Star</h4>
                    <p className="text-gray-700 mb-3">
                      A three-candle bullish reversal pattern: bearish candle, small-bodied candle, bullish candle.
                    </p>
                    <div className="bg-green-100 p-3 rounded-lg border border-green-300">
                      <p className="text-green-800 font-medium">
                        Appears at the bottom of downtrends, signals potential upward reversal.
                      </p>
                    </div>
                    <div className="mt-3 text-xs text-green-600">
                      <strong>Formation:</strong> Red candle + Small candle + Green candle
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-700 mb-3">Evening Star</h4>
                    <p className="text-gray-700 mb-3">
                      A three-candle bearish reversal pattern: bullish candle, small-bodied candle, bearish candle.
                    </p>
                    <div className="bg-red-100 p-3 rounded-lg border border-red-300">
                      <p className="text-red-800 font-medium">
                        Appears at the top of uptrends, signals potential downward reversal.
                      </p>
                    </div>
                    <div className="mt-3 text-xs text-red-600">
                      <strong>Formation:</strong> Green candle + Small candle + Red candle
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-700 mb-3">Three White Soldiers</h4>
                    <p className="text-gray-700 mb-3">
                      Three consecutive bullish candles with higher highs and higher lows.
                    </p>
                    <div className="bg-green-100 p-3 rounded-lg border border-green-300">
                      <p className="text-green-800 font-medium">
                        Strong bullish continuation pattern.
                      </p>
                    </div>
                    <div className="mt-3 text-xs text-green-600">
                      <strong>Formation:</strong> Three green candles with increasing highs
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-700 mb-3">Three Black Crows</h4>
                    <p className="text-gray-700 mb-3">
                      Three consecutive bearish candles with lower highs and lower lows.
                    </p>
                    <div className="bg-red-100 p-3 rounded-lg border border-red-300">
                      <p className="text-red-800 font-medium">
                        Strong bearish continuation pattern.
                      </p>
                    </div>
                    <div className="mt-3 text-xs text-red-600">
                      <strong>Formation:</strong> Three red candles with decreasing highs
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-3">🎯 Three-Candle Pattern Benefits</h4>
                  <ul className="space-y-2 text-yellow-700 text-sm">
                    <li>• Higher reliability due to multiple confirmations</li>
                    <li>• Clearer market psychology signals</li>
                    <li>• Better risk/reward ratios</li>
                    <li>• Reduced false breakouts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "pattern-recognition",
        title: "Pattern Recognition Tips",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-orange-800 mb-4">
                Mastering Pattern Recognition
              </h3>
              <p className="text-orange-700 mb-4">
                Successfully identifying candlestick patterns requires practice and attention to detail.
              </p>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-700 mb-3">Context Analysis</h4>
                    <div className="space-y-3">
                      <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                        <h5 className="font-medium text-orange-700 mb-1">Trend Context</h5>
                        <p className="text-orange-700 text-sm">
                          Always consider the pattern in the context of the overall trend and market conditions.
                        </p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                        <h5 className="font-medium text-orange-700 mb-1">Support/Resistance</h5>
                        <p className="text-orange-700 text-sm">
                          Look for patterns near key support and resistance levels for stronger signals.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-700 mb-3">Confirmation Signals</h4>
                    <div className="space-y-3">
                      <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                        <h5 className="font-medium text-orange-700 mb-1">Technical Indicators</h5>
                        <p className="text-orange-700 text-sm">
                          Look for confirmation from other technical indicators or support/resistance levels.
                        </p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                        <h5 className="font-medium text-orange-700 mb-1">Volume Confirmation</h5>
                        <p className="text-orange-700 text-sm">
                          Higher volume during pattern formation increases the reliability of the signal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-700 mb-3">Timeframe Considerations</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-orange-700 mb-2">Longer Timeframes</h5>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• More reliable signals</li>
                        <li>• Stronger trend context</li>
                        <li>• Better risk management</li>
                        <li>• Institutional interest</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-700 mb-2">Shorter Timeframes</h5>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• More frequent signals</li>
                        <li>• Higher noise levels</li>
                        <li>• Faster execution needed</li>
                        <li>• Higher false signal risk</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-3">🔍 Pattern Quality Checklist</h4>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Does the pattern appear in the right trend context?</li>
                    <li>• Is there volume confirmation?</li>
                    <li>• Are the candle proportions correct?</li>
                    <li>• Is the pattern near key levels?</li>
                    <li>• Does it align with other technical signals?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Advanced Candlestick Patterns Quiz",
        isRequired: true,
        type: "quiz" as const,
        minScore: 4,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Test Your Knowledge of Advanced Patterns
              </h3>
              <p className="text-blue-700 mb-4">
                Answer these questions to check your understanding of advanced candlestick patterns.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What does an Engulfing Pattern indicate?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Trend continuation</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Potential trend reversal</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Market consolidation</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. Where does a Hammer pattern typically appear?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">At the top of uptrends</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">At the bottom of downtrends</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">During sideways markets</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What is the main characteristic of a Doji pattern?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Very small body</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Very long body</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">No shadows</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    4. Which pattern is a continuation pattern?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Engulfing</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Flag</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Hammer</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    5. How many candles make up a Morning Star pattern?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Two</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Three</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Four</span>
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
        title: "Pattern Strategy Selection",
        isRequired: true,
        type: "selection" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Choose Your Candlestick Pattern Strategies
              </h3>
              <p className="text-green-700 mb-6">
                Select the patterns and strategies that align with your trading style and risk tolerance.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Reversal Trading</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Engulfing patterns</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Hammer/Hanging Man</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Morning/Evening Star</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Doji patterns</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Continuation Trading</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Flag patterns</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Pennant patterns</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Triangle patterns</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Three White Soldiers</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Risk Management</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Wait for confirmation</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Use volume confirmation</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Set tight stop losses</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Consider market context</span>
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
                      <h4 className="font-medium text-green-800">Stronger Signals</h4>
                      <p className="text-green-700 text-sm">Advanced candlestick patterns provide stronger signals than single candles due to multiple confirmations.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Pattern Types</h4>
                      <p className="text-green-700 text-sm">Reversal patterns suggest trend changes, while continuation patterns suggest trend resumption.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Confirmation Strength</h4>
                      <p className="text-green-700 text-sm">Three-candle patterns offer more confirmation than two-candle patterns, increasing reliability.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Context is Key</h4>
                      <p className="text-green-700 text-sm">Always consider pattern context and confirm with other technical analysis tools for best results.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice identifying patterns on historical charts</li>
                  <li>• Use pattern recognition software to scan for setups</li>
                  <li>• Combine patterns with volume analysis for confirmation</li>
                  <li>• Develop your own pattern trading checklist</li>
                  <li>• Backtest pattern strategies on different timeframes</li>
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
