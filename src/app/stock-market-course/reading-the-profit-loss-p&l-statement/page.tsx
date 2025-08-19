"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function ReadingPandLStatementPage() {
    const { t } = useTranslation('stock-market-course.reading-the-profit-loss-p&l-statement');
  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="reading-the-profit-loss-p&l-statement"
    >
      <div>
        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('whatIsIt')}</h2>
          <p className="mb-4">{t('whatIsItP1')}</p>
          <p className="mb-4">{t('whatIsItP2')}</p>
        </AnimatedDiv>
        
        <AnimatedDiv delay={0.3}>
          <h3 className="text-xl font-semibold mb-2">{t('keyComponents')}</h3>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('revenue')}</strong>: {t('revenueP')}</li>
            <li><strong>{t('cogs')}</strong>: {t('cogsP')}</li>
            <li><strong>{t('grossProfit')}</strong>: {t('grossProfitP')}</li>
            <li><strong>{t('netIncome')}</strong>: {t('netIncomeP')}</li>
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
                  <td className="py-2 px-4 border-b">{t('sampleTable.revenue')}</td>
                  <td className="py-2 px-4 border-b">1,000,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">{t('sampleTable.cogs')}</td>
                  <td className="py-2 px-4 border-b">(600,000)</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-2 px-4 border-b">{t('sampleTable.grossProfit')}</td>
                  <td className="py-2 px-4 border-b">400,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">{t('sampleTable.expenses')}</td>
                  <td className="py-2 px-4 border-b">(150,000)</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-2 px-4 border-b">{t('sampleTable.pbt')}</td>
                  <td className="py-2 px-4 border-b">250,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">{t('sampleTable.tax')}</td>
                  <td className="py-2 px-4 border-b">(50,000)</td>
                </tr>
                <tr className="font-bold text-green-600 dark:text-green-400">
                  <td className="py-2 px-4">{t('sampleTable.netIncome')}</td>
                  <td className="py-2 px-4">200,000</td>
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
