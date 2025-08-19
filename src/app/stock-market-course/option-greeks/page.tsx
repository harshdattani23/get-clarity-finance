"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function OptionGreeksPage() {
  const { t } = useTranslation('stock-market-course/option-greeks');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="option-greeks"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {t('description')}
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Option Greeks are mathematical measures that help traders understand how various factors affect the price of an option. They are essential tools for managing risk and making informed trading decisions.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                The Four Main Greeks
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Delta (Δ)</h3>
                  <p className="text-gray-700">Measures the rate of change in option price relative to changes in the underlying asset price. Delta ranges from -1 to +1.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Gamma (Γ)</h3>
                  <p className="text-gray-700">Measures the rate of change in delta relative to changes in the underlying asset price. Gamma is highest for at-the-money options.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Theta (Θ)</h3>
                  <p className="text-gray-700">Measures the rate of decline in option value due to the passage of time. Time decay accelerates as expiration approaches.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Vega (ν)</h3>
                  <p className="text-gray-700">Measures the rate of change in option price relative to changes in implied volatility. Higher volatility increases option prices.</p>
                </div>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Delta shows directional exposure to underlying asset</li>
                <li>Gamma measures delta sensitivity to price changes</li>
                <li>Theta represents time decay cost</li>
                <li>Vega shows sensitivity to volatility changes</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
