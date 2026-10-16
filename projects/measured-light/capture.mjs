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

  // Create new target
  const { result: { targetId } } = await send('Target.createTarget', { url: 'http://localhost:3000' });
  const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });

  await send('Page.enable', {}, sessionId);
  await send('DOM.enable', {}, sessionId);

  // 1. Mobile capture (375 x 900)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 900,
    deviceScaleFactor: 2,
    mobile: true
  }, sessionId);

  await send('Page.navigate', { url: 'http://localhost:3000' }, sessionId);
  await new Promise(r => setTimeout(r, 1500));

  const mobileShot = await send('Page.captureScreenshot', { format: 'png' }, sessionId);
  fs.writeFileSync('D:/AURA/projects/measured-light/mobile.png', Buffer.from(mobileShot.result.data, 'base64'));
  console.log('Mobile screenshot saved to D:/AURA/projects/measured-light/mobile.png');

  // 2. Desktop capture (1440 x 2200)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 2200,
    deviceScaleFactor: 1,
    mobile: false
  }, sessionId);

  await new Promise(r => setTimeout(r, 1000));
  const desktopShot = await send('Page.captureScreenshot', { format: 'png' }, sessionId);
  fs.writeFileSync('D:/AURA/projects/measured-light/desktop-full.png', Buffer.from(desktopShot.result.data, 'base64'));
  console.log('Desktop screenshot saved to D:/AURA/projects/measured-light/desktop-full.png');

  ws.close();
  chrome.kill();
  console.log('Capture complete!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
