import { Flashcard } from '@/types/course';
import { LANDMARKS } from './landmarks';
import { RULES } from './rules';

// Landmark flashcards
export const LANDMARK_FLASHCARDS: Flashcard[] = LANDMARKS.map(landmark => ({
  id: `landmark-${landmark.id}`,
  type: 'landmark' as const,
  front: `What is the ${landmark.name}?`,
  back: `${landmark.description}\n\n**Clinical Significance:**\n${landmark.clinicalSignificance}\n\n**Zone:** ${landmark.zone.replace('ZONE_', 'Zone ')}`,
  relatedLandmarkIds: [landmark.id],
  relatedRuleIds: landmark.requiredForRuleIds,
}));

// Rule summary flashcards
export const RULE_SUMMARY_FLASHCARDS: Flashcard[] = RULES.map(rule => ({
  id: `rule-summary-${rule.id}`,
  type: 'rule' as const,
  front: `Rule ${rule.id}: ${rule.title}`,
  back: `${rule.summary}\n\n**Key Checkpoints:**\n${rule.visualCheckpoints.slice(0, 3).map(c => `• ${c}`).join('\n')}\n\n**Mnemonic:** ${rule.mnemonicAid || 'N/A'}`,
  relatedRuleIds: [rule.id],
  relatedLandmarkIds: rule.requiredLandmarks,
}));

// Failure mode flashcards
export const FAILURE_MODE_FLASHCARDS: Flashcard[] = RULES.flatMap(rule =>
  rule.failureModes.map((failure, index) => ({
    id: `failure-${rule.id}-${index}`,
    type: 'danger_boundary' as const,
    front: `What happens if Rule ${rule.id} (${rule.title}) is violated by: "${failure.description}"?`,
    back: `**Consequence:**\n${failure.consequence}\n\n**Prevention:**\n${failure.prevention}`,
    relatedRuleIds: [rule.id],
  }))
);

// Zone identification flashcards
export const ZONE_FLASHCARDS: Flashcard[] = [
  {
    id: 'zone-1-flashcard',
    type: 'landmark' as const,
    front: 'What is Zone 1 (Lateral Space)?',
    back: 'The lateral space containing the iliopsoas muscle.\n\n**Safe for:** Dissection with caution\n**Contains:** Femoral nerve, LFCN\n**Risks:** Nerve injury if fixation placed here\n\n**Color code:** Tan/Beige',
  },
  {
    id: 'zone-2-flashcard',
    type: 'landmark' as const,
    front: 'What is Zone 2 (Medial Direct Space)?',
    back: 'The medial space containing the direct hernia area and Cooper\'s ligament.\n\n**Safe for:** Fixation (above IPT)\n**Contains:** Direct space, femoral canal, bladder\n**Risks:** Bladder injury, missed femoral hernia\n\n**Color code:** Green',
  },
  {
    id: 'zone-3-flashcard',
    type: 'landmark' as const,
    front: 'What is Zone 3 (Central High-Risk Zone)?',
    back: 'The central zone containing the deep ring and major vessels.\n\n**NO FIXATION HERE!**\n**Contains:** Triangle of Doom, iliac vessels, deep ring\n**Risks:** Life-threatening hemorrhage, vas injury\n\n**Color code:** Red',
  },
];

// Danger triangle flashcards
export const DANGER_TRIANGLE_FLASHCARDS: Flashcard[] = [
  {
    id: 'triangle-doom-flashcard',
    type: 'danger_boundary' as const,
    front: 'What is the Triangle of Doom?',
    back: 'V-shaped area between vas deferens (medial) and spermatic vessels (lateral).\n\n**Contains:** External iliac artery and vein\n**Risk:** Life-threatening hemorrhage if injured\n\n**Rule:** Never dissect or fix in this area!',
  },
  {
    id: 'triangle-pain-flashcard',
    type: 'danger_boundary' as const,
    front: 'What is the Triangle of Pain?',
    back: 'Area lateral to spermatic vessels, bounded by iliopubic tract inferiorly.\n\n**Contains:** Femoral nerve, LFCN, genitofemoral nerve\n**Risk:** Chronic groin pain, meralgia paresthetica\n\n**Rule:** No fixation below iliopubic tract!',
  },
  {
    id: 'safe-fixation-flashcard',
    type: 'danger_boundary' as const,
    front: 'Where is it SAFE to fix mesh?',
    back: '**SAFE areas:**\n• Zone 2 (medial space) above iliopubic tract\n• Cooper\'s ligament\n• Rectus muscle edge\n\n**NEVER fix:**\n• Below iliopubic tract\n• To inferior epigastric vessels\n• To pubic bone\n• In Triangle of Doom or Pain',
  },
];

