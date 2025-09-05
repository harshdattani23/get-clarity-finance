"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { 
  Users, 
  TrendingUp, 
  Award, 
  Activity,
  BookOpen,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Search,
  AlertTriangle,
  FileText,
  Shield,
  Music,
  Bot
} from "lucide-react";
import Link from "next/link";
import { LiveDashboard } from "@/components/admin/LiveDashboard";
import { PerformanceAnalytics } from "@/components/admin/PerformanceAnalytics";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  avgCompletionRate: string;
  recentActivity: number;
  totalQueries?: number;
  queriesLast7Days?: number;
  totalReports?: number;
  pendingReports?: number;
}

interface ModuleCompletionRates {
  "intro-to-suspicious-activity": number;
  "intermediate-suspicious-activity": number;
  "advanced-suspicious-activity": number;
  "prevention": number;
}

interface UserProgress {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: number;
  completedModules: string[];
  unlockedModules: string[];
  progressPercentage: number;
  lastActive: string;
}

interface VerificationLog {
  id: string;
  query: string;
  type: string;
  found: boolean;
  riskScore: number | null;
  legitimacyStatus: string | null;
  createdAt: string;
}

interface SuspiciousReport {
  id: string;
  reportId: string;
  entityName: string;
  suspiciousType: string;
  riskScore: number;
  status: string;
  sebiReported: boolean;
  createdAt: string;
}

interface DashboardData {
  stats: DashboardStats;
  moduleCompletionRates: ModuleCompletionRates;
  userProgress: UserProgress[];
  recentUpdates: UserProgress[];
  verificationLogs?: VerificationLog[];
  suspiciousReports?: SuspiciousReport[];
  queryTypes?: Record<string, number>;
  agentQueryBreakdown?: {
    deepfake: number;
    social: number;
    announcement: number;
    'sebi-query': number;
    'advisor-verifier': number;
    other: number;
  };
  suspiciousTypeStats?: Record<string, number>;
  reportStats?: {
    total: number;
    pending: number;
    verified: number;
    reportedToSEBI: number;
  };
}

