"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Brain, Shield, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

interface ExpertiseLevelData {
  id: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ReactNode;
}

interface QuestionData {
  id: number;
  correctAnswer: number;
  category: 'Fraud Protection' | 'Risk Management' | 'Valuation' | 'Basic Concepts' | 'Investment Products' | 'Market Concepts' | 'Portfolio Management' | 'Economic Concepts';
}

const expertiseLevelsData: ExpertiseLevelData[] = [
  { id: 'beginner', icon: <Brain className="w-6 h-6" /> },
  { id: 'intermediate', icon: <Target className="w-6 h-6" /> },
  { id: 'advanced', icon: <TrendingUp className="w-6 h-6" /> }
];

const allQuestionsData: QuestionData[] = [
  { id: 1, correctAnswer: 1, category: "Fraud Protection" },
  { id: 2, correctAnswer: 1, category: "Fraud Protection" },
  { id: 3, correctAnswer: 1, category: "Fraud Protection" },
  { id: 4, correctAnswer: 1, category: "Risk Management" },
  { id: 5, correctAnswer: 0, category: "Valuation" },
  { id: 6, correctAnswer: 1, category: "Basic Concepts" },
  { id: 7, correctAnswer: 1, category: "Investment Products" },
  { id: 8, correctAnswer: 1, category: "Market Concepts" },
  { id: 9, correctAnswer: 1, category: "Market Concepts" },
  { id: 10, correctAnswer: 1, category: "Investment Products" },
  { id: 11, correctAnswer: 1, category: "Portfolio Management" },
  { id: 12, correctAnswer: 1, category: "Economic Concepts" },
  { id: 13, correctAnswer: 1, category: "Risk Management" }
];

