# rTAPP Inguinal Hernia Repair Course

**Interactive Surgical Anatomy Platform: The Critical View of the Myopectineal Orifice**

> Based on "Ten Golden Rules for a Safe MIS Inguinal Hernia Repair" by Claus et al., _Surgical Endoscopy_ (2020)

---

## 🎯 Project Overview

A production-ready, mobile-first educational platform teaching posterior groin anatomy for robotic and laparoscopic inguinal hernia repair. Features interactive SVG anatomy, spaced repetition learning, and gamified progression.

### Target Audience
- General surgeons transitioning to rTAPP/TAPP
- MIS fellows and senior residents
- Practicing surgeons seeking posterior anatomy mastery

### Educational Goals
1. Instant orientation to posterior groin anatomy from robotic view
2. Identify Inverted Y and iliopubic tract without hesitation
3. Correctly define Zones 1, 2, and 3
4. Master all 10 rules of safe MIS inguinal repair
5. Achieve long-term retention via spaced repetition

---

## 🏗️ Technical Architecture

### Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand (with localStorage persistence)
- **Animation**: Framer Motion
- **Icons**: Lucide React

### Design Patterns
- **Modular SVG Components**: Reusable, interactive anatomy diagrams
- **Offline-First**: LocalStorage → IndexedDB → API (progressive enhancement)
- **Mobile-First**: Touch-optimized, responsive design
- **Type-Safe**: End-to-end TypeScript coverage

---

## 📁 Project Structure

```
rtapp-course/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing/dashboard
│   ├── layout.tsx                # Root layout
│   └── modules/                  # Course modules
│       ├── orientation/
│       ├── visual-map/
│       ├── rules/
│       ├── labeling-lab/
│       └── review/
│
├── components/
│   ├── anatomy/
│   │   └── AnatomySVGViewer.tsx  # Main interactive SVG component
│   ├── learning/
│   │   ├── LabelingChallenge.tsx
│   │   ├── RuleCard.tsx
│   │   └── ProgressGate.tsx
│   └── ui/                       # Shared UI components
│
├── lib/
│   ├── data/
│   │   ├── landmarks.ts          # 12 anatomical landmarks with clinical context
│   │   ├── rules.ts              # 10 Golden Rules from the paper
│   │   └── challenges.ts         # Interactive labeling challenges
│   ├── algorithms/
│   │   └── spacedRepetition.ts   # SM-2 algorithm implementation
│   ├── stores/
│   │   ├── courseStore.ts        # Zustand: user progress
│   │   └── reviewStore.ts        # Zustand: spaced repetition cards
│   └── utils/
│
├── types/
│   ├── anatomy.ts                # Landmark, Zone, Layer types
│   ├── course.ts                 # Module, Rule, Challenge types
│   ├── review.ts                 # SM-2 card types
│   └── user.ts                   # Progress tracking types
│
└── public/
    └── svg/
        └── inverted-y.svg        # Interactive anatomy diagram
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd rtapp-course

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

---

## 🎨 Key Components

### 1. AnatomySVGViewer

The core interactive anatomy component with:
- **Click Detection**: Identifies landmarks via `data-landmark-id`
- **Layer Control**: Toggle zones, triangles, labels, iliopubic tract
- **Zoom & Pan**: Mobile pinch-zoom and desktop scroll-zoom
- **Modes**: Study (labels visible), Test (labels hidden), Interactive

```typescript
<AnatomySVGViewer
  svgUrl="/svg/inverted-y.svg"
  mode="test"
  onLandmarkClick={(id) => handleAnswer(id)}
  highlightedLandmarks={['inferior_epigastric_vessels']}
  selectedLandmarks={['vas_deferens']}
  showLabels={false}
/>
```

### 2. SM-2 Spaced Repetition

Industry-standard algorithm for optimal review intervals:

```typescript
import { calculateNextReview } from '@/lib/algorithms/spacedRepetition';

