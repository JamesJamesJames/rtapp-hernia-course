'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, CheckCircle, Eye } from 'lucide-react';
import { useCourseStore } from '@/lib/stores/courseStore';

const lessons = [
  {
    id: 'inverted-y',
    title: 'The Inverted Y',
    description: 'Learn the fundamental landmark formed by IEV, vas deferens, and spermatic vessels',
    duration: '8-10 min',
    landmarks: ['Inferior Epigastric Vessels', 'Vas Deferens', 'Spermatic Vessels'],
  },
  {
    id: 'iliopubic-tract',
    title: 'Iliopubic Tract',
    description: 'Understand the critical fixation boundary and its clinical significance',
    duration: '5-7 min',
    landmarks: ['Iliopubic Tract', 'Inguinal Ligament'],
  },
  {
    id: 'zones',
    title: 'Zones 1, 2, and 3',
    description: 'Master the three dissection zones and their safety profiles',
    duration: '8-10 min',
    landmarks: ['Zone 1 (Lateral)', 'Zone 2 (Medial)', 'Zone 3 (Central)'],
  },
  {
    id: 'danger-regions',
    title: 'Danger Regions',
    description: 'Identify the Triangle of Doom, Triangle of Pain, and femoral region',
    duration: '10-12 min',
    landmarks: ['Triangle of Doom', 'Triangle of Pain', 'Femoral Triangle'],
  },
];

export default function VisualMapPage() {
  const { progress, startModule } = useCourseStore();

  React.useEffect(() => {
    startModule(1);
  }, [startModule]);

  const moduleProgress = progress.modules.find(m => m.moduleId === 1);
  const completedLessons = moduleProgress?.lessonsCompleted || [];

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
            <span>Module 1</span>
            <span>•</span>
            <span>The Visual Map</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
              1
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">The Visual Map</h1>
              <p className="text-gray-600">Build your mental model of posterior groin anatomy</p>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Module Progress</span>
              <span className="text-sm text-gray-500">
                {completedLessons.length} / {lessons.length} lessons
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-blue-900 mb-3">By the end of this module, you will be able to:</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-blue-800">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <span>Instantly identify the Inverted Y and orient to posterior groin anatomy</span>
            </li>
            <li className="flex items-start gap-2 text-blue-800">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <span>Recognize the iliopubic tract as the critical fixation boundary</span>
            </li>
            <li className="flex items-start gap-2 text-blue-800">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <span>Correctly define and locate Zones 1, 2, and 3</span>
            </li>
            <li className="flex items-start gap-2 text-blue-800">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <span>Identify all danger regions and understand their clinical significance</span>
            </li>
          </ul>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Lessons</h2>

          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);

            return (
              <Link
                key={lesson.id}
                href={`/modules/visual-map/${lesson.id}`}
                className="block bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-blue-300 border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                      isCompleted
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Eye className="w-6 h-6" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                        {isCompleted && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">{lesson.duration}</span>
                        <div className="flex flex-wrap gap-1">
                          {lesson.landmarks.map(landmark => (
                            <span
                              key={landmark}
                              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {landmark}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/modules/orientation"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            Module 0: Orientation
          </Link>

          {completedLessons.length === lessons.length ? (
            <Link
              href="/modules/rules"
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue to Module 2
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <span className="text-sm text-gray-500">
              Complete all lessons to unlock Module 2
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
