'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '@/lib/stores/courseStore';

interface Scenario {
  id: string;
  title: string;
  description: string;
  caseType: string;
  difficulty: 'standard' | 'complex';
  steps: ScenarioStep[];
}

interface ScenarioStep {
  id: string;
  situation: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean; feedback: string; ruleReference?: number }[];
}

const scenarios: Scenario[] = [
  {
    id: 'standard-indirect',
    title: 'Standard Indirect Hernia',
    description: 'A 45-year-old male presents with a right indirect inguinal hernia. Work through the key decision points.',
    caseType: 'Indirect',
    difficulty: 'standard',
    steps: [
      {
        id: 'step-1',
        situation: 'You have entered the preperitoneal space and are ready to make your peritoneal incision.',
        question: 'How high above the deep ring should your incision be?',
        options: [
          { id: 'a', text: '2 cm above the deep ring', isCorrect: false, feedback: 'Too close. This will result in inadequate peritoneal flap.', ruleReference: 1 },
          { id: 'b', text: '4 cm or more above the deep ring', isCorrect: true, feedback: 'Correct! Rule 1: The incision must be at least 4 cm above the deep ring for adequate flap creation.', ruleReference: 1 },
          { id: 'c', text: 'At the level of the deep ring', isCorrect: false, feedback: 'This is too low. You need space for mesh placement and closure.', ruleReference: 1 },
        ],
      },
      {
        id: 'step-2',
        situation: 'During dissection, you notice you are seeing red muscle fibers.',
        question: 'What is the appropriate action?',
        options: [
          { id: 'a', text: 'Continue dissecting - this is normal', isCorrect: false, feedback: 'Red muscle fibers indicate wrong plane. This risks nerve and vessel injury.', ruleReference: 2 },
          { id: 'b', text: 'Stop and reassess your plane - you may be too deep', isCorrect: true, feedback: 'Correct! Rule 2: Keep preperitoneal fat on the abdominal wall. Red = wrong plane.', ruleReference: 2 },
          { id: 'c', text: 'Use sharp dissection to get through it', isCorrect: false, feedback: 'This will worsen the situation. You need to get back to the correct areolar plane.', ruleReference: 2 },
        ],
      },
      {
        id: 'step-3',
        situation: 'You have reduced the indirect hernia sac. You notice fatty tissue at the deep ring.',
        question: 'What should you do?',
        options: [
          { id: 'a', text: 'Ignore it - the sac is reduced', isCorrect: false, feedback: 'This may be a cord lipoma that could cause "recurrence".', ruleReference: 7 },
          { id: 'b', text: 'Inspect carefully - this may be a cord lipoma', isCorrect: true, feedback: 'Correct! Rule 7: Always look for cord lipomas. They are a common cause of apparent recurrence.', ruleReference: 7 },
          { id: 'c', text: 'Excise all fatty tissue aggressively', isCorrect: false, feedback: 'Be careful - aggressive excision risks vessel injury. Careful inspection and reduction is safer.', ruleReference: 7 },
        ],
      },
      {
        id: 'step-4',
        situation: 'You are placing a 10x15 cm mesh. Where can you safely place fixation?',
        question: 'Select the SAFEST location for mesh fixation:',
        options: [
          { id: 'a', text: 'Below the iliopubic tract laterally', isCorrect: false, feedback: 'NEVER below the iliopubic tract! This causes chronic pain from nerve injury.', ruleReference: 9 },
          { id: 'b', text: 'Cooper\'s ligament in Zone 2', isCorrect: true, feedback: 'Correct! Rule 9: Cooper\'s ligament in Zone 2 is a safe fixation point.', ruleReference: 9 },
          { id: 'c', text: 'The inferior epigastric vessels', isCorrect: false, feedback: 'NEVER fix to the IEV! This causes hemorrhage.', ruleReference: 9 },
        ],
      },
    ],
  },
  {
    id: 'large-direct',
    title: 'Large Direct Hernia',
    description: 'A 62-year-old male with a large direct inguinal hernia. Navigate the challenges of medial dissection.',
    caseType: 'Direct',
    difficulty: 'complex',
    steps: [
      {
        id: 'step-1',
        situation: 'You are dissecting the large direct hernia sac medially.',
        question: 'How far medially and inferiorly must you dissect?',
        options: [
          { id: 'a', text: 'To the pubic tubercle only', isCorrect: false, feedback: 'Insufficient. You must go to the symphysis AND 2 cm below.', ruleReference: 3 },
          { id: 'b', text: 'To the pubic symphysis and 2 cm inferior', isCorrect: true, feedback: 'Correct! Rule 3: Dissect to symphysis AND 2 cm inferior to ensure femoral coverage.', ruleReference: 3 },
          { id: 'c', text: 'Only to the medial edge of the defect', isCorrect: false, feedback: 'This guarantees recurrence. Adequate medial dissection is essential.', ruleReference: 3 },
        ],
      },
      {
        id: 'step-2',
        situation: 'During medial dissection, you encounter a yellowish structure.',
        question: 'What structure must you be careful of?',
        options: [
          { id: 'a', text: 'The bladder - it may be sliding into the defect', isCorrect: true, feedback: 'Correct! The bladder can slide into large direct defects. Identify and protect it.', ruleReference: 3 },
          { id: 'b', text: 'The vas deferens', isCorrect: false, feedback: 'The vas is lateral, not medial. In the medial space, the bladder is at risk.', ruleReference: 3 },
          { id: 'c', text: 'The spermatic vessels', isCorrect: false, feedback: 'Spermatic vessels are lateral. Medially you must watch for the bladder.', ruleReference: 3 },
        ],
      },
      {
        id: 'step-3',
        situation: 'You want to confirm you have covered the femoral space.',
        question: 'What structure MUST you visualize?',
        options: [
          { id: 'a', text: 'The inferior epigastric vessels', isCorrect: false, feedback: 'The IEV is important but doesn\'t confirm femoral coverage.', ruleReference: 4 },
          { id: 'b', text: 'The external iliac vein', isCorrect: true, feedback: 'Correct! Rule 4: The external iliac vein MUST be visualized. The femoral canal is medial to it.', ruleReference: 4 },
          { id: 'c', text: 'The vas deferens', isCorrect: false, feedback: 'The vas is lateral and doesn\'t help confirm femoral hernia coverage.', ruleReference: 4 },
        ],
      },
    ],
  },
  {
    id: 'large-inguinoscrotal',
    title: 'Large Inguinoscrotal Hernia',
    description: 'A 55-year-old male with a large inguinoscrotal hernia extending well into the scrotum.',
    caseType: 'Inguinoscrotal',
    difficulty: 'complex',
    steps: [
      {
        id: 'step-1',
        situation: 'You encounter a large hernia sac extending deep into the scrotum.',
        question: 'What is the safest approach to this sac?',
        options: [
          { id: 'a', text: 'Dissect the entire sac out of the scrotum', isCorrect: false, feedback: 'Aggressive scrotal dissection risks cord injury and hematoma.', ruleReference: 6 },
          { id: 'b', text: 'Transect the sac at the deep ring level', isCorrect: true, feedback: 'Correct! Rule 6: Transect large scrotal sacs at the ring. Leave the distal sac in place.', ruleReference: 6 },
          { id: 'c', text: 'Leave the entire sac unreduced', isCorrect: false, feedback: 'The proximal sac must be dealt with for proper mesh placement.', ruleReference: 6 },
        ],
      },
      {
        id: 'step-2',
        situation: 'After transecting the sac, you notice the vas deferens does not cross the iliac vein.',
        question: 'What does this indicate?',
        options: [
          { id: 'a', text: 'Normal anatomy - proceed with mesh', isCorrect: false, feedback: 'The vas MUST cross the vein for adequate parietalization.', ruleReference: 5 },
          { id: 'b', text: 'Inadequate parietalization - more lateral dissection needed', isCorrect: true, feedback: 'Correct! Rule 5: Vas must cross the iliac vein AND iliopsoas must be visible.', ruleReference: 5 },
          { id: 'c', text: 'The vas was injured', isCorrect: false, feedback: 'This describes inadequate parietalization, not injury.', ruleReference: 5 },
        ],
      },
    ],
  },
];

