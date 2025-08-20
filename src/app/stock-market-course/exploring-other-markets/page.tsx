"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function ExploringOtherMarketsPage() {
  const lessonData = {
    title: "Exploring Other Markets",
    description: "Look beyond equities: currencies, commodities, real estate, and bonds. Diversifying into non-equity markets can improve risk-adjusted returns and reduce portfolio volatility.",
    lessonSlug: "exploring-other-markets",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/specialized-topics/exploring-other-markets-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/specialized-topics/exploring-other-markets-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/specialized-topics/exploring-other-markets-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/specialized-topics/exploring-other-markets-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/specialized-topics/exploring-other-markets-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/specialized-topics/exploring-other-markets-ta.m4a"
    },
    transcript: {
      en: "Diversifying into non-equity markets can improve risk-adjusted returns and reduce portfolio volatility. Each market has unique drivers and risk factors that should be understood before investing.",
      hi: "गैर-इक्विटी बाजारों में विविधीकरण जोखिम-समायोजित रिटर्न में सुधार कर सकता है और पोर्टफोलियो अस्थिरता को कम कर सकता है। प्रत्येक बाजार के पास अद्वितीय ड्राइवर और जोखिम कारक होते हैं जिन्हें निवेश करने से पहले समझा जाना चाहिए।",
      bn: "অ-ইকুইটি বাজারে বৈচিত্র্যকরণ ঝুঁকি-সমন্বিত রিটার্ন উন্নত করতে পারে এবং পোর্টফোলিও অস্থিরতা কমাতে পারে। প্রতিটি বাজারের নিজস্ব ড্রাইভার এবং ঝুঁকি ফ্যাক্টর রয়েছে যা বিনিয়োগের আগে বোঝা উচিত।",
      mr: "गैर-इक्विटी बाजारांमध्ये विविधीकरण जोखीम-समायोजित परतावा सुधारू शकते आणि पोर्टफोलिओ अस्थिरता कमी करू शकते. प्रत्येक बाजाराला त्याचे स्वतःचे ड्रायव्हर आणि जोखीम घटक असतात जे गुंतवणूक करण्यापूर्वी समजून घेतले पाहिजेत.",
      gu: "ગેર-ઇક્વિટી બજારોમાં વિવિધતા જોખમ-સમાયોજિત રિટર્ન સુધારી શકે છે અને પોર્ટફોલિયો અસ્થિરતા ઘટાડી શકે છે. દરેક બજારમાં અનન્ય ડ્રાઇવર્સ અને જોખમ પરિબળો હોય છે જે ગુમાવણુક કરતા પહેલા સમજવા જોઈએ.",
      ta: "பங்கு அல்லாத சந்தைகளில் பல்வகைப்படுத்தல் ஆபத்து-சரிசெய்யப்பட்ட வருவாயை மேம்படுத்தலாம் மற்றும் போர்ட்ஃபோலியோ ஏற்ற இறக்கத்தைக் குறைக்கலாம். ஒவ்வொரு சந்தைக்கும் தனித்துவமான இயக்கிகள் மற்றும் ஆபத்து காரணிகள் உள்ளன, அவை முதலீடு செய்வதற்கு முன் புரிந்துகொள்ளப்பட வேண்டும்."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Alternative Markets",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Beyond Stock Markets
              </h3>
              <p className="text-blue-700">
                Diversifying into non-equity markets can improve risk-adjusted returns and reduce portfolio volatility. Each market has unique drivers and risk factors that should be understood before investing.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">What You'll Learn</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Currency (Forex) markets</li>
                  <li>• Commodity trading</li>
                  <li>• Real estate investment</li>
                  <li>• Bond markets</li>
                  <li>• Portfolio diversification strategies</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Key Benefits</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Reduced portfolio volatility</li>
                  <li>• Better risk-adjusted returns</li>
                  <li>• Access to global opportunities</li>
                  <li>• Inflation protection</li>
                  <li>• Income generation</li>
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
                Let's see how much you already know about alternative markets!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the main benefit of diversifying into non-equity markets?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Guaranteed higher returns</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Reduced portfolio volatility</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) No need for research</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Lower taxes</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which market operates 24/5 globally?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Stock markets</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Currency markets</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Bond markets</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Real estate markets</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "currency-markets",
        title: "Currency (Forex) Markets",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                The Global Currency Exchange
              </h3>
              <p className="text-green-700">
                The foreign exchange market is the largest and most liquid financial market in the world, operating 24/5 with trillions of dollars traded daily.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Market Characteristics</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>24/5 Operation:</strong> Continuous trading across time zones</p>
                  <p>• <strong>High Liquidity:</strong> Easy entry and exit from positions</p>
                  <p>• <strong>Leverage Available:</strong> Small capital can control large positions</p>
                  <p>• <strong>Low Transaction Costs:</strong> Tight bid-ask spreads</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Major Currency Pairs</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>EUR/USD:</strong> Euro vs. US Dollar</p>
                  <p>• <strong>GBP/USD:</strong> British Pound vs. US Dollar</p>
                  <p>• <strong>USD/JPY:</strong> US Dollar vs. Japanese Yen</p>
                  <p>• <strong>USD/CHF:</strong> US Dollar vs. Swiss Franc</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">Drivers of Currency Movements</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🏦</span>
                  </div>
                  <p className="text-blue-700 text-sm">Interest Rates</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Economic Data</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🌍</span>
                  </div>
                  <p className="text-blue-700 text-sm">Political Events</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📈</span>
                  </div>
                  <p className="text-blue-700 text-sm">Market Sentiment</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "commodity-markets",
        title: "Commodity Markets",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                Trading Raw Materials
              </h3>
              <p className="text-yellow-700">
                Commodity markets allow investors to trade raw materials like energy, metals, and agricultural products. These markets provide inflation protection and portfolio diversification.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Energy Commodities</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Crude Oil:</strong> Brent and WTI benchmarks</p>
                  <p>• <strong>Natural Gas:</strong> Heating and power generation</p>
                  <p>• <strong>Gasoline:</strong> Refined petroleum product</p>
                  <p>• <strong>Heating Oil:</strong> Winter demand driver</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Metals</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Precious Metals:</strong> Gold, silver, platinum, palladium</p>
                  <p>• <strong>Industrial Metals:</strong> Copper, aluminum, zinc, nickel</p>
                  <p>• <strong>Steel:</strong> Construction and manufacturing</p>
                  <p>• <strong>Rare Earths:</strong> Technology applications</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Agricultural Products</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Grains:</strong> Corn, wheat, soybeans, rice</p>
                  <p>• <strong>Soft Commodities:</strong> Coffee, cocoa, sugar, cotton</p>
                  <p>• <strong>Livestock:</strong> Cattle, hogs, feeder cattle</p>
                  <p>• <strong>Dairy:</strong> Milk, cheese, butter</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Investment Vehicles</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Futures Contracts:</strong> Standardized agreements</p>
                  <p>• <strong>ETFs:</strong> Exchange-traded funds</p>
                  <p>• <strong>Options:</strong> Leveraged exposure</p>
                  <p>• <strong>Physical Ownership:</strong> Direct commodity holding</p>
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
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                Match Commodities with Their Categories
              </h3>
              <p className="text-indigo-700 mb-4">
                Test your understanding by matching different commodities with their appropriate market categories.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">Match the commodity with its category:</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Gold:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select category...</option>
                        <option value="a">A) Energy commodity</option>
                        <option value="b">B) Precious metal</option>
                        <option value="c">C) Agricultural product</option>
                        <option value="d">D) Industrial metal</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Crude Oil:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select category...</option>
                        <option value="a">A) Energy commodity</option>
                        <option value="b">B) Precious metal</option>
                        <option value="c">C) Agricultural product</option>
                        <option value="d">D) Industrial metal</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Corn:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select category...</option>
                        <option value="a">A) Energy commodity</option>
                        <option value="b">B) Precious metal</option>
                        <option value="c">C) Agricultural product</option>
                        <option value="d">D) Industrial metal</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "real-estate",
        title: "Real Estate Investment",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Property Investment Options
              </h3>
              <p className="text-purple-700">
                Real estate offers physical property, REITs, and funds that provide income and diversification. It's a tangible asset that can hedge against inflation and provide steady cash flow.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Direct Property Investment</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Residential:</strong> Single-family homes, apartments</p>
                  <p>• <strong>Commercial:</strong> Office buildings, retail spaces</p>
                  <p>• <strong>Industrial:</strong> Warehouses, manufacturing facilities</p>
                  <p>• <strong>Land:</strong> Undeveloped property for future use</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Real Estate Investment Trusts (REITs)</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Equity REITs:</strong> Own and operate properties</p>
                  <p>• <strong>Mortgage REITs:</strong> Finance real estate loans</p>
                  <p>• <strong>Hybrid REITs:</strong> Combination of both approaches</p>
                  <p>• <strong>Public vs. Private:</strong> Exchange-traded vs. direct</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Real Estate Funds</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Mutual Funds:</strong> Diversified property portfolios</p>
                  <p>• <strong>ETFs:</strong> Exchange-traded real estate funds</p>
                  <p>• <strong>Private Equity:</strong> Institutional investment vehicles</p>
                  <p>• <strong>Crowdfunding:</strong> Small investor participation</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Investment Benefits</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Income Generation:</strong> Rental income and dividends</p>
                  <p>• <strong>Inflation Hedge:</strong> Property values rise with inflation</p>
                  <p>• <strong>Tax Advantages:</strong> Depreciation and deductions</p>
                  <p>• <strong>Portfolio Diversification:</strong> Low correlation with stocks</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "bond-markets",
        title: "Bond Markets",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Fixed-Income Securities
              </h3>
              <p className="text-orange-700">
                Bonds provide fixed-income securities that offer regular interest payments and return of principal at maturity. They're essential for income generation and capital preservation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Government Bonds</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Treasury Bills:</strong> Short-term (up to 1 year)</p>
                  <p>• <strong>Treasury Notes:</strong> Medium-term (2-10 years)</p>
                  <p>• <strong>Treasury Bonds:</strong> Long-term (10+ years)</p>
                  <p>• <strong>Municipal Bonds:</strong> State and local government debt</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Corporate Bonds</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Investment Grade:</strong> High credit quality (BBB- and above)</p>
                  <p>• <strong>High Yield:</strong> Lower credit quality (below BBB-)</p>
                  <p>• <strong>Convertible Bonds:</strong> Can convert to equity</p>
                  <p>• <strong>Floating Rate:</strong> Interest rates adjust periodically</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">International Bonds</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Developed Markets:</strong> Europe, Japan, Australia</p>
                  <p>• <strong>Emerging Markets:</strong> Brazil, India, China</p>
                  <p>• <strong>Currency Risk:</strong> Exchange rate fluctuations</p>
                  <p>• <strong>Political Risk:</strong> Country-specific factors</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Bond Characteristics</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Coupon Rate:</strong> Annual interest payment</p>
                  <p>• <strong>Maturity Date:</strong> When principal is repaid</p>
                  <p>• <strong>Face Value:</strong> Principal amount at maturity</p>
                  <p>• <strong>Yield to Maturity:</strong> Total return if held to maturity</p>
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
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-semibold text-red-800 mb-4">
                Critical Thinking Questions
              </h3>
              <p className="text-red-700 mb-4">
                Answer these questions to demonstrate your understanding of alternative markets.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. How can investing in commodities help protect against inflation?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the key differences between investing in physical real estate vs. REITs?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. Why might an investor choose government bonds over corporate bonds?</p>
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
                Congratulations! You've completed the introduction to exploring other markets. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Market Benefits</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Non-equity assets diversify portfolio risk</li>
                  <li>✅ Each market has unique drivers and characteristics</li>
                  <li>✅ Alternative markets provide inflation protection</li>
                  <li>✅ Income generation from various sources</li>
                  <li>✅ Global investment opportunities</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Investment Considerations</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Allocation should reflect goals and risk tolerance</li>
                  <li>✅ Understand market-specific risks and drivers</li>
                  <li>✅ Consider liquidity and transaction costs</li>
                  <li>✅ Regular portfolio rebalancing</li>
                  <li>✅ Professional advice for complex markets</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Next Steps</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🌍</span>
                  </div>
                  <p className="text-blue-700 text-sm">Research markets</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Analyze correlations</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">💼</span>
                  </div>
                  <p className="text-blue-700 text-sm">Start small</p>
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
          onComplete={(totalScore) => console.log('Lesson completed with score:', totalScore)}
          onPartComplete={(partId, score) => console.log('Part completed:', partId, 'Score:', score)}
        />
      </div>
    </div>
  );
}
