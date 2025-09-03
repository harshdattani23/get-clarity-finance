'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Upload, 
  FileAudio, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  Eye,
  RefreshCw,
  Loader2,
  Play,
  Pause,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioUpload {
  id: string;
  course_id: string;
  language_code: string;
  language_name: string;
  original_filename: string;
  file_path: string;
  file_url: string;
  file_size: number;
  duration_seconds?: number;
  status: 'uploaded' | 'processing' | 'completed' | 'failed';
  uploaded_by: string;
  uploaded_at: Date;
  processed_at?: Date;
  metadata?: any;
}

interface Course {
  id: string;
  name: string;
  description?: string;
}

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'bn', name: 'বাংলা (Bengali)' }
];

const COURSES = [
  { id: 'investment-security', name: 'Investment Security Course', description: 'Module on stock market fraud detection' },
  { id: 'stock-market-basics', name: 'Stock Market Basics', description: 'Fundamental trading concepts' }
];

export default function AudioUploadManager() {
  const [uploads, setUploads] = useState<AudioUpload[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('investment-security');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  // Load uploads on component mount and when filters change
  useEffect(() => {
    loadUploads();
  }, [selectedCourse, selectedLanguage]);

  const loadUploads = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (selectedCourse) params.append('courseId', selectedCourse);
      if (selectedLanguage) params.append('languageCode', selectedLanguage);

      const response = await fetch(`/api/admin/audio-uploads?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setUploads(data.uploads || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load uploads');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File, courseId: string, languageCode: string, languageName: string) => {
    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('courseId', courseId);
      formData.append('languageCode', languageCode);
      formData.append('languageName', languageName);

      const response = await fetch('/api/admin/audio-uploads', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setSuccess(`Successfully uploaded ${file.name} for ${languageName}`);
      await loadUploads(); // Reload the list

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (!selectedCourse || !selectedLanguage) {
      setError('Please select both a course and language before uploading');
      return;
    }

    const files = Array.from(e.dataTransfer.files);
    const audioFile = files.find(file => file.type.startsWith('audio/'));

    if (!audioFile) {
      setError('Please drop an audio file');
      return;
    }

    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage);
    if (language) {
      handleFileUpload(audioFile, selectedCourse, selectedLanguage, language.name);
    }
  }, [selectedCourse, selectedLanguage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!selectedCourse || !selectedLanguage) {
      setError('Please select both a course and language before uploading');
      return;
    }

    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage);
    if (language) {
      handleFileUpload(file, selectedCourse, selectedLanguage, language.name);
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'Unknown';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: AudioUpload['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const toggleAudio = (uploadId: string, audioUrl: string) => {
    if (playingAudio === uploadId) {
      setPlayingAudio(null);
      // Pause audio logic here
    } else {
      setPlayingAudio(uploadId);
      // Play audio logic here
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileAudio className="w-6 h-6 text-blue-600" />
            Audio Upload Manager
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Upload audio files for different courses and languages
          </p>
        </div>
        <button
          onClick={loadUploads}
          disabled={isLoading}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          title="Refresh uploads"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Course and Language Selection */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choose a course...</option>
            {COURSES.map(course => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Language
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choose a language...</option>
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
        } ${!selectedCourse || !selectedLanguage ? 'opacity-50 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900">
              {dragOver ? 'Drop audio file here' : 'Upload audio file'}
            </p>
            <p className="text-sm text-gray-600">
              Drag & drop or click to select • MP3, M4A, WAV, AAC • Max 50MB
            </p>
          </div>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            disabled={isUploading || !selectedCourse || !selectedLanguage}
            className="hidden"
            id="audioUpload"
          />
          <label
            htmlFor="audioUpload"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </span>
            ) : (
              'Select File'
            )}
          </label>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">Upload Failed</span>
          </div>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Upload Successful</span>
          </div>
          <p className="text-green-700 text-sm mt-1">{success}</p>
        </motion.div>
      )}

      {/* Uploaded Files List */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">
            Uploaded Audio Files ({uploads.length})
          </h4>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading uploads...</span>
          </div>
        ) : uploads.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileAudio className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p>No audio files uploaded yet</p>
            <p className="text-sm">Upload your first audio file to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileAudio className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">{upload.original_filename}</h5>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {upload.language_name}
                      </span>
                      <span>{formatFileSize(upload.file_size)}</span>
                      {upload.duration_seconds && (
                        <span>{formatDuration(upload.duration_seconds)}</span>
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(upload.uploaded_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(upload.status)}`}>
                    {upload.status}
                  </span>
                  
                  {upload.status === 'completed' && upload.file_url && (
                    <>
                      <button
                        onClick={() => toggleAudio(upload.id, upload.file_url)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title={playingAudio === upload.id ? 'Pause audio' : 'Play audio'}
                      >
                        {playingAudio === upload.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                      
                      <a
                        href={upload.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="View file"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Usage Instructions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">📝 Upload Instructions</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>1. Select the course and language for your audio file</p>
          <p>2. Upload high-quality audio files (MP3, M4A, WAV, or AAC format)</p>
          <p>3. Once uploaded, you can generate AI chapters for automatic segmentation</p>
          <p>4. Review and approve AI-generated chapters before they go live</p>
        </div>
      </div>
    </div>
  );
}
