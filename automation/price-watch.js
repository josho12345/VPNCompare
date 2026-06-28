#!/usr/bin/env node
/**
 * ============================================================
 * VPN COMPARE - PRICE WATCH  (price-watch.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * For each provider in price-sources.js, fetches the pricing
 * page and extracts every price-like token. Diffs the token
 * SET against last run's snapshot. Flags changes for review --
 * never auto-publishes (that's auto-update.js's job).
 *
 * Sources with skipPriceWatch: true are silently skipped
 * (e.g. NordVPN -- CDN returns 403 to GitHub Actions IPs).
 * Sources with jsRendered: true are silently skipped when
 * zero tokens are found (prices load via JavaScript).
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

const SOURCES        = require('./price-sources.js');
const SNAPSHOT_FILE  = path.join(__dirname, 'price-snapshots.json');
const RESULT_FILE    = path.join(__dirname, 'price-watch-result.json');

function extractPriceTokens(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  const matches = stripped.match(/[$\u20ac\xa3]\s?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?/g) || [];
  const normalised = matches.map(m => m.replace(/\s+/g, ''));
  return [...new Set(normalised)].sort();
}

function diffTokens(oldTokens, newTokens) {
  const oldSet = new Set(oldTokens || []);
  const newSet = new Set(newTokens || []);
  const added   = newTokens.filter(t => !oldSet.has(t));
  const removed = (oldTokens || []).filter(t => !newSet.has(t));
  if (added.length === 0 && removed.length === 0) return null;
  return { added, removed };
}

async function fetchPriceTokens(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VPNCompare-PriceWatch/1.0; +https://bestvpncompareonline.com)' },
    });
    clearTimeout(timeout);
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const html = await res.text();
    const tokens = extractPriceTokens(html);
    if (tokens.length === 0) return { error: 'Fetched OK but found zero price-like tokens -- page may be JS-rendered' };
    return { tokens };
  } catch (err) {
    clearTimeout(timeout);
    return { error: err.name === 'AbortError' ? 'Timed out after 15s' : String(err.message || err) };
  }
}

async function main() {
  const oldSnapshot = fs.existsSync(SNAPSHOT_FILE)
    ? JSON.parse(fs.readFileSync(SNAPSHOT_FILE, 'utf8'))
    : {};

  const newSnapshot = {};
  const changes = [];
  const errors  = [];

  for (const [id, source] of Object.entries(SOURCES)) {
    // Skip VPNs whose CDN blocks automated fetches -- prevents false error noise
    if (source.skipPriceWatch) {
      console.log(`Skipping ${source.name} (skipPriceWatch=true -- verify manually)`);
      if (oldSnapshot[id]) newSnapshot[id] = oldSnapshot[id];
      continue;
    }

    console.log(`Checking ${source.name}...`);
    const result = await fetchPriceTokens(source.pricingUrl);

    if (result.error) {
      // JS-rendered pages always return zero tokens -- expected, not an error
      if (source.jsRendered) {
        if (oldSnapshot[id]) newSnapshot[id] = oldSnapshot[id];
        continue;
      }
      errors.push({ id, name: source.name, url: source.pricingUrl, error: result.error });
      if (oldSnapshot[id]) newSnapshot[id] = oldSnapshot[id];
      continue;
    }

    newSnapshot[id] = result.tokens;
    const diff = diffTokens(oldSnapshot[id], result.tokens);
    if (diff) changes.push({ id, name: source.name, url: source.pricingUrl, ...diff });
  }

  fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(newSnapshot, null, 2) + '\n', 'utf8');
  fs.writeFileSync(RESULT_FILE, JSON.stringify({ changes, errors, checkedAt: new Date().toISOString() }, null, 2) + '\n', 'utf8');

  console.log(`\n=====================================`);
  console.log(`Price watch complete: ${changes.length} changed, ${errors.length} error(s).`);
  if (changes.length) {
    changes.forEach(c => {
      console.log(`\n  ${c.name}:`);
      if (c.added.length)   console.log(`    + new:  ${c.added.join(', ')}`);
      if (c.removed.length) console.log(`    - gone: ${c.removed.join(', ')}`);
    });
  }
  if (errors.length) {
    console.log(`\n  Fetch errors:`);
    errors.forEach(e => console.log(`  ${e.name}: ${e.error} (${e.url})`));
  }
  console.log(`=====================================\n`);
}

if (require.main === module) {
  main().catch(err => { console.error('Fatal error:', err); process.exit(1); });
}
module.exports = { extractPriceTokens, diffTokens };
