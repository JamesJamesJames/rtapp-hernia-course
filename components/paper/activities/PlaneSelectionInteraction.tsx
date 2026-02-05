'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, RotateCcw } from 'lucide-react';
import { PlaneSelectionActivity } from '@/types/paper';
import clsx from 'clsx';

interface PlaneSelectionInteractionProps {
  activity: PlaneSelectionActivity;
  onComplete?: () => void;
}

export function PlaneSelectionInteraction({
  activity,
  onComplete,
}: PlaneSelectionInteractionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = activity.questions[currentIndex];

  const handleSelect = useCallback((index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  }, [isAnswered]);

  const handleSubmit = useCallback(() => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setCorrectCount((c) => c + 1);
    }
  }, [selectedOption, currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentIndex < activity.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, activity.questions.length, onComplete]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsComplete(false);
  }, []);

  if (isComplete) {
    const score = Math.round((correctCount / activity.questions.length) * 100);
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Activity Complete!</h3>
        <p className="text-gray-600 mb-4">
          You got {correctCount} out of {activity.questions.length} correct ({score}%)
        </p>
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
        <p className="text-sm text-gray-600">{activity.instruction}</p>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Question {currentIndex + 1} of {activity.questions.length}
      </div>

      <div className="mb-6">
        <p className="text-gray-800 font-medium mb-4">{currentQuestion.prompt}</p>

        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showCorrect = isAnswered && isCorrect;
            const showIncorrect = isAnswered && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={isAnswered}
                className={clsx(
                  'w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-3',
                  !isAnswered && isSelected && 'border-blue-500 bg-blue-50',
                  !isAnswered && !isSelected && 'border-gray-200 hover:border-gray-300',
                  showCorrect && 'border-green-500 bg-green-50',
                  showIncorrect && 'border-red-500 bg-red-50',
                  isAnswered && !showCorrect && !showIncorrect && 'border-gray-200 opacity-50'
                )}
              >
                <div className={clsx(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  !isAnswered && isSelected && 'border-blue-500 bg-blue-500',
                  !isAnswered && !isSelected && 'border-gray-300',
                  showCorrect && 'border-green-500 bg-green-500',
                  showIncorrect && 'border-red-500 bg-red-500'
                )}>
                  {showCorrect && <Check className="w-3 h-3 text-white" />}
                  {showIncorrect && <X className="w-3 h-3 text-white" />}
                </div>
                <span className="text-gray-800">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
          >
            <p className="text-sm text-blue-800">{currentQuestion.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        {!isAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {currentIndex < activity.questions.length - 1 ? (
              <>Next <ChevronRight className="w-4 h-4" /></>
            ) : (
              'Finish'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
