'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { Building, Store, Users, ShoppingCart } from 'lucide-react';

const WhatIsAStockMarket = () => {
  const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t('what-is-a-stock-market.title')}
      description={t('what-is-a-stock-market.description')}
      lessonSlug="what-is-a-stock-market"
    >
      <div className="space-y-8">

        {/* Analogy Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('what-is-a-stock-market.analogy.title')}</h2>
          <p className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('what-is-a-stock-market.analogy.p1') }} />
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg border">
              <Store className="mx-auto w-12 h-12 text-blue-500 mb-3" />
              <h3 className="font-bold text-lg">{t('what-is-a-stock-market.analogy.supermarket.title')}</h3>
              <p className="text-sm text-gray-600">{t('what-is-a-stock-market.analogy.supermarket.p')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <Building className="mx-auto w-12 h-12 text-green-500 mb-3" />
              <h3 className="font-bold text-lg">{t('what-is-a-stock-market.analogy.stockMarket.title')}</h3>
              <p className="text-sm text-gray-600">{t('what-is-a-stock-market.analogy.stockMarket.p')}</p>
            </div>
          </div>
        </div>

        {/* Core Functions Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('what-is-a-stock-market.coreFunctions.title')}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('what-is-a-stock-market.coreFunctions.p1')}</p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-indigo-600"/>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('what-is-a-stock-market.coreFunctions.item1.title')}</h3>
                <p className="text-gray-600">{t('what-is-a-stock-market.coreFunctions.item1.p')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <ShoppingCart className="w-6 h-6 text-indigo-600"/>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('what-is-a-stock-market.coreFunctions.item2.title')}</h3>
                <p className="text-gray-600">{t('what-is-a-stock-market.coreFunctions.item2.p')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('what-is-a-stock.keyTakeaways')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('what-is-a-stock-market.takeaways.item1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('what-is-a-stock-market.takeaways.item2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('what-is-a-stock-market.takeaways.item3') }} />
            </ul>
        </div>
      </div>
    </LessonLayout>
  );
};

export default WhatIsAStockMarket;
