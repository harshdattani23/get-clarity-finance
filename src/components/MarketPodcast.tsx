'use client';

import React, { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiRefreshCw, FiClock, FiTrendingUp, FiAlertCircle, FiExternalLink, FiGlobe } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { getEnabledPodcastLanguages, DEFAULT_PODCAST_LANGUAGE } from '@/config/podcastLanguages';

interface PodcastNewsItem {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  category: 'sebi' | 'rbi' | 'policy';
  importance: 'high' | 'medium' | 'low';
  sources: Array<{
    title: string;
    url: string;
    publishedAt?: string;
  }>;
  timestamp: string;
  audioUrl?: string;
  audioDuration?: number;
}

interface MarketPodcastData {
  episodes: PodcastNewsItem[];
  podcastTitle: string;
  podcastDescription: string;
  totalEpisodes: number;
  lastUpdated: string;
  marketSummary: string;
  fromDatabase?: boolean;
  episodeId?: string;
}

const categoryIcons = {
  sebi: '🏛️',
  rbi: '🏦',
  policy: '📋'
};

const categoryColors = {
  sebi: 'bg-blue-100 text-blue-800 border-blue-200',
  rbi: 'bg-green-100 text-green-800 border-green-200',
  policy: 'bg-purple-100 text-purple-800 border-purple-200'
};

const importanceColors = {
  high: 'border-red-400 bg-red-50',
  medium: 'border-yellow-400 bg-yellow-50',
  low: 'border-gray-400 bg-gray-50'
};


