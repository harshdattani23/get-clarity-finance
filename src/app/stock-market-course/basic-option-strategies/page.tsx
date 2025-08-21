"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function BasicOptionStrategiesPage() {
  const lessonData = {
    title: "Basic Option Strategies",
    description: "Learn fundamental options strategies including covered calls and protective puts to enhance your trading toolkit.",
    lessonSlug: "basic-option-strategies",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-mr.m4a"
    },
    transcript: {
      en: "Basic Option Strategies: Learn fundamental options strategies including covered calls and protective puts to enhance your trading toolkit. Understand when and how to use these strategies for income generation and risk management.",
      hi: "बेसिक ऑप्शन स्ट्रैटेजीज: अपने ट्रेडिंग टूलकिट को बढ़ाने के लिए covered calls और protective puts सहित मौलिक विकल्प रणनीतियों को सीखें।",
      bn: "মৌলিক অপশন কৌশল: আপনার ট্রেডিং টুলকিট বাড়ানোর জন্য covered calls এবং protective puts সহ মৌলিক অপশন কৌশল শিখুন।",
      ta: "அடிப்படை விருப்ப வணிக உத்திகள்: உங்கள் வணிக கருவிகளை மேம்படுத்த covered calls மற்றும் protective puts உட்பட அடிப்படை விருப்ப வணிக உத்திகளைக் கற்றுக்கொள்ளுங்கள்.",
      mr: "मूलभूत पर्याय धोरणे: तुमचे ट्रेडिंग टूलकिट वाढवण्यासाठी covered calls आणि protective puts यासह मूलभूत पर्याय धोरणे शिका."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Basic Option Strategies",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-blue-800 text-lg">
                Basic option strategies are the building blocks of options trading. These strategies provide a foundation for understanding more complex options positions and help you manage risk while generating income.
              </p>
            </div>
            
            <AudioSummary 
              title="Basic Option Strategies"
              description="Learn fundamental options strategies including covered calls and protective puts to enhance your trading toolkit."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-bn.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-ta.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-mr.m4a"
              hindiTranscript="बेसिक ऑप्शन स्ट्रैटेजीज: अपने ट्रेडिंग टूलकिट को बढ़ाने के लिए covered calls और protective puts सहित मौलिक विकल्प रणनीतियों को सीखें।"
              englishTranscript="Basic Option Strategies: Learn fundamental options strategies including covered calls and protective puts to enhance your trading toolkit."
              bengaliTranscript="মৌলিক অপশন কৌশল: আপনার ট্রেডিং টুলকিট বাড়ানোর জন্য covered calls এবং protective puts সহ মৌলিক অপশন কৌশল শিখুন।"
              tamilTranscript="அடிப்படை விருப்ப வணிக உத்திகள்: உங்கள் வணிக கருவிகளை மேம்படுத்த covered calls மற்றும் protective puts உட்பட அடிப்படை விருப்ப வணிக உத்திகளைக் கற்றுக்கொள்ளுங்கள்."
              marathiTranscript="मूलभूत पर्याय धोरणे: तुमचे ट्रेडिंग टूलकिट वाढवण्यासाठी covered calls आणि protective puts यासह मूलभूत पर्याय धोरणे शिका."
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Covered call strategy</li>
                  <li>• Protective put strategy</li>
                  <li>• Risk and reward profiles</li>
                  <li>• When to use each strategy</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Why These Matter</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Foundation for complex strategies</li>
                  <li>• Risk management tools</li>
                  <li>• Income generation</li>
                  <li>• Portfolio protection</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "covered-call",
        title: "Covered Call Strategy",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Covered Call Strategy</h3>
              <p className="text-green-700 text-lg mb-4">A covered call involves selling call options against shares you already own. This strategy generates income while potentially limiting upside gains.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">How It Works</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">You own shares of a stock and sell call options against those shares.</p>
                  <p className="text-gray-700">The premium received provides immediate income, but you may have to sell your shares if the stock rises above the strike price.</p>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-sm text-green-700"><strong>Example:</strong> Own 100 shares at ₹100, sell ₹110 call for ₹5 premium</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Benefits & Risks</h4>
                <div className="space-y-3">
                  <p className="text-gray-700"><strong>Benefits:</strong></p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Immediate income from premium</li>
                    <li>• Reduced cost basis</li>
                    <li>• Limited downside protection</li>
                  </ul>
                  <p className="text-gray-700"><strong>Risks:</strong></p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Limited upside potential</li>
                    <li>• May lose shares if assigned</li>
                    <li>• Still exposed to stock price declines</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-3">💡 When to Use Covered Calls</h4>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• When you expect moderate stock performance</li>
                <li>• To generate income from existing positions</li>
                <li>• In sideways or slightly bullish markets</li>
                <li>• When you're willing to sell at the strike price</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "protective-put",
        title: "Protective Put Strategy",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-800 mb-4">Protective Put Strategy</h3>
              <p className="text-red-700 text-lg mb-4">A protective put involves buying put options to protect against potential losses in your stock position. It's like buying insurance for your portfolio.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">How It Works</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">You own shares of a stock and buy put options to protect against downside risk.</p>
                  <p className="text-gray-700">If the stock price falls, the put option increases in value, offsetting some or all of the stock losses.</p>
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <p className="text-sm text-red-700"><strong>Example:</strong> Own 100 shares at ₹100, buy ₹90 put for ₹3 premium</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Benefits & Costs</h4>
                <div className="space-y-3">
                  <p className="text-gray-700"><strong>Benefits:</strong></p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Downside protection</li>
                    <li>• Maintains upside potential</li>
                    <li>• Defined maximum loss</li>
                  </ul>
                  <p className="text-gray-700"><strong>Costs:</strong></p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Premium paid for protection</li>
                    <li>• Reduces overall returns</li>
                    <li>• Options expire worthless if not needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-3">💡 When to Use Protective Puts</h4>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li>• When you want to protect profits</li>
                <li>• Before earnings announcements</li>
                <li>• During market uncertainty</li>
                <li>• For high-conviction positions</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Basic Options Quiz",
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
                Answer these questions to check your understanding of basic option strategies.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What is a covered call?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Buying calls without owning stock</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Selling calls against owned shares</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Buying puts for protection</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. What is the main benefit of a protective put?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Generating income</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Downside protection</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Unlimited profit potential</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What is the main risk of a covered call?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Unlimited losses</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Limited upside potential</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">High volatility exposure</span>
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
                      <h4 className="font-medium text-green-800">Covered Calls</h4>
                      <p className="text-green-700 text-sm">Generate <strong>immediate income</strong> while potentially limiting upside gains.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Protective Puts</h4>
                      <p className="text-green-700 text-sm">Provide <strong>downside protection</strong> like insurance for your portfolio.</p>
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
                      <p className="text-green-700 text-sm">Both strategies help <strong>manage risk</strong> while maintaining profit potential.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Foundation</h4>
                      <p className="text-green-700 text-sm">These strategies form the <strong>building blocks</strong> for more complex options positions.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice calculating profit/loss scenarios</li>
                  <li>• Learn about option Greeks (Delta, Gamma, Theta, Vega)</li>
                  <li>• Study more advanced strategies (spreads, straddles)</li>
                  <li>• Practice with paper trading before real money</li>
                  <li>• Always understand the risks before entering positions</li>
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
