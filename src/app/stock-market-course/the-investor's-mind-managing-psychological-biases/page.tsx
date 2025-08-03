"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";

export default function PsychologicalBiasesPage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('the-investor\'s-mind-managing-psychological-biases.title')}
      description="This is a placeholder description."
      lessonSlug="the-investor's-mind-managing-psychological-biases"
    >
      <div>
        <p>This is a placeholder for the lesson content.</p>
      </div>
    </LessonLayout>
  );
}
