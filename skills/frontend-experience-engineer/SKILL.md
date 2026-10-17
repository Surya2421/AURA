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
4. **Content Authenticity & Fact Verification**:
   - Verify every visible project claim, client name, coordinate, date, and technical parameter against supplied sources.
   - Mark unknown or pending facts with concise, unmistakable bracketed placeholders (e.g., `[PROJECT TITLE REQUIRED]`, `[SPECIFICATION PENDING]`).
   - Never invent testimonials, customer logos, locations, technical specifications, camera/optical metadata, benchmark results, or case-study narratives to fill empty space.
   - Keep demonstrative UI examples clearly distinct from actual client claims.
   - Frontend-only prototype forms must never simulate or imply successful backend transmission when no backend exists (state clearly: `[Prototype Form — Submission Not Connected]`).
5. **Fluid & Accessible Typography**: Headings must use fluid `clamp()` sizing with sensible responsive starting ranges. Body text must maintain a measure between 45 and 75 characters (`max-width: 65ch`).
6. **Accessible Interactive Elements**:
   - Touch targets must measure at least **44 × 44px** on touch viewports.
   - Visible `:focus-visible` outlines must be preserved.
   - All animations must be GPU-accelerated (`transform`, `opacity`) and wrapped with `@media (prefers-reduced-motion: reduce)`.
7. **Dignified Asset Placeholders**:
   - When authentic media is pending, preserve intended aspect ratios (`aspect-ratio: 16 / 9`, `4 / 3`, etc.) to prevent Cumulative Layout Shift (CLS).
   - Use deliberate contrast and harmonious surface tones matching `tokens.css`.
   - Distinguish placeholders from real media using explicit, restrained bracketed status badges (`[CLIENT ASSET PENDING]`).
   - Strictly avoid pseudo-technical CAD clutter (fake coordinates, corner crosshairs, arbitrary aspect-ratio badges, fake camera optics) added merely to decorate empty frames.
   - Never allow an empty placeholder box to dominate the hero as an accidental wireframe error state.
   - Never treat placeholder rendering as proof of final visual quality.

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

### Collision-Safe Floating Mobile Action Pattern:
Fixed or floating conversion buttons must be engineered to prevent obscuring page content, forms, or footer links:

```css
/* 1. Floating Action Pill Container */
.aura-mobile-action-bar {
  display: flex;
  position: fixed;
  bottom: max(1rem, env(safe-area-inset-bottom));
  left: 0;
  right: 0;
  z-index: 180;
  justify-content: center;
  align-items: center;
  padding: 0 var(--space-4);
  pointer-events: none; /* Allows clicks through empty lateral space */
  transition: opacity var(--duration-fast) var(--ease-snappy),
              visibility var(--duration-fast);
}

.aura-mobile-action-bar .btn {
  pointer-events: auto;
  min-height: 44px;
  min-width: 200px;
  max-width: 280px;
  padding: 0 var(--space-6);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-mobile-action);
}

/* 2. Mandatory Bottom Page Clearance (Prevents footer/content occlusion) */
.aura-page-footer,
.aura-content-bottom {
  padding-bottom: clamp(4.5rem, 3.5rem + 3vw, 6rem);
}

/* 3. Automatic Concealment During Overlays (Drawers, Modals) */
body.drawer-open .aura-mobile-action-bar,
body.modal-open .aura-mobile-action-bar {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

@media (min-width: 768px) {
  .aura-mobile-action-bar {
    display: none; /* Desktop utilizes header navigation CTA */
  }
}
```

#### Optional Intersection Concealment (Target Form Visibility):
When a page features an inline commission or inquiry form (e.g. `#inquire`), avoid duplicate action noise by observing the section and fading out the floating pill while the user interacts with the form:
```javascript
// Optional: Use only when an inline conversion section exists
const targetSection = document.querySelector('#inquire');
const floatingBar = document.querySelector('.aura-mobile-action-bar');

if (targetSection && floatingBar && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        floatingBar.style.opacity = '0';
        floatingBar.style.pointerEvents = 'none';
      } else if (!document.body.classList.contains('drawer-open')) {
        floatingBar.style.opacity = '1';
        floatingBar.style.pointerEvents = 'auto';
      }
    });
  }, { threshold: 0.15 });
  observer.observe(targetSection);
}
```
