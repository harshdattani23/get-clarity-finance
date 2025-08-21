"use client";

import { useState } from 'react';
import { Play, Pause, RotateCcw, Download, Volume2, VolumeX, Globe } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import AudioPlayer from './AudioPlayer';
import TranscriptPanel from './TranscriptPanel';

interface AudioLearningModeProps {
  language: string;
  onLanguageChange: (language: string) => void;
  lessonId: string;
}

export default function AudioLearningMode({ 
  language, 
  onLanguageChange,
  lessonId 
}: AudioLearningModeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <h2 className="text-xl font-bold text-gray-800">🤖 AI Generated Audio Summary</h2>
      </div>

      {/* Language Selector */}
      <LanguageSelector 
        currentLanguage={language}
        onLanguageChange={onLanguageChange}
      />

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
