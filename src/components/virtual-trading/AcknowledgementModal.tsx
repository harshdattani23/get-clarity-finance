// src/components/virtual-trading/AcknowledgementModal.tsx
'use client';

import { useState, useEffect } from 'react';

export default function AcknowledgementModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAcknowledged = localStorage.getItem('virtualTradingAcknowledged');
    if (!hasAcknowledged) {
      setIsOpen(true);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem('virtualTradingAcknowledged', 'true');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full border border-yellow-500">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Welcome to the Virtual Trading Simulator!</h2>
        <p className="text-gray-300 mb-6">
          This is a simulated trading environment for educational purposes. All market data is illustrative, and trades are not real. Use this platform to learn and practice your trading strategies without any real-world risk.
        </p>
        <div className="bg-gray-700 p-4 rounded-md mb-6">
            <p className="font-bold text-white">Key things to remember:</p>
            <ul className="list-disc list-inside text-gray-300 mt-2">
                <li>All prices are simulated.</li>
                <li>Your portfolio balance is virtual money.</li>
                <li>Trades do not affect real markets.</li>
            </ul>
        </div>
        <button
          onClick={handleAcknowledge}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition duration-300"
        >
          I Understand & Agree
        </button>
      </div>
    </div>
  );
}

