"use client";

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Download, List, Shuffle, Repeat, SkipBack, SkipForward } from 'lucide-react';

interface LessonAudio {
  id: string;
  title: string;
  audioUrl: string;
  duration: number;
  transcript?: string;
}

interface CourseAudioPlaylistProps {
  courseTitle: string;
  courseDescription: string;
  lessons: LessonAudio[];
  onLessonComplete?: (lessonId: string) => void;
}

export default function CourseAudioPlaylist({ 
  courseTitle, 
  courseDescription, 
  lessons, 
  onLessonComplete 
}: CourseAudioPlaylistProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [playMode, setPlayMode] = useState<'sequential' | 'shuffle' | 'repeat'>('sequential');
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentLesson = lessons[currentLessonIndex];

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
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

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleLessonSelect = (index: number) => {
    setCurrentLessonIndex(index);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onLessonComplete) {
      onLessonComplete(currentLesson.id);
    }
    
    // Auto-advance based on play mode
    if (playMode === 'repeat') {
      // Restart current lesson
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else if (currentLessonIndex < lessons.length - 1) {
      // Go to next lesson
      handleNext();
    }
  };

  const togglePlayMode = () => {
    const modes: Array<'sequential' | 'shuffle' | 'repeat'> = ['sequential', 'shuffle', 'repeat'];
    const currentIndex = modes.indexOf(playMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setPlayMode(modes[nextIndex]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentLesson.audioUrl;
    link.download = `${courseTitle.replace(/\s+/g, '-').toLowerCase()}-${currentLesson.title.replace(/\s+/g, '-').toLowerCase()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPlayModeIcon = () => {
    switch (playMode) {
      case 'shuffle': return <Shuffle className="w-4 h-4" />;
      case 'repeat': return <Repeat className="w-4 h-4" />;
      default: return <List className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{courseTitle}</h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-blue-600">Course Audio Playlist</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6">{courseDescription}</p>

      {/* Course Progress */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-800">Course Progress</span>
          <span className="text-sm text-blue-600">{currentLessonIndex + 1} of {lessons.length} lessons</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentLessonIndex + 1) / lessons.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Lesson Info */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Now Playing:</h4>
        <p className="text-gray-600">{currentLesson.title}</p>
      </div>

      {/* Audio Player */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <audio
          ref={audioRef}
          src={currentLesson.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
        
        {/* Main Controls */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handlePrevious}
            disabled={currentLessonIndex === 0}
            className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button
            onClick={handlePlayPause}
            className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentLessonIndex === lessons.length - 1}
            className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleRestart}
            className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            onClick={togglePlayMode}
            className="w-10 h-10 bg-purple-200 text-purple-600 rounded-full flex items-center justify-center hover:bg-purple-300 transition-colors"
          >
            {getPlayModeIcon()}
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

      {/* Playlist Toggle */}
      <div className="mb-4">
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <List className="w-4 h-4" />
          {showPlaylist ? 'Hide Playlist' : 'Show Playlist'}
        </button>
      </div>

      {/* Lesson Playlist */}
      {showPlaylist && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Course Lessons</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => handleLessonSelect(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  index === currentLessonIndex
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{(index + 1).toString().padStart(2, '0')}</span>
                    <span className="font-medium">{lesson.title}</span>
                  </div>
                  <span className="text-sm text-gray-500">{formatTime(lesson.duration)}</span>
                </div>
              </button>
            ))}
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
