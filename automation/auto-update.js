#!/usr/bin/env node
/**
 * ============================================================
 * VPN COMPARE - AUTO UPDATE  (auto-update.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * Reads price-watch-result.json and price-snapshots.json,
 * validates detected price changes, and -- when AUTO_UPDATE=true --
 * patches site-data.js and runs update-site.js automatically.
 *
 * SWITCH
 *   AUTO_UPDATE=false (default)
 *     Detects what WOULD change, reports it in the GitHub Issue.
 *     You update site-data.js manually as normal.
 *
 *   AUTO_UPDATE=true
 *     Validates each detected change against safety rules.
 *     If valid: patches site-data.js, runs update-site.js,
 *     commits site-data.js + script.js alongside the snapshot.
 *     If invalid: flags for manual review in the Issue.
 *
 * SAFETY RULES (always enforced when AUTO_UPDATE=true)
 *   1. New price must be within watchPrice.min and watchPrice.max
 *   2. New price must not differ from stored price by more than 40%
 *   3. Price token must match expected currency symbol
 *   4. If any check fails: skip and flag for manual review
 *
 * OUTPUT
 *   automation/auto-update-result.json  -- consumed by price-watch.yml
 * ============================================================
 */

const fs            = require('fs');
const path          = require('path');
const { execSync }  = require('child_process');

const AUTO_UPDATE   = process.env.AUTO_UPDATE === 'true';
const SOURCES       = require('./price-sources.js');
const ROOT          = path.join(__dirname, '..');
const RESULT_FILE   = path.join(__dirname, 'price-watch-result.json');
const SNAPSHOT_FILE = path.join(__dirname, 'price-snapshots.json');
const SITEDATA_FILE = path.join(ROOT, 'site-data.js');
const AUTORESULT    = path.join(__dirname, 'auto-update-result.json');

// ── Read current stored price from site-data.js as text ──────
function getCurrentPrice(id, field) {
  const text = fs.readFileSync(SITEDATA_FILE, 'utf8');
  // Match: {id}: { ...anything... {field}: {number} ...
  const re = new RegExp(id + '\\s*:\\s*\\{[^}]*?' + field + '\\s*:\\s*([\\d.]+)');
  const m  = text.match(re);
  return m ? parseFloat(m[1]) : null;
}

// ── Patch a single numeric field in site-data.js ─────────────
function patchSiteData(id, field, oldPrice, newPrice) {
  let text = fs.readFileSync(SITEDATA_FILE, 'utf8');
  const escapedOld = oldPrice.toFixed(2).replace('.', '\\.');
  // Match: {id}: { ...anything... {field}: {oldPrice}{comma/space/brace}
  const re = new RegExp(
    '(' + id + '\\s*:\\s*\\{[^}]*?' + field + '\\s*:\\s*)' + escapedOld + '(?=[,\\s}])'
  );
  if (!re.test(text)) {
    throw new Error('Pattern not found in site-data.js for ' + id + '.' + field + '=' + oldPrice.toFixed(2));
  }
  const patched = text.replace(re, '$1' + newPrice.toFixed(2));
  fs.writeFileSync(SITEDATA_FILE, patched, 'utf8');
}

// ── Find the best matching price token ───────────────────────
function findBestPrice(tokens, currency, min, max) {
  const prices = tokens
    .filter(t => t.startsWith(currency))
    .map(t    => parseFloat(t.replace(/[^0-9.]/g, '')))
    .filter(n => !isNaN(n) && n >= min && n <= max)
    .sort((a, b) => a - b);
  return prices.length > 0 ? prices[0] : null;
}

