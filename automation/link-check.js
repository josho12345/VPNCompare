#!/usr/bin/env node
/**
 * ============================================================
 * VPN COMPARE - LINK HEALTH CHECK  (link-check.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * Reads every affiliate link from script.js vpns[] and deals[],
 * follows each redirect chain, and checks:
 *   1. Final response is a real success (not 404/500/timeout)
 *   2. Final URL lands on the expected provider domain
 *
 * VPNs with skipLinkCheck: true in price-sources.js are skipped
 * (e.g. NordVPN -- CDN blocks GitHub Actions IPs with 403,
 * causing false positives every run).
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

const SOURCES      = require('./price-sources.js');
const SCRIPT_FILE  = path.join(__dirname, '..', 'script.js');
const RESULT_FILE  = path.join(__dirname, 'link-check-result.json');

function hostnameMatches(finalUrl, expectedDomain) {
  try {
    const host = new URL(finalUrl).hostname.toLowerCase();
    return host === expectedDomain || host.endsWith('.' + expectedDomain);
  } catch {
    return false;
  }
}

function extractLinksFromScript(scriptContent) {
  const links = [];

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

async function main() {
  const scriptContent = fs.readFileSync(SCRIPT_FILE, 'utf8');
  const links = extractLinksFromScript(scriptContent);

  console.log(`Found ${links.length} links to check (vpns[] + deals[]).\n`);

  const problems = [];
  const skipped  = [];

  for (const { id, source, link } of links) {
    // Skip VPNs whose CDN blocks GitHub Actions IPs -- false positive every run
    if (SOURCES[id]?.skipLinkCheck) {
      console.log(`Skipping ${id} (${source}) -- skipLinkCheck=true (verify manually)`);
      skipped.push({ id, source, reason: 'skipLinkCheck -- CDN blocks automated checks' });
      continue;
    }

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
        issue: `Redirects to unexpected domain -- expected "${expectedDomain}", got "${new URL(result.finalUrl).hostname}"`,
        finalUrl: result.finalUrl,
      });
    }
  }

  fs.writeFileSync(
    RESULT_FILE,
    JSON.stringify({ problems, skipped, checkedAt: new Date().toISOString(), totalChecked: links.length }, null, 2) + '\n',
    'utf8'
  );

  console.log(`\n=====================================`);
  console.log(`Link check complete: ${links.length} found, ${skipped.length} skipped, ${problems.length} problem(s).`);
  problems.forEach(p => console.log(`  WARNING  ${p.id} (${p.source}): ${p.issue}`));
  console.log(`=====================================\n`);
}

if (require.main === module) {
  main().catch(err => { console.error('Fatal error:', err); process.exit(1); });
}
module.exports = { hostnameMatches, extractLinksFromScript };
