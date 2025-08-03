"use client";

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { stockMarketCourseStructure } from '@/lib/stockMarketCourse';
import { useTranslation } from '@/hooks/useTranslation';

const ModuleCard = ({ title, description, lessons }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-full mr-4">
                    <BookOpen className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{t(title)}</h3>
            </div>
            <p className="text-gray-600 mb-4">{t(description)}</p>
            <ul className="space-y-2">
                {lessons.map((lesson) => (
                    <li key={lesson.slug}>
                        <Link href={lesson.href} className="text-green-600 hover:underline">
                            {t(lesson.title)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function StockMarketCoursePage() {
    const { t } = useTranslation();
    const modules = stockMarketCourseStructure;

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            {t('stockMarketCourse.title')}
        </h1>
        <p className="text-xl text-gray-600 mt-2">{t('stockMarketCourse.description')}</p>
      </header>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {modules.map((mod) => (
          <ModuleCard key={mod.title} {...mod} />
        ))}
      </div>
    </div>
  );
}
