'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

export default function AudioTest() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  // Test with your existing files
  const testUrls = [
    'https://storage.googleapis.com/getclarity-audio-bucket/lessons/module1/english.m4a',
    'https://storage.googleapis.com/getclarity-audio-bucket/lessons/module1/hindi.m4a',
    'https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/what-is-stock-en.m4a',
  ];
  
  const [currentUrl, setCurrentUrl] = useState(testUrls[0]);
  
  const togglePlay = () => {
    if (!audio) {
      const newAudio = new Audio(currentUrl);
      newAudio.addEventListener('ended', () => setIsPlaying(false));
      newAudio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        alert('Failed to load audio file');
      });
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };
  
  const switchAudio = (url: string) => {
    if (audio) {
      audio.pause();
      setAudio(null);
      setIsPlaying(false);
    }
    setCurrentUrl(url);
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Audio System Test</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Test Audio Files:</h3>
          <div className="space-y-2">
            {testUrls.map((url, index) => {
              const fileName = url.split('/').pop()?.replace('.m4a', '');
              return (
                <button
                  key={index}
                  onClick={() => switchAudio(url)}
                  className={`w-full text-left p-2 rounded border ${
                    currentUrl === url 
                      ? 'bg-blue-50 border-blue-300' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  {fileName}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center space-x-4 pt-4 border-t">
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          
          <div className="flex-1">
            <p className="text-sm text-gray-600">
              Current: {currentUrl.split('/').pop()?.replace('.m4a', '')}
            </p>
          </div>
          
          <Volume2 className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h4 className="font-medium mb-2">Bucket Structure Found:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Bucket: getclarity-audio-bucket</li>
          <li>• Project: sebi-hackathon</li>
          <li>• Existing audio files in multiple languages</li>
          <li>• Files are publicly accessible</li>
          <li>• CORS configured correctly</li>
        </ul>
      </div>
    </div>
  );
}
