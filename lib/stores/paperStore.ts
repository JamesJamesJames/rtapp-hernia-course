import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PaperProgress, UserPaperProgress, SectionType } from '@/types/paper';

interface PaperStore extends UserPaperProgress {
  // Actions
  startPaper: (slug: string) => void;
  completeSection: (slug: string, section: SectionType) => void;
  recordQuizScore: (slug: string, score: number) => void;
  reviewFlashcard: (slug: string, cardId: string) => void;
  completeActivity: (slug: string, activityId: string) => void;
  completePaper: (slug: string) => void;
  setLastVisited: (slug: string) => void;
  addTime: (minutes: number) => void;
  resetProgress: () => void;
  getProgress: (slug: string) => PaperProgress;
  isPaperComplete: (slug: string) => boolean;
  getCompletionPercentage: (slug: string) => number;
}

const initialProgress: UserPaperProgress = {
  papers: {},
  lastVisited: null,
  totalTimeMinutes: 0,
};

const createEmptyProgress = (slug: string): PaperProgress => ({
  slug,
  started: false,
  startedAt: null,
  sectionsCompleted: [],
  quizScore: null,
  quizAttempts: 0,
  flashcardsReviewed: [],
  activitiesCompleted: [],
  completedAt: null,
});

export const usePaperStore = create<PaperStore>()(
  persist(
    (set, get) => ({
      ...initialProgress,

      startPaper: (slug) => {
        set((state) => {
          const existing = state.papers[slug];
          if (existing?.started) return state;

          return {
            papers: {
              ...state.papers,
              [slug]: {
                ...(existing || createEmptyProgress(slug)),
                started: true,
                startedAt: new Date().toISOString(),
              },
            },
            lastVisited: slug,
          };
        });
      },

      completeSection: (slug, section) => {
        set((state) => {
          const existing = state.papers[slug] || createEmptyProgress(slug);
          if (existing.sectionsCompleted.includes(section)) return state;

          return {
            papers: {
              ...state.papers,
              [slug]: {
                ...existing,
                sectionsCompleted: [...existing.sectionsCompleted, section],
              },
            },
          };
        });
      },

      recordQuizScore: (slug, score) => {
        set((state) => {
          const existing = state.papers[slug] || createEmptyProgress(slug);
          return {
            papers: {
              ...state.papers,
              [slug]: {
                ...existing,
                quizScore: Math.max(existing.quizScore || 0, score),
                quizAttempts: existing.quizAttempts + 1,
              },
            },
          };
        });
      },

      reviewFlashcard: (slug, cardId) => {
        set((state) => {
          const existing = state.papers[slug] || createEmptyProgress(slug);
          if (existing.flashcardsReviewed.includes(cardId)) return state;

          return {
            papers: {
              ...state.papers,
              [slug]: {
                ...existing,
                flashcardsReviewed: [...existing.flashcardsReviewed, cardId],
              },
            },
          };
        });
      },

      completeActivity: (slug, activityId) => {
        set((state) => {
          const existing = state.papers[slug] || createEmptyProgress(slug);
          if (existing.activitiesCompleted.includes(activityId)) return state;

          return {
            papers: {
              ...state.papers,
              [slug]: {
                ...existing,
                activitiesCompleted: [...existing.activitiesCompleted, activityId],
              },
            },
          };
        });
      },

      completePaper: (slug) => {
        set((state) => {
          const existing = state.papers[slug] || createEmptyProgress(slug);
          if (existing.completedAt) return state;

          return {
            papers: {
              ...state.papers,
              [slug]: {
                ...existing,
                completedAt: new Date().toISOString(),
              },
            },
          };
        });
      },

      setLastVisited: (slug) => {
        set({ lastVisited: slug });
      },

      addTime: (minutes) => {
        set((state) => ({
          totalTimeMinutes: state.totalTimeMinutes + minutes,
        }));
      },

      resetProgress: () => {
        set(initialProgress);
      },

      getProgress: (slug) => {
        const state = get();
        return state.papers[slug] || createEmptyProgress(slug);
      },

      isPaperComplete: (slug) => {
        const progress = get().papers[slug];
        return progress?.completedAt !== null && progress?.completedAt !== undefined;
      },

      getCompletionPercentage: (slug) => {
        const progress = get().papers[slug];
        if (!progress) return 0;

        const totalSections = 6; // summary, figures, activities, flashcards, quiz, wrapup
        const completedSections = progress.sectionsCompleted.length;
        return Math.round((completedSections / totalSections) * 100);
      },
    }),
    {
      name: 'paper-progress',
    }
  )
);
