"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function QuantitativeAndAlgorithmicTradingPage() {
  const { t } = useTranslation('stock-market-course.quantitative-and-algorithmic-trading');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="quantitative-and-algorithmic-trading"
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
            {/* Algorithmic Trading */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('algorithmicTrading.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('algorithmicTrading.description') as string}
              </p>
            </section>

            {/* Building Trading Bots */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('tradingBots.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('tradingBots.description') as string}
              </p>
            </section>

            {/* Backtesting */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('backtesting.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('backtesting.description') as string}
              </p>
            </section>

            {/* Machine Learning */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('machineLearning.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('machineLearning.description') as string}
              </p>
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
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
