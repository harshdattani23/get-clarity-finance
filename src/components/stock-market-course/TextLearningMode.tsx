"use client";

import { useContext } from 'react';
import LanguageSelector from './LanguageSelector';
import LessonContent from './LessonContent';
import PracticeQuestions from './PracticeQuestions';
import { LanguageContext } from '@/contexts/LanguageContext';

interface TextLearningModeProps {
  lessonId: string;
}

export default function TextLearningMode({ 
  lessonId 
}: TextLearningModeProps) {
  const languageContext = useContext(LanguageContext);
  const language = languageContext ? languageContext.language : 'en';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-800">📖 Comprehensive Text Lesson</h2>
      </div>

      {/* Language Selector */}
      <LanguageSelector />

      {/* Lesson Content */}
      <LessonContent 
        language={language}
        lessonId={lessonId}
      />

      {/* Practice Questions */}
      <PracticeQuestions 
        language={language}
        lessonId={lessonId}
      />
    </div>
  );
}
