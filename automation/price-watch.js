#!/usr/bin/env node
/**
 * ============================================================
 * VPN COMPARE — PRICE WATCH  (price-watch.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * WHAT THIS DOES
 * For each provider in price-sources.js, fetches their public
 * pricing page and extracts every price-like token ($X.XX,
 * $X, €X.XX, £X.XX) found on the page. Diffs that token SET
 * against last run's saved snapshot. Does NOT try to identify
 * "the" price — multi-tier/region/promo pricing makes that
 * unreliable. Instead it flags "something on this page's
 * pricing changed, here's the full before/after token list"
 * for a human to interpret.
 *
 * NEVER auto-publishes to site-data.js / script.js. Output is
 * informational only — read it, then edit site-data.js by hand
 * and run update-site.js as usual if a change is real.
 *
 * Designed to run from GitHub Actions (price-watch.yml), but
 * also runs locally: `node automation/price-watch.js`
 *
 * No external dependencies — uses Node's built-in fetch
 * (Node 18+) and plain regex, deliberately, to avoid npm
 * install fragility in CI.
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

const SOURCES        = require('./price-sources.js');
const SNAPSHOT_FILE  = path.join(__dirname, 'price-snapshots.json');
const RESULT_FILE    = path.join(__dirname, 'price-watch-result.json'); // consumed by the GH Actions workflow

// ── Pure logic (testable without network) ──────────────────────

/**
 * Extracts every price-like token from raw HTML text.
 * Strips <script>/<style> blocks first so JS/CSS content
 * (analytics IDs, hex colours, etc.) can't produce false
 * matches. Matches $/€/£ followed by a number, optionally
 * with cents and a leading thousands separator.
 */
function extractPriceTokens(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');

  const matches = stripped.match(/[$€£]\s?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?/g) || [];

  // Normalise: strip whitespace after the symbol, dedupe, sort
  // for a stable, comparable snapshot regardless of page order.
  const normalised = matches.map(m => m.replace(/\s+/g, ''));
  return [...new Set(normalised)].sort();
}

/**
 * Compares two token arrays (old vs new snapshot for one
 * provider). Returns null if identical, otherwise an object
 * describing exactly what was added/removed.
 */
function diffTokens(oldTokens, newTokens) {
  const oldSet = new Set(oldTokens || []);
  const newSet = new Set(newTokens || []);
  const added   = newTokens.filter(t => !oldSet.has(t));
  const removed = (oldTokens || []).filter(t => !newSet.has(t));
  if (added.length === 0 && removed.length === 0) return null;
  return { added, removed };
}

// ── Network I/O ──────────────────────────────────────────────
async function fetchPriceTokens(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VPNCompare-PriceWatch/1.0; +https://bestvpncompareonline.com)' },
    });
    clearTimeout(timeout);
    if (!res.ok) {
      return { error: `HTTP ${res.status}` };
    }
    const html = await res.text();
    const tokens = extractPriceTokens(html);
    if (tokens.length === 0) {
      return { error: 'Fetched OK but found zero price-like tokens on the page — selector/page may have changed, or page is JS-rendered (price not in raw HTML)' };
    }
    return { tokens };
  } catch (err) {
    clearTimeout(timeout);
    return { error: err.name === 'AbortError' ? 'Timed out after 15s' : String(err.message || err) };
  }
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  const oldSnapshot = fs.existsSync(SNAPSHOT_FILE)
    ? JSON.parse(fs.readFileSync(SNAPSHOT_FILE, 'utf8'))
    : {};

  const newSnapshot = {};
  const changes = [];
  const errors = [];

  for (const [id, source] of Object.entries(SOURCES)) {
    console.log(`Checking ${source.name}...`);
    const result = await fetchPriceTokens(source.pricingUrl);

    if (result.error) {
      errors.push({ id, name: source.name, url: source.pricingUrl, error: result.error });
      // Keep last known-good snapshot rather than wiping it on a fetch failure
      if (oldSnapshot[id]) newSnapshot[id] = oldSnapshot[id];
      continue;
    }

    newSnapshot[id] = result.tokens;
    const diff = diffTokens(oldSnapshot[id], result.tokens);
    if (diff) {
      changes.push({ id, name: source.name, url: source.pricingUrl, ...diff });
    }
  }

  fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(newSnapshot, null, 2) + '\n', 'utf8');
  fs.writeFileSync(RESULT_FILE, JSON.stringify({ changes, errors, checkedAt: new Date().toISOString() }, null, 2) + '\n', 'utf8');

  console.log(`\n════════════════════════════════════════`);
  console.log(`📊  Price watch complete: ${changes.length} provider(s) changed, ${errors.length} fetch error(s).`);
  if (changes.length) {
    changes.forEach(c => {
      console.log(`\n  ${c.name}:`);
      if (c.added.length)   console.log(`    + new tokens:  ${c.added.join(', ')}`);
      if (c.removed.length) console.log(`    - gone tokens: ${c.removed.join(', ')}`);
    });
  }
  if (errors.length) {
    console.log(`\n⚠️  Fetch errors (URL may need fixing in price-sources.js):`);
    errors.forEach(e => console.log(`  ${e.name}: ${e.error} (${e.url})`));
  }
  console.log(`════════════════════════════════════════\n`);
}

// Export pure functions for testing; only run main() when executed directly
if (require.main === module) {
  main().catch(err => { console.error('Fatal error:', err); process.exit(1); });
}
module.exports = { extractPriceTokens, diffTokens };
