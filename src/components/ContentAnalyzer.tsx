"use client";

import { useState, useEffect, useRef } from 'react';
import type { ApiResponse } from '@/pages/api/analyze';
import { Bot, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from '@/hooks/useTranslation';

export default function ContentAnalyzer() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('home');

  const handleAnalyze = async () => {
    if (!content) {
      setError(t('analyzer.error.noContent'));
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data: ApiResponse = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        // @ts-ignore
        setError(data.message || t('analyzer.error.analysisFailed'));
      }
    } catch (err) {
      setError(t('analyzer.error.connectionFailed'));
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [result]);

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t('analyzer.placeholder')}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        rows={6}
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed font-semibold w-full md:w-auto md:self-end transition duration-300 flex items-center justify-center gap-2"
      >
        {loading ? (
          t('analyzer.button.loading')
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            {t('analyzer.button.submit')}
          </>
        )}
      </button>

      <div className="mt-4" ref={resultsRef}>
        {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center">{error}</p>}
        
        {result?.type === 'analysis' && (
          <div className={`p-4 rounded-lg text-left border ${result.payload.isSuspicious ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <h3 className={`text-lg font-bold flex items-center gap-2 ${result.payload.isSuspicious ? 'text-red-800' : 'text-green-800'}`}>
              {result.payload.isSuspicious ? <ThumbsDown className="w-5 h-5" /> : <ThumbsUp className="w-5 h-5" />}
              {result.payload.isSuspicious ? t('analyzer.result.scam') : t('analyzer.result.safe')}
            </h3>
            <div className="text-gray-700 mt-2 pl-7 prose prose-sm max-w-none">
              <ReactMarkdown>{result.payload.reason}</ReactMarkdown>
            </div>
          </div>
        )}

        {result?.type === 'answer' && (
          <div className="p-4 rounded-lg text-left bg-blue-50 border-blue-200">
             <h3 className="text-lg font-bold flex items-center gap-2 text-blue-800">
               <Bot className="w-5 h-5" />
               {t('analyzer.result.aiAssistant')}
             </h3>
             <div className="text-gray-800 mt-2 pl-7 prose prose-sm max-w-none">
                <ReactMarkdown>{result.payload.answer}</ReactMarkdown>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
