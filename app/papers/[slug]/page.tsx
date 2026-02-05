'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  CreditCard,
  ClipboardCheck,
  Flag,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { getPaperModule, getPaperMeta, getNextPaper, getPreviousPaper } from '@/lib/content';
import { usePaperStore } from '@/lib/stores/paperStore';
import { FigureGallery } from '@/components/paper/FigureGallery';
import { FlashcardDeck } from '@/components/paper/FlashcardDeck';
import { QuizSection } from '@/components/paper/QuizSection';
import { ActivityRenderer } from '@/components/paper/ActivityRenderer';
import { SectionType } from '@/types/paper';
import clsx from 'clsx';

type Tab = SectionType;

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'summary', label: '3 Minutes', icon: <FileText className="w-4 h-4" /> },
  { id: 'figures', label: 'Figures', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'activities', label: 'Activities', icon: <Lightbulb className="w-4 h-4" /> },
  { id: 'flashcards', label: 'Flashcards', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'quiz', label: 'Quiz', icon: <ClipboardCheck className="w-4 h-4" /> },
  { id: 'wrapup', label: 'Wrap-up', icon: <Flag className="w-4 h-4" /> },
];

export default function PaperPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState<Tab>('summary');

  const module = getPaperModule(slug);
  const meta = getPaperMeta(slug);
  const nextPaper = getNextPaper(slug);
  const prevPaper = getPreviousPaper(slug);

  const {
    startPaper,
    completeSection,
    recordQuizScore,
    reviewFlashcard,
    completeActivity,
    completePaper,
    setLastVisited,
    getProgress,
  } = usePaperStore();

  const progress = getProgress(slug);

  // Start tracking on mount
  useEffect(() => {
    if (slug) {
      startPaper(slug);
      setLastVisited(slug);
    }
  }, [slug, startPaper, setLastVisited]);

  // Mark section complete when viewed
  useEffect(() => {
    if (slug && activeTab) {
      completeSection(slug, activeTab);
    }
  }, [slug, activeTab, completeSection]);

  // Check if all sections complete
  useEffect(() => {
    if (progress.sectionsCompleted.length >= 6 && !progress.completedAt) {
      completePaper(slug);
    }
  }, [progress.sectionsCompleted, progress.completedAt, slug, completePaper]);

  if (!module || !meta) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Paper not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const handleQuizComplete = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    recordQuizScore(slug, percentage);
    completeSection(slug, 'quiz');
  };

  const handleFlashcardReview = (cardId: string, known: boolean) => {
    reviewFlashcard(slug, cardId);
  };

  const handleFlashcardComplete = () => {
    completeSection(slug, 'flashcards');
  };

  const handleActivityComplete = (activityId: string) => {
    completeActivity(slug, activityId);
  };

  const pubmedUrl = `https://pubmed.ncbi.nlm.nih.gov/${meta.pubmedId}/`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          {/* Top bar */}
          <div className="py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Learning Path</span>
            </Link>
            <a
              href={pubmedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>PubMed</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Title */}
          <div className="pb-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
              {meta.shortTitle}
            </h1>
            <p className="text-sm text-slate-500">
              {meta.authors.join(', ')} &middot; {meta.journal} ({meta.year})
            </p>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-thin -mb-px">
            {tabs.map((tab) => {
              const isComplete = progress.sectionsCompleted.includes(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors text-sm font-medium',
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  )}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    tab.icon
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'summary' && (
              <SummarySection module={module} />
            )}
            {activeTab === 'figures' && (
              <FiguresSection module={module} slug={slug} />
            )}
            {activeTab === 'activities' && (
              <ActivitiesSection
                module={module}
                slug={slug}
                onActivityComplete={handleActivityComplete}
                completedActivities={progress.activitiesCompleted}
              />
            )}
            {activeTab === 'flashcards' && (
              <FlashcardsSection
                module={module}
                onCardReview={handleFlashcardReview}
                onComplete={handleFlashcardComplete}
              />
            )}
            {activeTab === 'quiz' && (
              <QuizSectionWrapper
                module={module}
                onComplete={handleQuizComplete}
                previousScore={progress.quizScore}
                attempts={progress.quizAttempts}
              />
            )}
            {activeTab === 'wrapup' && (
              <WrapupSection module={module} nextPaper={nextPaper} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// Section components

function SummarySection({ module }: { module: any }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        {module.summary.title}
      </h2>

      <div className="space-y-4 mb-8">
        {module.summary.keyPoints.map((point: string, index: number) => (
          <div key={index} className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
              {index + 1}
            </div>
            <p className="text-slate-700">{point}</p>
          </div>
        ))}
      </div>

      {module.summary.clinicalPearl && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">Clinical Pearl</h3>
              <p className="text-amber-800">{module.summary.clinicalPearl}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FiguresSection({ module, slug }: { module: any; slug: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Figures</h2>
      <FigureGallery figures={module.figures} slug={slug} />
    </div>
  );
}

function ActivitiesSection({
  module,
  slug,
  onActivityComplete,
  completedActivities,
}: {
  module: any;
  slug: string;
  onActivityComplete: (id: string) => void;
  completedActivities: string[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (module.activities.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No interactive activities for this module.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Interactive Learning</h2>
        <div className="flex items-center gap-2">
          {module.activities.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={clsx(
                'w-8 h-8 rounded-full text-sm font-medium transition-colors',
                currentIndex === index
                  ? 'bg-blue-600 text-white'
                  : completedActivities.includes(module.activities[index].id)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <ActivityRenderer
        activity={module.activities[currentIndex]}
        slug={slug}
        onComplete={onActivityComplete}
      />

      {currentIndex < module.activities.length - 1 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            Next Activity
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function FlashcardsSection({
  module,
  onCardReview,
  onComplete,
}: {
  module: any;
  onCardReview: (id: string, known: boolean) => void;
  onComplete: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Flashcards</h2>
      <FlashcardDeck
        flashcards={module.flashcards}
        onCardReview={onCardReview}
        onComplete={onComplete}
      />
    </div>
  );
}

function QuizSectionWrapper({
  module,
  onComplete,
  previousScore,
  attempts,
}: {
  module: any;
  onComplete: (score: number, total: number) => void;
  previousScore: number | null;
  attempts: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{module.quiz.title}</h2>
        {previousScore !== null && (
          <div className="text-sm text-slate-600">
            Best score: <span className="font-semibold text-green-600">{previousScore}%</span>
            {attempts > 0 && ` (${attempts} ${attempts === 1 ? 'attempt' : 'attempts'})`}
          </div>
        )}
      </div>
      <QuizSection quiz={module.quiz} onComplete={onComplete} />
    </div>
  );
}

function WrapupSection({ module, nextPaper }: { module: any; nextPaper: any }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Wrap-up</h2>

      {/* Takeaways */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Takeaways</h3>
        <div className="space-y-3">
          {module.wrapup.takeaways.map((takeaway: string, index: number) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700">{takeaway}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pitfalls */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Common Pitfalls</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <ul className="space-y-2">
            {module.wrapup.pitfalls.map((pitfall: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-red-800">
                <span className="text-red-500 font-bold">!</span>
                {pitfall}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Paper */}
      {module.wrapup.nextPaper && nextPaper && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Continue Learning</h3>
          <p className="text-blue-800 mb-4">{module.wrapup.nextPaper.teaser}</p>
          <Link
            href={`/papers/${module.wrapup.nextPaper.slug}`}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next: {nextPaper.shortTitle}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {!module.wrapup.nextPaper && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Congratulations!
          </h3>
          <p className="text-green-800 mb-4">
            You have completed all modules in the Posterior Groin Anatomy course.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Learning Path
          </Link>
        </div>
      )}
    </div>
  );
}
