"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function VolumeProfileAnalysisPage() {
  const { t } = useTranslation('stock-market-course.volume-profile-analysis');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="volume-profile-analysis"
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
              Volume Profile Analysis is a powerful tool that shows the distribution of trading volume across different price levels, helping identify key support and resistance areas.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                What is Volume Profile?
              </h2>
              <p className="text-gray-700 mb-4">
                Volume Profile displays trading volume at each price level, creating a histogram that shows where the most trading activity occurs. This helps identify significant price levels where the market has shown interest.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Key Concepts
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">POC (Point of Control)</h3>
                  <p className="text-gray-700">The price level with the highest trading volume, indicating strong market interest.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">VAH (Volume Area High)</h3>
                  <p className="text-gray-700">The highest price level with significant volume, acting as resistance.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">VAL (Volume Area Low)</h3>
                  <p className="text-gray-700">The lowest price level with significant volume, acting as support.</p>
                </div>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Volume Profile shows where the most trading activity occurs</li>
                <li>POC represents the price level with highest volume</li>
                <li>VAH and VAL act as dynamic support and resistance levels</li>
                <li>Use with other technical analysis tools for confirmation</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
