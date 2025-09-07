'use client';

import React, { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiRefreshCw, FiClock, FiDownload, FiEye, FiGlobe, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { getEnabledPodcastLanguages, getLanguageDisplayName, type PodcastLanguage } from '@/config/podcastLanguages';
import { usePodcastRefresh } from '@/contexts/PodcastContext';

interface PodcastStatus {
  language: string;
  hasContent: boolean;
  contentLastGenerated?: string;
  audioUrl?: string;
  audioLastGenerated?: string;
  isGeneratingAudio: boolean;
  isGeneratingContent?: boolean;
  requestId?: string;
  error?: string;
  fromDatabase: boolean;
}

interface PodcastData {
  podcastTitle: string;
  totalEpisodes: number;
  lastUpdated: string;
  fromDatabase: boolean;
}

export default function MultiLanguagePodcastManager() {
  const { triggerRefresh } = usePodcastRefresh();
  const [languages] = useState<PodcastLanguage[]>(getEnabledPodcastLanguages());
  const [podcastStatuses, setPodcastStatuses] = useState<Record<string, PodcastStatus>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedPodcastData, setSelectedPodcastData] = useState<PodcastData | null>(null);
  const [globalAudioGeneration, setGlobalAudioGeneration] = useState(false);

  useEffect(() => {
    loadAllPodcastStatuses();
    // Also run background check to catch any completed audio that wasn't updated
    runBackgroundAudioCheck();
  }, []);

  const runBackgroundAudioCheck = async () => {
    try {
      console.log('🔍 Running background audio check for missed completions...');
      const response = await fetch('/api/background-audio-check');
      if (response.ok) {
        const result = await response.json();
        console.log('📡 Background check result:', {
          success: result.success,
          updated: result.updated,
          totalChecked: result.totalChecked
        });
        
        if (result.updated > 0) {
          toast.success(`Found ${result.updated} completed audio files that were missed!`);
          // Reload statuses to show the updates
          setTimeout(() => {
            loadAllPodcastStatuses();
            triggerRefresh();
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Background audio check failed:', error);
      // Don't show error toast as this is a background operation
    }
  };

  const loadAllPodcastStatuses = async () => {
    setIsLoading(true);
    const statuses: Record<string, PodcastStatus> = {};

    try {
      // Use efficient single-query endpoint that checks English content once for all languages
      console.log('🔍 Fetching status from /api/podcast-status-all...');
      const response = await fetch('/api/podcast-status-all');
      console.log('📡 Status response received:', response.status, response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Status data received:', { 
        success: data.success, 
        hasEnglishContent: data.hasEnglishContent,
        languageKeys: Object.keys(data.languages || {})
      });
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Build statuses from the single query result
      Object.entries(data.languages).forEach(([langCode, langData]: [string, any]) => {
        console.log(`🌐 Processing ${langCode}:`, { 
          hasContent: langData.hasContent, 
          error: langData.error 
        });
        statuses[langCode] = {
          language: langCode,
          hasContent: langData.hasContent,
          contentLastGenerated: langData.contentLastGenerated,
          isGeneratingAudio: false,
          fromDatabase: langData.fromDatabase,
          error: langData.error
        };
      });

      setPodcastStatuses(statuses);
      
      console.log('Loaded statuses for all languages:', {
        hasEnglishContent: data.hasEnglishContent,
        totalLanguages: Object.keys(statuses).length
      });
      
    } catch (error) {
      console.error('Failed to load podcast statuses:', error);
      toast.error('Failed to load podcast statuses');
    } finally {
      setIsLoading(false);
    }
  };

  const generateContentForLanguage = async (languageCode: string, forceRefresh = false) => {
    // Show immediate toast notification
    toast.loading(`Generating ${getLanguageDisplayName(languageCode)} content...`, {
      id: `content-${languageCode}`,
      duration: 30000
    });
    
    setPodcastStatuses(prev => ({
      ...prev,
      [languageCode]: {
        ...prev[languageCode],
        isGeneratingContent: true,
        error: undefined
      }
    }));

    try {
      const params = new URLSearchParams();
      params.set('lang', languageCode);
      if (forceRefresh) params.set('refresh', 'true');

      const response = await fetch(`/api/market-podcast?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setPodcastStatuses(prev => ({
        ...prev,
        [languageCode]: {
          ...prev[languageCode],
          hasContent: true,
          contentLastGenerated: data.lastUpdated,
          fromDatabase: data.fromDatabase,
          isGeneratingContent: false,
          error: undefined
        }
      }));

      const message = data.fromDatabase 
        ? `${getLanguageDisplayName(languageCode)} podcast loaded from cache` 
        : `${getLanguageDisplayName(languageCode)} podcast generated fresh`;
      toast.dismiss(`content-${languageCode}`);
      toast.success(message);
      
      // Auto-refresh all podcast statuses and playlist to show updated content
      setTimeout(() => {
        loadAllPodcastStatuses();
        triggerRefresh(); // This will refresh the PodcastPlaylist component
      }, 1000);

    } catch (error) {
      console.error(`Failed to generate content for ${languageCode}:`, error);
      setPodcastStatuses(prev => ({
        ...prev,
        [languageCode]: {
          ...prev[languageCode],
          isGeneratingContent: false,
          error: error instanceof Error ? error.message : 'Generation failed'
        }
      }));
      toast.dismiss(`content-${languageCode}`);
      toast.error(`Failed to generate ${getLanguageDisplayName(languageCode)} content`);
    }
  };

  const generateAudioForLanguage = async (languageCode: string, duration: 'short' | 'default' | 'long' = 'default') => {
    setPodcastStatuses(prev => ({
      ...prev,
      [languageCode]: {
        ...prev[languageCode],
        isGeneratingAudio: true,
        error: undefined
      }
    }));

    try {
      const params = new URLSearchParams();
      params.set('duration', duration);
      params.set('lang', languageCode);

      const response = await fetch(`/api/generate-podcast-audio?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.requestId) {
        setPodcastStatuses(prev => ({
          ...prev,
          [languageCode]: {
            ...prev[languageCode],
            requestId: data.requestId
          }
        }));

        toast.success(`${getLanguageDisplayName(languageCode)} audio generation started!`);
        pollAudioStatus(languageCode, data.requestId);
      }

    } catch (error) {
      console.error(`Failed to generate audio for ${languageCode}:`, error);
      
      let errorMessage = 'Audio generation failed';
      if (error instanceof Error) {
        if (error.message.includes('timeout') || error.message.includes('Connect Timeout')) {
          errorMessage = 'AutoContent API timeout - service may be overloaded';
        } else if (error.message.includes('network') || error.message.includes('fetch failed')) {
          errorMessage = 'Network connectivity issue - check internet connection';
        } else {
          errorMessage = error.message;
        }
      }
      
      setPodcastStatuses(prev => ({
        ...prev,
        [languageCode]: {
          ...prev[languageCode],
          isGeneratingAudio: false,
          error: errorMessage
        }
      }));
      
      toast.error(`${getLanguageDisplayName(languageCode)} audio failed: ${errorMessage}`);
    }
  };

  const pollAudioStatus = async (languageCode: string, requestId: string) => {
    const maxAttempts = 30;
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

        if (data.status === 100) {
          // Completed
          setPodcastStatuses(prev => ({
            ...prev,
            [languageCode]: {
              ...prev[languageCode],
              audioUrl: data.audioUrl,
              audioLastGenerated: new Date().toISOString(),
              isGeneratingAudio: false,
              requestId: undefined
            }
          }));
          toast.success(`🎧 ${getLanguageDisplayName(languageCode)} audio ready!`);

        } else if (data.status === 5 || data.status === 0) {
          // Still processing
          if (attempts < maxAttempts) {
            setTimeout(poll, 10000);
          } else {
            throw new Error('Audio generation timed out');
          }
        } else if (data.errorCode) {
          throw new Error(data.errorMessage || 'Audio generation failed');
        }

      } catch (error) {
        console.error(`Failed to poll audio status for ${languageCode}:`, error);
        setPodcastStatuses(prev => ({
          ...prev,
          [languageCode]: {
            ...prev[languageCode],
            isGeneratingAudio: false,
            error: error instanceof Error ? error.message : 'Status check failed'
          }
        }));
        toast.error(`${getLanguageDisplayName(languageCode)} audio generation failed`);
      }
    };

    setTimeout(poll, 2000);
  };


  const generateAllAudio = async () => {
    setGlobalAudioGeneration(true);
    toast.loading('Checking which languages need audio generation...', { id: 'check-missing' });

    try {
      // Step 1: Check database for missing audio requests
      console.log('🔍 Checking database for missing audio requests...');
      const checkResponse = await fetch('/api/check-missing-audio');
      if (!checkResponse.ok) {
        throw new Error(`Failed to check missing audio: ${checkResponse.status}`);
      }
      
      const checkData = await checkResponse.json();
      if (checkData.error) {
        throw new Error(checkData.error);
      }
      
      console.log('📊 Missing audio check result:', {
        needsGeneration: checkData.languagesNeedingGeneration,
        hasAudio: checkData.languagesWithAudio,
        hasEnglishEpisode: checkData.summary.hasEnglishEpisode
      });
      
      // Step 2: Validate we can proceed
      if (!checkData.summary.hasEnglishEpisode) {
        toast.dismiss('check-missing');
        toast.error('⚠️ No English episode found for today. Generate English content first!');
        return;
      }
      
      if (checkData.languagesNeedingGeneration === 0) {
        toast.dismiss('check-missing');
        toast.success('✅ All languages already have audio requests for today!');
        return;
      }
      
      // Step 3: Generate audio for languages that need it
      toast.dismiss('check-missing');
      toast.loading(`Generating audio for ${checkData.languagesNeedingGeneration} languages...`, { id: 'generate-all' });
      
      const languagesToGenerate = checkData.needsGeneration;
      console.log(`🎧 Generating audio for ${languagesToGenerate.length} languages:`, 
        languagesToGenerate.map((l: any) => l.languageName));
      
      let successCount = 0;
      let failCount = 0;
      
      for (const langInfo of languagesToGenerate) {
        try {
          console.log(`🎤 Starting audio generation for ${langInfo.languageName} (${langInfo.reason})`);
          
          // Update UI to show this language is generating
          setPodcastStatuses(prev => ({
            ...prev,
            [langInfo.languageCode]: {
              ...prev[langInfo.languageCode],
              isGeneratingAudio: true,
              error: undefined
            }
          }));
          
          await generateAudioForLanguage(langInfo.languageCode, 'default');
          successCount++;
          
          // Add delay between generations to avoid overwhelming the API
          await new Promise(resolve => setTimeout(resolve, 2000));
          
        } catch (error) {
          console.error(`❌ Failed to generate audio for ${langInfo.languageName}:`, error);
          failCount++;
          
          // Update UI to show error
          setPodcastStatuses(prev => ({
            ...prev,
            [langInfo.languageCode]: {
              ...prev[langInfo.languageCode],
              isGeneratingAudio: false,
              error: error instanceof Error ? error.message : 'Generation failed'
            }
          }));
        }
      }
      
      // Step 4: Show results
      toast.dismiss('generate-all');
      
      if (failCount === 0) {
        toast.success(`🎉 Successfully started audio generation for all ${successCount} languages!`);
      } else if (successCount > 0) {
        toast.success(`✅ Started ${successCount} audio generations. ${failCount} failed - check logs.`, { duration: 6000 });
      } else {
        toast.error(`❌ Failed to start audio generation for all languages. Check console for details.`);
      }
      
      // Step 5: Refresh statuses after a delay
      setTimeout(() => {
        loadAllPodcastStatuses();
        triggerRefresh();
      }, 3000);
      
    } catch (error) {
      console.error('Failed to generate all audio:', error);
      toast.dismiss();
      toast.error(`Failed to generate audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setGlobalAudioGeneration(false);
    }
  };

  const viewPodcast = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // This would open the podcast viewer component
    // For now, just show a toast
    toast.success(`Opening ${getLanguageDisplayName(languageCode)} podcast viewer`);
  };

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp).toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Daily Podcast Generation</h2>
            <p className="text-sm text-gray-600 mt-1">Start here to create today's regulatory news podcast</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={runBackgroundAudioCheck}
              disabled={isLoading}
              className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded transition-colors disabled:opacity-50"
            >
              <FiCheckCircle className="inline w-4 h-4 mr-1" />
              Check for Updates
            </button>
            <button
              onClick={loadAllPodcastStatuses}
              disabled={isLoading}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition-colors disabled:opacity-50"
            >
              <FiRefreshCw className={`inline w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Status
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600">⚡</span>
            <div className="text-sm">
              <p className="font-medium text-yellow-800 mb-1">Quick Start Guide:</p>
              <ol className="list-decimal list-inside text-yellow-700 space-y-1">
                <li><strong>Step 1:</strong> Click "Generate English Content" to fetch today's SEBI/RBI news</li>
                <li><strong>Step 2:</strong> Click "Generate All Audio" to create podcasts in all 7 languages</li>
                <li><strong>Step 3:</strong> Monitor progress in the language cards below</li>
                <li><strong>Step 4:</strong> Download or play generated audio files</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => generateContentForLanguage('en', true)}
            disabled={globalAudioGeneration || isLoading || podcastStatuses['en']?.isGeneratingContent}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {podcastStatuses['en']?.isGeneratingContent ? (
              <FiLoader className="animate-spin" />
            ) : (
              <span>⚙️</span>
            )}
            <div className="text-left">
              <div className="text-sm font-medium">
                {podcastStatuses['en']?.isGeneratingContent ? 'Generating Content...' : 'Generate English Content'}
              </div>
              <div className="text-xs opacity-90">
                {podcastStatuses['en']?.isGeneratingContent ? 'Fetching latest regulatory news' : 'Fetch today\'s regulatory news'}
              </div>
            </div>
          </button>

          <button
            onClick={generateAllAudio}
            disabled={globalAudioGeneration || isLoading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {globalAudioGeneration ? (
              <FiLoader className="animate-spin" />
            ) : (
              <span>🎧</span>
            )}
            <div className="text-left">
              <div className="text-sm font-medium">
                {globalAudioGeneration ? 'Generating Missing Audio...' : 'Generate Missing Language Audio'}
              </div>
              <div className="text-xs opacity-90">
                {globalAudioGeneration ? 'Creating missing podcasts' : 'Smart check → Generate only what\'s missing'}
              </div>
            </div>
          </button>

          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            <span>📊</span>
            <div>
              <div className="font-medium">Cost Efficient</div>
              <div className="text-xs">1 API call → 7 languages</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Indicator */}
      {(podcastStatuses['en']?.isGeneratingContent || globalAudioGeneration) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <FiLoader className="animate-spin text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">
                {podcastStatuses['en']?.isGeneratingContent && 'Generating Content...'}
                {globalAudioGeneration && 'Generating Audio...'}
              </h3>
              <p className="text-blue-700 text-sm">
                {podcastStatuses['en']?.isGeneratingContent && 'Fetching latest regulatory news with Gemini AI + Google Search'}
                {globalAudioGeneration && 'Converting content to multi-language podcasts'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Languages */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Supported Languages ({languages.length})</h3>
            <p className="text-sm text-gray-600 mt-1">Track content and audio generation status for each language</p>
          </div>
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            🌍 All use English content as base
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {languages.map((language) => {
            const status = podcastStatuses[language.code] || {
              language: language.code,
              hasContent: false,
              isGeneratingAudio: false,
              isGeneratingContent: false,
              fromDatabase: false
            };

            return (
              <div key={language.code} className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
                {/* Language Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {language.code === 'en' && '🇺🇸'}
                      {language.code === 'hi' && '🇮🇳'}
                      {language.code === 'mr' && '🇮🇳'}
                      {language.code === 'gu' && '🇮🇳'}
                      {language.code === 'ta' && '🇮🇳'}
                      {language.code === 'te' && '🇮🇳'}
                      {language.code === 'bn' && '🇧🇩'}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{language.nativeName}</h4>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700 font-medium">Content:</span>
                    <span className={`px-2 py-0.5 rounded-full font-medium ${
                      status.hasContent 
                        ? 'bg-green-100 text-green-900 border border-green-200' 
                        : 'bg-red-100 text-red-900 border border-red-200'
                    }`}>
                      {status.hasContent ? '✓ Ready' : '✗ Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700 font-medium">Audio:</span>
                    <span className={`px-2 py-0.5 rounded-full font-medium ${
                      status.isGeneratingAudio ? 'bg-blue-100 text-blue-900 border border-blue-200' :
                      status.audioUrl ? 'bg-green-100 text-green-900 border border-green-200' : 
                      'bg-gray-100 text-gray-900 border border-gray-200'
                    }`}>
                      {status.isGeneratingAudio ? '⏳ Generating' :
                       status.audioUrl ? '✓ Ready' : '✗ None'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-1">
                  {language.code === 'en' ? (
                    <button
                      onClick={() => generateContentForLanguage('en', false)}
                      disabled={status.isGeneratingContent || isLoading}
                      className="w-full bg-green-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:text-gray-200 flex items-center justify-center space-x-1"
                    >
                      {status.isGeneratingContent && (
                        <FiLoader className="animate-spin w-3 h-3" />
                      )}
                      <span>
                        {status.isGeneratingContent ? 'Generating...' : 
                         status.hasContent ? 'Refresh Content' : 'Generate Content'}
                      </span>
                    </button>
                  ) : (
                    <div className="text-xs text-gray-600 text-center py-1 font-medium bg-gray-50 rounded">
                      Uses English content
                    </div>
                  )}
                  
                  {status.hasContent && (
                    <button
                      onClick={() => generateAudioForLanguage(language.code, 'default')}
                      disabled={status.isGeneratingAudio}
                      className="w-full bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:text-gray-200"
                    >
                      {status.audioUrl ? 'Regenerate Audio' : 'Generate Audio'}
                    </button>
                  )}
                  
                  {status.audioUrl && (
                    <a
                      href={status.audioUrl}
                      download={`podcast-${language.code}.mp3`}
                      className="block w-full bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-purple-700 transition-colors text-center"
                    >
                      Download Audio
                    </a>
                  )}
                </div>

                {/* Error */}
                {status.error && (
                  <div className="mt-2 text-xs text-red-600 bg-red-50 p-1 rounded">
                    {status.error}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-700">Loading podcast statuses...</span>
          </div>
        </div>
      )}
    </div>
  );
}
