"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { BookOpen, BarChart, FileText, Activity } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function IntroFundamentalAnalysisPage() {
    const { t } = useTranslation('stock-market-course.introduction-to-fundamental-analysis');
  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="introduction-to-fundamental-analysis"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('whatIsIt') as string}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('whatIsItP1') }} />
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('whatIsItP2') }} />
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('coreComponents') as string}</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-lg text-yellow-800 flex items-center mb-2"><BookOpen className="w-5 h-5 mr-2" />{t('qualitativeAnalysis') as string}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('qualitativeAnalysisP') }} />
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-bold text-lg text-green-800 flex items-center mb-2"><BarChart className="w-5 h-5 mr-2" />{t('quantitativeAnalysis') as string}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('quantitativeAnalysisP') }} />
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.4}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('keyDocuments') as string}</h2>
        <ul className="space-y-4 mt-6">
            <li className="flex items-start">
                <FileText className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{t('balanceSheet') as string}</h3>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t('balanceSheetP') }} />
                </div>
            </li>
            <li className="flex items-start">
                <Activity className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{t('incomeStatement') as string}</h3>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t('incomeStatementP') }} />
                </div>
            </li>
        </ul>
      </AnimatedDiv>

      <AnimatedDiv delay={0.6}>
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
