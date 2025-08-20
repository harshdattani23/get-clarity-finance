"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';
import { User, Building, Landmark, Scale } from 'lucide-react';

export default function DifferentPlayersPage() {
  const lessonData = {
    title: "The Different Players in the Market",
    description: "Meet the diverse cast of characters in the financial market, from individual retail investors to large institutional giants, and understand the roles they play.",
    lessonSlug: "the-different-players-in-the-market",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/market-basics/the-different-players-in-the-market-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/market-basics/the-different-players-in-the-market-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/market-basics/the-different-players-in-the-market-bn.m4a",
      te: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/market-basics/the-different-players-in-the-market-te.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/market-basics/the-different-players-in-the-market-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/market-basics/the-different-players-in-the-market-mr.m4a"
    },
    transcript: {
      en: "The Different Players in the Market: Meet the diverse cast of characters in the financial market, from individual retail investors to large institutional giants, and understand the roles they play in this dynamic ecosystem.",
      hi: "बाजार में विभिन्न खिलाड़ी: वित्तीय बाजार में विविध पात्रों से मिलें, व्यक्तिगत खुचरा निवेशकों से लेकर बड़े संस्थागत दिग्गजों तक, और समझें कि वे इस गतिशील पारिस्थितिकी तंत्र में क्या भूमिका निभाते हैं।",
      bn: "বাজারে বিভিন্ন খেলোয়াড়: আর্থিক বাজারে বিভিন্ন চরিত্রের সাথে পরিচিত হন, ব্যক্তিগত খুচরা বিনিয়োগকারীদের কাছ থেকে বড় প্রাতিষ্ঠানিক দৈত্যদের পর্যন্ত।",
      te: "మార్కెట్లో వివిధ ఆటగాళ్లు: ఆర్థిక మార్కెట్లో వివిధ పాత్రలతో పరిచయం చేసుకోండి, వ్యక్తిగత రిటైల్ పెట్టుబడిదారుల నుండి పెద్ద సంస్థాగత దిగ్గజాల వరకు.",
      ta: "சந்தையில் வெவ்வேறு வீரர்கள்: தனிப்பட்ட சில்லறை முதலீட்டாளர்களிலிருந்து பெரிய நிறுவன ராட்சசர்கள் வரை நிதிச் சந்தையில் உள்ள பல்வேறு கதாபாத்திரங்களைச் சந்திக்கவும்.",
      mr: "बाजारातील वेगवेगळे खेळाडू: वैयक्तिक किरकोळ गुंतवणूकदारांपासून मोठ्या संस्थात्मक राक्षसांपर्यंत आर्थिक बाजारातील विविध पात्रांशी परिचित व्हा."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Market Players",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                The Stock Market Ecosystem
              </h2>
              <p className="text-blue-800 text-lg leading-relaxed">
                The stock market is a dynamic ecosystem, not just a collection of numbers on a screen. 
                It's composed of millions of participants, each with different goals, strategies, and levels of influence. 
                Understanding who these players are is key to grasping the market's behavior.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Why Understanding Players Matters</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Market Behavior</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Understand price movements</li>
                    <li>• Predict market trends</li>
                    <li>• Identify trading opportunities</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Investment Strategy</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Align with institutional moves</li>
                    <li>• Avoid retail traps</li>
                    <li>• Time your entries/exits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "retail-investors",
        title: "Retail Investors (Like You!)",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <User className="w-12 h-12 text-green-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-green-800 mb-4">
                    Retail Investors: The Individual Traders
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-700 mb-3">Who Are They?</h4>
                      <p className="text-gray-700 mb-4">
                        Retail investors are individuals who buy and sell securities for their personal accounts. 
                        They typically invest smaller amounts and have longer-term goals.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-green-700 mb-2">Characteristics</h5>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Individual accounts</li>
                            <li>• Smaller investment amounts</li>
                            <li>• Longer-term perspective</li>
                            <li>• Emotional decision-making</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-green-700 mb-2">Investment Goals</h5>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Retirement planning</li>
                            <li>• Wealth building</li>
                            <li>• Education funding</li>
                            <li>• Emergency savings</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-3">💡 Retail Investor Behavior</h4>
                      <ul className="space-y-2 text-yellow-700 text-sm">
                        <li>• Often buy high and sell low due to emotions</li>
                        <li>• Follow the crowd (herd mentality)</li>
                        <li>• Make decisions based on news headlines</li>
                        <li>• Have shorter attention spans</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "institutional-investors",
        title: "Institutional Investors: The Big Whales",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Building className="w-12 h-12 text-blue-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                    Institutional Investors: Market Movers
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-700 mb-3">Types of Institutions</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-blue-700 mb-2">Asset Management</h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Mutual funds</li>
                            <li>• Exchange-traded funds (ETFs)</li>
                            <li>• Hedge funds</li>
                            <li>• Private equity firms</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-700 mb-2">Financial Institutions</h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Pension funds</li>
                            <li>• Insurance companies</li>
                            <li>• Banks</li>
                            <li>• Endowments</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-700 mb-3">Market Impact</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-blue-700 mb-2">Trading Volume</h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Massive trade sizes</li>
                            <li>• Can move stock prices</li>
                            <li>• Influence market sentiment</li>
                            <li>• Create market trends</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-700 mb-2">Research & Analysis</h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Professional analysts</li>
                            <li>• Advanced research tools</li>
                            <li>• Access to company management</li>
                            <li>• Sophisticated strategies</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-medium text-purple-800 mb-3">🎯 Following the Smart Money</h4>
                      <ul className="space-y-2 text-purple-700 text-sm">
                        <li>• Monitor institutional buying/selling patterns</li>
                        <li>• Look for large block trades</li>
                        <li>• Follow 13F filings for US stocks</li>
                        <li>• Pay attention to analyst upgrades/downgrades</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "market-makers-brokers",
        title: "Market Makers & Brokers",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Landmark className="w-12 h-12 text-indigo-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
                    Market Makers & Brokers: The Middlemen
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <h4 className="font-medium text-indigo-700 mb-3">Brokers: Trade Executors</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-indigo-700 mb-2">Full-Service Brokers</h5>
                          <ul className="text-sm text-indigo-700 space-y-1">
                            <li>• Research and advice</li>
                            <li>• Portfolio management</li>
                            <li>• Higher fees</li>
                            <li>• Personal relationship</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-indigo-700 mb-2">Discount Brokers</h5>
                          <ul className="text-sm text-indigo-700 space-y-1">
                            <li>• Low-cost trading</li>
                            <li>• Self-directed investing</li>
                            <li>• Basic tools</li>
                            <li>• No advice</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <h4 className="font-medium text-indigo-700 mb-3">Market Makers: Liquidity Providers</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-indigo-700 mb-2">How They Work</h5>
                          <ul className="text-sm text-indigo-700 space-y-1">
                            <li>• Always ready to buy/sell</li>
                            <li>• Maintain bid-ask spreads</li>
                            <li>• Provide market liquidity</li>
                            <li>• Profit from spreads</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-indigo-700 mb-2">Benefits</h5>
                          <ul className="text-sm text-indigo-700 space-y-1">
                            <li>• Instant trade execution</li>
                            <li>• Reduced price volatility</li>
                            <li>• Market stability</li>
                            <li>• Efficient price discovery</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-medium text-orange-800 mb-3">💰 Understanding Spreads</h4>
                      <ul className="space-y-2 text-orange-700 text-sm">
                        <li>• Bid-ask spread is the difference between buy and sell prices</li>
                        <li>• Tighter spreads indicate more liquid stocks</li>
                        <li>• Wider spreads suggest less liquid or volatile stocks</li>
                        <li>• Market makers profit from these spreads</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "regulators",
        title: "Regulators (e.g., SEBI)",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Scale className="w-12 h-12 text-red-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-red-800 mb-4">
                    Regulators: The Market Watchdogs
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-700 mb-3">SEBI: Securities and Exchange Board of India</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-red-700 mb-2">Primary Functions</h5>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Protect investor interests</li>
                            <li>• Regulate securities market</li>
                            <li>• Prevent fraud and manipulation</li>
                            <li>• Ensure market transparency</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-red-700 mb-2">Regulatory Powers</h5>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Issue regulations</li>
                            <li>• Conduct investigations</li>
                            <li>• Impose penalties</li>
                            <li>• Suspend trading</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <h4 className="font-medium text-red-700 mb-3">Other Regulatory Bodies</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-red-700 mb-2">Stock Exchanges</h5>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• NSE (National Stock Exchange)</li>
                            <li>• BSE (Bombay Stock Exchange)</li>
                            <li>• Set trading rules</li>
                            <li>• Monitor compliance</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-red-700 mb-2">Government Bodies</h5>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Ministry of Finance</li>
                            <li>• Reserve Bank of India</li>
                            <li>• Corporate Affairs Ministry</li>
                            <li>• Tax authorities</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-3">🛡️ How Regulations Protect You</h4>
                      <ul className="space-y-2 text-green-700 text-sm">
                        <li>• Insider trading is illegal and monitored</li>
                        <li>• Companies must disclose material information</li>
                        <li>• Brokers must maintain client funds separately</li>
                        <li>• Market manipulation is actively prevented</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "ecosystem",
        title: "A Complex Ecosystem",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-emerald-800 mb-4">
                How All Players Interact
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-medium text-emerald-700 mb-3">Market Dynamics</h4>
                  <p className="text-gray-700 mb-4">
                    Each of these players interacts with the others, creating a complex and dynamic ecosystem. 
                    The collective actions of these groups determine the direction and mood of the market.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-emerald-700 mb-2">Information Flow</h5>
                      <ul className="text-sm text-emerald-700 space-y-1">
                        <li>• News affects all players</li>
                        <li>• Institutional moves influence retail</li>
                        <li>• Market makers respond to demand</li>
                        <li>• Regulators monitor everything</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-emerald-700 mb-2">Price Discovery</h5>
                      <ul className="text-sm text-emerald-700 space-y-1">
                        <li>• Supply and demand balance</li>
                        <li>• Institutional vs. retail sentiment</li>
                        <li>• Market maker liquidity</li>
                        <li>• Regulatory oversight</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-3">🔄 Market Cycles</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">Bull Markets</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Institutional buying increases</li>
                        <li>• Retail FOMO sets in</li>
                        <li>• Market makers provide liquidity</li>
                        <li>• Regulators monitor for excesses</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">Bear Markets</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Institutional selling pressure</li>
                        <li>• Retail panic selling</li>
                        <li>• Market makers maintain spreads</li>
                        <li>• Regulators ensure stability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Market Players Quiz",
        isRequired: true,
        type: "quiz" as const,
        minScore: 4,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Test Your Knowledge of Market Players
              </h3>
              <p className="text-blue-700 mb-4">
                Answer these questions to check your understanding of the different players in the market.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. Which type of investor typically has the largest impact on stock prices?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Retail investors</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Institutional investors</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Market makers</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. What is the primary role of market makers?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">To provide investment advice</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">To provide liquidity and maintain spreads</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">To regulate the market</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What does SEBI stand for?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Securities and Exchange Board of India</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Stock Exchange Board of India</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Securities Exchange Bureau of India</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    4. Which type of investor is most likely to make emotional decisions?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Institutional investors</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Retail investors</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Market makers</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    5. What is the main purpose of regulatory bodies like SEBI?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">To maximize profits for investors</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">To protect investor interests and ensure market fairness</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">To control stock prices</span>
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
        title: "Market Player Strategy Selection",
        isRequired: true,
        type: "selection" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Choose Your Market Strategy Based on Player Understanding
              </h3>
              <p className="text-green-700 mb-6">
                Select the strategies that align with your understanding of market players and your investment goals.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Following Smart Money</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Monitor institutional buying patterns</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Track large block trades</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Follow analyst recommendations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Watch for insider buying</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Avoiding Retail Traps</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Don't chase hot stocks</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Avoid FOMO buying</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Don't panic sell</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Ignore social media hype</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Market Timing Strategies</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Buy when institutions are selling</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Sell when retail is buying</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Monitor market maker activity</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Watch regulatory announcements</span>
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
                      <h4 className="font-medium text-green-800">Retail Investors</h4>
                      <p className="text-green-700 text-sm">Are individuals investing for personal goals, often making emotional decisions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Institutional Investors</h4>
                      <p className="text-green-700 text-sm">Are large organizations whose trades can move the market significantly.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Market Makers & Brokers</h4>
                      <p className="text-green-700 text-sm">Provide liquidity and execute trades, with market makers profiting from spreads.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Regulators</h4>
                      <p className="text-green-700 text-sm">Like SEBI ensure the market is fair, transparent, and safe for everyone.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Study institutional buying/selling patterns in your favorite stocks</li>
                  <li>• Learn to identify when retail sentiment is driving prices</li>
                  <li>• Understand how market makers affect the stocks you trade</li>
                  <li>• Stay informed about regulatory changes that might affect your investments</li>
                  <li>• Develop strategies that align with institutional moves rather than retail emotions</li>
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
