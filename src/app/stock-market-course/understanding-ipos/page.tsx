"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function UnderstandingIPOsPage() {
  const lessonData = {
    title: "Understanding Initial Public Offerings (IPOs)",
    description: "Learn what IPOs are, how they work, and why they're important for both companies and investors in the Indian market.",
    lessonSlug: "understanding-ipos",
    audioFiles: {
      en: "gs://getclarity-audio-bucket/lessons/foundational/understanding-ipos-en.m4a",
      hi: "gs://getclarity-audio-bucket/lessons/foundational/understanding-ipos-hi.m4a",
      bn: "gs://getclarity-audio-bucket/lessons/foundational/understanding-ipos-bn.m4a",
      mr: "gs://getclarity-audio-bucket/lessons/foundational/understanding-ipos-mr.m4a",
      gu: "gs://getclarity-audio-bucket/lessons/foundational/understanding-ipos-gu.m4a",
      ta: "gs://getclarity-audio-bucket/lessons/foundational/understanding-ipos-ta.m4a"
    },
    transcript: {
      en: "Welcome to the world of IPOs! In this lesson, we'll explore what Initial Public Offerings are, how they work, and why they're important for both companies and investors in the Indian market. You'll learn about the IPO process, different types of IPOs, important terms, and key considerations for investors.",
      hi: "IPO की दुनिया में आपका स्वागत है! इस पाठ में, हम देखेंगे कि Initial Public Offerings क्या हैं, वे कैसे काम करते हैं, और भारतीय बाजार में कंपनियों और निवेशकों दोनों के लिए वे क्यों महत्वपूर्ण हैं। आप IPO प्रक्रिया, विभिन्न प्रकार के IPO, महत्वपूर्ण शब्द, और निवेशकों के लिए मुख्य विचारों के बारे में जानेंगे।",
      bn: "IPO এর জগতে স্বাগতম! এই পাঠে, আমরা দেখব Initial Public Offerings কী, তারা কীভাবে কাজ করে, এবং ভারতীয় বাজারে কোম্পানি এবং বিনিয়োগকারীদের উভয়ের জন্যই তারা কেন গুরুত্বপূর্ণ। আপনি IPO প্রক্রিয়া, বিভিন্ন ধরনের IPO, গুরুত্বপূর্ণ শব্দ, এবং বিনিয়োগকারীদের জন্য মূল বিবেচনা সম্পর্কে জানবেন।",
      mr: "IPO च्या जगात आपले स्वागत आहे! या धड्यात, आपण पाहू की Initial Public Offerings काय आहेत, ते कसे काम करतात, आणि भारतीय बाजारात कंपन्यांसाठी आणि गुंतवणूकदारांसाठी ते का महत्वाचे आहेत. तुम्ही IPO प्रक्रिया, विविध प्रकारच्या IPO, महत्वाच्या शब्दांबद्दल, आणि गुंतवणूकदारांसाठी मुख्य विचारांबद्दल जाणू.",
      gu: "IPO ની દુનિયામાં આપનું સ્વાગત છે! આ પાઠમાં, આપણે જોઈશું કે Initial Public Offerings શું છે, તેઓ કેવી રીતે કામ કરે છે, અને ભારતીય બજારમાં કંપનીઓ અને ગુતવણૂકદારો બંને માટે તેઓ કેમ મહત્વપૂર્ણ છે. તમે IPO પ્રક્રિયા, વિવિધ પ્રકારના IPO, મહત્વપૂર્ણ શબ્દો, અને ગુતવણૂકદારો માટે મુખ્ય વિચારો વિશે જાણશો.",
      ta: "IPO உலகிற்கு வரவேற்கிறோம்! இந்த பாடத்தில், Initial Public Offerings என்ன, அவை எப்படி வேலை செய்கின்றன, மேலும் இந்திய சந்தையில் நிறுவனங்கள் மற்றும் முதலீட்டாளர்கள் இருவருக்கும் அவை ஏன் முக்கியமானவை என்பதை ஆராய்வோம். IPO செயல்முறை, பல்வேறு வகையான IPO கள், முக்கியமான சொற்கள், மேலும் முதலீட்டாளர்களுக்கான முக்கிய பரிசீலனைகள் பற்றி நீங்கள் கற்றுக்கொள்வீர்கள்."
    },
    parts: [
      {
        id: "introduction",
        title: "What is an IPO?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                What is an IPO?
              </h3>
              <p className="text-blue-700">
                An Initial Public Offering (IPO) is the process through which a private company becomes a publicly traded company by offering its shares to the public for the first time. It's one of the most significant milestones in a company's journey and represents a major fundraising event.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Key Takeaway</h4>
              <p className="text-green-700">
                An IPO transforms a private company into a public company, allowing it to raise capital from public investors while providing liquidity to existing shareholders.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• What IPOs are and how they work</li>
                  <li>• Why companies go public</li>
                  <li>• The IPO process in India</li>
                  <li>• Types of IPOs available</li>
                  <li>• Important terms and considerations</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Why IPOs Matter</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Major fundraising opportunity</li>
                  <li>• Public market access</li>
                  <li>• Enhanced credibility</li>
                  <li>• Liquidity for shareholders</li>
                  <li>• Investment opportunity for public</li>
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
                Let's see how much you already know about IPOs!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What does IPO stand for?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A) Initial Public Offering</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>B) International Public Organization</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>C) Investment Portfolio Option</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="d" className="mr-2" />
                      <span>D) Individual Public Order</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What happens when a company goes public through an IPO?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A) The company becomes private</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>B) The company's shares are offered to the public for the first time</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>C) The company closes down</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="d" className="mr-2" />
                      <span>D) The company merges with another company</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "why-companies-go-public",
        title: "Why Do Companies Go Public?",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Strategic Benefits of Going Public
              </h3>
              <p className="text-orange-700">
                Companies choose to go public for various strategic reasons that can significantly impact their growth and market position.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">💰 Raising Capital</h4>
                <p className="text-green-800 text-sm">
                  Companies can raise significant amounts of money to fund expansion, research, debt repayment, or acquisitions.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">🏢 Enhanced Credibility</h4>
                <p className="text-blue-800 text-sm">
                  Being publicly listed increases a company's visibility and credibility in the market.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">📈 Liquidity for Shareholders</h4>
                <p className="text-purple-800 text-sm">
                  Existing shareholders can sell their shares in the public market, providing an exit option.
                </p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-2">🎯 Employee Benefits</h4>
                <p className="text-indigo-800 text-sm">
                  Companies can use stock options and shares to attract and retain talented employees.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Additional Benefits</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Market Valuation</h5>
                  <p className="text-blue-600 text-sm">Public listing provides transparent market valuation</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Acquisition Currency</h5>
                  <p className="text-blue-600 text-sm">Public shares can be used for mergers and acquisitions</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Regulatory Compliance</h5>
                  <p className="text-blue-600 text-sm">Enhanced corporate governance and transparency</p>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Brand Recognition</h5>
                  <p className="text-blue-600 text-sm">Increased media coverage and public awareness</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "ipo-process",
        title: "The IPO Process in India",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                Step-by-Step Journey
              </h3>
              <p className="text-purple-700">
                The IPO process in India is well-regulated and follows a structured approach to ensure transparency and investor protection.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Company Preparation</h4>
                  <p className="text-gray-700">
                    The company prepares financial statements, appoints merchant bankers, and gets regulatory approvals from SEBI.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Draft Red Herring Prospectus (DRHP)</h4>
                  <p className="text-gray-700">
                    A preliminary prospectus is filed with SEBI containing company information, financials, and IPO details.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">SEBI Review</h4>
                  <p className="text-gray-700">
                    SEBI reviews the DRHP and may ask for clarifications or modifications before approval.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">IPO Launch</h4>
                  <p className="text-gray-700">
                    The IPO opens for subscription, and investors can apply for shares through various channels.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">5</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Listing</h4>
                  <p className="text-gray-700">
                    After successful subscription, shares are allocated and the company gets listed on stock exchanges.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Timeline Overview</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Preparation Phase</h5>
                  <p className="text-yellow-600 text-sm">3-6 months for company preparation and DRHP filing</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">SEBI Review</h5>
                  <p className="text-yellow-600 text-sm">2-4 weeks for regulatory review and approval</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">IPO & Listing</h5>
                  <p className="text-yellow-600 text-sm">1-2 weeks for subscription and listing process</p>
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
                Match the IPO Stage with its Description
              </h3>
              <p className="text-purple-700 mb-6">
                Test your understanding by matching each IPO stage with its correct description.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">IPO Stages:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">Company Preparation</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">DRHP Filing</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">SEBI Review</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="font-medium">IPO Launch</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-purple-800">Descriptions:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Financial statements and regulatory approvals</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Preliminary prospectus with company details</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Regulatory review and approval process</p>
                    </div>
                    <div className="bg-white p-3 rounded border cursor-pointer hover:bg-purple-50 transition-colors">
                      <p className="text-sm">Public subscription opens for investors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "types-of-ipos",
        title: "Types of IPOs in India",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                Understanding IPO Categories
              </h3>
              <p className="text-indigo-700">
                There are different types of IPOs available in India, each with its own characteristics and processes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">📊 Book Building IPO</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Price is determined through a bidding process where investors bid within a price band.
                </p>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 mr-2 text-green-500">✅</span>
                  Most common in India
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <p>• Price band: ₹100-₹110</p>
                  <p>• Investors bid within range</p>
                  <p>• Final price based on demand</p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">💰 Fixed Price IPO</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Company sets a fixed price for all shares, and investors apply at that price.
                </p>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 mr-2 text-green-500">✅</span>
                  Simpler process
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <p>• Fixed price: ₹100</p>
                  <p>• All investors pay same price</p>
                  <p>• No bidding involved</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Key Differences</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Book Building IPO</h5>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• Price discovery through bidding</li>
                    <li>• More complex process</li>
                    <li>• Better price discovery</li>
                    <li>• Higher subscription rates</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Fixed Price IPO</h5>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• Predetermined price</li>
                    <li>• Simpler process</li>
                    <li>• Less price discovery</li>
                    <li>• Lower subscription rates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "important-terms",
        title: "Important IPO Terms",
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Essential Vocabulary
              </h3>
              <p className="text-green-700">
                Understanding these key terms will help you make informed decisions when investing in IPOs.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Face Value</h4>
                  <p className="text-gray-700 text-sm">The nominal value of a share as mentioned in the company's memorandum.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Issue Price</h4>
                  <p className="text-gray-700 text-sm">The price at which shares are offered to the public during the IPO.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Lot Size</h4>
                  <p className="text-gray-700 text-sm">The minimum number of shares an investor must apply for.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Subscription</h4>
                  <p className="text-gray-700 text-sm">The number of times the IPO is oversubscribed by investors.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Additional Terms</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Price Band</h5>
                  <p className="text-yellow-600 text-sm">Range within which investors can bid in book building IPOs</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Cut-off Price</h5>
                  <p className="text-yellow-600 text-sm">Final price determined after the bidding process</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Allotment</h5>
                  <p className="text-yellow-600 text-sm">Process of distributing shares to successful applicants</p>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-700 mb-2">Listing Date</h5>
                  <p className="text-yellow-600 text-sm">Date when shares start trading on stock exchanges</p>
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
                Answer these questions to check your understanding of IPOs.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the difference between face value and issue price?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Why do companies prefer book building IPOs over fixed price IPOs?</p>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What role does SEBI play in the IPO process?</p>
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
                Congratulations! You've completed the lesson on understanding IPOs. Here's a summary of the key concepts.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">IPO Basics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ IPO transforms private company to public</li>
                  <li>✅ Major fundraising opportunity</li>
                  <li>✅ Enhanced credibility and visibility</li>
                  <li>✅ Liquidity for existing shareholders</li>
                  <li>✅ Employee stock option benefits</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">IPO Process & Types</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ 5-stage process from preparation to listing</li>
                  <li>✅ SEBI regulates entire process</li>
                  <li>✅ Book building IPOs most common</li>
                  <li>✅ Fixed price IPOs simpler</li>
                  <li>✅ DRHP contains all company details</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Important Note</h4>
                  <p className="text-yellow-800">
                    IPOs can be highly volatile and risky. Always read the prospectus carefully, understand the business model, and consider your investment goals before applying.
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
                  <p className="text-blue-700 text-sm">Read prospectus</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">💼</span>
                  </div>
                  <p className="text-blue-700 text-sm">Apply for IPOs</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">📊</span>
                  </div>
                  <p className="text-blue-700 text-sm">Monitor listing</p>
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
