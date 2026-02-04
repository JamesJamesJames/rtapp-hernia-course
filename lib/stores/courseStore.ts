'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProgress, ModuleProgress, QuizScore, LabelingScore } from '@/types/user';

interface CourseState {
  // User progress
  progress: UserProgress;

  // Actions
  initializeProgress: () => void;
  setCurrentModule: (moduleId: number) => void;
  setCurrentLesson: (lessonId: string) => void;

  // Module progress
  startModule: (moduleId: number) => void;
  completeModule: (moduleId: number) => void;
  completeLesson: (moduleId: number, lessonId: string) => void;

  // Quiz tracking
  recordQuizScore: (moduleId: number, quizId: string, score: number, answers: any[]) => void;

  // Labeling tracking
  recordLabelingScore: (moduleId: number, taskId: string, score: number, correct: string[], incorrect: string[]) => void;

  // Rule tracking
  completeRule: (ruleId: number) => void;

  // Landmark mastery
  masterLandmark: (landmarkId: string) => void;
  addStrugglingLandmark: (landmarkId: string) => void;
  removeStrugglingLandmark: (landmarkId: string) => void;

  // Time tracking
  addTimeSpent: (minutes: number) => void;

  // Review stats
  incrementCardsReviewed: (count?: number) => void;

  // Certification
  setCertified: (certified: boolean) => void;

  // Reset
  resetProgress: () => void;
}

