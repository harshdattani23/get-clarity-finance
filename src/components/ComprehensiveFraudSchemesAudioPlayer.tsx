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

interface ComprehensiveFraudSchemesAudioPlayerProps {
  className?: string;
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
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
];

// Audio configuration from Google Cloud Storage bucket for Comprehensive Fraud Schemes
const AUDIO_BASE_URL = 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/comprehensive-fraud-schemes/';

// Actual audio tracks from your Google Cloud bucket
const audioTracks: AudioTrack[] = [
  { 
    id: 'comprehensive-fraud-schemes-en', 
    title: 'Comprehensive Fraud Schemes: Advanced Detection & Prevention', 
    duration: '12:15', 
    language: 'en', 
    audioUrl: `${AUDIO_BASE_URL}comprehensive-fraud-schemes-en.m4a` 
  },
  { 
    id: 'comprehensive-fraud-schemes-hi', 
    title: 'व्यापक धोखाधड़ी योजनाएं: उन्नत पहचान और रोकथाम', 
    duration: '12:45', 
    language: 'hi', 
    audioUrl: `${AUDIO_BASE_URL}comprehensive-fraud-schemes-hi.m4a` 
  },
  { 
    id: 'comprehensive-fraud-schemes-gu', 
    title: 'વ્યાપક છેતરપિંડી યોજનાઓ: અદ્યતન શોધ અને રોકથામ', 
    duration: '12:30', 
    language: 'gu', 
    audioUrl: `${AUDIO_BASE_URL}comprehensive-fraud-schemes-gu.m4a` 
  },
  { 
    id: 'comprehensive-fraud-schemes-mr', 
    title: 'सर्वसमावेशक फसवणूक योजना: प्रगत शोध आणि प्रतिबंध', 
    duration: '12:38', 
    language: 'mr', 
    audioUrl: `${AUDIO_BASE_URL}comprehensive-fraud-schemes-mr.m4a` 
  },
  { 
    id: 'comprehensive-fraud-schemes-ta', 
    title: 'விரிவான மோசடி திட்டங்கள்: மேம்பட்ட கண்டறிதல் & தடுப்பு', 
    duration: '12:55', 
    language: 'ta', 
    audioUrl: `${AUDIO_BASE_URL}comprehensive-fraud-schemes-ta.m4a` 
  },
  { 
    id: 'comprehensive-fraud-schemes-te', 
    title: 'సమగ్ర మోసం పథకాలు: అధునాతన గుర్తింపు & నివారణ', 
    duration: '12:42', 
    language: 'te', 
    audioUrl: `${AUDIO_BASE_URL}comprehensive-fraud-schemes-te.m4a` 
  },
  { 
    id: 'comprehensive-fraud-schemes-kn', 
    title: 'ಸಮಗ್ರ ವಂಚನೆ ಯೋಜನೆಗಳು: ಸುಧಾರಿತ ಪತ್ತೆ ಮತ್ತು ತಡೆಗಟ್ಟುವಿಕೆ', 
    duration: '12:28', 
    language: 'kn', 
    audioUrl: `${AUDIO_BASE_URL}comprehensive-fraud-schemes-kn.m4a` 
  },
  { 
    id: 'comprehensive-fraud-schemes-ml', 
    title: 'സമഗ്ര വഞ്ചന പദ്ധതികള്‍: നൂതന കണ്ടെത്തല് & തടയല്‍', 
    duration: '12:52', 
    language: 'ml', 
    audioUrl: `${AUDIO_BASE_URL}comprehensive-fraud-schemes-ml.m4a` 
  },
  { 
    id: 'comprehensive-fraud-schemes-bn', 
    title: 'বিস্তৃত জালিয়াতি পরিকল্পনা: উন্নত সনাক্তকরণ ও প্রতিরোধ', 
    duration: '12:35', 
    language: 'bn', 
    audioUrl: `${AUDIO_BASE_URL}comprehensive-fraud-schemes-bn.m4a` 
  }
];

const ComprehensiveFraudSchemesAudioPlayer = ({ className = "", defaultLanguage = 'en', onComplete, isCompleted }: ComprehensiveFraudSchemesAudioPlayerProps) => {
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
      
      // Award XP when 80% completion is reached
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
      setIsPlaying(false);
      setCurrentTime(0);
      // Award XP when audio ends completely
      if (onComplete && !isCompleted) {
        onComplete();
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
  }, [onComplete, isCompleted, duration]);

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
      'en': 'font-english'
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

export default ComprehensiveFraudSchemesAudioPlayer;
