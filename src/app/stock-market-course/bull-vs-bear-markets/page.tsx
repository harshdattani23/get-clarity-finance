'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { TrendingUp, TrendingDown } from 'lucide-react';

const BullVsBearMarkets = () => {
  const { t } = useTranslation('stock-market-course.bull-vs-bear-markets');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="bull-vs-bear-markets"
    >
      <div className="space-y-8">

        <p className="text-gray-700 leading-relaxed">{t('intro') as string}</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bull Market */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-10 h-10 text-green-600" />
              <h2 className="text-2xl font-bold text-green-800">{t('bull.title') as string}</h2>
            </div>
            <p className="font-semibold text-green-700 mb-2">{t('bull.subtitle') as string}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>{t('bull.char1') as string}</li>
              <li>{t('bull.char2') as string}</li>
              <li>{t('bull.char3') as string}</li>
            </ul>
          </div>

          {/* Bear Market */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <TrendingDown className="w-10 h-10 text-red-600" />
              <h2 className="text-2xl font-bold text-red-800">{t('bear.title') as string}</h2>
            </div>
            <p className="font-semibold text-red-700 mb-2">{t('bear.subtitle') as string}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>{t('bear.char1') as string}</li>
              <li>{t('bear.char2') as string}</li>
              <li>{t('bear.char3') as string}</li>
            </ul>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('what-is-a-stock.keyTakeaways') as string}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('takeaways.item1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('takeaways.item2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('takeaways.item3') }} />
            </ul>
        </div>
      </div>
    </LessonLayout>
  );
};

export default BullVsBearMarkets;
