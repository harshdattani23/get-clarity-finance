"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function ReadingCashFlowStatementPage() {
    const { t } = useTranslation('stock-market-course.reading-the-cash-flow-statement');
  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="reading-the-cash-flow-statement"
    >
      <div>
        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('whatIsIt')}</h2>
          <p className="mb-4">{t('whatIsItP1')}</p>
          <p className="mb-4">{t('whatIsItP2')}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <h3 className="text-xl font-semibold mb-2">{t('threeSections')}</h3>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('operating')}</strong>: {t('operatingP')}</li>
            <li><strong>{t('investing')}</strong>: {t('investingP')}</li>
            <li><strong>{t('financing')}</strong>: {t('financingP')}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
          <h3 className="text-xl font-semibold mb-2">{t('sampleTable.title')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="py-2 px-4 border-b">{t('sampleTable.particulars')}</th>
                  <th className="py-2 px-4 border-b">{t('sampleTable.amount')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b font-bold" colSpan={2}>{t('sampleTable.operating')}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b pl-8">{t('sampleTable.netIncome')}</td>
                  <td className="py-2 px-4 border-b">200,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b pl-8">{t('sampleTable.depreciation')}</td>
                  <td className="py-2 px-4 border-b">25,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-bold">{t('sampleTable.operatingCashFlow')}</td>
                  <td className="py-2 px-4 border-b">225,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-bold" colSpan={2}>{t('sampleTable.investing')}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b pl-8">{t('sampleTable.assetSale')}</td>
                  <td className="py-2 px-4 border-b">(150,000)</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-bold">{t('sampleTable.investingCashFlow')}</td>
                  <td className="py-2 px-4 border-b">(150,000)</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-bold" colSpan={2}>{t('sampleTable.financing')}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b pl-8">{t('sampleTable.debt')}</td>
                  <td className="py-2 px-4 border-b">50,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-bold">{t('sampleTable.financingCashFlow')}</td>
                  <td className="py-2 px-4 border-b">50,000</td>
                </tr>
                <tr className="font-bold text-blue-600 dark:text-blue-400">
                  <td className="py-2 px-4">{t('sampleTable.netCashFlow')}</td>
                  <td className="py-2 px-4">125,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.5}>
          <h3 className="text-xl font-semibold mb-2 mt-4">{t('keyTakeaways')}</h3>
          <ul className="list-disc list-inside">
            <li>{t('takeaway1')}</li>
            <li>{t('takeaway2')}</li>
            <li>{t('takeaway3')}</li>
            <li>{t('takeaway4')}</li>
          </ul>
        </AnimatedDiv>
      </div>
    </LessonLayout>
  );
}
