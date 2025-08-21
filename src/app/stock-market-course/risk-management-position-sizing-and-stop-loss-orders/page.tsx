"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function RiskManagementPage() {
  const lessonData = {
    title: "Risk Management: Position Sizing and Stop-Loss Orders",
    description: "Learn how to protect your capital and manage risk through proper position sizing and stop-loss strategies.",
    lessonSlug: "risk-management-position-sizing-and-stop-loss-orders",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/risk-management-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/risk-management-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/risk-management-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/risk-management-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/risk-management-mr.m4a"
    },
    transcript: {
      en: "Risk Management: Position Sizing and Stop-Loss Orders. Learn how to protect your capital and manage risk through proper position sizing and stop-loss strategies. Master the art of controlling losses while letting winners run.",
      hi: "जोखिम प्रबंधन: पोजीशन साइजिंग और स्टॉप-लॉस ऑर्डर। उचित पोजीशन साइजिंग और स्टॉप-लॉस रणनीतियों के माध्यम से अपनी पूंजी की सुरक्षा करना सीखें।",
      bn: "ঝুঁকি ব্যবস্থাপনা: পজিশন সাইজিং এবং স্টপ-লস অর্ডার। সঠিক পজিশন সাইজিং এবং স্টপ-লস কৌশলের মাধ্যমে আপনার পুঁজি রক্ষা করতে এবং ঝুঁকি পরিচালনা করতে শিখুন।",
      ta: "ஆபத்து மேலாண்மை: நிலை அளவு மற்றும் நிறுத்த-இழப்பு ஆணைகள். சரியான நிலை அளவு மற்றும் நிறுத்த-இழப்பு உத்திகள் மூலம் உங்கள் மூலதனத்தைப் பாதுகாக்கவும் ஆபத்தை நிர்வகிக்கவும் கற்றுக்கொள்ளுங்கள்।",
      mr: "जोखीम व्यवस्थापन: पोझिशन साइझिंग आणि स्टॉप-लॉस ऑर्डर। योग्य पोझिशन साइझिंग आणि स्टॉप-लॉस धोरणांद्वारे आपल्या भांडवलाचे संरक्षण करणे आणि जोखीम व्यवस्थापन करणे शिका।"
    },
    parts: [
      {
        id: 'introduction',
        title: 'Introduction to Risk Management',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Learn how to protect your capital and manage risk through proper position sizing and stop-loss strategies.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why Risk Management Matters
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Risk management is the most important skill in investing and trading. It's not about making huge profits on every trade, but about protecting your capital so you can stay in the game long enough to be profitable.
              </p>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
                <p className="text-lg font-semibold text-red-800">
                  "Rule #1: Never lose money. Rule #2: Never forget rule #1." - Warren Buffett
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Concepts</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Position sizing fundamentals</li>
                  <li>• Stop-loss order types</li>
                  <li>• Risk-reward ratios</li>
                  <li>• Capital preservation strategies</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Why It Matters</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Protects your capital</li>
                  <li>• Reduces emotional stress</li>
                  <li>• Enables long-term success</li>
                  <li>• Provides peace of mind</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'position-sizing',
        title: 'Position Sizing Strategies',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is Position Sizing?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Position sizing determines how much money you allocate to each investment. It's about balancing potential returns with acceptable risk levels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">1% Rule</h4>
                <p className="text-green-700 mb-3">
                  Never risk more than 1% of your total capital on a single trade. This ensures you can survive many losses while waiting for winners.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-green-800 font-medium">Example:</p>
                  <p className="text-green-700 text-sm">With ₹1,00,000 capital, never risk more than ₹1,000 per trade.</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">2% Rule</h4>
                <p className="text-blue-700 mb-3">
                  A slightly more aggressive approach, risking up to 2% per trade. Only use this if you have a proven strategy with high win rates.
                </p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-blue-800 font-medium">Example:</p>
                  <p className="text-blue-700 text-sm">With ₹1,00,000 capital, risk up to ₹2,000 per trade.</p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">Fixed Dollar Amount</h4>
                <p className="text-purple-700 mb-3">
                  Risk the same absolute amount on every trade, regardless of portfolio size. Simple but less adaptive.
                </p>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-purple-800 font-medium">Example:</p>
                  <p className="text-purple-700 text-sm">Always risk exactly ₹1,000 per trade, regardless of total capital.</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'stop-loss',
        title: 'Stop-Loss Orders',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What are Stop-Loss Orders?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A stop-loss order automatically sells your position when the price falls to a predetermined level, limiting your losses.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
                <p className="text-lg font-semibold text-yellow-800">
                  Stop-losses are your safety net against catastrophic losses!
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="text-xl font-semibold text-red-800 mb-3">Fixed Percentage Stop</h4>
                <p className="text-red-700 mb-3">
                  Set your stop-loss at a fixed percentage below your entry price.
                </p>
                <div className="bg-white p-3 rounded border border-red-200">
                  <p className="text-red-800 font-medium">Example:</p>
                  <p className="text-red-700 text-sm">Buy at ₹100, set stop-loss at ₹95 (5% stop).</p>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h4 className="text-xl font-semibold text-orange-800 mb-3">Support Level Stop</h4>
                <p className="text-orange-700 mb-3">
                  Place your stop-loss just below a key support level on the chart.
                </p>
                <div className="bg-white p-3 rounded border border-orange-200">
                  <p className="text-orange-800 font-medium">Example:</p>
                  <p className="text-orange-700 text-sm">If support is at ₹95, set stop-loss at ₹94.</p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Trailing Stop</h4>
                <p className="text-green-700 mb-3">
                  A dynamic stop that moves up with the price but never moves down.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-green-800 font-medium">Example:</p>
                  <p className="text-green-700 text-sm">5% trailing stop adjusts upward as price rises.</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Time-Based Stop</h4>
                <p className="text-blue-700 mb-3">
                  Exit the position after a certain time period, regardless of price.
                </p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-blue-800 font-medium">Example:</p>
                  <p className="text-blue-700 text-sm">Exit if no profit after 30 days.</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'quiz',
        title: 'Test Your Knowledge',
        isRequired: true,
        type: 'quiz' as const,
        minScore: 70,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Risk Management Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of risk management!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. According to the 1% rule, with ₹50,000 capital, what's the maximum you should risk per trade?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>₹500</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>₹1,000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>₹2,500</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What is a trailing stop-loss?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A stop that moves up with the price but never down</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>A stop that follows behind the trade</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>A stop that is set after buying</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What is the primary purpose of risk management?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Maximize profits</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Protect capital</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Beat the market</span>
                    </label>
                  </div>
                </div>
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