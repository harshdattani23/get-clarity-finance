// Document Fraud Detection Library
// Comprehensive patterns and validation for detecting fake financial documents

export interface DocumentAnalysisResult {
  isSuspicious: boolean;
  riskScore: number; // 0-100
  confidence: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  fraudIndicators: FraudIndicator[];
  documentType: DocumentType;
  recommendations: string[];
  extractedText: string;
  metadata?: DocumentMetadata;
  sebiVerification?: SEBIVerificationResult;
}

export interface FraudIndicator {
  type: FraudType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  matches: string[];
  pattern: string;
  guidance: string;
}

export interface DocumentMetadata {
  fileType: string;
  fileSize: number;
  pageCount?: number;
  creationDate?: Date;
  modificationDate?: Date;
  author?: string;
  creator?: string;
  producer?: string;
  title?: string;
  hasImages?: boolean;
  hasEmbeddedFonts?: boolean;
  isScanned?: boolean;
}

export interface SEBIVerificationResult {
  hasSebiReference: boolean;
  claimedSebiApproval: boolean;
  validSebiFormat: boolean;
  suspiciousSebiClaims: string[];
  recommendations: string[];
}

export enum FraudType {
  FAKE_SEBI_APPROVAL = 'fake_sebi_approval',
  GUARANTEED_RETURNS = 'guaranteed_returns',
  INSIDER_INFORMATION = 'insider_information',
  FAKE_CERTIFICATION = 'fake_certification',
  PONZI_INDICATORS = 'ponzi_indicators',
  FAKE_REGISTRATION = 'fake_registration',
  MISLEADING_CLAIMS = 'misleading_claims',
  SUSPICIOUS_FORMATTING = 'suspicious_formatting',
  FAKE_LETTERHEAD = 'fake_letterhead',
  URGENT_ACTION_REQUIRED = 'urgent_action_required'
}

export enum DocumentType {
  SEBI_LETTER = 'sebi_letter',
  INVESTMENT_PROPOSAL = 'investment_proposal',
  BROKER_CERTIFICATE = 'broker_certificate',
  ADVISOR_REGISTRATION = 'advisor_registration',
  IPO_DOCUMENT = 'ipo_document',
  MUTUAL_FUND_DOCUMENT = 'mutual_fund_document',
  REGULATORY_NOTICE = 'regulatory_notice',
  OTHER = 'other'
}

