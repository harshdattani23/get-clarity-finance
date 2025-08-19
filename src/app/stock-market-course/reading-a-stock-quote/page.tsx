'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';

const ReadingAStockQuote = () => {
  const { t } = useTranslation('stock-market-course.reading-a-stock-quote');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="reading-a-stock-quote"
    >
      <div className="space-y-8">

        <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('intro') }} />

        {/* Stock Quote Image */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <Image src="/stock-quote-example.png" alt="Example of a stock quote" className="w-full rounded-md" width={800} height={400} />
          <p className="text-center text-sm text-gray-500 mt-2">{t('imageCaption')}</p>
        </div>
        
        {/* Key Terms */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('keyTerms.title')}</h2>
          <div className="space-y-4">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="font-bold text-gray-900">{t('keyTerms.price.term')}</dt>
                <dd className="text-gray-600">{t('keyTerms.price.def')}</dd>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="font-bold text-gray-900">{t('keyTerms.change.term')}</dt>
                <dd className="text-gray-600">{t('keyTerms.change.def')}</dd>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="font-bold text-gray-900">{t('keyTerms.volume.term')}</dt>
                <dd className="text-gray-600">{t('keyTerms.volume.def')}</dd>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="font-bold text-gray-900">{t('keyTerms.marketCap.term')}</dt>
                <dd className="text-gray-600">{t('keyTerms.marketCap.def')}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Takeaways</h2>
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

export default ReadingAStockQuote;