export default function AdminDashboard() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  useEffect(() => {
    if (user) {
      const userEmail = user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId
      )?.emailAddress;

      if (userEmail !== ADMIN_EMAIL) {
        router.push("/");
      } else {
        fetchDashboardData();
      }
    }
  }, [user, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/dashboard-db");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const moduleNames: Record<string, string> = {
    "intro-to-suspicious-activity": "Introduction to Suspicious Activity",
    "intermediate-suspicious-activity": "Intermediate Suspicious Activity",
    "advanced-suspicious-activity": "Advanced Suspicious Activity",
    "prevention": "Prevention Strategies"
  };

  const getModuleColor = (rate: number) => {
    if (rate >= 75) return "text-green-600 bg-green-100";
    if (rate >= 50) return "text-yellow-600 bg-yellow-100";
    if (rate >= 25) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Overview of learning platform statistics</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/admin/agent-queries"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                Agent Queries
              </Link>
              <Link
                href="/admin/audio-chapters"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Music className="w-4 h-4" />
                Audio Chapters
              </Link>
              <Link
                href="/admin/system-health"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                System Health
              </Link>
              <Link
                href="/admin/virtual-trading"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Trading Analytics
              </Link>
              <Link
                href="/admin/learning-dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                User Progress Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData.stats.totalUsers}
                </p>
                <p className="text-xs text-gray-500 mt-2">Registered on platform</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Learners</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData.stats.activeUsers}
                </p>
                <p className="text-xs text-gray-500 mt-2">Started learning</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData.stats.avgCompletionRate}%
                </p>
                <p className="text-xs text-gray-500 mt-2">Course progress</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Activity</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData.stats.recentActivity}
                </p>
                <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Second Row (Queries and Reports) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="w-full">
                <p className="text-sm font-medium text-gray-600">Total Queries</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData.stats.totalQueries || 0}
                </p>
                <p className="text-xs text-gray-500 mt-2 mb-3">All AI Agent searches</p>
                
                {/* Agent breakdown */}
                {dashboardData.agentQueryBreakdown && (
                  <div className="border-t pt-2 space-y-1">
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {dashboardData.agentQueryBreakdown.deepfake > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Video:</span>
                          <span className="font-medium text-gray-700">{dashboardData.agentQueryBreakdown.deepfake}</span>
                        </div>
                      )}
                      {dashboardData.agentQueryBreakdown.social > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Social:</span>
                          <span className="font-medium text-gray-700">{dashboardData.agentQueryBreakdown.social}</span>
                        </div>
                      )}
                      {dashboardData.agentQueryBreakdown.announcement > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Announce:</span>
                          <span className="font-medium text-gray-700">{dashboardData.agentQueryBreakdown.announcement}</span>
                        </div>
                      )}
                      {dashboardData.agentQueryBreakdown['sebi-query'] > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">SEBI:</span>
                          <span className="font-medium text-gray-700">{dashboardData.agentQueryBreakdown['sebi-query']}</span>
                        </div>
                      )}
                      {dashboardData.agentQueryBreakdown['advisor-verifier'] > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Advisor:</span>
                          <span className="font-medium text-gray-700">{dashboardData.agentQueryBreakdown['advisor-verifier']}</span>
                        </div>
                      )}
                      {dashboardData.agentQueryBreakdown.other > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Other:</span>
                          <span className="font-medium text-gray-700">{dashboardData.agentQueryBreakdown.other}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg ml-3">
                <Search className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Queries</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData.stats.queriesLast7Days || 0}
                </p>
                <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
              </div>
              <div className="p-3 bg-cyan-100 rounded-lg">
                <Clock className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suspicious Reports</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData.stats.totalReports || 0}
                </p>
                <p className="text-xs text-gray-500 mt-2">Total submitted</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData.stats.pendingReports || 0}
                </p>
                <p className="text-xs text-gray-500 mt-2">Awaiting action</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Live System Monitor */}
        <div className="mb-8">
          <LiveDashboard />
        </div>

        {/* Performance Analytics */}
        <div className="mb-8">
          <PerformanceAnalytics />
        </div>

        {/* Module Completion Rates */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Module Completion Rates</h2>
            <BookOpen className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {Object.entries(dashboardData.moduleCompletionRates).map(([module, rate]) => (
              <div key={module}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {moduleNames[module]}
                  </span>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${getModuleColor(rate)}`}>
                    {rate.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      rate >= 75 ? "bg-green-500" :
                      rate >= 50 ? "bg-yellow-500" :
                      rate >= 25 ? "bg-orange-500" :
                      "bg-red-500"
                    }`}
                    style={{ width: `${rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Verification Queries */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent AI Agent Queries</h2>
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            {dashboardData.verificationLogs && dashboardData.verificationLogs.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {dashboardData.verificationLogs.slice(0, 20).map((log) => (
                  <div key={log.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {log.query}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">
                            Type: {log.type}
                          </span>
                          {log.found ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                              Found
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                              Not Found
                            </span>
                          )}
                          {log.riskScore !== null && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              log.riskScore >= 70 ? 'bg-red-100 text-red-700' :
                              log.riskScore >= 40 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              Risk: {log.riskScore}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No verification queries yet</p>
            )}
          </div>

          {/* Recent Fraud Reports */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Suspicious Activity Reports</h2>
              <AlertTriangle className="w-5 h-5 text-gray-400" />
            </div>
            {dashboardData.suspiciousReports && dashboardData.suspiciousReports.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {dashboardData.suspiciousReports.slice(0, 10).map((report) => (
                  <div key={report.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {report.entityName}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Report ID: {report.reportId}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">
                          Type: {report.suspiciousType}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            report.status === 'verified' ? 'bg-green-100 text-green-700' :
                            report.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {report.status}
                          </span>
                          {report.sebiReported && (
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                              SEBI Reported
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${
                          report.riskScore >= 70 ? 'text-red-600' :
                          report.riskScore >= 40 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {report.riskScore}
                        </span>
                        <p className="text-xs text-gray-500">Risk Score</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(report.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No suspicious activity reports submitted</p>
            )}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent User Activity</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          {dashboardData.recentUpdates.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recentUpdates.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {user.imageUrl ? (
                      <img 
                        src={user.imageUrl} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-gray-700">
                          {user.completedModules.length} modules
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(user.lastActive).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="w-24">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">{user.progressPercentage.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${user.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent activity in the last 7 days</p>
          )}
        </div>
      </div>
    </div>
  );
}
