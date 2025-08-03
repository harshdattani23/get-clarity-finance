"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from '@/components/animations/AnimatedDiv';

const UnderstandingOptionsContractsPage = () => {
    const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t("understanding-options-contracts-calls-and-puts.title")}
      description={t("understanding-options-contracts-calls-and-puts.description")}
      lessonSlug="understanding-options-contracts-calls-and-puts"
    >
      <AnimatedDiv>
        <p className="mb-4">
          {t("understanding-options-contracts-calls-and-puts.introduction")}
        </p>
      </AnimatedDiv>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("understanding-options-contracts-calls-and-puts.section1_title")}</h2>
        <p className="mb-4">
          {t("understanding-options-contracts-calls-and-puts.section1_p1")}
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>{t("understanding-options-contracts-calls-and-puts.section1_l1")}</li>
          <li>{t("understanding-options-contracts-calls-and-puts.section1_l2")}</li>
          <li>{t("understanding-options-contracts-calls-and-puts.section1_l3")}</li>
          <li>{t("understanding-options-contracts-calls-and-puts.section1_l4")}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("understanding-options-contracts-calls-and-puts.section2_title")}</h2>
        <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("understanding-options-contracts-calls-and-puts.section2.1_title")}</h3>
            <p className="mb-4">
            {t("understanding-options-contracts-calls-and-puts.section2.1_p1")}
            </p>
        </AnimatedDiv>
        <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("understanding-options-contracts-calls-and-puts.section2.2_title")}</h3>
            <p className="mb-4">
            {t("understanding-options-contracts-calls-and-puts.section2.2_p1")}
            </p>
        </AnimatedDiv>
      </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">{t("understanding-options-contracts-calls-and-puts.section3_title")}</h2>
            <p className="mb-4">
                {t("understanding-options-contracts-calls-and-puts.section3_p1")}
            </p>
            <p className="mb-4">
                {t("understanding-options-contracts-calls-and-puts.section3_p2")}
            </p>
        </section>

       <section>
        <h2 className="text-2xl font-semibold mb-4">{t("understanding-options-contracts-calls-and-puts.conclusion_title")}</h2>
        <p>
            {t("understanding-options-contracts-calls-and-puts.conclusion_p1")}
        </p>
      </section>
    </LessonLayout>
  );
};

export default UnderstandingOptionsContractsPage;
