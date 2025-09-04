'use client';

import React from 'react';
import { Award, Calendar, Trophy, User, ExternalLink } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  xpEarned: number;
  completedAt: string;
  completed: boolean;
}

interface CertificateData {
  id: string;
  userName: string;
  courseName: string;
  completionDate: Date | string;
  totalXP?: number;
  moduleCount?: number;
  issuedAt: Date | string;
  publicUrl?: string;
  completedModules?: Module[];
}

interface CertificateDisplayProps {
  certificateData: CertificateData;
  isPublic?: boolean;
  onShareClick?: () => void;
}

export default function CertificateDisplay({ 
  certificateData, 
  isPublic = false,
  onShareClick 
}: CertificateDisplayProps) {
  const completionDate = new Date(certificateData.completionDate);
  const issuedDate = new Date(certificateData.issuedAt);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Certificate Container */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border-2 border-blue-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-12 w-12 text-yellow-300 mr-3" />
            <h1 className="text-3xl font-bold text-white">
              Certificate of Completion
            </h1>
          </div>
          <div className="text-center">
            <p className="text-blue-100 text-lg">
              Sebi Verify - Financial Fraud Awareness Program
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 py-12">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 mb-4">
              This is to certify that
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2 inline-block">
              {certificateData.userName}
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              has successfully completed
            </p>
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">
              {certificateData.courseName}
            </h3>
          </div>

          {/* Achievement Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 justify-center max-w-md mx-auto">
            <div className="text-center">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Completion Date</h4>
              <p className="text-gray-600">{formatDate(completionDate)}</p>
            </div>

            {certificateData.moduleCount && (
              <div className="text-center">
                <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Modules Completed</h4>
                <p className="text-gray-600">{certificateData.moduleCount} Module{certificateData.moduleCount > 1 ? 's' : ''}</p>
              </div>
            )}
          </div>

          {/* Completed Modules List */}
          {certificateData.completedModules && certificateData.completedModules.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Course Modules Completed
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {certificateData.completedModules.map((module, index) => (
                    <li key={index} className="flex items-center justify-between text-gray-700 py-1">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span>{module.title}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                          ✓ Completed
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Footer Information */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
              <div className="mb-4 md:mb-0">
                <p>Certificate ID: <span className="font-mono">{certificateData.id}</span></p>
                <p>Issued on: {formatDate(issuedDate)}</p>
              </div>
              <div className="text-center md:text-right">
                <p className="font-semibold text-gray-900">Sebi Verify</p>
                <p>Financial Education Platform</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        {!isPublic && certificateData.publicUrl && (
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <div className="flex justify-center">
              <button
                onClick={onShareClick}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Share Certificate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Verification Notice */}
      {isPublic && (
        <div className="mt-6 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Verified Certificate</span>
            </div>
            <p className="text-green-700 text-sm">
              This certificate has been verified and is authentic. It was issued by Sebi Verify's official platform.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
