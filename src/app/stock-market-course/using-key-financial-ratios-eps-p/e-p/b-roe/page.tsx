"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function AdvancedFinancialRatiosPage() {
  const lessonData = {
    title: "Using Key Financial Ratios (P/B, ROE)",
    description: "Master advanced financial ratios like Price-to-Book (P/B) and Return on Equity (ROE) to make better investment decisions.",
    lessonSlug: "using-key-financial-ratios-eps-p/e-p/b-roe",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-financial-ratios-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-financial-ratios-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-financial-ratios-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-financial-ratios-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/advanced-financial-ratios-mr.m4a"
    },
    transcript: {
      en: "Advanced Financial Ratios: Master advanced financial ratios like Price-to-Book (P/B) and Return on Equity (ROE) to make better investment decisions and analyze company performance.",
      hi: "उन्नत वित्तीय अनुपात: बेहतर निवेश निर्णय लेने और कंपनी के प्रदर्शन का विश्लेषण करने के लिए प्राइस-टू-बुक (P/B) और रिटर्न ऑन इक्विटी (ROE) जैसे उन्नत वित्तीय अनुपातों में महारत हासिल करें।",
      bn: "উন্নত আর্থিক অনুপাত: ভাল বিনিয়োগ সিদ্ধান্ত নিতে এবং কোম্পানির কর্মক্ষমতা বিশ্লেষণ করতে প্রাইস-টু-বুক (P/B) এবং রিটার্ন অন ইক্যুইটি (ROE) এর মতো উন্নত আর্থিক অনুপাতে দক্ষতা অর্জন করুন।",
      ta: "மேம்பட்ட நிதி விகிதங்கள்: சிறந்த முதலீட்டு முடிவுகள் எடுக்க மற்றும் நிறுவனத்தின் செயல்திறனை பகுப்பாய்வு செய்ய ப்ரைஸ்-டு-புக் (P/B) மற்றும் ரிட்டர்ன் ஆன் இக்விட்டி (ROE) போன்ற மேம்பட்ட நிதி விகிதங்களில் தேர்ச்சி பெறுங்கள்.",
      mr: "प्रगत आर्थिक गुणोत्तर: चांगले गुंतवणूक निर्णय घेण्यासाठी आणि कंपनीच्या कामगिरीचे विश्लेषण करण्यासाठी प्राइस-टू-बुक (P/B) आणि रिटर्न ऑन इक्विटी (ROE) यासारख्या प्रगत आर्थिक गुणोत्तरांमध्ये प्राविण्य मिळवा."
    },
    parts: [
      {
        id: 'introduction',
        title: 'Advanced Financial Ratios',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Master advanced financial ratios like Price-to-Book (P/B) and Return on Equity (ROE) to make better investment decisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Building on the Basics
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                In the previous lesson, we learned about EPS and P/E ratios. Now let's explore two more powerful ratios that help you understand a company's value and efficiency.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                These ratios will help you answer important questions: Is the stock fairly valued? How efficiently does the company use shareholders' money?
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  P/B Ratio + ROE = Complete Picture of Value & Efficiency
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">What We'll Cover</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Price-to-Book (P/B) Ratio</li>
                  <li>• Return on Equity (ROE)</li>
                  <li>• How to interpret both</li>
                  <li>• Using them together</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Pro Tips</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Compare within same industry</li>
                  <li>• Look for consistent trends</li>
                  <li>• Consider company lifecycle</li>
                  <li>• Use multiple ratios together</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'pb-ratio',
        title: 'Price-to-Book (P/B) Ratio',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is P/B Ratio?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Price-to-Book (P/B) ratio compares a company's stock price to its book value per share. It tells you how much investors are willing to pay for each rupee of the company's net worth.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <p className="text-lg font-semibold text-blue-800">
                  P/B Ratio = Stock Price ÷ Book Value per Share
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Understanding Book Value</h4>
                <p className="text-green-700 mb-3">
                  Book value is the company's net worth according to its balance sheet.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-green-800 font-medium">Book Value Formula:</p>
                  <p className="text-green-700 text-sm">Total Assets - Total Liabilities = Book Value</p>
                  <p className="text-green-700 text-sm mt-2">Book Value per Share = Book Value ÷ Outstanding Shares</p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">Interpreting P/B Ratio</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">P/B &lt; 1</p>
                    <p className="text-purple-700 text-sm">Stock might be undervalued</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">P/B = 1</p>
                    <p className="text-purple-700 text-sm">Stock priced at book value</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">P/B &gt; 3</p>
                    <p className="text-purple-700 text-sm">Stock might be overvalued</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="text-xl font-semibold text-yellow-800 mb-3">Example Calculation</h4>
              <div className="bg-white p-4 rounded border border-yellow-200">
                <p className="text-yellow-800 font-medium mb-2">Company XYZ:</p>
                <p className="text-yellow-700 text-sm mb-1">• Stock Price: ₹120</p>
                <p className="text-yellow-700 text-sm mb-1">• Book Value per Share: ₹80</p>
                <p className="text-yellow-700 text-sm mb-2">• P/B Ratio = ₹120 ÷ ₹80 = 1.5</p>
                <p className="text-yellow-700 text-sm font-medium">This means investors pay ₹1.5 for every ₹1 of book value</p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'roe',
        title: 'Return on Equity (ROE)',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is ROE?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Return on Equity (ROE) measures how efficiently a company uses shareholders' money to generate profits. It's like asking: "For every ₹100 of shareholders' money, how much profit does the company make?"
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  ROE = Net Income ÷ Shareholders' Equity × 100
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">What ROE Tells You</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">ROE &gt; 15%</p>
                    <p className="text-blue-700 text-sm">Excellent efficiency</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">ROE 10-15%</p>
                    <p className="text-blue-700 text-sm">Good efficiency</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">ROE &lt; 10%</p>
                    <p className="text-blue-700 text-sm">Poor efficiency</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h4 className="text-xl font-semibold text-orange-800 mb-3">ROE Example</h4>
                <div className="bg-white p-4 rounded border border-orange-200">
                  <p className="text-orange-800 font-medium mb-2">Company ABC:</p>
                  <p className="text-orange-700 text-sm mb-1">• Net Income: ₹50 crore</p>
                  <p className="text-orange-700 text-sm mb-1">• Shareholders' Equity: ₹250 crore</p>
                  <p className="text-orange-700 text-sm mb-2">• ROE = (₹50 ÷ ₹250) × 100 = 20%</p>
                  <p className="text-orange-700 text-sm font-medium">This is excellent! Company generates ₹20 profit for every ₹100 of equity</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="text-xl font-semibold text-purple-800 mb-3">Using P/B and ROE Together</h4>
              <p className="text-purple-700 mb-3">
                The magic happens when you use both ratios together:
              </p>
              <div className="bg-white p-4 rounded border border-purple-200">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-purple-800 font-medium">Ideal Combination:</p>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Low P/B ratio (undervalued)</li>
                      <li>• High ROE (efficient)</li>
                      <li>• This suggests a hidden gem!</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-purple-800 font-medium">Warning Signs:</p>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• High P/B ratio</li>
                      <li>• Low ROE</li>
                      <li>• Overpriced & inefficient</li>
                    </ul>
                  </div>
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
                Advanced Financial Ratios Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of P/B ratio and ROE!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What does P/B ratio compare?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Stock price to earnings</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Stock price to book value</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>Stock price to sales</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What does ROE measure?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>How much profit company makes from equity</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>How much debt company has</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>How much cash company has</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What's generally considered a good ROE?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Below 5%</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Above 15%</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Exactly 10%</span>
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