export default function MarketPodcast() {
  const [podcastData, setPodcastData] = useState<MarketPodcastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [podcastRequestId, setPodcastRequestId] = useState<string | null>(null);
  const [podcastStatus, setPodcastStatus] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(DEFAULT_PODCAST_LANGUAGE);
  const [availableLanguages] = useState(getEnabledPodcastLanguages());

  useEffect(() => {
    fetchPodcastData();
  }, [selectedLanguage]); // Refetch when language changes

  const fetchPodcastData = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const baseUrl = '/api/market-podcast';
      const params = new URLSearchParams();
      params.set('lang', selectedLanguage);
      if (forceRefresh) params.set('refresh', 'true');
      
      const url = `${baseUrl}?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setPodcastData(data);
      
      // Check if any episode has audio and set up audio player
      if (data.episodes && data.episodes.length > 0) {
        const episodeWithAudio = data.episodes.find((ep: any) => ep.audioUrl);
        if (episodeWithAudio && episodeWithAudio.audioUrl) {
          console.log('Found episode with existing audio:', episodeWithAudio.audioUrl);
          setAudioUrl(episodeWithAudio.audioUrl);
          setAudioDuration(episodeWithAudio.audioDuration || null);
          
          // Create audio element for existing audio
          const audio = new Audio(episodeWithAudio.audioUrl);
          setAudioRef(audio);
          
          audio.onended = () => {
            setPlayingEpisode(null);
          };
        }
      }
      
      const message = data.fromDatabase 
        ? 'Loaded from database cache!' 
        : 'Fresh podcast generated!';
      toast.success(message);
    } catch (error) {
      console.error('Failed to fetch podcast data:', error);
      toast.error('Failed to load market podcast');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayEpisode = (episodeId: string) => {
    if (playingEpisode === episodeId) {
      setPlayingEpisode(null);
      if (audioRef) {
        audioRef.pause();
      }
    } else {
      setPlayingEpisode(episodeId);
      if (audioUrl && audioRef) {
        audioRef.play();
      }
    }
  };

  const generatePodcastAudio = async (duration: 'short' | 'default' | 'long' = 'default') => {
    setIsGeneratingAudio(true);
    setPodcastStatus(0);
    
    try {
      // Step 1: Initiate podcast creation
      const params = new URLSearchParams();
      params.set('duration', duration);
      params.set('lang', selectedLanguage);
      
      const response = await fetch(`/api/generate-podcast-audio?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (data.requestId) {
        setPodcastRequestId(data.requestId);
        setPodcastStatus(data.status);
        toast.success('Podcast generation started! Please wait...');
        
        // Start polling for status
        pollPodcastStatus(data.requestId);
      } else {
        throw new Error('No request ID returned');
      }
      
    } catch (error) {
      console.error('Failed to generate podcast audio:', error);
      toast.error('Failed to start podcast generation');
      setIsGeneratingAudio(false);
    }
  };

  const pollPodcastStatus = async (requestId: string) => {
    const maxAttempts = 30; // Max 5 minutes (30 * 10 seconds)
    let attempts = 0;
    
    const poll = async () => {
      try {
        attempts++;
        const response = await fetch(`/api/podcast-status/${requestId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setPodcastStatus(data.status);
        
        if (data.status === 100) {
          // Completed!
          setAudioUrl(data.audioUrl);
          setAudioDuration(data.duration);
          setIsGeneratingAudio(false);
          toast.success('🎧 Podcast audio is ready!');
          
          // Create audio element
          if (data.audioUrl) {
            const audio = new Audio(data.audioUrl);
            setAudioRef(audio);
            
            audio.onended = () => {
              setPlayingEpisode(null);
            };
          }
          
        } else if (data.status === 5) {
          // Still processing
          if (attempts < maxAttempts) {
            setTimeout(poll, 10000); // Poll every 10 seconds
          } else {
            throw new Error('Podcast generation timed out');
          }
        } else if (data.status === 0) {
          // Still pending
          if (attempts < maxAttempts) {
            setTimeout(poll, 5000); // Poll every 5 seconds for pending
          } else {
            throw new Error('Podcast generation timed out');
          }
        } else if (data.errorCode) {
          throw new Error(data.errorMessage || 'Podcast generation failed');
        }
        
      } catch (error) {
        console.error('Failed to check podcast status:', error);
        toast.error('Failed to check podcast status');
        setIsGeneratingAudio(false);
      }
    };
    
    // Start polling
    setTimeout(poll, 2000); // First poll after 2 seconds
  };

  const getStatusMessage = () => {
    switch (podcastStatus) {
      case 0: return 'Queued for processing...';
      case 5: return 'Generating podcast audio...';
      case 100: return 'Podcast ready!';
      default: return 'Processing...';
    }
  };

  const filteredEpisodes = podcastData?.episodes.filter(episode => 
    selectedCategory === 'all' || episode.category === selectedCategory
  ) || [];

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short'
    });
  };

  if (!podcastData && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Market Podcast</h1>
          <button 
            onClick={() => fetchPodcastData()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load Market Podcast
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {podcastData?.podcastTitle || 'India Market Daily'}
                </h1>
                <p className="text-gray-600 text-sm">
                  {podcastData?.podcastDescription}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => fetchPodcastData(false)}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                <FiRefreshCw className={`text-sm ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              
              {podcastData?.fromDatabase && (
                <button
                  onClick={() => fetchPodcastData(true)}
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-orange-300 text-sm"
                >
                  <FiRefreshCw className={`text-sm ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Force Refresh</span>
                </button>
              )}
              
              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <FiGlobe className="text-gray-600" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  disabled={isLoading || isGeneratingAudio}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-gray-400 transition-colors disabled:bg-gray-100"
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Podcast Audio Generation */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => generatePodcastAudio('default')}
                  disabled={isGeneratingAudio || !podcastData}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {isGeneratingAudio ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <FiPlay className="text-sm" />
                  )}
                  <span>{isGeneratingAudio ? 'Generating...' : '🎧 Generate Audio'}</span>
                </button>
                
                {/* Duration selector */}
                {!isGeneratingAudio && podcastData && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => generatePodcastAudio('short')}
                      className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                    >
                      Short (3-5min)
                    </button>
                    <button
                      onClick={() => generatePodcastAudio('long')}
                      className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                    >
                      Long (15-20min)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Podcast Generation Status */}
          {isGeneratingAudio && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                Generating Podcast Audio
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">{getStatusMessage()}</p>
                {podcastRequestId && (
                  <span className="text-xs text-gray-500">ID: {podcastRequestId.substring(0, 8)}...</span>
                )}
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: podcastStatus === 0 ? '10%' : podcastStatus === 5 ? '60%' : '100%' }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Audio Player */}
          {audioUrl && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                🎧 Podcast Audio Ready
                {audioDuration && (
                  <span className="ml-2 text-sm text-gray-600">({Math.floor(audioDuration / 60)}:{Math.floor(audioDuration % 60).toString().padStart(2, '0')})</span>
                )}
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => togglePlayEpisode('episode-1')}
                  className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                >
                  {playingEpisode === 'episode-1' ? <FiPause className="text-xl" /> : <FiPlay className="text-xl ml-0.5" />}
                </button>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">AI-Generated Podcast Discussion</p>
                  <p className="text-gray-800 font-medium">Today's Regulatory Roundup</p>
                </div>
                <a 
                  href={audioUrl} 
                  download="regulatory-podcast.mp3"
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  <FiExternalLink className="text-lg" />
                </a>
              </div>
            </div>
          )}

          {/* Market Summary */}
          {podcastData?.marketSummary && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                <FiAlertCircle className="mr-2" />
                Today's Market Summary
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {podcastData.marketSummary}
              </p>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-blue-100 text-blue-800 border-blue-200' 
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
              }`}
            >
              All Episodes ({podcastData?.totalEpisodes || 0})
            </button>
            {Object.entries(categoryIcons).map(([category, icon]) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                  selectedCategory === category 
                    ? categoryColors[category as keyof typeof categoryColors]
                    : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                }`}
              >
                {icon} {category.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>
                Last updated: {podcastData?.lastUpdated ? formatTimestamp(podcastData.lastUpdated) : 'Unknown'}
              </span>
              {podcastData?.fromDatabase && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 border border-green-200">
                  📦 Cached from Database
                </span>
              )}
              {podcastData?.fromDatabase === false && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                  🔄 Freshly Generated
                </span>
              )}
            </div>
            <span>{filteredEpisodes.length} episodes</span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading latest market news...</p>
          </div>
        )}

        {/* Episodes List */}
        {!isLoading && (
          <div className="space-y-4">
            {filteredEpisodes.map((episode, index) => (
              <div 
                key={episode.id} 
                className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${importanceColors[episode.importance]} transition-all duration-200 hover:shadow-xl`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <button
                        onClick={() => togglePlayEpisode(episode.id)}
                        className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                      >
                        {playingEpisode === episode.id ? <FiPause /> : <FiPlay className="ml-0.5" />}
                      </button>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs border ${categoryColors[episode.category]}`}>
                          {categoryIcons[episode.category]} {episode.category.toUpperCase()}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          episode.importance === 'high' ? 'bg-red-100 text-red-800' :
                          episode.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {episode.importance.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Episode {index + 1}: {episode.title}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {episode.summary}
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 ml-4">
                    <FiClock className="mr-1" />
                    {formatTimestamp(episode.timestamp)}
                  </div>
                </div>

                {/* Key Points */}
                {episode.keyPoints && episode.keyPoints.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Key Points:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {episode.keyPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Sources */}
                {episode.sources && episode.sources.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-800 mb-2 text-sm">Sources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {episode.sources.slice(0, 3).map((source, idx) => (
                        <a 
                          key={idx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                        >
                          {source.title || 'Source'}
                          <FiExternalLink className="ml-1" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Playing Indicator */}
                {playingEpisode === episode.id && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-700">
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-blue-500 animate-pulse"></div>
                        <div className="w-1 h-4 bg-blue-500 animate-pulse" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1 h-4 bg-blue-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm font-medium">
                        {audioUrl ? 'Now Playing - AI Generated Podcast' : 'Text-only episode - Generate audio above ↑'}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Audio Available Indicator */}
                {audioUrl && playingEpisode !== episode.id && (
                  <div className="mt-4 p-2 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 text-green-700 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span>🎧 Audio version available - Click play to listen</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredEpisodes.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <FiTrendingUp className="text-6xl mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No episodes found</h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory === 'all' 
                ? 'No podcast episodes available at the moment.' 
                : `No episodes found for ${selectedCategory} category.`}
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Show all episodes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
