"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function AlternativeInvestmentsPage() {
  const { t } = useTranslation('stock-market-course.alternative-investments');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="alternative-investments"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Alternative Investments
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Explore investment options beyond traditional stocks and bonds, including private equity, hedge funds, and commodities.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Alternative investments can provide diversification and potentially higher returns, but they often come with higher risk and lower liquidity.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Private Equity
              </h2>
              <p className="text-gray-700 mb-4">
                Investments in private companies that are not publicly traded on stock exchanges.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold mb-2 text-green-800">Characteristics:</h3>
                <ul className="list-disc list-inside text-green-700">
                  <li>Long-term investment horizon (5-10 years)</li>
                  <li>Higher potential returns than public markets</li>
                  <li>Illiquid - difficult to sell quickly</li>
                  <li>Requires significant capital investment</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Hedge Funds
              </h2>
              <p className="text-gray-700 mb-4">
                Investment funds that use various strategies to generate returns, often with higher risk and fees.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold mb-2 text-blue-800">Strategies:</h3>
                <ul className="list-disc list-inside text-blue-700">
                  <li>Long/Short: Bet on some assets rising, others falling</li>
                  <li>Global Macro: Bet on economic trends</li>
                  <li>Event-Driven: Profit from corporate events</li>
                  <li>Arbitrage: Exploit price differences</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Venture Capital
              </h2>
              <p className="text-gray-700 mb-4">
                Investment in early-stage companies with high growth potential, often in technology or innovative sectors.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold mb-2 text-purple-800">Investment Stages:</h3>
                <ul className="list-disc list-inside text-purple-700">
                  <li>Seed: Very early stage, often just an idea</li>
                  <li>Series A: First major funding round</li>
                  <li>Series B: Growth and expansion funding</li>
                  <li>Series C+: Later stage, pre-IPO funding</li>
                </ul>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Alternative investments offer diversification benefits</li>
                <li>Higher potential returns come with higher risks</li>
                <li>Many alternatives are illiquid investments</li>
                <li>Consider your risk tolerance and investment timeline</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
