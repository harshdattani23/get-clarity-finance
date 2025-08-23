interface ParsedNewsSection {
  type: 'heading' | 'metric' | 'bullet' | 'paragraph' | 'highlight' | 'date';
  content: string;
  metadata?: {
    label?: string;
    value?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
    isImportant?: boolean;
  };
}

interface FormattedNews {
  headline?: string;
  keyMetrics: Array<{
    label: string;
    value: string;
    change?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
  }>;
  highlights: string[];
  details: ParsedNewsSection[];
  summary: string;
  lastUpdated?: string;
}

export function parseNewsContent(rawNews: string): FormattedNews {
  // First, clean up bold markdown formatting
  const cleanedNews = rawNews
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove ** bold markers
    .replace(/\*([^*]+)\*/g, '$1'); // Remove * italic markers
    
  const lines = cleanedNews.split('\n').filter(line => line.trim());
  
  const formatted: FormattedNews = {
    keyMetrics: [],
    highlights: [],
    details: [],
    summary: ''
  };

  // Extract headline - look for the first sentence with the ticker/company name
  let headlineText = '';
  for (let i = 0; i < Math.min(3, lines.length); i++) {
    const line = lines[i];
    // Check if line contains company/ticker reference and is substantial
    if (line.length > 30 && (line.includes('(') || line.match(/^In the last/i))) {
      // Extract just the first sentence as headline
      const sentences = line.match(/[^.!?]+[.!?]+/g);
      if (sentences && sentences.length > 0) {
        headlineText = sentences[0].trim();
        // Remove the extracted headline from further processing
        lines[i] = line.replace(sentences[0], '').trim();
        break;
      }
    }
  }
  
  if (headlineText) {
    // Clean up the headline further
    formatted.headline = headlineText
      .replace(/^In the last \d+ (?:hours?|days?),?\s*/i, '')
      .replace(/\s+/g, ' ')
      .trim();
  } else {
    // Fallback to first substantial line
    const headlineIndex = lines.findIndex(line => 
      line.length > 20 && !line.startsWith('-')
    );
    if (headlineIndex !== -1) {
      formatted.headline = lines[headlineIndex].trim();
    }
  }

  // Extract key metrics (numbers with context)
  const metricPatterns = [
    /(?:profit|revenue|earnings|EBITDA|sales|growth|margin|yield|PE|EPS|volume|cap|turnover).*?(?:Rs\s*[\d,]+(?:\.\d+)?(?:\s*(?:crore|lakh|million|billion))?|[\d,]+(?:\.\d+)?%|\$[\d,]+(?:\.\d+)?[MBK]?)/gi,
    /Rs\s*[\d,]+(?:\.\d+)?(?:\s*(?:crore|lakh|million|billion))?.*?(?:profit|revenue|earnings|sales|growth)/gi,
    /[\d,]+(?:\.\d+)?%.*?(?:increase|decrease|growth|decline|rise|fall|gain|loss)/gi
  ];

  lines.forEach(line => {
    metricPatterns.forEach(pattern => {
      const matches = line.match(pattern);
      if (matches) {
        matches.forEach(match => {
          // Extract the metric and its context
          const valueMatch = match.match(/Rs\s*([\d,]+(?:\.\d+)?)\s*(?:crore|lakh|million|billion)?|(\d+(?:\.\d+)?%)/);
          if (valueMatch) {
            const value = valueMatch[0];
            const label = match.replace(value, '').trim();
            
            // Determine sentiment based on keywords
            let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
            if (/profit|gain|growth|increase|rise|strong|turnaround|improvement/i.test(match)) {
              sentiment = 'positive';
            } else if (/loss|decline|decrease|fall|weak|drop/i.test(match)) {
              sentiment = 'negative';
            }

            // Avoid duplicates
            if (!formatted.keyMetrics.some(m => m.value === value && m.label.includes(label.substring(0, 20)))) {
              formatted.keyMetrics.push({
                label: cleanLabel(label),
                value: value,
                sentiment
              });
            }
          }
        });
      }
    });
  });

  // Extract highlights (important points)
  const highlightKeywords = [
    /announced|scheduled|reported|declared|achieved|launched|acquired|partnered|expanded/i,
    /Q\d\s*FY\d+|quarter ended|financial results/i,
    /board.*meeting|dividend|stock.*split|buyback/i,
    /analyst.*forecast|price.*target|rating/i
  ];

  lines.forEach(line => {
    if (highlightKeywords.some(pattern => pattern.test(line)) && line.length > 30) {
      // Clean up the line and add as highlight
      const cleanedLine = line
        .replace(/^\*+\s*/, '')
        .replace(/^-\s*/, '')
        .replace(/^\d+\.\s*/, '')
        .trim();
      
      if (cleanedLine.length > 20 && !formatted.highlights.includes(cleanedLine)) {
        formatted.highlights.push(cleanedLine);
      }
    }
  });

  // Limit highlights to top 5
  formatted.highlights = formatted.highlights.slice(0, 5);

  // Parse detailed sections
  const currentSection: ParsedNewsSection[] = [];
  
  lines.forEach((line) => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) return;

    // Skip source lines
    if (trimmedLine.includes('Sources:') || trimmedLine.match(/^\d+\.\s*\(?\d{4}-\d{2}-\d{2}\)?/)) {
      return;
    }

    // Skip if this line was already used as headline
    if (formatted.headline && trimmedLine.includes(formatted.headline)) {
      return;
    }

    // Detect section types
    if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.match(/^\d+\./)) {
      currentSection.push({
        type: 'bullet',
        content: trimmedLine.replace(/^[•\-]\s*/, '').replace(/^\d+\.\s*/, '').trim()
      });
    } else if (trimmedLine.match(/\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{4}/i)) {
      currentSection.push({
        type: 'date',
        content: trimmedLine
      });
    } else if (isImportantLine(trimmedLine)) {
      currentSection.push({
        type: 'highlight',
        content: trimmedLine,
        metadata: { isImportant: true }
      });
    } else {
      currentSection.push({
        type: 'paragraph',
        content: trimmedLine
      });
    }
  });

  formatted.details = currentSection;

  // Create summary (first 2-3 sentences or key points)
  const summaryLines = lines
    .filter(line => line.length > 50 && !line.startsWith('**') && !line.match(/^\d+\./))
    .slice(0, 2);
  formatted.summary = summaryLines.join(' ').substring(0, 300);
  if (formatted.summary.length === 300) formatted.summary += '...';

  // Set last updated
  formatted.lastUpdated = new Date().toISOString();

  return formatted;
}

