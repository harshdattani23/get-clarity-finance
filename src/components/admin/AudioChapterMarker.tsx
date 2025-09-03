'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Plus, Trash2, Save, Download } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  start: number;
  duration?: number;
}

interface AudioChapterMarkerProps {
  audioUrl: string;
  languageCode: string;
  languageName: string;
  existingChapters?: Chapter[];
}

export default function AudioChapterMarker({ 
  audioUrl, 
  languageCode, 
  languageName, 
  existingChapters = [] 
}: AudioChapterMarkerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [chapters, setChapters] = useState<Chapter[]>(existingChapters);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Calculate durations when chapters change
    const updatedChapters = chapters.map((chapter, index) => {
      const nextChapter = chapters[index + 1];
      const calculatedDuration = nextChapter 
        ? nextChapter.start - chapter.start 
        : duration - chapter.start;
      
      return {
        ...chapter,
        duration: calculatedDuration
      };
    });
    
    setChapters(updatedChapters);
  }, [duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - 5);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(duration, audioRef.current.currentTime + 5);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const addChapter = () => {
    if (!newChapterTitle.trim()) return;

    const newChapter: Chapter = {
      id: `chapter_${Date.now()}`,
      title: newChapterTitle.trim(),
      start: Math.floor(currentTime),
      duration: 0
    };

    const updatedChapters = [...chapters, newChapter]
      .sort((a, b) => a.start - b.start)
      .map((chapter, index, arr) => {
        const nextChapter = arr[index + 1];
        return {
          ...chapter,
          duration: nextChapter ? nextChapter.start - chapter.start : duration - chapter.start
        };
      });

    setChapters(updatedChapters);
    setNewChapterTitle('');
  };

  const removeChapter = (chapterId: string) => {
    const updatedChapters = chapters
      .filter(chapter => chapter.id !== chapterId)
      .map((chapter, index, arr) => {
        const nextChapter = arr[index + 1];
        return {
          ...chapter,
          duration: nextChapter ? nextChapter.start - chapter.start : duration - chapter.start
        };
      });
    
    setChapters(updatedChapters);
  };

  const jumpToChapter = (startTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
      setCurrentTime(startTime);
    }
  };

  const generateChapterCode = () => {
    const chapterConfig = chapters.map(chapter => ({
      title: chapter.title,
      start: chapter.start,
      duration: Math.floor(chapter.duration || 0)
    }));

    return JSON.stringify(chapterConfig, null, 2);
  };

  const downloadChapterConfig = () => {
    const config = generateChapterCode();
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${languageCode}_chapters.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Audio Chapter Marker - {languageName}</h2>
      
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />

      {/* Audio Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={skipBackward}
            className="p-2 hover:bg-gray-200 rounded-full"
            title="Skip back 5s"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <button
            onClick={skipForward}
            className="p-2 hover:bg-gray-200 rounded-full"
            title="Skip forward 5s"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Add Chapter */}
      <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Add Chapter at Current Time ({formatTime(currentTime)})</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newChapterTitle}
            onChange={(e) => setNewChapterTitle(e.target.value)}
            placeholder="Enter chapter title..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && addChapter()}
          />
          <button
            onClick={addChapter}
            disabled={!newChapterTitle.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Chapter
          </button>
        </div>
      </div>

      {/* Chapter List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Chapters ({chapters.length})</h3>
        {chapters.length === 0 ? (
          <p className="text-gray-500 italic">No chapters added yet. Play the audio and add chapter markers!</p>
        ) : (
          <div className="space-y-2">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="flex-1">
                  <div className="font-medium">{index + 1}. {chapter.title}</div>
                  <div className="text-sm text-gray-600">
                    {formatTime(chapter.start)} - {formatTime(chapter.start + (chapter.duration || 0))} 
                    ({Math.floor(chapter.duration || 0)}s)
                  </div>
                </div>
                <button
                  onClick={() => jumpToChapter(chapter.start)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Jump To
                </button>
                <button
                  onClick={() => removeChapter(chapter.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export Options */}
      {chapters.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-3">Export Chapter Configuration</h3>
          <div className="flex gap-2 mb-4">
            <button
              onClick={downloadChapterConfig}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download JSON
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Chapter Configuration Code:</h4>
            <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
              {generateChapterCode()}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
