"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function MachineLearningInFinancePage() {
  const lessonData = {
    title: "Machine Learning in Finance",
    description: "Explore how machine learning algorithms are revolutionizing financial analysis, trading, and risk management.",
    lessonSlug: "machine-learning-in-finance",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/specialized-topics/machine-learning-in-finance-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/specialized-topics/machine-learning-in-finance-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/specialized-topics/machine-learning-in-finance-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/specialized-topics/machine-learning-in-finance-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/specialized-topics/machine-learning-in-finance-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/specialized-topics/machine-learning-in-finance-ta.m4a"
    },
    transcript: {
      en: "Machine learning has transformed the financial industry, enabling more sophisticated analysis, automated trading, and better risk management. Understanding these technologies is becoming essential for modern finance professionals.",
      hi: "मशीन लर्निंग ने वित्तीय उद्योग को बदल दिया है, जो अधिक परिष्कृत विश्लेषण, स्वचालित ट्रेडिंग और बेहतर जोखिम प्रबंधन को सक्षम करता है। इन तकनीकों को समझना आधुनिक वित्त पेशेवरों के लिए आवश्यक होता जा रहा है।",
      bn: "মেশিন লার্নিং আর্থিক শিল্পকে রূপান্তরিত করেছে, যা আরও পরিষ্কৃত বিশ্লেষণ, স্বয়ংক্রিয় ট্রেডিং এবং ভালো ঝুঁকি ব্যবস্থাপনা সক্ষম করে। এই প্রযুক্তিগুলি বোঝা আধুনিক অর্থ পেশাদারদের জন্য অত্যাবশ্যক হয়ে উঠছে।",
      mr: "मशीन लर्निंगने आर्थिक उद्योगाला बदलले आहे, जे अधिक परिष्कृत विश्लेषण, स्वयंचलित व्यापार आणि चांगले जोखीम व्यवस्थापन सक्षम करते. या तंत्रज्ञानांना समजून घेणे आधुनिक आर्थिक व्यावसायिकांसाठी आवश्यक होत आहे.",
      gu: "મશીન લર્નિંગે નાણાકીય ઉદ્યોગને રૂપાંતરિત કર્યો છે, જે વધુ પરિષ્કૃત વિશ્લેષણ, સ્વયંચાલિત વેપાર અને સારું જોખમ વ્યવસ્થાપન સક્ષમ કરે છે. આ તકનીકોને સમજવી આધુનિક નાણાકીય વ્યવસાયીઓ માટે આવશ્યક બની રહી છે.",
      ta: "மெஷின் லர்னிங் நிதி துறையை மாற்றியுள்ளது, இது மேலும் சிக்கலான பகுப்பாய்வு, தானியங்கி வர்த்தகம் மற்றும் சிறந்த ஆபத்து மேலாண்மையை செய்ய முடியும். இந்த தொழில்நுட்பங்களை புரிந்துகொள்வது நவீன நிதி வல்லுநர்களுக்கு அவசியமாகி வருகிறது."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Machine Learning in Finance",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                The AI Revolution in Finance
              </h3>
              <p className="text-blue-700">
                Machine learning has transformed the financial industry, enabling more sophisticated analysis, automated trading, and better risk management. Understanding these technologies is becoming essential for modern finance professionals.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4">What You'll Learn</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Fundamentals of machine learning</li>
                  <li>• Applications in financial markets</li>
                  <li>• Popular ML algorithms</li>
                  <li>• Implementation challenges</li>
                  <li>• Getting started strategies</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Key Benefits</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Automated decision making</li>
                  <li>• Pattern recognition</li>
                  <li>• Risk assessment</li>
                  <li>• Portfolio optimization</li>
                  <li>• Market prediction</li>
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
                Let's see how much you already know about machine learning in finance!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the main advantage of machine learning in finance?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Lower transaction costs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) Pattern recognition in large datasets</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) Guaranteed profits</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Reduced regulatory requirements</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which type of machine learning is best for predicting stock prices?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Unsupervised learning</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Supervised learning</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Reinforcement learning</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Deep learning only</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "what-is-ml",
        title: "What is Machine Learning?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                Understanding the Basics
              </h3>
              <p className="text-yellow-700">
                Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Core Concept</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Learning:</strong> Algorithms improve performance over time</p>
                  <p>• <strong>Pattern Recognition:</strong> Identify hidden relationships in data</p>
                  <p>• <strong>Prediction:</strong> Make forecasts based on learned patterns</p>
                  <p>• <strong>Automation:</strong> Reduce manual intervention in decision-making</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">In Finance Context</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Market Analysis:</strong> Process vast amounts of market data</p>
                  <p>• <strong>Risk Assessment:</strong> Identify potential threats and opportunities</p>
                  <p>• <strong>Trading Decisions:</strong> Execute trades based on ML insights</p>
                  <p>• <strong>Portfolio Management:</strong> Optimize asset allocation</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "applications",
        title: "Applications in Finance",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Real-World Use Cases
              </h3>
              <p className="text-green-700">
                Machine learning is being applied across various areas of finance, from trading to customer service.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-4">Algorithmic Trading</h4>
                <div className="space-y-3 text-blue-700">
                  <p>• <strong>High-Frequency Trading:</strong> Execute trades in milliseconds</p>
                  <p>• <strong>Signal Generation:</strong> Identify buy/sell opportunities</p>
                  <p>• <strong>Risk Management:</strong> Monitor positions in real-time</p>
                  <p>• <strong>Execution Optimization:</strong> Minimize market impact</p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-4">Risk Management</h4>
                <div className="space-y-3 text-purple-700">
                  <p>• <strong>Credit Scoring:</strong> Assess borrower risk</p>
                  <p>• <strong>Fraud Detection:</strong> Identify suspicious transactions</p>
                  <p>• <strong>Market Risk:</strong> Predict volatility and drawdowns</p>
                  <p>• <strong>Portfolio Risk:</strong> Calculate VaR and stress tests</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-4">Financial Analysis</h4>
                <div className="space-y-3 text-yellow-700">
                  <p>• <strong>Sentiment Analysis:</strong> Process news and social media</p>
                  <p>• <strong>Technical Analysis:</strong> Identify chart patterns</p>
                  <p>• <strong>Fundamental Analysis:</strong> Analyze company data</p>
                  <p>• <strong>Market Research:</strong> Identify trends and correlations</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-800 mb-4">Customer Service</h4>
                <div className="space-y-3 text-indigo-700">
                  <p>• <strong>Chatbots:</strong> Handle customer inquiries</p>
                  <p>• <strong>Recommendations:</strong> Suggest products and services</p>
                  <p>• <strong>Personalization:</strong> Customize user experience</p>
                  <p>• <strong>Support:</strong> Automate routine tasks</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "ml-types",
        title: "Types of Machine Learning",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Different Approaches to Learning
              </h3>
              <p className="text-purple-700">
                Machine learning can be categorized into different types based on how algorithms learn and what they're trying to accomplish.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Supervised Learning</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Definition:</strong> Algorithms learn from labeled training data to make predictions</p>
                  <p>• <strong>Examples:</strong> Predicting stock prices, classifying credit risk, forecasting market trends</p>
                  <p>• <strong>Use Cases:</strong> Price prediction models, risk classification, trend forecasting</p>
                  <p>• <strong>Advantages:</strong> High accuracy, clear objectives, measurable performance</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Unsupervised Learning</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Definition:</strong> Algorithms find hidden patterns in data without labeled examples</p>
                  <p>• <strong>Examples:</strong> Market segmentation, anomaly detection, portfolio clustering</p>
                  <p>• <strong>Use Cases:</strong> Customer segmentation, fraud detection, market analysis</p>
                  <p>• <strong>Advantages:</strong> Discovers unknown patterns, works with unlabeled data</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Reinforcement Learning</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Definition:</strong> Algorithms learn through trial and error to maximize rewards</p>
                  <p>• <strong>Examples:</strong> Trading strategy optimization, portfolio management, risk control</p>
                  <p>• <strong>Use Cases:</strong> Algorithmic trading, portfolio optimization, risk management</p>
                  <p>• <strong>Advantages:</strong> Adapts to changing environments, optimizes long-term outcomes</p>
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
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                Match ML Concepts with Applications
              </h3>
              <p className="text-indigo-700 mb-4">
                Test your understanding by matching machine learning concepts with their financial applications.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">Match the ML technique with its best financial application:</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Supervised Learning:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select application...</option>
                        <option value="a">A) Market segmentation</option>
                        <option value="b">B) Stock price prediction</option>
                        <option value="c">C) Portfolio optimization</option>
                        <option value="d">D) Anomaly detection</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Unsupervised Learning:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select application...</option>
                        <option value="a">A) Credit scoring</option>
                        <option value="b">B) Risk assessment</option>
                        <option value="c">C) Customer clustering</option>
                        <option value="d">D) Price forecasting</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Reinforcement Learning:</span>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option value="">Select application...</option>
                        <option value="a">A) Data preprocessing</option>
                        <option value="b">B) Pattern recognition</option>
                        <option value="c">C) Trading strategy optimization</option>
                        <option value="d">D) Market analysis</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "algorithms",
        title: "Popular ML Algorithms in Finance",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Tools of the Trade
              </h3>
              <p className="text-orange-700">
                Various machine learning algorithms are used in finance, each with its own strengths and applications.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Linear Regression</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Use:</strong> Price prediction and trend analysis</p>
                  <p>• <strong>Advantages:</strong> Simple, interpretable, fast</p>
                  <p>• <strong>Limitations:</strong> Assumes linear relationships</p>
                  <p>• <strong>Applications:</strong> Stock price forecasting, yield curve modeling</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Random Forest</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Use:</strong> Risk assessment and portfolio optimization</p>
                  <p>• <strong>Advantages:</strong> Handles non-linear data, robust</p>
                  <p>• <strong>Limitations:</strong> Less interpretable than linear models</p>
                  <p>• <strong>Applications:</strong> Credit scoring, fraud detection</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Neural Networks</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Use:</strong> Complex pattern recognition and prediction</p>
                  <p>• <strong>Advantages:</strong> Captures complex relationships, high accuracy</p>
                  <p>• <strong>Limitations:</strong> Requires large datasets, black box nature</p>
                  <p>• <strong>Applications:</strong> Market prediction, sentiment analysis</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Support Vector Machines</h4>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>Use:</strong> Classification and regression tasks</p>
                  <p>• <strong>Advantages:</strong> Effective in high-dimensional spaces</p>
                  <p>• <strong>Limitations:</strong> Sensitive to parameter tuning</p>
                  <p>• <strong>Applications:</strong> Market classification, risk assessment</p>
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
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-semibold text-red-800 mb-4">
                Critical Thinking Questions
              </h3>
              <p className="text-red-700 mb-4">
                Answer these questions to demonstrate your understanding of machine learning in finance.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. Why might a machine learning model that works well in backtesting fail in live trading?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the key differences between using ML for short-term vs. long-term investment decisions?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How can you ensure that your ML model doesn't overfit to historical market data?</p>
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
                Congratulations! You've completed the introduction to machine learning in finance. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Core Concepts</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Machine learning enables automated decision-making</li>
                  <li>✅ Three main types: supervised, unsupervised, reinforcement</li>
                  <li>✅ Applications include trading, risk management, analysis</li>
                  <li>✅ Popular algorithms: regression, random forest, neural networks</li>
                  <li>✅ Data quality and validation are crucial</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Implementation Considerations</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Start with simple models and gradually increase complexity</li>
                  <li>✅ Focus on interpretability and risk management</li>
                  <li>✅ Regular model validation and retraining</li>
                  <li>✅ Consider regulatory compliance requirements</li>
                  <li>✅ Build robust infrastructure and monitoring</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Next Steps</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🐍</span>
                  </div>
                  <p className="text-blue-700 text-sm">Learn Python</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Practice with data</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">🔬</span>
                  </div>
                  <p className="text-blue-700 text-sm">Build simple models</p>
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
