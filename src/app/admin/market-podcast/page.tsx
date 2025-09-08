import React from 'react';
import { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ExternalLink, Headphones, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Clarity Daily - RSS Feed',
  description: 'RSS feed information for Market Clarity Daily podcast',
};

export default function AdminMarketPodcastPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <Headphones className="text-indigo-600" />
          Market Clarity Daily
        </h1>
        <p className="text-gray-600">
          RSS-based podcast distribution for multi-language financial content
        </p>
      </div>

      {/* RSS Feed Information */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Live RSS Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">RSS Feed URL:</p>
                <div className="bg-gray-50 p-3 rounded-lg border flex items-center justify-between">
                  <code className="text-sm text-gray-800 break-all">
                    https://api.autocontentapi.com/podcast/rss/08D34B04-D849-43CC-BC65-2449D575B630
                  </code>
                  <a 
                    href="https://api.autocontentapi.com/podcast/rss/08D34B04-D849-43CC-BC65-2449D575B630"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 p-1 text-gray-500 hover:text-gray-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">✅ Automated</h3>
                  <p className="text-sm text-green-700">No cron jobs or manual generation needed</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">🌐 Multi-language</h3>
                  <p className="text-sm text-blue-700">English, Hindi, Bengali, Tamil, Gujarati</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-800 mb-2">📱 Real-time</h3>
                  <p className="text-sm text-purple-700">Live updates on home page widget</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-800 mb-2">🎧 Full Audio</h3>
                  <p className="text-sm text-orange-700">Ready for podcast platforms</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Home Page Widget</span>
                <span className="text-green-600 font-medium">✅ Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Apple Podcasts</span>
                <span className="text-blue-600 font-medium">📱 Ready</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Spotify</span>
                <span className="text-green-600 font-medium">🎵 Ready</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Google Podcasts</span>
                <span className="text-orange-600 font-medium">🔗 Ready</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
