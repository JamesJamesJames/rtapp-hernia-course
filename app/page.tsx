'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { getPaperIndex } from '@/lib/content';
import { usePaperStore } from '@/lib/stores/paperStore';
import clsx from 'clsx';

export default function HomePage() {
  const paperIndex = getPaperIndex();
  const { papers, totalTimeMinutes, lastVisited } = usePaperStore();

  const completedCount = Object.values(papers).filter((p) => p.completedAt).length;
  const totalPapers = paperIndex.papers.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Posterior Groin Anatomy
              </h1>
              <p className="text-slate-600 mt-1">
                For Laparoscopic & Robotic Inguinal Hernia Repair
              </p>
            </div>
            {completedCount > 0 && (
              <div className="hidden sm:flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>{completedCount}/{totalPapers} complete</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{totalTimeMinutes} min studied</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="mb-10">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <p className="text-slate-700 text-lg leading-relaxed">
              {paperIndex.description}
            </p>
            <p className="text-slate-500 mt-4 text-sm">
              {paperIndex.subtitle}
            </p>
          </div>
        </section>

        {/* Continue Learning */}
        {lastVisited && (
          <section className="mb-8">
            <Link href={`/papers/${lastVisited}`}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-blue-600 text-white rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Continue where you left off</span>
                </div>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </section>
        )}

        {/* Learning Path Label */}
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Learning Path</h2>
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-sm text-slate-500">
            {totalPapers} papers | ~{paperIndex.papers.reduce((acc, p) => acc + p.estimatedMinutes, 0)} min total
          </span>
        </div>

        {/* Paper Cards Grid */}
        <div className="grid gap-4 md:gap-6">
          {paperIndex.papers.map((paper, index) => {
            const progress = papers[paper.slug];
            const isComplete = progress?.completedAt != null;
            const isStarted = progress?.started;
            const isLocked = paper.prerequisite && !papers[paper.prerequisite]?.completedAt;
            const completionPct = progress?.sectionsCompleted
              ? Math.round((progress.sectionsCompleted.length / 6) * 100)
              : 0;

            return (
              <motion.div
                key={paper.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={isLocked ? '#' : `/papers/${paper.slug}`}
                  className={clsx(
                    'block',
                    isLocked && 'cursor-not-allowed'
                  )}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  <div
                    className={clsx(
                      'bg-white rounded-xl border shadow-sm overflow-hidden transition-all',
                      isLocked
                        ? 'border-slate-200 opacity-60'
                        : 'border-slate-200 hover:border-blue-300 hover:shadow-md',
                      isComplete && 'border-green-300 bg-green-50/30'
                    )}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Paper number / status indicator */}
                      <div
                        className={clsx(
                          'flex items-center justify-center p-4 md:p-6 md:w-24',
                          isComplete
                            ? 'bg-green-100'
                            : isStarted
                            ? 'bg-blue-100'
                            : 'bg-slate-100'
                        )}
                      >
                        {isComplete ? (
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        ) : (
                          <span
                            className={clsx(
                              'text-3xl font-bold',
                              isStarted ? 'text-blue-600' : 'text-slate-400'
                            )}
                          >
                            {index + 1}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            {/* Title */}
                            <h3 className="text-lg font-semibold text-slate-900 mb-1">
                              {paper.shortTitle}
                            </h3>
                            <p className="text-sm text-slate-500 mb-3">
                              {paper.authors.slice(0, 2).join(', ')}{' '}
                              {paper.authors.length > 2 && 'et al.'} ({paper.year})
                            </p>

                            {/* Best for */}
                            <p className="text-slate-700 mb-3">{paper.bestFor}</p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2">
                              {paper.uniqueFeatures.map((feature, i) => (
                                <span
                                  key={i}
                                  className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Time & Action */}
                          <div className="flex md:flex-col items-center md:items-end gap-3">
                            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                              <Clock className="w-4 h-4" />
                              <span>{paper.estimatedMinutes} min</span>
                            </div>
                            {isStarted && !isComplete && (
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-blue-600 rounded-full transition-all"
                                    style={{ width: `${completionPct}%` }}
                                  />
                                </div>
                                <span className="text-xs text-slate-500">{completionPct}%</span>
                              </div>
                            )}
                            {!isLocked && (
                              <ChevronRight className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                        </div>

                        {/* Locked message */}
                        {isLocked && (
                          <div className="mt-3 text-sm text-amber-600 flex items-center gap-1.5">
                            <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full" />
                            Complete &ldquo;{paperIndex.papers.find((p) => p.slug === paper.prerequisite)?.shortTitle}&rdquo; first
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-slate-500">
          <p>
            All content based on peer-reviewed surgical literature.
            <br />
            For educational purposes only.
          </p>
        </footer>
      </main>
    </div>
  );
}
