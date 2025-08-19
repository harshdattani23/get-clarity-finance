"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function AdvancedTechnicalAnalysisPage() {
  const { t } = useTranslation('stock-market-course.advanced-technical-analysis');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="advanced-technical-analysis"
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
            {/* Elliott Wave Theory */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('elliottWave.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('elliottWave.description')}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{t('elliottWave.basics.title')}</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>{t('elliottWave.basics.impulse')}</li>
                  <li>{t('elliottWave.basics.correction')}</li>
                  <li>{t('elliottWave.basics.fractal')}</li>
                </ul>
              </div>
            </section>

            {/* Fibonacci Retracements */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('fibonacci.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('fibonacci.description')}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{t('fibonacci.levels.title')}</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>{t('fibonacci.levels.level1')}</li>
                  <li>{t('fibonacci.levels.level2')}</li>
                  <li>{t('elliottWave.basics.fractal')}</li>
                </ul>
              </div>
            </section>

            {/* Volume Profile Analysis */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('volumeProfile.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('volumeProfile.description')}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{t('volumeProfile.concepts.title')}</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>{t('volumeProfile.concepts.poc')}</li>
                  <li>{t('volumeProfile.concepts.vah')}</li>
                  <li>{t('volumeProfile.concepts.val')}</li>
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
