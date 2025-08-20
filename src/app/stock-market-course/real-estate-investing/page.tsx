"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function RealEstateInvestingPage() {
  const lessonData = {
    title: "Real Estate Investing (REITs)",
    description: "Learn how to invest in real estate through REITs and other real estate investment vehicles without buying physical property.",
    lessonSlug: "real-estate-investing",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/specialized-topics/real-estate-investing-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/specialized-topics/real-estate-investing-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/specialized-topics/real-estate-investing-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/specialized-topics/real-estate-investing-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/specialized-topics/real-estate-investing-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/specialized-topics/real-estate-investing-ta.m4a"
    },
    transcript: {
      en: "Welcome to real estate investing! In this lesson, we'll explore how to invest in real estate through REITs (Real Estate Investment Trusts) and other investment vehicles without the need to buy physical property. You'll learn about different types of REITs, their advantages and disadvantages, and how to incorporate them into your investment portfolio.",
      hi: "रियल एस्टेट निवेश में आपका स्वागत है! इस पाठ में, हम देखेंगे कि कैसे REITs (Real Estate Investment Trusts) और अन्य निवेश वाहनों के माध्यम से physical property खरीदे बिना रियल एस्टेट में निवेश किया जा सकता है। आप विभिन्न प्रकार के REITs, उनके फायदे और नुकसान, और उन्हें अपने निवेश portfolio में कैसे शामिल करना है, के बारे में जानेंगे।",
      bn: "রিয়েল এস্টেট বিনিয়োগে স্বাগতম! এই পাঠে, আমরা দেখব কিভাবে REITs (Real Estate Investment Trusts) এবং অন্যান্য বিনিয়োগের মাধ্যম দিয়ে physical property কেনা ছাড়াই রিয়েল এস্টেটে বিনিয়োগ করা যায়। আপনি বিভিন্ন ধরনের REITs, তাদের সুবিধা এবং অসুবিধা, এবং কীভাবে সেগুলিকে আপনার বিনিয়োগ portfolio-এ অন্তর্ভুক্ত করা যায়, সে সম্পর্কে জানবেন।",
      mr: "रिअल इस्टेट गुंतवणुकीमध्ये आपले स्वागत आहे! या धड्यात, आपण पाहू की कसे REITs (Real Estate Investment Trusts) आणि इतर गुंतवणुकीच्या साधनांद्वारे physical property खरेदी न करता रिअल इस्टेटमध्ये गुंतवणूक करता येते. तुम्ही विविध प्रकारच्या REITs, त्यांचे फायदे आणि तोटे, आणि त्यांना तुमच्या गुंतवणुकीच्या portfolio मध्ये कसे समाविष्ट करायचे, याबद्दल जाणू.",
      gu: "રિયલ એસ્ટેટ રોકાણમાં આપનું સ્વાગત છે! આ પાઠમાં, આપણે જોઈશું કે કેવી રીતે REITs (Real Estate Investment Trusts) અને અન્ય રોકાણના સાધનો દ્વારા physical property ખરીદ્યા વિના રિયલ એસ્ટેટમાં રોકાણ કરી શકાય છે. તમે વિવિધ પ્રકારના REITs, તેમના ફાયદા અને ગેરફાયદા, અને તેમને તમારા રોકાણના portfolio માં કેવી રીતે સમાવેશ કરવા, તે વિશે જાણશો.",
      ta: "ரியல் எஸ்டேட் முதலீட்டிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், physical property வாங்காமல் REITs (Real Estate Investment Trusts) மற்றும் பிற முதலீட்டு வழிகளின் மூலம் ரியல் எஸ்டேட்டில் எப்படி முதலீடு செய்வது என்பதை ஆராய்வோம். பல்வேறு வகையான REITs, அவற்றின் நன்மைகள் மற்றும் தீமைகள், மேலும் அவற்றை உங்கள் முதலீட்டு portfolio-இல் எப்படி சேர்ப்பது என்பதை நீங்கள் கற்றுக்கொள்வீர்கள்."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction",
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Real Estate Without the Hassle
              </h3>
              <p className="text-blue-700">
                Real estate investing doesn't always require buying physical property. REITs (Real Estate Investment Trusts) and other vehicles allow you to invest in real estate with the liquidity and diversification of stocks.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• What REITs are and how they work</li>
                  <li>• Different types of REITs</li>
                  <li>• Advantages and disadvantages</li>
                  <li>• How to invest in REITs</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-3">Key Benefits</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• No need to buy physical property</li>
                  <li>• High liquidity like stocks</li>
                  <li>• Professional management</li>
                  <li>• Regular dividend income</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Quick Knowledge Check",
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Test Your Understanding
              </h3>
              <p className="text-purple-700 mb-4">
                Let's see how much you already know about REITs and real estate investing!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What does REIT stand for?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Real Estate Investment Trust</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Real Estate Income Tax</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) Real Estate International Trade</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Real Estate Investment Tool</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which of the following is NOT a type of REIT?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Equity REITs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Mortgage REITs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Bond REITs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Hybrid REITs</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "what-are-reits",
        title: "What are REITs?",
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Understanding REITs
              </h3>
              <p className="text-green-700">
                REITs are companies that own, operate, or finance income-producing real estate. They pool money from multiple investors to purchase and manage real estate properties.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">How REITs Work</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Pooling:</strong> Multiple investors contribute money</p>
                  <p>• <strong>Acquisition:</strong> REIT buys income-producing properties</p>
                  <p>• <strong>Management:</strong> Professional team manages properties</p>
                  <p>• <strong>Income:</strong> Profits distributed as dividends</p>
                  <p>• <strong>Liquidity:</strong> Trade on stock exchanges like stocks</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">REIT Structure</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Structure:</strong> Like mutual funds but focused on real estate</p>
                  <p>• <strong>Regulation:</strong> Must distribute 90% of taxable income</p>
                  <p>• <strong>Taxation:</strong> Taxed at corporate level, not individual</p>
                  <p>• <strong>Ownership:</strong> Investors own shares, not properties</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Why Choose REITs?</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🏠</span>
                  </div>
                  <p className="text-blue-700 text-sm">Real Estate Exposure</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">💧</span>
                  </div>
                  <p className="text-blue-700 text-sm">High Liquidity</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">👥</span>
                  </div>
                  <p className="text-blue-700 text-sm">Professional Management</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "types-of-reits",
        title: "Types of REITs",
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Different Ways to Invest in Real Estate
              </h3>
              <p className="text-purple-700">
                There are several types of REITs, each with different investment strategies and risk profiles. Understanding these differences helps you choose the right REIT for your portfolio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Equity REITs</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Strategy:</strong> Own and operate income-producing properties</p>
                  <p>• <strong>Income Source:</strong> Rental income and property appreciation</p>
                  <p>• <strong>Examples:</strong> Shopping malls, office buildings, apartments</p>
                  <p>• <strong>Risk Level:</strong> Moderate to high</p>
                  <p>• <strong>Returns:</strong> Capital gains + rental income</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Mortgage REITs</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Strategy:</strong> Provide financing for real estate</p>
                  <p>• <strong>Income Source:</strong> Interest on mortgages</p>
                  <p>• <strong>Examples:</strong> Residential and commercial mortgages</p>
                  <p>• <strong>Risk Level:</strong> High (interest rate sensitive)</p>
                  <p>• <strong>Returns:</strong> Interest income</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Hybrid REITs</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Strategy:</strong> Combine equity and mortgage strategies</p>
                  <p>• <strong>Income Source:</strong> Mixed income streams</p>
                  <p>• <strong>Examples:</strong> Combination of property ownership and lending</p>
                  <p>• <strong>Risk Level:</strong> Moderate</p>
                  <p>• <strong>Returns:</strong> Balanced approach</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Property Types by REIT Category</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">🏢</div>
                  <p className="font-medium text-gray-800">Office</p>
                  <p className="text-sm text-gray-600">Corporate buildings</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">🛍️</div>
                  <p className="font-medium text-gray-800">Retail</p>
                  <p className="text-sm text-gray-600">Shopping centers</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">🏠</div>
                  <p className="font-medium text-gray-800">Residential</p>
                  <p className="text-sm text-gray-600">Apartments, homes</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">🏨</div>
                  <p className="font-medium text-gray-800">Hospitality</p>
                  <p className="text-sm text-gray-600">Hotels, resorts</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "advantages-disadvantages",
        title: "Advantages and Disadvantages",
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Weighing the Pros and Cons
              </h3>
              <p className="text-orange-700">
                Like all investments, REITs come with both advantages and disadvantages. Understanding these can help you make informed decisions about including REITs in your portfolio.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">Advantages</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">High Liquidity</h5>
                    <p className="text-green-700 text-sm">Can buy and sell like stocks</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Diversification</h5>
                    <p className="text-green-700 text-sm">Access to multiple properties and locations</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Regular Income</h5>
                    <p className="text-green-700 text-sm">Dividend payments from rental income</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Professional Management</h5>
                    <p className="text-green-700 text-sm">Experts handle property management</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Accessibility</h5>
                    <p className="text-green-700 text-sm">Small investment amounts possible</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-4">Disadvantages</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Market Volatility</h5>
                    <p className="text-red-700 text-sm">Can be volatile like stocks</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Interest Rate Sensitivity</h5>
                    <p className="text-red-700 text-sm">Prices fall when rates rise</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Market Risk</h5>
                    <p className="text-red-700 text-sm">Subject to economic downturns</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Management Fees</h5>
                    <p className="text-red-700 text-sm">Ongoing fees reduce returns</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Limited Control</h5>
                    <p className="text-red-700 text-sm">No say in property decisions</p>
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
                Match the REIT Type with its Description
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each REIT type with its correct description.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">REIT Types:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Equity REIT</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Mortgage REIT</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Hybrid REIT</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Public REIT</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Descriptions:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Owns and operates income-producing properties</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Provides financing through mortgages</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Combines equity and mortgage strategies</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Trades on stock exchanges</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "how-to-invest",
        title: "How to Invest in REITs",
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Getting Started with REITs
              </h3>
              <p className="text-blue-700">
                There are several ways to invest in REITs, each with different levels of accessibility, liquidity, and risk. Choose the method that best fits your investment goals and risk tolerance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Public REITs</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Access:</strong> Trade on major stock exchanges</p>
                  <p>• <strong>Liquidity:</strong> High - buy/sell anytime</p>
                  <p>• <strong>Minimum Investment:</strong> As little as one share</p>
                  <p>• <strong>Fees:</strong> Standard brokerage commissions</p>
                  <p>• <strong>Examples:</strong> VNQ, IYR, SCHH</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">REIT ETFs and Mutual Funds</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Access:</strong> Through brokerage accounts</p>
                  <p>• <strong>Liquidity:</strong> High - daily trading</p>
                  <p>• <strong>Minimum Investment:</strong> Varies by fund</p>
                  <p>• <strong>Fees:</strong> Expense ratios and commissions</p>
                  <p>• <strong>Benefits:</strong> Instant diversification</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Investment Considerations</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Before Investing</h5>
                  <ul className="space-y-1 text-yellow-600">
                    <li>• Research the REIT's portfolio</li>
                    <li>• Check dividend yield and history</li>
                    <li>• Understand the property types</li>
                    <li>• Review management team</li>
                    <li>• Consider market conditions</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Portfolio Allocation</h5>
                  <ul className="space-y-1 text-yellow-600">
                    <li>• Start with 5-10% of portfolio</li>
                    <li>• Diversify across REIT types</li>
                    <li>• Consider geographic exposure</li>
                    <li>• Monitor interest rate environment</li>
                    <li>• Rebalance periodically</li>
                  </ul>
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
                Answer these questions to check your understanding of REITs and real estate investing.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Why might REITs be sensitive to interest rate changes?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the main differences between equity REITs and mortgage REITs?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How can REITs help diversify an investment portfolio?</p>
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
                Congratulations! You've completed the introduction to REITs and real estate investing. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">REIT Basics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ REITs allow real estate investment without physical property</li>
                  <li>✅ They pool investor money to buy and manage properties</li>
                  <li>✅ Must distribute 90% of taxable income as dividends</li>
                  <li>✅ Trade on stock exchanges like stocks</li>
                  <li>✅ Provide professional property management</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Investment Options</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Equity REITs: Own and operate properties</li>
                  <li>✅ Mortgage REITs: Provide financing</li>
                  <li>✅ Hybrid REITs: Combine both strategies</li>
                  <li>✅ Public REITs: Trade on exchanges</li>
                  <li>✅ REIT ETFs: Instant diversification</li>
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
                  <p className="text-blue-700 text-sm">Research REITs</p>
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
            audioFiles={lessonData.audioFiles}
            transcript={lessonData.transcript}
            lessonSlug={lessonData.lessonSlug}
          />
        </div>
        
        <MultiPartLesson 
          title={lessonData.title}
          lessonSlug={lessonData.lessonSlug}
          parts={lessonData.parts}
        />
      </div>
    </div>
  );
}
