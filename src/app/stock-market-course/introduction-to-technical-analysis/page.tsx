"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";
import TradingViewWidget from "@/components/tradingview/AdvancedChart";

export default function IntroTechnicalAnalysisPage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('introduction-to-technical-analysis.title')}
      description={t('introduction-to-technical-analysis.description')}
      lessonSlug="introduction-to-technical-analysis"
    >
      <div>
        <AnimatedDiv>
          <h2 className="text-2xl font-bold mb-4">{t('introduction-to-technical-analysis.whatIsIt')}</h2>
          <p className="mb-4">{t('introduction-to-technical-analysis.whatIsItP1')}</p>
          <p className="mb-4">{t('introduction-to-technical-analysis.whatIsItP2')}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <div style={{ height: '500px' }}>
            <TradingViewWidget />
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <h3 className="text-xl font-semibold mb-2">{t('introduction-to-technical-analysis.coreTenets.title')}</h3>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('introduction-to-technical-analysis.coreTenets.marketAction')}</strong>: {t('introduction-to-technical-analysis.coreTenets.marketActionP')}</li>
            <li><strong>{t('introduction-to-technical-analysis.coreTenets.pricesMove')}</strong>: {t('introduction-to-technical-analysis.coreTenets.pricesMoveP')}</li>
            <li><strong>{t('introduction-to-technical-analysis.coreTenets.historyRepeats')}</strong>: {t('introduction-to-technical-analysis.coreTenets.historyRepeatsP')}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
          <h3 className="text-xl font-semibold mb-2">{t('introduction-to-technical-analysis.keyTools.title')}</h3>
          <p className="mb-4">{t('introduction-to-technical-analysis.keyTools.p1')}</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('introduction-to-technical-analysis.keyTools.charts')}</strong>: {t('introduction-to-technical-analysis.keyTools.chartsP')}</li>
            <li><strong>{t('introduction-to-technical-analysis.keyTools.indicators')}</strong>: {t('introduction-to-technical-analysis.keyTools.indicatorsP')}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.5}>
          <h3 className="text-xl font-semibold mb-2 mt-4">{t('introduction-to-technical-analysis.keyTakeaways.title')}</h3>
          <ul className="list-disc list-inside">
            <li>{t('introduction-to-technical-analysis.keyTakeaways.takeaway1')}</li>
            <li>{t('introduction-to-technical-analysis.keyTakeaways.takeaway2')}</li>
            <li>{t('introduction-to-technical-analysis.keyTakeaways.takeaway3')}</li>
            <li>{t('introduction-to-technical-analysis.keyTakeaways.takeaway4')}</li>
          </ul>
        </AnimatedDiv>
      </div>
    </LessonLayout>
  );
}
