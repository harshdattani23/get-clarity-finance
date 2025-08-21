"use client";

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface PracticeQuestionsProps {
  language: string;
  lessonId: string;
}

export default function PracticeQuestions({ language, lessonId }: PracticeQuestionsProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  // Mock practice questions - replace with actual content from JSON files
  const getQuestions = () => {
    const questions = {
      en: [
        {
          question: "What does a stock represent?",
          options: [
            "A loan to a company",
            "Ownership in a company",
            "A bond issued by a company",
            "A government security"
          ],
          correct: "Ownership in a company",
          explanation: "A stock represents ownership in a company. When you buy a stock, you're purchasing a small piece of that company."
        },
        {
          question: "Which type of stock typically offers voting rights?",
          options: [
            "Preferred stock",
            "Common stock",
            "Growth stock",
            "Value stock"
          ],
          correct: "Common stock",
          explanation: "Common stock typically offers voting rights to shareholders, allowing them to participate in company decisions."
        },
        {
          question: "What is the main purpose of a stock market?",
          options: [
            "To provide loans to companies",
            "To facilitate trading of stocks between buyers and sellers",
            "To issue government bonds",
            "To provide insurance services"
          ],
          correct: "To facilitate trading of stocks between buyers and sellers",
          explanation: "Stock markets serve as organized exchanges where buyers and sellers can trade stocks efficiently."
        },
        {
          question: "Which order type executes immediately at the current market price?",
          options: [
            "Limit order",
            "Market order",
            "Stop order",
            "Stop-limit order"
          ],
          correct: "Market order",
          explanation: "A market order executes immediately at the current market price, while limit orders only execute at specified prices."
        }
      ],
      hi: [
        {
          question: "स्टॉक क्या प्रतिनिधित्व करता है?",
          options: [
            "कंपनी को ऋण",
            "कंपनी में स्वामित्व",
            "कंपनी द्वारा जारी बॉन्ड",
            "सरकारी सुरक्षा"
          ],
          correct: "कंपनी में स्वामित्व",
          explanation: "एक स्टॉक कंपनी में स्वामित्व का प्रतिनिधित्व करता है। जब आप स्टॉक खरीदते हैं, तो आप उस कंपनी का एक छोटा सा टुकड़ा खरीद रहे होते हैं।"
        },
        {
          question: "किस प्रकार का स्टॉक आमतौर पर मतदान अधिकार प्रदान करता है?",
          options: [
            "प्रेफर्ड स्टॉक",
            "कॉमन स्टॉक",
            "ग्रोथ स्टॉक",
            "वैल्यू स्टॉक"
          ],
          correct: "कॉमन स्टॉक",
          explanation: "कॉमन स्टॉक आमतौर पर शेयरधारकों को मतदान अधिकार प्रदान करता है, जिससे वे कंपनी के निर्णयों में भाग ले सकते हैं।"
        },
        {
          question: "स्टॉक बाजार का मुख्य उद्देश्य क्या है?",
          options: [
            "कंपनियों को ऋण प्रदान करना",
            "खरीदारों और विक्रेताओं के बीच स्टॉक के व्यापार को सुविधाजनक बनाना",
            "सरकारी बॉन्ड जारी करना",
            "बीमा सेवाएं प्रदान करना"
          ],
          correct: "खरीदारों और विक्रेताओं के बीच स्टॉक के व्यापार को सुविधाजनक बनाना",
          explanation: "स्टॉक बाजार संगठित एक्सचेंज के रूप में काम करते हैं जहां खरीदार और विक्रेता स्टॉक का कुशलतापूर्वक व्यापार कर सकते हैं।"
        },
        {
          question: "कौन सा ऑर्डर प्रकार वर्तमान बाजार मूल्य पर तुरंत निष्पादित होता है?",
          options: [
            "लिमिट ऑर्डर",
            "मार्केट ऑर्डर",
            "स्टॉप ऑर्डर",
            "स्टॉप-लिमिट ऑर्डर"
          ],
          correct: "मार्केट ऑर्डर",
          explanation: "एक मार्केट ऑर्डर वर्तमान बाजार मूल्य पर तुरंत निष्पादित होता है, जबकि लिमिट ऑर्डर केवल निर्दिष्ट कीमतों पर निष्पादित होते हैं।"
        }
      ]
    };
    return questions[language as keyof typeof questions] || questions.en;
  };

  const questions = getQuestions();

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  const score = getScore();

  return (
    <div className="bg-orange-50 rounded-xl p-6 mt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <AlertCircle className="w-6 h-6 text-orange-600" />
        Practice Questions
      </h3>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-orange-200">
            <h4 className="font-semibold text-gray-800 mb-4">
              Question {index + 1}: {question.question}
            </h4>
            
            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedAnswers[index] === option
                      ? showResults
                        ? option === question.correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={() => handleAnswerSelect(index, option)}
                    disabled={showResults}
                    className="sr-only"
                  />
                  
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[index] === option
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[index] === option && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  
                  <span className="text-gray-700">{option}</span>
                  
                  {showResults && selectedAnswers[index] === option && (
                    <div className="ml-auto">
                      {option === question.correct ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  )}
                </label>
              ))}
            </div>

            {showResults && (
              <div className={`mt-4 p-4 rounded-lg ${
                selectedAnswers[index] === question.correct
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedAnswers[index] === question.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-medium ${
                    selectedAnswers[index] === question.correct
                      ? 'text-green-800'
                      : 'text-red-800'
                  }`}>
                    {selectedAnswers[index] === question.correct ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{question.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-orange-200">
        {!showResults ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answers
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold text-gray-800">
              Score: {score.correct}/{score.total} ({Math.round((score.correct / score.total) * 100)}%)
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
