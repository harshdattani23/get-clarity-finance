"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  Activity, 
  Database, 
  Server, 
  HardDrive,
  Shield,
  Cpu,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  Zap,
  FileText,
  WifiOff
} from 'lucide-react';

interface SystemHealthData {
  timestamp: string;
  uptime: {
    seconds: number;
    formatted: string;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
    free: number;
  };
  database: {
    connectionStatus: 'healthy' | 'degraded' | 'error';
    responseTime: number;
    activeConnections: number;
    totalQueries: number;
    queriesLast24h: number;
    errorRate: number;
  };
  api: {
    totalRequests: number;
    requestsLast24h: number;
    averageResponseTime: number;
    errorCount: number;
    successRate: number;
  };
  storage: {
    totalFiles: number;
    totalSizeGB: number;
    uploadsLast24h: number;
  };
  security: {
    blockedAttempts: number;
    activeUsers: number;
    suspiciousActivity: number;
    fraudReports: number;
  };
  performance: {
    cpuUsage: number;
    loadAverage: number;
    responseTimeP95: number;
    responseTimeP99: number;
  };
}

export function RealSystemHealth() {
  const [healthData, setHealthData] = useState<SystemHealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchHealthData = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/system-health');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setHealthData(result.data);
        setError(null);
      } else {
        throw new Error(result.error || 'Failed to fetch system health');
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('System health fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealthData();
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchHealthData, 10000);
    
    return () => clearInterval(interval);
  }, [fetchHealthData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPercentageColor = (percentage: number, reverse = false) => {
    if (reverse) {
      if (percentage < 30) return 'text-green-600 bg-green-100';
      if (percentage < 70) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    } else {
      if (percentage > 70) return 'text-green-600 bg-green-100';
      if (percentage > 30) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <WifiOff className="w-6 h-6" />
          <h2 className="text-lg font-semibold">System Health Monitor - Connection Error</h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 mb-2">Failed to fetch system health data:</p>
          <code className="text-sm text-red-800 bg-red-100 px-2 py-1 rounded">{error}</code>
        </div>
        <button 
          onClick={() => {setLoading(true); fetchHealthData();}}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!healthData) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-600" />
            Real-Time System Health Monitor
          </h2>
          <p className="text-sm text-gray-500">Live server metrics and performance data</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-green-700 bg-green-100">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Data
          </div>
          <div className="text-xs text-gray-500">
            Updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Server Uptime */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-200 rounded-lg">
              <Clock className="w-4 h-4 text-blue-700" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-medium text-green-700 bg-green-200">
              Online
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700">Server Uptime</p>
            <p className="text-xl font-bold text-blue-900">{healthData.uptime.formatted}</p>
            <p className="text-xs text-blue-600 mt-1">{formatNumber(healthData.uptime.seconds)} seconds</p>
          </div>
        </div>

        {/* Memory Usage */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-200 rounded-lg">
              <Cpu className="w-4 h-4 text-purple-700" />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPercentageColor(healthData.memory.percentage, true)}`}>
              {healthData.memory.percentage}%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-purple-700">Memory Usage</p>
            <p className="text-xl font-bold text-purple-900">{healthData.memory.used} MB</p>
            <p className="text-xs text-purple-600 mt-1">of {healthData.memory.total} MB total</p>
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-200 rounded-lg">
              <Database className="w-4 h-4 text-green-700" />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(healthData.database.connectionStatus)}`}>
              {healthData.database.connectionStatus}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-green-700">Database</p>
            <p className="text-xl font-bold text-green-900">{healthData.database.responseTime}ms</p>
            <p className="text-xs text-green-600 mt-1">{healthData.database.activeConnections} connections</p>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-200 rounded-lg">
              <Users className="w-4 h-4 text-orange-700" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-medium text-blue-700 bg-blue-200">
              Live
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-orange-700">Active Users</p>
            <p className="text-xl font-bold text-orange-900">{formatNumber(healthData.security.activeUsers)}</p>
            <p className="text-xs text-orange-600 mt-1">Last hour</p>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* API Performance */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            API Performance
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Requests</span>
              <span className="font-semibold text-gray-900">{formatNumber(healthData.api.totalRequests)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Requests (24h)</span>
              <span className="font-semibold text-gray-900">{formatNumber(healthData.api.requestsLast24h)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Response Time</span>
              <span className="font-semibold text-gray-900">{healthData.api.averageResponseTime}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className={`font-semibold px-2 py-1 rounded text-xs ${getPercentageColor(healthData.api.successRate)}`}>
                {healthData.api.successRate.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Storage & Security */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Storage & Security
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Files</span>
              <span className="font-semibold text-gray-900">{formatNumber(healthData.storage.totalFiles)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Storage Used</span>
              <span className="font-semibold text-gray-900">{healthData.storage.totalSizeGB} GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fraud Reports</span>
              <span className="font-semibold text-red-600">{formatNumber(healthData.security.fraudReports)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Suspicious Activity</span>
              <span className="font-semibold text-yellow-600">{formatNumber(healthData.security.suspiciousActivity)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Database Metrics */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-4 h-4" />
          Database Performance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{formatNumber(healthData.database.totalQueries)}</div>
            <div className="text-xs text-gray-500">Total Queries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formatNumber(healthData.database.queriesLast24h)}</div>
            <div className="text-xs text-gray-500">Queries (24h)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{healthData.database.responseTime}ms</div>
            <div className="text-xs text-gray-500">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{healthData.database.activeConnections}</div>
            <div className="text-xs text-gray-500">Connections</div>
          </div>
        </div>
      </div>

      {/* System Status Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>All systems operational</span>
          </div>
          <div className="text-gray-500">
            Auto-refresh every 10 seconds • Data from {new Date(healthData.timestamp).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
