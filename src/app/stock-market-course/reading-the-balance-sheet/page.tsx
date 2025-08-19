"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { Landmark, HandCoins, ShieldCheck } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function ReadingBalanceSheetPage() {
    const { t } = useTranslation('stock-market-course.reading-the-balance-sheet');
  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="reading-the-balance-sheet"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('whatIsIt') as string}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('whatIsItP1') }} />
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
            <p className="text-2xl font-bold text-yellow-800" dangerouslySetInnerHTML={{ __html: t('formula') }} />
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('coreComponents') as string}</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2"><Landmark className="w-5 h-5 mr-2" />{t('assets') as string}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('assetsP') }} />
          </div>
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="font-bold text-lg text-red-800 flex items-center mb-2"><HandCoins className="w-5 h-5 mr-2" />{t('liabilities') as string}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('liabilitiesP') }} />
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-bold text-lg text-green-800 flex items-center mb-2"><ShieldCheck className="w-5 h-5 mr-2" />{t('equity') as string}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('equityP') }} />
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.4}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('keyTakeaways') as string}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('takeaway1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('takeaway2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('takeaway3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('takeaway4') }} />
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
