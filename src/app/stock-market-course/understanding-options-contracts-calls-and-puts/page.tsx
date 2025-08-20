"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

const UnderstandingOptionsContractsPage = () => {
  const lessonData = {
    title: "Understanding Options Contracts: Calls and Puts",
    description: "Unlock the power of options. This lesson demystifies call and put options, explaining how they work and their fundamental role in both speculation and hedging strategies.",
    lessonSlug: "understanding-options-contracts-calls-and-puts",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/intermediate/understanding-options-contracts-calls-and-puts-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/intermediate/understanding-options-contracts-calls-and-puts-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/intermediate/understanding-options-contracts-calls-and-puts-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/intermediate/understanding-options-contracts-calls-and-puts-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/intermediate/understanding-options-contracts-calls-and-puts-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/intermediate/understanding-options-contracts-calls-and-puts-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of options! In this lesson, we'll unlock the power of options by demystifying call and put options. You'll learn how they work, their fundamental role in both speculation and hedging strategies, and how to use them effectively in your trading arsenal.",
      hi: "ऑप्शन्स की दुनिया में आपका स्वागत है! इस पाठ में, हम कॉल और पुट ऑप्शन्स को समझाकर ऑप्शन्स की शक्ति को उजागर करेंगे। आप सीखेंगे कि वे कैसे काम करते हैं, सट्टेबाजी और हेजिंग रणनीतियों में उनकी मौलिक भूमिका, और अपने ट्रेडिंग शस्त्रागार में उनका प्रभावी उपयोग कैसे करें।",
      bn: "অপশনগুলির জগতে স্বাগতম! এই পাঠে, আমরা কল এবং পুট অপশনগুলি ব্যাখ্যা করে অপশনগুলির শক্তি উন্মোচন করব। আপনি শিখবেন তারা কীভাবে কাজ করে, স্পেকুলেশন এবং হেজিং কৌশলে তাদের মৌলিক ভূমিকা, এবং আপনার ট্রেডিং আর্সেনালে তাদের কার্যকরভাবে কীভাবে ব্যবহার করবেন।",
      mr: "ऑप्शन्स च्या जगात आपले स्वागत आहे! या धड्यात, आपण कॉल आणि पुट ऑप्शन्स स्पष्ट करून ऑप्शन्स ची शक्ती उघड करू. तुम्ही शिकाल ते कसे काम करतात, सट्टेबाजी आणि हेजिंग धोरणांमध्ये त्यांची मूलभૂत भूमिका, आणि तुमच्या ट्रेडिंग शस्त्रागारात त्यांचा प्रभावी वापर कसा करावा.",
      gu: "ઓપ્શન્સની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, આપણે કૉલ અને પુટ ઓપ્શન્સને સમજાવીને ઓપ્શન્સની શક્તિને ઉઘાડી કરીશું. તમે શીખશો કે તેઓ કેવી રીતે કામ કરે છે, સટ્ટાબાજી અને હેજિંગ વ્યૂહરચનામાં તેમની મૂળભૂત ભૂમિકા, અને તમારા ટ્રેડિંગ શસ્ત્રાગારમાં તેમનો પ્રભાવશાળી ઉપયોગ કેવી રીતે કરવો.",
      ta: "ஆப்ஷன்களின் உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், கால் மற்றும் புட் ஆப்ஷன்களை விளக்குவதன் மூலம் ஆப்ஷன்களின் சக்தியை வெளிப்படுத்துவோம். அவை எப்படி வேலை செய்கின்றன, ஸ்பெகுலேஷன் மற்றும் ஹெட்ஜிங் உத்திகளில் அவற்றின் அடிப்படை பங்கு, மேலும் உங்கள் வர்த்தக ஆயுதக் கிடங்கில் அவற்றை எப்படி திறம்பட பயன்படுத்துவது என்பதை நீங்கள் கற்றுக்கொள்வீர்கள்."
    },
    parts: [
      {
        id: "introduction",
        title: "What are Options?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                The Power of Options
              </h3>
              <p className="text-blue-700 mb-4">
                Options are one of the most versatile and powerful tools in the financial markets. Unlike stocks, where you simply buy or sell ownership, options are contracts that give the holder the right, but not the obligation, to buy or sell an underlying asset at a predetermined price within a specific timeframe.
              </p>
              <p className="text-blue-700">
                This unique feature opens up a world of strategic possibilities. Let's break down the two fundamental types of options: Calls and Puts.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Key Takeaway</h4>
              <p className="text-green-700">
                Options give you the right, but not the obligation, to buy or sell an asset at a predetermined price. This flexibility makes them powerful tools for both speculation and risk management.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• What options are and how they work</li>
                  <li>• Key terms: strike price, expiration, premium</li>
                  <li>• Call options: the right to buy</li>
                  <li>• Put options: the right to sell</li>
                  <li>• Real-world examples and strategies</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Why Options Matter</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Leverage with limited risk</li>
                  <li>• Hedging against losses</li>
                  <li>• Income generation strategies</li>
                  <li>• Portfolio protection</li>
                  <li>• Strategic flexibility</li>
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
                Let's see how much you already know about options!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the key difference between options and stocks?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Options are cheaper than stocks</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Options give you the right, but not the obligation, to buy/sell</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) Options are only for professional traders</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Options are riskier than stocks</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What do you call the price you pay to buy an option?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Strike price</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Premium</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Market price</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Exercise price</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "what-is-an-option",
        title: "What is an Option?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                The Foundation
              </h3>
              <p className="text-indigo-700">
                An option is a contract that derives its value from an underlying asset, like a stock. The contract offers the buyer the opportunity to buy or sell the asset at an agreed-upon price.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Key Terms to Know</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-green-800 mb-2">🎯 Strike Price</h5>
                  <p className="text-green-700 text-sm">
                    The price at which the underlying asset can be bought or sold.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-2">📅 Expiration Date</h5>
                  <p className="text-blue-700 text-sm">
                    The date after which the option is no longer valid.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-semibold text-purple-800 mb-2">💰 Premium</h5>
                  <p className="text-purple-700 text-sm">
                    The price you pay to buy the option contract.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h5 className="font-semibold text-orange-800 mb-2">📈 Underlying Asset</h5>
                  <p className="text-orange-700 text-sm">
                    The stock, commodity, or other financial instrument that the option is based on.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Example Scenario</h4>
              <div className="space-y-3">
                <p className="text-yellow-700">
                  <strong>Stock:</strong> Apple (AAPL) currently trading at $150
                </p>
                <p className="text-yellow-700">
                  <strong>Option:</strong> Call option with strike price $160, expiring in 30 days
                </p>
                <p className="text-yellow-700">
                  <strong>Premium:</strong> $5 per share (total cost: $500 for 100 shares)
                </p>
                <p className="text-yellow-700">
                  <strong>Right:</strong> You can buy 100 AAPL shares at $160 anytime in the next 30 days
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "call-options",
        title: "Call Options: The Right to Buy",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Betting on Price Increases
              </h3>
              <p className="text-green-700">
                A <strong>Call Option</strong> gives the holder the right, but not the obligation, to <strong>buy</strong> an asset at the strike price on or before the expiration date.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">When to Use Call Options</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">📈</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Bullish Outlook</h5>
                    <p className="text-gray-700 text-sm">You expect the underlying asset's price to rise</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💡</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Leverage</h5>
                    <p className="text-gray-700 text-sm">Control more shares with less capital than buying stock directly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">🛡️</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Limited Risk</h5>
                    <p className="text-gray-700 text-sm">Maximum loss is limited to the premium paid</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">How Call Options Work</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-gray-800 mb-2">Profitable Scenario:</p>
                  <p className="text-gray-700 text-sm">If AAPL rises to $170, you can exercise your option to buy at $160, then sell at $170 for a $10 profit per share (minus the $5 premium = $5 net profit)</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-gray-800 mb-2">Break-even Point:</p>
                  <p className="text-gray-700 text-sm">Stock price = Strike price + Premium = $160 + $5 = $165</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-gray-800 mb-2">Loss Scenario:</p>
                  <p className="text-gray-700 text-sm">If AAPL stays below $165, you lose money (maximum loss = $5 premium)</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "put-options",
        title: "Put Options: The Right to Sell",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">
                Betting on Price Decreases
              </h3>
              <p className="text-red-700">
                A <strong>Put Option</strong> gives the holder the right, but not the obligation, to <strong>sell</strong> an asset at the strike price on or before the expiration date.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">When to Use Put Options</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">📉</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Bearish Outlook</h5>
                    <p className="text-gray-700 text-sm">You expect the underlying asset's price to fall</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">🛡️</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Portfolio Protection</h5>
                    <p className="text-gray-700 text-sm">Hedge against potential losses in your stock portfolio</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💰</div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Income Generation</h5>
                    <p className="text-gray-700 text-sm">Sell puts to collect premiums (covered put strategy)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">How Put Options Work</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-gray-800 mb-2">Profitable Scenario:</p>
                  <p className="text-gray-700 text-sm">If AAPL falls to $140, you can buy shares at $140, then exercise your put to sell at $160 for a $20 profit per share (minus the $5 premium = $15 net profit)</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-gray-800 mb-2">Break-even Point:</p>
                  <p className="text-gray-700 text-sm">Stock price = Strike price - Premium = $160 - $5 = $155</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-gray-800 mb-2">Loss Scenario:</p>
                  <p className="text-gray-700 text-sm">If AAPL stays above $155, you lose money (maximum loss = $5 premium)</p>
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
                Match the Option Type with its Strategy
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each option type with its primary use case.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Option Types:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Call Option</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Put Option</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Primary Use Cases:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Bet on price increases (bullish)</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Bet on price decreases (bearish)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "real-estate-analogy",
        title: "A Simple Analogy: A Real Estate Deal",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Understanding Through Real Estate
              </h3>
              <p className="text-orange-700">
                Let's use a real estate example to make options easier to understand. This analogy will help clarify how call options work in practice.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">The Scenario</h4>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">🏠 The Property</h5>
                  <p className="text-green-700 text-sm">
                    A piece of land you want to buy for ₹10 Lakhs, but you need 3 months to secure financing.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">📋 The Option Contract</h5>
                  <p className="text-blue-700 text-sm">
                    You pay the seller ₹50,000 to have the exclusive right to buy the land for ₹10 Lakhs within those 3 months.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">💰 The Premium</h5>
                  <p className="text-purple-700 text-sm">
                    This ₹50,000 is the 'premium' - the price you pay for the option.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Two Possible Outcomes</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-medium text-green-700 mb-2">✅ Good News Scenario</h5>
                  <p className="text-green-600 text-sm">
                    A developer announces a new project nearby and the land's value shoots up to ₹15 Lakhs. You can exercise your option, buy it for ₹10 Lakhs, and immediately have a valuable asset worth ₹15 Lakhs.
                  </p>
                  <p className="text-green-600 text-sm mt-2">
                    <strong>Profit:</strong> ₹15 Lakhs - ₹10 Lakhs - ₹50,000 = ₹4.5 Lakhs
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-medium text-red-700 mb-2">❌ Bad News Scenario</h5>
                  <p className="text-red-600 text-sm">
                    The value drops to ₹8 Lakhs due to market conditions. You can let the option expire, and your only loss is the ₹50,000 premium.
                  </p>
                  <p className="text-red-600 text-sm mt-2">
                    <strong>Loss:</strong> ₹50,000 (limited to premium paid)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Key Lessons from This Analogy</h4>
              <ul className="space-y-2 text-blue-700">
                <li>• <strong>Limited Risk:</strong> Your maximum loss is the premium (₹50,000)</li>
                <li>• <strong>Unlimited Upside:</strong> If the land value increases significantly, you profit</li>
                <li>• <strong>Time Value:</strong> The option has an expiration date (3 months)</li>
                <li>• <strong>Strategic Flexibility:</strong> You can choose to exercise or let it expire</li>
              </ul>
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
                Answer these questions to check your understanding of options.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the main advantage of buying options over buying stock directly?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Why might an investor buy a put option on a stock they already own?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What happens to an option if it expires "out of the money"?</p>
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
        title: "Conclusion: A Tool for Strategy and Flexibility",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                What You've Learned
              </h3>
              <p className="text-green-700">
                Congratulations! You've completed the lesson on options contracts. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Options Basics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Contracts giving rights, not obligations</li>
                  <li>✅ Key terms: strike price, expiration, premium</li>
                  <li>✅ Underlying assets determine value</li>
                  <li>✅ Limited risk (premium only)</li>
                  <li>✅ Strategic flexibility and leverage</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Call vs Put Options</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ <strong>Calls:</strong> Right to buy (bullish strategy)</li>
                  <li>✅ <strong>Puts:</strong> Right to sell (bearish strategy)</li>
                  <li>✅ Both offer limited risk</li>
                  <li>✅ Both provide leverage</li>
                  <li>✅ Both can be used for hedging</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Strategic Applications</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">📈 Speculation</h5>
                  <p className="text-blue-600 text-sm">Bet on price direction with limited risk</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">🛡️ Hedging</h5>
                  <p className="text-blue-600 text-sm">Protect portfolio against adverse moves</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">💰 Income</h5>
                  <p className="text-blue-600 text-sm">Generate income through premium collection</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💡</span>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Final Thought</h4>
                  <p className="text-yellow-800">
                    Options are not just for speculation; they are powerful tools for hedging and managing risk. By understanding the fundamental difference between calls (betting on a price increase) and puts (betting on a price decrease), you can begin to explore more advanced strategies to enhance your portfolio and protect your investments.
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
                  <p className="text-purple-700 text-sm">Study option Greeks</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">💼</span>
                  </div>
                  <p className="text-purple-700 text-sm">Learn strategies</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">📊</span>
                  </div>
                  <p className="text-purple-700 text-sm">Practice analysis</p>
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

export default UnderstandingOptionsContractsPage;
