"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function IntroToDerivativesPage() {
  const lessonData = {
    title: "Introduction to Derivatives",
    description: "Understand what derivatives are, the different types, and their role in the financial markets.",
    lessonSlug: "introduction-to-derivatives",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-derivatives-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-derivatives-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-derivatives-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-derivatives-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-derivatives-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-derivatives-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of derivatives! In this lesson, we'll explore what derivatives are, the different types available, and their crucial role in financial markets. You'll learn about underlying assets, contracts, and how derivatives can be used for hedging, speculation, and risk management.",
      hi: "डेरिवेटिव्स की दुनिया में आपका स्वागत है! इस पाठ में, हम देखेंगे कि डेरिवेटिव्स क्या हैं, उनके विभिन्न प्रकार, और वित्तीय बाजारों में उनकी महत्वपूर्ण भूमिका। आप अंतर्निहित परिसंपत्तियों, अनुबंधों, और कैसे डेरिवेटिव्स का उपयोग हेजिंग, सट्टेबाजी और जोखिम प्रबंधन के लिए किया जा सकता है, के बारे में जानेंगे।",
      bn: "ডেরিভেটিভসের জগতে স্বাগতম! এই পাঠে, আমরা দেখব ডেরিভেটিভস কী, তাদের বিভিন্ন ধরন, এবং আর্থিক বাজারে তাদের গুরুত্বপূর্ণ ভূমিকা। আপনি অন্তর্নিহিত সম্পদ, চুক্তি, এবং কীভাবে ডেরিভেটিভস হেজিং, স্পেকুলেশন এবং ঝুঁকি ব্যবস্থাপনার জন্য ব্যবহার করা যেতে পারে, সে সম্পর্কে জানবেন।",
      mr: "डेरिव्हेटिव्ह्स च्या जगात आपले स्वागत आहे! या धड्यात, आपण पाहू की डेरिव्हेटिव्ह्स काय आहेत, त्यांचे विविध प्रकार, आणि आर्थिक बाजारात त्यांची महत्त्वाची भूमिका. तुम्ही अंतर्निहित मालमत्ता, करार, आणि कसे डेरिव्हेटिव्ह्स हेजिंग, सट्टेबाजी आणि जोखीम व्यवस्थापनासाठी वापरले जाऊ शकतात, याबद्दल जाणू.",
      gu: "ડેરિવેટિવ્સની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, આપણે જોઈશું કે ડેરિવેટિવ્સ શું છે, તેમના વિવિધ પ્રકારો, અને નાણાકીય બજારોમાં તેમની મહત્વપૂર્ણ ભૂમિકા. તમે અંતર્નિહિત માલમત્તા, કરારો, અને કેવી રીતે ડેરિવેટિવ્સ હેજિંગ, સટ્ટાબાજી અને જોખમ વ્યવસ્થાપન માટે વપરાય શકે છે, તે વિશે જાણશો.",
      ta: "டெரிவேடிவ்களின் உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், டெரிவேடிவ்கள் என்ன, அவற்றின் பல்வேறு வகைகள், மேலும் நிதி சந்தைகளில் அவற்றின் முக்கியமான பங்கு என்பதை ஆராய்வோம். அடிப்படை சொத்துக்கள், ஒப்பந்தங்கள், மேலும் ஹெட்ஜிங், ஸ்பெகுலேஷன் மற்றும் ஆபத்து மேலாண்மைக்கு டெரிவேடிவ்களை எப்படி பயன்படுத்தலாம் என்பதை நீங்கள் கற்றுக்கொள்வீர்கள்."
    },
    parts: [
      {
        id: "introduction",
        title: "What is a Derivative?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                What is a Derivative?
              </h3>
              <p className="text-blue-700 mb-4">
                A derivative is a financial contract between two or more parties whose value is based on an agreed-upon underlying financial asset (like a stock or a bond) or a set of assets (like an index). The derivative itself is a contract, and its value is 'derived' from the fluctuations in the price of the underlying asset.
              </p>
              <p className="text-blue-700">
                Think of it like a bet on the future price of something. You're not buying the asset itself, but a contract that pays out based on the asset's price change.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Key Takeaway</h4>
              <p className="text-green-700">
                Derivatives are financial contracts whose value depends on an underlying asset. They allow you to speculate on price movements without owning the actual asset.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• What derivatives are and how they work</li>
                  <li>• Key concepts: underlying assets & contracts</li>
                  <li>• Common types of derivatives</li>
                  <li>• Why people use derivatives</li>
                  <li>• Risks and considerations</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Why Derivatives Matter</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Risk management tools</li>
                  <li>• Speculation opportunities</li>
                  <li>• Leverage capabilities</li>
                  <li>• Portfolio diversification</li>
                  <li>• Market efficiency</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 text-center">
              <h4 className="font-semibold text-purple-800 mb-3">Visual Concept</h4>
              <p className="text-purple-700">
                A simple diagram showing a stock (the underlying asset) and a contract (the derivative) whose value is linked to the stock's price.
              </p>
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
                Let's see how much you already know about derivatives!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is a derivative?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) A type of stock</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) A financial contract whose value depends on an underlying asset</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) A type of bond</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) A bank account</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What is the underlying asset in a derivative?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) The derivative contract itself</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) The financial instrument on which the derivative's price is based</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) The broker's commission</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) The trading platform</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "key-concepts",
        title: "Key Concepts: Underlying Asset and Contract",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                Fundamental Building Blocks
              </h3>
              <p className="text-indigo-700">
                To understand derivatives, two concepts are crucial for building a solid foundation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">🏗️ Underlying Asset</h4>
                <p className="text-green-800 text-sm">
                  This is the financial instrument on which the derivative's price is based. It can be a stock, bond, commodity (like gold or oil), currency, or even an interest rate.
                </p>
                <div className="mt-3">
                  <h5 className="font-medium text-green-700 mb-2">Examples:</h5>
                  <ul className="text-green-600 text-sm space-y-1">
                    <li>• Stocks (Apple, Tesla)</li>
                    <li>• Bonds (Government bonds)</li>
                    <li>• Commodities (Gold, Oil)</li>
                    <li>• Currencies (USD, EUR)</li>
                    <li>• Indices (S&P 500, Nifty)</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">📋 The Contract</h4>
                <p className="text-blue-800 text-sm">
                  The derivative itself is a legally binding agreement that specifies the terms of the transaction, such as the quantity of the underlying asset, the price at which the transaction will occur, and the date of the transaction.
                </p>
                <div className="mt-3">
                  <h5 className="font-medium text-blue-700 mb-2">Contract Terms:</h5>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• Quantity of underlying asset</li>
                    <li>• Strike/Exercise price</li>
                    <li>• Expiration date</li>
                    <li>• Contract specifications</li>
                    <li>• Settlement terms</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Relationship Example</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h5 className="font-medium text-yellow-700 mb-2">Stock Price Rises</h5>
                  <p className="text-yellow-600 text-sm">Underlying asset increases in value</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h5 className="font-medium text-yellow-700 mb-2">Contract Value Changes</h5>
                  <p className="text-yellow-600 text-sm">Derivative value responds to price change</p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h5 className="font-medium text-yellow-700 mb-2">Profit/Loss</h5>
                  <p className="text-yellow-600 text-sm">Investor gains or loses based on contract</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "types-of-derivatives",
        title: "Common Types of Derivatives",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                The Four Main Categories
              </h3>
              <p className="text-green-700">
                There are several types of derivatives, each with its own purpose and level of risk. The four most common types are:
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <h3 className="text-xl font-bold mb-4 text-center bg-gray-50 p-4 border-b">
                Comparison of Common Derivatives
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border p-3 font-semibold text-gray-700">Derivative Type</th>
                      <th className="border p-3 font-semibold text-gray-700">What it is</th>
                      <th className="border p-3 font-semibold text-gray-700">Primary Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold text-blue-600">Futures</td>
                      <td className="border p-3 text-gray-700">
                        A contract to buy or sell an asset at a predetermined price at a specific time in the future.
                      </td>
                      <td className="border p-3 text-gray-700">
                        Hedging against price changes or speculating on future price movements.
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold text-green-600">Options</td>
                      <td className="border p-3 text-gray-700">
                        Gives the holder the right, but not the obligation, to buy (call option) or sell (put option) an asset at a set price within a specific period.
                      </td>
                      <td className="border p-3 text-gray-700">
                        Hedging, speculation, and generating income.
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold text-purple-600">Swaps</td>
                      <td className="border p-3 text-gray-700">
                        A contract where two parties agree to exchange sequences of cash flows for a set period.
                      </td>
                      <td className="border p-3 text-gray-700">
                        Managing interest rate risk or currency exchange risk.
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border p-3 font-semibold text-orange-600">Forwards</td>
                      <td className="border p-3 text-gray-700">
                        Similar to futures, but are private, customizable agreements between two parties and are not traded on an exchange.
                      </td>
                      <td className="border p-3 text-gray-700">
                        Hedging specific risks for a particular future date.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Key Differences</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Exchange-Traded vs OTC</h5>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• Futures & Options: Exchange-traded, standardized</li>
                    <li>• Forwards & Swaps: OTC, customizable</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Risk Levels</h5>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• Options: Limited risk (premium paid)</li>
                    <li>• Futures/Forwards: Unlimited risk</li>
                    <li>• Swaps: Moderate to high risk</li>
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
                Match the Derivative Type with its Primary Use
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each derivative type with its main purpose.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Derivative Types:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Futures</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Options</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Swaps</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Forwards</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Primary Uses:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Hedging against price changes or speculating</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Hedging, speculation, and generating income</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Managing interest rate or currency risk</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Hedging specific risks for future dates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "why-use-derivatives",
        title: "Why Do People Use Derivatives?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Multiple Strategic Purposes
              </h3>
              <p className="text-orange-700">
                Derivatives serve several important functions in the financial markets, each addressing different needs and objectives.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">🛡️ Hedging</h4>
                <p className="text-green-800 text-sm">
                  To reduce or manage risk. For example, a farmer can use a futures contract to lock in a price for their crop, protecting them from falling prices.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">🎯 Speculation</h4>
                <p className="text-blue-800 text-sm">
                  To bet on the future direction of an asset's price. Speculators aim to profit from price changes.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">⚖️ Leverage</h4>
                <p className="text-purple-800 text-sm">
                  Derivatives allow traders to control a large position with a relatively small amount of capital. This magnifies both potential gains and potential losses.
                </p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-2">🔄 Arbitrage</h4>
                <p className="text-indigo-800 text-sm">
                  To take advantage of price differences of the same asset in different markets.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Real-World Examples</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Hedging Example</h5>
                  <p className="text-yellow-600 text-sm">A farmer sells wheat futures to lock in a price before harvest, protecting against price drops.</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Speculation Example</h5>
                  <p className="text-yellow-600 text-sm">A trader buys call options on tech stocks, betting on a market rally.</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Leverage Example</h5>
                  <p className="text-yellow-600 text-sm">Using $1,000 to control a $10,000 position in futures contracts.</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Arbitrage Example</h5>
                  <p className="text-yellow-600 text-sm">Buying gold in London and selling it in New York for a profit.</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "risks-of-derivatives",
        title: "Risks of Derivatives",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">
                Understanding the Dangers
              </h3>
              <p className="text-red-700">
                While powerful, derivatives come with significant risks. Their complexity can lead to large losses, especially when using leverage.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">⚠️ Major Risks</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <div>
                      <strong>Leverage Risk:</strong> Small price movements can cause large losses
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <div>
                      <strong>Complexity Risk:</strong> Difficult to understand and value correctly
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <div>
                      <strong>Counterparty Risk:</strong> Risk that the other party won't fulfill obligations
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <div>
                      <strong>Market Risk:</strong> Exposure to adverse price movements
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">🛡️ Risk Management</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <div>
                      <strong>Education:</strong> Understand the underlying asset and contract terms
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <div>
                      <strong>Position Sizing:</strong> Never risk more than you can afford to lose
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <div>
                      <strong>Stop Losses:</strong> Set automatic exit points to limit losses
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <div>
                      <strong>Diversification:</strong> Don't put all your money in derivatives
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Leverage Visualization</h4>
              <div className="text-center">
                <div className="bg-blue-100 w-24 h-24 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">⚖️</span>
                </div>
                <p className="text-blue-700">
                  A seesaw demonstrating leverage - a small input (capital) creates a large movement (position size), showing both the potential for high returns and high losses.
                </p>
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
                Answer these questions to check your understanding of derivatives.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the difference between futures and forwards?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. How does leverage work in derivatives trading?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. Why might a company use interest rate swaps?</p>
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
                Congratulations! You've completed the lesson on derivatives. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Derivatives Basics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Financial contracts based on underlying assets</li>
                  <li>✅ Value derived from asset price fluctuations</li>
                  <li>✅ Two key concepts: underlying asset & contract</li>
                  <li>✅ Four main types: futures, options, swaps, forwards</li>
                  <li>✅ Used for hedging, speculation, leverage, arbitrage</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Risk & Management</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Significant risks due to complexity and leverage</li>
                  <li>✅ Education and understanding are crucial</li>
                  <li>✅ Position sizing and stop losses important</li>
                  <li>✅ Diversification reduces overall risk</li>
                  <li>✅ Never risk more than you can afford to lose</li>
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
                  <p className="text-blue-700 text-sm">Study futures</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">💼</span>
                  </div>
                  <p className="text-blue-700 text-sm">Learn options</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Practice analysis</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💡</span>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Conclusion</h4>
                  <p className="text-yellow-800">
                    Derivatives are sophisticated financial instruments. In the next lessons, we will explore futures and options in more detail.
                  </p>
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
