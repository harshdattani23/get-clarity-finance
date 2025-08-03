'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';

const MarketIndices = () => {
  const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t('market-indices.title')}
      description="Placeholder description for this lesson."
      lessonSlug="market-indices"
    >
      <div className="space-y-6">
        <p>Content for this lesson will be added soon.</p>
      </div>
    </LessonLayout>
  );
};

export default MarketIndices;
