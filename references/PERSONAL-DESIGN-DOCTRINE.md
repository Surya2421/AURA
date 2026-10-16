# Personal Design Doctrine (PERSONAL-DESIGN-DOCTRINE.md)

> **Status**: Living Architectural Standard  
> **Scope**: Baseline aesthetic principles, layout archetypes, typographic craft, and sensory polish for all AURA-engineered digital experiences.

---

## 1. The Precedence Hierarchy (Overrides & Authority)

The Personal Design Doctrine defines the default aesthetic standard of AURA when a project has no specified design direction. It is not an unbending dogma; it exists to prevent mediocre defaults.

The hierarchy of authority is strictly:

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. Client Brand Book & Explicit Requirements [Highest]      │
│    (Mandatory logos, exact hex codes, brand typefaces)      │
├─────────────────────────────────────────────────────────────┤
│ 2. Domain & Audience Constraints                            │
│    (Industry conventions, accessibility mandates, locale)   │
├─────────────────────────────────────────────────────────────┤
│ 3. AURA Personal Design Doctrine Defaults [Base Standard]   │
│    (Applied whenever stages 1 & 2 are silent or flexible)   │
└─────────────────────────────────────────────────────────────┘
```

When an explicit client requirement conflicts with this doctrine, the client requirement wins. However, the agent must document the override in `references/DESIGN-DECISION-LOG.md`.

---

## 2. Anti-Cliché Manifest: Banned Tropes vs. Conditional Preferences

Most AI-generated websites look identical because models converge on a narrow subset of popular web trends from 2021–2023. AURA distinguishes between **Universal Prohibitions** (which are strictly forbidden under all circumstances) and **Conditional Anti-Patterns** (which are prohibited as lazy defaults but permitted when justified by explicit domain requirements).

### 2.1 Universal Prohibitions (Never Permitted)
- **Fabricated Credibility**: Fake testimonials, hallucinated metrics ("10,000+ happy users"), and unverified corporate partner logos.
- **Hidden Overflow Hacks**: `body { overflow-x: hidden; }` used to sweep layout calculation bugs under the rug.
- **Unreachable Interactive Controls**: Buttons or form fields clipped, trapped behind z-index layers, or stripped of focus outlines.
- **Purposeless Decorative Orbs**: Centered blurred radial neon gradients (purple/cyan) placed behind dark cards merely to simulate "AI excitement".

### 2.2 Conditional Anti-Patterns (Lazy Defaults vs. Justified Use)
| Pattern | Why It Fails as a Lazy Default | Permitted Justified Usage |
| :--- | :--- | :--- |
| **Symmetric 3-Card Grid** | Monotonous, cookie-cutter packing that equalizes unequal concepts. | Permitted in genuine product catalogs, pricing tiers, or when an asymmetric bento is inappropriate. Otherwise use 60/40 splits, timeline rails, or master-detail cards. |
| **Pure Flat `#000000` / `#FFFFFF`** | Uncalibrated flat extremes often produce harsh contrast and eliminate material layering. | **Fully permitted** when dictated by client brand books, high-contrast Swiss typography, or intentional minimalist/brutalist art direction. When unconstrained, prefer calibrated darks (`#0D1117`, `#121214`) or warm architectural whites (`#FBFBFA`, `#F5F5F0`). |
| **3D Elements & Shaders** | Pointless rotating floating geometric shapes that drain battery and slow LCP. | Fully encouraged when purposeful: interactive 3D product configurators, data visualizations, or hardware models that serve user understanding. |
| **Monochromatic Blue / Cyan Themes** | Generic "tech SaaS" color bias that erases distinct brand personality. | Only permitted when explicitly mandated by client brand guidelines. Personal-brand and custom projects must derive their own distinct chromatic identity. |

---

## 3. Typographic Craft & Hierarchy

Typography is 80% of web design. Under AURA, type is never an afterthought.

