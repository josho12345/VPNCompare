#!/usr/bin/env node
/**
 * ============================================================
 * VPN COMPARE — LINK HEALTH CHECK  (link-check.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * WHAT THIS DOES
 * Reads every affiliate link from script.js's vpns[] and
 * deals[] arrays, follows each one's redirect chain, and
 * checks two things:
 *   1. The final response is a real success (not a 404/500/
 *      timeout)
 *   2. The final URL actually lands on the expected provider's
 *      domain (catches a hijacked, expired, or silently-
 *      changed affiliate link redirecting somewhere it
 *      shouldn't)
 *
 * This is lower-risk to automate than price-scraping — status
 * codes and hostnames are unambiguous, unlike multi-tier
 * pricing. Still flags-only, doesn't edit anything.
 *
 * Run from GitHub Actions (price-watch.yml) or locally:
 *   node automation/link-check.js
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

const SOURCES      = require('./price-sources.js'); // for expected domain per id
const SCRIPT_FILE  = path.join(__dirname, '..', 'script.js');
const RESULT_FILE  = path.join(__dirname, 'link-check-result.json');

// ── Pure logic (testable without network) ──────────────────────

/**
 * Checks whether a final redirected URL's hostname matches the
 * expected provider domain. Allows subdomains (e.g.
 * "go.nordvpn.net" redirecting to "my.nordvpn.com" — checks the
 * registrable domain is contained, not exact host match).
 */
function hostnameMatches(finalUrl, expectedDomain) {
  try {
    const host = new URL(finalUrl).hostname.toLowerCase();
    return host === expectedDomain || host.endsWith('.' + expectedDomain);
  } catch {
    return false;
  }
}

/**
 * Extracts {id, link} pairs from script.js's vpns array and
 * deals array, by loading script.js's literal array text and
 * require()-ing it as data (same technique used in
 * update-site.js) — never executes script.js as a whole, just
 * pulls the two array literals out as plain data.
 */
function extractLinksFromScript(scriptContent) {
  const links = [];

  // vpns array
  const vpnsStart = scriptContent.indexOf('const vpns = [');
  if (vpnsStart !== -1) {
    const vpnsEnd = scriptContent.indexOf('\n];', vpnsStart) + 3;
    const block = scriptContent.slice(vpnsStart, vpnsEnd).replace('const vpns', 'module.exports');
    const tmpFile = path.join(require('os').tmpdir(), `__vpns_extract_${Date.now()}.js`);
    fs.writeFileSync(tmpFile, block);
    const vpns = require(tmpFile);
    fs.unlinkSync(tmpFile);
    vpns.forEach(v => links.push({ id: v.id, source: 'vpns[]', link: v.link }));
  }

  // deals array
  const dealsStart = scriptContent.indexOf('const deals=[');
  if (dealsStart !== -1) {
    const dealsEnd = scriptContent.indexOf('\n];', dealsStart) + 3;
    const block = scriptContent.slice(dealsStart, dealsEnd).replace('const deals', 'module.exports');
    const tmpFile = path.join(require('os').tmpdir(), `__deals_extract_${Date.now()}.js`);
    fs.writeFileSync(tmpFile, block);
    const deals = require(tmpFile);
    fs.unlinkSync(tmpFile);
    deals.forEach(d => links.push({ id: d.name.toLowerCase().replace(/\s+/g, ''), source: 'deals[]', link: d.link }));
  }

  return links;
}

// ── Network I/O ──────────────────────────────────────────────
async function checkLink(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VPNCompare-LinkCheck/1.0; +https://bestvpncompareonline.com)' },
    });
    clearTimeout(timeout);
    return { status: res.status, ok: res.ok, finalUrl: res.url };
  } catch (err) {
    clearTimeout(timeout);
    return { error: err.name === 'AbortError' ? 'Timed out after 15s' : String(err.message || err) };
  }
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  const scriptContent = fs.readFileSync(SCRIPT_FILE, 'utf8');
  const links = extractLinksFromScript(scriptContent);

  console.log(`Found ${links.length} links to check (vpns[] + deals[]).\n`);

  const problems = [];

  for (const { id, source, link } of links) {
    console.log(`Checking ${id} (${source})...`);
    const result = await checkLink(link);
    const expectedDomain = SOURCES[id]?.domain;

    if (result.error) {
      problems.push({ id, source, link, issue: `Request failed: ${result.error}` });
      continue;
    }
    if (!result.ok) {
      problems.push({ id, source, link, issue: `HTTP ${result.status}`, finalUrl: result.finalUrl });
      continue;
    }
    if (expectedDomain && !hostnameMatches(result.finalUrl, expectedDomain)) {
      problems.push({
        id, source, link,
        issue: `Redirects to unexpected domain — expected "${expectedDomain}", got "${new URL(result.finalUrl).hostname}"`,
        finalUrl: result.finalUrl,
      });
    }
  }

  fs.writeFileSync(RESULT_FILE, JSON.stringify({ problems, checkedAt: new Date().toISOString(), totalChecked: links.length }, null, 2) + '\n', 'utf8');

  console.log(`\n════════════════════════════════════════`);
  console.log(`🔗  Link check complete: ${links.length} checked, ${problems.length} problem(s) found.`);
  problems.forEach(p => console.log(`  ⚠️  ${p.id} (${p.source}): ${p.issue}`));
  console.log(`════════════════════════════════════════\n`);
}

if (require.main === module) {
  main().catch(err => { console.error('Fatal error:', err); process.exit(1); });
}
module.exports = { hostnameMatches, extractLinksFromScript };
