'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play, CheckCircle, BookOpen, Target, AlertTriangle } from 'lucide-react';
import { AnatomySVGViewer } from '@/components/anatomy/AnatomySVGViewer';
import { QuizComponent } from '@/components/learning/QuizComponent';
import { useCourseStore } from '@/lib/stores/courseStore';

const orientationSlides = [
  {
    id: 'intro',
    title: 'Why Posterior Groin Anatomy Is Challenging',
    content: [
      'The posterior view of the groin during rTAPP is unfamiliar to surgeons trained in open anterior repairs',
      'Multiple critical structures converge in a small space: vessels, nerves, vas deferens',
      'Incorrect dissection plane or fixation can lead to life-threatening hemorrhage or chronic pain',
      'The anatomy appears different from patient to patient based on body habitus and pathology',
    ],
    icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
  },
  {
    id: 'advantages',
    title: 'rTAPP Advantages and Risks',
    content: [
      'Advantages: Better visualization, magnification, and ergonomics compared to laparoscopy',
      'The robotic platform allows for precise dissection and suturing',
      'Lower conversion rates and potentially faster recovery',
      'Risks: Requires systematic approach to avoid vascular and nerve injuries',
      'Key: Following the 10 Golden Rules minimizes complications',
    ],
    icon: <Target className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 'critical-view',
    title: 'The Critical View of the MPO',
    content: [
      'The Myopectineal Orifice (MPO) is the entire potential hernia space of the groin',
      'Achieving the "Critical View" means visualizing all key landmarks before proceeding',
      'Like the Critical View of Safety in cholecystectomy, this confirms safe anatomy',
      'The Inverted Y (IEV, vas, spermatic vessels) is your primary orientation landmark',
    ],
    icon: <BookOpen className="w-8 h-8 text-green-500" />,
    showDiagram: true,
  },
  {
    id: 'overview',
    title: 'Course Overview',
    content: [
      'Module 1: Learn the Visual Map - Inverted Y, zones, and danger regions',
      'Module 2: Master the 10 Golden Rules with step-by-step guidance',
      'Module 3: Practice with interactive labeling challenges',
      'Module 4: Work through procedural scenarios',
      'Module 5: Complete assessment and earn certification',
    ],
    icon: <CheckCircle className="w-8 h-8 text-purple-500" />,
  },
];

const baselineQuestions = [
  {
    id: 'baseline-1',
    question: 'What structure forms the superior arm of the "Inverted Y" in the posterior groin view?',
    options: [
      { id: 'a', text: 'Vas deferens' },
      { id: 'b', text: 'Spermatic vessels' },
      { id: 'c', text: 'Inferior epigastric vessels' },
      { id: 'd', text: 'External iliac vein' },
    ],
    correctOptionId: 'c',
    explanation: 'The inferior epigastric vessels (IEV) form the superior, vertical arm of the Inverted Y. The vas deferens and spermatic vessels form the two inferior limbs.',
    difficulty: 'easy' as const,
    category: 'anatomy' as const,
  },
  {
    id: 'baseline-2',
    question: 'Which zone of the MPO is considered the HIGHEST risk for vascular injury?',
    options: [
      { id: 'a', text: 'Zone 1 - Lateral space' },
      { id: 'b', text: 'Zone 2 - Medial direct space' },
      { id: 'c', text: 'Zone 3 - Central zone' },
      { id: 'd', text: 'All zones are equally risky' },
    ],
    correctOptionId: 'c',
    explanation: 'Zone 3 (Central zone) contains the Triangle of Doom with the external iliac vessels. This is the highest risk area for life-threatening vascular injury.',
    difficulty: 'medium' as const,
    category: 'safety' as const,
  },
  {
    id: 'baseline-3',
    question: 'The iliopubic tract is important because:',
    options: [
      { id: 'a', text: 'It marks the boundary for mesh fixation - no fixation below it' },
      { id: 'b', text: 'It contains the main blood supply to the groin' },
      { id: 'c', text: 'It is the site of most direct hernias' },
      { id: 'd', text: 'It should always be divided during repair' },
    ],
    correctOptionId: 'a',
    explanation: 'The iliopubic tract is the critical boundary for safe fixation. Placing tacks or sutures below this line risks injury to the femoral nerve and lateral femoral cutaneous nerve, causing chronic pain.',
    difficulty: 'medium' as const,
    category: 'safety' as const,
  },
];

export default function OrientationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { startModule, completeModule } = useCourseStore();

  React.useEffect(() => {
    startModule(0);
  }, [startModule]);

  const handleQuizComplete = (score: number, total: number) => {
    setQuizCompleted(true);
    completeModule(0);
  };

  const nextSlide = () => {
    if (currentSlide < orientationSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = orientationSlides[currentSlide];

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Orientation Complete!
            </h2>
            <p className="text-gray-600 mb-8">
              You&apos;re ready to dive into the Visual Map and learn the foundational anatomy of the MPO.
            </p>
            <Link
              href="/modules/visual-map"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue to Module 1
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Baseline Assessment</h1>
            <p className="text-gray-600">
              Let&apos;s see what you already know about posterior groin anatomy
            </p>
          </div>
          <QuizComponent
            questions={baselineQuestions}
            title="Baseline Quiz"
            onComplete={handleQuizComplete}
            showExplanations={true}
          />
        </div>
      </div>
    );
  }

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
            <span>Module 0</span>
            <span>•</span>
            <span>Orientation</span>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {currentSlide + 1} / {orientationSlides.length}
            </span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / orientationSlides.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Slide header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  {slide.icon}
                  <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
                </div>
              </div>

              {/* Slide content */}
              <div className="p-6">
                <ul className="space-y-4">
                  {slide.content.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0" />
                      <p className="text-gray-700">{item}</p>
                    </motion.li>
                  ))}
                </ul>

                {/* Show diagram for critical view slide */}
                {slide.showDiagram && (
                  <div className="mt-6 rounded-lg overflow-hidden border border-gray-200">
                    <AnatomySVGViewer
                      svgUrl="/svg/inverted-y.svg"
                      mode="study"
                      showLabels={true}
                      className="h-[350px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {orientationSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {currentSlide === orientationSlides.length - 1 ? (
              <>
                Take Quiz
                <Play className="w-5 h-5" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
