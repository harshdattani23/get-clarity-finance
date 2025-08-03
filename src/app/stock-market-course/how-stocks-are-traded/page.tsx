'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { Landmark, ArrowRightLeft, Users, Building } from 'lucide-react';

const HowStocksAreTraded = () => {
  const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t('how-stocks-are-traded.title')}
      description={t('how-stocks-are-traded.description')}
      lessonSlug="how-stocks-are-traded"
    >
      <div className="space-y-8">

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('how-stocks-are-traded.primarySecondary.title')}</h2>
          <p className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('how-stocks-are-traded.primarySecondary.p1') }} />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-3 mb-2">
                <Building className="w-8 h-8 text-blue-500" />
                <h3 className="font-bold text-lg text-blue-800">{t('how-stocks-are-traded.primarySecondary.primary.title')}</h3>
              </div>
              <p className="text-sm text-gray-600">{t('how-stocks-are-traded.primarySecondary.primary.p')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-2">
                    <Users className="w-8 h-8 text-green-500" />
                    <h3 className="font-bold text-lg text-green-800">{t('how-stocks-are-traded.primarySecondary.secondary.title')}</h3>
                </div>
              <p className="text-sm text-gray-600">{t('how-stocks-are-traded.primarySecondary.secondary.p')}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('how-stocks-are-traded.keyPlayers.title')}</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-full"><Landmark className="w-6 h-6 text-indigo-600"/></div>
                <div>
                    <h3 className="font-semibold text-lg">{t('how-stocks-are-traded.keyPlayers.exchanges.title')}</h3>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t('how-stocks-are-traded.keyPlayers.exchanges.p') }} />
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-full"><ArrowRightLeft className="w-6 h-6 text-indigo-600"/></div>
                <div>
                    <h3 className="font-semibold text-lg">{t('how-stocks-are-traded.keyPlayers.brokers.title')}</h3>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t('how-stocks-are-traded.keyPlayers.brokers.p') }} />
                </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('what-is-a-stock.keyTakeaways')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('how-stocks-are-traded.takeaways.item1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('how-stocks-are-traded.takeaways.item2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('how-stocks-are-traded.takeaways.item3') }} />
            </ul>
        </div>
      </div>
    </LessonLayout>
  );
};

export default HowStocksAreTraded;
