"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";
import Image from 'next/image';

export default function HowToReadCandlestickChartsPage() {
    const { t } = useTranslation('stock-market-course.how-to-read-candlestick-charts');
  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="how-to-read-candlestick-charts"
    >
      <div>
        <AnimatedDiv>
          <p className="mb-4">{t('intro') as string}</p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <h2 className="text-2xl font-bold mb-4">{t('anatomy.title') as string}</h2>
          <p className="mb-4">{t('anatomy.p1') as string}</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>{t('anatomy.body.title') as string}:</strong> {t('anatomy.body.p1') as string}</li>
            <li><strong>{t('anatomy.wicks.title') as string}:</strong> {t('anatomy.wicks.p1') as string}</li>
            <li><strong>{t('anatomy.color.title') as string}:</strong> {t('anatomy.color.p1') as string}</li>
          </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <h2 className="text-2xl font-bold mb-4">{t('patterns.title') as string}</h2>
          <p className="mb-4">{t('patterns.intro') as string}</p>
          
          <h3 className="text-xl font-semibold mb-2">{t('patterns.doji.title') as string}</h3>
          <p className="mb-4">{t('patterns.doji.p1') as string}</p>
           <div className="flex justify-center mb-4">
            <Image src="https://www.investopedia.com/thmb/J23h4kG0t32i_52j2-0GZ5_GZ4k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Doji-980bd34915894726883a6503f1917531.jpg" alt={t('patterns.doji.image_alt') as string} width={400} height={300} />
          </div>

          <h3 className="text-xl font-semibold mb-2">{t('patterns.hammer.title') as string}</h3>
          <p className="mb-4">{t('patterns.hammer.p1') as string}</p>
           <div className="flex justify-center mb-4">
            <Image src="https://www.investopedia.com/thmb/sFsL2y207aP5pw9aO8o-5gY5Z5w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Hammer-e207b66946cb43a4a754b22c7e4663c4.jpg" alt={t('patterns.hammer.image_alt') as string} width={400} height={300} />
          </div>

          <h3 className="text-xl font-semibold mb-2">{t('patterns.engulfing.title') as string}</h3>
          <p className="mb-4">{t('patterns.engulfing.p1') as string}</p>
          <div className="flex justify-center mb-4">
            <Image src="https://www.investopedia.com/thmb/q7uDA-DQzZ-A4F7n3c8gX6U0w4w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BullishEngulfingPattern-d843a8ac96c3427282633396f424c53c.jpg" alt={t('patterns.engulfing.image_alt') as string} width={400} height={300} />
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
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
