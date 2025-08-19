"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function SpreadStrategiesPage() {
  const { t } = useTranslation('stock-market-course.spread-strategies');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="spread-strategies"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Spread Strategies
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Learn about bull and bear spreads - option strategies that limit risk while providing directional exposure.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Spread strategies involve simultaneously buying and selling options to create defined risk and reward profiles.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Bull Spread
              </h2>
              <p className="text-gray-700 mb-4">
                A bull spread is used when you expect the underlying asset to rise. It involves buying a call at a lower strike price and selling a call at a higher strike price.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold mb-2 text-green-800">Characteristics:</h3>
                <ul className="list-disc list-inside text-green-700">
                  <li>Limited risk and limited reward</li>
                  <li>Maximum profit at expiration</li>
                  <li>Lower cost than buying calls outright</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Bear Spread
              </h2>
              <p className="text-gray-700 mb-4">
                A bear spread is used when you expect the underlying asset to fall. It involves buying a put at a higher strike price and selling a put at a lower strike price.
              </p>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold mb-2 text-red-800">Characteristics:</h3>
                <ul className="list-disc list-inside text-red-700">
                  <li>Limited risk and limited reward</li>
                  <li>Maximum profit if asset falls</li>
                  <li>Lower cost than buying puts outright</li>
                </ul>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Bull spreads profit from upward price movement</li>
                <li>Bear spreads profit from downward price movement</li>
                <li>Both strategies have defined risk and reward</li>
                <li>Lower cost than buying options outright</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
