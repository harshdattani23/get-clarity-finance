"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';
import PortfolioAllocator from '@/components/stock-market-course/PortfolioAllocator';

const AssetAllocationStrategiesPage = () => {
  const lessonData = {
    title: "Asset Allocation Strategies",
    description: "Learn how to build a portfolio that aligns with your financial goals and risk tolerance. This lesson covers different asset allocation strategies, from conservative to aggressive.",
    lessonSlug: "asset-allocation-strategies",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/advanced-analysis/asset-allocation-strategies-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/advanced-analysis/asset-allocation-strategies-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/advanced-analysis/asset-allocation-strategies-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/advanced-analysis/asset-allocation-strategies-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/advanced-analysis/asset-allocation-strategies-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/advanced-analysis/asset-allocation-strategies-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of portfolio management! In this lesson, you'll learn how to build a portfolio that aligns with your financial goals and risk tolerance. Asset allocation is one of the most important decisions an investor can make, and understanding different strategies will help you create a solid foundation for your financial future.",
      hi: "पोर्टफोलियो प्रबंधन की दुनिया में आपका स्वागत है! इस पाठ में, आप सीखेंगे कि अपने वित्तीय लक्ष्यों और जोखिम सहनशीलता के अनुरूप पोर्टफोलियो कैसे बनाएं। संपत्ति आवंटन एक निवेशक द्वारा लिया जाने वाला सबसे महत्वपूर्ण निर्णय है, और विभिन्न रणनीतियों को समझना आपको अपने वित्तीय भविष्य के लिए एक मजबूत आधार बनाने में मदद करेगा।",
      bn: "পোর্টফোলিও ব্যবস্থাপনার জগতে স্বাগতম! এই পাঠে, আপনি শিখবেন কীভাবে আপনার আর্থিক লক্ষ্য এবং ঝুঁকি সহনশীলতার সাথে সামঞ্জস্যপূর্ণ একটি পোর্টফোলিও তৈরি করবেন। সম্পদ বরাদ্দকরণ একজন বিনিয়োগকারী দ্বারা নেওয়া সবচেয়ে গুরুত্বপূর্ণ সিদ্ধান্তগুলির মধ্যে একটি, এবং বিভিন্ন কৌশল বোঝা আপনাকে আপনার আর্থিক ভবিষ্যতের জন্য একটি শক্ত ভিত্তি তৈরি করতে সাহায্য করবে।",
      mr: "पोर्टफोलिओ व्यवस्थापनाच्या जगात आपले स्वागत आहे! या धड्यात, तुम्ही शिकाल की तुमच्या आर्थिक ध्येये आणि जोखीम सहनशीलतेशी जुळणारे पोर्टफोलिओ कसे तयार करावे. मालमत्ता वाटप हे एक गुंतवणूકदाराने घेऊ शकणारे सर्वात महत्त्वाचे निर्णय आहे, आणि विविध धोरणे समजून घेणे तुम्हाला तुमच्या आर्थिक भविष्यासाठी एक मजबूत पाया तयार करण्यास मदत करेल.",
      gu: "પોર્ટફોલિયો મેનેજમેન્ટની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, તમે શીખશો કે તમારા નાણાકીય ધ્યેયો અને જોખમ સહનશક્તિ સાથે જોડાણ કરતું પોર્ટફોલિયો કેવી રીતે બનાવવું. માલમત્તા વહેંચણી એ એક ગુન્તવણૂકદાર દ્વારા લઈ શકાતો સૌથી મહત્વપૂર્ણ નિર્ણય છે, અને વિવિધ વ્યૂહરચનાઓને સમજવાથી તમને તમારા નાણાકીય ભવિષ્ય માટે એક મજબૂત પાયો બનાવવામાં મદદ મળશે.",
      ta: "போர்ட்ஃபோலியோ மேலாண்மை உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், உங்கள் நிதி இலக்குகள் மற்றும் ஆபத்து சகிப்புத்திறனுடன் பொருந்தக்கூடிய போர்ட்ஃபோலியோவை எப்படி உருவாக்குவது என்பதை நீங்கள் கற்றுக்கொள்வீர்கள். சொத்து ஒதுக்கீடு என்பது ஒரு முதலீட்டாளர் எடுக்கக்கூடிய மிக முக்கியமான முடிவுகளில் ஒன்று, மேலும் வெவ்வேறு உத்திகளைப் புரிந்துகொள்வது உங்கள் நிதி எதிர்காலத்திற்கு ஒரு உறுதியான அடித்தளத்தை உருவாக்க உதவும்."
    },
    parts: [
      {
        id: "introduction",
        title: "Understanding Asset Allocation",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                The Foundation of Investment Success
              </h3>
              <p className="text-blue-700 mb-4">
                Asset allocation is one of the most important decisions an investor can make. It's the process of dividing your portfolio among different asset categories, such as stocks, bonds, and cash.
              </p>
              <p className="text-blue-700">
                The way you allocate your assets has a greater impact on your long-term returns than any single investment choice. The right asset allocation strategy for you will depend on your individual circumstances, including your age, financial goals, and tolerance for risk.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Key Takeaway</h4>
              <p className="text-green-700">
                Asset allocation is more important than individual stock selection. It's the foundation that determines your portfolio's risk and return characteristics.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• What asset allocation is and why it matters</li>
                  <li>• The three main asset classes</li>
                  <li>• Different allocation strategies</li>
                  <li>• How to choose the right strategy</li>
                  <li>• Portfolio rebalancing techniques</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Why This Matters</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Foundation of portfolio management</li>
                  <li>• Risk management tool</li>
                  <li>• Long-term return optimization</li>
                  <li>• Goal-based investing</li>
                  <li>• Professional approach</li>
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
                Let's see how much you already know about asset allocation!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the primary purpose of asset allocation?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) To maximize returns in all market conditions</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) To balance risk and reward according to goals</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) To minimize taxes on investment gains</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) To follow market trends automatically</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which asset class typically has the highest risk and return potential?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) Bonds</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) Cash and cash equivalents</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) Stocks</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) Real estate</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "what-is-asset-allocation",
        title: "What is Asset Allocation?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
                🎯 Balancing Risk and Reward
              </h3>
              <p className="text-indigo-700">
                Asset allocation is an investment strategy that aims to balance risk and reward by apportioning a portfolio's assets according to an individual's goals, risk tolerance, and investment horizon.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">The Three Main Asset Classes</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">📈 Stocks</h5>
                  <p className="text-green-700 text-sm">
                    Higher potential for growth, but also higher risk. Represent ownership in companies and can provide capital appreciation and dividends.
                  </p>
                  <div className="mt-2 text-xs text-green-600">
                    <strong>Risk Level:</strong> High<br/>
                    <strong>Return Potential:</strong> High<br/>
                    <strong>Liquidity:</strong> High
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">🏛️ Bonds</h5>
                  <p className="text-blue-700 text-sm">
                    Lower risk than stocks, with more modest returns. Represent loans to companies or governments and provide regular interest payments.
                  </p>
                  <div className="mt-2 text-xs text-blue-600">
                    <strong>Risk Level:</strong> Medium<br/>
                    <strong>Return Potential:</strong> Medium<br/>
                    <strong>Liquidity:</strong> Medium
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">💰 Cash & Cash Equivalents</h5>
                  <p className="text-purple-700 text-sm">
                    Very low risk, but also very low returns. Includes savings accounts, money market funds, and short-term certificates of deposit.
                  </p>
                  <div className="mt-2 text-xs text-purple-600">
                    <strong>Risk Level:</strong> Low<br/>
                    <strong>Return Potential:</strong> Low<br/>
                    <strong>Liquidity:</strong> Very High
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Why Asset Allocation Matters</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-yellow-800 mb-2">📊 Diversification Benefits</p>
                  <p className="text-yellow-700 text-sm">Different asset classes perform differently in various market conditions, reducing overall portfolio risk.</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-yellow-800 mb-2">🎯 Goal Alignment</p>
                  <p className="text-yellow-700 text-sm">Allocation can be tailored to specific financial goals, time horizons, and risk preferences.</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-yellow-800 mb-2">⚖️ Risk Management</p>
                  <p className="text-yellow-700 text-sm">Proper allocation helps manage risk while pursuing returns appropriate for your situation.</p>
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
                Match the Asset Class with its Characteristics
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each asset class with its primary characteristics.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Asset Classes:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Stocks</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Bonds</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Cash</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Characteristics:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Highest risk and return potential</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Medium risk with regular income</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Lowest risk and return potential</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "allocation-strategies",
        title: "Common Asset Allocation Strategies",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                🎯 Finding Your Investment Style
              </h3>
              <p className="text-green-700">
                Different investors have different risk tolerances and goals. Here are three common asset allocation strategies that can serve as starting points for building your portfolio.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Strategy Comparison</h4>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-3">🛡️ Conservative Strategy</h5>
                  <p className="text-blue-700 mb-3">
                    This strategy is for investors with a low risk tolerance. A typical conservative portfolio might be 70% bonds, 20% stocks, and 10% cash.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="bg-white p-2 rounded border text-center">
                      <span className="font-medium text-blue-800">70%</span><br/>
                      <span className="text-blue-600">Bonds</span>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <span className="font-medium text-blue-800">20%</span><br/>
                      <span className="text-blue-600">Stocks</span>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <span className="font-medium text-blue-800">10%</span><br/>
                      <span className="text-blue-600">Cash</span>
                    </div>
                  </div>
                  <div className="mt-3 text-blue-600 text-sm">
                    <strong>Best for:</strong> Retirees, conservative investors, short-term goals
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h5 className="font-semibold text-yellow-800 mb-3">⚖️ Moderate Strategy</h5>
                  <p className="text-yellow-700 mb-3">
                    This is for investors with a medium risk tolerance. A moderate portfolio might be 60% stocks and 40% bonds.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-white p-2 rounded border text-center">
                      <span className="font-medium text-yellow-800">60%</span><br/>
                      <span className="text-yellow-600">Stocks</span>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <span className="font-medium text-yellow-800">40%</span><br/>
                      <span className="text-yellow-600">Bonds</span>
                    </div>
                  </div>
                  <div className="mt-3 text-yellow-600 text-sm">
                    <strong>Best for:</strong> Middle-aged investors, balanced approach, medium-term goals
                  </div>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h5 className="font-semibold text-red-800 mb-3">🚀 Aggressive Strategy</h5>
                  <p className="text-red-700 mb-3">
                    This is for investors with a high risk tolerance who are seeking high returns. An aggressive portfolio might be 80% stocks and 20% bonds.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-white p-2 rounded border text-center">
                      <span className="font-medium text-red-800">80%</span><br/>
                      <span className="text-red-600">Stocks</span>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <span className="font-medium text-red-800">20%</span><br/>
                      <span className="text-red-600">Bonds</span>
                    </div>
                  </div>
                  <div className="mt-3 text-red-600 text-sm">
                    <strong>Best for:</strong> Young investors, long-term goals, high risk tolerance
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Factors to Consider</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">⏰ Time Horizon</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                    <li>• Longer time = More aggressive allocation</li>
                    <li>• Shorter time = More conservative allocation</li>
                    <li>• Retirement planning considerations</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-indigo-700 mb-2">🎯 Financial Goals</h5>
                  <ul className="text-indigo-600 text-sm space-y-1">
                    <li>• Capital preservation vs. growth</li>
                    <li>• Income generation needs</li>
                    <li>• Specific target amounts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "portfolio-allocator",
        title: "Find Your Own Allocation",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">
                🎯 Interactive Portfolio Allocator
              </h3>
              <p className="text-purple-700">
                Use the interactive tool below to experiment with different asset allocations and see how they might perform. This will help you understand the relationship between risk and return.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <PortfolioAllocator />
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">How to Use the Allocator</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-green-800 mb-2">1. Adjust Allocation Sliders</p>
                  <p className="text-green-700 text-sm">Move the sliders to see how different allocations affect your portfolio's risk and return profile.</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-green-800 mb-2">2. Consider Your Situation</p>
                  <p className="text-green-700 text-sm">Think about your age, goals, and risk tolerance when choosing an allocation.</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-green-800 mb-2">3. Test Different Scenarios</p>
                  <p className="text-green-700 text-sm">Try conservative, moderate, and aggressive allocations to see the differences.</p>
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
                Answer these questions to check your understanding of asset allocation.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. How would you adjust your asset allocation as you approach retirement?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What are the benefits of rebalancing your portfolio periodically?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How can you customize an asset allocation strategy for your specific needs?</p>
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
        title: "Conclusion: Your Blueprint for Success",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                What You've Learned
              </h3>
              <p className="text-green-700">
                Congratulations! You've completed the lesson on asset allocation strategies. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Asset Allocation Basics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Foundation of portfolio management</li>
                  <li>✅ Balances risk and reward</li>
                  <li>✅ Three main asset classes</li>
                  <li>✅ More important than stock selection</li>
                  <li>✅ Personalization is key</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Strategy Types</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ <strong>Conservative:</strong> 70% bonds, 20% stocks, 10% cash</li>
                  <li>✅ <strong>Moderate:</strong> 60% stocks, 40% bonds</li>
                  <li>✅ <strong>Aggressive:</strong> 80% stocks, 20% bonds</li>
                  <li>✅ Customizable based on goals</li>
                  <li>✅ Should evolve over time</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Implementation Steps</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">📊 Assessment</h5>
                  <p className="text-blue-600 text-sm">Evaluate your goals, time horizon, and risk tolerance</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">🎯 Strategy</h5>
                  <p className="text-blue-600 text-sm">Choose an allocation that matches your profile</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">🔄 Maintenance</h5>
                  <p className="text-blue-600 text-sm">Rebalance periodically and adjust as needed</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">💡</span>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Final Thought</h4>
                  <p className="text-yellow-800">
                    Asset allocation is not a one-time decision. It's important to review your portfolio periodically and rebalance it as needed to ensure it remains aligned with your goals. By creating a thoughtful asset allocation strategy, you are building a solid foundation for your financial future.
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
                  <p className="text-purple-700 text-sm">Study portfolio rebalancing</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">💼</span>
                  </div>
                  <p className="text-purple-700 text-sm">Learn about ETFs and mutual funds</p>
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
};

export default AssetAllocationStrategiesPage;