const result = calculateNextReview(card, quality); // 1-5 rating
// Returns: { interval, repetitions, easinessFactor, nextReview }
```

**Review Schedule:**
- First review: 1 day
- Second review: 6 days
- Subsequent: interval × easinessFactor (capped at 180 days)

### 3. The 10 Rules (Data Model)

Each rule includes:
- **Steps**: Procedural checklist
- **Required Landmarks**: Must be visible before proceeding
- **Zones**: Where the rule applies
- **Failure Modes**: What goes wrong + prevention
- **Complication Prevented**: Clinical outcome

Example:
```typescript
{
  id: 5,
  title: 'Adequate Parietalization',
  summary: 'Vas crosses iliac vein AND iliopsoas muscle is clearly visible.',
  requiredLandmarks: ['vas_deferens', 'external_iliac_vein', 'iliopsoas_muscle'],
  zones: [Zone.ZONE_1, Zone.ZONE_3],
  failureModes: [
    {
      description: 'Incomplete parietalization',
      consequence: 'Mesh migration, cord pain, recurrence',
      prevention: 'Always verify vas crosses vein AND iliopsoas visible'
    }
  ],
  complicationPrevented: 'Mesh migration, cord pain, recurrence, vascular injury'
}
```

---

## 📊 Data Models

### Landmarks
12 key anatomical structures:
- Inferior epigastric vessels
- Vas deferens
- Spermatic vessels
- External iliac vein/artery
- Iliopubic tract
- Iliopsoas muscle
- Deep inguinal ring
- Pubic symphysis
- Cooper's ligament
- Femoral canal
- Bladder

Each includes:
- Clinical significance
- Zone assignment
- Related structures
- SVG path references
- Required-for-rules mapping

### Zones

```typescript
Zone 1: Lateral space (safe, but nerves present)
Zone 2: Medial direct space (direct hernias)
Zone 3: Central high-risk zone (Triangle of Doom, cord elements)
```

### Review Cards

```typescript
interface ReviewCard {
  type: 'IMAGE_LANDMARK' | 'RULE_RECALL' | 'FAILURE_MODE' | 'ZONE_IDENTIFICATION';
  front: string;  // Question
  back: string;   // Answer
  
  // SM-2 fields
  easinessFactor: number;  // 1.3-2.5
  interval: number;        // Days
  nextReview: Date;
  
  // Performance tracking
  totalReviews: number;
  correctCount: number;
  averageResponseTime: number;
}
```

---

## 🎓 Course Structure

### Module 0: Orientation (5-7 min)
- Why posterior anatomy is challenging
- rTAPP advantages and risks
- Critical View of MPO concept
- 3 baseline MCQs

### Module 1: The Visual Map
**Lessons:**
1. The Inverted Y (IEV, vas, spermatic vessels)
2. Iliopubic Tract (fixation boundary)
3. Zones 1, 2, 3 (dissection regions)
4. Danger Regions (Triangles of Doom, Pain, Femoral)

**Requirement:** Label all landmarks correctly before progressing

### Module 2: The 10 Rules
Each rule page includes:
- Rule statement
- Step-by-step checklist
- Required visible landmarks
- Common failure modes
- "If you remember one thing" summary

### Module 3: Image Labeling Lab
Interactive challenges with:
- Study Mode (labels visible)
- Test Mode (labels hidden)
- Layer toggling
- 100% accuracy required to pass

### Module 4: Procedural Flow Simulator *(Future)*
- Standard indirect case
- Large direct case
- Femoral hernia scenario
- Large inguinoscrotal case

### Module 5: Assessment & Certification
- 30+ MCQs
- 10 image labeling tasks
- 5 scenario-based decisions
- Certificate generation
- Weakness heatmap

---

## 🔬 Spaced Repetition System

### Review Schedule
- **Day 1**: Initial learning
- **Day 3**: First review
- **Day 7**: Second review
- **Day 21**: Third review
- **Day 60+**: Mature intervals

### Card Types

1. **Image Cards**: "Identify this structure" → Visual learning
2. **Rule Recall**: "What is Rule 5?" → Conceptual retention
3. **Failure Mode**: "What happens if you violate Rule 9?" → Clinical reasoning
4. **Zone ID**: "Where is Zone 2?" → Spatial awareness

### Performance Metrics
- Retention rate (% correct)
- Cards due today
- Cards mastered (interval >21 days)
- Average easiness factor
- Forecast (future workload)

---

## 🎨 SVG Design Guidelines

### Structure Requirements

```xml
<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <!-- Each landmark MUST have data-landmark-id -->
  <path 
    id="landmark-vas"
    data-landmark-id="vas_deferens"
    data-zone="ZONE_1"
    class="landmark-path"
  />
  
  <!-- Layers controlled by data-layer attribute -->
  <g id="layer-zones" data-layer="zones" visibility="hidden">
    <!-- Zone overlays -->
  </g>
  
  <!-- Invisible hotspots for mobile touch -->
  <circle cx="400" cy="300" r="30" 
          fill="transparent" 
          class="hotspot" 
          data-target="vas_deferens"/>
