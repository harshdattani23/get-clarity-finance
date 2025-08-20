"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function CurrencyAndCommodityMarketsPage() {
  const lessonData = {
    title: "Introduction to Currency and Commodity Markets",
    description: "Explore the basics of trading in the forex (currency) and commodity (gold, oil, etc.) markets.",
    lessonSlug: "currency-and-commodity-markets",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/specialized-topics/currency-and-commodity-markets-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/specialized-topics/currency-and-commodity-markets-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/specialized-topics/currency-and-commodity-markets-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/specialized-topics/currency-and-commodity-markets-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/specialized-topics/currency-and-commodity-markets-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/specialized-topics/currency-and-commodity-markets-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of currency and commodity markets! In this lesson, we'll explore how forex trading works, understand commodity markets, and learn about the risks and benefits of these specialized financial instruments. You'll discover how these markets can diversify your portfolio and provide opportunities beyond traditional stock investing.",
      hi: "मुद्रा और वस्तुओं के बाजारों की दुनिया में आपका स्वागत है! इस पाठ में, हम देखेंगे कि forex trading कैसे काम करती है, commodity markets को समझेंगे, और इन specialized financial instruments के risks और benefits के बारे में जानेंगे। आपको पता चलेगा कि ये markets आपके portfolio को diversify कैसे कर सकते हैं और traditional stock investing से परे opportunities प्रदान कर सकते हैं।",
      bn: "মুদ্রা এবং পণ্য বাজারে স্বাগতম! এই পাঠে, আমরা দেখব কিভাবে forex trading কাজ করে, commodity markets বুঝব, এবং এই specialized financial instruments এর risks এবং benefits সম্পর্কে জানব। আপনি দেখবেন কিভাবে এই markets আপনার portfolio কে diversify করতে পারে এবং traditional stock investing এর বাইরে opportunities প্রদান করতে পারে।",
      mr: "मुद्रा आणि वस्तूंच्या बाजारपेठेमध्ये आपले स्वागत आहे! या धड्यात, आपण पाहू की forex trading कशी काम करते, commodity markets समजू, आणि या specialized financial instruments च्या risks आणि benefits बद्दल जाणू. तुम्हाला कळेल की हे markets तुमच्या portfolio ला कसे diversify करू शकतात आणि traditional stock investing पेक्षा जास्त opportunities कसे देऊ शकतात.",
      gu: "મુદ્રા અને વસ્તુઓના બજારમાં આપનું સ્વાગત છે! આ પાઠમાં, આપણે જોઈશું કે forex trading કેવી રીતે કામ કરે છે, commodity markets ને સમજીશું, અને આ specialized financial instruments ના risks અને benefits વિશે જાણીશું. તમને ખબર પડશે કે આ markets તમારા portfolio ને કેવી રીતે diversify કરી શકે છે અને traditional stock investing થી આગળ opportunities કેવી રીતે આપી શકે છે.",
      ta: "நாணயம் மற்றும் பொருட்கள் சந்தைகளுக்கு வரவேற்கிறோம்! இந்த பாடத்தில், forex trading எப்படி வேலை செய்கிறது என்பதைப் பார்ப்போம், commodity markets ஐப் புரிந்துகொள்வோம், மேலும் இந்த specialized financial instruments இன் risks மற்றும் benefits பற்றி அறிவோம். இந்த markets உங்கள் portfolio ஐ எப்படி diversify செய்ய முடியும் மற்றும் traditional stock investing ஐ விட அதிகமான opportunities எப்படி வழங்க முடியும் என்பதை நீங்கள் காண்பீர்கள்."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction",
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Beyond Stocks: Exploring New Markets
              </h3>
              <p className="text-blue-700">
                Beyond stocks, there are other important financial markets that offer different opportunities and risks. Understanding currency and commodity markets can help diversify your investment portfolio and provide exposure to global economic trends.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• How forex markets work</li>
                  <li>• Types of commodities traded</li>
                  <li>• Risk management strategies</li>
                  <li>• Portfolio diversification benefits</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-3">Key Benefits</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• 24/7 trading opportunities</li>
                  <li>• Global market access</li>
                  <li>• Inflation protection</li>
                  <li>• Low correlation with stocks</li>
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
                Let's see how much you already know about currency and commodity markets!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Which market is the largest financial market in the world?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Stock Market</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Forex Market</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) Commodity Market</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Bond Market</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are currencies always traded in?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Single units</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Pairs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Bundles</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Groups</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "forex-market",
        title: "Forex (Foreign Exchange) Market",
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                The World's Largest Financial Market
              </h3>
              <p className="text-blue-700">
                The foreign exchange market is the largest financial market in the world, where currencies are traded 24/7 across global markets.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">How Forex Trading Works</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Currency Pairs:</strong> Always traded in pairs (e.g., USD/INR, EUR/USD)</p>
                  <p>• <strong>Base Currency:</strong> The first currency in the pair</p>
                  <p>• <strong>Quote Currency:</strong> The second currency in the pair</p>
                  <p>• <strong>Exchange Rate:</strong> How much of the quote currency you get for one unit of base currency</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Major Currency Pairs</h4>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="font-medium text-green-800">EUR/USD</p>
                    <p className="text-sm text-green-600">Euro / US Dollar</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="font-medium text-blue-800">GBP/USD</p>
                    <p className="text-sm text-blue-600">British Pound / US Dollar</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <p className="font-medium text-purple-800">USD/JPY</p>
                    <p className="text-sm text-purple-600">US Dollar / Japanese Yen</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Factors Affecting Currency Prices</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Economic Factors</h5>
                  <ul className="space-y-1 text-yellow-600">
                    <li>• Interest rates</li>
                    <li>• GDP growth</li>
                    <li>• Employment data</li>
                    <li>• Trade balances</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Political Factors</h5>
                  <ul className="space-y-1 text-yellow-600">
                    <li>• Political stability</li>
                    <li>• Central bank policies</li>
                    <li>• Government regulations</li>
                    <li>• International relations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "commodity-market",
        title: "Commodity Markets",
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Trading Raw Materials and Primary Goods
              </h3>
              <p className="text-green-700">
                Commodity markets are where raw materials and primary goods are traded. These markets offer opportunities to invest in physical assets that often have low correlation with traditional financial markets.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Main Commodity Categories</h4>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                    <h5 className="font-medium text-yellow-800 mb-2">Precious Metals</h5>
                    <p className="text-yellow-700">Gold, Silver, Platinum, Palladium</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded border border-orange-200">
                    <h5 className="font-medium text-orange-800 mb-2">Energy</h5>
                    <p className="text-orange-700">Crude Oil, Natural Gas, Coal</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-2">Agriculture</h5>
                    <p className="text-green-700">Wheat, Corn, Soybeans, Cotton</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-2">Livestock</h5>
                    <p className="text-red-700">Cattle, Hogs, Poultry</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">How to Trade Commodities</h4>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded border border-blue-200">
                    <h5 className="font-medium text-blue-800 mb-2">Futures Contracts</h5>
                    <p className="text-blue-700">Agreement to buy/sell at a future date and price</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded border border-purple-200">
                    <h5 className="font-medium text-purple-800 mb-2">ETFs</h5>
                    <p className="text-purple-700">Exchange-traded funds that track commodity prices</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded border border-indigo-200">
                    <h5 className="font-medium text-indigo-800 mb-2">Commodity Stocks</h5>
                    <p className="text-indigo-700">Shares of companies that produce commodities</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded border border-pink-200">
                    <h5 className="font-medium text-pink-800 mb-2">Physical Ownership</h5>
                    <p className="text-pink-700">Direct ownership of physical commodities</p>
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
                Match the Concept with its Description
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each concept with its correct description.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Concepts:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Currency Pair</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Commodity ETF</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Leverage</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Futures Contract</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Descriptions:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Two currencies traded together (e.g., EUR/USD)</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Fund that tracks commodity prices</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Borrowed money to increase trading power</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Agreement to buy/sell at future date</p>
                    </div>
                  </div>
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
                Like all investments, currency and commodity markets come with both opportunities and risks. Understanding these can help you make informed decisions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">Benefits</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Portfolio Diversification</h5>
                    <p className="text-green-700 text-sm">Low correlation with traditional stocks and bonds</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Inflation Protection</h5>
                    <p className="text-green-700 text-sm">Commodities often rise with inflation</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Global Market Access</h5>
                    <p className="text-green-700 text-sm">Trade markets worldwide 24/7</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Hedging Opportunities</h5>
                    <p className="text-green-700 text-sm">Protect against currency or commodity price changes</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-4">Risks</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">High Volatility</h5>
                    <p className="text-red-700 text-sm">Prices can change rapidly and dramatically</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Leverage Risk</h5>
                    <p className="text-red-700 text-sm">Small price changes can lead to large losses</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Complex Market Dynamics</h5>
                    <p className="text-red-700 text-sm">Many factors influence prices simultaneously</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Liquidity Issues</h5>
                    <p className="text-red-700 text-sm">Some commodities may be hard to sell quickly</p>
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
                Answer these questions to check your understanding of currency and commodity markets.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Why do currency pairs always have two currencies?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. How can commodities help protect against inflation?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What are the main differences between forex and commodity trading?</p>
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
                Congratulations! You've completed the introduction to currency and commodity markets. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Forex Market Insights</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Forex is the world's largest financial market</li>
                  <li>✅ Currencies are always traded in pairs</li>
                  <li>✅ 24/7 trading across global markets</li>
                  <li>✅ Major pairs include EUR/USD, GBP/USD, USD/JPY</li>
                  <li>✅ Prices influenced by economic and political factors</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Commodity Market Insights</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Four main categories: metals, energy, agriculture, livestock</li>
                  <li>✅ Can be traded via futures, ETFs, stocks, or physical ownership</li>
                  <li>✅ Often provide inflation protection</li>
                  <li>✅ Low correlation with traditional markets</li>
                  <li>✅ Good for portfolio diversification</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Next Steps</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <p className="text-blue-700 text-sm">Practice with demo accounts</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <p className="text-blue-700 text-sm">Learn risk management</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <p className="text-blue-700 text-sm">Start with small positions</p>
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
