'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Download, RefreshCw, Loader2, ChevronRight, Globe, Calendar, Clock, Headphones, Volume2, VolumeX, Newspaper, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';
import { getEnabledPodcastLanguages, getLanguageDisplayName, type PodcastLanguage } from '@/config/podcastLanguages';
import { DEFAULT_TOPICS, MARKET_SECTORS, SUPPORTED_LANGUAGES } from '@/config/news';
import type { NewsItem as NewsItemType, NewsApiResponse } from '@/types/news';

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

const HeroMediaWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'podcasts'>('podcasts');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);
  
  // News state
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [selectedSector, setSelectedSector] = useState<string | undefined>(undefined);
  const [selectedNewsLanguage, setSelectedNewsLanguage] = useState<keyof typeof SUPPORTED_LANGUAGES>('en');
  const [showAllNews, setShowAllNews] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showAllSectors, setShowAllSectors] = useState(false);

  // Podcast state
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);
  const [selectedPodcastLanguage, setSelectedPodcastLanguage] = useState<string>('en');
  const [showPodcastLanguageMenu, setShowPodcastLanguageMenu] = useState(false);
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  
  const languages = getEnabledPodcastLanguages();

  const fetchNews = useCallback(async () => {
    try {
      setError(null);
      
      const params = new URLSearchParams();
      if (selectedSector) {
        params.append('sector', selectedSector);
      } else {
        params.append('topics', DEFAULT_TOPICS.slice(0, 3).join(','));
      }
      
      params.append('maxItems', '8');
      params.append('lang', selectedNewsLanguage);
      
      const response = await fetch(`/api/news/synthesize?${params}`);
      const data: NewsApiResponse = await response.json();
      
      if (!response.ok) {
        if (data.error && data.error.includes('PERPLEXITY_API_KEY')) {
          setNews([]);
          setError('News service configuration pending');
          return;
        }
        throw new Error(data.warnings?.[0] || 'Failed to fetch news');
      }
      
      setNews(data.items);
      if (data.queriedAt) {
        setLastUpdateTime(data.queriedAt);
      } else {
        setLastUpdateTime(new Date().toISOString());
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load news');
      console.error('Error fetching news:', err);
    }
  }, [selectedSector, selectedNewsLanguage]);

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
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    if (activeTab === 'news') {
      await fetchNews();
    } else {
      await fetchPodcasts();
    }
    setLoading(false);
    setIsRefreshing(false);
  }, [activeTab, fetchNews, fetchPodcasts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setShowAllNews(false);
    fetchData();
  };

  const handleTabChange = (tab: 'news' | 'podcasts') => {
    setActiveTab(tab);
    setLoading(true);
    setError(null);
    // Stop any playing audio when switching tabs
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
      audioElement.load();
      setPlayingEpisode(null);
      setCurrentTime(0);
    }
  };

  const handleSectorChange = (sectorId: string | undefined) => {
    setSelectedSector(sectorId);
    setLoading(true);
    setShowAllNews(false);
  };

  const handleNewsLanguageChange = (lang: keyof typeof SUPPORTED_LANGUAGES) => {
    setSelectedNewsLanguage(lang);
    setShowLanguageMenu(false);
    setLoading(true);
    setShowAllNews(false);
  };

  const handlePodcastLanguageChange = (languageCode: string) => {
    setSelectedPodcastLanguage(languageCode);
    setShowPodcastLanguageMenu(false);
    // Stop any playing audio when switching language
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
      audioElement.load();
      setPlayingEpisode(null);
      setCurrentTime(0);
    }
  };

  // Helper function to get the database language name from language code
  const getDatabaseLanguageName = (languageCode: string) => {
    if (languageCode === 'en') return 'English';
    const language = languages.find(lang => lang.code === languageCode);
    // Use autoContentCode which matches the database language names
    return language?.autoContentCode || 'English';
  };

  const handlePlayPause = (episode: PodcastEpisode) => {
    if (!episode.audioUrl) return;

    if (playingEpisode === episode.id) {
      // Pause current audio
      if (audioElement) {
        audioElement.pause();
        setPlayingEpisode(null);
      }
    } else {
      // Clean up previous audio safely
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
        audioElement.load();
      }
      
      // Create new audio element
      const newAudio = new Audio(episode.audioUrl);
      newAudio.volume = volume;
      
      // Define event handlers in proper scope
      newAudio.addEventListener('timeupdate', () => {
        setCurrentTime(newAudio.currentTime);
      });
      
      newAudio.addEventListener('loadedmetadata', () => {
        setDuration(newAudio.duration);
      });
      
      newAudio.addEventListener('ended', () => {
        setPlayingEpisode(null);
        setCurrentTime(0);
      });
      
      newAudio.addEventListener('waiting', () => {
        setIsBuffering(true);
      });
      
      newAudio.addEventListener('canplay', () => {
        setIsBuffering(false);
      });
      
      // Start playing
      newAudio.play().catch(console.error);
      
      // Update state
      setAudioElement(newAudio);
      setPlayingEpisode(episode.id);
      setCurrentTime(0);
    }
  };

  const handleSeek = (seekTime: number) => {
    if (audioElement) {
      audioElement.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioElement) {
      audioElement.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioElement) {
      if (audioElement.volume > 0) {
        audioElement.volume = 0;
        setVolume(0);
      } else {
        audioElement.volume = 1;
        setVolume(1);
      }
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeRange = (current: number, total: number) => {
    return `${formatDuration(current)} / ${formatDuration(total)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
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
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">Unable to load {activeTab}</span>
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

  // Process podcast data by date and language
  const selectedLanguageName = getDatabaseLanguageName(selectedPodcastLanguage);
  const episodesByDate = podcastData?.episodes
    .filter(episode => episode.language === selectedLanguageName)
    .reduce((acc, episode) => {
      const date = episode.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(episode);
      return acc;
    }, {} as Record<string, PodcastEpisode[]>) || {};

  const dates = Object.keys(episodesByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Primary sectors for news
  const regulatoryIndex = MARKET_SECTORS.findIndex(s => s.id === 'regulatory');
  const primarySectors = [
    ...MARKET_SECTORS.slice(0, 3),
    MARKET_SECTORS[regulatoryIndex]
  ];
  const secondarySectors = MARKET_SECTORS.filter((s, idx) => 
    idx !== regulatoryIndex && idx >= 3
  );

  return (
    <div className="h-full flex flex-col">
      {/* Tab Header */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-2">
          {/* Tab Pills */}
          <div className="flex gap-1">
            <button
              onClick={() => handleTabChange('podcasts')}
              className={`group relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                activeTab === 'podcasts'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1">
                <Headphones className="w-3 h-3" />
                <span>Podcasts</span>
              </span>
              {activeTab === 'podcasts' && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg blur opacity-40"></span>
              )}
            </button>
            
            <button
              onClick={() => handleTabChange('news')}
              className={`group relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                activeTab === 'news'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1">
                <Newspaper className="w-3 h-3" />
                <span>News</span>
              </span>
              {activeTab === 'news' && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg blur opacity-40"></span>
              )}
            </button>
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
            title={`Refresh ${activeTab}`}
          >
            {isRefreshing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Tab-specific Controls */}
        {activeTab === 'news' ? (
          <div>
            {/* News Sector Filters */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              <button
                onClick={() => handleSectorChange(undefined)}
                className={`group relative px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                  !selectedSector
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md scale-105'
                    : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1">
                  {!selectedSector && <Sparkles className="w-2.5 h-2.5" />}
                  All
                </span>
              </button>
              
              {primarySectors.slice(0, 3).map((sector) => (
                <button
                  key={sector.id}
                  onClick={() => handleSectorChange(sector.id)}
                  className={`group relative px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                    selectedSector === sector.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md scale-105'
                      : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    <span className="text-xs">{sector.icon}</span>
                    <span>{sector.label.split(' ')[0]}</span>
                  </span>
                </button>
              ))}
              
              {/* Language Selector for News */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-all flex items-center gap-1"
                  title="Select language"
                >
                  <Globe className="w-3 h-3" />
                  <span className="text-xs font-medium">{SUPPORTED_LANGUAGES[selectedNewsLanguage].label}</span>
                </button>
                
                {showLanguageMenu && (
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
                      <button
                        key={code}
                        onClick={() => handleNewsLanguageChange(code as keyof typeof SUPPORTED_LANGUAGES)}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between ${
                          selectedNewsLanguage === code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.nativeName}</span>
                        {selectedNewsLanguage === code && <span className="text-blue-600">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Podcast Language Filters */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {languages.slice(0, 4).map((language) => (
                <button
                  key={language.code}
                  onClick={() => handlePodcastLanguageChange(language.code)}
                  className={`group relative px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                    selectedPodcastLanguage === language.code
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md scale-105'
                      : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    <span className="text-xs">{language.code === 'en' ? '🎧' : '🎵'}</span>
                    <span>{language.nativeName.split(' ')[0]}</span>
                  </span>
                </button>
              ))}
              
              {languages.length > 4 && (
                <div className="relative">
                  <button
                    onClick={() => setShowPodcastLanguageMenu(!showPodcastLanguageMenu)}
                    className="group relative px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300"
                  >
                    <span className="flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" />
                      More
                    </span>
                  </button>
                  
                  {showPodcastLanguageMenu && (
                    <div className="absolute left-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      {languages.slice(4).map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handlePodcastLanguageChange(language.code)}
                          className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between ${
                            selectedPodcastLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          <span>{language.nativeName}</span>
                          {selectedPodcastLanguage === language.code && <span className="text-blue-600">✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>
              {activeTab === 'news' 
                ? `Market news in ${SUPPORTED_LANGUAGES[selectedNewsLanguage].nativeName}`
                : `Daily podcasts in ${languages.find(lang => lang.code === selectedPodcastLanguage)?.nativeName || 'English'}`
              }
            </span>
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

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full overflow-y-auto overflow-x-hidden space-y-2 pr-1 scrollbar-hide">
          {activeTab === 'news' ? (
            // News Content
            news.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-sm">
                <Newspaper className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No news available</p>
              </div>
            ) : (
              <>
                {news.slice(0, showAllNews ? news.length : 5).map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 hover:from-blue-50 hover:to-blue-100 transition-all duration-300 cursor-pointer group transform hover:scale-[1.02] hover:shadow-md animate-fadeInUp`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-1.5 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(item.sentiment)}`}>
                        {item.sentiment === 'positive' ? '📈' : item.sentiment === 'negative' ? '📉' : '📊'}
                        <span className="text-[10px]">{item.sentiment || 'neutral'}</span>
                      </span>
                      {item.tickers && item.tickers.length > 0 && (
                        <span className="text-xs text-gray-500 font-mono bg-gray-200/50 px-1.5 py-0.5 rounded">
                          {item.tickers[0]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                
                {news.length > 5 && (
                  <div className="text-center pt-2 pb-1">
                    <button 
                      onClick={() => setShowAllNews(!showAllNews)}
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-50 hover:to-blue-100 rounded-lg text-xs text-gray-600 hover:text-blue-600 transition-all duration-200"
                    >
                      <span>
                        {showAllNews 
                          ? 'Show less' 
                          : `View ${news.length - 5} more updates`
                        }
                      </span>
                      <ChevronRight className={`w-3 h-3 transition-all duration-200 ${
                        showAllNews 
                          ? 'rotate-90 group-hover:rotate-[85deg]' 
                          : 'group-hover:translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                )}
              </>
            )
          ) : (
            // Podcast Content
            dates.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-sm">
                <Headphones className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No podcasts available in {languages.find(lang => lang.code === selectedPodcastLanguage)?.nativeName || 'English'}</p>
                <p className="text-xs mt-1">Generate content in admin panel</p>
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
                          {hasAudio ? '🎧 Available' : '📝 Text Only'}
                        </span>
                      </div>

                      {/* Episodes for this date */}
                      {dateEpisodes.map((episode, index) => (
                        <div 
                          key={episode.id} 
                          className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 hover:from-blue-50 hover:to-blue-100 transition-all duration-300 group transform hover:scale-[1.02] hover:shadow-md animate-fadeInUp`}
                          style={{
                            animationDelay: `${(dateIndex * 2 + index) * 100}ms`
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {episode.title}
                              </h4>
                              <p className="text-xs text-gray-600 line-clamp-2 mb-1.5 leading-relaxed">
                                {episode.summary}
                              </p>
                            </div>
                          </div>
                          
                          {/* Enhanced Audio Player */}
                          <div className="mt-2">
                            {episode.audioUrl ? (
                              <div className="space-y-2">
                                {/* Main Controls Row */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handlePlayPause(episode)}
                                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors flex items-center justify-center"
                                      title={playingEpisode === episode.id ? 'Pause' : 'Play'}
                                    >
                                      {isBuffering && playingEpisode === episode.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                      ) : playingEpisode === episode.id ? (
                                        <Pause className="w-4 h-4" />
                                      ) : (
                                        <Play className="w-4 h-4 ml-0.5" />
                                      )}
                                    </button>
                                    
                                    <a
                                      href={episode.audioUrl}
                                      download={`podcast-${episode.language.toLowerCase()}-${date}.mp3`}
                                      className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition-colors"
                                      title="Download"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Download className="w-4 h-4" />
                                    </a>
                                    
                                    {/* Volume Control */}
                                    <div className="relative">
                                      <button
                                        onClick={toggleMute}
                                        onMouseEnter={() => setShowVolumeSlider(true)}
                                        onMouseLeave={() => setShowVolumeSlider(false)}
                                        className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                                        title={volume === 0 ? 'Unmute' : 'Mute'}
                                      >
                                        {volume === 0 ? (
                                          <VolumeX className="w-4 h-4" />
                                        ) : (
                                          <Volume2 className="w-4 h-4" />
                                        )}
                                      </button>
                                      
                                      {/* Volume Slider */}
                                      {showVolumeSlider && (
                                        <div 
                                          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border rounded-lg p-2"
                                          onMouseEnter={() => setShowVolumeSlider(true)}
                                          onMouseLeave={() => setShowVolumeSlider(false)}
                                        >
                                          <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={volume}
                                            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                                            className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            style={{
                                              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span>
                                      {playingEpisode === episode.id && duration > 0 
                                        ? formatTimeRange(currentTime, duration)
                                        : formatDuration(episode.audioDuration)
                                      }
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Progress Bar */}
                                {playingEpisode === episode.id && duration > 0 && (
                                  <div className="w-full">
                                    <div className="relative">
                                      <input
                                        type="range"
                                        min="0"
                                        max={duration || 0}
                                        value={currentTime}
                                        onChange={(e) => handleSeek(parseFloat(e.target.value))}
                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        style={{
                                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Volume2 className="w-3 h-3" />
                                <span>Audio not available</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Category Badge Row */}
                          <div className="flex items-center justify-end mt-2">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                              episode.category === 'sebi' ? 'bg-blue-100 text-blue-600' :
                              episode.category === 'rbi' ? 'bg-green-100 text-green-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {episode.category === 'sebi' ? '🏦️' : 
                               episode.category === 'rbi' ? '🏦' : '📋'}
                              <span className="text-[10px] uppercase">{episode.category}</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </>
            )
          )}
        </div>
        
        {/* Fade effect at bottom */}
        {((activeTab === 'news' && news.length > 2) || (activeTab === 'podcasts' && dates.length > 2)) && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default HeroMediaWidget;
