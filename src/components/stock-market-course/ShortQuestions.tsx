"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, RotateCcw, Lightbulb, Loader2 } from 'lucide-react';

interface ShortQuestion {
  id: string;
  question: string;
  hint?: string;
  correctAnswer: string;
  explanation: string;
}

interface ScoringResult {
  score: number;
  feedback: string;
  confidence: 'high' | 'medium' | 'low';
  keyPoints: string[];
  suggestions: string[];
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
  const [isScoring, setIsScoring] = useState(false);
  const [scoringResults, setScoringResults] = useState<Record<string, ScoringResult>>({});

  // Cleanup timeout when component unmounts or question changes
  useEffect(() => {
    return () => {
      if ((window as unknown as { scoringTimeout?: NodeJS.Timeout }).scoringTimeout) {
        clearTimeout((window as unknown as { scoringTimeout: NodeJS.Timeout }).scoringTimeout);
      }
    };
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestion.id] || '';

  const handleAnswerChange = (answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
    
    // Clear any existing timeout
    if ((window as unknown as { scoringTimeout?: NodeJS.Timeout }).scoringTimeout) {
      clearTimeout((window as unknown as { scoringTimeout: NodeJS.Timeout }).scoringTimeout);
    }
    
    // Auto-score the answer when it's long enough and not already scored
    if (answer.length >= 20 && !scoringResults[currentQuestion.id] && !isScoring) {
      // Debounce the scoring to avoid too many API calls
      (window as unknown as { scoringTimeout?: NodeJS.Timeout }).scoringTimeout = setTimeout(async () => {
        // Check if the answer is still the same and not already scored
        if (userAnswers[currentQuestion.id] === answer && !scoringResults[currentQuestion.id] && !isScoring) {
          setIsScoring(true);
          try {
            const scoring = await scoreAnswer(currentQuestion, answer);
            setScoringResults(prev => ({
              ...prev,
              [currentQuestion.id]: scoring
            }));
          } catch (error) {
            console.error('Error auto-scoring answer:', error);
          } finally {
            setIsScoring(false);
          }
        }
      }, 2000); // Wait 2 seconds after user stops typing
    }
  };

  const scoreAnswer = async (question: ShortQuestion, userAnswer: string): Promise<ScoringResult> => {
    try {
      const response = await fetch('/api/score-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.question,
          userAnswer,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to score answer');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error scoring answer:', error);
      // Fallback to simple scoring if API fails
      const isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
      return {
        score: isCorrect ? 100 : 0,
        feedback: isCorrect ? 'Correct answer!' : 'Incorrect answer. Please review the explanation.',
        confidence: 'medium',
        keyPoints: isCorrect ? ['Correct understanding'] : ['Needs review'],
        suggestions: isCorrect ? ['Great job!'] : ['Review the material and try again'],
      };
    }
  };

  const handleNextQuestion = async () => {
    console.log('handleNextQuestion called, current question:', currentQuestion.id);
    console.log('Current scoring results:', scoringResults);
    
    if (currentQuestionIndex < questions.length - 1) {
      // Score current question before moving to next
      if (userAnswers[currentQuestion.id] && !scoringResults[currentQuestion.id]) {
        console.log('Scoring current question before moving to next');
        setIsScoring(true);
        try {
          const scoring = await scoreAnswer(currentQuestion, userAnswers[currentQuestion.id]);
          console.log('Got scoring result:', scoring);
          setScoringResults(prev => {
            const newResults = { ...prev, [currentQuestion.id]: scoring };
            console.log('Updated scoring results:', newResults);
            return newResults;
          });
        } catch (error) {
          console.error('Error scoring current question:', error);
        } finally {
          setIsScoring(false);
        }
      }
      
      // Add a small delay to ensure scoring result is displayed
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500);
    } else {
      // Score the last question before showing results
      setIsScoring(true);
      try {
        const lastQuestion = questions[currentQuestionIndex];
        const lastAnswer = userAnswers[lastQuestion.id] || '';
        const lastScoring = await scoreAnswer(lastQuestion, lastAnswer);
        
        setScoringResults(prev => ({
          ...prev,
          [lastQuestion.id]: lastScoring
        }));
        
        setShowResults(true);
        setCompleted(true);
        
        // Calculate total score from all scoring results
        const allQuestions = [...questions];
        const totalScore = allQuestions.reduce((acc, question) => {
          const scoring = scoringResults[question.id];
          return acc + (scoring ? scoring.score : 0);
        }, 0) + lastScoring.score;
        
        const averageScore = totalScore / questions.length;
        onComplete?.(Math.round(averageScore), 100);
      } catch (error) {
        console.error('Error scoring final question:', error);
        // Fallback to simple scoring
        const score = questions.reduce((acc, question) => {
          const userAnswer = userAnswers[question.id] || '';
          const isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
          return acc + (isCorrect ? 1 : 0);
        }, 0);
        
        onComplete?.(score, questions.length);
        setShowResults(true);
        setCompleted(true);
      } finally {
        setIsScoring(false);
      }
    }
  };

