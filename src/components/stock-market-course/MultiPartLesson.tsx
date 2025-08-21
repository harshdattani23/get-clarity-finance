"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  SkipForward,
  Trophy,
  Target,
  BarChart3
} from "lucide-react";

interface LessonPart {
  id: string;
  title: string;
  content: React.ReactNode;
  isRequired: boolean;
  minScore?: number; // Required score to proceed (0-100)
  type: 'content' | 'quiz' | 'selection' | 'short-answer' | 'audio' | 'interactive';
  skipAllowed?: boolean;
}

interface MultiPartLessonProps {
  parts: LessonPart[];
  onComplete: (totalScore: number) => void;
  onPartComplete: (partId: string, score: number) => void;
  className?: string;
  // Add a completion callback that child components can call
  onPartCompleteDirect?: (partId: string, score: number) => void;
}

export default function MultiPartLesson({ 
  parts, 
  onComplete, 
  onPartComplete,
  className = "",
  onPartCompleteDirect
}: MultiPartLessonProps) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [completedParts, setCompletedParts] = useState<Set<string>>(new Set());
  const [partScores, setPartScores] = useState<Record<string, number>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentPart = parts[currentPartIndex];
  const isLastPart = currentPartIndex === parts.length - 1;
  const isFirstPart = currentPartIndex === 0;

  // Calculate progress
  const progressPercentage = (completedParts.size / parts.length) * 100;
  const averageScore = Object.values(partScores).length > 0 
    ? Object.values(partScores).reduce((a, b) => a + b, 0) / Object.values(partScores).length 
    : 0;



  // Check if can proceed to next part
  const canProceedToNext = () => {
    if (isLastPart) return false;
    
    const currentPartScore = partScores[currentPart.id];
    const isCurrentPartCompleted = completedParts.has(currentPart.id);
    
    // Check progression logic
    
    // For quiz parts with minimum score requirement
    if (currentPart.type === 'quiz' && currentPart.isRequired && currentPart.minScore !== undefined) {
      const canProceed = currentPartScore !== undefined && currentPartScore >= currentPart.minScore;
      return canProceed;
    }
    
    // For selection parts with minimum score requirement
    if (currentPart.type === 'selection' && currentPart.isRequired && currentPart.minScore !== undefined) {
      const canProceed = currentPartScore !== undefined && currentPartScore >= currentPart.minScore;
      return canProceed;
    }
    
    // For short-answer parts, check if they're completed (no strict score requirement)
    if (currentPart.type === 'short-answer' && currentPart.isRequired) {
      const canProceed = isCurrentPartCompleted;
      return canProceed;
    }
    
    // For interactive parts, check if they're completed
    if (currentPart.type === 'interactive') {
      const canProceed = isCurrentPartCompleted;
      return canProceed;
    }
    
    // For content parts, check if they're completed
    if (currentPart.type === 'content') {
      const canProceed = isCurrentPartCompleted || !currentPart.isRequired;
      return canProceed;
    }
    
    // For audio parts, check if they're completed
    if (currentPart.type === 'audio') {
      const canProceed = isCurrentPartCompleted || !currentPart.isRequired;
      return canProceed;
    }
    
    // Default: check if part is completed or not required
    const canProceed = isCurrentPartCompleted || !currentPart.isRequired;
    return canProceed;
  };

  // Handle part completion
  const handlePartComplete = useCallback((partId: string, score: number) => {
    
    setCompletedParts(prev => {
      const newSet = new Set([...prev, partId]);
      return newSet;
    });
    
    setPartScores(prev => {
      const newScores = { ...prev, [partId]: score };
      return newScores;
    });
    
    setTotalScore(prev => prev + score);
    
    onPartComplete(partId, score);
    
    // Auto-advance if this was the last part
    if (isLastPart) {
      onComplete(totalScore + score);
    }
  }, [totalScore, isLastPart, onPartComplete, onComplete]);

  // Expose the completion handler to child components
  useEffect(() => {
    if (onPartCompleteDirect) {
      // Make the completion handler available globally so child components can call it
      (window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete = handlePartComplete;
    }
    
    return () => {
      delete (window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete;
    };
  }, [onPartCompleteDirect, handlePartComplete]);

  // Navigate to next part
  const goToNextPart = () => {
    if (!canProceedToNext()) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPartIndex(prev => prev + 1);
      setIsTransitioning(false);
    }, 300);
  };

  // Navigate to previous part
  const goToPreviousPart = () => {
    if (isFirstPart) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPartIndex(prev => prev - 1);
      setIsTransitioning(false);
    }, 300);
  };

  // Skip current part
  const skipPart = () => {
    if (!currentPart.skipAllowed) return;
    
    handlePartComplete(currentPart.id, 0); // 0 score for skipped parts
    goToNextPart();
  };

  // Reset lesson
  const resetLesson = () => {
    setCurrentPartIndex(0);
    setCompletedParts(new Set());
    setPartScores({});
    setTotalScore(0);
    setIsTransitioning(false);
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 ${className}`}>
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Part {currentPartIndex + 1} of {parts.length}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">
                {Math.round(averageScore)}/100
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-700">
                {completedParts.size}/{parts.length}
              </span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Part Title */}
        <motion.h3
          key={currentPart.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold text-gray-700 mt-4"
        >
          {currentPart.title}
        </motion.h3>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPart.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {currentPart.content}
          </motion.div>
        </AnimatePresence>
        
        {/* Mark as Complete button for content and audio parts */}
        {(currentPart.type === 'content' || currentPart.type === 'audio') && !completedParts.has(currentPart.id) && (
          <div className="mt-6 text-center">
            <button
              onClick={() => handlePartComplete(currentPart.id, 100)}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              ✓ Mark as Complete
            </button>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Previous Button */}
          <button
            onClick={goToPreviousPart}
            disabled={isFirstPart || isTransitioning}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              isFirstPart || isTransitioning
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {/* Reset Button */}
          <button
            onClick={resetLesson}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Reset Lesson
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Skip Button */}
          {currentPart.skipAllowed && (
            <button
              onClick={skipPart}
              disabled={isTransitioning}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <SkipForward className="w-4 h-4" />
              Skip
            </button>
          )}

          {/* Next Button */}
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={goToNextPart}
              disabled={!canProceedToNext() || isTransitioning}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                canProceedToNext() && !isTransitioning
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLastPart ? 'Complete Lesson' : 'Next Part'}
              <ArrowRight className="w-4 h-4" />
            </button>
            {!canProceedToNext() && !isTransitioning && (
              <div className="text-sm text-gray-600 text-right max-w-xs">
                {currentPart.type === 'interactive' && !completedParts.has(currentPart.id) && (
                  <span>Complete the current section to continue</span>
                )}
                {currentPart.type === 'quiz' && currentPart.minScore !== undefined && (
                  <span>Score at least {currentPart.minScore}/100 to continue</span>
                )}
                {currentPart.type === 'selection' && currentPart.minScore !== undefined && (
                  <span>Score at least {currentPart.minScore}/100 to continue</span>
                )}
                                 {currentPart.type === 'short-answer' && !completedParts.has(currentPart.id) && (
                   <span>Complete the current section to continue</span>
                 )}
                {currentPart.type === 'content' && !completedParts.has(currentPart.id) && (
                  <span>Mark this section as complete to continue</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Part Status Indicators */}
      <div className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {parts.map((part, index) => {
            const isCompleted = completedParts.has(part.id);
            const score = partScores[part.id];
            const isCurrent = index === currentPartIndex;
            
            return (
              <div
                key={part.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50'
                    : isCompleted
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Part {index + 1}
                  </span>
                  {isCompleted && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="text-xs text-gray-600 mb-1">
                  {part.title}
                </div>
                {isCompleted && score !== undefined && (
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-700">
                      {score}/100
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
