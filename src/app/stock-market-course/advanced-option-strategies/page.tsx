"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function AdvancedOptionStrategiesPage() {
  const { t } = useTranslation('stock-market-course/advanced-option-strategies');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="advanced-option-strategies"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Advanced Option Strategies
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Master complex option strategies including Iron Condor, Butterfly, and Straddle for sophisticated trading approaches.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Advanced option strategies combine multiple options to create complex risk-reward profiles suitable for experienced traders.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Iron Condor
              </h2>
              <p className="text-gray-700 mb-4">
                An Iron Condor is a neutral strategy that profits from low volatility and sideways price movement. It involves selling both a put spread and a call spread.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Strategy Components:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Sell put spread (bull put spread)</li>
                  <li>Sell call spread (bear call spread)</li>
                  <li>Maximum profit in the middle range</li>
                  <li>Defined risk on both sides</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Butterfly Spread
              </h2>
              <p className="text-gray-700 mb-4">
                A Butterfly spread is a neutral strategy that profits when the underlying asset stays close to a specific price level.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Strategy Components:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Buy one call at lower strike</li>
                  <li>Sell two calls at middle strike</li>
                  <li>Buy one call at higher strike</li>
                  <li>Maximum profit at middle strike</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Straddle
              </h2>
              <p className="text-gray-700 mb-4">
                A Straddle involves buying both a call and put at the same strike price, profiting from significant price movement in either direction.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Strategy Components:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Buy call at current strike price</li>
                  <li>Buy put at same strike price</li>
                  <li>Profits from large price moves</li>
                  <li>Loses in sideways markets</li>
                </ul>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Iron Condor profits from low volatility</li>
                <li>Butterfly spread is neutral with defined risk</li>
                <li>Straddle profits from large price movements</li>
                <li>Advanced strategies require experience and risk management</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
