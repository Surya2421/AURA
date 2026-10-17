---
name: web-quality-engineer
description: Programmatic functional testing, accessibility auditing (WCAG 2.2 AA), performance benchmarking, and multi-viewport responsive stress-testing.
---

# Web Quality Engineer Skill (`web-quality-engineer`)

The `web-quality-engineer` executes rigorous, evidence-based quality verification across functionality, accessibility, performance, and responsive resilience. It enforces the AURA quality standard through automated scripts, headless browsers, linting passes, and static audits.

---

## 1. Operating Rules & Verification Contract

1. **Evidence-Based Reporting Only**: Never state or imply a test suite passed, an accessibility audit scored 100, or a performance benchmark succeeded unless the test command was executed and its raw terminal output captured.
2. **Honest Fallbacks**: If test runners, browsers, or Node environments are unavailable:
   - State the constraint clearly in the quality report.
   - Execute static source code audits (e.g., regex checks for unlabelled buttons, missing alt tags, fixed pixel widths, missing media queries).
   - Document the exact commands the human developer should run locally.
3. **Zero Tolerance for Layout Breakage**: Horizontal overflow, missing focus rings, floating UI collisions with interactive controls, and contrast violations below 4.5:1 are treated as blocking defects that prevent Stage 9 delivery.
4. **Zero Tolerance for Fabricated Content**: Audit copy and metadata to guarantee no synthetic testimonials, fake logos, unverified technical specifications (camera optics, ISO, fake coordinates), or unverified statistical claims slipped into the build.
5. **Decision Log Pre-Flight Verification**: Confirm that all stage milestones and user approvals are recorded in `references/DESIGN-DECISION-LOG.md` before advancing.

---

## 2. Test Suites & Execution Protocols

### 2.1 Functional Testing Suite
- **Navigation & Routing**:
  - Test internal anchor links to ensure targets exist in the DOM (`id="target"`).
  - Verify mobile hamburger menu toggle state (`aria-expanded="true/false"`, visibility toggling).
  - Verify external links have `rel="noopener noreferrer"`.
- **Interactive Components**:
  - Accordions, tabs, and modals: verify open/close cycles, keyboard focus trapping, and `Escape` key listeners.
- **Form Controls & Validation**:
  - Submit empty forms; verify error messages appear and associate with inputs via `aria-describedby`.
  - Submit valid forms; verify loading state disables double-submissions and displays confirmation feedback.

### 2.2 Accessibility (a11y) Audit Suite
- **Target Standard**: WCAG 2.2 Level AA.
- **Automated Checkers**: Execute `axe-core`, `@axe-core/playwright`, or Lighthouse CLI:
  ```bash
  npx playwright test tests/a11y.spec.ts
  # Or: npx lighthouse http://localhost:3000 --only-categories=accessibility --output=json
  ```
- **Manual / Static Check Matrix**:
  - [ ] Page has valid `<html lang="...">` attribute.
  - [ ] Exactly one `<h1>` tag present; heading levels never skip downwards (`h2` -> `h4`).
  - [ ] All `<img>` tags possess descriptive `alt` attributes (or empty `alt=""` if decorative).
  - [ ] All icon buttons (`<button>` containing only an SVG) possess `aria-label` or visually hidden screen reader text (`.sr-only`).
  - [ ] Color contrast meets ≥ 4.5:1 for body copy and ≥ 3.0:1 for large display text.
  - [ ] Keyboard tab navigation moves through the page in natural reading order without getting trapped.

### 2.3 Performance & Core Web Vitals Suite
- **Target Metrics**:
  - LCP ≤ 2.5s
  - INP ≤ 200ms
  - CLS ≤ 0.1
- **Asset Payload Audit**:
  - Measure total transferred JS, CSS, and image bytes.
  - Verify no unoptimized raster images (> 500 KB) are loaded in the hero or above the fold.
  - Check that all fonts utilize `font-display: swap;`.

### 2.4 Multi-Viewport Responsive Stress Suite
Execute automated viewport resizing checks across standard breakpoints:
- `320px` (Compact mobile / iPhone SE)
- `375px` (Standard mobile)
- `768px` (Tablet portrait)
- `1024px` (Small laptop)
- `1440px` (Desktop)
- `2560px` (Ultrawide)