// ── Main ─────────────────────────────────────────────────────
async function main() {

  const empty = { autoUpdated: [], needsReview: [], skipped: [], autoUpdateEnabled: AUTO_UPDATE };

  if (!fs.existsSync(RESULT_FILE)) {
    console.log('No price-watch-result.json -- nothing to process.');
    fs.writeFileSync(AUTORESULT, JSON.stringify(empty, null, 2) + '\n', 'utf8');
    return;
  }

  const watchResult = JSON.parse(fs.readFileSync(RESULT_FILE, 'utf8'));
  const newSnapshot = JSON.parse(fs.readFileSync(SNAPSHOT_FILE, 'utf8'));

  const autoUpdated = [];
  const needsReview = [];
  const skipped     = [];

  for (const change of watchResult.changes) {
    const source = SOURCES[change.id];

    // No watchPrice config -- skip silently
    if (!source || !source.watchPrice) {
      skipped.push({ id: change.id, name: change.name, reason: 'No watchPrice config -- manual update only' });
      continue;
    }

    const { field, currency, min, max } = source.watchPrice;
    const currentTokens = newSnapshot[change.id] || [];
    const currentPrice  = getCurrentPrice(change.id, field);

    if (currentPrice === null) {
      needsReview.push({
        id: change.id, name: change.name,
        reason: 'Could not read current ' + field + ' price from site-data.js',
      });
      continue;
    }

    const newPrice = findBestPrice(currentTokens, currency, min, max);

    if (newPrice === null) {
      needsReview.push({
        id: change.id, name: change.name,
        reason: 'No price token found in ' + currency + min + '-' + currency + max + ' range. Page may be JS-rendered, geo-locked, or behind a consent wall.',
        currentStored: currentPrice,
      });
      continue;
    }

    // Price already matches what we have stored -- layout/promo change only
    if (Math.abs(newPrice - currentPrice) < 0.005) {
      skipped.push({
        id: change.id, name: change.name,
        reason: 'Target price ' + currency + newPrice + ' unchanged -- other tokens on page changed (promo/layout)',
      });
      continue;
    }

    // Sanity check -- reject swings larger than 40%
    const changePct = Math.abs(newPrice - currentPrice) / currentPrice;
    if (changePct > 0.40) {
      needsReview.push({
        id: change.id, name: change.name,
        reason: 'Change of ' + Math.round(changePct * 100) + '% exceeds 40% safety threshold -- manual verification required',
        currentStored: currentPrice,
        detectedPrice: newPrice,
        field,
      });
      continue;
    }

    // Valid change
    if (AUTO_UPDATE) {
      try {
        patchSiteData(change.id, field, currentPrice, newPrice);
        autoUpdated.push({ id: change.id, name: change.name, field, oldPrice: currentPrice, newPrice, currency });
        console.log('Auto-updated ' + change.name + ': ' + currency + currentPrice + ' -> ' + currency + newPrice);
      } catch (e) {
        needsReview.push({
          id: change.id, name: change.name,
          reason: 'Patch failed: ' + e.message,
          currentStored: currentPrice,
          detectedPrice: newPrice,
          field,
        });
      }
    } else {
      // AUTO_UPDATE=false -- report what would have changed
      needsReview.push({
        id: change.id, name: change.name,
        reason: 'AUTO_UPDATE disabled -- would update ' + field + ' from ' + currency + currentPrice + ' to ' + currency + newPrice,
        currentStored: currentPrice,
        detectedPrice: newPrice,
        field,
      });
    }
  }

  // Run update-site.js if anything was patched
  if (AUTO_UPDATE && autoUpdated.length > 0) {
    console.log('\nRunning update-site.js...');
    try {
      execSync('node update-site.js', { cwd: ROOT, stdio: 'inherit' });
      console.log('update-site.js done.');
    } catch (e) {
      // Move auto-updated items to needsReview since script.js may not have updated
      console.error('update-site.js failed:', e.message);
      const failed = autoUpdated.splice(0);
      failed.forEach(u => needsReview.push({
        ...u,
        reason: 'site-data.js patched but update-site.js failed -- run manually: node update-site.js',
      }));
    }
  }

  fs.writeFileSync(
    AUTORESULT,
    JSON.stringify({ autoUpdated, needsReview, skipped, autoUpdateEnabled: AUTO_UPDATE }, null, 2) + '\n',
    'utf8'
  );

  console.log('\n=====================================');
  console.log('Auto-update complete (AUTO_UPDATE=' + AUTO_UPDATE + ')');
  console.log('  Auto-updated: ' + autoUpdated.length);
  console.log('  Needs review: ' + needsReview.length);
  console.log('  Skipped:      ' + skipped.length);
  console.log('=====================================\n');
}

main().catch(err => { console.error('Fatal error:', err); process.exit(1); });
