"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function CourseDataDebug() {
  const { user } = useUser();
  const [debugInfo, setDebugInfo] = useState<{
    statsData?: any;
    modulesData?: any;
    setupData?: any;
    errors?: string[];
  }>({});

  useEffect(() => {
    const fetchDebugData = async () => {
      const errors: string[] = [];
      let statsData, modulesData, setupData;

      try {
        // Setup course
        try {
          const setupRes = await fetch('/api/courses/investment-security/setup', {
            method: 'POST',
            credentials: 'include',
          });
          if (setupRes.ok) {
            setupData = await setupRes.json();
          } else {
            errors.push(`Setup failed: ${setupRes.status}`);
          }
        } catch (setupError) {
          errors.push(`Setup error: ${setupError}`);
        }

        // Fetch stats
        try {
          const statsRes = await fetch('/api/courses/investment-security/stats', {
            credentials: 'include',
          });
          if (statsRes.ok) {
            statsData = await statsRes.json();
          } else {
            errors.push(`Stats failed: ${statsRes.status}`);
          }
        } catch (statsError) {
          errors.push(`Stats error: ${statsError}`);
        }

        // Fetch modules
        try {
          const modulesRes = await fetch('/api/courses/investment-security/modules', {
            credentials: 'include',
          });
          if (modulesRes.ok) {
            modulesData = await modulesRes.json();
          } else {
            errors.push(`Modules failed: ${modulesRes.status}`);
          }
        } catch (modulesError) {
          errors.push(`Modules error: ${modulesError}`);
        }

        setDebugInfo({
          statsData,
          modulesData,
          setupData,
          errors
        });
      } catch (error) {
        setDebugInfo({
          errors: [`Global error: ${error}`]
        });
      }
    };

    if (user) {
      fetchDebugData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg max-w-sm text-xs">
        <h4 className="font-bold mb-2">Debug: No User</h4>
        <p>User not signed in</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg max-w-md text-xs max-h-96 overflow-y-auto">
      <h4 className="font-bold mb-2">Course Data Debug</h4>
      
      <div className="mb-2">
        <strong>User:</strong> {user.fullName || user.username || user.id}
      </div>

      {debugInfo.errors && debugInfo.errors.length > 0 && (
        <div className="mb-2">
          <strong className="text-red-400">Errors:</strong>
          <ul className="list-disc list-inside">
            {debugInfo.errors.map((error, i) => (
              <li key={i} className="text-red-300">{error}</li>
            ))}
          </ul>
        </div>
      )}

      {debugInfo.setupData && (
        <div className="mb-2">
          <strong className="text-green-400">Setup:</strong>
          <pre className="text-green-300">{JSON.stringify(debugInfo.setupData, null, 2)}</pre>
        </div>
      )}

      {debugInfo.statsData && (
        <div className="mb-2">
          <strong className="text-blue-400">Stats:</strong>
          <pre className="text-blue-300">{JSON.stringify(debugInfo.statsData, null, 2)}</pre>
        </div>
      )}

      {debugInfo.modulesData && (
        <div className="mb-2">
          <strong className="text-purple-400">Modules:</strong>
          <pre className="text-purple-300">{JSON.stringify(debugInfo.modulesData?.slice(0, 2), null, 2)}...</pre>
        </div>
      )}
    </div>
  );
}
