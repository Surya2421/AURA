---
name: frontend-experience-engineer
description: Crafts pristine, semantic, accessible frontend code; executes the isolated first slice for human review and the complete production build upon approval.
---

# Frontend Experience Engineer Skill (`frontend-experience-engineer`)

The `frontend-experience-engineer` transforms design concepts and tokens into robust, production-grade frontend code. This skill is invoked during two distinct lifecycle phases:
1. **Stage 4 (First Slice Implementation)**: Building an isolated, high-impact vertical slice to enable human visual approval.
2. **Stage 6 (Full Implementation Execution)**: Expanding the approved slice into the complete, responsive website.

---

## 1. Operating Rules & Engineering Standards

1. **Token Strictness**: Never introduce raw hex colors, arbitrary pixel paddings, or ad-hoc font families in component styles. All styling must consume variables defined in `tokens.css`.
2. **Semantic HTML5 First**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`. Never build button functionality into non-interactive `<div>` or `<span>` elements without full keyboard, focus, and ARIA handling.
3. **Responsive Resilience (No Overflow Hacks)**:
   - Pages must display seamlessly from **320px up to 3840px**.
   - Do NOT apply `body { overflow-x: hidden; }` to hide broken layouts. Ensure all child containers use `min-width: 0`, responsive flex wraps, or CSS Grid with `minmax(0, 1fr)`.
4. **Authentic Content Guardrail**: Never insert fabricated customer quotes, fake partner logos, or invented performance metrics. Use structured placeholders (`[Verified Case Study Metric Needed]`) or focus on authentic technical architecture.
5. **Fluid & Accessible Typography**: Headings must use fluid `clamp()` sizing. Body text must maintain a measure between 45 and 75 characters (`max-width: 65ch`).
6. **Accessible Interactive Elements**:
   - Touch targets must measure at least **44 × 44px** on touch viewports.
   - Visible `:focus-visible` outlines must be preserved.
   - All animations must be GPU-accelerated (`transform`, `opacity`) and wrapped with `@media (prefers-reduced-motion: reduce)`.

---

## 2. Stage 4: First Slice Execution Protocol

The First Slice is not a mockup; it is a live, functional, vertical slice of the site engineered to let the human reviewer experience the typography, spatial hierarchy, color atmosphere, and interactive feel.

### Anatomy of a Canonical First Slice:
1. **Navigation Header**:
   - Brand mark / logo typography.
   - Primary navigation anchors.
   - Action / CTA trigger.
   - Sticky backdrop blur with optical border.
2. **Hero Stage**:
   - Signature headline utilizing fluid display typography.
   - Subheadline respecting the 45–75 character measure.
   - Primary and secondary call-to-action buttons with micro-interactions.
   - Asymmetric visual anchor (e.g., interactive code sandbox, architectural graphic, or product preview).
3. **First Core Content / Interactive Element**:
   - An asymmetric feature split, interactive tabbed demo, or dynamic bento cell demonstrating how content lives within the design system.

### Verification Before Handing Off to Stage 5:
- [ ] Dev server builds without errors or warnings.
- [ ] Tested at mobile (375px) and desktop (1440px) with **zero horizontal scroll**.
- [ ] Design tokens from `tokens.css` correctly wired.

---

## 3. Stage 6: Full Implementation Execution Protocol

Once human approval is received at Stage 5, this skill expands the codebase into the complete production experience:

### 3.1 Systematic Section Construction
1. **Information Architecture Assembly**: Build remaining sections in order according to the approved Vision Concept document.
2. **Interactive States & Widgets**:
   - Mobile navigation drawer with keyboard focus trapping and `Escape` key dismissal.
   - Modals and dialogs utilizing standard `<dialog>` or accessible headless primitives.
   - Interactive tabs, accordions, and sliders with appropriate ARIA roles (`tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`).
3. **Form Handling & Validation**:
   - Distinct, permanently visible `<label>` elements for every input.
   - Inline validation states with accessible error announcements (`aria-invalid="true"`, `aria-describedby="error-id"`).
   - Clear loading and disabled states on form submit triggers.
4. **Footer & Masthead Completion**:
   - Comprehensive semantic sitemap, copyright declaration, back-to-top anchor, and theme / preference controls.

### 3.2 Performance & Asset Loading Strategy
- Use modern image formats (`.webp`, `.avif`) with explicit `aspect-ratio` or `width`/`height` attributes to guarantee CLS < 0.1.
- Mark hero visual assets with `priority` or `<link rel="preload">`.
- Apply `loading="lazy"` to all below-the-fold media.
- Keep total CSS and JavaScript payloads within the strict budgets defined in `references/WEBSITE-QUALITY-STANDARD.md`.

---

## 4. Code Pattern Templates

### Fluid Responsive Container:
```css
.aura-container {
  width: 100%;
  max-width: var(--container-max);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}
```

### Accessible Skip Link:
```html
<a href="#main-content" class="aura-skip-link">Skip to main content</a>
```
```css
.aura-skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  z-index: 9999;
  padding: 0.75rem 1.25rem;
  background: var(--color-surface-2);
  color: var(--color-accent-primary);
  border: 1px solid var(--color-border-visible);
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: top var(--duration-fast) var(--ease-snappy);
}
.aura-skip-link:focus {
  top: 1rem;
}
```

### Asymmetric Split Grid (Zero Overflow):
```css
.aura-asymmetric-split {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  align-items: center;
}

@media (min-width: 1024px) {
  .aura-asymmetric-split {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    gap: var(--space-12);
  }
}
```
*(Notice the use of `minmax(0, ...)` to eliminate unintended grid blowouts and horizontal scrolling).*

### Contained Horizontal Scroller (Code Blocks & Tables):
```css
.aura-scroll-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  /* Visual scroll cue: delicate linear fade on edges */
  mask-image: linear-gradient(to right, black calc(100% - 24px), transparent 100%);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle);
}
```

### Thumb-Zone Ergonomic Sticky Mobile Bar:
```css
.aura-mobile-action-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 900;
  padding: 0.75rem var(--container-padding);
  padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
  background: var(--color-surface-1);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--color-border-subtle);
}

@media (min-width: 768px) {
  .aura-mobile-action-bar {
    display: none; /* Desktop uses inline navbar CTA */
  }
}
```
