"use client";

export default function CourseHubSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-pulse">
      {/* Hero section skeleton */}
      <div className="text-center mb-16">
        <div className="h-16 bg-gray-200 rounded-lg w-3/4 mx-auto mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
        <div className="h-12 bg-gray-200 rounded-lg w-48 mx-auto"></div>
      </div>

      {/* Course modules skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((module) => (
          <div key={module} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            {/* Module icon */}
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            
            {/* Module title */}
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
            
            {/* Module description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            
            {/* Module stats */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress section skeleton */}
      <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
