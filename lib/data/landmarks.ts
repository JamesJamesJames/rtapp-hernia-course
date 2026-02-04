import { Landmark, Zone, AnatomicalLayer, ZoneInfo, DangerTriangle } from '@/types/anatomy';

// 12 Key Anatomical Landmarks
export const LANDMARKS: Landmark[] = [
  {
    id: 'inferior_epigastric_vessels',
    name: 'Inferior Epigastric Vessels',
    aliases: ['IEV', 'epigastric vessels', 'inferior epigastrics'],
    description: 'Vertical vessels forming the superior arm of the Inverted Y. Branch from external iliac vessels.',
    clinicalSignificance: 'Forms the lateral boundary of Hesselbach\'s triangle. Key landmark for differentiating direct vs indirect hernias. Must be identified to avoid injury during mesh fixation.',
    zone: Zone.ZONE_3,
    layer: AnatomicalLayer.VESSELS,
    svgPathIds: ['iev-main', 'iev-branches'],
    relatedStructures: ['external_iliac_artery', 'external_iliac_vein', 'rectus_muscle'],
    requiredForRuleIds: [1, 9],
    color: '#DC3545',
  },
  {
    id: 'vas_deferens',
    name: 'Vas Deferens',
    aliases: ['ductus deferens', 'vas'],
    description: 'White cord structure forming the medial limb of the Inverted Y. Runs from deep ring toward pelvis.',
    clinicalSignificance: 'Critical structure to identify and preserve during parietalization. Landmark for adequate lateral dissection - must cross iliac vein.',
    zone: Zone.ZONE_1,
    layer: AnatomicalLayer.VISCERAL,
    svgPathIds: ['vas-main'],
    relatedStructures: ['spermatic_vessels', 'deep_inguinal_ring', 'external_iliac_vein'],
    requiredForRuleIds: [5, 6],
    color: '#F5F5DC',
  },
  {
    id: 'spermatic_vessels',
    name: 'Spermatic Vessels',
    aliases: ['gonadal vessels', 'testicular vessels'],
    description: 'Blue vessels forming the lateral limb of the Inverted Y. Include testicular artery and pampiniform plexus.',
    clinicalSignificance: 'Form the medial boundary of Triangle of Pain. Must be preserved during parietalization. Lateral to vas deferens.',
    zone: Zone.ZONE_1,
    layer: AnatomicalLayer.VESSELS,
    svgPathIds: ['spermatic-main', 'spermatic-plexus'],
    relatedStructures: ['vas_deferens', 'deep_inguinal_ring', 'psoas_muscle'],
    requiredForRuleIds: [5, 6],
    color: '#4169E1',
  },
  {
    id: 'external_iliac_artery',
    name: 'External Iliac Artery',
    aliases: ['EIA', 'iliac artery'],
    description: 'Major arterial trunk running along psoas muscle toward inguinal ligament.',
    clinicalSignificance: 'Located within Triangle of Doom. Injury causes life-threatening hemorrhage. Must visualize to confirm femoral hernia coverage.',
    zone: Zone.ZONE_3,
    layer: AnatomicalLayer.VESSELS,
    svgPathIds: ['eia-main'],
    relatedStructures: ['external_iliac_vein', 'iliopsoas_muscle', 'femoral_canal'],
    requiredForRuleIds: [4, 5],
    color: '#DC3545',
  },
  {
    id: 'external_iliac_vein',
    name: 'External Iliac Vein',
    aliases: ['EIV', 'iliac vein'],
    description: 'Major venous trunk medial to artery. Key landmark for adequate parietalization.',
    clinicalSignificance: 'Rule 4 requires visualization. Vas must cross this vein for adequate parietalization. Injury causes severe venous hemorrhage.',
    zone: Zone.ZONE_3,
    layer: AnatomicalLayer.VESSELS,
    svgPathIds: ['eiv-main'],
    relatedStructures: ['external_iliac_artery', 'vas_deferens', 'femoral_canal'],
    requiredForRuleIds: [4, 5],
    color: '#4169E1',
  },
  {
    id: 'iliopubic_tract',
    name: 'Iliopubic Tract',
    aliases: ['IPT', 'Thomson\'s ligament'],
    description: 'Fascial thickening running parallel to inguinal ligament on posterior side. Key fixation boundary.',
    clinicalSignificance: 'Rule 9: NO fixation below this line! Contains femoral nerve branches. Critical boundary for safe mesh tacking.',
    zone: Zone.ZONE_1,
    layer: AnatomicalLayer.MUSCLE,
    svgPathIds: ['ipt-main'],
    relatedStructures: ['inguinal_ligament', 'femoral_nerve', 'lateral_femoral_cutaneous_nerve'],
    requiredForRuleIds: [9],
    color: '#191970',
  },
  {
    id: 'iliopsoas_muscle',
    name: 'Iliopsoas Muscle',
    aliases: ['psoas', 'iliopsoas'],
    description: 'Large hip flexor muscle forming lateral floor of preperitoneal space.',
    clinicalSignificance: 'Must be clearly visible for adequate parietalization (Rule 5). Lateral dissection endpoint.',
    zone: Zone.ZONE_1,
    layer: AnatomicalLayer.MUSCLE,
    svgPathIds: ['iliopsoas-main'],
    relatedStructures: ['femoral_nerve', 'spermatic_vessels', 'iliopubic_tract'],
    requiredForRuleIds: [5],
    color: '#CD853F',
  },
  {
    id: 'deep_inguinal_ring',
    name: 'Deep Inguinal Ring',
    aliases: ['internal ring', 'deep ring', 'DIR'],
    description: 'Opening in transversalis fascia where cord structures enter inguinal canal. Site of indirect hernias.',
    clinicalSignificance: 'Rule 1 requires incision 4+ cm above this point. Origin of indirect hernias. Site where cord lipomas are found.',
    zone: Zone.ZONE_3,
    layer: AnatomicalLayer.SPACE,
    svgPathIds: ['deep-ring-main', 'deep-ring-outline'],
    relatedStructures: ['vas_deferens', 'spermatic_vessels', 'inferior_epigastric_vessels'],
    requiredForRuleIds: [1, 5, 7],
    color: '#FF6B6B',
  },
  {
    id: 'pubic_symphysis',
    name: 'Pubic Symphysis',
    aliases: ['pubis', 'pubic bone', 'symphysis'],
    description: 'Midline bony landmark. Medial limit of dissection.',
    clinicalSignificance: 'Rule 3 requires dissection to pubic symphysis AND 2 cm inferior. Ensures adequate medial mesh coverage.',
    zone: Zone.ZONE_2,
    layer: AnatomicalLayer.BONE,
    svgPathIds: ['pubis-main'],
    relatedStructures: ['coopers_ligament', 'bladder', 'rectus_muscle'],
    requiredForRuleIds: [3],
    color: '#E8E8E8',
  },
  {
    id: 'coopers_ligament',
    name: 'Cooper\'s Ligament',
    aliases: ['pectineal ligament', 'Cooper ligament'],
    description: 'Strong fascial band along superior pubic ramus. Common mesh fixation point.',
    clinicalSignificance: 'Safe for mesh fixation in Zone 2. Forms inferior boundary of femoral hernia. Key landmark for medial dissection.',
    zone: Zone.ZONE_2,
    layer: AnatomicalLayer.MUSCLE,
    svgPathIds: ['coopers-main'],
    relatedStructures: ['pubic_symphysis', 'femoral_canal', 'external_iliac_vein'],
    requiredForRuleIds: [3, 4, 9],
    color: '#DEB887',
  },
  {
    id: 'femoral_canal',
    name: 'Femoral Canal',
    aliases: ['femoral space', 'femoral ring'],
    description: 'Potential space medial to femoral vein, below inguinal ligament. Site of femoral hernias.',
    clinicalSignificance: 'Rule 4: Must visualize external iliac vein to confirm femoral hernia coverage. Missed femoral hernias = recurrence.',
    zone: Zone.ZONE_2,
    layer: AnatomicalLayer.SPACE,
    svgPathIds: ['femoral-canal-main'],
    relatedStructures: ['external_iliac_vein', 'coopers_ligament', 'inguinal_ligament'],
    requiredForRuleIds: [3, 4],
    color: '#98FB98',
  },
  {
    id: 'bladder',
    name: 'Bladder',
    aliases: ['urinary bladder'],
    description: 'Midline pelvic organ. May be pulled into direct hernia defects.',
    clinicalSignificance: 'Can be injured during medial dissection. Watch for sliding component in large direct hernias. Must identify to avoid cystotomy.',
    zone: Zone.ZONE_2,
    layer: AnatomicalLayer.VISCERAL,
    svgPathIds: ['bladder-main'],
    relatedStructures: ['pubic_symphysis', 'direct_hernia_space'],
    requiredForRuleIds: [3],
    color: '#FFD700',
  },
];

