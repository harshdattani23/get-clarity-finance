"use client";

import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Shield,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import scenarios from '@/data/fraud-scenarios.json';

interface Scenario {
  id: number;
  description: string;
  isScam: boolean;
  explanation: string;
}

export default function FraudSimulator() {
  const [gameScenarios, setGameScenarios] = useState<Scenario[]>([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<'scam' | 'not_scam' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Shuffle scenarios and pick 5
    const shuffled = [...scenarios].sort(() => 0.5 - Math.random());
    setGameScenarios(shuffled.slice(0, 5));
  }, []);

  const handleChoice = (choice: 'scam' | 'not_scam') => {
    setUserChoice(choice);
    setShowResult(true);

    const currentScenario = gameScenarios[currentScenarioIndex];
    const isCorrect = 
      (choice === 'scam' && currentScenario.isScam) || 
      (choice === 'not_scam' && !currentScenario.isScam);

    if (isCorrect) {
      setScore(score + 10);
      setStreak(streak + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setStreak(0);
    }
  };

  const nextScenario = () => {
    if (currentScenarioIndex < gameScenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setUserChoice(null);
      setShowResult(false);
    }
  };

  if (gameScenarios.length === 0) {
    return <div>Loading scenarios...</div>;
  }

  const currentScenario = gameScenarios[currentScenarioIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Fraud Detection Simulator
          </h2>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-xs text-blue-200">Score</p>
              <p className="text-xl font-bold">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-blue-200">Streak</p>
              <p className="text-xl font-bold">🔥 {streak}</p>
            </div>
          </div>
        </div>
        <p className="text-blue-100">
          Scenario {currentScenarioIndex + 1} of {gameScenarios.length}
        </p>
      </div>

      {/* Scenario Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <p className="text-gray-700 text-lg mb-6">{currentScenario.description}</p>

          {!showResult && (
            <div className="flex gap-4">
              <button
                onClick={() => handleChoice('scam')}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-5 h-5" />
                This is a Scam
              </button>
              <button
                onClick={() => handleChoice('not_scam')}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                This is Not a Scam
              </button>
            </div>
          )}

          {showResult && (
            <div className={`rounded-lg p-4 ${
              (userChoice === 'scam' && currentScenario.isScam) || 
              (userChoice === 'not_scam' && !currentScenario.isScam)
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {((userChoice === 'scam' && currentScenario.isScam) || 
                  (userChoice === 'not_scam' && !currentScenario.isScam)) ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Correct! +10 points</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">
                      Incorrect. This is {currentScenario.isScam ? 'a scam' : 'not a scam'}.
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm text-gray-700 mb-4">{currentScenario.explanation}</p>

              {currentScenarioIndex < gameScenarios.length - 1 ? (
                <button
                  onClick={nextScenario}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Next Scenario
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    🎉 Simulation Complete!
                  </p>
                  <p className="text-gray-600">
                    Final Score: {score} points
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}