'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ReviewCard, ReviewSession, SessionReviewStats } from '@/types/review';
import { Flashcard } from '@/types/course';

interface ReviewState {
  // Current session
  currentSession: ReviewSession | null;
  sessionHistory: { date: Date; cardsReviewed: number; gotIt: number }[];

  // Actions
  startSession: (cards: Flashcard[]) => void;
  endSession: () => void;

  // Card actions
  markCardGotIt: (cardId: string) => void;
  markCardReview: (cardId: string) => void;
  nextCard: () => void;
  previousCard: () => void;

  // Get stats
  getSessionStats: () => SessionReviewStats | null;

  // Reset
  resetSession: () => void;
}

// Convert Flashcard to ReviewCard
function flashcardToReviewCard(flashcard: Flashcard): ReviewCard {
  return {
    id: flashcard.id,
    type: flashcard.type === 'landmark' ? 'IMAGE_LANDMARK' :
          flashcard.type === 'rule' ? 'RULE_RECALL' :
          flashcard.type === 'danger_boundary' ? 'FAILURE_MODE' : 'ZONE_IDENTIFICATION',
    front: flashcard.front,
    back: flashcard.back,
    imageId: flashcard.imageId,
    relatedLandmarkIds: flashcard.relatedLandmarkIds,
    relatedRuleIds: flashcard.relatedRuleIds,
    reviewed: false,
    gotIt: false,
    reviewCount: 0,
  };
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      sessionHistory: [],

      startSession: (cards: Flashcard[]) => {
        const reviewCards = cards.map(flashcardToReviewCard);
        const session: ReviewSession = {
          id: `session-${Date.now()}`,
          startedAt: new Date(),
          cards: reviewCards,
          currentIndex: 0,
          cardsReviewed: 0,
          cardsGotIt: 0,
          cardsToReview: [],
          completed: false,
        };
        set({ currentSession: session });
      },

      endSession: () => {
        const session = get().currentSession;
        if (session) {
          set((state) => ({
            currentSession: { ...session, completed: true },
            sessionHistory: [
              ...state.sessionHistory,
              {
                date: new Date(),
                cardsReviewed: session.cardsReviewed,
                gotIt: session.cardsGotIt,
              },
            ],
          }));
        }
      },

      markCardGotIt: (cardId: string) => {
        set((state) => {
          if (!state.currentSession) return state;

          const cards = state.currentSession.cards.map(card =>
            card.id === cardId
              ? { ...card, reviewed: true, gotIt: true, reviewCount: card.reviewCount + 1 }
              : card
          );

          const cardsToReview = state.currentSession.cardsToReview.filter(id => id !== cardId);

          return {
            currentSession: {
              ...state.currentSession,
              cards,
              cardsReviewed: state.currentSession.cardsReviewed + 1,
              cardsGotIt: state.currentSession.cardsGotIt + 1,
              cardsToReview,
            },
          };
        });
      },

      markCardReview: (cardId: string) => {
        set((state) => {
          if (!state.currentSession) return state;

          const cards = state.currentSession.cards.map(card =>
            card.id === cardId
              ? { ...card, reviewed: true, gotIt: false, reviewCount: card.reviewCount + 1 }
              : card
          );

          const cardsToReview = state.currentSession.cardsToReview.includes(cardId)
            ? state.currentSession.cardsToReview
            : [...state.currentSession.cardsToReview, cardId];

          return {
            currentSession: {
              ...state.currentSession,
              cards,
              cardsReviewed: state.currentSession.cardsReviewed + 1,
              cardsToReview,
            },
          };
        });
      },

      nextCard: () => {
        set((state) => {
          if (!state.currentSession) return state;
          const nextIndex = Math.min(
            state.currentSession.currentIndex + 1,
            state.currentSession.cards.length - 1
          );
          return {
            currentSession: {
              ...state.currentSession,
              currentIndex: nextIndex,
            },
          };
        });
      },

      previousCard: () => {
        set((state) => {
          if (!state.currentSession) return state;
          const prevIndex = Math.max(state.currentSession.currentIndex - 1, 0);
          return {
            currentSession: {
              ...state.currentSession,
              currentIndex: prevIndex,
            },
          };
        });
      },

      getSessionStats: () => {
        const session = get().currentSession;
        if (!session) return null;

        return {
          totalCards: session.cards.length,
          cardsReviewed: session.cardsReviewed,
          cardsGotIt: session.cardsGotIt,
          cardsToReview: session.cardsToReview.length,
          percentComplete: (session.cardsReviewed / session.cards.length) * 100,
        };
      },

      resetSession: () => {
        set({ currentSession: null });
      },
    }),
    {
      name: 'rtapp-review-session',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessionHistory: state.sessionHistory,
      }),
    }
  )
);

export default useReviewStore;
