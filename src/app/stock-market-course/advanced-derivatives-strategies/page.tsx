"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function AdvancedDerivativesStrategiesPage() {
  const { t } = useTranslation('stock-market-course.advanced-derivatives-strategies');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="advanced-derivatives-strategies"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t('title') as string}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {t('description') as string}
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              {t('introduction') as string}
            </p>
          </div>

          <div className="space-y-8">
            {/* Option Greeks */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('optionGreeks.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('optionGreeks.description') as string}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('optionGreeks.delta.title') as string}</h3>
                  <p className="text-sm text-gray-600">{t('optionGreeks.delta.description') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('optionGreeks.gamma.title') as string}</h3>
                  <p className="text-sm text-gray-600">{t('optionGreeks.gamma.description') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('optionGreeks.theta.title') as string}</h3>
                  <p className="text-sm text-gray-600">{t('optionGreeks.theta.description') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('optionGreeks.vega.title') as string}</h3>
                  <p className="text-sm text-gray-600">{t('optionGreeks.vega.description') as string}</p>
                </div>
              </div>
            </section>

            {/* Advanced Option Strategies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('advancedStrategies.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('advancedStrategies.description') as string}
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('advancedStrategies.ironCondor.title') as string}</h3>
                  <p className="text-gray-700">{t('advancedStrategies.ironCondor.description') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('advancedStrategies.butterfly.title') as string}</h3>
                  <p className="text-gray-700">{t('advancedStrategies.butterfly.description') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('advancedStrategies.straddle.title') as string}</h3>
                  <p className="text-gray-700">{t('advancedStrategies.straddle.description') as string}</p>
                </div>
              </div>
            </section>

            {/* Risk Management */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('riskManagement.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('riskManagement.description') as string}
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <ul className="list-disc list-inside space-y-2 text-red-700">
                  <li>{t('riskManagement.point1') as string}</li>
                  <li>{t('riskManagement.point2') as string}</li>
                  <li>{t('riskManagement.point3') as string}</li>
                </ul>
              </div>
            </section>

            {/* Key Takeaways */}
            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                {t('keyTakeaways.title') as string}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>{t('keyTakeaways.takeaway1') as string}</li>
                <li>{t('keyTakeaways.takeaway2') as string}</li>
                <li>{t('keyTakeaways.takeaway3') as string}</li>
                <li>{t('keyTakeaways.takeaway4') as string}</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
