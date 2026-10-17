import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

export const SUSPICIOUS_PATTERNS = [
  { name: 'Unbracketed Focal Length / Lens Spec', regex: /\b\d{2,3}mm\s+(?:tilt-shift|f\/\d|lens)\b/i, isHardFailure: true },
  { name: 'Unbracketed Aperture / Shutter Spec', regex: /\bf\/\d+(?:\.\d+)?\s+@\s+\d+\/\d+s?\b/i, isHardFailure: true },
  { name: 'Unbracketed ISO Spec', regex: /\bISO\s*\d{2,5}\b/i, isHardFailure: true },
  { name: 'Unbracketed Coordinates / GPS Data', regex: /\b(?:LAT|LON|LATITUDE|LONGITUDE)\s*:\s*[\d.]+/i, isHardFailure: true },
  { name: 'Decorative Plate Index / Techno-Chaff', regex: /\bPLATE\s*(?:NO\.?)?\s*\d{2,3}\b/i, isHardFailure: true },
  { name: 'Generic Lorem Ipsum Filler', regex: /\blorem\s+ipsum\b/i, isHardFailure: true },
  { name: 'Fabricated Client Testimonial Cliché', regex: /\b(client\s+testimonial|client\s+review|5\s+stars?|customer\s+satisfaction\s+rate)\b/i, isHardFailure: false }
];

/**
 * Scan DOM text or HTML content for suspicious unbracketed techno-metadata or fabricated claims.
 * Bracketed content ([...]) is excluded to permit transparent, dignified placeholders.
 * 
 * @param {string} domString - HTML / DOM content to scan
 * @returns {Array<{pattern: string, match: string, isHardFailure: boolean}>}
 */
export function scanAuthenticity(domString) {
  // Strip content inside explicit brackets [...] first so declared placeholders are not falsely flagged
  const unbracketedText = domString.replace(/\[[\s\S]*?\]/g, '');

  const warnings = [];
  for (const pat of SUSPICIOUS_PATTERNS) {
    const matches = unbracketedText.match(pat.regex);
    if (matches) {
      warnings.push({
        pattern: pat.name,
        match: matches[0],
        isHardFailure: pat.isHardFailure
      });
    }
  }
  return warnings;
}

// CLI runner when executed directly: node scripts/audit-content-authenticity.mjs [filePath]
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const targetFile = process.argv[2] 
    ? path.resolve(process.cwd(), process.argv[2])
    : path.join(repoRoot, 'projects', 'measured-light', 'index.html');

  if (!fs.existsSync(targetFile)) {
    console.error(`Error: Target file not found: ${targetFile}`);
    process.exit(1);
  }

  console.log(`Scanning for content authenticity: ${path.relative(repoRoot, targetFile)}...`);
  const content = fs.readFileSync(targetFile, 'utf8');
  const warnings = scanAuthenticity(content);

  if (warnings.length === 0) {
    console.log('✓ PASS: Zero unbracketed suspicious technical specs or placeholder violations found.');
    process.exit(0);
  } else {
    console.warn(`! Found ${warnings.length} authenticity warning(s):`);
    let hardFailures = 0;
    for (const w of warnings) {
      console.warn(`  - [${w.pattern}]: "${w.match}" (Hard failure: ${w.isHardFailure})`);
      if (w.isHardFailure) hardFailures++;
    }
    if (hardFailures > 0) {
      console.error(`✗ FAIL: ${hardFailures} hard authenticity failure(s) detected.`);
      process.exit(1);
    } else {
      console.log('⚠ NOTICE: Warnings require human semantic verification against DESIGN-DECISION-LOG.md.');
      process.exit(0);
    }
  }
}
