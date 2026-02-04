import { Rule, Flashcard } from '@/types/course';
import { Zone } from '@/types/anatomy';

// The 10 Golden Rules for Safe MIS Inguinal Hernia Repair
export const RULES: Rule[] = [
  {
    id: 1,
    title: 'Proper Peritoneal Incision',
    summary: 'Make peritoneal incision at least 4 cm above the deep inguinal ring with adequate lateral-to-medial extension.',
    whyItMatters: 'An incision too close to the deep ring creates inadequate peritoneal flap, leading to difficult mesh placement and poor peritoneal closure. This can result in mesh exposure, bowel adhesions, and recurrence.',
    steps: [
      { order: 1, instruction: 'Identify the deep inguinal ring from above', tip: 'Look for the inverted Y formed by IEV, vas, and spermatic vessels', landmarkToVisualize: 'deep_inguinal_ring' },
      { order: 2, instruction: 'Mark incision line at least 4 cm above the ring', tip: 'When in doubt, go higher' },
      { order: 3, instruction: 'Extend incision laterally past the anterior superior iliac spine', landmarkToVisualize: 'iliopsoas_muscle' },
      { order: 4, instruction: 'Extend medially past the midline toward the umbilicus' },
      { order: 5, instruction: 'Ensure smooth, curved incision without jagged edges' },
    ],
    visualCheckpoints: [
      'Deep ring clearly visible below incision',
      'Entire medial umbilical ligament visible',
      'Lateral extent reaches iliopsoas muscle',
      'Peritoneal flap has adequate length for tension-free closure',
    ],
    requiredLandmarks: ['deep_inguinal_ring', 'inferior_epigastric_vessels'],
    zones: [Zone.ZONE_3],
    failureModes: [
      {
        description: 'Incision too close to deep ring',
        consequence: 'Inadequate peritoneal flap, difficult mesh placement, poor closure',
        prevention: 'Always measure or estimate 4+ cm above the ring',
      },
      {
        description: 'Inadequate lateral extension',
        consequence: 'Insufficient mesh coverage laterally, risk of recurrence',
        prevention: 'Extend to or past the ASIS level',
      },
    ],
    complicationPrevented: 'Mesh exposure, bowel adhesions, lateral recurrence, difficult peritoneal closure',
    mnemonicAid: '"4 cm = FOUR-tunate outcome"',
  },
  {
    id: 2,
    title: 'Stay in the Correct Plane',
    summary: 'Keep preperitoneal fat on the abdominal wall side. Never dissect into muscle.',
    whyItMatters: 'The correct preperitoneal plane provides bloodless dissection and protects nerves. Wrong plane entry leads to bleeding, nerve injury, and difficult anatomy identification.',
    steps: [
      { order: 1, instruction: 'After peritoneal incision, identify areolar preperitoneal tissue' },
      { order: 2, instruction: 'Keep yellow preperitoneal fat adherent to the abdominal wall' },
      { order: 3, instruction: 'Use blunt dissection to develop the space', tip: 'Spread, don\'t cut' },
      { order: 4, instruction: 'Watch for color change - muscle is red, correct plane is yellow/white' },
      { order: 5, instruction: 'If bleeding occurs, reassess plane immediately' },
    ],
    visualCheckpoints: [
      'Yellow preperitoneal fat stays on abdominal wall',
      'Smooth areolar tissue visible',
      'No red muscle fibers exposed',
      'Bloodless field maintained',
    ],
    requiredLandmarks: [],
    zones: [Zone.ZONE_1, Zone.ZONE_2, Zone.ZONE_3],
    failureModes: [
      {
        description: 'Dissection into transversalis muscle',
        consequence: 'Bleeding, poor visualization, nerve injury',
        prevention: 'Keep fat on wall side, blunt dissection',
      },
      {
        description: 'Dissection too superficial (into peritoneum)',
        consequence: 'Peritoneal tears, bowel injury risk',
        prevention: 'Stay in areolar tissue layer',
      },
    ],
    complicationPrevented: 'Nerve injury, bleeding, poor anatomical identification',
    mnemonicAid: '"Yellow means mellow, red means dread"',
  },
  {
    id: 3,
    title: 'Medial Dissection to Pubis',
    summary: 'Dissect to pubic symphysis AND at least 2 cm inferior to it.',
    whyItMatters: 'Inadequate medial dissection leaves the direct and femoral hernia spaces uncovered, leading to recurrence. The mesh must overlap these spaces by adequate margin.',
    steps: [
      { order: 1, instruction: 'Identify the pubic symphysis', landmarkToVisualize: 'pubic_symphysis' },
      { order: 2, instruction: 'Dissect along Cooper\'s ligament', landmarkToVisualize: 'coopers_ligament' },
      { order: 3, instruction: 'Reach the midline at pubic symphysis' },
      { order: 4, instruction: 'Continue dissection 2 cm inferior to pubis', tip: 'Use Cooper\'s ligament as guide' },
      { order: 5, instruction: 'Identify and preserve bladder', landmarkToVisualize: 'bladder' },
    ],
    visualCheckpoints: [
      'Pubic symphysis bone clearly visible',
      'Cooper\'s ligament fully exposed',
      'Dissection extends 2 cm below pubis',
      'Bladder identified and protected',
      'Femoral canal visible',
    ],
    requiredLandmarks: ['pubic_symphysis', 'coopers_ligament', 'femoral_canal', 'bladder'],
    zones: [Zone.ZONE_2],
    failureModes: [
      {
        description: 'Dissection stops at pubic tubercle',
        consequence: 'Direct/femoral hernia recurrence',
        prevention: 'Always go to symphysis AND 2 cm inferior',
      },
      {
        description: 'Bladder injury',
        consequence: 'Cystotomy, infection, prolonged recovery',
        prevention: 'Identify bladder early, gentle retraction',
      },
    ],
    complicationPrevented: 'Direct hernia recurrence, femoral hernia recurrence, inadequate mesh coverage',
    mnemonicAid: '"Pubis plus two = recurrence few"',
  },
  {
    id: 4,
    title: 'Visualize External Iliac Vein',
    summary: 'The external iliac vein must be clearly identified to confirm femoral hernia coverage.',
    whyItMatters: 'The femoral canal lies medial to the iliac vein. Without visualizing the vein, you cannot confirm that a femoral hernia is not present or that mesh coverage is adequate.',
    steps: [
      { order: 1, instruction: 'Identify the external iliac artery first (pulsatile)', landmarkToVisualize: 'external_iliac_artery' },
      { order: 2, instruction: 'Look medial to artery for the vein', landmarkToVisualize: 'external_iliac_vein' },
      { order: 3, instruction: 'Clear enough tissue to see the blue vein wall' },
      { order: 4, instruction: 'Confirm femoral canal is medial to vein', landmarkToVisualize: 'femoral_canal' },
      { order: 5, instruction: 'Check for femoral hernia content' },
    ],
    visualCheckpoints: [
      'External iliac vein clearly visible',
      'Artery pulsation visible lateral to vein',
      'Femoral canal identified medial to vein',
      'No hernia sac in femoral space',
    ],
    requiredLandmarks: ['external_iliac_vein', 'external_iliac_artery', 'femoral_canal'],
    zones: [Zone.ZONE_2, Zone.ZONE_3],
    failureModes: [
      {
        description: 'Failure to identify iliac vein',
        consequence: 'Missed femoral hernia, inadequate mesh coverage',
        prevention: 'Make visualization of vein mandatory step',
      },
      {
        description: 'Iliac vein injury',
        consequence: 'Severe hemorrhage, conversion, death',
        prevention: 'Gentle dissection, avoid aggressive manipulation',
      },
    ],
    complicationPrevented: 'Missed femoral hernia, femoral hernia recurrence, vascular injury',
    mnemonicAid: '"See the vein or it\'s insane"',
  },
  {
    id: 5,
    title: 'Adequate Parietalization',
    summary: 'Vas deferens must cross the external iliac vein AND iliopsoas muscle must be clearly visible.',
    whyItMatters: 'Inadequate parietalization leads to mesh bunching, cord entrapment, chronic pain, and recurrence. The cord elements must be completely freed from the peritoneum.',
    steps: [
      { order: 1, instruction: 'Identify vas deferens', landmarkToVisualize: 'vas_deferens' },
      { order: 2, instruction: 'Identify spermatic vessels', landmarkToVisualize: 'spermatic_vessels' },
      { order: 3, instruction: 'Dissect cord structures off peritoneum laterally' },
      { order: 4, instruction: 'Continue until vas crosses the iliac vein', landmarkToVisualize: 'external_iliac_vein' },
      { order: 5, instruction: 'Expose iliopsoas muscle clearly', landmarkToVisualize: 'iliopsoas_muscle' },
    ],
    visualCheckpoints: [
      'Vas deferens completely skeletonized',
      'Vas visibly crosses external iliac vein',
      'Iliopsoas muscle clearly exposed',
      'No peritoneum attached to cord',
      'Mesh will lie flat without bunching',
    ],
    requiredLandmarks: ['vas_deferens', 'spermatic_vessels', 'external_iliac_vein', 'iliopsoas_muscle'],
    zones: [Zone.ZONE_1, Zone.ZONE_3],
    failureModes: [
      {
        description: 'Incomplete parietalization',
        consequence: 'Mesh migration, cord pain, indirect recurrence',
        prevention: 'Verify vas crosses vein AND iliopsoas visible',
      },
      {
        description: 'Cord structure injury during dissection',
        consequence: 'Testicular atrophy, infertility, chronic pain',
        prevention: 'Gentle dissection, identify structures before cutting',
      },
    ],
    complicationPrevented: 'Mesh migration, cord entrapment, chronic groin pain, recurrence',
    mnemonicAid: '"Vas crosses vein + psoas clean = parietalization dream"',
  },
  {
    id: 6,
    title: 'Transect Large Scrotal Sacs',
    summary: 'For large inguinoscrotal hernias, transect the sac at the deep ring rather than complete dissection.',
    whyItMatters: 'Attempting complete dissection of large scrotal sacs risks cord injury, testicular ischemia, and hematoma. Transection is safer and equally effective.',
    steps: [
      { order: 1, instruction: 'Identify the hernia sac at the deep ring', landmarkToVisualize: 'deep_inguinal_ring' },
      { order: 2, instruction: 'Assess sac size - if extends well into scrotum, plan for transection' },
      { order: 3, instruction: 'Dissect sac circumferentially at ring level' },
      { order: 4, instruction: 'Transect sac, leaving distal portion in scrotum' },
      { order: 5, instruction: 'Close proximal sac opening with suture or clip' },
    ],
    visualCheckpoints: [
      'Sac clearly identified at deep ring',
      'Cord structures separated from sac',
      'Clean transection at ring level',
      'Proximal sac closed',
      'No tension on cord structures',
    ],
    requiredLandmarks: ['deep_inguinal_ring', 'vas_deferens', 'spermatic_vessels'],
    zones: [Zone.ZONE_3],
    failureModes: [
      {
        description: 'Aggressive sac dissection into scrotum',
        consequence: 'Cord injury, testicular ischemia, hematoma',
        prevention: 'Transect at ring for large sacs',
      },
      {
        description: 'Failure to close proximal sac',
        consequence: 'Seroma, hydrocele',
        prevention: 'Always close the proximal opening',
      },
    ],
    complicationPrevented: 'Cord injury, testicular atrophy, scrotal hematoma, prolonged operation',
    mnemonicAid: '"Big sac? Cut it back!"',
  },
  {
    id: 7,
    title: 'Identify Cord Lipoma',
    summary: 'Always look for and reduce or excise any cord lipoma at the deep ring.',
    whyItMatters: 'Cord lipomas are easily missed and are a common cause of "recurrence." They are actually preperitoneal fat that herniates through the deep ring.',
    steps: [
      { order: 1, instruction: 'After sac reduction, inspect the deep ring area', landmarkToVisualize: 'deep_inguinal_ring' },
      { order: 2, instruction: 'Look for fatty tissue adherent to cord structures' },
      { order: 3, instruction: 'Distinguish from spermatic vessels by color and consistency' },
      { order: 4, instruction: 'Reduce lipoma back into preperitoneal space' },
      { order: 5, instruction: 'For large lipomas, consider excision', tip: 'Careful of vessels' },
    ],
    visualCheckpoints: [
      'Deep ring area carefully inspected',
      'Any fatty mass identified',
      'Lipoma distinguished from vessels',
      'Lipoma reduced or excised',
      'Ring area clear',
    ],
    requiredLandmarks: ['deep_inguinal_ring', 'spermatic_vessels'],
    zones: [Zone.ZONE_3],
    failureModes: [
      {
        description: 'Missed cord lipoma',
        consequence: '"Recurrence" (actually missed lipoma), redo surgery',
        prevention: 'Always inspect ring after sac reduction',
      },
      {
        description: 'Vessel injury during lipoma excision',
        consequence: 'Bleeding, testicular ischemia',
        prevention: 'Careful dissection, bipolar cautery',
      },
    ],
    complicationPrevented: 'Missed lipoma causing apparent recurrence, patient dissatisfaction',
    mnemonicAid: '"No recurrence dance - check for fat at every glance"',
  },
  {
    id: 8,
    title: 'Large Mesh with Adequate Overlap',
    summary: 'Use mesh at least 10×15 cm with minimum 3-5 cm overlap of all hernia defects.',
    whyItMatters: 'Undersized mesh is the most common technical cause of recurrence. Adequate overlap ensures coverage even with mesh contraction and movement.',
    steps: [
      { order: 1, instruction: 'Select appropriate mesh size (minimum 10×15 cm)' },
      { order: 2, instruction: 'Orient mesh with long axis transversely' },
      { order: 3, instruction: 'Ensure mesh reaches pubic symphysis medially' },
      { order: 4, instruction: 'Ensure mesh covers iliopsoas muscle laterally' },
      { order: 5, instruction: 'Verify 3-5 cm overlap of all defect edges' },
    ],
    visualCheckpoints: [
      'Mesh at least 10×15 cm',
      'Mesh covers entire MPO',
      'Medial edge at midline/pubis',
      'Lateral edge covers psoas',
      'All defects covered with 3-5 cm margin',
    ],
    requiredLandmarks: ['pubic_symphysis', 'iliopsoas_muscle'],
    zones: [Zone.ZONE_1, Zone.ZONE_2, Zone.ZONE_3],
    failureModes: [
      {
        description: 'Undersized mesh',
        consequence: 'Recurrence from inadequate coverage',
        prevention: 'Never compromise on mesh size',
      },
      {
        description: 'Improper mesh positioning',
        consequence: 'Gap between mesh and defect edge',
        prevention: 'Center mesh over defect with overlap verification',
      },
    ],
    complicationPrevented: 'Recurrence from inadequate mesh coverage, mesh migration',
    mnemonicAid: '"Ten by fifteen keeps hernia away"',
  },
  {
    id: 9,
    title: 'Fixation Rarely Necessary',
    summary: 'If fixation is used: NEVER below iliopubic tract, NEVER to inferior epigastric vessels, NEVER to bone.',
    whyItMatters: 'Improper fixation causes chronic pain (nerve injury) and bleeding (vessel injury). Many surgeons avoid fixation entirely with good results.',
    steps: [
      { order: 1, instruction: 'Consider if fixation is truly needed (adequate flap may suffice)' },
      { order: 2, instruction: 'If fixing, identify iliopubic tract clearly', landmarkToVisualize: 'iliopubic_tract' },
      { order: 3, instruction: 'Only fix ABOVE the iliopubic tract' },
      { order: 4, instruction: 'Avoid inferior epigastric vessels', landmarkToVisualize: 'inferior_epigastric_vessels' },
      { order: 5, instruction: 'Never fix to pubic bone (osteitis risk)' },
    ],
    visualCheckpoints: [
      'Iliopubic tract identified',
      'No tacks/sutures below IPT',
      'Epigastric vessels avoided',
      'No fixation to bone',
      'Mesh secured adequately',
    ],
    requiredLandmarks: ['iliopubic_tract', 'inferior_epigastric_vessels', 'coopers_ligament'],
    zones: [Zone.ZONE_1, Zone.ZONE_2],
    failureModes: [
      {
        description: 'Fixation below iliopubic tract',
        consequence: 'Chronic pain from nerve injury',
        prevention: 'Strict avoidance - "Nothing below the line"',
      },
      {
        description: 'Fixation to epigastric vessels',
        consequence: 'Hemorrhage, hematoma',
        prevention: 'Identify and avoid IEV',
      },
      {
        description: 'Fixation to bone',
        consequence: 'Chronic osteitis pubis',
        prevention: 'Never fix to symphysis',
      },
    ],
    complicationPrevented: 'Chronic groin pain, hemorrhage, osteitis pubis',
    mnemonicAid: '"Above the tract or pain comes back"',
  },
  {
    id: 10,
    title: 'Controlled Desufflation',
    summary: 'Close peritoneal defect under direct visualization with controlled desufflation.',
    whyItMatters: 'Rapid desufflation causes mesh displacement and folding. Peritoneal gaps lead to bowel obstruction from mesh exposure.',
    steps: [
      { order: 1, instruction: 'Begin peritoneal closure from lateral to medial' },
      { order: 2, instruction: 'Use running suture, tacks, or glue as preferred' },
      { order: 3, instruction: 'Maintain visualization throughout closure' },
      { order: 4, instruction: 'Slowly reduce pneumoperitoneum under vision' },
      { order: 5, instruction: 'Confirm mesh position remains flat and centered' },
    ],
    visualCheckpoints: [
      'Complete peritoneal closure',
      'No gaps in closure',
      'Mesh visible through peritoneum',
      'Mesh flat and well-positioned',
      'No bowel near mesh edge',
    ],
    requiredLandmarks: [],
    zones: [Zone.ZONE_1, Zone.ZONE_2, Zone.ZONE_3],
    failureModes: [
      {
        description: 'Rapid desufflation',
        consequence: 'Mesh displacement, folding, migration',
        prevention: 'Slow, controlled desufflation under vision',
      },
      {
        description: 'Incomplete peritoneal closure',
        consequence: 'Bowel adhesions to mesh, obstruction',
        prevention: 'Ensure complete closure, no gaps',
      },
    ],
    complicationPrevented: 'Mesh displacement, bowel obstruction, mesh erosion',
    mnemonicAid: '"Slow and steady wins the closure"',
  },
];

