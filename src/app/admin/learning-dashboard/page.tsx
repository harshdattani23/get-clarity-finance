"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  FileText,
  Shield,
  BarChart3,
  Clock,
  Award,
  BookOpen,
  Target,
  Trophy,
  Zap,
  Lock,
  ChevronRight,
  Search,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Mail,
  User,
  GraduationCap,
  Percent,
  Star,
  Eye,
  BarChart,
  PieChart,
  TrendingDown,
} from 'lucide-react';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'dattaniharsh12@gmail.com';

interface UserProgress {
  userId: string;
  email: string;
  name: string;
  joinedDate: string;
  lastActive: string;
  totalXP: number;
  level: number;
  completedModules: string[];
  moduleProgress: {
    [key: string]: {
      progress: number;
      completed: boolean;
      completedAt?: string;
      xpEarned?: number;
    };
  };
  certificates: {
    id: string;
    moduleName: string;
    issuedDate: string;
  }[];
  totalTimeSpent: number; // in minutes
  averageScore: number;
  achievements: string[];
}

interface CourseStats {
  totalUsers: number;
  activeUsers: number;
  completionRate: number;
  averageProgress: number;
  totalXPEarned: number;
  totalCertificatesIssued: number;
  popularModules: { name: string; enrollments: number }[];
  userGrowth: { date: string; count: number }[];
}

// Mock data generator for demonstration
const generateMockData = (): { users: UserProgress[], stats: CourseStats } => {
  const modules = [
    'intro-to-frauds',
    'intermediate-frauds', 
    'ponzi-schemes',
    'pump-dump',
    'insider-trading',
    'digital-frauds',
    'fake-advisors',
    'spoofing-wash-trading'
  ];

  const mockEmails = [
    'harsh@abhyas.guru',
    'john.doe@example.com',
    'sarah.wilson@test.com',
    'mike.johnson@demo.com',
    'emily.brown@sample.com',
    'raj.patel@example.in',
    'priya.sharma@test.in',
    'alex.chen@demo.com',
    'lisa.anderson@sample.com',
    'david.kim@example.com'
  ];

  const users: UserProgress[] = mockEmails.map((email, index) => {
    const completedCount = Math.floor(Math.random() * modules.length);
    const completedModules = modules.slice(0, completedCount);
    const moduleProgress: any = {};
    
    modules.forEach((module, idx) => {
      if (idx < completedCount) {
        moduleProgress[module] = {
          progress: 100,
          completed: true,
          completedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          xpEarned: 100 + Math.floor(Math.random() * 200)
        };
      } else if (idx === completedCount) {
        moduleProgress[module] = {
          progress: Math.floor(Math.random() * 99),
          completed: false
        };
      } else {
        moduleProgress[module] = {
          progress: 0,
          completed: false
        };
      }
    });

    return {
      userId: `user_${index + 1}`,
      email,
      name: email.split('@')[0].replace('.', ' ').split(' ').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' '),
      joinedDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      totalXP: completedCount * 150 + Math.floor(Math.random() * 500),
      level: Math.floor(completedCount / 2) + 1,
      completedModules,
      moduleProgress,
      certificates: completedModules.map(module => ({
        id: `cert_${module}_${index}`,
        moduleName: module.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        issuedDate: moduleProgress[module].completedAt
      })),
      totalTimeSpent: completedCount * 45 + Math.floor(Math.random() * 200),
      averageScore: 70 + Math.floor(Math.random() * 30),
      achievements: completedCount > 3 ? ['Fast Learner', 'Quiz Master'] : ['Beginner']
    };
  });

  // Special case for harsh@abhyas.guru - show as completed Module 1
  users[0].moduleProgress['intro-to-frauds'] = {
    progress: 100,
    completed: true,
    completedAt: new Date().toISOString(),
    xpEarned: 100
  };
  users[0].completedModules = ['intro-to-frauds'];
  users[0].totalXP = 100;

  const stats: CourseStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => new Date(u.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    completionRate: (users.filter(u => u.completedModules.length >= 4).length / users.length) * 100,
    averageProgress: users.reduce((acc, u) => acc + (u.completedModules.length / modules.length) * 100, 0) / users.length,
    totalXPEarned: users.reduce((acc, u) => acc + u.totalXP, 0),
    totalCertificatesIssued: users.reduce((acc, u) => acc + u.certificates.length, 0),
    popularModules: modules.map(m => ({
      name: m.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      enrollments: users.filter(u => u.moduleProgress[m]?.progress > 0).length
    })).sort((a, b) => b.enrollments - a.enrollments).slice(0, 5),
    userGrowth: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      count: Math.floor(Math.random() * 5) + 1
    }))
  };

  return { users, stats };
};

