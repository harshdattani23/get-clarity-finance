// src/app/stock-market-course.the-principle-of-portfolio-diversification/page.tsx
"use client";
import React from 'react';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '../../../hooks/useTranslation';
import { stockMarketCourseStructure } from '../../../lib/stockMarketCourse';
import { FaBalanceScale, FaChartPie, FaShieldAlt } from 'react-icons/fa';
import PortfolioAllocator from '../../../components/stock-market-course/PortfolioAllocator';

const PortfolioDiversificationPage = () => {
  const { t } = useTranslation('stock-market-course.the-principle-of-portfolio-diversification');
  
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
      title={t(lesson.title) as string}
      description={t(moduleData.description) as string}
      lessonSlug={lesson.slug}
    >
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 border-b-4 border-indigo-600 pb-4">
          {t('title') as string}
        </h2>

        <section className="mb-12 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl shadow-md">
          <h3 className="flex items-center text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
            <FaChartPie className="mr-3 text-3xl" />
            {t('whatIsDiversification.title') as string}
          </h3>
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('whatIsDiversification.content') }} />
        </section>

        <section className="mb-12 bg-green-50 dark:bg-green-900/20 p-6 rounded-xl shadow-md">
          <h3 className="flex items-center text-2xl font-bold mb-4 text-green-700 dark:text-green-300">
            <FaShieldAlt className="mr-3 text-3xl" />
            {t('whyDiversify.title') as string}
          </h3>
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('whyDiversify.content') }} />
        </section>

        <section className="mb-12">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Interactive Diversification
            </h3>
            <PortfolioAllocator />
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {t('typesOfRisk.title') as string}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl shadow-md">
              <p className="text-lg text-gray-800 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t('typesOfRisk.systematic') }} />
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl shadow-md">
              <p className="text-lg text-gray-800 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t('typesOfRisk.unsystematic') }} />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="flex items-center text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            <FaBalanceScale className="mr-3" />
            {t('howToDiversify.title') as string}
          </h3>
          <ul className="space-y-6">
            <li className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow" dangerouslySetInnerHTML={{ __html: t('howToDiversify.assetClasses') }} />
            <li className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow" dangerouslySetInnerHTML={{ __html: t('howToDiversify.withinAssetClasses') }} />
            <li className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow" dangerouslySetInnerHTML={{ __html: t('howToDiversify.geographic') }} />
          </ul>
        </section>

        <section className="mb-12 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-300">{t('diversificationExample.title') as string}</h3>
            <p className="text-lg text-gray-800 dark:text-gray-300 mb-4">{t('diversificationExample.intro') as string}</p>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-semibold text-xl mb-2">{t('diversificationExample.undiversified') as string}</h4>
                </div>
                <div>
                    <h4 className="font-semibold text-xl mb-2">{t('diversificationExample.diversified') as string}</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>{t('diversificationExample.item1') as string}</li>
                        <li>{t('diversificationExample.item2') as string}</li>
                        <li>{t('diversificationExample.item3') as string}</li>
                        <li>{t('diversificationExample.item4') as string}</li>
                    </ul>
                </div>
            </div>
            <p className="mt-4 text-lg text-gray-800 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t('diversificationExample.outro')}} />
        </section>

        <section className="mt-12 p-6 bg-gray-800 text-white rounded-lg">
          <h3 className="text-2xl font-bold mb-4">{t('bottomLine.title') as string}</h3>
          <p className="text-lg" dangerouslySetInnerHTML={{ __html: t('bottomLine.content') }} />
        </section>
      </div>
    </LessonLayout>
  );
};

export default PortfolioDiversificationPage;
