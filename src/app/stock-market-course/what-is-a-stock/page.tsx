"use client";

import LessonLayout from '../LessonLayout';

export default function WhatIsAStockPage() {
  const lessonData = {
    title: "What is a Stock?",
    description: "Understand what stocks are, how they represent ownership in companies, and why people buy and sell them.",
    lessonSlug: "what-is-a-stock",
    hasAudio: true,
    audioParts: [
      {
        id: 'introduction',
        title: 'Introduction to Stocks',
        audioUrl: 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/what-is-a-stock-en.m4a',
        duration: 180,
        transcript: "What is a Stock: Understand what stocks are, how they represent ownership in companies, and why people buy and sell them. Learn the fundamentals of stock ownership."
      },
      {
        id: 'ownership-rights',
        title: 'Rights of Stock Ownership',
        audioUrl: 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/what-is-a-stock-en.m4a',
        duration: 240,
        transcript: "When you own stocks, you're not just holding a piece of paper. You get real rights as a part-owner of the company including voting rights, dividend rights, and capital appreciation."
      },
      {
        id: 'why-buy-stocks',
        title: 'Why Do People Buy Stocks?',
        audioUrl: 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/basics/what-is-a-stock-en.m4a',
        duration: 200,
        transcript: "People buy stocks for various reasons, but the main goals are usually to grow their wealth and beat inflation through wealth growth and passive income."
      }
    ],
    parts: [
      {
        id: 'introduction',
        title: 'Understanding Stocks',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                In this lesson, you'll understand what stocks are, how they represent ownership in companies, and why people buy and sell them.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is a Stock?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>stock</strong> (also called a share or equity) represents a small piece of ownership in a company. When you buy a stock, you become a part-owner of that company.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Think of it like this: If a company is like a pizza, then stocks are like slices of that pizza. When you buy a stock, you're buying a slice of the company.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  🍕 Company = Pizza | 📈 Stock = Slice of Pizza
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Benefits of Owning Stocks</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Share in company profits</li>
                  <li>• Vote on company decisions</li>
                  <li>• Potential for value appreciation</li>
                  <li>• Dividend payments</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Important to Remember</h4>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Stock prices can go up or down</li>
                  <li>• No guarantee of profits</li>
                  <li>• Research before investing</li>
                  <li>• Diversify your investments</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'ownership-rights',
        title: 'Rights of Stock Ownership',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What Rights Do You Get?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you own stocks, you're not just holding a piece of paper. You get real rights as a part-owner of the company:
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">1. Voting Rights</h4>
                <p className="text-blue-700 mb-3">
                  You can vote on important company decisions at shareholder meetings.
                </p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-blue-800 font-medium">What You Can Vote On:</p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Electing board of directors</li>
                    <li>• Major business decisions</li>
                    <li>• Mergers and acquisitions</li>
                    <li>• Changes to company structure</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">2. Dividend Rights</h4>
                <p className="text-green-700 mb-3">
                  If the company makes profits and decides to share them, you get dividend payments.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-green-800 font-medium">How Dividends Work:</p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Company earns profit</li>
                    <li>• Board decides to pay dividends</li>
                    <li>• Money is distributed to shareholders</li>
                    <li>• You receive payment per share owned</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">3. Capital Appreciation</h4>
                <p className="text-purple-700 mb-3">
                  If the company grows and becomes more valuable, your stock price increases.
                </p>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-purple-800 font-medium">Example:</p>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Buy stock at ₹100</li>
                    <li>• Company grows and performs well</li>
                    <li>• Stock price rises to ₹150</li>
                    <li>• You gain ₹50 per share!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'why-buy-stocks',
        title: 'Why Do People Buy Stocks?',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Reasons People Invest in Stocks
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                People buy stocks for various reasons, but the main goals are usually to grow their wealth and beat inflation:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">📈 Wealth Growth</h4>
                <p className="text-green-700 mb-3">
                  Historically, stocks have provided better returns than savings accounts or fixed deposits over the long term.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-green-800 font-medium">Long-term Benefits:</p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Beat inflation</li>
                    <li>• Compound growth</li>
                    <li>• Higher returns potential</li>
                    <li>• Build retirement fund</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">💰 Passive Income</h4>
                <p className="text-blue-700 mb-3">
                  Dividend-paying stocks can provide regular income without selling your shares.
                </p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-blue-800 font-medium">Income Sources:</p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Quarterly dividends</li>
                    <li>• Special dividends</li>
                    <li>• Bonus shares</li>
                    <li>• Rights issues</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
              <p className="text-lg font-semibold text-yellow-800">
                Remember: Higher potential returns come with higher risk. Never invest more than you can afford to lose!
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'quiz',
        title: 'Test Your Knowledge',
        isRequired: true,
        type: 'quiz' as const,
        minScore: 70,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                What is a Stock Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of stocks!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What does owning a stock represent?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>A loan to the company</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Ownership in the company</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>A job at the company</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. What is a dividend?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>A fee you pay to buy stocks</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>A share of company profits paid to shareholders</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>The price of the stock</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. What should you remember about stock prices?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>They always go up</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>They can go up or down</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>They never change</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]
  };

  return (
    <LessonLayout
      title={lessonData.title}
      description={lessonData.description}
      lessonSlug={lessonData.lessonSlug}
      hasAudio={lessonData.hasAudio}
      audioParts={lessonData.audioParts}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            What You'll Learn
          </h3>
          <p className="text-blue-700">
            In this lesson, you'll understand what stocks are, how they represent ownership in companies, and why people buy and sell them.
          </p>
        </div>

        {/* What is a Stock */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            What is a Stock?
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>stock</strong> (also called a share or equity) represents a small piece of ownership in a company. When you buy a stock, you become a part-owner of that company.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Think of it like this: If a company is like a pizza, then stocks are like slices of that pizza. When you buy a stock, you're buying a slice of the company.
          </p>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
            <p className="text-lg font-semibold text-green-800">
              🍕 Company = Pizza | 📈 Stock = Slice of Pizza
            </p>
          </div>
        </div>

        {/* Benefits and Risks */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Benefits of Owning Stocks</h4>
            <ul className="text-green-700 space-y-1 text-sm">
              <li>• Share in company profits</li>
              <li>• Vote on company decisions</li>
              <li>• Potential for value appreciation</li>
              <li>• Dividend payments</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-2">Important to Remember</h4>
            <ul className="text-orange-700 space-y-1 text-sm">
              <li>• Stock prices can go up or down</li>
              <li>• No guarantee of profits</li>
              <li>• Research before investing</li>
              <li>• Diversify your investments</li>
            </ul>
          </div>
        </div>

        {/* Rights of Stock Ownership */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            What Rights Do You Get?
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you own stocks, you're not just holding a piece of paper. You get real rights as a part-owner of the company:
          </p>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="text-xl font-semibold text-blue-800 mb-3">1. Voting Rights</h4>
              <p className="text-blue-700 mb-3">
                You can vote on important company decisions at shareholder meetings.
              </p>
              <div className="bg-white p-3 rounded border border-blue-200">
                <p className="text-blue-800 font-medium">What You Can Vote On:</p>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Electing board of directors</li>
                  <li>• Major business decisions</li>
                  <li>• Mergers and acquisitions</li>
                  <li>• Changes to company structure</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="text-xl font-semibold text-green-800 mb-3">2. Dividend Rights</h4>
              <p className="text-green-700 mb-3">
                If the company makes profits and decides to share them, you get dividend payments.
              </p>
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="text-green-800 font-medium">How Dividends Work:</p>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Company earns profit</li>
                  <li>• Board decides to pay dividends</li>
                  <li>• Money is distributed to shareholders</li>
                  <li>• You receive payment per share owned</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 className="text-xl font-semibold text-purple-800 mb-3">3. Capital Appreciation</h4>
              <p className="text-purple-700 mb-3">
                If the company grows and becomes more valuable, your stock price increases.
              </p>
              <div className="bg-white p-3 rounded border border-purple-200">
                <p className="text-purple-800 font-medium">Example:</p>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Buy stock at ₹100</li>
                  <li>• Company grows and performs well</li>
                  <li>• Stock price rises to ₹150</li>
                  <li>• You gain ₹50 per share!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Why Buy Stocks */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Reasons People Invest in Stocks
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            People buy stocks for various reasons, but the main goals are usually to grow their wealth and beat inflation:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="text-xl font-semibold text-green-800 mb-3">📈 Wealth Growth</h4>
              <p className="text-green-700 mb-3">
                Historically, stocks have provided better returns than savings accounts or fixed deposits over the long term.
              </p>
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="text-green-800 font-medium">Long-term Benefits:</p>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Beat inflation</li>
                  <li>• Compound growth</li>
                  <li>• Higher returns potential</li>
                  <li>• Build retirement fund</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="text-xl font-semibold text-blue-800 mb-3">💰 Passive Income</h4>
              <p className="text-blue-700 mb-3">
                Dividend-paying stocks can provide regular income without selling your shares.
              </p>
              <div className="bg-white p-3 rounded border border-blue-200">
                <p className="text-blue-800 font-medium">Income Sources:</p>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Quarterly dividends</li>
                  <li>• Special dividends</li>
                  <li>• Bonus shares</li>
                  <li>• Rights issues</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center mt-6">
            <p className="text-lg font-semibold text-yellow-800">
              Remember: Higher potential returns come with higher risk. Never invest more than you can afford to lose!
            </p>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}