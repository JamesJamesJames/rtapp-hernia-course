import { AssessmentResult } from './course';

// User progress tracking
export interface UserProgress {
  userId: string;
  createdAt: Date;
  lastActive: Date;

  // Module completion
  modules: ModuleProgress[];
  completedModules: number[];
  currentModuleId: number;
  currentLessonId?: string;

  // Time tracking
  totalTimeSpent: number; // minutes
  sessionCount: number;

  // Learning achievements
  masteredLandmarks: string[];   // 100% accuracy in labeling
  perfectLabels: string[];       // Labeling challenges with perfect scores
  rulesCompleted: number[];      // Rule IDs completed

  // Review stats (session-based)
  totalCardsReviewed: number;
  cardsInCurrentSession: number;

  // Weak areas (for targeted review)
  strugglingLandmarks: string[];
  strugglingRules: number[];

  // Assessment
  assessmentAttempts: AssessmentAttempt[];
  certified: boolean;
  certificateDate?: Date;
}

// Module-specific progress
export interface ModuleProgress {
  moduleId: number;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  lessonsCompleted: string[];
  quizScores: QuizScore[];
  labelingScores: LabelingScore[];
  timeSpent: number; // minutes
}

// Quiz attempt result
export interface QuizScore {
  quizId: string;
  score: number;         // percentage
  attemptedAt: Date;
  answersGiven: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string | string[];
  isCorrect: boolean;
  timeSpent: number; // seconds
}

// Labeling task result
export interface LabelingScore {
  taskId: string;
  score: number;         // percentage
  attemptedAt: Date;
  attempts: number;
  correctLabels: string[];
  incorrectLabels: string[];
  timeSpent: number;     // seconds
}

// Assessment attempt
export interface AssessmentAttempt {
  id: string;
  attemptedAt: Date;
  result: AssessmentResult;
}

// Session state (for tracking current learning session)
export interface LearningSession {
  id: string;
  startedAt: Date;
  lastActivityAt: Date;
  currentModule: number;
  currentLesson?: string;
  currentRule?: number;

  // Session-specific tracking
  lessonsCompletedThisSession: string[];
  quizzesTakenThisSession: string[];
  labelsAttemptedThisSession: string[];
  cardsReviewedThisSession: number;

  // Time tracking
  activeTime: number; // minutes of actual engagement
}

// Achievement/badge definition
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: Date;
  criteria: AchievementCriteria;
}

export interface AchievementCriteria {
  type: 'modules_completed' | 'landmarks_mastered' | 'rules_learned' | 'perfect_labeling' | 'assessment_passed';
  threshold: number;
}

// User preferences
export interface UserPreferences {
  darkMode: boolean;
  showLabelsDefault: boolean;
  showZonesDefault: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
}
