"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function KeyFinancialRatiosPage() {
  const lessonData = {
    title: "Using Key Financial Ratios (EPS, P/E, P/B, ROE)",
    description: "Unlock the stories hidden in the numbers. This lesson will teach you how to use four of the most powerful financial ratios to evaluate a company's health, profitability, and value.",
    lessonSlug: "using-key-financial-ratios-eps-p",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/financial-ratios-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/financial-ratios-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/financial-ratios-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/financial-ratios-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/financial-ratios-mr.m4a"
    },
    transcript: {
      en: "Using Key Financial Ratios: Unlock the stories hidden in the numbers. This lesson will teach you how to use four of the most powerful financial ratios to evaluate a company's health, profitability, and value.",
      hi: "मुख्य वित्तीय अनुपातों का उपयोग: संख्याओं में छिपी कहानियों को उजागर करें। यह पाठ आपको कंपनी के स्वास्थ्य, लाभप्रदता और मूल्य का मूल्यांकन करने के लिए चार सबसे शक्तिशाली वित्तीय अनुपातों का उपयोग करना सिखाएगा।",
      bn: "মূল আর্থিক অনুপাত ব্যবহার: সংখ্যায় লুকিয়ে থাকা গল্পগুলি উন্মোচন করুন। এই পাঠ আপনাকে কোম্পানির স্বাস্থ্য, লাভজনকতা এবং মূল্য মূল্যায়ন করতে চারটি সবচেয়ে শক্তিশালী আর্থিক অনুপাত ব্যবহার করতে শিখবে।",
      ta: "முக்கிய நிதி விகிதங்களைப் பயன்படுத்துதல்: எண்களில் மறைந்துள்ள கதைகளை வெளிப்படுத்துங்கள். இந்த பாடம் நிறுவனத்தின் ஆரோக்கியம், லாபம் மற்றும் மதிப்பை மதிப்பிடுவதற்கு நான்கு மிகவும் சக்திவாய்ந்த நிதி விகிதங்களைப் பயன்படுத்துவதற்கு உங்களுக்கு கற்பிக்கும்.",
      mr: "मुख्य आर्थिक गुणोत्तरांचा वापर: संख्यांमध्ये लपलेल्या कथांना उघड करा. हा धडा तुम्हाला कंपनीचे आरोग्य, नफा आणि मूल्य मूल्यांकन करण्यासाठी चार सर्वात शक्तिशाली आर्थिक गुणोत्तरांचा वापर कसा करावा हे शिकवेल."
    },
    parts: [
      {
        id: 'introduction',
        title: 'Why Financial Ratios Matter',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Unlock the stories hidden in the numbers. This lesson will teach you how to use four of the most powerful financial ratios to evaluate a company's health, profitability, and value.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why Financial Ratios Matter
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Financial statements are full of raw data. To make sense of it, we use <strong>financial ratios</strong>. These are simple calculations that help us compare companies, analyze performance, and make informed investment decisions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Think of ratios as the "translator" between raw numbers and meaningful insights. They help you understand if a company is performing well, if it's fairly valued, and how it compares to competitors.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  Let's dive into four essential ratios that every investor should know!
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Compare companies easily</li>
                  <li>• Identify undervalued stocks</li>
                  <li>• Assess company performance</li>
                  <li>• Make informed decisions</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Use ratios together</li>
                  <li>• Compare with industry</li>
                  <li>• Look for trends</li>
                  <li>• Consider context</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'eps-ratio',
        title: 'Earnings Per Share (EPS)',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is EPS?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Earnings Per Share (EPS) tells you how much profit a company makes for each share of stock. It's one of the most important metrics for evaluating a company's profitability.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <p className="text-lg font-semibold text-blue-800">
                  EPS = Net Income ÷ Number of Outstanding Shares
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">What EPS Tells You</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>Profitability:</strong> How much money the company makes per share</li>
                  <li>• <strong>Growth:</strong> Higher EPS usually means growing profits</li>
                  <li>• <strong>Efficiency:</strong> How well the company uses its resources</li>
                  <li>• <strong>Comparison:</strong> Easy to compare with other companies</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h4 className="text-xl font-semibold text-orange-800 mb-3">Example</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-orange-200">
                    <p className="text-orange-800 font-medium">Company A:</p>
                    <p className="text-orange-700 text-sm">Net Income: ₹100 crore</p>
                    <p className="text-orange-700 text-sm">Shares: 10 crore</p>
                    <p className="text-orange-700 text-sm font-bold">EPS: ₹10</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-orange-200">
                    <p className="text-orange-800 font-medium">Company B:</p>
                    <p className="text-orange-700 text-sm">Net Income: ₹50 crore</p>
                    <p className="text-orange-700 text-sm">Shares: 5 crore</p>
                    <p className="text-orange-700 text-sm font-bold">EPS: ₹10</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
              <p className="text-lg font-semibold text-yellow-800">
                Higher EPS is generally better, but always compare with industry peers!
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'pe-ratio',
        title: 'Price-to-Earnings (P/E) Ratio',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is P/E Ratio?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Price-to-Earnings (P/E) ratio tells you how much investors are willing to pay for each rupee of earnings. It's the most popular valuation metric.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  P/E Ratio = Stock Price ÷ Earnings Per Share (EPS)
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Interpreting P/E Ratio</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">High P/E (25+)</p>
                    <p className="text-blue-700 text-sm">• Investors expect high growth</p>
                    <p className="text-blue-700 text-sm">• Stock might be overvalued</p>
                    <p className="text-blue-700 text-sm">• Higher risk, higher potential</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Low P/E (10-15)</p>
                    <p className="text-blue-700 text-sm">• Stock might be undervalued</p>
                    <p className="text-blue-700 text-sm">• Lower growth expectations</p>
                    <p className="text-blue-700 text-sm">• Lower risk, lower potential</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">Example Calculation</h4>
                <div className="bg-white p-4 rounded border border-purple-200">
                  <p className="text-purple-800 font-medium mb-2">Stock Price: ₹500</p>
                  <p className="text-purple-700 text-sm mb-2">EPS: ₹25</p>
                  <p className="text-purple-700 text-sm mb-2">P/E Ratio = ₹500 ÷ ₹25 = 20</p>
                  <p className="text-purple-700 text-sm font-medium">This means investors pay ₹20 for every ₹1 of earnings</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
              <p className="text-lg font-semibold text-red-800">
                Always compare P/E ratios within the same industry for meaningful analysis!
              </p>
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
                Financial Ratios Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of financial ratios!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What does EPS stand for?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Earnings Per Share</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Earnings Per Stock</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>Equity Per Share</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. A high P/E ratio usually indicates:</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Low growth expectations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>High growth expectations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>No growth expectations</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What is the formula for P/E ratio?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Stock Price × EPS</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Stock Price ÷ EPS</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Stock Price + EPS</span>
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
