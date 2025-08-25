"use client";

import { useState, useEffect } from 'react';

export default function PlatformMetrics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const metrics = [
    {
      value: "50+",
      label: "Course Modules",
      description: "Comprehensive curriculum coverage"
    },
    {
      value: "100%",
      label: "Risk-Free Learning",
      description: "Virtual trading with no real money"
    },
    {
      value: "AI",
      label: "Powered Analysis",
      description: "Advanced fraud detection technology"
    },
    {
      value: "24/7",
      label: "Always Available",
      description: "Learn at your own pace"
    },
    {
      value: "Free",
      label: "To Start",
      description: "No credit card required"
    },
    {
      value: "Zero",
      label: "Advisory Services",
      description: "Pure education, no tips or recommendations"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#163300] to-[#1a4000] text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Platform Impact & Performance
        </h2>
        <p className="text-center text-white/80 text-lg mb-12 max-w-3xl mx-auto">
          Real numbers that showcase our commitment to investor education and protection
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className={`text-center transform transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-lime-400 mb-2">
                {metric.value}
              </div>
              <div className="text-lg font-semibold mb-1">
                {metric.label}
              </div>
              <div className="text-sm text-white/60">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
