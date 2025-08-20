"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function FinancialPlanningAndWealthManagementPage() {
  const lessonData = {
    title: "Financial Planning and Wealth Management",
    description: "Build, protect, and transfer wealth with a structured financial plan.",
    lessonSlug: "financial-planning-and-wealth-management",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/financial-planning/financial-planning-and-wealth-management-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/financial-planning/financial-planning-and-wealth-management-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/financial-planning/financial-planning-and-wealth-management-bn.m4a",
      te: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/financial-planning/financial-planning-and-wealth-management-te.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/financial-planning/financial-planning-and-wealth-management-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/financial-planning/financial-planning-and-wealth-management-mr.m4a"
    },
    transcript: {
      en: "Financial Planning and Wealth Management: Learn how to build, protect, and transfer wealth with a structured financial plan. This comprehensive guide covers financial planning, retirement strategies, tax optimization, and estate planning to help you achieve your long-term financial goals.",
      hi: "वित्तीय योजना और धन प्रबंधन: एक संरचित वित्तीय योजना के साथ धन बनाने, सुरक्षित करने और स्थानांतरित करने का तरीका सीखें। यह व्यापक गाइड वित्तीय योजना, सेवानिवृत्ति रणनीतियों, कर अनुकूलन और संपत्ति योजना को कवर करता है।",
      bn: "আর্থিক পরিকল্পনা এবং সম্পদ ব্যবস্থাপনা: একটি কাঠামোগত আর্থিক পরিকল্পনার সাথে সম্পদ গড়ে তোলা, রক্ষা করা এবং স্থানান্তর করার উপায় শিখুন।",
      te: "ఆర్థిక ప్రణాళిక మరియు సంపద నిర్వహణ: నిర్మాణాత్మక ఆర్థిక ప్రణాళికతో సంపదను నిర్మించడం, రక్షించడం మరియు బదిలీ చేయడం ఎలా నేర్చుకోవాలి.",
      ta: "நிதி திட்டமிடல் மற்றும் செல்வ மேலாண்மை: ஒரு கட்டமைக்கப்பட்ட நிதி திட்டத்துடன் செல்வத்தை உருவாக்க, பாதுகாக்க மற்றும் மாற்றுவதற்கான வழிகளைக் கற்றுக்கொள்ளுங்கள்.",
      mr: "आर्थिक नियोजन आणि संपत्ती व्यवस्थापन: एक संरचित आर्थिक योजनेसह संपत्ती तयार करणे, संरक्षण करणे आणि हस्तांतरित करण्याचे मार्ग शिका."
    },
    parts: [
      {
        id: "introduction",
        title: "Introduction to Financial Planning",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <p className="text-blue-800 text-lg leading-relaxed">
                This module covers planning, retirement, taxation, and estate strategies to meet long-term goals. 
                Financial planning is the process of creating a roadmap for your financial future, ensuring that 
                every decision you make today aligns with your long-term objectives.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Why Financial Planning Matters</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Provides direction and purpose to financial decisions</li>
                  <li>• Helps prioritize spending and saving</li>
                  <li>• Reduces financial stress and uncertainty</li>
                  <li>• Enables better goal achievement</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Key Benefits</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Better financial security</li>
                  <li>• Improved decision-making</li>
                  <li>• Enhanced wealth accumulation</li>
                  <li>• Peace of mind</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "financial-plan",
        title: "Creating a Financial Plan",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Building Your Financial Foundation
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-3">1. Financial Assessment</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-700 mb-2">Income Sources</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Primary employment</li>
                        <li>• Side hustles</li>
                        <li>• Investment returns</li>
                        <li>• Rental income</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-700 mb-2">Expense Categories</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Essential expenses</li>
                        <li>• Discretionary spending</li>
                        <li>• Debt payments</li>
                        <li>• Savings contributions</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-3">2. SMART Goal Setting</h4>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>S</strong>pecific, <strong>M</strong>easurable, <strong>A</strong>chievable, 
                      <strong>R</strong>elevant, <strong>T</strong>ime-bound
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Save ₹50,000 for emergency fund by December 2024</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Invest ₹10,000 monthly for retirement starting January 2024</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700">Pay off ₹2 lakh credit card debt by June 2024</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-3">3. Action Steps</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <ul className="space-y-2 text-blue-800">
                      <li>• Create monthly budget and track expenses</li>
                      <li>• Set up automatic savings transfers</li>
                      <li>• Review and adjust plan quarterly</li>
                      <li>• Consult with financial advisor annually</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "retirement-planning",
        title: "Retirement Planning",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">
                Securing Your Golden Years
              </h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-purple-700 mb-3">Future Needs Assessment</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <h5 className="font-medium text-purple-700 mb-2">Living Expenses</h5>
                        <p className="text-sm text-gray-600">Estimate monthly costs for housing, food, healthcare, and lifestyle</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <h5 className="font-medium text-purple-700 mb-2">Healthcare Costs</h5>
                        <p className="text-sm text-gray-600">Plan for medical insurance, medications, and long-term care</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <h5 className="font-medium text-purple-700 mb-2">Lifestyle Goals</h5>
                        <p className="text-sm text-gray-600">Travel, hobbies, and activities you want to pursue</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-purple-700 mb-3">Investment Vehicles</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <h5 className="font-medium text-purple-700 mb-2">EPF & PPF</h5>
                        <p className="text-sm text-gray-600">Government-backed retirement savings with tax benefits</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <h5 className="font-medium text-purple-700 mb-2">NPS</h5>
                        <p className="text-sm text-gray-600">National Pension System for additional retirement income</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <h5 className="font-medium text-purple-700 mb-2">Mutual Funds</h5>
                        <p className="text-sm text-gray-600">Diversified equity and debt investments for growth</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-yellow-800 mb-3">💡 Pro Tips</h4>
                  <ul className="space-y-2 text-yellow-700 text-sm">
                    <li>• Start early - compound interest works best over long periods</li>
                    <li>• Aim to save 15-20% of your income for retirement</li>
                    <li>• Consider inflation when calculating future needs</li>
                    <li>• Review and rebalance your portfolio annually</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "tax-planning",
        title: "Tax Planning",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Maximizing After-Tax Returns
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-green-700 mb-4">Tax-Advantaged Accounts</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-700 mb-2">ELSS (Equity Linked Savings Scheme)</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Tax deduction up to ₹1.5 lakh under Section 80C</li>
                        <li>• 3-year lock-in period</li>
                        <li>• Equity exposure for growth</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-700 mb-2">PPF (Public Provident Fund)</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Tax-free interest and withdrawals</li>
                        <li>• 15-year maturity period</li>
                        <li>• Government guarantee</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-700 mb-2">NPS (National Pension System)</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Additional ₹50,000 deduction under Section 80CCD(1B)</li>
                        <li>• Low-cost pension scheme</li>
                        <li>• Flexible contribution options</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-700 mb-2">Health Insurance</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Deduction up to ₹25,000 under Section 80D</li>
                        <li>• Additional ₹25,000 for senior citizens</li>
                        <li>• Preventive healthcare benefits</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-blue-800 mb-3">📊 Tax Efficiency Strategies</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">Short-term vs Long-term</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Hold equity investments for 1+ years for lower tax</li>
                        <li>• Use tax-loss harvesting to offset gains</li>
                        <li>• Consider timing of income and expenses</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">Deduction Optimization</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Maximize Section 80C deductions</li>
                        <li>• Claim HRA and home loan interest</li>
                        <li>• Utilize standard deduction effectively</li>
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
        id: "estate-planning",
        title: "Estate Planning",
        isRequired: true,
        type: "content" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
                Protecting Your Legacy
              </h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-indigo-700 mb-3">Essential Documents</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <h5 className="font-medium text-indigo-700 mb-2">Will</h5>
                        <p className="text-sm text-gray-600">Legal document specifying how assets should be distributed</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <h5 className="font-medium text-indigo-700 mb-2">Nomination Forms</h5>
                        <p className="text-sm text-gray-600">Designate beneficiaries for financial accounts and insurance</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <h5 className="font-medium text-indigo-700 mb-2">Trusts</h5>
                        <p className="text-sm text-gray-600">Legal entities to hold and manage assets for beneficiaries</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-indigo-700 mb-3">Planning Considerations</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <h5 className="font-medium text-indigo-700 mb-2">Family Dynamics</h5>
                        <p className="text-sm text-gray-600">Consider relationships and potential conflicts</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <h5 className="font-medium text-indigo-700 mb-2">Tax Implications</h5>
                        <p className="text-sm text-gray-600">Understand inheritance and estate taxes</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <h5 className="font-medium text-indigo-700 mb-2">Business Succession</h5>
                        <p className="text-sm text-gray-600">Plan for business transfer or sale</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-red-800 mb-3">⚠️ Important Considerations</h4>
                  <ul className="space-y-2 text-red-700 text-sm">
                    <li>• Update documents after major life changes</li>
                    <li>• Keep copies in safe locations</li>
                    <li>• Inform family members of your plans</li>
                    <li>• Consult with legal professionals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "quiz",
        title: "Financial Planning Quiz",
        isRequired: true,
        type: "quiz" as const,
        minScore: 3,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Test Your Knowledge
              </h3>
              <p className="text-blue-700 mb-4">
                Answer these questions to check your understanding of financial planning concepts.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    1. What does SMART stand for in goal setting?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Specific, Measurable, Achievable, Relevant, Time-bound</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Simple, Meaningful, Attainable, Realistic, Timely</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q1" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Strategic, Measurable, Actionable, Relevant, Trackable</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    2. Which investment vehicle offers tax deduction under Section 80C?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">ELSS</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Direct equity</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q2" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Gold ETFs</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    3. What percentage of income should you aim to save for retirement?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">5-10%</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">15-20%</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q3" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">25-30%</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    4. Which document is essential for estate planning?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Will</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Birth certificate</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q4" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">Passport</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-800 mb-3">
                    5. What is the lock-in period for ELSS investments?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="a" className="text-blue-600" />
                      <span className="text-sm text-gray-700">1 year</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="b" className="text-blue-600" />
                      <span className="text-sm text-gray-700">3 years</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="q5" value="c" className="text-blue-600" />
                      <span className="text-sm text-gray-700">5 years</span>
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
        title: "Financial Planning Tools Selection",
        isRequired: true,
        type: "selection" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Choose Your Financial Planning Tools
              </h3>
              <p className="text-green-700 mb-6">
                Select the tools and strategies that best fit your financial situation and goals.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Budgeting Tools</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Excel/Google Sheets</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Mint/Personal Capital</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">YNAB (You Need A Budget)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Traditional pen and paper</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Investment Platforms</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Direct mutual fund platforms</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Stock trading apps</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Robo-advisors</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Traditional brokers</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-800 mb-3">Professional Services</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Financial advisor</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Tax consultant</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Estate planning attorney</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-green-600" />
                      <span className="text-sm text-gray-700">Insurance agent</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "short-questions",
        title: "Reflection Questions",
        isRequired: true,
        type: "short-answer" as const,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Personal Financial Planning Reflection
              </h3>
              <p className="text-purple-700 mb-6">
                Take time to reflect on your financial situation and answer these questions thoughtfully.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <label className="block">
                    <span className="font-medium text-gray-800 mb-2 block">
                      1. What are your top 3 financial goals for the next 5 years?
                    </span>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                      placeholder="Be specific about amounts, timelines, and priorities..."
                    ></textarea>
                  </label>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <label className="block">
                    <span className="font-medium text-gray-800 mb-2 block">
                      2. What is your current monthly savings rate, and how does it compare to your target?
                    </span>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                      placeholder="Calculate your savings rate and identify areas for improvement..."
                    ></textarea>
                  </label>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <label className="block">
                    <span className="font-medium text-gray-800 mb-2 block">
                      3. What tax-saving opportunities are you currently missing out on?
                    </span>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                      placeholder="Review your current tax deductions and identify additional opportunities..."
                    ></textarea>
                  </label>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <label className="block">
                    <span className="font-medium text-gray-800 mb-2 block">
                      4. How prepared are you for unexpected financial emergencies?
                    </span>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                      placeholder="Assess your emergency fund, insurance coverage, and contingency plans..."
                    ></textarea>
                  </label>
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
                      <h4 className="font-medium text-green-800">Written Plan Alignment</h4>
                      <p className="text-green-700 text-sm">A written financial plan aligns money decisions with your goals and provides direction for financial decisions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Retirement Success Factors</h4>
                      <p className="text-green-700 text-sm">Retirement success depends on your savings rate and asset mix, not just the amount you save.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Tax Efficiency Benefits</h4>
                      <p className="text-green-700 text-sm">Tax efficiency compounds over time, making it crucial for long-term wealth building.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">Estate Planning Protection</h4>
                      <p className="text-green-700 text-sm">Estate planning protects your family and ensures your intentions are carried out after you're gone.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">🚀 Next Steps</h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Create your first financial plan using the SMART framework</li>
                  <li>• Set up automatic savings for your retirement goals</li>
                  <li>• Review your current tax-saving opportunities</li>
                  <li>• Consult with a financial advisor to create a comprehensive plan</li>
                  <li>• Start building your emergency fund if you haven't already</li>
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
