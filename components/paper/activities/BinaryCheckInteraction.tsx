'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, RotateCcw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { BinaryCheckActivity } from '@/types/paper';
import { getFigurePath } from '@/lib/content';
import clsx from 'clsx';

interface BinaryCheckInteractionProps {
  activity: BinaryCheckActivity;
  slug: string;
  onComplete?: () => void;
}

export function BinaryCheckInteraction({
  activity,
  slug,
  onComplete,
}: BinaryCheckInteractionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentCase = activity.cases[currentIndex];

  const handleSelect = useCallback((answer: boolean) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === currentCase.correctAnswer) {
      setCorrectCount((c) => c + 1);
    }
  }, [isAnswered, currentCase]);

  const handleNext = useCallback(() => {
    if (currentIndex < activity.cases.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, activity.cases.length, onComplete]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsComplete(false);
  }, []);

  if (isComplete) {
    const score = Math.round((correctCount / activity.cases.length) * 100);
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Assessment Complete!</h3>
        <p className="text-gray-600 mb-4">
          You correctly assessed {correctCount} out of {activity.cases.length} cases ({score}%)
        </p>
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Practice Again
        </button>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentCase.correctAnswer;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
        <p className="text-sm text-gray-600">{activity.instruction}</p>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Case {currentIndex + 1} of {activity.cases.length}
      </div>

      {/* Case image placeholder */}
      <div className="mb-4 aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <span className="text-gray-400 text-sm">
          Image: {currentCase.imageId}
        </span>
      </div>

      {/* Case description */}
      <div className="mb-6">
        <p className="text-gray-800">{currentCase.description}</p>
      </div>

      {/* Binary buttons */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => handleSelect(true)}
          disabled={isAnswered}
          className={clsx(
            'flex-1 py-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2',
            !isAnswered && 'border-green-200 hover:border-green-400 hover:bg-green-50',
            isAnswered && selectedAnswer === true && isCorrect && 'border-green-500 bg-green-100',
            isAnswered && selectedAnswer === true && !isCorrect && 'border-red-500 bg-red-100',
            isAnswered && selectedAnswer !== true && currentCase.correctAnswer === true && 'border-green-500 bg-green-50',
            isAnswered && selectedAnswer !== true && currentCase.correctAnswer !== true && 'border-gray-200 opacity-50'
          )}
        >
          <ThumbsUp className={clsx(
            'w-8 h-8',
            isAnswered && currentCase.correctAnswer === true ? 'text-green-600' : 'text-gray-400'
          )} />
          <span className="font-medium text-gray-700">Yes - Achieved</span>
        </button>

        <button
          onClick={() => handleSelect(false)}
          disabled={isAnswered}
          className={clsx(
            'flex-1 py-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2',
            !isAnswered && 'border-red-200 hover:border-red-400 hover:bg-red-50',
            isAnswered && selectedAnswer === false && isCorrect && 'border-green-500 bg-green-100',
            isAnswered && selectedAnswer === false && !isCorrect && 'border-red-500 bg-red-100',
            isAnswered && selectedAnswer !== false && currentCase.correctAnswer === false && 'border-green-500 bg-green-50',
            isAnswered && selectedAnswer !== false && currentCase.correctAnswer !== false && 'border-gray-200 opacity-50'
          )}
        >
          <ThumbsDown className={clsx(
            'w-8 h-8',
            isAnswered && currentCase.correctAnswer === false ? 'text-green-600' : 'text-gray-400'
          )} />
          <span className="font-medium text-gray-700">No - Not Achieved</span>
        </button>
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={clsx(
              'mb-4 p-3 rounded-lg border',
              isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <X className="w-5 h-5 text-red-600" />
              )}
              <span className={clsx(
                'font-medium',
                isCorrect ? 'text-green-800' : 'text-red-800'
              )}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-sm text-gray-700">{currentCase.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {isAnswered && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {currentIndex < activity.cases.length - 1 ? (
              <>Next Case <ChevronRight className="w-4 h-4" /></>
            ) : (
              'Complete'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
