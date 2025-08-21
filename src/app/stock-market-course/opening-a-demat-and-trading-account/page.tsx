"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function OpeningDematTradingAccountPage() {
  const lessonData = {
    title: "Opening a Demat and Trading Account",
    description: "Learn the complete process of opening demat and trading accounts, understand the difference between them, and discover how to choose the right broker.",
    lessonSlug: "opening-a-demat-and-trading-account",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/demat-trading-account-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/demat-trading-account-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/demat-trading-account-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/demat-trading-account-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/demat-trading-account-mr.m4a"
    },
    transcript: {
      en: "Opening Demat and Trading Account: Learn the complete process of opening demat and trading accounts, understand the difference between them, and discover how to choose the right broker for your investment journey.",
      hi: "डीमैट और ट्रेडिंग खाता खोलना: डीमैट और ट्रेडिंग खाते खोलने की पूरी प्रक्रिया सीखें, उनके बीच अंतर को समझें, और अपनी निवेश यात्रा के लिए सही ब्रोकर चुनने का तरीका जानें।",
      bn: "ডিম্যাট এবং ট্রেডিং অ্যাকাউন্ট খোলা: ডিম্যাট এবং ট্রেডিং অ্যাকাউন্ট খোলার সম্পূর্ণ প্রক্রিয়া শিখুন, তাদের মধ্যে পার্থক্য বুঝুন এবং আপনার বিনিয়োগ যাত্রার জন্য সঠিক ব্রোকার বেছে নেওয়ার উপায় আবিষ্কার করুন।",
      ta: "டீமேட் மற்றும் வர்த்தகக் கணக்கு திறத்தல்: டீமேட் மற்றும் வர்த்தகக் கணக்குகளைத் திறப்பதற்கான முழுமையான செயல்முறையைக் கற்றுக்கொள்ளுங்கள், அவற்றுக்கிடையேயான வேறுபாட்டைப் புரிந்துகொள்ளுங்கள், மற்றும் உங்கள் முதலீட்டு பயணத்திற்கு சரியான தரகரை எவ்வாறு தேர்ந்தெடுப்பது என்பதைக் கண்டறியுங்கள்.",
      mr: "डिमॅट आणि ट्रेडिंग खाते उघडणे: डिमॅट आणि ट्रेडिंग खाते उघडण्याची संपूर्ण प्रक्रिया शिका, त्यांच्यातील फरक समजून घ्या आणि तुमच्या गुंतवणूक प्रवासासाठी योग्य ब्रोकर कसा निवडावा हे शोधा."
    },
    parts: [
      {
        id: 'introduction',
        title: 'Demat vs Trading Account',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Learn the complete process of opening demat and trading accounts, understand the difference between them, and discover how to choose the right broker.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Understanding the Two Essential Accounts
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To start investing in stocks, you need TWO different accounts: a <strong>Demat Account</strong> and a <strong>Trading Account</strong>. Think of them as your digital wallet and your shopping interface.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  🏦 Demat Account = Digital Locker | 💻 Trading Account = Shopping Interface
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">📁 Demat Account</h4>
                <p className="text-blue-700 mb-3">
                  <strong>Demat</strong> = Dematerialized. Your digital vault for storing shares.
                </p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Purpose:</p>
                    <p className="text-blue-700 text-sm">Stores your shares electronically</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Like:</p>
                    <p className="text-blue-700 text-sm">Bank account for shares instead of money</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Managed by:</p>
                    <p className="text-blue-700 text-sm">NSDL or CDSL (depositories)</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">💼 Trading Account</h4>
                <p className="text-green-700 mb-3">
                  Your gateway to buy and sell stocks on stock exchanges.
                </p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">Purpose:</p>
                    <p className="text-green-700 text-sm">Place buy/sell orders</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">Like:</p>
                    <p className="text-green-700 text-sm">Shopping cart for stocks</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">Managed by:</p>
                    <p className="text-green-700 text-sm">Stockbrokers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">How They Work Together</h4>
              <div className="space-y-2 text-yellow-700 text-sm">
                <p>1. You place a buy order through your <strong>Trading Account</strong></p>
                <p>2. Money is debited from your linked bank account</p>
                <p>3. Shares are credited to your <strong>Demat Account</strong></p>
                <p>4. For selling, shares move from Demat to buyer, money comes to your bank</p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'choosing-broker',
        title: 'Choosing the Right Broker',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Types of Brokers
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                There are two main types of brokers in India. Understanding the difference will help you choose the right one for your needs and budget.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">🏢 Full-Service Brokers</h4>
                <p className="text-blue-700 mb-3">
                  Traditional brokers offering comprehensive services.
                </p>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✅ Services:</p>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Research reports</li>
                      <li>• Investment advisory</li>
                      <li>• Relationship manager</li>
                      <li>• Portfolio management</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">💰 Cost:</p>
                    <p className="text-blue-700 text-sm">Higher brokerage (0.3% - 0.7%)</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">👥 Best for:</p>
                    <p className="text-blue-700 text-sm">Beginners, high-net-worth individuals</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">💻 Discount Brokers</h4>
                <p className="text-green-700 mb-3">
                  Technology-first brokers offering basic services at low cost.
                </p>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✅ Services:</p>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Trading platform</li>
                      <li>• Basic research tools</li>
                      <li>• Mobile apps</li>
                      <li>• Customer support</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">💰 Cost:</p>
                    <p className="text-green-700 text-sm">Lower brokerage (₹10-20 per trade)</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">👥 Best for:</p>
                    <p className="text-green-700 text-sm">DIY investors, frequent traders</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="text-xl font-semibold text-purple-800 mb-3">Key Factors to Consider</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-purple-800 font-medium mb-2">📊 Trading Features:</p>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• User-friendly platform</li>
                    <li>• Mobile app quality</li>
                    <li>• Order types available</li>
                    <li>• Chart analysis tools</li>
                  </ul>
                </div>
                <div>
                  <p className="text-purple-800 font-medium mb-2">💸 Cost Structure:</p>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Brokerage charges</li>
                    <li>• Annual maintenance charges</li>
                    <li>• Hidden fees</li>
                    <li>• Call & trade charges</li>
                  </ul>
                </div>
                <div>
                  <p className="text-purple-800 font-medium mb-2">🛡️ Safety & Support:</p>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• SEBI registration</li>
                    <li>• Customer support quality</li>
                    <li>• Technology reliability</li>
                    <li>• Insurance coverage</li>
                  </ul>
                </div>
                <div>
                  <p className="text-purple-800 font-medium mb-2">📈 Additional Services:</p>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Research reports</li>
                    <li>• IPO facility</li>
                    <li>• Mutual funds</li>
                    <li>• Derivatives trading</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">Popular Brokers in India</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-yellow-800 font-medium">Discount Brokers:</p>
                  <p className="text-yellow-700 text-sm">Zerodha, Upstox, Angel One, 5paisa, Groww</p>
                </div>
                <div>
                  <p className="text-yellow-800 font-medium">Full-Service Brokers:</p>
                  <p className="text-yellow-700 text-sm">ICICI Direct, HDFC Securities, Kotak Securities, Sharekhan</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'account-opening-process',
        title: 'Account Opening Process',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Step-by-Step Account Opening
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Opening a demat and trading account has become very simple with online processes. Here's exactly what you need to do:
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-blue-800">Choose Your Broker</h4>
                  <p className="text-blue-700 text-sm">Research and select based on your needs and budget</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-green-800">Fill Online Application</h4>
                  <p className="text-green-700 text-sm">Visit broker's website, fill personal and financial details</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex items-center">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-purple-800">Complete KYC Process</h4>
                  <p className="text-purple-700 text-sm">Submit documents and complete verification (covered in previous lesson)</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex items-center">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-orange-800">Sign Agreements</h4>
                  <p className="text-orange-700 text-sm">Digital signature on trading and demat account agreements</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-center">
                <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-red-800">Fund Your Account</h4>
                  <p className="text-red-700 text-sm">Transfer money to start trading</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center">
                <div className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">6</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Start Trading!</h4>
                  <p className="text-gray-700 text-sm">Download trading app and place your first order</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">📄 Documents Required</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>✅ PAN Card (mandatory)</li>
                  <li>✅ Aadhaar Card</li>
                  <li>✅ Bank account proof</li>
                  <li>✅ Income proof</li>
                  <li>✅ Address proof</li>
                  <li>✅ Passport size photo</li>
                  <li>✅ Cancelled cheque</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">💰 Typical Charges</h4>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Account Opening:</p>
                    <p className="text-blue-700 text-sm">₹0 - ₹500 (often free)</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Annual Maintenance:</p>
                    <p className="text-blue-700 text-sm">₹200 - ₹700 per year</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">Brokerage:</p>
                    <p className="text-blue-700 text-sm">₹10-20 per trade (discount) or 0.1%-0.7% (full-service)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">⚡ Quick Tips</h4>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Account opening usually takes 1-3 working days</li>
                <li>• Keep documents ready for faster processing</li>
                <li>• Start with small amounts to understand the platform</li>
                <li>• Read all terms and conditions carefully</li>
                <li>• Keep login credentials safe and secure</li>
              </ul>
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
                Demat & Trading Account Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of demat and trading accounts!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the main purpose of a Demat account?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>To store money for trading</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>To store shares electronically</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>To place buy and sell orders</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which type of broker typically charges lower brokerage?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Full-service brokers</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>Discount brokers</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Both charge the same</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How many accounts do you need to start stock trading?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>One (either demat or trading)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Two (both demat and trading)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Three (demat, trading, and bank)</span>
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