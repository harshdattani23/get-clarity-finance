"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import GetClarityLogo from '@/components/ui/GetClarityLogo';
import { Calendar, CheckCircle, ExternalLink, Share2 } from 'lucide-react';

interface CertificateData {
  id: string;
  userName: string;
  courseName: string;
  moduleCount: number;
  completedModules: Array<{
    id: string;
    title: string;
    xpEarned: number;
    completedAt: string;
    completed: boolean;
  }>;
  completionDate: string;
  isPublic: boolean;
}

export default function PublicCertificatePage() {
  const params = useParams();
  const certificateId = params?.certificateId as string;
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!certificateId) {
        setError('Certificate ID not found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/certificates/${certificateId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Certificate not found');
          } else {
            setError('Failed to load certificate');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.success) {
          setCertificate(data.certificate);
        } else {
          setError('Invalid certificate data');
        }
      } catch (err) {
        setError('Failed to load certificate');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${certificate?.userName}'s Certificate - ${certificate?.courseName}`,
          text: `Check out this achievement!`,
          url: window.location.href
        });
      } catch (err) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Certificate link copied to clipboard!');
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Certificate link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📜</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Certificate Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The requested certificate could not be found.'}</p>
          <a 
            href="https://getclarity.finance" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Get Clarity Finance
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <GetClarityLogo size={48} className="justify-center mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Certificate of Completion</h1>
          <p className="text-gray-600 mt-2">Verified Achievement</p>
        </div>

        {/* Certificate Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-emerald-200 overflow-hidden">
            {/* Header with branding */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <GetClarityLogo size={40} className="text-white" />
                <div className="text-right">
                  <p className="text-emerald-100 text-sm">getclarity.finance</p>
                  <p className="text-emerald-100 text-xs">AI-Powered Investor Protection</p>
                </div>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="px-8 py-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Certificate of Completion</h2>
                <p className="text-gray-600 text-lg">This is to certify that</p>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-emerald-600 mb-4">{certificate.userName}</h3>
                <p className="text-gray-600 text-lg mb-2">has successfully completed the</p>
                <h4 className="text-2xl font-semibold text-gray-800 mb-6">{certificate.courseName}</h4>
              </div>

              {/* Achievement Stats */}
              <div className="flex justify-center items-center gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-600">{certificate.moduleCount}</p>
                  <p className="text-sm text-gray-600">Module{certificate.moduleCount !== 1 ? 's' : ''}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">💯</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">100%</p>
                  <p className="text-sm text-gray-600">Completion</p>
                </div>
              </div>

              <div className="text-center mb-8">
                <p className="text-gray-700 mb-6">
                  demonstrating comprehensive understanding of securities fraud detection and investor protection principles.
                </p>
                
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Completed on {new Date(certificate.completionDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>

              {/* Certificate ID */}
              <div className="text-center mb-8">
                <p className="text-xs text-gray-500">Certificate ID</p>
                <p className="text-sm font-mono text-gray-700 bg-gray-50 px-3 py-1 rounded inline-block">
                  {certificate.id}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Get Clarity Finance</p>
                  <p className="text-xs text-gray-600">AI-Powered Investor Protection Platform</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Verified Certificate</p>
                  <p className="text-xs text-gray-500">getclarity.finance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share Certificate
            </button>
            <a
              href="https://getclarity.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Get Clarity Finance
            </a>
          </div>
        </div>

        {/* Completed Modules */}
        {certificate.completedModules.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Completed Modules:</h3>
              <div className="space-y-3">
                {certificate.completedModules.map((module, index) => (
                  <div key={module.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-800">{module.title}</h4>
                      <p className="text-sm text-gray-600">
                        Completed on {new Date(module.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
