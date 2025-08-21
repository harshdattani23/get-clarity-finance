"use client";
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getStockMarketLessonNavigation } from '@/lib/stockMarketCourse';
import { useTranslation } from '@/hooks/useTranslation';
import LessonSkeleton from '@/components/stock-market-course/LessonSkeleton';
import MultipartLessonAudio from '@/components/stock-market-course/MultipartLessonAudio';

// Reusable layout for a single lesson page
interface LessonLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    lessonSlug: string;
    hasAudio?: boolean;
    audioParts?: Array<{
        id: string;
        title: string;
        audioUrl: string;
        duration: number;
        transcript?: string;
    }>;
}

export default function LessonLayout({ children, title, description, lessonSlug, hasAudio = false, audioParts = [] }: LessonLayoutProps) {
  const { prevLesson, nextLesson } = getStockMarketLessonNavigation(lessonSlug);
  const { t, translations } = useTranslation('stock-market-course.course-modules');
  
  // Check if translations are still loading
  const isLoading = Object.keys(translations).length === 0;
  
  // Helper function to get lesson title from translation
  const getLessonTitle = (lessonSlug: string) => {
    // For now, return a human-readable version of the slug
    // This is a temporary solution until we implement proper lesson title translation
    return lessonSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          
          {/* Back to Hub button */}
          {isLoading ? (
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
          ) : (
            <Link href="/stock-market-course" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline mb-6">
              <ChevronLeft className="w-5 h-5" />
              {t('navigation.backToModules') as string}
            </Link>
          )}
          
          {/* Lesson Header */}
          <header className="mb-8">
            {isLoading ? (
              <>
                <div className="h-16 bg-gray-200 rounded-lg w-3/4 mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                  {title}
                </h1>
                <p className="text-xl text-gray-600 mt-2">{description}</p>
              </>
            )}
          </header>
          
          {/* Audio Player */}
          {hasAudio && audioParts.length > 0 && (
            <div className="mb-8">
              <MultipartLessonAudio
                lessonTitle={title}
                lessonDescription={description}
                parts={audioParts}
                onPartComplete={(partId) => {
                  console.log(`Completed audio part: ${partId}`);
                }}
              />
            </div>
          )}

          {/* Main lesson content */}
          <article className="prose lg:prose-xl max-w-none bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            {isLoading ? <LessonSkeleton /> : children}
          </article>
          
          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            {isLoading ? (
              <>
                <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
              </>
            ) : (
              <>
                {prevLesson ? (
                  <Link href={prevLesson.href} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                    {t('navigation.previous') as string}: {getLessonTitle(prevLesson.slug)}
                  </Link>
                ) : (
                  <div /> // Empty div to maintain spacing
                )}
                {nextLesson ? (
                  <Link href={nextLesson.href} className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                    {t('navigation.next') as string}: {getLessonTitle(nextLesson.slug)} <ChevronRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <div /> // Empty div to maintain spacing
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
