"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { User, Building, Landmark, Scale } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function DifferentPlayersPage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('the-different-players-in-the-market.title')}
      description={t('the-different-players-in-the-market.description')}
      lessonSlug="the-different-players-in-the-market"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('the-different-players-in-the-market.introduction')}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('the-different-players-in-the-market.introductionP1') }} />
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('the-different-players-in-the-market.mainPlayers')}</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          
          <div className="flex items-start">
            <User className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl text-gray-800">{t('the-different-players-in-the-market.retailInvestors')}</h3>
              <p className="text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: t('the-different-players-in-the-market.retailInvestorsP') }} />
            </div>
          </div>

          <div className="flex items-start">
            <Building className="w-8 h-8 text-green-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl text-gray-800">{t('the-different-players-in-the-market.institutionalInvestors')}</h3>
              <p className="text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: t('the-different-players-in-the-market.institutionalInvestorsP') }} />
            </div>
          </div>

          <div className="flex items-start">
            <Landmark className="w-8 h-8 text-indigo-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl text-gray-800">{t('the-different-players-in-the-market.marketMakers')}</h3>
              <p className="text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: t('the-different-players-in-the-market.marketMakersP') }} />
            </div>
          </div>

          <div className="flex items-start">
            <Scale className="w-8 h-8 text-red-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl text-gray-800">{t('the-different-players-in-the-market.regulators')}</h3>
              <p className="text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: t('the-different-players-in-the-market.regulatorsP') }} />
            </div>
          </div>

        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.4}>
        <div className="mt-12 bg-gray-50 p-8 rounded-xl border">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('the-different-players-in-the-market.ecosystem')}</h3>
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t('the-different-players-in-the-market.ecosystemP') }}/>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.6}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('the-different-players-in-the-market.keyTakeaways')}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('the-different-players-in-the-market.takeaway1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('the-different-players-in-the-market.takeaway2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('the-different-players-in-the-market.takeaway3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('the-different-players-in-the-market.takeaway4') }} />
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
