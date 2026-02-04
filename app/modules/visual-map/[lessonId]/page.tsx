'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen } from 'lucide-react';
import { AnatomySVGViewer } from '@/components/anatomy/AnatomySVGViewer';
import { FlashcardViewer } from '@/components/learning/FlashcardViewer';
import { QuizComponent } from '@/components/learning/QuizComponent';
import { useCourseStore } from '@/lib/stores/courseStore';
import { LESSON_FLASHCARD_DECKS, ZONE_FLASHCARDS, DANGER_TRIANGLE_FLASHCARDS, INVERTED_Y_FLASHCARDS } from '@/lib/data/flashcards';
import { Flashcard } from '@/types/course';

type LessonId = 'inverted-y' | 'iliopubic-tract' | 'zones' | 'danger-regions';

interface LessonData {
  id: LessonId;
  title: string;
  svgUrl: string;
  content: {
    introduction: string;
    sections: { title: string; text: string; landmarks?: string[] }[];
    keyTakeaway: string;
  };
  flashcards: Flashcard[];
  quiz: any[];
  highlightedLandmarks: string[];
  nextLesson: LessonId | null;
  prevLesson: LessonId | null;
}

const lessonsData: Record<LessonId, LessonData> = {
  'inverted-y': {
    id: 'inverted-y',
    title: 'The Inverted Y',
    svgUrl: '/svg/inverted-y.svg',
    content: {
      introduction: 'The Inverted Y is the fundamental landmark for orienting to posterior groin anatomy during rTAPP. Formed by three key structures, it provides immediate orientation when you enter the preperitoneal space.',
      sections: [
        {
          title: 'Inferior Epigastric Vessels (Superior Arm)',
          text: 'The IEV form the vertical, superior arm of the Y. These RED vessels run straight up from the deep ring toward the rectus muscle. They are the lateral boundary of Hesselbach\'s triangle and must be identified to avoid injury during mesh fixation.',
          landmarks: ['inferior_epigastric_vessels'],
        },
        {
          title: 'Vas Deferens (Medial Limb)',
          text: 'The vas deferens is the WHITE cord structure forming the medial limb of the Y. It courses from the deep ring toward the pelvis. Critical to identify and preserve during parietalization.',
          landmarks: ['vas_deferens'],
        },
        {
          title: 'Spermatic Vessels (Lateral Limb)',
          text: 'The spermatic vessels are the BLUE structures forming the lateral limb. They include the testicular artery and pampiniform plexus. Form the medial boundary of the Triangle of Pain.',
          landmarks: ['spermatic_vessels'],
        },
      ],
      keyTakeaway: 'The Inverted Y (IEV + Vas + Spermatic vessels) is your primary orientation landmark. Find it first, and the rest of the anatomy falls into place.',
    },
    flashcards: INVERTED_Y_FLASHCARDS,
    quiz: [
      {
        id: 'iy-1',
        question: 'Which structure forms the SUPERIOR arm of the Inverted Y?',
        options: [
          { id: 'a', text: 'Vas deferens' },
          { id: 'b', text: 'Spermatic vessels' },
          { id: 'c', text: 'Inferior epigastric vessels' },
          { id: 'd', text: 'Iliopubic tract' },
        ],
        correctOptionId: 'c',
        explanation: 'The inferior epigastric vessels (IEV) form the vertical, superior arm of the Inverted Y.',
        difficulty: 'easy' as const,
        category: 'anatomy' as const,
      },
      {
        id: 'iy-2',
        question: 'The vas deferens is typically what color on the posterior view?',
        options: [
          { id: 'a', text: 'Red' },
          { id: 'b', text: 'Blue' },
          { id: 'c', text: 'White/Beige' },
          { id: 'd', text: 'Yellow' },
        ],
        correctOptionId: 'c',
        explanation: 'The vas deferens appears white/beige and forms the medial limb of the Inverted Y.',
        difficulty: 'easy' as const,
        category: 'anatomy' as const,
      },
    ],
    highlightedLandmarks: ['inferior_epigastric_vessels', 'vas_deferens', 'spermatic_vessels'],
    nextLesson: 'iliopubic-tract',
    prevLesson: null,
  },
  'iliopubic-tract': {
    id: 'iliopubic-tract',
    title: 'Iliopubic Tract',
    svgUrl: '/svg/inverted-y.svg',
    content: {
      introduction: 'The iliopubic tract is arguably the most important structure for safe mesh fixation. It marks the absolute boundary below which NO fixation should ever be placed.',
      sections: [
        {
          title: 'Anatomy',
          text: 'The iliopubic tract is a fascial thickening running parallel to the inguinal ligament on its posterior (deep) surface. It extends from the anterior superior iliac spine to the pubic tubercle.',
          landmarks: ['iliopubic_tract'],
        },
        {
          title: 'Clinical Significance',
          text: 'Below the iliopubic tract lie the femoral nerve, lateral femoral cutaneous nerve (LFCN), and genitofemoral nerve. Placing tacks or sutures below this line causes chronic groin pain in up to 5-10% of patients.',
          landmarks: ['iliopubic_tract'],
        },
        {
          title: 'Rule 9: Safe Fixation',
          text: 'NEVER fix below the iliopubic tract. NEVER fix to the inferior epigastric vessels. NEVER fix to bone. Safe fixation is in Zone 2 (medial space) above the tract, including Cooper\'s ligament.',
          landmarks: ['coopers_ligament'],
        },
      ],
      keyTakeaway: 'The iliopubic tract is your NO-GO line for fixation. When in doubt, don\'t fix. Many surgeons avoid fixation entirely with good results.',
    },
    flashcards: LESSON_FLASHCARD_DECKS['iliopubic-tract'] || [],
    quiz: [
      {
        id: 'ipt-1',
        question: 'What is the consequence of placing mesh fixation below the iliopubic tract?',
        options: [
          { id: 'a', text: 'Mesh migration' },
          { id: 'b', text: 'Chronic groin pain from nerve injury' },
          { id: 'c', text: 'Hernia recurrence' },
          { id: 'd', text: 'Bleeding' },
        ],
        correctOptionId: 'b',
        explanation: 'Fixation below the iliopubic tract can injure the femoral nerve, LFCN, or genitofemoral nerve, causing chronic pain.',
        difficulty: 'easy' as const,
        category: 'safety' as const,
      },
    ],
    highlightedLandmarks: ['iliopubic_tract', 'coopers_ligament'],
    nextLesson: 'zones',
    prevLesson: 'inverted-y',
  },
  'zones': {
    id: 'zones',
    title: 'Zones 1, 2, and 3',
    svgUrl: '/svg/zones.svg',
    content: {
      introduction: 'The myopectineal orifice is divided into three zones based on anatomical boundaries and safety profiles. Understanding these zones is critical for safe dissection and fixation.',
      sections: [
        {
          title: 'Zone 1 - Lateral Space',
          text: 'Zone 1 is lateral to the spermatic vessels, overlying the iliopsoas muscle. It\'s generally safe for dissection but contains the femoral nerve and LFCN. Be cautious with fixation near the iliopubic tract.',
          landmarks: ['iliopsoas_muscle'],
        },
        {
          title: 'Zone 2 - Medial Direct Space',
          text: 'Zone 2 is medial to the inferior epigastric vessels. It contains the direct hernia space, Cooper\'s ligament, and femoral canal. This is the SAFEST zone for mesh fixation.',
          landmarks: ['coopers_ligament', 'femoral_canal'],
        },
        {
          title: 'Zone 3 - Central High-Risk Zone',
          text: 'Zone 3 is central, containing the deep inguinal ring, Triangle of Doom, and iliac vessels. NO FIXATION in this zone! This is where indirect hernias originate.',
          landmarks: ['deep_inguinal_ring', 'external_iliac_vein'],
        },
      ],
      keyTakeaway: 'Zone 2 (medial) is safest for fixation. Zone 3 (central) is NO-GO for fixation. Zone 1 (lateral) requires caution near nerves.',
    },
    flashcards: ZONE_FLASHCARDS,
    quiz: [
      {
        id: 'zone-1',
        question: 'Which zone is SAFEST for mesh fixation?',
        options: [
          { id: 'a', text: 'Zone 1 - Lateral' },
          { id: 'b', text: 'Zone 2 - Medial' },
          { id: 'c', text: 'Zone 3 - Central' },
          { id: 'd', text: 'All zones are equally safe' },
        ],
        correctOptionId: 'b',
        explanation: 'Zone 2 (Medial) is the safest for fixation - above critical nerves and away from major vessels.',
        difficulty: 'easy' as const,
        category: 'safety' as const,
      },
      {
        id: 'zone-2',
        question: 'Zone 3 contains which dangerous structure?',
        options: [
          { id: 'a', text: 'Femoral nerve' },
          { id: 'b', text: 'Triangle of Doom with iliac vessels' },
          { id: 'c', text: 'Bladder' },
          { id: 'd', text: 'Cooper\'s ligament' },
        ],
        correctOptionId: 'b',
        explanation: 'Zone 3 contains the Triangle of Doom with external iliac vessels - the highest risk area.',
        difficulty: 'medium' as const,
        category: 'anatomy' as const,
      },
    ],
    highlightedLandmarks: [],
    nextLesson: 'danger-regions',
    prevLesson: 'iliopubic-tract',
  },
  'danger-regions': {
    id: 'danger-regions',
    title: 'Danger Regions',
    svgUrl: '/svg/triangles.svg',
    content: {
      introduction: 'The posterior groin contains several "danger triangles" that house critical structures. Recognizing and respecting these areas is essential for avoiding catastrophic complications.',
      sections: [
        {
          title: 'Triangle of Doom',
          text: 'The V-shaped area between the vas deferens (medial) and spermatic vessels (lateral). Contains the external iliac artery and vein. Injury here can cause life-threatening hemorrhage.',
          landmarks: ['vas_deferens', 'spermatic_vessels', 'external_iliac_vein'],
        },
        {
          title: 'Triangle of Pain',
          text: 'Lateral to the spermatic vessels, bounded by the iliopubic tract inferiorly. Contains femoral nerve, LFCN, and genitofemoral nerve. Injury causes chronic pain and numbness.',
          landmarks: ['spermatic_vessels', 'iliopubic_tract'],
        },
        {
          title: 'Femoral Triangle',
          text: 'Below the inguinal ligament, medial to the iliac vein. Site of femoral hernias. Must be visualized (Rule 4) to confirm no missed femoral hernia.',
          landmarks: ['femoral_canal', 'external_iliac_vein'],
        },
      ],
      keyTakeaway: 'Know your danger triangles: Doom = vessels (fatal), Pain = nerves (chronic pain), Femoral = hernias (recurrence if missed).',
    },
    flashcards: DANGER_TRIANGLE_FLASHCARDS,
    quiz: [
      {
        id: 'danger-1',
        question: 'What structures are contained in the Triangle of Doom?',
        options: [
          { id: 'a', text: 'Femoral nerve and LFCN' },
          { id: 'b', text: 'External iliac artery and vein' },
          { id: 'c', text: 'Vas deferens and spermatic vessels' },
          { id: 'd', text: 'Cooper\'s ligament and bladder' },
        ],
        correctOptionId: 'b',
        explanation: 'The Triangle of Doom contains the external iliac artery and vein - injury can be fatal.',
        difficulty: 'easy' as const,
        category: 'anatomy' as const,
      },
      {
        id: 'danger-2',
        question: 'The Triangle of Pain is located where relative to the spermatic vessels?',
        options: [
          { id: 'a', text: 'Medial' },
          { id: 'b', text: 'Lateral' },
          { id: 'c', text: 'Superior' },
          { id: 'd', text: 'Between vas and spermatic vessels' },
        ],
        correctOptionId: 'b',
        explanation: 'The Triangle of Pain is LATERAL to the spermatic vessels, over the iliopsoas muscle.',
        difficulty: 'medium' as const,
        category: 'anatomy' as const,
      },
    ],
    highlightedLandmarks: [],
    nextLesson: null,
    prevLesson: 'zones',
  },
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as LessonId;
  const [activeTab, setActiveTab] = useState<'learn' | 'flashcards' | 'quiz'>('learn');
  const [sectionIndex, setSectionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [flashcardsCompleted, setFlashcardsCompleted] = useState(false);

  const { completeLesson, progress } = useCourseStore();

  const lesson = lessonsData[lessonId];

  useEffect(() => {
    if (!lesson) {
      router.push('/modules/visual-map');
    }
  }, [lesson, router]);

  if (!lesson) {
    return null;
  }

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    if (flashcardsCompleted) {
      completeLesson(1, lesson.id);
    }
  };

  const handleFlashcardsComplete = () => {
    setFlashcardsCompleted(true);
    if (quizCompleted) {
      completeLesson(1, lesson.id);
    }
  };

  const isLessonComplete = quizCompleted && flashcardsCompleted;
  const currentSection = lesson.content.sections[sectionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/modules/visual-map" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Visual Map</span>
          </Link>
          <div className="flex items-center gap-2">
            {isLessonComplete && (
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
                Flashcards
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
                Quiz
                {quizCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{lesson.title}</h1>

        {activeTab === 'learn' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* SVG Viewer */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <AnatomySVGViewer
                svgUrl={lesson.svgUrl}
                mode="study"
                highlightedLandmarks={currentSection?.landmarks || []}
                showLabels={true}
                className="h-[450px]"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Introduction */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-700">{lesson.content.introduction}</p>
              </div>

              {/* Sections */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex border-b">
                  {lesson.content.sections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => setSectionIndex(index)}
                      className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                        sectionIndex === index
                          ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {section.title.split(' ')[0]}...
                    </button>
                  ))}
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{currentSection.title}</h3>
                  <p className="text-gray-700">{currentSection.text}</p>
                </div>
              </div>

              {/* Key Takeaway */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h4 className="font-semibold text-yellow-900 mb-2">Key Takeaway</h4>
                <p className="text-yellow-800">{lesson.content.keyTakeaway}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flashcards' && (
          <div className="max-w-xl mx-auto">
            <FlashcardViewer
              cards={lesson.flashcards}
              title={`${lesson.title} Flashcards`}
              onComplete={handleFlashcardsComplete}
            />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-xl mx-auto">
            <QuizComponent
              questions={lesson.quiz}
              title={`${lesson.title} Quiz`}
              onComplete={handleQuizComplete}
            />
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          {lesson.prevLesson ? (
            <Link
              href={`/modules/visual-map/${lesson.prevLesson}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Lesson
            </Link>
          ) : (
            <div />
          )}

          {isLessonComplete && (
            lesson.nextLesson ? (
              <Link
                href={`/modules/visual-map/${lesson.nextLesson}`}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Next Lesson
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/modules/rules"
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Continue to Module 2
                <ChevronRight className="w-5 h-5" />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
