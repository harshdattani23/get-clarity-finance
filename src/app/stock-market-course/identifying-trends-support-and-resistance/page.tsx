"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";
import Image from 'next/image';

export default function IdentifyingTrendsSupportAndResistancePage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('identifying-trends-support-and-resistance.title')}
      description={t('identifying-trends-support-and-resistance.description')}
      lessonSlug="identifying-trends-support-and-resistance"
    >
      <div>
        <AnimatedDiv>
          <p className="mb-4">{t('identifying-trends-support-and-resistance.intro')}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <div className="flex justify-center mb-4">
            <Image src="https://www.investopedia.com/thmb/8-DW1s_Gz6_Oo2a_g3p-Xz7x8wM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/support-and-resistance-2-5884ff305a2f434c93c4489a74246821.jpg" alt={t('identifying-trends-support-and-resistance.image_alt')} width={800} height={450} />
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <h2 className="text-2xl font-bold mb-4">{t('identifying-trends-support-and-resistance.trends.title')}</h2>
          <p className="mb-4">{t('identifying-trends-support-and-resistance.trends.p1')}</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('identifying-trends-support-and-resistance.trends.uptrend.title')}:</strong> {t('identifying-trends-support-and-resistance.trends.uptrend.p1')}</li>
            <li><strong>{t('identifying-trends-support-and-resistance.trends.downtrend.title')}:</strong> {t('identifying-trends-support-and-resistance.trends.downtrend.p1')}</li>
            <li><strong>{t('identifying-trends-support-and-resistance.trends.sideways.title')}:</strong> {t('identifying-trends-support-and-resistance.trends.sideways.p1')}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
          <h2 className="text-2xl font-bold mb-4">{t('identifying-trends-support-and-resistance.support.title')}</h2>
          <p className="mb-4">{t('identifying-trends-support-and-resistance.support.p1')}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.5}>
          <h2 className="text-2xl font-bold mb-4">{t('identifying-trends-support-and-resistance.resistance.title')}</h2>
          <p className="mb-4">{t('identifying-trends-support-and-resistance.resistance.p1')}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.6}>
            <h3 className="text-xl font-semibold mb-2 mt-4">{t('identifying-trends-support-and-resistance.keyTakeaways.title')}</h3>
            <ul className="list-disc list-inside">
                <li>{t('identifying-trends-support-and-resistance.keyTakeaways.takeaway1')}</li>
                <li>{t('identifying-trends-support-and-resistance.keyTakeaways.takeaway2')}</li>
                <li>{t('identifying-trends-support-and-resistance.keyTakeaways.takeaway3')}</li>
                <li>{t('identifying-trends-support-and-resistance.keyTakeaways.takeaway4')}</li>
            </ul>
        </AnimatedDiv>

      </div>
    </LessonLayout>
  );
}
