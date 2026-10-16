# Website Quality Standard (WEBSITE-QUALITY-STANDARD.md)

> **Status**: Living Engineering Standard  
> **Scope**: Repeatable, objective, verifiable quality benchmarks governing all websites engineered under AURA.

Every website built using AURA must pass the five quality dimensions defined below before final delivery.

---

## 1. Quality Pillar Matrix: Mandatory Gates vs. Advisory Targets

AURA categorizes all engineering checks into two strict enforcement levels:
- **[MANDATORY HARD GATE]**: Blocking requirement. If this check fails, the build/stage is blocked from advancing. Zero tolerance.
- **[ADVISORY QUALITY TARGET]**: Optimization target. If missed, generates a recorded warning and action plan in the quality report, but does not block human checkpoint review.

| Dimension | Scope | Level | Pass Threshold |
| :--- | :--- | :--- | :--- |
| **1. Accessibility (a11y)** | WCAG 2.2 AA Contrast & Keyboard | **MANDATORY HARD GATE** | Zero critical/serious violations; contrast ≥ 4.5:1 (AA) |
| **1. Accessibility (a11y)** | WCAG 2.2 AAA Contrast on Forms | ADVISORY QUALITY TARGET | Targeted ratio ≥ 7.0:1 |
| **2. Performance** | Core Web Vitals (LCP, INP, CLS) | ADVISORY QUALITY TARGET | LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 on 4G |
| **2. Performance** | Asset Budgets (JS/CSS/Image weights) | ADVISORY QUALITY TARGET | Total JS ≤ 150 KB, CSS ≤ 50 KB initial load |
| **3. Responsive Integrity** | Horizontal Overflow & Text Clipping | **MANDATORY HARD GATE** | 0px horizontal body scroll across 320px–3840px |
| **3. Responsive Integrity** | Touch Target Sizing (Mobile) | **MANDATORY HARD GATE** | All interactive targets ≥ 44 × 44px on touch screens |
| **4. Content Integrity** | Fabricated Metrics / Social Proof | **MANDATORY HARD GATE** | Zero synthetic reviews or unverified client statistics |
| **5. Code Architecture** | Zero Console Errors & Token Adherence | **MANDATORY HARD GATE** | Zero uncaught runtime errors; no arbitrary magic numbers |

---

## 2. Dimension 1: Accessibility (WCAG 2.2 Level AA)

Websites must be usable by everyone, regardless of motor, sensory, or cognitive capabilities.

### 2.1 Landmark & Semantic Structure [MANDATORY HARD GATE]
- Every page must possess a single `<header>`, `<main>`, and `<footer>`.
- Sectional content must use `<section>`, `<nav>`, `<article>`, or `<aside>` with appropriate accessible names (`aria-label` or `aria-labelledby`).
- Headings must follow a strict sequential hierarchy (`<h1>` followed by `<h2>`, never jumping from `<h1>` to `<h4>`). Exactly one `<h1>` per view.

