"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function ReadingPandLStatementPage() {
  const lessonData = {
    title: "Reading the Profit & Loss (P&L) Statement",
    description: "Understand how to read a P&L statement to see how profitable a company has been over a period of time.",
    lessonSlug: "reading-the-profit-loss-p&l-statement",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/pnl-statement-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/pnl-statement-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/pnl-statement-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/pnl-statement-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/pnl-statement-mr.m4a"
    },
    transcript: {
      en: "Reading the Profit & Loss Statement: Understand how to read a P&L statement to see how profitable a company has been over a period of time. Learn to analyze revenue, expenses, and net income.",
      hi: "लाभ और हानि विवरण पढ़ना: समझें कि P&L विवरण को कैसे पढ़ना है ताकि यह देख सकें कि कंपनी एक निश्चित अवधि में कितनी लाभदायक रही है।",
      bn: "লাভ এবং ক্ষতির বিবরণী পড়া: বুঝুন কীভাবে P&L বিবরণী পড়তে হয় যাতে দেখতে পারেন একটি কোম্পানি একটি নির্দিষ্ট সময়ে কতটা লাভজনক ছিল।",
      ta: "லாபம் மற்றும் இழப்பு அறிக்கையைப் படித்தல்: ஒரு நிறுவனம் ஒரு குறிப்பிட்ட காலகட்டத்தில் எவ்வளவு லாபகரமாக இருந்தது என்பதைக் காண P&L அறிக்கையை எவ்வாறு படிக்க வேண்டும் என்பதைப் புரிந்துகொள்ளுங்கள்.",
      mr: "नफा आणि तोटा विवरण वाचणे: कंपनी एका विशिष्ट कालावधीत किती नफाकारक होती हे पाहण्यासाठी P&L विवरण कसे वाचावे हे समजून घ्या."
    },
    parts: [
      {
        id: 'introduction',
        title: 'Reading the Profit & Loss (P&L) Statement',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you'll understand how to read a P&L statement to see how profitable a company has been over a period of time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is the P&L Statement?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Profit & Loss (P&L) statement, or Income Statement, summarizes a company's revenues, costs, and expenses over a specific period. It shows how profitable a company is.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The P&L statement follows a simple formula: <strong>Revenue - Expenses = Net Income</strong>.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  Think of it as a company's "income report card" - it tells you how well the company performed financially over a specific time period.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Benefits</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Understand profitability</li>
                  <li>• Track performance over time</li>
                  <li>• Compare with competitors</li>
                  <li>• Identify trends</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Important Notes</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Shows period performance</li>
                  <li>• Different from balance sheet</li>
                  <li>• Look for consistency</li>
                  <li>• Consider seasonality</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'components',
        title: 'Key Components of P&L Statement',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Understanding the Structure
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The P&L statement is organized in a logical flow, starting with revenue and ending with net income. Let's break down each section:
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">1. Revenue (Top Line)</h4>
                <p className="text-blue-700 mb-3">
                  This is the total amount of money a company earns from its business activities.
                </p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-blue-800 font-medium">Examples:</p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Sales of products or services</li>
                    <li>• Interest income</li>
                    <li>• Rental income</li>
                    <li>• Commission income</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">2. Cost of Goods Sold (COGS)</h4>
                <p className="text-green-700 mb-3">
                  Direct costs associated with producing or delivering the company's products or services.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-green-800 font-medium">Examples:</p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Raw materials</li>
                    <li>• Direct labor</li>
                    <li>• Manufacturing costs</li>
                    <li>• Shipping costs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">3. Gross Profit</h4>
                <p className="text-purple-700 mb-3">
                  Revenue minus COGS. This shows how much money is left after covering direct costs.
                </p>
                <div className="bg-white p-3 rounded border border-purple-200 text-center">
                  <p className="text-purple-800 font-medium">
                    Gross Profit = Revenue - Cost of Goods Sold
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h4 className="text-xl font-semibold text-orange-800 mb-3">4. Operating Expenses</h4>
                <p className="text-orange-700 mb-3">
                  Costs not directly related to production but necessary for running the business.
                </p>
                <div className="bg-white p-3 rounded border border-orange-200">
                  <p className="text-orange-800 font-medium">Examples:</p>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Salaries and wages</li>
                    <li>• Rent and utilities</li>
                    <li>• Marketing and advertising</li>
                    <li>• Office supplies</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="text-xl font-semibold text-red-800 mb-3">5. Net Income (Bottom Line)</h4>
                <p className="text-red-700 mb-3">
                  The final profit after all expenses have been deducted from revenue.
                </p>
                <div className="bg-white p-3 rounded border border-red-200 text-center">
                  <p className="text-red-800 font-medium">
                    Net Income = Revenue - All Expenses
                  </p>
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
                P&L Statement Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of the Profit & Loss statement!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the basic formula for P&L statement?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Assets = Liabilities + Equity</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Revenue - Expenses = Net Income</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>Cash In - Cash Out = Balance</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What does COGS stand for?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Cost of Goods Sold</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>Cost of General Services</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Cost of Goods and Services</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What is the "bottom line" in a P&L statement?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Revenue</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Net Income</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Gross Profit</span>
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
