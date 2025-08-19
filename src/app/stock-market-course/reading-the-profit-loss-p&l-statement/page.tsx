"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function ReadingPandLStatementPage() {
    const { t } = useTranslation('stock-market-course.reading-the-profit-loss-p&l-statement');
  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="reading-the-profit-loss-p&l-statement"
    >
      <div>
        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('whatIsIt') as string}</h2>
          <p className="mb-4">{t('whatIsItP1') as string}</p>
          <p className="mb-4">{t('whatIsItP2') as string}</p>
        </AnimatedDiv>
        
        <AnimatedDiv delay={0.3}>
          <h3 className="text-xl font-semibold mb-2">{t('keyComponents') as string}</h3>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('revenue') as string}</strong>: {t('revenueP') as string}</li>
            <li><strong>{t('cogs') as string}</strong>: {t('cogsP') as string}</li>
            <li><strong>{t('grossProfit') as string}</strong>: {t('grossProfitP') as string}</li>
            <li><strong>{t('netIncome') as string}</strong>: {t('netIncomeP') as string}</li>
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
                  <td className="py-2 px-4 border-b">{t('sampleTable.revenue') as string}</td>
                  <td className="py-2 px-4 border-b">1,000,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">{t('sampleTable.cogs') as string}</td>
                  <td className="py-2 px-4 border-b">(600,000)</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-2 px-4 border-b">{t('sampleTable.grossProfit') as string}</td>
                  <td className="py-2 px-4 border-b">400,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">{t('sampleTable.expenses') as string}</td>
                  <td className="py-2 px-4 border-b">(150,000)</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-2 px-4 border-b">{t('sampleTable.pbt') as string}</td>
                  <td className="py-2 px-4 border-b">250,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">{t('sampleTable.tax') as string}</td>
                  <td className="py-2 px-4 border-b">(50,000)</td>
                </tr>
                <tr className="font-bold text-green-600 dark:text-green-400">
                  <td className="py-2 px-4">{t('sampleTable.netIncome') as string}</td>
                  <td className="py-2 px-4">200,000</td>
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
