---
name: signature-art-direction
description: Establishes typography pairings, fluid spatial scales, deliberate color palettes, design tokens, and motion choreographies.
---

# Signature Art Direction Skill (`signature-art-direction`)

The `signature-art-direction` skill transforms the conceptual vision into a concrete, executable system of design tokens, typographic hierarchies, color relationships, and material surfaces. It ensures every visual property on the website is intentional, accessible, and mathematically harmonious.

---

## 1. Core Responsibilities

1. **Typographic System Engineering**: Select characterful font pairings, compute fluid `clamp()` type curves, and define precise tracking and leading rules.
2. **Harmonious Color Science**: Construct an atmospheric palette following the 60-30-10 rule, establish layered elevation surfaces, and guarantee WCAG 2.2 AA/AAA contrast ratios.
3. **Spatial Rhythm & Layout Grid**: Define a 4px/8px modular spacing scale, responsive container max-widths, and fluid padding steps.
4. **Elevation & Material Physics**: Engineer subtle border luminescence, compound optical shadows, and surface blurs without relying on generic heavy drop shadows.
5. **Token System Generation**: Export complete, semantic CSS custom properties into `tokens.css` (or framework-equivalent theme object).
6. **Decision Logging**: Record all typographic, color, and token decisions in `references/DESIGN-DECISION-LOG.md`.

---

## 2. Design Token System Specification (`tokens.css`)

Every project must instantiate a centralized design token file containing the core token categories shown in the schema below. 

> [!IMPORTANT]
> **Schema vs. Specific Palette**: The hex values below illustrate the *Precision Instrument* archetype. When executing this skill, you MUST populate the colors and font stacks using the specific archetype chosen in Stage 2 or the client's explicit brand book. Do NOT blindly copy dark cyan/blue values onto projects requiring warm, botanical, or custom brand palettes.

```css
/* ==========================================================================
   AURA DESIGN TOKEN SCHEMA (tokens.css)
   ========================================================================== */

:root {
  /* ------------------------------------------------------------------------
     1. TYPOGRAPHY: FONT FAMILIES (Populated per archetype / brand guidelines)
     ------------------------------------------------------------------------ */
  --font-display: 'Fraunces', serif, system-ui;
  --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* ------------------------------------------------------------------------
     2. TYPOGRAPHY: FLUID MODULAR TYPE SCALE (clamp)
     ------------------------------------------------------------------------ */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem);      /* 12px -> 13px */
  --text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 0.9375rem);   /* 14px -> 15px */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.0625rem);       /* 16px -> 17px */
  --text-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);     /* 18px -> 20px */
  --text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);         /* 20px -> 24px */
  --text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);      /* 24px -> 30px */
  --text-3xl: clamp(1.875rem, 1.65rem + 1.125vw, 2.375rem);   /* 30px -> 38px */
  --text-4xl: clamp(2.25rem, 1.95rem + 1.5vw, 3rem);          /* 36px -> 48px */
  --text-display: clamp(2.75rem, 2.2rem + 2.75vw, 4.5rem);    /* 44px -> 72px */

  /* ------------------------------------------------------------------------
     3. TYPOGRAPHY: LINE HEIGHTS & TRACKING
     ------------------------------------------------------------------------ */
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.55;
  --leading-relaxed: 1.7;

  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.05em;
  --tracking-widest: 0.1em;

  /* ------------------------------------------------------------------------
     4. COLOR SYSTEM: 60-30-10 ATMOSPHERIC RATIOS (Populated per archetype / brand)
     ------------------------------------------------------------------------ */
  /* Base Canvas (60%) */
  --color-canvas: #090D16;
  --color-canvas-subtle: #0E1422;
  
  /* Structural Surfaces & Borders */
  --color-surface-1: #131B2E;
  --color-surface-2: #1A243B;
  --color-surface-hover: #222F4C;
  
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-border-visible: rgba(255, 255, 255, 0.14);
  --color-border-focus: #38BDF8;

  /* Typography / Structural Contrast (30%) */
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #94A3B8;
  --color-text-muted: #64748B;

  /* Kinetic Accent & Interactivity (10%) */
  --color-accent-primary: #38BDF8;
  --color-accent-hover: #0EA5E9;
  --color-accent-contrast: #090D16;

  /* Functional Status */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;

  /* ------------------------------------------------------------------------
     5. SPACING & LAYOUT SCALE (4px/8px base)
     ------------------------------------------------------------------------ */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-24: 6rem;    /* 96px */

  --container-max: 1240px;
  --container-padding: clamp(1rem, 0.5rem + 2.5vw, 2.5rem);

  /* ------------------------------------------------------------------------
     6. ELEVATION, CORNERS & SHADOWS
     ------------------------------------------------------------------------ */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 14px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--color-border-subtle);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.45), 0 0 0 1px var(--color-border-visible);

  /* ------------------------------------------------------------------------
     7. MOTION TIMING & EASING
     ------------------------------------------------------------------------ */
  --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
}
```

---

## 3. Contrast & Accessibility Verification Checklist

Before releasing `tokens.css` to the frontend engineer, the art director must verify:
- [ ] Primary text (`--color-text-primary`) against canvas (`--color-canvas`): contrast ratio ≥ **7.0:1** (AAA standard).
- [ ] Secondary text (`--color-text-secondary`) against canvas: contrast ratio ≥ **4.5:1** (AA standard).
- [ ] Accent interactive elements (`--color-accent-primary`): contrast ratio ≥ **3.0:1** for UI components and ≥ **4.5:1** when text is placed on it.
- [ ] Focus ring indicator (`--color-border-focus`): clearly distinguishable against both canvas and surface cards.

---

## 4. Deliverable Format: The Style Tile

In addition to `tokens.css`, the skill outputs a concise Style Tile specification:
1. **Typographic Hierarchy Chart**: Visual sample lines illustrating Display, H1, H2, Body, and Mono.
2. **Surface Elevation Hierarchy**: Explanation of Canvas, Level 1 Card, Level 2 Modal, and Hover states.
3. **Interactive Control Specs**: Button variants (Primary Solid, Secondary Ghost, Subtle Link), active states, and focus states.
4. **Motion Signature**: Easing curve selection and choreography duration budgets.
