"use client";

import LessonLayout from "../LessonLayout";
import { Briefcase, TrendingUp, Landmark } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";
import { useTranslation } from "@/hooks/useTranslation";

// A simple component to visually represent stock ownership
const OwnershipVisual = () => {
    const { t } = useTranslation();
    return (
        <div className="bg-gray-100 p-6 rounded-lg text-center my-6">
            <h4 className="font-bold text-lg text-gray-700 mb-4">{t('what-is-a-stock.ownershipVisualTitle')}</h4>
            <div className="flex justify-center items-center text-6xl">
                <span>🍕</span>
            </div>
            <p className="mt-4 text-gray-600" dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.ownershipVisualP1') }} />
            <p className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.ownershipVisualP2') }} />
        </div>
    );
}


export default function WhatIsAStockPage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('what-is-a-stock.title')}
      description={t('what-is-a-stock.description')}
      lessonSlug="what-is-a-stock"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('what-is-a-stock.simpleDefinition')}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.simpleDefinitionP1') }} />
        <p dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.simpleDefinitionP2') }} />
        <OwnershipVisual />
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('what-is-a-stock.whyCompaniesIssue')}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.whyCompaniesIssueP1') }} />
        
        <ul className="space-y-4 mt-6">
          <li className="flex items-start">
            <Briefcase className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">{t('what-is-a-stock.fundingGrowth')}</h3>
              <p className="text-gray-600">{t('what-is-a-stock.fundingGrowthP')}</p>
            </div>
          </li>
          <li className="flex items-start">
            <Landmark className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">{t('what-is-a-stock.goingPublic')}</h3>
              <p className="text-gray-600">{t('what-is-a-stock.goingPublicP')}</p>
            </div>
          </li>
        </ul>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.4}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('what-is-a-stock.whyPeopleBuy')}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.whyPeopleBuyP') }}/>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2"><TrendingUp className="w-5 h-5 mr-2" />{t('what-is-a-stock.capitalGains')}</h3>
            <p className="text-gray-700">{t('what-is-a-stock.capitalGainsP')}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-bold text-lg text-purple-800 flex items-center mb-2">📈 {t('what-is-a-stock.dividends')}</h3>
            <p className="text-gray-700">{t('what-is-a-stock.dividendsP')}</p>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.6}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('what-is-a-stock.keyTakeaways')}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.takeaway1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.takeaway2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.takeaway3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.takeaway4') }} />
            </ul>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.8}>
        <div className="mt-8 p-6 bg-blue-50 rounded-xl shadow-md border border-blue-200">
            <h3 className="text-2xl font-bold text-blue-800 mb-3">{t('what-is-a-stock.keyTerms')}</h3>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
                <li dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.term1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.term2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.term3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('what-is-a-stock.term4') }} />
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
