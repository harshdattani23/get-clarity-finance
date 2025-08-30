"use client";

import { useState, useRef, useEffect, useContext } from 'react';
import { Play, Pause, RotateCcw, Download, Volume2, VolumeX, Globe } from 'lucide-react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

interface Language {
  code: string;
  name: string;
  fileName: string;
}

const AVAILABLE_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', fileName: 'english.m4a' },
  { code: 'hi', name: 'Hindi', fileName: 'hindi.m4a' },
  { code: 'bn', name: 'Bengali', fileName: 'bengali.m4a' },
  { code: 'ta', name: 'Tamil', fileName: 'tamil.m4a' },
  { code: 'te', name: 'Telugu', fileName: 'telugu.m4a' },
  { code: 'kn', name: 'Kannada', fileName: 'Kannada.m4a' },
  { code: 'ml', name: 'Malayalam', fileName: 'malyalam.m4a' },
  { code: 'mr', name: 'Marathi', fileName: 'marathi.m4a' },
  { code: 'gu', name: 'Gujarati', fileName: 'gujarati.m4a' },
];

interface Module1AudioPlayerProps {
  className?: string;
}

export default function Module1AudioPlayer({ className = '' }: Module1AudioPlayerProps) {
  const { t } = useTranslation('audio-player');
  const languageContext = useContext(LanguageContext);
  const globalLanguage = languageContext ? languageContext.language : 'en';
  const setGlobalLanguage = languageContext?.setLanguage;
  
  const selectedLanguage = AVAILABLE_LANGUAGES.find(lang => lang.code === globalLanguage) || AVAILABLE_LANGUAGES[0];
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  const getAudioUrl = () => {
    return `https://storage.googleapis.com/getclarity-audio-bucket/lessons/module1/${selectedLanguage.fileName}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setError(null);
      setIsLoading(true);
    }
  }, [selectedLanguage]);

  const handleLanguageChange = (language: Language) => {
    if (setGlobalLanguage) {
      setGlobalLanguage(language.code);
    }
  };

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setError(null);
      }
    } catch (err) {
      setError(t('error_play') as string);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
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
      setIsLoading(false);
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleError = () => {
    setError(t('error_load') as string);
    setIsLoading(false);
    setIsPlaying(false);
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
    setIsMuted(newVolume === 0);
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = getAudioUrl();
    link.download = `module1-${selectedLanguage.code}.m4a`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-100 ${className}`}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          {t('title') as string}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('subtitle') as string}
          <br />
          <span className="text-blue-600 font-medium">{t('tip') as string}</span>
        </p>
      </div>

      {/* Language Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('select_language') as string}
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {AVAILABLE_LANGUAGES.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                selectedLanguage.code === language.code
                  ? 'bg-blue-600 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={getAudioUrl()}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Main Controls */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </button>

        <button
          onClick={handleRestart}
          className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={handleDownload}
          className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-all duration-200"
        >
          <Download className="w-4 h-4" />
        </button>

        <div className="flex-1 ml-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">
              {(t('now_playing') as string).replace('{languageName}', selectedLanguage.name)}
            </p>
            <p className="text-xs text-gray-500">
              {isLoading ? `${t('loading') as string}` : `${formatTime(currentTime)} / ${formatTime(duration)}`}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          disabled={isLoading || !duration}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(currentTime / (duration || 1)) * 100}%, #e5e7eb ${(currentTime / (duration || 1)) * 100}%, #e5e7eb 100%)`
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
          style={{
            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`
          }}
        />
        <span className="text-xs text-gray-500 min-w-[3rem]">
          {Math.round((isMuted ? 0 : volume) * 100)}%
        </span>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider:disabled::-webkit-slider-thumb {
          background: #9ca3af;
          cursor: not-allowed;
        }
        .slider:disabled::-moz-range-thumb {
          background: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}