</svg>
```

### CSS Classes
- `.landmark-path` - Clickable anatomical structure
- `.landmark-highlighted` - Yellow glow (correct answer)
- `.landmark-selected` - Green glow (user selected)
- `.landmark-hovered` - Brightness increase
- `.zone-overlay` - Colored region (20% opacity)

### Color Coding (from paper)
- **Red**: Inferior epigastric vessels, Zone 3, Danger triangles
- **Beige/White**: Vas deferens
- **Blue**: Spermatic vessels, External iliac vein
- **Dark blue**: Iliopubic tract (dashed line)
- **Green**: Zone 2, Femoral triangle
- **Tan/Beige**: Zone 1
- **Purple**: Direct triangle

---

## 📱 Mobile Optimization

### Touch Targets
- Minimum 40px × 40px hit areas
- Invisible hotspot circles for small paths
- Ripple effect on tap

### Gestures
- **Pinch-zoom**: Scale SVG (0.5× to 4×)
- **Pan**: Two-finger drag
- **Tap**: Select landmark
- **Long-press**: Show tooltip (future)

### Performance
- Lazy-load SVG layers
- Virtualize landmarks (>50 paths)
- Debounce hover states (100ms)
- Use `will-change: transform` for animations

---

## 🔐 Future: Backend Migration Plan

### Phase 1: Dual-Write (Weeks 1-2)
- localStorage as source of truth
- Optional API calls (non-blocking)
- Log sync errors without failing

### Phase 2: Data Migration (Week 3)
- Batch import localStorage → database
- User-initiated "Sync to Cloud" button
- Validate data integrity

### Phase 3: Backend-First (Week 4+)
- API as source of truth
- localStorage as cache
- Offline queue with sync on reconnect

### Prisma Schema
```prisma
model User {
  id       String   @id @default(cuid())
  email    String   @unique
  progress UserProgress?
  cards    ReviewCard[]
}

