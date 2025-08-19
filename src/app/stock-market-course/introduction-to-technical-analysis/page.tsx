"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";
import TradingViewWidget from "@/components/tradingview/AdvancedChart";

export default function IntroTechnicalAnalysisPage() {
    const { t } = useTranslation('stock-market-course.introduction-to-technical-analysis');
  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="introduction-to-technical-analysis"
    >
      <div>
        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('whatIsIt') as string}</h2>
          <p className="mb-4">{t('whatIsItP1') as string}</p>
          <p className="mb-4">{t('whatIsItP2') as string}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <div style={{ height: '500px' }}>
            <TradingViewWidget />
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <h3 className="text-xl font-semibold mb-2">{t('coreTenets.title') as string}</h3>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('coreTenets.marketAction') as string}</strong>: {t('coreTenets.marketActionP') as string}</li>
            <li><strong>{t('coreTenets.pricesMove') as string}</strong>: {t('coreTenets.pricesMoveP') as string}</li>
            <li><strong>{t('coreTenets.historyRepeats') as string}</strong>: {t('coreTenets.historyRepeatsP') as string}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
          <h3 className="text-xl font-semibold mb-2">{t('keyTools.title') as string}</h3>
          <p className="mb-4">{t('keyTools.p1') as string}</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('keyTools.charts') as string}</strong>: {t('keyTools.chartsP') as string}</li>
            <li><strong>{t('keyTools.indicators') as string}</strong>: {t('keyTools.indicatorsP') as string}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.5}>
          <h3 className="text-xl font-semibold mb-2 mt-4">{t('keyTakeaways.title') as string}</h3>
          <ul className="list-disc list-inside">
            <li>{t('keyTakeaways.takeaway1') as string}</li>
            <li>{t('keyTakeaways.takeaway2') as string}</li>
            <li>{t('keyTakeaways.takeaway3') as string}</li>
            <li>{t('keyTakeaways.takeaway4') as string}</li>
          </ul>
        </AnimatedDiv>
      </div>
    </LessonLayout>
  );
}
