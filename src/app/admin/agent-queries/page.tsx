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
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  BarChart3,
  Zap,
  Bot,
  Shield,
  AlertTriangle,
  AlertCircle,
  Info,
  Eye,
  X,
  FileText,
  HardDrive
} from "lucide-react";
import Link from "next/link";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";

interface AgentQuery {
  id: string;
  reportId: string;
  agentType: string;
  query: string;
  response: string | null;
  success: boolean;
  error: string | null;
  executionTime: number | null;
  userId: string | null;
  createdAt: string;
}

interface DashboardData {
  stats: {
    totalUsers: number;
    activeUsers: number;
    avgCompletionRate: string;
    recentActivity: number;
    totalQueries: number;
    queriesLast7Days: number;
    totalReports: number;
    pendingReports: number;
    totalAgentQueries: number;
    agentQueriesLast7Days: number;
    successRate: string;
    avgExecutionTime: number;
  };
  agentQueries: AgentQuery[];
  agentQueryBreakdown: Record<string, number>;
  agentQueryTypes: Record<string, number>;
}

export default function AgentQueriesDashboard() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAgent, setFilterAgent] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedQuery, setSelectedQuery] = useState<AgentQuery | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  // Filter and sort queries
  const queries = dashboardData?.agentQueries || [];
  const filteredQueries = queries.filter((query) => {
    const matchesSearch = 
      query.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.agentType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAgent = filterAgent === "all" || query.agentType === filterAgent;
    const matchesStatus = 
      filterStatus === "all" || 
      (filterStatus === "success" && query.success) ||
      (filterStatus === "failed" && !query.success);
    
    return matchesSearch && matchesAgent && matchesStatus;
  });

  const sortedQueries = [...filteredQueries].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "createdAt":
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case "agentType":
        comparison = a.agentType.localeCompare(b.agentType);
        break;
      case "executionTime":
        comparison = (a.executionTime || 0) - (b.executionTime || 0);
        break;
      case "query":
        comparison = a.query.localeCompare(b.query);
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

  const parseOutcome = (response: string | null) => {
    if (!response) return { outcome: "unknown", confidence: null, parsedResponse: null };
    
    try {
      let parsedResponse = null;
      
      // Try to parse the main response
      try {
        parsedResponse = JSON.parse(response);
      } catch {
        // If response is not JSON, try to extract JSON from it
        const jsonMatch = response.match(/\{[^}]*\}/g);
        if (jsonMatch) {
          parsedResponse = JSON.parse(jsonMatch[jsonMatch.length - 1]);
        }
      }
      
      if (parsedResponse) {
        // Handle specific agent response formats we're seeing
        
        // Deepfake detector responses: check isDeepfake and riskLevel
        if (parsedResponse.hasOwnProperty('isDeepfake')) {
          if (parsedResponse.isDeepfake === true) {
            return {
              outcome: "suspicious",
              confidence: parsedResponse.confidence || null,
              parsedResponse
            };
          } else if (parsedResponse.isDeepfake === false) {
            // Also check riskLevel for additional context
            const riskLevel = parsedResponse.riskLevel?.toLowerCase();
            if (riskLevel === 'high') {
              return {
                outcome: "suspicious",
                confidence: parsedResponse.confidence || null,
                parsedResponse
              };
            } else {
              return {
                outcome: "not_suspicious",
                confidence: parsedResponse.confidence || null,
                parsedResponse
              };
            }
          }
        }
        
        // SEBI query responses: check found field
        if (parsedResponse.hasOwnProperty('found')) {
          if (parsedResponse.found === true) {
            return {
              outcome: "found", // Found in SEBI registry = legitimate
              confidence: null,
              parsedResponse
            };
          } else if (parsedResponse.found === false) {
            return {
              outcome: "not_found", // Not found in SEBI registry = potentially suspicious
              confidence: null,
              parsedResponse
            };
          }
        }
        
        // Generic field checking
        const checkFields = [
          parsedResponse.analysis?.conclusion,
          parsedResponse.conclusion,
          parsedResponse.result,
          parsedResponse.outcome,
          parsedResponse.status,
          parsedResponse.verdict,
          parsedResponse.summary,
          parsedResponse.message
        ];
        
        for (const field of checkFields) {
          if (typeof field === 'string') {
            const lowerField = field.toLowerCase();
            
            // Check for suspicious/high-risk indicators
            if (lowerField.includes('suspicious') || 
                lowerField.includes('threat') ||
                lowerField.includes('high risk') ||
                lowerField.includes('scam') ||
                lowerField.includes('fake') ||
                lowerField.includes('malicious') ||
                lowerField.includes('dangerous') ||
                lowerField.includes('❌') ||
                lowerField.includes('🚨') ||
                (lowerField.includes('risk') && (lowerField.includes('high') || lowerField.includes('significant')))) {
              return {
                outcome: "suspicious",
                confidence: parsedResponse.confidence || parsedResponse.analysis?.confidence || null,
                parsedResponse
              };
            }
            
            // Check for safe/legitimate indicators
            if (lowerField.includes('legitimate') || 
                lowerField.includes('safe') || 
                lowerField.includes('clean') ||
                lowerField.includes('authentic') ||
                lowerField.includes('genuine') ||
                lowerField.includes('low risk') ||
                lowerField.includes('no suspicious') ||
                lowerField.includes('not suspicious') ||
                lowerField.includes('appears authentic') ||
                lowerField.includes('relatively authentic') ||
                lowerField.includes('✅') ||
                lowerField.includes('✓') ||
                (lowerField.includes('risk') && lowerField.includes('low'))) {
              return {
                outcome: "not_suspicious",
                confidence: parsedResponse.confidence || parsedResponse.analysis?.confidence || null,
                parsedResponse
              };
            }
          }
        }
        
        // Check boolean fields
        if (parsedResponse.suspicious === true || parsedResponse.threat === true) {
          return {
            outcome: "suspicious",
            confidence: parsedResponse.confidence || parsedResponse.analysis?.confidence || null,
            parsedResponse
          };
        }
        
        if (parsedResponse.suspicious === false || parsedResponse.threat === false) {
          return {
            outcome: "not_suspicious",
            confidence: parsedResponse.confidence || parsedResponse.analysis?.confidence || null,
            parsedResponse
          };
        }
        
        return { outcome: "unknown", confidence: null, parsedResponse };
      }
      
    } catch (error) {
      console.error('Error parsing response:', error);
    }
    
    // If JSON parsing failed, try to parse the raw response text
    if (response && typeof response === 'string') {
      const lowerResponse = response.toLowerCase();
      
      // Check for suspicious/high-risk indicators in plain text
      if (lowerResponse.includes('suspicious') || 
          lowerResponse.includes('threat') ||
          lowerResponse.includes('high risk') ||
          lowerResponse.includes('scam') ||
          lowerResponse.includes('fake') ||
          lowerResponse.includes('malicious') ||
          lowerResponse.includes('dangerous') ||
          lowerResponse.includes('❌') ||
          lowerResponse.includes('🚨') ||
          (lowerResponse.includes('risk') && (lowerResponse.includes('high') || lowerResponse.includes('significant')))) {
        return {
          outcome: "suspicious",
          confidence: null,
          parsedResponse: { rawText: response }
        };
      }
      
      // Check for safe/legitimate indicators in plain text
      if (lowerResponse.includes('legitimate') || 
          lowerResponse.includes('safe') || 
          lowerResponse.includes('clean') ||
          lowerResponse.includes('authentic') ||
          lowerResponse.includes('genuine') ||
          lowerResponse.includes('low risk') ||
          lowerResponse.includes('no suspicious') ||
          lowerResponse.includes('not suspicious') ||
          lowerResponse.includes('appears authentic') ||
          lowerResponse.includes('relatively authentic') ||
          lowerResponse.includes('✅') ||
          lowerResponse.includes('✓') ||
          (lowerResponse.includes('risk') && lowerResponse.includes('low'))) {
        return {
          outcome: "not_suspicious",
          confidence: null,
          parsedResponse: { rawText: response }
        };
      }
    }
    
    return { outcome: "unknown", confidence: null, parsedResponse: null };
  };

  const handleViewOutcome = (query: AgentQuery) => {
    setSelectedQuery(query);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedQuery(null);
    setShowModal(false);
  };

  const exportToCSV = () => {
    if (!dashboardData) return;
    
    const headers = ["Report ID", "Agent Type", "Query", "Success", "Execution Time", "Created At", "Outcome"];
    const rows = sortedQueries.map(query => {
      const { outcome, confidence } = parseOutcome(query.response);
      const outcomeText = outcome === "suspicious" ? "Suspicious" : 
                          outcome === "not_suspicious" ? "Not Suspicious" : 
                          outcome === "found" ? "Found" : 
                          outcome === "not_found" ? "Not Found" : "Unknown";
      const outcomeWithConfidence = confidence ? `${outcomeText} (${confidence}%)` : outcomeText;
      
      return [
        query.reportId,
        query.agentType,
        query.query.replace(/"/g, '""'), // Escape quotes
        query.success ? "Success" : "Failed",
        query.executionTime?.toString() || "N/A",
        new Date(query.createdAt).toLocaleString(),
        outcomeWithConfidence
      ];
    });
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agent-queries-${new Date().toISOString().split("T")[0]}.csv`;
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
                <h1 className="text-2xl font-bold text-gray-900">Agent Queries Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">AI agent interactions and analytics</p>
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
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Agent Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Total Queries</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardData.stats.totalAgentQueries || 0}</p>
                <p className="text-xs font-medium text-blue-600 mt-2">All agent interactions</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Last 7 Days</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardData.stats.agentQueriesLast7Days || 0}</p>
                <p className="text-xs font-medium text-green-600 mt-2">Recent activity</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Success Rate</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardData.stats.successRate || '0'}%</p>
                <p className="text-xs font-medium text-purple-600 mt-2">Query success</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Avg Response</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardData.stats.avgExecutionTime || 0}ms</p>
                <p className="text-xs font-medium text-orange-600 mt-2">Execution time</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Agent Breakdown Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Queries by Agent Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {dashboardData.agentQueryBreakdown && Object.entries(dashboardData.agentQueryBreakdown).map(([agent, count]) => (
              <div key={agent} className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600 capitalize">{agent.replace('-', ' ')}</div>
              </div>
            ))}
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
                  placeholder="Search by query, report ID, or agent type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Agents</option>
              <option value="sebi-query">SEBI Query</option>
              <option value="deepfake-detector">Deepfake Detector</option>
              <option value="deepfake-detector-v2">Deepfake Detector v2</option>
              <option value="social-monitor">Social Monitor</option>
              <option value="announcement-verifier">Announcement Verifier</option>
              <option value="advisor-verifier">Advisor Verifier</option>
              <option value="document-analyzer">Document Analyzer</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Agent Queries Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Agent Query Log</h3>
            <p className="text-sm text-gray-600">All AI agent interactions with Report IDs</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center gap-1">
                      Created
                      {sortBy === "createdAt" && (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report ID
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("agentType")}
                  >
                    <div className="flex items-center gap-1">
                      Agent Type
                      {sortBy === "agentType" && (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("query")}
                  >
                    <div className="flex items-center gap-1">
                      Query
                      {sortBy === "query" && (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Outcome
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("executionTime")}
                  >
                    <div className="flex items-center gap-1">
                      Exec Time
                      {sortBy === "executionTime" && (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedQueries.length > 0 ? sortedQueries.map((query) => (
                  <tr key={query.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(query.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                      {query.reportId.substring(0, 12)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {query.agentType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                      <div className="truncate" title={query.query}>
                        {query.query}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.success ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          <XCircle className="w-3 h-3" />
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(() => {
                        const { outcome, confidence, parsedResponse } = parseOutcome(query.response);
                        if (outcome === "suspicious") {
                          return (
                            <button
                              onClick={() => handleViewOutcome(query)}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors cursor-pointer"
                            >
                              <AlertTriangle className="w-3 h-3" />
                              Suspicious {confidence && `(${confidence}%)`}
                              <Eye className="w-3 h-3 ml-1" />
                            </button>
                          );
                        } else if (outcome === "not_suspicious") {
                          return (
                            <button
                              onClick={() => handleViewOutcome(query)}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors cursor-pointer"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Not Suspicious {confidence && `(${confidence}%)`}
                              <Eye className="w-3 h-3 ml-1" />
                            </button>
                          );
                        } else if (outcome === "found") {
                          return (
                            <button
                              onClick={() => handleViewOutcome(query)}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors cursor-pointer"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Found {confidence && `(${confidence}%)`}
                              <Eye className="w-3 h-3 ml-1" />
                            </button>
                          );
                        } else if (outcome === "not_found") {
                          return (
                            <button
                              onClick={() => handleViewOutcome(query)}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full hover:bg-orange-200 transition-colors cursor-pointer"
                            >
                              <AlertCircle className="w-3 h-3" />
                              Not Found {confidence && `(${confidence}%)`}
                              <Eye className="w-3 h-3 ml-1" />
                            </button>
                          );
                        } else {
                          return (
                            <button
                              onClick={() => handleViewOutcome(query)}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                              <Info className="w-3 h-3" />
                              Unknown
                              <Eye className="w-3 h-3 ml-1" />
                            </button>
                          );
                        }
                      })()} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {query.executionTime ? (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {query.executionTime}ms
                        </span>
                      ) : 'N/A'}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      {searchTerm || filterAgent !== "all" || filterStatus !== "all" 
                        ? "No queries match your filters"
                        : "No agent queries recorded yet. Start using the AI agents to see data here."
                      }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Response Details Modal */}
      {showModal && selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Agent Response Details</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Report ID: {selectedQuery.reportId} • Agent: {selectedQuery.agentType}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Query */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Query</h4>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-800">
                    {selectedQuery.query}
                  </div>
                </div>
                
                {/* Outcome Summary */}
                {(() => {
                  const { outcome, confidence } = parseOutcome(selectedQuery.response);
                  return (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Outcome</h4>
                      <div className="flex items-center gap-2">
                        {outcome === "suspicious" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-red-100 text-red-800 rounded-full">
                            <AlertTriangle className="w-4 h-4" />
                            Suspicious Activity Detected {confidence && `(${confidence}% confidence)`}
                          </span>
                        ) : outcome === "not_suspicious" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                            <CheckCircle className="w-4 h-4" />
                            No Suspicious Activity {confidence && `(${confidence}% confidence)`}
                          </span>
                        ) : outcome === "found" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                            <CheckCircle className="w-4 h-4" />
                            Found in Registry {confidence && `(${confidence}% confidence)`}
                          </span>
                        ) : outcome === "not_found" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-orange-100 text-orange-800 rounded-full">
                            <AlertCircle className="w-4 h-4" />
                            Not Found in Registry {confidence && `(${confidence}% confidence)`}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                            <Info className="w-4 h-4" />
                            Outcome Unknown
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()} 
                
                {/* Detailed Response */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Detailed AI Response</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100 whitespace-pre-wrap">
                      {(() => {
                        try {
                          const { parsedResponse } = parseOutcome(selectedQuery.response);
                          if (parsedResponse) {
                            return JSON.stringify(parsedResponse, null, 2);
                          }
                          return selectedQuery.response || "No response available";
                        } catch (error) {
                          return selectedQuery.response || "No response available";
                        }
                      })()} 
                    </pre>
                  </div>
                </div>
                
                {/* Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Execution Details</h4>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={selectedQuery.success ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {selectedQuery.success ? "Success" : "Failed"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Execution Time:</span>
                        <span className="text-gray-900 font-medium">
                          {selectedQuery.executionTime ? `${selectedQuery.executionTime}ms` : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="text-gray-900 font-medium">
                          {new Date(selectedQuery.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedQuery.error && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Error Details</h4>
                      <div className="bg-red-50 rounded-lg p-3 text-sm text-red-800">
                        {selectedQuery.error}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
