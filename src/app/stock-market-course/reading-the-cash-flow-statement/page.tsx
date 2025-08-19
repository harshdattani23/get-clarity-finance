"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function ReadingCashFlowStatementPage() {
    const { t } = useTranslation('stock-market-course.reading-the-cash-flow-statement');
  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="reading-the-cash-flow-statement"
    >
      <div>
        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('whatIsIt') as string}</h2>
          <p className="mb-4">{t('whatIsItP1') as string}</p>
          <p className="mb-4">{t('whatIsItP2') as string}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <h3 className="text-xl font-semibold mb-2">{t('threeSections') as string}</h3>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('operating') as string}</strong>: {t('operatingP') as string}</li>
            <li><strong>{t('investing') as string}</strong>: {t('investingP') as string}</li>
            <li><strong>{t('financing') as string}</strong>: {t('financingP') as string}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
          <h3 className="text-xl font-semibold mb-2">{t('sampleTable.title') as string}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="py-2 px-4 border-b">{t('sampleTable.particulars') as string}</th>
                  <th className="py-2 px-4 border-b">{t('sampleTable.amount') as string}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b font-bold" colSpan={2}>{t('sampleTable.operating') as string}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b pl-8">{t('sampleTable.netIncome') as string}</td>
                  <td className="py-2 px-4 border-b">200,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b pl-8">{t('sampleTable.depreciation') as string}</td>
                  <td className="py-2 px-4 border-b">25,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-bold">{t('sampleTable.operatingCashFlow') as string}</td>
                  <td className="py-2 px-4 border-b">225,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-bold" colSpan={2}>{t('sampleTable.investing') as string}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b pl-8">{t('sampleTable.assetSale') as string}</td>
                  <td className="py-2 px-4 border-b">(150,000)</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-bold">{t('sampleTable.investingCashFlow') as string}</td>
                  <td className="py-2 px-4 border-b">(150,000)</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-bold" colSpan={2}>{t('sampleTable.financing') as string}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b pl-8">{t('sampleTable.debt') as string}</td>
                  <td className="py-2 px-4 border-b">50,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-bold">{t('sampleTable.financingCashFlow') as string}</td>
                  <td className="py-2 px-4 border-b">50,000</td>
                </tr>
                <tr className="font-bold text-blue-600 dark:text-blue-400">
                  <td className="py-2 px-4">{t('sampleTable.netCashFlow') as string}</td>
                  <td className="py-2 px-4">125,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.5}>
          <h3 className="text-xl font-semibold mb-2 mt-4">{t('keyTakeaways') as string}</h3>
          <ul className="list-disc list-inside">
            <li>{t('takeaway1') as string}</li>
            <li>{t('takeaway2') as string}</li>
            <li>{t('takeaway3') as string}</li>
            <li>{t('takeaway4') as string}</li>
          </ul>
        </AnimatedDiv>
      </div>
    </LessonLayout>
  );
}
