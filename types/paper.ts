// Paper index types
export interface PaperIndex {
  title: string;
  subtitle: string;
  description: string;
  papers: PaperMeta[];
}

export interface PaperMeta {
  slug: string;
  shortTitle: string;
  fullTitle: string;
  authors: string[];
  year: number;
  journal: string;
  pubmedId: string;
  bestFor: string;
  uniqueFeatures: string[];
  estimatedMinutes: number;
  prerequisite: string | null;
  pedagogicFocus: PedagogicFocus;
}

export type PedagogicFocus =
  | 'spatial-orientation'
  | 'planes-mechanics'
  | 'decision-making'
  | 'critical-view'
  | 'rule-based-safety'
  | 'dynamic-procedural';

// Module types
export interface PaperModule {
  slug: string;
  summary: ModuleSummary;
  figures: Figure[];
  activities: Activity[];
  flashcards: Flashcard[];
  quiz: Quiz;
  wrapup: Wrapup;
}

export interface ModuleSummary {
  title: string;
  keyPoints: string[];
  clinicalPearl: string;
}

export interface Figure {
  id: string;
  filename: string;
  caption: string;
  description: string;
  annotations: Annotation[];
}

export interface Annotation {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  structureId: string;
}

// Activity types
export type Activity =
  | ImageLabelingDrillActivity
  | PlaneSelectionActivity
  | DecisionScenarioActivity
  | BinaryCheckActivity
  | RuleRecallActivity
  | SequencingActivity
  | VideoTimestampActivity;

interface BaseActivity {
  type: ActivityType;
  id: string;
  title: string;
  instruction: string;
}

export type ActivityType =
  | 'ImageLabelingDrill'
  | 'PlaneSelectionInteraction'
  | 'DecisionScenarioInteraction'
  | 'BinaryCheckInteraction'
  | 'RuleRecallInteraction'
  | 'SequencingInteraction'
  | 'VideoTimestampInteraction';

export interface ImageLabelingDrillActivity extends BaseActivity {
  type: 'ImageLabelingDrill';
  figureId: string;
  targetStructures: string[];
}

export interface PlaneSelectionActivity extends BaseActivity {
  type: 'PlaneSelectionInteraction';
  questions: PlaneQuestion[];
}

export interface PlaneQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DecisionScenarioActivity extends BaseActivity {
  type: 'DecisionScenarioInteraction';
  scenarios: Scenario[];
}

export interface Scenario {
  situation: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BinaryCheckActivity extends BaseActivity {
  type: 'BinaryCheckInteraction';
  cases: BinaryCase[];
}

export interface BinaryCase {
  imageId: string;
  description: string;
  correctAnswer: boolean;
  explanation: string;
}

export interface RuleRecallActivity extends BaseActivity {
  type: 'RuleRecallInteraction';
  matchItems: RuleMatchItem[];
}

export interface RuleMatchItem {
  scenario: string;
  ruleNumber: number;
  ruleName: string;
  explanation: string;
}

export interface SequencingActivity extends BaseActivity {
  type: 'SequencingInteraction';
  steps: SequenceStep[];
}

export interface SequenceStep {
  id: string;
  text: string;
  correctOrder: number;
}

export interface VideoTimestampActivity extends BaseActivity {
  type: 'VideoTimestampInteraction';
  videoUrl: string | null;
  milestones: VideoMilestone[];
}

export interface VideoMilestone {
  name: string;
  expectedRange: [number, number];
}

// Flashcard types
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  image: string | null;
}

// Quiz types
export interface Quiz {
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Wrapup types
export interface Wrapup {
  takeaways: string[];
  pitfalls: string[];
  nextPaper: NextPaperLink | null;
}

export interface NextPaperLink {
  slug: string;
  teaser: string;
}

// Progress types
export interface PaperProgress {
  slug: string;
  started: boolean;
  startedAt: string | null;
  sectionsCompleted: SectionType[];
  quizScore: number | null;
  quizAttempts: number;
  flashcardsReviewed: string[];
  activitiesCompleted: string[];
  completedAt: string | null;
}

export type SectionType =
  | 'summary'
  | 'figures'
  | 'activities'
  | 'flashcards'
  | 'quiz'
  | 'wrapup';

export interface UserPaperProgress {
  papers: Record<string, PaperProgress>;
  lastVisited: string | null;
  totalTimeMinutes: number;
}

// Hotspot types (for optional hotspots.json)
export interface HotspotsConfig {
  figureId: string;
  hotspots: Hotspot[];
}

export interface Hotspot {
  id: string;
  structureId: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
}
