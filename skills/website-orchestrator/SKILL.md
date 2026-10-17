---
name: website-orchestrator
description: Master lifecycle coordinator that drives the 9-stage website engineering pipeline, enforces the human approval checkpoint, and coordinates specialist skills.
---

# Website Orchestrator Skill (`website-orchestrator`)

The `website-orchestrator` is the central operational engine of AURA. It directs the end-to-end lifecycle of website engineering, delegates tasks to specialist skills in dependency order, enforces governance rules, and guarantees that the **Human Approval Gate** is never bypassed.

---

## 1. Core Operating Principles

1. **Gatekeeper Authority**: The orchestrator controls stage transitions. No specialist skill may jump ahead out of sequence.
2. **Strict Human Gate Enforcement**: Under no circumstances will the orchestrator allow full-site implementation (Stage 6) to proceed without explicit human approval of the representative first slice (Stage 5). Silence or timeout is NEVER treated as approval.
3. **Clarification Before Progression**: Ambiguous or missing requirements trigger targeted user questions rather than fabricated assumptions.
4. **Pre-Flight Decision Logging Enforcement**:
   - Meaningful architectural choices, layout archetypes, color palette selections, asset-absent strategies, brand overrides, changed assumptions, user approvals, and stage transitions MUST be recorded in `references/DESIGN-DECISION-LOG.md`.
   - Routine implementation details (e.g., standard CSS utility class, minor 2px spacing adjustment) do NOT each require their own decision entry.
   - Before any stage advances, the orchestrator MUST verify that the required decision records for preceding stages exist. A stage cannot advance when a required decision record or required human approval is missing.
   - Never fabricate historical decisions or backdate approvals.
5. **Evidence-Based Verification**: The orchestrator verifies that claims of test passes, visual checks, and performance scores are backed by tangible evidence before advancing stages.
6. **Dual Execution Modality**: The orchestrator operates in two modes:
   - **Multi-Agent Delegation**: Dispatches subagents when subagent spawning tools exist.
   - **Single-Agent Persona Adoption**: In single-agent environments (Cursor, Windsurf, standard CLI), the agent explicitly adopts each specialist role sequentially, completing deliverables before assuming the next persona.

---

## 2. The 9-Stage Pipeline Execution Map

```text
Stage 1: Requirements Ingestion & Classification
   │  └── Parse brief, extract brand assets, ask clarifying questions, classify constraints
   ▼
Stage 2: Vision Architecture & Concept Synthesis
   │  └── Delegate to `website-vision-architect` (Concept document, layout archetype, narrative IA)
   ▼
Stage 3: Signature Art Direction & Design Tokens
   │  └── Delegate to `signature-art-direction` (Typography, color science, `tokens.css`)
   ▼
Stage 4: First Slice Implementation (Vertical Slice)
   │  └── Delegate to `frontend-experience-engineer` (Navigation + Hero + 1 Core Interactive Element)
   ▼
Stage 5: Visual Inspection & Human Approval Checkpoint
   │  └── Delegate visual capture to `visual-acceptance-reviewer`
   │  └── [CRITICAL STOP]: Present evidence to human user and HALT execution
   ▼
   [HUMAN APPROVAL GATE: Awaiting explicit human response]
   ├── If Revisions Requested ──> Route back to Stage 2, 3, or 4 based on scope
   └── If Approved ─────────────> Proceed to Stage 6
   ▼
Stage 6: Full Implementation Execution
   │  └── Delegate to `frontend-experience-engineer` (Complete component architecture, all pages/views)
   ▼
Stage 7: Functional QA & Accessibility Audit
   │  └── Delegate to `web-quality-engineer` (Vitest/Playwright, WCAG 2.2 AA, performance budgets)
   ▼
Stage 8: Visual QA & Visual Acceptance Review
   │  └── Delegate to `visual-acceptance-reviewer` (Multi-viewport inspection, 320px–3840px checks)
   ▼
Stage 9: Regression Testing & Final Delivery Report
      └── Final verification against first slice baseline, compile Final Delivery Report, handoff
```

---

## 3. Detailed Stage Protocols

### Stage 1: Requirements Ingestion & Classification
- **Input**: User prompt, client brief, brand guidelines, existing assets, or domain context.
- **Actions**:
  1. Parse all explicit requirements (brand colors, typefaces, mandatory content, target audience).
  2. Audit reference materials to identify observed preferences.
  3. Classify all initial requirements into the 4-category taxonomy in `references/DESIGN-DECISION-LOG.md`.
  4. Flag any fabricated content risks (e.g., prompt asking for "reviews from Fortune 500 CEOs" when none exist) and establish authentic fallback strategies.
  5. **Clarification Before Progression**: If core parameters (audience, brand identity, functional scope, or brand assets) are ambiguous, contradictory, or underspecified, the orchestrator MUST pause and ask targeted clarifying questions. The agent must NEVER invent or fabricate assumptions to fill gaps.
