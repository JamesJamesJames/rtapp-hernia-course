'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, RotateCcw, Trophy } from 'lucide-react';
import { MultipleChoiceQuestion } from '@/types/course';

interface QuizComponentProps {
  questions: MultipleChoiceQuestion[];
  title?: string;
  onComplete?: (score: number, total: number) => void;
  showExplanations?: boolean;
}

export function QuizComponent({
  questions,
  title = 'Quiz',
  onComplete,
  showExplanations = true,
}: QuizComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; selectedId: string; isCorrect: boolean }[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctOptionId;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === currentQuestion.correctOptionId;
    if (correct) {
      setCorrectCount(correctCount + 1);
    }

    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        selectedId: selectedAnswer,
        isCorrect: correct,
      },
    ]);

    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      onComplete?.(correctCount + (isCorrect ? 1 : 0), questions.length);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setAnswers([]);
    setIsComplete(false);
  };

  if (isComplete) {
    const finalScore = correctCount;
    const percentage = Math.round((finalScore / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
          passed ? 'bg-green-100' : 'bg-yellow-100'
        }`}>
          <Trophy className={`w-10 h-10 ${passed ? 'text-green-600' : 'text-yellow-600'}`} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {passed ? 'Great Job!' : 'Keep Practicing!'}
        </h3>
        <p className="text-gray-600 mb-6">
          You scored {finalScore} out of {questions.length}
        </p>

        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke={passed ? '#22c55e' : '#eab308'}
              strokeWidth="12"
              strokeDasharray={`${(percentage / 100) * 352} 352`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold ${passed ? 'text-green-600' : 'text-yellow-600'}`}>
              {percentage}%
            </span>
          </div>
        </div>

        {!passed && (
          <p className="text-sm text-gray-500 mb-6">
            You need 70% to pass. Review the material and try again.
          </p>
        )}

        <button
          onClick={restart}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="text-sm text-gray-500">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <div className="mb-6">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            currentQuestion.difficulty === 'easy'
              ? 'bg-green-100 text-green-700'
              : currentQuestion.difficulty === 'medium'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {currentQuestion.difficulty}
          </span>
        </div>

        <h4 className="text-lg font-medium text-gray-900 mb-6">
          {currentQuestion.question}
        </h4>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrectOption = option.id === currentQuestion.correctOptionId;
            const showCorrect = isAnswered && isCorrectOption;
            const showIncorrect = isAnswered && isSelected && !isCorrectOption;

            return (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    showCorrect
                      ? 'bg-green-500 text-white'
                      : showIncorrect
                      ? 'bg-red-500 text-white'
                      : isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {showCorrect ? (
                      <Check className="w-4 h-4" />
                    ) : showIncorrect ? (
                      <X className="w-4 h-4" />
                    ) : (
                      option.id.toUpperCase()
                    )}
                  </div>
                  <span className={`flex-1 ${
                    showCorrect
                      ? 'text-green-900'
                      : showIncorrect
                      ? 'text-red-900'
                      : 'text-gray-700'
                  }`}>
                    {option.text}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {isAnswered && showExplanations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className={`mt-6 p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <p className={`text-sm ${isCorrect ? 'text-green-800' : 'text-yellow-800'}`}>
                  <strong>Explanation:</strong> {currentQuestion.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        {!isAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            {currentIndex < questions.length - 1 ? (
              <>
                Next Question
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              'See Results'
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizComponent;
