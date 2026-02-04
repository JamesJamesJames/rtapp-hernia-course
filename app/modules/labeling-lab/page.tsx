'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Target, CheckCircle, Lock } from 'lucide-react';
import { LabelingChallenge } from '@/components/learning/LabelingChallenge';
import { LABELING_CHALLENGES, getChallengesByDifficulty } from '@/lib/data/challenges';
import { useCourseStore } from '@/lib/stores/courseStore';

export default function LabelingLabPage() {
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const { progress, startModule, recordLabelingScore } = useCourseStore();

  React.useEffect(() => {
    startModule(3);
  }, [startModule]);

  const beginnerChallenges = getChallengesByDifficulty('beginner');
  const intermediateChallenges = getChallengesByDifficulty('intermediate');
  const advancedChallenges = getChallengesByDifficulty('advanced');

  const completedChallenges = progress.perfectLabels || [];

  const handleChallengeComplete = (challengeId: string, score: number, total: number) => {
    recordLabelingScore(3, challengeId, (score / total) * 100, [], []);
    setActiveChallenge(null);
  };

  const currentChallenge = activeChallenge
    ? LABELING_CHALLENGES.find(c => c.id === activeChallenge)
    : null;

  if (currentChallenge) {
    const svgUrls: Record<string, string> = {
      'inverted-y': '/svg/inverted-y.svg',
      'zones': '/svg/zones.svg',
      'triangles': '/svg/triangles.svg',
      'full-mpo': '/svg/full-mpo.svg',
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setActiveChallenge(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Challenges</span>
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <LabelingChallenge
            challenge={currentChallenge}
            svgUrl={svgUrls[currentChallenge.imageId] || '/svg/full-mpo.svg'}
            onComplete={(score, total) => handleChallengeComplete(currentChallenge.id, score, total)}
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
            <span>Module 3</span>
            <span>•</span>
            <span>Image Labeling Lab</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
              3
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Image Labeling Lab</h1>
              <p className="text-gray-600">Practice identifying anatomical landmarks</p>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Challenges Completed</span>
              <span className="text-sm text-gray-500">
                {completedChallenges.length} / {LABELING_CHALLENGES.length}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(completedChallenges.length / LABELING_CHALLENGES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-blue-900 mb-3">How It Works</h2>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <Target className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <span>Each challenge presents an anatomical diagram with labels hidden</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <span>Click on the structure that matches the prompt</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <span>Get instant feedback and explanations</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <span>Achieve 100% accuracy to complete each challenge</span>
            </li>
          </ul>
        </div>

        {/* Beginner Challenges */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-sm">Beginner</span>
            Foundational Challenges
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {beginnerChallenges.map((challenge) => {
              const isCompleted = completedChallenges.includes(challenge.id);
              return (
                <button
                  key={challenge.id}
                  onClick={() => setActiveChallenge(challenge.id)}
                  className="text-left bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isCompleted ? 'bg-green-100 text-green-600' : 'bg-green-50 text-green-500'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Target className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {challenge.prompts.length} prompts • {challenge.attempts} attempts allowed
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Intermediate Challenges */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-sm">Intermediate</span>
            Zone & Triangle Challenges
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {intermediateChallenges.map((challenge) => {
              const isCompleted = completedChallenges.includes(challenge.id);
              return (
                <button
                  key={challenge.id}
                  onClick={() => setActiveChallenge(challenge.id)}
                  className="text-left bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-yellow-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isCompleted ? 'bg-green-100 text-green-600' : 'bg-yellow-50 text-yellow-500'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Target className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {challenge.prompts.length} prompts • {challenge.attempts} attempts allowed
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Challenges */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-sm">Advanced</span>
            Complete Anatomy Review
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {advancedChallenges.map((challenge) => {
              const isCompleted = completedChallenges.includes(challenge.id);
              return (
                <button
                  key={challenge.id}
                  onClick={() => setActiveChallenge(challenge.id)}
                  className="text-left bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-red-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isCompleted ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Target className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {challenge.prompts.length} prompts
                        {challenge.timeLimit && ` • ${challenge.timeLimit}s time limit`}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/modules/rules"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            Module 2: The 10 Rules
          </Link>

          <Link
            href="/modules/simulator"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue to Simulator
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
