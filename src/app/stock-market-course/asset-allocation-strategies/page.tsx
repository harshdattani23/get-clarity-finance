"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from '@/components/animations/AnimatedDiv';
import PortfolioAllocator from '@/components/stock-market-course/PortfolioAllocator';

const AssetAllocationStrategiesPage = () => {
    const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t("asset-allocation-strategies.title")}
      description={t("asset-allocation-strategies.description")}
      lessonSlug="asset-allocation-strategies"
    >
      <AnimatedDiv>
        <p className="mb-4">
          {t("asset-allocation-strategies.introduction")}
        </p>
      </AnimatedDiv>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("asset-allocation-strategies.section1_title")}</h2>
        <p className="mb-4">
          {t("asset-allocation-strategies.section1_p1")}
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>{t("asset-allocation-strategies.section1_l1")}</li>
          <li>{t("asset-allocation-strategies.section1_l2")}</li>
          <li>{t("asset-allocation-strategies.section1_l3")}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("asset-allocation-strategies.section2_title")}</h2>
        <AnimatedDiv>
            <p className="mb-4">
            {t("asset-allocation-strategies.section2_p1")}
            </p>
            <p className="mb-4">
            {t("asset-allocation-strategies.section2_p2")}
            </p>
            <p className="mb-4">
            {t("asset-allocation-strategies.section2_p3")}
            </p>
        </AnimatedDiv>
      </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">{t("asset-allocation-strategies.section3_title")}</h2>
            <PortfolioAllocator />
        </section>

       <section>
        <h2 className="text-2xl font-semibold mb-4">{t("asset-allocation-strategies.conclusion_title")}</h2>
        <p>
            {t("asset-allocation-strategies.conclusion_p1")}
        </p>
      </section>
    </LessonLayout>
  );
};

export default AssetAllocationStrategiesPage;