// SEBI-specific fraud patterns
const SEBI_FRAUD_PATTERNS: Record<FraudType, {
  patterns: RegExp[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  guidance: string;
}> = {
  [FraudType.FAKE_SEBI_APPROVAL]: {
    patterns: [
      /sebi\s+(approved|authorized|certified|registered|licensed)(?!\s+by\s+sebi)/i,
      /approved\s+by\s+sebi(?!\s+(under|vide|through))/i,
      /sebi\s+clearance\s+(obtained|granted|issued)/i,
      /sebi\s+no\s*[\.:]?\s*[a-z]*\d+/i,
      /securities\s+and\s+exchange\s+board\s+approval/i,
      /sebi\s+reg(?:istration)?\s*no\s*[\.:]?\s*\d+/i
    ],
    severity: 'critical',
    description: 'Claims of SEBI approval without proper context or format',
    guidance: 'SEBI never provides blanket "approvals" for investment schemes. Verify registration numbers on official SEBI website.'
  },
  
  [FraudType.GUARANTEED_RETURNS]: {
    patterns: [
      /guaranteed?\s+returns?\s+of\s+\d+/i,
      /assured\s+(profit|return|income)\s+of\s+\d+/i,
      /\d+%\s+(guaranteed|assured|confirmed|fixed)\s+(return|profit)/i,
      /risk[-\s]*free\s+(investment|returns?|profits?)/i,
      /capital\s+(protection|guarantee|assurance)/i,
      /no\s+risk\s+(investment|scheme)/i,
      /\d+%\s+per\s+(month|year)\s+(guaranteed|assured)/i
    ],
    severity: 'critical',
    description: 'Promises of guaranteed returns or risk-free investments',
    guidance: 'No legitimate investment can guarantee returns. All investments carry risk as per SEBI guidelines.'
  },

  [FraudType.INSIDER_INFORMATION]: {
    patterns: [
      /insider\s+(information|tips?|knowledge)/i,
      /confidential\s+(market\s+)?information/i,
      /exclusive\s+(tips?|information|access)/i,
      /non[-\s]*public\s+information/i,
      /privileged\s+(information|access)/i,
      /secret\s+(formula|strategy|information)/i
    ],
    severity: 'critical',
    description: 'Claims of access to insider or non-public information',
    guidance: 'Trading on insider information is illegal. Legitimate advisors never claim to have inside information.'
  },

  [FraudType.FAKE_CERTIFICATION]: {
    patterns: [
      /certified\s+by\s+[^s](?!ebi)/i, // Certified by someone other than SEBI
      /authorized\s+dealer\s*(?!.*sebi)/i,
      /licensed\s+(?!by\s+sebi|under\s+sebi)/i,
      /iso\s+certified\s+investment/i,
      /government\s+approved\s+(?!.*sebi)/i
    ],
    severity: 'high',
    description: 'Claims of certifications from non-regulatory bodies',
    guidance: 'Only SEBI registration matters for financial services. Other certifications may be misleading.'
  },

  [FraudType.PONZI_INDICATORS]: {
    patterns: [
      /recruit\s+(members|investors|participants)/i,
      /referral\s+(bonus|commission|reward)/i,
      /multi[-\s]*level\s+(marketing|investment)/i,
      /pyramid\s+(scheme|structure)/i,
      /early\s+bird\s+(offer|discount)/i,
      /limited\s+(time|period|slots?)\s+(offer|opportunity)/i
    ],
    severity: 'critical',
    description: 'Indicators of pyramid or Ponzi schemes',
    guidance: 'These are characteristics of fraudulent schemes. Report to SEBI immediately.'
  },

  [FraudType.FAKE_REGISTRATION]: {
    patterns: [
      /reg\s*(?:istration)?\s*no\s*[\.:]?\s*[a-z]*\d{1,5}(?!\d)/i, // Too short registration numbers
      /sebi\s*\/\s*[a-z]*\s*\/\s*\d{1,5}/i, // Invalid SEBI format
      /registration\s+pending/i,
      /temp(?:orary)?\s+registration/i,
      /provisional\s+registration/i
    ],
    severity: 'high',
    description: 'Invalid or suspicious registration number formats',
    guidance: 'SEBI registration numbers follow specific formats. Verify on official SEBI database.'
  },

  [FraudType.MISLEADING_CLAIMS]: {
    patterns: [
      /\d+%\s+success\s+rate/i,
      /never\s+(lost|failed|negative)/i,
      /always\s+(profitable|positive|winning)/i,
      /\d+\s+(?:lakh|crore)\s+(?:guaranteed|assured)/i,
      /double\s+(?:your\s+)?money\s+in\s+\d+/i,
      /millionaire\s+in\s+\d+\s+(?:days|months)/i
    ],
    severity: 'high',
    description: 'Unrealistic or misleading performance claims',
    guidance: 'Past performance does not guarantee future results. Be wary of unrealistic claims.'
  },

  [FraudType.SUSPICIOUS_FORMATTING]: {
    patterns: [
      /(?:urgent|immediate|immediate|limited).*(?:action|response|reply)\s+required/i,
      /act\s+(?:now|fast|immediately)/i,
      /(?:last|final|only)\s+(?:chance|opportunity)/i,
      /expires?\s+(?:today|tomorrow|soon)/i
    ],
    severity: 'medium',
    description: 'High-pressure tactics and urgency indicators',
    guidance: 'Legitimate investments never require immediate action. Take time to verify.'
  },

  [FraudType.FAKE_LETTERHEAD]: {
    patterns: [
      /securities\s+and\s+exchange\s+board(?!\s+of\s+india)/i,
      /sebi(?!\s+\(securities\s+and\s+exchange\s+board\s+of\s+india\))/i,
      /government\s+of\s+india(?!\s+ministry)/i,
      /reserve\s+bank\s+of\s+india(?!\s+rbi)/i
    ],
    severity: 'critical',
    description: 'Suspicious use of official organization names without proper context',
    guidance: 'Fraudsters often impersonate official organizations. Verify directly with the organization.'
  },

  [FraudType.URGENT_ACTION_REQUIRED]: {
    patterns: [
      /urgent(?:ly)?\s+(?:send|transfer|deposit)/i,
      /immediate\s+payment\s+required/i,
      /pay\s+(?:now|immediately|today)/i,
      /transfer\s+(?:money|amount|funds)\s+(?:now|today)/i,
      /deadline\s+(?:today|tomorrow)/i
    ],
    severity: 'critical',
    description: 'Urgent payment or action requests',
    guidance: 'Legitimate investments never demand immediate payments. This is a major red flag.'
  }
};

/**
 * Analyze document text for fraud indicators
 */
export function analyzeDocumentText(text: string): {
  fraudIndicators: FraudIndicator[];
  riskScore: number;
  documentType: DocumentType;
  sebiVerification: SEBIVerificationResult;
} {
  const fraudIndicators: FraudIndicator[] = [];
  let riskScore = 0;

  // Check each fraud pattern
  for (const [fraudType, config] of Object.entries(SEBI_FRAUD_PATTERNS)) {
    for (const pattern of config.patterns) {
      const matches = text.match(new RegExp(pattern.source, 'gi')) || [];
      if (matches.length > 0) {
        const indicator: FraudIndicator = {
          type: fraudType as FraudType,
          severity: config.severity,
          description: config.description,
          matches: [...new Set(matches)], // Remove duplicates
          pattern: pattern.source,
          guidance: config.guidance
        };

        fraudIndicators.push(indicator);

        // Add to risk score based on severity
        const severityScore = {
          low: 10,
          medium: 25,
          high: 40,
          critical: 60
        };
        riskScore += severityScore[config.severity];
      }
    }
  }

  // Cap risk score at 100
  riskScore = Math.min(100, riskScore);

  // Determine document type
  const documentType = determineDocumentType(text);

  // SEBI verification analysis
  const sebiVerification = analyzeSebiClaims(text);

  return {
    fraudIndicators,
    riskScore,
    documentType,
    sebiVerification
  };
}

/**
 * Determine document type based on content
 */
function determineDocumentType(text: string): DocumentType {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('sebi') && (lowerText.includes('letter') || lowerText.includes('notice'))) {
    return DocumentType.SEBI_LETTER;
  }
  if (lowerText.includes('investment') && (lowerText.includes('proposal') || lowerText.includes('opportunity'))) {
    return DocumentType.INVESTMENT_PROPOSAL;
  }
  if (lowerText.includes('broker') && (lowerText.includes('certificate') || lowerText.includes('registration'))) {
    return DocumentType.BROKER_CERTIFICATE;
  }
  if (lowerText.includes('advisor') && lowerText.includes('registration')) {
    return DocumentType.ADVISOR_REGISTRATION;
  }
  if (lowerText.includes('ipo') || lowerText.includes('initial public offering')) {
    return DocumentType.IPO_DOCUMENT;
  }
  if (lowerText.includes('mutual fund') || lowerText.includes('amc')) {
    return DocumentType.MUTUAL_FUND_DOCUMENT;
  }
  if (lowerText.includes('regulatory') && lowerText.includes('notice')) {
    return DocumentType.REGULATORY_NOTICE;
  }

  return DocumentType.OTHER;
}

