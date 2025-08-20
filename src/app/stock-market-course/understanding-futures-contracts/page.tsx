"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

const UnderstandingFuturesContractsPage = () => {
  const lessonData = {
    title: "Understanding Futures Contracts",
    description: "Dive into the world of futures contracts. This lesson explains what they are, how they work, and how they differ from options, providing a clear understanding of this essential derivative.",
    lessonSlug: "understanding-futures-contracts",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/advanced/understanding-futures-contracts-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/advanced/understanding-futures-contracts-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/advanced/understanding-futures-contracts-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/advanced/understanding-futures-contracts-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/advanced/understanding-futures-contracts-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/advanced/understanding-futures-contracts-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of futures contracts! In this lesson, we'll dive deep into what futures are, how they work, and how they differ from options. You'll gain a clear understanding of this essential derivative instrument and how it's used for hedging and speculation.",
      hi: "फ्यूचर्स कॉन्ट्रैक्ट्स की दुनिया में आपका स्वागत है! इस पाठ में, हम गहराई से देखेंगे कि फ्यूचर्स क्या हैं, वे कैसे काम करते हैं, और वे ऑप्शन्स से कैसे अलग हैं। आप इस आवश्यक डेरिवेटिव इंस्ट्रूमेंट की स्पष्ट समझ प्राप्त करेंगे और यह हेजिंग और सट्टेबाजी के लिए कैसे उपयोग किया जाता है।",
      bn: "ফিউচার্স কন্ট্রাক্টের জগতে স্বাগতম! এই পাঠে, আমরা গভীরভাবে দেখব ফিউচার্স কী, তারা কীভাবে কাজ করে, এবং তারা অপশন থেকে কীভাবে আলাদা। আপনি এই অত্যাবশ্যক ডেরিভেটিভ যন্ত্রের একটি স্পষ্ট বোধগম্যতা অর্জন করবেন এবং এটি হেজিং এবং স্পেকুলেশনের জন্য কীভাবে ব্যবহার করা হয়।",
      mr: "फ्युचर्स कॉन्ट्रॅक्ट्स च्या जगात आपले स्वागत आहे! या धड्यात, आपण खोलवर पाहू की फ्युचर्स काय आहेत, ते कसे काम करतात, आणि ते ऑप्शन्स पासून कसे वेगळे आहेत. तुम्ही या आवश्यक डेरिव्हेटिव्ह इन्स्ट्रુમેન્ટची स्पष્ટ समज मिळवाल आणि ते हेजिंग आणि सट्टेबाजीसाठी कसे वापरले जाते.",
      gu: "ફ્યુચર્સ કોન્ટ્રાક્ટ્સની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, આપણે ઊંડાઈથી જોઈશું કે ફ્યુચર્સ શું છે, તેઓ કેવી રીતે કામ કરે છે, અને તેઓ ઓપ્શન્સથી કેવી રીતે અલગ છે. તમે આ આવશ્યક ડેરિવેટિવ ઇન્સ્ટ્રુમેન્ટની સ્પષ્ટ સમજ મેળવશો અને તે હેજિંગ અને સટ્ટાબાજી માટે કેવી રીતે વપરાય છે.",
      ta: "ஃப்யூச்சர்ஸ் ஒப்பந்தங்களின் உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், ஃப்யூச்சர்ஸ் என்ன, அவை எப்படி வேலை செய்கின்றன, மேலும் அவை ஆப்ஷன்களிலிருந்து எப்படி வேறுபடுகின்றன என்பதை ஆழமாக ஆராய்வோம். இந்த அத்தியாவசிய டெரிவேடிவ் கருவியின் தெளிவான புரிதலை நீங்கள் பெறுவீர்கள் மேலும் அது ஹெட்ஜிங் மற்றும் ஸ்பெகுலேஷனுக்கு எப்படி பயன்படுத்தப்படுகிறது என்பதையும்."
    },
    parts: [
      {
        id: "introduction",
        title: "What are Futures Contracts?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                The Cornerstone of Derivatives
              </h3>
              <p className="text-blue-700 mb-4">
                Futures contracts are a cornerstone of the derivatives market, widely used by producers, consumers, and speculators. Unlike options, which give you a choice, a futures contract is an obligation.
              </p>
              <p className="text-blue-700">
                It's a standardized legal agreement to buy or sell a particular commodity or financial instrument at a predetermined price at a specified time in the future. Let's explore how these contracts work.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Key Takeaway</h4>
              <p className="text-green-700">
                Futures contracts are obligations, not choices. Both buyer and seller must fulfill the contract at expiration, making them powerful tools for hedging but also carrying significant risk.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• What futures contracts are and how they work</li>
                  <li>• Key characteristics and features</li>
                  <li>• Real-world examples and applications</li>
                  <li>• Differences from options</li>
                  <li>• Risk management strategies</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Why Futures Matter</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Price risk management</li>
                  <li>• Market speculation</li>
                  <li>• Portfolio diversification</li>
                  <li>• Leverage opportunities</li>
                  <li>• Global market access</li>
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
                Let's see how much you already know about futures contracts!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the key difference between futures and options?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Futures are cheaper than options</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Futures are obligations, options are rights</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) Futures are only for commodities</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Futures have longer expiration dates</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What does 'marked-to-market' mean in futures?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Futures are traded on exchanges</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Gains and losses are settled daily</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Futures are standardized contracts</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Futures have delivery obligations</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "what-is-futures",
        title: "What is a Futures Contract?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                The Foundation
              </h3>
              <p className="text-indigo-700">
                A futures contract is a legally binding agreement to buy or sell a standardized asset at a future date at a price agreed upon today.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Key Characteristics</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-green-800 mb-2">📋 Standardization</h5>
                  <p className="text-green-700 text-sm">
                    Futures contracts are standardized in terms of quantity, quality, and delivery date, which allows them to be traded on an exchange.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-2">⚖️ Obligation</h5>
                  <p className="text-blue-700 text-sm">
                    Unlike options, both the buyer and the seller are obligated to fulfill the contract at expiration. The buyer must buy, and the seller must sell.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-semibold text-purple-800 mb-2">🏢 Exchange Traded</h5>
                  <p className="text-purple-700 text-sm">
                    Futures are traded on organized exchanges, which provides liquidity and reduces counterparty risk.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h5 className="font-semibold text-orange-800 mb-2">📊 Marked-to-Market</h5>
                  <p className="text-orange-700 text-sm">
                    Gains and losses on futures contracts are settled daily, a process known as 'marking to market'.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Types of Futures</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">🌾 Commodity Futures</h5>
                  <ul className="text-yellow-600 text-sm space-y-1">
                    <li>• Agricultural (wheat, corn, soybeans)</li>
                    <li>• Energy (crude oil, natural gas)</li>
                    <li>• Metals (gold, silver, copper)</li>
                    <li>• Livestock (cattle, hogs)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">💱 Financial Futures</h5>
                  <ul className="text-yellow-600 text-sm space-y-1">
                    <li>• Stock indices (S&P 500, Nifty)</li>
                    <li>• Interest rates (Treasury bonds)</li>
                    <li>• Currencies (EUR/USD, USD/JPY)</li>
                    <li>• Single stocks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "how-futures-work",
        title: "How Do Futures Work? A Simple Example",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                The Wheat Farmer Example
              </h3>
              <p className="text-green-700">
                Let's use a real-world example to understand how futures contracts work in practice. This will show you the hedging mechanism that makes futures so valuable.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">The Scenario</h4>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">👩‍🌾 The Farmer</h5>
                  <p className="text-green-700 text-sm">
                    Will harvest 1,000 bushels of wheat in three months. Current price: ₹20 per bushel.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">😰 The Problem</h5>
                  <p className="text-blue-700 text-sm">
                    Worried that wheat prices might fall before harvest, reducing her profit.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">🛡️ The Solution</h5>
                  <p className="text-purple-700 text-sm">
                    Sells a futures contract to deliver 1,000 bushels in three months at ₹20 per bushel.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">The Counterparty: The Bread Maker</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-medium text-gray-800 mb-2">👨‍🍳 The Bread Maker's Situation</h5>
                  <p className="text-gray-700 text-sm">
                    Needs wheat for production and is worried that prices might rise, increasing his costs.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-medium text-gray-800 mb-2">💡 The Solution</h5>
                  <p className="text-gray-700 text-sm">
                    Buys the futures contract from the farmer, locking in the price at ₹20 per bushel.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">What Happens at Expiration</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-medium text-green-700 mb-2">✅ Scenario 1: Price Falls to ₹15</h5>
                  <p className="text-green-600 text-sm">
                    <strong>Farmer:</strong> Still sells at ₹20 (protected from price drop)<br/>
                    <strong>Bread Maker:</strong> Must buy at ₹20 (overpays by ₹5)
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-medium text-blue-700 mb-2">✅ Scenario 2: Price Rises to ₹25</h5>
                  <p className="text-blue-600 text-sm">
                    <strong>Farmer:</strong> Must sell at ₹20 (misses ₹5 profit)<br/>
                    <strong>Bread Maker:</strong> Still buys at ₹20 (saves ₹5)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Key Benefits of This Arrangement</h4>
              <ul className="space-y-2 text-indigo-700">
                <li>• <strong>Farmer:</strong> Price certainty and risk reduction</li>
                <li>• <strong>Bread Maker:</strong> Cost certainty and budget planning</li>
                <li>• <strong>Both:</strong> Protection against adverse price movements</li>
                <li>• <strong>Market:</strong> Price discovery and liquidity</li>
              </ul>
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
                Match the Futures Participant with their Motivation
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each futures market participant with their primary motivation.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Participants:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Producer (Farmer)</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Consumer (Bread Maker)</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Speculator</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Motivations:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Lock in selling price to protect against price drops</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Lock in buying price to protect against price increases</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Profit from price movements without owning the asset</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "futures-vs-options",
        title: "Futures vs. Options: The Key Difference",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">
                Understanding the Critical Distinction
              </h3>
              <p className="text-red-700">
                The most critical distinction between futures and options lies in the obligation. This difference fundamentally changes how you approach risk management and trading strategies.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">The Core Difference</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h5 className="font-semibold text-red-800 mb-3">⚖️ Futures: Obligation</h5>
                  <p className="text-red-700 text-sm mb-3">
                    A futures contract is an <strong>obligation</strong> to transact. Both parties must fulfill their end of the deal.
                  </p>
                  <ul className="text-red-600 text-sm space-y-1">
                    <li>• Buyer must buy</li>
                    <li>• Seller must sell</li>
                    <li>• No choice at expiration</li>
                    <li>• Unlimited risk potential</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-green-800 mb-3">🎯 Options: Right</h5>
                  <p className="text-green-700 text-sm mb-3">
                    An option is the <strong>right</strong>, but not the obligation, to transact. You can choose to exercise or let it expire.
                  </p>
                  <ul className="text-green-600 text-sm space-y-1">
                    <li>• Buyer has the choice</li>
                    <li>• Seller has the obligation</li>
                    <li>• Can let expire worthless</li>
                    <li>• Limited risk (premium only)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Risk Comparison</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">📈 Futures Risk</h5>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• Unlimited loss potential</li>
                    <li>• Daily margin calls</li>
                    <li>• Must maintain position</li>
                    <li>• Counterparty risk</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">🛡️ Options Risk</h5>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• Limited to premium paid</li>
                    <li>• No margin calls</li>
                    <li>• Can abandon position</li>
                    <li>• Exchange guarantees</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">When to Use Each</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">🌾 Use Futures When:</h5>
                  <ul className="text-yellow-600 text-sm space-y-1">
                    <li>• You need price certainty</li>
                    <li>• You can handle margin calls</li>
                    <li>• You want direct exposure</li>
                    <li>• You're hedging large positions</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">🎯 Use Options When:</h5>
                  <ul className="text-yellow-600 text-sm space-y-1">
                    <li>• You want limited risk</li>
                    <li>• You need flexibility</li>
                    <li>• You're speculating</li>
                    <li>• You want leverage</li>
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
                Answer these questions to check your understanding of futures contracts.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Why might a speculator prefer futures over options?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What happens if you can't meet a margin call on a futures position?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How do futures help with price discovery in markets?</p>
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
        title: "Conclusion: A Tool for Certainty in an Uncertain World",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                What You've Learned
              </h3>
              <p className="text-green-700">
                Congratulations! You've completed the lesson on futures contracts. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Futures Basics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Legally binding obligations</li>
                  <li>✅ Standardized contracts</li>
                  <li>✅ Exchange-traded instruments</li>
                  <li>✅ Daily mark-to-market</li>
                  <li>✅ Delivery at expiration</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Key Applications</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Hedging price risk</li>
                  <li>✅ Speculation on price movements</li>
                  <li>✅ Portfolio diversification</li>
                  <li>✅ Leverage opportunities</li>
                  <li>✅ Global market access</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Risk Management</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">🛡️ Hedging</h5>
                  <p className="text-blue-600 text-sm">Protect against adverse price movements</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">⚖️ Margin Management</h5>
                  <p className="text-blue-600 text-sm">Maintain sufficient funds for positions</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">📊 Position Sizing</h5>
                  <p className="text-blue-600 text-sm">Don't risk more than you can afford</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💡</span>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Final Thought</h4>
                  <p className="text-yellow-800">
                    Futures contracts are a vital tool for managing price risk in a wide variety of markets, from agriculture to finance. By locking in a future price, they provide certainty for businesses and an opportunity for speculators. However, their obligatory nature and the potential for large losses mean they should be approached with a thorough understanding and a clear strategy.
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
                  <p className="text-purple-700 text-sm">Study margin requirements</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">💼</span>
                  </div>
                  <p className="text-purple-700 text-sm">Learn hedging strategies</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">📊</span>
                  </div>
                  <p className="text-purple-700 text-sm">Practice risk management</p>
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

export default UnderstandingFuturesContractsPage;
