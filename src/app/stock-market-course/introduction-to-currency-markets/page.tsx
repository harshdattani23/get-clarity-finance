"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function IntroductionToCurrencyMarketsPage() {
  const lessonData = {
    title: "Introduction to Currency Markets",
    description: "Learn about the world's largest financial market - foreign exchange trading, and understand how currency markets work.",
    lessonSlug: "introduction-to-currency-markets",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-currency-markets-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-currency-markets-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-currency-markets-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-currency-markets-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-currency-markets-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/foundational/introduction-to-currency-markets-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of currency markets! In this lesson, we'll explore the world's largest financial market - foreign exchange trading, and understand how currency markets work. You'll learn about major currency pairs, market participants, factors affecting prices, and key characteristics of this global market.",
      hi: "मुद्रा बाजार की दुनिया में आपका स्वागत है! इस पाठ में, हम दुनिया के सबसे बड़े वित्तीय बाजार - विदेशी मुद्रा व्यापार के बारे में जानेंगे, और समझेंगे कि मुद्रा बाजार कैसे काम करते हैं। आप प्रमुख मुद्रा जोड़े, बाजार के प्रतिभागियों, कीमतों को प्रभावित करने वाले कारकों, और इस वैश्विक बाजार की मुख्य विशेषताओं के बारे में जानेंगे।",
      bn: "মুদ্রা বাজারের জগতে স্বাগতম! এই পাঠে, আমরা বিশ্বের বৃহত্তম আর্থিক বাজার - বৈদেশিক মুদ্রা বাণিজ্য সম্পর্কে জানব, এবং বুঝব কীভাবে মুদ্রা বাজার কাজ করে। আপনি প্রধান মুদ্রা জোড়া, বাজারের অংশগ্রহণকারী, দামকে প্রভাবিত করে এমন কারণগুলি, এবং এই বিশ্বব্যাপী বাজারের মূল বৈশিষ্ট্যগুলি সম্পর্কে জানবেন।",
      mr: "चलन बाजाराच्या जगात आपले स्वागत आहे! या धड्यात, आपण जगातील सर्वात मोठ्या आर्थिक बाजाराबद्दल - परकीय चलन व्यापाराबद्दल जाणू, आणि चलन बाजार कसे काम करतात ते समजून घेऊ. तुम्ही मुख्य चलन जोड्या, बाजारातील सहभागऐवजी, किंमतींना प्रभावित करणारे घटक, आणि या जागतिक बाजाराची मुख्य वैशिष्ट्ये जाणू.",
      gu: "ચલન બજારની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, આપણે વિશ્વના સૌથી મોટા નાણાકીય બજાર - વિદેશી ચલન વેપાર વિશે જાણીશું, અને સમજીશું કે ચલન બજાર કેવી રીતે કામ કરે છે. તમે મુખ્ય ચલન જોડી, બજારના સહભાગીઓ, કિંમતોને પ્રભાવિત કરતા પરિબળો, અને આ વૈશ્વિક બજારની મુખ્ય લાક્ષણિકતાઓ વિશે જાણશો.",
      ta: "பணப்புழக்க சந்தையின் உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், உலகின் மிகப்பெரிய நிதி சந்தை - வெளிநாட்டு செலாவணி வர்த்தகம் பற்றி அறிந்து கொள்வோம், மேலும் பணப்புழக்க சந்தைகள் எப்படி வேலை செய்கின்றன என்பதைப் புரிந்து கொள்வோம். முக்கிய பணப்புழக்க ஜோடிகள், சந்தை பங்கேற்பாளர்கள், விலைகளை பாதிக்கும் காரணிகள், மேலும் இந்த உலகளாவிய சந்தையின் முக்கிய பண்புகள் பற்றி நீங்கள் கற்றுக்கொள்வீர்கள்."
    },
    parts: [
      {
        id: "introduction",
        title: "What is the Currency Market?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                What is the Currency Market?
              </h3>
              <p className="text-blue-700">
                The currency market, also known as the foreign exchange (forex) market, is where currencies are traded against each other. It's the largest and most liquid financial market in the world, with a daily trading volume exceeding $6 trillion.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Key Takeaway</h4>
              <p className="text-green-700">
                The forex market operates 24/5 globally, allowing traders to buy and sell currencies around the clock, making it the most accessible financial market.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• How currency markets work</li>
                  <li>• Major currency pairs</li>
                  <li>• Factors affecting prices</li>
                  <li>• Market participants</li>
                  <li>• Market characteristics</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Why Currency Markets Matter</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Largest financial market globally</li>
                  <li>• 24/5 trading availability</li>
                  <li>• High liquidity and leverage</li>
                  <li>• Global economic impact</li>
                  <li>• Investment opportunities</li>
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
                Let's see how much you already know about currency markets!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the daily trading volume of the forex market?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) $1 trillion</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) $3 trillion</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) $6 trillion</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) $10 trillion</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. How many hours a day is the forex market open?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) 8 hours</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) 12 hours</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) 24 hours</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) 16 hours</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "how-markets-work",
        title: "How Currency Markets Work",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                Market Mechanics
              </h3>
              <p className="text-indigo-700">
                Understanding how currency markets operate is crucial for successful trading and investment decisions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">1. Global Network</h4>
                  <p className="text-gray-700 text-sm">
                    Banks, institutions, and individuals trade currencies through electronic networks worldwide.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">2. Price Discovery</h4>
                  <p className="text-gray-700 text-sm">
                    Exchange rates are determined by supply and demand based on economic factors and market sentiment.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">3. Continuous Trading</h4>
                  <p className="text-gray-700 text-sm">
                    As one market closes, another opens, creating a continuous trading cycle across time zones.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Key Features</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Decentralized Structure</h5>
                  <p className="text-blue-600 text-sm">No single exchange controls the entire market</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Electronic Trading</h5>
                  <p className="text-blue-600 text-sm">Most trading happens through electronic platforms</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Interbank Market</h5>
                  <p className="text-blue-600 text-sm">Large banks trade directly with each other</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Retail Access</h5>
                  <p className="text-blue-600 text-sm">Individual traders access through brokers</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "major-currency-pairs",
        title: "Major Currency Pairs",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                The Most Traded Pairs
              </h3>
              <p className="text-green-700">
                Major currency pairs represent the most liquid and widely traded currencies in the forex market.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">EUR/USD (Euro/US Dollar)</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      The most traded currency pair, representing the Eurozone and United States economies.
                    </p>
                    <div className="text-xs text-gray-500">
                      Known as "The King" of forex pairs
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">USD/JPY (US Dollar/Japanese Yen)</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Represents the world's two largest economies and is heavily influenced by interest rate differentials.
                    </p>
                    <div className="text-xs text-gray-500">
                      Known as "The Ninja" due to its volatility
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">GBP/USD (British Pound/US Dollar)</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Represents the UK and US economies, often called "The Cable" due to historical telegraph connections.
                    </p>
                    <div className="text-xs text-gray-500">
                      Known for its volatility and large price swings
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">USD/CHF (US Dollar/Swiss Franc)</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      Known as "The Swissy," often considered a safe-haven currency during market stress.
                    </p>
                    <div className="text-xs text-gray-500">
                      Tends to move inversely to EUR/USD
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Trading Characteristics</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">EUR/USD</h5>
                  <p className="text-yellow-600 text-sm">Most liquid, tightest spreads, lowest volatility</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">USD/JPY</h5>
                  <p className="text-yellow-600 text-sm">High volatility, influenced by BoJ policies</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">GBP/USD</h5>
                  <p className="text-yellow-600 text-sm">High volatility, Brexit impact, UK data sensitive</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">USD/CHF</h5>
                  <p className="text-yellow-600 text-sm">Safe-haven status, lower volatility, SNB influence</p>
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
                Match the Currency Pair with its Nickname
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each major currency pair with its popular nickname.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Currency Pairs:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">EUR/USD</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">USD/JPY</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">GBP/USD</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">USD/CHF</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Nicknames:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">The King</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">The Ninja</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">The Cable</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">The Swissy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "factors-affecting-prices",
        title: "Factors Affecting Currency Prices",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Price Drivers
              </h3>
              <p className="text-orange-700">
                Multiple factors influence currency prices, creating opportunities and risks for traders.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">🏦 Central Bank Policies</h4>
                <p className="text-green-800 text-sm">
                  Interest rate decisions, quantitative easing, and monetary policy statements significantly impact currency values.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">📊 Economic Indicators</h4>
                <p className="text-blue-800 text-sm">
                  GDP growth, employment data, inflation rates, and trade balances influence currency strength.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">🌍 Political Events</h4>
                <p className="text-purple-800 text-sm">
                  Elections, policy changes, and geopolitical tensions can cause significant currency movements.
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">💼 Market Sentiment</h4>
                <p className="text-orange-800 text-sm">
                  Risk appetite, market mood, and investor confidence drive currency flows.
                </p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-2">🛢️ Commodity Prices</h4>
                <p className="text-indigo-800 text-sm">
                  Countries dependent on commodity exports see their currencies affected by commodity price movements.
                </p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-pink-900 mb-2">📈 Technical Factors</h4>
                <p className="text-pink-800 text-sm">
                  Support/resistance levels, chart patterns, and technical indicators influence short-term price movements.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Impact Examples</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Interest Rate Hikes</h5>
                  <p className="text-blue-600 text-sm">Usually strengthen the currency due to higher returns</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Economic Data</h5>
                  <p className="text-blue-600 text-sm">Strong data typically strengthens the currency</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Political Uncertainty</h5>
                  <p className="text-blue-600 text-sm">Often weakens the currency due to risk aversion</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Market Sentiment</h5>
                  <p className="text-blue-600 text-sm">Risk-on/risk-off flows affect all currencies</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "market-participants",
        title: "Currency Market Participants",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                Who Trades Currencies?
              </h3>
              <p className="text-indigo-700">
                Understanding the different participants helps you understand market dynamics and price movements.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">🏦 Central Banks</h4>
                <p className="text-gray-700 text-sm">
                  Manage monetary policy and may intervene in currency markets to stabilize exchange rates or achieve economic objectives.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">🏛️ Commercial Banks</h4>
                <p className="text-gray-700 text-sm">
                  Provide currency services to clients and engage in proprietary trading for profit.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">💼 Investment Funds</h4>
                <p className="text-gray-700 text-sm">
                  Hedge funds, mutual funds, and pension funds trade currencies for portfolio diversification and returns.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">🏢 Corporations</h4>
                <p className="text-gray-700 text-sm">
                  Multinational companies trade currencies to hedge foreign exchange risk and facilitate international business.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">👤 Retail Traders</h4>
                <p className="text-gray-700 text-sm">
                  Individual traders who speculate on currency movements for profit, often using leverage.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Trading Volume Distribution</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Institutional (85%)</h5>
                  <p className="text-yellow-600 text-sm">Banks, funds, corporations, central banks</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Retail (15%)</h5>
                  <p className="text-yellow-600 text-sm">Individual traders and small investors</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Spot Trading (30%)</h5>
                  <p className="text-yellow-600 text-sm">Immediate currency exchange</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Derivatives (70%)</h5>
                  <p className="text-yellow-600 text-sm">Futures, options, forwards, swaps</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "market-characteristics",
        title: "Currency Market Characteristics",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Unique Features
              </h3>
              <p className="text-green-700">
                The forex market has several characteristics that make it unique among financial markets.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">⏰ 24/5 Trading</h4>
                  <p className="text-gray-700 text-sm">Markets are open 24 hours a day, 5 days a week, across different time zones.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">💧 High Liquidity</h4>
                  <p className="text-gray-700 text-sm">Large trading volumes ensure easy entry and exit from positions.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">📊 Leverage Available</h4>
                  <p className="text-gray-700 text-sm">Brokers offer high leverage, amplifying both potential profits and losses.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🌍 Global Market</h4>
                  <p className="text-gray-700 text-sm">No single exchange controls the market; it's a decentralized network.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">📈 Low Transaction Costs</h4>
                  <p className="text-gray-700 text-sm">Tight spreads and low commissions compared to other financial markets.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Two-Way Trading</h4>
                  <p className="text-gray-700 text-sm">You can profit from both rising and falling currency prices.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Advantages & Disadvantages</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">✅ Advantages</h5>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• 24/5 market access</li>
                    <li>• High liquidity</li>
                    <li>• Low transaction costs</li>
                    <li>• Leverage available</li>
                    <li>• No commission fees</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">❌ Disadvantages</h5>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• High leverage risk</li>
                    <li>• Complex market factors</li>
                    <li>• 24/5 monitoring needed</li>
                    <li>• Currency correlation risk</li>
                    <li>• Political risk exposure</li>
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
                Answer these questions to check your understanding of currency markets.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Why is the forex market considered the most liquid financial market?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. How do central bank policies affect currency prices?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What are the main differences between forex and stock markets?</p>
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
                Congratulations! You've completed the lesson on currency markets. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Currency Market Basics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ World's largest financial market</li>
                  <li>✅ 24/5 global trading</li>
                  <li>✅ $6+ trillion daily volume</li>
                  <li>✅ Decentralized structure</li>
                  <li>✅ High liquidity and leverage</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Major Components</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Major currency pairs (EUR/USD, USD/JPY)</li>
                  <li>✅ Multiple market participants</li>
                  <li>✅ Various price influencing factors</li>
                  <li>✅ Unique market characteristics</li>
                  <li>✅ Global economic impact</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Risk Warning</h4>
                  <p className="text-yellow-800">
                    Currency trading involves substantial risk and is not suitable for all investors. High leverage can lead to significant losses. Always understand the risks and consider your financial situation before trading.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Next Steps</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📚</span>
                  </div>
                  <p className="text-blue-700 text-sm">Study major pairs</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">💼</span>
                  </div>
                  <p className="text-blue-700 text-sm">Practice analysis</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Monitor markets</p>
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
