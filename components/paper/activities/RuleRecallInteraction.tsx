'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, RotateCcw, BookOpen } from 'lucide-react';
import { RuleRecallActivity, RuleMatchItem } from '@/types/paper';
import clsx from 'clsx';

interface RuleRecallInteractionProps {
  activity: RuleRecallActivity;
  onComplete?: () => void;
}

export function RuleRecallInteraction({
  activity,
  onComplete,
}: RuleRecallInteractionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRule, setSelectedRule] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentItem = activity.matchItems[currentIndex];

  // Get unique rule numbers for options
  const ruleOptions = Array.from(
    new Set(activity.matchItems.map((item) => item.ruleNumber))
  ).sort((a, b) => a - b);

  const handleSelect = useCallback((ruleNumber: number) => {
    if (isAnswered) return;
    setSelectedRule(ruleNumber);
  }, [isAnswered]);

  const handleSubmit = useCallback(() => {
    if (selectedRule === null) return;
    setIsAnswered(true);
    if (selectedRule === currentItem.ruleNumber) {
      setCorrectCount((c) => c + 1);
    }
  }, [selectedRule, currentItem]);

  const handleNext = useCallback(() => {
    if (currentIndex < activity.matchItems.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedRule(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, activity.matchItems.length, onComplete]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedRule(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsComplete(false);
  }, []);

  if (isComplete) {
    const score = Math.round((correctCount / activity.matchItems.length) * 100);
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Rule Recall Complete!</h3>
        <p className="text-gray-600 mb-4">
          You correctly identified {correctCount} out of {activity.matchItems.length} rule violations ({score}%)
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

  const isCorrect = selectedRule === currentItem.ruleNumber;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
        <p className="text-sm text-gray-600">{activity.instruction}</p>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Scenario {currentIndex + 1} of {activity.matchItems.length}
      </div>

      {/* Scenario card */}
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-800 font-medium">{currentItem.scenario}</p>
        </div>
      </div>

      {/* Rule selection */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">
          Which Golden Rule does this violate?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {ruleOptions.map((ruleNum) => {
            const isSelected = selectedRule === ruleNum;
            const isCorrectRule = ruleNum === currentItem.ruleNumber;
            const showCorrect = isAnswered && isCorrectRule;
            const showIncorrect = isAnswered && isSelected && !isCorrectRule;

            return (
              <button
                key={ruleNum}
                onClick={() => handleSelect(ruleNum)}
                disabled={isAnswered}
                className={clsx(
                  'py-3 px-4 rounded-lg border-2 transition-all font-bold text-lg',
                  !isAnswered && isSelected && 'border-blue-500 bg-blue-50 text-blue-700',
                  !isAnswered && !isSelected && 'border-gray-200 hover:border-gray-300 text-gray-700',
                  showCorrect && 'border-green-500 bg-green-100 text-green-700',
                  showIncorrect && 'border-red-500 bg-red-100 text-red-700',
                  isAnswered && !showCorrect && !showIncorrect && 'border-gray-200 opacity-50 text-gray-400'
                )}
              >
                Rule {ruleNum}
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
            className={clsx(
              'mb-4 p-4 rounded-lg border',
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
                {isCorrect ? 'Correct!' : `Incorrect - This violates Rule ${currentItem.ruleNumber}`}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-800 mb-1">
              Rule {currentItem.ruleNumber}: {currentItem.ruleName}
            </p>
            <p className="text-sm text-gray-600">{currentItem.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        {!isAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={selectedRule === null}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {currentIndex < activity.matchItems.length - 1 ? (
              <>Next Scenario <ChevronRight className="w-4 h-4" /></>
            ) : (
              'Complete'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
