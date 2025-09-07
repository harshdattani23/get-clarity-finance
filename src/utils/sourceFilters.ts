/**
 * Utility functions to identify and filter paywalled news sources
 * to prevent "Paywalled source" errors from Google NotebookLM
 */

// Known paywalled domains that commonly cause issues with NotebookLM
const KNOWN_PAYWALLED_DOMAINS = [
  'economictimes.indiatimes.com',
  'livemint.com',
  'business-standard.com',
  'financialexpress.com',
  'bloomberg.com',
  'reuters.com',
  'wsj.com',
  'ft.com',
  'thehindu.com',
  'indianexpress.com',
  'mint.com'
];

// Paywalled URL patterns that typically indicate subscription content
const PAYWALLED_URL_PATTERNS = [
  /\/premium\//i,
  /\/subscriber\//i,
  /\/exclusive\//i,
  /\/paid\//i,
  /\/subscription\//i,
  /\/pro\//i,
  /\/members\//i,
  /\/insider\//i
];

// Free/open sources that are generally accessible
const TRUSTED_FREE_DOMAINS = [
  'sebi.gov.in',
  'rbi.org.in',
  'pib.gov.in',
  'prs.org.in',
  'moneycontrol.com',
  'zeebiz.com',
  'business-today.in',
  'thehindubusinessline.com'
];

export interface SourceValidationResult {
  url: string;
  isPaywalled: boolean;
  reason?: string;
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Check if a URL is likely to be paywalled
 */
export function isPaywalledSource(url: string): SourceValidationResult {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.toLowerCase();
    const fullUrl = url.toLowerCase();

    // Check if domain is in known free sources (highest confidence)
    if (TRUSTED_FREE_DOMAINS.some(trustedDomain => domain.includes(trustedDomain))) {
      return {
        url,
        isPaywalled: false,
        reason: 'Trusted free domain',
        confidence: 'high'
      };
    }

    // Check for paywalled URL patterns
    for (const pattern of PAYWALLED_URL_PATTERNS) {
      if (pattern.test(fullUrl)) {
        return {
          url,
          isPaywalled: true,
          reason: `Contains paywalled URL pattern: ${pattern.source}`,
          confidence: 'high'
        };
      }
    }

    // Check if domain is in known paywalled list
    if (KNOWN_PAYWALLED_DOMAINS.some(paywalledDomain => domain.includes(paywalledDomain))) {
      return {
        url,
        isPaywalled: true,
        reason: `Known paywalled domain: ${domain}`,
        confidence: 'medium'
      };
    }

    // Default: assume free but with low confidence
    return {
      url,
      isPaywalled: false,
      reason: 'No paywalled indicators found',
      confidence: 'low'
    };

  } catch (error) {
    return {
      url,
      isPaywalled: true,
      reason: 'Invalid URL format',
      confidence: 'high'
    };
  }
}

/**
 * Filter out paywalled sources from a list of sources
 */
export function filterPaywalledSources(sources: Array<{title: string; url: string; publishedAt?: string}>): {
  filteredSources: Array<{title: string; url: string; publishedAt?: string}>,
  removedSources: Array<{title: string; url: string; reason: string}>,
  summary: {
    total: number;
    kept: number;
    removed: number;
  }
} {
  const filteredSources = [];
  const removedSources = [];

  for (const source of sources) {
    const validation = isPaywalledSource(source.url);
    
    if (validation.isPaywalled) {
      removedSources.push({
        title: source.title,
        url: source.url,
        reason: validation.reason || 'Paywalled source detected'
      });
    } else {
      filteredSources.push(source);
    }
  }

  return {
    filteredSources,
    removedSources,
    summary: {
      total: sources.length,
      kept: filteredSources.length,
      removed: removedSources.length
    }
  };
}

/**
 * Get a detailed report of source validation
 */
export function validateAllSources(sources: Array<{title: string; url: string; publishedAt?: string}>): {
  results: Array<SourceValidationResult & {title: string}>,
  summary: {
    total: number;
    free: number;
    paywalled: number;
    highConfidencePaywalled: number;
  }
} {
  const results = sources.map(source => ({
    ...isPaywalledSource(source.url),
    title: source.title
  }));

  const summary = {
    total: results.length,
    free: results.filter(r => !r.isPaywalled).length,
    paywalled: results.filter(r => r.isPaywalled).length,
    highConfidencePaywalled: results.filter(r => r.isPaywalled && r.confidence === 'high').length
  };

  return { results, summary };
}