export default function InvestmentQuiz() {
  const { t } = useTranslation('investment-quiz');
  const [step, setStep] = useState<'expertise' | 'quiz' | 'results'>('expertise');
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const expertiseLevels = expertiseLevelsData.map(level => ({
    ...level,
    name: t(`expertiseLevels.${level.id}.name`) as string,
    description: t(`expertiseLevels.${level.id}.description`) as string,
  }));

  const allQuestions = allQuestionsData.map(q => ({
    ...q,
    question: t(`questions.${q.id}.question`) as string,
    options: [
      t(`questions.${q.id}.options.0`) as string,
      t(`questions.${q.id}.options.1`) as string,
      t(`questions.${q.id}.options.2`) as string,
      t(`questions.${q.id}.options.3`) as string,
    ],
    explanation: t(`questions.${q.id}.explanation`) as string,
  }));
  
  const handleExpertiseSelection = () => {
    setStep('quiz');
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      setStep('results');
    }
  };

  const calculateScores = () => {
    const fraudQuestions = allQuestionsData.filter(q => q.category === 'Fraud Protection');
    const investmentQuestions = allQuestionsData.filter(q => q.category !== 'Fraud Protection');

    const fraudScore = answers.reduce((score, answer, index) => {
      const question = allQuestionsData[index];
      if (question.category === 'Fraud Protection' && answer === question.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);

    const investmentScore = answers.reduce((score, answer, index) => {
      const question = allQuestionsData[index];
      if (question.category !== 'Fraud Protection' && answer === question.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);

    return {
      fraudScore,
      investmentScore,
      fraudTotal: fraudQuestions.length,
      investmentTotal: investmentQuestions.length
    };
  };

  const getRecommendations = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return t('recommendations.excellent');
    if (percentage >= 60) return t('recommendations.good');
    if (percentage >= 40) return t('recommendations.basic');
    return t('recommendations.beginner');
  };

  if (step === 'expertise') {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  {t('pageTitle') as string}
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                {t('pageSubtitle') as string}
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                {t('expertiseTitle') as string}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {expertiseLevels.map((level) => (
                  <motion.div
                    key={level.id}
                    whileHover={{ scale: 1.02, borderColor: '#60a5fa' }}
                    whileTap={{ scale: 0.98 }}
                    className="border-2 border-gray-700 rounded-xl p-6 cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
                    onClick={() => handleExpertiseSelection()}
                  >
                    <div className="text-center">
                      <div className="bg-blue-900/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-300">
                        {level.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{level.name}</h3>
                      <p className="text-gray-400">{level.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (step === 'quiz') {
    const currentQData = allQuestionsData[currentQuestionIndex];
    const currentQContent = allQuestions[currentQuestionIndex];
    
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">
                <Brain className="w-8 h-8 inline mr-2 text-blue-400" />
                {t('quizTitle') as string}
              </h1>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-400">
                <span>{t('questionLabel') as string} {currentQuestionIndex + 1} {t('ofLabel') as string} {allQuestions.length}</span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
              <div className="mb-6">
                <span className={`inline-block text-sm px-3 py-1 rounded-full mb-4 ${
                  currentQData.category === 'Fraud Protection' 
                  ? 'bg-yellow-900/50 text-yellow-300' 
                  : 'bg-blue-900/50 text-blue-300'
                }`}>
                  {currentQData.category}
                </span>
                <h2 className="text-xl font-semibold mb-6">
                  {currentQContent.question}
                </h2>

                <div className="space-y-3">
                  {currentQContent.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                        answers[currentQuestionIndex] === index
                          ? 'border-blue-500 bg-blue-900/30'
                          : 'border-gray-700 hover:border-gray-600'
                      } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {answers[currentQuestionIndex] !== undefined && !showExplanation && (
                <div className="text-center">
                  <button
                    onClick={() => setShowExplanation(true)}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    {t('submitAnswer') as string}
                  </button>
                </div>
              )}

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gray-700/50 rounded-lg"
                >
                  <h3 className="font-semibold mb-2">{t('explanation') as string}</h3>
                  <p className="text-gray-300">{currentQContent.explanation}</p>
                  <button
                    onClick={nextQuestion}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {currentQuestionIndex === allQuestions.length - 1 ? t('seeResults') as string : t('nextQuestion') as string}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    const { fraudScore, investmentScore, fraudTotal, investmentTotal } = calculateScores();
    const investmentPercentage = (investmentScore / investmentTotal) * 100;
    const fraudPercentage = (fraudScore / fraudTotal) * 100;

    return (
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">
                <CheckCircle className="w-8 h-8 inline mr-2 text-green-500" />
                {t('resultsTitle') as string}
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {t('investmentKnowledge') as string}
                </h2>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    {investmentScore}/{investmentTotal}
                  </div>
                  <div className="text-2xl font-semibold text-gray-400 mb-4">
                    {investmentPercentage.toFixed(0)}%
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div 
                      className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${investmentPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-300 mb-4">{getRecommendations(investmentScore, investmentTotal) as string}</p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  <Shield className="w-6 h-6 inline mr-2 text-yellow-400" />
                  {t('fraudProtection') as string}
                </h2>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {fraudScore}/{fraudTotal}
                  </div>
                  <div className="text-2xl font-semibold text-gray-400 mb-4">
                    {fraudPercentage.toFixed(0)}%
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div 
                      className="bg-yellow-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${fraudPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  {fraudScore === fraudTotal ? (
                    <p className="text-green-400 font-semibold">{t('fraudAwareness.excellent') as string}</p>
                  ) : fraudScore >= (fraudTotal * 0.66) ? (
                    <p className="text-yellow-400">{t('fraudAwareness.good') as string}</p>
                  ) : (
                    <p className="text-red-400">{t('fraudAwareness.poor') as string}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mt-8 space-x-4">
              <button
                onClick={() => {
                  setStep('expertise');
                  setAnswers([]);
                  setCurrentQuestionIndex(0);
                  setShowExplanation(false);
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {t('takeQuizAgain') as string}
              </button>
              <Link
                href="/fraud-protection"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-block"
              >
                {t('fraudProtectionGuide') as string}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