### 3.1 Typeface Pairings (Archetype Presets)
AURA prescribes deliberate, characterful pairings rather than defaulting to generic system sans:

1. **The Editorial Atelier (High Culture, Thought Leadership, Luxury, Studio)**
   - **Display / Headings**: High-contrast modern serif with elegant italic ligatures (*Cormorant Garamond*, *Playfair Display*, *Fraunces*, or *Newsreader*).
   - **Body / Interface**: Clean, neutral humanist sans (*Plus Jakarta Sans*, *Inter*, or *Satoshi*).
   - **Accent / Metadata**: Monospace with tabular figures (*JetBrains Mono* or *Space Mono*).

2. **The Precision Instrument (Developer Tools, FinTech, Deep Tech, Science)**
   - **Display / Headings**: Sharp, geometric grotesque or technical neo-grotesque (*Cabinet Grotesk*, *Space Grotesk*, or *Geist Sans*).
   - **Body / Interface**: High-legibility technical sans (*Inter*, *Geist*, or *General Sans*).
   - **Accent / Metadata**: High-density monospace with slashed zeros (*Geist Mono*, *IBM Plex Mono*, or *Fira Code*).

3. **The Neo-Brutalist Kinetic (Creative Agencies, Culture, Independent Creators)**
   - **Display / Headings**: Heavy, unapologetic grotesque or compressed display (*Clash Display*, *Syne*, or *Bebas Neue*).
   - **Body / Interface**: Direct, unpretentious sans (*DM Sans*, *Work Sans*, or *Outfit*).
   - **Accent / Metadata**: Heavy-border labels, badge tags, and typewriter mono (*Courier Prime* or *Space Mono*).

### 3.2 Typographic Metrics & Rules
- **Fluid Modular Scale**: Never use static pixel font sizes for major headings. Use fluid CSS `clamp()` formulas:
  - Display Hero: `clamp(2.5rem, 1.5rem + 5vw, 5.5rem)`
  - H1 Headline: `clamp(2rem, 1.25rem + 3.5vw, 3.75rem)`
  - H2 Subheadline: `clamp(1.5rem, 1rem + 2vw, 2.5rem)`
- **Measure (Line Length)**: Body copy must be constrained between **45 and 75 characters per line** (`max-width: 65ch`). Never allow text to stretch endlessly across ultrawide monitors.
- **Leading (Line Height)**:
  - Display / Hero (Large text): Tight leading (`1.05` to `1.15`).
  - Headings (H1–H3): Compact leading (`1.2` to `1.25`).
  - Body copy: Generous, readable leading (`1.55` to `1.7`).
- **Tracking (Letter Spacing)**:
  - Large headings: Negative tracking (`-0.02em` to `-0.035em`) for cohesive optical grouping.
  - Uppercase tags/captions: Expanded tracking (`+0.05em` to `+0.12em`) for clarity.
  - Body text: Natural tracking (`0em`).

---

## 4. Color Science & Material Surfaces

Color must express identity, hierarchy, and atmospheric depth, not random rainbow accents or reflexive blue-cyan defaults.

### 4.1 The 60-30-10 Atmospheric Rule
- **60% Dominant Base**: Canvas foundation (background surfaces, subtle borders, card backing).
- **30% Structural Secondary**: Typography, structural framing, secondary buttons, subtle dividers.
- **10% Kinetic Accent**: Primary interactive focus, status highlights, key callouts.

### 4.2 Archetype Palette Presets (No Mandatory Blue/Cyan)
AI agents notoriously default to dark blue/cyan (`#090D16` and `#38BDF8`). AURA rejects this bias. Palettes must be derived from the brand essence or chosen archetype:

1. **The Architectural Monograph (Warm & Earthen)**:
   - Canvas (60%): Warm Sandstone (`#F7F6F2`) or Dark Espresso (`#181513`)
   - Structural (30%): Deep Charcoal (`#292524`) or Light Parchment (`#E7E5E4`)
   - Accent (10%): Terracotta / Rust (`#C2410C`) or Burnished Gold (`#D97706`)
