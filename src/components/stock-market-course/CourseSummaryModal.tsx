"use client";

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Download, X, Globe } from 'lucide-react';

interface CourseSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  courseDescription: string;
  audioFiles: {
    en: string;
    hi: string;
    bn?: string;
    mr?: string;
    gu?: string;
    ta?: string;
  };
  transcripts: {
    en: string;
    hi: string;
    bn?: string;
    mr?: string;
    gu?: string;
    ta?: string;
  };
}

type Language = 'en' | 'hi' | 'bn' | 'mr' | 'gu' | 'ta';

export default function CourseSummaryModal({ 
  isOpen, 
  onClose, 
  courseTitle, 
  audioFiles, 
  transcripts 
}: CourseSummaryModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('hi');
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const getCurrentAudioUrl = () => {
    return audioFiles[currentLanguage] || audioFiles.hi;
  };

  const getCurrentTranscript = () => {
    return transcripts[currentLanguage] || transcripts.hi;
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case 'hi': return 'हिंदी (Hindi)';
      case 'en': return 'English';
      case 'bn': return 'বাংলা (Bengali)';
      case 'mr': return 'मराठी (Marathi)';
      case 'gu': return 'ગુજરાતી (Gujarati)';
      case 'ta': return 'தமிழ் (Tamil)';
      default: return 'हिंदी (Hindi)';
    }
  };

  const currentAudioUrl = getCurrentAudioUrl();
  const currentTranscript = getCurrentTranscript();

  const availableLanguages: Language[] = [
    'hi',
    'en',
    ...(audioFiles.bn ? ['bn' as Language] : []),
    ...(audioFiles.mr ? ['mr' as Language] : []),
    ...(audioFiles.gu ? ['gu' as Language] : []),
    ...(audioFiles.ta ? ['ta' as Language] : [])
  ];

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      const newAudioUrl = getCurrentAudioUrl();
      if (newAudioUrl) {
        audioRef.current.src = newAudioUrl;
        audioRef.current.load();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    const audioUrl = getCurrentAudioUrl();
    if (audioUrl) {
      link.href = audioUrl;
      const lang = currentLanguage;
      link.download = `${courseTitle.replace(/\s+/g, '-').toLowerCase()}-summary-${lang}.m4a`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md mx-auto shadow-2xl max-h-[70vh] overflow-hidden">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800 truncate">{courseTitle}</h2>
            <p className="text-gray-600 text-sm">🤖 AI Generated Audio Summary</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[calc(70vh-80px)] p-4">


          {/* Language Selector */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-800 text-sm">Choose Language:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
                    currentLanguage === lang
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {getLanguageLabel(lang)}
                </button>
              ))}
            </div>
          </div>

          {/* Audio Player */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <audio
              ref={audioRef}
              src={currentAudioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            
            {/* Main Controls */}
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={handlePlayPause}
                className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              
              <button
                onClick={handleRestart}
                className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
              
              <button
                onClick={handleDownload}
                className="w-8 h-8 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-300 transition-colors"
              >
                <Download className="w-3 h-3" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${(currentTime / (duration || 1)) * 100}%, #e5e7eb ${(currentTime / (duration || 1)) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Transcript */}
          {currentTranscript && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-800">
                  Transcript ({getLanguageLabel(currentLanguage)})
                </h4>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {currentTranscript}
                </p>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: #10b981;
            cursor: pointer;
          }
          .slider::-moz-range-thumb {
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: #10b981;
            cursor: pointer;
            border: none;
          }
        `}</style>
      </div>
    </div>
  );
}

