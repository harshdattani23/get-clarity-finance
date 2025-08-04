"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from '@/components/animations/AnimatedDiv';

const UnderstandingFuturesContractsPage = () => {
    const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t("understanding-futures-contracts.title")}
      description={t("understanding-futures-contracts.description")}
      lessonSlug="understanding-futures-contracts"
    >
      <AnimatedDiv>
        <p className="mb-4">
          {t("understanding-futures-contracts.introduction")}
        </p>
      </AnimatedDiv>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("understanding-futures-contracts.section1_title")}</h2>
        <p className="mb-4">
          {t("understanding-futures-contracts.section1_p1")}
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>{t("understanding-futures-contracts.section1_l1")}</li>
          <li>{t("understanding-futures-contracts.section1_l2")}</li>
          <li>{t("understanding-futures-contracts.section1_l3")}</li>
          <li>{t("understanding-futures-contracts.section1_l4")}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("understanding-futures-contracts.section2_title")}</h2>
        <AnimatedDiv>
            <p className="mb-4">
            {t("understanding-futures-contracts.section2_p1")}
            </p>
        </AnimatedDiv>
      </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">{t("understanding-futures-contracts.section3_title")}</h2>
            <p className="mb-4">
                {t("understanding-futures-contracts.section3_p1")}
            </p>
        </section>

       <section>
        <h2 className="text-2xl font-semibold mb-4">{t("understanding-futures-contracts.conclusion_title")}</h2>
        <p>
            {t("understanding-futures-contracts.conclusion_p1")}
        </p>
      </section>
    </LessonLayout>
  );
};

export default UnderstandingFuturesContractsPage;