### 2.2 Keyboard Navigation & Focus Management [MANDATORY HARD GATE]
- **Full Tab Traversal**: Every interactive element (`<a>`, `<button>`, `<input>`, `<select>`, `<textarea>`) must be reachable and operable via the keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`).
- **Visible Focus Indicator**: Focus rings must NEVER be stripped with `outline: none` without providing an enhanced, visible alternative:
  ```css
  :focus-visible {
    outline: 2px solid var(--color-border-focus, currentColor);
    outline-offset: 2px;
  }
  ```
- **Modal Focus Trapping**: Modals, slide-out mobile menus, and dialog drawers must trap keyboard focus while open and restore focus to the triggering element upon closing (`Escape` key must dismiss).
- **Skip Links**: Pages with extensive navigation headers must provide a hidden skip link that becomes visible on focus (`<a href="#main-content" class="skip-link">Skip to main content</a>`).

### 2.3 Contrast & Readability
- Normal text (< 18pt / 24px regular, < 14pt / 18.5px bold): minimum contrast ratio of **4.5:1** against the background.
- Large text (≥ 18pt / 24px regular, ≥ 14pt / 18.5px bold) and graphical UI components (borders, icons): minimum contrast ratio of **3.0:1**.
- Form inputs must have distinct, permanently visible labels (placeholders are never a substitute for `<label>`).

---

## 3. Dimension 2: Performance & Core Web Vitals

AURA treats speed as a fundamental aesthetic and user experience attribute.

### 3.1 Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: ≤ **2.5 seconds** on a simulated 4G mobile connection.
  - Prioritize hero image loading with `<link rel="preload">` or `priority={true}`.
  - Avoid render-blocking fonts and third-party scripts.
- **Interaction to Next Paint (INP)**: ≤ **200 milliseconds**.
  - Offload heavy compute tasks from the main thread.
  - Optimize click handlers and avoid synchronous micro-tasks during layout.
- **Cumulative Layout Shift (CLS)**: ≤ **0.1**.
  - Explicitly define `width` and `height` (or CSS `aspect-ratio`) on all images, video frames, and iframes.
  - Reserve minimum dimensional space for dynamically loaded cards or widgets.

### 3.2 Asset Optimization
- **Images**: Use modern formats (`avif`, `webp`) with responsive `srcset` definitions.
- **Fonts**: Use modern font formats (`woff2`), subset glyphs, and declare `font-display: swap;` to prevent Flash of Invisible Text (FOIT).
- **Bundle Budgets**:
  - Initial JS payload (compressed): ≤ **150 KB**.
  - Initial CSS payload (compressed): ≤ **50 KB**.
  - Total page transfer budget: ≤ **1.5 MB** on initial load.

---

## 4. Dimension 3: Responsive & Layout Integrity

Every page must adapt fluidly to user viewports from compact mobile screens up to ultrawide cinema displays.

### 4.1 Viewport Test Matrix
Layouts must be verified across five canonical breakpoints:
1. **Compact Mobile**: 320px – 375px (iPhone SE, small Android).
2. **Standard Mobile**: 390px – 430px (iPhone 14/15/16, Pixel, Galaxy).
3. **Tablet**: 768px – 834px (iPad, Android tablets).
4. **Desktop / Laptop**: 1024px – 1440px (MacBook, standard 1080p).
5. **Ultrawide**: 1920px – 3840px (4K monitors, ultrawide curved displays).

### 4.2 Layout Failure Bans & Responsive Gates
- **Zero Horizontal Body Overflow [MANDATORY HARD GATE]**: The page must never exhibit unintended horizontal scroll. If horizontal scroll appears:
  - DO NOT apply `body { overflow-x: hidden; }` as a band-aid.
  - Find the overflowing element (typically caused by fixed widths, `100vw` miscalculations, unconstrained flex children, or absolute positioning out of bounds) and fix its container constraints.
- **Zero Text Clipping / Truncation [MANDATORY HARD GATE]**: Text in buttons, tags, headings, and cards must not truncate unexpectedly, clip underneath adjacent elements, or overflow containers.
- **Touch Target Ergonomics [MANDATORY HARD GATE]**: On touch viewports, every interactive target (buttons, menu triggers, links) must measure at least **44 × 44 pixels** in hit area with ≥ 8px clearance.
- **Zero Hover Locks [MANDATORY HARD GATE]**: No essential interactive trigger, link, or descriptive content may be accessible solely via `:hover`. All functionality must be operable via tap and keyboard.
- **Contained Code & Table Scrolling [MANDATORY HARD GATE]**: Syntax-highlighted code blocks and wide data tables must use dedicated horizontal scroll containers with visual scroll cues, never breaking the page width.
- **Safe Area Insets [MANDATORY HARD GATE]**: Accommodate hardware notches, navigation bars, and rounded device corners:
  ```css
  padding-left: max(1rem, env(safe-area-inset-left));
  padding-right: max(1rem, env(safe-area-inset-right));
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
  ```

---

## 5. Dimension 4: Content Integrity & Authenticity

AURA forbids synthetic, fabricated credibility. Fake data devalues software.

### 5.1 Fabrication Rules
- **No Hallucinated Social Proof**: Never inject fake customer quotes ("This product transformed our lives! - John Doe, VP at Google").
- **No Hallucinated Numbers**: Never invent unsubstantiated vanity statistics ("Used by 50,000+ developers in 120 countries", "99.999% uptime guaranteed").
- **No Hallucinated Logos**: Never render arbitrary Fortune 500 company logos without explicit client direction.
- **Handling Incomplete Content**:
  - When real assets or copy are pending, use structured, unmistakable placeholders:
    - Text: `[Client Case Study Metric Required]`
    - Logo ticker: `[Partner Logos — Awaiting Assets]`
    - Testimonial: `[Customer Testimonial — Quote Pending]`
  - Alternatively, structure the narrative around verified technical capabilities, architectural features, and product demos rather than unverified testimonials.

---

## 6. Dimension 5: Code Architecture & Maintainability

Code quality dictates how easily a website can evolve, scale, and be maintained by humans.

### 6.1 Architectural Rules
- **Design Token Discipline**: All colors, fonts, spacing, shadows, and radii must reference CSS variables or a centralized theme file (e.g., `tokens.css` or Tailwind configuration). No arbitrary magic numbers in component styles.
- **Modular Component Isolation**: Components must follow single-responsibility principles. Avoid monolithic 1,000-line single-file components.
- **Type Safety**: When using TypeScript, use strict typing without resorting to `any`. Provide explicit interfaces for component props and data models.
- **Zero Console Errors**: Under normal operation, the browser console must be completely free of errors, unhandled rejections, and uncaught exceptions.
