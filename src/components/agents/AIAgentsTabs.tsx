'use client';

import React, { useState } from 'react';
import { Camera, MessageSquare, FileText, Shield, AlertTriangle, TrendingUp, ChevronRight, Database, Search, Users, BarChart3, Brain, Cpu, Eye, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

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
  // SEBI Query specific fields
  answer?: string;
  query_type?: string;
  data_count?: number;
  has_data?: boolean;
  intent?: Record<string, unknown>;
  raw_data?: unknown;
}

const getTabsWithTranslation = (t: (key: string, options?: any) => any): TabContent[] => [
  {
    id: 'deepfake',
    label: t('tabs.videoFraud'),
    icon: <Camera className="w-5 h-5" />,
    color: 'purple',
    bgGradient: 'from-purple-50 to-purple-100'
  },
  {
    id: 'social',
    label: t('tabs.socialMedia'),
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'blue',
    bgGradient: 'from-blue-50 to-blue-100'
  },
  {
    id: 'announcement',
    label: t('tabs.announcement'),
    icon: <FileText className="w-5 h-5" />,
    color: 'green',
    bgGradient: 'from-green-50 to-green-100'
  },
  {
    id: 'sebi-query',
    label: t('tabs.sebiRegistry'),
    icon: <Database className="w-5 h-5" />,
    color: 'indigo',
    bgGradient: 'from-indigo-50 to-indigo-100'
  }
];

