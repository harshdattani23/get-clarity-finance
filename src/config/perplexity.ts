/**
 * Perplexity API configuration
 * Manages endpoints, models, and feature flags for news synthesis
 */

export const PERPLEXITY_CONFIG = {
  // API endpoint for chat completions
  endpoint: 'https://api.perplexity.ai/chat/completions',
  
  // Model configuration - using sonar for cost-effective web search
  model: 'sonar',
  
  // Request timeout in milliseconds (increased to handle slow responses)
  timeout: 45000, // 45 seconds
  
  // Feature flags for Perplexity-specific capabilities
  features: {
    search_domain_filter: true,  // Enable domain filtering
    return_citations: true,      // Include source citations
    search_recency_filter: 'week', // Focus on recent news
  },
  
  // Temperature for response generation (lower = more deterministic)
  temperature: 0.2,
  
  // Maximum tokens for response
  max_tokens: 1200,
  
  // Top-p sampling parameter
  top_p: 0.9,
} as const;

// Type exports
export type PerplexityConfig = typeof PERPLEXITY_CONFIG;

// API key validation
export function getApiKey(): string {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    throw new Error('PERPLEXITY_API_KEY environment variable is not set');
  }
  return apiKey;
}

// Headers for API requests
export function getHeaders(): HeadersInit {
  return {
    'Authorization': `Bearer ${getApiKey()}`,
    'Content-Type': 'application/json',
  };
}
