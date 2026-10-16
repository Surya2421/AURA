# Agent Adapters (adapters/README.md)

> **Purpose**: Provides universal translation layers and environment shims to run AURA across diverse AI coding agent architectures without modifying core skill definitions.

---

## 1. Architectural Philosophy: Portable Skills, Native Adapters

AURA is engineered to be **vendor-neutral** and **tool-agnostic**. The core design doctrine, quality standards, and specialist skill instructions in `skills/` contain zero hardcoded dependencies on any single proprietary tool API.

Instead, the `adapters/` directory defines how different AI agent runtimes map AURA's conceptual tasks (such as visual inspection, interactive checkpoints, subagent delegation, and terminal execution) to their native capabilities:

```text
┌────────────────────────────────────────────────────────┐
│                      AURA SKILLS                       │
│ (website-orchestrator, signature-art-direction, etc.)  │
└───────────────────────────┬────────────────────────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
    ┌──────────────────────┐  ┌──────────────────────┐
    │  Execution Adapters  │  │ Visual/Check Adapters│
    └──────────┬───────────┘  └──────────┬───────────┘
               │                         │
  ┌────────────┼─────────────┬───────────┼─────────────┐
  ▼            ▼             ▼           ▼             ▼
Antigravity  Claude Code   Cursor    Windsurf      CLI / Manual
```

---

## 2. Core Abstract Capabilities Mapped by Adapters

| Abstract AURA Capability | Antigravity | Claude Code | Cursor / Windsurf | Headless / Terminal Fallback |
| :--- | :--- | :--- | :--- | :--- |
| **Specialist Delegation** | `invoke_subagent` | Subagents / Task tools | Multi-turn composer prompts | Sequential persona assumption in single session |
| **Human Checkpoint** | Direct chat halt / `ask_question` | Direct terminal halt / Ask prompt | Composer chat wait | Stop output and await user message |
| **Visual Inspection** | `read_browser_page` / Screenshot | Playwright CLI + image read | Local browser + dev inspect | Static CSS/DOM audit + manual dev URL instructions |
| **Decision Logging** | File edit tools (`write_to_file`) | File edit tools | Editor modifications | Direct file append |
| **Quality Verification** | `run_command` (npm/npx) | Bash execution tool | Terminal execution | Local CLI run instructions |

---

## 3. Honest Fallback Guarantee

Whenever an agent operates in an environment lacking native browser rendering, visual screenshot capture, or headless automation:

1. **Explicit Disclosure**: The agent must explicitly note the environmental limitation.
2. **Deterministic Static Audit**: The agent executes rigorous code-level inspections (checking for fluid `clamp()`, negative margins, container queries, and landmark semantics).
3. **Reproducible Local Instructions**: The agent provides exact instructions for the human developer to launch and visually inspect the page locally.
4. **Never Simulate Verification**: The agent never claims visual rendering was confirmed unless an actual screenshot or browser capture was inspected.

For detailed runtime instructions and environment-specific prompt recipes, see [`agent-specific-notes.md`](agent-specific-notes.md).
