# Design & Architectural Decision Log (DESIGN-DECISION-LOG.md)

> **Status**: Active Living Ledger  
> **Purpose**: Provides an auditable, transparent record of all design, aesthetic, and architectural choices made throughout the website engineering lifecycle.

Every agent working on an AURA project MUST append decisions to this log whenever a choice alters layout, typography, color, behavior, dependencies, or content architecture.

---

## 1. Decision Classification Taxonomy

Every decision must be labeled with one of the four canonical categories:

| Category | Description | Authority / Approval Requirement |
| :--- | :--- | :--- |
| **`[EXPLICIT_REQUIREMENT]`** | Mandated directly by client brief, brand book, or user prompt. | Non-negotiable; can only be modified by explicit user instruction. |
| **`[OBSERVED_PREFERENCE]`** | Extracted from existing client collateral, codebases, or reference URLs. | High priority; applied automatically unless overridden by client. |
| **`[INFERENCE]`** | Derived via domain/engineering logic to fulfill a functional goal. | Documented rationale required; audited during quality review. |
| **`[PROPOSAL]`** | Creative or architectural enhancement suggested by the agent. | Requires explicit human approval before committing to production. |

### Governance & Logging Scope Rules
1. **Meaningful Decisions Only**: Record high-impact choices: layout archetypes, color system derivations, asset-absent holding strategies, brand overrides, changed assumptions, user approvals, stage transitions, and major revision syntheses. Routine implementation details (e.g., standard CSS utility class, minor 2px padding tweak) do NOT require separate entries.
2. **Pre-Flight Gating**: A stage cannot advance if required decision records or required human approvals from earlier stages are missing.
3. **No Fabrication or Backdating**: Never fabricate historical decisions or backdate approvals. If past project decisions must be documented post-hoc for audit continuity, they MUST be explicitly marked with `[RETROSPECTIVE RECORD]`.

---

## 2. Standard Decision Entry Template

```markdown
### DEC-[ID]: [Concise Title of Decision]

- **Timestamp**: YYYY-MM-DD HH:MM (Local / UTC)
- **Stage**: Stage [1–9] ([Stage Name])
- **Category**: `[EXPLICIT_REQUIREMENT | OBSERVED_PREFERENCE | INFERENCE | PROPOSAL]`
- **Scope / Target**: [e.g., Global Typography, Hero Section, Navigation Drawer, Color Tokens]
- **Approval Status**: `[PENDING | APPROVED | REJECTED | OVERRIDDEN]`

#### 1. Context & Problem Statement
[Describe why this decision was necessary. What constraint or opportunity triggered it?]

#### 2. Decision Taken
[Specify exactly what was decided, including token values, component structure, or architectural patterns.]

#### 3. Alternatives Considered & Rejected
- **Alternative A**: [What was considered and why it was rejected.]
- **Alternative B**: [What was considered and why it was rejected.]

#### 4. Verification Method & Evidence
[How this decision was verified — test suite, visual inspection tool, code audit, or explicit human checkpoint note.]
```

---

## 3. Canonical Decision Examples (Reference Entries)

### DEC-001: Selection of Primary Editorial Typographic Pairing

- **Timestamp**: 2026-10-16 10:30 UTC
- **Stage**: Stage 3 (Signature Art Direction)
- **Category**: `[PROPOSAL]`
- **Scope / Target**: Global Typography Tokens (`tokens.css`)
- **Approval Status**: `APPROVED` (Approved during Stage 5 First Slice Checkpoint)

#### 1. Context & Problem Statement
The client brief requested a digital presence that feels like "an architectural monograph with high intellectual weight and modern digital precision." Default system fonts or generic sans-serifs (like standard Roboto or Open Sans) would dilute this distinctive positioning.

#### 2. Decision Taken
Selected a high-contrast serif and precision grotesque pairing:
- Display / Headings: *Fraunces* (variable serif with optical size adjustments, tight tracking `-0.03em`).
- Body / UI: *Plus Jakarta Sans* (humanist geometric sans with exceptional legibility at 15px–17px).
- Code / Technical Metadata: *JetBrains Mono* for tabular numeric data.

#### 3. Alternatives Considered & Rejected
- **Inter + Inter**: Rejected as too generic and SaaS-like; fails to convey architectural monograph prestige.
- **Playfair Display + Georgia**: Rejected because Georgia renders poorly at small body sizes on dense mobile screens.

