"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";

export default function UnderstandingFuturesContractsPage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('understanding-futures-contracts.title')}
      description="This is a placeholder description."
      lessonSlug="understanding-futures-contracts"
    >
      <div>
        <p>This is a placeholder for the lesson content.</p>
      </div>
    </LessonLayout>
  );
}
