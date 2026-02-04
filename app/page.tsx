'use client';

import Link from 'next/link';
import { BookOpen, Target, Trophy, Repeat, ChevronRight, Play } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-semibold text-gray-900">MPO Course</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/modules/orientation" className="text-gray-600 hover:text-gray-900 transition-colors">
              Start Learning
            </Link>
            <Link href="/modules/rules" className="text-gray-600 hover:text-gray-900 transition-colors">
              10 Rules
            </Link>
            <Link href="/modules/labeling-lab" className="text-gray-600 hover:text-gray-900 transition-colors">
              Practice Lab
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Interactive Surgical Anatomy Training
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Master the Critical View of the{' '}
            <span className="text-blue-600">Myopectineal Orifice</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn the 10 Golden Rules for safe MIS inguinal hernia repair through
            interactive anatomy diagrams, spaced repetition, and hands-on practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/modules/orientation"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5" />
              Start Course
            </Link>
            <Link
              href="/modules/visual-map"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
            >
              Explore Anatomy
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <StatCard number="10" label="Golden Rules" />
          <StatCard number="12" label="Key Landmarks" />
          <StatCard number="3" label="Dissection Zones" />
          <StatCard number="5" label="Danger Triangles" />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard
            icon={<BookOpen className="w-8 h-8" />}
            title="10 Golden Rules"
            description="Master the critical steps for safe rTAPP surgery based on peer-reviewed literature"
          />
          <FeatureCard
            icon={<Target className="w-8 h-8" />}
            title="Interactive SVGs"
            description="Click, label, and learn anatomical landmarks with instant feedback"
          />
          <FeatureCard
            icon={<Repeat className="w-8 h-8" />}
            title="Flashcard Review"
            description="Reinforce key anatomy and rules within your learning session"
          />
          <FeatureCard
            icon={<Trophy className="w-8 h-8" />}
            title="Assessment"
            description="Test your knowledge with MCQs, labeling tasks, and scenario decisions"
          />
        </div>

        {/* Course Modules */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Modules</h2>
          <div className="space-y-4">
            <ModuleCard
              number={0}
              title="Orientation"
              description="Introduction to posterior groin anatomy and the Critical View of the MPO"
              duration="5-7 min"
              href="/modules/orientation"
            />
            <ModuleCard
              number={1}
              title="The Visual Map"
              description="Learn the Inverted Y, iliopubic tract, zones, and danger regions"
              duration="20-30 min"
              href="/modules/visual-map"
            />
            <ModuleCard
              number={2}
              title="The 10 Rules"
              description="Master each rule with step-by-step guidance and visual checkpoints"
              duration="60-90 min"
              href="/modules/rules"
            />
            <ModuleCard
              number={3}
              title="Image Labeling Lab"
              description="Practice identifying landmarks in study and test modes"
              duration="20-30 min"
              href="/modules/labeling-lab"
            />
            <ModuleCard
              number={4}
              title="Procedural Simulator"
              description="Work through standard and complex hernia scenarios"
              duration="15-20 min"
              href="/modules/simulator"
            />
            <ModuleCard
              number={5}
              title="Assessment & Certification"
              description="Complete MCQs, labeling tasks, and earn your certificate"
              duration="30-45 min"
              href="/modules/assessment"
            />
          </div>
        </div>

        {/* Target Audience */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Is This Course For?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Designed for surgeons at all levels seeking mastery of posterior groin anatomy
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              General Surgeons
            </span>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              MIS Fellows
            </span>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              Senior Residents
            </span>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              Practicing Surgeons
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">
              Based on &ldquo;Ten Golden Rules for a Safe MIS Inguinal Hernia Repair&rdquo;
              by Claus et al., <em>Surgical Endoscopy</em> (2020)
            </p>
            <p>Educational use only</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md text-center">
      <div className="text-3xl font-bold text-blue-600 mb-1">{number}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function ModuleCard({
  number,
  title,
  description,
  duration,
  href
}: {
  number: number;
  title: string;
  description: string;
  duration: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
    >
      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold shrink-0">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 truncate">{description}</p>
      </div>
      <div className="text-sm text-gray-500 shrink-0 hidden sm:block">{duration}</div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
    </Link>
  );
}
