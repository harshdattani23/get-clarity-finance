"use client";

import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import AudioSummary from "@/components/stock-market-course/AudioSummary";

export default function BullVsBearMarkets() {
  const lessonData = {
    title: "Bull vs Bear Markets",
    description: "Understand the two major market trends and the investor sentiment that defines them. Learn how to identify market cycles and adjust your investment strategies accordingly.",
    lessonSlug: "bull-vs-bear-markets",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/bull-vs-bear-markets-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/bull-vs-bear-markets-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/bull-vs-bear-markets-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/bull-vs-bear-markets-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/bull-vs-bear-markets-mr.m4a"
    },
    transcript: {
      en: "Bull vs Bear Markets: Understand the two major market trends and the investor sentiment that defines them. Learn how to identify market cycles and adjust your investment strategies accordingly.",
      hi: "बुल vs बियर मार्केट: दो प्रमुख बाजार प्रवृत्तियों और उन्हें परिभाषित करने वाले निवेशक भावनाओं को समझें।",
      bn: "বুল vs বিয়ার মার্কেট: দুটি প্রধান বাজার প্রবণতা এবং সেগুলিকে সংজ্ঞায়িত করে এমন বিনিয়োগকারীদের অনুভূতি বুঝুন।",
      ta: "காளை vs கரடி சந்தைகள்: இரண்டு முக்கிய சந்தை போக்குகள் மற்றும் அவற்றை வரையறுக்கும் முதலீட்டாளர் உணர்வுகளைப் புரிந்துகொள்ளுங்கள்.",
      mr: "बुल vs बियर मार्केट: दोन मुख्य बाजार प्रवृत्ती आणि त्यांना परिभाषित करणाऱ्या गुंतवणूकदारांच्या भावना समजून घ्या."
    },
    parts: [
      {
        id: "introduction",
        title: "Understanding Bull vs Bear Markets",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You&apos;ll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you&apos;ll understand the two major market trends and the investor sentiment that defines them.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Market Trends and Sentiment
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You&apos;ll often hear commentators talk about &apos;bull&apos; and &apos;bear&apos; markets. These terms describe the overall direction and mood of the market.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Understanding these market cycles is crucial for making informed investment decisions and managing your portfolio effectively.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Concepts</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Bull market characteristics</li>
                  <li>• Bear market characteristics</li>
                  <li>• Market cycle patterns</li>
                  <li>• Investment strategies for each</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Why It Matters</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Understand market direction</li>
                  <li>• Adjust investment strategies</li>
                  <li>• Manage risk effectively</li>
                  <li>• Identify opportunities</li>
                </ul>
              </div>
            </div>

            <AudioSummary
              title="Bull vs Bear Markets"
              description="Understand the two major market trends and the investor sentiment that defines them."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/bull-vs-bear-markets-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/bull-vs-bear-markets-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/bull-vs-bear-markets-bn.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/bull-vs-bear-markets-ta.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/bull-vs-bear-markets-mr.m4a"
              hindiTranscript="बुल vs बियर मार्केट: दो प्रमुख बाजार प्रवृत्तियों और उन्हें परिभाषित करने वाले निवेशक भावनाओं को समझें।"
              englishTranscript="Bull vs Bear Markets: Understand the two major market trends and the investor sentiment that defines them."
              bengaliTranscript="বুল vs বিয়ার মার্কেট: দুটি প্রধান বাজার প্রবণতা এবং সেগুলিকে সংজ্ঞায়িত করে এমন বিনিয়োগকারীদের অনুভূতি বুঝুন।"
              tamilTranscript="காளை vs கரடி சந்தைகள்: இரண்டு முக்கிய சந்தை போக்குகள் மற்றும் அவற்றை வரையறுக்கும் முதலீட்டாளர் உணர்வுகளைப் புரிந்துகொள்ளுங்கள்."
              marathiTranscript="बुल vs बियर मार्केट: दोन मुख्य बाजार प्रवृत्ती आणि त्यांना परिभाषित करणाऱ्या गुंतवणूकदारांच्या भावना समजून घ्या."
            />
          </div>
        )
      },
      {
        id: "bull-market",
        title: "Bull Market Characteristics",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                🚀 Bull Market: Rising Optimism
              </h3>
              <p className="text-green-700 text-lg">
                A bull market is characterized by rising stock prices, optimism, and strong investor confidence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Key Characteristics</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Rising stock prices (20%+ increase)</li>
                  <li>• High trading volume</li>
                  <li>• Strong economic indicators</li>
                  <li>• Positive investor sentiment</li>
                  <li>• Low unemployment rates</li>
                  <li>• Growing corporate earnings</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Investment Strategies</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Buy and hold quality stocks</li>
                  <li>• Invest in growth sectors</li>
                  <li>• Consider momentum strategies</li>
                  <li>• Diversify across sectors</li>
                  <li>• Regular portfolio rebalancing</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-3">💡 Bull Market Psychology</h4>
              <p className="text-blue-700 text-sm">
                During bull markets, investors often become overly optimistic and may ignore warning signs. 
                Remember that all bull markets eventually end, so maintain discipline and don&apos;t chase overvalued stocks.
              </p>
            </div>
          </div>
        )
      },
      {
        id: "bear-market",
        title: "Bear Market Characteristics",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-red-800 mb-4">
                🐻 Bear Market: Declining Pessimism
              </h3>
              <p className="text-red-700 text-lg">
                A bear market is characterized by falling stock prices, pessimism, and weak investor confidence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Key Characteristics</h4>
                <ul className="text-red-700 space-y-2">
                  <li>• Falling stock prices (20%+ decrease)</li>
                  <li>• Low trading volume</li>
                  <li>• Weak economic indicators</li>
                  <li>• Negative investor sentiment</li>
                  <li>• Rising unemployment rates</li>
                  <li>• Declining corporate earnings</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Investment Strategies</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Focus on defensive stocks</li>
                  <li>• Consider dividend-paying companies</li>
                  <li>• Build cash reserves</li>
                  <li>• Look for value opportunities</li>
                  <li>• Dollar-cost averaging</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-3">💡 Bear Market Psychology</h4>
              <p className="text-yellow-700 text-sm">
                During bear markets, fear can drive investors to make emotional decisions. 
                Remember that bear markets create opportunities to buy quality stocks at discounted prices. 
                Stay disciplined and stick to your long-term investment plan.
              </p>
            </div>
          </div>
        )
      },
      {
        id: "market-cycles",
        title: "Understanding Market Cycles",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                🔄 Market Cycles: The Natural Rhythm
              </h3>
              <p className="text-purple-700 text-lg">
                Markets move in cycles, transitioning between bull and bear phases. Understanding these cycles helps you make better investment decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Cycle Phases</h4>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800">1. Accumulation Phase</h5>
                    <p className="text-green-700 text-sm">Smart money starts buying when others are fearful</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <h5 className="font-medium text-blue-800">2. Markup Phase</h5>
                    <p className="text-blue-700 text-sm">Prices start rising, attracting more investors</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <h5 className="font-medium text-yellow-800">3. Distribution Phase</h5>
                    <p className="text-yellow-700 text-sm">Smart money starts selling to retail investors</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800">4. Markdown Phase</h5>
                    <p className="text-red-700 text-sm">Prices fall as panic selling begins</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Cycle Duration</h4>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Short-term cycles:</strong> 3-6 months</li>
                  <li><strong>Medium-term cycles:</strong> 1-3 years</li>
                  <li><strong>Long-term cycles:</strong> 5-10 years</li>
                  <li><strong>Secular trends:</strong> 10+ years</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-50 rounded border">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> These are general guidelines. Actual cycle lengths can vary significantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Bull vs Bear Markets Quiz",
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
                Answer these questions to check your understanding of bull and bear markets.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What defines a bull market?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Falling stock prices</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Rising stock prices (20%+ increase)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Sideways price movement</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. Which strategy is best during a bear market?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Buy high, sell higher</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Focus on defensive stocks and value opportunities</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Invest heavily in growth stocks</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What is the first phase of a market cycle?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Markup phase</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Accumulation phase</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Distribution phase</span>
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
                      <h4 className="font-medium text-green-800">Market Identification</h4>
                      <p className="text-green-700 text-sm">Learn to identify <strong>bull markets</strong> (rising prices, optimism) and <strong>bear markets</strong> (falling prices, pessimism).</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Strategy Adaptation</h4>
                      <p className="text-green-700 text-sm">Adjust your <strong>investment strategies</strong> based on market conditions and cycle phases.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Cycle Understanding</h4>
                      <p className="text-green-700 text-sm">Recognize that markets move in <strong>natural cycles</strong> and plan accordingly.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Emotional Control</h4>
                      <p className="text-green-700 text-sm">Maintain <strong>discipline</strong> and avoid emotional decisions during market extremes.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Study historical market cycles and their characteristics</li>
                  <li>• Learn about technical indicators that signal market changes</li>
                  <li>• Develop your own market cycle identification system</li>
                  <li>• Practice adapting strategies to different market conditions</li>
                  <li>• Consider how economic indicators relate to market cycles</li>
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
