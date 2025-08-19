"use client";

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Download, Globe, Languages } from 'lucide-react';

interface AudioSummaryProps {
  title: string;
  description: string;
  hindiAudioUrl: string;
  englishAudioUrl: string;
  bengaliAudioUrl?: string;
  marathiAudioUrl?: string;
  gujaratiAudioUrl?: string;
  tamilAudioUrl?: string;
  hindiTranscript?: string;
  englishTranscript?: string;
  bengaliTranscript?: string;
  marathiTranscript?: string;
  gujaratiTranscript?: string;
  tamilTranscript?: string;
}

type Language = 'hindi' | 'english' | 'bengali' | 'marathi' | 'gujarati' | 'tamil';

export default function AudioSummary({ 
  title, 
  description, 
  hindiAudioUrl, 
  englishAudioUrl,
  bengaliAudioUrl,
  marathiAudioUrl,
  gujaratiAudioUrl,
  tamilAudioUrl,
  hindiTranscript,
  englishTranscript,
  bengaliTranscript,
  marathiTranscript,
  gujaratiTranscript,
  tamilTranscript
}: AudioSummaryProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('hindi');
  const [showTranscript, setShowTranscript] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get current audio URL and transcript based on selected language
  const getCurrentAudioUrl = () => {
    switch (currentLanguage) {
      case 'hindi': return hindiAudioUrl;
      case 'english': return englishAudioUrl;
      case 'bengali': return bengaliAudioUrl;
      case 'marathi': return marathiAudioUrl;
      case 'gujarati': return gujaratiAudioUrl;
      case 'tamil': return tamilAudioUrl;
      default: return hindiAudioUrl;
    }
  };

  const getCurrentTranscript = () => {
    switch (currentLanguage) {
      case 'hindi': return hindiTranscript;
      case 'english': return englishTranscript;
      case 'bengali': return bengaliTranscript;
      case 'marathi': return marathiTranscript;
      case 'gujarati': return gujaratiTranscript;
      case 'tamil': return tamilTranscript;
      default: return hindiTranscript;
    }
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case 'hindi': return 'हिंदी (Hindi)';
      case 'english': return 'English';
      case 'bengali': return 'বাংলা (Bengali)';
      case 'marathi': return 'मराठी (Marathi)';
      case 'gujarati': return 'ગુજરાતી (Gujarati)';
      case 'tamil': return 'தமிழ் (Tamil)';
      default: return 'हिंदी (Hindi)';
    }
  };

  const getLanguageCode = (lang: Language) => {
    switch (lang) {
      case 'hindi': return 'hi';
      case 'english': return 'en';
      case 'bengali': return 'bn';
      case 'marathi': return 'mr';
      case 'gujarati': return 'gu';
      case 'tamil': return 'ta';
      default: return 'hi';
    }
  };

  const currentAudioUrl = getCurrentAudioUrl();
  const currentTranscript = getCurrentTranscript();

  // Get available languages (only include languages that have audio URLs)
  const availableLanguages: Language[] = [
    'hindi',
    'english',
    ...(bengaliAudioUrl ? ['bengali' as Language] : []),
    ...(marathiAudioUrl ? ['marathi' as Language] : []),
    ...(gujaratiAudioUrl ? ['gujarati' as Language] : []),
    ...(tamilAudioUrl ? ['tamil' as Language] : [])
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
    setShowTranscript(false);
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
      const lang = getLanguageCode(currentLanguage);
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-${lang}.m4a`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center gap-2 text-sm">
          <Languages className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-blue-600">Audio Summary</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6">{description}</p>

      {/* AI Generated Audio Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-800">AI Generated Audio</span>
        </div>
        <p className="text-sm text-blue-700">
          This audio content is generated using artificial intelligence to provide high-quality, 
          natural-sounding narration in multiple languages. The AI ensures consistent pronunciation 
          and clear delivery across all supported languages.
        </p>
      </div>

      {/* Language Selector */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Globe className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-800">Choose Language:</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                currentLanguage === lang
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
              }`}
            >
              {getLanguageLabel(lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Player */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <audio
          ref={audioRef}
          src={currentAudioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Main Controls */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handlePlayPause}
            className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          
          <button
            onClick={handleRestart}
            className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDownload}
            className="w-10 h-10 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-300 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${(currentTime / (duration || 1)) * 100}%, #e5e7eb ${(currentTime / (duration || 1)) * 100}%, #e5e7eb 100%)`
            }}
          />
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="w-8 h-8 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Transcript */}
      {currentTranscript && (
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Transcript ({getLanguageLabel(currentLanguage)})
            </h4>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {showTranscript ? 'Show Less' : 'Show More'}
            </button>
          </div>
          
          <div className={`bg-gray-50 rounded-lg p-4 ${
            showTranscript ? 'max-h-96 overflow-y-auto' : 'max-h-24 overflow-hidden'
          }`}>
            <p className="text-gray-700 leading-relaxed">
              {currentTranscript}
            </p>
            {!showTranscript && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent" />
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
