"use client";

import { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Shield,
  Eye,
  Download,
  ExternalLink,
  Clock,
  FileSearch,
  AlertCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface DocumentAnalysisResult {
  isSuspicious: boolean;
  riskScore: number;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  fraudIndicators: FraudIndicator[];
  documentType: string;
  recommendations: string[];
  extractedText: string;
  metadata?: DocumentMetadata;
  sebiVerification?: SEBIVerificationResult;
}

interface FraudIndicator {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  matches: string[];
  pattern: string;
  guidance: string;
}

interface DocumentMetadata {
  fileType: string;
  fileSize: number;
  pageCount?: number;
  creationDate?: string;
  modificationDate?: string;
  author?: string;
  creator?: string;
  producer?: string;
  title?: string;
  hasImages?: boolean;
  hasEmbeddedFonts?: boolean;
  isScanned?: boolean;
}

interface SEBIVerificationResult {
  hasSebiReference: boolean;
  claimedSebiApproval: boolean;
  validSebiFormat: boolean;
  suspiciousSebiClaims: string[];
  recommendations: string[];
}

interface AnalysisResponse {
  success: boolean;
  reportId: string;
  analysis: DocumentAnalysisResult;
  processingTime: number;
  message: string;
  sebiUrls: {
    verifyRegistration: string;
    reportFraud: string;
    helpline: string;
  };
}

export default function DocumentAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    // Validate file type
    const supportedTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/webp',
      'text/plain'
    ];

    if (!supportedTypes.includes(file.type)) {
      setError('Unsupported file type. Please upload PDF, image, or text files.');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.');
      return;
    }

    setSelectedFile(file);
    setError('');
    setAnalysisResult(null);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const analyzeDocument = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('document', selectedFile);

      const response = await fetch('/api/agents/document-analyzer', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setAnalysisResult(data);
        // Scroll to results
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setError(data.error || 'Failed to analyze document');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return <XCircle className="w-6 h-6 text-red-600" />;
      case 'high': return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case 'medium': return <AlertCircle className="w-6 h-6 text-yellow-600" />;
      case 'low': return <CheckCircle className="w-6 h-6 text-green-600" />;
      default: return <Shield className="w-6 h-6 text-gray-600" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Document Fraud Analyzer
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload suspicious investment documents to detect fraud indicators, fake SEBI approvals, 
          and other red flags using advanced OCR and AI analysis.
        </p>
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8">
        <div 
          className={`relative transition-colors duration-200 ${
            dragActive ? 'border-[#9FE870] bg-green-50' : ''
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop your document here or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports PDF, Images (PNG, JPG, GIF, WebP), and Text files up to 10MB
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileInputChange}
              accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.txt"
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-[#9FE870] text-[#163300] font-semibold rounded-lg hover:bg-[#8ade5a] transition-colors"
            >
              Select Document
            </button>
          </div>
        </div>
      </div>

      {/* Selected File Preview */}
      {selectedFile && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(selectedFile.size)} • {selectedFile.type}
                </p>
              </div>
            </div>
            
            <button
              onClick={analyzeDocument}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-6 py-3 bg-[#9FE870] text-[#163300] font-semibold rounded-lg hover:bg-[#8ade5a] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#163300]" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileSearch className="w-4 h-4" />
                  Analyze Document
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">Error</p>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div ref={resultsRef} className="space-y-6">
          {/* Summary Card */}
          <div className={`rounded-lg border-2 p-6 ${getRiskColor(analysisResult.analysis.riskLevel)}`}>
            <div className="flex items-start gap-4">
              {getRiskIcon(analysisResult.analysis.riskLevel)}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{analysisResult.message}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{analysisResult.analysis.riskScore}</p>
                    <p className="text-sm opacity-75">Risk Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{analysisResult.analysis.confidence}%</p>
                    <p className="text-sm opacity-75">Confidence</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{analysisResult.analysis.fraudIndicators.length}</p>
                    <p className="text-sm opacity-75">Red Flags</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{analysisResult.processingTime}ms</p>
                    <p className="text-sm opacity-75">Process Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fraud Indicators */}
          {analysisResult.analysis.fraudIndicators.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                🚨 Fraud Indicators Detected ({analysisResult.analysis.fraudIndicators.length})
              </h3>
              <div className="space-y-4">
                {analysisResult.analysis.fraudIndicators.map((indicator, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    indicator.severity === 'critical' ? 'bg-red-50 border-red-200' :
                    indicator.severity === 'high' ? 'bg-orange-50 border-orange-200' :
                    indicator.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        indicator.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        indicator.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        indicator.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {indicator.severity.toUpperCase()}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{indicator.description}</p>
                        <p className="text-sm text-gray-600 mt-1">{indicator.guidance}</p>
                        {indicator.matches.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-gray-700 mb-1">Detected patterns:</p>
                            <div className="flex flex-wrap gap-1">
                              {indicator.matches.slice(0, 3).map((match, idx) => (
                                <code key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                  "{match}"
                                </code>
                              ))}
                              {indicator.matches.length > 3 && (
                                <span className="text-xs text-gray-500">+{indicator.matches.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEBI Verification */}
          {analysisResult.analysis.sebiVerification?.hasSebiReference && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                🏛️ SEBI Reference Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${
                    analysisResult.analysis.sebiVerification.validSebiFormat ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className="text-sm">
                    Valid SEBI format: {analysisResult.analysis.sebiVerification.validSebiFormat ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${
                    analysisResult.analysis.sebiVerification.claimedSebiApproval ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <span className="text-sm">
                    Claims SEBI approval: {analysisResult.analysis.sebiVerification.claimedSebiApproval ? 'Yes (Suspicious)' : 'No'}
                  </span>
                </div>
                {analysisResult.analysis.sebiVerification.suspiciousSebiClaims.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Suspicious SEBI claims:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {analysisResult.analysis.sebiVerification.suspiciousSebiClaims.map((claim, index) => (
                        <li key={index}>{claim}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              💡 Recommendations
            </h3>
            <div className="space-y-2">
              {analysisResult.analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-sm mt-0.5">•</span>
                  <p className="text-sm text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 Quick Actions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href={analysisResult.sebiUrls.verifyRegistration}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Verify on SEBI</span>
              </a>
              
              <a
                href={analysisResult.sebiUrls.reportFraud}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">Report Fraud</span>
              </a>
              
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Shield className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">SEBI Helpline</p>
                  <p className="text-xs text-green-600">{analysisResult.sebiUrls.helpline}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Metadata */}
          {analysisResult.analysis.metadata && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                📄 Document Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700">File Type</p>
                  <p className="text-gray-600">{analysisResult.analysis.metadata.fileType}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">File Size</p>
                  <p className="text-gray-600">{formatFileSize(analysisResult.analysis.metadata.fileSize)}</p>
                </div>
                {analysisResult.analysis.metadata.pageCount && (
                  <div>
                    <p className="font-medium text-gray-700">Pages</p>
                    <p className="text-gray-600">{analysisResult.analysis.metadata.pageCount}</p>
                  </div>
                )}
                {analysisResult.analysis.metadata.author && (
                  <div>
                    <p className="font-medium text-gray-700">Author</p>
                    <p className="text-gray-600">{analysisResult.analysis.metadata.author}</p>
                  </div>
                )}
                {analysisResult.analysis.metadata.creationDate && (
                  <div>
                    <p className="font-medium text-gray-700">Created</p>
                    <p className="text-gray-600">
                      {new Date(analysisResult.analysis.metadata.creationDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-700">Report ID</p>
                  <p className="text-gray-600 font-mono text-xs">{analysisResult.reportId}</p>
                </div>
              </div>
            </div>
          )}

          {/* Extracted Text Preview */}
          {analysisResult.analysis.extractedText && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                👁️ Extracted Text (Preview)
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {analysisResult.analysis.extractedText}
                  {analysisResult.analysis.extractedText.length >= 2000 && (
                    <span className="text-gray-500">... (truncated)</span>
                  )}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
