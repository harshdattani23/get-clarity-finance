"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function ExploringOtherMarketsPage() {
  const { t } = useTranslation('stock-market-course.exploring-other-markets');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="exploring-other-markets"
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
            {/* Currency Markets */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('currencyMarkets.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('currencyMarkets.description') as string}
              </p>
            </section>

            {/* Commodity Markets */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('commodityMarkets.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('commodityMarkets.description') as string}
              </p>
            </section>

            {/* Real Estate */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('realEstate.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('realEstate.description') as string}
              </p>
            </section>

            {/* Bonds */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('bonds.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('bonds.description') as string}
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
