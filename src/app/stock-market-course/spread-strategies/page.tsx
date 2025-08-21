"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function SpreadStrategiesPage() {
  const lessonData = {
    title: "Spread Strategies",
    description: "Explore bull and bear spreads, which are options strategies that limit both risk and reward for more controlled trading.",
    lessonSlug: "spread-strategies",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-mr.m4a"
    },
    transcript: {
      en: "Spread Strategies: Explore bull and bear spreads, which are options strategies that limit both risk and reward for more controlled trading. Learn how to implement these strategies to manage risk while maintaining profit potential.",
      hi: "स्प्रेड स्ट्रैटेजीज: बुल और बियर स्प्रेड का अन्वेषण करें, जो ऑप्शन स्ट्रैटेजीज हैं जो अधिक नियंत्रित ट्रेडिंग के लिए जोखिम और पुरस्कार दोनों को सीमित करती हैं।",
      bn: "স্প্রেড কৌশল: বুল এবং বিয়ার স্প্রেড অন্বেষণ করুন, যা অপশন কৌশল যা আরও নিয়ন্ত্রিত ট্রেডিংয়ের জন্য ঝুঁকি এবং পুরস্কার উভয়ই সীমাবদ্ধ করে।",
      ta: "பரவல் உத்திகள்: காளை மற்றும் கரடி பரவல்களை ஆராயுங்கள், இவை விருப்ப வணிக உத்திகள் ஆகும், இவை மேலும் கட்டுப்படுத்தப்பட்ட வணிகத்திற்காக ஆபத்து மற்றும் வெகுமதி இரண்டையும் கட்டுப்படுத்துகின்றன.",
      mr: "स्प्रेड स्ट्रॅटेजीज: बुल आणि बियर स्प्रेड्सचा शोध घ्या, जे ऑप्शन स्ट्रॅटेजीज आहेत ज्या अधिक नियंत्रित ट्रेडिंगसाठी जोखीम आणि बक्षीस दोन्ही मर्यादित करतात."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Spread Strategies",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-blue-800 text-lg">
                Spread strategies are options trading strategies that involve buying and selling options simultaneously to create a position with limited risk and limited reward.
              </p>
            </div>
            
            <AudioSummary 
              title="Spread Strategies"
              description="Explore bull and bear spreads, which are options strategies that limit both risk and reward for more controlled trading."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-bn.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-ta.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-mr.m4a"
              hindiTranscript="स्प्रेड स्ट्रैटेजीज: बुल और बियर स्प्रेड का अन्वेषण करें, जो ऑप्शन स्ट्रैटेजीज हैं जो अधिक नियंत्रित ट्रेडिंग के लिए जोखिम और पुरस्कार दोनों को सीमित करती हैं।"
              englishTranscript="Spread Strategies: Explore bull and bear spreads, which are options strategies that limit both risk and reward for more controlled trading."
              bengaliTranscript="স্প্রেড কৌশল: বুল এবং বিয়ার স্প্রেড অন্বেষণ করুন, যা অপশন কৌশল যা আরও নিয়ন্ত্রিত ট্রেডিংয়ের জন্য ঝুঁকি এবং পুরস্কার উভয়ই সীমাবদ্ধ করে।"
              tamilTranscript="பரவல் உத்திகள்: காளை மற்றும் கரடி பரவல்களை ஆராயுங்கள், இவை விருப்ப வணிக உத்திகள் ஆகும், இவை மேலும் கட்டுப்படுத்தப்பட்ட வணிகத்திற்காக ஆபத்து மற்றும் வெகுமதி இரண்டையும் கட்டுப்படுத்துகின்றன."
              marathiTranscript="स्प्रेड स्ट्रॅटेजीज: बुल आणि बियर स्प्रेड्सचा शोध घ्या, जे ऑप्शन स्ट्रॅटेजीज आहेत ज्या अधिक नियंत्रित ट्रेडिंगसाठी जोखीम आणि बक्षीस दोन्ही मर्यादित करतात."
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Bull spread mechanics</li>
                  <li>• Bear spread implementation</li>
                  <li>• Risk-reward profiles</li>
                  <li>• When to use each strategy</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Benefits</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Limited, defined risk</li>
                  <li>• Lower cost than buying options</li>
                  <li>• Controlled exposure</li>
                  <li>• Clear profit/loss targets</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "bull-spread",
        title: "Bull Spread (Call Spread)",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Bull Spread (Call Spread)</h3>
              <p className="text-green-700 text-lg mb-4">A bull spread is an options strategy that profits when the underlying asset rises in price. It involves buying a call option at a lower strike price and selling a call option at a higher strike price.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">How It Works</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">You buy a call option at a lower strike price and simultaneously sell a call option at a higher strike price.</p>
                  <p className="text-gray-700">This creates a net debit position, meaning you pay money to enter the trade.</p>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-sm text-green-700"><strong>Example:</strong> Buy ₹100 call, sell ₹110 call</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Profit & Loss Profile</h4>
                <div className="space-y-3">
                  <p className="text-gray-700"><strong>Maximum Profit:</strong> Difference between strike prices minus net debit</p>
                  <p className="text-gray-700"><strong>Maximum Loss:</strong> Limited to the net debit paid</p>
                  <p className="text-gray-700"><strong>Break-even:</strong> Lower strike price plus net debit</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-3">💡 When to Use Bull Spreads</h4>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• When you expect moderate price increases</li>
                <li>• To reduce the cost of buying calls</li>
                <li>• When you want defined risk</li>
                <li>• In sideways to slightly bullish markets</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "bear-spread",
        title: "Bear Spread (Put Spread)",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-800 mb-4">Bear Spread (Put Spread)</h3>
              <p className="text-red-700 text-lg mb-4">A bear spread is an options strategy that profits when the underlying asset falls in price. It involves buying a put option at a higher strike price and selling a put option at a lower strike price.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">How It Works</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">You buy a put option at a higher strike price and simultaneously sell a put option at a lower strike price.</p>
                  <p className="text-gray-700">This creates a net debit position, meaning you pay money to enter the trade.</p>
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <p className="text-sm text-red-700"><strong>Example:</strong> Buy ₹110 put, sell ₹100 put</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Profit & Loss Profile</h4>
                <div className="space-y-3">
                  <p className="text-gray-700"><strong>Maximum Profit:</strong> Difference between strike prices minus net debit</p>
                  <p className="text-gray-700"><strong>Maximum Loss:</strong> Limited to the net debit paid</p>
                  <p className="text-gray-700"><strong>Break-even:</strong> Higher strike price minus net debit</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-3">💡 When to Use Bear Spreads</h4>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li>• When you expect moderate price decreases</li>
                <li>• To reduce the cost of buying puts</li>
                <li>• When you want defined risk</li>
                <li>• In sideways to slightly bearish markets</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Spread Strategies Quiz",
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
                Answer these questions to check your understanding of spread strategies.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What is a bull spread?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">A strategy that profits when prices fall</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">A strategy that profits when prices rise</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">A strategy that profits in sideways markets</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. What is the maximum loss in a spread strategy?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Unlimited</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Limited to the net debit paid</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Depends on market movement</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. Which spread is used when expecting price decreases?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Bull spread</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Bear spread</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Butterfly spread</span>
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
                      <h4 className="font-medium text-green-800">Risk Management</h4>
                      <p className="text-green-700 text-sm">Spread strategies provide <strong>defined and limited risk</strong>, making them safer than naked options.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Cost Efficiency</h4>
                      <p className="text-green-700 text-sm">Spreads are <strong>cheaper to implement</strong> than buying options outright.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Directional Trading</h4>
                      <p className="text-green-700 text-sm">Bull spreads for <strong>upward price expectations</strong>, bear spreads for <strong>downward price expectations</strong>.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Profit Potential</h4>
                      <p className="text-green-700 text-sm">Maximum profit is <strong>limited but defined</strong>, providing clear targets.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice calculating profit/loss scenarios</li>
                  <li>• Learn about other spread strategies (butterfly, iron condor)</li>
                  <li>• Understand Greeks and their impact on spreads</li>
                  <li>• Practice with paper trading before real money</li>
                  <li>• Always use proper position sizing and risk management</li>
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