2. **The High-Precision Technical (Clean & Balanced)**:
   - Canvas (60%): Slate Charcoal (`#0F172A`)
   - Structural (30%): Technical Steel (`#94A3B8`)
   - Accent (10%): Signal Emerald (`#10B981`) or International Orange (`#FF5722`)
3. **The Organic Botanical (Natural & Tactile)**:
   - Canvas (60%): Muted Forest (`#141915`) or Pale Sage (`#F4F6F0`)
   - Structural (30%): Lichen Slate (`#788A7B`) or Deep Pine (`#1C261F`)
   - Accent (10%): Warm Brass (`#CA8A04`) or Ochre (`#D97706`)
4. **The High-Contrast Minimalist (Monochrome Editorial)**:
   - Canvas (60%): Pure Ink Black (`#000000`) or Pure Stark White (`#FFFFFF`)
   - Structural (30%): Mid-tone Slate (`#71717A`)
   - Accent (10%): Stark Inversion or Monochromatic Kinetic Highlight (`#FAFAFA` on dark, `#18181B` on light)

> [!IMPORTANT]
> **Client Brand Primacy**: When client branding defines specific primary, secondary, and accent colors, those colors completely supersede the presets above. Record the override in `references/DESIGN-DECISION-LOG.md`.

### 4.3 Material Depth & Layering
Rather than flat cards or harsh drop shadows, AURA uses elevation through subtle luminosity and border definitions:
- **Surface Level 0 (Canvas)**: Base background color.
- **Surface Level 1 (Elevated Cards)**: +3% to +5% luminosity shift from canvas, combined with a delicate semi-transparent border (`rgba(255, 255, 255, 0.08)` on dark, `rgba(0, 0, 0, 0.06)` on light).
- **Surface Level 2 (Floating Popovers / Modals)**: +8% luminosity shift, with a compound optical drop shadow:
  ```css
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 12px 24px -4px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--color-border-visible);
  ```
- **Surface Level 3 (Hover States)**: Micro-elevation, border luminance increase (`rgba(255, 255, 255, 0.18)`), and subtle ambient glow strictly matching the card's accent color.

### 4.4 Contrast Mandate
Every text-to-background pairing must meet or exceed **WCAG 2.2 Level AA** (4.5:1 for body copy, 3:1 for large text). Critical user flows (forms, CTA buttons) should target **Level AAA** (7:1).

---

## 5. Spatial Composition & Layout Archetypes

AURA rejects repetitive, one-size-fits-all layouts. Every website must adopt a deliberate layout archetype aligned with its narrative.

### 5.1 Canonical Layout Archetypes

1. **The Asymmetric Editorial Spread**
   - Distinctive magazine-style columns with offset imagery, oversized typographic anchor points, and text wraps.
   - Ideal for storytelling, agency portfolios, luxury brands, and product manifestos.

2. **The Command & Control Precision Deck**
   - High-density information architecture with modular inspector panels, live status tickers, interactive metrics, and code-block tabs.
   - Ideal for developer platforms, API documentation, data infrastructure, and trading terminals.

3. **The Kinetic Showcase Gallery**
   - Horizontal scroll showcases, sticky vertical viewport anchors, split-screen pinned sections where text scrolls while visual assets transform.
   - Ideal for hardware showcases, case studies, interactive products, and visual arts.

4. **The Split Hero & Bento Evolution**
   - A 50/50 split hero (bold typography on one side, live interactive widget on the other) leading into a differentiated, multi-span bento grid where each cell has a completely distinct UI personality (not 4 identical cards).

