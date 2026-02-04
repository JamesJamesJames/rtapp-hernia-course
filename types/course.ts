import { Zone } from './anatomy';

// Module structure
export interface Module {
  id: number;
  title: string;
  description: string;
  estimatedDuration: string; // e.g., "15-20 min"
  lessons: Lesson[];
  prerequisites?: number[]; // module IDs that must be completed first
}

// Lesson within a module
export interface Lesson {
  id: string;
  moduleId: number;
  title: string;
  description: string;
  content: LessonContent;
  quiz?: Quiz;
  flashcards?: Flashcard[];
  labelingTask?: LabelingTask;
}

// Lesson content structure
export interface LessonContent {
  introduction: string;
  sections: ContentSection[];
  summary: string;
  keyTakeaway: string;
}

export interface ContentSection {
  title: string;
  text: string;
  imageId?: string;
  highlightedLandmarks?: string[];
}

// Rule definition (from 10 Golden Rules)
export interface Rule {
  id: number;
  title: string;
  summary: string;
  whyItMatters: string;
  steps: RuleStep[];
  visualCheckpoints: string[];
  requiredLandmarks: string[];
  zones: Zone[];
  failureModes: FailureMode[];
  complicationPrevented: string;
  mnemonicAid?: string;
}

export interface RuleStep {
  order: number;
  instruction: string;
  tip?: string;
  landmarkToVisualize?: string;
}

export interface FailureMode {
  description: string;
  consequence: string;
  prevention: string;
}

// Quiz structure
export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'image_label';
  question: string;
  options?: QuizOption[];
  correctAnswer: string | string[];
  explanation: string;
  relatedRuleIds?: number[];
  relatedLandmarkIds?: string[];
  imageId?: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

// Flashcard for in-session review
export interface Flashcard {
  id: string;
  type: 'landmark' | 'rule' | 'danger_boundary';
  front: string;
  back: string;
  relatedLandmarkIds?: string[];
  relatedRuleIds?: number[];
  imageId?: string;
}

// Labeling task (image labeling exercise)
export interface LabelingTask {
  id: string;
  imageId: string;
  title: string;
  description: string;
  prompts: LabelingPrompt[];
  passingScore: number; // percentage (usually 100)
  maxAttempts: number;
}

export interface LabelingPrompt {
  id: string;
  instruction: string;
  correctLandmarkIds: string[];
  distractorLandmarkIds?: string[];
  feedback: {
    correct: string;
    incorrect: string;
    hint: string;
  };
}

// Labeling challenge (for the lab)
export interface LabelingChallenge {
  id: string;
  imageId: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prompts: LabelingPrompt[];
  passingScore: number;
  attempts: number;
  timeLimit?: number; // seconds
}

// MCQ question for assessment
export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  relatedRuleIds?: number[];
  relatedLandmarkIds?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'anatomy' | 'procedure' | 'safety' | 'complication';
}

// Scenario for procedural simulator
export interface Scenario {
  id: string;
  title: string;
  description: string;
  caseType: 'indirect' | 'direct' | 'femoral' | 'inguinoscrotal' | 'recurrent';
  steps: ScenarioStep[];
  complications?: ScenarioComplication[];
}

export interface ScenarioStep {
  id: string;
  description: string;
  options: ScenarioOption[];
  correctOptionId: string;
  feedback: {
    correct: string;
    incorrect: string;
  };
  relatedRuleId?: number;
}

export interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ScenarioComplication {
  id: string;
  name: string;
  triggerCondition: string;
  outcome: string;
  prevention: string;
}

// Assessment result
export interface AssessmentResult {
  id: string;
  completedAt: Date;
  mcqScore: number;
  labelingScore: number;
  scenarioScore: number;
  totalScore: number;
  passed: boolean;
  weakAreas: string[];
  recommendations: string[];
}
