'use client';

import React, { useState, useRef, useEffect, useContext } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Headphones, CheckCircle, Globe, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageContext } from '@/contexts/LanguageContext';

interface Module1AudioPlayerProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

// Audio file configuration for different languages
const AUDIO_CONFIG = {
  baseUrl: 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/module1/',
  languages: {
    'en': {
      code: 'en',
      name: 'English',
      file: 'english.m4a',
      segments: [
        { title: 'Understanding Stock Market Fraud', start: 0, duration: 160 },
        { title: 'Common Red Flags to Watch For', start: 160, duration: 180 },
        { title: 'Real-world Examples', start: 340, duration: 140 }
      ]
    },
    'hi': {
      code: 'hi',
      name: 'हिंदी (Hindi)',
      file: 'hindi.m4a',
      segments: [
        { title: 'शेयर बाजार धोखाधड़ी को समझना', start: 0, duration: 170 },
        { title: 'देखने योग्य सामान्य लाल झंडे', start: 170, duration: 190 },
        { title: 'वास्तविक जीवन के उदाहरण', start: 360, duration: 150 }
      ]
    },
    'gu': {
      code: 'gu',
      name: 'ગુજરાતી (Gujarati)',
      file: 'gujarati.m4a',
      segments: [
        { title: 'સ્ટોક માર્કેટ ફ્રોડને સમજવું', start: 0, duration: 165 },
        { title: 'જોવા માટેના સામાન્ય લાલ ધ્વજ', start: 165, duration: 185 },
        { title: 'વાસ્તવિક જીવનના ઉદાહરણો', start: 350, duration: 145 }
      ]
    },
    'mr': {
      code: 'mr',
      name: 'मराठी (Marathi)',
      file: 'marathi.m4a',
      segments: [
        { title: 'शेअर मार्केट फसवणूक समजून घेणे', start: 0, duration: 168 },
        { title: 'पाहण्यासाठी सामान्य लाल झेंडे', start: 168, duration: 188 },
        { title: 'वास्तविक जीवनातील उदाहरणे', start: 356, duration: 148 }
      ]
    },
    'ta': {
      code: 'ta',
      name: 'தமிழ் (Tamil)',
      file: 'tamil.m4a',
      segments: [
        { title: 'பங்குச் சந்தை மோசடியைப் புரிந்துகொள்ளுதல்', start: 0, duration: 172 },
        { title: 'கவனிக்க வேண்டிய பொதுவான சிவப்புக் கொடிகள்', start: 172, duration: 192 },
        { title: 'நிஜ வாழ்க்கை உதாரணங்கள்', start: 364, duration: 152 }
      ]
    },
    'te': {
      code: 'te',
      name: 'తెలుగు (Telugu)',
      file: 'telugu.m4a',
      segments: [
        { title: 'స్టాక్ మార్కెట్ మోసం అర్థం చేసుకోవడం', start: 0, duration: 169 },
        { title: 'చూడవలసిన సాధారణ ఎరుపు జెండాలు', start: 169, duration: 189 },
        { title: 'నిజ జీవిత ఉదాహరణలు', start: 358, duration: 149 }
      ]
    },
    'kn': {
      code: 'kn',
      name: 'ಕನ್ನಡ (Kannada)',
      file: 'Kannada.m4a',
      segments: [
        { title: 'ಸ್ಟಾಕ್ ಮಾರ್ಕೆಟ್ ವಂಚನೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು', start: 0, duration: 166 },
        { title: 'ನೋಡಬೇಕಾದ ಸಾಮಾನ್ಯ ಕೆಂಪು ಧ್ವಜಗಳು', start: 166, duration: 186 },
        { title: 'ನಿಜ ಜೀವನದ ಉದಾಹರಣೆಗಳು', start: 352, duration: 146 }
      ]
    },
    'ml': {
      code: 'ml',
      name: 'മലയാളം (Malayalam)',
      file: 'malyalam.m4a',
      segments: [
        { title: 'സ്റ്റോക്ക് മാര്‍ക്കറ്റ് വഞ്ചന മനസ്സിലാക്കുക', start: 0, duration: 171 },
        { title: 'ശ്രദ്ധിക്കേണ്ട സാധാരണ ചുവന്ന പതാകകള്‍', start: 171, duration: 191 },
        { title: 'യഥാര്‍ത്ഥ ജീവിത ഉദാഹരണങ്ങള്‍', start: 362, duration: 151 }
      ]
    },
    'bn': {
      code: 'bn',
      name: 'বাংলা (Bengali)',
      file: 'bengali.m4a',
      segments: [
        { title: 'স্টক মার্কেট জালিয়াতি বোঝা', start: 0, duration: 167 },
        { title: 'দেখার জন্য সাধারণ লাল পতাকা', start: 167, duration: 187 },
        { title: 'বাস্তব জীবনের উদাহরণ', start: 354, duration: 147 }
      ]
    }
  }
};

