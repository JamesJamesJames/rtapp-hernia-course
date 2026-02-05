'use client';

import { Activity } from '@/types/paper';
import { PlaneSelectionInteraction } from './activities/PlaneSelectionInteraction';
import { DecisionScenarioInteraction } from './activities/DecisionScenarioInteraction';
import { BinaryCheckInteraction } from './activities/BinaryCheckInteraction';
import { RuleRecallInteraction } from './activities/RuleRecallInteraction';
import { SequencingInteraction } from './activities/SequencingInteraction';

interface ActivityRendererProps {
  activity: Activity;
  slug: string;
  onComplete?: (activityId: string) => void;
}

export function ActivityRenderer({ activity, slug, onComplete }: ActivityRendererProps) {
  const handleComplete = () => {
    onComplete?.(activity.id);
  };

  switch (activity.type) {
    case 'PlaneSelectionInteraction':
      return (
        <PlaneSelectionInteraction
          activity={activity}
          onComplete={handleComplete}
        />
      );
    case 'DecisionScenarioInteraction':
      return (
        <DecisionScenarioInteraction
          activity={activity}
          onComplete={handleComplete}
        />
      );
    case 'BinaryCheckInteraction':
      return (
        <BinaryCheckInteraction
          activity={activity}
          slug={slug}
          onComplete={handleComplete}
        />
      );
    case 'RuleRecallInteraction':
      return (
        <RuleRecallInteraction
          activity={activity}
          onComplete={handleComplete}
        />
      );
    case 'SequencingInteraction':
      return (
        <SequencingInteraction
          activity={activity}
          onComplete={handleComplete}
        />
      );
    case 'ImageLabelingDrill':
      return (
        <div className="p-6 bg-gray-50 rounded-lg text-center text-gray-500">
          <p className="font-medium">{activity.title}</p>
          <p className="text-sm mt-2">
            Image labeling requires hotspot data. Add hotspots.json to enable this activity.
          </p>
        </div>
      );
    case 'VideoTimestampInteraction':
      return (
        <div className="p-6 bg-gray-50 rounded-lg text-center text-gray-500">
          <p className="font-medium">{activity.title}</p>
          <p className="text-sm mt-2">
            Video interaction requires a video URL to be configured.
          </p>
        </div>
      );
    default:
      return (
        <div className="p-6 bg-gray-50 rounded-lg text-center text-gray-500">
          Unknown activity type
        </div>
      );
  }
}
