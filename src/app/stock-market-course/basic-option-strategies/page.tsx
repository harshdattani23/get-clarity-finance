"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function BasicOptionStrategiesPage() {
  const { t } = useTranslation('stock-market-course/basic-option-strategies');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="basic-option-strategies"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Basic Option Strategies
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Learn fundamental option strategies including covered calls and protective puts to enhance your trading arsenal.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Basic option strategies provide a foundation for more complex trading approaches while helping manage risk and generate income.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Covered Call Strategy
              </h2>
              <p className="text-gray-700 mb-4">
                A covered call involves selling call options against stock you already own. This strategy generates income while providing some downside protection.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold mb-2 text-green-800">Benefits:</h3>
                <ul className="list-disc list-inside text-green-700">
                  <li>Generates premium income</li>
                  <li>Provides some downside protection</li>
                  <li>Reduces cost basis of stock position</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Protective Put Strategy
              </h2>
              <p className="text-gray-700 mb-4">
                A protective put involves buying put options to hedge against potential losses in your stock position.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold mb-2 text-blue-800">Benefits:</h3>
                <ul className="list-disc list-inside text-blue-700">
                  <li>Limits downside risk</li>
                  <li>Allows participation in upside potential</li>
                  <li>Acts as insurance for your portfolio</li>
                </ul>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Covered calls generate income and provide downside protection</li>
                <li>Protective puts act as portfolio insurance</li>
                <li>Both strategies help manage risk</li>
                <li>Start with basic strategies before moving to complex ones</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