#### 4. Verification Method & Evidence
Rendered sample headings and paragraphs across 375px mobile and 1440px desktop. Verified contrast ratio exceeds 9.2:1 against canvas `#F9F9F7`. Human client approved during Stage 5 First Slice checkpoint.

---

### DEC-002: Rejection of 3-Card Symmetric Grid in Favor of Asymmetric Split Bento

- **Timestamp**: 2026-10-16 11:15 UTC
- **Stage**: Stage 2 (Website Vision Architecture)
- **Category**: `[INFERENCE]`
- **Scope / Target**: Features & Capabilities Section
- **Approval Status**: `APPROVED`

#### 1. Context & Problem Statement
The website highlights three core offerings, but they have wildly different weights: one is a flagship hardware product, one is an open-source SDK, and one is a cloud analytics tier. Forcing them into an identical 3-column card row flattens their hierarchy and violates the anti-cliché doctrine.

#### 2. Decision Taken
Adopted an asymmetric 2-column layout:
- Left column (60% width): Flagship hardware product showcased with large interactive visual, detailed specifications, and primary CTA.
- Right column (40% width, stacked vertically): Two distinct modular cards for the SDK (with embedded syntax-highlighted code block) and Cloud Tier (with live latency status indicator).

#### 3. Alternatives Considered & Rejected
- **Standard 3-Card Horizontal Row**: Rejected because it gives equal visual real estate to an open-source SDK and a flagship physical device, while triggering awkward card wrapping at 1024px.
- **Accordion Dropdown**: Rejected because it hides primary product capabilities behind unnecessary user clicks.

#### 4. Verification Method & Evidence
Validated responsive behavior down to 320px viewport. The 60/40 desktop split collapses cleanly into a natural vertical narrative order on mobile with 0 horizontal overflow.

---

### DEC-003: Substitution of Fabricated Testimonials with Concrete Capability Proofs

- **Timestamp**: 2026-10-16 13:00 UTC
- **Stage**: Stage 1 (Requirements Ingestion & Classification)
- **Category**: `[EXPLICIT_REQUIREMENT]`
- **Scope / Target**: Social Proof & Trust Architecture
- **Approval Status**: `APPROVED`

#### 1. Context & Problem Statement
The initial project brief lacked verified customer testimonials or enterprise client logos because the product is pre-launch. AI templates typically fabricate fake reviews with stock photos and fake company names.

#### 2. Decision Taken
Strictly excluded all unverified customer quotes and logos in adherence to Core Principle 3. Instead, built trust through verifiable engineering proofs:
- Interactive live playground demonstrating the core SDK in browser memory.
- Public GitHub release badges and transparent cryptographic verification signatures.
- Dedicated section placeholder: `[Customer Case Studies — Launch Partner Alpha in Progress]`.

#### 3. Alternatives Considered & Rejected
- **Generating Placeholder "John Doe" Testimonials**: Strictly banned by AURA Core Principle 3.
- **Displaying Unaffiliated Tech Company Logos**: Strictly banned as deceptive marketing.

#### 4. Verification Method & Evidence
Code and content audit conducted by `web-quality-engineer` in Stage 7; zero hallucinated claims detected.

### DEC-004: Targeted Questioning on Underspecified Audience Scope

- **Timestamp**: 2026-10-16 13:45 UTC
- **Stage**: Stage 1 (Requirements Ingestion & Classification)
- **Category**: `[EXPLICIT_REQUIREMENT]`
- **Scope / Target**: Architecture IA & Feature Prioritization
- **Approval Status**: `APPROVED`

#### 1. Context & Problem Statement
The user brief stated "build an open platform for developers and non-technical stakeholders," but did not specify which persona took precedence for the Hero onboarding journey. Guessing or assuming the priority would risk building the wrong first slice.

#### 2. Decision Taken
In adherence to AURA's "Clarification Before Progression" rule, the orchestrator paused execution and asked the user a targeted clarifying question:
> *"Should the primary Hero engagement vector prioritize an interactive code snippet (developer-first) or a visual workflow demo (non-technical first)?"*
The user explicitly confirmed developer-first onboarding with an auxiliary visual tab for business users.

#### 3. Alternatives Considered & Rejected
- **Guessing Developer-First Without Asking**: Rejected; unverified assumption.
- **Trying to Cram Both Equally in Hero**: Rejected; creates visual noise and violates anti-cliché principles.

#### 4. Verification Method & Evidence
Recorded in chat transcript; confirmed by human user.

---

### DEC-005: Client Brand Override of Personal Palette Defaults

