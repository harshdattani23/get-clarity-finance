'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';

const ReadingAStockQuote = () => {
  const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t('reading-a-stock-quote.title')}
      description="Placeholder description for this lesson."
      lessonSlug="reading-a-stock-quote"
    >
      <div className="space-y-6">
        <p>Content for this lesson will be added soon.</p>
      </div>
    </LessonLayout>
  );
};

export default ReadingAStockQuote;
