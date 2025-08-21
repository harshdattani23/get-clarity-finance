"use client";

import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";

export default function AdvancedTechnicalAnalysisPage() {
  const lessonData = {
    title: "Advanced Technical Analysis",
    description: "Deepen your technical analysis skills with Elliott Waves, Fibonacci retracements, and Volume Profile concepts. Master advanced tools that provide deeper insights into market psychology and structure.",
    lessonSlug: "advanced-technical-analysis",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-technical-analysis-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-technical-analysis-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-technical-analysis-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-technical-analysis-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-technical-analysis-mr.m4a"
    },
    transcript: {
      en: "Advanced Technical Analysis: Deepen your technical analysis skills with Elliott Waves, Fibonacci retracements, and Volume Profile concepts. Master advanced tools that provide deeper insights into market psychology and structure.",
      hi: "उन्नत तकनीकी विश्लेषण: Elliott Waves, Fibonacci retracements, और Volume Profile अवधारणाओं के साथ अपने तकनीकी विश्लेषण कौशल को गहरा करें।",
      bn: "উন্নত প্রযুক্তিগত বিশ্লেষণ: Elliott Waves, Fibonacci retracements, এবং Volume Profile ধারণার সাথে আপনার প্রযুক্তিগত বিশ্লেষণ দক্ষতা গভীর করুন।",
      ta: "மேம்பட்ட தொழில்நுட்ப பகுப்பாய்வு: Elliott Waves, Fibonacci retracements, மற்றும் Volume Profile கருத்துக்களுடன் உங்கள் தொழில்நுட்ப பகுப்பாய்வு திறன்களை ஆழப்படுத்துங்கள்.",
      mr: "प्रगत तांत्रिक विश्लेषण: Elliott Waves, Fibonacci retracements, आणि Volume Profile संकल्पनांसह तुमचे तांत्रिक विश्लेषण कौशल्य खोलवा."
    },
    parts: [
      {
        id: "introduction",
        title: "Advanced Technical Analysis",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Deepen your technical analysis skills with Elliott Waves, Fibonacci retracements, and Volume Profile concepts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Advanced Concepts Overview
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This module explores advanced technical analysis concepts that help identify market structure, potential reversal zones, and high-interest price areas.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                These advanced tools go beyond basic indicators and provide deeper insights into market psychology and structure.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  Master these concepts to become an advanced technical analyst!
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📊</span>
                </div>
                <h4 className="font-semibold text-blue-800">Elliott Waves</h4>
                <p className="text-blue-700 text-sm">Market structure and psychology</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <div className="w-8 h-8 bg-green-600 rounded mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⚡</span>
                </div>
                <h4 className="font-semibold text-green-800">Fibonacci</h4>
                <p className="text-green-700 text-sm">Retracement and continuation zones</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
                <div className="w-8 h-8 bg-purple-600 rounded mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">📈</span>
                </div>
                <h4 className="font-semibold text-purple-800">Volume Profile</h4>
                <p className="text-purple-700 text-sm">Price-volume relationships</p>
              </div>
            </div>

            <AudioSummary
              title="Advanced Technical Analysis"
              description="Deepen your technical analysis skills with Elliott Waves, Fibonacci retracements, and Volume Profile concepts."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-technical-analysis-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-technical-analysis-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-technical-analysis-bn.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-technical-analysis-ta.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-technical-analysis-mr.m4a"
              hindiTranscript="उन्नत तकनीकी विश्लेषण: Elliott Waves, Fibonacci retracements, और Volume Profile अवधारणाओं के साथ अपने तकनीकी विश्लेषण कौशल को गहरा करें।"
              englishTranscript="Advanced Technical Analysis: Deepen your technical analysis skills with Elliott Waves, Fibonacci retracements, and Volume Profile concepts."
              bengaliTranscript="উন্নত প্রযুক্তিগত বিশ্লেষণ: Elliott Waves, Fibonacci retracements, এবং Volume Profile ধারণার সাথে আপনার প্রযুক্তিগত বিশ্লেষণ দক্ষতা গভীর করুন।"
              tamilTranscript="மேம்பட்ட தொழில்நுட்ப பகுப்பாய்வு: Elliott Waves, Fibonacci retracements, மற்றும் Volume Profile கருத்துக்களுடன் உங்கள் தொழில்நுட்ப பகுப்பாய்வு திறன்களை ஆழப்படுத்துங்கள்."
              marathiTranscript="प्रगत तांत्रिक विश्लेषण: Elliott Waves, Fibonacci retracements, आणि Volume Profile संकल्पनांसह तुमचे तांत्रिक विश्लेषण कौशल्य खोलवा."
            />
          </div>
        )
      },
      {
        id: "elliott-waves",
        title: "Elliott Wave Theory",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">
                🌊 Elliott Wave Theory: Market Psychology
              </h3>
              <p className="text-blue-700 text-lg">
                Elliott Wave Theory suggests that market movements follow a predictable pattern of five waves in the direction of the trend, followed by three corrective waves.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Impulse Waves (1-5)</h4>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <h5 className="font-medium text-blue-800">Wave 1:</h5>
                    <p className="text-blue-700 text-sm">Initial move, often unnoticed by most investors</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <h5 className="font-medium text-blue-800">Wave 2:</h5>
                    <p className="text-blue-700 text-sm">Retracement of Wave 1, but doesn't break the start</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <h5 className="font-medium text-blue-800">Wave 3:</h5>
                    <p className="text-blue-700 text-sm">Strongest and longest wave, often extends beyond Wave 1</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <h5 className="font-medium text-blue-800">Wave 4:</h5>
                    <p className="text-blue-700 text-sm">Correction of Wave 3, typically shallow</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <h5 className="font-medium text-blue-800">Wave 5:</h5>
                    <p className="text-blue-700 text-sm">Final move, often shows divergence with indicators</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Corrective Waves (A-B-C)</h4>
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800">Wave A:</h5>
                    <p className="text-red-700 text-sm">First correction, often sharp and swift</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800">Wave B:</h5>
                    <p className="text-red-700 text-sm">Retracement of Wave A, typically weak</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800">Wave C:</h5>
                    <p className="text-red-700 text-sm">Final correction, often equals Wave A</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-sm text-yellow-700">
                    <strong>Key Rule:</strong> Wave 3 can never be the shortest of the three impulse waves.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-3">💡 Elliott Wave Trading Tips</h4>
              <ul className="space-y-2 text-green-700 text-sm">
                <li>• Use multiple timeframes for wave identification</li>
                <li>• Look for Fibonacci relationships between waves</li>
                <li>• Combine with other technical indicators for confirmation</li>
                <li>• Remember that Elliott Waves are guidelines, not absolute rules</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "fibonacci-retracements",
        title: "Fibonacci Retracements",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                📐 Fibonacci Retracements: Golden Ratios
              </h3>
              <p className="text-green-700 text-lg">
                Fibonacci retracements use key ratios (23.6%, 38.2%, 50%, 61.8%, 78.6%) to identify potential support and resistance levels during price corrections.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Key Fibonacci Levels</h4>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800">23.6% Retracement:</h5>
                    <p className="text-green-700 text-sm">Shallow correction, strong trend continuation likely</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800">38.2% Retracement:</h5>
                    <p className="text-green-700 text-sm">Moderate correction, common in strong trends</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800">50% Retracement:</h5>
                    <p className="text-green-700 text-sm">Psychological level, often acts as support/resistance</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800">61.8% Retracement:</h5>
                    <p className="text-green-700 text-sm">Deep correction, trend reversal possible</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800">78.6% Retracement:</h5>
                    <p className="text-green-700 text-sm">Very deep correction, trend likely to reverse</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">How to Use Fibonacci</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Identify the swing high and swing low</li>
                  <li>• Draw retracement levels from high to low (uptrend)</li>
                  <li>• Draw retracement levels from low to high (downtrend)</li>
                  <li>• Look for confluence with other support/resistance levels</li>
                  <li>• Use for entry and exit points</li>
                </ul>
                
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Pro Tip:</strong> Fibonacci levels work best when combined with other technical analysis tools.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-3">🚀 Fibonacci Trading Strategies</h4>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li>• Buy at 38.2% or 50% retracements in strong uptrends</li>
                <li>• Sell at 61.8% retracements for trend reversal trades</li>
                <li>• Use 23.6% for quick scalping opportunities</li>
                <li>• Combine with RSI divergence for stronger signals</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "volume-profile",
        title: "Volume Profile Analysis",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                📊 Volume Profile: Price-Volume Relationships
              </h3>
              <p className="text-purple-700 text-lg">
                Volume Profile shows the trading volume at different price levels, helping identify areas of high interest and potential support/resistance zones.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Key Volume Profile Concepts</h4>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <h5 className="font-medium text-purple-800">Point of Control (POC):</h5>
                    <p className="text-purple-700 text-sm">Price level with the highest trading volume</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <h5 className="font-medium text-purple-800">Value Area:</h5>
                    <p className="text-purple-700 text-sm">Price range where 70% of volume occurs</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <h5 className="font-medium text-purple-800">High Volume Nodes:</h5>
                    <p className="text-purple-700 text-sm">Price levels with above-average volume</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <h5 className="font-medium text-purple-800">Low Volume Nodes:</h5>
                    <p className="text-purple-700 text-sm">Price levels with below-average volume</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Trading Applications</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Use POC as dynamic support/resistance</li>
                  <li>• Trade breakouts from value areas</li>
                  <li>• Identify institutional interest levels</li>
                  <li>• Find optimal entry and exit points</li>
                  <li>• Gauge market sentiment at price levels</li>
                </ul>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-sm text-yellow-700">
                    <strong>Remember:</strong> Volume Profile works best on higher timeframes for swing trading.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-3">💡 Volume Profile Trading Tips</h4>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• Look for price rejection at high volume nodes</li>
                <li>• Use low volume nodes for stop loss placement</li>
                <li>• Combine with candlestick patterns for confirmation</li>
                <li>• Update volume profile regularly as market evolves</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Advanced Technical Analysis Quiz",
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
                Answer these questions to check your understanding of advanced technical analysis concepts.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. How many waves are in an Elliott Wave impulse pattern?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">3 waves</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">5 waves</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">7 waves</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. What is the most common Fibonacci retracement level?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">23.6%</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">38.2%</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">61.8%</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What does POC stand for in Volume Profile?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Point of Control</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Price of Change</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Pattern of Continuation</span>
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
                      <h4 className="font-medium text-green-800">Elliott Wave Theory</h4>
                      <p className="text-green-700 text-sm">Understand <strong>market psychology</strong> through wave patterns and structure.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Fibonacci Retracements</h4>
                      <p className="text-green-700 text-sm">Use <strong>golden ratios</strong> to identify potential reversal zones.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Volume Profile</h4>
                      <p className="text-green-700 text-sm">Analyze <strong>price-volume relationships</strong> for institutional interest.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Combination Strategy</h4>
                      <p className="text-green-700 text-sm">Use these tools <strong>together</strong> for stronger trading signals.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice identifying Elliott Wave patterns on charts</li>
                  <li>• Learn to draw Fibonacci retracements manually</li>
                  <li>• Study Volume Profile on different timeframes</li>
                  <li>• Combine multiple advanced analysis tools</li>
                  <li>• Develop your own advanced analysis system</li>
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
