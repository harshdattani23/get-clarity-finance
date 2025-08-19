"use client";

import { useState } from 'react';
import { ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';

interface ShortQuestion {
  id: string;
  question: string;
  hint?: string;
  correctAnswer: string;
  explanation: string;
}

interface ShortQuestionsProps {
  title: string;
  description: string;
  questions: ShortQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export default function ShortQuestions({ 
  title, 
  description, 
  questions, 
  onComplete 
}: ShortQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestion.id] || '';

  const handleAnswerChange = (answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      setCompleted(true);
      
      const score = questions.reduce((acc, question) => {
        const userAnswer = userAnswers[question.id] || '';
        const isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
        return acc + (isCorrect ? 1 : 0);
      }, 0);
      
      onComplete?.(score, questions.length);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowHint({});
    setShowResults(false);
    setCompleted(false);
  };

  const toggleHint = () => {
    setShowHint(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const getScore = () => {
    return questions.reduce((acc, question) => {
      const userAnswer = userAnswers[question.id] || '';
      const isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
      return acc + (isCorrect ? 1 : 0);
    }, 0);
  };

  if (completed && showResults) {
    const score = getScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Questions Complete!</h3>
        <p className="text-gray-600 mb-6">
          You answered {score} out of {questions.length} questions correctly ({percentage}%)
        </p>
        
        <div className="space-y-4 mb-6 text-left">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[question.id] || '';
            const isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
            
            return (
              <div key={question.id} className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Question {index + 1}: {question.question}
                </h4>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Your answer:</span> {userAnswer || 'No answer provided'}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                  </p>
                  <div className={`text-sm p-2 rounded ${
                    isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <span className="font-medium">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                    <p className="mt-1">{question.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <div className="flex space-x-1">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentQuestionIndex
                  ? 'bg-green-500'
                  : index < currentQuestionIndex
                  ? 'bg-green-300'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current question */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-800 mb-4">
          {currentQuestion.question}
        </h4>
        
        <div className="space-y-4">
          <textarea
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows={3}
          />
          
          {currentQuestion.hint && (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleHint}
                className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Lightbulb className="w-4 h-4" />
                {showHint[currentQuestion.id] ? 'Hide Hint' : 'Show Hint'}
              </button>
              {showHint[currentQuestion.id] && (
                <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                  {currentQuestion.hint}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={handleNextQuestion}
          disabled={!currentAnswer.trim()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
