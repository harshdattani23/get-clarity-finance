"use client";

import { Headphones, BookOpen } from 'lucide-react';

interface LearningModeToggleProps {
  mode: 'audio' | 'text';
  onModeChange: (mode: 'audio' | 'text') => void;
}

export default function LearningModeToggle({ 
  mode, 
  onModeChange 
}: LearningModeToggleProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
      <div className="flex">
        <button
          onClick={() => onModeChange('audio')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            mode === 'audio'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <Headphones className="w-5 h-5" />
          <span>🎧 Listen & Learn</span>
        </button>
        
        <button
          onClick={() => onModeChange('text')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            mode === 'text'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>📚 Read & Learn</span>
        </button>
      </div>
    </div>
  );
}
