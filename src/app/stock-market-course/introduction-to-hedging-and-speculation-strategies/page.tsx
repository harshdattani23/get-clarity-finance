"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";

export default function IntroToHedgingAndSpeculationPage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('introduction-to-hedging-and-speculation-strategies.title')}
      description="This is a placeholder description."
      lessonSlug="introduction-to-hedging-and-speculation-strategies"
    >
      <div>
        <p>This is a placeholder for the lesson content.</p>
      </div>
    </LessonLayout>
  );
}
