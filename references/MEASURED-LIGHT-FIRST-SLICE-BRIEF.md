# AURA First-Slice Build Brief: "The Measured Light"

> **Document Path**: `references/MEASURED-LIGHT-FIRST-SLICE-BRIEF.md`  
> **Status**: Specification Document — **Awaiting Implementation Authorization**  
> **Authority**: Governed by [`AGENTS.md`](file:///D:/AURA/AGENTS.md), [`PERSONAL-DESIGN-DOCTRINE.md`](file:///D:/AURA/references/PERSONAL-DESIGN-DOCTRINE.md), and [`WEBSITE-QUALITY-STANDARD.md`](file:///D:/AURA/references/WEBSITE-QUALITY-STANDARD.md).  
> **Governing Gate**: Execution of frontend code is **strictly frozen** until the user explicitly authorizes Stage 4 implementation.

---

## 1. Approved Concept & Art-Direction Decisions

### 1.1 Thematic Thesis: "The Measured Light"
- **Concept Narrative**: Architectural photography treated as a disciplined physical instrument of spatial measurement and light recording. The website functions like a tactile, limited-edition architectural monograph printed on heavy uncoated stock, rather than a fleeting digital marketing scroll.
- **Emotional Resonance**: Still, authoritative, restrained, contemplative, monumental.

### 1.2 Art Direction & Token Foundation
- **Atmospheric Palette (The Architectural Monograph)**:
  - `--color-canvas`: Warm Sandstone Parchment (`#F7F6F2`)
  - `--color-canvas-subtle`: Pale Limestone (`#EFECE6`)
  - `--color-surface-1`: Elevated Matte Card (`#FFFFFF` with `rgba(41, 37, 36, 0.05)` stone border)
  - `--color-surface-2`: Floating Inspector Surface (`#FAF9F5`)
  - `--color-text-primary`: Deep Carbon Ink (`#1C1917` / Stone-900)
  - `--color-text-secondary`: Weathered Mineral Slate (`#57534E` / Stone-600)
  - `--color-text-muted`: Quarry Ash (`#A8A29E` / Stone-400)
  - `--color-accent-primary`: Burnished Terracotta (`#C2410C` / Orange-700)
  - `--color-border-visible`: `rgba(28, 25, 23, 0.12)`
  - `--color-border-focus`: `#C2410C` (high-contrast focus indicator)
- **Typographic Hierarchy (The Editorial Atelier)**:
  - **Display / Hero**: High-contrast modern optical serif (*Fraunces* or *Newsreader*) with tight letter tracking (`-0.03em`) and snug leading (`1.08`).
  - **Body / Interface**: Refined humanist neutral sans (*Plus Jakarta Sans* or *Inter*) with line length restricted to 45–65 characters (`max-width: 65ch`) and generous leading (`1.6`).
  - **Technical Plate Metadata**: Tabular monospace (*JetBrains Mono*) for camera optics, sun angle, location coordinates, and shutter/aperture specifications.
- **Motion Signature**:
  - Mechanical shutter / optical diaphragm inspiration: snappy cubic-bezier deceleration (`cubic-bezier(0.16, 1, 0.3, 1)`), 200ms duration budgets, zero floaty or bouncy animations. Full `@media (prefers-reduced-motion: reduce)` kill-switch.

---

## 2. Scope & Explicit Exclusions

The First Slice is a working, isolated representative vertical slice engineered to validate layout mechanics, typography curves, tactile color depth, and responsive ergonomics in a live browser before full-site construction.

### 2.1 In-Scope for First Slice
1. **Global Masthead / Navigation**: Minimalist sticky header with backdrop blur, typographic brand mark `[Studio Name]`, primary navigation anchors, and status indicator.
2. **Hero Stage ("The Measured Light" Thesis)**: Monumental typographic title, editorial subheadline, primary commission action trigger, and single-frame visual anchor plate.
3. **First Representative Architectural Study Slice**: Asymmetric 60/40 editorial layout pairing a primary structural photograph with technical camera/spatial metadata, architectural notes, and tactile material indicators.
4. **Mobile Ergonomic Adaptation**: Dedicated sticky mobile inquiry trigger within the thumb zone, fluid clamp scaling, and zero-overflow layout.

### 2.2 Explicitly Excluded from First Slice (Deferred to Stage 6)
- The complete multi-project archive and category taxonomy filter engine.
- Individual full-bleed case study detail pages / deep-dive monograph essays.
- The interactive client inquiry intake form with multi-step commissioning logic.
- About / Studio biography page and exhibition history archive.
- Image licensing calculators, client delivery proofing galleries, or print shop features.
- Any backend database integration or third-party mailing list connectors.

---

## 3. First-Slice Content Hierarchy & Navigation Behavior

### 3.1 Content Sequence (Vertical Flow)
1. **Skip Navigation Landmark**: Hidden accessibility anchor (`#main-content`) focusing immediately on primary content.
2. **Masthead / Header**:
   - Left: Typographic Wordmark `[Studio Name — Architectural Photography]`.
   - Center/Right (Desktop): Navigation links (`Selected Studies`, `Monograph Essays`, `Approach`, `Inquire`).
   - Far Right: Status pill (`● Open for Commissions: Q1/Q2 [Year]`).
   - Mobile: Simplified masthead with touch-friendly drawer trigger (≥ 44×44px hit area).
3. **Hero Section (`<header>` / `<section class="hero">`)**:
   - Overline: Monospace metadata pill (`[FIELD STUDY // ARCHITECTURAL FORM & LIGHT]`).
   - Headline (`<h1>`): Editorial display title *"Light is the first material of architecture."*
   - Subheadline (`<p>`): Restrained 2-line thesis explaining the studio's method of documenting volume, shadow, and structural mass. Constrained to `max-width: 60ch`.
   - Action Vectors:
     - Primary: Solid ink button with terracotta micro-focus `[Initiate Commission]`.
     - Secondary: Subtle text link with optical arrow `[Read Studio Methodology →]`.
4. **Representative Architectural Study Plate (`<article class="study-slice">`)**:
   - Layout: Asymmetric desktop arrangement.
     - Left (60%): High-resolution architectural photographic frame with aspect-ratio constraint and subtle 1px limestone border.
     - Right (40%): Curatorial plate metadata block:
       - Plate Identifier: `[PLATE NO. 01 — CIVIC ATRIUM STUDY]`
       - Architectural Context: `[Structure Name / Architect Name Needed]`
       - Geographic Coordinate & Date: `[Location & Solar Orientation Needed]`
       - Technical Metadata Grid: Monospace block detailing `[Focal Length: 24mm Tilt-Shift | Aperture: f/8 | Light: Low Winter Solar Incidence]`.
       - Brief Curatorial Note: 3-sentence architectural observation on structural shadow geometry.
5. **Footer Baseline (`<footer>`)**:
   - Micro-footer containing copyright, architectural photography copyright notice, and return-to-top anchor.

---

## 4. Desktop & Mobile Layout Requirements

### 4.1 Desktop Breakpoints (1024px – 1440px+)
- **Container Constraint**: `max-width: 1240px; margin: 0 auto; padding: 0 clamp(1.5rem, 3vw, 3rem);`.
- **Rhythm**: 100px–120px vertical section spacing providing museum-grade breathing space.
- **Asymmetric Balance**: Off-axis grid placement; text snaps to a 60ch reading measure while adjacent photography plates span the remaining column space.
- **Header Pinning**: `position: sticky; top: 0; backdrop-filter: blur(12px); border-bottom: 1px solid var(--color-border-visible); z-index: 100;`.

### 4.2 Mobile Breakpoints (320px – 430px)
- **Thumb-Zone Placement**: Primary conversion trigger duplicated into a fixed bottom action bar (`position: fixed; bottom: 0; z-index: 900;`) safe-padded for device home indicators (`env(safe-area-inset-bottom)`).
- **Stack Choreography**: In the 60/40 study slice, the photographic plate renders first, followed immediately by its plate identifier and architectural notes. The technical camera metadata collapses into a clean, horizontally scrollable metadata bar with visual gradient fade.
- **Touch Ergonomics**: All interactive tap targets (buttons, links, drawer toggles) strictly enforce a minimum hit geometry of **44 × 44 pixels** with ≥ 8px touch clearance.
- **Zero Hover Lockouts**: No descriptive notes, captions, or camera metadata may be hidden behind desktop `:hover` states. All essential content remains permanently visible on touch viewports.

---

## 5. Image Requirements, Aspect Ratio Strategy & Accessibility

### 5.1 Dimensional & Aspect Ratio Discipline
To guarantee zero Cumulative Layout Shift (CLS < 0.1), all image containers must declare strict CSS aspect ratios before byte loading:
- **Hero Plate**: `aspect-ratio: 16 / 9;` on wide desktop, transitioning to `aspect-ratio: 4 / 3;` on mobile.
- **Study Slice Plate**: `aspect-ratio: 4 / 3;` or `aspect-ratio: 3 / 2;` (monograph plate standard).
- **Vertical Facade Study**: `aspect-ratio: 4 / 5;` (portrait architectural framing).

### 5.2 Performance & Loading Architecture
- The above-the-fold Hero plate must be marked with `fetchpriority="high"` (or `<link rel="preload">`).
- All below-the-fold plates must declare `loading="lazy"` and `decoding="async"`.
- Modern image formats (`.webp`, `.avif`) with responsive `srcset` resolutions:
  - 640w (Mobile), 1080w (Tablet), 1920w (Desktop), 2560w (2x Retina).

### 5.3 Accessible Photographic Annotation
- In accordance with WCAG 2.2 AA, every image MUST possess an informative, non-redundant `alt` attribute describing structural mass, material, and lighting conditions:
  - *Format*: `alt="[Subject/Building] - [Perspective/Angle] showing [Material] illuminated by [Light Condition]"`
  - *Example*: `alt="Brutalist concrete library colonnade, low-angle perspective showing textured board-marked concrete raked by morning sunlight"`
- Purely decorative background textures or spacer elements must use `alt=""` and `aria-hidden="true"`.

---

## 6. Required Assets & Unresolved Client Information

In strict adherence to Core Principle 3 (Zero Content Fabrication), no synthetic or placeholder names may be presented as verified fact. The following assets are currently **Pending Client Provision**:

| Asset / Content Item | Status | First-Slice Implementation Strategy |
| :--- | :---: | :--- |
| **Studio Wordmark / Identity** | `PENDING` | Render clean typographic wordmark: `[STUDIO NAME // ARCHITECTURAL PHOTOGRAPHY]` |
| **Hero Architectural Plate** | `PENDING` | High-fidelity structural SVG wireframe or neutral monochrome photographic plate labeled `[Client Architectural Plate 01 — Awaiting High-Res Master]` |
| **Study Slice Photograph** | `PENDING` | Calibrated architectural plate container with precise dimensional ratios labeled `[Client Architectural Plate 02 — High-Res Asset Pending]` |
| **Photographer Thesis Statement** | `PENDING` | Use clearly marked architectural copywriting placeholder: `[Studio Artist Statement: 2-line thesis on spatial geometry and natural light]` |
| **Project Details & Metadata** | `PENDING` | Structured technical metadata fields labeled `[Location: Pending]`, `[Architect: Pending]`, `[Camera Optics: Pending]` |
| **Contact / Booking Email** | `PENDING` | Functional `mailto:` anchor using transparent placeholder `inquiries@[studio-domain].com` |

---

## 7. Technical Assumptions to Be Confirmed Before Implementation

Before writing frontend code, the user must confirm:

1. **Target Project Directory**: Where should the codebase live? (e.g., `D:\AURA\projects\measured-light` or a dedicated external directory).
2. **Framework / Runtime Preference**:
   - *Option A (Zero-Dependency Static)*: Pure semantic HTML5, modern vanilla CSS with `tokens.css`, and vanilla ES modules (maximum portability, zero build tool overhead).
   - *Option B (Component Framework)*: Vite + React / Astro / Svelte / Next.js (if client project requires componentized routing or SSG).
3. **Local Dev Server Environment**: Availability of local Node.js / Vite / HTTP server to host `http://localhost:3000` for visual inspection.

---

## 8. Quality & Acceptance Criteria

### 8.1 Mandatory Hard Gates (Build-Blocking)
- [ ] **Zero Horizontal Body Overflow**: `0px` unintended horizontal scroll across 320px, 375px, 768px, 1024px, 1440px, and 2560px.
- [ ] **Accessibility (WCAG 2.2 AA)**:
  - Exact single `<h1>` tag representing page thesis.
  - Heading hierarchy strictly sequential (`h1` -> `h2` -> `h3`).
  - Text contrast ratio ≥ **4.5:1** for body text and ≥ **3.0:1** for display titles against warm sandstone canvas (`#F7F6F2`).
  - Focus indicators visible (`outline: 2px solid var(--color-border-focus); outline-offset: 2px;`) during keyboard tab navigation.
  - Skip link (`#main-content`) functional and keyboard accessible.
- [ ] **Touch Target Geometry**: All mobile interactive elements measure ≥ **44 × 44 pixels** with ≥ 8px separation.
- [ ] **Zero Fabricated Claims**: No fake awards, synthetic client testimonials, or invented architectural firm affiliations.
- [ ] **Console Hygiene**: Zero runtime errors or unhandled warnings in browser developer tools.

### 8.2 Advisory Quality Targets (Soft Budgets)
- [ ] **LCP Target**: Estimated Largest Contentful Paint ≤ **2.5s** on simulated 4G mobile.
- [ ] **CLS Target**: Cumulative Layout Shift ≤ **0.05** (strict container aspect ratios).
- [ ] **CSS Payload**: Compressed first-slice stylesheet ≤ **25 KB**.

---

## 9. Browser Screenshot & Evidence Protocol

When Stage 4 code is executed, the following visual artifacts must be captured:
1. **Desktop Viewport (`1440 × 900px`)**: Full-page rendering capturing Masthead, Hero thesis, and the Asymmetric Study Slice.
2. **Tablet Viewport (`768 × 1024px`)**: Verifying grid gutter stability and navigation link spacing.
3. **Mobile Viewport (`375 × 812px`)**: Verifying mobile drawer trigger, headline clamp scaling, and sticky thumb-zone inquiry bar.

*Truth-in-Reporting Mandate*: If headless browser screenshot automation (Playwright/Puppeteer) is unavailable in the environment, the agent must declare `[MODE: STATIC_CODE_OPTICAL_AUDIT]` and provide exact localhost reproduction commands for human inspection.

---

## 10. The Non-Bypassable Human Approval Checkpoint (Stage 5 Gate)

Once the First Slice is built and visually captured, the orchestrator MUST halt execution and present the review card:

```markdown
## 🛑 AURA Human Approval Checkpoint: First Slice Review ("The Measured Light")

The initial representative vertical slice has been engineered and visually inspected. In accordance with AURA governance (AGENTS.md Section 2), full implementation cannot proceed without your explicit approval.

### Visual Archetype & Token Verification
- Archetype: The Asymmetric Editorial Monograph
- Foundation: Warm Sandstone (#F7F6F2) with Deep Carbon Ink (#1C1917)
- Typography: Display Serif (Fraunces) + Humanist Sans (Plus Jakarta Sans) + Monospace (JetBrains Mono)
- Representative Slice: Masthead + Hero Thesis + Plate No. 01 Asymmetric Spatial Study

### Verification Findings
- Local Preview: http://localhost:3000
- Overflow Status: 0px horizontal scroll confirmed across 320px–1440px
- Missing Client Assets: Transparently flagged with structured placeholders

---
Awaiting your explicit instruction:
- Reply "Approved" or "Proceed" to authorize full-site construction.
- Or provide specific visual/layout feedback to adjust the first slice.
```