// Zone definitions with clinical context
export const ZONES: ZoneInfo[] = [
  {
    id: Zone.ZONE_1,
    name: 'Zone 1 - Lateral Space',
    description: 'Lateral to spermatic vessels. Contains iliopsoas muscle and lateral femoral cutaneous nerve. Generally safe but be aware of nerve structures.',
    color: 'rgba(222, 184, 135, 0.4)',
    landmarks: ['iliopsoas_muscle', 'iliopubic_tract', 'vas_deferens', 'spermatic_vessels'],
    safeForFixation: true,
    risks: ['Lateral femoral cutaneous nerve injury', 'Femoral nerve injury', 'Fibrosis in redo operations'],
  },
  {
    id: Zone.ZONE_2,
    name: 'Zone 2 - Medial Direct Space',
    description: 'Medial to inferior epigastric vessels. Contains direct hernia space, Cooper\'s ligament, femoral canal. Safest zone for fixation.',
    color: 'rgba(34, 139, 34, 0.4)',
    landmarks: ['pubic_symphysis', 'coopers_ligament', 'femoral_canal', 'bladder'],
    safeForFixation: true,
    risks: ['Bladder injury', 'Missed femoral hernia', 'Corona mortis bleeding'],
  },
  {
    id: Zone.ZONE_3,
    name: 'Zone 3 - Central High-Risk Zone',
    description: 'Contains Triangle of Doom, deep inguinal ring, and major vessels. NO FIXATION in this zone!',
    color: 'rgba(220, 20, 60, 0.4)',
    landmarks: ['deep_inguinal_ring', 'inferior_epigastric_vessels', 'external_iliac_artery', 'external_iliac_vein'],
    safeForFixation: false,
    risks: ['Major vascular injury', 'Vas deferens injury', 'Nerve injury in Triangle of Pain'],
  },
];

