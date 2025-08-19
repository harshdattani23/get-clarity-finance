"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from '@/components/animations/AnimatedDiv';

const RiskManagementPage = () => {
    const { t } = useTranslation('stock-market-course/risk-management-position-sizing-and-stop-loss-orders');

  return (
    <LessonLayout
      title={t("risk-management-position-sizing-and-stop-loss-orders.title")}
      description={t("risk-management-position-sizing-and-stop-loss-orders.description")}
      lessonSlug="risk-management-position-sizing-and-stop-loss-orders"
    >
      <AnimatedDiv>
        <p className="mb-4">
          {t("risk-management-position-sizing-and-stop-loss-orders.introduction")}
        </p>
      </AnimatedDiv>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("risk-management-position-sizing-and-stop-loss-orders.section1_title")}</h2>
        <p className="mb-4">
          {t("risk-management-position-sizing-and-stop-loss-orders.section1_p1")}
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>{t("risk-management-position-sizing-and-stop-loss-orders.section1_l1")}</li>
          <li>{t("risk-management-position-sizing-and-stop-loss-orders.section1_l2")}</li>
          <li>{t("risk-management-position-sizing-and-stop-loss-orders.section1_l3")}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("risk-management-position-sizing-and-stop-loss-orders.section2_title")}</h2>
        <AnimatedDiv>
            <p className="mb-4">
            {t("risk-management-position-sizing-and-stop-loss-orders.section2_p1")}
            </p>
        </AnimatedDiv>
      </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">{t("risk-management-position-sizing-and-stop-loss-orders.section3_title")}</h2>
            <p className="mb-4">
                {t("risk-management-position-sizing-and-stop-loss-orders.section3_p1")}
            </p>
        </section>

       <section>
        <h2 className="text-2xl font-semibold mb-4">{t("risk-management-position-sizing-and-stop-loss-orders.conclusion_title")}</h2>
        <p>
            {t("risk-management-position-sizing-and-stop-loss-orders.conclusion_p1")}
        </p>
      </section>
    </LessonLayout>
  );
};

export default RiskManagementPage;
