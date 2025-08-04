"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from '@/components/animations/AnimatedDiv';
import AnimatedDiv from "@/components/animations/AnimatedDiv";
import { BrainCircuit, Zap, Users, Shield } from "lucide-react";
import Image from "next/image";


const PsychologicalBiasesPage = () => {
    const { t } = useTranslation('stock-market-course');

  return (
    <LessonLayout
      title={t("the-investor's-mind-managing-psychological-biases.title")}
      description={t("the-investor's-mind-managing-psychological-biases.description")}
      lessonSlug="the-investors-mind-managing-psychological-biases"
    >
      <AnimatedDiv>
        <p className="mb-4">
          {t("the-investor's-mind-managing-psychological-biases.introduction")}
        </p>
      </AnimatedDiv>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("the-investor's-mind-managing-psychological-biases.section1_title")}</h2>
        <p className="mb-4">
          {t("the-investor's-mind-managing-psychological-biases.section1_p1")}
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l1")}</li>
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l2")}</li>
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l3")}</li>
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l4")}</li>
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l5")}</li>
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l6")}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("the-investor's-mind-managing-psychological-biases.section2_title")}</h2>
        <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("the-investor's-mind-managing-psychological-biases.section2.1_title")}</h3>
            <p className="mb-4">
            {t("the-investor's-mind-managing-psychological-biases.section2.1_p1")}
            </p>
        </AnimatedDiv>
        <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("the-investor's-mind-managing-psychological-biases.section2.2_title")}</h3>
            <p className="mb-4">
            {t("the-investor's-mind-managing-psychological-biases.section2.2_p1")}
            </p>
        </AnimatedDiv>
        <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("the-investor's-mind-managing-psychological-biases.section2.3_title")}</h3>
            <p className="mb-4">
            {t("the-investor's-mind-managing-psychological-biases.section2.3_p1")}
            </p>
        </AnimatedDiv>
         <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("the-investor's-mind-managing-psychological-biases.section2.4_title")}</h3>
            <p className="mb-4">
            {t("the-investor's-mind-managing-psychological-biases.section2.4_p1")}
            </p>
        </AnimatedDiv>
         <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("the-investor's-mind-managing-psychological-biases.section2.5_title")}</h3>
            <p className="mb-4">
            {t("the-investor's-mind-managing-psychological-biases.section2.5_p1")}
            </p>
        </AnimatedDiv>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("the-investor's-mind-managing-psychological-biases.section3_title")}</h2>
        <ul className="list-disc list-inside mb-4">
            <li>{t("the-investor's-mind-managing-psychological-biases.section3_l1")}</li>
            <li>{t("the-investor's-mind-managing-psychological-biases.section3_l2")}</li>
            <li>{t("the-investor's-mind-managing-psychological-biases.section3_l3")}</li>
            <li>{t("the-investor's-mind-managing-psychological-biases.section3_l4")}</li>
            <li>{t("the-investor's-mind-managing-psychological-biases.section3_l5")}</li>
        </ul>
      </section>

       <section>
        <h2 className="text-2xl font-semibold mb-4">{t("the-investor's-mind-managing-psychological-biases.conclusion_title")}</h2>
        <p>
            {t("the-investor's-mind-managing-psychological-biases.conclusion_p1")}
        </p>
      </section>
    </LessonLayout>
  );
};

export default PsychologicalBiasesPage;
