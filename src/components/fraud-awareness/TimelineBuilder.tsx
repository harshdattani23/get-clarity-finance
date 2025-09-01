"use client";

import React, { useState, useEffect } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, ArrowUp, ArrowDown, Trophy, RotateCcw } from 'lucide-react';

interface TimelineEvent {
  id: string;
  text: string;
  stage: 'early' | 'middle' | 'end';
}

interface TimelineBuilderProps {
  events: TimelineEvent[];
  onComplete: () => void;
  isCompleted: boolean;
}

export default function TimelineBuilder({ events, onComplete, isCompleted }: TimelineBuilderProps) {
  const [orderedEvents, setOrderedEvents] = useState<TimelineEvent[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Shuffle events initially
    const shuffled = [...events].sort(() => Math.random() - 0.5);
    setOrderedEvents(shuffled);
  }, [events]);

  const correctOrder = ['3', '1', '2', '4', '5']; // Based on Ponzi scheme progression

  const checkOrder = () => {
    const currentOrder = orderedEvents.map(event => event.id);
    const correct = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
    
    setIsCorrect(correct);
    setShowResult(true);
    setAttempts(prev => prev + 1);
    
    if (correct && !isCompleted) {
      // Show celebration immediately
      setShowCelebration(true);
      
      setTimeout(() => {
        onComplete();
        setShowCelebration(false);
      }, 2500); // Extended time for celebration
    }
  };

  const resetTimeline = () => {
    const shuffled = [...events].sort(() => Math.random() - 0.5);
    setOrderedEvents(shuffled);
    setShowResult(false);
    setIsCorrect(false);
    setShowCelebration(false);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'early': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'middle': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'end': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getStageIcon = (index: number) => {
    if (index < 2) return '🌱'; // Early stage
    if (index < 4) return '📈'; // Growth/middle stage
    return '💥'; // End/collapse stage
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="inline-flex items-center gap-2 px-6 py-4 bg-indigo-100/95 backdrop-blur-sm border border-indigo-300 rounded-lg shadow-lg">
          <Trophy className="w-6 h-6 text-indigo-600" />
          <span className="text-indigo-700 font-semibold text-lg">Timeline Mastered! +25 XP</span>
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
              {/* Skeleton Instructions */}
              <div className="bg-gray-200 rounded-lg p-4 animate-pulse">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
                  <div className="w-32 h-4 bg-gray-300 rounded animate-pulse" />
                </div>
                <div className="w-full h-3 bg-gray-300 rounded animate-pulse" />
              </div>
              
              {/* Skeleton Timeline Container */}
              <div className="bg-gray-200 rounded-lg p-6 animate-pulse">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-40 h-5 bg-gray-300 rounded animate-pulse" />
                  <div className="w-20 h-4 bg-gray-300 rounded animate-pulse" />
                </div>
                
                {/* Skeleton Timeline Events */}
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border-2 border-gray-300 rounded-lg">
                      <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="w-full h-4 bg-gray-300 rounded animate-pulse" />
                        <div className="w-20 h-3 bg-gray-300 rounded animate-pulse" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="w-3 h-3 bg-gray-300 rounded animate-pulse" />
                        <div className="w-3 h-3 bg-gray-300 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <div className="w-40 h-10 bg-gray-300 rounded-lg animate-pulse mx-auto" />
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
              className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white rounded-full p-8 shadow-2xl"
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
                  Timeline Mastered!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg font-semibold"
                >
                  +25 XP
                </motion.p>
                
                {/* Clock Confetti Effect */}
                <motion.div className="absolute inset-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
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
                        i % 5 === 0 ? 'bg-yellow-400' :
                        i % 5 === 1 ? 'bg-blue-400' :
                        i % 5 === 2 ? 'bg-pink-400' :
                        i % 5 === 3 ? 'bg-green-400' : 'bg-purple-400'
                      }`}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Instructions */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span className="font-medium text-indigo-800">Timeline Challenge</span>
        </div>
        <p className="text-indigo-700 text-sm">
          Drag and drop the events to arrange them in chronological order. How a Ponzi scheme typically unfolds:
        </p>
      </div>

      {/* Timeline Container */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-semibold text-gray-800">Ponzi Scheme Timeline</h4>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Attempts: {attempts}</span>
            <button
              onClick={resetTimeline}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Reset timeline"
            >
              <RotateCcw className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Draggable Timeline Events */}
        <Reorder.Group
          values={orderedEvents}
          onReorder={setOrderedEvents}
          className="space-y-3"
        >
          {orderedEvents.map((event, index) => (
            <Reorder.Item
              key={event.id}
              value={event}
              className="cursor-grab active:cursor-grabbing"
            >
              <motion.div
                className={`flex items-center gap-4 p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                  showResult && isCorrect 
                    ? 'border-green-400 bg-green-50'
                    : showResult && !isCorrect
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                whileHover={{ scale: 1.02 }}
                whileDrag={{ scale: 1.05, rotate: 2 }}
              >
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    showResult && isCorrect 
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                </div>

                {/* Event Text */}
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{event.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg">{getStageIcon(index)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStageColor(event.stage)}`}>
                      {event.stage} stage
                    </span>
                  </div>
                </div>

                {/* Drag Handle */}
                <div className="flex-shrink-0 flex flex-col gap-1">
                  <ArrowUp className="w-3 h-3 text-gray-400" />
                  <ArrowDown className="w-3 h-3 text-gray-400" />
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Check Button */}
        {!showResult && (
          <div className="text-center mt-6">
            <motion.button
              onClick={checkOrder}
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Check Timeline Order
            </motion.button>
          </div>
        )}

        {/* Results */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            {isCorrect ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 border border-green-300 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-semibold">
                  Perfect! You understand the Ponzi scheme timeline! 🎉
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-100 border border-orange-300 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="text-orange-700 font-semibold">
                    Not quite right. Think about how the scheme develops over time! 🤔
                  </span>
                </div>
                <button
                  onClick={resetTimeline}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Timeline Legend */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h5 className="font-medium text-gray-800 mb-3">Timeline Stages:</h5>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <span className="px-2 py-1 rounded-full border bg-blue-100 border-blue-300 text-blue-800">Early</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📈</span>
            <span className="px-2 py-1 rounded-full border bg-orange-100 border-orange-300 text-orange-800">Growth</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">💥</span>
            <span className="px-2 py-1 rounded-full border bg-red-100 border-red-300 text-red-800">Collapse</span>
          </div>
        </div>
      </div>
    </div>
  );
}
