"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function BuildingATradingBotPage() {
  const { t } = useTranslation('stock-market-course.building-a-trading-bot');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="building-a-trading-bot"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Building a Trading Bot
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Learn the fundamentals of creating automated trading systems, from strategy development to implementation and testing.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Building a trading bot involves creating software that can automatically execute trades based on predefined rules and market conditions.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Essential Components
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Strategy Engine</h3>
                  <p className="text-gray-700">The core logic that determines when to buy, sell, or hold positions based on market data.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Data Feed</h3>
                  <p className="text-gray-700">Real-time market data including prices, volume, and other relevant information.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Risk Management</h3>
                  <p className="text-gray-700">Systems to control position sizes, set stop-losses, and manage overall portfolio risk.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Execution Engine</h3>
                  <p className="text-gray-700">Interface with brokers to place and manage trades automatically.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Development Process
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <ol className="list-decimal list-inside space-y-2 text-yellow-800">
                  <li><strong>Strategy Design:</strong> Define clear rules and logic for trading decisions</li>
                  <li><strong>Backtesting:</strong> Test the strategy on historical data to validate performance</li>
                  <li><strong>Paper Trading:</strong> Test with real-time data but no real money</li>
                  <li><strong>Live Testing:</strong> Start with small amounts to test in real markets</li>
                  <li><strong>Monitoring:</strong> Continuously track performance and make adjustments</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Risk Considerations
              </h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h3 className="font-semibold mb-2 text-red-800">Critical Risks:</h3>
                <ul className="list-disc list-inside text-red-700">
                  <li>Technical failures and system crashes</li>
                  <li>Market data errors or delays</li>
                  <li>Strategy flaws that weren&apos;t caught in testing</li>
                  <li>Regulatory compliance issues</li>
                  <li>Cybersecurity threats and hacking</li>
                </ul>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Trading bots require careful strategy design and testing</li>
                <li>Risk management is crucial for automated systems</li>
                <li>Start with paper trading before using real money</li>
                <li>Continuous monitoring and maintenance is essential</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
