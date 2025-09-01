"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Trophy,
  MessageCircle,
  Phone,
  DollarSign,
  TrendingUp,
  Brain,
  Shield,
  Target,
  Clock,
  Users,
  Lock
} from 'lucide-react';

interface RedFlagScenario {
  id: number;
  title: string;
  detailedScenario: string;
  character: string;
  setting: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
    icon: React.ReactNode;
  }[];
  correctAnswer: string;
  learningPoint: string;
}

interface ProgressiveRedFlagQuizProps {
  scenarios: RedFlagScenario[];
  onComplete: (scenarioId: number) => void;
  completedScenarios: Set<string>;
}

export default function ProgressiveRedFlagQuiz({ 
  scenarios, 
  onComplete, 
  completedScenarios 
}: ProgressiveRedFlagQuizProps) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showLearning, setShowLearning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const scenario = scenarios[currentScenario];
  const isCompleted = completedScenarios.has(`red-flag-intro-${scenario.id}`);

  const handleRevealOptions = () => {
    setShowOptions(true);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowResults(true);
    
    // If correct answer and not already completed, award XP
    if (scenario.options[optionIndex].isCorrect && !isCompleted) {
      // Show celebration immediately
      setShowCelebration(true);
      
      setTimeout(() => {
        onComplete(scenario.id);
        setShowLearning(true);
        setShowCelebration(false);
      }, 2500); // Extended time for celebration
    } else {
      setTimeout(() => setShowLearning(true), 1500);
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      resetScenario();
    }
  };

  const prevScenario = () => {
    if (currentScenario > 0) {
      setCurrentScenario(prev => prev - 1);
      resetScenario();
    }
  };

  const resetScenario = () => {
    setShowOptions(false);
    setSelectedOption(null);
    setShowResults(false);
    setShowLearning(false);
    setShowCelebration(false);
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-50/95 to-emerald-50/95 backdrop-blur-sm rounded-lg p-6 border border-green-200 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800">Scenario {scenario.id} Completed!</h3>
            <p className="text-sm text-green-600">You've mastered this red flag detection (+15 XP)</p>
          </div>
        </div>
        
        <div className="bg-white/90 rounded-lg p-4 border border-green-200">
          <h4 className="font-medium text-gray-800 mb-2">🎯 Key Learning:</h4>
          <p className="text-sm text-gray-700">{scenario.learningPoint}</p>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={prevScenario}
            disabled={currentScenario === 0}
            className="px-4 py-2 bg-gray-200/90 text-gray-700 rounded-lg hover:bg-gray-300/90 disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={nextScenario}
            disabled={currentScenario === scenarios.length - 1}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
          >
            Next Scenario
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* XP Celebration Overlay with Background Skeleton */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center"
          >
            {/* Skeleton Background */}
            <div className="absolute inset-0 p-6 space-y-4 opacity-30">
              {/* Skeleton Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
                  <div className="w-32 h-4 bg-gray-300 rounded animate-pulse" />
                </div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>
              
              {/* Skeleton Card */}
              <div className="bg-gray-200 rounded-lg p-6 animate-pulse">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="w-48 h-5 bg-gray-300 rounded animate-pulse" />
                    <div className="w-32 h-3 bg-gray-300 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-20 bg-gray-300 rounded animate-pulse" />
                  <div className="w-40 h-8 bg-gray-300 rounded animate-pulse mx-auto" />
                </div>
              </div>
            </div>
            
            {/* XP Celebration */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                duration: 0.6
              }}
              className="bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-full p-8 shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: 3,
                    delay: 0.3
                  }}
                >
                  <Trophy className="w-12 h-12 mx-auto mb-2" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-bold"
                >
                  Challenge Completed!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg font-semibold"
                >
                  +15 XP
                </motion.p>
                
                {/* Confetti Effect */}
                <motion.div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 1,
                        scale: 0,
                        x: 0,
                        y: 0
                      }}
                      animate={{
                        opacity: [1, 1, 0],
                        scale: [0, 1, 0.5],
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        rotate: Math.random() * 360
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.8 + i * 0.1,
                        ease: "easeOut"
                      }}
                      className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${
                        i % 4 === 0 ? 'bg-yellow-400' :
                        i % 4 === 1 ? 'bg-blue-400' :
                        i % 4 === 2 ? 'bg-pink-400' : 'bg-purple-400'
                      }`}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scenario Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span className="font-medium text-gray-800">Scenario {scenario.id} of {scenarios.length}</span>
        </div>
        <div className="flex gap-2">
          {scenarios.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentScenario ? 'bg-red-500' :
                completedScenarios.has(`red-flag-intro-${scenarios[index].id}`) ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Detailed Scenario Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-6 border border-red-200"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-800 mb-1">{scenario.title}</h3>
            <div className="flex items-center gap-4 text-sm text-red-600 mb-3">
              <span>👤 {scenario.character}</span>
              <span>📍 {scenario.setting}</span>
            </div>
          </div>
        </div>

        {/* Detailed Story */}
        <div className="bg-white rounded-lg p-4 border border-red-200 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">The Situation:</span>
          </div>
          <p className="text-gray-800 leading-relaxed">{scenario.detailedScenario}</p>
        </div>

        {/* Reveal Options Button */}
        {!showOptions && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleRevealOptions}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
              What's the Red Flag?
            </button>
            <p className="text-xs text-red-600 mt-2">Think carefully about what seems suspicious...</p>
          </motion.div>
        )}

        {/* Progressive Options Reveal */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <h4 className="font-medium text-gray-800 mb-4">🤔 What's the biggest red flag here?</h4>
              
              {scenario.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  onClick={() => handleOptionSelect(index)}
                  disabled={selectedOption !== null}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                    selectedOption === null
                      ? 'border-gray-300 hover:border-red-300 hover:bg-red-50'
                      : selectedOption === index
                      ? option.isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectedOption === index && showResults
                        ? option.isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {selectedOption === index && showResults ? (
                        option.isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
                      ) : (
                        option.icon
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{option.text}</p>
                      {selectedOption === index && showResults && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`text-sm mt-2 ${
                            option.isCorrect ? 'text-green-700' : 'text-red-700'
                          }`}
                        >
                          {option.explanation}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning Point */}
        <AnimatePresence>
          {showLearning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Key Learning Point:</span>
              </div>
              <p className="text-blue-700 text-sm">{scenario.learningPoint}</p>
              
              {selectedOption !== null && scenario.options[selectedOption].isCorrect && !isCompleted && (
                <div className="flex items-center gap-2 mt-3 p-2 bg-green-100 rounded border border-green-300">
                  <Trophy className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-medium text-sm">Great job! +15 XP earned!</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      {showLearning && (
        <div className="flex justify-between">
          <button
            onClick={prevScenario}
            disabled={currentScenario === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={nextScenario}
            disabled={currentScenario === scenarios.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            Next Scenario
          </button>
        </div>
      )}
    </div>
  );
}
