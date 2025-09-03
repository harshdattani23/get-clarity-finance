'use client';

import React, { useState, useEffect } from 'react';
import { 
  Wand2, 
  Loader2, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  Eye, 
  FileAudio, 
  RefreshCw,
  Sparkles,
  Clock,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioUpload {
  id: string;
  course_id: string;
  language_code: string;
  language_name: string;
  original_filename: string;
  file_url: string;
  file_size: number;
  duration_seconds?: number;
  status: 'uploaded' | 'processing' | 'completed' | 'failed';
}

interface ChapterResult {
  title: string;
  start: number;
  duration: number;
  confidence: number;
}

interface AIGeneratedChapters {
  id: string;
  audio_upload_id: string;
  chapter_data: ChapterResult[];
  overall_confidence: number;
  processing_time_ms: number;
  ai_model: string;
  generation_method: string;
  status: 'generated' | 'approved' | 'rejected' | 'live';
  generated_at: Date;
  reviewed_by?: string;
  reviewed_at?: Date;
  review_notes?: string;
}

interface GenerationResult {
  upload: AudioUpload;
  chapters?: AIGeneratedChapters;
  error?: string;
  success: boolean;
}

export default function EnhancedAIChapterGenerator() {
  const [uploads, setUploads] = useState<AudioUpload[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('investment-security');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [serviceStatus, setServiceStatus] = useState<any>(null);
  const [mode, setMode] = useState<'single' | 'batch'>('single');
  const [selectedUpload, setSelectedUpload] = useState<string>('');

  useEffect(() => {
    loadUploads();
    checkServiceStatus();
  }, [selectedCourse]);

  const loadUploads = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (selectedCourse) params.append('courseId', selectedCourse);
      
      const response = await fetch(`/api/admin/audio-uploads?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setUploads(data.uploads?.filter((upload: AudioUpload) => upload.status === 'completed') || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load uploads');
    } finally {
      setIsLoading(false);
    }
  };

  const checkServiceStatus = async () => {
    try {
      const response = await fetch('/api/admin/generate-chapters');
      const status = await response.json();
      setServiceStatus(status);
    } catch (error) {
      console.error('Failed to check service status:', error);
    }
  };

  const generateChaptersForUploads = async () => {
    if (!serviceStatus?.services?.gemini) {
      setError('Gemini AI service is not available. Please check your API key configuration.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResults([]);

    try {
      let uploadsToProcess: AudioUpload[] = [];

      if (mode === 'single') {
        const upload = uploads.find(u => u.id === selectedUpload);
        if (!upload) {
          throw new Error('Please select an audio upload to process');
        }
        uploadsToProcess = [upload];
      } else {
        uploadsToProcess = uploads;
      }

      if (uploadsToProcess.length === 0) {
        throw new Error('No audio uploads available for processing');
      }

      // Process each upload
      const results: GenerationResult[] = [];

      for (const upload of uploadsToProcess) {
        try {
          const response = await fetch('/api/admin/ai-chapters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              audioUploadId: upload.id,
              audioUrl: upload.file_url,
              languageCode: upload.language_code,
              languageName: upload.language_name,
              courseId: upload.course_id
            })
          });

          const data = await response.json();

          if (!response.ok) {
            results.push({
              upload,
              error: data.error || 'Failed to generate chapters',
              success: false
            });
          } else {
            results.push({
              upload,
              chapters: data.chapters,
              success: true
            });
          }
        } catch (err) {
          results.push({
            upload,
            error: err instanceof Error ? err.message : 'Processing failed',
            success: false
          });
        }
      }

      setResults(results);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate chapters');
    } finally {
      setIsGenerating(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const downloadChapterConfig = (result: GenerationResult) => {
    if (!result.chapters) return;

    const config = result.chapters.chapter_data.map(chapter => ({
      title: chapter.title,
      start: chapter.start,
      duration: chapter.duration
    }));

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.upload.language_code}_ai_chapters_${Date.now()}.json`;
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
            <Wand2 className="w-6 h-6 text-purple-600" />
            AI Chapter Generator
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Generate chapters from uploaded audio files using Gemini AI
          </p>
        </div>
        <button
          onClick={loadUploads}
          disabled={isLoading}
          className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
          title="Refresh uploads"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="investment-security">Investment Security Course</option>
          <option value="stock-market-basics">Stock Market Basics</option>
        </select>
      </div>

      {/* Service Status */}
      {serviceStatus && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">AI Service Status</h4>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              serviceStatus.services.gemini 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {serviceStatus.services.gemini ? 'Ready' : 'Not Available'}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span>Gemini AI: {serviceStatus.services.gemini ? '✅ Available' : '❌ Unavailable'}</span>
          </div>
        </div>
      )}

      {/* Mode Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Generation Mode</h4>
        <div className="flex gap-3">
          <button
            onClick={() => setMode('single')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'single'
                ? 'bg-purple-100 text-purple-800 border border-purple-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Single Upload
          </button>
          <button
            onClick={() => setMode('batch')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'batch'
                ? 'bg-purple-100 text-purple-800 border border-purple-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Uploads (Batch)
          </button>
        </div>
      </div>

      {/* Single Upload Selection */}
      {mode === 'single' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Audio Upload
          </label>
          <select
            value={selectedUpload}
            onChange={(e) => setSelectedUpload(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Choose an uploaded audio file...</option>
            {uploads.map(upload => (
              <option key={upload.id} value={upload.id}>
                {upload.language_name} - {upload.original_filename}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Available Uploads Summary */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <FileAudio className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-900">Available Audio Uploads</span>
        </div>
        {isLoading ? (
          <p className="text-sm text-blue-800">Loading uploads...</p>
        ) : uploads.length === 0 ? (
          <p className="text-sm text-blue-800">
            No completed audio uploads found for this course. Upload audio files first.
          </p>
        ) : (
          <div className="text-sm text-blue-800">
            <p className="mb-2">{uploads.length} audio files ready for AI chapter generation:</p>
            <div className="space-y-1">
              {uploads.slice(0, 5).map(upload => (
                <div key={upload.id} className="flex justify-between items-center">
                  <span>• {upload.language_name} - {upload.original_filename}</span>
                  <span className="text-xs text-blue-600">
                    {upload.duration_seconds ? formatTime(upload.duration_seconds) : 'Unknown duration'}
                  </span>
                </div>
              ))}
              {uploads.length > 5 && (
                <p className="text-xs text-blue-700">...and {uploads.length - 5} more</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="mb-6">
        <button
          onClick={generateChaptersForUploads}
          disabled={
            isGenerating || 
            !serviceStatus?.services?.gemini || 
            uploads.length === 0 ||
            (mode === 'single' && !selectedUpload)
          }
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating AI Chapters...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate {mode === 'batch' ? 'All' : 'Single'} AI Chapters
            </>
          )}
        </button>
        
        {mode === 'batch' && uploads.length > 1 && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Batch Processing:</strong> Will process {uploads.length} audio files. 
              This may take several minutes and consume API credits.
            </p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">Generation Failed</span>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            AI Generation Results ({results.filter(r => r.success).length}/{results.length} successful)
          </h4>
          
          <div className="grid gap-4">
            {results.map((result, index) => (
              <div
                key={result.upload.id}
                className={`p-4 border rounded-lg ${
                  result.success 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {result.upload.language_name} - {result.upload.original_filename}
                    </h5>
                    {result.chapters && (
                      <p className="text-sm text-gray-600">
                        {result.chapters.chapter_data.length} chapters • 
                        {(result.chapters.processing_time_ms / 1000).toFixed(1)}s processing time
                      </p>
                    )}
                    {result.error && (
                      <p className="text-sm text-red-600">{result.error}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {result.chapters && (
                      <>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getConfidenceColor(result.chapters.overall_confidence)
                        }`}>
                          {result.chapters.overall_confidence}% confidence
                        </span>
                        <button
                          onClick={() => setSelectedResult(
                            selectedResult?.upload.id === result.upload.id ? null : result
                          )}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Preview chapters"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => downloadChapterConfig(result)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Download JSON"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {selectedResult?.upload.id === result.upload.id && result.chapters && (
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        Model: {result.chapters.ai_model}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Generated: {new Date(result.chapters.generated_at).toLocaleString()}
                      </span>
                    </div>
                    
                    {result.chapters.chapter_data.map((chapter, chapterIndex) => (
                      <div key={chapterIndex} className="flex justify-between items-center p-2 bg-white rounded">
                        <div>
                          <span className="font-medium">{chapterIndex + 1}. {chapter.title}</span>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatTime(chapter.start)} - {formatTime(chapter.start + chapter.duration)} 
                            ({Math.floor(chapter.duration)}s)
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          getConfidenceColor(chapter.confidence)
                        }`}>
                          {chapter.confidence}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">🚀 Next Steps</h4>
            <div className="text-sm text-purple-800 space-y-1">
              <p>1. Review the generated chapters and their confidence scores</p>
              <p>2. Go to the Chapter Review & Approval section to edit if needed</p>
              <p>3. Approve chapters to make them available for deployment</p>
              <p>4. Deploy approved chapters to update the live audio players</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
