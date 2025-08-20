"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function ElliottWaveTheoryPage() {
  const lessonData = {
    title: "Elliott Wave Theory",
    description: "Learn about Elliott Wave Theory, a powerful tool for understanding market cycles and predicting future price movements.",
    lessonSlug: "elliott-wave-theory",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/elliott-wave-theory-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/elliott-wave-theory-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/elliott-wave-theory-bn.m4a",
      te: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/elliott-wave-theory-te.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/elliott-wave-theory-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/technical-analysis/elliott-wave-theory-mr.m4a"
    },
    transcript: {
      en: "Elliott Wave Theory: Learn about this powerful tool for understanding market cycles and predicting future price movements based on recurring patterns in investor psychology.",
      hi: "एलियट वेव थ्योरी: बाजार के चक्रों को समजने और निवेशक मनोविज्ञान में आवर्ती पैटर्न के आधार पर भविष्य की कीमत आवाजाही की भविष्यवाणी करने के लिए इस शक्तिशाली उपकरण के बारे में जानें।",
      bn: "এলিয়ট ওয়েভ থিওরি: বাজারের চক্র বোঝার জন্য এবং বিনিয়োগকারীদের মনোবিজ্ঞানে পুনরাবৃত্তিমূলক প্যাটার্নের ভিত্তিতে ভবিষ্যতের মূল্য আন্দোলনের পূর্বাভাস দেওয়ার জন্য এই শক্তিশালী সরঞ্জাম সম্পর্কে জানুন।",
      te: "ఎలియట్ వేవ్ థియరీ: మార్కెట్ చక్రాలను అర్థం చేసుకోవడానికి మరియు పెట్టుబడిదారుల మనస్తత్వంలో పునరావృత నమూనాల ఆధారంగా భవిష్యత్ ధర కదలికలను అంచనా వేయడానికి ఈ శక్తివంతమైన సాధనం గురించి తెలుసుకోండి.",
      ta: "எலியட் வேவ் கோட்பாடு: சந்தை சுழற்சிகளைப் புரிந்துகொள்வதற்கும் முதலீட்டாளர்களின் உளவியலில் மீண்டும் வரும் வடிவங்களின் அடிப்படையில் எதிர்கால விலை இயக்கங்களை கணிப்பதற்கும் இந்த சக்திவாய்ந்த கருவியைப் பற்றி அறியுங்கள்.",
      mr: "एलियट वेव थिअरी: बाजाराचे चक्र समजून घेण्यासाठी आणि गुंतवणूकदारांच्या मानसशास्त्रातील पुनरावृत्ती पॅटर्न्सच्या आधारे भविष्यातील किंमत हालचालींचा अंदाज घेण्यासाठी या शक्तिशाली साधनाबद्दल जाणून घ्या."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Elliott Wave Theory",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Understanding Market Cycles
              </h2>
              <p className="text-blue-800 text-lg leading-relaxed">
                Elliott Wave Theory is a method of technical analysis that looks for recurring long-term price 
                patterns related to persistent changes in investor sentiment and psychology. It was developed 
                by Ralph Nelson Elliott in the 1930s and is based on the idea that markets move in predictable cycles.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Why Elliott Wave Matters</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Market Psychology</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Understand crowd behavior</li>
                    <li>• Predict sentiment shifts</li>
                    <li>• Identify trend phases</li>
                    <li>• Time market entries</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Trading Advantages</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Higher probability setups</li>
                    <li>• Better risk management</li>
                    <li>• Trend continuation signals</li>
                    <li>• Reversal identification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "basic-principles",
        title: "Basic Principles",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Core Concepts
              </h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-700 mb-3">Impulse Waves</h4>
                    <p className="text-gray-700 mb-3">
                      Impulse waves move in the direction of the main trend and consist of five waves.
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-green-700 text-sm">
                        <strong>Direction:</strong> With the trend<br/>
                        <strong>Structure:</strong> 5 waves (1-2-3-4-5)<br/>
                        <strong>Purpose:</strong> Establish trend direction
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-700 mb-3">Correction Waves</h4>
                    <p className="text-gray-700 mb-3">
                      Correction waves move against the main trend and consist of three waves.
                    </p>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <p className="text-red-700 text-sm">
                        <strong>Direction:</strong> Against the trend<br/>
                        <strong>Structure:</strong> 3 waves (A-B-C)<br/>
                        <strong>Purpose:</strong> Retrace and consolidate
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-700 mb-3">Fractal Nature</h4>
                    <p className="text-gray-700 mb-3">
                      Wave patterns are fractal, meaning they repeat at different time scales.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-blue-700 text-sm">
                        <strong>Multi-timeframe:</strong> Same patterns on all timeframes<br/>
                        <strong>Self-similar:</strong> Waves within waves<br/>
                        <strong>Scalable:</strong> From minutes to decades
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-700 mb-3">Alternation</h4>
                    <p className="text-gray-700 mb-3">
                      Waves alternate in character, with different wave types following each other.
                    </p>
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <p className="text-purple-700 text-sm">
                        <strong>Pattern variety:</strong> Different correction types<br/>
                        <strong>Complexity:</strong> Simple vs. complex corrections<br/>
                        <strong>Predictability:</strong> Helps identify wave types
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "impulse-waves",
        title: "Impulse Waves (1-2-3-4-5)",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                The Five-Wave Pattern
              </h3>
              <p className="text-blue-700 mb-4">
                Impulse waves are the main directional moves in the market.
              </p>
              
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-700 mb-2">Wave 1: The Initial Move</h4>
                  <p className="text-green-700 mb-3">
                    The initial move, often unnoticed by most investors.
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-green-200">
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Starts with fundamental news</li>
                      <li>• Volume begins to increase</li>
                      <li>• Often retraces significantly</li>
                      <li>• Sets the foundation for the trend</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-700 mb-2">Wave 2: The Correction</h4>
                  <p className="text-blue-700 mb-3">
                    A correction that retraces part of Wave 1 but doesn't go below the start of Wave 1.
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Retraces 50-78% of Wave 1</li>
                      <li>• Volume decreases</li>
                      <li>• Often forms ABC pattern</li>
                      <li>• Never goes below Wave 1 start</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-700 mb-2">Wave 3: The Power Move</h4>
                  <p className="text-purple-700 mb-3">
                    Usually the strongest and longest wave, often the most dramatic.
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Strongest and longest wave</li>
                      <li>• High volume confirmation</li>
                      <li>• Often extends beyond Wave 1</li>
                      <li>• Most reliable for trading</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-700 mb-2">Wave 4: The Consolidation</h4>
                  <p className="text-orange-700 mb-3">
                    Another correction that doesn't overlap with Wave 1.
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-orange-200">
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Gentle correction</li>
                      <li>• Often forms triangles or flags</li>
                      <li>• Never overlaps with Wave 1</li>
                      <li>• Sets up for final push</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">Wave 5: The Final Push</h4>
                  <p className="text-red-800 mb-3">
                    The final move in the direction of the trend, often showing exhaustion.
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-red-200">
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Final push in trend direction</li>
                      <li>• Often shows divergence</li>
                      <li>• Volume may decrease</li>
                      <li>• Signals trend completion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "correction-waves",
        title: "Correction Waves (A-B-C)",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-red-800 mb-4">
                The Three-Wave Correction
              </h3>
              <p className="text-red-700 mb-4">
                Correction waves move against the main trend.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-700 mb-3">Wave A</h4>
                  <p className="text-gray-700 mb-3">
                    The first move against the trend, often sharp and quick.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Sharp and quick move</li>
                      <li>• High volume</li>
                      <li>• Often retraces 38-50%</li>
                      <li>• Sets correction tone</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-700 mb-3">Wave B</h4>
                  <p className="text-gray-700 mb-3">
                    A partial retracement of Wave A, often weak.
                  </p>
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Partial retracement</li>
                      <li>• Often weak</li>
                      <li>• Lower volume</li>
                      <li>• Sets up Wave C</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-700 mb-3">Wave C</h4>
                  <p className="text-gray-700 mb-3">
                    The final correction wave, often as strong as Wave A.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Often equals Wave A</li>
                      <li>• Completes correction</li>
                      <li>• Sets up next impulse</li>
                      <li>• Fibonacci relationships</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-blue-800 mb-3">📊 Correction Patterns</h4>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li>• <strong>Zigzag:</strong> Sharp A, weak B, strong C</li>
                  <li>• <strong>Flat:</strong> A and C similar, B retraces 50-100%</li>
                  <li>• <strong>Triangle:</strong> Converging trend lines</li>
                  <li>• <strong>Complex:</strong> Multiple ABC patterns</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "practical-application",
        title: "Practical Application",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
                Using Elliott Wave in Trading
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-medium text-indigo-700 mb-3">Step-by-Step Process</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">1. Trend Identification</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Identify overall trend direction</li>
                        <li>• Look for higher highs and lows</li>
                        <li>• Use multiple timeframes</li>
                        <li>• Confirm with other indicators</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">2. Wave Counting</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Start from significant low/high</li>
                        <li>• Count impulse waves (1-2-3-4-5)</li>
                        <li>• Identify correction waves (A-B-C)</li>
                        <li>• Mark wave boundaries</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-medium text-indigo-700 mb-3">3. Pattern Analysis</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">Wave Relationships</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Wave 2 never goes below Wave 1 start</li>
                        <li>• Wave 3 often extends beyond Wave 1</li>
                        <li>• Wave 4 never overlaps with Wave 1</li>
                        <li>• Wave C often equals Wave A</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-700 mb-2">Fibonacci Levels</h5>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Wave 2: 50-78% retracement</li>
                        <li>• Wave 4: 23-38% retracement</li>
                        <li>• Wave B: 50-100% retracement</li>
                        <li>• Wave C: Often equals Wave A</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-3">⚠️ Important Considerations</h4>
                  <ul className="space-y-2 text-yellow-700 text-sm">
                    <li>• Elliott Wave is a guide, not a guarantee</li>
                    <li>• Always use other technical indicators for confirmation</li>
                    <li>• Wave counting can be subjective</li>
                    <li>• Patterns are only confirmed after completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Elliott Wave Theory Quiz",
        isRequired: true,
        type: "quiz" as const,
        minScore: 4,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Test Your Knowledge of Elliott Wave Theory
              </h3>
              <p className="text-blue-700 mb-4">
                Answer these questions to check your understanding of Elliott Wave Theory.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. How many waves make up an impulse wave pattern?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">3 waves</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">5 waves</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">7 waves</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. Which wave is typically the strongest in an impulse pattern?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Wave 1</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Wave 3</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Wave 5</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. How many waves make up a correction pattern?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">2 waves</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">3 waves</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">5 waves</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    4. What is the key rule about Wave 2?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">It must be longer than Wave 1</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">It never goes below the start of Wave 1</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">It must be exactly 50% of Wave 1</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    5. What does the fractal nature of Elliott Waves mean?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Waves only appear on daily charts</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Patterns repeat at different time scales</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Waves are always the same length</span>
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
                      <h4 className="font-medium text-green-800">Market Psychology Patterns</h4>
                      <p className="text-green-700 text-sm">Elliott Wave Theory identifies recurring market patterns based on investor psychology and sentiment.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Wave Structure</h4>
                      <p className="text-green-700 text-sm">Impulse waves (1-2-3-4-5) move with the trend, correction waves (A-B-C) move against it.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Wave 3 is Key</h4>
                      <p className="text-green-700 text-sm">Wave 3 is typically the strongest and most reliable for trading opportunities.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Use as Framework</h4>
                      <p className="text-green-700 text-sm">Use Elliott Wave as a framework, not as the sole basis for trading decisions.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Practice wave counting on historical charts</li>
                  <li>• Learn to identify wave relationships and Fibonacci levels</li>
                  <li>• Combine Elliott Wave with other technical indicators</li>
                  <li>• Study different correction patterns (zigzag, flat, triangle)</li>
                  <li>• Remember that Elliott Wave is a guide, not a guarantee</li>
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
