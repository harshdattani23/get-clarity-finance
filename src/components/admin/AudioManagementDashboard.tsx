'use client';

import React, { useState } from 'react';
import { 
  Upload, 
  Wand2, 
  CheckCircle, 
  Rocket, 
  BarChart3,
  Settings,
  FileAudio,
  Globe,
  Users,
  Clock,
  Target,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

// Import all the audio management components
import AudioUploadManager from './AudioUploadManager';
import EnhancedAIChapterGenerator from './EnhancedAIChapterGenerator';
import ChapterApprovalWorkflow from './ChapterApprovalWorkflow';
import LiveDeploymentSystem from './LiveDeploymentSystem';

type TabType = 'overview' | 'upload' | 'generate' | 'approve' | 'deploy';

interface DashboardStats {
  totalUploads: number;
  pendingReview: number;
  approvedChapters: number;
  liveConfigurations: number;
  totalLanguages: number;
  averageConfidence: number;
}

export default function AudioManagementDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Mock stats - in real implementation, these would come from API calls
  const stats: DashboardStats = {
    totalUploads: 24,
    pendingReview: 8,
    approvedChapters: 15,
    liveConfigurations: 18,
    totalLanguages: 9,
    averageConfidence: 87
  };

  const tabs = [
    {
      id: 'overview' as TabType,
      name: 'Overview',
      icon: BarChart3,
      description: 'System status and statistics'
    },
    {
      id: 'upload' as TabType,
      name: 'Upload Audio',
      icon: Upload,
      description: 'Upload audio files for courses'
    },
    {
      id: 'generate' as TabType,
      name: 'Generate Chapters',
      icon: Wand2,
      description: 'AI-powered chapter generation'
    },
    {
      id: 'approve' as TabType,
      name: 'Review & Approve',
      icon: CheckCircle,
      description: 'Review and approve chapters'
    },
    {
      id: 'deploy' as TabType,
      name: 'Deploy Live',
      icon: Rocket,
      description: 'Deploy approved chapters'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload':
        return <AudioUploadManager />;
      case 'generate':
        return <EnhancedAIChapterGenerator />;
      case 'approve':
        return <ChapterApprovalWorkflow />;
      case 'deploy':
        return <LiveDeploymentSystem />;
      case 'overview':
      default:
        return <OverviewTab stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileAudio className="w-8 h-8 text-indigo-600" />
            Audio Management System
          </h1>
          <p className="text-gray-600 mt-2">
            Complete workflow for managing audio content with AI-powered chapter generation
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Description */}
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              {tabs.find(tab => tab.id === activeTab)?.description}
            </p>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ stats }: { stats: DashboardStats }) {
  const statCards = [
    {
      title: 'Total Audio Uploads',
      value: stats.totalUploads,
      icon: FileAudio,
      color: 'blue',
      description: 'Audio files uploaded across all courses'
    },
    {
      title: 'Pending Review',
      value: stats.pendingReview,
      icon: Clock,
      color: 'yellow',
      description: 'AI-generated chapters awaiting approval'
    },
    {
      title: 'Approved Chapters',
      value: stats.approvedChapters,
      icon: CheckCircle,
      color: 'green',
      description: 'Chapter sets ready for deployment'
    },
    {
      title: 'Live Configurations',
      value: stats.liveConfigurations,
      icon: Target,
      color: 'indigo',
      description: 'Currently deployed chapter configs'
    },
    {
      title: 'Supported Languages',
      value: stats.totalLanguages,
      icon: Globe,
      color: 'purple',
      description: 'Languages available for content'
    },
    {
      title: 'Average Confidence',
      value: `${stats.averageConfidence}%`,
      icon: Sparkles,
      color: 'pink',
      description: 'AI chapter generation accuracy'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-100',
      yellow: 'bg-yellow-500 text-yellow-100',
      green: 'bg-green-500 text-green-100',
      indigo: 'bg-indigo-500 text-indigo-100',
      purple: 'bg-purple-500 text-purple-100',
      pink: 'bg-pink-500 text-pink-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${getColorClasses(stat.color)} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{stat.title}</h3>
            <p className="text-sm text-gray-600">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Workflow Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Audio Management Workflow</h3>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">1. Upload Audio</h4>
            <p className="text-sm text-gray-600">
              Upload audio files for different courses and languages through the admin interface
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wand2 className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">2. Generate Chapters</h4>
            <p className="text-sm text-gray-600">
              Use Gemini AI to automatically analyze audio and generate intelligent chapter divisions
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">3. Review & Approve</h4>
            <p className="text-sm text-gray-600">
              Review AI-generated chapters, make edits if needed, and approve for deployment
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-indigo-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">4. Deploy Live</h4>
            <p className="text-sm text-gray-600">
              Deploy approved chapters to update live audio players for all users
            </p>
          </div>
        </div>

        {/* Workflow Arrows */}
        <div className="hidden md:flex justify-between items-center mt-8 px-8">
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          {[
            {
              action: 'Chapters deployed for English audio',
              time: '2 minutes ago',
              type: 'deploy',
              icon: Rocket,
              color: 'text-indigo-600'
            },
            {
              action: 'Hindi chapters approved',
              time: '15 minutes ago',
              type: 'approve',
              icon: CheckCircle,
              color: 'text-green-600'
            },
            {
              action: 'AI chapters generated for Gujarati',
              time: '32 minutes ago',
              type: 'generate',
              icon: Wand2,
              color: 'text-purple-600'
            },
            {
              action: 'Tamil audio file uploaded',
              time: '1 hour ago',
              type: 'upload',
              icon: Upload,
              color: 'text-blue-600'
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center ${activity.color}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">System Status</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">AI Services</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Gemini AI</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Content Analysis</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Audio Processing</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Online</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Storage & Performance</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Audio Storage</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">78% Used</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Response Time</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Fast (1.2s)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database Health</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
