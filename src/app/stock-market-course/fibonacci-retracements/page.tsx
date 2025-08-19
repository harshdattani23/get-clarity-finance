"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function FibonacciRetracementsPage() {
  const { t } = useTranslation('stock-market-course.fibonacci-retracements');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="fibonacci-retracements"
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
            {/* What Are Fibonacci Levels */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('whatAreFibonacciLevels.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('whatAreFibonacciLevels.p1') as string}
              </p>
              <p className="text-gray-700">
                {t('whatAreFibonacciLevels.p2') as string}
              </p>
            </section>

            {/* Key Fibonacci Retracement Levels */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('keyLevels.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('keyLevels.p1') as string}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">23.6%</h3>
                  <p className="text-gray-700">{t('keyLevels.levels.level1') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">38.2%</h3>
                  <p className="text-gray-700">{t('keyLevels.levels.level2') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">50%</h3>
                  <p className="text-gray-700">{t('keyLevels.levels.level3') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">61.8%</h3>
                  <p className="text-gray-700">{t('keyLevels.levels.level4') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">78.6%</h3>
                  <p className="text-gray-700">{t('keyLevels.levels.level5') as string}</p>
                </div>
              </div>
            </section>

            {/* How to Use */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('howToUse.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('howToUse.p1') as string}
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <ol className="list-decimal list-inside space-y-2 text-yellow-800">
                  <li>{t('howToUse.steps.step1') as string}</li>
                  <li>{t('howToUse.steps.step2') as string}</li>
                  <li>{t('howToUse.steps.step3') as string}</li>
                  <li>{t('howToUse.steps.step4') as string}</li>
                </ol>
              </div>
            </section>

            {/* Trading Applications */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('tradingApplications.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('tradingApplications.p1') as string}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold mb-2 text-green-800">{t('tradingApplications.applications.entry') as string}</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold mb-2 text-blue-800">{t('tradingApplications.applications.exit') as string}</h3>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold mb-2 text-red-800">{t('tradingApplications.applications.stops') as string}</h3>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold mb-2 text-purple-800">{t('tradingApplications.applications.confirmation') as string}</h3>
                </div>
              </div>
            </section>

            {/* Limitations */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('limitations.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('limitations.p1') as string}
              </p>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <ul className="list-disc list-inside space-y-2 text-red-700">
                  <li><strong>Not Guaranteed:</strong> {t('limitations.limitations.notGuaranteed') as string}</li>
                  <li><strong>Subjective:</strong> {t('limitations.limitations.subjective') as string}</li>
                  <li><strong>Overuse:</strong> {t('limitations.limitations.overuse') as string}</li>
                  <li><strong>Confirmation:</strong> {t('limitations.limitations.confirmation') as string}</li>
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
