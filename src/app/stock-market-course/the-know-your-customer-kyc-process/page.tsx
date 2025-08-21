"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function KYCProcessPage() {
  const lessonData = {
    title: "The Know Your Customer (KYC) Process",
    description: "Understand the KYC process requirements for opening trading and demat accounts, and learn about the documents and procedures involved.",
    lessonSlug: "the-know-your-customer-kyc-process",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/kyc-process-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/kyc-process-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/kyc-process-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/kyc-process-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/kyc-process-mr.m4a"
    },
    transcript: {
      en: "The KYC Process: Understand the KYC process requirements for opening trading and demat accounts, and learn about the documents and procedures involved in investor verification.",
      hi: "KYC प्रक्रिया: ट्रेडिंग और डीमैट खाते खोलने के लिए KYC प्रक्रिया की आवश्यकताओं को समझें और निवेशक सत्यापन में शामिल दस्तावेजों और प्रक्रियाओं के बारे में जानें।",
      bn: "KYC প্রক্রিয়া: ট্রেডিং এবং ডিম্যাট অ্যাকাউন্ট খোলার জন্য KYC প্রক্রিয়ার প্রয়োজনীয়তা বুঝুন এবং বিনিয়োগকারী যাচাইকরণে জড়িত নথি এবং পদ্ধতি সম্পর্কে জানুন।",
      ta: "KYC செயல்முறை: வர்த்தக மற்றும் டீமேட் கணக்குகளைத் திறப்பதற்கான KYC செயல்முறைத் தேவைகளைப் புரிந்துகொண்டு, முதலீட்டாளர் சரிபார்ப்பில் உள்ள ஆவணங்கள் மற்றும் நடைமுறைகளைப் பற்றி அறிந்துகொள்ளுங்கள்.",
      mr: "KYC प्रक्रिया: ट्रेडिंग आणि डिमॅट खाते उघडण्यासाठी KYC प्रक्रियेच्या आवश्यकता समजून घ्या आणि गुंतवणूकदार पडताळणीमध्ये समाविष्ट असलेले कागदपत्रे आणि कार्यपद्धती जाणून घ्या."
    },
    parts: [
      {
        id: 'introduction',
        title: 'Understanding KYC',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Understand the KYC process requirements for opening trading and demat accounts, and learn about the documents and procedures involved.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is KYC?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Know Your Customer (KYC)</strong> is a mandatory process used by financial institutions to verify the identity of their clients. It's like showing your ID when opening a bank account, but more comprehensive.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                KYC helps prevent money laundering, fraud, and terrorist financing. For stock market investors, completing KYC is essential before you can start trading.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  🔒 KYC = Your Financial Identity Verification
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Why KYC is Important</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Prevents financial fraud</li>
                  <li>• Ensures regulatory compliance</li>
                  <li>• Protects your investments</li>
                  <li>• Mandatory by law in India</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">KYC is Required For</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Opening demat account</li>
                  <li>• Trading account</li>
                  <li>• Mutual fund investments</li>
                  <li>• IPO applications</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'documents-required',
        title: 'Documents Required for KYC',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                KYC Documentation Checklist
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You need to provide three types of documents: Identity proof, Address proof, and Income proof. Having these ready will make the process smooth and quick.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">📋 Identity Proof (Any One)</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✅ Aadhaar Card</p>
                    <p className="text-blue-700 text-sm">Most commonly accepted</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✅ PAN Card</p>
                    <p className="text-blue-700 text-sm">Mandatory for trading</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✅ Passport</p>
                    <p className="text-blue-700 text-sm">Valid government ID</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✅ Voter ID</p>
                    <p className="text-blue-700 text-sm">Government issued photo ID</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✅ Driving License</p>
                    <p className="text-blue-700 text-sm">Valid photo identification</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-blue-800 font-medium">✅ NREGA Job Card</p>
                    <p className="text-blue-700 text-sm">With photo</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">🏠 Address Proof (Any One)</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✅ Aadhaar Card</p>
                    <p className="text-green-700 text-sm">Shows current address</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✅ Utility Bills</p>
                    <p className="text-green-700 text-sm">Electricity, water, gas (recent)</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✅ Bank Statement</p>
                    <p className="text-green-700 text-sm">Last 3 months</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✅ Rent Agreement</p>
                    <p className="text-green-700 text-sm">Registered lease deed</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✅ Passport</p>
                    <p className="text-green-700 text-sm">If address mentioned</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-green-800 font-medium">✅ Telephone Bill</p>
                    <p className="text-green-700 text-sm">Landline (recent)</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">💰 Income Proof (Any One)</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">✅ Salary Slips</p>
                    <p className="text-purple-700 text-sm">Last 3 months</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">✅ IT Returns</p>
                    <p className="text-purple-700 text-sm">Last 2 years with computation</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">✅ Bank Statement</p>
                    <p className="text-purple-700 text-sm">6 months showing salary credits</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">✅ Form 16</p>
                    <p className="text-purple-700 text-sm">Salary certificate from employer</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">✅ Net Worth Certificate</p>
                    <p className="text-purple-700 text-sm">From chartered accountant</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-purple-800 font-medium">✅ Business Proof</p>
                    <p className="text-purple-700 text-sm">Registration, license, etc.</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">📝 Additional Requirements</h4>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• Recent passport-size photograph</li>
                  <li>• Cancelled cheque or bank statement for bank details</li>
                  <li>• Signature specimen</li>
                  <li>• All documents should be self-attested copies</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'kyc-process',
        title: 'KYC Process Steps',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Complete KYC Process
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The KYC process has become much simpler with technology. Here's the step-by-step process:
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-center">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-blue-800">Choose Your Method</h4>
                  <p className="text-blue-700 text-sm">Online/Digital KYC or In-Person KYC</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-green-800">Submit Application</h4>
                  <p className="text-green-700 text-sm">Fill KYC form with personal and financial details</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex items-center">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-purple-800">Document Upload/Submission</h4>
                  <p className="text-purple-700 text-sm">Provide identity, address, and income proofs</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex items-center">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-orange-800">Verification</h4>
                  <p className="text-orange-700 text-sm">Documents verified, sometimes in-person visit required</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-center">
                <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-red-800">Approval & Account Activation</h4>
                  <p className="text-red-700 text-sm">KYC approved, trading and demat accounts activated</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">💻 Digital KYC (eKYC)</h4>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>✅ Faster process (same day approval)</li>
                  <li>✅ Aadhaar-based verification</li>
                  <li>✅ No physical documents needed</li>
                  <li>✅ Video calling for verification</li>
                  <li>✅ Paperless and convenient</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">📄 Physical KYC</h4>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• Visit branch/office in person</li>
                  <li>• Submit physical documents</li>
                  <li>• Takes 3-7 working days</li>
                  <li>• More traditional approach</li>
                  <li>• Required if eKYC fails</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">⚡ Pro Tips for Quick KYC</h4>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Keep all documents ready before starting</li>
                <li>• Ensure Aadhaar is linked to mobile number</li>
                <li>• Use clear, high-quality document scans</li>
                <li>• Complete process in one sitting</li>
                <li>• Have good internet connection for video KYC</li>
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
                KYC Process Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of the KYC process!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What does KYC stand for?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Keep Your Cash</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Know Your Customer</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>Keep Your Capital</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which document is mandatory for stock trading in India?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Driving License</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>PAN Card</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Passport</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What is the main advantage of eKYC over physical KYC?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>It's more secure</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>It's faster and paperless</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>It's cheaper</span>
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