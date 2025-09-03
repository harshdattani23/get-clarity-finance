'use client';

import React, { useState, useEffect } from 'react';
import { Wand2, Loader2, CheckCircle, AlertTriangle, Download, Eye } from 'lucide-react';

interface ChapterResult {
  title: string;
  start: number;
  duration: number;
  confidence: number;
}

interface LanguageResult {
  languageCode: string;
  languageName: string;
  chapters: ChapterResult[];
  confidence: number;
  processingTime: number;
  success: boolean;
}

interface AIChapterGeneratorProps {
  audioUrl?: string;
  languageCode?: string;
  languageName?: string;
}

export default function AIChapterGenerator({ 
  audioUrl, 
  languageCode, 
  languageName 
}: AIChapterGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<any>(null);
  const [results, setResults] = useState<LanguageResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<LanguageResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'single' | 'batch'>('single');

  useEffect(() => {
    checkServiceStatus();
  }, []);

  const checkServiceStatus = async () => {
    try {
      const response = await fetch('/api/admin/generate-chapters');
      const status = await response.json();
      setServiceStatus(status);
    } catch (error) {
      console.error('Failed to check service status:', error);
    }
  };

  const generateChapters = async () => {
    if (!serviceStatus?.services?.gemini) {
      setError('Gemini AI service is not available. Please check your API key configuration.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResults([]);

    try {
      const requestBody = {
        mode,
        ...(mode === 'single' && audioUrl && languageCode && {
          audioUrl,
          languageCode,
          languageName
        })
      };

      const response = await fetch('/api/admin/generate-chapters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate chapters');
      }

      if (mode === 'single' && data.result) {
        setResults([{
          languageCode: data.language.code,
          languageName: data.language.name,
          chapters: data.result.chapters,
          confidence: data.result.confidence,
          processingTime: data.result.processingTime,
          success: true
        }]);
      } else if (mode === 'batch' && data.results) {
        setResults(data.results);
      }

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

  const downloadChapterConfig = (result: LanguageResult) => {
    const config = result.chapters.map(chapter => ({
      title: chapter.title,
      start: chapter.start,
      duration: chapter.duration
    }));

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.languageCode}_ai_chapters.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
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
            Automatically generate chapters using AI speech-to-text and content analysis
          </p>
        </div>
      </div>

      {/* Service Status */}
      {serviceStatus && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Service Status</h4>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              serviceStatus.services.gemini 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {serviceStatus.services.gemini ? 'Ready' : 'Not Available'}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Supported Languages:</span>
              <span className="ml-2 font-medium">{serviceStatus.supportedLanguages}</span>
            </div>
            <div>
              <span className="text-gray-600">AI Models:</span>
              <span className="ml-2 font-medium">
                {serviceStatus.services.gemini ? '✅' : '❌'} Gemini, 
                {serviceStatus.services['content-analysis'] ? '✅' : '❌'} Analysis
              </span>
            </div>
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
            Single Language
          </button>
          <button
            onClick={() => setMode('batch')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'batch'
                ? 'bg-purple-100 text-purple-800 border border-purple-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Languages (Batch)
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {mode === 'single' 
            ? 'Generate chapters for the currently selected language'
            : 'Generate chapters for all 9 supported languages (takes longer, uses more API credits)'
          }
        </p>
      </div>

      {/* Generate Button */}
      <div className="mb-6">
        <button
          onClick={generateChapters}
          disabled={isGenerating || !serviceStatus?.services?.gemini || (mode === 'single' && !audioUrl)}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Chapters with AI...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate {mode === 'batch' ? 'All Language' : ''} Chapters with AI
            </>
          )}
        </button>
        
        {mode === 'batch' && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Batch Processing Note:</strong> This will process all 9 languages (~10-15 minutes) and consume significant API credits. 
              Consider testing with single language first.
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
            Generated Chapters ({results.filter(r => r.success).length}/{results.length} successful)
          </h4>
          
          <div className="grid gap-4">
            {results.map((result) => (
              <div
                key={result.languageCode}
                className={`p-4 border rounded-lg ${
                  result.success 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-gray-900">{result.languageName}</h5>
                    <p className="text-sm text-gray-600">
                      {result.chapters.length} chapters • {(result.processingTime / 1000).toFixed(1)}s processing
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getConfidenceColor(result.confidence)
                    }`}>
                      {result.confidence}% confidence
                    </span>
                    {result.success && (
                      <>
                        <button
                          onClick={() => setSelectedResult(
                            selectedResult?.languageCode === result.languageCode ? null : result
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

                {selectedResult?.languageCode === result.languageCode && (
                  <div className="border-t pt-3 space-y-2">
                    {result.chapters.map((chapter, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
                        <div>
                          <span className="font-medium">{index + 1}. {chapter.title}</span>
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

          {/* Implementation Instructions */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">🔧 Next Steps</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>1. Review the generated chapters and confidence scores</p>
              <p>2. Download the JSON configurations for languages you want to use</p>
              <p>3. Update the AUDIO_CONFIG in Module1AudioPlayer.tsx with the new chapter data</p>
              <p>4. Test the audio player to ensure chapter navigation works correctly</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Features Info */}
      {!isGenerating && results.length === 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
          <h4 className="font-medium text-purple-900 mb-2">🤖 AI Features</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-800">
            <div>
              <h5 className="font-medium mb-1">Gemini AI Analysis:</h5>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Audio metadata extraction</li>
                <li>Intelligent content structure analysis</li>
                <li>Pattern-based chapter detection</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-1">Smart Chapter Generation:</h5>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Duration-based optimal segmentation</li>
                <li>Multi-language title generation</li>
                <li>Confidence scoring and validation</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
