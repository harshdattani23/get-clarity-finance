"use client";
import React from 'react';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { FaChartLine, FaTachometerAlt, FaWaveSquare } from 'react-icons/fa';
import { stockMarketCourseStructure } from '@/lib/stockMarketCourse';

const UsingEssentialTechnicalIndicatorsPage = () => {
  const { t } = useTranslation();

  const lesson = stockMarketCourseStructure.flatMap(m => m.lessons).find(l => l.slug === 'using-essential-technical-indicators-moving-averages-rsi-macd');
  const module = stockMarketCourseStructure.find(m => m.lessons.some(l => l.slug === 'using-essential-technical-indicators-moving-averages-rsi-macd'));

  if (!lesson || !module) {
    return <div>Loading...</div>;
  }

  return (
    <LessonLayout
      title={t(lesson.title)}
      description={t('using-essential-technical-indicators-moving-averages-rsi-macd.description')}
      slug={lesson.slug}
    >
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.intro') }} />

        <div className="my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
            <p>{t('using-essential-technical-indicators-moving-averages-rsi-macd.image_placeholder_1')}</p>
        </div>

        {/* Moving Averages */}
        <section className="mb-12">
          <h3 className="flex items-center text-3xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
            <FaChartLine className="mr-3" />
            {t('using-essential-technical-indicators-moving-averages-rsi-macd.movingAverages.title')}
          </h3>
          <p className="text-lg text-gray-800 dark:text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.movingAverages.p1')}} />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg">
              <h4 className="font-semibold text-xl mb-2">{t('using-essential-technical-indicators-moving-averages-rsi-macd.movingAverages.sma.title')}</h4>
              <p className="text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.movingAverages.sma.p1')}} />
              <p className="mt-2 text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.movingAverages.sma.usage')}} />
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg">
              <h4 className="font-semibold text-xl mb-2">{t('using-essential-technical-indicators-moving-averages-rsi-macd.movingAverages.ema.title')}</h4>
              <p className="text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.movingAverages.ema.p1')}} />
              <p className="mt-2 text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.movingAverages.ema.usage')}} />
            </div>
          </div>
           <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                <p>{t('using-essential-technical-indicators-moving-averages-rsi-macd.movingAverages.animation_placeholder_1')}</p>
            </div>
        </section>

        {/* RSI */}
        <section className="mb-12">
          <h3 className="flex items-center text-3xl font-bold mb-4 text-green-700 dark:text-green-300">
            <FaTachometerAlt className="mr-3" />
            {t('using-essential-technical-indicators-moving-averages-rsi-macd.rsi.title')}
          </h3>
          <p className="text-lg text-gray-800 dark:text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.rsi.p1')}} />
          <p className="text-lg text-gray-800 dark:text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.rsi.howItWorks')}} />
          <div className="flex justify-around bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
            <p className="text-center" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.rsi.overbought')}} />
            <p className="text-center" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.rsi.oversold')}} />
          </div>
           <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                <p>{t('using-essential-technical-indicators-moving-averages-rsi-macd.rsi.animation_placeholder_2')}</p>
            </div>
        </section>

        {/* MACD */}
        <section className="mb-12">
          <h3 className="flex items-center text-3xl font-bold mb-4 text-blue-700 dark:text-blue-300">
            <FaWaveSquare className="mr-3" />
            {t('using-essential-technical-indicators-moving-averages-rsi-macd.macd.title')}
          </h3>
          <p className="text-lg text-gray-800 dark:text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.macd.p1')}}/>
          <ul className="list-disc list-inside mb-4 space-y-2 text-gray-800 dark:text-gray-300">
            <li dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.macd.macdLine')}} />
            <li dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.macd.signalLine')}} />
            <li dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.macd.histogram')}} />
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
            <h4 className="font-semibold text-xl mb-2">{t('using-essential-technical-indicators-moving-averages-rsi-macd.macd.signals.title')}</h4>
            <p className="mb-2" dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.macd.signals.bullish')}} />
            <p dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.macd.signals.bearish')}} />
          </div>
           <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                <p>{t('using-essential-technical-indicators-moving-averages-rsi-macd.macd.animation_placeholder_3')}</p>
            </div>
        </section>

        {/* Summary Table */}
        <section className="mb-12">
            <h3 className="text-2xl font-bold mb-4">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.title')}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border">
                    <thead>
                        <tr className="w-full bg-gray-200 dark:bg-gray-700 text-left">
                            <th className="p-4">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.header1')}</th>
                            <th className="p-4">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.header2')}</th>
                            <th className="p-4">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.header3')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 border-t">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.row1_col1')}</td>
                            <td className="p-4 border-t">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.row1_col2')}</td>
                            <td className="p-4 border-t">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.row1_col3')}</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-t">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.row2_col1')}</td>
                            <td className="p-4 border-t">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.row2_col2')}</td>
                            <td className="p-4 border-t">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.row2_col3')}</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-t">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.row3_col1')}</td>
                            <td className="p-4 border-t">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.row3_col2')}</td>
                            <td className="p-4 border-t">{t('using-essential-technical-indicators-moving-averages-rsi-macd.summaryTable.row3_col3')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        {/* Key Takeaways */}
        <section className="mt-12 p-6 bg-gray-800 text-white rounded-lg">
          <h3 className="text-2xl font-bold mb-4">{t('using-essential-technical-indicators-moving-averages-rsi-macd.keyTakeaways.title')}</h3>
          <ul className="space-y-4">
            <li dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.keyTakeaways.takeaway1')}} />
            <li dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.keyTakeaways.takeaway2')}} />
            <li dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.keyTakeaways.takeaway3')}} />
            <li dangerouslySetInnerHTML={{ __html: t('using-essential-technical-indicators-moving-averages-rsi-macd.keyTakeaways.takeaway4')}} />
          </ul>
        </section>
      </div>
    </LessonLayout>
  );
};

export default UsingEssentialTechnicalIndicatorsPage;
