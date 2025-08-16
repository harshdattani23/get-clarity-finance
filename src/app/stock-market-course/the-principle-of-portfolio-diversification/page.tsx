// src/app/stock-market-course/the-principle-of-portfolio-diversification/page.tsx
"use client";
import React from 'react';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '../../../hooks/useTranslation';
import { stockMarketCourseStructure } from '../../../lib/stockMarketCourse';
import { FaBalanceScale, FaChartPie, FaShieldAlt } from 'react-icons/fa';
import PortfolioAllocator from '../../../components/stock-market-course/PortfolioAllocator';

const PortfolioDiversificationPage = () => {
  const { t } = useTranslation('stock-market-course');
  
  const lesson = stockMarketCourseStructure.flatMap(m => m.lessons).find(l => l.slug === 'the-principle-of-portfolio-diversification');

  if (!lesson) {
    return <div>Lesson not found.</div>;
  }
  
  const moduleData = stockMarketCourseStructure.find(m => m.lessons.some(l => l.slug === 'the-principle-of-portfolio-diversification'));

  if (!moduleData) {
    return <div>Module not found.</div>;
  }

  return (
    <LessonLayout
      title={t(lesson.title)}
      description={t(moduleData.description)}
      lessonSlug={lesson.slug}
    >
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 border-b-4 border-indigo-600 pb-4">
          {t('the-principle-of-portfolio-diversification.title')}
        </h2>

        <section className="mb-12 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl shadow-md">
          <h3 className="flex items-center text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
            <FaChartPie className="mr-3 text-3xl" />
            {t('the-principle-of-portfolio-diversification.whatIsDiversification.title')}
          </h3>
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('the-principle-of-portfolio-diversification.whatIsDiversification.content') }} />
        </section>

        <section className="mb-12 bg-green-50 dark:bg-green-900/20 p-6 rounded-xl shadow-md">
          <h3 className="flex items-center text-2xl font-bold mb-4 text-green-700 dark:text-green-300">
            <FaShieldAlt className="mr-3 text-3xl" />
            {t('the-principle-of-portfolio-diversification.whyDiversify.title')}
          </h3>
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('the-principle-of-portfolio-diversification.whyDiversify.content') }} />
        </section>

        <section className="mb-12">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Interactive Diversification
            </h3>
            <PortfolioAllocator />
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {t('the-principle-of-portfolio-diversification.typesOfRisk.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl shadow-md">
              <p className="text-lg text-gray-800 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t('the-principle-of-portfolio-diversification.typesOfRisk.systematic') }} />
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl shadow-md">
              <p className="text-lg text-gray-800 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t('the-principle-of-portfolio-diversification.typesOfRisk.unsystematic') }} />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="flex items-center text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            <FaBalanceScale className="mr-3" />
            {t('the-principle-of-portfolio-diversification.howToDiversify.title')}
          </h3>
          <ul className="space-y-6">
            <li className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow" dangerouslySetInnerHTML={{ __html: t('the-principle-of-portfolio-diversification.howToDiversify.assetClasses') }} />
            <li className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow" dangerouslySetInnerHTML={{ __html: t('the-principle-of-portfolio-diversification.howToDiversify.withinAssetClasses') }} />
            <li className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow" dangerouslySetInnerHTML={{ __html: t('the-principle-of-portfolio-diversification.howToDiversify.geographic') }} />
          </ul>
        </section>

        <section className="mb-12 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-300">{t('the-principle-of-portfolio-diversification.diversificationExample.title')}</h3>
            <p className="text-lg text-gray-800 dark:text-gray-300 mb-4">{t('the-principle-of-portfolio-diversification.diversificationExample.intro')}</p>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-semibold text-xl mb-2">{t('the-principle-of-portfolio-diversification.diversificationExample.undiversified')}</h4>
                </div>
                <div>
                    <h4 className="font-semibold text-xl mb-2">{t('the-principle-of-portfolio-diversification.diversificationExample.diversified')}</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>{t('the-principle-of-portfolio-diversification.diversificationExample.item1')}</li>
                        <li>{t('the-principle-of-portfolio-diversification.diversificationExample.item2')}</li>
                        <li>{t('the-principle-of-portfolio-diversification.diversificationExample.item3')}</li>
                        <li>{t('the-principle-of-portfolio-diversification.diversificationExample.item4')}</li>
                    </ul>
                </div>
            </div>
            <p className="mt-4 text-lg text-gray-800 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t('the-principle-of-portfolio-diversification.diversificationExample.outro')}} />
        </section>

        <section className="mt-12 p-6 bg-gray-800 text-white rounded-lg">
          <h3 className="text-2xl font-bold mb-4">{t('the-principle-of-portfolio-diversification.bottomLine.title')}</h3>
          <p className="text-lg" dangerouslySetInnerHTML={{ __html: t('the-principle-of-portfolio-diversification.bottomLine.content') }} />
        </section>
      </div>
    </LessonLayout>
  );
};

export default PortfolioDiversificationPage;
