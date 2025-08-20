"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function FibonacciRetracementsPage() {
  const lessonData = {
    title: "Fibonacci Retracements",
    description: "Learn how to use Fibonacci retracement levels to identify potential support and resistance levels in trading.",
    lessonSlug: "fibonacci-retracements",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/fibonacci-retracements-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/fibonacci-retracements-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/fibonacci-retracements-bn.m4a",
      te: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/fibonacci-retracements-te.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/fibonacci-retracements-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/fibonacci-retracements-mr.m4a"
    },
    transcript: {
      en: "Fibonacci Retracements: Learn how to use Fibonacci retracement levels to identify potential support and resistance levels in trading for better entry and exit decisions.",
      hi: "फिबोनैचि रिट्रेसमेंट: ट्रेडिंग में संभावित सहायता और प्रतिरोध स्तरों की पहचान करने के लिए फिबोनैचि रिट्रेसमेंट स्तरों का उपयोग करना सीखें।",
      bn: "ফিবোনাচি রিট্রেসমেন্ট: ট্রেডিংয়ে সম্ভাব্য সহায়তা এবং প্রতিরোধ স্তরগুলি চিহ্নিত করতে ফিবোনাচি রিট্রেসমেন্ট স্তরগুলি কীভাবে ব্যবহার করবেন তা শিখুন।",
      te: "ఫిబోనాకి రిట్రేస్మెంట్స్: ట్రేడింగ్‌లో సంభావ్య మద్దతు మరియు నిరోధక స్థాయిలను గుర్తించడానికి ఫిబోనాకి రిట్రేస్మెంట్ స్థాయిలను ఎలా ఉపయోగించాలో తెలుసుకోండి.",
      ta: "ஃபிபோனாசி ரிட்ரேஸ்மென்ட்ஸ்: வர்த்தகத்தில் சாத்தியமான ஆதரவு மற்றும் எதிர்ப்பு நிலைகளை அடையாளம் காண ஃபிபோனாசி ரிட்ரேஸ்மென்ட் நிலைகளை எவ்வாறு பயன்படுத்துவது என்பதைக் கற்றுக்கொள்ளுங்கள்.",
      mr: "फिबोनाची रिट्रेसमेंट्स: ट्रेडिंगमध्ये संभाव्य आधार आणि प्रतिरोध पातळ्या ओळखण्यासाठी फिबोनाची रिट्रेसमेंट पातळ्या कशा वापरायच्या ते शिका."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Fibonacci Retracements",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                The Golden Ratio in Trading
              </h2>
              <p className="text-blue-800 text-lg leading-relaxed">
                Fibonacci retracements are a popular technical analysis tool that uses horizontal lines to 
                indicate areas of support or resistance at the key Fibonacci levels before the price continues 
                in the original direction.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Why Fibonacci Matters</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Natural Patterns</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Based on mathematical sequence</li>
                    <li>• Found throughout nature</li>
                    <li>• Human psychology follows it</li>
                    <li>• Self-fulfilling prophecy</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Trading Benefits</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Identify support/resistance</li>
                    <li>• Better entry/exit points</li>
                    <li>• Risk management levels</li>
                    <li>• Trend continuation signals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "what-are-fibonacci-levels",
        title: "What Are Fibonacci Levels?",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                The Mathematical Foundation
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-700 mb-3">The Fibonacci Sequence</h4>
                  <p className="text-gray-700 mb-4">
                    Fibonacci levels are based on the Fibonacci sequence, a series of numbers where each number 
                    is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...
                  </p>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-700 mb-2">Sequence Pattern</h5>
                    <div className="grid grid-cols-6 gap-2 text-center">
                      <div className="bg-green-100 p-2 rounded text-sm font-medium">0</div>
                      <div className="bg-green-100 p-2 rounded text-sm font-medium">1</div>
                      <div className="bg-green-100 p-2 rounded text-sm font-medium">1</div>
                      <div className="bg-green-100 p-2 rounded text-sm font-medium">2</div>
                      <div className="bg-green-100 p-2 rounded text-sm font-medium">3</div>
                      <div className="bg-green-100 p-2 rounded text-sm font-medium">5</div>
                    </div>
                    <p className="text-green-700 text-sm mt-2">
                      Each number = Sum of previous two numbers
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-700 mb-3">Key Retracement Levels</h4>
                  <p className="text-gray-700 mb-4">
                    The key Fibonacci retracement levels are derived from this sequence and expressed as percentages.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-700 mb-2">Primary Levels</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 23.6% (0.236)</li>
                        <li>• 38.2% (0.382)</li>
                        <li>• 50.0% (0.500)</li>
                        <li>• 61.8% (0.618)</li>
                        <li>• 78.6% (0.786)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-700 mb-2">Golden Ratio</h5>
                      <p className="text-green-700 text-sm">
                        The 61.8% level is known as the "Golden Ratio" and is considered the most important 
                        Fibonacci level due to its mathematical significance and psychological impact.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-3">💡 Mathematical Beauty</h4>
                  <ul className="space-y-2 text-yellow-700 text-sm">
                    <li>• 61.8% = (√5 - 1) / 2 ≈ 0.618</li>
                    <li>• 38.2% = 1 - 0.618 ≈ 0.382</li>
                    <li>• 23.6% = 0.618² ≈ 0.236</li>
                    <li>• 78.6% = 1 - 0.236 ≈ 0.786</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "key-levels",
        title: "Key Fibonacci Retracement Levels",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                Understanding Each Level
              </h3>
              <p className="text-blue-700 mb-4">
                The most important Fibonacci retracement levels and their significance.
              </p>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-700 mb-2">23.6% - Shallow Retracement</h4>
                    <p className="text-gray-700 mb-3">
                      Often the shallowest retracement, indicating strong momentum.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Strong trend continuation</li>
                        <li>• Minimal pullback</li>
                        <li>• High momentum</li>
                        <li>• Quick recovery</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-700 mb-2">38.2% - Common Retracement</h4>
                    <p className="text-gray-700 mb-3">
                      A common retracement level in trending markets.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Standard pullback level</li>
                        <li>• Healthy correction</li>
                        <li>• Trend continuation likely</li>
                        <li>• Good entry point</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-700 mb-2">50% - Psychological Level</h4>
                    <p className="text-gray-700 mb-3">
                      A psychological level that many traders watch.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Round number psychology</li>
                        <li>• Halfway point</li>
                        <li>• Strong support/resistance</li>
                        <li>• Easy to remember</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-700 mb-2">61.8% - Golden Ratio</h4>
                    <p className="text-gray-700 mb-3">
                      The golden ratio, often a strong support/resistance level.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Most important level</li>
                        <li>• Strong support/resistance</li>
                        <li>• Trend reversal possible</li>
                        <li>• Mathematical significance</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-2">78.6% - Deep Retracement</h4>
                  <p className="text-gray-700 mb-3">
                    Deep retracement, may indicate trend reversal.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Deep correction</li>
                      <li>• Trend reversal possible</li>
                      <li>• Weak trend</li>
                      <li>• High risk level</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "how-to-use",
        title: "How to Use Fibonacci Retracements",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
                Step-by-Step Application
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-medium text-indigo-700 mb-3">Step-by-Step Process</h4>
                  <div className="space-y-4">
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                      <h5 className="font-medium text-indigo-700 mb-2">Step 1: Identify Swing Points</h5>
                      <p className="text-indigo-700 text-sm">
                        Identify a significant swing high and swing low in the trend. Look for clear, 
                        well-defined peaks and troughs.
                      </p>
                    </div>
                    
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                      <h5 className="font-medium text-indigo-700 mb-2">Step 2: Draw the Tool</h5>
                      <p className="text-indigo-700 text-sm">
                        Draw the Fibonacci retracement tool from the swing low to the swing high (uptrend) 
                        or vice versa (downtrend).
                      </p>
                    </div>
                    
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                      <h5 className="font-medium text-indigo-700 mb-2">Step 3: View Levels</h5>
                      <p className="text-indigo-700 text-sm">
                        The retracement levels will automatically appear as horizontal lines on your chart.
                      </p>
                    </div>
                    
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                      <h5 className="font-medium text-indigo-700 mb-2">Step 4: Analyze Price Action</h5>
                      <p className="text-indigo-700 text-sm">
                        Look for price action around these levels for potential support/resistance and 
                        trading opportunities.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-medium text-indigo-700 mb-3">Chart Analysis Tips</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">Uptrend Application</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Draw from low to high</li>
                        <li>• Look for bounces at levels</li>
                        <li>• Use as support zones</li>
                        <li>• Enter on pullbacks</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">Downtrend Application</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Draw from high to low</li>
                        <li>• Look for rejections at levels</li>
                        <li>• Use as resistance zones</li>
                        <li>• Enter on rallies</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-3">🎯 Best Practices</h4>
                  <ul className="space-y-2 text-yellow-700 text-sm">
                    <li>• Use multiple timeframes for confirmation</li>
                    <li>• Look for confluence with other levels</li>
                    <li>• Consider market context and trend</li>
                    <li>• Don't force levels where they don't fit</li>
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
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-emerald-800 mb-4">
                Putting Fibonacci to Work
              </h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-emerald-200">
                    <h4 className="font-medium text-emerald-700 mb-3">Entry Points</h4>
                    <p className="text-gray-700 mb-3">
                      Enter trades when price bounces off Fibonacci levels.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Buy at support levels</li>
                        <li>• Sell at resistance levels</li>
                        <li>• Wait for price confirmation</li>
                        <li>• Use multiple timeframes</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-emerald-200">
                    <h4 className="font-medium text-emerald-700 mb-3">Exit Points</h4>
                    <p className="text-gray-700 mb-3">
                      Set profit targets at Fibonacci extension levels.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Use 127.2% extension</li>
                        <li>• Use 161.8% extension</li>
                        <li>• Consider 200% extension</li>
                        <li>• Scale out positions</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-emerald-200">
                    <h4 className="font-medium text-emerald-700 mb-3">Stop Losses</h4>
                    <p className="text-gray-700 mb-3">
                      Place stops below/above key Fibonacci levels.
                    </p>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Below 61.8% for longs</li>
                        <li>• Above 61.8% for shorts</li>
                        <li>• Consider 78.6% level</li>
                        <li>• Use ATR for buffer</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-emerald-200">
                    <h4 className="font-medium text-emerald-700 mb-3">Confirmation</h4>
                    <p className="text-gray-700 mb-3">
                      Use with other technical indicators for stronger signals.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• RSI divergence</li>
                        <li>• Volume confirmation</li>
                        <li>• Candlestick patterns</li>
                        <li>• Trend lines</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-3">🚀 Advanced Strategies</h4>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• <strong>Fibonacci Fans:</strong> Use trend lines at Fibonacci angles</li>
                    <li>• <strong>Fibonacci Arcs:</strong> Circular support/resistance levels</li>
                    <li>• <strong>Fibonacci Time Zones:</strong> Time-based projections</li>
                    <li>• <strong>Fibonacci Extensions:</strong> Project future price targets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "limitations",
        title: "Limitations and Considerations",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-red-800 mb-4">
                Understanding the Drawbacks
              </h3>
              <p className="text-red-700 mb-4">
                While useful, Fibonacci retracements have limitations that traders should be aware of.
              </p>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-700 mb-3">Not Guaranteed</h4>
                    <p className="text-gray-700 mb-3">
                      Fibonacci levels are not guaranteed to work in all market conditions.
                    </p>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Markets can ignore levels</li>
                        <li>• Strong trends may break through</li>
                        <li>• News events can override</li>
                        <li>• No 100% success rate</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-700 mb-3">Subjective Analysis</h4>
                    <p className="text-gray-700 mb-3">
                      Can be subjective in identifying swing points.
                    </p>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Different swing points possible</li>
                        <li>• Multiple interpretations</li>
                        <li>• Personal bias influence</li>
                        <li>• No standard definition</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-700 mb-3">Overuse Risk</h4>
                    <p className="text-gray-700 mb-3">
                      Overuse can lead to self-fulfilling prophecies.
                    </p>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Too many levels on chart</li>
                        <li>• Confusion and analysis paralysis</li>
                        <li>• Reduced effectiveness</li>
                        <li>• Market manipulation</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-700 mb-3">Confirmation Needed</h4>
                    <p className="text-gray-700 mb-3">
                      Should be used with other analysis tools.
                    </p>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Not standalone indicator</li>
                        <li>• Need price action confirmation</li>
                        <li>• Combine with volume</li>
                        <li>• Use with trend analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-medium text-orange-800 mb-3">⚠️ Risk Management</h4>
                  <ul className="space-y-2 text-orange-700 text-sm">
                    <li>• Never risk more than you can afford to lose</li>
                    <li>• Use proper position sizing</li>
                    <li>• Always have a stop loss</li>
                    <li>• Don't rely solely on Fibonacci levels</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Fibonacci Retracements Quiz",
        isRequired: true,
        type: "quiz" as const,
        minScore: 4,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Test Your Knowledge of Fibonacci Retracements
              </h3>
              <p className="text-blue-700 mb-4">
                Answer these questions to check your understanding of Fibonacci retracements.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What is the most important Fibonacci retracement level?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">23.6%</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">50%</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">61.8%</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. What does a 23.6% retracement typically indicate?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Strong momentum</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Trend reversal</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Market weakness</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. How do you draw Fibonacci retracements in an uptrend?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">From high to low</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">From low to high</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">From left to right</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    4. What is the mathematical significance of 61.8%?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">It's a round number</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">It's the golden ratio</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">It's half of 100%</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    5. When should you use Fibonacci retracements?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Only in trending markets</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Only in sideways markets</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">In trending markets with other tools</span>
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
                      <h4 className="font-medium text-green-800">Support and Resistance</h4>
                      <p className="text-green-700 text-sm">Fibonacci retracements identify potential support and resistance levels for better trading decisions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Golden Ratio Importance</h4>
                      <p className="text-green-700 text-sm">The 61.8% level (golden ratio) is often the most significant and reliable Fibonacci level.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Combination is Key</h4>
                      <p className="text-green-700 text-sm">Use Fibonacci levels in conjunction with other technical analysis tools for stronger signals.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Trending Markets</h4>
                      <p className="text-green-700 text-sm">Fibonacci retracements work best in trending markets where clear swing points exist.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice drawing Fibonacci retracements on historical charts</li>
                  <li>• Learn to identify quality swing high and swing low points</li>
                  <li>• Combine Fibonacci levels with other technical indicators</li>
                  <li>• Study Fibonacci extensions for profit target setting</li>
                  <li>• Remember that Fibonacci is a tool, not a guarantee</li>
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
