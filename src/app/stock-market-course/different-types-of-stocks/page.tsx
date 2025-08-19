'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';

const DifferentTypesOfStocks = () => {
  const { t } = useTranslation('stock-market-course/different-types-of-stocks');

  return (
    <LessonLayout
      title={t('different-types-of-stocks.title')}
      description={t('different-types-of-stocks.description')}
      lessonSlug="different-types-of-stocks"
    >
      <div className="space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('different-types-of-stocks.commonVsPreferred.title')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('different-types-of-stocks.commonVsPreferred.p1') }} />
          <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('different-types-of-stocks.commonVsPreferred.p2') }} />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('different-types-of-stocks.byMarketCap.title')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('different-types-of-stocks.byMarketCap.p1') }} />
          <p className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('different-types-of-stocks.byMarketCap.p2') }} />
          <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('different-types-of-stocks.byMarketCap.p3') }} />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('different-types-of-stocks.byStyle.title')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t('different-types-of-stocks.byStyle.p1') }} />
          <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('different-types-of-stocks.byStyle.p2') }} />
        </div>
        
        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('different-types-of-stocks.keyTakeaways.title')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{t('different-types-of-stocks.keyTakeaways.item1')}</li>
                <li>{t('different-types-of-stocks.keyTakeaways.item2')}</li>
                <li>{t('different-types-of-stocks.keyTakeaways.item3')}</li>
            </ul>
        </div>
      </div>
    </LessonLayout>
  );
};

export default DifferentTypesOfStocks;
