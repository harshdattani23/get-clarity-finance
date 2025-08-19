"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";
import Image from 'next/image';

export default function HowToReadCandlestickChartsPage() {
    const { t } = useTranslation('stock-market-course.how-to-read-candlestick-charts');
  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="how-to-read-candlestick-charts"
    >
      <div>
        <AnimatedDiv>
          <p className="mb-4">{t('intro')}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <h2 className="text-2xl font-bold mb-4">{t('anatomy.title')}</h2>
          <p className="mb-4">{t('anatomy.p1')}</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('anatomy.body.title')}:</strong> {t('anatomy.body.p1')}</li>
            <li><strong>{t('anatomy.wicks.title')}:</strong> {t('anatomy.wicks.p1')}</li>
            <li><strong>{t('anatomy.color.title')}:</strong> {t('anatomy.color.p1')}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <h2 className="text-2xl font-bold mb-4">{t('patterns.title')}</h2>
          <p className="mb-4">{t('patterns.intro')}</p>
          
          <h3 className="text-xl font-semibold mb-2">{t('patterns.doji.title')}</h3>
          <p className="mb-4">{t('patterns.doji.p1')}</p>
           <div className="flex justify-center mb-4">
            <Image src="https://www.investopedia.com/thmb/J23h4kG0t32i_52j2-0GZ5_GZ4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Doji-980bd34915894726883a6503f1917531.jpg" alt={t('patterns.doji.image_alt')} width={400} height={300} />
          </div>

          <h3 className="text-xl font-semibold mb-2">{t('patterns.hammer.title')}</h3>
          <p className="mb-4">{t('patterns.hammer.p1')}</p>
           <div className="flex justify-center mb-4">
            <Image src="https://www.investopedia.com/thmb/sFsL2y207aP5pw9aO8o-5gY5Z5w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Hammer-e207b66946cb43a4a754b22c7e4663c4.jpg" alt={t('patterns.hammer.image_alt')} width={400} height={300} />
          </div>

          <h3 className="text-xl font-semibold mb-2">{t('patterns.engulfing.title')}</h3>
          <p className="mb-4">{t('patterns.engulfing.p1')}</p>
          <div className="flex justify-center mb-4">
            <Image src="https://www.investopedia.com/thmb/q7uDA-DQzZ-A4F7n3c8gX6U0w4w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BullishEngulfingPattern-d843a8ac96c3427282633396f424c53c.jpg" alt={t('patterns.engulfing.image_alt')} width={400} height={300} />
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
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
