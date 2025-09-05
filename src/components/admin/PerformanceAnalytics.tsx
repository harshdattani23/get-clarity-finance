"use client";

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Zap, Database, Globe, Cpu } from 'lucide-react';

interface PerformanceMetrics {
  apiResponseTime: number;
  databaseQueries: number;
  cacheHitRate: number;
  activeConnections: number;
  memoryUsage: number;
  cpuUsage: number;
  errorRate: number;
  uptime: string;
}

export function PerformanceAnalytics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    apiResponseTime: 0,
    databaseQueries: 0,
    cacheHitRate: 0,
    activeConnections: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    errorRate: 0,
    uptime: '0 days'
  });

  useEffect(() => {
    // Simulate realistic performance metrics
    const updateMetrics = () => {
      setMetrics({
        apiResponseTime: Math.floor(Math.random() * 200) + 50, // 50-250ms
        databaseQueries: Math.floor(Math.random() * 1000) + 500,
        cacheHitRate: Math.floor(Math.random() * 30) + 70, // 70-100%
        activeConnections: Math.floor(Math.random() * 50) + 10,
        memoryUsage: Math.floor(Math.random() * 40) + 30, // 30-70%
        cpuUsage: Math.floor(Math.random() * 60) + 10, // 10-70%
        errorRate: Math.random() * 2, // 0-2%
        uptime: `${Math.floor(Math.random() * 30) + 1} days`
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = (value: number, type: 'response' | 'cache' | 'usage' | 'error') => {
    switch (type) {
      case 'response':
        if (value < 100) return 'text-green-600 bg-green-100';
        if (value < 200) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
      case 'cache':
        if (value > 85) return 'text-green-600 bg-green-100';
        if (value > 70) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
      case 'usage':
        if (value < 50) return 'text-green-600 bg-green-100';
        if (value < 75) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
      case 'error':
        if (value < 1) return 'text-green-600 bg-green-100';
        if (value < 3) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Performance Analytics
          </h2>
          <p className="text-sm text-gray-500">System health and performance metrics</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>System Uptime: {metrics.uptime}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* API Response Time */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-200 rounded-lg">
              <Zap className="w-4 h-4 text-blue-700" />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getHealthStatus(metrics.apiResponseTime, 'response')}`}>
              {metrics.apiResponseTime < 100 ? 'Fast' : metrics.apiResponseTime < 200 ? 'Good' : 'Slow'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700">API Response</p>
            <p className="text-2xl font-bold text-blue-900">{metrics.apiResponseTime}ms</p>
            <p className="text-xs text-blue-600 mt-1">Average latency</p>
          </div>
        </div>

        {/* Database Performance */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-200 rounded-lg">
              <Database className="w-4 h-4 text-green-700" />
            </div>
            <span className="text-xs text-green-700 bg-green-200 px-2 py-1 rounded-full font-medium">
              Active
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-green-700">DB Queries</p>
            <p className="text-2xl font-bold text-green-900">{metrics.databaseQueries.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">Total executed</p>
          </div>
        </div>

        {/* Cache Performance */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-200 rounded-lg">
              <Globe className="w-4 h-4 text-purple-700" />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getHealthStatus(metrics.cacheHitRate, 'cache')}`}>
              {metrics.cacheHitRate > 85 ? 'Excellent' : metrics.cacheHitRate > 70 ? 'Good' : 'Poor'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-purple-700">Cache Hit Rate</p>
            <p className="text-2xl font-bold text-purple-900">{metrics.cacheHitRate}%</p>
            <p className="text-xs text-purple-600 mt-1">Redis performance</p>
          </div>
        </div>

        {/* System Resources */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-200 rounded-lg">
              <Cpu className="w-4 h-4 text-orange-700" />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getHealthStatus(metrics.cpuUsage, 'usage')}`}>
              {metrics.cpuUsage < 50 ? 'Optimal' : metrics.cpuUsage < 75 ? 'High' : 'Critical'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-orange-700">CPU Usage</p>
            <p className="text-2xl font-bold text-orange-900">{metrics.cpuUsage}%</p>
            <p className="text-xs text-orange-600 mt-1">Server load</p>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Active Connections</p>
              <p className="text-xl font-bold text-gray-900">{metrics.activeConnections}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Memory Usage</p>
              <p className="text-xl font-bold text-gray-900">{metrics.memoryUsage}%</p>
            </div>
            <div className="w-full max-w-16">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    metrics.memoryUsage < 50 ? 'bg-green-500' : 
                    metrics.memoryUsage < 75 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${metrics.memoryUsage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Error Rate</p>
              <p className="text-xl font-bold text-gray-900">{metrics.errorRate.toFixed(2)}%</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getHealthStatus(metrics.errorRate, 'error')}`}>
              {metrics.errorRate < 1 ? 'Stable' : metrics.errorRate < 3 ? 'Elevated' : 'High'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