model ReviewCard {
  id             String   @id
  userId         String
  type           String
  easinessFactor Float    @default(2.5)
  interval       Int      @default(1)
  nextReview     DateTime
  totalReviews   Int      @default(0)
}
```

---

## ⚠️ Critical Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **SVG Performance on Mobile** | High | Virtualize layers, limit to 50 landmarks, lazy load |
| **Touch Precision** | High | 40px min hit areas, visual feedback, tap-to-confirm |
| **localStorage Quota (5MB)** | Medium | Compress JSON, migrate to IndexedDB at 1000+ cards |
| **Incorrect Landmark Mapping** | Critical | Validation layer, unit tests, visual QA checklist |
| **Spaced Repetition Staleness** | Medium | Daily background job, cap max interval at 180 days |

### Accessibility
- **Screen readers**: Add `<title>` and `<desc>` to SVG paths
- **Keyboard navigation**: Tab through landmarks, Enter to select
- **Color blindness**: Use patterns + colors for zones
- **Low vision**: 3:1 contrast minimum, system font scaling

---

## 🧪 Testing Strategy

### Unit Tests
```bash
npm run test
```
- SM-2 algorithm edge cases
- Landmark validation
- Progress calculation

### Integration Tests
```bash
npm run test:e2e
```
- Complete labeling challenge flow
- Rule progression gates
- Review session lifecycle

### Performance Benchmarks
- Initial load: <2s on 3G
- SVG interaction: <100ms
- Time to Interactive: <3s
- Lighthouse score: >90 (all categories)

---

## 📦 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Environment Variables
```bash
# Future: when backend is added
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://your-domain.com"
```

### Analytics Setup
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🎯 Success Metrics

### User Engagement
- **Module Completion Rate**: Target >70%
- **Average Session Length**: Target 15-20 min
- **Return Rate (7 days)**: Target >40%
- **Streak Days**: Track daily usage

### Learning Outcomes
- **Retention Rate**: Target >85% on mature cards
- **Assessment Pass Rate**: Target >80% first attempt
- **Landmarks Mastered**: All 12 within 2 weeks

### Technical Performance
- **Mobile Bounce Rate**: <30%
- **SVG Load Time**: <500ms
- **Error Rate**: <0.1%
- **Offline Support**: 100% of core features

---

## 🛠️ Development Workflow

### Sprint Structure (6 weeks)

**Week 1: Foundation**
- Project setup
- Type system
- Core data models
- Base SVG viewer

**Week 2: Modules 0-1**
- Orientation page
- Inverted Y lesson
- Zone identification
- Progress tracking

**Week 3: Modules 2-3**
- 10 Rules pages
- Labeling challenges
- Feedback system
- Unlock gates

**Week 4: Spaced Repetition**
- SM-2 implementation
- Review interface
- Card generation
- Session management

**Week 5: Assessment & Polish**
- Final exam
- Certificate generation
- UI refinements
- Performance optimization

**Week 6: Testing & Launch**
- E2E tests
- Cross-browser testing
- Beta launch
- Feedback collection

---

## 📚 References

### Primary Source
Claus, C., Furtado, M., Malcher, F., Cavazzola, L. T., & Felix, E. (2020). Ten golden rules for a safe MIS inguinal hernia repair using a new anatomical concept as a guide. _Surgical Endoscopy_, 34, 1458-1464. [https://doi.org/10.1007/s00464-020-07449-z](https://doi.org/10.1007/s00464-020-07449-z)

### Spaced Repetition Algorithm
Wozniak, P. A. (1990). SuperMemo 2 Algorithm. [https://www.supermemo.com/en/archives1990-2015/english/ol/sm2](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)

### Additional Reading
- Furtado et al. (2019). Systemization of laparoscopic inguinal hernia repair (TAPP) based on inverted Y and five triangles. _Arq Bras Cir Dig_.
- Daes & Felix (2017). Critical view of the myopectineal orifice. _Ann Surg_.

---

## 🤝 Contributing

### Code Style
- TypeScript strict mode
- Tailwind for styling (no custom CSS)
- Functional components with hooks
- Descriptive variable names

### Commit Messages
```
feat: Add Zone 3 labeling challenge
fix: Correct vas deferens SVG path
docs: Update SM-2 algorithm documentation
perf: Optimize SVG rendering for mobile
```

### Pull Request Template
1. **What**: Brief description of changes
2. **Why**: Problem being solved
3. **How**: Implementation approach
4. **Testing**: How to verify the fix
5. **Screenshots**: UI changes (if applicable)

---

## 📄 License

Educational use only. Based on published medical literature.

---

## 🙏 Acknowledgments

- Dr. Christiano Claus and co-authors for the 10 Golden Rules framework
- Dr. Marcelo Furtado for the Inverted Y and Five Triangles concept
- The SuperMemo team for the SM-2 algorithm

---

**Built with ❤️ for surgical education**
