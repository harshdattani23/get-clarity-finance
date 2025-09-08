'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Download, 
  Upload, 
  Trash2, 
  Edit3, 
  Plus, 
  Mic, 
  Volume2,
  Clock,
  Calendar,
  Users,
  Headphones
} from 'lucide-react';

interface Podcast {
  id: string;
  title: string;
  description: string;
  language: string;
  duration: string;
  status: 'draft' | 'processing' | 'ready' | 'published';
  createdAt: string;
  audioUrl?: string;
  transcript?: string;
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'kn', name: 'Kannada' },
  { code: 'bn', name: 'Bengali' }
];

export default function PodcastManagerClient() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // New podcast form state
  const [newPodcast, setNewPodcast] = useState({
    title: '',
    description: '',
    language: 'en',
    content: ''
  });

  // Load podcasts on mount
  useEffect(() => {
    loadPodcasts();
  }, []);

  const loadPodcasts = async () => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual API call
      const mockPodcasts: Podcast[] = [
        {
          id: '1',
          title: 'Market Update: SEBI Regulations',
          description: 'Latest updates on SEBI regulations and market changes',
          language: 'en',
          duration: '15:30',
          status: 'ready',
          createdAt: '2024-01-15',
          audioUrl: '#'
        },
        {
          id: '2',
          title: 'निवेश सुरक्षा गाइड',
          description: 'Investment security guide in Hindi',
          language: 'hi',
          duration: '12:45',
          status: 'processing',
          createdAt: '2024-01-14'
        }
      ];
      setPodcasts(mockPodcasts);
    } catch (error) {
      console.error('Error loading podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePodcast = async () => {
    if (!newPodcast.title || !newPodcast.content) return;
    
    setLoading(true);
    try {
      const podcast: Podcast = {
        id: Date.now().toString(),
        title: newPodcast.title,
        description: newPodcast.description,
        language: newPodcast.language,
        duration: '0:00',
        status: 'processing',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setPodcasts(prev => [podcast, ...prev]);
      setNewPodcast({ title: '', description: '', language: 'en', content: '' });
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating podcast:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = (podcastId: string) => {
    setIsPlaying(current => current === podcastId ? null : podcastId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'published': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-lg p-8 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Headphones className="text-indigo-600" />
                Podcast Manager
              </h1>
              <p className="text-gray-600 mt-2">
                Create, manage, and distribute podcasts across multiple languages
              </p>
            </div>
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Podcast
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Podcasts</p>
                  <p className="text-2xl font-bold text-gray-900">{podcasts.length}</p>
                </div>
                <Mic className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600">
                    {podcasts.filter(p => p.status === 'published').length}
                  </p>
                </div>
                <Volume2 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Processing</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {podcasts.filter(p => p.status === 'processing').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Languages</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {new Set(podcasts.map(p => p.language)).size}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Podcast List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Podcasts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {podcasts.map((podcast) => (
                      <div
                        key={podcast.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedPodcast(podcast)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {podcast.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {podcast.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {podcast.duration}
                              </span>
                              <span>
                                {LANGUAGES.find(l => l.code === podcast.language)?.name}
                              </span>
                              <span>{podcast.createdAt}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(podcast.status)}>
                              {podcast.status}
                            </Badge>
                            {podcast.status === 'ready' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePlay(podcast.id);
                                }}
                              >
                                {isPlaying === podcast.id ? (
                                  <Pause className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Create New Podcast */}
            {isCreating && (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Podcast</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Podcast title"
                    value={newPodcast.title}
                    onChange={(e) => setNewPodcast(prev => ({ ...prev, title: e.target.value }))}
                  />
                  
                  <Textarea
                    placeholder="Description"
                    value={newPodcast.description}
                    onChange={(e) => setNewPodcast(prev => ({ ...prev, description: e.target.value }))}
                  />
                  
                  <Select
                    value={newPodcast.language}
                    onValueChange={(value) => setNewPodcast(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Textarea
                    placeholder="Podcast content/script"
                    rows={4}
                    value={newPodcast.content}
                    onChange={(e) => setNewPodcast(prev => ({ ...prev, content: e.target.value }))}
                  />
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleCreatePodcast}
                      disabled={!newPodcast.title || !newPodcast.content}
                      className="flex-1"
                    >
                      Create
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCreating(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Selected Podcast Details */}
            {selectedPodcast && (
              <Card>
                <CardHeader>
                  <CardTitle>Podcast Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">{selectedPodcast.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {selectedPodcast.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Language:</span>
                      <span>{LANGUAGES.find(l => l.code === selectedPodcast.language)?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Duration:</span>
                      <span>{selectedPodcast.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedPodcast.status)}>
                        {selectedPodcast.status}
                      </Badge>
                    </div>
                  </div>

                  {selectedPodcast.status === 'processing' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processing:</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="w-full" />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {selectedPodcast.status === 'ready' && (
                      <>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Audio
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mic className="w-4 h-4 mr-2" />
                  Record Live
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

