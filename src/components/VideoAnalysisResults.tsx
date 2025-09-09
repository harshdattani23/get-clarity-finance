'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Eye, 
  Brain, 
  Clock,
  FileVideo,
  TrendingUp,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface VideoAnalysisResultsProps {
  analysis: {
    analysisId: string;
    videoId: string;
    isDeepfake: boolean;
    confidence: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    indicators: string[];
    recommendations: string[];
    fraudAnalysis: {
      isFraudulent: boolean;
      fraudType?: string[];
      sebiViolations?: string[];
      investmentScamIndicators?: string[];
    };
    technicalDetails: {
      videoQuality?: string;
      compressionArtifacts?: string[];
      editingMarkers?: string[];
      metadataAnalysis?: any;
    };
    contentAnalysis: {
      transcript?: string;
      keyTopics?: string[];
      financialClaims?: string[];
      speakerAnalysis?: string;
      duration?: number;
    };
    timestamp: string;
    processingTime: string;
  };
  videoInfo?: {
    originalName: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: string;
    description?: string;
    tags?: string[];
  };
  className?: string;
}

export default function VideoAnalysisResults({ 
  analysis, 
  videoInfo, 
  className = '' 
}: VideoAnalysisResultsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    technical: false,
    content: false,
    recommendations: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getRiskLevelConfig = (riskLevel: string) => {
    const configs = {
      low: {
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        variant: 'default' as const,
        description: 'Low risk - Content appears legitimate'
      },
      medium: {
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: <AlertCircle className="h-5 w-5 text-yellow-600" />,
        variant: 'secondary' as const,
        description: 'Medium risk - Some suspicious indicators found'
      },
      high: {
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: <AlertTriangle className="h-5 w-5 text-orange-600" />,
        variant: 'destructive' as const,
        description: 'High risk - Multiple fraud indicators detected'
      },
      critical: {
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
        variant: 'destructive' as const,
        description: 'Critical risk - Likely deepfake or fraud content'
      }
    };

    return configs[riskLevel as keyof typeof configs] || configs.medium;
  };

  const riskConfig = getRiskLevelConfig(analysis.riskLevel);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Analysis Overview */}
      <Card className={`${riskConfig.borderColor} border-2`}>
        <CardHeader className={riskConfig.bgColor}>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {riskConfig.icon}
              <div>
                <h3 className="text-lg font-semibold">Analysis Results</h3>
                <p className={`text-sm ${riskConfig.color}`}>
                  {riskConfig.description}
                </p>
              </div>
            </div>
            <Badge variant={riskConfig.variant} className="text-xs">
              {analysis.riskLevel.toUpperCase()} RISK
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Deepfake Detection */}
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Eye className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Deepfake Detection</p>
                <div className="flex items-center gap-2">
                  <p className={`font-semibold ${analysis.isDeepfake ? 'text-red-600' : 'text-green-600'}`}>
                    {analysis.isDeepfake ? 'DETECTED' : 'NOT DETECTED'}
                  </p>
                  <Badge variant={analysis.isDeepfake ? 'destructive' : 'default'} className="text-xs">
                    {analysis.confidence}% confident
                  </Badge>
                </div>
              </div>
            </div>

            {/* Fraud Analysis */}
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Shield className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Fraud Detection</p>
                <div className="flex items-center gap-2">
                  <p className={`font-semibold ${
                    analysis.fraudAnalysis.isFraudulent ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {analysis.fraudAnalysis.isFraudulent ? 'SUSPICIOUS' : 'LEGITIMATE'}
                  </p>
                  {analysis.fraudAnalysis.fraudType && analysis.fraudAnalysis.fraudType.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {analysis.fraudAnalysis.fraudType.length} issue{analysis.fraudAnalysis.fraudType.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Processing Time */}
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Clock className="h-8 w-8 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Analysis Time</p>
                <p className="font-semibold">{analysis.processingTime}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(analysis.timestamp)}
                </p>
              </div>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Detection Confidence</span>
              <span className="font-medium">{analysis.confidence}%</span>
            </div>
            <Progress value={analysis.confidence} className="h-2" />
            <p className="text-xs text-gray-500">
              Higher confidence indicates stronger certainty in the analysis results
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Video Information */}
      {videoInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileVideo className="h-5 w-5" />
              Video Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">File Name</p>
                <p className="font-medium break-all">{videoInfo.originalName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">File Size</p>
                <p className="font-medium">{formatFileSize(videoInfo.fileSize)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Format</p>
                <p className="font-medium">{videoInfo.mimeType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Uploaded</p>
                <p className="font-medium">{formatDate(videoInfo.uploadedAt)}</p>
              </div>
              {videoInfo.description && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Description</p>
                  <p className="text-sm">{videoInfo.description}</p>
                </div>
              )}
              {videoInfo.tags && videoInfo.tags.length > 0 && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {videoInfo.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Indicators */}
      {analysis.indicators && analysis.indicators.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Key Indicators Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.indicators.map((indicator, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{indicator}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fraud Analysis Details */}
      {((analysis.fraudAnalysis.fraudType?.length ?? 0) > 0 || 
        (analysis.fraudAnalysis.sebiViolations?.length ?? 0) > 0 || 
        (analysis.fraudAnalysis.investmentScamIndicators?.length ?? 0) > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Fraud Analysis Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.fraudAnalysis.fraudType && analysis.fraudAnalysis.fraudType.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2 text-red-600">Fraud Types Detected</h4>
                <div className="space-y-1">
                  {analysis.fraudAnalysis.fraudType.map((type, index) => (
                    <Badge key={index} variant="destructive" className="mr-2 mb-1">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {analysis.fraudAnalysis.sebiViolations && analysis.fraudAnalysis.sebiViolations.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2 text-orange-600">Potential SEBI Violations</h4>
                <div className="space-y-1">
                  {analysis.fraudAnalysis.sebiViolations.map((violation, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>{violation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis.fraudAnalysis.investmentScamIndicators && analysis.fraudAnalysis.investmentScamIndicators.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2 text-red-600">Investment Scam Indicators</h4>
                <div className="space-y-1">
                  {analysis.fraudAnalysis.investmentScamIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Expandable Sections */}
      <div className="space-y-4">
        {/* Technical Details */}
        <Collapsible open={expandedSections.technical} onOpenChange={() => toggleSection('technical')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Technical Analysis
                  </span>
                  {expandedSections.technical ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                {analysis.technicalDetails.videoQuality && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Video Quality Assessment</h4>
                    <p className="text-sm text-gray-600">{analysis.technicalDetails.videoQuality}</p>
                  </div>
                )}

                {analysis.technicalDetails.compressionArtifacts && analysis.technicalDetails.compressionArtifacts.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Compression Artifacts</h4>
                    <div className="space-y-1">
                      {analysis.technicalDetails.compressionArtifacts.map((artifact, index) => (
                        <p key={index} className="text-sm text-gray-600">• {artifact}</p>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.technicalDetails.editingMarkers && analysis.technicalDetails.editingMarkers.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Editing Markers</h4>
                    <div className="space-y-1">
                      {analysis.technicalDetails.editingMarkers.map((marker, index) => (
                        <p key={index} className="text-sm text-gray-600">• {marker}</p>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.technicalDetails.metadataAnalysis && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Metadata Analysis</h4>
                    <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                      <pre>{JSON.stringify(analysis.technicalDetails.metadataAnalysis, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Content Analysis */}
        <Collapsible open={expandedSections.content} onOpenChange={() => toggleSection('content')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileVideo className="h-5 w-5" />
                    Content Analysis
                  </span>
                  {expandedSections.content ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                {analysis.contentAnalysis.keyTopics && analysis.contentAnalysis.keyTopics.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Topics</h4>
                    <div className="flex flex-wrap gap-1">
                      {analysis.contentAnalysis.keyTopics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.contentAnalysis.financialClaims && analysis.contentAnalysis.financialClaims.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Financial Claims Detected</h4>
                    <div className="space-y-1">
                      {analysis.contentAnalysis.financialClaims.map((claim, index) => (
                        <p key={index} className="text-sm text-gray-600">• {claim}</p>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.contentAnalysis.speakerAnalysis && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Speaker Analysis</h4>
                    <p className="text-sm text-gray-600">{analysis.contentAnalysis.speakerAnalysis}</p>
                  </div>
                )}

                {analysis.contentAnalysis.transcript && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Transcript</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm max-h-48 overflow-y-auto">
                      <p>{analysis.contentAnalysis.transcript}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Summary */}
      <Alert className={`${riskConfig.borderColor} ${riskConfig.bgColor}`}>
        {riskConfig.icon}
        <AlertTitle className={riskConfig.color}>
          Analysis Complete - {analysis.riskLevel.toUpperCase()} Risk Level
        </AlertTitle>
        <AlertDescription className="text-sm">
          <div className="mt-2 space-y-1">
            <p>
              <strong>Deepfake Detection:</strong> {analysis.isDeepfake ? 'Potential deepfake detected' : 'No deepfake indicators found'} 
              ({analysis.confidence}% confidence)
            </p>
            <p>
              <strong>Fraud Analysis:</strong> {analysis.fraudAnalysis.isFraudulent ? 'Suspicious content detected' : 'Content appears legitimate'}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Analysis ID: {analysis.analysisId} • Processed in {analysis.processingTime}
            </p>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
