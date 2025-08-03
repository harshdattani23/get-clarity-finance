'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';

const HowStocksAreTraded = () => {
  const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t('how-stocks-are-traded.title')}
      description="Placeholder description for this lesson."
      lessonSlug="how-stocks-are-traded"
    >
      <div className="space-y-6">
        <p>Content for this lesson will be added soon.</p>
      </div>
    </LessonLayout>
  );
};

export default HowStocksAreTraded;
