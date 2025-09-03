'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Edit3, 
  Save, 
  RefreshCw, 
  Loader2, 
  AlertTriangle,
  Clock,
  User,
  MessageSquare,
  Play,
  Pause,
  FileAudio,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ChapterSegment {
  title: string;
  start: number;
  duration: number;
  confidence: number;
}

interface AIGeneratedChapters {
  id: string;
  audio_upload_id: string;
  chapter_data: ChapterSegment[];
  overall_confidence: number;
  processing_time_ms: number;
  ai_model: string;
  generation_method: string;
  status: 'generated' | 'approved' | 'rejected' | 'live';
  generated_at: Date;
  reviewed_by?: string;
  reviewed_at?: Date;
  review_notes?: string;
  upload_info?: {
    original_filename: string;
    language_name: string;
    course_id: string;
    file_url: string;
  };
}

export default function ChapterApprovalWorkflow() {
  const [chapters, setChapters] = useState<AIGeneratedChapters[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<AIGeneratedChapters | null>(null);
  const [editingChapter, setEditingChapter] = useState<AIGeneratedChapters | null>(null);
  const [editedData, setEditedData] = useState<ChapterSegment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('generated');
  const [expandedPreview, setExpandedPreview] = useState<string | null>(null);

  useEffect(() => {
    loadChapters();
  }, [statusFilter]);

  const loadChapters = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const response = await fetch(`/api/admin/ai-chapters?${params}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Mock additional data for display
      const chaptersWithUploadInfo = (data.chapters || []).map((chapter: AIGeneratedChapters) => ({
        ...chapter,
        upload_info: {
          original_filename: `audio-${chapter.audio_upload_id}.m4a`,
          language_name: 'English',
          course_id: 'investment-security',
          file_url: 'https://example.com/audio.m4a'
        }
      }));

      setChapters(chaptersWithUploadInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load chapters');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (chapter: AIGeneratedChapters) => {
    setEditingChapter(chapter);
    setEditedData([...chapter.chapter_data]);
  };

  const handleSaveEdit = async () => {
    if (!editingChapter) return;

    try {
      setIsUpdating(true);
      setError(null);

      // Here you would save the edited chapters to your database
      // For now, we'll just update the local state
      const updatedChapters = chapters.map(c => 
        c.id === editingChapter.id 
          ? { ...c, chapter_data: editedData }
          : c
      );
      
      setChapters(updatedChapters);
      setEditingChapter(null);
      setSuccess('Chapters updated successfully');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusUpdate = async (chapterId: string, newStatus: 'approved' | 'rejected') => {
    try {
      setIsUpdating(true);
      setError(null);

      const response = await fetch('/api/admin/ai-chapters', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chaptersId: chapterId,
          status: newStatus,
          reviewNotes: reviewNotes
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Update local state
      const updatedChapters = chapters.map(c => 
        c.id === chapterId 
          ? { ...c, status: newStatus, reviewed_at: new Date(), review_notes: reviewNotes }
          : c
      );
      
      setChapters(updatedChapters);
      setReviewNotes('');
      setSelectedChapter(null);
      setSuccess(`Chapter ${newStatus} successfully`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'live': return 'text-blue-600 bg-blue-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const updateChapterSegment = (index: number, field: keyof ChapterSegment, value: any) => {
    const updated = [...editedData];
    updated[index] = { ...updated[index], [field]: value };
    setEditedData(updated);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Chapter Review & Approval
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Review, edit, and approve AI-generated chapters before deployment
          </p>
        </div>
        <button
          onClick={loadChapters}
          disabled={isLoading}
          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
          title="Refresh chapters"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Status
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="generated">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="live">Live</option>
          <option value="all">All Status</option>
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
            <span className="text-red-800 font-medium">Error</span>
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
            <span className="text-green-800 font-medium">Success</span>
          </div>
          <p className="text-green-700 text-sm mt-1">{success}</p>
        </motion.div>
      )}

      {/* Chapters List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
            <span className="ml-2 text-gray-600">Loading chapters...</span>
          </div>
        ) : chapters.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileAudio className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p>No chapters found for review</p>
            <p className="text-sm">Generate some AI chapters first to see them here</p>
          </div>
        ) : (
          chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="border rounded-xl p-6 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {chapter.upload_info?.language_name} - {chapter.upload_info?.original_filename}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chapter.status)}`}>
                      {chapter.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(chapter.overall_confidence)}`}>
                      {chapter.overall_confidence}% confidence
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Generated: {new Date(chapter.generated_at).toLocaleDateString()}
                    </span>
                    <span>
                      {chapter.chapter_data.length} chapters
                    </span>
                    <span>
                      {(chapter.processing_time_ms / 1000).toFixed(1)}s processing
                    </span>
                    <span>
                      Model: {chapter.ai_model}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedPreview(
                      expandedPreview === chapter.id ? null : chapter.id
                    )}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title={expandedPreview === chapter.id ? 'Collapse preview' : 'Expand preview'}
                  >
                    {expandedPreview === chapter.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>

                  {chapter.status === 'generated' && (
                    <>
                      <button
                        onClick={() => handleEdit(chapter)}
                        disabled={isUpdating}
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                        title="Edit chapters"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedChapter(chapter)}
                        disabled={isUpdating}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Review
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Chapter Preview */}
              {expandedPreview === chapter.id && (
                <div className="mt-4 p-4 bg-white rounded-lg border">
                  <h5 className="font-medium text-gray-900 mb-3">Chapter Preview</h5>
                  <div className="space-y-2">
                    {chapter.chapter_data.map((segment, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{index + 1}. {segment.title}</span>
                          <div className="text-xs text-gray-500">
                            {formatTime(segment.start)} - {formatTime(segment.start + segment.duration)} 
                            ({Math.floor(segment.duration)}s)
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${getConfidenceColor(segment.confidence)}`}>
                          {segment.confidence}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Review History */}
              {chapter.reviewed_at && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">
                      Reviewed on {new Date(chapter.reviewed_at).toLocaleString()}
                    </span>
                  </div>
                  {chapter.review_notes && (
                    <div className="mt-2 text-sm text-blue-800">
                      <MessageSquare className="w-3 h-3 inline mr-1" />
                      {chapter.review_notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Edit Chapters - {editingChapter.upload_info?.language_name}
                </h3>
                <button
                  onClick={() => setEditingChapter(null)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {editedData.map((segment, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Chapter {index + 1} Title
                        </label>
                        <input
                          type="text"
                          value={segment.title}
                          onChange={(e) => updateChapterSegment(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start (seconds)
                          </label>
                          <input
                            type="number"
                            value={segment.start}
                            onChange={(e) => updateChapterSegment(index, 'start', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration (seconds)
                          </label>
                          <input
                            type="number"
                            value={segment.duration}
                            onChange={(e) => updateChapterSegment(index, 'duration', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Time: {formatTime(segment.start)} - {formatTime(segment.start + segment.duration)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditingChapter(null)}
                  disabled={isUpdating}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {selectedChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Review Chapters - {selectedChapter.upload_info?.language_name}
                </h3>
                <button
                  onClick={() => setSelectedChapter(null)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Notes (Optional)
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add any comments or notes about this chapter set..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleStatusUpdate(selectedChapter.id, 'rejected')}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <ThumbsDown className="w-4 h-4" />}
                  Reject
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedChapter.id, 'approved')}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <ThumbsUp className="w-4 h-4" />}
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">📋 Review Guidelines</h4>
        <div className="text-sm text-green-800 space-y-1">
          <p>• Review chapter titles for accuracy and clarity</p>
          <p>• Check that chapter timing makes sense for the content</p>
          <p>• Ensure high-confidence chapters (85%+) are generally reliable</p>
          <p>• Edit chapters if needed before approving</p>
          <p>• Add review notes to explain decisions for future reference</p>
        </div>
      </div>
    </div>
  );
}
