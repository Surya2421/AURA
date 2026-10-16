# Quality Evaluation Suite (evaluations/quality-evals.md)

> **Status**: Repeatable Engineering Benchmark Suite  
> **Purpose**: Provides automated test specifications, CLI commands, and objective pass/fail criteria for verifying accessibility, performance, responsive resilience, interaction integrity, and regressions.

This suite is executed primarily during Stage 7 (Functional QA) and Stage 9 (Regression Testing).

---

## 1. Test Suite 1: Responsive Stress & Zero-Overflow Benchmark

### Objective:
Ensure the layout scales seamlessly across arbitrary screen widths from 320px to 3840px with **zero unintended horizontal overflow** and zero text truncation.

### Test Matrix:
- Viewports: `320px` (iPhone SE), `375px` (Standard mobile), `414px` (Large mobile), `768px` (Tablet), `1024px` (Laptop), `1440px` (Desktop), `2560px` (QHD), `3840px` (4K).

### Automated Playwright Spec (`tests/responsive-overflow.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';

const BREAKPOINTS = [320, 375, 414, 768, 1024, 1440, 2560];

for (const width of BREAKPOINTS) {
  test(`Viewport ${width}px should have zero horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });
}
```

### Touch Target Sizing Test:
```typescript
test('Touch targets on mobile viewports must measure at least 44x44px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3000');

  const interactiveElements = await page.locator('button, a, input, select, textarea').all();
  for (const el of interactiveElements) {
    if (await el.isVisible()) {
      const box = await el.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  }
});
```

---

## 2. Test Suite 2: Broken Interactions & State Edge Cases

### Objective:
Verify that all interactive widgets, forms, menus, and dynamic states handle keyboard navigation, edge cases, and asynchronous events gracefully.

### Key Test Scenarios:

1. **Mobile Menu Drawer Lifecycle**:
   - Triggering the hamburger icon opens drawer and updates `aria-expanded="true"`.
   - Pressing `Tab` cycles exclusively through drawer links (focus trap).
   - Pressing `Escape` closes drawer, restores focus to hamburger button, and updates `aria-expanded="false"`.
   - Resizing window to desktop (> 1024px) automatically resets mobile drawer state.

2. **Form Validation & Submission**:
   - Submitting an empty form highlights invalid inputs with visible error messages and `aria-invalid="true"`.
   - Submitting with valid data disables submit button, displays loading spinner, and triggers success confirmation without duplicate POST events.

3. **Modal & Dialog Interactions**:
   - Background body scrolling is locked while modal is open (`overflow: hidden` on body during active modal only).
   - Clicking backdrop or pressing `Escape` dismisses modal.

---

## 3. Test Suite 3: Accessibility (a11y) Compliance Suite

### Objective:
Guarantee full compliance with **WCAG 2.2 Level AA**.

### Automated Axe-Core Spec (`tests/a11y.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Page should pass WCAG 2.2 AA accessibility audit', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### Manual Audit Verifications:
- [ ] **Tab Order**: Sequential tab order follows logical visual reading order.
- [ ] **Focus Rings**: `:focus-visible` styling is distinct and high-contrast on every interactive element.
- [ ] **Landmarks**: One `<header>`, one `<main>`, one `<footer>`, and clearly labeled `<nav>`.
- [ ] **Headings**: Single `<h1>`; sequential heading hierarchy without skipped levels.
- [ ] **Reduced Motion**: All animations disabled or simplified when `prefers-reduced-motion` is active.

---

## 4. Test Suite 4: Performance & Core Web Vitals Budget

### Objective:
Ensure the website delivers instantaneous, stutter-free performance on real-world networks.

### Budget Checklist:
| Metric / Resource | Budget Limit | Measurement Tool |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | ≤ 2.5s | Lighthouse / Web Vitals CLI |
| **INP (Interaction to Next Paint)** | ≤ 200ms | Chrome DevTools Performance panel |
| **CLS (Cumulative Layout Shift)** | ≤ 0.1 | Lighthouse / Web Vitals CLI |
| **Initial JS Transfer (Compressed)** | ≤ 150 KB | Build bundle analyzer |
| **Initial CSS Transfer (Compressed)** | ≤ 50 KB | Build bundle analyzer |
| **Images Above the Fold** | All WebP/AVIF, width/height defined | Static asset inspector |

### Verification Command:
```bash
npx lighthouse http://localhost:3000 --only-categories=performance --chrome-flags="--headless" --output=json --output-path=./perf-report.json
```

---

## 5. Test Suite 5: Regression & Token Drift Evaluation

### Objective:
Verify that full-site implementation in Stage 6 did not degrade the approved first slice style, dilute design tokens, or introduce styling regressions.

### Regression Checklist:
1. **Token Drift Audit**:
   - Scan CSS / component files for unauthorized inline colors (regex: `#[0-9a-fA-F]{3,8}|rgba?\(` outside `tokens.css`).
   - Scan for hardcoded pixel font sizes (regex: `font-size:\s*\d+px`).
   - Any unapproved inline override constitutes a token drift violation.
2. **First Slice Integrity Check**:
   - Re-render the initial Hero and Navigation sections.
   - Verify layout, typography, and contrast remain 100% identical to the human-approved Stage 5 baseline.
3. **Decision Log Audit**:
   - Confirm all decisions logged in `references/DESIGN-DECISION-LOG.md` have their `Approval Status` marked as `APPROVED` or `OVERRIDDEN`. No `PENDING` items may remain at project handoff.