/**
 * Analyze SEBI-specific claims in the document
 */
function analyzeSebiClaims(text: string): SEBIVerificationResult {
  const hasSebiReference = /sebi|securities\s+and\s+exchange\s+board/i.test(text);
  const claimedSebiApproval = /sebi\s+(approved|authorized|certified)/i.test(text);
  
  // Valid SEBI registration formats
  const validSebiFormats = [
    /IN[AH]\d{8}/i, // Investment Adviser/Research Analyst
    /INZ\d{9}/i,    // Stock Broker
    /AREP\d{10}/i,  // Authorised Representative
  ];
  
  const validSebiFormat = validSebiFormats.some(pattern => pattern.test(text));
  
  const suspiciousSebiClaims = [];
  const recommendations = [];

  if (hasSebiReference) {
    if (claimedSebiApproval && !validSebiFormat) {
      suspiciousSebiClaims.push('Claims SEBI approval without valid registration format');
      recommendations.push('Verify SEBI registration on official website');
    }
    
    if (/sebi\s+approved\s+scheme/i.test(text)) {
      suspiciousSebiClaims.push('Claims SEBI approved scheme (SEBI does not approve schemes)');
      recommendations.push('SEBI regulates entities, not specific investment schemes');
    }
  }

  if (suspiciousSebiClaims.length === 0 && hasSebiReference) {
    recommendations.push('Document mentions SEBI - verify claims on official SEBI website');
  }

  return {
    hasSebiReference,
    claimedSebiApproval,
    validSebiFormat,
    suspiciousSebiClaims,
    recommendations
  };
}

