"use client";

import { useState } from "react";
import { Send, CheckCircle, Copy, AlertTriangle } from "lucide-react";

interface ReportToGetClarityProps {
  entityName: string;
  fraudType: string;
  riskScore: number;
  evidence?: any;
  searchQuery?: string;
  searchType?: string;
}

export default function ReportToGetClarity({
  entityName,
  fraudType,
  riskScore,
  evidence,
  searchQuery,
  searchType,
}: ReportToGetClarityProps) {
  const [reportId, setReportId] = useState<string | null>(null);
  const [isReporting, setIsReporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReport = async () => {
    if (reportId) return; // Already reported
    
    setIsReporting(true);
    setError(null);
    
    try {
      const response = await fetch("/api/fraud/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entityName,
          fraudType,
          riskScore,
          evidence,
          searchQuery,
          searchType,
          notes: `Reported from fraud detection analysis`,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setReportId(data.reportId);
      } else {
        setError(data.error || "Failed to generate report");
      }
    } catch (err) {
      console.error("Error reporting to GetClarity:", err);
      setError("Failed to submit report. Please try again.");
    } finally {
      setIsReporting(false);
    }
  };

  const copyReportId = () => {
    if (reportId) {
      navigator.clipboard.writeText(reportId);
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">
            Report to GetClarity.finance
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Help us track and prevent financial fraud by reporting this suspicious activity.
            A unique report ID will be generated for further processing.
          </p>
          
          {/* Report Summary */}
          <div className="bg-white/70 rounded p-3 mb-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-500">Entity:</span>
                <span className="ml-2 font-medium">{entityName}</span>
              </div>
              <div>
                <span className="text-gray-500">Type:</span>
                <span className="ml-2 font-medium">{fraudType}</span>
              </div>
              <div>
                <span className="text-gray-500">Risk Score:</span>
                <span className={`ml-2 font-semibold ${
                  riskScore >= 70 ? "text-red-600" :
                  riskScore >= 40 ? "text-yellow-600" :
                  "text-green-600"
                }`}>
                  {riskScore}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="ml-4">
          {!reportId ? (
            <button
              onClick={handleReport}
              disabled={isReporting}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors"
            >
              {isReporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Generate Report ID</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <div>
                  <p className="font-semibold">Report Generated</p>
                  <p className="text-sm font-mono">{reportId}</p>
                </div>
              </div>
              <button
                onClick={copyReportId}
                className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 w-full justify-center"
              >
                <Copy className="w-3 h-3" />
                Copy Report ID
              </button>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
