"use client";
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getStockMarketLessonNavigation } from '@/lib/stockMarketCourse';
import { useTranslation } from '@/hooks/useTranslation';

// Reusable layout for a single lesson page
export default function LessonLayout({ children, title, description, lessonSlug }) {
  const { prevLesson, nextLesson } = getStockMarketLessonNavigation(lessonSlug);
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        
        {/* Back to Hub button */}
        <Link href="/stock-market-course" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline mb-6">
          <ChevronLeft className="w-5 h-5" />
          {t('navigation.backToModules')}
        </Link>
        
        {/* Lesson Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            {title}
          </h1>
          <p className="text-xl text-gray-600 mt-2">{description}</p>
        </header>
        
        {/* Main lesson content */}
        <article className="prose lg:prose-xl max-w-none bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          {children}
        </article>
        
        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          {prevLesson ? (
            <Link href={prevLesson.href} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              {t('navigation.previous')}: {t(prevLesson.slug + '.title')}
            </Link>
          ) : (
            <div /> // Empty div to maintain spacing
          )}
          {nextLesson ? (
            <Link href={nextLesson.href} className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
              {t('navigation.next')}: {t(nextLesson.slug + '.title')} <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div /> // Empty div to maintain spacing
          )}
        </div>

      </div>
    </div>
  );
}
