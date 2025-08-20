"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function OptionGreeksPage() {
  const lessonData = {
    title: "Understanding Option Greeks",
    description: "Demystify the 'Greeks' (Delta, Gamma, Theta, Vega) to understand and manage the risks and rewards of options positions.",
    lessonSlug: "option-greeks",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/options/option-greeks-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/options/option-greeks-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/options/option-greeks-bn.m4a",
      te: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/options/option-greeks-te.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/options/option-greeks-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/options/option-greeks-mr.m4a"
    },
    transcript: {
      en: "Understanding Option Greeks: Learn about Delta, Gamma, Theta, and Vega - the mathematical measures that help traders understand how various factors affect option prices and manage risk effectively.",
      hi: "ऑप्शन ग्रीक्स को समझना: डेल्टा, गामा, थीटा और वेगा के बारे में जानें - गणितीय माप जो व्यापारियों को यह समझने में मदद करते हैं कि विभिन्न कारक ऑप्शन की कीमतों को कैसे प्रभावित करते हैं।",
      bn: "অপশন গ্রিকস বোঝা: ডেল্টা, গামা, থিটা এবং ভেগা সম্পর্কে জানুন - গাণিতিক পরিমাপ যা ব্যবসায়ীদের সাহায্য করে।",
      te: "ఆప్షన్ గ్రీక్స్ అర్థం చేసుకోవడం: డెల్టా, గామా, థీటా మరియు వెగా గురించి తెలుసుకోండి - గణిత కొలతలు.",
      ta: "ஆப்ஷன் கிரீக்ஸைப் புரிந்துகொள்வது: டெல்டா, காமா, தீட்டா மற்றும் வெகா பற்றி அறியுங்கள் - கணித அளவீடுகள்.",
      mr: "ऑप्शन ग्रीक्स समजून घेणे: डेल्टा, गामा, थीटा आणि वेगा बद्दल जाणून घ्या - गणितीय मापन."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Option Greeks",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <p className="text-blue-800 text-lg leading-relaxed">
                Option Greeks are mathematical measures that help traders understand how various factors affect the price of an option. 
                They are essential tools for managing risk and making informed trading decisions.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Why Greeks Matter</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Risk Management</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Understand position exposure</li>
                    <li>• Manage portfolio risk</li>
                    <li>• Make informed decisions</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Price Sensitivity</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Predict price changes</li>
                    <li>• Optimize entry/exit</li>
                    <li>• Time trades effectively</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "delta",
        title: "Delta: The Directional Risk",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Delta (Δ) - Directional Exposure
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <p className="text-gray-700 mb-4">
                    Delta measures how much an option's price changes for every ₹1 change in the underlying asset's price.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-3">Call Options</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Positive delta (0 to 1)</li>
                        <li>• At-the-money: ~0.5</li>
                        <li>• Deep in-the-money: ~1.0</li>
                        <li>• Out-of-the-money: ~0.0</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-700 mb-3">Put Options</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Negative delta (-1 to 0)</li>
                        <li>• At-the-money: ~-0.5</li>
                        <li>• Deep in-the-money: ~-1.0</li>
                        <li>• Out-of-the-money: ~0.0</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-3">💡 Delta Interpretation</h4>
                  <ul className="space-y-2 text-yellow-700 text-sm">
                    <li>• Delta of 0.6 means option price changes ₹0.60 for every ₹1 change in stock price</li>
                    <li>• Delta approaches 1.0 as call options go deeper in-the-money</li>
                    <li>• Delta approaches -1.0 as put options go deeper in-the-money</li>
                    <li>• Delta is highest for at-the-money options</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "gamma",
        title: "Gamma: The Rate of Change",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                Gamma (Γ) - Delta Sensitivity
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-700 mb-4">
                    Gamma measures how much delta changes for every ₹1 change in the underlying asset's price.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-blue-700 mb-3">Key Characteristics</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Highest for at-the-money options</li>
                        <li>• Increases as expiration approaches</li>
                        <li>• Measures delta's rate of change</li>
                        <li>• Always positive for long options</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-3">Risk Implications</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• High gamma = rapid delta changes</li>
                        <li>• Increased position risk</li>
                        <li>• Need for frequent hedging</li>
                        <li>• Higher profit/loss potential</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-medium text-orange-800 mb-3">⚠️ Gamma Risk Management</h4>
                  <ul className="space-y-2 text-orange-700 text-sm">
                    <li>• High gamma positions require active management</li>
                    <li>• Consider gamma when sizing positions</li>
                    <li>• Monitor gamma exposure in portfolio</li>
                    <li>• Use gamma-neutral strategies for stability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "theta",
        title: "Theta: The Time Decay",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-red-800 mb-4">
                Theta (Θ) - Time Decay
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <p className="text-gray-700 mb-4">
                    Theta measures how much an option's value decreases as time passes (time decay).
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-red-700 mb-3">Time Decay Characteristics</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Always negative for long options</li>
                        <li>• Accelerates near expiration</li>
                        <li>• Highest for at-the-money options</li>
                        <li>• Affects out-of-the-money most</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-3">Practical Impact</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Options lose value daily</li>
                        <li>• Decay accelerates exponentially</li>
                        <li>• Time is the enemy of buyers</li>
                        <li>• Time is the friend of sellers</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-3">📅 Theta Strategies</h4>
                  <ul className="space-y-2 text-purple-700 text-sm">
                    <li>• Sell options to collect theta (time premium)</li>
                    <li>• Avoid holding long options too close to expiration</li>
                    <li>• Consider calendar spreads to manage theta</li>
                    <li>• Use theta decay in your favor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "vega",
        title: "Vega: The Volatility Risk",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
                Vega (ν) - Volatility Sensitivity
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <p className="text-gray-700 mb-4">
                    Vega measures how much an option's price changes for every 1% change in implied volatility.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-indigo-700 mb-3">Volatility Impact</h4>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Higher volatility = higher option prices</li>
                        <li>• At-the-money options most sensitive</li>
                        <li>• Longer-term options have higher vega</li>
                        <li>• Vega decreases as expiration approaches</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-700 mb-3">Trading Implications</h4>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• High vega = volatility sensitive</li>
                        <li>• Consider volatility forecasts</li>
                        <li>• Vega-neutral strategies available</li>
                        <li>• Monitor volatility environment</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <h4 className="font-medium text-teal-800 mb-3">🌊 Volatility Trading</h4>
                  <ul className="space-y-2 text-teal-700 text-sm">
                    <li>• Long options benefit from volatility increases</li>
                    <li>• Short options benefit from volatility decreases</li>
                    <li>• Consider vega when choosing expiration</li>
                    <li>• Monitor implied vs. historical volatility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "practical-applications",
        title: "Practical Applications",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-emerald-800 mb-4">
                Using Greeks in Practice
              </h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-emerald-700 mb-3">Portfolio Management</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <h5 className="font-medium text-emerald-700 mb-2">Risk Assessment</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Calculate total delta exposure</li>
                          <li>• Monitor gamma risk</li>
                          <li>• Assess theta decay impact</li>
                          <li>• Evaluate volatility sensitivity</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <h5 className="font-medium text-emerald-700 mb-2">Position Sizing</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Consider gamma when sizing</li>
                          <li>• Account for theta decay</li>
                          <li>• Factor in volatility risk</li>
                          <li>• Balance risk vs. reward</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-emerald-700 mb-3">Strategy Selection</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <h5 className="font-medium text-emerald-700 mb-2">Directional Trades</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• High delta for strong moves</li>
                          <li>• Manage gamma risk</li>
                          <li>• Consider time decay</li>
                          <li>• Monitor volatility impact</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-emerald-200">
                        <h5 className="font-medium text-emerald-700 mb-2">Neutral Strategies</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Delta-neutral positions</li>
                          <li>• Gamma-neutral spreads</li>
                          <li>• Theta-positive strategies</li>
                          <li>• Vega-neutral approaches</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-3">🎯 Trading Checklist</h4>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Check delta for directional exposure</li>
                    <li>• Assess gamma for risk management</li>
                    <li>• Consider theta for timing decisions</li>
                    <li>• Evaluate vega for volatility impact</li>
                    <li>• Monitor all Greeks in portfolio context</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Option Greeks Quiz",
        isRequired: true,
        type: "quiz" as const,
        minScore: 4,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Test Your Knowledge of Option Greeks
              </h3>
              <p className="text-blue-700 mb-4">
                Answer these questions to check your understanding of Delta, Gamma, Theta, and Vega.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What does Delta measure in options trading?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Rate of change in option price relative to underlying asset price</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Time decay of option value</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Sensitivity to volatility changes</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. Which Greek measures the rate of change in Delta?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Theta</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Gamma</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Vega</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What is the typical range for Delta values?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">0 to 1</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">-1 to +1</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">-2 to +2</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    4. Which Greek is always negative for long options?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Delta</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Gamma</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Theta</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    5. Which Greek measures sensitivity to volatility changes?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Delta</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Gamma</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Vega</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "interactive-selection",
        title: "Greeks Strategy Selection",
        isRequired: true,
        type: "selection" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Choose Your Greeks-Based Strategy
              </h3>
              <p className="text-green-700 mb-6">
                Select the strategies that align with your risk tolerance and market outlook.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Directional Strategies</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Long calls (high delta)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Long puts (negative delta)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Bull spreads</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Bear spreads</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Neutral Strategies</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Iron condors</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Butterfly spreads</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Calendar spreads</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Straddles</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Risk Management</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Position sizing based on gamma</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Theta decay monitoring</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Vega hedging</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Delta-neutral adjustments</span>
                    </label>
                  </div>
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
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Delta Measures Directional Risk</h4>
                      <p className="text-green-700 text-sm">Delta ranges from -1 to +1 and shows how much option price changes with underlying asset price.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Gamma Measures Delta Sensitivity</h4>
                      <p className="text-green-700 text-sm">Gamma is highest for at-the-money options and measures how quickly delta changes.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Theta Represents Time Decay</h4>
                      <p className="text-green-700 text-sm">Theta is always negative for long options and accelerates as expiration approaches.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Vega Shows Volatility Sensitivity</h4>
                      <p className="text-green-700 text-sm">Vega is highest for longer-term options and measures sensitivity to volatility changes.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice calculating Greeks for different option scenarios</li>
                  <li>• Use Greeks to analyze your current options positions</li>
                  <li>• Develop strategies that align with your Greeks preferences</li>
                  <li>• Monitor Greeks changes in your portfolio regularly</li>
                  <li>• Consider using options screeners that show Greeks values</li>
                </ul>
              </div>
            </div>
          </div>
        )
      }
    ]
  };

  const handleComplete = () => {
    console.log('Lesson completed!');
  };

  const handlePartComplete = (partId: string) => {
    console.log(`Part ${partId} completed!`);
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
            tamilAudioUrl={lessonData.audioFiles.ta}
            marathiAudioUrl={lessonData.audioFiles.mr}
            hindiTranscript={lessonData.transcript.hi}
            englishTranscript={lessonData.transcript.en}
            bengaliTranscript={lessonData.transcript.bn}
            tamilTranscript={lessonData.transcript.ta}
            marathiTranscript={lessonData.transcript.mr}
          />
        </div>
        
        <MultiPartLesson
          parts={lessonData.parts}
          onComplete={handleComplete}
          onPartComplete={handlePartComplete}
        />
      </div>
    </div>
  );
}
