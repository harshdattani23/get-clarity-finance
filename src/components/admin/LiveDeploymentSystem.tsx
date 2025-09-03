'use client';

import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Loader2,
  Eye,
  Download,
  Clock,
  Globe,
  FileAudio,
  Play,
  ArrowRight,
  Target,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ChapterSegment {
  title: string;
  start: number;
  duration: number;
  confidence?: number;
}

interface ApprovedChapters {
  id: string;
  audio_upload_id: string;
  chapter_data: ChapterSegment[];
  overall_confidence: number;
  course_id: string;
  language_code: string;
  language_name: string;
  original_filename: string;
  approved_at: Date;
  is_deployed: boolean;
  deployed_at?: Date;
}

interface LiveConfig {
  id: string;
  course_id: string;
  language_code: string;
  language_name: string;
  is_active: boolean;
  version: number;
  deployed_at: Date;
  chapter_count: number;
  source_type: 'ai_generated' | 'manual' | 'hybrid';
}

interface DeploymentResult {
  chapters: ApprovedChapters;
  success: boolean;
  error?: string;
  configId?: string;
}

export default function LiveDeploymentSystem() {
  const [approvedChapters, setApprovedChapters] = useState<ApprovedChapters[]>([]);
  const [liveConfigs, setLiveConfigs] = useState<LiveConfig[]>([]);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deploymentResults, setDeploymentResults] = useState<DeploymentResult[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('investment-security');
  const [previewConfig, setPreviewConfig] = useState<ApprovedChapters | null>(null);

  useEffect(() => {
    loadData();
  }, [selectedCourse]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        loadApprovedChapters(),
        loadLiveConfigs()
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadApprovedChapters = async () => {
    try {
      const params = new URLSearchParams();
      params.append('status', 'approved');
      if (selectedCourse) params.append('courseId', selectedCourse);

      const response = await fetch(`/api/admin/ai-chapters?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Mock additional data for display
      const chaptersWithInfo = (data.chapters || []).map((chapter: any) => ({
        ...chapter,
        course_id: selectedCourse,
        language_code: 'en', // Mock data
        language_name: 'English',
        original_filename: `audio-${chapter.audio_upload_id}.m4a`,
        approved_at: new Date(chapter.reviewed_at || Date.now()),
        is_deployed: false
      }));

      setApprovedChapters(chaptersWithInfo);
    } catch (err) {
      console.error('Failed to load approved chapters:', err);
    }
  };

  const loadLiveConfigs = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCourse) params.append('courseId', selectedCourse);

      const response = await fetch(`/api/admin/live-configs?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setLiveConfigs(data.configs || []);
    } catch (err) {
      console.error('Failed to load live configs:', err);
    }
  };

  const handleDeploy = async () => {
    if (selectedChapters.length === 0) {
      setError('Please select at least one approved chapter set to deploy');
      return;
    }

    setIsDeploying(true);
    setError(null);
    setDeploymentResults([]);

    try {
      const results: DeploymentResult[] = [];

      for (const chapterId of selectedChapters) {
        const chapters = approvedChapters.find(c => c.id === chapterId);
        if (!chapters) continue;

        try {
          const response = await fetch('/api/admin/deploy-chapters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chaptersId: chapterId,
              courseId: chapters.course_id,
              languageCode: chapters.language_code,
              languageName: chapters.language_name,
              chapterData: chapters.chapter_data.map(c => ({
                title: c.title,
                start: c.start,
                duration: c.duration
              }))
            })
          });

          const data = await response.json();

          if (!response.ok) {
            results.push({
              chapters,
              success: false,
              error: data.error || 'Deployment failed'
            });
          } else {
            results.push({
              chapters,
              success: true,
              configId: data.configId
            });
          }
        } catch (err) {
          results.push({
            chapters,
            success: false,
            error: err instanceof Error ? err.message : 'Deployment failed'
          });
        }
      }

      setDeploymentResults(results);
      
      const successCount = results.filter(r => r.success).length;
      const totalCount = results.length;

      if (successCount === totalCount) {
        setSuccess(`Successfully deployed ${successCount} chapter configuration(s)`);
      } else {
        setError(`Deployed ${successCount}/${totalCount} configurations. Some deployments failed.`);
      }

      // Reload data to reflect changes
      await loadData();
      setSelectedChapters([]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deployment process failed');
    } finally {
      setIsDeploying(false);
    }
  };

  const toggleChapterSelection = (chapterId: string) => {
    setSelectedChapters(prev => 
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const selectAllChapters = () => {
    const undeployedIds = approvedChapters
      .filter(c => !c.is_deployed)
      .map(c => c.id);
    setSelectedChapters(undeployedIds);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateAudioPlayerConfig = (chapters: ApprovedChapters) => {
    return {
      code: chapters.language_code,
      name: chapters.language_name,
      file: chapters.original_filename,
      segments: chapters.chapter_data.map(c => ({
        title: c.title,
        start: c.start,
        duration: c.duration
      }))
    };
  };

  const downloadConfig = (chapters: ApprovedChapters) => {
    const config = generateAudioPlayerConfig(chapters);
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chapters.language_code}_live_config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-indigo-600" />
            Live Deployment System
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Deploy approved chapters to update live audio players
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={isLoading}
          className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
          title="Refresh data"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Course Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Course
        </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="investment-security">Investment Security Course</option>
          <option value="stock-market-basics">Stock Market Basics</option>
        </select>
      </div>

      {/* Status Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">Deployment Error</span>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Deployment Successful</span>
          </div>
          <p className="text-green-700 text-sm mt-1">{success}</p>
        </motion.div>
      )}

      {/* Current Live Configurations */}
      {liveConfigs.length > 0 && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Currently Live Configurations
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {liveConfigs.map((config) => (
              <div key={config.id} className="bg-white p-3 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{config.language_name}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    v{config.version}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{config.chapter_count} chapters</p>
                  <p className="text-xs">
                    Deployed: {new Date(config.deployed_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Chapters for Deployment */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">
            Approved Chapters Ready for Deployment ({approvedChapters.length})
          </h4>
          {approvedChapters.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={selectAllChapters}
                className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedChapters([])}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <span className="ml-2 text-gray-600">Loading approved chapters...</span>
          </div>
        ) : approvedChapters.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileAudio className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p>No approved chapters available for deployment</p>
            <p className="text-sm">Approve some AI-generated chapters first</p>
          </div>
        ) : (
          <div className="space-y-3">
            {approvedChapters.map((chapters) => (
              <div
                key={chapters.id}
                className={`p-4 border rounded-lg transition-colors ${
                  selectedChapters.includes(chapters.id)
                    ? 'border-indigo-300 bg-indigo-50'
                    : 'border-gray-200 bg-gray-50'
                } ${chapters.is_deployed ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedChapters.includes(chapters.id)}
                      onChange={() => toggleChapterSelection(chapters.id)}
                      disabled={chapters.is_deployed || isDeploying}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {chapters.language_name} - {chapters.original_filename}
                      </h5>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Approved: {new Date(chapters.approved_at).toLocaleDateString()}
                        </span>
                        <span>{chapters.chapter_data.length} chapters</span>
                        <span>{chapters.overall_confidence}% confidence</span>
                        {chapters.is_deployed && (
                          <span className="text-green-600 font-medium">✓ Deployed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewConfig(chapters)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Preview config"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => downloadConfig(chapters)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Download config"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Deployment Action */}
      <div className="mb-6">
        <button
          onClick={handleDeploy}
          disabled={isDeploying || selectedChapters.length === 0}
          className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Deploying to Live...
            </>
          ) : (
            <>
              <Rocket className="w-5 h-5" />
              Deploy Selected Chapters to Live ({selectedChapters.length})
            </>
          )}
        </button>

        {selectedChapters.length > 0 && !isDeploying && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              ⚠️ <strong>Deployment Warning:</strong> This will update the live audio players. 
              Users will see the new chapter configurations immediately after deployment.
            </p>
          </div>
        )}
      </div>

      {/* Deployment Results */}
      {deploymentResults.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Deployment Results</h4>
          <div className="space-y-2">
            {deploymentResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  result.success 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">
                      {result.chapters.language_name} - {result.chapters.original_filename}
                    </span>
                    {result.error && (
                      <p className="text-sm text-red-600 mt-1">{result.error}</p>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 ${
                    result.success ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.success ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {result.success ? 'Success' : 'Failed'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Config Preview - {previewConfig.language_name}
                </h3>
                <button
                  onClick={() => setPreviewConfig(null)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <pre className="text-sm text-gray-800 overflow-x-auto">
                  {JSON.stringify(generateAudioPlayerConfig(previewConfig), null, 2)}
                </pre>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-900">Chapter Preview:</h5>
                {previewConfig.chapter_data.map((chapter, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{index + 1}. {chapter.title}</span>
                    <span className="text-sm text-gray-500">
                      {formatTime(chapter.start)} - {formatTime(chapter.start + chapter.duration)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <h4 className="font-medium text-indigo-900 mb-2">🚀 Deployment Process</h4>
        <div className="text-sm text-indigo-800 space-y-1">
          <p>1. Select approved chapter configurations from the list above</p>
          <p>2. Preview configs to ensure they look correct</p>
          <p>3. Deploy to update the live audio players immediately</p>
          <p>4. Monitor deployment results and verify changes in the live app</p>
          <p className="font-medium text-indigo-900 mt-2">
            Note: Deployments are immediate and will affect live users
          </p>
        </div>
      </div>
    </div>
  );
}
