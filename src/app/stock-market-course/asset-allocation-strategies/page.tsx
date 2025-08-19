"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from '@/components/animations/AnimatedDiv';
import PortfolioAllocator from '@/components/stock-market-course/PortfolioAllocator';

const AssetAllocationStrategiesPage = () => {
    const { t } = useTranslation('stock-market-course.asset-allocation-strategies');

  return (
    <LessonLayout
      title={t("title")}
      description={t("description")}
      lessonSlug="asset-allocation-strategies"
    >
      <AnimatedDiv>
        <p className="mb-4">
          {t("introduction")}
        </p>
      </AnimatedDiv>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("section1_title")}</h2>
        <p className="mb-4">
          {t("section1_p1")}
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>{t("section1_l1")}</li>
          <li>{t("section1_l2")}</li>
          <li>{t("section1_l3")}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("section2_title")}</h2>
        <AnimatedDiv>
            <p className="mb-4">
            {t("section2_p1")}
            </p>
            <p className="mb-4">
            {t("section2_p2")}
            </p>
            <p className="mb-4">
            {t("section2_p3")}
            </p>
        </AnimatedDiv>
      </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">{t("section3_title")}</h2>
            <PortfolioAllocator />
        </section>

       <section>
        <h2 className="text-2xl font-semibold mb-4">{t("conclusion_title")}</h2>
        <p>
            {t("conclusion_p1")}
        </p>
      </section>
    </LessonLayout>
  );
};

export default AssetAllocationStrategiesPage;
