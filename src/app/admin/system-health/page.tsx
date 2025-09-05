"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { ArrowLeft, Server, Database, Activity } from "lucide-react";
import Link from "next/link";
import { RealSystemHealth } from "@/components/admin/RealSystemHealth";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";

export default function SystemHealthPage() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    }
  }, [user, router]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
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
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Server className="w-6 h-6 text-blue-600" />
                  System Health Monitor
                </h1>
                <p className="text-sm text-gray-500 mt-1">Real-time server performance and health metrics</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Live Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Health Component */}
        <RealSystemHealth />

        {/* Information Panel */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Database className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                About System Health Monitoring
              </h3>
              <div className="text-blue-800 space-y-2">
                <p>
                  This dashboard provides real-time monitoring of your Get Clarity Finance platform's 
                  health and performance metrics.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">📊 Real Data Sources:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Server uptime from Node.js process</li>
                      <li>• Memory usage from system metrics</li>
                      <li>• Database response times (live queries)</li>
                      <li>• Active user count (last hour)</li>
                      <li>• File storage and upload statistics</li>
                      <li>• Fraud detection and security metrics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🔄 Auto-Refresh Features:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Updates every 10 seconds automatically</li>
                      <li>• Real database connectivity tests</li>
                      <li>• Live user activity tracking</li>
                      <li>• Actual file count and sizes</li>
                      <li>• True fraud report statistics</li>
                      <li>• Genuine API performance metrics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
