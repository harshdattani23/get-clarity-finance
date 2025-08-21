"use client";

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Target, ArrowRight } from 'lucide-react';

interface Question {
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching';
  question: string;
  options?: string[];
  correct: number | boolean | string;
  explanation: string;
}

interface InteractiveQuestionsProps {
  questions: Question[];
  language: string;
  onComplete: () => void;
}

export default function InteractiveQuestions({ 
  questions, 
  language, 
  onComplete 
}: InteractiveQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | number | boolean }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answer: string | number | boolean) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  const renderQuestion = (question: Question, index: number) => {

    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Question {index + 1}: {question.question}
            </h4>
            
            <div className="space-y-3">
              {question.options?.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedAnswers[index] === optionIndex
                      ? showResults
                        ? optionIndex === question.correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    checked={selectedAnswers[index] === optionIndex}
                    onChange={() => handleAnswerSelect(optionIndex)}
                    disabled={showResults}
                    className="sr-only"
                  />
                  
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[index] === optionIndex
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[index] === optionIndex && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  
                  <span className="text-gray-700">{option}</span>
                  
                  {showResults && selectedAnswers[index] === optionIndex && (
                    <div className="ml-auto">
                      {optionIndex === question.correct ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Question {index + 1}: {question.question}
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              {[true, false].map((option) => (
                <button
                  key={option.toString()}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResults}
                  className={`p-6 rounded-lg border-2 font-medium transition-colors ${
                    selectedAnswers[index] === option
                      ? showResults
                        ? option === question.correct
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-red-500 bg-red-50 text-red-800'
                        : 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {option ? 'True' : 'False'}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Question type not supported yet.</p>
          </div>
        );
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      {renderQuestion(currentQ, currentQuestion)}

      {/* Explanation */}
      {showResults && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Explanation</span>
          </div>
          <p className="text-blue-700 text-sm">{currentQ.explanation}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        {!showResults ? (
          <>
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="w-full flex justify-center">
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Target className="w-4 h-4" />
              Continue to Next Section
            </button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      {showResults && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Checkpoint Complete!</span>
          </div>
          <p className="text-green-700 text-sm">
            You've completed the interactive checkpoint. Great job!
          </p>
        </div>
      )}
    </div>
  );
}
