"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function RoleOfSebiPage() {
  const lessonData = {
    title: "Role of SEBI",
    description: "Meet the watchdog of the Indian stock market: the Securities and Exchange Board of India (SEBI).",
    lessonSlug: "role-of-sebi",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/role-of-sebi-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/role-of-sebi-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/role-of-sebi-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/role-of-sebi-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/role-of-sebi-mr.m4a"
    },
    transcript: {
      en: "Role of SEBI: Meet the watchdog of the Indian stock market: the Securities and Exchange Board of India (SEBI). Learn about SEBI's primary mandate, how it protects investors, and its regulatory framework.",
      hi: "सेबी की भूमिका: भारतीय स्टॉक मार्केट के वॉचडॉग से मिलें: भारतीय प्रतिभूति और विनिमय बोर्ड (सेबी)।",
      bn: "SEBI-এর ভূমিকা: ভারতীয় স্টক মার্কেটের ওয়াচডগের সাথে পরিচিত হন: ভারতীয় সিকিউরিটিজ অ্যান্ড এক্সচেঞ্জ বোর্ড (SEBI)।",
      ta: "SEBI-ன் பங்கு: இந்திய பங்குச் சந்தையின் கண்காணிப்பாளரைச் சந்திக்கவும்: இந்திய பாதுகாப்பு மற்றும் பரிமாற்ற வாரியம் (SEBI)।",
      mr: "SEBI ची भूमिका: भारतीय स्टॉक मार्केटच्या वॉचडॉगशी भेट घ्या: भारतीय प्रतिभूती आणि विनिमय मंडळ (SEBI)।"
    },
    parts: [
      {
        id: "introduction",
        title: "Understanding SEBI's Role",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you'll meet the watchdog of the Indian stock market: the Securities and Exchange Board of India (SEBI).
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Why Regulation Matters
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The stock market isn't a free-for-all. It is a highly regulated environment, and the chief regulator in India is <strong>SEBI (Securities and Exchange Board of India)</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                SEBI ensures that the market operates fairly, transparently, and efficiently, protecting investors and maintaining market integrity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Key Concepts</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• What SEBI is and its role</li>
                  <li>• SEBI's primary mandate</li>
                  <li>• How SEBI protects investors</li>
                  <li>• SEBI's regulatory framework</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Why It Matters</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Investor protection</li>
                  <li>• Market fairness</li>
                  <li>• Regulatory compliance</li>
                  <li>• Market confidence</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "what-is-sebi",
        title: "What is SEBI?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Securities and Exchange Board of India
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                SEBI was established in 1988 and given statutory powers in 1992 through the SEBI Act. It's headquartered in Mumbai and operates under the Ministry of Finance.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium">
                  SEBI is India's apex regulatory body for securities and commodity market, overseeing stock exchanges, brokers, mutual funds, and other market participants.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <div className="text-2xl mb-2">🛡️</div>
                <h4 className="font-semibold text-green-800 mb-2">Protector</h4>
                <p className="text-green-700 text-sm">Protects investor interests</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
                <div className="text-2xl mb-2">⚖️</div>
                <h4 className="font-semibold text-blue-800 mb-2">Regulator</h4>
                <p className="text-blue-700 text-sm">Regulates market activities</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold text-purple-800 mb-2">Developer</h4>
                <p className="text-purple-700 text-sm">Develops market infrastructure</p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "sebi-mandate",
        title: "SEBI's Primary Mandate",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Three Core Functions
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                SEBI operates with three main objectives that guide all its regulatory activities and decisions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">1. Protect Investors</h4>
                <p className="text-green-700 mb-3">
                  SEBI safeguards the interests of investors by ensuring transparency, preventing fraud, and maintaining fair market practices.
                </p>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Disclosure requirements for companies</li>
                  <li>• Prevention of insider trading</li>
                  <li>• Regulation of market manipulation</li>
                  <li>• Investor education initiatives</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">2. Regulate Securities Market</h4>
                <p className="text-blue-700 mb-3">
                  SEBI regulates all aspects of the securities market to ensure orderly and efficient functioning.
                </p>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li>• Stock exchange operations</li>
                  <li>• Broker and dealer activities</li>
                  <li>• Mutual fund regulations</li>
                  <li>• Derivatives trading rules</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">3. Develop Securities Market</h4>
                <p className="text-purple-700 mb-3">
                  SEBI promotes the development of the securities market through innovation and infrastructure improvements.
                </p>
                <ul className="text-purple-700 space-y-1 text-sm">
                  <li>• New product development</li>
                  <li>• Technology upgrades</li>
                  <li>• Market infrastructure</li>
                  <li>• International integration</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "investor-protection",
        title: "How SEBI Protects Investors",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Investor Protection Mechanisms
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                SEBI has implemented several mechanisms to protect investors from fraud, manipulation, and unfair practices.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Disclosure Requirements</h4>
                <div className="space-y-3">
                  <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <p className="text-yellow-800 font-medium">Quarterly Results</p>
                    <p className="text-yellow-700 text-sm">Companies must disclose financial results every quarter</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">Material Events</p>
                    <p className="text-green-700 text-sm">Immediate disclosure of significant developments</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Corporate Actions</p>
                    <p className="text-blue-700 text-sm">Dividends, splits, mergers must be announced</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Anti-Fraud Measures</h4>
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <p className="text-red-800 font-medium">Insider Trading Prevention</p>
                    <p className="text-red-700 text-sm">Strict rules against trading on non-public information</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded border border-orange-200">
                    <p className="text-orange-800 font-medium">Market Manipulation</p>
                    <p className="text-orange-700 text-sm">Prevention of artificial price movements</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">Pump and Dump Schemes</p>
                    <p className="text-purple-700 text-sm">Protection against fraudulent promotion schemes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "regulatory-framework",
        title: "SEBI's Regulatory Framework",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Key Regulations and Guidelines
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                SEBI operates through a comprehensive framework of regulations, guidelines, and circulars that govern all market participants.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="text-xl font-semibold text-yellow-800 mb-3">Primary Market Regulations</h4>
                <ul className="text-yellow-700 space-y-2">
                  <li>• <strong>ICDR Regulations:</strong> Govern initial public offerings (IPOs)</li>
                  <li>• <strong>Listing Regulations:</strong> Rules for stock exchange listing</li>
                  <li>• <strong>Takeover Code:</strong> Regulations for corporate acquisitions</li>
                  <li>• <strong>Delisting Guidelines:</strong> Rules for removing stocks from exchanges</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">Secondary Market Regulations</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>Stock Exchange Regulations:</strong> Rules for exchange operations</li>
                  <li>• <strong>Broker Regulations:</strong> Standards for trading intermediaries</li>
                  <li>• <strong>Derivatives Regulations:</strong> Rules for futures and options trading</li>
                  <li>• <strong>Algorithmic Trading:</strong> Guidelines for automated trading systems</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Intermediary Regulations</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>Mutual Fund Regulations:</strong> Rules for mutual fund operations</li>
                  <li>• <strong>Portfolio Manager Regulations:</strong> Standards for portfolio management</li>
                  <li>• <strong>Investment Adviser Regulations:</strong> Rules for financial advisors</li>
                  <li>• <strong>Research Analyst Regulations:</strong> Standards for equity research</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Test Your Knowledge",
        isRequired: true,
        type: 'quiz' as const,
        minScore: 70,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                SEBI Knowledge Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of SEBI's role and functions!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. When was SEBI given statutory powers?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>1988</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>1992</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>1995</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are SEBI's three core functions?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Tax, Trade, Transport</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>Protect, Regulate, Develop</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Buy, Sell, Hold</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. Which regulation governs IPOs?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>ICDR Regulations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Takeover Code</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Listing Regulations</span>
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
