// Review card types for flashcard system
export type ReviewCardType =
  | 'IMAGE_LANDMARK'
  | 'RULE_RECALL'
  | 'FAILURE_MODE'
  | 'ZONE_IDENTIFICATION'
  | 'DANGER_TRIANGLE';

// Quality rating for SM-2 algorithm (not used in current single-session model)
export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

// Review card definition
export interface ReviewCard {
  id: string;
  type: ReviewCardType;
  front: string;         // Question or prompt
  back: string;          // Answer or explanation
  imageId?: string;      // Optional SVG reference
  highlightedLandmarks?: string[];
  relatedLandmarkIds?: string[];
  relatedRuleIds?: number[];

  // Session-based review tracking
  reviewed: boolean;
  gotIt: boolean;        // User marked as understood
  reviewCount: number;   // Times reviewed in current session
}

// Review session state
export interface ReviewSession {
  id: string;
  startedAt: Date;
  cards: ReviewCard[];
  currentIndex: number;
  cardsReviewed: number;
  cardsGotIt: number;
  cardsToReview: string[]; // Card IDs marked for re-review
  completed: boolean;
}

// Deck of flashcards for a lesson/module
export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  cards: ReviewCard[];
  sourceModuleId?: number;
  sourceLessonId?: string;
  sourceRuleId?: number;
}

// Review statistics for current session
export interface SessionReviewStats {
  totalCards: number;
  cardsReviewed: number;
  cardsGotIt: number;
  cardsToReview: number;
  percentComplete: number;
  averageTimePerCard?: number; // milliseconds
}

// Card generation options
export interface CardGenerationOptions {
  includeLandmarkCards: boolean;
  includeRuleCards: boolean;
  includeFailureModeCards: boolean;
  includeZoneCards: boolean;
  includeDangerTriangleCards: boolean;
  maxCardsPerCategory?: number;
}
