"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface Module1VideoPlayerProps {
  className?: string;
  onComplete?: () => void;
  isCompleted?: boolean;
  defaultLanguage?: string;
  courseId?: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
];

export default function Module1VideoPlayer({ className = '', onComplete, isCompleted = false, defaultLanguage = 'en', courseId }: Module1VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasTriggeredComplete, setHasTriggeredComplete] = useState(isCompleted);
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hardcoded video URLs for each language based on course
  const getVideoUrl = (language: string) => {
    if (courseId === 'intro-to-bonds') {
      // Intro to Bonds course videos
      const bondVideoUrls: { [key: string]: string } = {
        'en': 'https://storage.googleapis.com/getclarity-audio-bucket/videos/intro-to-bonds/intro-to-bonds-video-en.mp4',
        'hi': 'https://storage.googleapis.com/getclarity-audio-bucket/videos/intro-to-bonds/intro-to-bonds-video-hi.mp4',
        'gu': 'https://storage.googleapis.com/getclarity-audio-bucket/videos/intro-to-bonds/intro-to-bonds-video-gu.mp4',
        'mr': 'https://storage.googleapis.com/getclarity-audio-bucket/videos/intro-to-bonds/intro-to-bonds-video-mr.mp4',
        'bn': 'https://storage.googleapis.com/getclarity-audio-bucket/videos/intro-to-bonds/intro-to-bonds-video-bn.mp4',
        'ta': 'https://storage.googleapis.com/getclarity-audio-bucket/videos/intro-to-bonds/intro-to-bonds-video-ta.mp4',
        'te': 'https://storage.googleapis.com/getclarity-audio-bucket/videos/intro-to-bonds/intro-to-bonds-video-te.mp4',
        'kn': 'https://storage.googleapis.com/getclarity-audio-bucket/videos/intro-to-bonds/intro-to-bonds-video-kn.mp4',
        'ml': 'https://storage.googleapis.com/getclarity-audio-bucket/videos/intro-to-bonds/intro-to-bonds-video-ml.mp4',
      };
      return bondVideoUrls[language] || bondVideoUrls['en'];
    } else {
      // Default fraud detection course videos
      const videoUrls: { [key: string]: string } = {
        'en': 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/comprehensive-fraud-schemes/comprehensive-fraud-schemes-video.mp4',
        'hi': 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/comprehensive-fraud-schemes/comprehensive-fraud-schemes-video.mp4',
        'gu': 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/comprehensive-fraud-schemes/comprehensive-fraud-schemes-video.mp4',
        'mr': 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/comprehensive-fraud-schemes/comprehensive-fraud-schemes-video.mp4',
        'bn': 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/comprehensive-fraud-schemes/comprehensive-fraud-schemes-video.mp4',
        'ta': 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/comprehensive-fraud-schemes/comprehensive-fraud-schemes-video.mp4',
        'te': 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/comprehensive-fraud-schemes/comprehensive-fraud-schemes-video.mp4',
        'kn': 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/comprehensive-fraud-schemes/comprehensive-fraud-schemes-video.mp4',
        'ml': 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/comprehensive-fraud-schemes/comprehensive-fraud-schemes-video.mp4',
      };
      return videoUrls[language] || videoUrls['en'];
    }
  };

  const videoUrl = getVideoUrl(selectedLanguage);

  // Generate course-specific thumbnail
  const getThumbnail = () => {
    if (courseId === 'intro-to-bonds') {
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJvbmRHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFkNGVkODtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMyNTYzZWI7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNib25kR3JhZGllbnQpIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMjI1IiByPSI4MCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJvbmRzPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW52ZXN0bWVudCBGdW5kYW1lbnRhbHM8L3RleHQ+PC9zdmc+";
    } else {
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImZyYXVkR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkYzI2MjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZWY0NDQ0O3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZnJhdWRHcmFkaWVudCkiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSIyMjUiIHI9IjgwIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMikiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpIiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSI1MCUiIHk9IjQ1JSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjM2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RnJhdWQgRGV0ZWN0aW9uPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW52ZXN0bWVudCBTZWN1cml0eTwvdGV4dD48L3N2Zz4=";
    }
  };

  // Get font class based on language
  const getFontClass = (langCode: string) => {
    const fontMap: { [key: string]: string } = {
      'hi': 'font-hindi',
      'mr': 'font-marathi',
      'gu': 'font-gujarati',
      'bn': 'font-bengali',
      'ta': 'font-tamil',
      'te': 'font-telugu',
      'kn': 'font-kannada',
      'ml': 'font-malayalam',
      'en': 'font-english'
    };
    return fontMap[langCode] || 'font-english';
  };

  // Reload video when language changes
  useEffect(() => {
    if (videoRef.current) {
      const wasPlaying = isPlaying;
      videoRef.current.load();
      setCurrentTime(0);
      setIsPlaying(false);
      setError(null);
      // Reset completion state when language changes
      setHasTriggeredComplete(isCompleted);
    }
  }, [selectedLanguage, isCompleted]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Sync completion state with prop
  useEffect(() => {
    setHasTriggeredComplete(isCompleted);
  }, [isCompleted]);

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await videoRef.current.play();
        setIsPlaying(true);
        setError(null);
      }
    } catch (err) {
      setError('Error playing video');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Check if video is 90% complete and trigger completion
      const progress = videoRef.current.currentTime / videoRef.current.duration;
      if (progress >= 0.9 && !hasTriggeredComplete && onComplete) {
        setHasTriggeredComplete(true);
        onComplete();
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
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
    setError('Error loading video');
    setIsLoading(false);
    setIsPlaying(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    }
  };

  return (
    <div className={`${className}`}>
      {/* Language Selector */}
      <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Select Language:</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                selectedLanguage === lang.code
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className={`${getFontClass(lang.code)}`}>{lang.nativeName}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className={`relative bg-black rounded-xl overflow-hidden shadow-lg ${isFullscreen ? 'w-full h-full' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onEnded={() => {
          setIsPlaying(false);
          // Also trigger completion on video end if not already triggered
          if (!hasTriggeredComplete && onComplete) {
            setHasTriggeredComplete(true);
            onComplete();
          }
        }}
        className="w-full aspect-video object-contain"
        poster={getThumbnail()}
        preload="metadata"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-center text-white">
            <p className="text-lg mb-2">⚠️ {error}</p>
            <button 
              onClick={() => {
                setError(null);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Play Button Overlay (when paused) */}
      {!isPlaying && !isLoading && !error && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handlePlayPause}
        >
          <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
            <Play className="w-10 h-10 text-gray-800 ml-1" />
          </div>
        </div>
      )}

      {/* Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            disabled={isLoading || !duration}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer video-slider disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / (duration || 1)) * 100}%, #4b5563 ${(currentTime / (duration || 1)) * 100}%, #4b5563 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-300 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayPause}
              disabled={isLoading}
              className="w-10 h-10 bg-white bg-opacity-90 text-gray-800 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
              ) : isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <button
              onClick={handleRestart}
              className="w-8 h-8 bg-white bg-opacity-20 text-white rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="w-8 h-8 text-white hover:text-gray-300 transition-colors"
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
                className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer volume-slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white text-sm">
              {courseId === 'intro-to-bonds' ? 'Introduction to Bonds' : 'Detecting Super-Fraud'} ({languages.find(l => l.code === selectedLanguage)?.name || 'English'})
            </span>
            <button
              onClick={toggleFullscreen}
              className="w-8 h-8 text-white hover:text-gray-300 transition-colors"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .video-slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .video-slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .volume-slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
      </div>
    </div>
  );
}
