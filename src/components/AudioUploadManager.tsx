'use client';

import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, 
  FileAudio, 
  Languages, 
  Check, 
  X, 
  AlertCircle, 
  Play, 
  Pause,
  Download,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { LANGUAGE_INFO, COURSE_INFO, type LanguageCode, type CourseId, AudioFileStatus } from '@/lib/models/audio';

interface AudioFile {
  name: string;
  fileName: string;
  courseId: string;
  language: string;
  publicUrl: string;
  size: number;
  contentType: string;
  timeCreated: string;
  updated: string;
}

interface UploadProgress {
  courseId: string;
  language: LanguageCode;
  moduleType: 'main' | 'section';
  sectionId?: string;
  progress: number;
  status: AudioFileStatus;
  error?: string;
}

interface AudioUploadManagerProps {
  onUploadComplete?: (audioFile: AudioFile) => void;
}

export default function AudioUploadManager({ onUploadComplete }: AudioUploadManagerProps) {
  const [selectedCourse, setSelectedCourse] = useState<CourseId>('intro-to-frauds');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [selectedModuleType, setSelectedModuleType] = useState<'main' | 'section'>('main');
  const [sectionId, setSectionId] = useState('');
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [existingFiles, setExistingFiles] = useState<AudioFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  // Load existing files on component mount or when filters change
  const loadExistingFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        courseId: selectedCourse,
        language: selectedLanguage,
      });
      
      const response = await fetch(`/api/upload-audio?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setExistingFiles(data.files || []);
      }
    } catch (error) {
      console.error('Failed to load existing files:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCourse, selectedLanguage]);

  React.useEffect(() => {
    loadExistingFiles();
  }, [loadExistingFiles]);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid audio file (MP3, WAV, OGG)');
      return;
    }

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB');
      return;
    }

    if (selectedModuleType === 'section' && !sectionId.trim()) {
      alert('Please enter a section ID for section-specific audio');
      return;
    }

    const formData = new FormData();
    formData.append('audio', file);
    formData.append('courseId', selectedCourse);
    formData.append('language', selectedLanguage);
    formData.append('moduleType', selectedModuleType);
    if (selectedModuleType === 'section') {
      formData.append('sectionId', sectionId.trim());
    }

    // Add progress tracking
    const progressId = `${selectedCourse}-${selectedLanguage}-${selectedModuleType}-${sectionId || 'main'}`;
    const newProgress: UploadProgress = {
      courseId: selectedCourse,
      language: selectedLanguage,
      moduleType: selectedModuleType,
      sectionId: selectedModuleType === 'section' ? sectionId : undefined,
      progress: 0,
      status: AudioFileStatus.UPLOADING,
    };

    setUploadProgress(prev => [...prev.filter(p => `${p.courseId}-${p.language}-${p.moduleType}-${p.sectionId || 'main'}` !== progressId), newProgress]);

    try {
      const response = await fetch('/api/upload-audio', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Update progress to complete
        setUploadProgress(prev => prev.map(p => 
          `${p.courseId}-${p.language}-${p.moduleType}-${p.sectionId || 'main'}` === progressId
            ? { ...p, progress: 100, status: AudioFileStatus.READY }
            : p
        ));

        // Reload existing files
        await loadExistingFiles();
        
        // Clear form
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setSectionId('');

        // Call callback
        onUploadComplete?.(data.data);

        // Remove progress after a delay
        setTimeout(() => {
          setUploadProgress(prev => prev.filter(p => 
            `${p.courseId}-${p.language}-${p.moduleType}-${p.sectionId || 'main'}` !== progressId
          ));
        }, 3000);

      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      // Update progress to error
      setUploadProgress(prev => prev.map(p => 
        `${p.courseId}-${p.language}-${p.moduleType}-${p.sectionId || 'main'}` === progressId
          ? { ...p, status: AudioFileStatus.ERROR, error: error instanceof Error ? error.message : 'Upload failed' }
          : p
      ));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const toggleAudioPlayback = (url: string, fileId: string) => {
    const audio = audioRefs.current.get(fileId);
    
    if (audio) {
      if (currentlyPlaying === fileId) {
        audio.pause();
        setCurrentlyPlaying(null);
      } else {
        // Pause any currently playing audio
        audioRefs.current.forEach((a, id) => {
          if (id !== fileId) a.pause();
        });
        
        audio.play();
        setCurrentlyPlaying(fileId);
      }
    } else {
      // Create new audio element
      const newAudio = new Audio(url);
      newAudio.addEventListener('ended', () => setCurrentlyPlaying(null));
      newAudio.addEventListener('error', () => setCurrentlyPlaying(null));
      audioRefs.current.set(fileId, newAudio);
      
      newAudio.play();
      setCurrentlyPlaying(fileId);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Audio Upload Manager</h1>
        <p className="text-gray-600">Upload and manage audio files for course modules in multiple languages</p>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Upload New Audio File
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Course Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value as CourseId)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(COURSE_INFO).map(([id, info]) => (
                <option key={id} value={id}>
                  {info.name} ({info.level})
                </option>
              ))}
            </select>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as LanguageCode)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(LANGUAGE_INFO).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {info.name}
                </option>
              ))}
            </select>
          </div>

          {/* Module Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Module Type</label>
            <select
              value={selectedModuleType}
              onChange={(e) => setSelectedModuleType(e.target.value as 'main' | 'section')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="main">Main Module</option>
              <option value="section">Section Specific</option>
            </select>
          </div>

          {/* Section ID (if section-specific) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section ID {selectedModuleType === 'section' && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={sectionId}
              onChange={(e) => setSectionId(e.target.value)}
              disabled={selectedModuleType !== 'section'}
              placeholder="e.g., overview, step1, simulator"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* File Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileAudio className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drag and drop an audio file here, or{' '}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              click to browse
            </button>
          </p>
          <p className="text-sm text-gray-500">
            Supports MP3, WAV, OGG files up to 50MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp3,.wav,.ogg,audio/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
        </div>

        {/* Upload Progress */}
        {uploadProgress.length > 0 && (
          <div className="mt-6 space-y-2">
            {uploadProgress.map((progress, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {COURSE_INFO[progress.courseId as CourseId]?.name} - {LANGUAGE_INFO[progress.language].name}
                    {progress.sectionId && ` (${progress.sectionId})`}
                  </span>
                  {progress.status === AudioFileStatus.READY && <Check className="w-5 h-5 text-green-500" />}
                  {progress.status === AudioFileStatus.ERROR && <X className="w-5 h-5 text-red-500" />}
                  {progress.status === AudioFileStatus.UPLOADING && <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />}
                </div>
                {progress.status === AudioFileStatus.UPLOADING && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress.progress}%` }}
                    />
                  </div>
                )}
                {progress.error && (
                  <p className="text-sm text-red-600 mt-1">{progress.error}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Existing Files */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <FileAudio className="w-5 h-5 mr-2" />
            Existing Audio Files
          </h2>
          <button
            onClick={loadExistingFiles}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
            <p className="text-gray-500">Loading files...</p>
          </div>
        ) : existingFiles.length === 0 ? (
          <div className="text-center py-8">
            <FileAudio className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No audio files found for the selected filters</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {existingFiles.map((file, index) => {
              const fileId = `${file.courseId}-${file.language}-${file.fileName}`;
              const isPlaying = currentlyPlaying === fileId;
              
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <FileAudio className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="font-medium">{file.fileName}</span>
                        <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {LANGUAGE_INFO[file.language as LanguageCode]?.flag} {LANGUAGE_INFO[file.language as LanguageCode]?.name}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 space-x-4">
                        <span>Size: {formatFileSize(parseInt(file.size.toString()))}</span>
                        <span>Type: {file.contentType}</span>
                        <span>Uploaded: {formatDate(file.timeCreated)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleAudioPlayback(file.publicUrl, fileId)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md transition-colors"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <a
                        href={file.publicUrl}
                        download={file.fileName}
                        className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-md transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {Object.keys(COURSE_INFO).length}
          </div>
          <div className="text-gray-600">Total Courses</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {Object.keys(LANGUAGE_INFO).length}
          </div>
          <div className="text-gray-600">Supported Languages</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {existingFiles.length}
          </div>
          <div className="text-gray-600">Audio Files</div>
        </div>
      </div>
    </div>
  );
}
