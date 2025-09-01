"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Target, Trophy } from 'lucide-react';

interface MatchPair {
  id: string;
  fraudType: string;
  warningSign: string;
  color: string;
}

interface FraudMatchingGameProps {
  onComplete: (score: number) => void;
  isCompleted: boolean;
}

export default function FraudMatchingGame({ onComplete, isCompleted }: FraudMatchingGameProps) {
  const matchPairs: MatchPair[] = [
    { 
      id: '1', 
      fraudType: 'Ponzi Scheme', 
      warningSign: 'Guaranteed high returns with "no risk"', 
      color: 'bg-red-100 border-red-300' 
    },
    { 
      id: '2', 
      fraudType: 'Pump & Dump', 
      warningSign: 'Sudden price spikes with heavy promotion', 
      color: 'bg-orange-100 border-orange-300' 
    },
    { 
      id: '3', 
      fraudType: 'Fake Advisor', 
      warningSign: 'Unregistered "experts" promising secrets', 
      color: 'bg-purple-100 border-purple-300' 
    },
  ];

  const [matches, setMatches] = useState<{[key: string]: string}>({});
  const [shuffledWarnings, setShuffledWarnings] = useState<MatchPair[]>([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    // Shuffle warning signs
    const shuffled = [...matchPairs].sort(() => Math.random() - 0.5);
    setShuffledWarnings(shuffled);
  }, []);

  const handleDragStart = (e: React.DragEvent, warningId: string) => {
    setDraggedItem(warningId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, fraudTypeId: string) => {
    e.preventDefault();
    if (draggedItem) {
      const newMatches = { ...matches, [fraudTypeId]: draggedItem };
      setMatches(newMatches);
      setDraggedItem(null);
      
      // Check if all matches are made
      if (Object.keys(newMatches).length === matchPairs.length) {
        checkAnswers(newMatches);
      }
    }
  };

  const checkAnswers = (finalMatches: {[key: string]: string}) => {
    let correctCount = 0;
    matchPairs.forEach(pair => {
      if (finalMatches[pair.id] === pair.id) {
        correctCount++;
      }
    });
    
    const finalScore = Math.round((correctCount / matchPairs.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    if (!isCompleted) {
      setTimeout(() => onComplete(finalScore), 1000);
    }
  };

  const resetGame = () => {
    setMatches({});
    setScore(0);
    setShowResults(false);
    const shuffled = [...matchPairs].sort(() => Math.random() - 0.5);
    setShuffledWarnings(shuffled);
  };

  if (isCompleted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
          <Trophy className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">Challenge Completed! +25 XP</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          <strong>How to play:</strong> Drag each warning sign to its matching fraud type. Get them all right to earn XP!
        </p>
      </div>

      {/* Game Area */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Fraud Types (Drop Zones) */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">Fraud Types</h4>
          {matchPairs.map((pair) => (
            <motion.div
              key={pair.id}
              className={`p-4 border-2 border-dashed rounded-lg transition-all ${
                matches[pair.id] ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, pair.id)}
              whileHover={{ scale: 1.02 }}
            >
              <h5 className="font-medium text-gray-800 mb-2">{pair.fraudType}</h5>
              
              {matches[pair.id] ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-3 rounded-lg ${pair.color} border`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {matchPairs.find(p => p.id === matches[pair.id])?.warningSign}
                    </span>
                    {showResults && matches[pair.id] === pair.id && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    {showResults && matches[pair.id] !== pair.id && (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="p-3 border border-dashed border-gray-400 rounded-lg text-center text-gray-500">
                  Drop warning sign here
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Warning Signs (Draggable) */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">Warning Signs</h4>
          {shuffledWarnings.map((pair) => {
            const isMatched = Object.values(matches).includes(pair.id);
            
            if (isMatched) return null;
            
            return (
              <motion.div
                key={pair.id}
                draggable
                onDragStart={(e: any) => handleDragStart(e as React.DragEvent<HTMLDivElement>, pair.id)}
                className={`p-4 border rounded-lg cursor-move transition-all hover:shadow-md ${pair.color} border-2`}
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1, rotate: 5 }}
              >
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">{pair.warningSign}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-4"
          >
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${
              score >= 80 ? 'bg-green-100 border border-green-300' : 'bg-orange-100 border border-orange-300'
            }`}>
              {score >= 80 ? (
                <Trophy className="w-5 h-5 text-green-600" />
              ) : (
                <Target className="w-5 h-5 text-orange-600" />
              )}
              <span className={`font-semibold ${score >= 80 ? 'text-green-700' : 'text-orange-700'}`}>
                Score: {score}% {score >= 80 ? '🎉 Excellent!' : '💪 Try again!'}
              </span>
            </div>
            
            {score < 100 && (
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
