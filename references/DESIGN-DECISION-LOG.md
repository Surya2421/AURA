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

*(New project entries will be recorded here sequentially as DEC-006, DEC-007, etc.)*
