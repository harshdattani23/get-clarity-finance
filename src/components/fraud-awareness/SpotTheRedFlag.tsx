"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface Scenario {
  id: number;
  text: string;
  options: string[];
  answer: string;
}

interface SpotTheRedFlagProps {
  scenarios: Scenario[];
  onScenarioComplete?: (scenarioId: number, isCorrect: boolean) => void;
}

export default function SpotTheRedFlag({ scenarios, onScenarioComplete }: SpotTheRedFlagProps) {
  const [selected, setSelected] = useState<{ [key: number]: string | null }>({});
  const [isCorrect, setIsCorrect] = useState<{ [key: number]: boolean | null }>({});

  const handleSelect = (scenarioId: number, option: string) => {
    setSelected(prev => ({ ...prev, [scenarioId]: option }));
    const scenario = scenarios.find(s => s.id === scenarioId);
    const correct = scenario && scenario.answer === option;
    if (correct) {
      setIsCorrect(prev => ({ ...prev, [scenarioId]: true }));
    } else {
      setIsCorrect(prev => ({ ...prev, [scenarioId]: false }));
    }
    
    // Call the completion callback if provided
    onScenarioComplete?.(scenarioId, correct || false);
  };

  return (
    <div className="space-y-6">
      {scenarios.map(scenario => (
        <div key={scenario.id} className="p-4 border rounded-lg bg-white shadow-sm">
          <p className="font-semibold mb-4">{scenario.text}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {scenario.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(scenario.id, option)}
                className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                  selected[scenario.id] === option
                    ? isCorrect[scenario.id]
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : 'bg-red-100 border-red-300 text-red-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                disabled={selected[scenario.id] !== undefined}
              >
                {option}
              </motion.button>
            ))}
          </div>
          {selected[scenario.id] !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center"
            >
              {isCorrect[scenario.id] ? (
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
              )}
              <p className="text-sm font-medium">
                {isCorrect[scenario.id]
                  ? 'Correct! Promises of guaranteed high returns are a classic red flag.'
                  : `Not quite. The correct answer is "${scenario.answer}". This is a major red flag.`}
              </p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
