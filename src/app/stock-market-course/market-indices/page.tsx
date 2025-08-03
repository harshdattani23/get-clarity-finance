'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { LineChart, BarChart } from 'lucide-react';

const MarketIndices = () => {
  const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t('market-indices.title')}
      description={t('market-indices.description')}
      lessonSlug="market-indices"
    >
      <div className="space-y-8">

        <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('market-indices.intro') }} />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <BarChart className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl font-bold text-blue-800">{t('market-indices.sensex.title')}</h2>
            </div>
            <p className="text-gray-600 mb-2" dangerouslySetInnerHTML={{ __html: t('market-indices.sensex.p1') }} />
            <p className="text-sm text-gray-500">{t('market-indices.sensex.p2')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <LineChart className="w-8 h-8 text-green-500" />
              <h2 className="text-2xl font-bold text-green-800">{t('market-indices.nifty.title')}</h2>
            </div>
            <p className="text-gray-600 mb-2" dangerouslySetInnerHTML={{ __html: t('market-indices.nifty.p1') }} />
            <p className="text-sm text-gray-500">{t('market-indices.nifty.p2')}</p>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('what-is-a-stock.keyTakeaways')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('market-indices.takeaways.item1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('market-indices.takeaways.item2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('market-indices.takeaways.item3') }} />
            </ul>
        </div>
      </div>
    </LessonLayout>
  );
};

export default MarketIndices;
