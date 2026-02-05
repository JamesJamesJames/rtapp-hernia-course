'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, X, RotateCcw, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { SequencingActivity, SequenceStep } from '@/types/paper';
import clsx from 'clsx';

interface SequencingInteractionProps {
  activity: SequencingActivity;
  onComplete?: () => void;
}

export function SequencingInteraction({
  activity,
  onComplete,
}: SequencingInteractionProps) {
  const [steps, setSteps] = useState<SequenceStep[]>(() =>
    [...activity.steps].sort(() => Math.random() - 0.5)
  );
  const [isChecked, setIsChecked] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const moveStep = useCallback((index: number, direction: 'up' | 'down') => {
    if (isChecked) return;
    const newSteps = [...steps];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newSteps.length) return;
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    setSteps(newSteps);
  }, [steps, isChecked]);

  const handleCheck = useCallback(() => {
    setIsChecked(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    onComplete?.();
  }, [onComplete]);

  const handleRestart = useCallback(() => {
    setSteps([...activity.steps].sort(() => Math.random() - 0.5));
    setIsChecked(false);
    setIsComplete(false);
  }, [activity.steps]);

  // Check if order is correct
  const isCorrectOrder = steps.every((step, index) => step.correctOrder === index + 1);
  const correctCount = steps.filter((step, index) => step.correctOrder === index + 1).length;

  if (isComplete) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {isCorrectOrder ? 'Perfect!' : 'Sequencing Complete!'}
        </h3>
        <p className="text-gray-600 mb-4">
          {isCorrectOrder
            ? 'You arranged all steps in the correct order!'
            : `You got ${correctCount} out of ${steps.length} steps in the correct position.`}
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

      <p className="text-sm text-gray-500 mb-4">
        Use the arrows to arrange steps in the correct surgical sequence
      </p>

      {/* Steps list */}
      <div className="space-y-2 mb-6">
        {steps.map((step, index) => {
          const isInCorrectPosition = step.correctOrder === index + 1;
          const showFeedback = isChecked;

          return (
            <motion.div
              key={step.id}
              layout
              className={clsx(
                'flex items-center gap-3 p-3 rounded-lg border-2 transition-colors',
                !isChecked && 'border-gray-200 bg-gray-50',
                showFeedback && isInCorrectPosition && 'border-green-500 bg-green-50',
                showFeedback && !isInCorrectPosition && 'border-red-500 bg-red-50'
              )}
            >
              {/* Position number */}
              <div className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                !isChecked && 'bg-gray-200 text-gray-700',
                showFeedback && isInCorrectPosition && 'bg-green-500 text-white',
                showFeedback && !isInCorrectPosition && 'bg-red-500 text-white'
              )}>
                {index + 1}
              </div>

              {/* Step text */}
              <div className="flex-1 text-gray-800">
                {step.text}
              </div>

              {/* Feedback icon */}
              {showFeedback && (
                <div className="flex-shrink-0">
                  {isInCorrectPosition ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <div className="flex items-center gap-1">
                      <X className="w-5 h-5 text-red-600" />
                      <span className="text-xs text-red-600">#{step.correctOrder}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Move buttons */}
              {!isChecked && (
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => moveStep(index, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowUp className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => moveStep(index, 'down')}
                    disabled={index === steps.length - 1}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowDown className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!isChecked ? (
          <button
            onClick={handleCheck}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Check Order
          </button>
        ) : (
          <>
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
