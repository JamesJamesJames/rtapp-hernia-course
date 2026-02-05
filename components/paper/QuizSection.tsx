'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, RotateCcw, Trophy } from 'lucide-react';
import { Quiz, QuizQuestion } from '@/types/paper';
import clsx from 'clsx';

interface QuizSectionProps {
  quiz: Quiz;
  onComplete?: (score: number, total: number) => void;
}

export function QuizSection({ quiz, onComplete }: QuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<Record<string, { selected: number; correct: boolean }>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = score >= quiz.passingScore;

  const handleSelectAnswer = useCallback((index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  }, [isAnswered]);

  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctIndex;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { selected: selectedAnswer, correct: isCorrect },
    }));
    setIsAnswered(true);
  }, [selectedAnswer, currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      onComplete?.(correctCount, totalQuestions);
    }
  }, [currentIndex, totalQuestions, correctCount, onComplete]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAnswers({});
    setShowResults(false);
  }, []);

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <div className={clsx(
            'w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center',
            passed ? 'bg-green-100' : 'bg-amber-100'
          )}>
            {passed ? (
              <Trophy className="w-10 h-10 text-green-600" />
            ) : (
              <RotateCcw className="w-10 h-10 text-amber-600" />
            )}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {passed ? 'Great job!' : 'Keep learning!'}
          </h3>
          <p className="text-gray-600 mb-6">
            You scored {correctCount} out of {totalQuestions} ({score}%)
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className={clsx(
                'h-full rounded-full transition-all duration-500',
                passed ? 'bg-green-500' : 'bg-amber-500'
              )}
              style={{ width: `${score}%` }}
            />
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Passing score: {quiz.passingScore}%
          </p>

          {/* Answer review */}
          <div className="text-left space-y-4 mb-6">
            <h4 className="font-semibold text-gray-800">Review your answers:</h4>
            {quiz.questions.map((q, idx) => {
              const answer = answers[q.id];
              const isCorrect = answer?.correct;
              return (
                <div
                  key={q.id}
                  className={clsx(
                    'p-4 rounded-lg border-2',
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={clsx(
                      'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                      isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    )}>
                      {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {idx + 1}. {q.question}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="text-red-600">Your answer:</span> {q.options[answer?.selected ?? 0]}
                          <br />
                          <span className="text-green-600">Correct answer:</span> {q.options[q.correctIndex]}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-2 italic">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{correctCount} correct so far</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showCorrect = isAnswered && isCorrect;
            const showIncorrect = isAnswered && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={clsx(
                  'w-full text-left p-4 rounded-lg border-2 transition-all',
                  !isAnswered && isSelected && 'border-blue-500 bg-blue-50',
                  !isAnswered && !isSelected && 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                  showCorrect && 'border-green-500 bg-green-50',
                  showIncorrect && 'border-red-500 bg-red-50',
                  isAnswered && !showCorrect && !showIncorrect && 'border-gray-200 opacity-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={clsx(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                    !isAnswered && isSelected && 'border-blue-500 bg-blue-500 text-white',
                    !isAnswered && !isSelected && 'border-gray-300',
                    showCorrect && 'border-green-500 bg-green-500 text-white',
                    showIncorrect && 'border-red-500 bg-red-500 text-white'
                  )}>
                    {showCorrect && <Check className="w-4 h-4" />}
                    {showIncorrect && <X className="w-4 h-4" />}
                    {!isAnswered && isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className={clsx(
                    'text-gray-800',
                    showCorrect && 'text-green-800 font-medium',
                    showIncorrect && 'text-red-800'
                  )}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <p className="text-sm text-blue-800">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!isAnswered ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            {currentIndex < totalQuestions - 1 ? (
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
