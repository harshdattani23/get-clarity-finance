"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

const IntroToHedgingAndSpeculationPage = () => {
  const lessonData = {
    title: "Introduction to Hedging and Speculation Strategies",
    description: "Learn the two primary motivations for using derivatives: hedging to reduce risk and speculating to pursue profit. This lesson clarifies the distinction and provides examples of each.",
    lessonSlug: "introduction-to-hedging-and-speculation-strategies",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/advanced-strategies/introduction-to-hedging-and-speculation-strategies-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/advanced-strategies/introduction-to-hedging-and-speculation-strategies-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/advanced-strategies/introduction-to-hedging-and-speculation-strategies-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/advanced-strategies/introduction-to-hedging-and-speculation-strategies-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/advanced-strategies/introduction-to-hedging-and-speculation-strategies-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/advanced-strategies/introduction-to-hedging-and-speculation-strategies-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of advanced trading strategies! In this lesson, you'll learn the two primary motivations for using derivatives: hedging to reduce risk and speculating to pursue profit. Understanding this crucial distinction will help you use these powerful instruments effectively in your trading arsenal.",
      hi: "उन्नत ट्रेडिंग रणनीतियों की दुनिया में आपका स्वागत है! इस पाठ में, आप डेरिवेटिव्स का उपयोग करने के दो प्राथमिक उद्देश्यों को सीखेंगे: जोखिम को कम करने के लिए हेजिंग और लाभ की खोज के लिए सट्टेबाजी। इस महत्वपूर्ण अंतर को समझना आपको अपने ट्रेडिंग शस्त्रागार में इन शक्तिशाली उपकरणों का प्रभावी ढंग से उपयोग करने में मदद करेगा।",
      bn: "উন্নত ট্রেডিং কৌশলের জগতে স্বাগতম! এই পাঠে, আপনি ডেরিভেটিভ ব্যবহারের দুটি প্রাথমিক উদ্দেশ্য শিখবেন: ঝুঁকি কমাতে হেজিং এবং লাভের সন্ধানে স্পেকুলেশন। এই গুরুত্বপূর্ণ পার্থক্য বোঝা আপনাকে আপনার ট্রেডিং আর্সেনালে এই শক্তিশালী যন্ত্রগুলি কার্যকরভাবে ব্যবহার করতে সাহায্য করবে।",
      mr: "प्रगत ट्रेडिंग धोरणांच्या जगात आपले स्वागत आहे! या धड्यात, तुम्ही डेरिव्हेटिव्ह वापरण्याचे दोन प्राथमिक उद्देश्य शिकाल: जोखीम कमी करण्यासाठी हेजिंग आणि नफा मिळवण्यासाठी सट्टेबाजी. हा महत्त्वाचा फरक समजून घेणे तुम्हाला तुमच्या ट्रेडिंग शस्त्रागारात या शक्तिशाली साधनांचा प्रभावी वापर करण्यास मदत करेल.",
      gu: "ઉન્નત ટ્રેડિંગ વ્યૂહરચનાની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, તમે ડેરિવેટિવ્સનો ઉપયોગ કરવાના બે પ્રાથમિક હેતુઓ શીખશો: જોખમ ઘટાડવા માટે હેજિંગ અને નફો મેળવવા માટે સટ્ટાબાજી. આ મહત્વપૂર્ણ તફાવતને સમજવાથી તમને તમારા ટ્રેડિંગ શસ્ત્રાગારમાં આ શક્તિશાળી સાધનોનો અસરકારક ઉપયોગ કરવામાં મદદ મળશે.",
      ta: "மேம்பட்ட வர்த்தக உத்திகளின் உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், நீங்கள் டெரிவேடிவ்களைப் பயன்படுத்துவதற்கான இரண்டு முக்கிய நோக்கங்களைக் கற்றுக்கொள்வீர்கள்: ஆபத்தைக் குறைப்பதற்கான ஹெட்ஜிங் மற்றும் லாபத்தைத் தேடுவதற்கான ஸ்பெகுலேஷன். இந்த முக்கியமான வேறுபாட்டைப் புரிந்துகொள்வது இந்த சக்திவாய்ந்த கருவிகளை உங்கள் வர்த்தக ஆயுதக் கிடங்கில் திறம்பட பயன்படுத்த உதவும்."
    },
    parts: [
      {
        id: "introduction",
        title: "Understanding Hedging vs Speculation",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                Two Sides of the Same Coin
              </h3>
              <p className="text-blue-700 mb-4">
                Derivatives like futures and options can be used for two main purposes: hedging and speculation. While both involve taking a position in the derivatives market, their underlying goals are fundamentally different.
              </p>
              <p className="text-blue-700">
                Hedging is about risk reduction, while speculation is about taking on risk in the hope of making a profit. Understanding this distinction is crucial for using these instruments effectively.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Key Takeaway</h4>
              <p className="text-green-700">
                Hedging protects existing positions, while speculation creates new positions for profit. Both are essential for market efficiency and liquidity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• The difference between hedging and speculation</li>
                  <li>• How hedging protects against risk</li>
                  <li>• How speculation seeks profit</li>
                  <li>• Real-world examples of both strategies</li>
                  <li>• When to use each approach</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Why This Matters</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Risk management strategies</li>
                  <li>• Portfolio protection</li>
                  <li>• Profit generation opportunities</li>
                  <li>• Market understanding</li>
                  <li>• Professional trading approach</li>
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
                Let's see how much you already know about hedging and speculation!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the primary goal of hedging?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) To make maximum profit</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) To reduce or mitigate risk</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) To speculate on price movements</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) To increase market volatility</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What is the primary goal of speculation?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) To protect existing positions</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) To reduce portfolio risk</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) To pursue profit through price movements</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) To maintain stable returns</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "hedging-protection",
        title: "Hedging: The Art of Protection",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                🛡️ Hedging: Your Financial Insurance
              </h3>
              <p className="text-green-700">
                Hedging is a strategy designed to reduce or mitigate the risk of adverse price movements in an asset. Think of it as a form of insurance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">How Hedging Works</h4>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">🎯 Primary Goal</h5>
                  <p className="text-green-700 text-sm">
                    To protect an existing position from losses. Hedgers already have exposure to an underlying asset and use derivatives to protect against potential losses.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">📊 Risk Management</h5>
                  <p className="text-blue-700 text-sm">
                    Hedging reduces the overall risk of your portfolio by offsetting potential losses in one position with gains in another.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">💡 Insurance Analogy</h5>
                  <p className="text-purple-700 text-sm">
                    Just like car insurance protects you from financial loss in an accident, hedging protects you from financial loss in adverse market movements.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Real-World Hedging Example</h4>
              <div className="bg-white p-4 rounded-lg border">
                <h5 className="font-medium text-yellow-800 mb-2">✈️ Airline Company Example</h5>
                <div className="space-y-2 text-yellow-700">
                  <p className="text-sm"><strong>Situation:</strong> An airline company is exposed to rising fuel prices</p>
                  <p className="text-sm"><strong>Risk:</strong> If fuel prices increase, their costs go up, reducing profits</p>
                  <p className="text-sm"><strong>Hedging Strategy:</strong> Buy futures contracts for jet fuel to lock in a price</p>
                  <p className="text-sm"><strong>Result:</strong> If fuel prices rise, the profit on the futures contract offsets the higher fuel costs</p>
                  <p className="text-sm"><strong>Protection:</strong> The airline is protected from fuel price volatility</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Common Hedging Instruments</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">📈 For Long Positions</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                    <li>• Put options to limit downside</li>
                    <li>• Short futures to hedge price drops</li>
                    <li>• Inverse ETFs for broad market protection</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">📉 For Short Positions</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                    <li>• Call options to limit upside risk</li>
                    <li>• Long futures to hedge price increases</li>
                    <li>• Long ETFs for broad market protection</li>
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
                Match the Hedging Strategy with its Purpose
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each hedging strategy with its primary purpose.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Hedging Strategies:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Buying Put Options</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Shorting Futures</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Buying Inverse ETFs</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Purposes:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Protect against price drops in long positions</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Hedge against commodity price increases</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Protect against broad market declines</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "speculation-profit",
        title: "Speculation: The Pursuit of Profit",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-semibold text-orange-800 mb-4">
                🎯 Speculation: Betting on Price Movements
              </h3>
              <p className="text-orange-700">
                Speculation is the act of trading an asset, or conducting a financial transaction, that has a significant risk of losing most or all of the initial outlay, in expectation of a substantial gain.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">How Speculation Works</h4>
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h5 className="font-medium text-orange-800 mb-2">🎲 Risk-Reward Trade-off</h5>
                  <p className="text-orange-700 text-sm">
                    Speculators have no existing exposure to the underlying asset; they are simply betting on its future price direction.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h5 className="font-medium text-red-800 mb-2">⚠️ High Risk, High Reward</h5>
                  <p className="text-red-700 text-sm">
                    The potential for significant losses exists, but so does the potential for substantial gains.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">📊 Market Making</h5>
                  <p className="text-blue-700 text-sm">
                    Speculators provide liquidity to the market and help with price discovery through their trading activities.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Real-World Speculation Example</h4>
              <div className="bg-white p-4 rounded-lg border">
                <h5 className="font-medium text-yellow-800 mb-2">🥇 Gold Futures Speculation</h5>
                <div className="space-y-2 text-yellow-700">
                  <p className="text-sm"><strong>Situation:</strong> A trader believes gold prices will rise</p>
                  <p className="text-sm"><strong>Strategy:</strong> Buy a gold futures contract without owning any physical gold</p>
                  <p className="text-sm"><strong>Risk:</strong> If gold prices fall, the trader loses money</p>
                  <p className="text-sm"><strong>Reward:</strong> If gold prices rise, the trader makes a profit</p>
                  <p className="text-sm"><strong>Intent:</strong> Pure speculation on price direction, no delivery intended</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Speculation vs Investment</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">📈 Speculation</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                    <li>• Short-term focus</li>
                    <li>• High risk tolerance</li>
                    <li>• Price movement betting</li>
                    <li>• No fundamental analysis</li>
                    <li>• Quick entry and exit</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">🏗️ Investment</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                    <li>• Long-term focus</li>
                    <li>• Lower risk tolerance</li>
                    <li>• Value-based decisions</li>
                    <li>• Fundamental analysis</li>
                    <li>• Buy and hold strategy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "key-differences",
        title: "Key Differences Summarized",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">
                Understanding the Distinction
              </h3>
              <p className="text-purple-700">
                The primary difference is intent. A hedger wants to reduce risk, while a speculator wants to take on risk for profit. Understanding these differences helps you choose the right strategy for your goals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Comparison Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border p-3 font-semibold text-gray-700">Aspect</th>
                      <th className="border p-3 font-semibold text-gray-700">Hedging</th>
                      <th className="border p-3 font-semibold text-gray-700">Speculation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold text-gray-700">Primary Goal</td>
                      <td className="border p-3 text-green-600">Risk reduction</td>
                      <td className="border p-3 text-orange-600">Profit generation</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold text-gray-700">Existing Position</td>
                      <td className="border p-3 text-green-600">Yes, to protect</td>
                      <td className="border p-3 text-orange-600">No, creating new</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold text-gray-700">Risk Attitude</td>
                      <td className="border p-3 text-green-600">Risk averse</td>
                      <td className="border p-3 text-orange-600">Risk seeking</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold text-gray-700">Time Horizon</td>
                      <td className="border p-3 text-green-600">Medium to long term</td>
                      <td className="border p-3 text-orange-600">Short to medium term</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold text-gray-700">Strategy Type</td>
                      <td className="border p-3 text-green-600">Defensive</td>
                      <td className="border p-3 text-orange-600">Offensive</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">When to Use Each Strategy</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">🛡️ Use Hedging When:</h5>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• You have existing positions to protect</li>
                    <li>• Market volatility is high</li>
                    <li>• You want to reduce portfolio risk</li>
                    <li>• You're a conservative investor</li>
                    <li>• You need predictable outcomes</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">🎯 Use Speculation When:</h5>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• You have high risk tolerance</li>
                    <li>• You see clear market opportunities</li>
                    <li>• You want to generate additional returns</li>
                    <li>• You're an active trader</li>
                    <li>• You can afford potential losses</li>
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
        isRequired: true,
        type: 'short-answer' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                Test Your Deep Knowledge
              </h3>
              <p className="text-indigo-700 mb-6">
                Answer these questions to check your understanding of hedging and speculation.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. How does hedging contribute to market efficiency?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the risks of over-hedging a position?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How can you combine hedging and speculation strategies?</p>
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
        title: "Conclusion: Two Sides of the Same Coin",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                What You've Learned
              </h3>
              <p className="text-green-700">
                Congratulations! You've completed the lesson on hedging and speculation strategies. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Hedging Summary</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Protects existing positions from losses</li>
                  <li>✅ Reduces overall portfolio risk</li>
                  <li>✅ Acts like financial insurance</li>
                  <li>✅ Defensive strategy approach</li>
                  <li>✅ Essential for risk management</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Speculation Summary</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Seeks profit through price movements</li>
                  <li>✅ Takes on risk for potential reward</li>
                  <li>✅ Provides market liquidity</li>
                  <li>✅ Offensive strategy approach</li>
                  <li>✅ Essential for market efficiency</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Market Ecosystem</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">🛡️ Hedgers</h5>
                  <p className="text-blue-600 text-sm">Transfer risk to speculators</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">🎯 Speculators</h5>
                  <p className="text-blue-600 text-sm">Absorb risk for profit potential</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">📊 Market</h5>
                  <p className="text-blue-600 text-sm">Becomes efficient and liquid</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💡</span>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Final Thought</h4>
                  <p className="text-yellow-800">
                    Hedging and speculation are both essential functions of the derivatives market. Hedgers transfer risk, and speculators absorb that risk, providing the liquidity that makes the market efficient. Whether you are looking to protect your investments or seek out new profit opportunities, understanding both hedging and speculation is key to navigating the world of derivatives.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-3">Next Steps</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">📚</span>
                  </div>
                  <p className="text-purple-700 text-sm">Study advanced strategies</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">💼</span>
                  </div>
                  <p className="text-purple-700 text-sm">Practice risk management</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">📊</span>
                  </div>
                  <p className="text-purple-700 text-sm">Master portfolio balance</p>
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
};

export default IntroToHedgingAndSpeculationPage;