- **Output**: Requirements Specification & Initial Decision Log entries (`DEC-001`+).

### Stage 2: Vision Architecture & Concept Synthesis
- **Delegation**: Invoke or execute role `website-vision-architect`.
- **Input**: Requirements Specification, `references/PERSONAL-DESIGN-DOCTRINE.md`.
- **Actions**: Produce the Concept Document, select a non-generic layout archetype, define the emotional tone, and map the narrative information architecture.
- **Output**: Architecture Concept Brief.

### Stage 3: Signature Art Direction & Design Tokens
- **Delegation**: Invoke or execute role `signature-art-direction`.
- **Input**: Architecture Concept Brief, Brand Assets.
- **Actions**: Establish typography pairings, fluid spatial formulas, harmonious color palettes, material elevations, and export `tokens.css` (or equivalent token structure).
- **Output**: Design Token System & Style Tile specifications.

### Stage 4: First Slice Implementation (Representative Vertical Slice)
- **Delegation**: Invoke or execute role `frontend-experience-engineer`.
- **Input**: Architecture Concept Brief, Design Tokens (`tokens.css`).
- **Actions**:
  1. Build a working, isolated representative vertical slice of the website:
     - Navigation header (responsive layout, brand badge, nav actions).
     - Hero section featuring signature typography, distinctive layout, and primary CTA.
     - One key interactive/content section demonstrating the core visual archetype.
  2. Ensure code is clean, fully responsive, and connected to the token system.
- **Output**: Functional First Slice codebase.

### Stage 5: Visual Inspection & The Mandatory Human Approval Checkpoint
- **Delegation**: Invoke or execute role `visual-acceptance-reviewer`.
- **Input**: Running First Slice on local preview server.
- **Actions**:
  1. Launch local dev preview server (e.g., `npm run dev` or local HTTP server).
  2. Capture multi-viewport visual evidence (screenshots or honest terminal fallback across 320px, 375px, 768px, 1440px).
  3. Inspect layout for clipping, overflow, contrast, and alignment defects.
  4. Conduct and record the **Design Evaluation Rubric** (`evaluations/design-evals.md`):
     - **Visual Concept Coherence**: Degree to which the slice embodies the approved narrative and layout archetype.
     - **Content Authenticity**: Audit ensuring zero unbracketed fabricated claims, fake metrics, or invented metadata.
     - **Mobile Ergonomics**: Review touch targets (≥ 44×44px), headline viewport budget, and floating action clearance.
     - **Anti-Cliché Review**: Audit against generic AI tropes and decorative technical clutter (pseudo-CAD/HUD chaff).
     - **Unresolved Defects & Diagnostics**: Report observed warnings, contrast ratios, and layout observations.
     - **Verification Evidence**: Declare inspection mode, viewports examined, and screenshot links.
     *(Note: Clearly separate automated programmatic test results from human visual/aesthetic judgments. Do not fabricate arbitrary numerical scores without documented rubric rationale.)*
  5. Formulate the **Human Checkpoint Presentation** (see Section 4 template).
  6. **MANDATORY STOP & SILENCE RULE**: Halt tool calls. Do NOT write full site code. Wait for human feedback. Under no circumstances may the agent treat silence, elapsed time, or ambiguous replies as approval. Execution remains strictly halted until explicit human approval ("Approved", "Proceed") is received.
  7. **Approval Routing & Handling**:
     - **Case A: Explicit Human Approval**: User confirms design and authorizes Stage 6. Log approval in `references/DESIGN-DECISION-LOG.md` and proceed.
     - **Case B: Conditional Approval (Baseline Progression)**:
       - Occurs when the user authorizes moving forward into Stage 6 as a working baseline, but notes dissatisfaction with specific elements or leaves issues open.
       - The orchestrator MUST:
         a. Record the conditional acceptance and the itemized list of unresolved issues in `references/DESIGN-DECISION-LOG.md`.
         b. Identify which limitations are accepted temporarily as progression baselines.
         c. Preserve those unresolved issues on the active punchlist for Stage 8 (Visual QA) and Stage 9 (Final Review).
         d. NEVER reinterpret conditional acceptance as final design approval.
         e. NEVER block progress when the user has explicitly authorized the next stage and all required hard gates are satisfied.
     - **Case C: Revision Requested**:
       - When revisions are requested before progression, the orchestrator MUST perform **Revision Synthesis**:
         1. *What failed*: Specific aesthetic, structural, or functional defect identified.
         2. *Why it failed*: Context of why the defect was introduced.
         3. *Root cause classification*: Classify as `Missing rule`, `Vague instruction`, `Enforcement failure`, `Testing gap`, `Unavailable project asset`, or `Project-specific preference`.
         4. *What changed*: Specific token adjustments, component redesign, or copy correction executed.
         5. *Evidence verifying correction*: Screenshot or test run demonstrating the fix.
       - Inform later stages with this synthesis without automatically turning every project-specific preference into a universal rule.
       - Route back to Stage 2 (`website-vision-architect`), Stage 3 (`signature-art-direction`), or Stage 4 (`frontend-experience-engineer`) based on scope.
       - Mark prior decision entries as `REJECTED` or `OVERRIDDEN` in `references/DESIGN-DECISION-LOG.md` and log new entries.

