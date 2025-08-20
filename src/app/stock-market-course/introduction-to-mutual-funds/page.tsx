"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function IntroductionToMutualFundsPage() {
  const lessonData = {
    title: "Introduction to Mutual Funds",
    description: "Learn how mutual funds work, their benefits, and how they can help you build wealth through professional money management.",
    lessonSlug: "introduction-to-mutual-funds",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-mutual-funds-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-mutual-funds-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-mutual-funds-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-mutual-funds-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-mutual-funds-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-mutual-funds-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of mutual funds! In this lesson, we'll explore how mutual funds work, their benefits, and how they can help you build wealth through professional money management. You'll learn about different types of mutual funds, key terms, and important considerations before investing.",
      hi: "म्यूचुअल फंड की दुनिया में आपका स्वागत है! इस पाठ में, हम देखेंगे कि म्यूचुअल फंड कैसे काम करते हैं, उनके फायदे, और वे कैसे professional money management के माध्यम से आपकी wealth बनाने में मदद कर सकते हैं। आप विभिन्न प्रकार के म्यूचुअल फंड, key terms, और निवेश से पहले महत्वपूर्ण considerations के बारे में जानेंगे।",
      bn: "মিউচুয়াল ফান্ডের জগতে স্বাগতম! এই পাঠে, আমরা দেখব কিভাবে মিউচুয়াল ফান্ড কাজ করে, তাদের সুবিধা, এবং তারা কিভাবে professional money management এর মাধ্যমে আপনার wealth গড়তে সাহায্য করতে পারে। আপনি বিভিন্ন ধরনের মিউচুয়াল ফান্ড, key terms, এবং বিনিয়োগের আগে গুরুত্বপূর্ণ considerations সম্পর্কে জানবেন।",
      mr: "म्युच्युअल फंडांच्या जगात आपले स्वागत आहे! या धड्यात, आपण पाहू की म्युच्युअल फंड कसे काम करतात, त्यांचे फायदे, आणि ते कसे professional money management द्वारे आपल्या wealth बनवण्यास मदत करू शकतात. तुम्ही विविध प्रकारच्या म्युच्युअल फंड, key terms, आणि गुंतवणूक करण्यापूर्वी महत्वाच्या considerations बद्दल जाणू.",
      gu: "મ્યુચ્યુઅલ ફંડની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, આપણે જોઈશું કે મ્યુચ્યુઅલ ફંડ કેવી રીતે કામ કરે છે, તેમના ફાયદા, અને તેઓ કેવી રીતે professional money management દ્વારા તમારી wealth બનાવવામાં મદદ કરી શકે છે. તમે વિવિધ પ્રકારના મ્યુચ્યુઅલ ફંડ, key terms, અને ગુતવણૂક કરતા પહેલા મહત્વપૂર્ણ considerations વિશે જાણશો.",
      ta: "மியூச்சுவல் ஃபண்டுகளின் உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், மியூச்சுவல் ஃபண்டுகள் எப்படி வேலை செய்கின்றன, அவற்றின் நன்மைகள், மேலும் அவை professional money management மூலம் உங்கள் wealth கட்டியெழுப்ப எப்படி உதவ முடியும் என்பதை ஆராய்வோம். பல்வேறு வகையான மியூச்சுவல் ஃபண்டுகள், key terms, மேலும் முதலீடு செய்வதற்கு முன் முக்கியமான considerations பற்றி நீங்கள் கற்றுக்கொள்வீர்கள்."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Mutual Funds",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                What are Mutual Funds?
              </h3>
              <p className="text-blue-700">
                A mutual fund is a type of investment vehicle that pools money from multiple investors to invest in a diversified portfolio of stocks, bonds, money market instruments, and other securities. It's managed by professional fund managers who make investment decisions on behalf of the investors.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Key Takeaway</h4>
              <p className="text-green-700">
                Mutual funds offer individual investors access to professionally managed, diversified portfolios that would be difficult to create on their own.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• How mutual funds work</li>
                  <li>• Benefits and advantages</li>
                  <li>• Types by asset class</li>
                  <li>• Key terms and concepts</li>
                  <li>• Important considerations</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Why Mutual Funds?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Professional management</li>
                  <li>• Diversification benefits</li>
                  <li>• Low minimum investment</li>
                  <li>• Regulatory oversight</li>
                  <li>• Systematic investing options</li>
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
                Let's see how much you already know about mutual funds!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the main advantage of mutual funds for individual investors?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Guaranteed returns</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Professional management and diversification</span>
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
                  <p className="font-medium mb-3">2. What does NAV stand for in mutual funds?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Net Asset Value</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) New Asset Valuation</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Net Annual Value</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) National Asset Value</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "how-mutual-funds-work",
        title: "How Mutual Funds Work",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                The Three-Step Process
              </h3>
              <p className="text-green-700">
                Mutual funds operate through a simple but effective three-step process that makes professional investing accessible to everyone.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">1. Pooling</h4>
                <p className="text-gray-700 text-sm">
                  Multiple investors contribute money to create a large investment pool.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">2. Professional Management</h4>
                <p className="text-gray-700 text-sm">
                  Expert fund managers invest the pooled money according to the fund's objectives.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">3. Diversification</h4>
                <p className="text-gray-700 text-sm">
                  Money is spread across various securities to reduce risk.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Why This Process Works</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Economies of Scale</h5>
                  <p className="text-blue-600 text-sm">Large pools can access better investment opportunities and lower costs</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Expert Knowledge</h5>
                  <p className="text-blue-600 text-sm">Professional managers have research teams and market insights</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Risk Management</h5>
                  <p className="text-blue-600 text-sm">Diversification reduces the impact of individual security failures</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Regulatory Protection</h5>
                  <p className="text-blue-600 text-sm">SEBI oversight ensures transparency and investor protection</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "benefits",
        title: "Benefits of Mutual Funds",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Why Choose Mutual Funds?
              </h3>
              <p className="text-orange-700">
                Mutual funds offer several advantages that make them an attractive investment option for both beginners and experienced investors.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">🎯 Diversification</h4>
                <p className="text-green-700 text-sm">
                  Spread your risk across multiple securities, reducing the impact of any single investment's poor performance.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">👨‍💼 Professional Management</h4>
                <p className="text-blue-700 text-sm">
                  Experienced fund managers with expertise in market analysis and investment strategies manage your money.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">💰 Affordability</h4>
                <p className="text-purple-700 text-sm">
                  Start investing with small amounts (as low as ₹500) and benefit from economies of scale.
                </p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-800 mb-2">📊 Liquidity</h4>
                <p className="text-indigo-700 text-sm">
                  Easy to buy and sell mutual fund units, providing flexibility for your investment needs.
                </p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-pink-800 mb-2">📈 Systematic Investing</h4>
                <p className="text-pink-700 text-sm">
                  Invest regularly through SIPs to benefit from rupee cost averaging and compound growth.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">🏛️ Regulatory Oversight</h4>
                <p className="text-yellow-700 text-sm">
                  SEBI-regulated investment vehicles with transparent operations and regular reporting.
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "types",
        title: "Types of Mutual Funds by Asset Class",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Understanding Fund Categories
              </h3>
              <p className="text-purple-700">
                Mutual funds are categorized based on the type of securities they invest in, helping you choose based on your risk tolerance and investment goals.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">📈</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Equity Funds</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Invest primarily in stocks. Higher risk but potential for higher returns over the long term.
                    </p>
                    <div className="text-xs text-gray-500">
                      Examples: Large Cap, Mid Cap, Small Cap, Multi Cap, Sectoral Funds
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💰</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Debt Funds</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Invest in fixed-income securities like bonds, government securities, and corporate debt.
                    </p>
                    <div className="text-xs text-gray-500">
                      Examples: Liquid Funds, Ultra Short Term, Short Term, Long Term Debt Funds
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">⚖️</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Hybrid Funds</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Invest in a mix of equity and debt instruments to balance risk and return.
                    </p>
                    <div className="text-xs text-gray-500">
                      Examples: Balanced Funds, Conservative Hybrid, Equity Savings Funds
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">🌍</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">International Funds</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Invest in securities of companies listed outside India for geographical diversification.
                    </p>
                    <div className="text-xs text-gray-500">
                      Examples: US Equity Funds, Global Funds, Regional Funds
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
                Match the Fund Type with its Description
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each mutual fund type with its correct description.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Fund Types:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Equity Fund</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Debt Fund</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Hybrid Fund</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">International Fund</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Descriptions:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Invests primarily in stocks for higher returns</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Invests in bonds and fixed-income securities</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Balances equity and debt investments</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Invests in foreign markets for diversification</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "key-terms",
        title: "Key Mutual Fund Terms",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                Essential Terms to Know
              </h3>
              <p className="text-indigo-700">
                Understanding these key terms will help you make informed decisions when investing in mutual funds.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">NAV (Net Asset Value)</h4>
                  <p className="text-gray-700 text-sm">The price per unit of a mutual fund, calculated daily based on the fund's total assets minus liabilities.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Expense Ratio</h4>
                  <p className="text-gray-700 text-sm">The annual fee charged by the fund house to manage the fund, expressed as a percentage of assets.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Entry Load</h4>
                  <p className="text-gray-700 text-sm">A fee charged when you invest in a fund (currently banned in India by SEBI).</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Exit Load</h4>
                  <p className="text-gray-700 text-sm">A fee charged when you withdraw from a fund before a specified period (usually 1 year).</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">SIP (Systematic Investment Plan)</h4>
                  <p className="text-gray-700 text-sm">A method of investing a fixed amount regularly (monthly/quarterly) in a mutual fund.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Lump Sum</h4>
                  <p className="text-gray-700 text-sm">Investing a large amount at once instead of regular small investments.</p>
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
                Answer these questions to check your understanding of mutual funds.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. How does pooling money benefit individual investors in mutual funds?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the main differences between equity funds and debt funds?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. Why is the expense ratio important when choosing a mutual fund?</p>
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
                Congratulations! You've completed the introduction to mutual funds. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Mutual Fund Basics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Mutual funds pool money from multiple investors</li>
                  <li>✅ Professional fund managers make investment decisions</li>
                  <li>✅ Funds invest in diversified portfolios of securities</li>
                  <li>✅ NAV represents the price per unit</li>
                  <li>✅ SEBI regulates all mutual funds in India</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Investment Benefits</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Professional management expertise</li>
                  <li>✅ Built-in diversification</li>
                  <li>✅ Low minimum investment amounts</li>
                  <li>✅ Systematic investment options (SIP)</li>
                  <li>✅ High liquidity and transparency</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Important Note</h4>
                  <p className="text-yellow-800">
                    Past performance doesn't guarantee future returns. Always read the fund's offer document, understand the investment objective, and consider your risk tolerance before investing.
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
                  <p className="text-blue-700 text-sm">Research fund types</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">💼</span>
                  </div>
                  <p className="text-blue-700 text-sm">Start with SIP</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Monitor performance</p>
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