// Danger triangles
export const DANGER_TRIANGLES: DangerTriangle[] = [
  {
    id: 'triangle_of_doom',
    name: 'Triangle of Doom',
    description: 'V-shaped area between vas deferens (medial) and spermatic vessels (lateral). Contains external iliac vessels.',
    boundaries: ['vas_deferens', 'spermatic_vessels'],
    contents: ['external_iliac_artery', 'external_iliac_vein'],
    risks: ['Life-threatening hemorrhage from iliac vessel injury', 'Death if not controlled'],
    zone: Zone.ZONE_3,
  },
  {
    id: 'triangle_of_pain',
    name: 'Triangle of Pain',
    description: 'Lateral to spermatic vessels. Contains femoral nerve, lateral femoral cutaneous nerve, and genitofemoral nerve.',
    boundaries: ['spermatic_vessels', 'iliopubic_tract'],
    contents: ['femoral_nerve', 'lateral_femoral_cutaneous_nerve', 'genitofemoral_nerve'],
    risks: ['Chronic groin pain', 'Meralgia paresthetica', 'Numbness in thigh'],
    zone: Zone.ZONE_1,
  },
  {
    id: 'indirect_triangle',
    name: 'Indirect Hernia Triangle',
    description: 'Lateral wall triangle bounded by inferior epigastric vessels, deep ring, and iliopubic tract.',
    boundaries: ['inferior_epigastric_vessels', 'deep_inguinal_ring', 'iliopubic_tract'],
    contents: ['indirect_hernia_sac', 'cord_lipoma'],
    risks: ['Missed indirect hernia', 'Incomplete sac reduction', 'Missed cord lipoma'],
    zone: Zone.ZONE_3,
  },
  {
    id: 'direct_triangle',
    name: 'Direct Hernia Triangle (Hesselbach\'s)',
    description: 'Hesselbach\'s triangle. Bounded by inferior epigastric vessels, inguinal ligament, and rectus muscle.',
    boundaries: ['inferior_epigastric_vessels', 'inguinal_ligament', 'rectus_muscle'],
    contents: ['direct_hernia_sac', 'bladder_sliding_component'],
    risks: ['Bladder injury', 'Incomplete reduction', 'Pseudosac confusion'],
    zone: Zone.ZONE_2,
  },
  {
    id: 'femoral_triangle',
    name: 'Femoral Hernia Triangle',
    description: 'Below inguinal ligament. Bounded by femoral vein, Cooper\'s ligament, and inguinal ligament.',
    boundaries: ['external_iliac_vein', 'coopers_ligament', 'inguinal_ligament'],
    contents: ['femoral_hernia_sac', 'femoral_canal_contents'],
    risks: ['Missed femoral hernia', 'Recurrence', 'Femoral vein injury'],
    zone: Zone.ZONE_2,
  },
];

// Helper functions
export function getLandmarkById(id: string): Landmark | undefined {
  return LANDMARKS.find(l => l.id === id);
}

export function getLandmarksByZone(zone: Zone): Landmark[] {
  return LANDMARKS.filter(l => l.zone === zone);
}

export function getLandmarksByRuleId(ruleId: number): Landmark[] {
  return LANDMARKS.filter(l => l.requiredForRuleIds.includes(ruleId));
}

export function getZoneInfo(zone: Zone): ZoneInfo | undefined {
  return ZONES.find(z => z.id === zone);
}

export function getDangerTriangle(id: string): DangerTriangle | undefined {
  return DANGER_TRIANGLES.find(t => t.id === id);
}
