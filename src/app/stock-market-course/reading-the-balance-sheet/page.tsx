"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { Landmark, HandCoins, ShieldCheck } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function ReadingBalanceSheetPage() {
    const { t } = useTranslation('stock-market-course/reading-the-balance-sheet');
  return (
    <LessonLayout
      title={t('reading-the-balance-sheet.title')}
      description={t('reading-the-balance-sheet.description')}
      lessonSlug="reading-the-balance-sheet"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('reading-the-balance-sheet.whatIsIt')}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('reading-the-balance-sheet.whatIsItP1') }} />
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
            <p className="text-2xl font-bold text-yellow-800" dangerouslySetInnerHTML={{ __html: t('reading-the-balance-sheet.formula') }} />
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('reading-the-balance-sheet.coreComponents')}</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2"><Landmark className="w-5 h-5 mr-2" />{t('reading-the-balance-sheet.assets')}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('reading-the-balance-sheet.assetsP') }} />
          </div>
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="font-bold text-lg text-red-800 flex items-center mb-2"><HandCoins className="w-5 h-5 mr-2" />{t('reading-the-balance-sheet.liabilities')}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('reading-the-balance-sheet.liabilitiesP') }} />
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-bold text-lg text-green-800 flex items-center mb-2"><ShieldCheck className="w-5 h-5 mr-2" />{t('reading-the-balance-sheet.equity')}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('reading-the-balance-sheet.equityP') }} />
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.4}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('reading-the-balance-sheet.keyTakeaways')}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('reading-the-balance-sheet.takeaway1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('reading-the-balance-sheet.takeaway2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('reading-the-balance-sheet.takeaway3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('reading-the-balance-sheet.takeaway4') }} />
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
