"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";
import TradingViewWidget from "@/components/tradingview/AdvancedChart";

export default function IntroTechnicalAnalysisPage() {
    const { t } = useTranslation('stock-market-course.introduction-to-technical-analysis');
  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="introduction-to-technical-analysis"
    >
      <div>
        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('whatIsIt')}</h2>
          <p className="mb-4">{t('whatIsItP1')}</p>
          <p className="mb-4">{t('whatIsItP2')}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <div style={{ height: '500px' }}>
            <TradingViewWidget />
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <h3 className="text-xl font-semibold mb-2">{t('coreTenets.title')}</h3>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('coreTenets.marketAction')}</strong>: {t('coreTenets.marketActionP')}</li>
            <li><strong>{t('coreTenets.pricesMove')}</strong>: {t('coreTenets.pricesMoveP')}</li>
            <li><strong>{t('coreTenets.historyRepeats')}</strong>: {t('coreTenets.historyRepeatsP')}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
          <h3 className="text-xl font-semibold mb-2">{t('keyTools.title')}</h3>
          <p className="mb-4">{t('keyTools.p1')}</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('keyTools.charts')}</strong>: {t('keyTools.chartsP')}</li>
            <li><strong>{t('keyTools.indicators')}</strong>: {t('keyTools.indicatorsP')}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.5}>
          <h3 className="text-xl font-semibold mb-2 mt-4">{t('keyTakeaways.title')}</h3>
          <ul className="list-disc list-inside">
            <li>{t('keyTakeaways.takeaway1')}</li>
            <li>{t('keyTakeaways.takeaway2')}</li>
            <li>{t('keyTakeaways.takeaway3')}</li>
            <li>{t('keyTakeaways.takeaway4')}</li>
          </ul>
        </AnimatedDiv>
      </div>
    </LessonLayout>
  );
}
