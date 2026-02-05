'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Check, X, Shuffle } from 'lucide-react';
import { Flashcard } from '@/types/paper';

interface FlashcardDeckProps {
  flashcards: Flashcard[];
  onCardReview?: (cardId: string, known: boolean) => void;
  onComplete?: () => void;
}

export function FlashcardDeck({ flashcards, onCardReview, onComplete }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState(flashcards);
  const [knownCount, setKnownCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = cards[currentIndex];

  const handleFlip = useCallback(() => {
    setIsFlipped((f) => !f);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((i) => i + 1), 150);
    }
  }, [currentIndex, cards.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((i) => i - 1), 150);
    }
  }, [currentIndex]);

  const handleKnown = useCallback(() => {
    if (currentCard) {
      onCardReview?.(currentCard.id, true);
      setKnownCount((c) => c + 1);
    }
    if (currentIndex < cards.length - 1) {
      handleNext();
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentCard, currentIndex, cards.length, handleNext, onCardReview, onComplete]);

  const handleReview = useCallback(() => {
    if (currentCard) {
      onCardReview?.(currentCard.id, false);
      setReviewCount((c) => c + 1);
    }
    if (currentIndex < cards.length - 1) {
      handleNext();
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentCard, currentIndex, cards.length, handleNext, onCardReview, onComplete]);

  const handleShuffle = useCallback(() => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
    setReviewCount(0);
    setIsComplete(false);
  }, [flashcards]);

  const handleRestart = useCallback(() => {
    setCards(flashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
    setReviewCount(0);
    setIsComplete(false);
  }, [flashcards]);

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No flashcards available for this module.
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Session Complete!</h3>
          <div className="space-y-2 mb-6">
            <p className="text-gray-600">
              <span className="font-semibold text-green-600">{knownCount}</span> cards known
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-amber-600">{reviewCount}</span> cards to review
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Start Over
            </button>
            <button
              onClick={handleShuffle}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Shuffle & Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <button
            onClick={handleShuffle}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </button>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000 mb-6">
        <motion.div
          className="relative w-full aspect-[4/3] cursor-pointer"
          onClick={handleFlip}
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center backface-hidden border-2 border-gray-200"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-xs uppercase tracking-wide text-gray-400 mb-4">
              Question
            </div>
            <p className="text-lg md:text-xl text-center text-gray-900 font-medium">
              {currentCard?.front}
            </p>
            <div className="mt-6 text-sm text-gray-400">
              Tap to reveal answer
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center border-2 border-blue-200"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-xs uppercase tracking-wide text-blue-500 mb-4">
              Answer
            </div>
            <p className="text-base md:text-lg text-center text-gray-800">
              {currentCard?.back}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {isFlipped ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3"
            >
              <button
                onClick={handleReview}
                className="px-6 py-3 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2 font-medium"
              >
                <X className="w-5 h-5" />
                Review Again
              </button>
              <button
                onClick={handleKnown}
                className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2 font-medium"
              >
                <Check className="w-5 h-5" />
                Got It
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-gray-500 text-sm"
            >
              Tap card to flip
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Session stats */}
      <div className="mt-6 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-600">{knownCount} known</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-gray-600">{reviewCount} to review</span>
        </div>
      </div>
    </div>
  );
}
