"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from '@/components/animations/AnimatedDiv';

const UnderstandingOptionsContractsPage = () => {
    const { t } = useTranslation('stock-market-course.understanding-options-contracts-calls-and-puts');

  return (
    <LessonLayout
      title={t("title") as string}
      description={t("description") as string}
      lessonSlug="understanding-options-contracts-calls-and-puts"
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
          <li>{t("section1_l3") as string}</li>
          <li>{t("section1_l4") as string}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("section2_title") as string}</h2>
        <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("section2.1_title") as string}</h3>
            <p className="mb-4">
            {t("section2.1_p1") as string}
            </p>
        </AnimatedDiv>
        <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("section2.2_title") as string}</h3>
            <p className="mb-4">
            {t("section2.2_p1") as string}
            </p>
        </AnimatedDiv>
      </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">{t("section3_title") as string}</h2>
            <p className="mb-4">
                {t("section3_p1") as string}
            </p>
            <p className="mb-4">
                {t("section3_p2") as string}
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

export default UnderstandingOptionsContractsPage;
