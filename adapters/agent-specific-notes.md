# Agent-Specific Configuration Notes (adapters/agent-specific-notes.md)

> **Scope**: Concrete configuration patterns, runtime adaptations, tool mappings, and headless fallback procedures for specific AI coding agent environments.
> 
> [!NOTE]
> **Validation Status Disclosure**: In strict accordance with Core Principle 10 (Radical Truth-in-Reporting), Google Antigravity / Gemini CLI is currently the active reference execution platform. Configurations described for Claude Code, Cursor, Windsurf, and Copilot represent architectural integration specifications that require empirical validation within their respective runtime environments before being certified as fully compatible.

---

## 1. Google Antigravity & Gemini CLI

### Environment Characteristics:
- Native tool support: `run_command`, `write_to_file`, `replace_file_content`, `ask_question`, `read_browser_page`, `invoke_subagent`.
- Rich multimodal capabilities for visual inspection.

### Recommended Configuration:
- **Subagent Invocation**: The `website-orchestrator` can invoke specialist skills via `invoke_subagent` using the `self` or custom subagent definitions.
- **Stage 5 Human Checkpoint**:
  - The orchestrator can either present the checkpoint in chat and stop tool calls, or use `ask_question` to collect structured human approval.
  - Recommended options:
    - `"Approved: Proceed with full implementation"`
    - `"Revise: I will provide visual feedback"`
- **Visual Inspection**:
  - Launch dev server using `run_command` with `WaitMsBeforeAsync: 3000`.
  - Use `read_browser_page` or headless screenshot scripts to capture visual evidence for inspection.

---

## 2. Anthropic Claude Code

### Environment Characteristics:
- Terminal-native execution.
- Powerful Bash execution and file manipulation tools.
- Typically runs in a CLI terminal where interactive headless browser sessions require CLI scripts.

### Recommended Configuration:
- **Prompt Prefix**: Add to `CLAUDE.md` in the project root:
  ```markdown
  Always adhere to the AURA website engineering protocol in AGENTS.md.
  Never bypass the Stage 5 Human Approval Checkpoint.
  Do not generate full-site code until the first slice is visually reviewed and approved.
  ```
- **Visual Inspection Setup**:
  - Use Playwright CLI: `npx playwright test` or a custom screenshot script (`node scripts/capture-visuals.js`).
  - Read captured screenshot image files into context to perform visual QA.
- **Stage 5 Checkpoint**: Claude Code must halt output at Stage 5, provide the local URL (`http://localhost:3000`), output the checkpoint presentation, and prompt the user to reply.

---

## 3. Cursor (Composer & Rules)

### Environment Characteristics:
- IDE-integrated chat and multi-file composer.
- Built-in terminal and editor diffs.
- No direct autonomous subagent spawning; the agent assumes roles sequentially within the same context.

### Recommended Configuration:
- **Workspace Rule (`.cursorrules` or `.cursor/rules/aura.mdc`)**:
  ```markdown
  You are executing the AURA website engineering system.
  Read and follow D:/AURA/AGENTS.md and D:/AURA/skills/website-orchestrator/SKILL.md.
  - Log all choices in references/DESIGN-DECISION-LOG.md.
  - Build the First Slice (Navigation + Hero + 1 Core Section) first.
  - HALT at Stage 5. Present the localhost preview URL and visual summary to the user.
  - DO NOT generate full pages until the user approves.
  ```
- **Sequential Role Execution**:
  - Turn 1: Vision Architect & Art Direction (`tokens.css`).
  - Turn 2: First Slice implementation (`frontend-experience-engineer`).
  - Turn 3: Visual inspection notes + Stop for Human Approval.
  - Turn 4 (Post-approval): Full site expansion.

---

## 4. Windsurf / Cascade & Roo Code

### Environment Characteristics:
- Flow-based multi-file editing with terminal access.
- Interactive user confirmation capabilities.

### Recommended Configuration:
- Set memory or project instructions referencing `AGENTS.md`.
- Ensure dev server is started in the integrated terminal:
  ```bash
  npm run dev
  ```
- At Stage 5, Cascade must present the First Slice review card and pause generation until the user submits feedback.

---

## 5. Headless & Minimal CLI Fallback Protocol

When running in an environment without headless browsers (no Chromium, no Playwright, no browser tools):

### Step 1: Explicit Declaration
In the Stage 5 checkpoint output and all QA reports, include:
```markdown
> [!NOTE]
> **Headless Environment Notice**: Automated screenshot inspection tool is unavailable in this environment. Visual verification performed via static CSS/DOM analysis. Please verify visual appearance in your local browser.
```

### Step 2: Deterministic Static Code Inspection
Execute these automated sanity checks:
```bash
# Check for risky 100vw usages (causes unwanted horizontal scrollbar in Windows browsers)
grep -rn "100vw" ./src ./styles

# Check for unconstrained flex containers
grep -rn "flex-direction: row" ./src

# Check for missing alt tags on images
grep -rn "<img" ./src | grep -v "alt="
```

### Step 3: Clear Human Local Instructions
Provide unambiguous instructions for the human reviewer:
```bash
# 1. Install dependencies (if needed)
npm install

# 2. Start local preview server
npm run dev

# 3. Open preview in browser
# Navigate to: http://localhost:3000
# Test at viewports: 375px (Mobile DevTools), 768px (Tablet), 1440px (Desktop)
```
