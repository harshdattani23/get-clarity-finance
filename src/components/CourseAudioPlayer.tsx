'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Loader2, Globe } from 'lucide-react';
import useAudioPlayer from '@/hooks/useAudioPlayer';
import { LanguageCode, CourseId, LANGUAGE_INFO } from '@/lib/models/audio';

interface CourseAudioPlayerProps {
  courseId: CourseId;
  language: LanguageCode;
  moduleType?: 'main' | 'section';
  sectionId?: string;
  className?: string;
  showFullControls?: boolean;
  onComplete?: () => void;
  isCompleted?: boolean;
  defaultLanguage?: LanguageCode;
}

export default function CourseAudioPlayer({
  courseId,
  language,
  moduleType = 'main',
  sectionId,
  className = '',
  showFullControls = true,
  onComplete,
  isCompleted = false,
  defaultLanguage,
}: CourseAudioPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(defaultLanguage || language);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  // Available languages for audio (matching the uploaded files)
  const availableLanguages: LanguageCode[] = ['en', 'hi', 'gu', 'mr', 'bn', 'ta', 'te', 'kn', 'ml'];

  const {
    isLoading,
    isPlaying,
    currentTime,
    duration,
    volume,
    error,
    progress,
    formattedCurrentTime,
    formattedDuration,
    play,
    pause,
    seekTo,
    setVolume,
    toggleMute,
  } = useAudioPlayer({
    courseId,
    language: currentLanguage,
    moduleType,
    sectionId,
    onEnded: () => {
      console.log('Audio playback ended');
      onComplete?.();
    },
    onError: (error) => {
      console.error('Audio playback error:', error);
    },
  });

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };

  const handleSkipBackward = () => {
    seekTo(Math.max(0, currentTime - 10)); // Skip back 10 seconds
  };

  const handleSkipForward = () => {
    seekTo(Math.min(duration, currentTime + 10)); // Skip forward 10 seconds
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    toggleMute();
  };

  const handleLanguageChange = (newLanguage: LanguageCode) => {
    setCurrentLanguage(newLanguage);
    setShowLanguageMenu(false);
  };

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };

    if (showLanguageMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageMenu]);

  if (error) {
    return (
      <div className={`flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <p className="text-red-600 text-sm">
          Audio not available in this language yet. Please check back later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg ${className}`}>
        <Loader2 className="w-5 h-5 animate-spin text-gray-400 mr-2" />
        <p className="text-gray-600 text-sm">Loading audio...</p>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      {/* Language Selector */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Audio Language:</span>
          <div className="relative" ref={languageMenuRef}>
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
            >
              <Globe className="w-4 h-4" />
              <span>{LANGUAGE_INFO[currentLanguage]?.flag} {LANGUAGE_INFO[currentLanguage]?.name}</span>
            </button>
            
            {showLanguageMenu && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                <div className="py-1 max-h-48 overflow-y-auto">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                        currentLanguage === lang ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{LANGUAGE_INFO[lang]?.flag}</span>
                      <span className="text-sm font-medium">{LANGUAGE_INFO[lang]?.name}</span>
                      <span className="text-xs text-gray-500 ml-auto">{LANGUAGE_INFO[lang]?.nativeName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {currentLanguage !== (defaultLanguage || language) && (
          <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
            Audio will reload in {LANGUAGE_INFO[currentLanguage]?.name}
          </div>
        )}
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative group"
          onClick={handleProgressClick}
        >
          <div
            className="h-2 bg-blue-500 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
          {/* Progress indicator */}
          <div
            className="absolute top-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formattedCurrentTime}</span>
          <span>{formattedDuration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Skip Backward */}
          {showFullControls && (
            <button
              onClick={handleSkipBackward}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Skip backward 10s"
            >
              <SkipBack className="w-5 h-5" />
            </button>
          )}

          {/* Play/Pause Button */}
          <button
            onClick={isPlaying ? pause : play}
            className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </button>

          {/* Skip Forward */}
          {showFullControls && (
            <button
              onClick={handleSkipForward}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Skip forward 10s"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Volume Controls */}
        {showFullControls && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMuteToggle}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            {/* Volume Slider */}
            <div className="hidden sm:flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        )}
      </div>

      {/* Audio Info */}
      <div className="mt-3 text-center">
        <p className="text-sm text-gray-600">
          {moduleType === 'section' && sectionId ? `Section: ${sectionId}` : 'Main Audio'}
        </p>
      </div>
    </div>
  );
}

// CSS for custom slider styling (add to your global CSS)
export const audioPlayerStyles = `
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 16px;
  width: 16px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  height: 16px;
  width: 16px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}
`;
