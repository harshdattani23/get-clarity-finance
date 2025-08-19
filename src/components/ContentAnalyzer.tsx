"use client";

import { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from '@/hooks/useTranslation';

interface AnalysisResponse {
  detailedAnalysis: string;
  riskScore: number;
  confidenceScore: number;
  finalVerdict: 'Likely Safe' | 'Potential Risk' | 'High Risk';
}

export default function ContentAnalyzer() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('home');

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    setResponse(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query }),
      });

      const data: AnalysisResponse = await response.json();
      if (response.ok) {
        setResponse(data);
      }
    } catch {
      // setError(t('analyzer.error.connectionFailed')); // This line was removed as per the new_code
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (response && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [response]);

  return (
    <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('analyzer.placeholder') as string}
        className="w-full p-4 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9FE870] focus:border-[#9FE870] transition-colors duration-300"
        rows={6}
      />
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="flex justify-center items-center h-[52px] w-[322px] p-4 gap-2 flex-shrink-0 rounded-full bg-[#9FE870] text-[#163300] font-semibold hover:bg-[#8ade5a] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
        style={{ borderRadius: '1000px' }}
      >
        {isLoading ? (
          t('analyzer.button.loading') as string
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            {t('analyzer.button.submit') as string}
          </>
        )}
      </button>

      <div className="mt-4 text-left w-full" ref={resultsRef}>
        {/* error && <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center">{error}</p> */}
        
        {response && (
          <div className={`p-4 rounded-lg border ${response.riskScore > 70 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <h3 className={`text-lg font-bold flex items-center gap-2 ${response.riskScore > 70 ? 'text-red-700' : 'text-green-700'}`}>
              {response.riskScore > 70 ? <ThumbsDown className="w-5 h-5" /> : <ThumbsUp className="w-5 h-5" />}
              {response.riskScore > 70 ? t('analyzer.result.scam') as string : t('analyzer.result.safe') as string}
            </h3>
            <div className="text-gray-800 mt-2 pl-7 prose prose-sm max-w-none">
              <ReactMarkdown>{response.detailedAnalysis}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* result?.type === 'answer' && ( // This block was removed as per the new_code
          <div className="p-4 rounded-lg bg-blue-50 border-blue-200">
             <h3 className="text-lg font-bold flex items-center gap-2 text-blue-700">
               {t('analyzer.result.aiAssistant') as string}
             </h3>
             <div className="text-gray-800 mt-2 pl-7 prose prose-sm max-w-none">
                <ReactMarkdown>{result.payload.answer}</ReactMarkdown>
             </div>
          </div>
        ) */}
      </div>
    </div>
  );
}
