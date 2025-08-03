'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';

const WhatIsAStockMarket = () => {
  const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t('what-is-a-stock-market.title')}
      description="Placeholder description for this lesson."
      lessonSlug="what-is-a-stock-market"
    >
      <div className="space-y-6">
        <p>Content for this lesson will be added soon.</p>
      </div>
    </LessonLayout>
  );
};

export default WhatIsAStockMarket;
