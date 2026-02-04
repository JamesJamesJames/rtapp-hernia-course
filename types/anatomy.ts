// Anatomical zone classification
export enum Zone {
  ZONE_1 = 'ZONE_1', // Lateral space - safe but nerves present
  ZONE_2 = 'ZONE_2', // Medial direct space - safest for fixation
  ZONE_3 = 'ZONE_3', // Central high-risk zone - deep ring, vessels
}

// Anatomical layer for SVG organization
export enum AnatomicalLayer {
  VISCERAL = 'VISCERAL',
  VESSELS = 'VESSELS',
  NERVE = 'NERVE',
  MUSCLE = 'MUSCLE',
  BONE = 'BONE',
  SPACE = 'SPACE',
}

// SVG layer visibility
export interface SVGLayer {
  id: string;
  name: string;
  visible: boolean;
  description?: string;
}

// Anatomical landmark definition
export interface Landmark {
  id: string;
  name: string;
  aliases: string[];
  description: string;
  clinicalSignificance: string;
  zone: Zone;
  layer: AnatomicalLayer;
  svgPathIds: string[];
  relatedStructures: string[];
  requiredForRuleIds: number[];
  color?: string;
}

// Danger triangle definition
export interface DangerTriangle {
  id: string;
  name: string;
  description: string;
  boundaries: string[]; // landmark IDs that form boundaries
  contents: string[];   // structures within the triangle
  risks: string[];
  zone: Zone;
}

// Zone definition with detailed info
export interface ZoneInfo {
  id: Zone;
  name: string;
  description: string;
  color: string;
  landmarks: string[]; // landmark IDs in this zone
  safeForFixation: boolean;
  risks: string[];
}

// Anatomical relationship (for understanding connections)
export interface AnatomyRelationship {
  landmarkId: string;
  relationType: 'superior_to' | 'inferior_to' | 'lateral_to' | 'medial_to' | 'crosses' | 'contains' | 'forms_boundary';
  relatedLandmarkId: string;
  clinicalNote?: string;
}

// SVG click event data
export interface LandmarkClickEvent {
  landmarkId: string;
  coordinates: { x: number; y: number };
  timestamp: number;
}

// Landmark state for UI
export interface LandmarkState {
  id: string;
  isHighlighted: boolean;
  isSelected: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
}