function cleanLabel(label: string): string {
  return label
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 5)
    .join(' ');
}

function isImportantLine(line: string): boolean {
  const importantPatterns = [
    /strong\s+(?:performance|growth|turnaround|results)/i,
    /significant|major|substantial|critical|important/i,
    /alert|warning|caution|risk/i,
    /recommendation|forecast|target|outlook/i
  ];
  
  return importantPatterns.some(pattern => pattern.test(line));
}

// Format financial numbers for display
export function formatFinancialNumber(value: string): string {
  // Remove Rs, $ symbols for processing
  const cleanValue = value.replace(/[Rs$,]/g, '').trim();
  const num = parseFloat(cleanValue);
  
  if (isNaN(num)) return value;
  
  // Detect if it's already in crore/lakh format
  if (value.includes('crore') || value.includes('lakh')) {
    return value;
  }
  
  // Format large numbers
  if (num >= 10000000) { // 1 crore
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) { // 1 lakh
    return `₹${(num / 100000).toFixed(2)} L`;
  } else {
    return `₹${num.toLocaleString('en-IN')}`;
  }
}

// Categorize news content
export function categorizeNews(content: string): {
  category: string;
  tags: string[];
  priority: 'high' | 'medium' | 'low';
} {
  const categories = {
    'Earnings Report': [/quarterly.*results/i, /Q\d.*FY/i, /earnings/i, /profit/i, /revenue/i],
    'Corporate Action': [/dividend/i, /stock.*split/i, /buyback/i, /bonus/i],
    'Management Update': [/board.*meeting/i, /CEO/i, /CFO/i, /appointment/i, /resignation/i],
    'Market Analysis': [/analyst/i, /forecast/i, /target.*price/i, /rating/i, /outlook/i],
    'Business Update': [/expansion/i, /acquisition/i, /merger/i, /partnership/i, /launch/i],
    'Regulatory': [/SEBI/i, /compliance/i, /regulatory/i, /approval/i],
    'Market Movement': [/traded/i, /volume/i, /price.*movement/i, /rally/i, /decline/i]
  };

  let matchedCategory = 'General Update';
  let tags: string[] = [];
  
  for (const [category, patterns] of Object.entries(categories)) {
    if (patterns.some(pattern => pattern.test(content))) {
      matchedCategory = category;
      
      // Extract relevant tags
      patterns.forEach(pattern => {
        const match = content.match(pattern);
        if (match && match[0].length > 3) {
          tags.push(match[0].toLowerCase());
        }
      });
      break;
    }
  }

  // Determine priority
  let priority: 'high' | 'medium' | 'low' = 'medium';
  
  if (/significant|major|critical|alert|warning/i.test(content)) {
    priority = 'high';
  } else if (/minor|small|slight|modest/i.test(content)) {
    priority = 'low';
  }

  // Clean up tags
  tags = [...new Set(tags)].slice(0, 5);

  return {
    category: matchedCategory,
    tags,
    priority
  };
}