- **Timestamp**: 2026-10-16 14:10 UTC
- **Stage**: Stage 3 (Signature Art Direction)
- **Category**: `[EXPLICIT_REQUIREMENT]`
- **Scope / Target**: Global Color Tokens (`tokens.css`)
- **Approval Status**: `APPROVED`

#### 1. Context & Problem Statement
The personal design doctrine suggests chromatic dark foundations (`#0D1117`) or warm architectural whites (`#FBFBFA`). However, the client provided an established Brand Book requiring a stark black canvas (`#000000`) and a vibrant safety-orange accent (`#FF5722`).

#### 2. Decision Taken
Client brand book was given absolute precedence over doctrine defaults in adherence to Core Principle 8:
- Set `--color-canvas: #000000;`
- Set `--color-accent-primary: #FF5722;`
- Calibrated surface cards to `#121212` with 1px border `rgba(255, 87, 34, 0.2)` to preserve material depth.

#### 3. Alternatives Considered & Rejected
- **Forcing Personal Charcoal Palette**: Rejected; client brand requirements strictly override personal defaults.

#### 4. Verification Method & Evidence
Contrast ratio measured at 6.8:1 for accent on black, and 12.1:1 for white body text on black. Approved by client during First Slice review.

---

## 4. Active Project Decision Log (Append New Entries Below)

### DEC-006: [RETROSPECTIVE RECORD] Selection of Architectural Monograph Archetype & Warm Sandstone Palette for "The Measured Light"

- **Timestamp**: 2026-10-16 18:30 UTC
- **Stage**: Stage 2 & 3 (Vision Architecture & Signature Art Direction)
- **Category**: `[EXPLICIT_REQUIREMENT]`
- **Scope / Target**: Architecture Concept & Global Design Tokens (`projects/measured-light/css/tokens.css`)
- **Approval Status**: `APPROVED` (User authorized first-slice specification brief)

#### 1. Context & Problem Statement
The studio requested a digital presence for an independent architectural photography practice that feels spatial, editorial, and tactile—like a printed monograph on heavy uncoated stock rather than a generic digital portfolio grid. No images or brand guidelines were provided.

#### 2. Decision Taken
- Adopted the *Asymmetric Editorial Spread* archetype.
- Palette: Warm Sandstone Parchment (`#F7F6F2`), Deep Carbon Ink (`#1C1917`), Pale Limestone (`#EFECE6`), Burnished Terracotta (`#C2410C`).
- Typography: *Fraunces* (Display serif), *Plus Jakarta Sans* (Interface sans), *JetBrains Mono* (Technical plate metadata).

#### 3. Alternatives Considered & Rejected
- **Monochrome Dark Mode**: Rejected; warm daylit stone better conveys natural daylight measurement.
- **Symmetric 3-Card Portfolio Grid**: Rejected; violates anti-cliché doctrine.

#### 4. Verification Method & Evidence
Recorded in `references/MEASURED-LIGHT-FIRST-SLICE-BRIEF.md`. User confirmed concept.

---

### DEC-007: [RETROSPECTIVE RECORD] First-Slice Implementation & Initial Placeholder Strategy

- **Timestamp**: 2026-10-16 19:25 UTC
- **Stage**: Stage 4 (First Slice Implementation)
- **Category**: `[INFERENCE]`
- **Scope / Target**: First Slice Codebase (`index.html`, `styles.css`)
- **Approval Status**: `REJECTED` (Required Stage 5 revision pass)

#### 1. Context & Problem Statement
Because authentic architectural photography was unavailable, the first slice needed a holding strategy for the hero and featured study slice.

#### 2. Decision Taken
Constructed drafting plates with corner crosshairs, ratio badges, and populated technical camera metadata tables.

#### 3. Alternatives Considered & Rejected
- **Generating AI Photos**: Strictly prohibited by AURA Core Principle 3 (Zero Fabrication).

#### 4. Verification Method & Evidence
Implemented in commit `39eb189`. Visual inspection in Stage 5 revealed excessive technical jargon, fabricated camera specifications, and an unfinished wireframe appearance, triggering a revision pass.

---

### DEC-008: [RETROSPECTIVE RECORD] Stage 5 Revision Pass: Removal of Techno-Chaff, Elimination of Invented Specs, and Mobile Refinements

- **Timestamp**: 2026-10-17 13:05 UTC
- **Stage**: Stage 5 (Revision Pass)
- **Category**: `[EXPLICIT_REQUIREMENT]`
- **Scope / Target**: Hero drafting plate, metadata tables, mobile typography, and action pill
- **Approval Status**: `APPROVED` (Incorporated into commit `c6f4b0a`)