/**
 * Generate recommendations based on analysis
 */
export function generateRecommendations(result: DocumentAnalysisResult): string[] {
  const recommendations: string[] = [];

  if (result.riskLevel === 'critical') {
    recommendations.push('🚨 HIGH RISK: Do not proceed with this investment');
    recommendations.push('📞 Report to SEBI immediately: 1800-266-7575');
    recommendations.push('💻 File complaint at https://scores.sebi.gov.in/');
  } else if (result.riskLevel === 'high') {
    recommendations.push('⚠️ HIGH CAUTION: Multiple fraud indicators detected');
    recommendations.push('🔍 Verify all claims through official channels');
    recommendations.push('📞 Contact SEBI for clarification: 1800-266-7575');
  } else if (result.riskLevel === 'medium') {
    recommendations.push('⚡ CAUTION: Some suspicious elements found');
    recommendations.push('✅ Verify registration numbers on SEBI website');
    recommendations.push('🔍 Cross-check information with official sources');
  } else {
    recommendations.push('✅ Document appears relatively safe');
    recommendations.push('🔍 Still verify any registration numbers mentioned');
    recommendations.push('📋 Ensure all regulatory compliance before proceeding');
  }

  // Add SEBI verification recommendations
  if (result.sebiVerification) {
    recommendations.push(...result.sebiVerification.recommendations);
  }

  // Add specific fraud indicator guidance
  result.fraudIndicators.forEach(indicator => {
    if (indicator.severity === 'critical' || indicator.severity === 'high') {
      recommendations.push(`⚠️ ${indicator.guidance}`);
    }
  });

  return [...new Set(recommendations)]; // Remove duplicates
}

/**
 * Calculate overall risk level
 */
export function calculateRiskLevel(riskScore: number, fraudIndicators: FraudIndicator[]): 'low' | 'medium' | 'high' | 'critical' {
  const criticalIndicators = fraudIndicators.filter(i => i.severity === 'critical');
  const highIndicators = fraudIndicators.filter(i => i.severity === 'high');

  if (criticalIndicators.length > 0 || riskScore >= 80) {
    return 'critical';
  }
  if (highIndicators.length > 1 || riskScore >= 60) {
    return 'high';
  }
  if (riskScore >= 30) {
    return 'medium';
  }
  return 'low';
}

/**
 * Validate document metadata for suspicious characteristics
 */
export function analyzeDocumentMetadata(metadata: DocumentMetadata): {
  suspiciousMetadata: string[];
  recommendations: string[];
} {
  const suspicious: string[] = [];
  const recommendations: string[] = [];

  // Check for suspicious creation/modification patterns
  if (metadata.creationDate && metadata.modificationDate) {
    const timeDiff = metadata.modificationDate.getTime() - metadata.creationDate.getTime();
    if (timeDiff < 60000) { // Modified within 1 minute of creation
      suspicious.push('Document created and modified within 1 minute');
      recommendations.push('Recently created documents may be fabricated');
    }
  }

  // Check for suspicious authorship
  if (metadata.author && /test|temp|admin|user/i.test(metadata.author)) {
    suspicious.push('Suspicious author name detected');
    recommendations.push('Professional documents should have proper authorship');
  }

  // Check for missing critical metadata
  if (!metadata.creationDate) {
    suspicious.push('Missing creation date metadata');
    recommendations.push('Legitimate documents typically have creation timestamps');
  }

  return {
    suspiciousMetadata: suspicious,
    recommendations
  };
}
