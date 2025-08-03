"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { ShoppingCart, Target, TrendingUp, Zap } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function PlacingFirstTradePage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('placing-your-first-trade-order-types.title')}
      description={t('placing-your-first-trade-order-types.description')}
      lessonSlug="placing-your-first-trade-order-types"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('placing-your-first-trade-order-types.introduction')}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.introductionP1') }} />
        <p dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.introductionP2') }} />
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('placing-your-first-trade-order-types.commonOrderTypes')}</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-bold text-lg text-green-800 flex items-center mb-2"><ShoppingCart className="w-5 h-5 mr-2" />{t('placing-your-first-trade-order-types.marketOrder')}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.marketOrderP') }} />
            <p className="mt-2 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.marketOrderP2') }} />
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2"><Target className="w-5 h-5 mr-2" />{t('placing-your-first-trade-order-types.limitOrder')}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.limitOrderP') }} />
            <p className="mt-2 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.limitOrderP2') }} />
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.4}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('placing-your-first-trade-order-types.advancedOrderTypes')}</h2>
        <ul className="space-y-4 mt-6">
            <li className="flex items-start">
                <TrendingUp className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{t('placing-your-first-trade-order-types.stopLossOrder')}</h3>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.stopLossOrderP') }} />
                </div>
            </li>
            <li className="flex items-start">
                <Zap className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{t('placing-your-first-trade-order-types.gttOrder')}</h3>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.gttOrderP') }} />
                </div>
            </li>
        </ul>
      </AnimatedDiv>

      <AnimatedDiv delay={0.6}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('placing-your-first-trade-order-types.keyTakeaways')}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.takeaway1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.takeaway2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.takeaway3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('placing-your-first-trade-order-types.takeaway4') }} />
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
