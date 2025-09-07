'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface PodcastContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

export function PodcastProvider({ children }: { children: React.ReactNode }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <PodcastContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </PodcastContext.Provider>
  );
}

export function usePodcastRefresh() {
  const context = useContext(PodcastContext);
  if (context === undefined) {
    throw new Error('usePodcastRefresh must be used within a PodcastProvider');
  }
  return context;
}
