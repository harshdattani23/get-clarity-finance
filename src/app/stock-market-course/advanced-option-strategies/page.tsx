"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function AdvancedOptionStrategiesPage() {
  const lessonData = {
    title: "Advanced Option Strategies",
    description: "Master complex options strategies including Iron Condors and Butterflies for sophisticated risk management and income generation.",
    lessonSlug: "advanced-option-strategies",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-mr.m4a"
    },
    transcript: {
      en: "Advanced Option Strategies: Master complex options strategies including Iron Condors and Butterflies for sophisticated risk management and income generation. Learn how to implement multi-leg strategies for defined risk and reward profiles.",
      hi: "उन्नत विकल्प रणनीतियां: जटिल विकल्प रणनीतियों में महारत हासिल करें जिनमें Iron Condors और Butterflies शामिल हैं, जो परिष्कृत जोखिम प्रबंधन और आय उत्पादन के लिए हैं।",
      bn: "উন্নত অপশন কৌশল: জটিল অপশন কৌশলে দক্ষতা অর্জন করুন যার মধ্যে Iron Condors এবং Butterflies অন্তর্ভুক্ত, যা পরিশীলিত ঝুঁকি ব্যবস্থাপনা এবং আয় উৎপাদনের জন্য।",
      ta: "மேம்பட்ட விருப்ப வணிக உத்திகள்: Iron Condors மற்றும் Butterflies உட்பட சிக்கலான விருப்ப வணிக உத்திகளில் மாஸ்டர் செய்யுங்கள், இது அதிநவீன ஆபத்து மேலாண்மை மற்றும் வருமான உருவாக்கத்திற்காக.",
      mr: "प्रगत पर्याय धोरणे: Iron Condors आणि Butterflies यासह जटिल पर्याय धोरणांमध्ये प्रभुत्व मिळवा जे परिष्कृत जोखीम व्यवस्थापन आणि उत्पन्न निर्मितीसाठी आहेत."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Advanced Option Strategies",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-blue-800 text-lg">
                Advanced option strategies involve complex multi-leg positions designed for sophisticated risk management and income generation. These strategies are for experienced traders who understand basic options and want to take their trading to the next level.
              </p>
            </div>
            
            <AudioSummary 
              title="Advanced Option Strategies"
              description="Master complex options strategies including Iron Condors and Butterflies for sophisticated risk management and income generation."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-bn.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-ta.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-mr.m4a"
              hindiTranscript="उन्नत विकल्प रणनीतियां: जटिल विकल्प रणनीतियों में महारत हासिल करें जिनमें Iron Condors और Butterflies शामिल हैं, जो परिष्कृत जोखिम प्रबंधन और आय उत्पादन के लिए हैं।"
              englishTranscript="Advanced Option Strategies: Master complex options strategies including Iron Condors and Butterflies for sophisticated risk management and income generation."
              bengaliTranscript="উন্নত অপশন কৌশল: জটিল অপশন কৌশলে দক্ষতা অর্জন করুন যার মধ্যে Iron Condors এবং Butterflies অন্তর্ভুক্ত, যা পরিশীলিত ঝুঁকি ব্যবস্থাপনা এবং আয় উৎপাদনের জন্য।"
              tamilTranscript="மேம்பட்ட விருப்ப வணிக உத்திகள்: Iron Condors மற்றும் Butterflies உட்பட சிக்கலான விருப்ப வணிக உத்திகளில் மாஸ்டர் செய்யுங்கள், இது அதிநவீன ஆபத்து மேலாண்மை மற்றும் வருமான உருவாக்கத்திற்காக."
              marathiTranscript="प्रगत पर्याय धोरणे: Iron Condors आणि Butterflies यासह जटिल पर्याय धोरणांमध्ये प्रभुत्व मिळवा जे परिष्कृत जोखीम व्यवस्थापन आणि उत्पन्न निर्मितीसाठी आहेत."
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Iron Condor strategy mechanics</li>
                  <li>• Butterfly spread implementation</li>
                  <li>• Risk management for complex strategies</li>
                  <li>• When to use each strategy</li>
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
        id: "iron-condor",
        title: "Iron Condor Strategy",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Iron Condor Strategy</h3>
              <p className="text-purple-700 text-lg mb-4">An Iron Condor is a neutral options strategy that profits from low volatility and sideways price movement. It involves selling both put and call spreads simultaneously.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">How It Works</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">The Iron Condor consists of four options: sell OTM put spread and sell OTM call spread.</p>
                  <p className="text-gray-700">You receive premium for both spreads, creating a net credit position.</p>
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <p className="text-sm text-purple-700"><strong>Structure:</strong> Sell ₹90 put, buy ₹85 put, sell ₹110 call, buy ₹115 call</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Profit & Loss Profile</h4>
                <div className="space-y-3">
                  <p className="text-gray-700"><strong>Max Profit:</strong> Net premium received</p>
                  <p className="text-gray-700"><strong>Max Loss:</strong> Width of spreads minus premium received</p>
                  <p className="text-gray-700"><strong>Break-even:</strong> Upper and lower strike prices of the spreads</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-3">💡 When to Use Iron Condors</h4>
              <ul className="space-y-2 text-green-700 text-sm">
                <li>• Low volatility markets</li>
                <li>• Sideways price movement expected</li>
                <li>• Want to generate income</li>
                <li>• Accept defined risk for limited reward</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "butterfly-spread",
        title: "Butterfly Spread Strategy",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-yellow-800 mb-4">Butterfly Spread Strategy</h3>
              <p className="text-yellow-700 text-lg mb-4">A Butterfly Spread is a limited-risk, limited-reward strategy that profits when the underlying asset stays near a specific price level.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">How It Works</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Buy 1 lower strike call, sell 2 middle strike calls, buy 1 higher strike call.</p>
                  <p className="text-gray-700">All options have the same expiration date.</p>
                  <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <p className="text-sm text-yellow-700"><strong>Example:</strong> Buy ₹95 call, sell 2 × ₹100 calls, buy ₹105 call</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Profit & Loss Profile</h4>
                <div className="space-y-3">
                  <p className="text-gray-700"><strong>Max Profit:</strong> At the middle strike price</p>
                  <p className="text-gray-700"><strong>Max Loss:</strong> Limited to net debit paid</p>
                  <p className="text-gray-700"><strong>Break-even:</strong> Lower and upper strike prices</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-3">💡 When to Use Butterfly Spreads</h4>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• Expect price to stay near a specific level</li>
                <li>• Low volatility environment</li>
                <li>• Want defined risk and reward</li>
                <li>• Neutral market outlook</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "risk-management",
        title: "Risk Management for Complex Strategies",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-800 mb-4">Risk Management for Complex Strategies</h3>
              <p className="text-red-700 text-lg mb-4">Proper risk management is crucial when trading complex multi-leg options strategies.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Position Sizing</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Never risk more than 1-2% of your portfolio on any single complex strategy.</p>
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <p className="text-sm text-red-700"><strong>Formula:</strong> Position Size = (Portfolio × Risk %) ÷ Maximum Loss per Strategy</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Exit Strategies</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">Set clear exit points before entering complex positions:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Profit targets</li>
                    <li>• Stop losses</li>
                    <li>• Time-based exits</li>
                    <li>• Volatility-based exits</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-3">🚨 Risk Warning Signs</h4>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li>• High gamma exposure (rapid delta changes)</li>
                <li>• Large negative theta (rapid time decay)</li>
                <li>• Unbalanced position sizes</li>
                <li>• Insufficient margin for adjustments</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Advanced Options Quiz",
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
                Answer these questions to check your understanding of advanced option strategies.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What market condition is best for Iron Condors?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">High volatility</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Low volatility</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Trending markets</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. How many options are in a Butterfly Spread?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">2 options</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">4 options</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">6 options</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What is the maximum risk in complex strategies?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Unlimited</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Always defined and limited</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Depends on market movement</span>
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
                      <h4 className="font-medium text-green-800">Iron Condors</h4>
                      <p className="text-green-700 text-sm">Best for <strong>low volatility, sideways markets</strong> with defined risk and reward.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Butterfly Spreads</h4>
                      <p className="text-green-700 text-sm">Ideal when expecting price to <strong>stay near a specific level</strong>.</p>
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
                      <p className="text-green-700 text-sm">Always use <strong>proper position sizing</strong> and <strong>clear exit strategies</strong>.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Practice First</h4>
                      <p className="text-green-700 text-sm">Use <strong>paper trading</strong> to master complex strategies before real money.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice calculating profit/loss scenarios</li>
                  <li>• Study Greeks and their impact on complex strategies</li>
                  <li>• Learn about adjustments and rolling strategies</li>
                  <li>• Develop your own risk management rules</li>
                  <li>• Consider joining advanced options trading communities</li>
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