export default function Module1AudioPlayer({ onComplete, isCompleted }: Module1AudioPlayerProps) {
  const { t } = useTranslation('audio-player');
  const languageContext = useContext(LanguageContext);
  const currentLanguage = languageContext?.language || 'en';
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || 'en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [hasTriggeredComplete, setHasTriggeredComplete] = useState(isCompleted);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get current language config
  const currentAudioConfig = AUDIO_CONFIG.languages[selectedLanguage as keyof typeof AUDIO_CONFIG.languages] || AUDIO_CONFIG.languages.en;
  const audioUrl = `${AUDIO_CONFIG.baseUrl}${currentAudioConfig.file}`;

  // Sync completion state with prop
  useEffect(() => {
    setHasTriggeredComplete(isCompleted);
  }, [isCompleted]);

  // Update selected language when global language changes
  useEffect(() => {
    if (currentLanguage && currentLanguage !== selectedLanguage) {
      setSelectedLanguage(currentLanguage);
      // Reset audio state when language changes
      setCurrentTime(0);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [currentLanguage, selectedLanguage]);

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      setCurrentTime(current);
      
      if (duration > 0) {
        const percentage = (current / duration) * 100;
        setCompletionPercentage(percentage);
        
        // Mark as complete when 80% is reached
        if (percentage >= 80 && !hasTriggeredComplete && onComplete) {
          setHasTriggeredComplete(true);
          onComplete();
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      // Set the playback rate to current state
      audioRef.current.playbackRate = playbackRate;
      setIsLoading(false);
      setError(null);
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleError = (e: any) => {
    console.error('Audio error details:', {
      error: e,
      audioUrl,
      target: e.target,
      networkState: e.target?.networkState,
      readyState: e.target?.readyState,
      errorCode: e.target?.error?.code,
      errorMessage: e.target?.error?.message
    });
    
    let errorMessage = 'Failed to load audio file';
    if (e.target?.error) {
      switch (e.target.error.code) {
        case 1:
          errorMessage = 'Audio loading was aborted';
          break;
        case 2:
          errorMessage = 'Network error - Please check your internet connection';
          break;
        case 3:
          errorMessage = 'Audio file is corrupted or in unsupported format';
          break;
        case 4:
          errorMessage = 'Audio file not found - Please try again later';
          break;
        default:
          errorMessage = 'Unable to load audio file';
      }
    }
    
    setError(errorMessage);
    setIsLoading(false);
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (!hasTriggeredComplete && onComplete) {
      setHasTriggeredComplete(true);
      onComplete();
    }
  };

  const togglePlay = async () => {
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
      console.error('Audio play error:', err);
      setError('Unable to play audio. Please try again.');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - 15);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(duration, audioRef.current.currentTime + 15);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // Update global language context
    if (languageContext?.setLanguage) {
      languageContext.setLanguage(languageCode);
    }
    // Reset audio state when language changes
    setCurrentTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    if (isCompleted) return 'bg-green-500';
    if (completionPercentage >= 80) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const handleChapterJump = (startTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
      setCurrentTime(startTime);
    }
  };

  const getCurrentSegment = () => {
    return currentAudioConfig.segments.find(segment => 
      currentTime >= segment.start && currentTime < segment.start + segment.duration
    ) || currentAudioConfig.segments[0];
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
      {/* Hidden HTML Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Header with Language Selector */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
          <Headphones className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{t('title')}</h3>
          <p className="text-sm text-gray-600">{t('subtitle')} • {formatTime(duration || 480)}</p>
        </div>
        {isCompleted && (
          <CheckCircle className="w-6 h-6 text-green-500" />
        )}
      </div>

      {/* Language Selector */}
      <div className="mb-4 p-3 bg-white/70 rounded-lg border border-purple-200">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-800">{t('select_language')}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.values(AUDIO_CONFIG.languages).map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`p-2 text-xs rounded-lg border transition-all ${
                selectedLanguage === lang.code
                  ? 'bg-purple-100 border-purple-300 text-purple-800 font-medium'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-purple-50'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
        
        {error && (
          <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Current Segment Display */}
      <div className="mb-4 p-3 bg-white/70 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-800">{t('now_playing').replace('{languageName}', currentAudioConfig.name)}</p>
            <p className="text-sm text-gray-700">{getCurrentSegment().title}</p>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
              <span className="text-xs text-purple-600">{t('loading')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Audio Controls */}
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{completionPercentage.toFixed(0)}% Complete</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, ${getProgressColor().replace('bg-', '')} 0%, ${getProgressColor().replace('bg-', '')} ${(currentTime/duration)*100}%, #e5e7eb ${(currentTime/duration)*100}%, #e5e7eb 100%)`
              }}
            />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-lg ${getProgressColor()} pointer-events-none`}
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={skipBackward}
            className="p-2 hover:bg-purple-100 rounded-full transition-colors"
            title="Skip back 15s"
          >
            <SkipBack className="w-5 h-5 text-purple-600" />
          </button>

          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </motion.button>

          <button
            onClick={skipForward}
            className="p-2 hover:bg-purple-100 rounded-full transition-colors"
            title="Skip forward 15s"
          >
            <SkipForward className="w-5 h-5 text-purple-600" />
          </button>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-purple-100 rounded-full transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-purple-600" />
              ) : (
                <Volume2 className="w-5 h-5 text-purple-600" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Playback Speed */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-gray-500">Speed:</span>
          <div className="flex gap-1">
            {[0.75, 1, 1.25, 1.5].map(speed => (
              <button
                key={speed}
                onClick={() => handlePlaybackRateChange(speed)}
                className={`px-2 py-1 text-xs border rounded hover:bg-purple-50 transition-colors ${
                  playbackRate === speed
                    ? 'bg-purple-100 border-purple-300 text-purple-800 font-medium'
                    : 'bg-white border-purple-200 text-gray-700'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Completion Status */}
        {completionPercentage >= 80 && !isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"
          >
            <p className="text-sm text-yellow-800 text-center">
              🎉 Almost done! You've listened to {completionPercentage.toFixed(0)}% of the audio lesson.
            </p>
          </motion.div>
        )}

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-3"
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800 text-center font-medium">
                Audio lesson completed! (+15 XP)
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Chapter List */}
      <div className="mt-6 space-y-2">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Audio Chapters</h4>
        {currentAudioConfig.segments.map((segment, index) => (
          <button
            key={index}
            onClick={() => handleChapterJump(segment.start)}
            className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
              getCurrentSegment().title === segment.title
                ? 'bg-purple-100 border border-purple-300 text-purple-800'
                : 'bg-white/50 hover:bg-white/80 text-gray-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{segment.title}</span>
              <span className="text-xs text-gray-500">
                {formatTime(segment.start)} - {formatTime(segment.start + segment.duration)}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Learning Tips */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <strong>Tip:</strong> This audio lesson complements the video content. 
          Use it for revision or when you prefer audio learning!
        </p>
      </div>
    </div>
  );
}
