"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";

export default function RiskManagementPage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('risk-management-position-sizing-and-stop-loss-orders.title')}
      description="This is a placeholder description."
      lessonSlug="risk-management-position-sizing-and-stop-loss-orders"
    >
      <div>
        <p>This is a placeholder for the lesson content.</p>
      </div>
    </LessonLayout>
  );
}
