'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';

const BullVsBearMarkets = () => {
  const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t('bull-vs-bear-markets.title')}
      description="Placeholder description for this lesson."
      lessonSlug="bull-vs-bear-markets"
    >
      <div className="space-y-6">
        <p>Content for this lesson will be added soon.</p>
      </div>
    </LessonLayout>
  );
};

export default BullVsBearMarkets;
