"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from '@/components/animations/AnimatedDiv';

const IntroToHedgingAndSpeculationPage = () => {
    const { t } = useTranslation('stock-market-course/introduction-to-hedging-and-speculation-strategies');

  return (
    <LessonLayout
      title={t("introduction-to-hedging-and-speculation-strategies.title")}
      description={t("introduction-to-hedging-and-speculation-strategies.description")}
      lessonSlug="introduction-to-hedging-and-speculation-strategies"
    >
      <AnimatedDiv>
        <p className="mb-4">
          {t("introduction-to-hedging-and-speculation-strategies.introduction")}
        </p>
      </AnimatedDiv>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("introduction-to-hedging-and-speculation-strategies.section1_title")}</h2>
        <p className="mb-4">
          {t("introduction-to-hedging-and-speculation-strategies.section1_p1")}
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>{t("introduction-to-hedging-and-speculation-strategies.section1_l1")}</li>
          <li>{t("introduction-to-hedging-and-speculation-strategies.section1_l2")}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("introduction-to-hedging-and-speculation-strategies.section2_title")}</h2>
        <AnimatedDiv>
            <p className="mb-4">
            {t("introduction-to-hedging-and-speculation-strategies.section2_p1")}
            </p>
            <p className="mb-4">
            {t("introduction-to-hedging-and-speculation-strategies.section2_p2")}
            </p>
        </AnimatedDiv>
      </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">{t("introduction-to-hedging-and-speculation-strategies.section3_title")}</h2>
            <p className="mb-4">
                {t("introduction-to-hedging-and-speculation-strategies.section3_p1")}
            </p>
        </section>

       <section>
        <h2 className="text-2xl font-semibold mb-4">{t("introduction-to-hedging-and-speculation-strategies.conclusion_title")}</h2>
        <p>
            {t("introduction-to-hedging-and-speculation-strategies.conclusion_p1")}
        </p>
      </section>
    </LessonLayout>
  );
};

export default IntroToHedgingAndSpeculationPage;
