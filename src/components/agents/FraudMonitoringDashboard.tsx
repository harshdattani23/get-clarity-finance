'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Activity, TrendingUp, Users, FileText, Camera, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThreatMetrics {
  totalThreatsDetected: number;
  highRiskAlerts: number;
  verifiedFrauds: number;
  pendingReview: number;
}

interface RecentThreat {
  id: string;
  type: string;
  platform?: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  description: string;
  affectedStocks?: string[];
}

interface AnalysisResult {
  error?: string;
  message?: string;
  reportId?: string;
  threat?: {
    riskScore: number;
    threatType?: string;
    affectedStocks?: string[];
  };
  analysis?: {
    riskLevel: string;
  };
  verification?: {
    credibilityScore: number;
  };
}

export default function FraudMonitoringDashboard() {
  const [metrics, setMetrics] = useState<ThreatMetrics>({
    totalThreatsDetected: 0,
    highRiskAlerts: 0,
    verifiedFrauds: 0,
    pendingReview: 0
  });

  const [recentThreats, setRecentThreats] = useState<RecentThreat[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [testContent, setTestContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        totalThreatsDetected: prev.totalThreatsDetected + Math.floor(Math.random() * 3),
        highRiskAlerts: prev.highRiskAlerts + (Math.random() > 0.7 ? 1 : 0),
        verifiedFrauds: prev.verifiedFrauds + (Math.random() > 0.9 ? 1 : 0),
        pendingReview: prev.pendingReview + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const analyzeContent = async (type: 'deepfake' | 'social' | 'announcement') => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      let endpoint = '';
      let payload = {};

      switch (type) {
        case 'deepfake':
          endpoint = '/api/agents/deepfake-detector';
          payload = { transcript: testContent, mediaType: 'video' };
          break;
        case 'social':
          endpoint = '/api/agents/social-monitor';
          payload = { content: testContent, platform: 'WhatsApp' };
          break;
        case 'announcement':
          endpoint = '/api/agents/announcement-verifier';
          payload = { announcement: testContent, company: 'Test Corp' };
          break;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setAnalysisResult(data);

      // Add to recent threats if high risk
      if (data.threat?.riskScore > 60 || data.analysis?.riskLevel === 'high' || data.verification?.credibilityScore < 40) {
        const newThreat: RecentThreat = {
          id: data.reportId || Math.random().toString(),
          type: type === 'deepfake' ? 'Deepfake Media' : type === 'social' ? 'Social Media Fraud' : 'Fake Announcement',
          riskLevel: data.threat?.riskScore > 80 || data.analysis?.riskLevel === 'critical' ? 'critical' : 'high',
          timestamp: new Date(),
          description: testContent.substring(0, 100) + '...',
          affectedStocks: data.threat?.affectedStocks
        };
        setRecentThreats(prev => [newThreat, ...prev.slice(0, 4)]);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResult({ error: 'Analysis failed' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#163300] to-[#2d5a00] text-white p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-2">SEBI Fraud Monitoring Dashboard</h1>
        <p className="text-white/80">AI-powered real-time fraud detection and prevention system</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Threats Detected</p>
              <p className="text-3xl font-bold text-gray-900">{metrics.totalThreatsDetected}</p>
            </div>
            <Shield className="w-10 h-10 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">High Risk Alerts</p>
              <p className="text-3xl font-bold text-red-600">{metrics.highRiskAlerts}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Verified Frauds</p>
              <p className="text-3xl font-bold text-orange-600">{metrics.verifiedFrauds}</p>
            </div>
            <Activity className="w-10 h-10 text-orange-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">{metrics.pendingReview}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-yellow-500" />
          </div>
        </motion.div>
      </div>

      {/* AI Agents Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Panel */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Test AI Fraud Detection Agents</h2>
          
          <div className="space-y-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#163300] focus:border-transparent"
              rows={4}
              placeholder="Enter suspicious content to analyze..."
              value={testContent}
              onChange={(e) => setTestContent(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => analyzeContent('deepfake')}
                disabled={!testContent || isAnalyzing}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Camera className="w-4 h-4" />
                Deepfake Check
              </button>
              
              <button
                onClick={() => analyzeContent('social')}
                disabled={!testContent || isAnalyzing}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Social Media
              </button>
              
              <button
                onClick={() => analyzeContent('announcement')}
                disabled={!testContent || isAnalyzing}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FileText className="w-4 h-4" />
                Announcement
              </button>
            </div>

            {isAnalyzing && (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#163300]"></div>
                <span className="ml-3 text-gray-600">Analyzing content...</span>
              </div>
            )}

            {analysisResult && !isAnalyzing && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Analysis Result:</h3>
                {analysisResult.error ? (
                  <p className="text-red-600">{analysisResult.error}</p>
                ) : (
                  <div className="space-y-2">
                    <p className={`font-medium ${analysisResult.message?.includes('WARNING') || analysisResult.message?.includes('CRITICAL') ? 'text-red-600' : 'text-green-600'}`}>
                      {analysisResult.message}
                    </p>
                    {analysisResult.reportId && (
                      <p className="text-sm text-gray-600">Report ID: {analysisResult.reportId}</p>
                    )}
                    {analysisResult.threat && (
                      <div className="text-sm">
                        <p>Risk Score: {analysisResult.threat.riskScore}/100</p>
                        <p>Type: {analysisResult.threat.threatType?.replace('_', ' ')}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recent Threats */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Threat Detections</h2>
          
          <div className="space-y-3">
            {recentThreats.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent threats detected</p>
            ) : (
              recentThreats.map((threat) => (
                <div key={threat.id} className="border-l-4 border-red-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{threat.type}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(threat.riskLevel)}`}>
                          {threat.riskLevel.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{threat.description}</p>
                      {threat.affectedStocks && threat.affectedStocks.length > 0 && (
                        <p className="text-xs text-gray-500">
                          Stocks: {threat.affectedStocks.join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(threat.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
          <Camera className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-bold text-purple-900 mb-2">Deepfake Detection</h3>
          <p className="text-sm text-purple-700">
            AI-powered analysis of videos and audio to detect impersonation of SEBI officials and market leaders
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
          <Users className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-bold text-blue-900 mb-2">Social Media Monitoring</h3>
          <p className="text-sm text-blue-700">
            Real-time scanning of WhatsApp, Telegram groups for pump-and-dump schemes and fake tips
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
          <FileText className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-bold text-green-900 mb-2">Announcement Verification</h3>
          <p className="text-sm text-green-700">
            Cross-verification of corporate announcements against historical data and regulatory filings
          </p>
        </div>
      </div>

      {/* SEBI Compliance Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">SEBI Compliance Notice</h4>
            <p className="text-sm text-yellow-800 mt-1">
              All detected frauds are automatically reported to SEBI through the SCORES portal. 
              This system is aligned with SEBI's Safe Space initiative for retail investor protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