**Automated Overflow Detection Script (Playwright / Console snippet)**:
```javascript
// Test for horizontal scrollbar / overflow
const elementsWithOverflow = await page.evaluate(() => {
  const docWidth = document.documentElement.clientWidth;
  const elements = Array.from(document.querySelectorAll('*'));
  return elements
    .filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.right > docWidth + 1; // 1px tolerance for subpixel rounding
    })
    .map(el => ({
      tagName: el.tagName,
      className: el.className,
      id: el.id,
      right: el.getBoundingClientRect().right,
      docWidth: docWidth
    }));
});
```
If `elementsWithOverflow.length > 0`, the test FAILS.

### 2.5 Floating UI Collision & Overlay Clearance Suite
Verify that fixed/sticky elements (e.g. mobile conversion pills) do not collide with content or overlays:
- **Footer Clearance**: Test at bottom of page (`window.scrollTo(0, scrollHeight)`). Verify the floating pill does not intersect with footer text, links, or copyright statements.
- **Form Controls**: Verify floating elements do not cover form inputs or submit buttons.
- **Overlay Concealment**: Verify floating bar opacity is `0` or visibility is `hidden` when `.drawer-open` or `<dialog>` is active.

### 2.6 Content Authenticity & Pseudo-Metadata Scanner
Execute regex audit across markup and scripts (`evaluations/quality-evals.md` Test Suite 7):
- Flag unbracketed optical parameters (e.g., `24mm tilt-shift`, `f/11`, `ISO 64`).
- Flag unbracketed coordinates (e.g., `LAT: 47.37° N`).
- Flag cosmetic CAD plate badges (e.g., `PLATE NO. 01`, `16:9 DRAFTING FRAME`).
- Verify flagged items against `references/DESIGN-DECISION-LOG.md`. If unverified, require bracketed placeholder replacement (`[SPECIFICATION PENDING]`).

### 2.7 Decision-Log Completeness Audit
- Verify that every completed stage has an entry in `references/DESIGN-DECISION-LOG.md`.
- Verify that Stage 5 has an explicit `APPROVED` or documented conditional progression record before Stage 6 can proceed.

---

## 3. Deliverable Format: Programmatic Quality Report

The skill produces a structured report adhering to this template:

```markdown
# Programmatic Quality Report: [Project Name]

## 1. Executive Summary & Quality Gate Status
- **Overall Quality Gate**: `[PASSED | FAILED | CONDITIONAL_PASS]`
- **Timestamp**: YYYY-MM-DD HH:MM
- **Environment**: [e.g., Node v24, Chrome CDP / Playwright, Local Dev Server]

## 2. Accessibility (WCAG 2.2 AA) Audit
- **Critical / Serious Violations**: [0]
- **Contrast Check**: Passed (Minimum observed ratio: 5.2:1)
- **Keyboard Navigation**: Complete tab loop verified; focus traps functional.
- **Tool Used**: [e.g., Axe-core / CDP Script]

## 3. Performance & Asset Budgets
- **LCP Estimate**: [e.g., 1.4s]
- **CLS Estimate**: [e.g., 0.02]
- **Total Transfer Size**: [e.g., 420 KB]
- **Budget Compliance**: Within limits.

## 4. Responsive Stress Test (320px – 2560px)
- **320px**: 0 horizontal overflow; touch targets ≥ 44px; headline viewport budget verified.
- **375px**: 0 horizontal overflow; mobile navigation drawer opens cleanly.
- **768px**: 0 horizontal overflow; grid transitions without clipping.
- **1440px**: 0 horizontal overflow; maximum container constrained.

## 5. Floating UI & Collision Audit
- **Footer Clearance**: Verified (0 overlap with footer links or copyright).
- **Overlay Concealment**: Verified (Action pill concealed during active drawer/modal).

## 6. Content Authenticity Audit
- **Fabricated Metrics / Quotes**: 0 detected.
- **Pseudo-Metadata Scanner**: 0 unverified claims (All pending specs bracketed: `[SPECIFICATION PENDING]`).

## 7. Decision-Log Audit
- **Stage Decisions Logged**: Verified (DEC-XXX present for all stages).

## 8. Blocking Defects & Action Items
*(If any test failed, list defect details, offending selectors, and required fixes)*
```
