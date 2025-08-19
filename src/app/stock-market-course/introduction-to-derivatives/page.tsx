"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from '@/components/animations/AnimatedDiv';

export default function IntroToDerivativesPage() {
    const { t } = useTranslation('stock-market-course.introduction-to-derivatives');
  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="introduction-to-derivatives"
    >
      <div>
        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('section1.title') as string}</h2>
          <p className="mb-4">{t('section1.p1') as string}</p>
          <p className="mb-4">{t('section1.p2') as string}</p>
        </AnimatedDiv>

        {/* Placeholder for animation */}
        <AnimatedDiv className="my-8 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-center">
            <p className="font-semibold">{t('animation_placeholder_1') as string}</p>
        </AnimatedDiv>

        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('section2.title') as string}</h2>
          <p className="mb-4">{t('section2.p1') as string}</p>
          <ul className="list-disc list-inside mb-4">
              <li><strong>{t('section2.item1.title') as string}</strong>: {t('section2.item1.text') as string}</li>
              <li><strong>{t('section2.item2.title') as string}</strong>: {t('section2.item2.text') as string}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('section3.title') as string}</h2>
          <p className="mb-4">{t('section3.p1') as string}</p>
        </AnimatedDiv>
        {/* Placeholder for table */}
        <AnimatedDiv className="my-8 p-4 border rounded-lg overflow-x-auto">
            <h3 className="text-xl font-bold mb-2 text-center">{t('table_placeholder_1_title') as string}</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">{t('table_placeholder_1.header1') as string}</th>
                  <th className="border p-2">{t('table_placeholder_1.header2') as string}</th>
                  <th className="border p-2">{t('table_placeholder_1.header3') as string}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-semibold">{t('table_placeholder_1.row1.col1') as string}</td>
                  <td className="border p-2">{t('table_placeholder_1.row1.col2') as string}</td>
                  <td className="border p-2">{t('table_placeholder_1.row1.col3') as string}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">{t('table_placeholder_1.row2.col1') as string}</td>
                  <td className="border p-2">{t('table_placeholder_1.row2.col2') as string}</td>
                  <td className="border p-2">{t('table_placeholder_1.row2.col3') as string}</td>
                </tr>
                 <tr>
                  <td className="border p-2 font-semibold">{t('table_placeholder_1.row3.col1') as string}</td>
                  <td className="border p-2">{t('table_placeholder_1.row3.col2') as string}</td>
                  <td className="border p-2">{t('table_placeholder_1.row3.col3') as string}</td>
                </tr>
                 <tr>
                  <td className="border p-2 font-semibold">{t('table_placeholder_1.row4.col1') as string}</td>
                  <td className="border p-2">{t('table_placeholder_1.row4.col2') as string}</td>
                  <td className="border p-2">{t('table_placeholder_1.row4.col3') as string}</td>
                </tr>
              </tbody>
            </table>
        </AnimatedDiv>

        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('section4.title') as string}</h2>
          <p className="mb-4">{t('section4.p1') as string}</p>
          <ul className="list-disc list-inside mb-4">
              <li>{t('section4.item1') as string}</li>
              <li>{t('section4.item2') as string}</li>
              <li>{t('section4.item3') as string}</li>
              <li>{t('section4.item4') as string}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('section5.title') as string}</h2>
          <p className="mb-4">{t('section5.p1') as string}</p>
        </AnimatedDiv>

        {/* Placeholder for animation */}
        <AnimatedDiv className="my-8 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-center">
            <p className="font-semibold">{t('animation_placeholder_2') as string}</p>
        </AnimatedDiv>

        <AnimatedDiv>
          <p className="mt-6 text-lg font-semibold">{t('conclusion') as string}</p>
        </AnimatedDiv>

      </div>
    </LessonLayout>
  );
}
