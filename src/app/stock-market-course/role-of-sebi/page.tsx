'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';

const RoleOfSebi = () => {
  const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t('role-of-sebi.title')}
      description="Placeholder description for this lesson."
      lessonSlug="role-of-sebi"
    >
      <div className="space-y-6">
        <p>Content for this lesson will be added soon.</p>
      </div>
    </LessonLayout>
  );
};

export default RoleOfSebi;