const initialProgress: UserProgress = {
  userId: 'local-user',
  createdAt: new Date(),
  lastActive: new Date(),
  modules: [],
  completedModules: [],
  currentModuleId: 0,
  currentLessonId: undefined,
  totalTimeSpent: 0,
  sessionCount: 0,
  masteredLandmarks: [],
  perfectLabels: [],
  rulesCompleted: [],
  totalCardsReviewed: 0,
  cardsInCurrentSession: 0,
  strugglingLandmarks: [],
  strugglingRules: [],
  assessmentAttempts: [],
  certified: false,
};

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      initializeProgress: () => {
        const currentProgress = get().progress;
        set({
          progress: {
            ...currentProgress,
            lastActive: new Date(),
            sessionCount: currentProgress.sessionCount + 1,
            cardsInCurrentSession: 0,
          },
        });
      },

      setCurrentModule: (moduleId: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            currentModuleId: moduleId,
            lastActive: new Date(),
          },
        }));
      },

      setCurrentLesson: (lessonId: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            currentLessonId: lessonId,
            lastActive: new Date(),
          },
        }));
      },

      startModule: (moduleId: number) => {
        set((state) => {
          const existingModule = state.progress.modules.find(m => m.moduleId === moduleId);
          if (existingModule) {
            return {
              progress: {
                ...state.progress,
                currentModuleId: moduleId,
                lastActive: new Date(),
              },
            };
          }

          const newModule: ModuleProgress = {
            moduleId,
            status: 'in_progress',
            startedAt: new Date(),
            lessonsCompleted: [],
            quizScores: [],
            labelingScores: [],
            timeSpent: 0,
          };

          return {
            progress: {
              ...state.progress,
              modules: [...state.progress.modules, newModule],
              currentModuleId: moduleId,
              lastActive: new Date(),
            },
          };
        });
      },

      completeModule: (moduleId: number) => {
        set((state) => {
          const modules = state.progress.modules.map(m =>
            m.moduleId === moduleId
              ? { ...m, status: 'completed' as const, completedAt: new Date() }
              : m
          );

          const completedModules = state.progress.completedModules.includes(moduleId)
            ? state.progress.completedModules
            : [...state.progress.completedModules, moduleId];

          return {
            progress: {
              ...state.progress,
              modules,
              completedModules,
              lastActive: new Date(),
            },
          };
        });
      },

      completeLesson: (moduleId: number, lessonId: string) => {
        set((state) => {
          const modules = state.progress.modules.map(m => {
            if (m.moduleId === moduleId) {
              const lessonsCompleted = m.lessonsCompleted.includes(lessonId)
                ? m.lessonsCompleted
                : [...m.lessonsCompleted, lessonId];
              return { ...m, lessonsCompleted };
            }
            return m;
          });

          return {
            progress: {
              ...state.progress,
              modules,
              lastActive: new Date(),
            },
          };
        });
      },

      recordQuizScore: (moduleId: number, quizId: string, score: number, answers: any[]) => {
        set((state) => {
          const quizScore: QuizScore = {
            quizId,
            score,
            attemptedAt: new Date(),
            answersGiven: answers,
          };

          const modules = state.progress.modules.map(m => {
            if (m.moduleId === moduleId) {
              return {
                ...m,
                quizScores: [...m.quizScores, quizScore],
              };
            }
            return m;
          });

          return {
            progress: {
              ...state.progress,
              modules,
              lastActive: new Date(),
            },
          };
        });
      },

      recordLabelingScore: (moduleId: number, taskId: string, score: number, correct: string[], incorrect: string[]) => {
        set((state) => {
          const labelingScore: LabelingScore = {
            taskId,
            score,
            attemptedAt: new Date(),
            attempts: 1,
            correctLabels: correct,
            incorrectLabels: incorrect,
            timeSpent: 0,
          };

          const modules = state.progress.modules.map(m => {
            if (m.moduleId === moduleId) {
              return {
                ...m,
                labelingScores: [...m.labelingScores, labelingScore],
              };
            }
            return m;
          });

          // Add to perfectLabels if 100% score
          const perfectLabels = score === 100 && !state.progress.perfectLabels.includes(taskId)
            ? [...state.progress.perfectLabels, taskId]
            : state.progress.perfectLabels;

          return {
            progress: {
              ...state.progress,
              modules,
              perfectLabels,
              lastActive: new Date(),
            },
          };
        });
      },

      completeRule: (ruleId: number) => {
        set((state) => {
          const rulesCompleted = state.progress.rulesCompleted.includes(ruleId)
            ? state.progress.rulesCompleted
            : [...state.progress.rulesCompleted, ruleId];

          return {
            progress: {
              ...state.progress,
              rulesCompleted,
              lastActive: new Date(),
            },
          };
        });
      },

      masterLandmark: (landmarkId: string) => {
        set((state) => {
          const masteredLandmarks = state.progress.masteredLandmarks.includes(landmarkId)
            ? state.progress.masteredLandmarks
            : [...state.progress.masteredLandmarks, landmarkId];

          // Remove from struggling if mastered
          const strugglingLandmarks = state.progress.strugglingLandmarks.filter(
            id => id !== landmarkId
          );

          return {
            progress: {
              ...state.progress,
              masteredLandmarks,
              strugglingLandmarks,
              lastActive: new Date(),
            },
          };
        });
      },

      addStrugglingLandmark: (landmarkId: string) => {
        set((state) => {
          if (state.progress.masteredLandmarks.includes(landmarkId)) {
            return state;
          }

          const strugglingLandmarks = state.progress.strugglingLandmarks.includes(landmarkId)
            ? state.progress.strugglingLandmarks
            : [...state.progress.strugglingLandmarks, landmarkId];

          return {
            progress: {
              ...state.progress,
              strugglingLandmarks,
            },
          };
        });
      },

      removeStrugglingLandmark: (landmarkId: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            strugglingLandmarks: state.progress.strugglingLandmarks.filter(
              id => id !== landmarkId
            ),
          },
        }));
      },

      addTimeSpent: (minutes: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            totalTimeSpent: state.progress.totalTimeSpent + minutes,
            lastActive: new Date(),
          },
        }));
      },

      incrementCardsReviewed: (count = 1) => {
        set((state) => ({
          progress: {
            ...state.progress,
            totalCardsReviewed: state.progress.totalCardsReviewed + count,
            cardsInCurrentSession: state.progress.cardsInCurrentSession + count,
          },
        }));
      },

      setCertified: (certified: boolean) => {
        set((state) => ({
          progress: {
            ...state.progress,
            certified,
            certificateDate: certified ? new Date() : undefined,
            lastActive: new Date(),
          },
        }));
      },

      resetProgress: () => {
        set({ progress: { ...initialProgress, createdAt: new Date() } });
      },
    }),
    {
      name: 'rtapp-course-progress',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ progress: state.progress }),
    }
  )
);

export default useCourseStore;
