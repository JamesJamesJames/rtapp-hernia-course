'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, CheckCircle, BookOpen } from 'lucide-react';
import { RULES } from '@/lib/data/rules';
import { useCourseStore } from '@/lib/stores/courseStore';

export default function RulesPage() {
  const { progress, startModule } = useCourseStore();

  React.useEffect(() => {
    startModule(2);
  }, [startModule]);

  const completedRules = progress.rulesCompleted || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Module 2</span>
            <span>•</span>
            <span>The 10 Rules</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
              2
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">The 10 Golden Rules</h1>
              <p className="text-gray-600">Master each rule for safe MIS inguinal hernia repair</p>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Module Progress</span>
              <span className="text-sm text-gray-500">
                {completedRules.length} / {RULES.length} rules completed
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(completedRules.length / RULES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-blue-900 mb-3">About the 10 Golden Rules</h2>
          <p className="text-blue-800 mb-4">
            Based on the landmark paper by Claus et al. (Surgical Endoscopy, 2020), these 10 rules
            provide a systematic framework for safe MIS inguinal hernia repair. Following these rules
            minimizes the risk of recurrence, chronic pain, and life-threatening vascular injury.
          </p>
          <p className="text-blue-700 text-sm">
            Each rule includes step-by-step guidance, visual checkpoints, and common failure modes
            to avoid. Complete all 10 rules to master the safe approach to rTAPP.
          </p>
        </div>

        {/* Rules List */}
        <div className="space-y-4">
          {RULES.map((rule) => {
            const isCompleted = completedRules.includes(rule.id);

            return (
              <Link
                key={rule.id}
                href={`/modules/rules/${rule.id}`}
                className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-200 hover:border-blue-300"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 font-bold text-xl ${
                      isCompleted
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-7 h-7" />
                      ) : (
                        rule.id
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{rule.title}</h3>
                        {isCompleted && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{rule.summary}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">
                          {rule.steps.length} steps
                        </span>
                        <span className="text-gray-500">
                          {rule.visualCheckpoints.length} checkpoints
                        </span>
                        <span className="text-red-500">
                          {rule.failureModes.length} failure modes
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Reference */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Reference: All 10 Rules</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {RULES.map((rule) => (
              <div key={rule.id} className="flex items-start gap-3">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-sm shrink-0">
                  {rule.id}
                </span>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{rule.title}</p>
                  {rule.mnemonicAid && (
                    <p className="text-xs text-gray-500 italic">{rule.mnemonicAid}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/modules/visual-map"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            Module 1: Visual Map
          </Link>

          {completedRules.length === RULES.length ? (
            <Link
              href="/modules/labeling-lab"
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue to Module 3
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href={`/modules/rules/${completedRules.length + 1}`}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {completedRules.length === 0 ? 'Start with Rule 1' : 'Continue Learning'}
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
