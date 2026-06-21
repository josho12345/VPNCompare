#!/usr/bin/env node
/**
 * ============================================================
 * VPN COMPARE — SITE UPDATE SCRIPT  (update-site.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * v2 — retrofitted 20 June 2026 for the "3-file architecture"
 * rebuild. The original version only ever read/wrote
 * index.html, but VPN price/score/speed data and the deals
 * array now live in script.js. This version patches BOTH
 * files, routing each change to wherever it actually lives.
 * World Cup patching removed — that promo was retired and
 * fully stripped from the site during the rebuild.
 *
 * WHAT THIS DOES
 * Reads site-data.js (your single config file) and patches
 * index.html + script.js with updated dates, prices, scores,
 * and speeds. Produces a dated backup of both files before
 * every change.
 *
 * PREREQUISITES (one-time setup)
 *   1. Install Node.js — nodejs.org (free, takes 2 minutes)
 *      NOTE: if you're on Windows 7, modern Node.js builds
 *      will not install. Use the GitHub Actions cloud path
 *      instead (see device-guides.md Scenario B) — it runs
 *      this exact script in the cloud, no local Node needed.
 *   2. Put this file, site-data.js, index.html, and script.js
 *      in the same folder on your computer.
 *
 * HOW TO RUN (takes about 3 seconds)
 *   Open Terminal / Command Prompt in that folder and type:
 *     node update-site.js
 *
 *   That's it. The script patches both files and tells you
 *   exactly what it changed — and warns you clearly if a
 *   pattern wasn't found, instead of failing silently.
 *
 * WHAT IT PATCHES AUTOMATICALLY
 *   ✓ Date strings in index.html (announcement bar, hero,
 *     table footer, pricing disclaimer)
 *   ✓ Date strings in script.js (deal-card date, 4 legal
 *     modal pages)
 *   ✓ All 13 VPN prices (monthly / annual / biennial / orig /
 *     buyPrice / buyNote) — in script.js
 *   ✓ All 13 VPN scores — in script.js
 *   ✓ All 13 VPN speed results + speedLabel text — in script.js
 *   ✓ Deals section array (rebuilt wholesale) — in script.js
 *   ✓ Backup of both files before every change
 *
 * WHAT YOU STILL DO MANUALLY (quick, under 5 min)
 *   • Add new blog articles (paste into articles[] in script.js)
 *   • Change a VPN's tagLabel / headline if ranking shifts
 *   • Affiliate links (edit script.js directly — rare change)
 *   • Upload to GitHub / GoDaddy after running this script
 *     (or just let GitHub Actions do it — see automation.md)
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

// ── Load config ──────────────────────────────────────────────
const DATA_FILE   = path.join(__dirname, 'site-data.js');
const HTML_FILE   = path.join(__dirname, 'index.html');
const SCRIPT_FILE = path.join(__dirname, 'script.js');
const BACKUP_DIR  = path.join(__dirname, 'backups');

if (!fs.existsSync(DATA_FILE))   { console.error('❌  site-data.js not found'); process.exit(1); }
if (!fs.existsSync(HTML_FILE))   { console.error('❌  index.html not found');   process.exit(1); }
if (!fs.existsSync(SCRIPT_FILE)) { console.error('❌  script.js not found');    process.exit(1); }

// Evaluate site-data.js (it uses module.exports at the bottom)
const SITE_DATA = require(DATA_FILE);

// ── Backup both files ────────────────────────────────────────
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
fs.copyFileSync(HTML_FILE,   path.join(BACKUP_DIR, `index.${stamp}.html`));
fs.copyFileSync(SCRIPT_FILE, path.join(BACKUP_DIR, `script.${stamp}.js`));
console.log(`\n✅  Backups saved → backups/index.${stamp}.html, backups/script.${stamp}.js`);

// ── Load both files ──────────────────────────────────────────
let html   = fs.readFileSync(HTML_FILE, 'utf8');
let script = fs.readFileSync(SCRIPT_FILE, 'utf8');
let changeLog = [];

// ── Helpers ───────────────────────────────────────────────────
// Applies a regex replace to a named file's content, logs success
// OR a clear warning if the pattern wasn't found — never silent.
function patchHTML(label, regex, replacement) {
  const before = html;
  html = html.replace(regex, replacement);
  if (html !== before) changeLog.push(`  ✓ [index.html] ${label}`);
  else changeLog.push(`  ⚠  [index.html] ${label} — pattern not found (may already be up to date)`);
}
function patchScript(label, regex, replacement) {
  const before = script;
  script = script.replace(regex, replacement);
  if (script !== before) changeLog.push(`  ✓ [script.js] ${label}`);
  else changeLog.push(`  ⚠  [script.js] ${label} — pattern not found (may already be up to date)`);
}

// ── 1. DATES — index.html ───────────────────────────────────
const D = SITE_DATA.dates;
console.log('\n📅  Updating dates in index.html...');

patchHTML('Announcement bar date',
  /(Last checked )\d{1,2} \w+ \d{4}/, `$1${D.lastChecked}`);

patchHTML('Hero badge date',
  /(Independent VPN Reviews — Updated )\w+ \d{4}/, `$1${D.heroUpdated}`);

patchHTML('Trust pill date',
  /(Prices Verified )\w+ \d{4}/, `$1${D.heroUpdated}`);

patchHTML('Hero "Last updated" line',
  /(class="hero-updated">Last updated: )\d{1,2} \w+ \d{4}/, `$1${D.lastChecked}`);

patchHTML('Table footer date',
  /(Table last updated: )\d{1,2} \w+ \d{4}/, `$1${D.tableUpdated}`);

patchHTML('Pricing section verified date',
  /(verified by our editorial team on )\d{1,2} \w+ \d{4}/, `$1${D.pricesVerified}`);

// ── 2. DATES — script.js ────────────────────────────────────
console.log('\n📅  Updating dates in script.js...');

patchScript('Deal-card "Price verified" date',
  /(Price verified )\d{1,2} \w+ \d{4}/, `$1${D.lastChecked}`);

patchScript('Legal modal page dates (4 pages)',
  /(Last updated: )\w+ \d{4}( · (?:VPN Compare|bestvpn))/g, `$1${D.legalUpdated}$2`);

// ── 3. VPN PRICES — script.js ────────────────────────────────
console.log('\n💰  Updating VPN prices in script.js...');

const P = SITE_DATA.prices;
for (const [id, p] of Object.entries(P)) {
  const before = script;

  // monthly / annual / biennial — all three on the same object line
  // .toFixed(2) matches script.js's existing formatting convention
  // (e.g. "8.00" not "8") — without this, round numbers create
  // cosmetic no-op diffs every single run.
  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?monthly:)([0-9.]+)(,\\s*annual:)([0-9.]+)(,\\s*biennial:)([0-9.]+)`),
    `$1${p.monthly.toFixed(2)}$3${p.annual.toFixed(2)}$5${p.biennial.toFixed(2)}`
  );

  // origPrice
  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?origPrice:)([0-9.]+)`),
    `$1${p.origPrice.toFixed(2)}`
  );

  // buyPrice + buyNote (deep-review buy box)
  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?buyPrice:')([^']+)(',\\s*buyNote:')([^']+)(')`),
    `$1${p.buyPrice}$3${p.buyNote}$5`
  );

  changeLog.push(script !== before
    ? `  ✓ [script.js] ${id} prices → $${p.monthly} / $${p.annual} / $${p.biennial} (buyPrice ${p.buyPrice})`
    : `  ⚠  [script.js] ${id} prices — pattern not found (may already be up to date)`);
}

// ── 4. VPN SCORES — script.js ────────────────────────────────
console.log('\n⭐  Updating VPN scores in script.js...');

const SC = SITE_DATA.scores;
for (const [id, scoreVal] of Object.entries(SC)) {
  const before = script;
  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?score:)([0-9.]+)`),
    `$1${scoreVal.toFixed(1)}`
  );
  changeLog.push(script !== before
    ? `  ✓ [script.js] ${id} score → ${scoreVal}`
    : `  ⚠  [script.js] ${id} score — pattern not found (may already be up to date)`);
}

// ── 5. SPEED RESULTS — script.js ─────────────────────────────
console.log('\n⚡  Updating speed results in script.js...');

const SP = SITE_DATA.speeds;
for (const [id, mbps] of Object.entries(SP)) {
  const before = script;

  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?speed:)([0-9]+)`),
    `$1${mbps}`
  );

  // speedLabel text (e.g. "⚡ 780 Mbps" or "🔵 600 Mbps") — icon flips at 700 Mbps
  const icon = mbps >= 700 ? '⚡' : '🔵';
  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?speedLabel:')[^']*?(\\d+ Mbps)'`),
    `$1${icon} ${mbps} Mbps'`
  );

  changeLog.push(script !== before
    ? `  ✓ [script.js] ${id} speed → ${mbps} Mbps`
    : `  ⚠  [script.js] ${id} speed — pattern not found (may already be up to date)`);
}

// ── 6. DEALS SECTION — script.js (rebuilt wholesale) ─────────
console.log('\n🏷️   Updating deals array in script.js...');

const DEALS = SITE_DATA.deals;
const dealsArrayRegex = /const deals=\[[\s\S]*?\n\];/;
const currentDealsMatch = script.match(dealsArrayRegex);

// Parse the CURRENT deals array as real JS data (not just text) so we can
// compare actual field values, not formatting/whitespace — prevents a
// noisy rewrite every run when nothing actually changed.
let dealsChanged = true;
if (currentDealsMatch) {
  try {
    const wrapped = currentDealsMatch[0].replace(/^const deals=/, 'module.exports=');
    fs.writeFileSync('/tmp/__deals_extract.js', wrapped);
    delete require.cache[require.resolve('/tmp/__deals_extract.js')];
    const currentDeals = require('/tmp/__deals_extract.js');
    dealsChanged = JSON.stringify(currentDeals) !== JSON.stringify(DEALS);
  } catch (e) {
    dealsChanged = true; // couldn't parse — safer to rewrite than silently skip
  }
}

if (dealsChanged) {
  const newDealsArray = `const deals=[\n${DEALS.map(d => {
    const promoVal = d.promo ? `'${d.promo}'` : 'null';
    const nameStr = d.name.includes("'") ? `"${d.name}"` : `'${d.name}'`;
    const badgeStr = d.badge.includes("'") ? `"${d.badge}"` : `'${d.badge}'`;
    return `  {name:${nameStr}, badge:${badgeStr}, desc:'${d.desc}', price:'${d.price}', note:'${d.note}', link:'${d.link}', guarantee:'${d.guarantee}', promo:${promoVal}},`;
  }).join('\n')}\n];`;

  const beforeDeals = script;
  script = script.replace(dealsArrayRegex, newDealsArray);
  changeLog.push(script !== beforeDeals
    ? `  ✓ [script.js] Deals array rebuilt (${DEALS.length} deals — content changed)`
    : `  ⚠  [script.js] Deals array — pattern not found (may already be up to date)`);
} else {
  changeLog.push(`  ⚠  [script.js] Deals array — no change (content already matches site-data.js)`);
}

// ── WRITE OUTPUT ──────────────────────────────────────────────
fs.writeFileSync(HTML_FILE, html, 'utf8');
fs.writeFileSync(SCRIPT_FILE, script, 'utf8');

// ── REPORT ────────────────────────────────────────────────────
const successes = changeLog.filter(l => l.includes('✓')).length;
const warnings  = changeLog.filter(l => l.includes('⚠')).length;

console.log('\n════════════════════════════════════════');
console.log('📋  CHANGE LOG:');
changeLog.forEach(l => console.log(l));
console.log('════════════════════════════════════════');
console.log(`\n🚀  Done! ${successes} changes applied, ${warnings} pattern(s) not found.`);
if (warnings > 0) {
  console.log('⚠️   Warnings above mean a pattern didn\'t match — check that script.js/index.html');
  console.log('    still have the expected structure (e.g. after a manual edit or rebuild).');
}
console.log('📁  Next step: upload index.html + script.js to GitHub / GoDaddy.\n');