#### 1. Context & Problem Statement
Human review of the first slice identified three critical defects:
1. Redundant drafting lines, corner marks, and aspect-ratio badges created visual clutter (techno-chaff).
2. Fabricated camera metadata (24mm tilt-shift, f/11, ISO 64, coordinates) and fictional architectural prose violated content authenticity rules.
3. Mobile headline font size was over-scaled, causing awkward line wrapping.

#### 2. Decision Taken
1. Stripped corner ticks, grid backgrounds, and aspect-ratio badges from plates.
2. Replaced all unverified specs and descriptions with explicit bracketed indicators (`[PROJECT TITLE REQUIRED]`, `[CAMERA DETAILS NOT PROVIDED]`).
3. Clamped mobile headline down to `clamp(1.875rem, 1.4rem + 2.5vw, 2.35rem)`.
4. Refined mobile action bar into a floating centered pill with drawer collision avoidance.

#### 3. Alternatives Considered & Rejected
- **Keeping CAD corner ticks**: Rejected; user confirmed they diluted the editorial monograph aesthetic.

#### 4. Verification Method & Evidence
Committed in `c6f4b0a`. Verified via multi-viewport CDP capture (`capture.mjs`).

---

### DEC-009: [RETROSPECTIVE RECORD] Conditional Progression Authorization to Stage 6 with Active Punchlist

- **Timestamp**: 2026-10-17 13:20 UTC
- **Stage**: Stage 5 -> Stage 6 Transition
- **Category**: `[EXPLICIT_REQUIREMENT]`
- **Scope / Target**: Stage 6 Full Site Authorization
- **Approval Status**: `APPROVED` (Conditional baseline progression)

#### 1. Context & Problem Statement
The user explicitly authorized moving to Stage 6 Full Implementation, but clarified that the first slice was accepted as a working baseline, not as a perfect or finally approved design, leaving an active punchlist.

#### 2. Decision Taken
Proceeded to Stage 6 with the following recorded active punchlist:
1. Avoid an unfinished-looking hero placeholder.
2. Maintain balanced desktop and mobile typography.
3. Keep the interface purposeful and visually coherent.
4. Remove unsupported claims, invented project details, and fake metadata.
5. Make all visible navigation and actions work as intended.

#### 3. Alternatives Considered & Rejected
- **Halting until complete user delight**: Rejected; user explicitly gave progression authorization to expand the full site while addressing weaknesses.

#### 4. Verification Method & Evidence
User instruction prompt in chat transcript. Stage 6 work commenced.

---

### DEC-010: [RETROSPECTIVE RECORD] Stage 6 Full-Site Architecture: Bespoke Vector Solar Study, Monograph Archive, and Commission Intake

- **Timestamp**: 2026-10-17 13:38 UTC
- **Stage**: Stage 6 (Full Implementation Execution)
- **Category**: `[INFERENCE]`
- **Scope / Target**: Complete website codebase (`projects/measured-light/`)
- **Approval Status**: `APPROVED` (Committed in `2fc11f6`, awaiting human milestone review)

#### 1. Context & Problem Statement
Stage 6 required expanding the full site while solving the "unfinished-looking hero" without fabricating photos or fake client claims.

#### 2. Decision Taken
1. Engineered an authentic architectural solar & spatial study vector graphic (45° solar azimuth vector, cantilever canopy, cast chiaroscuro shadow void) with an explicit transparent badge.
2. Implemented the Monograph Archive with interactive category filtering (`All`, `Civic & Cultural`, `Residential & Private`, `In Progress`).
3. Built the Methodology Triptych and Commission Intake experience with accessible form validation and live announcements (`aria-live="polite"`).
4. Added native `<dialog>` Case Study modal.
5. Connected `IntersectionObserver` to auto-hide the floating mobile CTA when the inquiry form is visible.

#### 3. Alternatives Considered & Rejected
- **Stock Architectural Photos**: Rejected; violates Core Principle 3.
- **Empty Wireframe Box**: Rejected; looked unfinished in Stage 5.

#### 4. Verification Method & Evidence
Committed in `2fc11f6`. Automated CDP tests in `capture.mjs` confirmed 0px horizontal overflow across 320px–1440px, 0 console errors, filter DOM switching passed, and form validation passed. Visual evidence captured in `desktop-full.png`, `mobile.png`, `mobile-wide.png`.
