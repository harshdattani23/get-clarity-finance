"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';
import { ShoppingCart, Target, TrendingUp, Zap } from 'lucide-react';

export default function PlacingFirstTradePage() {
  const lessonData = {
    title: "Placing Your First Trade: Order Types",
    description: "Learn the essential order types—Market, Limit, and Stop-Loss—to gain full control over how you buy and sell stocks.",
    lessonSlug: "placing-your-first-trade-order-types",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/advanced-trading/placing-your-first-trade-order-types-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/advanced-trading/placing-your-first-trade-order-types-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/advanced-trading/placing-your-first-trade-order-types-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/advanced-trading/placing-your-first-trade-order-types-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/advanced-trading/placing-your-first-trade-order-types-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/advanced-trading/placing-your-first-trade-order-types-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of trading! In this lesson, you'll learn the essential order types—Market, Limit, and Stop-Loss—to gain full control over how you buy and sell stocks. Understanding these order types is crucial for controlling the price you pay and managing your risk effectively.",
      hi: "ट्रेडिंग की दुनिया में आपका स्वागत है! इस पाठ में, आप आवश्यक ऑर्डर प्रकारों—मार्केट, लिमिट, और स्टॉप-लॉस—को सीखेंगे ताकि आप स्टॉक खरीदने और बेचने पर पूरा नियंत्रण प्राप्त कर सकें। इन ऑर्डर प्रकारों को समझना आपके द्वारा भुगतान की जाने वाली कीमत को नियंत्रित करने और आपके जोखिम को प्रभावी ढंग से प्रबंधित करने के लिए महत्वपूर्ण है।",
      bn: "ট্রেডিংয়ের জগতে স্বাগতম! এই পাঠে, আপনি প্রয়োজনীয় অর্ডার প্রকারগুলি—মার্কেট, লিমিট, এবং স্টপ-লস—শিখবেন যাতে আপনি স্টক কেনা এবং বিক্রি করার উপর সম্পূর্ণ নিয়ন্ত্রণ অর্জন করতে পারেন। এই অর্ডার প্রকারগুলি বোঝা আপনার দ্বারা প্রদত্ত মূল্য নিয়ন্ত্রণ এবং আপনার ঝুঁকি কার্যকরভাবে পরিচালনার জন্য গুরুত্বপূর্ণ।",
      mr: "ट्रेडिंग च्या जगात आपले स्वागत आहे! या धड्यात, तुम्ही आवश्यक ऑर्डर प्रकार—मार्केट, लिमिट, आणि स्टॉप-लॉस—शिकाल जेणेकरून तुम्ही स्टॉक खरेदी आणि विक्रीवर पूर्ण नियंत्रण मिळवू शकता. या ऑर्डर प्रकारांना समजून घेणे तुम्ही दिलेली किंमत नियंत्रित करण्यासाठी आणि तुमचा जोखीम प्रभावीपणे व्यवस्थापित करण्यासाठी महत्त्वाचे आहे.",
      gu: "ટ્રેડિંગની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, તમે આવશ્યક ઓર્ડર પ્રકારો—માર્કેટ, લિમિટ, અને સ્ટોપ-લોસ—શીખશો જેથી તમે સ્ટોક ખરીદવા અને વેચવા પર સંપૂર્ણ નિયંત્રણ મેળવી શકો. આ ઓર્ડર પ્રકારોને સમજવું તમે ચૂકવતા ભાવને નિયંત્રિત કરવા અને તમારા જોખમને અસરકારક રીતે વ્યવસ્થાપિત કરવા માટે મહત્વપૂર્ણ છે.",
      ta: "வர்த்தக உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், நீங்கள் முக்கியமான ஆர்டர் வகைகளை—மார்க்கெட், லிமிட், மற்றும் ஸ்டாப்-லாஸ்—கற்றுக்கொள்வீர்கள், இதன் மூலம் நீங்கள் பங்குகளை வாங்குவதற்கும் விற்பதற்கும் முழு கட்டுப்பாட்டைப் பெறுவீர்கள். இந்த ஆர்டர் வகைகளைப் புரிந்துகொள்வது நீங்கள் செலுத்தும் விலையைக் கட்டுப்படுத்துவதற்கும் உங்கள் ஆபத்தைத் திறம்பட நிர்வகிப்பதற்கும் முக்கியமானது."
    },
    parts: [
      {
        id: "introduction",
        title: "Understanding Order Types",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-3xl font-bold text-blue-800 mb-4">
                You're Ready to Trade!
              </h3>
              <p className="text-blue-700 mb-4">
                You've opened your accounts, and you're ready to buy your first stock. But when you go to the trading terminal, you see different 'order types.' These aren't complicated; they are simply instructions you give your broker on how to execute your trade.
              </p>
              <p className="text-blue-700">
                Understanding them is crucial for controlling the price you pay and managing your risk. Let's look at the most common types.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Key Takeaway</h4>
              <p className="text-green-700">
                Order types are instructions to your broker on how to execute trades. They give you control over price, timing, and risk management.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Market orders for immediate execution</li>
                  <li>• Limit orders for price control</li>
                  <li>• Stop-loss orders for risk management</li>
                  <li>• GTT orders for long-term triggers</li>
                  <li>• When to use each order type</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Why Order Types Matter</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Control over execution price</li>
                  <li>• Risk management tools</li>
                  <li>• Strategic trading flexibility</li>
                  <li>• Cost optimization</li>
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
                Let's see how much you already know about order types!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the main difference between market and limit orders?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Market orders are cheaper than limit orders</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Market orders prioritize speed, limit orders prioritize price control</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) Market orders are only for buying, limit orders are only for selling</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Market orders are for beginners, limit orders are for professionals</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What is the primary purpose of a stop-loss order?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) To guarantee a profit</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) To protect against large losses</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) To get the best possible price</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) To delay trade execution</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "market-orders",
        title: "Market Orders: 'Get Me In Now!'",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-3 flex items-center">
                <ShoppingCart className="w-6 h-6 mr-3" />
                Market Order: Speed Over Price
              </h3>
              <p className="text-green-700">
                A <strong>Market Order</strong> is the most basic type of trade. It's an instruction to buy or sell a stock at the best available price in the current market.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">How Market Orders Work</h4>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">🎯 Execution Priority</h5>
                  <p className="text-green-700 text-sm">
                    When you place a market order, you are prioritizing speed over price. The order executes immediately at the current market price.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">⚡ Immediate Execution</h5>
                  <p className="text-blue-700 text-sm">
                    Market orders are filled instantly as long as there are willing buyers or sellers in the market.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">💰 Price Determination</h5>
                  <p className="text-purple-700 text-sm">
                    The price you get depends on the current market conditions and available liquidity.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Pros and Cons</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-medium text-green-700 mb-2">✅ Pros</h5>
                  <ul className="text-green-600 text-sm space-y-1">
                    <li>• Guaranteed execution</li>
                    <li>• Immediate fill</li>
                    <li>• Simple to use</li>
                    <li>• No price restrictions</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-medium text-red-700 mb-2">❌ Cons</h5>
                  <ul className="text-red-600 text-sm space-y-1">
                    <li>• No price guarantee</li>
                    <li>• Potential slippage</li>
                    <li>• Market volatility risk</li>
                    <li>• May pay more than expected</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-3">⚠️ Important Warning</h4>
              <p className="text-red-700 mb-3">
                <strong>Pro:</strong> Guarantees execution. <strong>Con:</strong> Doesn't guarantee the price. In a fast-moving market, you might pay more than you expected (this is called 'slippage').
              </p>
              <div className="bg-white p-4 rounded-lg border">
                <h5 className="font-medium text-red-800 mb-2">What is Slippage?</h5>
                <p className="text-red-700 text-sm">
                  Slippage occurs when the actual execution price differs from the expected price due to market movement between order placement and execution.
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "limit-orders",
        title: "Limit Orders: 'Only at This Price or Better'",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-blue-800 mb-3 flex items-center">
                <Target className="w-6 h-6 mr-3" />
                Limit Order: Price Control
              </h3>
              <p className="text-blue-700">
                A <strong>Limit Order</strong> gives you control over the price. It's an instruction to buy or sell a stock at a specific price or better.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">How Limit Orders Work</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">📈 Buy Limit Order</h5>
                  <p className="text-green-700 text-sm">
                    You set a maximum price you're willing to pay. The order only executes if the stock price falls to or below your limit price.
                  </p>
                  <p className="text-green-600 text-sm mt-2">
                    <strong>Example:</strong> If you set a buy limit at ₹100, you'll only buy if the price is ₹100 or lower.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h5 className="font-medium text-red-800 mb-2">📉 Sell Limit Order</h5>
                  <p className="text-red-700 text-sm">
                    You set a minimum price you're willing to accept. The order only executes if the stock price rises to or above your limit price.
                  </p>
                  <p className="text-red-600 text-sm mt-2">
                    <strong>Example:</strong> If you set a sell limit at ₹120, you'll only sell if the price is ₹120 or higher.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Pros and Cons</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-medium text-green-700 mb-2">✅ Pros</h5>
                  <ul className="text-green-600 text-sm space-y-1">
                    <li>• Price guarantee</li>
                    <li>• No slippage</li>
                    <li>• Better cost control</li>
                    <li>• Strategic entry/exit</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-medium text-red-700 mb-2">❌ Cons</h5>
                  <ul className="text-red-600 text-sm space-y-1">
                    <li>• No execution guarantee</li>
                    <li>• May miss opportunities</li>
                    <li>• Requires price monitoring</li>
                    <li>• More complex than market orders</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">When to Use Limit Orders</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">🛒 Buying Scenarios</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                    <li>• When you want a specific entry price</li>
                    <li>• During market volatility</li>
                    <li>• For large orders to avoid slippage</li>
                    <li>• When you're not in a hurry</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">💰 Selling Scenarios</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                                            <li>• When you want a specific exit price</li>
                        <li>• To lock in profits</li>
                        <li>• During market rallies</li>
                    <li>• For strategic portfolio management</li>
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
                Match the Order Type with its Best Use Case
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each order type with its most appropriate trading scenario.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Order Types:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Market Order</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Limit Order</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Stop-Loss Order</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Best Use Cases:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">When you need immediate execution and price is not critical</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">When you want to control the exact price you pay or receive</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">When you want to automatically sell if the price falls to a certain level</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "stop-loss-orders",
        title: "Stop-Loss Orders: 'Protect Me From a Big Loss'",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-red-800 mb-3 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3" />
                Stop-Loss Order: Risk Management
              </h3>
              <p className="text-red-700">
                A <strong>Stop-Loss Order</strong> is a crucial risk management tool. It's an order to sell a stock if its price falls to a certain level, known as the 'stop price.'
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">How Stop-Loss Orders Work</h4>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h5 className="font-medium text-red-800 mb-2">🛡️ Protection Mechanism</h5>
                  <p className="text-red-700 text-sm">
                    When the stop price is reached, the stop-loss order becomes a market order and sells the stock at the next available price.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">📊 Setting the Stop Price</h5>
                  <p className="text-blue-700 text-sm">
                    The stop price is typically set below your purchase price (for long positions) or above your selling price (for short positions).
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">⚡ Automatic Execution</h5>
                  <p className="text-green-700 text-sm">
                    Once triggered, the stop-loss executes automatically, requiring no further action from you.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Example Scenario</h4>
              <div className="bg-white p-4 rounded-lg border">
                <h5 className="font-medium text-yellow-800 mb-2">📈 Long Position Example</h5>
                <div className="space-y-2 text-yellow-700">
                  <p className="text-sm"><strong>Purchase:</strong> Buy 100 shares of ABC Corp at ₹100 per share</p>
                  <p className="text-sm"><strong>Stop-Loss:</strong> Set at ₹90 (10% below purchase price)</p>
                  <p className="text-sm"><strong>If price falls to ₹90:</strong> Stop-loss automatically sells your shares</p>
                  <p className="text-sm"><strong>Maximum loss:</strong> ₹1,000 (₹10 per share × 100 shares)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Stop-Loss Strategies</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">📏 Fixed Percentage</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                    <li>• Set stop at fixed % below entry</li>
                    <li>• Simple and consistent</li>
                    <li>• Easy to calculate</li>
                    <li>• May not account for volatility</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">📊 Technical Levels</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                    <li>• Set stop below support levels</li>
                    <li>• More sophisticated approach</li>
                    <li>• Adapts to market structure</li>
                    <li>• Requires technical analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "gtt-orders",
        title: "GTT (Good Till Triggered) Orders",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-orange-800 mb-3 flex items-center">
                <Zap className="w-6 h-6 mr-3" />
                GTT Order: Long-Term Triggers
              </h3>
              <p className="text-orange-700">
                A <strong>GTT Order</strong> allows you to place a long-term order that remains active until a trigger price is met. It can be used to set both stop-loss and target prices simultaneously.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">GTT Order Features</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">⏰ Long-Term Validity</h5>
                  <p className="text-green-700 text-sm">
                    GTT orders remain active for up to a year, unlike regular orders that expire at market close.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">🎯 Dual Functionality</h5>
                  <p className="text-blue-700 text-sm">
                    Can combine both stop-loss and target orders in a single instruction, providing comprehensive risk management.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">🔄 Automatic Management</h5>
                  <p className="text-purple-700 text-sm">
                    Once triggered, the GTT order automatically converts to a regular order and executes according to your specifications.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">GTT Order Example</h4>
              <div className="bg-white p-4 rounded-lg border">
                <h5 className="font-medium text-yellow-800 mb-2">📊 Setting Up a GTT Order</h5>
                <div className="space-y-2 text-yellow-700">
                  <p className="text-sm"><strong>Current Position:</strong> 100 shares of XYZ Corp at ₹150</p>
                  <p className="text-sm"><strong>Stop-Loss Trigger:</strong> ₹135 (10% below current price)</p>
                  <p className="text-sm"><strong>Target Trigger:</strong> ₹180 (20% above current price)</p>
                  <p className="text-sm"><strong>Action:</strong> Sell 100 shares when either trigger is hit</p>
                  <p className="text-sm"><strong>Duration:</strong> Order remains active for up to 1 year</p>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">When to Use GTT Orders</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">✅ Ideal Scenarios</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                    <li>• Long-term investment positions</li>
                    <li>• When you can't monitor markets daily</li>
                    <li>• Combining stop-loss and targets</li>
                    <li>• Vacation or business travel periods</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">❌ Not Suitable For</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                    <li>• Day trading or scalping</li>
                    <li>• Highly volatile stocks</li>
                    <li>• When you need immediate control</li>
                    <li>• Short-term positions</li>
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
                Answer these questions to check your understanding of order types.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What would you do if you wanted to buy a stock but only at a specific price or lower?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. How can you protect yourself from large losses when holding a stock position?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. When might you prefer a market order over a limit order?</p>
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
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                What You've Learned
              </h3>
              <p className="text-green-700">
                Congratulations! You've completed the lesson on order types. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Order Type Summary</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ <strong>Market Orders</strong> are for speed; you get the current price, whatever it may be.</li>
                  <li>✅ <strong>Limit Orders</strong> are for price control; you set your price, but the trade may not happen.</li>
                  <li>✅ <strong>Stop-Loss Orders</strong> are for risk management; they automatically sell to prevent large losses.</li>
                  <li>✅ <strong>GTT Orders</strong> are for long-term triggers, combining stop-loss and target orders.</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Strategic Applications</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Use market orders for immediate execution</li>
                  <li>• Use limit orders for price control</li>
                  <li>• Use stop-loss orders for risk management</li>
                  <li>• Use GTT orders for long-term planning</li>
                  <li>• Combine order types for optimal results</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Risk Management</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">🛡️ Protection</h5>
                  <p className="text-blue-600 text-sm">Stop-loss orders limit your downside risk</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">💰 Control</h5>
                  <p className="text-blue-600 text-sm">Limit orders control your entry and exit prices</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">⚡ Flexibility</h5>
                  <p className="text-blue-600 text-sm">Market orders provide immediate execution when needed</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💡</span>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Final Thought</h4>
                  <p className="text-yellow-800">
                    Understanding order types gives you the tools to trade like a professional. Each order type serves a specific purpose, and knowing when to use each one will significantly improve your trading results and risk management.
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
                  <p className="text-purple-700 text-sm">Practice with paper trading</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">💼</span>
                  </div>
                  <p className="text-purple-700 text-sm">Learn advanced strategies</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">📊</span>
                  </div>
                  <p className="text-purple-700 text-sm">Master risk management</p>
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
