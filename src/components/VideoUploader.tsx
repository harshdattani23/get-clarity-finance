'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Play, Pause, AlertTriangle, CheckCircle, Clock, FileVideo } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VideoFile {
  file: File;
  id: string;
  preview: string;
  uploadProgress: number;
  status: 'pending' | 'uploading' | 'uploaded' | 'analyzing' | 'analyzed' | 'error';
  error?: string;
  videoId?: string;
  analysisId?: string;
}

interface VideoUploaderProps {
  onVideoUploaded?: (videoId: string, analysisId?: string) => void;
  onAnalysisComplete?: (analysisResult: any) => void;
  maxFileSize?: number; // in bytes
  acceptedFormats?: string[];
  className?: string;
}

const ACCEPTED_VIDEO_TYPES = {
  'video/mp4': ['.mp4'],
  'video/webm': ['.webm'],
  'video/quicktime': ['.mov'],
  'video/x-msvideo': ['.avi'],
  'video/x-ms-wmv': ['.wmv'],
  'video/3gpp': ['.3gp'],
  'video/x-flv': ['.flv'],
  'video/x-matroska': ['.mkv']
};

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB default

export default function VideoUploader({
  onVideoUploaded,
  onAnalysisComplete,
  maxFileSize = MAX_FILE_SIZE,
  acceptedFormats,
  className = ''
}: VideoUploaderProps) {
  const [videoFiles, setVideoFiles] = useState<VideoFile[]>([]);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [analysisType, setAnalysisType] = useState<string>('comprehensive');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newVideoFiles = acceptedFiles.map(file => ({
      file,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      preview: URL.createObjectURL(file),
      uploadProgress: 0,
      status: 'pending' as const
    }));

    setVideoFiles(prev => [...prev, ...newVideoFiles]);
    setUploadError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: acceptedFormats ? Object.fromEntries(acceptedFormats.map(format => [format, []])) : ACCEPTED_VIDEO_TYPES,
    maxSize: maxFileSize,
    multiple: false // For now, only allow single video upload
  });

  const removeVideo = (id: string) => {
    setVideoFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const uploadVideo = async (videoFile: VideoFile) => {
    setUploadError(null);
    
    try {
      // Update status to uploading
      setVideoFiles(prev => prev.map(f => 
        f.id === videoFile.id 
          ? { ...f, status: 'uploading', uploadProgress: 0 }
          : f
      ));

      const formData = new FormData();
      formData.append('video', videoFile.file);
      formData.append('description', description);
      formData.append('tags', tags);
      formData.append('analysisType', analysisType);

      // Upload with progress tracking
      const xhr = new XMLHttpRequest();
      
      return new Promise<void>((resolve, reject) => {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setVideoFiles(prev => prev.map(f => 
              f.id === videoFile.id 
                ? { ...f, uploadProgress: progress }
                : f
            ));
          }
        };

        xhr.onload = async () => {
          try {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              
              if (response.success) {
                // Update status to uploaded
                setVideoFiles(prev => prev.map(f => 
                  f.id === videoFile.id 
                    ? { 
                        ...f, 
                        status: 'uploaded', 
                        uploadProgress: 100, 
                        videoId: response.videoId 
                      }
                    : f
                ));

                // Notify parent component
                onVideoUploaded?.(response.videoId);

                // Start analysis automatically
                await startAnalysis(response.videoId, videoFile.id);
                
                resolve();
              } else {
                throw new Error(response.error || 'Upload failed');
              }
            } else {
              const errorResponse = JSON.parse(xhr.responseText);
              throw new Error(errorResponse.error || `HTTP ${xhr.status}: Upload failed`);
            }
          } catch (error) {
            reject(error);
          }
        };

        xhr.onerror = () => {
          reject(new Error('Network error during upload'));
        };

        xhr.open('POST', '/api/video/upload');
        xhr.send(formData);
      });

    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      
      setVideoFiles(prev => prev.map(f => 
        f.id === videoFile.id 
          ? { ...f, status: 'error', error: errorMessage }
          : f
      ));
      
      setUploadError(errorMessage);
      throw error;
    }
  };

  const startAnalysis = async (videoId: string, fileId: string) => {
    try {
      // Update status to analyzing
      setVideoFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'analyzing' }
          : f
      ));

      const response = await fetch('/api/video/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
          analysisType,
          generateTranscript: true
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Update status to analyzed
        setVideoFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'analyzed', 
                analysisId: result.analysis.analysisId 
              }
            : f
        ));

        // Notify parent component
        onAnalysisComplete?.(result.analysis);
      } else {
        throw new Error(result.error || 'Analysis failed');
      }

    } catch (error) {
      console.error('Analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
      
      setVideoFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'error', error: errorMessage }
          : f
      ));
    }
  };

  const uploadAllVideos = async () => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const pendingVideos = videoFiles.filter(f => f.status === 'pending');
      
      for (const video of pendingVideos) {
        await uploadVideo(video);
      }
    } catch (error) {
      console.error('Upload batch error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: VideoFile['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-500" />;
      case 'uploading':
        return <Upload className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'uploaded':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'analyzing':
        return <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />;
      case 'analyzed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <FileVideo className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: VideoFile['status']) => {
    const statusConfig = {
      pending: { variant: 'secondary', text: 'Pending' },
      uploading: { variant: 'default', text: 'Uploading' },
      uploaded: { variant: 'default', text: 'Uploaded' },
      analyzing: { variant: 'default', text: 'Analyzing' },
      analyzed: { variant: 'default', text: 'Analyzed' },
      error: { variant: 'destructive', text: 'Error' }
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant as any} className="text-xs">
        {config.text}
      </Badge>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileVideo className="h-5 w-5" />
            Video Upload & Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Analysis Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="analysisType">Analysis Type</Label>
            <Select value={analysisType} onValueChange={setAnalysisType}>
              <SelectTrigger>
                <SelectValue placeholder="Select analysis type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic - Quick fraud detection</SelectItem>
                <SelectItem value="comprehensive">Comprehensive - Deep analysis</SelectItem>
                <SelectItem value="fraud_focus">Fraud Focus - Investment scam detection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe the video content or purpose..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (Optional)</Label>
            <Input
              id="tags"
              placeholder="investment, trading, analysis (comma-separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Drop Zone */}
      <Card>
        <CardContent className="p-0">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            `}
          >
            <input {...getInputProps()} ref={fileInputRef} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            
            {isDragActive ? (
              <p className="text-lg font-medium text-blue-600">
                Drop your video here...
              </p>
            ) : (
              <div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop your video here, or click to select
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: MP4, WebM, MOV, AVI (max {formatFileSize(maxFileSize)})
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Rejections */}
      {fileRejections.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              {fileRejections.map((rejection, index) => (
                <div key={index}>
                  <strong>{rejection.file.name}</strong>: {rejection.errors[0]?.message}
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Upload Error */}
      {uploadError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}

      {/* Video Files List */}
      {videoFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Videos ({videoFiles.length})</span>
              <Button
                onClick={uploadAllVideos}
                disabled={isUploading || videoFiles.every(f => f.status !== 'pending')}
                className="ml-auto"
              >
                {isUploading ? 'Uploading...' : 'Upload & Analyze'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {videoFiles.map((videoFile) => (
              <div
                key={videoFile.id}
                className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50"
              >
                {/* Video Preview */}
                <div className="flex-shrink-0">
                  <video
                    src={videoFile.preview}
                    className="w-20 h-14 object-cover rounded border"
                    muted
                  />
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(videoFile.status)}
                    <p className="text-sm font-medium truncate">
                      {videoFile.file.name}
                    </p>
                    {getStatusBadge(videoFile.status)}
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    {formatFileSize(videoFile.file.size)} • {videoFile.file.type}
                  </p>

                  {/* Upload Progress */}
                  {(videoFile.status === 'uploading' || videoFile.status === 'analyzing') && (
                    <div className="mt-2">
                      <Progress value={videoFile.uploadProgress} className="h-1" />
                      <p className="text-xs text-gray-500 mt-1">
                        {videoFile.status === 'uploading' 
                          ? `Uploading... ${videoFile.uploadProgress}%`
                          : 'Analyzing for deepfakes and fraud...'
                        }
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {videoFile.error && (
                    <p className="text-xs text-red-600 mt-1">
                      {videoFile.error}
                    </p>
                  )}

                  {/* Success Info */}
                  {videoFile.status === 'analyzed' && (
                    <div className="flex items-center gap-2 mt-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <p className="text-xs text-green-600">
                        Analysis completed successfully
                      </p>
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeVideo(videoFile.id)}
                  disabled={videoFile.status === 'uploading' || videoFile.status === 'analyzing'}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
