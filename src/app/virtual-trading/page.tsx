import VirtualTradingClient from '@/components/virtual-trading/VirtualTradingClient';
import { Suspense } from 'react';

export default function VirtualTradingPage() {
  return (
    <Suspense fallback={
      <div className="bg-slate-900 text-white min-h-screen">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-2 bg-slate-800 p-4 rounded-lg">
              <div className="flex space-x-2 mb-4">
                <div className="h-10 bg-slate-700 rounded-md flex-1 animate-pulse"></div>
                <div className="h-10 bg-slate-700 rounded-md flex-1 animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="h-12 bg-slate-700 rounded animate-pulse"></div>
                <div className="space-y-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-16 bg-slate-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column Skeleton */}
            <div className="lg:col-span-3">
              <div className="flex space-x-2 mb-4">
                <div className="h-10 bg-slate-700 rounded-md flex-1 animate-pulse"></div>
                <div className="h-10 bg-slate-700 rounded-md flex-1 animate-pulse"></div>
                <div className="h-10 bg-slate-700 rounded-md flex-1 animate-pulse"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-slate-800 rounded-lg animate-pulse"></div>
                <div className="h-48 bg-slate-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <VirtualTradingClient />
    </Suspense>
  );
}
