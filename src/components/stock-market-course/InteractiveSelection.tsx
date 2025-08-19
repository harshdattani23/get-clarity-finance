"use client";

import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface SelectionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface InteractiveSelectionProps {
  title: string;
  description: string;
  options: SelectionOption[];
  onComplete?: (score: number, total: number) => void;
}

export default function InteractiveSelection({ 
  title, 
  description, 
  options, 
  onComplete 
}: InteractiveSelectionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleOptionToggle = (optionId: string) => {
    if (completed) return;
    
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) return;
    
    setShowResults(true);
    setCompleted(true);
    
    const correctSelections = selectedOptions.filter(id => 
      options.find(opt => opt.id === id)?.isCorrect
    );
    const incorrectSelections = selectedOptions.filter(id => 
      !options.find(opt => opt.id === id)?.isCorrect
    );
    // const missedCorrect = options.filter(opt => 
    //   opt.isCorrect && !selectedOptions.includes(opt.id)
    // );
    
    const score = correctSelections.length - incorrectSelections.length;
    const total = options.filter(opt => opt.isCorrect).length;
    
    onComplete?.(Math.max(0, score), total);
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setShowResults(false);
    setCompleted(false);
  };

  const getScore = () => {
    const correctSelections = selectedOptions.filter(id => 
      options.find(opt => opt.id === id)?.isCorrect
    );
    const incorrectSelections = selectedOptions.filter(id => 
      !options.find(opt => opt.id === id)?.isCorrect
    );
    return Math.max(0, correctSelections.length - incorrectSelections.length);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="space-y-3 mb-6">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          const showCorrect = showResults && option.isCorrect;
          const showIncorrect = showResults && isSelected && !option.isCorrect;
          
          return (
            <button
              key={option.id}
              onClick={() => handleOptionToggle(option.id)}
              disabled={completed}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                showCorrect
                  ? 'border-green-500 bg-green-50'
                  : showIncorrect
                  ? 'border-red-500 bg-red-50'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  showCorrect
                    ? 'border-green-500 bg-green-500'
                    : showIncorrect
                    ? 'border-red-500 bg-red-500'
                    : isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {showCorrect && <CheckCircle className="w-4 h-4 text-white" />}
                  {showIncorrect && <XCircle className="w-4 h-4 text-white" />}
                  {isSelected && !showResults && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="font-medium text-gray-800">{option.text}</span>
              </div>
              
              {showResults && (
                <div className={`mt-3 p-3 rounded-lg ${
                  option.isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <p className={`text-sm ${
                    option.isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {option.explanation}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {!completed && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={selectedOptions.length === 0}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit Selection
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {completed && (
        <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Results</h4>
          <p className="text-blue-700 mb-4">
            You selected {selectedOptions.length} options and got {getScore()} correct!
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
