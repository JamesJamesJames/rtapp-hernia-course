'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Target, Lightbulb } from 'lucide-react';
import { Rule } from '@/types/course';
import { getLandmarkById } from '@/lib/data/landmarks';

interface RuleCardProps {
  rule: Rule;
  expanded?: boolean;
  showAnatomyLink?: boolean;
  onLandmarkClick?: (landmarkId: string) => void;
}

export function RuleCard({
  rule,
  expanded: initialExpanded = false,
  showAnatomyLink = false,
  onLandmarkClick,
}: RuleCardProps) {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [activeSection, setActiveSection] = useState<'steps' | 'checkpoints' | 'failures'>('steps');

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                {rule.id}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{rule.title}</h3>
            </div>
            <p className="text-gray-600 ml-13">{rule.summary}</p>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-gray-100">
          {/* Why It Matters */}
          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Why It Matters</h4>
                <p className="text-blue-800 text-sm">{rule.whyItMatters}</p>
              </div>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeSection === 'steps'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('steps')}
            >
              Steps ({rule.steps.length})
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeSection === 'checkpoints'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('checkpoints')}
            >
              Checkpoints ({rule.visualCheckpoints.length})
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeSection === 'failures'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('failures')}
            >
              Failures ({rule.failureModes.length})
            </button>
          </div>

          {/* Section Content */}
          <div className="p-6">
            {activeSection === 'steps' && (
              <div className="space-y-4">
                {rule.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm shrink-0">
                      {step.order}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{step.instruction}</p>
                      {step.tip && (
                        <p className="text-sm text-gray-500 mt-1 italic">Tip: {step.tip}</p>
                      )}
                      {step.landmarkToVisualize && showAnatomyLink && (
                        <button
                          className="text-sm text-blue-600 hover:text-blue-800 mt-1 flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            onLandmarkClick?.(step.landmarkToVisualize!);
                          }}
                        >
                          <Target className="w-4 h-4" />
                          View: {getLandmarkById(step.landmarkToVisualize)?.name}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'checkpoints' && (
              <div className="space-y-3">
                {rule.visualCheckpoints.map((checkpoint, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-gray-700">{checkpoint}</p>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'failures' && (
              <div className="space-y-4">
                {rule.failureModes.map((failure, index) => (
                  <div key={index} className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-red-900">{failure.description}</p>
                        <p className="text-sm text-red-700 mt-1">
                          <strong>Consequence:</strong> {failure.consequence}
                        </p>
                        <p className="text-sm text-red-600 mt-1">
                          <strong>Prevention:</strong> {failure.prevention}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Required Landmarks */}
          {rule.requiredLandmarks.length > 0 && (
            <div className="px-6 pb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Landmarks</h4>
              <div className="flex flex-wrap gap-2">
                {rule.requiredLandmarks.map(landmarkId => {
                  const landmark = getLandmarkById(landmarkId);
                  return landmark ? (
                    <button
                      key={landmarkId}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                      onClick={() => onLandmarkClick?.(landmarkId)}
                    >
                      {landmark.name}
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Mnemonic Aid */}
          {rule.mnemonicAid && (
            <div className="px-6 pb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Lightbulb className="w-5 h-5" />
                  <span className="font-semibold">Remember:</span>
                </div>
                <p className="text-yellow-900 mt-1 italic">{rule.mnemonicAid}</p>
              </div>
            </div>
          )}

          {/* Complication Prevented */}
          <div className="px-6 pb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Complications Prevented:</strong> {rule.complicationPrevented}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RuleCard;
