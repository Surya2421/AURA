import { spawn } from 'node:child_process';
import fs from 'node:fs';

async function main() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=D:\\AURA\\.chrome_cdp_profile',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  // Wait for DevTools port to open
  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch {}
  }

  if (!wsUrl) {
    console.error('Could not connect to Chrome CDP');
    chrome.kill();
    process.exit(1);
  }

  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  let id = 1;
  const callbacks = new Map();
  const consoleLogs = [];
  const runtimeErrors = [];

  ws.addEventListener('message', e => {
    const msg = JSON.parse(e.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push(msg.params.args.map(a => a.value).join(' '));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      runtimeErrors.push(msg.params.exceptionDetails.text);
    }
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

  // Create new target
  const { result: { targetId } } = await send('Target.createTarget', { url: 'http://localhost:3000' });
  const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });

  await send('Page.enable', {}, sessionId);
  await send('DOM.enable', {}, sessionId);
  await send('Runtime.enable', {}, sessionId);

  // 1. Mobile capture (375 x 812) - Narrow mobile standard (iPhone Mini/X/13 Mini)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  }, sessionId);

  await send('Page.navigate', { url: 'http://localhost:3000' }, sessionId);
  await new Promise(r => setTimeout(r, 1200));

  // Run DOM overflow check across multiple viewports
  const overflowCheckResults = {};
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
    overflowCheckResults[`${w}px`] = evalRes.result?.result?.value;
  }
  console.log('Multi-viewport Overflow Checks:', JSON.stringify(overflowCheckResults, null, 2));

  // Reset back to mobile (375 x 812) for screenshot
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  }, sessionId);
  await new Promise(r => setTimeout(r, 500));
  const mobileShot = await send('Page.captureScreenshot', { format: 'png' }, sessionId);
  fs.writeFileSync('D:/AURA/projects/measured-light/mobile.png', Buffer.from(mobileShot.result.data, 'base64'));
  console.log('Mobile (375px) screenshot saved to D:/AURA/projects/measured-light/mobile.png');

  // 2. Wider Mobile capture (414 x 896)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 414,
    height: 896,
    deviceScaleFactor: 2,
    mobile: true
  }, sessionId);
  await new Promise(r => setTimeout(r, 600));
  const wideMobileShot = await send('Page.captureScreenshot', { format: 'png' }, sessionId);
  fs.writeFileSync('D:/AURA/projects/measured-light/mobile-wide.png', Buffer.from(wideMobileShot.result.data, 'base64'));
  console.log('Wider mobile (414px) screenshot saved to D:/AURA/projects/measured-light/mobile-wide.png');

  // 3. Functional Interaction Verification
  // Test 3a: Filter click
  const filterTestRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const civicBtn = document.querySelector('[data-filter="civic"]');
      if (!civicBtn) return { error: 'filter button missing' };
      civicBtn.click();
      const allCards = document.querySelectorAll('.archive-card');
      const hiddenCards = document.querySelectorAll('.archive-card.is-hidden');
      const visibleCivic = document.querySelectorAll('.archive-card[data-typology="civic"]:not(.is-hidden)');
      // Reset filter back to all
      document.querySelector('[data-filter="all"]').click();
      return { total: allCards.length, hiddenOnCivic: hiddenCards.length, visibleCivic: visibleCivic.length };
    })()`,
    returnByValue: true
  }, sessionId);
  console.log('Interactive Filter Test Result:', filterTestRes.result?.result?.value);

  // Test 3b: Form validation & submission
  const formTestRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const form = document.getElementById('commission-form');
      const submitBtn = document.getElementById('submit-inquiry-btn');
      const nameInput = document.getElementById('client-name');
      const emailInput = document.getElementById('client-email');
      const typologySelect = document.getElementById('project-typology');
      
      // Submit empty to trigger validation
      submitBtn.click();
      const nameInvalid = nameInput.classList.contains('is-invalid');
      
      // Fill and submit valid
      nameInput.value = 'Studio Atelier Test';
      emailInput.value = 'inquiry@atelier-test.com';
      typologySelect.value = 'cultural';
      submitBtn.click();
      
      return { validationTriggered: nameInvalid, filledAndSubmitted: true };
    })()`,
    returnByValue: true
  }, sessionId);
  console.log('Interactive Form Test Result:', formTestRes.result?.result?.value);

  // Wait 700ms for form success notification to display
  await new Promise(r => setTimeout(r, 700));

  // 4. Desktop full-page capture
  // Measure full document height
  const docHeightRes = await send('Runtime.evaluate', {
    expression: 'Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)',
    returnByValue: true
  }, sessionId);
  const fullPageHeight = docHeightRes.result?.result?.value || 4200;
  console.log('Full Page Desktop Height:', fullPageHeight);

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: fullPageHeight,
    deviceScaleFactor: 1,
    mobile: false
  }, sessionId);
  await new Promise(r => setTimeout(r, 1200));

  const desktopShot = await send('Page.captureScreenshot', { format: 'png' }, sessionId);
  fs.writeFileSync('D:/AURA/projects/measured-light/desktop-full.png', Buffer.from(desktopShot.result.data, 'base64'));
  console.log('Desktop full-page screenshot saved to D:/AURA/projects/measured-light/desktop-full.png');

  console.log('Runtime Errors Count:', runtimeErrors.length);
  if (runtimeErrors.length > 0) {
    console.error('Runtime Errors:', runtimeErrors);
  }

  ws.close();
  chrome.kill();
  console.log('Stage 6 multi-viewport visual QA and functional verification complete!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
