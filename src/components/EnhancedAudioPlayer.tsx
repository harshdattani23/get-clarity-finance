'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface AudioTrack {
  id: string;
  title: string;
  duration: string;
  language: string;
  audioUrl: string;
}

interface EnhancedAudioPlayerProps {
  className?: string;
  courseId?: string;
  defaultLanguage?: string;
  onComplete?: () => void;
  isCompleted?: boolean;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుগు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
];

// Audio configuration from Google Cloud Storage bucket
const AUDIO_BASE_URL = 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/module1/';

// Actual audio tracks from your Google Cloud bucket
const audioTracks: AudioTrack[] = [
  { 
    id: 'module1-en', 
    title: 'Module 1: Understanding Stock Market Frauds', 
    duration: '8:40', 
    language: 'en', 
    audioUrl: `${AUDIO_BASE_URL}english.m4a` 
  },
  { 
    id: 'module1-hi', 
    title: 'मॉड्यूल 1: शेयर बाजार धोखाधड़ी को समझना', 
    duration: '8:50', 
    language: 'hi', 
    audioUrl: `${AUDIO_BASE_URL}hindi.m4a` 
  },
  { 
    id: 'module1-gu', 
    title: 'મોડ્યુલ 1: સ્ટોક માર્કેટ ફ્રોડને સમજવું', 
    duration: '8:30', 
    language: 'gu', 
    audioUrl: `${AUDIO_BASE_URL}gujarati.m4a` 
  },
  { 
    id: 'module1-mr', 
    title: 'मॉड्यूल 1: शेअर मार्केट फसवणूक समजून घेणे', 
    duration: '8:48', 
    language: 'mr', 
    audioUrl: `${AUDIO_BASE_URL}marathi.m4a` 
  },
  { 
    id: 'module1-ta', 
    title: 'தொகுதி 1: பங்குச் சந்தை மோசடியைப் புரிந்துகொள்ளுதல்', 
    duration: '9:04', 
    language: 'ta', 
    audioUrl: `${AUDIO_BASE_URL}tamil.m4a` 
  },
  { 
    id: 'module1-te', 
    title: 'మాడ్యూల్ 1: స్టాక్ మార్కెట్ మోసం అర్థం చేసుకోవడం', 
    duration: '8:58', 
    language: 'te', 
    audioUrl: `${AUDIO_BASE_URL}telugu.m4a` 
  },
  { 
    id: 'module1-kn', 
    title: 'ಮಾಡ್ಯೂಲ್ 1: ಸ್ಟಾಕ್ ಮಾರ್ಕೆಟ್ ವಂಚನೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು', 
    duration: '8:32', 
    language: 'kn', 
    audioUrl: `${AUDIO_BASE_URL}Kannada.m4a` 
  },
  { 
    id: 'module1-ml', 
    title: 'മൊഡ്യൂൾ 1: സ്റ്റോക്ക് മാര്‍ക്കറ്റ് വഞ്ചന മനസ്സിലാക്കുക', 
    duration: '9:02', 
    language: 'ml', 
    audioUrl: `${AUDIO_BASE_URL}malyalam.m4a` 
  },
  { 
    id: 'module1-bn', 
    title: 'মডিউল ১: স্টক মার্কেট জালিয়াতি বোঝা', 
    duration: '8:47', 
    language: 'bn', 
    audioUrl: `${AUDIO_BASE_URL}bengali.m4a` 
  }
];

const EnhancedAudioPlayer = ({ className = "", courseId, defaultLanguage = 'en', onComplete, isCompleted }: EnhancedAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Enhanced Controls
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'track' | 'playlist'>('none');
  const [showSettings, setShowSettings] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  
  // Track Management
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [filteredTracks, setFilteredTracks] = useState<AudioTrack[]>([]);
  
  // Filter tracks by selected language
  useEffect(() => {
    const tracks = audioTracks.filter(track => track.language === selectedLanguage);
    setFilteredTracks(tracks);
    // Reset track index to 0 when language changes
    setCurrentTrackIndex(0);
    // Reset player state
    setCurrentTime(0);
    setIsPlaying(false);
    setError(null);
  }, [selectedLanguage]);

  const currentTrack = filteredTracks[currentTrackIndex];

  // Audio Event Handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      
      // Award XP when 80% completion is reached (like the original system)
      if (onComplete && !isCompleted && duration > 0) {
        const progress = (audio.currentTime / duration) * 100;
        if (progress >= 80) {
          onComplete();
        }
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    const handleEnded = () => {
      if (repeatMode === 'track') {
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === 'playlist' || currentTrackIndex < filteredTracks.length - 1) {
        handleNext();
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    const handleError = (e: any) => {
      setError('Failed to load audio. Please check your connection.');
      setIsLoading(false);
      console.error('Audio error:', e);
    };

    const handleVolumeChange = () => {
      setVolume(audio.volume);
      setIsMuted(audio.muted);
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('volumechange', handleVolumeChange);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [repeatMode, currentTrackIndex, filteredTracks.length]);

  // Load current track
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
      setError(null);
    }
  }, [currentTrack]);

  // Control Functions
  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        setError('Failed to play audio. Please try again.');
        console.error('Play error:', err);
      });
    }
  }, [isPlaying, currentTrack]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVolume = parseFloat(e.target.value) / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleSpeedChange = useCallback((speed: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  }, []);

  const skip = useCallback((seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration));
    audioRef.current.currentTime = newTime;
  }, [duration]);

  const handlePrevious = useCallback(() => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    } else if (repeatMode === 'playlist') {
      setCurrentTrackIndex(filteredTracks.length - 1);
    }
  }, [currentTrackIndex, repeatMode, filteredTracks.length]);

  const handleNext = useCallback(() => {
    if (currentTrackIndex < filteredTracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else if (repeatMode === 'playlist') {
      setCurrentTrackIndex(0);
    }
  }, [currentTrackIndex, repeatMode, filteredTracks.length]);

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const selectedLangData = languages.find(lang => lang.code === selectedLanguage);

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  
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
      'en': 'font-english',
      'en-IN': 'font-hinglish'
    };
    return fontMap[langCode] || 'font-english';
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <audio ref={audioRef} preload="metadata" />
      
      {/* Language Selector Bar */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Select Language:</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
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


      {/* Progress Section */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span className="font-mono">{formatTime(currentTime)}</span>
          <span className="font-mono">{formatTime(duration)}</span>
        </div>
        
        <div className="relative group">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={!currentTrack || isLoading}
          />
        </div>
      </div>

      {/* Main Controls */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handlePrevious}
            disabled={!currentTrack}
            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Previous Track"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => skip(-10)}
            disabled={!currentTrack}
            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Rewind 10s"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlayPause}
            disabled={!currentTrack || isLoading}
            className="p-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white transition-all duration-200 shadow-md"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </button>

          <button
            onClick={() => skip(10)}
            disabled={!currentTrack}
            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Forward 10s"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={!currentTrack}
            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Next Track"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          {/* Volume Control */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            
            <div className="w-20">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume * 100}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <span className="text-xs text-gray-500 w-8 text-center">
              {Math.round(isMuted ? 0 : volume * 100)}%
            </span>
          </div>

          {/* Speed Control */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 font-medium">Speed:</span>
            <div className="flex space-x-1">
              {speedOptions.map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-2 py-1 text-xs rounded transition-all ${
                    playbackRate === speed
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
          
          {/* Completion Status */}
          {isCompleted && (
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Completed</span>
            </div>
          )}
        </div>
        
        {/* Status */}
        {error && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedAudioPlayer;
