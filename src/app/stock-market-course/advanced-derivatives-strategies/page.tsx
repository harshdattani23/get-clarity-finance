"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function AdvancedDerivativesStrategiesPage() {
  const lessonData = {
    title: "Advanced Derivatives Strategies",
    description: "Master option Greeks and multi-leg strategies with robust risk management.",
    lessonSlug: "advanced-derivatives-strategies",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-mr.m4a"
    },
    transcript: {
      en: "Advanced Derivatives Strategies: Master option Greeks and multi-leg strategies with robust risk management. Learn how to use Delta, Gamma, Theta, and Vega to manage complex options positions.",
      hi: "उन्नत डेरिवेटिव्स रणनीतियां: मजबूत जोखिम प्रबंधन के साथ विकल्प ग्रीक्स और मल्टी-लेग रणनीतियों में महारत हासिल करें।",
      bn: "উন্নত ডেরিভেটিভ কৌশল: শক্তিশালী ঝুঁকি ব্যবস্থাপনার সাথে অপশন গ্রীকস এবং মাল্টি-লেগ কৌশল আয়ত্ত করুন।",
      ta: "மேம்பட்ட வழித்தோன்றல் உத்திகள்: வலுவான ஆபத்து மேலாண்மையுடன் விருப்ப வணிக கிரேக்கர்கள் மற்றும் பல-கால் உத்திகளை மாஸ்டர் செய்யுங்கள்.",
      mr: "प्रगत डेरिव्हेटिव्ह स्ट्रॅटेजीज: मजबूत जोखीम व्यवस्थापनासह पर्याय ग्रीक्स आणि मल्टी-लेग स्ट्रॅटेजीज मध्ये प्रभुत्व मिळवा."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Advanced Derivatives Strategies",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
              <p className="text-purple-800 text-lg">
                Advanced derivatives strategies involve complex multi-leg positions and sophisticated risk management techniques. These strategies are designed for experienced traders who understand basic options and want to take their trading to the next level.
              </p>
            </div>
            
            <AudioSummary 
              title="Advanced Derivatives Strategies"
              description="Master option Greeks and multi-leg strategies with robust risk management."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-bn.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-ta.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-mr.m4a"
              hindiTranscript="उन्नत डेरिवेटिव्स रणनीतियां: मजबूत जोखिम प्रबंधन के साथ विकल्प ग्रीक्स और मल्टी-लेग रणनीतियों में महारत हासिल करें।"
              englishTranscript="Advanced Derivatives Strategies: Master option Greeks and multi-leg strategies with robust risk management."
              bengaliTranscript="উন্নত ডেরিভেটিভ কৌশল: শক্তিশালী ঝুঁকি ব্যবস্থাপনার সাথে অপশন গ্রীকস এবং মাল্টি-লেগ কৌশল আয়ত্ত করুন।"
              tamilTranscript="மேம்பட்ட வழித்தோன்றல் உத்திகள்: வலுவான ஆபத்து மேலாண்மையுடன் விருப்ப வணிக கிரேக்கர்கள் மற்றும் பல-கால் உத்திகளை மாஸ்டர் செய்யுங்கள்."
              marathiTranscript="प्रगत डेरिव्हेटिव्ह स्ट्रॅटेजीज: मजबूत जोखीम व्यवस्थापनासह पर्याय ग्रीक्स आणि मल्टी-लेग स्ट्रॅटेजीज मध्ये प्रभुत्व मिळवा."
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Option Greeks and their meaning</li>
                  <li>• Multi-leg option strategies</li>
                  <li>• Advanced risk management</li>
                  <li>• Strategy selection criteria</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Prerequisites</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Basic options knowledge</li>
                  <li>• Understanding of spreads</li>
                  <li>• Risk management concepts</li>
                  <li>• Market volatility awareness</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "option-greeks",
        title: "Option Greeks",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Option Greeks</h3>
              <p className="text-blue-700 text-lg mb-4">Option Greeks are mathematical measures that help traders understand how options prices change in response to various market factors.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Delta (Δ)</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Delta measures the rate of change in an option's price relative to a ₹1 change in the underlying asset's price.</p>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm text-gray-600"><strong>Example:</strong> Delta of 0.5 means for every ₹1 move in the stock, the option moves ₹0.50</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Gamma (Γ)</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Gamma measures the rate of change in Delta relative to a ₹1 change in the underlying asset's price.</p>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm text-gray-600"><strong>Example:</strong> High gamma means delta changes rapidly, indicating high sensitivity</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Theta (Θ)</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Theta measures the rate of decline in an option's value due to the passage of time (time decay).</p>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm text-gray-600"><strong>Example:</strong> Theta of -0.05 means the option loses ₹0.05 in value each day</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Vega (ν)</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Vega measures the rate of change in an option's price relative to a 1% change in implied volatility.</p>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm text-gray-600"><strong>Example:</strong> Vega of 0.10 means the option gains ₹0.10 for each 1% increase in volatility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "multi-leg-strategies",
        title: "Multi-Leg Option Strategies",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Multi-Leg Option Strategies</h3>
              <p className="text-green-700 text-lg mb-4">Multi-leg strategies combine multiple options to create complex positions with specific risk-reward profiles.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Iron Condor</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">A neutral strategy that profits from low volatility and sideways price movement.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Sell OTM put spread</li>
                    <li>• Sell OTM call spread</li>
                    <li>• Maximum profit: net premium received</li>
                    <li>• Maximum risk: width of spreads minus premium</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Butterfly Spread</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">A strategy that profits when the underlying asset stays near a specific price level.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Buy 1 lower strike call</li>
                    <li>• Sell 2 middle strike calls</li>
                    <li>• Buy 1 higher strike call</li>
                    <li>• Limited risk and reward</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-3">💡 Strategy Selection Tips</h4>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Iron Condor: Use in low volatility, sideways markets</li>
                <li>• Butterfly: Use when expecting price to stay near a specific level</li>
                <li>• Consider time decay and volatility expectations</li>
                <li>• Always calculate maximum risk before entering</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "risk-management",
        title: "Advanced Risk Management",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-800 mb-4">Advanced Risk Management</h3>
              <p className="text-red-700 text-lg mb-4">Proper risk management is crucial when trading complex derivatives strategies.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Position Sizing</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Never risk more than 1-2% of your portfolio on any single trade.</p>
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <p className="text-sm text-red-700"><strong>Formula:</strong> Position Size = (Portfolio × Risk %) ÷ Maximum Loss per Share</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Stop Losses</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Set automatic exit points to limit losses on complex strategies.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use percentage-based stops</li>
                    <li>• Consider Greeks when setting levels</li>
                    <li>• Don't move stops in your favor</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-3">🚨 Risk Warning Signs</h4>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li>• High gamma exposure (rapid delta changes)</li>
                <li>• Large negative theta (rapid time decay)</li>
                <li>• High vega (volatility sensitivity)</li>
                <li>• Unbalanced position sizes</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Advanced Derivatives Quiz",
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
                Answer these questions to check your understanding of advanced derivatives strategies.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What does Delta measure in options?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Time decay</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Price sensitivity to underlying asset</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Volatility sensitivity</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. Which strategy profits from low volatility?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Long straddle</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Iron condor</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Long call</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What is the maximum risk in a properly sized position?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">5-10% of portfolio</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">1-2% of portfolio</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Unlimited</span>
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
                      <h4 className="font-medium text-green-800">Understanding Greeks</h4>
                      <p className="text-green-700 text-sm">Master Delta, Gamma, Theta, and Vega to <strong>manage complex options positions</strong> effectively.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Multi-Leg Strategies</h4>
                      <p className="text-green-700 text-sm">Use Iron Condors and Butterflies for <strong>defined risk and specific market conditions</strong>.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Risk Management</h4>
                      <p className="text-green-700 text-sm">Always use <strong>proper position sizing</strong> and <strong>stop losses</strong> for complex strategies.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Practice First</h4>
                      <p className="text-green-700 text-sm">Use <strong>paper trading</strong> to test strategies before using real money.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice calculating Greeks manually</li>
                  <li>• Study real-world examples of multi-leg strategies</li>
                  <li>• Learn about volatility skew and term structure</li>
                  <li>• Develop your own risk management rules</li>
                  <li>• Consider joining options trading communities</li>
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
