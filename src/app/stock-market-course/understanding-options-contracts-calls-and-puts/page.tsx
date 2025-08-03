"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";

export default function UnderstandingOptionsContractsPage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('understanding-options-contracts-calls-and-puts.title')}
      description="This is a placeholder description."
      lessonSlug="understanding-options-contracts-calls-and-puts"
    >
      <div>
        <p>This is a placeholder for the lesson content.</p>
      </div>
    </LessonLayout>
  );
}
