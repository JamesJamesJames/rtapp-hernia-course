import { MultipleChoiceQuestion } from '@/types/course';

// MCQ Question Bank for Assessment
export const MCQ_QUESTIONS: MultipleChoiceQuestion[] = [
  // Rule 1 Questions
  {
    id: 'q1-1',
    question: 'What is the minimum distance the peritoneal incision should be above the deep inguinal ring in TAPP?',
    options: [
      { id: 'a', text: '2 cm' },
      { id: 'b', text: '3 cm' },
      { id: 'c', text: '4 cm' },
      { id: 'd', text: '5 cm' },
    ],
    correctOptionId: 'c',
    explanation: 'Rule 1 states the peritoneal incision must be at least 4 cm above the deep ring for adequate flap creation and mesh placement.',
    relatedRuleIds: [1],
    difficulty: 'easy',
    category: 'procedure',
  },
  {
    id: 'q1-2',
    question: 'What is the consequence of making the peritoneal incision too close to the deep ring?',
    options: [
      { id: 'a', text: 'Inadequate peritoneal flap for closure' },
      { id: 'b', text: 'Nerve injury' },
      { id: 'c', text: 'Vascular injury' },
      { id: 'd', text: 'Testicular atrophy' },
    ],
    correctOptionId: 'a',
    explanation: 'An incision too close to the deep ring creates an inadequate peritoneal flap, making mesh placement difficult and peritoneal closure unreliable.',
    relatedRuleIds: [1],
    difficulty: 'medium',
    category: 'complication',
  },

  // Rule 2 Questions
  {
    id: 'q2-1',
    question: 'What tissue layer should be kept on the abdominal wall side during preperitoneal dissection?',
    options: [
      { id: 'a', text: 'Peritoneum' },
      { id: 'b', text: 'Transversalis muscle' },
      { id: 'c', text: 'Preperitoneal fat' },
      { id: 'd', text: 'Fascia transversalis' },
    ],
    correctOptionId: 'c',
    explanation: 'Rule 2: Keep preperitoneal fat on the abdominal wall side. This ensures you\'re in the correct plane and minimizes bleeding and nerve injury.',
    relatedRuleIds: [2],
    difficulty: 'easy',
    category: 'procedure',
  },
  {
    id: 'q2-2',
    question: 'What color indicates you have entered the wrong (muscle) plane during dissection?',
    options: [
      { id: 'a', text: 'Yellow' },
      { id: 'b', text: 'White' },
      { id: 'c', text: 'Red' },
      { id: 'd', text: 'Blue' },
    ],
    correctOptionId: 'c',
    explanation: 'Red indicates muscle tissue, meaning you\'ve gone too deep. The correct plane shows yellow preperitoneal fat and white areolar tissue.',
    relatedRuleIds: [2],
    difficulty: 'easy',
    category: 'anatomy',
  },

  // Rule 3 Questions
  {
    id: 'q3-1',
    question: 'How far inferior to the pubic symphysis must medial dissection extend?',
    options: [
      { id: 'a', text: '1 cm' },
      { id: 'b', text: '2 cm' },
      { id: 'c', text: '3 cm' },
      { id: 'd', text: 'To the symphysis only' },
    ],
    correctOptionId: 'b',
    explanation: 'Rule 3 requires dissection to the pubic symphysis AND at least 2 cm inferior to ensure adequate coverage of direct and femoral spaces.',
    relatedRuleIds: [3],
    difficulty: 'easy',
    category: 'procedure',
  },
  {
    id: 'q3-2',
    question: 'What complication results from inadequate medial dissection?',
    options: [
      { id: 'a', text: 'Chronic pain' },
      { id: 'b', text: 'Direct or femoral hernia recurrence' },
      { id: 'c', text: 'Testicular atrophy' },
      { id: 'd', text: 'Mesh infection' },
    ],
    correctOptionId: 'b',
    explanation: 'Inadequate medial dissection leaves direct and femoral hernia spaces uncovered, leading to recurrence in these areas.',
    relatedRuleIds: [3],
    difficulty: 'medium',
    category: 'complication',
  },

  // Rule 4 Questions
  {
    id: 'q4-1',
    question: 'Which structure MUST be visualized to confirm adequate femoral hernia coverage?',
    options: [
      { id: 'a', text: 'Inferior epigastric vessels' },
      { id: 'b', text: 'External iliac vein' },
      { id: 'c', text: 'Vas deferens' },
      { id: 'd', text: 'Iliopubic tract' },
    ],
    correctOptionId: 'b',
    explanation: 'Rule 4: The external iliac vein must be visualized because the femoral canal lies medial to it. Without seeing the vein, femoral hernia coverage cannot be confirmed.',
    relatedRuleIds: [4],
    difficulty: 'easy',
    category: 'anatomy',
  },
  {
    id: 'q4-2',
    question: 'The femoral canal is located in what position relative to the external iliac vein?',
    options: [
      { id: 'a', text: 'Lateral' },
      { id: 'b', text: 'Medial' },
      { id: 'c', text: 'Superior' },
      { id: 'd', text: 'Posterior' },
    ],
    correctOptionId: 'b',
    explanation: 'The femoral canal is medial to the external iliac vein. This is why visualizing the vein confirms you can see the femoral hernia space.',
    relatedRuleIds: [4],
    difficulty: 'medium',
    category: 'anatomy',
  },

  // Rule 5 Questions
  {
    id: 'q5-1',
    question: 'For adequate parietalization, what TWO structures must be visible?',
    options: [
      { id: 'a', text: 'Vas crossing iliac vein AND iliopsoas muscle' },
      { id: 'b', text: 'Deep ring AND pubic symphysis' },
      { id: 'c', text: 'Cooper\'s ligament AND femoral canal' },
      { id: 'd', text: 'IEV AND spermatic vessels' },
    ],
    correctOptionId: 'a',
    explanation: 'Rule 5: Vas must cross the external iliac vein AND iliopsoas muscle must be clearly visible. Both criteria must be met for adequate parietalization.',
    relatedRuleIds: [5],
    difficulty: 'medium',
    category: 'procedure',
  },
  {
    id: 'q5-2',
    question: 'What complication results from inadequate parietalization?',
    options: [
      { id: 'a', text: 'Bladder injury' },
      { id: 'b', text: 'Mesh migration and cord pain' },
      { id: 'c', text: 'Femoral hernia' },
      { id: 'd', text: 'Osteitis pubis' },
    ],
    correctOptionId: 'b',
    explanation: 'Inadequate parietalization leads to mesh bunching around the cord, causing mesh migration, cord entrapment, and chronic groin pain.',
    relatedRuleIds: [5],
    difficulty: 'medium',
    category: 'complication',
  },

  // Rule 6 Questions
  {
    id: 'q6-1',
    question: 'For large inguinoscrotal hernias, what is the recommended approach to the hernia sac?',
    options: [
      { id: 'a', text: 'Complete dissection into scrotum' },
      { id: 'b', text: 'Transection at the deep ring' },
      { id: 'c', text: 'Leave sac in place' },
      { id: 'd', text: 'Invaginate the sac' },
    ],
    correctOptionId: 'b',
    explanation: 'Rule 6: Transect large scrotal sacs at the deep ring rather than attempting complete dissection, which risks cord injury and hematoma.',
    relatedRuleIds: [6],
    difficulty: 'easy',
    category: 'procedure',
  },

  // Rule 7 Questions
  {
    id: 'q7-1',
    question: 'Cord lipomas are a common cause of:',
    options: [
      { id: 'a', text: 'Chronic pain' },
      { id: 'b', text: 'Apparent recurrence' },
      { id: 'c', text: 'Testicular atrophy' },
      { id: 'd', text: 'Mesh infection' },
    ],
    correctOptionId: 'b',
    explanation: 'Rule 7: Cord lipomas are easily missed and are a common cause of "recurrence" - they are actually preperitoneal fat herniating through the deep ring.',
    relatedRuleIds: [7],
    difficulty: 'medium',
    category: 'complication',
  },

  // Rule 8 Questions
  {
    id: 'q8-1',
    question: 'What is the minimum recommended mesh size for TAPP repair?',
    options: [
      { id: 'a', text: '6 × 11 cm' },
      { id: 'b', text: '8 × 12 cm' },
      { id: 'c', text: '10 × 15 cm' },
      { id: 'd', text: '12 × 17 cm' },
    ],
    correctOptionId: 'c',
    explanation: 'Rule 8: Use mesh at least 10×15 cm. Undersized mesh is the most common technical cause of recurrence.',
    relatedRuleIds: [8],
    difficulty: 'easy',
    category: 'procedure',
  },
  {
    id: 'q8-2',
    question: 'What minimum overlap is required between mesh edge and hernia defect?',
    options: [
      { id: 'a', text: '1-2 cm' },
      { id: 'b', text: '3-5 cm' },
      { id: 'c', text: '6-8 cm' },
      { id: 'd', text: 'No overlap needed' },
    ],
    correctOptionId: 'b',
    explanation: 'Rule 8 requires 3-5 cm overlap of all hernia defects to ensure adequate coverage even with mesh contraction.',
    relatedRuleIds: [8],
    difficulty: 'medium',
    category: 'procedure',
  },

  // Rule 9 Questions
  {
    id: 'q9-1',
    question: 'What is the critical boundary below which NO fixation should be placed?',
    options: [
      { id: 'a', text: 'Cooper\'s ligament' },
      { id: 'b', text: 'Iliopubic tract' },
      { id: 'c', text: 'Inguinal ligament' },
      { id: 'd', text: 'External iliac vein' },
    ],
    correctOptionId: 'b',
    explanation: 'Rule 9: NEVER fix below the iliopubic tract! This area contains nerves (femoral nerve, LFCN) and fixation here causes chronic pain.',
    relatedRuleIds: [9],
    difficulty: 'easy',
    category: 'safety',
  },
  {
    id: 'q9-2',
    question: 'Which of the following is a SAFE location for mesh fixation?',
    options: [
      { id: 'a', text: 'Inferior epigastric vessels' },
      { id: 'b', text: 'Below the iliopubic tract' },
      { id: 'c', text: 'Pubic bone' },
      { id: 'd', text: 'Cooper\'s ligament' },
    ],
    correctOptionId: 'd',
    explanation: 'Cooper\'s ligament is safe for fixation - it\'s above the iliopubic tract and in Zone 2. Avoid vessels, below IPT, and bone.',
    relatedRuleIds: [9],
    difficulty: 'medium',
    category: 'safety',
  },

  // Rule 10 Questions
  {
    id: 'q10-1',
    question: 'What is the consequence of rapid desufflation at the end of TAPP?',
    options: [
      { id: 'a', text: 'Mesh displacement' },
      { id: 'b', text: 'Nerve injury' },
      { id: 'c', text: 'Vascular injury' },
      { id: 'd', text: 'Bladder injury' },
    ],
    correctOptionId: 'a',
    explanation: 'Rule 10: Rapid desufflation causes mesh displacement and folding. Controlled, slow desufflation under direct visualization prevents this.',
    relatedRuleIds: [10],
    difficulty: 'easy',
    category: 'complication',
  },

  // Anatomy Questions
  {
    id: 'qa-1',
    question: 'The Inverted Y is formed by which three structures?',
    options: [
      { id: 'a', text: 'IEV, vas deferens, spermatic vessels' },
      { id: 'b', text: 'IEV, iliac artery, iliac vein' },
      { id: 'c', text: 'Vas, spermatic vessels, iliopubic tract' },
      { id: 'd', text: 'Deep ring, pubis, iliopsoas' },
    ],
    correctOptionId: 'a',
    explanation: 'The Inverted Y is formed by the inferior epigastric vessels (superior), vas deferens (medial), and spermatic vessels (lateral).',
    relatedLandmarkIds: ['inferior_epigastric_vessels', 'vas_deferens', 'spermatic_vessels'],
    difficulty: 'easy',
    category: 'anatomy',
  },
  {
    id: 'qa-2',
    question: 'Which zone contains the Triangle of Doom?',
    options: [
      { id: 'a', text: 'Zone 1 - Lateral' },
      { id: 'b', text: 'Zone 2 - Medial' },
      { id: 'c', text: 'Zone 3 - Central' },
      { id: 'd', text: 'All zones' },
    ],
    correctOptionId: 'c',
    explanation: 'The Triangle of Doom is in Zone 3 (Central High-Risk Zone), between the vas and spermatic vessels, containing the iliac vessels.',
    relatedLandmarkIds: ['triangle_of_doom'],
    difficulty: 'easy',
    category: 'anatomy',
  },
  {
    id: 'qa-3',
    question: 'What structures are contained within the Triangle of Doom?',
    options: [
      { id: 'a', text: 'Femoral nerve and lateral femoral cutaneous nerve' },
      { id: 'b', text: 'External iliac artery and vein' },
      { id: 'c', text: 'Vas deferens and spermatic vessels' },
      { id: 'd', text: 'Cooper\'s ligament and femoral canal' },
    ],
    correctOptionId: 'b',
    explanation: 'The Triangle of Doom contains the external iliac artery and vein. Injury to these vessels can cause life-threatening hemorrhage.',
    relatedLandmarkIds: ['external_iliac_artery', 'external_iliac_vein'],
    difficulty: 'medium',
    category: 'anatomy',
  },
  {
    id: 'qa-4',
    question: 'The Triangle of Pain contains which nerves?',
    options: [
      { id: 'a', text: 'Femoral, LFCN, and genitofemoral nerves' },
      { id: 'b', text: 'Obturator and ilioinguinal nerves' },
      { id: 'c', text: 'Sciatic and pudendal nerves' },
      { id: 'd', text: 'Vagus and phrenic nerves' },
    ],
    correctOptionId: 'a',
    explanation: 'The Triangle of Pain (lateral to spermatic vessels) contains the femoral nerve, lateral femoral cutaneous nerve (LFCN), and genitofemoral nerve.',
    relatedLandmarkIds: ['triangle_of_pain'],
    difficulty: 'medium',
    category: 'anatomy',
  },
  {
    id: 'qa-5',
    question: 'Which zone is SAFEST for mesh fixation?',
    options: [
      { id: 'a', text: 'Zone 1 - Lateral' },
      { id: 'b', text: 'Zone 2 - Medial' },
      { id: 'c', text: 'Zone 3 - Central' },
      { id: 'd', text: 'All zones are equally safe' },
    ],
    correctOptionId: 'b',
    explanation: 'Zone 2 (Medial Direct Space) is the safest for fixation - it\'s above critical nerves and away from major vessels.',
    difficulty: 'easy',
    category: 'safety',
  },

  // Scenario-based Questions
  {
    id: 'qs-1',
    question: 'During TAPP, you notice the vas deferens does not cross the external iliac vein. What is the most likely issue?',
    options: [
      { id: 'a', text: 'Inadequate parietalization' },
      { id: 'b', text: 'Cord injury' },
      { id: 'c', text: 'Wrong patient' },
      { id: 'd', text: 'Femoral hernia' },
    ],
    correctOptionId: 'a',
    explanation: 'If the vas doesn\'t cross the iliac vein, parietalization is inadequate (Rule 5). Further lateral dissection is needed.',
    relatedRuleIds: [5],
    difficulty: 'medium',
    category: 'procedure',
  },
  {
    id: 'qs-2',
    question: 'You identify a fatty mass at the deep ring after reducing the hernia sac. What is this likely structure?',
    options: [
      { id: 'a', text: 'Omentum' },
      { id: 'b', text: 'Cord lipoma' },
      { id: 'c', text: 'Appendix' },
      { id: 'd', text: 'Bladder' },
    ],
    correctOptionId: 'b',
    explanation: 'Cord lipomas are preperitoneal fat herniating through the deep ring. They are commonly found and should be reduced or excised (Rule 7).',
    relatedRuleIds: [7],
    difficulty: 'medium',
    category: 'procedure',
  },
  {
    id: 'qs-3',
    question: 'A patient returns 6 months post-TAPP with a recurrent bulge in the groin. At re-exploration, the mesh is well-positioned. What was likely missed?',
    options: [
      { id: 'a', text: 'Femoral hernia' },
      { id: 'b', text: 'Cord lipoma' },
      { id: 'c', text: 'Direct hernia' },
      { id: 'd', text: 'A or B' },
    ],
    correctOptionId: 'd',
    explanation: 'With a well-positioned mesh, "recurrence" is often a missed femoral hernia or cord lipoma - both easily overlooked during initial repair.',
    relatedRuleIds: [4, 7],
    difficulty: 'hard',
    category: 'complication',
  },
];

// Helper functions
export function getQuestionById(id: string): MultipleChoiceQuestion | undefined {
  return MCQ_QUESTIONS.find(q => q.id === id);
}

export function getQuestionsByRule(ruleId: number): MultipleChoiceQuestion[] {
  return MCQ_QUESTIONS.filter(q => q.relatedRuleIds?.includes(ruleId));
}

export function getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): MultipleChoiceQuestion[] {
  return MCQ_QUESTIONS.filter(q => q.difficulty === difficulty);
}

export function getQuestionsByCategory(category: string): MultipleChoiceQuestion[] {
  return MCQ_QUESTIONS.filter(q => q.category === category);
}

export function getRandomQuestions(count: number): MultipleChoiceQuestion[] {
  const shuffled = [...MCQ_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
