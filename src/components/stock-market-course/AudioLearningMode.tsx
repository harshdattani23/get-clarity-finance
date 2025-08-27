"use client";

import { useState, useContext } from 'react';
import LanguageSelector from './LanguageSelector';
import AudioPlayer from './AudioPlayer';
import TranscriptPanel from './TranscriptPanel';
import { LanguageContext } from '@/contexts/LanguageContext';

interface AudioLearningModeProps {
  lessonId: string;
}

export default function AudioLearningMode({ 
  lessonId 
}: AudioLearningModeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const languageContext = useContext(LanguageContext);
  const language = languageContext ? languageContext.language : 'en';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <h2 className="text-xl font-bold text-gray-800">🤖 AI Generated Audio Summary</h2>
      </div>

      {/* Language Selector */}
      <LanguageSelector />

      {/* Audio Player */}
      <AudioPlayer 
        language={language}
        lessonId={lessonId}
        isPlaying={isPlaying}
        onPlayPause={setIsPlaying}
      />

      {/* Transcript Panel */}
      <TranscriptPanel 
        language={language}
        lessonId={lessonId}
        isVisible={showTranscript}
        onToggle={setShowTranscript}
      />
    </div>
  );
}