// Inverted Y flashcards
export const INVERTED_Y_FLASHCARDS: Flashcard[] = [
  {
    id: 'inverted-y-overview',
    type: 'landmark' as const,
    front: 'What forms the Inverted Y?',
    back: '**Superior arm (stem):**\nInferior Epigastric Vessels (RED)\n\n**Medial arm:**\nVas Deferens (WHITE)\n\n**Lateral arm:**\nSpermatic Vessels (BLUE)\n\nThe three structures meet at the deep inguinal ring.',
  },
  {
    id: 'inverted-y-iev',
    type: 'landmark' as const,
    front: 'What is the role of the Inferior Epigastric Vessels in the Inverted Y?',
    back: 'Forms the superior (vertical) arm of the Y.\n\n**Color:** Red\n**Direction:** Runs vertically toward rectus muscle\n**Clinical:** Lateral boundary of Hesselbach\'s triangle\n\nMust be identified to avoid injury during fixation!',
    relatedLandmarkIds: ['inferior_epigastric_vessels'],
  },
];

// Combined deck for comprehensive review
export const ALL_FLASHCARDS: Flashcard[] = [
  ...LANDMARK_FLASHCARDS,
  ...RULE_SUMMARY_FLASHCARDS,
  ...FAILURE_MODE_FLASHCARDS,
  ...ZONE_FLASHCARDS,
  ...DANGER_TRIANGLE_FLASHCARDS,
  ...INVERTED_Y_FLASHCARDS,
];

// Lesson-specific flashcard decks
export const LESSON_FLASHCARD_DECKS = {
  'inverted-y': [
    ...INVERTED_Y_FLASHCARDS,
    ...LANDMARK_FLASHCARDS.filter(f =>
      ['inferior_epigastric_vessels', 'vas_deferens', 'spermatic_vessels'].some(id =>
        f.relatedLandmarkIds?.includes(id)
      )
    ),
  ],
  'zones': ZONE_FLASHCARDS,
  'danger-regions': DANGER_TRIANGLE_FLASHCARDS,
  'iliopubic-tract': [
    ...LANDMARK_FLASHCARDS.filter(f => f.relatedLandmarkIds?.includes('iliopubic_tract')),
    DANGER_TRIANGLE_FLASHCARDS.find(f => f.id === 'safe-fixation-flashcard')!,
  ].filter(Boolean),
};

// Rule-specific flashcard decks
export function getFlashcardsForRule(ruleId: number): Flashcard[] {
  return ALL_FLASHCARDS.filter(f => f.relatedRuleIds?.includes(ruleId));
}

// Landmark-specific flashcards
export function getFlashcardsForLandmark(landmarkId: string): Flashcard[] {
  return ALL_FLASHCARDS.filter(f => f.relatedLandmarkIds?.includes(landmarkId));
}

// Get random flashcards for review
export function getRandomFlashcards(count: number, type?: Flashcard['type']): Flashcard[] {
  let cards = type ? ALL_FLASHCARDS.filter(f => f.type === type) : ALL_FLASHCARDS;
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get final review deck (10-minute review)
export function getFinalReviewDeck(): Flashcard[] {
  return [
    ...RULE_SUMMARY_FLASHCARDS.slice(0, 5), // 5 key rules
    ...ZONE_FLASHCARDS, // 3 zones
    ...DANGER_TRIANGLE_FLASHCARDS.slice(0, 2), // 2 danger triangles
    INVERTED_Y_FLASHCARDS[0], // Inverted Y overview
  ];
}
