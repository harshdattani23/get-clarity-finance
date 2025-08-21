"use client";

import { useState, useRef } from 'react';
import { Play, Pause, RotateCcw, Download, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  language: string;
  lessonId: string;
  isPlaying: boolean;
  onPlayPause: (playing: boolean) => void;
}

export default function AudioPlayer({ 
  language, 
  lessonId,
  isPlaying, 
  onPlayPause 
}: AudioPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock audio URL - replace with actual audio files
  const getAudioUrl = () => {
    return `https://storage.googleapis.com/getclarity-audio-bucket/course-summaries/basics-market-fundamentals-${language}.m4a`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        onPlayPause(false);
      } else {
        audioRef.current.play();
        onPlayPause(true);
      }
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = getAudioUrl();
    link.download = `market-fundamentals-summary-${language}.m4a`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-6">
      <audio
        ref={audioRef}
        src={getAudioUrl()}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => onPlayPause(false)}
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
