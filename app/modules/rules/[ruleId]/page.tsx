'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, Target, BookOpen, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnatomySVGViewer } from '@/components/anatomy/AnatomySVGViewer';
import { FlashcardViewer } from '@/components/learning/FlashcardViewer';
import { QuizComponent } from '@/components/learning/QuizComponent';
import { RULES, getRuleFlashcards } from '@/lib/data/rules';
import { getQuestionsByRule } from '@/lib/data/questions';
import { useCourseStore } from '@/lib/stores/courseStore';

export default function RulePage() {
  const params = useParams();
  const router = useRouter();
  const ruleId = parseInt(params.ruleId as string);
  const [activeTab, setActiveTab] = useState<'learn' | 'flashcards' | 'quiz'>('learn');
  const [currentStep, setCurrentStep] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [flashcardsCompleted, setFlashcardsCompleted] = useState(false);

  const { completeRule, progress } = useCourseStore();

  const rule = RULES.find(r => r.id === ruleId);
  const flashcards = getRuleFlashcards(ruleId);
  const questions = getQuestionsByRule(ruleId).slice(0, 4); // Max 4 questions per rule

  React.useEffect(() => {
    if (!rule) {
      router.push('/modules/rules');
    }
  }, [rule, router]);

  if (!rule) {
    return null;
  }

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    completeRule(ruleId);
  };

  const handleFlashcardsComplete = () => {
    setFlashcardsCompleted(true);
  };

  const isRuleComplete = progress.rulesCompleted.includes(ruleId);
  const prevRule = ruleId > 1 ? ruleId - 1 : null;
  const nextRule = ruleId < 10 ? ruleId + 1 : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/modules/rules" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Rules</span>
          </Link>
          <div className="flex items-center gap-2">
            {isRuleComplete && (
              <span className="flex items-center gap-1 text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4" />
                Complete
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-[65px] z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('learn')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'learn'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Learn
              </div>
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'flashcards'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                Flashcards ({flashcards.length})
                {flashcardsCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'quiz'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                Quiz ({questions.length})
                {quizCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Rule Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-2xl">
              {rule.id}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{rule.title}</h1>
              <p className="text-gray-600">{rule.summary}</p>
            </div>
          </div>
        </div>

        {activeTab === 'learn' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Content */}
            <div className="space-y-6">
              {/* Why It Matters */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Why It Matters</h3>
                    <p className="text-blue-800">{rule.whyItMatters}</p>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">Step-by-Step Guide</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {rule.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex gap-4 p-4 rounded-lg transition-colors cursor-pointer ${
                          currentStep === index ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setCurrentStep(index)}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${
                          currentStep === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {step.order}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium">{step.instruction}</p>
                          {step.tip && (
                            <p className="text-sm text-gray-500 mt-1 italic">Tip: {step.tip}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual Checkpoints */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-green-50">
                  <h3 className="font-semibold text-green-900 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Visual Checkpoints
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {rule.visualCheckpoints.map((checkpoint, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{checkpoint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Failure Modes */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-red-50">
                  <h3 className="font-semibold text-red-900 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Common Mistakes & Consequences
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {rule.failureModes.map((failure, index) => (
                    <div key={index} className="bg-red-50 rounded-lg p-4">
                      <p className="font-medium text-red-900 mb-2">{failure.description}</p>
                      <p className="text-sm text-red-700 mb-1">
                        <strong>Consequence:</strong> {failure.consequence}
                      </p>
                      <p className="text-sm text-red-600">
                        <strong>Prevention:</strong> {failure.prevention}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mnemonic */}
              {rule.mnemonicAid && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-yellow-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Remember</h4>
                      <p className="text-yellow-800 italic text-lg">{rule.mnemonicAid}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Anatomy Viewer */}
            <div className="lg:sticky lg:top-[140px] h-fit">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Anatomical View</h3>
                  <p className="text-sm text-gray-500">
                    {rule.steps[currentStep]?.landmarkToVisualize
                      ? `Highlighting: ${rule.steps[currentStep].landmarkToVisualize?.replace(/_/g, ' ')}`
                      : 'Click steps to highlight relevant landmarks'}
                  </p>
                </div>
                <AnatomySVGViewer
                  svgUrl="/svg/full-mpo.svg"
                  mode="study"
                  highlightedLandmarks={rule.steps[currentStep]?.landmarkToVisualize ? [rule.steps[currentStep].landmarkToVisualize!] : rule.requiredLandmarks}
                  showLabels={true}
                  showZones={rule.zones.length > 0}
                  className="h-[450px]"
                />
              </div>

              {/* Required Landmarks */}
              {rule.requiredLandmarks.length > 0 && (
                <div className="mt-4 bg-white rounded-xl shadow-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Required Landmarks</h4>
                  <div className="flex flex-wrap gap-2">
                    {rule.requiredLandmarks.map(landmarkId => (
                      <span
                        key={landmarkId}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {landmarkId.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'flashcards' && flashcards.length > 0 && (
          <div className="max-w-xl mx-auto">
            <FlashcardViewer
              cards={flashcards}
              title={`Rule ${rule.id} Flashcards`}
              onComplete={handleFlashcardsComplete}
            />
          </div>
        )}

        {activeTab === 'quiz' && questions.length > 0 && (
          <div className="max-w-xl mx-auto">
            <QuizComponent
              questions={questions}
              title={`Rule ${rule.id} Quiz`}
              onComplete={handleQuizComplete}
            />
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          {prevRule ? (
            <Link
              href={`/modules/rules/${prevRule}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              Rule {prevRule}
            </Link>
          ) : (
            <Link
              href="/modules/rules"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              All Rules
            </Link>
          )}

          {(isRuleComplete || quizCompleted) && (
            nextRule ? (
              <Link
                href={`/modules/rules/${nextRule}`}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Rule {nextRule}
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/modules/labeling-lab"
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Continue to Practice Lab
                <ChevronRight className="w-5 h-5" />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
