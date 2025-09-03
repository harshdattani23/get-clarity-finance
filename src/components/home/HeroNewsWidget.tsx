'use client';

import { useState, useEffect, useCallback } from 'react';
import { Newspaper, AlertCircle, RefreshCw, Loader2, ChevronLeft, ChevronRight, Sparkles, ExternalLink, Globe } from 'lucide-react';
import { DEFAULT_TOPICS, MARKET_SECTORS, SUPPORTED_LANGUAGES } from '@/config/news';
import type { NewsItem as NewsItemType, NewsApiResponse } from '@/types/news';

const HeroNewsWidget: React.FC = () => {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | undefined>(undefined);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAllSectors, setShowAllSectors] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof SUPPORTED_LANGUAGES>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);

  const fetchNews = useCallback(async () => {
    try {
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (selectedSector) {
        params.append('sector', selectedSector);
      } else {
        params.append('topics', DEFAULT_TOPICS.slice(0, 3).join(','));
      }
      
      params.append('maxItems', '8');  // Fetch more to show View More button
      params.append('lang', selectedLanguage);
      
      // Fetch from API
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
      // Set the last update time from the API response
      if (data.queriedAt) {
        setLastUpdateTime(data.queriedAt);
      } else {
        setLastUpdateTime(new Date().toISOString());
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load news');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [selectedSector, selectedLanguage]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setShowAllNews(false);
    fetchNews();
  };

  const handleSectorChange = (sectorId: string | undefined) => {
    setSelectedSector(sectorId);
    setLoading(true);
    setShowAllNews(false);
  };

  const handleLanguageChange = (lang: keyof typeof SUPPORTED_LANGUAGES) => {
    setSelectedLanguage(lang);
    setShowLanguageMenu(false);
    setLoading(true);
    setShowAllNews(false);
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
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="flex gap-2">
              <div className="h-5 bg-gray-200 rounded-full w-16"></div>
            </div>
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
            <span className="line-clamp-1">Unable to load news</span>
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

  // Primary sectors to always show (including regulatory)
  const regulatoryIndex = MARKET_SECTORS.findIndex(s => s.id === 'regulatory');
  const primarySectors = [
    ...MARKET_SECTORS.slice(0, 3),
    MARKET_SECTORS[regulatoryIndex] // Add regulatory to primary
  ];
  const secondarySectors = MARKET_SECTORS.filter((s, idx) => 
    idx !== regulatoryIndex && idx >= 3
  );

  return (
    <div className="h-full flex flex-col">
      {/* Creative Sector Filters */}
      <div className="mb-2">
        {/* Main Sector Pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => handleSectorChange(undefined)}
            className={`group relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
              !selectedSector
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md'
            }`}
          >
            <span className="relative z-10 flex items-center gap-1">
              {!selectedSector && <Sparkles className="w-3 h-3" />}
              All Sectors
            </span>
            {!selectedSector && (
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg blur opacity-40"></span>
            )}
          </button>
          
          {primarySectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => handleSectorChange(sector.id)}
              className={`group relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                selectedSector === sector.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1">
                <span className="text-sm">{sector.icon}</span>
                <span>{sector.label.split(' ')[0]}</span>
              </span>
              {selectedSector === sector.id && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg blur opacity-40"></span>
              )}
            </button>
          ))}
          
          {/* More Button */}
          {!showAllSectors ? (
            <button
              onClick={() => setShowAllSectors(true)}
              className="group relative px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300"
            >
              <span className="flex items-center gap-1">
                More
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          ) : (
            <button
              onClick={() => setShowAllSectors(false)}
              className="group relative px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300"
            >
              <span className="flex items-center gap-1">
                <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                Less
              </span>
            </button>
          )}
          
          {/* Language Selector */}
          <div className="relative ml-auto">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all flex items-center gap-1"
              title="Select language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{SUPPORTED_LANGUAGES[selectedLanguage].label}</span>
              <ChevronRight className={`w-3 h-3 transition-transform ${showLanguageMenu ? 'rotate-90' : ''}`} />
            </button>
            
            {/* Language Dropdown */}
            {showLanguageMenu && (
              <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code as keyof typeof SUPPORTED_LANGUAGES)}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between ${
                      selectedLanguage === code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    {selectedLanguage === code && <span className="text-blue-600">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
            title="Refresh news"
          >
            {isRefreshing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
        
        {/* Secondary Sectors - Animated Expansion */}
        <div className={`grid grid-cols-2 gap-1.5 overflow-hidden transition-all duration-500 ease-in-out ${
          showAllSectors ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {secondarySectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => {
                handleSectorChange(sector.id);
                setShowAllSectors(false);
              }}
              className={`group relative px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                selectedSector === sector.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="flex items-center gap-1 justify-center">
                <span className="text-sm">{sector.icon}</span>
                <span className="truncate">{sector.label}</span>
              </span>
            </button>
          ))}
        </div>
        
        {/* Active Sector Indicator with Live Time */}
        <div className="mt-1.5 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            {selectedSector && (
              <>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Showing {MARKET_SECTORS.find(s => s.id === selectedSector)?.label} news</span>
              </>
            )}
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

      {/* News List - Smooth Scroll */}
      <div className="flex-1 overflow-hidden relative">
        <div 
          className="h-full overflow-y-auto space-y-2 pr-1 scrollbar-hide"
        >
          {news.length === 0 ? (
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
                  
                  {/* Sentiment and Ticker Row */}
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
                  
                  {/* Creative Source Display */}
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5">
                      {item.sources && item.sources.length > 0 ? (
                        <>
                          <span className="text-[10px] text-gray-400">via</span>
                          <div className="flex items-center gap-1">
                            {(() => {
                              // Group sources by domain but keep them all for diversity
                              type SourceWithDisplay = typeof item.sources[0] & { displayName: string };
                              const sourcesByDomain = new Map<string, SourceWithDisplay[]>();
                              
                              item.sources.forEach(source => {
                                if (!source) return;
                                
                                // Get source identifier
                                let urlHostname = null;
                                if (source?.url) {
                                  try {
                                    urlHostname = new URL(source.url).hostname.replace('www.', '').split('.')[0];
                                  } catch (e) {
                                    // Invalid URL, ignore
                                    console.warn('Invalid URL in news source:', source.url);
                                  }
                                }
                                const sourceName = source?.domain || source?.title || urlHostname || 'News Source';
                                
                                const sourceKey = sourceName.toLowerCase();
                                
                                if (!sourcesByDomain.has(sourceKey)) {
                                  sourcesByDomain.set(sourceKey, []);
                                }
                                sourcesByDomain.get(sourceKey)?.push({
                                  ...source,
                                  displayName: sourceName
                                });
                              });
                              
                              // Select sources to display - pick randomly from each domain group
                              const displaySources: SourceWithDisplay[] = [];
                              const domains = Array.from(sourcesByDomain.keys());
                              
                              // If we have multiple domains, show one from each (up to 2)
                              if (domains.length >= 2) {
                                domains.slice(0, 2).forEach(domain => {
                                  const domainSources = sourcesByDomain.get(domain) || [];
                                  if (domainSources.length > 0) {
                                    // Pick a random source from this domain
                                    const randomIndex = Math.floor(Math.random() * domainSources.length);
                                    displaySources.push(domainSources[randomIndex]);
                                  }
                                });
                              } else if (domains.length === 1) {
                                // If only one domain, show up to 2 different articles from it
                                const domainSources = sourcesByDomain.get(domains[0]) || [];
                                const indicesToShow = domainSources.length === 1 ? [0] : 
                                  domainSources.length === 2 ? [0, 1] :
                                  // Pick 2 random indices if more than 2 sources
                                  [Math.floor(Math.random() * domainSources.length), 
                                   Math.floor(Math.random() * domainSources.length)].filter((v, i, a) => a.indexOf(v) === i).slice(0, 2);
                                
                                indicesToShow.forEach(idx => {
                                  if (domainSources[idx]) {
                                    displaySources.push(domainSources[idx]);
                                  }
                                });
                              }
                              
                              return (
                                <>
                                  {displaySources.map((source, idx) => {
                                    const sourceName = source.displayName;
                                    
                                    // Get short name for display
                                    const shortName = sourceName.length > 15 
                                      ? sourceName.substring(0, 12) + '...' 
                                      : sourceName;
                                    
                                    // Get favicon URL or emoji icon
                                    const getSourceDisplay = (source: typeof displaySources[0]) => {
                                      const name = source.displayName;
                                      const lowerName = name.toLowerCase();
                                      
                                      // Try to get favicon from domain
                                      if (source.domain || source.url) {
                                        let domain: string | null = source.domain || null;
                                        if (!domain && source.url) {
                                          try {
                                            domain = new URL(source.url).hostname;
                                          } catch (e) {
                                            // Invalid URL, skip domain extraction
                                            console.warn('Invalid URL in source display:', source.url);
                                            domain = null;
                                          }
                                        }
                                        
                                        if (domain) {
                                          // Special cases for known domains
                                          if (domain.includes('sebi.gov.in')) return '🏛️';
                                          if (domain.includes('nseindia.com')) return '📊';
                                          if (domain.includes('bseindia.com')) return '📈';
                                          if (domain.includes('rbi.org.in')) return '🏦';
                                          
                                          // Return favicon URL for other domains
                                          return {
                                            type: 'favicon',
                                            url: `https://www.google.com/s2/favicons?domain=${domain}&sz=16`
                                          };
                                        }
                                      }
                                      
                                      // Fallback to emoji icons
                                      if (lowerName.includes('economic') || lowerName.includes('et')) return '📈';
                                      if (lowerName.includes('money') || lowerName.includes('mint')) return '💰';
                                      if (lowerName.includes('reuters')) return '🌐';
                                      if (lowerName.includes('bloomberg')) return '📊';
                                      if (lowerName.includes('business')) return '💼';
                                      if (lowerName.includes('cnbc')) return '📺';
                                      if (lowerName.includes('financial')) return '💹';
                                      if (lowerName.includes('times') && !lowerName.includes('economic')) return '🗞️';
                                      if (lowerName.includes('hindu')) return '📄';
                                      return '📰';
                                    };
                                    
                                    const sourceDisplay = getSourceDisplay(source);
                                    
                                    return source?.url ? (
                                      <a
                                        key={idx}
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 hover:bg-blue-100 rounded text-[10px] text-blue-700 font-medium transition-colors group"
                                        onClick={(e) => e.stopPropagation()}
                                        title={sourceName}
                                      >
                                        {sourceDisplay && typeof sourceDisplay === 'object' ? (
                                          <img 
                                            src={sourceDisplay.url} 
                                            alt={sourceName}
                                            className="w-3 h-3 rounded-sm"
                                            onError={(e) => {
                                              e.currentTarget.style.display = 'none';
                                              e.currentTarget.nextElementSibling!.textContent = '📰';
                                            }}
                                          />
                                        ) : (
                                          <span>{sourceDisplay}</span>
                                        )}
                                        <span className="group-hover:underline">{shortName}</span>
                                        <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </a>
                                    ) : (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600"
                                        title={sourceName}
                                      >
                                        {sourceDisplay && typeof sourceDisplay === 'object' ? (
                                          <img 
                                            src={sourceDisplay.url} 
                                            alt={sourceName}
                                            className="w-3 h-3 rounded-sm"
                                            onError={(e) => {
                                              e.currentTarget.style.display = 'none';
                                              e.currentTarget.nextElementSibling!.textContent = '📰';
                                            }}
                                          />
                                        ) : (
                                          <span>{sourceDisplay}</span>
                                        )}
                                        <span>{shortName}</span>
                                      </span>
                                    );
                                  })}
                                  {item.sources.length > 2 && (
                                    <span className="px-1 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500">
                                      +{item.sources.length - 2} more
                                    </span>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </>
                      ) : (
                        // Fallback when no sources - show mock trusted sources
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-gray-400">via</span>
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600">
                            <span>📰</span>
                            <span>Verified Sources</span>
                          </span>
                        </div>
                      )}
                    </div>
                    
                  </div>
                </div>
              ))}
              
              {/* View More/Less Button */}
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
          )}
        </div>
        
        {/* Fade effect at bottom */}
        {news.length > 2 && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default HeroNewsWidget;
