"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from '@/components/animations/AnimatedDiv';

const IntroToHedgingAndSpeculationPage = () => {
    const { t } = useTranslation('stock-market-course.introduction-to-hedging-and-speculation-strategies');

  return (
    <LessonLayout
      title={t("title") as string}
      description={t("description") as string}
      lessonSlug="introduction-to-hedging-and-speculation-strategies"
    >
      <AnimatedDiv>
        <p className="mb-4">
          {t("introduction") as string}
        </p>
      </AnimatedDiv>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("section1_title") as string}</h2>
        <p className="mb-4">
          {t("section1_p1") as string}
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>{t("section1_l1") as string}</li>
          <li>{t("section1_l2") as string}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("section2_title") as string}</h2>
        <AnimatedDiv>
            <p className="mb-4">
            {t("section2_p1") as string}
            </p>
            <p className="mb-4">
            {t("section2_p2") as string}
            </p>
        </AnimatedDiv>
      </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">{t("section3_title") as string}</h2>
            <p className="mb-4">
                {t("section3_p1") as string}
            </p>
        </section>

       <section>
        <h2 className="text-2xl font-semibold mb-4">{t("conclusion_title") as string}</h2>
        <p>
            {t("conclusion_p1") as string}
        </p>
      </section>
    </LessonLayout>
  );
};

export default IntroToHedgingAndSpeculationPage;
