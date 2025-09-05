"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  Activity, 
  Zap, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users
} from 'lucide-react';

interface LiveStats {
  activeUsers: number;
  queriesPerMinute: number;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  systemHealth: 'HEALTHY' | 'WARNING' | 'ERROR';
  realtimeAlerts: Array<{
    id: string;
    type: 'fraud' | 'system' | 'security';
    message: string;
    timestamp: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

export function LiveDashboard() {
  const [liveStats, setLiveStats] = useState<LiveStats>({
    activeUsers: 0,
    queriesPerMinute: 0,
    threatLevel: 'LOW',
    systemHealth: 'HEALTHY',
    realtimeAlerts: []
  });
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState(true);

  const generateMockStats = useCallback((): LiveStats => {
    const baseUsers = Math.floor(Math.random() * 50) + 10;
    const baseQueries = Math.floor(Math.random() * 25) + 5;
    
    // Simulate some exciting activity
    const threats = ['LOW', 'MEDIUM', 'HIGH'] as const;
    const systems = ['HEALTHY', 'WARNING'] as const;
    
    const mockAlerts = [];
    const alertTypes = ['fraud', 'system', 'security'] as const;
    const alertMessages = {
      fraud: [
        'Potential pump-and-dump scheme detected in social media',
        'Suspicious advisor credentials flagged',
        'High-risk investment offer reported'
      ],
      system: [
        'High API response time detected',
        'Database query optimization suggested',
        'Cache hit rate below optimal'
      ],
      security: [
        'Multiple failed login attempts blocked',
        'Unusual access pattern detected',
        'Security scan completed successfully'
      ]
    };
    
    // Generate 1-3 random alerts
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const messages = alertMessages[type];
      mockAlerts.push({
        id: `alert_${Date.now()}_${i}`,
        type,
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 300000)).toISOString(), // Last 5 minutes
        severity: (Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low') as 'low' | 'medium' | 'high'
      });
    }
    
    return {
      activeUsers: baseUsers,
      queriesPerMinute: baseQueries,
      threatLevel: threats[Math.floor(Math.random() * threats.length)],
      systemHealth: systems[Math.floor(Math.random() * systems.length)],
      realtimeAlerts: mockAlerts
    };
  }, []);

  const updateStats = useCallback(() => {
    setLiveStats(generateMockStats());
    setLastUpdated(new Date());
  }, [generateMockStats]);

  useEffect(() => {
    // Initial load
    updateStats();
    
    // Update every 5 seconds for demo effect
    const interval = setInterval(updateStats, 5000);
    
    // Simulate connection status
    const connectionCheck = setInterval(() => {
      setIsConnected(prev => Math.random() > 0.1 ? true : prev); // 90% uptime
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearInterval(connectionCheck);
    };
  }, [updateStats]);

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getSystemHealthColor = (health: string) => {
    switch (health) {
      case 'ERROR': return 'text-red-600 bg-red-100';
      case 'WARNING': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Live System Monitor
          </h2>
          <p className="text-sm text-gray-500">Real-time fraud detection status</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
            isConnected ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            } ${isConnected ? 'animate-pulse' : ''}`} />
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
          
          <div className="text-xs text-gray-500">
            Updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Live Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Active Users</p>
              <p className="text-2xl font-bold text-blue-900">{liveStats.activeUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-3 h-3 text-blue-500 mr-1" />
            <span className="text-xs text-blue-600">Live count</span>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Queries/Min</p>
              <p className="text-2xl font-bold text-green-900">{liveStats.queriesPerMinute}</p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600">Real-time</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Threat Level</p>
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getThreatColor(liveStats.threatLevel)}`}>
                {liveStats.threatLevel}
              </div>
            </div>
            <Shield className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">System Health</p>
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getSystemHealthColor(liveStats.systemHealth)}`}>
                {liveStats.systemHealth}
              </div>
            </div>
            <CheckCircle2 className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Real-time Alerts */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Live Alerts
        </h3>
        
        {liveStats.realtimeAlerts.length > 0 ? (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {liveStats.realtimeAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.severity)} transition-all duration-300`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 capitalize">{alert.type}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 capitalize">{alert.severity} priority</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {new Date(alert.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-sm">All systems operating normally</p>
          </div>
        )}
      </div>
    </div>
  );
}
