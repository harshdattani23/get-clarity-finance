"use client";

export default function LessonSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="space-y-8">
        {/* Title and description skeleton */}
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Introduction box skeleton */}
        <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-gray-300">
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Content sections skeleton */}
        {[1, 2, 3].map((section) => (
          <div key={section} className="space-y-6">
            {/* Section title */}
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            
            {/* Section description */}
            <div className="h-5 bg-gray-200 rounded w-full mb-4"></div>
            
            {/* Content cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((card) => (
                <div key={card} className="bg-gray-50 p-4 rounded-lg">
                  <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Key takeaways skeleton */}
        <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-gray-300">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
