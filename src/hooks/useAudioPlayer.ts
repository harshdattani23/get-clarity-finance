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
  currentTime: number;
  duration: number;
  volume: number;
  error: string | null;
  audioUrl: string | null;
}

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
    currentTime: 0,
    duration: 0,
    volume: 1,
    error: null,
    audioUrl: null,
  });

  // Generate the expected audio URL based on existing Google Cloud Storage structure
  const getAudioUrl = useCallback(() => {
    const bucketName = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_AUDIO_BUCKET || 'getclarity-audio-bucket';
    let filePath: string;
    
    if (moduleType === 'section' && sectionId) {
      filePath = `lessons/${courseId}/${sectionId}-${language}.m4a`;
    } else {
      filePath = `lessons/${courseId}/${courseId}-${language}.m4a`;
    }
    
    return `https://storage.googleapis.com/${bucketName}/${filePath}`;
  }, [courseId, language, moduleType, sectionId]);

  // Load audio file
  const loadAudio = useCallback(async () => {
    if (!courseId || !language) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    onLoadStart?.();

    try {
      const audioUrl = getAudioUrl();
      
      // Check if audio file exists
      const response = await fetch(audioUrl, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Audio file not found');
      }

      // Create audio element if it doesn't exist
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

        audioRef.current.addEventListener('ended', () => {
          setState(prev => ({
            ...prev,
            isPlaying: false,
            isPaused: false,
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
          }));
        });
      }

      // Set audio source
      audioRef.current.src = audioUrl;
      
      setState(prev => ({
        ...prev,
        audioUrl,
      }));

      if (autoPlay) {
        await audioRef.current.play();
      }

    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message,
      }));
      onError?.(err);
    }
  }, [courseId, language, moduleType, sectionId, autoPlay, getAudioUrl, onLoadStart, onCanPlay, onEnded, onError]);

  // Play audio
  const play = useCallback(async () => {
    if (!audioRef.current) {
      await loadAudio();
      return;
    }

    try {
      await audioRef.current.play();
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to play audio');
      setState(prev => ({ ...prev, error: err.message }));
      onError?.(err);
    }
  }, [loadAudio, onError]);

  // Pause audio
  const pause = useCallback(() => {
    if (audioRef.current) {
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

  // Seek to position
  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(time, audioRef.current.duration));
    }
  }, []);

  // Set volume (0-1)
  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  }, []);

  // Load audio when dependencies change
  useEffect(() => {
    loadAudio();
  }, [loadAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Format time for display
  const formatTime = useCallback((time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    // State
    ...state,
    
    // Controls
    play,
    pause,
    stop,
    seekTo,
    setVolume,
    toggleMute,
    loadAudio,
    
    // Computed values
    progress: state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0,
    formattedCurrentTime: formatTime(state.currentTime),
    formattedDuration: formatTime(state.duration),
    
    // Audio element reference (for advanced usage)
    audioElement: audioRef.current,
  };
}

export default useAudioPlayer;
