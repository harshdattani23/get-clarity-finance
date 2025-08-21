"use client";

import { ChevronRight } from 'lucide-react';

interface LessonHeaderProps {
  courseTitle: string;
  moduleTitle: string;
  lessonTitle: string;
}

export default function LessonHeader({ 
  courseTitle, 
  moduleTitle, 
  lessonTitle 
}: LessonHeaderProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span className="hover:text-gray-800 cursor-pointer">{courseTitle}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-gray-800 cursor-pointer">{moduleTitle}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800 font-medium">{lessonTitle}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{lessonTitle}</h1>
      <p className="text-gray-600">
        Learn the essential basics of stock markets and investment fundamentals
      </p>
    </div>
  );
}
