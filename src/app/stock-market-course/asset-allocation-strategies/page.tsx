"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";

export default function AssetAllocationStrategiesPage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('asset-allocation-strategies.title')}
      description="This is a placeholder description."
      lessonSlug="asset-allocation-strategies"
    >
      <div>
        <p>This is a placeholder for the lesson content.</p>
      </div>
    </LessonLayout>
  );
}
