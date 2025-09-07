'use client';

import React, { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiDownload, FiCalendar, FiGlobe, FiClock, FiRefreshCw, FiChevronDown, FiChevronUp, FiHeadphones } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { getEnabledPodcastLanguages, getLanguageDisplayName, type PodcastLanguage } from '@/config/podcastLanguages';
import { usePodcastRefresh } from '@/contexts/PodcastContext';

interface PodcastEpisode {
  id: string;
  date: string;
  language: string;
  languageDisplay: string;
  title: string;
  summary: string;
  audioUrl?: string;
  audioGenerated: boolean;
  duration?: number;
  keyPoints: string[];
  sources: Array<{
    title: string;
    url: string;
    publishedAt?: string;
  }>;
  keyPointsCount: number;
  sourcesCount: number;
  createdAt: string;
  fromDatabase: boolean;
  podcastTitle: string;
  marketSummary?: string;
}

interface DateGroup {
  date: string;
  displayDate: string;
  episodes: PodcastEpisode[];
  hasEnglishContent: boolean;
  audioLanguages: string[];
}

export default function PodcastPlaylist() {
  const { refreshTrigger } = usePodcastRefresh();
  const [dateGroups, setDateGroups] = useState<DateGroup[]>([]);
  const [languages] = useState<PodcastLanguage[]>(getEnabledPodcastLanguages());
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({});
  const [dateRange, setDateRange] = useState(7); // Default to last 7 days

  useEffect(() => {
    loadPodcastPlaylist();
  }, [dateRange]);
  
  // Reload when triggered by MultiLanguagePodcastManager
  useEffect(() => {
    if (refreshTrigger > 0) {
      console.log('Refreshing playlist due to content generation');
      toast.loading('Refreshing playlist with new content...', {
        id: 'playlist-refresh',
        duration: 3000
      });
      loadPodcastPlaylist();
    }
  }, [refreshTrigger]);

  const loadPodcastPlaylist = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/podcast-playlist?days=${dateRange}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Group episodes by date
      const groupedByDate = groupEpisodesByDate(data.episodes || []);
      setDateGroups(groupedByDate);

      // Auto-expand today's date
      const today = new Date().toISOString().split('T')[0];
      setExpandedDates(new Set([today]));
      
      // Dismiss any playlist refresh loading toast
      toast.dismiss('playlist-refresh');

    } catch (error) {
      console.error('Failed to load podcast playlist:', error);
      toast.dismiss('playlist-refresh');
      toast.error('Failed to load podcast playlist');
    } finally {
      setIsLoading(false);
    }
  };

  const groupEpisodesByDate = (episodes: any[]): DateGroup[] => {
    const dateMap = new Map<string, DateGroup>();

    episodes.forEach((episode) => {
      const date = episode.date || episode.createdAt.split('T')[0];
      const displayDate = new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      if (!dateMap.has(date)) {
        dateMap.set(date, {
          date,
          displayDate,
          episodes: [],
          hasEnglishContent: false,
          audioLanguages: []
        });
      }

      const dateGroup = dateMap.get(date)!;
      
      // Add episode
      dateGroup.episodes.push({
        id: episode.id,
        date,
        language: episode.language,
        languageDisplay: getLanguageDisplayName(episode.languageCode || 'en'),
        title: episode.title,
        summary: episode.summary,
        audioUrl: episode.audioUrl,
        audioGenerated: !!episode.audioUrl,
        duration: episode.audioDuration,
        keyPoints: episode.keyPoints || [],
        sources: episode.sources || [],
        keyPointsCount: episode.keyPoints?.length || 0,
        sourcesCount: episode.sources?.length || 0,
        createdAt: episode.createdAt,
        fromDatabase: true,
        podcastTitle: episode.podcastTitle || '',
        marketSummary: episode.marketSummary || ''
      });

      // Track metadata
      if (episode.language === 'English') {
        dateGroup.hasEnglishContent = true;
      }
      
      if (episode.audioUrl && !dateGroup.audioLanguages.includes(episode.language)) {
        dateGroup.audioLanguages.push(episode.language);
      }
    });

    // Sort by date (newest first)
    return Array.from(dateMap.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const toggleDateExpansion = (date: string) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  const togglePlayEpisode = (episodeId: string, audioUrl?: string) => {
    if (!audioUrl) {
      toast.error('No audio available for this episode');
      return;
    }

    // Stop currently playing audio
    if (playingEpisode && audioElements[playingEpisode]) {
      audioElements[playingEpisode].pause();
    }

    if (playingEpisode === episodeId) {
      setPlayingEpisode(null);
      return;
    }

    // Create or reuse audio element
    let audio = audioElements[episodeId];
    if (!audio) {
      audio = new Audio(audioUrl);
      audio.onended = () => setPlayingEpisode(null);
      setAudioElements(prev => ({ ...prev, [episodeId]: audio }));
    }

    audio.play();
    setPlayingEpisode(episodeId);
  };

  const generateAudioForDate = async (date: string, language: string) => {
    toast.loading(`Generating ${getLanguageDisplayName(language)} audio for ${date}...`);
    
    try {
      const response = await fetch('/api/generate-historical-podcast-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, language })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.dismiss();
      toast.success(`Audio generation started for ${getLanguageDisplayName(language)}`);
      
      // Reload playlist after a delay
      setTimeout(() => {
        loadPodcastPlaylist();
      }, 2000);

    } catch (error) {
      toast.dismiss();
      console.error('Failed to generate historical audio:', error);
      toast.error(`Failed to generate audio for ${date}`);
    }
  };

  // Helper function to get database language name from selected language
  const getDatabaseLanguageName = (languageInput: string) => {
    if (languageInput === 'all') return 'all';
    
    // Find language by display name (which is what's stored in selectedLanguage)
    const language = languages.find(lang => getLanguageDisplayName(lang.code) === languageInput);
    if (language) {
      return language.code === 'en' ? 'English' : language.autoContentCode;
    }
    
    return languageInput; // Fallback to original input
  };

  const filteredDateGroups = dateGroups.filter(dateGroup => {
    if (selectedDate && dateGroup.date !== selectedDate) return false;
    if (selectedLanguage !== 'all') {
      const databaseLanguageName = getDatabaseLanguageName(selectedLanguage);
      if (!dateGroup.episodes.some(ep => ep.language === databaseLanguageName)) return false;
    }
    return true;
  });

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'Unknown';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalStats = () => {
    const totalEpisodes = dateGroups.reduce((sum, group) => sum + group.episodes.length, 0);
    const totalWithAudio = dateGroups.reduce((sum, group) => 
      sum + group.episodes.filter(ep => ep.audioGenerated).length, 0);
    const totalDates = dateGroups.length;
    
    return { 
      totalEpisodes: totalEpisodes || 0, 
      totalWithAudio: totalWithAudio || 0, 
      totalDates: totalDates || 0 
    };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Podcast Archive */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">🎧 Historical Podcast Archive</h2>
            <p className="text-gray-600 text-sm mb-2">
              Browse, play, and download past regulatory podcast episodes
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>📊 {stats.totalEpisodes} total episodes</span>
              <span>🎧 {stats.totalWithAudio} with audio</span>
              <span>📅 {stats.totalDates} unique dates</span>
            </div>
          </div>
          <button
            onClick={loadPodcastPlaylist}
            disabled={isLoading}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition-colors disabled:opacity-50"
          >
            <FiRefreshCw className={`inline w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div>
          <p className="text-sm text-gray-600 mb-2">🔍 Filter episodes by date range, language, or specific date</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(parseInt(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm hover:border-gray-400 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={7} className="text-gray-900 bg-white">Last 7 days</option>
                <option value={30} className="text-gray-900 bg-white">Last month</option>
                <option value={90} className="text-gray-900 bg-white">Last 3 months</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Language Filter</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm hover:border-gray-400 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all" className="text-gray-900 bg-white">All Languages</option>
                {languages.map(lang => (
                  <option key={lang.code} value={getLanguageDisplayName(lang.code)} className="text-gray-900 bg-white">
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Specific Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm hover:border-gray-400 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {(selectedLanguage !== 'all' || selectedDate) && (
              <div>
                <label className="block text-xs text-gray-500 mb-1">Clear</label>
                <button
                  onClick={() => {
                    setSelectedDate('');
                    setSelectedLanguage('all');
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading podcast archive...</p>
        </div>
      )}

      {/* Date Groups */}
      {!isLoading && filteredDateGroups.length > 0 && (
        <div className="space-y-4">
          {filteredDateGroups.map((dateGroup) => (
            <div key={dateGroup.date} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              {/* Date Header */}
              <div 
                className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-colors"
                onClick={() => toggleDateExpansion(dateGroup.date)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{dateGroup.displayDate}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{dateGroup.episodes.length} episodes</span>
                      <span>{dateGroup.audioLanguages.length} with audio</span>
                      {dateGroup.hasEnglishContent && (
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                          English content
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {dateGroup.audioLanguages.map(lang => (
                      <span key={lang} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        {lang === 'English' ? '🇺🇸' : 
                         lang === 'हिन्दी' ? '🇮🇳' :
                         lang === 'মরাঠি' ? '🇮🇳' :
                         lang === 'ગુজરাતી' ? '🇮🇳' :
                         lang === 'தமிழ்' ? '🇮🇳' :
                         lang === 'তেলুগু' ? '🇮🇳' :
                         lang === 'বাংলা' ? '🇧🇩' : '🌐'}
                      </span>
                    ))}
                    {expandedDates.has(dateGroup.date) ? (
                      <FiChevronUp className="text-gray-400" />
                    ) : (
                      <FiChevronDown className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Episodes List */}
              {expandedDates.has(dateGroup.date) && (
                <div className="p-4 space-y-3">
                  {dateGroup.episodes
                    .filter(episode => selectedLanguage === 'all' || episode.language === selectedLanguage)
                    .map((episode) => (
                    <div key={episode.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <button
                              onClick={() => togglePlayEpisode(episode.id, episode.audioUrl)}
                              disabled={!episode.audioGenerated}
                              className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                                episode.audioGenerated
                                  ? 'bg-green-600 text-white hover:bg-green-700'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {playingEpisode === episode.id ? (
                                <FiPause className="text-sm" />
                              ) : (
                                <FiPlay className="text-sm ml-0.5" />
                              )}
                            </button>
                            <div>
                              <span className="font-medium text-gray-900 text-sm">{episode.languageDisplay}</span>
                              {episode.duration && (
                                <span className="ml-2 text-xs text-gray-500">
                                  {formatDuration(episode.duration)}
                                </span>
                              )}
                            </div>
                            {!episode.audioGenerated && dateGroup.hasEnglishContent && (
                              <button
                                onClick={() => generateAudioForDate(dateGroup.date, episode.language)}
                                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                              >
                                Generate Audio
                              </button>
                            )}
                          </div>
                          <h4 className="font-medium text-gray-800 mb-1">{episode.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{episode.summary}</p>
                          
                          {/* Key Points Section */}
                          {episode.keyPoints && episode.keyPoints.length > 0 && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                              <h5 className="font-medium text-gray-800 text-sm mb-2 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Key Regulatory Updates ({episode.keyPoints.length})
                              </h5>
                              <ul className="space-y-1 text-xs text-gray-700">
                                {episode.keyPoints.map((point, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-0.5">•</span>
                                    <span className="flex-1">{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {/* Market Summary */}
                          {episode.marketSummary && (
                            <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                              <h5 className="font-medium text-blue-800 text-xs mb-1">📊 Market Summary</h5>
                              <p className="text-xs text-blue-700">{episode.marketSummary}</p>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                            <span>📝 {episode.keyPointsCount} key points</span>
                            <span>🔗 {episode.sourcesCount} sources</span>
                            <span>⏰ {new Date(episode.createdAt).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {episode.audioGenerated ? (
                            <>
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <a
                                href={episode.audioUrl}
                                download={`podcast-${episode.date}-${episode.language}.mp3`}
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                              >
                                <FiDownload className="text-sm" />
                              </a>
                            </>
                          ) : (
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          )}
                        </div>
                      </div>

                      {/* Playing Indicator */}
                      {playingEpisode === episode.id && (
                        <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-2 text-green-700">
                            <div className="flex space-x-1">
                              <div className="w-1 h-3 bg-green-500 animate-pulse"></div>
                              <div className="w-1 h-3 bg-green-500 animate-pulse" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-1 h-3 bg-green-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-xs font-medium">Now Playing</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredDateGroups.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <FiCalendar className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No podcast episodes found</h3>
          <p className="text-gray-600 mb-4">
            {selectedDate || selectedLanguage !== 'all' 
              ? 'No episodes match your current filters. Try adjusting the date range or language filter.'
              : 'No podcast episodes have been generated yet. Generate some content to see the archive.'}
          </p>
          <button
            onClick={() => {
              setSelectedDate('');
              setSelectedLanguage('all');
              setDateRange(30);
            }}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
