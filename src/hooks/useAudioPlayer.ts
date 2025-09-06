'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { LanguageCode, CourseId } from '@/lib/models/audio';

interface AudioPlayerOptions {
  courseId: CourseId;
  language: LanguageCode;
  moduleType?: 'main' | 'section';
  sectionId?: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  onError?: (error: Error) => void;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
}

interface AudioPlayerState {
  isLoading: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  error: string | null;
  audioUrl: string | null;
  bufferProgress: number;
}

const SUPPORTED_LANGUAGES: LanguageCode[] = [
  'en', 'hi', 'gu', 'mr', 'ta', 'te', 'kn', 'ml', 'bn', 'pa'
];

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function useAudioPlayer(options: AudioPlayerOptions) {
  const {
    courseId,
    language,
    moduleType = 'main',
    sectionId,
    autoPlay = false,
    onEnded,
    onError,
    onLoadStart,
    onCanPlay,
  } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isLoading: false,
    isPlaying: false,
    isPaused: false,
    isMuted: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playbackRate: 1,
    error: null,
    audioUrl: null,
    bufferProgress: 0,
  });

  // Generate the expected audio URL based on Google Cloud Storage structure
  const getAudioUrl = useCallback(() => {
    if (!courseId || !language) return null;
    
    // Validate language support
    if (!SUPPORTED_LANGUAGES.includes(language)) {
      console.warn(`Language ${language} not supported, falling back to English`);
      return null;
    }

    const bucketName = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_AUDIO_BUCKET || 'getclarity-audio-bucket';
    let filePath: string;
    
    // Try multiple possible file path patterns
    const possiblePaths = [];
    
    if (moduleType === 'section' && sectionId) {
      possiblePaths.push(`lessons/${courseId}/${sectionId}-${language}.m4a`);
      possiblePaths.push(`lessons/${courseId}/${sectionId}_${language}.m4a`);
      possiblePaths.push(`lessons/${sectionId}/${sectionId}-${language}.m4a`);
    } else {
      // Common patterns for course audio files
      possiblePaths.push(`lessons/${courseId}/${courseId}-${language}.m4a`);
      possiblePaths.push(`lessons/${courseId}/${courseId}_${language}.m4a`);
      possiblePaths.push(`${courseId}/${courseId}-${language}.m4a`);
      possiblePaths.push(`${courseId}-${language}.m4a`);
      possiblePaths.push(`audio/${courseId}-${language}.m4a`);
      possiblePaths.push(`courses/${courseId}/${courseId}-${language}.m4a`);
    }
    
    // Return the first path for now, we'll try all of them in loadAudio
    filePath = possiblePaths[0];
    
    const url = `https://storage.googleapis.com/${bucketName}/${filePath}`;
    console.log('Generated primary audio URL:', url);
    console.log('All possible paths to try:', possiblePaths);
    return { url, possiblePaths, bucketName };
  }, [courseId, language, moduleType, sectionId]);

  // Check if audio file exists at URL
  const checkAudioExists = useCallback(async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('Error checking audio file:', error);
      return false;
    }
  }, []);

  // Load audio file using hardcoded mappings
  const loadAudio = useCallback(async () => {
    if (!courseId || !language) {
      setState(prev => ({ ...prev, error: 'Missing courseId or language' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    onLoadStart?.();

    try {
      const audioUrl = getAudioUrl();
      
      if (!audioUrl) {
        throw new Error(`No audio mapping found for courseId: ${courseId} in language: ${language}`);
      }

      console.log(`Loading audio for courseId: ${courseId}, language: ${language}`);
      console.log(`Audio URL: ${audioUrl}`);
      
      // Verify the audio file exists
      const audioExists = await checkAudioExists(audioUrl.url);
      
      if (!audioExists) {
        throw new Error(`Audio file not found at: ${audioUrl.url}`);
      }

      // Create or update audio element
      if (!audioRef.current) {
        audioRef.current = new Audio();
        
        // Set up event listeners
        audioRef.current.addEventListener('loadedmetadata', () => {
          setState(prev => ({
            ...prev,
            duration: audioRef.current?.duration || 0,
            isLoading: false,
          }));
          onCanPlay?.();
        });

        audioRef.current.addEventListener('timeupdate', () => {
          setState(prev => ({
            ...prev,
            currentTime: audioRef.current?.currentTime || 0,
          }));
        });

        audioRef.current.addEventListener('progress', () => {
          if (audioRef.current && audioRef.current.buffered.length > 0) {
            const bufferEnd = audioRef.current.buffered.end(audioRef.current.buffered.length - 1);
            const duration = audioRef.current.duration;
            const bufferProgress = duration > 0 ? (bufferEnd / duration) * 100 : 0;
            
            setState(prev => ({
              ...prev,
              bufferProgress,
            }));
          }
        });

        audioRef.current.addEventListener('ended', () => {
          setState(prev => ({
            ...prev,
            isPlaying: false,
            isPaused: false,
            currentTime: 0,
          }));
          onEnded?.();
        });

        audioRef.current.addEventListener('play', () => {
          setState(prev => ({
            ...prev,
            isPlaying: true,
            isPaused: false,
          }));
        });

        audioRef.current.addEventListener('pause', () => {
          setState(prev => ({
            ...prev,
            isPlaying: false,
            isPaused: true,
          }));
        });

        audioRef.current.addEventListener('error', (e) => {
          console.error('Audio error:', e);
          const error = new Error('Failed to load audio');
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: error.message,
          }));
          onError?.(error);
        });

        audioRef.current.addEventListener('volumechange', () => {
          setState(prev => ({
            ...prev,
            volume: audioRef.current?.volume || 1,
            isMuted: audioRef.current?.muted || false,
          }));
        });

        audioRef.current.addEventListener('ratechange', () => {
          setState(prev => ({
            ...prev,
            playbackRate: audioRef.current?.playbackRate || 1,
          }));
        });
      }

      // Set audio source and properties
      audioRef.current.src = audioUrl.url;
      audioRef.current.preload = 'metadata';
      
      setState(prev => ({
        ...prev,
        audioUrl: audioUrl.url,
      }));

      if (autoPlay) {
        await audioRef.current.play();
      }

    } catch (error) {
      console.error('Audio loading error:', error);
      const err = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message,
      }));
      onError?.(err);
    }
  }, [courseId, language, autoPlay, getAudioUrl, checkAudioExists, onLoadStart, onCanPlay, onEnded, onError]);

  // Play audio
  const play = useCallback(async () => {
    if (!audioRef.current) {
      await loadAudio();
      return;
    }

    try {
      await audioRef.current.play();
    } catch (error) {
      console.error('Play error:', error);
      const err = error instanceof Error ? error : new Error('Failed to play audio');
      setState(prev => ({ ...prev, error: err.message }));
      onError?.(err);
    }
  }, [loadAudio, onError]);

  // Pause audio
  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, []);

  // Stop audio
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  // Seek to position (percentage or time in seconds)
  const seekTo = useCallback((value: number, isPercentage = false) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      if (duration > 0) {
        const targetTime = isPercentage ? (value / 100) * duration : value;
        audioRef.current.currentTime = Math.max(0, Math.min(targetTime, duration));
      }
    }
  }, []);

  // Set volume (0-1)
  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      audioRef.current.volume = clampedVolume;
      if (clampedVolume > 0 && audioRef.current.muted) {
        audioRef.current.muted = false;
      }
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  }, []);

  // Set playback speed
  const setPlaybackRate = useCallback((rate: number) => {
    if (audioRef.current && PLAYBACK_SPEEDS.includes(rate)) {
      audioRef.current.playbackRate = rate;
    }
  }, []);

  // Skip forward/backward
  const skip = useCallback((seconds: number) => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime + seconds;
      seekTo(newTime);
    }
  }, [seekTo]);

  // Load audio when dependencies change
  useEffect(() => {
    loadAudio();
  }, [courseId, language, moduleType, sectionId, autoPlay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  // Format time for display
  const formatTime = useCallback((time: number): string => {
    if (!time || isNaN(time)) return '0:00';
    
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    // State
    ...state,
    
    // Enhanced Controls
    play,
    pause,
    stop,
    togglePlayPause,
    seekTo,
    skip,
    setVolume,
    toggleMute,
    setPlaybackRate,
    loadAudio,
    
    // Computed values
    progress: state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0,
    formattedCurrentTime: formatTime(state.currentTime),
    formattedDuration: formatTime(state.duration),
    isAudioAvailable: !!state.audioUrl && !state.error,
    
    // Configuration
    supportedLanguages: SUPPORTED_LANGUAGES,
    availablePlaybackSpeeds: PLAYBACK_SPEEDS,
    
    // Audio element reference (for advanced usage)
    audioElement: audioRef.current,
  };
}

export default useAudioPlayer;
