"use client";

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface ConfirmationCheckProps {
  title: string;
  description: string;
  checkboxes: string[];
  partId: string;
  onPartComplete: (partId: string, score: number) => void;
}

export default function ConfirmationCheck({ 
  title, 
  description, 
  checkboxes, 
  partId,
  onPartComplete
}: ConfirmationCheckProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(index)) {
      newCheckedItems.delete(index);
    } else {
      newCheckedItems.add(index);
    }
    setCheckedItems(newCheckedItems);

    // Check if all checkboxes are checked
    if (newCheckedItems.size === checkboxes.length && !isCompleted) {
      setIsCompleted(true);
      onPartComplete(partId, 100); // Perfect score for completing confirmation
    }
  };

  return (
    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
      <h4 className="font-semibold text-purple-800 mb-3">
        📚 {title}
      </h4>
      <p className="text-purple-700 mb-4">
        {description}
      </p>
      
      <div className="space-y-3">
        {checkboxes.map((text, index) => (
          <label key={index} className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              checked={checkedItems.has(index)}
              onChange={() => handleCheckboxChange(index)}
            />
            <span className="text-purple-700 font-medium">
              {text}
            </span>
          </label>
        ))}
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        {isCompleted ? (
          <>
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">
              ✓ All items confirmed! You can now proceed to the next part.
            </span>
          </>
        ) : (
          <span className="text-purple-600 text-sm">
            ✓ Check all boxes to proceed to the next part
          </span>
        )}
      </div>
    </div>
  );
}
