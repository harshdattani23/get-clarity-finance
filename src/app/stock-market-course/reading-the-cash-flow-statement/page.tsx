"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function ReadingCashFlowStatementPage() {
  const lessonData = {
    title: "Reading the Cash Flow Statement",
    description: "Learn to read a cash flow statement to understand how a company generates and uses cash over a period of time.",
    lessonSlug: "reading-the-cash-flow-statement",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/cash-flow-statement-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/cash-flow-statement-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/cash-flow-statement-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/cash-flow-statement-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/cash-flow-statement-mr.m4a"
    },
    transcript: {
      en: "Reading the Cash Flow Statement: Learn to read a cash flow statement to understand how a company generates and uses cash over a period of time. Master cash flow analysis for better investment decisions.",
      hi: "नकदी प्रवाह विवरण पढ़ना: समझें कि नकदी प्रवाह विवरण को कैसे पढ़ना है ताकि यह समझ सकें कि कंपनी एक निश्चित अवधि में नकदी कैसे उत्पन्न करती है और उसका उपयोग करती है।",
      bn: "নগদ প্রবাহ বিবরণী পড়া: শিখুন কীভাবে নগদ প্রবাহ বিবরণী পড়তে হয় যাতে বুঝতে পারেন একটি কোম্পানি কীভাবে একটি নির্দিষ্ট সময়ে নগদ উৎপন্ন করে এবং ব্যবহার করে।",
      ta: "பணப்பாய்வு அறிக்கையைப் படித்தல்: ஒரு நிறுவனம் ஒரு குறிப்பிட்ட காலகட்டத்தில் பணத்தை எவ்வாறு உருவாக்குகிறது மற்றும் பயன்படுத்துகிறது என்பதைப் புரிந்துகொள்ள பணப்பாய்வு அறிக்கையை எவ்வாறு படிக்க வேண்டும் என்பதைக் கற்றுக்கொள்ளுங்கள்.",
      mr: "रोख प्रवाह विवरण वाचणे: कंपनी एका विशिष्ट कालावधीत रोख कसा निर्माण करते आणि वापरते हे समजून घेण्यासाठी रोख प्रवाह विवरण कसे वाचावे हे शिका."
    },
    parts: [
      {
        id: 'introduction',
        title: 'Understanding Cash Flow Statement',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you'll learn to read a cash flow statement to understand how a company generates and uses cash over a period of time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is the Cash Flow Statement?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Cash Flow Statement shows how much cash a company generates and uses during a specific period. It's like a "cash diary" that tracks where money comes from and where it goes.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                While the P&L statement shows profitability, the cash flow statement shows <strong>liquidity</strong> - whether a company has enough cash to pay its bills and invest in growth.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  Cash is king! A profitable company can still go bankrupt if it runs out of cash.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Assess liquidity</li>
                  <li>• Understand cash sources</li>
                  <li>• Evaluate financial health</li>
                  <li>• Predict future cash needs</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Shows actual cash movement</li>
                  <li>• Different from profit</li>
                  <li>• Three main sections</li>
                  <li>• Look for trends</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'three-sections',
        title: 'Three Main Sections',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                The Three Parts of Cash Flow
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The cash flow statement is divided into three main sections, each showing a different type of cash activity:
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">1. Operating Cash Flow</h4>
                <p className="text-blue-700 mb-3">
                  Cash generated from the company's core business activities.
                </p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-blue-800 font-medium">Cash Inflows:</p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Sales revenue</li>
                    <li>• Interest received</li>
                    <li>• Dividends received</li>
                  </ul>
                  <p className="text-blue-800 font-medium mt-2">Cash Outflows:</p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Payments to suppliers</li>
                    <li>• Employee salaries</li>
                    <li>• Operating expenses</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200 mt-3">
                  <p className="text-green-800 font-medium text-center">
                    Positive operating cash flow is usually a good sign!
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">2. Investing Cash Flow</h4>
                <p className="text-green-700 mb-3">
                  Cash used for or generated from long-term investments and assets.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-green-800 font-medium">Cash Outflows:</p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Purchase of equipment</li>
                    <li>• Acquisition of other companies</li>
                    <li>• Investment in securities</li>
                  </ul>
                  <p className="text-green-800 font-medium mt-2">Cash Inflows:</p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Sale of equipment</li>
                    <li>• Sale of investments</li>
                    <li>• Proceeds from asset sales</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-3 rounded border border-orange-200 mt-3">
                  <p className="text-orange-800 font-medium text-center">
                    Negative investing cash flow is often normal for growing companies
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">3. Financing Cash Flow</h4>
                <p className="text-purple-700 mb-3">
                  Cash from or used for financing activities like loans, equity, and dividends.
                </p>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-purple-800 font-medium">Cash Inflows:</p>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Proceeds from loans</li>
                    <li>• Issuance of shares</li>
                    <li>• Bond issuance</li>
                  </ul>
                  <p className="text-purple-800 font-medium mt-2">Cash Outflows:</p>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Repayment of loans</li>
                    <li>• Payment of dividends</li>
                    <li>• Share buybacks</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-3">
                  <p className="text-blue-800 font-medium text-center">
                    Shows how the company funds its operations and growth
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
              <p className="text-lg font-semibold text-yellow-800">
                The sum of all three sections equals the net change in cash position!
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
                Cash Flow Statement Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of the cash flow statement!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. How many main sections does a cash flow statement have?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Two</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Three</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>Four</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which section shows cash from core business activities?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Operating cash flow</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>Investing cash flow</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Financing cash flow</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What does negative investing cash flow usually indicate?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>The company is failing</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>The company is growing and investing</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>The company has no cash</span>
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
