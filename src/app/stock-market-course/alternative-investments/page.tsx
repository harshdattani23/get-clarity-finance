"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function AlternativeInvestmentsPage() {
  const lessonData = {
    title: "Alternative Investments",
    description: "Explore investment options beyond traditional stocks and bonds, including gold, art, cryptocurrencies, and other alternative assets.",
    lessonSlug: "alternative-investments",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/specialized-topics/alternative-investments-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/specialized-topics/alternative-investments-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/specialized-topics/alternative-investments-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/specialized-topics/alternative-investments-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/specialized-topics/alternative-investments-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/specialized-topics/alternative-investments-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of alternative investments! In this lesson, we'll explore investment options beyond traditional stocks and bonds, including precious metals, art and collectibles, cryptocurrencies, private equity, and hedge funds. You'll learn about the unique characteristics, risks, and potential benefits of these alternative assets.",
      hi: "वैकल्पिक निवेश की दुनिया में आपका स्वागत है! इस पाठ में, हम traditional stocks और bonds से परे निवेश के विकल्पों का पता लगाएंगे, जिसमें precious metals, art और collectibles, cryptocurrencies, private equity, और hedge funds शामिल हैं। आप इन alternative assets की unique characteristics, risks, और potential benefits के बारे में जानेंगे।",
      bn: "বিকল্প বিনিয়োগের জগতে স্বাগতম! এই পাঠে, আমরা traditional stocks এবং bonds এর বাইরে বিনিয়োগের বিকল্পগুলি অন্বেষণ করব, যার মধ্যে precious metals, art এবং collectibles, cryptocurrencies, private equity, এবং hedge funds অন্তর্ভুক্ত। আপনি এই alternative assets এর unique characteristics, risks, এবং potential benefits সম্পর্কে জানবেন।",
      mr: "पर्यायी गुंतवणुकीच्या जगात आपले स्वागत आहे! या धड्यात, आपण traditional stocks आणि bonds पेक्षा जास्त गुंतवणुकीच्या पर्यायांचा शोध घेणार आहोत, ज्यामध्ये precious metals, art आणि collectibles, cryptocurrencies, private equity, आणि hedge funds समाविष्ट आहेत. तुम्ही या alternative assets च्या unique characteristics, risks, आणि potential benefits बद्दल जाणू.",
      gu: "વૈકલ્પિક રોકાણોની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, આપણે traditional stocks અને bonds થી આગળ રોકાણના વિકલ્પોની શોધ કરીશું, જેમાં precious metals, art અને collectibles, cryptocurrencies, private equity, અને hedge funds સમાવેશ થાય છે. તમે આ alternative assets ની unique characteristics, risks, અને potential benefits વિશે જાણશો.",
      ta: "மாற்று முதலீடுகளின் உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், traditional stocks மற்றும் bonds ஐத் தவிர்த்து முதலீட்டு விருப்பங்களை ஆராய்வோம், இதில் precious metals, art மற்றும் collectibles, cryptocurrencies, private equity, மற்றும் hedge funds ஆகியவை அடங்கும். இந்த alternative assets இன் unique characteristics, risks, மற்றும் potential benefits பற்றி நீங்கள் அறிவீர்கள்."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Alternative Investments",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Beyond Traditional Investments
              </h3>
              <p className="text-blue-700">
                Alternative investments can provide diversification and potentially higher returns, but they also come with unique risks and characteristics that differ from traditional investments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Types of alternative investments</li>
                  <li>• Risk and return characteristics</li>
                  <li>• Portfolio diversification benefits</li>
                  <li>• Important considerations</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-3">Key Benefits</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Portfolio diversification</li>
                  <li>• Potential for higher returns</li>
                  <li>• Low correlation with stocks</li>
                  <li>• Inflation protection</li>
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
                Let's see how much you already know about alternative investments!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Which of the following is NOT typically considered an alternative investment?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Gold</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Stocks</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) Art</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Cryptocurrencies</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What is a common characteristic of many alternative investments?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) High liquidity</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Low volatility</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Low liquidity</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Government backing</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "precious-metals",
        title: "Precious Metals",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                The Timeless Investment
              </h3>
              <p className="text-yellow-700">
                Precious metals have been valued throughout human history and continue to be important alternative investments today.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Gold</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Safe Haven:</strong> Often considered a safe haven asset during economic uncertainty</p>
                  <p>• <strong>Inflation Hedge:</strong> Historically protects against inflation</p>
                  <p>• <strong>Ways to Invest:</strong> Physical gold, gold ETFs, gold mining stocks, gold futures</p>
                  <p>• <strong>Characteristics:</strong> High liquidity, global recognition, limited supply</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Silver</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Dual Nature:</strong> Both a precious metal and industrial commodity</p>
                  <p>• <strong>Higher Volatility:</strong> More volatile than gold but can offer higher returns</p>
                  <p>• <strong>Industrial Uses:</strong> Electronics, solar panels, medical equipment</p>
                  <p>• <strong>Investment Options:</strong> Physical silver, silver ETFs, silver mining stocks</p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-3">Why Invest in Precious Metals?</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 font-bold">🛡️</span>
                  </div>
                  <p className="text-orange-700 text-sm">Portfolio Protection</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 font-bold">📈</span>
                  </div>
                  <p className="text-orange-700 text-sm">Inflation Hedge</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 font-bold">🌍</span>
                  </div>
                  <p className="text-orange-700 text-sm">Global Recognition</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "art-collectibles",
        title: "Art and Collectibles",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Investing in Beauty and Culture
              </h3>
              <p className="text-purple-700">
                Investing in art, antiques, wine, or other collectible items offers unique opportunities but comes with specific challenges.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">Advantages</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Portfolio Diversification</h5>
                    <p className="text-green-700 text-sm">Low correlation with traditional investments</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Personal Enjoyment</h5>
                    <p className="text-green-700 text-sm">Cultural value and aesthetic pleasure</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Potential Appreciation</h5>
                    <p className="text-green-700 text-sm">Significant value increases possible</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-4">Disadvantages</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Low Liquidity</h5>
                    <p className="text-red-700 text-sm">Difficult to sell quickly</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Expertise Required</h5>
                    <p className="text-red-700 text-sm">Need specialized knowledge</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Storage Costs</h5>
                    <p className="text-red-700 text-sm">Insurance and maintenance expenses</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Types of Collectibles</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">🎨</div>
                  <p className="font-medium text-gray-800">Fine Art</p>
                  <p className="text-sm text-gray-600">Paintings, sculptures</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">🍷</div>
                  <p className="font-medium text-gray-800">Wine</p>
                  <p className="text-sm text-gray-600">Vintage bottles</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">💎</div>
                  <p className="font-medium text-gray-800">Jewelry</p>
                  <p className="text-sm text-gray-600">Precious stones</p>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="text-2xl mb-2">📚</div>
                  <p className="font-medium text-gray-800">Books</p>
                  <p className="text-sm text-gray-600">First editions</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "cryptocurrencies",
        title: "Cryptocurrencies",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                The Digital Revolution in Finance
              </h3>
              <p className="text-blue-700">
                Digital or virtual currencies that use cryptography for security, representing one of the most innovative and volatile alternative investments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Major Cryptocurrencies</h4>
                <div className="space-y-3">
                  <div className="bg-orange-50 p-3 rounded border border-orange-200">
                    <h5 className="font-medium text-orange-800 mb-1">Bitcoin (BTC)</h5>
                    <p className="text-orange-700 text-sm">First and most well-known cryptocurrency</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <h5 className="font-medium text-blue-800 mb-1">Ethereum (ETH)</h5>
                    <p className="text-blue-700 text-sm">Platform for smart contracts and dApps</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <h5 className="font-medium text-purple-800 mb-1">Ripple (XRP)</h5>
                    <p className="text-purple-700 text-sm">Fast international money transfers</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Key Characteristics</h4>
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <h5 className="font-medium text-red-800 mb-1">Extreme Volatility</h5>
                    <p className="text-red-700 text-sm">Prices can change dramatically in minutes</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <h5 className="font-medium text-green-800 mb-1">Decentralized</h5>
                    <p className="text-green-700 text-sm">Not controlled by governments or banks</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <h5 className="font-medium text-blue-800 mb-1">Blockchain Technology</h5>
                    <p className="text-blue-700 text-sm">Secure, transparent, and immutable</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Investment Considerations</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">High Risk Factors</h5>
                  <ul className="space-y-1 text-yellow-600">
                    <li>• Extreme price volatility</li>
                    <li>• Regulatory uncertainty</li>
                    <li>• Security risks (hacking)</li>
                    <li>• Limited historical data</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Potential Benefits</h5>
                  <ul className="space-y-1 text-yellow-600">
                    <li>• High growth potential</li>
                    <li>• 24/7 trading</li>
                    <li>• Low correlation with stocks</li>
                    <li>• Innovation exposure</li>
                  </ul>
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
                Match the Investment Type with its Characteristic
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each alternative investment with its key characteristic.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Investment Types:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Gold</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Art</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Cryptocurrency</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Private Equity</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Characteristics:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Safe haven asset, inflation hedge</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Low liquidity, requires expertise</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">High volatility, decentralized</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Long-term, illiquid investment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "private-equity-hedge-funds",
        title: "Private Equity & Hedge Funds",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                Sophisticated Alternative Investments
              </h3>
              <p className="text-indigo-700">
                These investment vehicles offer access to strategies and opportunities not available in traditional markets, but require significant capital and expertise.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Private Equity</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Definition:</strong> Investments in private companies not publicly traded</p>
                  <p>• <strong>Investment Horizon:</strong> Long-term (5-10 years typically)</p>
                  <p>• <strong>Liquidity:</strong> Very illiquid - long-term commitments</p>
                  <p>• <strong>Returns:</strong> High potential returns but high risk</p>
                  <p>• <strong>Access:</strong> Limited to accredited investors</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Hedge Funds</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Definition:</strong> Investment funds using various strategies</p>
                  <p>• <strong>Strategies:</strong> Long/short, global macro, event-driven</p>
                  <p>• <strong>Fees:</strong> High fees (2% management + 20% performance)</p>
                  <p>• <strong>Risk:</strong> Can be very risky and complex</p>
                  <p>• <strong>Access:</strong> Limited to accredited investors</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Investment Strategies</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">Long/Short</h5>
                  <p className="text-green-700 text-sm">Bet on some assets rising, others falling</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">Global Macro</h5>
                  <p className="text-green-700 text-sm">Bet on economic trends and events</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">Event-Driven</h5>
                  <p className="text-green-700 text-sm">Profit from corporate events and news</p>
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
                Answer these questions to check your understanding of alternative investments.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Why might someone choose to invest in art despite its low liquidity?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the main differences between gold and cryptocurrency as alternative investments?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How can alternative investments help with portfolio diversification?</p>
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
                Congratulations! You've completed the introduction to alternative investments. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Alternative Investment Types</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Precious metals (gold, silver)</li>
                  <li>✅ Art and collectibles</li>
                  <li>✅ Cryptocurrencies</li>
                  <li>✅ Private equity</li>
                  <li>✅ Hedge funds</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Key Characteristics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Portfolio diversification benefits</li>
                  <li>✅ Higher potential returns</li>
                  <li>✅ Higher risks and lower liquidity</li>
                  <li>✅ Require specialized knowledge</li>
                  <li>✅ Low correlation with stocks</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Important Considerations</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">⚖️</span>
                  </div>
                  <p className="text-blue-700 text-sm">Risk tolerance</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">💰</span>
                  </div>
                  <p className="text-blue-700 text-sm">Investment goals</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📚</span>
                  </div>
                  <p className="text-blue-700 text-sm">Required expertise</p>
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
