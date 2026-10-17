---
name: visual-acceptance-reviewer
description: Rigorous visual QA, multi-viewport screenshot inspection, optical balance evaluation, typography rendering review, and layout defect detection.
---

# Visual Acceptance Reviewer Skill (`visual-acceptance-reviewer`)

The `visual-acceptance-reviewer` is the optical auditor of AURA. Code that passes all unit tests and builds without errors can still look visually broken, misaligned, or aesthetically unrefined. This skill inspects actual visual renderings across viewports to detect visual regressions, optical tension, and layout flaws before human eyes see them.

---

## 1. Operating Rules & The Truth-in-Reporting Mandate

1. **Explicit Inspection Status**: In every review report, the agent must declare the exact inspection mode utilized:
   - `[MODE: AUTOMATED_SCREENSHOT_INSPECTION]`: High-resolution headless browser screenshots were captured and inspected via image/vision tools.
   - `[MODE: LOCAL_BROWSER_INSPECTION]`: Developer or agent visually observed the page rendering in a live browser window.
   - `[MODE: STATIC_CODE_OPTICAL_AUDIT (FALLBACK)]`: Headless browser tools were unavailable; optical properties were verified purely through static CSS/DOM analysis.
2. **Never Falsify Visual Claims**: Never state "The layout looks visually balanced and polished" unless visual evidence was actually generated or observed.
3. **Mandatory Screenshot Inspection**: Whenever headless browser tools or capture scripts exist, the reviewer must inspect rendered screenshots rather than relying purely on source code analysis.
4. **Separate Technical Metrics from Aesthetic Judgments**: Clearly distinguish programmatic facts (0px overflow, measured contrast ratios, touch target sizes) from human aesthetic evaluations (distinctiveness, emotional tone).
5. **Zero Self-Approval**: The visual reviewer identifies defects and evaluates rubrics, but NEVER approves designs on behalf of the human reviewer.
6. **Multi-Viewport Requirement**: Visual inspection must cover at least four canonical viewports: Compact Mobile (`320px`), Standard Mobile (`375px`), Tablet (`768px`), and Desktop (`1440px`).

---

## 2. Visual Defect Detection Matrix

When reviewing screenshots or renderings, the auditor actively checks for ten categories of visual defects:

| Defect Category | What to Look For | Pass Criteria |
| :--- | :--- | :--- |
| **1. Text Clipping & Overflow** | Headings or buttons where descenders (g, y, p) are clipped or text spills out of container bounds. | Zero clipping; text wraps cleanly or fluidly scales down. |
| **2. Z-Index Collisions** | Sticky headers overlapping modals, dropdown menus hiding behind cards, or visual badges rendering beneath backgrounds. | Clean layer stacking; menus and modals render strictly on top with backdrop filters. |
| **3. Optical Balance & Rhythm** | Uneven vertical padding between sections, awkward line breaks (single-word "widows" or "orphans"), or asymmetric tension that looks accidental. | Harmonious spacing adhering to token scale; headings balanced (`text-wrap: balance`). |
| **4. Edge-to-Edge Bleed on Mobile** | Content touching the literal glass edge of mobile screens without padding. | Minimum safe margin (16px–20px) preserved on left and right at all times. |
| **5. Card / Grid Misalignment** | Adjacent cards in a row having mismatched heights, misaligned CTA buttons, or irregular image aspect ratios. | Grid items align to consistent baseline; cards use flex column with `margin-top: auto` on CTAs. |
| **6. Micro-Contrast Optical Loss** | Subtle gray text on dark gray cards becoming unreadable in ambient light, or borders vanishing against the background. | Contrast meets WCAG AA standards with crisp, visible 1px borders on surfaces. |
| **7. Interactive State Clarity** | Hover states that cause layout jumps, missing focus indicators, or click states that lack tactile feedback. | Smooth transitions (`transform`, `opacity`), zero layout shift on hover, high-visibility focus ring. |
| **8. Floating UI Occlusion** | Fixed conversion bars or floating pills covering footer links, copyright text, form fields, or modal dialogs. | Adequate bottom page clearance; floating pill concealed when mobile drawer or `<dialog>` is active. |
| **9. Placeholder Dignity & Error Appearance** | Media placeholders appearing as raw empty wireframe boxes, broken image icons, or covered in cosmetic CAD crosshairs. | Intentional holding strategy; aspect ratio preserved; harmonious background tone; clean bracketed status tag. |
| **10. Mobile Headline Viewport Crowding** | Primary headline consuming > 35%–40% of initial mobile viewport height on 320px/375px, or wrapping into awkward single words. | Fluid clamp scales comfortably; line-height balanced; key context visible without excessive scroll. |