export default function SimulatorPage() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { startModule } = useCourseStore();

  React.useEffect(() => {
    startModule(4);
  }, [startModule]);

  const currentScenario = scenarios.find(s => s.id === activeScenario);
  const currentStep = currentScenario?.steps[currentStepIndex];

  const handleAnswerSelect = (answerId: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !currentStep) return;
    setShowFeedback(true);

    const selectedOption = currentStep.options.find(o => o.id === selectedAnswer);
    if (selectedOption?.isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNext = () => {
    if (!currentScenario) return;

    if (currentStepIndex < currentScenario.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetScenario = () => {
    setActiveScenario(null);
    setCurrentStepIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCorrectAnswers(0);
    setIsComplete(false);
  };

  if (isComplete && currentScenario) {
    const percentage = Math.round((correctAnswers / currentScenario.steps.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              percentage >= 70 ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              <CheckCircle className={`w-10 h-10 ${percentage >= 70 ? 'text-green-600' : 'text-yellow-600'}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Scenario Complete!
            </h2>
            <p className="text-gray-600 mb-4">{currentScenario.title}</p>

            <div className="text-4xl font-bold mb-2" style={{ color: percentage >= 70 ? '#22c55e' : '#eab308' }}>
              {percentage}%
            </div>
            <p className="text-gray-500 mb-6">
              {correctAnswers} of {currentScenario.steps.length} decisions correct
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetScenario}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Try Another
              </button>
              <Link
                href="/modules/assessment"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue to Assessment
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScenario && currentStep) {
    const selectedOption = currentStep.options.find(o => o.id === selectedAnswer);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={resetScenario}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Exit Scenario</span>
            </button>
            <div className="text-sm text-gray-500">
              Step {currentStepIndex + 1} of {currentScenario.steps.length}
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / currentScenario.steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Scenario Info */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="font-bold text-gray-900">{currentScenario.title}</h2>
              <p className="text-sm text-gray-600">{currentScenario.caseType} Hernia</p>
            </div>

            {/* Situation */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Situation</h3>
              <p className="text-gray-700">{currentStep.situation}</p>
            </div>

            {/* Question */}
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">{currentStep.question}</h3>

              <div className="space-y-3">
                {currentStep.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrectOption = option.isCorrect;
                  const showCorrect = showFeedback && isCorrectOption;
                  const showIncorrect = showFeedback && isSelected && !isCorrectOption;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(option.id)}
                      disabled={showFeedback}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showCorrect
                          ? 'border-green-500 bg-green-50'
                          : showIncorrect
                          ? 'border-red-500 bg-red-50'
                          : isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                          showCorrect
                            ? 'bg-green-500 text-white'
                            : showIncorrect
                            ? 'bg-red-500 text-white'
                            : isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {showCorrect ? <CheckCircle className="w-4 h-4" /> : showIncorrect ? <AlertTriangle className="w-4 h-4" /> : option.id.toUpperCase()}
                        </div>
                        <span className="flex-1">{option.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {showFeedback && selectedOption && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6"
                  >
                    <div className={`p-4 rounded-lg ${
                      selectedOption.isCorrect
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-yellow-50 border border-yellow-200'
                    }`}>
                      <p className={`text-sm ${selectedOption.isCorrect ? 'text-green-800' : 'text-yellow-800'}`}>
                        {selectedOption.feedback}
                      </p>
                      {selectedOption.ruleReference && (
                        <Link
                          href={`/modules/rules/${selectedOption.ruleReference}`}
                          className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                        >
                          Review Rule {selectedOption.ruleReference}
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              {!showFeedback ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Submit Decision
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {currentStepIndex < currentScenario.steps.length - 1 ? 'Next Step' : 'See Results'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Module 4</span>
            <span>•</span>
            <span>Procedural Simulator</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
              4
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Procedural Flow Simulator</h1>
              <p className="text-gray-600">Work through realistic surgical scenarios</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-blue-900 mb-3">How It Works</h2>
          <p className="text-blue-800">
            Each scenario presents you with decision points during a hernia repair. Choose the best
            action based on the 10 Golden Rules. Get instant feedback and references to review.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Select a Scenario</h2>

          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id)}
              className="w-full text-left bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  scenario.difficulty === 'standard' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  <Play className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{scenario.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      scenario.difficulty === 'standard'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {scenario.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
                  <p className="text-xs text-gray-500">{scenario.steps.length} decision points</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/modules/labeling-lab"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            Module 3: Labeling Lab
          </Link>

          <Link
            href="/modules/assessment"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue to Assessment
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