export default function AdminLearningDashboard() {
  const { user: clerkUser, isLoaded } = useUser();
  const router = useRouter();
  const [users, setUsers] = useState<UserProgress[]>([]);
  const [stats, setStats] = useState<CourseStats | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'xp' | 'lastActive'>('lastActive');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProgress | null>(null);

  // Check if user is admin
  const isAdmin = clerkUser?.emailAddresses?.[0]?.emailAddress === ADMIN_EMAIL;

  useEffect(() => {
    if (isLoaded && !clerkUser) {
      // User is not signed in
      return;
    }
    
    if (isLoaded && clerkUser && !isAdmin) {
      // User is signed in but not admin
      router.push('/');
      return;
    }

    if (isAdmin) {
      // Load data
      loadDashboardData();
    }
  }, [isLoaded, clerkUser, isAdmin, router]);

  const loadDashboardData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const { users: mockUsers, stats: mockStats } = generateMockData();
      setUsers(mockUsers);
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  };

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesModule = 
        filterModule === 'all' || 
        user.moduleProgress[filterModule]?.progress > 0;
      
      return matchesSearch && matchesModule;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'progress':
          return b.completedModules.length - a.completedModules.length;
        case 'xp':
          return b.totalXP - a.totalXP;
        case 'lastActive':
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        default:
          return 0;
      }
    });

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Completed Modules', 'Total XP', 'Level', 'Last Active'];
    const rows = users.map(user => [
      user.name,
      user.email,
      user.completedModules.length,
      user.totalXP,
      user.level,
      new Date(user.lastActive).toLocaleDateString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning-progress-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!clerkUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Access Required</h2>
            <p className="text-gray-600 mb-6">Please sign in with your admin account to access the learning dashboard.</p>
            <SignInButton mode="modal">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Sign In as Admin
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-2">This page is restricted to administrators only.</p>
            <p className="text-sm text-gray-500 mb-6">Current user: {clerkUser.emailAddresses?.[0]?.emailAddress}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Learning Dashboard</h1>
              <p className="text-sm text-gray-600">Monitor and manage user learning progress</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={loadDashboardData}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="container mx-auto px-6 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-blue-500" />
                <span className="text-sm text-gray-500">Total</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
              <p className="text-sm text-gray-600">Registered Users</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-green-500" />
                <span className="text-sm text-gray-500">7 days</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.activeUsers}</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <span className="text-sm text-gray-500">Total</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalXPEarned.toLocaleString()}</p>
              <p className="text-sm text-gray-600">XP Earned</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-purple-500" />
                <span className="text-sm text-gray-500">Issued</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalCertificatesIssued}</p>
              <p className="text-sm text-gray-600">Certificates</p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Average Progress</span>
                    <span className="font-medium">{stats.averageProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${stats.averageProgress}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-medium">{stats.completionRate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${stats.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Modules</h3>
              <div className="space-y-3">
                {stats.popularModules.slice(0, 5).map((module, index) => (
                  <div key={module.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                      <span className="text-sm text-gray-800">{module.name}</span>
                    </div>
                    <span className="text-sm font-medium text-blue-600">{module.enrollments} users</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <select
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Modules</option>
                <option value="intro-to-frauds">Introduction to Frauds</option>
                <option value="intermediate-frauds">Common Investment Frauds</option>
                <option value="ponzi-schemes">Ponzi Schemes</option>
                <option value="pump-dump">Pump & Dump</option>
                <option value="insider-trading">Insider Trading</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="lastActive">Last Active</option>
                <option value="name">Name</option>
                <option value="progress">Progress</option>
                <option value="xp">XP Earned</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      XP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Certificates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(user.completedModules.length / 8) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {user.completedModules.length}/8
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">{user.level}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-medium">{user.totalXP}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{user.certificates.length}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.lastActive).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total XP</p>
                  <p className="text-2xl font-bold text-gray-800">{selectedUser.totalXP}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Level</p>
                  <p className="text-2xl font-bold text-gray-800">{selectedUser.level}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Time Spent</p>
                  <p className="text-2xl font-bold text-gray-800">{selectedUser.totalTimeSpent} min</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Module Progress</h3>
              <div className="space-y-3 mb-6">
                {Object.entries(selectedUser.moduleProgress).map(([module, progress]) => (
                  <div key={module} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-800">
                        {module.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span className="text-sm text-gray-600">{progress.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${progress.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${progress.progress}%` }}
                      />
                    </div>
                    {progress.completed && (
                      <p className="text-xs text-gray-500 mt-1">
                        Completed on {new Date(progress.completedAt!).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              {selectedUser.certificates.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Certificates Earned</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedUser.certificates.map((cert) => (
                      <div key={cert.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{cert.moduleName}</p>
                            <p className="text-xs text-gray-600">
                              Issued: {new Date(cert.issuedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add X icon component
const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
