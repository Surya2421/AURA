# Design Evaluation Suite (evaluations/design-evals.md)

> **Status**: Repeatable Benchmark Suite  
> **Purpose**: Provides objective, reproducible evaluation protocols to verify that websites engineered under AURA meet aesthetic distinctiveness, brand alignment, and anti-cliché standards.

This suite is used during Stage 2 (Concept Evaluation), Stage 5 (First Slice Evaluation), and Stage 8 (Final Visual QA).

---

## 1. Evaluation Rubric & Scoring System

Every design evaluation assesses four criteria on a **1 to 5 scale**:

| Score | Meaning | Action Required |
| :---: | :--- | :--- |
| **5** | **Exemplary**: Distinctive, original, flawless execution; exceeds professional standards. | Approved immediately. |
| **4** | **Proficient**: Polished, coherent, characterful; fully aligns with doctrine. | Approved. |
| **3** | **Acceptable**: Functional and clean, but exhibits minor derivative patterns or timid choices. | Minor revisions recommended. |
| **2** | **Deficient**: Noticeable AI clichés, awkward spacing, or generic layout patterns. | Rejection; requires redesign. |
| **1** | **Unacceptable**: Blatant template generation, broken layout, purple-glow cliché, or fabricated data. | Immediate failure; hard stop. |

> [!CRITICAL]
> **Passing Threshold**: An AURA design must achieve a minimum score of **4** on Aesthetic Distinctiveness and Content Authenticity, and no score below **4** on any individual criterion.

---

## 2. Test Suite 1: Generic Design & Cliché Detection Test

### Objective:
Verify that the website does not utilize generic, low-effort AI web design tropes.

### Test Procedure:
Run the following heuristic checklist against the codebase and visual renderings:

```text
[CLICHÉ AUDIT CHECKLIST]
1. [ ] Check for centered purple/cyan radial blur behind dark cards.
       -> Pass: Crisp material surfaces, subtle 1px border luminescence, or authentic lighting.
       -> Fail: Generic centered radial-gradient(circle, rgba(147, 51, 234, 0.2)...) on black.

2. [ ] Check for symmetric 3-column card feature grid.
       -> Pass: Asymmetric 60/40 split, dynamic bento cells, horizontal timeline, or interactive preview.
       -> Fail: Exactly 3 identical cards with top-center icon, 2-line title, 3-line description.

3. [ ] Check for cliché marketing headlines.
       -> Pass: Opinionated, domain-specific value statements and technical clarity.
       -> Fail: "Supercharge your workflow", "The all-in-one platform for X", "Revolutionize your productivity".

4. [ ] Check for uncurated floating 3D geometric shapes (glass toruses, spheres, cubes).
       -> Pass: Functional UI diagrams, live interactive widgets, or domain photography.
       -> Fail: Floating abstract decorative shapes with no relation to product functionality.

5. [ ] Check for default system sans-serif without character.
       -> Pass: Deliberate editorial, technical, or neo-brutalist typography pairings with fluid clamp scaling.
       -> Fail: Generic unconfigured sans-serif with static pixel sizes and loose tracking.
```

### Scoring Rule:
- Any single **Fail** drops the Cliché Detection score to **≤ 2**.
- All items **Pass** yields a score of **5**.

---

## 3. Test Suite 2: Brand Alignment & Override Test

### Objective:
Verify that explicit client branding and requirements have taken precedence over personal defaults, while maintaining design integrity.

### Test Procedure:
1. Compare project inputs (`[EXPLICIT_REQUIREMENT]` entries in `DESIGN-DECISION-LOG.md`) against `tokens.css`.
2. Verify exact hex codes, logo guidelines, and brand font stacks are faithfully implemented.
3. Check that the personal design doctrine did NOT override mandatory client constraints.
4. Verify that where the client brief was silent, the personal doctrine filled the gap gracefully with high-character defaults.

### Rubric:
- **Score 5**: Every client requirement is perfectly honored; supplementary styling harmonizes seamlessly with brand essence; overrides fully logged.
- **Score 3**: Client branding is technically present, but clashing defaults or unharmonized secondary colors create optical discord.
- **Score 1**: Agent replaced client brand assets with its own preferences without permission.

---

## 4. Test Suite 3: Aesthetic Distinctiveness & Typographic Craft

### Objective:
Assess whether the website possesses an authentic, memorable visual identity and superior typographic execution.

### Evaluation Criteria:
1. **Typographic Rhythm & Hierarchy**:
   - Contrast between headings and body text is unmistakable.
   - Fluid `clamp()` scaling works smoothly without abrupt jumps.
   - Line length (measure) is strictly bounded to 45–75 characters (`max-width: 65ch`).
   - Leading and tracking are optically calibrated (tight negative tracking on large titles, generous leading on body).
2. **Spatial Composition**:
   - Section padding provides deliberate, luxurious breathing room (80px–140px on desktop).
   - Alignment axes are disciplined: elements snap to grid columns or intentional asymmetric anchors.
3. **Material Surfaces & Micro-interactions**:
   - Elevation is communicated via subtle surface luminosity and delicate 1px borders rather than heavy, muddy shadows.
   - Hover and focus transitions feel responsive and tactile, using snappy cubic-bezier curves (150ms–250ms).

### Rubric:
- **Score 5**: Looks custom-designed by a top-tier digital agency. Typography is magnetic, layout is engaging, and rhythm is immaculate.
- **Score 3**: Clean and professional, but feels somewhat standard or familiar.
- **Score 1**: Visually uninspired, cramped spacing, awkward line breaks, or generic template appearance.

---

## 5. Test Suite 4: Content Authenticity & Fabrication Audit

### Objective:
Verify strict adherence to Core Principle 3: Zero content fabrication.

### Test Procedure:
1. Scan all copy for customer quotes, case studies, employee testimonials, and client reviews.
   - Does every testimonial trace back to a verified client input?
   - If not, is it clearly flagged as `[Customer Testimonial Needed]`?
2. Scan all numerical statistics and claims (e.g., "99.9% uptime", "10,000+ active users", "5x faster").
   - Can each statistic be substantiated by documented project context?
   - If not, has it been removed or replaced with an unexaggerated descriptive statement?
3. Scan all partner and client logo components.
   - Are any trademarked corporate logos displayed that the client did not explicitly provide?

### Rubric:
- **Score 5**: 100% authentic; zero synthetic claims; all placeholders transparent and professional.
- **Score 1 (Automatic Failure)**: Any fabricated testimonial, invented statistic, or hallucinated partner logo found in the codebase.
