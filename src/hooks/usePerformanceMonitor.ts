import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  startTime: number;
  firstContentfulPaint?: number;
  domContentLoaded?: number;
  loadComplete?: number;
}

export function usePerformanceMonitor(componentName: string) {
  const metricsRef = useRef<PerformanceMetrics>({
    startTime: performance.now()
  });

  useEffect(() => {
    const metrics = metricsRef.current;
    
    // Measure when component mounts (first contentful paint equivalent)
    metrics.firstContentfulPaint = performance.now();
    
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 ${componentName} Performance:`, {
        timeToMount: `${(metrics.firstContentfulPaint - metrics.startTime).toFixed(2)}ms`,
        timestamp: new Date().toISOString()
      });
    }
    
    return () => {
      // Measure when component unmounts
      metrics.loadComplete = performance.now();
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`⚡ ${componentName} Complete:`, {
          totalTime: `${(metrics.loadComplete - metrics.startTime).toFixed(2)}ms`,
          timestamp: new Date().toISOString()
        });
      }
    };
  }, [componentName]);

  const markMilestone = (milestoneName: string) => {
    const currentTime = performance.now();
    const timeFromStart = currentTime - metricsRef.current.startTime;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${componentName} - ${milestoneName}: ${timeFromStart.toFixed(2)}ms`);
    }
    
    return timeFromStart;
  };

  return { markMilestone };
}
