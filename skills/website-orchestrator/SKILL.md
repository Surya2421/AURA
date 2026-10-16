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
4. **Continuous Decision Logging**: Every classification, token selection, architectural pattern, and revision must be logged in `references/DESIGN-DECISION-LOG.md`.
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
  2. Capture multi-viewport visual evidence (screenshots or honest terminal fallback).
  3. Inspect layout for clipping, overflow, contrast, and alignment defects.
  4. Formulate the **Human Checkpoint Presentation**:
     - Local URL link (e.g., `http://localhost:3000`).
     - Summary of visual archetype and key design decisions logged.
     - Clear visual evidence summary.
     - Explicit call to action: *"Please review the First Slice above. Reply with your approval to proceed to full implementation, or provide feedback for refinements."*
  5. **MANDATORY STOP & SILENCE RULE**: Halt tool calls. Do NOT write full site code. Wait for human feedback. Under no circumstances may the agent treat silence, elapsed time, or ambiguous replies as approval. Execution remains strictly halted until explicit human approval ("Approved", "Proceed") is received.
  6. **Revision Routing & Logging**: If changes are requested:
     - Aesthetic, typography, or palette feedback: Route back to Stage 3 (`signature-art-direction`).
     - Narrative or layout archetype feedback: Route back to Stage 2 (`website-vision-architect`).
     - Implementation bugs or minor slice adjustments: Route back to Stage 4 (`frontend-experience-engineer`).
     - In all cases, mark prior decision entries as `REJECTED` or `OVERRIDDEN` in `references/DESIGN-DECISION-LOG.md` and log new entries.

### Stage 6: Full Implementation Execution
- **Prerequisite**: Explicit human approval received in Stage 5.
- **Delegation**: Invoke or execute role `frontend-experience-engineer`.
- **Actions**: Construct all remaining sections, interactive widgets, responsive states, forms, and pages, maintaining strict adherence to the approved first slice style and token system.
- **Output**: Complete website codebase.

### Stage 7: Functional QA & Accessibility Audit
- **Delegation**: Invoke or execute role `web-quality-engineer`.
- **Actions**: Run automated tests, perform WCAG 2.2 AA accessibility audit, measure Core Web Vitals, and run mobile stress tests.
- **Output**: Programmatic Quality Report with pass/fail metrics.

### Stage 8: Visual QA & Visual Acceptance Review
- **Delegation**: Invoke or execute role `visual-acceptance-reviewer`.
- **Actions**: Conduct multi-viewport visual audits across all built sections. Verify zero horizontal overflow, optical hierarchy, and visual consistency against the approved first slice.
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
- **Typography**: [Display: Fraunces | Body: Plus Jakarta Sans | Mono: JetBrains Mono]
- **Color Palette**: [Base Canvas: #090D16 | Accent: #38BDF8 | Luminescence: Subtle Glass 8%]

### 2. What Has Been Implemented (Representative First Slice)
- **Header**: Responsive navigation with sticky blur anchor.
- **Hero Section**: Asymmetric typography layout with fluid clamp scaling.
- **Core Interactive Section**: [e.g., Interactive Architecture Sandbox].

### 3. Verification & Visual Evidence
- **Local Preview Server**: `http://localhost:3000`
- **Visual Inspection**: Checked at 375px (Mobile), 768px (Tablet), and 1440px (Desktop).
- **Zero-Overflow Status**: Verified (0 horizontal overflow detected).

### 4. Decisions Awaiting Concurrence
- `DEC-002`: [Summary of proposal or inference]

---
**How would you like to proceed?**
- Reply **"Approved"** or **"Proceed"** to authorize full implementation of all remaining pages/sections.
- Or provide specific visual/functional feedback to adjust the first slice before expanding.
```
