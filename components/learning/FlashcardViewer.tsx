'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Flashcard } from '@/types/course';

interface FlashcardViewerProps {
  cards: Flashcard[];
  onComplete?: (results: { gotIt: number; review: number }) => void;
  title?: string;
}

export function FlashcardViewer({
  cards,
  onComplete,
  title = 'Flashcard Review',
}: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [gotItCards, setGotItCards] = useState<string[]>([]);
  const [reviewCards, setReviewCards] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = cards[currentIndex];
  const progress = ((gotItCards.length + reviewCards.length) / cards.length) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleGotIt = () => {
    if (!gotItCards.includes(currentCard.id)) {
      setGotItCards([...gotItCards, currentCard.id]);
    }
    goToNext();
  };

  const handleReview = () => {
    if (!reviewCards.includes(currentCard.id)) {
      setReviewCards([...reviewCards, currentCard.id]);
    }
    goToNext();
  };

  const goToNext = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else {
      setIsComplete(true);
      onComplete?.({ gotIt: gotItCards.length + 1, review: reviewCards.length });
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setGotItCards([]);
    setReviewCards([]);
    setIsComplete(false);
  };

  if (isComplete) {
    const totalGotIt = gotItCards.length;
    const totalReview = reviewCards.length;

    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Review Complete!</h3>
        <p className="text-gray-600 mb-6">
          You reviewed {cards.length} cards
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600">{totalGotIt}</div>
            <div className="text-sm text-green-700">Got It</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-yellow-600">{totalReview}</div>
            <div className="text-sm text-yellow-700">Need Review</div>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          Accuracy: {Math.round((totalGotIt / cards.length) * 100)}%
        </div>

        <button
          onClick={restart}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Review Again
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
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="p-6">
        <div
          className="relative h-64 cursor-pointer perspective-1000"
          onClick={handleFlip}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentCard.id}-${isFlipped ? 'back' : 'front'}`}
              initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 rounded-xl p-6 flex items-center justify-center ${
                isFlipped
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
                  : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200'
              }`}
            >
              <div className="text-center">
                <span className={`text-xs font-medium uppercase tracking-wide ${
                  isFlipped ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {isFlipped ? 'Answer' : 'Question'}
                </span>
                <p className={`mt-3 text-lg font-medium whitespace-pre-line ${
                  isFlipped ? 'text-green-900' : 'text-blue-900'
                }`}>
                  {isFlipped ? currentCard.back : currentCard.front}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-sm text-gray-500 mt-2">
          {isFlipped ? 'Rate your answer below' : 'Click card to flip'}
        </p>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        {isFlipped ? (
          <div className="flex gap-3">
            <button
              onClick={handleReview}
              className="flex-1 flex items-center justify-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-3 rounded-lg font-medium hover:bg-yellow-200 transition-colors"
            >
              <X className="w-5 h-5" />
              Review Again
            </button>
            <button
              onClick={handleGotIt}
              className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-700 px-4 py-3 rounded-lg font-medium hover:bg-green-200 transition-colors"
            >
              <Check className="w-5 h-5" />
              Got It!
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleFlip}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Show Answer
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === cards.length - 1}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashcardViewer;
