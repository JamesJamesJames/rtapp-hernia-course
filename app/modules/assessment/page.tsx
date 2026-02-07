'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Trophy, Award, RotateCcw, Download, CheckCircle, Target, BookOpen } from 'lucide-react';
import { QuizComponent } from '@/components/learning/QuizComponent';
import { getRandomQuestions } from '@/lib/data/questions';
import { useCourseStore } from '@/lib/stores/courseStore';

type AssessmentSection = 'intro' | 'mcq' | 'results' | 'certificate';

export default function AssessmentPage() {
  const [section, setSection] = useState<AssessmentSection>('intro');
  const [mcqScore, setMcqScore] = useState(0);
  const [mcqTotal, setMcqTotal] = useState(0);

  const { progress, startModule, setCertified } = useCourseStore();

  React.useEffect(() => {
    startModule(5);
  }, [startModule]);

  const handleMcqComplete = (score: number, total: number) => {
    setMcqScore(score);
    setMcqTotal(total);
    setSection('results');
  };

  const assessmentQuestions = React.useMemo(() => getRandomQuestions(20), []);

  const totalScore = mcqTotal > 0 ? Math.round((mcqScore / mcqTotal) * 100) : 0;
  const passed = totalScore >= 70;

  const handleGetCertificate = () => {
    setCertified(true);
    setSection('certificate');
  };

  const restartAssessment = () => {
    setSection('intro');
    setMcqScore(0);
    setMcqTotal(0);
  };

  if (section === 'certificate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Certificate */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-blue-600">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
              <Award className="w-20 h-20 text-white mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white">Certificate of Completion</h1>
            </div>

            <div className="p-12 text-center">
              <p className="text-gray-500 mb-4">This is to certify that</p>
              <p className="text-3xl font-bold text-gray-900 mb-4">Learner</p>
              <p className="text-gray-500 mb-8">has successfully completed</p>

              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  rTAPP Inguinal Hernia Repair
                </h2>
                <p className="text-blue-700">
                  The Critical View of the Myopectineal Orifice
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalScore}%</div>
                  <div className="text-sm text-gray-500">Final Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">10</div>
                  <div className="text-sm text-gray-500">Rules Mastered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-500">Landmarks Learned</div>
                </div>
              </div>

              <p className="text-gray-500 mb-2">
                Completed on {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <p className="text-sm text-gray-500">
                  Based on &ldquo;Ten Golden Rules for a Safe MIS Inguinal Hernia Repair&rdquo;
                  <br />
                  Claus et al., Surgical Endoscopy (2020)
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-sm"
            >
              <Download className="w-5 h-5" />
              Print Certificate
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Return to Home
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (section === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              <Trophy className={`w-12 h-12 ${passed ? 'text-green-600' : 'text-yellow-600'}`} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </h2>
            <p className="text-gray-600 mb-8">
              {passed
                ? 'You have successfully completed the assessment!'
                : 'You need 70% to pass. Review the material and try again.'}
            </p>

            {/* Score breakdown */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Your Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-600">{mcqScore}</div>
                  <div className="text-sm text-gray-500">Questions Correct</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-3xl font-bold text-gray-600">{mcqTotal}</div>
                  <div className="text-sm text-gray-500">Total Questions</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Overall Score</span>
                  <span className={`font-bold text-xl ${passed ? 'text-green-600' : 'text-yellow-600'}`}>
                    {totalScore}%
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${passed ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ width: `${totalScore}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>0%</span>
                  <span className="text-green-600 font-medium">70% passing</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {passed ? (
                <button
                  onClick={handleGetCertificate}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  <Award className="w-5 h-5" />
                  Get Certificate
                </button>
              ) : (
                <>
                  <Link
                    href="/modules/rules"
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <BookOpen className="w-5 h-5" />
                    Review Rules
                  </Link>
                  <button
                    onClick={restartAssessment}
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Try Again
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (section === 'mcq') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={restartAssessment}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Exit Assessment</span>
            </button>
            <div className="text-sm text-gray-500">Final Assessment</div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Final Assessment</h1>
            <p className="text-gray-600">20 multiple choice questions • 70% to pass</p>
          </div>
          <QuizComponent
            questions={assessmentQuestions}
            title="Final Assessment"
            onComplete={handleMcqComplete}
            showExplanations={true}
          />
        </div>
      </div>
    );
  }

  // Intro section
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Module 5</span>
            <span>•</span>
            <span>Assessment</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
              5
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Assessment & Certification</h1>
              <p className="text-gray-600">Test your knowledge and earn your certificate</p>
            </div>
          </div>
        </div>

        {/* Progress indicators (informational, not gating) */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Your Progress</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-5 h-5 ${progress.completedModules.includes(0) ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={progress.completedModules.includes(0) ? 'text-gray-900' : 'text-gray-400'}>
                Module 0: Orientation completed
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-5 h-5 ${progress.rulesCompleted.length >= 5 ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={progress.rulesCompleted.length >= 5 ? 'text-gray-900' : 'text-gray-400'}>
                At least 5 rules studied ({progress.rulesCompleted.length}/10)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-5 h-5 ${progress.perfectLabels.length >= 1 ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={progress.perfectLabels.length >= 1 ? 'text-gray-900' : 'text-gray-400'}>
                At least 1 labeling challenge completed ({progress.perfectLabels.length} done)
              </span>
            </div>
          </div>
        </div>

        {/* Assessment info */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-blue-900 mb-4">Assessment Details</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900">20 Questions</h3>
                <p className="text-sm text-blue-700">Multiple choice format covering all 10 rules</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900">70% to Pass</h3>
                <p className="text-sm text-blue-700">Need at least 14 correct answers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900">Certificate</h3>
                <p className="text-sm text-blue-700">Printable certificate on completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Start button */}
        <div className="text-center">
          <button
            onClick={() => setSection('mcq')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            Start Assessment
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-500 mt-4">
            You can retake the assessment if you don&apos;t pass on your first attempt
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/modules/simulator"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            Module 4: Simulator
          </Link>
        </div>
      </div>
    </div>
  );
}
