import { LabelingChallenge } from '@/types/course';

// Labeling challenges for the Image Labeling Lab
export const LABELING_CHALLENGES: LabelingChallenge[] = [
  {
    id: 'challenge-inverted-y',
    imageId: 'inverted-y',
    title: 'Identify the Inverted Y',
    description: 'The Inverted Y is the fundamental landmark for orienting to posterior groin anatomy. Identify each structure that forms this critical view.',
    difficulty: 'beginner',
    prompts: [
      {
        id: 'prompt-iev',
        instruction: 'Click the INFERIOR EPIGASTRIC VESSELS',
        correctLandmarkIds: ['inferior_epigastric_vessels'],
        distractorLandmarkIds: ['spermatic_vessels', 'external_iliac_artery'],
        feedback: {
          correct: 'Correct! The inferior epigastric vessels form the superior arm of the Y, running vertically from the deep ring toward the rectus muscle.',
          incorrect: 'Not quite. The inferior epigastric vessels are RED and run VERTICALLY upward from near the deep ring.',
          hint: 'Look for the red vessels running straight up from the base of the Y.',
        },
      },
      {
        id: 'prompt-vas',
        instruction: 'Click the VAS DEFERENS',
        correctLandmarkIds: ['vas_deferens'],
        distractorLandmarkIds: ['spermatic_vessels', 'iliopubic_tract'],
        feedback: {
          correct: 'Correct! The vas deferens forms the medial limb of the Y. It\'s the white cord structure running toward the pelvis.',
          incorrect: 'Not quite. The vas deferens is WHITE/BEIGE and runs MEDIALLY from the deep ring.',
          hint: 'Look for the white cord structure forming the medial arm of the Y.',
        },
      },
      {
        id: 'prompt-spermatic',
        instruction: 'Click the SPERMATIC VESSELS',
        correctLandmarkIds: ['spermatic_vessels'],
        distractorLandmarkIds: ['vas_deferens', 'external_iliac_vein'],
        feedback: {
          correct: 'Correct! The spermatic vessels form the lateral limb of the Y. These blue vessels include the testicular artery and pampiniform plexus.',
          incorrect: 'Not quite. The spermatic vessels are BLUE and run LATERALLY from the deep ring.',
          hint: 'Look for the blue vascular bundle forming the lateral arm of the Y.',
        },
      },
    ],
    passingScore: 100,
    attempts: 3,
  },
  {
    id: 'challenge-zones',
    imageId: 'zones',
    title: 'Identify the Three Zones',
    description: 'The MPO is divided into three zones with different safety profiles. Learn to identify each zone.',
    difficulty: 'beginner',
    prompts: [
      {
        id: 'prompt-zone1',
        instruction: 'Click ZONE 1 (Lateral Space)',
        correctLandmarkIds: ['zone_1_area'],
        distractorLandmarkIds: ['zone_2_area', 'zone_3_area'],
        feedback: {
          correct: 'Correct! Zone 1 is the lateral space. It\'s generally safe but contains the femoral nerve and LFCN.',
          incorrect: 'Not quite. Zone 1 is LATERAL - look for the tan/beige colored region near the iliopsoas muscle.',
          hint: 'Zone 1 is lateral to the spermatic vessels, overlying the iliopsoas muscle.',
        },
      },
      {
        id: 'prompt-zone2',
        instruction: 'Click ZONE 2 (Medial Direct Space)',
        correctLandmarkIds: ['zone_2_area'],
        distractorLandmarkIds: ['zone_1_area', 'zone_3_area'],
        feedback: {
          correct: 'Correct! Zone 2 is the medial space. This is the safest zone for fixation and contains the direct hernia space.',
          incorrect: 'Not quite. Zone 2 is MEDIAL - look for the green colored region near the pubic symphysis.',
          hint: 'Zone 2 is medial to the IEV, containing the direct hernia space and Cooper\'s ligament.',
        },
      },
      {
        id: 'prompt-zone3',
        instruction: 'Click ZONE 3 (Central High-Risk Zone)',
        correctLandmarkIds: ['zone_3_area'],
        distractorLandmarkIds: ['zone_1_area', 'zone_2_area'],
        feedback: {
          correct: 'Correct! Zone 3 is the central high-risk zone containing the Triangle of Doom and deep ring. NO FIXATION here!',
          incorrect: 'Not quite. Zone 3 is CENTRAL - look for the red colored region around the deep ring.',
          hint: 'Zone 3 is central, containing the deep ring, Triangle of Doom, and iliac vessels.',
        },
      },
    ],
    passingScore: 100,
    attempts: 3,
  },
  {
    id: 'challenge-danger-triangles',
    imageId: 'triangles',
    title: 'Identify the Danger Triangles',
    description: 'The danger triangles contain critical structures that must be protected. Learn to identify these high-risk areas.',
    difficulty: 'intermediate',
    prompts: [
      {
        id: 'prompt-doom',
        instruction: 'Click the TRIANGLE OF DOOM',
        correctLandmarkIds: ['triangle_of_doom'],
        distractorLandmarkIds: ['triangle_of_pain', 'femoral_triangle'],
        feedback: {
          correct: 'Correct! The Triangle of Doom lies between the vas deferens and spermatic vessels. It contains the external iliac vessels - injury here can be fatal.',
          incorrect: 'Not quite. The Triangle of Doom is V-shaped, between the vas (medial) and spermatic vessels (lateral).',
          hint: 'Look for the V-shaped area between the two limbs of the Inverted Y at the deep ring.',
        },
      },
      {
        id: 'prompt-pain',
        instruction: 'Click the TRIANGLE OF PAIN',
        correctLandmarkIds: ['triangle_of_pain'],
        distractorLandmarkIds: ['triangle_of_doom', 'indirect_triangle'],
        feedback: {
          correct: 'Correct! The Triangle of Pain is lateral to the spermatic vessels. It contains the femoral nerve and LFCN - injury causes chronic pain.',
          incorrect: 'Not quite. The Triangle of Pain is LATERAL to the spermatic vessels, over the iliopsoas.',
          hint: 'Look lateral to the spermatic vessels, bounded by the iliopubic tract inferiorly.',
        },
      },
      {
        id: 'prompt-femoral',
        instruction: 'Click the FEMORAL HERNIA TRIANGLE',
        correctLandmarkIds: ['femoral_triangle'],
        distractorLandmarkIds: ['direct_triangle', 'triangle_of_doom'],
        feedback: {
          correct: 'Correct! The Femoral Triangle is medial to the iliac vein, below the inguinal ligament. This is where femoral hernias occur.',
          incorrect: 'Not quite. The Femoral Triangle is MEDIAL, below the inguinal ligament level.',
          hint: 'Look for the area medial to the external iliac vein, around the femoral canal.',
        },
      },
    ],
    passingScore: 100,
    attempts: 3,
  },
  {
    id: 'challenge-iliopubic-tract',
    imageId: 'full-mpo',
    title: 'Identify the Iliopubic Tract',
    description: 'The iliopubic tract is the critical boundary for safe fixation. No tacks or sutures should be placed below this line.',
    difficulty: 'intermediate',
    prompts: [
      {
        id: 'prompt-ipt',
        instruction: 'Click the ILIOPUBIC TRACT',
        correctLandmarkIds: ['iliopubic_tract'],
        distractorLandmarkIds: ['coopers_ligament', 'inguinal_ligament'],
        feedback: {
          correct: 'Correct! The iliopubic tract runs parallel to the inguinal ligament on the posterior side. NEVER fix below this line!',
          incorrect: 'Not quite. The iliopubic tract is a horizontal fascial band running from lateral to medial.',
          hint: 'Look for the dashed dark blue line running horizontally across the lower portion of the MPO.',
        },
      },
      {
        id: 'prompt-safe-fix',
        instruction: 'Click a SAFE area for mesh fixation',
        correctLandmarkIds: ['zone_2_area', 'coopers_ligament', 'rectus_muscle'],
        distractorLandmarkIds: ['triangle_of_pain', 'inferior_epigastric_vessels'],
        feedback: {
          correct: 'Correct! Zone 2 (medial space) and Cooper\'s ligament are safe for fixation - above the iliopubic tract and away from danger zones.',
          incorrect: 'Be careful! Safe fixation is ABOVE the iliopubic tract, in Zone 2, and avoiding vessels.',
          hint: 'The medial space (Zone 2) above the iliopubic tract is safest.',
        },
      },
    ],
    passingScore: 100,
    attempts: 3,
  },
  {
    id: 'challenge-complete-anatomy',
    imageId: 'full-mpo',
    title: 'Complete Anatomy Review',
    description: 'Test your knowledge of all major landmarks in the myopectineal orifice.',
    difficulty: 'advanced',
    prompts: [
      {
        id: 'prompt-deep-ring',
        instruction: 'Click the DEEP INGUINAL RING',
        correctLandmarkIds: ['deep_inguinal_ring'],
        distractorLandmarkIds: ['femoral_canal', 'triangle_of_doom'],
        feedback: {
          correct: 'Correct! The deep ring is where the cord structures enter the inguinal canal. Indirect hernias originate here.',
          incorrect: 'Not quite. The deep ring is at the confluence of the Inverted Y structures.',
          hint: 'Look where the IEV, vas, and spermatic vessels meet.',
        },
      },
      {
        id: 'prompt-eiv',
        instruction: 'Click the EXTERNAL ILIAC VEIN',
        correctLandmarkIds: ['external_iliac_vein'],
        distractorLandmarkIds: ['external_iliac_artery', 'spermatic_vessels'],
        feedback: {
          correct: 'Correct! The external iliac vein is the critical landmark for Rule 4 - it must be visualized to confirm femoral hernia coverage.',
          incorrect: 'Not quite. The EIV is medial to the artery, running along the pelvic brim.',
          hint: 'Look for the large vein within the Triangle of Doom, medial to the artery.',
        },
      },
      {
        id: 'prompt-coopers',
        instruction: 'Click COOPER\'S LIGAMENT',
        correctLandmarkIds: ['coopers_ligament'],
        distractorLandmarkIds: ['iliopubic_tract', 'pubic_symphysis'],
        feedback: {
          correct: 'Correct! Cooper\'s ligament is the strong pectineal ligament along the superior pubic ramus. Safe for mesh fixation.',
          incorrect: 'Not quite. Cooper\'s ligament is on the posterior surface of the superior pubic ramus.',
          hint: 'Look along the pubic bone, between the symphysis and the femoral canal.',
        },
      },
      {
        id: 'prompt-iliopsoas',
        instruction: 'Click the ILIOPSOAS MUSCLE',
        correctLandmarkIds: ['iliopsoas_muscle'],
        distractorLandmarkIds: ['rectus_muscle', 'external_oblique'],
        feedback: {
          correct: 'Correct! The iliopsoas muscle must be clearly visible for adequate parietalization (Rule 5).',
          incorrect: 'Not quite. The iliopsoas is the large lateral hip flexor muscle.',
          hint: 'Look for the large muscle in the lateral (Zone 1) region.',
        },
      },
    ],
    passingScore: 100,
    attempts: 3,
    timeLimit: 120,
  },
];

// Helper functions
export function getChallengeById(id: string): LabelingChallenge | undefined {
  return LABELING_CHALLENGES.find(c => c.id === id);
}

export function getChallengesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): LabelingChallenge[] {
  return LABELING_CHALLENGES.filter(c => c.difficulty === difficulty);
}

export function getChallengesByImageId(imageId: string): LabelingChallenge[] {
  return LABELING_CHALLENGES.filter(c => c.imageId === imageId);
}
