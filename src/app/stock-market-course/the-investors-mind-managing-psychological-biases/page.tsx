"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";


const PsychologicalBiasesPage = () => {
    const { t } = useTranslation('stock-market-course.the-investors-mind-managing-psychological-biases');

  return (
    <LessonLayout
      title={t("the-investor's-mind-managing-psychological-biases.title") as string}
      description={t("the-investor's-mind-managing-psychological-biases.description") as string}
      lessonSlug="the-investors-mind-managing-psychological-biases"
    >
      <AnimatedDiv>
        <p className="mb-4">
          {t("the-investor's-mind-managing-psychological-biases.introduction") as string}
        </p>
      </AnimatedDiv>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("the-investor's-mind-managing-psychological-biases.section1_title") as string}</h2>
        <p className="mb-4">
          {t("the-investor's-mind-managing-psychological-biases.section1_p1") as string}
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l1") as string}</li>
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l2") as string}</li>
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l3") as string}</li>
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l4") as string}</li>
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l5") as string}</li>
          <li>{t("the-investor's-mind-managing-psychological-biases.section1_l6") as string}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("the-investor's-mind-managing-psychological-biases.section2_title") as string}</h2>
        <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("the-investor's-mind-managing-psychological-biases.section2.1_title") as string}</h3>
            <p className="mb-4">
            {t("the-investor's-mind-managing-psychological-biases.section2.1_p1") as string}
            </p>
        </AnimatedDiv>
        <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("the-investor's-mind-managing-psychological-biases.section2.2_title") as string}</h3>
            <p className="mb-4">
            {t("the-investor's-mind-managing-psychological-biases.section2.2_p1") as string}
            </p>
        </AnimatedDiv>
        <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("the-investor's-mind-managing-psychological-biases.section2.3_title") as string}</h3>
            <p className="mb-4">
            {t("the-investor's-mind-managing-psychological-biases.section2.3_p1") as string}
            </p>
        </AnimatedDiv>
         <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("the-investor's-mind-managing-psychological-biases.section2.4_title") as string}</h3>
            <p className="mb-4">
            {t("the-investor's-mind-managing-psychological-biases.section2.4_p1") as string}
            </p>
        </AnimatedDiv>
         <AnimatedDiv>
            <h3 className="text-xl font-semibold mb-2">{t("the-investor's-mind-managing-psychological-biases.section2.5_title") as string}</h3>
            <p className="mb-4">
            {t("the-investor's-mind-managing-psychological-biases.section2.5_p1") as string}
            </p>
        </AnimatedDiv>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("the-investor's-mind-managing-psychological-biases.section3_title") as string}</h2>
        <ul className="list-disc list-inside mb-4">
            <li>{t("the-investor's-mind-managing-psychological-biases.section3_l1") as string}</li>
            <li>{t("the-investor's-mind-managing-psychological-biases.section3_l2") as string}</li>
            <li>{t("the-investor's-mind-managing-psychological-biases.section3_l3") as string}</li>
            <li>{t("the-investor's-mind-managing-psychological-biases.section3_l4") as string}</li>
            <li>{t("the-investor's-mind-managing-psychological-biases.section3_l5") as string}</li>
        </ul>
      </section>

       <section>
        <h2 className="text-2xl font-semibold mb-4">{t("the-investor's-mind-managing-psychological-biases.conclusion_title") as string}</h2>
        <p>
            {t("the-investor's-mind-managing-psychological-biases.conclusion_p1") as string}
        </p>
      </section>
    </LessonLayout>
  );
};

export default PsychologicalBiasesPage;
