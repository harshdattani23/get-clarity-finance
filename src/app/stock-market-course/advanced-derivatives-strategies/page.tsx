"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function AdvancedDerivativesStrategiesPage() {
  const { t } = useTranslation('stock-market-course.advanced-derivatives-strategies');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="advanced-derivatives-strategies"
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
              {t('introduction')}
            </p>
          </div>

          <div className="space-y-8">
            {/* Option Greeks */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('optionGreeks.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('optionGreeks.description')}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('optionGreeks.delta.title')}</h3>
                  <p className="text-sm text-gray-600">{t('optionGreeks.delta.description')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('optionGreeks.gamma.title')}</h3>
                  <p className="text-sm text-gray-600">{t('optionGreeks.gamma.description')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('optionGreeks.theta.title')}</h3>
                  <p className="text-sm text-gray-600">{t('optionGreeks.theta.description')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('optionGreeks.vega.title')}</h3>
                  <p className="text-sm text-gray-600">{t('optionGreeks.vega.description')}</p>
                </div>
              </div>
            </section>

            {/* Advanced Option Strategies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('advancedStrategies.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('advancedStrategies.description')}
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('advancedStrategies.ironCondor.title')}</h3>
                  <p className="text-gray-700">{t('advancedStrategies.ironCondor.description')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('advancedStrategies.butterfly.title')}</h3>
                  <p className="text-gray-700">{t('advancedStrategies.butterfly.description')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('advancedStrategies.straddle.title')}</h3>
                  <p className="text-gray-700">{t('advancedStrategies.straddle.description')}</p>
                </div>
              </div>
            </section>

            {/* Risk Management */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('riskManagement.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('riskManagement.description')}
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <ul className="list-disc list-inside space-y-2 text-red-700">
                  <li>{t('riskManagement.point1')}</li>
                  <li>{t('riskManagement.point2')}</li>
                  <li>{t('riskManagement.point3')}</li>
                </ul>
              </div>
            </section>

            {/* Key Takeaways */}
            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                {t('keyTakeaways.title')}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>{t('keyTakeaways.takeaway1')}</li>
                <li>{t('keyTakeaways.takeaway2')}</li>
                <li>{t('keyTakeaways.takeaway3')}</li>
                <li>{t('keyTakeaways.takeaway4')}</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