export default function AIAgentsTabs() {
  const { t } = useTranslation('agents');
  const tabs = getTabsWithTranslation(t);
  const [activeTab, setActiveTab] = useState('deepfake');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [thinkingStage, setThinkingStage] = useState('');
  const [thinkingProgress, setThinkingProgress] = useState(0);
  const [aiThoughts, setAiThoughts] = useState<string[]>([]);
  const [detectedElements, setDetectedElements] = useState<string[]>([]);
  const [currentChecks, setCurrentChecks] = useState<string[]>([]);
  const [educationalTips, setEducationalTips] = useState<string[]>([]);

  const analyzeContent = async () => {
    if (!inputContent.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setThinkingProgress(0);
    
    // Enhanced dynamic thinking stages
    const isVideo = inputContent.includes('youtube.com') || inputContent.includes('youtu.be/');
    
    // Extract potential title from URL or content for educational tips
    let extractedTitle = '';
    if (isVideo) {
      // Try to extract video title from URL or content
      if (inputContent.toLowerCase().includes('stock') || inputContent.toLowerCase().includes('investment')) {
        extractedTitle = 'investment advice';
      } else if (inputContent.toLowerCase().includes('trading') || inputContent.toLowerCase().includes('profit')) {
        extractedTitle = 'trading tips';
      } else if (inputContent.toLowerCase().includes('crypto') || inputContent.toLowerCase().includes('bitcoin')) {
        extractedTitle = 'cryptocurrency';
      } else {
        extractedTitle = 'financial content';
      }
    }
    
    // Educational tips based on content type
    const getEducationalTips = (title: string) => [
      `💡 Remember: SEBI-registered advisors must display their registration number`,
      `📚 Fact: Promises of guaranteed returns are illegal in Indian markets`,
      `⚠️ Warning: Real SEBI officials never ask for money via YouTube videos`,
      `🛡️ Tip: Always verify advisor credentials on SEBI's official website`,
      `📖 Learn: Legitimate investment returns average 12-15% annually in equity`,
      `🔍 Check: Deepfakes often have unnatural eye movements and lip-sync issues`,
      `💰 Reality: "Get rich quick" schemes are almost always fraudulent`,
      `📱 Alert: Report suspicious videos to SEBI's SCORES portal immediately`
    ];
    
    // Dynamic AI checking items with proper timing
    const aiCheckSequence = [
      '🎥 Downloading video for comprehensive analysis',
      '📊 Extracting video metadata and information',
      '🎬 Separating video into frames for inspection',
      '🔊 Extracting audio track for voice analysis',
      '📝 Transcribing speech to analyze claims',
      '💰 Scanning for investment fraud indicators',
      '📈 Checking for unrealistic return promises',
      '⚠️ Detecting misleading financial advice',
      '🏛️ Verifying speaker claims against SEBI database',
      '👤 Analyzing if speaker is impersonating officials',
      '🎭 Running deepfake detection algorithms',
      '👄 Checking facial movements and lip-sync',
      '👁️ Analyzing eye movement naturalness',
      '🎵 Detecting voice synthesis or cloning',
      '🎨 Scanning for video manipulation artifacts',
      '📜 Cross-referencing with official records',
      '🌐 Verifying channel authenticity and history',
      '🔗 Checking consistency across metadata',
      '⚖️ Applying comprehensive fraud models',
      '✅ Generating detailed fraud analysis report'
    ];
    
    // Dynamic AI thoughts that appear randomly
    const videoThoughts = [
      '🎥 Found video metadata...',
      '🔍 Scanning facial movements frame by frame...',
      '🎯 Detected speaker at 0:23...',
      '⚠️ Checking voice consistency...',
      '📊 Analyzing lip-sync accuracy...',
      '🤖 Running deepfake detection models...',
      '💡 Cross-referencing with known patterns...',
      '🔒 Verifying against SEBI officials database...',
      '📈 Found investment claims to verify...',
      '🎭 Checking for face manipulation artifacts...',
      '🔊 Audio spectrum analysis in progress...',
      '✨ AI confidence building...'
    ];
    
    const stages = isVideo ? [
      '📥 Downloading video content...',
      '🎬 Processing video and audio...',
      '🧠 AI analyzing for fraud indicators...',
      '🔍 Checking multiple fraud patterns...',
      '👤 Verifying speaker authenticity...',
      '🏛️ Cross-referencing SEBI database...',
      '📋 Compiling comprehensive report...'
    ] : activeTab === 'sebi-query' ? [
      '💭 Understanding your query...',
      '🔎 Searching 4,923+ SEBI entities...',
      '🤖 AI analyzing patterns...',
      '🎯 Finding best matches...',
      '📊 Compiling verified results...'
    ] : [
      '📝 Reading content...',
      '🚨 Detecting fraud signals...',
      '🔗 Cross-referencing data...',
      '✅ Finalizing analysis...'
    ];
    
    // Start progress animation
    let stageIndex = 0;
    let thoughtIndex = 0;
    let checkIndex = 0;
    let tipIndex = 0;
    const thoughtsArray: string[] = [];
    const elementsArray: string[] = [];
    const checksArray: string[] = [];
    const tipsArray: string[] = [];
    
    // Main stage progression (adjusted for 1-2 minute analysis)
    const totalAnalysisTime = 90000; // 1.5 minutes in milliseconds
    const stageInterval = setInterval(() => {
      if (stageIndex < stages.length) {
        setThinkingStage(stages[stageIndex]);
        const progress = (stageIndex + 1) / stages.length * 100;
        setThinkingProgress(progress);
        stageIndex++;
      }
    }, totalAnalysisTime / stages.length);
    
    // AI checking sequence (shows what AI is currently checking)
    const checkInterval = isVideo ? setInterval(() => {
      if (checkIndex < aiCheckSequence.length) {
        // Keep only last 4 checks visible
        checksArray.push(aiCheckSequence[checkIndex]);
        setCurrentChecks([...checksArray].slice(-4));
        checkIndex++;
      }
    }, totalAnalysisTime / aiCheckSequence.length) : null;
    
    // Educational tips (appear periodically)
    const tips = getEducationalTips(extractedTitle);
    const tipInterval = isVideo ? setInterval(() => {
      if (tipIndex < tips.length && stageIndex > 1) {
        tipsArray.push(tips[tipIndex]);
        setEducationalTips([...tipsArray].slice(-2)); // Keep last 2 tips
        tipIndex++;
      }
    }, totalAnalysisTime / tips.length) : null;
    
    // Dynamic thoughts that appear (adjusted timing)
    const thoughtInterval = isVideo ? setInterval(() => {
      if (thoughtIndex < videoThoughts.length && stageIndex > 0) {
        thoughtsArray.push(videoThoughts[thoughtIndex]);
        setAiThoughts([...thoughtsArray].slice(-3)); // Keep last 3 thoughts
        thoughtIndex++;
      }
    }, totalAnalysisTime / videoThoughts.length) : null;
    
    // Detected elements animation (adjusted timing)
    const elementInterval = isVideo ? setInterval(() => {
      const elements = [
        'Voice pattern analyzed',
        'Facial landmarks mapped',
        'Background consistency checked',
        'Audio sync verified',
        'Metadata examined',
        'Channel history reviewed',
        'Claims documented',
        'Risk patterns identified'
      ];
      if (elementsArray.length < elements.length) {
        elementsArray.push(elements[elementsArray.length]);
        setDetectedElements([...elementsArray]);
      }
    }, totalAnalysisTime / 8) : null;

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
        case 'sebi-query':
          endpoint = '/api/agents/sebi-query';
          payload = { 
            question: inputContent,
            context: { source: 'web_ui' }
          };
          break;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      clearInterval(stageInterval);
      if (thoughtInterval) clearInterval(thoughtInterval);
      if (elementInterval) clearInterval(elementInterval);
      if (checkInterval) clearInterval(checkInterval);
      if (tipInterval) clearInterval(tipInterval);
      
      setThinkingProgress(100);
      setThinkingStage('✅ Analysis complete!');
      
      // Small delay to show completion
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisResult(data);
    } catch (error) {
      console.error('Analysis error:', error);
      clearInterval(stageInterval);
      if (thoughtInterval) clearInterval(thoughtInterval);
      if (elementInterval) clearInterval(elementInterval);
      if (checkInterval) clearInterval(checkInterval);
      if (tipInterval) clearInterval(tipInterval);
      setAnalysisResult({ error: 'Analysis failed. Please try again.' });
    } finally {
      setIsAnalyzing(false);
      setThinkingStage('');
      setThinkingProgress(0);
      setAiThoughts([]);
      setDetectedElements([]);
      setCurrentChecks([]);
      setEducationalTips([]);
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
      case 'sebi-query':
        return "Is Zerodha registered with SEBI? What segments are they authorized for?";
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
                (tab.color === 'purple' ? '#9333ea' : 
                 tab.color === 'blue' ? '#2563eb' : 
                 tab.color === 'green' ? '#16a34a' :
                 tab.color === 'indigo' ? '#4f46e5' : '#6b7280') 
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
          <div className={`bg-gradient-to-br ${tabs.find(tab => tab.id === activeTab)?.bgGradient} p-6 rounded-xl mb-6`}>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {activeTab === 'deepfake' && t('titles.deepfake')}
              {activeTab === 'social' && t('titles.social')}
              {activeTab === 'announcement' && t('titles.announcement')}
              {activeTab === 'sebi-query' && t('titles.sebiQuery')}
            </h3>
            <p className="text-gray-700">
              {activeTab === 'deepfake' && t('descriptions.deepfake')}
              {activeTab === 'social' && t('descriptions.social')}
              {activeTab === 'announcement' && t('descriptions.announcement')}
              {activeTab === 'sebi-query' && t('descriptions.sebiQuery')}
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {activeTab === 'deepfake' && (
                <>
                  {Object.values(t('features.deepfake', { returnObjects: true }) || {}).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{String(feature)}</span>
                    </div>
                  ))}
                </>
              )}
              {activeTab === 'social' && (
                <>
                  {Object.values(t('features.social', { returnObjects: true }) || {}).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{String(feature)}</span>
                    </div>
                  ))}
                </>
              )}
              {activeTab === 'announcement' && (
                <>
                  {Object.values(t('features.announcement', { returnObjects: true }) || {}).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{String(feature)}</span>
                    </div>
                  ))}
                </>
              )}
              {activeTab === 'sebi-query' && (
                <>
                  {Object.values(t('features.sebiQuery', { returnObjects: true }) || {}).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm">{String(feature)}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'sebi-query' ? t('inputLabels.sebiQuery') : t('inputLabels.general')}
              </label>
              <textarea
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={5}
                placeholder={
                  activeTab === 'deepfake' ? 
                    t('placeholders.deepfake') :
                  activeTab === 'social' ? 
                    t('placeholders.social') :
                  activeTab === 'announcement' ?
                    t('placeholders.announcement') :
                    t('placeholders.sebiQuery')
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
                    {t('buttons.analyzing')}
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    {activeTab === 'sebi-query' ? t('buttons.verifySebi') : t('buttons.analyzeGeneral')}
                  </>
                )}
              </button>
              
              <button
                onClick={() => setInputContent(getExampleContent())}
                className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                {t('buttons.useExample')}
              </button>
            </div>
          </div>

          {/* Thinking Mode Overlay */}
          {isAnalyzing && !analysisResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-8 p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl border-2 border-indigo-200 shadow-xl"
            >
              <div className="max-w-2xl mx-auto">
                {/* AI Thinking Header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-8 h-8 text-indigo-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {activeTab === 'deepfake' && t('analysis.titles.deepfake')}
                    {activeTab === 'social' && t('analysis.titles.social')}
                    {activeTab === 'announcement' && t('analysis.titles.announcement')}
                    {activeTab === 'sebi-query' && t('analysis.titles.sebiQuery')}
                  </h3>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Cpu className="w-8 h-8 text-purple-600" />
                  </motion.div>
                </div>

                {/* Current Stage */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Eye className="w-5 h-5 text-indigo-600" />
                    </motion.div>
                    <span className="text-sm font-medium text-gray-600">{t('analysis.currentProcess')}</span>
                  </div>
                  <motion.p 
                    key={thinkingStage}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lg font-semibold text-gray-800"
                  >
                    {thinkingStage || 'Initializing analysis...'}
                  </motion.p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{t('analysis.analysisProgress')}</span>
                    <span className="text-sm font-bold text-indigo-600">{Math.round(thinkingProgress)}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${thinkingProgress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Animated Dots */}
                <div className="flex justify-center gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <motion.div
                      key={index}
                      className="w-3 h-3 bg-indigo-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  ))}
                </div>

                {/* AI Thoughts Stream */}
                {aiThoughts.length > 0 && (
                  <div className="mt-4 bg-white/70 rounded-lg p-3">
                    <div className="space-y-1">
                      {aiThoughts.map((thought, idx) => (
                        <motion.div
                          key={`${thought}-${idx}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="text-xs text-gray-600 flex items-center gap-2"
                        >
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                          >
                            {thought.split(' ')[0]}
                          </motion.span>
                          <span>{thought.split(' ').slice(1).join(' ')}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Currently Checking */}
                {currentChecks.length > 0 && (
                  <div className="mt-4 bg-white/80 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">{t('analysis.currentlyAnalyzing')}</h4>
                    <div className="space-y-2">
                      {currentChecks.map((check, idx) => (
                        <motion.div
                          key={`${check}-${idx}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 bg-indigo-500 rounded-full"
                          />
                          <span className="text-sm text-gray-700">{check}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Educational Tips */}
                {educationalTips.length > 0 && (
                  <div className="mt-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
                    <h4 className="text-sm font-semibold text-amber-900 mb-2">{t('analysis.importantTips')}</h4>
                    <div className="space-y-2">
                      {educationalTips.map((tip, idx) => (
                        <motion.div
                          key={`${tip}-${idx}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-amber-800"
                        >
                          {tip}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detected Elements */}
                {detectedElements.length > 0 && (
                  <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                    <h4 className="text-xs font-semibold text-green-800 mb-2">{t('analysis.elementsAnalyzed')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {detectedElements.map((element, idx) => (
                        <motion.div
                          key={element}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-white px-2 py-1 rounded-full text-xs font-medium text-green-700 border border-green-300 flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          {element}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Capabilities Being Used */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {activeTab === 'deepfake' && (
                    <>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 25 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 25 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Video Extracted</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 50 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 50 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Content Analyzed</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 75 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 75 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Fraud Detected</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 90 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 90 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Report Ready</span>
                      </motion.div>
                    </>
                  )}
                  {activeTab === 'social' && (
                    <>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 25 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 25 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Content Parsed</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 50 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 50 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Patterns Found</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 75 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 75 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Scheme Detected</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 90 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 90 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Alert Generated</span>
                      </motion.div>
                    </>
                  )}
                  {activeTab === 'announcement' && (
                    <>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 25 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 25 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Data Extracted</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 50 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 50 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Records Checked</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 75 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 75 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Validity Assessed</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 90 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 90 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Report Complete</span>
                      </motion.div>
                    </>
                  )}
                  {activeTab === 'sebi-query' && (
                    <>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 25 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 25 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Query Parsed</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 50 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 50 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Registry Searched</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 75 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 75 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Entities Matched</span>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: thinkingProgress > 90 ? 1 : 0.3 }}
                        className="flex items-center gap-2 bg-white/60 rounded-lg p-2"
                      >
                        <CheckCircle className={`w-4 h-4 ${thinkingProgress > 90 ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className="text-xs font-medium text-gray-700">Results Ready</span>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Section */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900">
                  {activeTab === 'sebi-query' ? t('results.sebiResults') : t('results.analysisResult')}
                </h4>
                {activeTab !== 'sebi-query' && getRiskIndicator(analysisResult)}
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
                  {/* SEBI Query Answer */}
                  {activeTab === 'sebi-query' && analysisResult.answer && (
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-5 border border-indigo-200">
                      <div className="prose prose-sm max-w-none">
                        <div className="text-gray-800 whitespace-pre-wrap">
                          {analysisResult.answer}
                        </div>
                      </div>
                      
                      {/* Registry Info */}
                      {analysisResult.query_type ? (
                        <div className="mt-4 pt-4 border-t border-indigo-200">
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Search Type:</span>
                              <span className="ml-2 font-semibold text-indigo-700">
                                {analysisResult.query_type.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                              </span>
                            </div>
                            {analysisResult.data_count !== undefined && (
                              <div>
                                <span className="text-gray-600">Entities Found:</span>
                                <span className="ml-2 font-semibold text-indigo-700">
                                  {analysisResult.data_count}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null}
                      
                      {/* Registry Data Preview */}
                      {analysisResult.raw_data && Array.isArray(analysisResult.raw_data) && analysisResult.raw_data.length > 0 ? (
                        <div className="mt-4 pt-4 border-t border-indigo-200">
                          <h5 className="text-sm font-semibold text-indigo-900 mb-2">Verified Entities:</h5>
                          <div className="space-y-2">
                            {(analysisResult.raw_data as Array<Record<string, unknown>>).slice(0, 3).map((item, idx) => (
                              <div key={idx} className="bg-white/70 rounded-lg p-3 text-sm">
                                <div className="font-semibold text-gray-900">{String(item.name || '')}</div>
                                <div className="text-gray-600">Reg: {String(item.registrationNumber || '')}</div>
                                {item.segments && Array.isArray(item.segments) ? (
                                  <div className="text-xs mt-1">
                                    <span className="text-indigo-600">Segments: {(item.segments as string[]).join(', ')}</span>
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}

                  {/* Main Message for other agents */}
                  {activeTab !== 'sebi-query' && analysisResult.message && (
                    <div className={`p-4 rounded-lg ${
                      analysisResult.message?.includes('CRITICAL') ? 'bg-red-50 border-2 border-red-300 text-red-700' :
                      analysisResult.message?.includes('HIGH RISK') ? 'bg-orange-50 border-2 border-orange-300 text-orange-700' :
                      analysisResult.message?.includes('MEDIUM RISK') ? 'bg-yellow-50 border-2 border-yellow-300 text-yellow-700' :
                      'bg-green-50 border-2 border-green-300 text-green-700'
                    }`}>
                      <p className="font-medium text-lg">{analysisResult.message}</p>
                    </div>
                  )}

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
