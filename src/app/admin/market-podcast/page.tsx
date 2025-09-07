import React from 'react';
import MultiLanguagePodcastManager from '@/components/admin/MultiLanguagePodcastManager';
import PodcastPlaylist from '@/components/admin/PodcastPlaylist';
import { PodcastProvider } from '@/contexts/PodcastContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Market Podcast - Admin Panel',
  description: 'Manage daily regulatory podcasts in multiple languages',
};

export default function AdminMarketPodcastPage() {
  return (
    <PodcastProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📻 Market Podcast Management</h1>
          <p className="text-gray-600 text-lg mb-4">
            Generate and manage AI-powered regulatory news podcasts in multiple languages
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start space-x-2">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <div>
                  <p className="font-medium text-gray-900">Generate Base Content</p>
                  <p className="text-gray-600">Uses Gemini AI + Google Search to fetch latest SEBI, RBI & regulatory news in English</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <div>
                  <p className="font-medium text-gray-900">Generate Multi-Language Audio</p>
                  <p className="text-gray-600">Converts English content to professional podcasts in 7 Indian languages</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <div>
                  <p className="font-medium text-gray-900">Archive & Share</p>
                  <p className="text-gray-600">View historical episodes, play audio, and download for distribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Benefits */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Smart Cost Optimization</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="block font-medium text-green-800">86% Cost Savings</span>
                  <span className="text-green-600">1 API call vs 7 daily</span>
                </div>
                <div>
                  <span className="block font-medium text-green-800">7 Languages</span>
                  <span className="text-green-600">From single English source</span>
                </div>
                <div>
                  <span className="block font-medium text-green-800">Smart Caching</span>
                  <span className="text-green-600">24-hour database storage</span>
                </div>
                <div>
                  <span className="block font-medium text-green-800">Real-time News</span>
                  <span className="text-green-600">Google Search integration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Management */}
        <MultiLanguagePodcastManager />
        
        {/* Podcast Archive */}
        <PodcastPlaylist />
      </div>
    </PodcastProvider>
  );
}
