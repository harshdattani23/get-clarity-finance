"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function IntroductionToAlgoTradingPage() {
  const { t } = useTranslation('stock-market-course.introduction-to-algo-trading');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="introduction-to-algo-trading"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Introduction to Algorithmic Trading
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Learn the basics of algorithmic trading, how computers execute trades automatically, and the strategies used in modern markets.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Algorithmic trading uses computer programs to automatically execute trades based on predefined rules and strategies.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                What is Algorithmic Trading?
              </h2>
              <p className="text-gray-700 mb-4">
                Algorithmic trading, or &ldquo;algo trading,&rdquo; involves using computer algorithms to automatically execute trading strategies without human intervention.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Automated execution based on predefined rules</li>
                  <li>High-speed trading capabilities</li>
                  <li>Elimination of emotional decision-making</li>
                  <li>Ability to process large amounts of market data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Common Algo Trading Strategies
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold mb-2 text-green-800">Trend Following</h3>
                  <p className="text-green-700">Algorithms that identify and follow market trends, buying when prices are rising and selling when they&apos;re falling.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold mb-2 text-blue-800">Mean Reversion</h3>
                  <p className="text-blue-700">Strategies that bet on prices returning to their average or &ldquo;mean&rdquo; level after moving to extremes.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold mb-2 text-purple-800">Arbitrage</h3>
                  <p className="text-purple-700">Exploiting price differences between markets or instruments for risk-free profits.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold mb-2 text-yellow-800">Market Making</h3>
                  <p className="text-yellow-700">Providing liquidity by continuously quoting buy and sell prices for securities.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Advantages and Risks
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold mb-2 text-green-800">Advantages:</h3>
                  <ul className="list-disc list-inside text-green-700">
                    <li>Eliminates emotional trading decisions</li>
                    <li>Can execute trades 24/7</li>
                    <li>Processes vast amounts of data quickly</li>
                    <li>Consistent strategy execution</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold mb-2 text-red-800">Risks:</h3>
                  <ul className="list-disc list-inside text-red-700">
                    <li>Technical failures and system errors</li>
                    <li>Flash crashes and market disruptions</li>
                    <li>Complex risk management requirements</li>
                    <li>Regulatory and compliance issues</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Algorithmic trading automates trade execution based on rules</li>
                <li>Common strategies include trend following and mean reversion</li>
                <li>Offers speed and consistency but comes with technical risks</li>
                <li>Requires sophisticated risk management and monitoring</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
