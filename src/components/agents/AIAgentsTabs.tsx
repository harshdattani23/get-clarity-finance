'use client';

import React, { useState } from 'react';
import { Camera, MessageSquare, FileText, Shield, AlertTriangle, TrendingUp, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabContent {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

interface AnalysisResult {
  error?: string;
  message?: string;
  instructions?: string[];
  tip?: string;
  videoId?: string;
  reportId?: string;
  sessionId?: string;
  timestamp?: string;
  videoUrl?: string;
  videoAnalyzed?: boolean;
  mediaType?: string;
  threat?: {
    threatType?: string | string[];
    riskScore?: number;
    affectedStocks?: string[];
    recommendations?: string[];
  };
  analysis?: {
    riskLevel?: string;
  };
  verification?: {
    credibilityScore?: number;
  };
  detailed?: {
    contentSummary?: {
      title?: string;
      channelName?: string;
      description?: string;
      mainTopics?: string[];
      speakerClaims?: string[];
      investmentClaims?: string[];
      duration?: string;
    };
    insights?: string[];
    investmentWarnings?: string[];
    technicalFindings?: string[];
    mediaAnalyzed?: string;
    confidence?: number;
    riskLevel?: string;
    timestamp?: string;
  };
  nextSteps?: string[];
}

const tabs: TabContent[] = [
  {
    id: 'deepfake',
    label: 'Deepfake Detector',
    icon: <Camera className="w-5 h-5" />,
    color: 'purple',
    bgGradient: 'from-purple-50 to-purple-100'
  },
  {
    id: 'social',
    label: 'Social Media Monitor',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'blue',
    bgGradient: 'from-blue-50 to-blue-100'
  },
  {
    id: 'announcement',
    label: 'Announcement Verifier',
    icon: <FileText className="w-5 h-5" />,
    color: 'green',
    bgGradient: 'from-green-50 to-green-100'
  }
];

export default function AIAgentsTabs() {
  const [activeTab, setActiveTab] = useState('deepfake');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const analyzeContent = async () => {
    if (!inputContent.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      let endpoint = '';
      let payload = {};

      switch (activeTab) {
        case 'deepfake':
          // Use v2 endpoint for better YouTube video analysis
          const useV2 = inputContent.includes('youtube.com/watch') || inputContent.includes('youtu.be/');
          endpoint = useV2 ? '/api/agents/deepfake-detector-v2' : '/api/agents/deepfake-detector';
          payload = { 
            transcript: inputContent, 
            mediaType: 'video',
            metadata: { source: 'user_input' }
          };
          break;
        case 'social':
          endpoint = '/api/agents/social-monitor';
          payload = { 
            content: inputContent, 
            platform: 'WhatsApp/Telegram',
            userCount: 1000
          };
          break;
        case 'announcement':
          endpoint = '/api/agents/announcement-verifier';
          payload = { 
            announcement: inputContent, 
            company: 'Unknown Company',
            announcementType: 'General',
            source: 'Social Media'
          };
          break;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResult({ error: 'Analysis failed. Please try again.' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getExampleContent = (): string => {
    switch (activeTab) {
      case 'deepfake':
        return "I am the CEO of Reliance Industries and I guarantee you 300% returns in just 2 months through our new investment scheme. Transfer money to this account immediately to secure your spot.";
      case 'social':
        return "🚀 BUY TOMORROW AT 9:15 AM SHARP! Stock: XYZ Ltd. Target: ₹500 (CMP ₹200). Guaranteed profit! Our group has insider information. Join premium group for ₹5000 only. Last 10 slots left! Message me privately.";
      case 'announcement':
        return "XYZ Corporation announces 500% dividend and bonus shares 10:1. Board has approved buyback at 200% premium. Company revenue jumped from ₹100 Cr to ₹10,000 Cr in one quarter. Invest now before stock splits!";
      default:
        return "Enter suspicious content here...";
    }
  };

  const getRiskIndicator = (result: AnalysisResult) => {
    let riskLevel = 'low';
    let riskScore = 0;
    
    if (result.threat?.riskScore) {
      riskScore = result.threat.riskScore;
      riskLevel = riskScore > 70 ? 'high' : riskScore > 40 ? 'medium' : 'low';
    } else if (result.analysis?.riskLevel) {
      riskLevel = result.analysis.riskLevel;
      riskScore = riskLevel === 'critical' ? 90 : riskLevel === 'high' ? 70 : riskLevel === 'medium' ? 50 : 30;
    } else if (result.verification?.credibilityScore) {
      riskScore = 100 - result.verification.credibilityScore;
      riskLevel = riskScore > 70 ? 'high' : riskScore > 40 ? 'medium' : 'low';
    }

    const colors = {
      high: 'bg-red-100 text-red-700 border-red-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-green-100 text-green-700 border-green-300'
    };

    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${colors[riskLevel as keyof typeof colors]}`}>
        <Shield className="w-4 h-4" />
        <span className="font-semibold text-sm">
          Risk: {riskLevel.toUpperCase()} ({riskScore}%)
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setAnalysisResult(null);
              setInputContent('');
            }}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
              ${activeTab === tab.id 
                ? `bg-${tab.color}-600 text-white shadow-lg transform scale-105` 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }
            `}
            style={{
              backgroundColor: activeTab === tab.id ? 
                (tab.color === 'purple' ? '#9333ea' : tab.color === 'blue' ? '#2563eb' : '#16a34a') 
                : undefined
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Agent Description */}
          <div className={`bg-gradient-to-br ${tabs.find(t => t.id === activeTab)?.bgGradient} p-6 rounded-xl mb-6`}>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {activeTab === 'deepfake' && '🎭 Deepfake Detection Agent'}
              {activeTab === 'social' && '📱 Social Media Fraud Monitor'}
              {activeTab === 'announcement' && '📄 Corporate Announcement Verifier'}
            </h3>
            <p className="text-gray-700">
              {activeTab === 'deepfake' && 
                'Analyzes YouTube videos and other media directly for deepfakes. Detects fraudulent videos and audio impersonating SEBI officials, market leaders, or financial advisors. Simply paste a YouTube URL for instant analysis.'}
              {activeTab === 'social' && 
                'Monitors WhatsApp, Telegram, and social media for pump-and-dump schemes, fake investment tips, Ponzi schemes, and coordinated market manipulation attempts.'}
              {activeTab === 'announcement' && 
                'Verifies authenticity of corporate announcements by cross-referencing with historical data, checking compliance requirements, and detecting suspicious patterns.'}
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {activeTab === 'deepfake' && (
                <>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Voice Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Facial Recognition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Metadata Check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">SEBI Database</span>
                  </div>
                </>
              )}
              {activeTab === 'social' && (
                <>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Pattern Detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Bot Identification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Volume Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Group Monitoring</span>
                  </div>
                </>
              )}
              {activeTab === 'announcement' && (
                <>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Historical Check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Compliance Verify</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Cross-Reference</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm">BSE/NSE Check</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Suspicious Content for Analysis
              </label>
              <textarea
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={5}
                placeholder={
                  activeTab === 'deepfake' ? 
                    "Paste YouTube URL, transcript, or description of suspicious video/audio..." :
                  activeTab === 'social' ? 
                    "Paste WhatsApp/Telegram message or social media post..." :
                    "Paste corporate announcement or news..."
                }
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={analyzeContent}
                disabled={!inputContent.trim() || isAnalyzing}
                className="px-6 py-3 bg-gradient-to-r from-[#163300] to-[#2d5a00] text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Analyze for Fraud
                  </>
                )}
              </button>
              
              <button
                onClick={() => setInputContent(getExampleContent())}
                className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                Use Example
              </button>
            </div>
          </div>

          {/* Results Section */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900">Analysis Result</h4>
                {getRiskIndicator(analysisResult)}
              </div>

              {analysisResult.error ? (
                <div>
                  {analysisResult.instructions ? (
                    // Special handling for YouTube videos
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-orange-600 mb-3">
                        <AlertTriangle className="w-5 h-5" />
                        <div>
                          <p className="font-semibold">{analysisResult.message}</p>
                          <p className="text-sm">{analysisResult.error}</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-900 mb-2">How to Analyze YouTube Videos:</h5>
                        <ol className="space-y-1 text-sm text-blue-800">
                          {analysisResult.instructions.map((instruction: string, idx: number) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ol>
                        {analysisResult.tip && (
                          <p className="mt-3 text-sm font-medium text-blue-900">
                            💡 Tip: {analysisResult.tip}
                          </p>
                        )}
                      </div>
                      {analysisResult.videoId && (
                        <div className="text-sm text-gray-600">
                          Video ID detected: <code className="bg-gray-100 px-2 py-1 rounded">{analysisResult.videoId}</code>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Regular error
                    <div className="flex items-center gap-3 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      <p>{analysisResult.error}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Main Message */}
                  <div className={`p-4 rounded-lg ${
                    analysisResult.message?.includes('CRITICAL') ? 'bg-red-50 border-2 border-red-300 text-red-700' :
                    analysisResult.message?.includes('HIGH RISK') ? 'bg-orange-50 border-2 border-orange-300 text-orange-700' :
                    analysisResult.message?.includes('MEDIUM RISK') ? 'bg-yellow-50 border-2 border-yellow-300 text-yellow-700' :
                    'bg-green-50 border-2 border-green-300 text-green-700'
                  }`}>
                    <p className="font-medium text-lg">{analysisResult.message}</p>
                  </div>

                  {/* Video Content Summary */}
                  {analysisResult.detailed?.contentSummary && (
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-5 border border-indigo-200">
                      <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                        <Camera className="w-5 h-5" />
                        Video Content Summary
                      </h4>
                      
                      {analysisResult.detailed.contentSummary.title && (
                        <div className="mb-3">
                          <p className="font-semibold text-gray-900">
                            📹 {analysisResult.detailed.contentSummary.title}
                          </p>
                          {analysisResult.detailed.contentSummary.channelName && (
                            <p className="text-sm text-gray-600">
                              Channel: {analysisResult.detailed.contentSummary.channelName}
                            </p>
                          )}
                        </div>
                      )}

                      {analysisResult.detailed.contentSummary.description && (
                        <div className="mb-3 p-3 bg-white/70 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>About:</strong> {analysisResult.detailed.contentSummary.description}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {analysisResult.detailed.contentSummary.mainTopics && Array.isArray(analysisResult.detailed.contentSummary.mainTopics) && analysisResult.detailed.contentSummary.mainTopics.length > 0 && (
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="font-semibold text-sm text-indigo-900 mb-2">📌 Main Topics:</p>
                            <ul className="space-y-1">
                              {analysisResult.detailed.contentSummary.mainTopics.map((topic: string, idx: number) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-indigo-500">•</span>
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {analysisResult.detailed.contentSummary.speakerClaims && Array.isArray(analysisResult.detailed.contentSummary.speakerClaims) && analysisResult.detailed.contentSummary.speakerClaims.length > 0 && (
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="font-semibold text-sm text-indigo-900 mb-2">🎭 Speaker Claims:</p>
                            <ul className="space-y-1">
                              {analysisResult.detailed.contentSummary.speakerClaims.map((claim: string, idx: number) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-orange-500">⚠️</span>
                                  {claim}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {analysisResult.detailed.contentSummary.investmentClaims && Array.isArray(analysisResult.detailed.contentSummary.investmentClaims) && analysisResult.detailed.contentSummary.investmentClaims.length > 0 && (
                          <div className="bg-red-50 rounded-lg p-3 md:col-span-2 border border-red-200">
                            <p className="font-semibold text-sm text-red-900 mb-2">💣 Investment Claims Made:</p>
                            <ul className="space-y-1">
                              {analysisResult.detailed.contentSummary.investmentClaims.map((claim: string, idx: number) => (
                                <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
                                  <span className="text-red-500">🚩</span>
                                  {claim}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {analysisResult.detailed.contentSummary.duration && (
                        <p className="text-xs text-gray-500 mt-2">
                          Duration: {analysisResult.detailed.contentSummary.duration}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Detailed Analysis Section */}
                  {analysisResult.detailed && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Insights */}
                      {analysisResult.detailed.insights && Array.isArray(analysisResult.detailed.insights) && analysisResult.detailed.insights.length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h5 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Key Insights
                          </h5>
                          <ul className="space-y-1">
                            {analysisResult.detailed.insights.map((insight: string, idx: number) => (
                              <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                                <span className="text-blue-600">•</span>
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Investment Warnings */}
                      {analysisResult.detailed.investmentWarnings && Array.isArray(analysisResult.detailed.investmentWarnings) && analysisResult.detailed.investmentWarnings.length > 0 && (
                        <div className="bg-red-50 rounded-lg p-4">
                          <h5 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Investment Red Flags
                          </h5>
                          <ul className="space-y-1">
                            {analysisResult.detailed.investmentWarnings.map((warning: string, idx: number) => (
                              <li key={idx} className="text-sm text-red-800">
                                {warning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technical Findings */}
                      {analysisResult.detailed.technicalFindings && Array.isArray(analysisResult.detailed.technicalFindings) && analysisResult.detailed.technicalFindings.length > 0 && (
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h5 className="font-semibold text-purple-900 mb-2">Technical Analysis</h5>
                          <ul className="space-y-1">
                            {analysisResult.detailed.technicalFindings.map((finding: string, idx: number) => (
                              <li key={idx} className="text-sm text-purple-800 flex items-start gap-2">
                                <span className="text-purple-600">•</span>
                                {finding}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Media Info */}
                      {analysisResult.detailed.mediaAnalyzed && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Analysis Details</h5>
                          <div className="space-y-1 text-sm text-gray-700">
                            <p><strong>Media Type:</strong> {analysisResult.detailed.mediaAnalyzed}</p>
                            <p><strong>Confidence Score:</strong> {analysisResult.detailed.confidence}%</p>
                            <p><strong>Risk Level:</strong> <span className="uppercase font-semibold">{analysisResult.detailed.riskLevel}</span></p>
                            {analysisResult.detailed.timestamp && (
                              <p><strong>Analyzed:</strong> {new Date(analysisResult.detailed.timestamp).toLocaleString()}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysisResult.reportId && (
                      <div>
                        <span className="text-sm text-gray-600">Report ID:</span>
                        <p className="font-mono text-sm bg-white px-3 py-1 rounded border mt-1">
                          {analysisResult.reportId}
                        </p>
                      </div>
                    )}
                    
                    {analysisResult.threat?.threatType && (
                      <div>
                        <span className="text-sm text-gray-600">Threat Type:</span>
                        <p className="font-semibold text-gray-900 mt-1">
                          {(Array.isArray(analysisResult.threat.threatType) 
                            ? analysisResult.threat.threatType[0] 
                            : analysisResult.threat.threatType
                          ).replace(/_/g, ' ').toUpperCase()}
                        </p>
                      </div>
                    )}

                    {analysisResult.threat?.affectedStocks && analysisResult.threat.affectedStocks.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-600">Affected Stocks:</span>
                        <p className="font-semibold text-gray-900 mt-1">
                          {analysisResult.threat.affectedStocks.join(', ')}
                        </p>
                      </div>
                    )}

                    {analysisResult.verification?.credibilityScore !== undefined && (
                      <div>
                        <span className="text-sm text-gray-600">Credibility Score:</span>
                        <p className="font-semibold text-gray-900 mt-1">
                          {analysisResult.verification.credibilityScore}/100
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Recommendations */}
                  {(analysisResult.threat?.recommendations || analysisResult.nextSteps) && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Recommended Actions:</h5>
                      <ul className="space-y-1">
                        {(analysisResult.threat?.recommendations || analysisResult.nextSteps || []).map((rec: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* SEBI Action */}
                  {((analysisResult.threat?.riskScore && analysisResult.threat.riskScore > 70) || 
                    (analysisResult.verification?.credibilityScore !== undefined && analysisResult.verification.credibilityScore < 30) || 
                    analysisResult.analysis?.riskLevel === 'high' || 
                    analysisResult.analysis?.riskLevel === 'critical') && (
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-lg p-5 shadow-md">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5 animate-pulse" />
                        <div className="flex-1">
                          <h5 className="font-bold text-red-900 text-lg mb-2">⚠️ SEBI Fraud Reporting Required</h5>
                          <p className="text-sm text-red-800 mb-3">
                            This content has been flagged as potentially fraudulent. Report immediately to protect other investors.
                          </p>
                          <div className="space-y-2">
                            <a 
                              href="https://scores.sebi.gov.in/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition-colors"
                            >
                              🚨 File Complaint at SEBI SCORES Portal
                              <ChevronRight className="w-4 h-4" />
                            </a>
                            <div className="flex flex-col gap-1 mt-2">
                              <p className="text-sm font-medium text-red-900">
                                📞 SEBI Toll-Free: 1800-266-7575 or 1800-22-7575
                              </p>
                              <p className="text-xs text-red-700">
                                (Available 9:00 AM to 6:00 PM)
                              </p>
                              <p className="text-xs text-red-700 mt-1">
                                💡 Save all evidence (screenshots, URLs, transcripts) before reporting
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