// Rule flashcards for each rule
export const RULE_FLASHCARDS: Flashcard[] = RULES.flatMap(rule => [
  {
    id: `rule-${rule.id}-main`,
    type: 'rule' as const,
    front: `Rule ${rule.id}: ${rule.title}`,
    back: `${rule.summary}\n\nKey checkpoints:\n${rule.visualCheckpoints.slice(0, 3).map(c => `• ${c}`).join('\n')}`,
    relatedRuleIds: [rule.id],
  },
  {
    id: `rule-${rule.id}-failure`,
    type: 'danger_boundary' as const,
    front: `What happens if Rule ${rule.id} (${rule.title}) is violated?`,
    back: rule.failureModes.map(f => `${f.description}: ${f.consequence}`).join('\n\n'),
    relatedRuleIds: [rule.id],
  },
]);

// Helper functions
export function getRuleById(id: number): Rule | undefined {
  return RULES.find(r => r.id === id);
}

export function getRulesByZone(zone: Zone): Rule[] {
  return RULES.filter(r => r.zones.includes(zone));
}

export function getRulesForLandmark(landmarkId: string): Rule[] {
  return RULES.filter(r => r.requiredLandmarks.includes(landmarkId));
}

export function getRuleFlashcards(ruleId: number): Flashcard[] {
  return RULE_FLASHCARDS.filter(f => f.relatedRuleIds?.includes(ruleId));
}
