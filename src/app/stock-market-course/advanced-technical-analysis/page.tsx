"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function AdvancedTechnicalAnalysisPage() {
  const { t } = useTranslation('stock-market-course.advanced-technical-analysis');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="advanced-technical-analysis"
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
            {/* Elliott Wave Theory */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('elliottWave.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('elliottWave.description') as string}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{t('elliottWave.basics.title') as string}</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>{t('elliottWave.basics.impulse') as string}</li>
                  <li>{t('elliottWave.basics.correction') as string}</li>
                  <li>{t('elliottWave.basics.fractal') as string}</li>
                </ul>
              </div>
            </section>

            {/* Fibonacci Retracements */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('fibonacci.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('fibonacci.description') as string}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{t('fibonacci.levels.title') as string}</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>{t('fibonacci.levels.level1') as string}</li>
                  <li>{t('fibonacci.levels.level2') as string}</li>
                  <li>{t('elliottWave.basics.fractal') as string}</li>
                </ul>
              </div>
            </section>

            {/* Volume Profile Analysis */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('volumeProfile.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('volumeProfile.description') as string}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{t('volumeProfile.concepts.title') as string}</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>{t('volumeProfile.concepts.poc') as string}</li>
                  <li>{t('volumeProfile.concepts.vah') as string}</li>
                  <li>{t('volumeProfile.concepts.val') as string}</li>
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