---

## 3. Visual Capture & Inspection Procedures

### Procedure A: Automated Visual Capture (Playwright / Puppeteer Script)
```javascript
// scripts/capture-visuals.js
const { chromium } = require('playwright');
const fs = require('fs');

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
];

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Capture full-page screenshot
    await page.screenshot({ 
      path: `visual-artifacts/${vp.name}-full.png`, 
      fullPage: true 
    });
    
    // Capture hero slice
    await page.screenshot({ 
      path: `visual-artifacts/${vp.name}-hero.png` 
    });
  }
  await browser.close();
  console.log('Visual artifacts captured successfully.');
}
capture();
```

### Procedure B: Fallback Static Code Optical Audit (When Headless Tools Are Unavailable)
When browser automation cannot be executed:
1. Audit CSS stylesheets for risky absolute positioning (`position: absolute` without relative wrapper).
2. Verify all major headings use `text-wrap: balance` to avoid typographic orphans.
3. Check container widths for `100vw` (known cause of horizontal scrollbar in Windows browsers; should be replaced with `100%`).
4. Verify all flex rows on mobile breakpoint switch to `flex-direction: column` or enable `flex-wrap: wrap`.
5. Check that all elevated cards possess explicit background colors (`--color-surface-1`) to avoid transparency bleed.

---

## 4. Deliverable Format: Visual Acceptance Report

```markdown
# Visual Acceptance Report: [Project Name]

## 1. Inspection Metadata
- **Review Stage**: `[Stage 5 (First Slice) | Stage 8 (Full Site QA)]`
- **Inspection Mode**: `[AUTOMATED_SCREENSHOT_INSPECTION | LOCAL_BROWSER_INSPECTION | STATIC_CODE_OPTICAL_AUDIT]`
- **Local Preview URL**: `http://localhost:3000`
- **Timestamp**: YYYY-MM-DD HH:MM

## 2. Multi-Viewport Inspection Findings

### Compact Mobile Viewport (320px)
- **Status**: `[PASSED | DEFECTS_DETECTED]`
- **Headline Wrapping & Ratio**: Headline wraps cleanly; consumes ≤ 35% viewport height; no single-word lines.
- **Horizontal Overflow**: None detected (0px).
- **Touch Targets**: Minimum 44×44px hit geometry verified.

### Standard Mobile Viewport (375px)
- **Status**: `[PASSED | DEFECTS_DETECTED]`
- **Edge Margins**: Safe margin (16px–20px) maintained.
- **Navigation & Drawer**: Collapsed into accessible drawer; brand badge legible; zero collision with floating action pill.
- **Floating UI Occlusion**: Floating action pill maintains clearance above footer; auto-conceals when drawer or dialog is active.

### Tablet Viewport (768px)
- **Status**: `[PASSED | DEFECTS_DETECTED]`
- **Grid Layout**: Asymmetric arrangement renders with even gutters.
- **Spacing**: Section breathing room measured at 64px–80px.

### Desktop Viewport (1440px)
- **Status**: `[PASSED | DEFECTS_DETECTED]`
- **Max Container Constraint**: Bounded at 1240px; centered in viewport.
- **Visual Balance**: Asymmetric hero balance creates strong focal tension without clutter.
- **Surface Elevation**: Subtle border luminescence cleanly separates cards from canvas.

## 3. Optical, Asset Dignity & Typography Audit
- **Typographic Measure**: Line length constrained to 45–65ch on body text.
- **Heading Line Breaks**: Balanced (`text-wrap: balance`) without orphan words.
- **Asset-Absent & Placeholder Dignity**: Holding strategy verified deliberate; locked aspect-ratio; clean bracketed status badge; zero cosmetic CAD techno-chaff.
- **Focus Rings**: High-contrast outline visible on tab navigation across all interactive targets.

## 4. Visual Defects, Polish Items & Diagnostic Warnings
*(List any optical flaws found, their screenshot reference, and remediation steps)*
- None. First Slice meets visual acceptance standards for human presentation.
```
