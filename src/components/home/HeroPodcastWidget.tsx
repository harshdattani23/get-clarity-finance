'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Download, RefreshCw, Loader2, ChevronRight, Globe, Calendar, Clock, Headphones, Volume2 } from 'lucide-react';
import { getEnabledPodcastLanguages, getLanguageDisplayName, type PodcastLanguage } from '@/config/podcastLanguages';
import { getPodcastDisplayTexts, getGenericPodcastTitle, getGenericEpisodeTitle, getGenericPodcastDescription } from '@/utils/podcastDisplayTranslations';

interface PodcastEpisode {
  id: string;
  date: string;
  language: string;
  languageCode: string;
  title: string;
  summary: string;
  audioUrl?: string;
  audioDuration?: number;
  keyPoints: string[];
  category: string;
  importance: string;
  createdAt: string;
  podcastTitle: string;
  marketSummary: string;
}

interface PodcastData {
  episodes: PodcastEpisode[];
  totalEpisodes: number;
  totalWithAudio: number;
  totalDates: number;
  dateRange: {
    start: string;
    end: string;
    days: number;
  };
}

const HeroPodcastWidget: React.FC = () => {
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);
  
  const languages = getEnabledPodcastLanguages();

  const fetchPodcasts = useCallback(async () => {
    try {
      setError(null);
      
      const response = await fetch('/api/podcast-playlist');
      const data: PodcastData = await response.json();
      
      if (!response.ok) {
        throw new Error('Failed to fetch podcasts');
      }
      
      setPodcastData(data);
      setLastUpdateTime(new Date().toISOString());
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load podcasts');
      console.error('Error fetching podcasts:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPodcasts();
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageMenu(false);
    // Stop any playing audio when switching language
    if (audioElement) {
      audioElement.pause();
      setPlayingEpisode(null);
    }
  };

  const handlePlayPause = (episode: PodcastEpisode) => {
    if (!episode.audioUrl) return;

    if (playingEpisode === episode.id) {
      // Pause current episode
      if (audioElement) {
        audioElement.pause();
        setPlayingEpisode(null);
      }
    } else {
      // Play new episode
      if (audioElement) {
        audioElement.pause();
      }
      
      const audio = new Audio(episode.audioUrl);
      audio.play().catch(console.error);
      
      audio.onended = () => {
        setPlayingEpisode(null);
      };
      
      setAudioElement(audio);
      setPlayingEpisode(episode.id);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const displayTexts = getPodcastDisplayTexts(selectedLanguage);

    if (date.toDateString() === today.toDateString()) {
      return displayTexts.todayLabel;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return displayTexts.yesterdayLabel;
    } else {
      return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  if (loading && !isRefreshing) {
    return (
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3 animate-pulse">
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error && !isRefreshing) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-center justify-between text-yellow-700 text-sm">
          <div className="flex items-center">
            <Headphones className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">Unable to load podcasts</span>
          </div>
          <button
            onClick={handleRefresh}
            className="text-yellow-600 hover:text-yellow-800 ml-2"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  // Helper function to get database language name from language code or display name
  const getDatabaseLanguageName = (languageInput: string) => {
    // If it's already a language code, convert it
    const languageByCode = languages.find(lang => lang.code === languageInput);
    if (languageByCode) {
      return languageByCode.code === 'en' ? 'English' : languageByCode.autoContentCode;
    }
    
    // If it's a display name, find by display name
    const languageByDisplay = languages.find(lang => 
      lang.nativeName === languageInput || lang.label === languageInput
    );
    if (languageByDisplay) {
      return languageByDisplay.code === 'en' ? 'English' : languageByDisplay.autoContentCode;
    }
    
    return 'English'; // Fallback
  };

  // Group episodes by date and filter by selected language
  const databaseLanguageName = getDatabaseLanguageName(selectedLanguage);
  const episodesByDate = podcastData?.episodes
    .filter(episode => episode.language === databaseLanguageName)
    .reduce((acc, episode) => {
      const date = episode.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(episode);
      return acc;
    }, {} as Record<string, PodcastEpisode[]>) || {};

  const dates = Object.keys(episodesByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="h-full flex flex-col">
      {/* Header with Language Selector */}
      <div className="mb-2">
        <div className="flex items-center justify-between">
          {/* Language Pills */}
          <div className="flex flex-wrap gap-1.5">
              {languages.slice(0, 4).map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`group relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                    selectedLanguage === language.code
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105'
                      : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    <span className="text-sm">{language.code === 'en' ? '🎧' : '🎵'}</span>
                    <span>{language.nativeName.split(' ')[0]}</span>
                  </span>
                  {selectedLanguage === language.code && (
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg blur opacity-40"></span>
                  )}
                </button>
              ))}
            
            {languages.length > 4 && (
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="group relative px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300"
                >
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    More
                    <ChevronRight className={`w-3 h-3 transition-transform ${showLanguageMenu ? 'rotate-90' : ''}`} />
                  </span>
                </button>
                
                {/* Language Dropdown */}
                {showLanguageMenu && (
                  <div className="absolute left-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {languages.slice(4).map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between ${
                          selectedLanguage === language.code ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                        }`}
                      >
                        <span>{language.nativeName}</span>
                        {selectedLanguage === language.code && <span className="text-purple-600">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
            title="Refresh podcasts"
          >
            {isRefreshing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
        
        {/* Status Indicator */}
        <div className="mt-1.5 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>{getPodcastDisplayTexts(selectedLanguage).dailyPodcastStatus} {languages.find(lang => lang.code === selectedLanguage)?.nativeName || 'English'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px]">
              Live • {lastUpdateTime ? 
                new Date(lastUpdateTime).toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }) : 
                new Date().toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })
              }
            </span>
          </div>
        </div>
      </div>

      {/* Podcast Episodes List */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full overflow-y-auto overflow-x-hidden space-y-2 pr-1 scrollbar-hide">
          {dates.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">
              <Headphones className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>{getPodcastDisplayTexts(selectedLanguage).noPodcastsMessage} {languages.find(lang => lang.code === selectedLanguage)?.nativeName || 'English'}</p>
              <p className="text-xs mt-1">{getPodcastDisplayTexts(selectedLanguage).generateContentMessage}</p>
            </div>
          ) : (
            <>
              {dates.slice(0, 7).map((date, dateIndex) => {
                const dateEpisodes = episodesByDate[date];
                const hasAudio = dateEpisodes.some(ep => ep.audioUrl);

                return (
                  <div key={date} className="space-y-1">
                    {/* Date Header */}
                    <div className="flex items-center gap-2 px-2 py-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs font-medium text-gray-600">
                        {formatDate(date)}
                      </span>
                      <div className="flex-1 h-px bg-gray-200"></div>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        hasAudio ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {hasAudio ? getPodcastDisplayTexts(selectedLanguage).availableLabel : getPodcastDisplayTexts(selectedLanguage).textOnlyLabel}
                      </span>
                    </div>

                    {/* Episodes for this date */}
                    {dateEpisodes.map((episode, index) => (
                      <div 
                        key={episode.id} 
                        className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 hover:from-purple-50 hover:to-purple-100 transition-all duration-300 group transform hover:scale-[1.02] hover:shadow-md animate-fadeInUp`}
                        style={{
                          animationDelay: `${(dateIndex * 2 + index) * 100}ms`
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                              {selectedLanguage === 'en' ? episode.title : getGenericEpisodeTitle(selectedLanguage)}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-1.5 leading-relaxed">
                              {selectedLanguage === 'en' ? episode.summary : getGenericPodcastDescription(selectedLanguage)}
                            </p>
                          </div>
                        </div>
                        
                        {/* Audio Controls and Info */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            {episode.audioUrl ? (
                              <>
                                <button
                                  onClick={() => handlePlayPause(episode)}
                                  className="p-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
                                  title={playingEpisode === episode.id ? 'Pause' : 'Play'}
                                >
                                  {playingEpisode === episode.id ? (
                                    <Pause className="w-3 h-3" />
                                  ) : (
                                    <Play className="w-3 h-3 ml-0.5" />
                                  )}
                                </button>
                                <a
                                  href={episode.audioUrl}
                                  download={`podcast-${episode.language.toLowerCase()}-${date}.mp3`}
                                  className="p-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition-colors"
                                  title="Download"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Download className="w-3 h-3" />
                                </a>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  <span>{formatDuration(episode.audioDuration)}</span>
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Volume2 className="w-3 h-3" />
                                <span>{getPodcastDisplayTexts(selectedLanguage).audioNotAvailable}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Category Badge */}
                          <div className="flex items-center gap-1">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                              episode.category === 'sebi' ? 'bg-blue-100 text-blue-600' :
                              episode.category === 'rbi' ? 'bg-green-100 text-green-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {episode.category === 'sebi' ? '🏛️' : 
                               episode.category === 'rbi' ? '🏦' : '📋'}
                              <span className="text-[10px] uppercase">{episode.category}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </>
          )}
        </div>
        
        {/* Fade effect at bottom */}
        {dates.length > 2 && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default HeroPodcastWidget;
