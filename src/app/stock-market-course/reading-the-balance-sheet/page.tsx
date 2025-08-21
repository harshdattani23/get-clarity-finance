"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function ReadingBalanceSheetPage() {
  const lessonData = {
    title: "Reading the Balance Sheet",
    description: "Master the art of reading balance sheets to understand a company's financial position, assets, liabilities, and equity at a specific point in time.",
    lessonSlug: "reading-the-balance-sheet",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/balance-sheet-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/balance-sheet-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/balance-sheet-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/balance-sheet-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/balance-sheet-mr.m4a"
    },
    transcript: {
      en: "Reading the Balance Sheet: Master the art of reading balance sheets to understand a company's financial position, assets, liabilities, and equity at a specific point in time.",
      hi: "बैलेंस शीट पढ़ना: कंपनी की वित्तीय स्थिति, संपत्ति, देनदारियों और इक्विटी को समझने के लिए बैलेंस शीट पढ़ने की कला में महारत हासिल करें।",
      bn: "ব্যালেন্স শীট পড়া: একটি নির্দিষ্ট সময়ে কোম্পানির আর্থিক অবস্থান, সম্পদ, দায় এবং ইক্যুইটি বোঝার জন্য ব্যালেন্স শীট পড়ার শিল্পে দক্ষতা অর্জন করুন।",
      ta: "இருப்புநிலைக் கணக்கு படித்தல்: ஒரு குறிப்பிட்ட நேரத்தில் நிறுவனத்தின் நிதி நிலை, சொத்துக்கள், பொறுப்புகள் மற்றும் ஈக்விட்டியைப் புரிந்துகொள்ள இருப்புநிலைக் கணக்கு படிக்கும் கலையில் தேர்ச்சி பெறுங்கள்.",
      mr: "ताळेबंद वाचणे: एका विशिष्ट वेळी कंपनीची आर्थिक स्थिती, मालमत्ता, दायित्वे आणि इक्विटी समजून घेण्यासाठी ताळेबंद वाचण्याच्या कलेत प्राविण्य मिळवा."
    },
    parts: [
      {
        id: 'introduction',
        title: 'Understanding the Balance Sheet',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Master the art of reading balance sheets to understand a company's financial position, assets, liabilities, and equity at a specific point in time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is a Balance Sheet?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A balance sheet is like a financial "snapshot" of a company at a specific moment in time. It shows what the company owns (assets), what it owes (liabilities), and what belongs to shareholders (equity).
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unlike the P&L statement which shows performance over time, the balance sheet shows the financial position on a specific date.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  Assets = Liabilities + Shareholders' Equity
                </p>
                <p className="text-green-700 text-sm mt-1">This equation must always balance!</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">What Balance Sheet Shows</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Company's financial strength</li>
                  <li>• Liquidity position</li>
                  <li>• Debt levels</li>
                  <li>• Asset quality</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Key Differences</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• P&L: Performance over time</li>
                  <li>• Balance Sheet: Position at a point</li>
                  <li>• P&L: Revenue and expenses</li>
                  <li>• Balance Sheet: Assets and liabilities</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'assets',
        title: 'Understanding Assets',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What are Assets?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Assets are everything the company owns that has value. They're divided into two main categories based on how quickly they can be converted to cash.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Current Assets</h4>
                <p className="text-blue-700 mb-3">
                  Assets that can be converted to cash within one year.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Cash & Cash Equivalents</p>
                    <p className="text-blue-700 text-sm">Money in bank, short-term investments</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Accounts Receivable</p>
                    <p className="text-blue-700 text-sm">Money customers owe to company</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Inventory</p>
                    <p className="text-blue-700 text-sm">Products ready for sale</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Prepaid Expenses</p>
                    <p className="text-blue-700 text-sm">Payments made in advance</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Non-Current Assets (Fixed Assets)</h4>
                <p className="text-green-700 mb-3">
                  Assets that provide value for more than one year.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">Property, Plant & Equipment</p>
                    <p className="text-green-700 text-sm">Buildings, machinery, vehicles</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">Intangible Assets</p>
                    <p className="text-green-700 text-sm">Patents, trademarks, goodwill</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">Investments</p>
                    <p className="text-green-700 text-sm">Long-term securities, subsidiaries</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">Goodwill</p>
                    <p className="text-green-700 text-sm">Value from acquisitions</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-xl font-semibold text-yellow-800 mb-3">Key Asset Quality Indicators</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-yellow-800 font-medium">Good Signs:</p>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• High cash levels</li>
                      <li>• Growing receivables with sales</li>
                      <li>• Reasonable inventory levels</li>
                      <li>• Modern equipment</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-yellow-800 font-medium">Warning Signs:</p>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Very low cash</li>
                      <li>• Rapidly growing receivables</li>
                      <li>• Excessive inventory</li>
                      <li>• Old, depreciated assets</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'liabilities-equity',
        title: 'Liabilities and Equity',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Understanding Liabilities and Equity
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Liabilities are what the company owes to others, while equity represents the shareholders' stake in the company.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="text-xl font-semibold text-red-800 mb-3">Current Liabilities</h4>
                <p className="text-red-700 mb-3">
                  Debts that must be paid within one year.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-red-200">
                    <p className="text-red-800 font-medium">Accounts Payable</p>
                    <p className="text-red-700 text-sm">Money owed to suppliers</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <p className="text-red-800 font-medium">Short-term Debt</p>
                    <p className="text-red-700 text-sm">Loans due within a year</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <p className="text-red-800 font-medium">Accrued Expenses</p>
                    <p className="text-red-700 text-sm">Wages, taxes owed</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <p className="text-red-800 font-medium">Deferred Revenue</p>
                    <p className="text-red-700 text-sm">Prepayments from customers</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h4 className="text-xl font-semibold text-orange-800 mb-3">Non-Current Liabilities</h4>
                <p className="text-orange-700 mb-3">
                  Long-term debts and obligations.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-orange-200">
                    <p className="text-orange-800 font-medium">Long-term Debt</p>
                    <p className="text-orange-700 text-sm">Bank loans, bonds</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-orange-200">
                    <p className="text-orange-800 font-medium">Pension Obligations</p>
                    <p className="text-orange-700 text-sm">Employee retirement benefits</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-orange-200">
                    <p className="text-orange-800 font-medium">Deferred Tax</p>
                    <p className="text-orange-700 text-sm">Future tax obligations</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-orange-200">
                    <p className="text-orange-800 font-medium">Lease Obligations</p>
                    <p className="text-orange-700 text-sm">Long-term rental commitments</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Shareholders' Equity</h4>
                <p className="text-blue-700 mb-3">
                  The residual value that belongs to shareholders.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Share Capital</p>
                    <p className="text-blue-700 text-sm">Money raised from issuing shares</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Retained Earnings</p>
                    <p className="text-blue-700 text-sm">Accumulated profits not distributed</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Reserves</p>
                    <p className="text-blue-700 text-sm">Other accumulated funds</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Treasury Stock</p>
                    <p className="text-blue-700 text-sm">Company's own shares bought back</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">Key Balance Sheet Ratios</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">Current Ratio</p>
                    <p className="text-purple-700 text-sm">Current Assets ÷ Current Liabilities</p>
                    <p className="text-purple-700 text-sm">Should be &gt; 1 (preferably &gt; 1.5)</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">Debt-to-Equity</p>
                    <p className="text-purple-700 text-sm">Total Debt ÷ Shareholders' Equity</p>
                    <p className="text-purple-700 text-sm">Lower is generally better</p>
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
                Balance Sheet Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of balance sheets!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the fundamental balance sheet equation?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Revenue - Expenses = Net Income</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Assets = Liabilities + Shareholders' Equity</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>Cash In - Cash Out = Net Cash Flow</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which of these is a current asset?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Building</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>Accounts Receivable</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Long-term Investment</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What does the current ratio measure?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Company's ability to pay short-term debts</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Company's profitability</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Company's stock price</span>
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