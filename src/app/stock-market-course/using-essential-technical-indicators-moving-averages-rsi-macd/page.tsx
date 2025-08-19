"use client";
import React from 'react';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { FaChartLine, FaTachometerAlt, FaWaveSquare } from 'react-icons/fa';
import AnimatedDiv from '@/components/animations/AnimatedDiv';

const UsingEssentialTechnicalIndicatorsPage = () => {
  const { t } = useTranslation('stock-market-course.using-essential-technical-indicators-moving-averages-rsi-macd');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug='using-essential-technical-indicators-moving-averages-rsi-macd'
    >
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <AnimatedDiv>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: t('intro') }} />
        </AnimatedDiv>

        <AnimatedDiv className="my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
            <p>{t('image_placeholder_1') as string}</p>
        </AnimatedDiv>

        {/* Moving Averages */}
        <section className="mb-12">
            <AnimatedDiv>
                <h3 className="flex items-center text-3xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
                    <FaChartLine className="mr-3" />
                    {t('movingAverages.title') as string}
                </h3>
                <p className="text-lg text-gray-800 dark:text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: t('movingAverages.p1')}} />
            </AnimatedDiv>
            <div className="grid md:grid-cols-2 gap-8">
                <AnimatedDiv className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg">
                    <h4 className="font-semibold text-xl mb-2">{t('movingAverages.sma.title') as string}</h4>
                    <p className="text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t('movingAverages.sma.p1')}} />
                    <p className="mt-2 text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t('movingAverages.sma.usage')}} />
                </AnimatedDiv>
                <AnimatedDiv className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg">
                    <h4 className="font-semibold text-xl mb-2">{t('movingAverages.ema.title') as string}</h4>
                    <p className="text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t('movingAverages.ema.p1')}} />
                    <p className="mt-2 text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t('movingAverages.ema.usage')}} />
                </AnimatedDiv>
            </div>
            <AnimatedDiv className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                <p>{t('movingAverages.animation_placeholder_1') as string}</p>
            </AnimatedDiv>
        </section>

        {/* RSI */}
        <section className="mb-12">
            <AnimatedDiv>
                <h3 className="flex items-center text-3xl font-bold mb-4 text-green-700 dark:text-green-300">
                    <FaTachometerAlt className="mr-3" />
                    {t('rsi.title') as string}
                </h3>
                <p className="text-lg text-gray-800 dark:text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: t('rsi.p1')}} />
                <p className="text-lg text-gray-800 dark:text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: t('rsi.howItWorks')}} />
            </AnimatedDiv>
            <div className="flex justify-around bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
                <AnimatedDiv>
                    <p className="text-center" dangerouslySetInnerHTML={{ __html: t('rsi.overbought')}} />
                </AnimatedDiv>
                <AnimatedDiv>
                    <p className="text-center" dangerouslySetInnerHTML={{ __html: t('rsi.oversold')}} />
                </AnimatedDiv>
            </div>
            <AnimatedDiv className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                <p>{t('rsi.animation_placeholder_2') as string}</p>
            </AnimatedDiv>
        </section>

        {/* MACD */}
        <section className="mb-12">
            <AnimatedDiv>
                <h3 className="flex items-center text-3xl font-bold mb-4 text-blue-700 dark:text-blue-300">
                    <FaWaveSquare className="mr-3" />
                    {t('macd.title') as string}
                </h3>
                <p className="text-lg text-gray-800 dark:text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: t('macd.p1')}}/>
            </AnimatedDiv>
            <AnimatedDiv>
                <ul className="list-disc list-inside mb-4 space-y-2 text-gray-800 dark:text-gray-300">
                    <li dangerouslySetInnerHTML={{ __html: t('macd.macdLine')}} />
                    <li dangerouslySetInnerHTML={{ __html: t('macd.signalLine')}} />
                    <li dangerouslySetInnerHTML={{ __html: t('macd.histogram')}} />
                </ul>
            </AnimatedDiv>
            <AnimatedDiv className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
                <h4 className="font-semibold text-xl mb-2">{t('macd.signals.title') as string}</h4>
                <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('macd.signals.bullish')}} />
                <p dangerouslySetInnerHTML={{ __html: t('macd.signals.bearish')}} />
            </AnimatedDiv>
            <AnimatedDiv className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                <p>{t('macd.animation_placeholder_3') as string}</p>
            </AnimatedDiv>
        </section>

        {/* Summary Table */}
        <section className="mb-12">
            <AnimatedDiv>
                <h3 className="text-2xl font-bold mb-4">{t('summaryTable.title') as string}</h3>
            </AnimatedDiv>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border">
                    <thead>
                        <tr className="w-full bg-gray-200 dark:bg-gray-700 text-left">
                            <th className="p-4">{t('summaryTable.header1') as string}</th>
                            <th className="p-4">{t('summaryTable.header2') as string}</th>
                            <th className="p-4">{t('summaryTable.header3') as string}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 border-t">{t('summaryTable.row1_col1') as string}</td>
                            <td className="p-4 border-t">{t('summaryTable.row1_col2') as string}</td>
                            <td className="p-4 border-t">{t('summaryTable.row1_col3') as string}</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-t">{t('summaryTable.row2_col1') as string}</td>
                            <td className="p-4 border-t">{t('summaryTable.row2_col2') as string}</td>
                            <td className="p-4 border-t">{t('summaryTable.row2_col3') as string}</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-t">{t('summaryTable.row3_col1') as string}</td>
                            <td className="p-4 border-t">{t('summaryTable.row3_col2') as string}</td>
                            <td className="p-4 border-t">{t('summaryTable.row3_col3') as string}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        {/* Key Takeaways */}
        <section className="mt-12 p-6 bg-gray-800 text-white rounded-lg">
            <AnimatedDiv>
                <h3 className="text-2xl font-bold mb-4">{t('keyTakeaways.title') as string}</h3>
                <ul className="space-y-4">
                    <li dangerouslySetInnerHTML={{ __html: t('keyTakeaways.takeaway1')}} />
                    <li dangerouslySetInnerHTML={{ __html: t('keyTakeaways.takeaway2')}} />
                    <li dangerouslySetInnerHTML={{ __html: t('keyTakeaways.takeaway3')}} />
                    <li dangerouslySetInnerHTML={{ __html: t('keyTakeaways.takeaway4')}} />
                </ul>
            </AnimatedDiv>
        </section>
      </div>
    </LessonLayout>
  );
};

export default UsingEssentialTechnicalIndicatorsPage;
