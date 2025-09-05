"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { ArrowLeft, BarChart3, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";
import { VirtualTradingDashboard } from "@/components/admin/VirtualTradingDashboard";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";

export default function VirtualTradingPage() {
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
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  Virtual Trading Analytics
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Comprehensive trading platform analytics and user performance metrics
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Live Trading Data</span>
              </div>
              <Link
                href="/virtual-trading"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                View Platform
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Virtual Trading Dashboard */}
        <VirtualTradingDashboard />

        {/* Information Panel */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Virtual Trading Platform Analytics
              </h3>
              <div className="text-green-800 space-y-2">
                <p>
                  Monitor your virtual trading platform's performance with real-time data 
                  from user portfolios, trades, and engagement metrics.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">📊 Real Trading Data:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Live portfolio values and P&L</li>
                      <li>• Actual trade counts and volumes</li>
                      <li>• Real user performance metrics</li>
                      <li>• Authentic stock holdings data</li>
                      <li>• True risk assessment scores</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">📈 Performance Tracking:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Top performer leaderboards</li>
                      <li>• Most traded stocks analysis</li>
                      <li>• Portfolio risk distribution</li>
                      <li>• User engagement patterns</li>
                      <li>• Trading activity trends</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🔄 Auto-Updates:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Refreshes every 30 seconds</li>
                      <li>• Real database queries</li>
                      <li>• Live user activity tracking</li>
                      <li>• Dynamic P&L calculations</li>
                      <li>• Instant risk assessments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Risk-Free Learning</h4>
              <p className="text-sm text-gray-600 mt-1">
                Users practice trading with virtual money using real market data
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Real Market Data</h4>
              <p className="text-sm text-gray-600 mt-1">
                Live NSE/BSE stock prices with realistic trading simulation
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Performance Analytics</h4>
              <p className="text-sm text-gray-600 mt-1">
                Comprehensive tracking of user trading performance and risk
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Educational Value</h4>
              <p className="text-sm text-gray-600 mt-1">
                Builds confidence before users transition to real money trading
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
