/**
 * News configuration
 * Defines trusted sources and default topics for Indian financial markets
 */

// Trusted news domains for Indian financial markets
export const TRUSTED_NEWS_DOMAINS = [
  // Indian Financial News
  'economictimes.indiatimes.com',
  'moneycontrol.com',
  'livemint.com',
  'business-standard.com',
  'thehindubusinessline.com',
  'financialexpress.com',
  
  // Regulatory Bodies
  'sebi.gov.in',
  'nseindia.com',
  'bseindia.com',
  'rbi.org.in',
  
  // Global Financial News
  'reuters.com',
  'bloomberg.com',
  'ft.com',
  'wsj.com',
  
  // Indian General News with Business Sections
  'thehindu.com',
  'indianexpress.com',
  'ndtv.com',
] as const;

// Default topics for news synthesis
export const DEFAULT_TOPICS = [
  'Indian stock markets',
  'NSE Nifty 50',
  'BSE Sensex',
  'RBI monetary policy',
  'SEBI regulations',
  'Banking sector India',
  'IT services India',
  'Energy sector India',
  'Indian economy',
] as const;

// Market sectors for filtering
export const MARKET_SECTORS = [
  { id: 'banking', label: 'Banking & Finance', icon: '🏦' },
  { id: 'it', label: 'IT Services', icon: '💻' },
  { id: 'pharma', label: 'Pharmaceuticals', icon: '💊' },
  { id: 'auto', label: 'Automobile', icon: '🚗' },
  { id: 'energy', label: 'Energy & Power', icon: '⚡' },
  { id: 'fmcg', label: 'FMCG', icon: '🛒' },
  { id: 'realty', label: 'Real Estate', icon: '🏢' },
  { id: 'metals', label: 'Metals & Mining', icon: '⛏️' },
] as const;

// Language configurations
export const SUPPORTED_LANGUAGES = {
  en: { code: 'en', label: 'English', nativeName: 'English' },
  hi: { code: 'hi', label: 'Hindi', nativeName: 'हिंदी' },
  mr: { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  gu: { code: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી' },
  ta: { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  te: { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  bn: { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
} as const;

// Cache configuration
export const NEWS_CACHE_CONFIG = {
  ttl: 300, // 5 minutes in seconds
  maxSize: 50, // Maximum number of cached responses
} as const;

// Rate limiting configuration
export const RATE_LIMIT_CONFIG = {
  maxRequests: 12, // Maximum requests per window
  windowMs: 60000, // 1 minute window
} as const;

// Type exports
export type TrustedDomain = typeof TRUSTED_NEWS_DOMAINS[number];
export type DefaultTopic = typeof DEFAULT_TOPICS[number];
export type MarketSector = typeof MARKET_SECTORS[number];
export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;
