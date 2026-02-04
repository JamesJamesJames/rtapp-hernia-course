'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RotateCcw, Trophy, HelpCircle, ChevronRight } from 'lucide-react';
import { AnatomySVGViewer } from '@/components/anatomy/AnatomySVGViewer';
import { LabelingChallenge as LabelingChallengeType, LabelingPrompt } from '@/types/course';

interface LabelingChallengeProps {
  challenge: LabelingChallengeType;
  svgUrl: string;
  onComplete?: (score: number, total: number) => void;
}

export function LabelingChallenge({
  challenge,
  svgUrl,
  onComplete,
}: LabelingChallengeProps) {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedLandmark, setSelectedLandmark] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [correctLandmarks, setCorrectLandmarks] = useState<string[]>([]);
  const [incorrectLandmarks, setIncorrectLandmarks] = useState<string[]>([]);

  const currentPrompt = challenge.prompts[currentPromptIndex];
  const progress = ((currentPromptIndex + (showFeedback && isCorrect ? 1 : 0)) / challenge.prompts.length) * 100;

  const handleLandmarkClick = useCallback((landmarkId: string) => {
    if (showFeedback) return;
    setSelectedLandmark(landmarkId);
  }, [showFeedback]);

  const handleSubmit = () => {
    if (!selectedLandmark) return;

    const correct = currentPrompt.correctLandmarkIds.includes(selectedLandmark);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setCorrectCount(correctCount + 1);
      setCorrectLandmarks([...correctLandmarks, selectedLandmark]);
    } else {
      setAttempts(attempts + 1);
      setIncorrectLandmarks([...incorrectLandmarks, selectedLandmark]);
    }
  };

  const handleNext = () => {
    if (currentPromptIndex < challenge.prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setSelectedLandmark(null);
      setShowFeedback(false);
      setShowHint(false);
      setCorrectLandmarks([]);
      setIncorrectLandmarks([]);
    } else {
      setIsComplete(true);
      onComplete?.(correctCount + (isCorrect ? 1 : 0), challenge.prompts.length);
    }
  };

  const handleRetry = () => {
    setSelectedLandmark(null);
    setShowFeedback(false);
    setIncorrectLandmarks([]);
  };

  const restart = () => {
    setCurrentPromptIndex(0);
    setAttempts(0);
    setCorrectCount(0);
    setSelectedLandmark(null);
    setShowFeedback(false);
    setShowHint(false);
    setIsComplete(false);
    setCorrectLandmarks([]);
    setIncorrectLandmarks([]);
  };

  if (isComplete) {
    const finalScore = correctCount;
    const percentage = Math.round((finalScore / challenge.prompts.length) * 100);
    const passed = percentage >= challenge.passingScore;

    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
          passed ? 'bg-green-100' : 'bg-yellow-100'
        }`}>
          <Trophy className={`w-10 h-10 ${passed ? 'text-green-600' : 'text-yellow-600'}`} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {passed ? 'Challenge Complete!' : 'Keep Practicing!'}
        </h3>
        <p className="text-gray-600 mb-4">
          {challenge.title}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6 max-w-xs mx-auto">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600">{finalScore}</div>
            <div className="text-sm text-green-700">Correct</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-gray-600">{challenge.prompts.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>

        <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-yellow-600'}`}>
          {percentage}%
        </div>
        <p className="text-sm text-gray-500 mb-6">
          {passed ? `Required: ${challenge.passingScore}%` : `You need ${challenge.passingScore}% to pass`}
        </p>

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
          <div>
            <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
            <p className="text-sm text-gray-500">{challenge.description}</p>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            challenge.difficulty === 'beginner'
              ? 'bg-green-100 text-green-700'
              : challenge.difficulty === 'intermediate'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {challenge.difficulty}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
          <span>Prompt {currentPromptIndex + 1} of {challenge.prompts.length}</span>
          <span>Correct: {correctCount}/{currentPromptIndex + (showFeedback && isCorrect ? 1 : 0)}</span>
        </div>
      </div>

      {/* SVG Viewer */}
      <div className="h-[400px] border-b border-gray-100">
        <AnatomySVGViewer
          svgUrl={svgUrl}
          mode="test"
          onLandmarkClick={handleLandmarkClick}
          selectedLandmarks={selectedLandmark ? [selectedLandmark] : []}
          correctLandmarks={correctLandmarks}
          incorrectLandmarks={incorrectLandmarks}
          showLabels={false}
          className="h-full"
        />
      </div>

      {/* Instruction */}
      <div className="p-6">
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <p className="text-blue-900 font-medium text-center">
            {currentPrompt.instruction}
          </p>
        </div>

        {/* Selected landmark indicator */}
        {selectedLandmark && !showFeedback && (
          <p className="text-center text-gray-600 mb-4">
            Selected: <span className="font-medium">{selectedLandmark.replace(/_/g, ' ')}</span>
          </p>
        )}

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`rounded-lg p-4 mb-4 ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                ) : (
                  <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                )}
                <p className={`text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? currentPrompt.feedback.correct : currentPrompt.feedback.incorrect}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint */}
        {!showFeedback && showHint && (
          <div className="bg-yellow-50 rounded-lg p-4 mb-4 border border-yellow-200">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
              <p className="text-sm text-yellow-800">{currentPrompt.feedback.hint}</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
        {!showFeedback ? (
          <>
            <button
              onClick={() => setShowHint(true)}
              disabled={showHint}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedLandmark}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </>
        ) : isCorrect ? (
          <button
            onClick={handleNext}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            {currentPromptIndex < challenge.prompts.length - 1 ? (
              <>
                Next
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              'See Results'
            )}
          </button>
        ) : (
          <button
            onClick={handleRetry}
            className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default LabelingChallenge;
