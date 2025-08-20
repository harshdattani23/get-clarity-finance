"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function BondsAndFixedIncomePage() {
  const lessonData = {
    title: "Bonds and Fixed Income Securities",
    description: "Understand the world of bonds and fixed income investments, which provide stability and regular income to portfolios.",
    lessonSlug: "bonds-and-fixed-income",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of bonds and fixed income securities! In this lesson, we'll explore how bonds work, the different types available, and how they can provide stability and regular income to your investment portfolio. You'll learn about bond pricing, risks, and benefits to make informed investment decisions.",
      hi: "बॉन्ड्स और fixed income securities की दुनिया में आपका स्वागत है! इस पाठ में, हम देखेंगे कि बॉन्ड्स कैसे काम करते हैं, उपलब्ध विभिन्न प्रकार, और वे आपके निवेश portfolio को stability और regular income कैसे प्रदान कर सकते हैं। आप बॉन्ड pricing, risks, और benefits के बारे में जानेंगे ताकि सूचित निवेश निर्णय ले सकें।",
      bn: "বন্ড এবং fixed income securities এর জগতে স্বাগতম! এই পাঠে, আমরা দেখব বন্ডগুলি কীভাবে কাজ করে, উপলব্ধ বিভিন্ন ধরন, এবং সেগুলি কীভাবে আপনার বিনিয়োগ portfolio কে stability এবং regular income প্রদান করতে পারে। আপনি বন্ড pricing, risks, এবং benefits সম্পর্কে জানবেন যাতে সচেতন বিনিয়োগের সিদ্ধান্ত নিতে পারেন।",
      mr: "बॉन्ड्स आणि fixed income securities च्या जगात आपले स्वागत आहे! या धड्यात, आपण पाहू की बॉन्ड्स कसे काम करतात, उपलब्ध विविध प्रकार, आणि ते तुमच्या गुंतवणुकीच्या portfolio ला stability आणि regular income कसे देऊ शकतात. तुम्ही बॉन्ड pricing, risks, आणि benefits बद्दल जाणू जेणेकरून सूचित गुंतवणुकीचे निर्णय घेता येतील.",
      gu: "બોન્ડ્સ અને fixed income securities ની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, આપણે જોઈશું કે બોન્ડ્સ કેવી રીતે કામ કરે છે, ઉપલબ્ધ વિવિધ પ્રકારો, અને તેઓ તમારા રોકાણના portfolio ને stability અને regular income કેવી રીતે આપી શકે છે. તમે બોન્ડ pricing, risks, અને benefits વિશે જાણશો જેથી સૂચિત રોકાણના નિર્ણયો લઈ શકો.",
      ta: "பத்திரங்கள் மற்றும் fixed income securities உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், பத்திரங்கள் எப்படி வேலை செய்கின்றன, கிடைக்கக்கூடிய பல்வேறு வகைகள், மேலும் அவை உங்கள் முதலீட்டு portfolio-க்கு stability மற்றும் regular income எப்படி வழங்க முடியும் என்பதை ஆராய்வோம். பத்திர pricing, risks, மற்றும் benefits பற்றி நீங்கள் அறிவீர்கள், இதனால் தகவலறிந்த முதலீட்டு முடிவுகளை எடுக்க முடியும்."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                The Foundation of Stable Investing
              </h3>
              <p className="text-blue-700">
                Bonds are debt securities that provide regular income and are generally considered safer than stocks. They're essential for building a balanced investment portfolio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• How bonds work and their structure</li>
                  <li>• Different types of bonds</li>
                  <li>• Bond pricing and interest rates</li>
                  <li>• Risks and benefits</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-3">Key Benefits</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Regular income payments</li>
                  <li>• Portfolio stability</li>
                  <li>• Capital preservation</li>
                  <li>• Diversification benefits</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Quick Knowledge Check",
        isRequired: true,
        type: 'quiz' as const,
        minScore: 70,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Test Your Understanding
              </h3>
              <p className="text-purple-700 mb-4">
                Let's see how much you already know about bonds and fixed income securities!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is a bond?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) A type of stock</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) A loan from an investor to a borrower</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) A type of cryptocurrency</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) A real estate investment</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What happens to bond prices when interest rates rise?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Bond prices rise</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Bond prices fall</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Bond prices stay the same</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Bond prices become unpredictable</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "what-are-bonds",
        title: "What are Bonds?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Understanding the Basics
              </h3>
              <p className="text-green-700">
                A bond is a loan that an investor makes to a borrower (government, municipality, or corporation). In return, the borrower promises to pay interest and return the principal amount at maturity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">How Bonds Work</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Investor:</strong> Lends money to borrower</p>
                  <p>• <strong>Borrower:</strong> Government, company, or municipality</p>
                  <p>• <strong>Interest:</strong> Regular payments (coupon)</p>
                  <p>• <strong>Principal:</strong> Returned at maturity</p>
                  <p>• <strong>Maturity:</strong> When bond expires</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Bond Structure</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Face Value:</strong> Amount repaid at maturity</p>
                  <p>• <strong>Coupon Rate:</strong> Annual interest rate</p>
                  <p>• <strong>Maturity Date:</strong> When principal is repaid</p>
                  <p>• <strong>Issuer:</strong> Entity borrowing money</p>
                  <p>• <strong>Yield:</strong> Actual return on investment</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Bond Example</h4>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Face Value</p>
                    <p className="text-lg font-bold text-blue-800">₹10,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Coupon Rate</p>
                    <p className="text-lg font-bold text-blue-800">5%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Annual Interest</p>
                    <p className="text-lg font-bold text-blue-800">₹500</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  This bond pays ₹500 annually and returns ₹10,000 at maturity
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "types-of-bonds",
        title: "Types of Bonds",
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Different Categories for Different Needs
              </h3>
              <p className="text-purple-700">
                There are several types of bonds, each with different risk levels, yields, and characteristics. Understanding these differences helps you choose the right bonds for your portfolio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Government Bonds</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Issuer:</strong> National governments</p>
                  <p>• <strong>Examples:</strong> Indian Government Securities, US Treasury Bonds</p>
                  <p>• <strong>Risk Level:</strong> Lowest (backed by government)</p>
                  <p>• <strong>Yield:</strong> Generally lower than corporate bonds</p>
                  <p>• <strong>Use Case:</strong> Capital preservation, safety</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Corporate Bonds</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Issuer:</strong> Corporations and companies</p>
                  <p>• <strong>Examples:</strong> Company debt, business loans</p>
                  <p>• <strong>Risk Level:</strong> Higher than government bonds</p>
                  <p>• <strong>Yield:</strong> Higher yields to compensate for risk</p>
                  <p>• <strong>Use Case:</strong> Higher income, growth potential</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Municipal Bonds</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Issuer:</strong> Local governments and municipalities</p>
                  <p>• <strong>Examples:</strong> City bonds, school district bonds</p>
                  <p>• <strong>Risk Level:</strong> Low to moderate</p>
                  <p>• <strong>Yield:</strong> Often tax-advantaged</p>
                  <p>• <strong>Use Case:</strong> Tax benefits, local investment</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Treasury Bonds</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Issuer:</strong> Central government treasury</p>
                  <p>• <strong>Examples:</strong> Long-term government debt</p>
                  <p>• <strong>Risk Level:</strong> Very low</p>
                  <p>• <strong>Yield:</strong> Lower but very safe</p>
                  <p>• <strong>Use Case:</strong> Long-term safety, retirement</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Risk vs. Yield Comparison</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">🟢</div>
                  <p className="font-medium text-gray-800">Government</p>
                  <p className="text-sm text-gray-600">Low Risk, Low Yield</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">🟡</div>
                  <p className="font-medium text-gray-800">Municipal</p>
                  <p className="text-sm text-gray-600">Low-Med Risk, Med Yield</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">🟠</div>
                  <p className="font-medium text-gray-800">Corporate</p>
                  <p className="text-sm text-gray-600">Med-High Risk, High Yield</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">🔴</div>
                  <p className="font-medium text-gray-800">High-Yield</p>
                  <p className="text-sm text-gray-600">High Risk, Very High Yield</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "bond-pricing",
        title: "How Bond Prices Work",
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                The Inverse Relationship
              </h3>
              <p className="text-yellow-700">
                Bond prices move inversely to interest rates. This fundamental relationship is crucial for understanding bond investing and market dynamics.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">The Basic Rule</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>When Interest Rates Rise:</strong> Bond prices fall</p>
                  <p>• <strong>When Interest Rates Fall:</strong> Bond prices rise</p>
                  <p>• <strong>Why This Happens:</strong> Existing bonds become less attractive</p>
                  <p>• <strong>Market Impact:</strong> New bonds offer better rates</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Example Scenario</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Initial Bond:</strong> 5% coupon, ₹10,000 face value</p>
                  <p>• <strong>Market Rates Rise:</strong> New bonds offer 7%</p>
                  <p>• <strong>Old Bond Value:</strong> Falls below ₹10,000</p>
                  <p>• <strong>Reason:</strong> 5% return less attractive than 7%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-3">Interest Rate Risk Illustration</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <p className="font-medium text-red-800">Rates Rise</p>
                  <p className="text-sm text-red-600">Bond prices fall</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                  <div className="text-2xl mb-2">📉</div>
                  <p className="font-medium text-green-800">Rates Fall</p>
                  <p className="text-sm text-green-600">Bond prices rise</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                  <div className="text-2xl mb-2">⚖️</div>
                  <p className="font-medium text-blue-800">Rates Stable</p>
                  <p className="text-sm text-blue-600">Prices remain stable</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "risks-benefits",
        title: "Risks and Benefits",
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Understanding the Trade-offs
              </h3>
              <p className="text-orange-700">
                Like all investments, bonds come with both risks and benefits. Understanding these can help you make informed decisions about including bonds in your portfolio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">Benefits of Bonds</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Regular Income</h5>
                    <p className="text-green-700 text-sm">Predictable interest payments</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Portfolio Stability</h5>
                    <p className="text-green-700 text-sm">Generally more stable than stocks</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Diversification</h5>
                    <p className="text-green-700 text-sm">Helps balance portfolio risk</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Capital Preservation</h5>
                    <p className="text-green-700 text-sm">Return of principal at maturity</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-4">Risks of Bonds</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Interest Rate Risk</h5>
                    <p className="text-red-700 text-sm">Prices fall when rates rise</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Credit Risk</h5>
                    <p className="text-red-700 text-sm">Issuer may default on payments</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Inflation Risk</h5>
                    <p className="text-red-700 text-sm">Purchasing power may decline</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Liquidity Risk</h5>
                    <p className="text-red-700 text-sm">May be difficult to sell quickly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "interactive-selection",
        title: "Interactive Selection",
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Match the Bond Type with its Characteristic
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each bond type with its key characteristic.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Bond Types:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Government Bond</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Corporate Bond</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Municipal Bond</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Treasury Bond</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Characteristics:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Lowest risk, government backed</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Higher yield, company issued</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Local government, often tax-free</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Long-term, very safe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "short-questions",
        title: "Deep Understanding Check",
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                Test Your Deep Knowledge
              </h3>
              <p className="text-indigo-700 mb-6">
                Answer these questions to check your understanding of bonds and fixed income securities.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Why do bond prices fall when interest rates rise?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the main differences between government and corporate bonds?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How can bonds help diversify an investment portfolio?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "key-takeaways",
        title: "Key Takeaways",
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                What You've Learned
              </h3>
              <p className="text-green-700">
                Congratulations! You've completed the introduction to bonds and fixed income securities. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Bond Basics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Bonds are loans from investors to borrowers</li>
                  <li>✅ They provide regular interest income</li>
                  <li>✅ Principal is returned at maturity</li>
                  <li>✅ Face value, coupon rate, and maturity date</li>
                  <li>✅ Yield reflects actual return on investment</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Investment Strategy</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Government bonds: Lowest risk, lowest yield</li>
                  <li>✅ Corporate bonds: Higher risk, higher yield</li>
                  <li>✅ Municipal bonds: Tax advantages</li>
                  <li>✅ Bond prices move inversely to interest rates</li>
                  <li>✅ Bonds provide portfolio stability and income</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Next Steps</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📚</span>
                  </div>
                  <p className="text-blue-700 text-sm">Research bond options</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">⚖️</span>
                  </div>
                  <p className="text-blue-700 text-sm">Assess risk tolerance</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">💼</span>
                  </div>
                  <p className="text-blue-700 text-sm">Start with government bonds</p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]
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
            title="Bonds and Fixed Income Securities - Audio Summary"
            description="Listen to a comprehensive audio summary of bonds and fixed income securities, available in multiple languages."
            hindiAudioUrl="gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-hi.m4a"
            englishAudioUrl="gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-en.m4a"
            bengaliAudioUrl="gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-bn.m4a"
            marathiAudioUrl="gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-mr.m4a"
            gujaratiAudioUrl="gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-gu.m4a"
            tamilAudioUrl="gs://getclarity-audio-bucket/lessons/specialized-topics/bonds-and-fixed-income-ta.m4a"
            hindiTranscript={lessonData.transcript.hi}
            englishTranscript={lessonData.transcript.en}
            bengaliTranscript={lessonData.transcript.bn}
            marathiTranscript={lessonData.transcript.mr}
            gujaratiTranscript={lessonData.transcript.gu}
            tamilTranscript={lessonData.transcript.ta}
          />
        </div>
        
        <MultiPartLesson 
          parts={lessonData.parts}
          onComplete={(totalScore: number) => console.log('Lesson completed with score:', totalScore)}
          onPartComplete={(partId: string, score: number) => console.log('Part completed:', partId, 'Score:', score)}
        />
      </div>
    </div>
  );
}
