"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";
import Image from 'next/image';

export default function IdentifyingTrendsSupportAndResistancePage() {
    const { t } = useTranslation('stock-market-course.identifying-trends-support-and-resistance');
  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="identifying-trends-support-and-resistance"
    >
      <div>
        <AnimatedDiv>
          <p className="mb-4">{t('intro')}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <div className="flex justify-center mb-4">
            <Image src="https://www.investopedia.com/thmb/8-DW1s_Gz6_Oo2a_g3p-Xz7x8wM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/support-and-resistance-2-5884ff305a2f434c93c4489a74246821.jpg" alt={t('image_alt')} width={800} height={450} />
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <h2 className="text-2xl font-bold mb-4">{t('trends.title')}</h2>
          <p className="mb-4">{t('trends.p1')}</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('trends.uptrend.title')}:</strong> {t('trends.uptrend.p1')}</li>
            <li><strong>{t('trends.downtrend.title')}:</strong> {t('trends.downtrend.p1')}</li>
            <li><strong>{t('trends.sideways.title')}:</strong> {t('trends.sideways.p1')}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
          <h2 className="text-2xl font-bold mb-4">{t('support.title')}</h2>
          <p className="mb-4">{t('support.p1')}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.5}>
          <h2 className="text-2xl font-bold mb-4">{t('resistance.title')}</h2>
          <p className="mb-4">{t('resistance.p1')}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.6}>
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