  const handlePreviousQuestion = async () => {
    if (currentQuestionIndex > 0) {
      // Score current question before moving back
      const currentQuestion = questions[currentQuestionIndex];
      const currentAnswer = userAnswers[currentQuestion.id] || '';
      
      if (currentAnswer.trim() && !scoringResults[currentQuestion.id]) {
        setIsScoring(true);
        try {
          const scoring = await scoreAnswer(currentQuestion, currentAnswer);
          setScoringResults(prev => ({
            ...prev,
            [currentQuestion.id]: scoring
          }));
        } catch (error) {
          console.error('Error scoring current question:', error);
        } finally {
          setIsScoring(false);
        }
      }
      
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowHint({});
    setShowResults(false);
    setCompleted(false);
    setScoringResults({});
  };

  const toggleHint = () => {
    setShowHint(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const getScore = () => {
    return questions.reduce((acc, question) => {
      const scoring = scoringResults[question.id];
      return acc + (scoring ? scoring.score : 0);
    }, 0);
  };

  if (completed && showResults) {
    const totalScore = getScore();
    const averageScore = Math.round(totalScore / questions.length);
    
    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">
          {averageScore >= 80 ? '🎉' : averageScore >= 60 ? '👍' : '📚'}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Questions Complete!</h3>
        <p className="text-gray-600 mb-6">
          Your average score: {averageScore}/100
        </p>
        
        <div className="space-y-4 mb-6 text-left">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[question.id] || '';
            const scoring = scoringResults[question.id];
            
            return (
              <div key={question.id} className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Question {index + 1}: {question.question}
                </h4>
                <div className="space-y-3">
                  <p className="text-sm">
                    <span className="font-medium">Your answer:</span> {userAnswer || 'No answer provided'}
                  </p>
                  
                  {scoring ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Score:</span>
                        <span className={`text-lg font-bold ${
                          scoring.score >= 80 ? 'text-green-600' : 
                          scoring.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {scoring.score}/100
                        </span>
                        <span className="text-xs text-gray-500">({scoring.confidence} confidence)</span>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded border border-blue-200">
                        <p className="text-sm text-blue-800 font-medium mb-1">AI Feedback:</p>
                        <p className="text-sm text-blue-700">{scoring.feedback}</p>
                      </div>
                      
                      {scoring.keyPoints.length > 0 && (
                        <div className="bg-green-50 p-3 rounded border border-green-200">
                          <p className="text-sm text-green-800 font-medium mb-1">Key Points:</p>
                          <ul className="text-sm text-green-700">
                            {scoring.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {scoring.suggestions.length > 0 && (
                        <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                          <p className="text-sm text-yellow-800 font-medium mb-1">Suggestions:</p>
                          <ul className="text-sm text-yellow-700">
                            {scoring.suggestions.map((suggestion, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-yellow-600 mt-1">💡</span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <p className="text-sm text-gray-600">Answer not yet scored</p>
                    </div>
                  )}
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
          <div className="space-y-2">
            <textarea
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Type your answer here... (minimum 20 characters)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={3}
              maxLength={500}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{currentAnswer.length}/500 characters</span>
              <span className={currentAnswer.length < 20 ? 'text-red-500' : 'text-green-500'}>
                {currentAnswer.length < 20 ? 'Minimum 20 characters required' : '✓ Good length'}
              </span>
            </div>
          </div>
          
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
          
          {/* Real-time scoring display */}
          {scoringResults[currentQuestion.id] && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-green-800">AI Assessment</h5>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600">Score:</span>
                  <span className={`text-lg font-bold ${
                    scoringResults[currentQuestion.id].score >= 80 ? 'text-green-600' : 
                    scoringResults[currentQuestion.id].score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {scoringResults[currentQuestion.id].score}/100
                  </span>
                </div>
              </div>
              <p className="text-sm text-green-700 mb-2">
                {scoringResults[currentQuestion.id].feedback}
              </p>
              {scoringResults[currentQuestion.id].keyPoints.length > 0 && (
                <div className="text-xs text-green-600">
                  <span className="font-medium">Key points: </span>
                  {scoringResults[currentQuestion.id].keyPoints.join(', ')}
                </div>
              )}
            </div>
          )}
          
          {/* Manual scoring button for answers that haven't been scored yet */}
          {currentAnswer.length >= 20 && !scoringResults[currentQuestion.id] && !isScoring && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-blue-700">
                  <span className="font-medium">Ready to score?</span>
                  <p className="text-xs mt-1">Your answer meets the minimum length requirement</p>
                </div>
                <button
                  onClick={async () => {
                    setIsScoring(true);
                    try {
                      const scoring = await scoreAnswer(currentQuestion, currentAnswer);
                      setScoringResults(prev => ({
                        ...prev,
                        [currentQuestion.id]: scoring
                      }));
                    } catch (error) {
                      console.error('Error scoring answer:', error);
                    } finally {
                      setIsScoring(false);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Score Answer
                </button>
              </div>
            </div>
          )}
          
          {/* Scoring indicator */}
          {isScoring && (
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
              <Loader2 className="w-4 h-4 animate-spin" />
              AI is analyzing your answer...
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={handleNextQuestion}
          disabled={!currentAnswer.trim() || currentAnswer.length < 20 || isScoring}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isScoring ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Scoring...
            </>
          ) : (
            <>
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
