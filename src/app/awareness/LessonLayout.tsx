import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getLessonNavigation } from '@/lib/course';
import React from 'react';

interface LessonLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  lessonSlug: string;
}

// Reusable layout for a single lesson page
export default function LessonLayout({ children, title, description, lessonSlug }: LessonLayoutProps) {
  const { prevLesson, nextLesson } = getLessonNavigation(lessonSlug);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        
        {/* Back to Hub button */}
        <Link href="/awareness/foundation" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline mb-6">
          <ChevronLeft className="w-5 h-5" />
          Back to Foundation Hub
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
        
        {/* Dynamic Navigation */}
        <div className="mt-8 flex justify-between">
          {prevLesson ? (
            <Link href={`/awareness/foundation/${prevLesson.slug}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <div>
                <p className="text-xs">Previous Lesson</p>
                <p>{prevLesson.title}</p>
              </div>
            </Link>
          ) : <div></div>}

          {nextLesson ? (
            <Link href={`/awareness/foundation/${nextLesson.slug}`} className="inline-flex items-center text-right gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              <div>
                <p className="text-xs">Next Lesson</p>
                <p>{nextLesson.title}</p>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : <div></div>}
        </div>

      </div>
    </div>
  );
}
