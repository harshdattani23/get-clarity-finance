"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Calendar, 
  Shield, 
  Trophy, 
  Share2, 
  Download, 
  CheckCircle,
  Sparkles,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ExternalLink
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import GetClarityLogo from '@/components/ui/GetClarityLogo';

interface Module {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
  xpEarned: number;
}

interface CertificateProps {
  userName: string;
  courseName: string;
  completionDate: string;
  totalXP: number;
  moduleCount: number;
  completedModules: Module[];
  certificateId: string;
  onClose?: () => void;
}

export default function CourseCompletionCertificate({
  userName,
  courseName,
  completionDate,
  totalXP,
  moduleCount,
  completedModules,
  certificateId,
  onClose
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const shareButtonRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Close share options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareButtonRef.current && !shareButtonRef.current.contains(event.target as Node)) {
        setShowShareOptions(false);
      }
    };

    if (showShareOptions) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showShareOptions]);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      // Use browser's native print to PDF functionality
      // This is more reliable than html2canvas
      
      // Create a new window with only the certificate content
      const printWindow = window.open('', '_blank', 'width=1200,height=800');
      
      if (!printWindow) {
        throw new Error('Popup blocked - please allow popups for this site');
      }

      // Get the certificate HTML
      const certificateHTML = certificateRef.current.outerHTML;
      
      // Create the print document
      const printDocument = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Get Clarity Finance - Certificate</title>
          <meta charset="utf-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              background: white;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 20px;
            }
            
            .certificate-container {
              width: 297mm;
              height: 210mm;
              background: #ffffff;
              position: relative;
              overflow: hidden;
              padding: 48px;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            
            /* Decorative background */
            .certificate-container::before {
              content: '';
              position: absolute;
              top: 40px;
              right: 40px;
              width: 120px;
              height: 120px;
              background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
              border-radius: 50%;
            }
            
            .certificate-container::after {
              content: '';
              position: absolute;
              bottom: 40px;
              left: 40px;
              width: 160px;
              height: 160px;
              background: radial-gradient(circle, rgba(13, 148, 136, 0.05) 0%, transparent 70%);
              border-radius: 50%;
            }
            
            /* Border */
            .border-outer {
              position: absolute;
              top: 16px;
              left: 16px;
              right: 16px;
              bottom: 16px;
              border: 4px solid #10b981;
              border-radius: 8px;
            }
            
            .border-inner {
              position: absolute;
              top: 8px;
              left: 8px;
              right: 8px;
              bottom: 8px;
              border: 1px solid #6ee7b7;
              border-radius: 4px;
            }
            
            .content {
              position: relative;
              z-index: 10;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              text-align: center;
              padding: 32px 0;
            }
            
            .header {
              margin-bottom: 16px;
            }
            
            .logo {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 8px;
            }
            
            .logo-icon {
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #10b981, #0d9488);
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 18px;
            }
            
            .logo-text {
              display: flex;
              flex-direction: column;
              text-align: left;
            }
            
            .logo-main {
              font-size: 18px;
              font-weight: bold;
              color: #1f2937;
            }
            
            .logo-sub {
              font-size: 14px;
              color: #4b5563;
              margin-top: -2px;
            }
            
            .subtitle {
              font-size: 12px;
              color: #4b5563;
              font-weight: 500;
            }
            
            .cert-title {
              font-size: 48px;
              font-family: serif;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 24px;
            }
            
            .main-content {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            
            .certify-text {
              font-size: 16px;
              color: #4b5563;
              margin-bottom: 16px;
            }
            
            .user-name {
              font-size: 36px;
              font-family: serif;
              font-weight: bold;
              color: #15803d;
              margin-bottom: 24px;
              border-bottom: 2px solid #bbf7d0;
              padding-bottom: 8px;
              display: inline-block;
            }
            
            .completion-text {
              font-size: 16px;
              color: #374151;
              margin-bottom: 8px;
            }
            
            .course-name {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 16px;
              max-width: 600px;
              margin-left: auto;
              margin-right: auto;
              line-height: 1.2;
            }
            
            .stats {
              display: flex;
              justify-content: center;
              gap: 48px;
              margin-bottom: 16px;
            }
            
            .stat {
              text-align: center;
            }
            
            .stat-value {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 4px;
              margin-bottom: 4px;
            }
            
            .stat-label {
              font-size: 12px;
              color: #4b5563;
            }
            
            .description {
              font-size: 14px;
              color: #374151;
              max-width: 500px;
              margin: 0 auto 24px auto;
              line-height: 1.4;
            }
            
            .date-section {
              margin-bottom: 16px;
            }
            
            .date-label {
              font-size: 14px;
              color: #4b5563;
              margin-bottom: 4px;
            }
            
            .date-value {
              font-size: 16px;
              font-weight: 600;
              color: #1f2937;
            }
            
            .footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: 24px;
            }
            
            .signature {
              text-align: left;
              border-top: 2px solid #1f2937;
              padding-top: 8px;
            }
            
            .signature-name {
              font-size: 12px;
              font-weight: 600;
              color: #1f2937;
            }
            
            .signature-title {
              font-size: 12px;
              color: #6b7280;
            }
            
            .cert-id {
              text-align: right;
            }
            
            .cert-id-label {
              font-size: 12px;
              color: #6b7280;
              margin-bottom: 4px;
            }
            
            .cert-id-value {
              font-size: 14px;
              font-family: monospace;
              color: #374151;
            }
            
            @media print {
              body {
                padding: 0;
                background: white;
              }
              
              .certificate-container {
                box-shadow: none;
                width: 100%;
                height: 100vh;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <div class="border-outer">
              <div class="border-inner"></div>
            </div>
            
            <div class="content">
              <div class="header">
                <div class="logo">
                  <div class="logo-icon">GC</div>
                  <div class="logo-text">
                    <div class="logo-main">Get Clarity</div>
                    <div class="logo-sub">Finance</div>
                  </div>
                </div>
                <div class="subtitle">www.getclarity.finance - AI-Powered Investor Protection</div>
                <h1 class="cert-title">Certificate of Completion</h1>
              </div>
              
              <div class="main-content">
                <p class="certify-text">This is to certify that</p>
                <h2 class="user-name">${userName}</h2>
                
                <div>
                  <p class="completion-text">has successfully completed the</p>
                  <h3 class="course-name">${courseName}</h3>
                  
                  <div class="stats">
                    <div class="stat">
                      <div class="stat-value">✓ ${moduleCount}</div>
                      <div class="stat-label">Module${moduleCount !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="stat">
                      <div class="stat-value">✦ 100%</div>
                      <div class="stat-label">Completion</div>
                    </div>
                  </div>
                  
                  <p class="description">
                    demonstrating comprehensive understanding of securities fraud detection and investor protection principles.
                  </p>
                </div>
                
                <div class="date-section">
                  <div class="date-label">📅 Completed on</div>
                  <div class="date-value">${formatDate(completionDate)}</div>
                </div>
              </div>
              
              <div class="footer">
                <div class="signature">
                  <div class="signature-name">Get Clarity Finance</div>
                  <div class="signature-title">Authorized Signature</div>
                </div>
                <div class="cert-id">
                  <div class="cert-id-label">Certificate ID</div>
                  <div class="cert-id-value">${certificateId}</div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
      
      printWindow.document.write(printDocument);
      printWindow.document.close();
      
      // Wait for the document to load, then trigger print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // Close the window after printing (user can cancel)
          setTimeout(() => {
            if (!printWindow.closed) {
              printWindow.close();
            }
          }, 1000);
        }, 500);
      };
      
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      
      // Fallback to simple print dialog
      const message = `PDF generation failed. You can:

1. Use Ctrl+P (or Cmd+P on Mac) to print this page
2. Choose "Save as PDF" in the print dialog
3. Or take a screenshot of the certificate

Would you like to open the print dialog now?`;
      
      if (confirm(message)) {
        window.print();
      }
    }
  };

  const shareText = `🎉 I just completed the "${courseName}" course! 🏆 #FraudAwareness #GetClarityFinance #InvestorProtection`;
  
  const shareUrl = `https://getclarity.finance/certificates/${certificateId}`;
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = (platform: string) => {
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        return;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .certificate-container, .certificate-container * {
            visibility: visible;
          }
          .certificate-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >

        {/* Certificate */}
        <div 
          ref={certificateRef}
          className="certificate-container bg-white p-8 md:p-12 relative overflow-hidden"
          style={{ 
            aspectRatio: '297/210', // A4 landscape ratio
            backgroundColor: '#ffffff',
            color: '#1f2937',
            minHeight: '600px'
          }}
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute top-10 right-10 w-32 h-32 rounded-full blur-3xl"
              style={{ backgroundColor: '#10b981' }}
            ></div>
            <div 
              className="absolute bottom-10 left-10 w-40 h-40 rounded-full blur-3xl"
              style={{ backgroundColor: '#0d9488' }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: '#34d399' }}
            ></div>
          </div>

          {/* Border */}
          <div 
            className="absolute inset-4 border-4 rounded-lg"
            style={{ borderColor: '#10b981' }}
          >
            <div 
              className="absolute inset-2 border rounded-md"
              style={{ borderColor: '#6ee7b7' }}
            ></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between py-8">
            {/* Header Section */}
            <div className="text-center">
              {/* Get Clarity Finance Header */}
              <div className="mb-4">
                <div className="flex items-center justify-center mb-2">
                  <GetClarityLogo size={40} showText={true} />
                </div>
                <p className="text-xs font-medium" style={{ color: '#4b5563' }}>www.getclarity.finance - AI-Powered Investor Protection</p>
              </div>

              {/* Certificate Title */}
              <h1 
                className="text-3xl md:text-4xl font-serif font-bold mb-6"
                style={{ color: '#1f2937' }}
              >
                Certificate of Completion
              </h1>
            </div>

            {/* Main Content Section */}
            <div className="text-center flex-1 flex flex-col justify-center">
              {/* Subtitle */}
              <p className="text-base mb-4" style={{ color: '#4b5563' }}>
                This is to certify that
              </p>

              {/* User Name */}
              <h2 
                className="text-2xl md:text-3xl font-serif font-bold mb-6 pb-2 inline-block"
                style={{ 
                  color: '#15803d',
                  borderBottom: '2px solid #bbf7d0'
                }}
              >
                {userName}
              </h2>

              {/* Course Details */}
              <div className="mb-6">
                <p className="text-base mb-2" style={{ color: '#374151' }}>
                  has successfully completed the
                </p>
                <h3 className="text-lg md:text-xl font-bold mb-4 max-w-2xl mx-auto leading-tight" style={{ color: '#1f2937' }}>
                  {courseName}
                </h3>
                
                {/* Achievement Stats */}
                <div className="flex justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />
                      <span className="text-xl font-bold" style={{ color: '#1f2937' }}>{moduleCount}</span>
                    </div>
                    <p className="text-xs" style={{ color: '#4b5563' }}>Module{moduleCount !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Sparkles className="w-4 h-4" style={{ color: '#3b82f6' }} />
                      <span className="text-xl font-bold" style={{ color: '#1f2937' }}>100%</span>
                    </div>
                    <p className="text-xs" style={{ color: '#4b5563' }}>Completion</p>
                  </div>
                </div>

                <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: '#374151' }}>
                  demonstrating comprehensive understanding of securities fraud detection and investor protection principles.
                </p>
              </div>

              {/* Completion Date */}
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" style={{ color: '#6b7280' }} />
                  <span className="text-sm" style={{ color: '#4b5563' }}>Completed on</span>
                </div>
                <p className="text-base font-semibold" style={{ color: '#1f2937' }}>{formatDate(completionDate)}</p>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-end mt-6">
              <div className="text-left">
                <div className="pt-2" style={{ borderTop: '2px solid #1f2937' }}>
                  <p className="text-xs font-semibold" style={{ color: '#1f2937' }}>Get Clarity Finance</p>
                  <p className="text-xs" style={{ color: '#6b7280' }}>Authorized Signature</p>
                </div>
              </div>

              <div className="text-right">
                <div>
                  <p className="text-xs mb-1" style={{ color: '#6b7280' }}>Certificate ID</p>
                  <p className="text-sm font-mono" style={{ color: '#374151' }}>{certificateId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Actions */}
        <div className="p-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={downloadCertificate}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            
            <div className="relative" ref={shareButtonRef}>
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share Achievement
              </button>

              {/* Share Options */}
              {showShareOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg border p-2 min-w-48 z-50"
                >
                  <button
                    onClick={() => {
                      handleShare('linkedin');
                      setShowShareOptions(false);
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-blue-50 rounded text-left"
                  >
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => {
                      handleShare('twitter');
                      setShowShareOptions(false);
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-blue-50 rounded text-left"
                  >
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => {
                      handleShare('facebook');
                      setShowShareOptions(false);
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-blue-50 rounded text-left"
                  >
                    <Facebook className="w-5 h-5 text-blue-500" />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => {
                      handleShare('copy');
                      setShowShareOptions(false);
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left"
                  >
                    <Copy className="w-5 h-5 text-gray-600" />
                    <span>{copySuccess ? '✓ Copied!' : 'Copy Link'}</span>
                  </button>
                </motion.div>
              )}
            </div>

            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
        </motion.div>
      </div>
    </>
  );
}