### 5.2 Layout Rules of Thumb
- **The Zero-Horizontal-Scroll Law**: No page should ever trigger unintentional horizontal overflow. Never use `overflow-x: hidden` on `<body>` to mask broken content.
- **Adaptive White Space**: Generous whitespace on desktop (80px–140px section spacing) that gracefully clamps on mobile (40px–64px).
- **Sticky Anchors**: Use sticky navigation headers with backdrop filters (`backdrop-filter: blur(12px)`) that preserve context as users explore.

---

## 6. Purposeful Motion & Kinetic Polish

Motion must provide functional feedback, establish spatial relationships, or reward curiosity. Random, jarring entrance animations are strictly forbidden.

### 6.1 Motion Guidelines
- **Spring & Cubic Easing**: Use realistic bezier curves rather than linear transitions:
  - Smooth deceleration: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy entry).
  - Subtle bounce / spring: `cubic-bezier(0.34, 1.56, 0.64, 1)` (micro-interactions).
- **Duration Budgets**:
  - Micro-interactions (hover, click, toggle): `150ms` – `250ms`.
  - Component transitions (dropdowns, drawers, tabs): `250ms` – `350ms`.
  - Section choreographies (page enters, staged reveals): `400ms` – `600ms`.
- **Stagger Delays**: Cascade child element entrances with 40ms–60ms offsets to prevent clumsy simultaneous flashes.
- **Mandatory Accessibility**: Every animation MUST be disabled or simplified when the user requests reduced motion:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 7. Media, SVG & Asset Authenticity

- **Authentic Domain SVGs**: Use clean, hand-crafted or curated SVG icons from established libraries (Lucide, Radix Icons, Feather, Heroicons) with unified stroke widths (1.5px or 2px). Never mix inconsistent icon weights or mismatched styles.
- **No Hallucinated Visuals**: Do not invent fake user avatars with stock stock-photo smiles or AI-distorted faces. Use styled typographic initials or abstract geometric avatars when authentic headshots are unavailable.
- **Responsive Media Handlers**: All images must use modern formats (`webp`, `avif`), have explicit `aspect-ratio` or `width`/`height` attributes to prevent Cumulative Layout Shift (CLS), and specify `loading="lazy"` for below-the-fold assets.

---

## 8. Mobile-Specific Design & Ergonomics

Mobile design is never an afterthought or a clumsy shrink of desktop layouts. Every AURA project must make deliberate mobile decisions:

### 8.1 Thumb-Zone Ergonomics
- **Reachability Mapping**: Key interactive triggers (primary CTA, mobile menu toggles, sticky conversion bars) must be positioned within the ergonomic natural reach of the thumb (lower two-thirds of the screen).
- **Minimum Hit Geometry**: Interactive touch elements must have a target hit area of at least **44 × 44 pixels** with a minimum 8px separation between adjacent targets to avoid accidental mis-taps.

### 8.2 Mobile Narrative & Stack Choreography
- **Context Preservation**: When collapsing asymmetric desktop grids (e.g., 60% text / 40% interactive demo), do NOT mechanically bury the headline or push the primary CTA three full viewport heights down the page.
- **Micro-Previews on Mobile**: Replace heavy interactive sandboxes with a simplified, lightweight visual preview on mobile viewports to prevent scrolling exhaustion.

### 8.3 Touch-Independence (Zero Hover Locks)
- **No Hover-Gated Critical UI**: Touch screens do not support persistent hover states. Never hide prices, action triggers, critical tooltips, or feature descriptions behind a `:hover` pseudo-class.
- **Tap-to-Inspect**: Use explicit tap-to-reveal or permanent visual indicators on mobile.

### 8.4 Mobile Data & Code Presentation
- **Contained Horizontal Exploration**: Multi-column data tables and syntax-highlighted code blocks must reside inside dedicated overflow containers (`overflow-x: auto; -webkit-overflow-scrolling: touch;`).
- **Visual Scroll Affordance**: Provide subtle gradient fades or horizontal scroll indicators so the user immediately recognizes that the container can be swiped horizontally. Never allow code blocks to stretch the outer page layout.
