"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  Users,
  Activity,
  Trophy,
  Award,
  RefreshCw,
  X,
  CheckCircle,
  Clock
} from "lucide-react";
import Link from "next/link";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";

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

interface DashboardData {
  stats: {
    totalUsers: number;
    activeUsers: number;
    avgCompletionRate: string;
    recentActivity: number;
  };
  moduleCompletionRates: Record<string, number>;
  userProgress: UserProgress[];
  recentUpdates: UserProgress[];
}

export default function AdminLearningDashboard() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModule, setFilterModule] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedUser, setSelectedUser] = useState<UserProgress | null>(null);

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

  // Filter and sort users
  const users = dashboardData?.userProgress || [];
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterModule === "all" || 
      (filterModule === "completed" && user.progressPercentage === 100) ||
      (filterModule === "in-progress" && user.progressPercentage > 0 && user.progressPercentage < 100) ||
      (filterModule === "not-started" && user.progressPercentage === 0);
    
    return matchesSearch && matchesFilter;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "email":
        comparison = a.email.localeCompare(b.email);
        break;
      case "progress":
        comparison = a.progressPercentage - b.progressPercentage;
        break;
      case "lastActive":
        comparison = new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime();
        break;
      case "enrolled":
        comparison = a.createdAt - b.createdAt;
        break;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const getModuleStatus = (user: UserProgress) => {
    const modules = [
      { id: "intro-to-frauds", name: "Introduction to Frauds", completed: user.completedModules.includes("intro-to-frauds") },
      { id: "intermediate-frauds", name: "Intermediate Frauds", completed: user.completedModules.includes("intermediate-frauds") },
      { id: "advanced-frauds", name: "Advanced Frauds", completed: user.completedModules.includes("advanced-frauds") },
      { id: "prevention", name: "Prevention Strategies", completed: user.completedModules.includes("prevention") },
    ];
    return modules;
  };

  const getCurrentModule = (user: UserProgress) => {
    const moduleOrder = ["intro-to-frauds", "intermediate-frauds", "advanced-frauds", "prevention"];
    if (user.completedModules.length === 4) return "Completed";
    for (const module of moduleOrder) {
      if (!user.completedModules.includes(module)) {
        const moduleNames: Record<string, string> = {
          "intro-to-frauds": "Introduction to Frauds",
          "intermediate-frauds": "Intermediate Frauds",
          "advanced-frauds": "Advanced Frauds",
          "prevention": "Prevention Strategies"
        };
        return moduleNames[module];
      }
    }
    return "Not Started";
  };

  const exportToCSV = () => {
    if (!dashboardData) return;
    
    const headers = ["Name", "Email", "Enrolled Date", "Completed Modules", "Progress %", "Last Active"];
    const rows = dashboardData.userProgress.map(user => [
      user.name,
      user.email,
      new Date(user.createdAt).toLocaleDateString(),
      user.completedModules.length.toString(),
      user.progressPercentage.toFixed(0),
      new Date(user.lastActive).toLocaleDateString()
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `learning-progress-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Learning Progress Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Detailed user progress tracking</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={fetchDashboardData}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button 
                onClick={exportToCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardData.stats.totalUsers}</p>
            <p className="text-xs font-medium text-green-600 mt-2">All registered users</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600">Active Learners</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {dashboardData.stats.activeUsers}
            </p>
            <p className="text-xs font-medium text-blue-600 mt-2">
              {dashboardData.stats.totalUsers > 0 
                ? `${((dashboardData.stats.activeUsers / dashboardData.stats.totalUsers) * 100).toFixed(0)}% engagement`
                : "0% engagement"}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600">Completion Rate</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {users.filter(u => u.progressPercentage === 100).length > 0
                ? `${((users.filter(u => u.progressPercentage === 100).length / users.length) * 100).toFixed(0)}%`
                : "0%"}
            </p>
            <p className="text-xs font-medium text-purple-600 mt-2">
              {users.filter(u => u.progressPercentage === 100).length} completed
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600">Avg. Progress</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {dashboardData.stats.avgCompletionRate}%
            </p>
            <p className="text-xs font-medium text-orange-600 mt-2">Across all users</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Users</option>
              <option value="completed">Completed Course</option>
              <option value="in-progress">In Progress</option>
              <option value="not-started">Not Started</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      User
                      {sortBy === "name" && (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("enrolled")}
                  >
                    <div className="flex items-center gap-1">
                      Enrolled
                      {sortBy === "enrolled" && (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Module
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("progress")}
                  >
                    <div className="flex items-center gap-1">
                      Progress
                      {sortBy === "progress" && (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("lastActive")}
                  >
                    <div className="flex items-center gap-1">
                      Last Active
                      {sortBy === "lastActive" && (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.imageUrl ? (
                          <img 
                            src={user.imageUrl} 
                            alt={user.name}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-700 font-semibold">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.progressPercentage === 100 ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Completed
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {getCurrentModule(user)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${user.progressPercentage}%` }}
                              />
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              {user.progressPercentage.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-900"
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

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                {selectedUser.imageUrl ? (
                  <img 
                    src={selectedUser.imageUrl} 
                    alt={selectedUser.name}
                    className="h-16 w-16 rounded-full"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-700 font-bold text-xl">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Enrolled Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Last Active</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedUser.lastActive).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Modules Completed</p>
                  <p className="font-semibold text-gray-900">{selectedUser.completedModules.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Overall Progress</p>
                  <p className="font-semibold text-gray-900">{selectedUser.progressPercentage.toFixed(0)}%</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Module Progress</h4>
                <div className="space-y-2">
                  {getModuleStatus(selectedUser).map((module) => (
                    <div key={module.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium text-gray-800">{module.name}</span>
                      {module.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