interface CompanyMetrics {
  quarterlyResults?: {
    quarter: string;
    profit?: string;
    revenue?: string;
    yoy?: string;
  };
  stockMetrics?: {
    currentPrice?: string;
    targetPrice?: string;
    weekRange?: string;
    volume?: string;
  };
  dates?: {
    announcementDate?: string;
    meetingDate?: string;
    resultDate?: string;
  };
}

// Extract company-specific metrics
export function extractCompanyMetrics(content: string): CompanyMetrics {
  const metrics: CompanyMetrics = {};

  // Extract quarterly results
  const quarterMatch = content.match(/Q(\d)\s*FY(\d+)/i);
  if (quarterMatch) {
    metrics.quarterlyResults = {
      quarter: `Q${quarterMatch[1]} FY${quarterMatch[2]}`
    };

    // Look for profit
    const profitMatch = content.match(/profit.*?Rs\s*([\d,]+(?:\.\d+)?)\s*(?:crore|lakh)?/i);
    if (profitMatch) {
      metrics.quarterlyResults.profit = profitMatch[1];
    }

    // Look for revenue
    const revenueMatch = content.match(/revenue.*?Rs\s*([\d,]+(?:\.\d+)?)\s*(?:crore|lakh)?/i);
    if (revenueMatch) {
      metrics.quarterlyResults.revenue = revenueMatch[1];
    }

    // Look for YoY growth
    const yoyMatch = content.match(/(\d+(?:\.\d+)?%)\s*(?:YoY|year-over-year|y-o-y)/i);
    if (yoyMatch) {
      metrics.quarterlyResults.yoy = yoyMatch[1];
    }
  }

  // Extract stock metrics
  const priceMatch = content.match(/(?:price|trading at|closed at).*?Rs\s*([\d,]+(?:\.\d+)?)/i);
  if (priceMatch) {
    metrics.stockMetrics = metrics.stockMetrics || {};
    metrics.stockMetrics.currentPrice = priceMatch[1];
  }

  const targetMatch = content.match(/target.*?Rs\s*([\d,]+(?:\.\d+)?)/i);
  if (targetMatch) {
    metrics.stockMetrics = metrics.stockMetrics || {};
    metrics.stockMetrics.targetPrice = targetMatch[1];
  }

  const rangeMatch = content.match(/Rs\s*([\d,]+(?:\.\d+)?)\s*(?:to|-)\s*Rs\s*([\d,]+(?:\.\d+)?)/i);
  if (rangeMatch) {
    metrics.stockMetrics = metrics.stockMetrics || {};
    metrics.stockMetrics.weekRange = `₹${rangeMatch[1]} - ₹${rangeMatch[2]}`;
  }

  // Extract important dates
  const datePatterns = [
    /(?:announced|scheduled|held|reported).*?(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|\w+\s+\d{1,2},?\s+\d{4})/i,
    /(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|\w+\s+\d{1,2},?\s+\d{4}).*?(?:meeting|results|announcement)/i
  ];

  datePatterns.forEach(pattern => {
    const match = content.match(pattern);
    if (match) {
      metrics.dates = metrics.dates || {};
      if (/meeting/i.test(match[0])) {
        metrics.dates.meetingDate = match[1];
      } else if (/result/i.test(match[0])) {
        metrics.dates.resultDate = match[1];
      } else {
        metrics.dates.announcementDate = match[1];
      }
    }
  });

  return metrics;
}
