/**
 * Type definitions for news synthesis and related data structures
 */

// Source information for a news item
export interface NewsSource {
  url: string;
  title?: string;
  domain?: string;
  publishedAt?: string;
}

// Individual news item
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  tickers?: string[];
  sentiment?: 'positive' | 'neutral' | 'negative';
  sources: NewsSource[];
  relevanceScore?: number;
}

// Complete news synthesis response
export interface NewsSynthesis {
  items: NewsItem[];
  lang: string;
  model: string;
  citationsObserved: boolean;
  synthesizedAt: string;
  raw?: unknown; // Raw API response for debugging
}

// API request parameters
export interface NewsSynthesisParams {
  topics?: string[];
  query?: string;
  lang?: string;
  maxItems?: number;
  sector?: string;
}

// API response format
export interface NewsApiResponse {
  items: NewsItem[];
  lang: string;
  model: string;
  cached: boolean;
  queriedAt: string;
  warnings?: string[];
}

// Perplexity API message format
export interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Perplexity API request format
export interface PerplexityRequest {
  model: string;
  messages: PerplexityMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  search_domain_filter?: string[];
  return_citations?: boolean;
  search_recency_filter?: string;
}

// Perplexity API response format
export interface PerplexityResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  citations?: string[];
}

// Error response format
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
