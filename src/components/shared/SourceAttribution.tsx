'use client';

import { ExternalLink } from 'lucide-react';
import type { NewsSource } from '@/types/news';

interface SourceAttributionProps {
  sources: NewsSource[];
  compact?: boolean;
}

const SourceAttribution: React.FC<SourceAttributionProps> = ({ sources, compact = false }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  // Limit to 3 sources in compact mode
  const displaySources = compact ? sources.slice(0, 3) : sources;
  const remainingCount = sources.length - displaySources.length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-gray-500">Sources:</span>
      
      {displaySources.map((source, index) => (
        <a
          key={index}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
          title={source.url}
        >
          {/* Favicon */}
          {source.domain && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://www.google.com/s2/favicons?domain=${source.domain}&sz=16`}
              alt=""
              className="w-3 h-3"
              onError={(e) => {
                // Fallback to globe icon if favicon fails
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          
          {/* Domain or title */}
          <span className="max-w-[120px] truncate">
            {source.title || source.domain || 'Source'}
          </span>
          
          {/* External link icon */}
          <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
        </a>
      ))}
      
      {remainingCount > 0 && (
        <span className="text-xs text-gray-500">
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};

export default SourceAttribution;
