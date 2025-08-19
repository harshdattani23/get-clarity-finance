"use client";

import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export default function InteractiveQuiz({ questions, onComplete }: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questionResults, setQuestionResults] = useState<Record<number, boolean>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setSelectedAnswer(answerIndex);
    setQuestionResults(prev => ({
      ...prev,
      [currentQuestionIndex]: isCorrect
    }));
    
    if (isCorrect) {
      setScore(prevScore => {
        const newScore = prevScore + 1;
        console.log(`Correct answer! Score updated from ${prevScore} to ${newScore}`);
        return newScore;
      });
    } else {
      console.log(`Wrong answer. Selected: ${answerIndex}, Correct: ${currentQuestion.correctAnswer}. Score remains: ${score}`);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Calculate final score using tracked results
      const finalScore = Object.values(questionResults).filter(result => result).length;
      console.log(`Quiz completed! Final score calculation:`);
      console.log(`- Question results:`, questionResults);
      console.log(`- Correct answers: ${finalScore}`);
      console.log(`- Total questions: ${questions.length}`);
      console.log(`- Final score: ${finalScore}/${questions.length}`);
      setQuizCompleted(true);
      onComplete?.(finalScore, questions.length);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setQuestionResults({});
  };

  if (quizCompleted) {
    const finalScore = Object.values(questionResults).filter(result => result).length;
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    console.log(`Displaying completion screen:`);
    console.log(`- Question results:`, questionResults);
    console.log(`- Final score: ${finalScore}/${questions.length}`);
    console.log(`- Percentage: ${percentage}%`);
    
    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h3>
        <p className="text-gray-600 mb-6">
          You scored {finalScore} out of {questions.length} ({percentage}%)
        </p>
        <div className="space-y-3 mb-6">
          {percentage >= 80 && (
            <p className="text-green-700 font-medium">Excellent! You&apos;ve mastered this concept!</p>
          )}
          {percentage >= 60 && percentage < 80 && (
            <p className="text-blue-700 font-medium">Good job! Keep practicing to improve further.</p>
          )}
          {percentage < 60 && (
            <p className="text-orange-700 font-medium">Keep learning! Review the material and try again.</p>
          )}
        </div>
        <button
          onClick={handleRestartQuiz}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
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

      {/* Question */}
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        {currentQuestion.question}
      </h3>

      {/* Answer options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedAnswer === null
                ? 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                : index === currentQuestion.correctAnswer
                ? 'border-green-500 bg-green-50'
                : selectedAnswer === index
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === null
                  ? 'border-gray-300'
                  : index === currentQuestion.correctAnswer
                  ? 'border-green-500 bg-green-500'
                  : selectedAnswer === index
                  ? 'border-red-500 bg-red-500'
                  : 'border-gray-300'
              }`}>
                {index === currentQuestion.correctAnswer && selectedAnswer !== null && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
                {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                  <XCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="font-medium text-gray-800">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </h4>
          <p className="text-blue-700">{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {showExplanation && (
        <div className="flex justify-end">
          <button
            onClick={handleNextQuestion}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
