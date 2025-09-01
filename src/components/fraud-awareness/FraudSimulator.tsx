"use client";

import { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Shield,
  ChevronRight,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Scenario {
  id: number;
  title: string;
  description: string;
  isScam: boolean;
  explanation: string;
}

interface FraudSimulatorProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

// 3 carefully selected scenarios for the simplified simulator
const simulatorScenarios: Scenario[] = [
  {
    id: 1,
    title: "WhatsApp Stock Tip",
    description: "You receive a WhatsApp message from an unknown number with a tip about a small-cap stock that is guaranteed to double in the next 3 days. The sender provides a link to a website with a professional-looking but unfamiliar logo.",
    isScam: true,
    explanation: "This is a classic pump-and-dump scheme. The guaranteed high returns, unsolicited tip, and unfamiliar website are all major red flags. The scammers are trying to artificially inflate the stock price to sell their own shares at a profit."
  },
  {
    id: 2,
    title: "SEBI-Registered Advisor",
    description: "Your SEBI-registered investment advisor recommends a diversified portfolio of blue-chip stocks and mutual funds based on your long-term financial goals and risk tolerance. They provide you with a detailed investment proposal and a clear fee structure.",
    isScam: false,
    explanation: "This is a legitimate investment advisory practice. The advisor is registered with SEBI, the recommendations are based on your personal financial situation, and the process is transparent."
  },
  {
    id: 3,
    title: "High Daily Returns App",
    description: "An advertisement on social media promotes a new trading app that promises 5% daily returns through algorithmic trading. To get started, you need to deposit a minimum of ₹25,000.",
    isScam: true,
    explanation: "Promises of guaranteed high daily returns are a huge red flag. Legitimate investments always carry risk. This is likely a fake trading app designed to steal your deposit."
  }
];

export default function FraudSimulator({ onComplete, isCompleted }: FraudSimulatorProps) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<'scam' | 'not_scam' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleChoice = (choice: 'scam' | 'not_scam') => {
    setUserChoice(choice);
    setShowResult(true);

    const currentScenario = simulatorScenarios[currentScenarioIndex];
    const isCorrect = 
      (choice === 'scam' && currentScenario.isScam) || 
      (choice === 'not_scam' && !currentScenario.isScam);

    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 10);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const nextScenario = () => {
    if (currentScenarioIndex < simulatorScenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setUserChoice(null);
      setShowResult(false);
    } else {
      // Game complete
      setGameComplete(true);
      if (onComplete && !isCompleted) {
        onComplete();
      }
    }
  };

  // Show completion state if already completed
  if (isCompleted && !gameComplete) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Simulator Completed!</h3>
        <p className="text-gray-600">You have already completed the fraud detection simulator.</p>
      </div>
    );
  }

  const currentScenario = simulatorScenarios[currentScenarioIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Fraud Detection Simulator
          </h2>
          <div className="text-center">
            <p className="text-xs text-blue-200">Score</p>
            <p className="text-xl font-bold">{score}/30</p>
          </div>
        </div>
        <p className="text-blue-100">
          {gameComplete ? 'Challenge Complete!' : `Question ${currentScenarioIndex + 1} of ${simulatorScenarios.length}`}
        </p>
      </div>

      {gameComplete ? (
        /* Final Results */
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">🎉 Simulator Complete!</h3>
          <div className="text-6xl mb-4">
            {score === 30 ? '🏆' : score >= 20 ? '🥈' : '🥉'}
          </div>
          <p className="text-xl text-gray-700 mb-2">Final Score: <span className="font-bold text-blue-600">{score}/30</span></p>
          <p className="text-gray-600 mb-6">
            You got {answers.filter(Boolean).length} out of {simulatorScenarios.length} scenarios correct!
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800 font-medium">
              {score === 30 
                ? "Perfect! You have excellent fraud detection skills! 🌟"
                : score >= 20 
                ? "Great job! You can spot most fraud attempts. Keep learning! 👍"
                : "Good start! Review the explanations to improve your fraud detection skills. 📚"}
            </p>
          </div>
        </div>
      ) : (
        /* Scenario Card */
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">{currentScenarioIndex + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{currentScenario.title}</h3>
            </div>
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
                    <span className="font-semibold text-green-800">Correct! +10 XP</span>
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

              <button
                onClick={nextScenario}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {currentScenarioIndex < simulatorScenarios.length - 1 ? 'Next Question' : 'Complete Simulator'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}