### Stage 6: Full Implementation Execution
- **Prerequisite**: Explicit human approval OR documented conditional progression authorization received in Stage 5.
- **Pre-Flight Decision Check**: Verify that Stage 1–5 decisions and any conditional punchlist items are recorded in `references/DESIGN-DECISION-LOG.md`.
- **Delegation**: Invoke or execute role `frontend-experience-engineer`.
- **Actions**: Construct all remaining sections, interactive widgets, responsive states, forms, and pages, maintaining strict adherence to the approved first slice style, token system, and addressing any open conditional punchlist items.
- **Output**: Complete website codebase.

### Stage 7: Functional QA & Accessibility Audit
- **Delegation**: Invoke or execute role `web-quality-engineer`.
- **Actions**: Run automated tests, perform WCAG 2.2 AA accessibility audit, measure Core Web Vitals, run mobile stress tests, and verify zero floating UI collisions.
- **Output**: Programmatic Quality Report with pass/fail metrics.

### Stage 8: Visual QA & Visual Acceptance Review
- **Delegation**: Invoke or execute role `visual-acceptance-reviewer`.
- **Actions**: Conduct multi-viewport visual audits across all built sections. Verify zero horizontal overflow, optical hierarchy, resolution of Stage 5 conditional punchlist items, placeholder dignity, and visual consistency against the approved first slice baseline.
- **Output**: Visual Acceptance Report.

### Stage 9: Regression Testing & Final Delivery Report
- **Actions**:
  1. Verify no regressions occurred between the first slice and the complete site.
  2. Audit `references/DESIGN-DECISION-LOG.md` to ensure all decisions have recorded approval statuses. No `PENDING` items allowed.
  3. Compile and deliver the formal **Final Delivery Report**, synthesizing the Functional QA metrics, Visual Acceptance findings, decision ledger summary, and exact production run/build commands for the user.
- **Output**: Final Delivery Report & Production Artifact.

---

## 4. Checkpoint Presentation Template (Stage 5)

When halting at Stage 5 for human review, the orchestrator MUST format the prompt to the user as follows:

```markdown
## 🛑 AURA Human Approval Checkpoint: First Slice Review

The initial representative vertical slice has been engineered and visually inspected. In accordance with AURA governance, full implementation cannot proceed without your explicit approval.

### 1. Visual Archetype & Theme
- **Archetype**: [e.g., Asymmetric Editorial Spread]
- **Typography**: [Display: [Font] | Body: [Font] | Mono: [Font]]
- **Color Palette**: [Base Canvas: [Hex] | Accent: [Hex] | Surface: [Hex]]

### 2. What Has Been Implemented (Representative First Slice)
- **Header**: Responsive navigation with sticky blur anchor and mobile drawer.
- **Hero Section**: Asymmetric typography layout with fluid clamp scaling.
- **Core Interactive Section**: [e.g., Featured Study Split / Interactive Demo].

### 3. Design Evaluation Rubric Findings (evaluations/design-evals.md)
- **Visual Concept Coherence**: [Assessment of narrative fit and layout rhythm]
- **Content Authenticity**: [Pass/Fail: Zero fabricated quotes/metrics/claims; placeholders bracketed]
- **Mobile Ergonomics**: [Touch targets ≥ 44px; headline viewport budget verified; floating CTA clear]
- **Anti-Cliché Review**: [Banned tropes avoided; cosmetic CAD/techno-chaff avoided]
- **Unresolved Defects & Diagnostics**: [List any aesthetic/functional caveats or diagnostic warnings]

### 4. Verification Evidence & Diagnostics
- **Local Preview Server**: `http://localhost:3000`
- **Inspection Mode**: `[AUTOMATED_SCREENSHOT_INSPECTION | LOCAL_BROWSER_INSPECTION | STATIC_CODE_OPTICAL_AUDIT]`
- **Viewports Verified**: 320px, 375px, 768px, 1440px
- **Zero-Overflow Status**: Verified (0 horizontal overflow detected across all breakpoints).
- **Screenshot Artifacts**: [Links to captured PNGs]

### 5. Decisions Awaiting Concurrence / Stage Gating
- `DEC-XXX`: [Summary of proposal, inference, or asset-absent strategy]

---
**How would you like to proceed?**
- Reply **"Approved"** or **"Proceed"** to authorize full implementation of all remaining pages/sections.
- Reply with **Conditional Approval** (e.g., "Proceed with full site, but resolve [item] in Stage 6/8") to allow baseline progression with a recorded punchlist.
- Or provide specific visual/functional feedback to adjust the first slice before expanding.
```
