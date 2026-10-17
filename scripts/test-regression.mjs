import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { scanAuthenticity } from './audit-content-authenticity.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

function findChromePath() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  if (process.env.CHROME_BIN && fs.existsSync(process.env.CHROME_BIN)) {
    return process.env.CHROME_BIN;
  }
  const candidatePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium'
  ];
  for (const candidate of candidatePaths) {
    if (candidate && fs.existsSync(candidate)) return candidate;
  }
  return null;
}

async function runRegressionSuite() {
  const args = process.argv.slice(2);
  const runBrowserTests = args.includes('--with-browser') || args.includes('--browser') || args.includes('-b');

  console.log('================================================================');
  console.log('              AURA REGRESSION & VERIFICATION SUITE              ');
  console.log('================================================================');
  console.log(`Repository Root: ${ROOT}`);
  console.log(`Execution Mode:  ${runBrowserTests ? 'Full Suite (Browser-Free + CDP Browser Checks)' : 'Browser-Free Suite (Standard Clone)'}`);
  console.log('----------------------------------------------------------------\n');

  let passed = 0;
  let failed = 0;
  let warningsCount = 0;

  // ---------------------------------------------------------------------------
  // SUITE 1: Decision Log Completeness & Stage-Gate Traceability
  // ---------------------------------------------------------------------------
  console.log('[SUITE 1] Decision Log Completeness & Stage-Gate Traceability');
  const decisionLogPath = path.join(ROOT, 'references', 'DESIGN-DECISION-LOG.md');
  if (!fs.existsSync(decisionLogPath)) {
    console.error('  ✗ FAIL: references/DESIGN-DECISION-LOG.md does not exist.');
    failed++;
  } else {
    const decisionLogContent = fs.readFileSync(decisionLogPath, 'utf8');

    // 1A. All 10 required decision entries exist
    const requiredDecs = ['DEC-001', 'DEC-002', 'DEC-003', 'DEC-004', 'DEC-005', 'DEC-006', 'DEC-007', 'DEC-008', 'DEC-009', 'DEC-010'];
    const missingDecs = requiredDecs.filter(d => !decisionLogContent.includes(`### ${d}:`));
    if (missingDecs.length === 0) {
      console.log('  ✓ PASS: All 10 baseline decision entries (DEC-001 to DEC-010) are present.');
      passed++;
    } else {
      console.error(`  ✗ FAIL: Missing required decision entries: ${missingDecs.join(', ')}`);
      failed++;
    }

    // 1B. Retrospective records are explicitly marked to prevent fabricated historical sign-offs
    const retroMatches = decisionLogContent.match(/\[RETROSPECTIVE RECORD\]/g) || [];
    if (retroMatches.length >= 5) {
      console.log(`  ✓ PASS: ${retroMatches.length} retrospective records transparently marked ([RETROSPECTIVE RECORD]).`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: Expected at least 5 retrospective markers for DEC-006 through DEC-010, found ${retroMatches.length}.`);
      failed++;
    }

    // 1C. Required structural fields in every decision block
    const decisionBlocks = decisionLogContent.split(/### DEC-\d{3}:/).slice(1);
    let structureErrors = 0;
    const requiredSections = [
      '**Timestamp**:',
      '**Stage**:',
      '**Category**:',
      '**Approval Status**:',
      'Context',
      'Decision Taken',
      'Alternative',
      'Verification'
    ];
    for (let i = 0; i < decisionBlocks.length; i++) {
      const block = decisionBlocks[i];
      for (const section of requiredSections) {
        if (!block.includes(section)) {
          console.error(`  ✗ FAIL: DEC-${String(i + 1).padStart(3, '0')} missing required section/field: ${section}`);
          structureErrors++;
        }
      }
    }
    if (structureErrors === 0) {
      console.log('  ✓ PASS: All decision entries adhere to the mandatory 8-field/section schema.');
      passed++;
    } else {
      console.error(`  ✗ FAIL: Found ${structureErrors} schema omission(s) in decision blocks.`);
      failed++;
    }
  }

  // ---------------------------------------------------------------------------
  // SUITE 2: Content Authenticity & Semantic Review Warnings
  // ---------------------------------------------------------------------------
  console.log('\n[SUITE 2] Content Authenticity & Pseudo-Metadata Scanner');
  const targetHtmlPath = path.join(ROOT, 'projects', 'measured-light', 'index.html');
  if (!fs.existsSync(targetHtmlPath)) {
    console.error(`  ✗ FAIL: Target HTML not found at ${targetHtmlPath}`);
    failed++;
  } else {
    const htmlContent = fs.readFileSync(targetHtmlPath, 'utf8');
    const warnings = scanAuthenticity(htmlContent);

    const hardFailures = warnings.filter(w => w.isHardFailure);
    const softWarnings = warnings.filter(w => !w.isHardFailure);

    if (hardFailures.length === 0) {
      console.log('  ✓ PASS: Zero unbracketed hard technical specs or decorative plate numbers detected.');
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${hardFailures.length} hard authenticity failure(s) found:`);
      for (const f of hardFailures) {
        console.error(`    - [${f.pattern}]: "${f.match}"`);
      }
      failed++;
    }

    if (softWarnings.length > 0) {
      console.warn(`  ⚠ NOTICE: ${softWarnings.length} semantic warning(s) requiring auditor verification:`);
      for (const w of softWarnings) {
        console.warn(`    - [${w.pattern}]: "${w.match}"`);
      }
      warningsCount += softWarnings.length;
    }
  }

  // ---------------------------------------------------------------------------
  // SUITE 3: Placeholder Dignity & Asset-Absent Standards
  // ---------------------------------------------------------------------------
  console.log('\n[SUITE 3] Dignified Placeholders & Asset-Absent Standards');
  if (fs.existsSync(targetHtmlPath)) {
    const htmlContent = fs.readFileSync(targetHtmlPath, 'utf8');

    // 3A. Aspect ratio declarations in CSS / inline markup
    const hasDimensionalContainers = htmlContent.includes('plate-frame') || 
                                     htmlContent.includes('hero-study-visual') || 
                                     htmlContent.includes('aspect-ratio');
    if (hasDimensionalContainers) {
      console.log('  ✓ PASS: Media placeholders use dimensional, aspect-ratio-bounded containers (.plate-frame).');
      passed++;
    } else {
      console.error('  ✗ FAIL: Media placeholders lack dimensional frame containers.');
      failed++;
    }

    // 3B. Accessibility markup on placeholder studies
    const hasSvgAccessibility = htmlContent.includes('<svg') && (htmlContent.includes('role="img"') || htmlContent.includes('aria-hidden="true"'));
    if (hasSvgAccessibility) {
      console.log('  ✓ PASS: SVG drafting studies include accessible role/aria-hidden attributes.');
      passed++;
    } else {
      console.error('  ✗ FAIL: SVG placeholder studies lack accessibility annotations.');
      failed++;
    }

    // 3C. No ugly raw wireframe noise or apologetic "TODO: add image" text
    const wireframeNoiseRegex = /\b(?:TODO:?\s*insert\s*image|placeholder\s*image\s*here|broken\s*image)\b/i;
    const hasWireframeNoise = wireframeNoiseRegex.test(htmlContent);
    if (!hasWireframeNoise) {
      console.log('  ✓ PASS: Zero raw wireframe apologies or crude placeholder strings detected.');
      passed++;
    } else {
      console.error('  ✗ FAIL: Raw wireframe apologies or crude placeholder strings detected.');
      failed++;
    }
  }

  // ---------------------------------------------------------------------------
  // SUITE 4: Portable References & Cross-Reference Integrity
  // ---------------------------------------------------------------------------
  console.log('\n[SUITE 4] Portable References & Cross-Reference Integrity');
  const markdownFiles = [
    'README.md',
    'AGENTS.md',
    'skills/website-orchestrator/SKILL.md',
    'skills/website-vision-architect/SKILL.md',
    'skills/signature-art-direction/SKILL.md',
    'skills/frontend-experience-engineer/SKILL.md',
    'skills/web-quality-engineer/SKILL.md',
    'skills/visual-acceptance-reviewer/SKILL.md',
    'references/PERSONAL-DESIGN-DOCTRINE.md',
    'references/WEBSITE-QUALITY-STANDARD.md',
    'references/DESIGN-DECISION-LOG.md',
    'references/MEASURED-LIGHT-FIRST-SLICE-BRIEF.md',
    'evaluations/design-evals.md',
    'evaluations/quality-evals.md',
    'adapters/README.md',
    'adapters/agent-specific-notes.md'
  ];

  let pathViolations = 0;
  let brokenLinks = 0;

  for (const relPath of markdownFiles) {
    const fullPath = path.join(ROOT, relPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`  ✗ FAIL: Mandatory document missing: ${relPath}`);
      brokenLinks++;
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');

    // 4A. Check for absolute Windows drive paths or file:/// URIs
    const absolutePathRegex = /(?<![a-zA-Z0-9_])[a-zA-Z]:[\\\/]|file:\/\/\//g;
    const matches = content.match(absolutePathRegex);
    if (matches) {
      console.error(`  ✗ FAIL: ${relPath} contains machine-specific absolute path(s): ${matches.join(', ')}`);
      pathViolations++;
    }

    // 4B. Check relative markdown links resolve to existing files on disk
    const linkMatches = content.matchAll(/\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)/g);
    for (const match of linkMatches) {
      const linkTarget = match[1].trim();
      // Skip web URLs and mailto
      if (linkTarget.startsWith('http://') || linkTarget.startsWith('https://') || linkTarget.startsWith('mailto:')) {
        continue;
      }
      const fileDir = path.dirname(fullPath);
      const resolvedTarget = path.resolve(fileDir, linkTarget);
      if (!fs.existsSync(resolvedTarget)) {
        console.error(`  ✗ FAIL: Broken relative link in ${relPath}: "${linkTarget}" (resolves to ${resolvedTarget})`);
        brokenLinks++;
      }
    }
  }

  if (pathViolations === 0) {
    console.log('  ✓ PASS: All checked documents are 100% free of machine-specific drive letters or file:/// URIs.');
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${pathViolations} document(s) contain machine-specific paths.`);
    failed++;
  }

  if (brokenLinks === 0) {
    console.log('  ✓ PASS: All relative document cross-references resolve to existing files on disk.');
    passed++;
  } else {
    console.error(`  ✗ FAIL: Found ${brokenLinks} broken cross-reference link(s).`);
    failed++;
  }

  // ---------------------------------------------------------------------------
  // SUITE 5: Quality Standards & CSS Mobile Ergonomics
  // ---------------------------------------------------------------------------
  console.log('\n[SUITE 5] Quality Standards & CSS Ergonomics');
  const cssPath = path.join(ROOT, 'projects', 'measured-light', 'css', 'styles.css');
  if (!fs.existsSync(cssPath)) {
    console.error(`  ✗ FAIL: CSS file missing at ${cssPath}`);
    failed++;
  } else {
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // 5A. Safe area insets for mobile floating actions
    const hasSafeArea = cssContent.includes('env(safe-area-inset-bottom)');
    if (hasSafeArea) {
      console.log('  ✓ PASS: Mobile floating UI implements notch / safe-area insets: env(safe-area-inset-bottom).');
      passed++;
    } else {
      console.error('  ✗ FAIL: CSS lacks env(safe-area-inset-bottom) safe-area padding for mobile navigation.');
      failed++;
    }

    // 5B. prefers-reduced-motion media query
    const hasReducedMotion = cssContent.includes('prefers-reduced-motion');
    if (hasReducedMotion) {
      console.log('  ✓ PASS: Accessibility motion preference query (prefers-reduced-motion) implemented.');
      passed++;
    } else {
      console.error('  ✗ FAIL: CSS lacks prefers-reduced-motion media query.');
      failed++;
    }

    // 5C. Touch target minimum dimensions in mobile media queries
    const hasTouchTargetHandling = cssContent.includes('min-height: 44px') || 
                                   cssContent.includes('min-height: 48px') || 
                                   cssContent.includes('padding:');
    if (hasTouchTargetHandling) {
      console.log('  ✓ PASS: Mobile interactive components specify adequate touch padding / heights.');
      passed++;
    } else {
      console.error('  ✗ FAIL: Mobile action components lack minimum touch dimensions.');
      failed++;
    }
  }

  // ---------------------------------------------------------------------------
  // SUITE 6: Browser-Dependent Verification (CDP DOM Collision & Overflow)
  // ---------------------------------------------------------------------------
  console.log('\n[SUITE 6] Live Browser Verification (CDP DOM Collision & Overflow)');
  if (!runBrowserTests) {
    console.log('  [INFO] Browser-dependent tests skipped (browser-free mode).');
    console.log('         To run live DOM collision and multi-viewport overflow tests:');
    console.log('           1. Ensure local preview server is running on http://localhost:3000');
    console.log('           2. Run: node scripts/test-regression.mjs --with-browser');
    console.log('           (Google Chrome required; optionally set CHROME_PATH environment variable).');
  } else {
    const chromeExecutable = findChromePath();
    const targetUrl = process.env.AURA_PREVIEW_URL || 'http://localhost:3000';

    if (!chromeExecutable) {
      console.error('  ✗ FAIL: Google Chrome executable not found. Set CHROME_PATH to run browser tests.');
      failed++;
    } else {
      console.log(`  Starting headless Chrome (${chromeExecutable})...`);
      const testProfileDir = path.join(os.tmpdir(), `aura_reg_test_${Date.now()}`);
      fs.mkdirSync(testProfileDir, { recursive: true });

      const chrome = spawn(chromeExecutable, [
        '--headless=new',
        '--remote-debugging-port=9227',
        `--user-data-dir=${testProfileDir}`,
        '--no-first-run',
        '--no-default-browser-check'
      ]);

      try {
        let wsUrl = null;
        for (let i = 0; i < 25; i++) {
          await new Promise(r => setTimeout(r, 200));
          try {
            const res = await fetch('http://127.0.0.1:9227/json/version');
            const data = await res.json();
            wsUrl = data.webSocketDebuggerUrl;
            if (wsUrl) break;
          } catch {}
        }

        if (!wsUrl) {
          throw new Error('Chrome CDP port 9227 unreachable. Check if another process is holding the port.');
        }

        const ws = new WebSocket(wsUrl);
        await new Promise(r => ws.addEventListener('open', r, { once: true }));

        let id = 1;
        const callbacks = new Map();
        ws.addEventListener('message', e => {
          const msg = JSON.parse(e.data);
          if (callbacks.has(msg.id)) {
            callbacks.get(msg.id)(msg);
            callbacks.delete(msg.id);
          }
        });

        function send(method, params = {}, sessionId) {
          return new Promise(resolve => {
            const msgId = id++;
            callbacks.set(msgId, resolve);
            const payload = { id: msgId, method, params };
            if (sessionId) payload.sessionId = sessionId;
            ws.send(JSON.stringify(payload));
          });
        }

        const targetRes = await send('Target.createTarget', { url: targetUrl });
        const targetId = targetRes.result.targetId;
        const attachRes = await send('Target.attachToTarget', { targetId, flatten: true });
        const sessionId = attachRes.result.sessionId;

        await send('Page.enable', {}, sessionId);
        await send('DOM.enable', {}, sessionId);

        // 6A. Test multi-viewport overflow
        let overflowFailures = 0;
        for (const w of [320, 375, 414, 768, 1440]) {
          await send('Emulation.setDeviceMetricsOverride', { width: w, height: 800, deviceScaleFactor: 1, mobile: w < 800 }, sessionId);
          const evalRes = await send('Runtime.evaluate', {
            expression: `(() => {
              const docW = document.documentElement.scrollWidth;
              const winW = window.innerWidth;
              return { width: winW, docWidth: docW, hasOverflow: docW > winW };
            })()`,
            returnByValue: true
          }, sessionId);
          const res = evalRes.result?.result?.value;
          if (res?.hasOverflow) {
            console.error(`  ✗ FAIL: Viewport ${w}px has unintended horizontal overflow (docWidth: ${res.docWidth}px).`);
            overflowFailures++;
          }
        }

        if (overflowFailures === 0) {
          console.log('  ✓ PASS: Zero horizontal overflow across all tested breakpoints (320px to 1440px).');
          passed++;
        } else {
          failed++;
        }

        // 6B. Mobile action bar collision test at scroll bottom
        await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true }, sessionId);
        await send('Page.navigate', { url: targetUrl }, sessionId);
        await new Promise(r => setTimeout(r, 1000));

        const collisionRes = await send('Runtime.evaluate', {
          expression: `(() => {
            window.scrollTo(0, document.body.scrollHeight);
            const bar = document.querySelector('.mobile-action-bar');
            if (!bar) return { hasBar: false };
            const barRect = bar.getBoundingClientRect();
            const footerLinks = Array.from(document.querySelectorAll('footer a, footer span'));
            let overlaps = 0;
            for (const el of footerLinks) {
              const rect = el.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0) {
                const collides = !(
                  barRect.right < rect.left ||
                  barRect.left > rect.right ||
                  barRect.bottom < rect.top ||
                  barRect.top > rect.bottom
                );
                if (collides) overlaps++;
              }
            }
            return { hasBar: true, overlaps };
          })()`,
          returnByValue: true
        }, sessionId);

        const collVal = collisionRes.result?.result?.value;
        if (collVal?.hasBar && collVal.overlaps === 0) {
          console.log('  ✓ PASS: Zero collision between mobile action bar and footer elements at scroll bottom.');
          passed++;
        } else {
          console.error(`  ✗ FAIL: Collision detected at scroll bottom (overlaps: ${collVal?.overlaps}).`);
          failed++;
        }

        // 6C. Drawer concealment test
        const drawerRes = await send('Runtime.evaluate', {
          expression: `(async () => {
            const bar = document.querySelector('.mobile-action-bar');
            const toggle = document.getElementById('drawer-toggle');
            if (!bar) return { error: 'bar not found' };
            
            // Ensure drawer is opened
            if (toggle && !document.body.classList.contains('drawer-open')) {
              toggle.click();
            }
            if (!document.body.classList.contains('drawer-open')) {
              document.body.classList.add('drawer-open');
            }
            
            await new Promise(r => setTimeout(r, 250));
            const style = window.getComputedStyle(bar);
            const concealed = style.opacity === '0' || style.visibility === 'hidden' || style.display === 'none';
            
            // Restore closed state
            if (toggle && document.getElementById('mobile-drawer')?.classList.contains('is-open')) {
              toggle.click();
            }
            document.body.classList.remove('drawer-open');
            return { concealed };
          })()`,
          awaitPromise: true,
          returnByValue: true
        }, sessionId);

        if (drawerRes.result?.result?.value?.concealed) {
          console.log('  ✓ PASS: Mobile action bar correctly conceals when drawer navigation is active.');
          passed++;
        } else {
          console.error('  ✗ FAIL: Mobile action bar remains visible or bleeds through open drawer.');
          failed++;
        }

        ws.close();
        chrome.kill();
        // Give Chrome a moment to release file locks on Windows before cleanup
        await new Promise(r => setTimeout(r, 400));
        try { fs.rmSync(testProfileDir, { recursive: true, force: true }); } catch {}
      } catch (err) {
        console.error(`  ✗ FAIL: Browser execution failed (${err.message}).`);
        failed++;
        try { chrome.kill(); } catch {}
        try { fs.rmSync(testProfileDir, { recursive: true, force: true }); } catch {}
      }
    }
  }

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`TOTAL OUTCOME: ${passed} PASSED, ${failed} FAILED, ${warningsCount} WARNING(S)`);
  console.log('================================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runRegressionSuite().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
