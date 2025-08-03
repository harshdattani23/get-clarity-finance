"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";

export default function IntroToDerivativesPage() {
    const { t } = useTranslation('stock-market-course');
  return (
    <LessonLayout
      title={t('introduction-to-derivatives.title')}
      description={t('introduction-to-derivatives.description')}
      lessonSlug="introduction-to-derivatives"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('introduction-to-derivatives.section1.title')}</h2>
        <p className="mb-4">{t('introduction-to-derivatives.section1.p1')}</p>
        <p className="mb-4">{t('introduction-to-derivatives.section1.p2')}</p>

        {/* Placeholder for animation */}
        <div className="my-8 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-center">
            <p className="font-semibold">{t('introduction-to-derivatives.animation_placeholder_1')}</p>
        </div>

        <h2 className="text-2xl font-bold mb-4">{t('introduction-to-derivatives.section2.title')}</h2>
        <p className="mb-4">{t('introduction-to-derivatives.section2.p1')}</p>
        <ul className="list-disc list-inside mb-4">
            <li><strong>{t('introduction-to-derivatives.section2.item1.title')}</strong>: {t('introduction-to-derivatives.section2.item1.text')}</li>
            <li><strong>{t('introduction-to-derivatives.section2.item2.title')}</strong>: {t('introduction-to-derivatives.section2.item2.text')}</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">{t('introduction-to-derivatives.section3.title')}</h2>
        <p className="mb-4">{t('introduction-to-derivatives.section3.p1')}</p>
        {/* Placeholder for table */}
        <div className="my-8 p-4 border rounded-lg overflow-x-auto">
            <h3 className="text-xl font-bold mb-2 text-center">{t('introduction-to-derivatives.table_placeholder_1_title')}</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">{t('introduction-to-derivatives.table_placeholder_1.header1')}</th>
                  <th className="border p-2">{t('introduction-to-derivatives.table_placeholder_1.header2')}</th>
                  <th className="border p-2">{t('introduction-to-derivatives.table_placeholder_1.header3')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-semibold">{t('introduction-to-derivatives.table_placeholder_1.row1.col1')}</td>
                  <td className="border p-2">{t('introduction-to-derivatives.table_placeholder_1.row1.col2')}</td>
                  <td className="border p-2">{t('introduction-to-derivatives.table_placeholder_1.row1.col3')}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">{t('introduction-to-derivatives.table_placeholder_1.row2.col1')}</td>
                  <td className="border p-2">{t('introduction-to-derivatives.table_placeholder_1.row2.col2')}</td>
                  <td className="border p-2">{t('introduction-to-derivatives.table_placeholder_1.row2.col3')}</td>
                </tr>
                 <tr>
                  <td className="border p-2 font-semibold">{t('introduction-to-derivatives.table_placeholder_1.row3.col1')}</td>
                  <td className="border p-2">{t('introduction-to-derivatives.table_placeholder_1.row3.col2')}</td>
                  <td className="border p-2">{t('introduction-to-derivatives.table_placeholder_1.row3.col3')}</td>
                </tr>
                 <tr>
                  <td className="border p-2 font-semibold">{t('introduction-to-derivatives.table_placeholder_1.row4.col1')}</td>
                  <td className="border p-2">{t('introduction-to-derivatives.table_placeholder_1.row4.col2')}</td>
                  <td className="border p-2">{t('introduction-to-derivatives.table_placeholder_1.row4.col3')}</td>
                </tr>
              </tbody>
            </table>
        </div>

        <h2 className="text-2xl font-bold mb-4">{t('introduction-to-derivatives.section4.title')}</h2>
        <p className="mb-4">{t('introduction-to-derivatives.section4.p1')}</p>
        <ul className="list-disc list-inside mb-4">
            <li>{t('introduction-to-derivatives.section4.item1')}</li>
            <li>{t('introduction-to-derivatives.section4.item2')}</li>
            <li>{t('introduction-to-derivatives.section4.item3')}</li>
            <li>{t('introduction-to-derivatives.section4.item4')}</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">{t('introduction-to-derivatives.section5.title')}</h2>
        <p className="mb-4">{t('introduction-to-derivatives.section5.p1')}</p>

        {/* Placeholder for animation */}
        <div className="my-8 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 text-center">
            <p className="font-semibold">{t('introduction-to-derivatives.animation_placeholder_2')}</p>
        </div>

        <p className="mt-6 text-lg font-semibold">{t('introduction-to-derivatives.conclusion')}</p>

      </div>
    </LessonLayout>
  );
}
