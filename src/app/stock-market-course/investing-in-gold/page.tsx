"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function InvestingInGoldPage() {
  const lessonData = {
    title: "Investing in Gold",
    description: "Discover why gold has been a trusted investment for centuries and learn the various ways to invest in gold in the Indian market.",
    lessonSlug: "investing-in-gold",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/foundational/investing-in-gold-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/foundational/investing-in-gold-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/foundational/investing-in-gold-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/foundational/investing-in-gold-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/foundational/investing-in-gold-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/foundational/investing-in-gold-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of gold investing! In this lesson, we'll explore why gold has been a trusted investment for centuries and discover the various ways to invest in gold in the Indian market. You'll learn about the benefits of gold investment, different investment methods, factors affecting gold prices, and strategic approaches to gold investing.",
      hi: "सोने में निवेश की दुनिया में आपका स्वागत है! इस पाठ में, हम देखेंगे कि सोना सदियों से एक विश्वसनीय निवेश क्यों रहा है और भारतीय बाजार में सोने में निवेश के विभिन्न तरीकों की खोज करेंगे। आप सोने में निवेश के फायदों, विभिन्न निवेश विधियों, सोने की कीमतों को प्रभावित करने वाले कारकों, और सोने में निवेश के रणनीतिक दृष्टिकोण के बारे में जानेंगे।",
      bn: "সোনায় বিনিয়োগের জগতে স্বাগতম! এই পাঠে, আমরা দেখব কেন সোনা শতাব্দীর পর শতাব্দী ধরে একটি বিশ্বস্ত বিনিয়োগ হয়েছে এবং ভারতীয় বাজারে সোনায় বিনিয়োগের বিভিন্ন উপায় আবিষ্কার করব। আপনি সোনায় বিনিয়োগের সুবিধা, বিভিন্ন বিনিয়োগ পদ্ধতি, সোনার দামকে প্রভাবিত করে এমন কারণগুলি, এবং সোনায় বিনিয়োগের কৌশলগত দৃষ্টিভঙ্গি সম্পর্কে জানবেন।",
      mr: "सोन्यामध्ये गुंतवणूकीच्या जगात आपले स्वागत आहे! या धड्यात, आपण पाहू की सोने का शतकानुशतके विश्वसनीय गुंतवणूक का आहे आणि भारतीय बाजारात सोन्यामध्ये गुंतवणूक करण्याच्या विविध पद्धती शोधू. तुम्ही सोन्यामध्ये गुंतवणूकीचे फायदे, विविध गुंतवणૂक पद्धती, सोन्याच्या किंमतોને प्रभावित करणारे घटक, आणि सोन्यामध्ये गुंतवणूक करण्याचे रणनीतिक दृष्टिकोण याबद्दल जाणू.",
      gu: "સોનામાં ગુતવણૂકની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, આપણે જોઈશું કે સોનું શા માટે સદીઓથી એક વિશ્વસની ગુતવણૂક રહ્યું છે અને ભારતીય બજારમાં સોનામાં ગુતવણૂક કરવાની વિવિધ રીતો શોધીશું. તમે સોનામાં ગુતવણૂકના ફાયદા, વિવિધ ગુતવણૂક પદ્ધતિઓ, સોનાની કિંમતોને પ્રભાવિત કરતા પરિબળો, અને સોનામાં ગુતવણૂક કરવાના વ્યૂહાત્મક અભિગમો વિશે જાણશો.",
      ta: "தங்கத்தில் முதலீடு செய்யும் உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், தங்கம் ஏன் நூற்றாண்டுகளாக நம்பகமான முதலீடாக இருந்துள்ளது என்பதை ஆராய்வோம் மேலும் இந்திய சந்தையில் தங்கத்தில் முதலீடு செய்யும் பல்வேறு வழிகளைக் கண்டுபிடிப்போம். தங்க முதலீட்டின் நன்மைகள், வெவ்வேறு முதலீட்டு முறைகள், தங்க விலைகளை பாதிக்கும் காரணிகள், மேலும் தங்க முதலீட்டிற்கான உத்தியாளுமுறை அணுகுமுறைகள் பற்றி நீங்கள் கற்றுக்கொள்வீர்கள்."
    },
    parts: [
      {
        id: "introduction",
        title: "Why Invest in Gold?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Why Invest in Gold?
              </h3>
              <p className="text-blue-700">
                Gold has been considered a store of value for thousands of years. In India, gold holds cultural, religious, and financial significance. It's often seen as a hedge against inflation, currency fluctuations, and economic uncertainty.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Key Takeaway</h4>
              <p className="text-green-700">
                Gold serves as a portfolio diversifier and a hedge against inflation, making it an important asset class for Indian investors.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Benefits of gold investment</li>
                  <li>• Different ways to invest in gold</li>
                  <li>• Factors affecting gold prices</li>
                  <li>• Gold investment strategies</li>
                  <li>• Important considerations</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Why Gold Matters</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cultural and religious significance</li>
                  <li>• Hedge against inflation</li>
                  <li>• Portfolio diversification</li>
                  <li>• Safe haven asset</li>
                  <li>• Long-term store of value</li>
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
                Let's see how much you already know about gold investing!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is one of the main benefits of investing in gold?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Guaranteed returns</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Hedge against inflation</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) No risk involved</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Immediate liquidity</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which of the following is NOT a way to invest in gold?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Physical gold (jewelry, coins)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Gold ETFs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Sovereign Gold Bonds</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Stock market index funds</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "benefits",
        title: "Benefits of Gold Investment",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                Why Gold is Valuable
              </h3>
              <p className="text-yellow-700">
                Gold offers multiple benefits that make it an attractive investment option for both beginners and experienced investors.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">🛡️ Inflation Hedge</h4>
                <p className="text-yellow-800 text-sm">
                  Gold tends to maintain its purchasing power over time, protecting against inflation.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">📊 Portfolio Diversification</h4>
                <p className="text-blue-800 text-sm">
                  Gold often moves inversely to stocks, providing balance during market downturns.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">💱 Currency Hedge</h4>
                <p className="text-green-800 text-sm">
                  Protects against currency depreciation and global economic uncertainties.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">🌍 Global Acceptance</h4>
                <p className="text-purple-800 text-sm">
                  Gold is universally recognized and accepted as a form of payment worldwide.
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">📈 Long-term Growth</h4>
                <p className="text-orange-800 text-sm">
                  Historical data shows gold has appreciated over the long term despite short-term volatility.
                </p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-2">🎯 Cultural Significance</h4>
                <p className="text-indigo-800 text-sm">
                  In India, gold is deeply embedded in cultural and religious traditions.
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "investment-methods",
        title: "Ways to Invest in Gold",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Investment Options Available
              </h3>
              <p className="text-purple-700">
                There are several ways to invest in gold, each with its own advantages and disadvantages. Choose based on your investment goals and preferences.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">🥇</div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Physical Gold</h4>
                    <p className="text-gray-700 mb-4">
                      Traditional form of gold investment including jewelry, coins, and bars.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-2">✅ Advantages</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Tangible asset you can hold</li>
                          <li>• No counterparty risk</li>
                          <li>• Cultural and emotional value</li>
                          <li>• Can be used as jewelry</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-2">❌ Disadvantages</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Storage and security concerns</li>
                          <li>• Making charges on jewelry</li>
                          <li>• Purity verification needed</li>
                          <li>• Lower liquidity</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">📊</div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Gold ETFs (Exchange Traded Funds)</h4>
                    <p className="text-gray-700 mb-4">
                      Gold ETFs track the price of gold and trade on stock exchanges like regular stocks.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-2">✅ Advantages</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• High liquidity</li>
                          <li>• Lower expense ratio</li>
                          <li>• No storage concerns</li>
                          <li>• Can be traded anytime</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-2">❌ Disadvantages</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Requires demat account</li>
                          <li>• Trading costs</li>
                          <li>• No physical possession</li>
                          <li>• Market timing risk</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">🏛️</div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Sovereign Gold Bonds (SGBs)</h4>
                    <p className="text-gray-700 mb-4">
                      Government-issued bonds denominated in grams of gold, offering interest income along with gold price appreciation.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-2">✅ Advantages</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Government guarantee</li>
                          <li>• 2.5% annual interest</li>
                          <li>• Tax benefits on interest</li>
                          <li>• No storage costs</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-2">❌ Disadvantages</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• 8-year lock-in period</li>
                          <li>• Limited liquidity</li>
                          <li>• Available only during issue</li>
                          <li>• No physical delivery</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">🏦</div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Digital Gold</h4>
                    <p className="text-gray-700 mb-4">
                      Digital platforms that allow you to buy and sell gold in small quantities with the option to convert to physical gold.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-2">✅ Advantages</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Start with small amounts</li>
                          <li>• Easy to buy/sell</li>
                          <li>• Option for physical delivery</li>
                          <li>• No making charges</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <h5 className="font-semibold text-gray-900 mb-2">❌ Disadvantages</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Platform risk</li>
                          <li>• Higher premiums</li>
                          <li>• Limited platforms</li>
                          <li>• Conversion fees</li>
                        </ul>
                      </div>
                    </div>
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
        isRequired: true,
        type: 'selection' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Match the Gold Investment Method with its Key Feature
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each gold investment method with its most important characteristic.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Investment Methods:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Physical Gold</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Gold ETFs</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Sovereign Gold Bonds</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Digital Gold</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Key Features:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Tangible asset with cultural value</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">High liquidity and easy trading</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Government guarantee with interest</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Small amounts with digital convenience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "factors",
        title: "Factors Affecting Gold Prices",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                Understanding Price Movements
              </h3>
              <p className="text-indigo-700">
                Gold prices are influenced by various global and local factors. Understanding these can help you make better investment decisions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🌍 Global Factors</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• US Dollar strength</li>
                    <li>• Global economic conditions</li>
                    <li>• Central bank policies</li>
                    <li>• Geopolitical tensions</li>
                    <li>• Oil prices</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🇮🇳 Indian Factors</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Rupee-Dollar exchange rate</li>
                    <li>• Domestic demand (festivals)</li>
                    <li>• Import duties and taxes</li>
                    <li>• RBI gold reserves</li>
                    <li>• Seasonal patterns</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">How These Factors Work</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Dollar-Gold Relationship</h5>
                  <p className="text-blue-600 text-sm">When dollar weakens, gold typically strengthens as investors seek safe haven</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Economic Uncertainty</h5>
                  <p className="text-blue-600 text-sm">During crises, gold demand increases as a safe investment option</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Central Bank Actions</h5>
                  <p className="text-blue-600 text-sm">Interest rate changes affect gold's attractiveness vs. interest-bearing assets</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Cultural Demand</h5>
                  <p className="text-blue-600 text-sm">Indian festivals and wedding seasons create seasonal demand patterns</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "strategies",
        title: "Gold Investment Strategies",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Strategic Approaches
              </h3>
              <p className="text-green-700">
                Different strategies work for different investors. Choose based on your goals, time horizon, and risk tolerance.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">📈 Long-term Investment</h4>
                <p className="text-gray-700 text-sm">
                  Buy and hold gold for 5-10 years to benefit from long-term appreciation and inflation protection.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">⚖️ Portfolio Allocation</h4>
                <p className="text-gray-700 text-sm">
                  Allocate 5-15% of your portfolio to gold for diversification and risk management.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">🔄 Systematic Investment</h4>
                <p className="text-gray-700 text-sm">
                  Invest small amounts regularly in gold ETFs or digital gold to average out price fluctuations.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">🎯 Tactical Allocation</h4>
                <p className="text-gray-700 text-sm">
                  Increase gold allocation during economic uncertainty or market stress for protection.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Strategy Selection Guide</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Conservative Investors</h5>
                  <p className="text-yellow-600 text-sm">Focus on long-term holding and portfolio allocation (5-10%)</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Active Investors</h5>
                  <p className="text-yellow-600 text-sm">Use tactical allocation and systematic investment approaches</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Beginners</h5>
                  <p className="text-yellow-600 text-sm">Start with systematic investment in gold ETFs or digital gold</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Experienced Investors</h5>
                  <p className="text-yellow-600 text-sm">Combine multiple strategies based on market conditions</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "short-questions",
        title: "Deep Understanding Check",
        isRequired: true,
        type: 'short-answer' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                Test Your Deep Knowledge
              </h3>
              <p className="text-indigo-700 mb-6">
                Answer these questions to check your understanding of gold investing.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. How does gold act as an inflation hedge?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the main differences between physical gold and gold ETFs?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. Why is the US Dollar strength important for gold prices?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
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
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                What You've Learned
              </h3>
              <p className="text-green-700">
                Congratulations! You've completed the lesson on investing in gold. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Gold Investment Basics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Gold serves as inflation hedge and portfolio diversifier</li>
                  <li>✅ Multiple investment methods available (physical, ETFs, SGBs, digital)</li>
                  <li>✅ Cultural and religious significance in India</li>
                  <li>✅ Safe haven asset during economic uncertainty</li>
                  <li>✅ Long-term store of value</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Investment Strategies</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Long-term holding for appreciation</li>
                  <li>✅ Portfolio allocation (5-15%)</li>
                  <li>✅ Systematic investment approach</li>
                  <li>✅ Tactical allocation during uncertainty</li>
                  <li>✅ Consider goals and risk tolerance</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Important Considerations</h4>
                  <p className="text-yellow-800">
                    Gold should be part of a diversified investment strategy, not your entire portfolio. Consider your investment goals, time horizon, and risk tolerance when deciding how much to allocate to gold.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Next Steps</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📚</span>
                  </div>
                  <p className="text-blue-700 text-sm">Research methods</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">💼</span>
                  </div>
                  <p className="text-blue-700 text-sm">Start small</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Monitor prices</p>
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
            title={lessonData.title}
            description={lessonData.description}
            hindiAudioUrl={lessonData.audioFiles.hi}
            englishAudioUrl={lessonData.audioFiles.en}
            bengaliAudioUrl={lessonData.audioFiles.bn}
            marathiAudioUrl={lessonData.audioFiles.mr}
            gujaratiAudioUrl={lessonData.audioFiles.gu}
            tamilAudioUrl={lessonData.audioFiles.ta}
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
