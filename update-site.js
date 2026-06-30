#!/usr/bin/env node
/**
 * ============================================================
 * VPN COMPARE - SITE UPDATE SCRIPT  (update-site.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * Reads site-data.js and patches index.html + script.js with
 * updated dates, prices, scores, speeds, deals, and live flags.
 *
 * HOW TO RUN
 *   node update-site.js
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

const DATA_FILE   = path.join(__dirname, 'site-data.js');
const HTML_FILE   = path.join(__dirname, 'vpn', 'index.html');
const SCRIPT_FILE = path.join(__dirname, 'script.js');
const NAV_FILE    = path.join(__dirname, 'nav.js');
const BACKUP_DIR  = path.join(__dirname, 'backups');

if (!fs.existsSync(DATA_FILE))   { console.error('site-data.js not found'); process.exit(1); }
if (!fs.existsSync(HTML_FILE))   { console.error('vpn/index.html not found'); process.exit(1); }
if (!fs.existsSync(SCRIPT_FILE)) { console.error('script.js not found');    process.exit(1); }
if (!fs.existsSync(NAV_FILE))    { console.error('nav.js not found');      process.exit(1); }

const SITE_DATA = require(DATA_FILE);

if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
fs.copyFileSync(HTML_FILE,   path.join(BACKUP_DIR, `vpn-index.${stamp}.html`));
fs.copyFileSync(SCRIPT_FILE, path.join(BACKUP_DIR, `script.${stamp}.js`));
fs.copyFileSync(NAV_FILE,    path.join(BACKUP_DIR, `nav.${stamp}.js`));
console.log(`Backups saved -> backups/vpn-index.${stamp}.html + script.${stamp}.js + nav.${stamp}.js`);

let html   = fs.readFileSync(HTML_FILE, 'utf8');
let script = fs.readFileSync(SCRIPT_FILE, 'utf8');
let nav    = fs.readFileSync(NAV_FILE, 'utf8');
let changeLog = [];

function patchHTML(label, regex, replacement) {
  const before = html;
  html = html.replace(regex, replacement);
  changeLog.push(html !== before
    ? `  OK [index.html] ${label}`
    : `  -- [index.html] ${label} (no change)`);
}
function patchScript(label, regex, replacement) {
  const before = script;
  script = script.replace(regex, replacement);
  changeLog.push(script !== before
    ? `  OK [script.js] ${label}`
    : `  -- [script.js] ${label} (no change)`);
}
function patchNav(label, regex, replacement) {
  const before = nav;
  nav = nav.replace(regex, replacement);
  changeLog.push(nav !== before
    ? `  OK [nav.js] ${label}`
    : `  -- [nav.js] ${label} (no change)`);
}

// ── 1. DATES - index.html ───────────────────────────────────
const D = SITE_DATA.dates;
console.log('\nUpdating dates in index.html...');

patchNav('Announcement bar date',
  /(Last checked )\d{1,2} \w+ \d{4}/, `$1${D.lastChecked}`);
patchHTML('Hero badge date',
  /(Independent VPN Reviews — Updated )\w+ \d{4}/, `$1${D.heroUpdated}`);
patchHTML('Trust pill date',
  /(Prices Verified )\w+ \d{4}/, `$1${D.heroUpdated}`);
patchHTML('Hero last updated line',
  /(class="hero-updated">Last updated: )\d{1,2} \w+ \d{4}/, `$1${D.lastChecked}`);
patchHTML('Table footer date',
  /(Table last updated: )\d{1,2} \w+ \d{4}/, `$1${D.tableUpdated}`);
patchHTML('Pricing verified date',
  /(verified by our editorial team on )\d{1,2} \w+ \d{4}/, `$1${D.pricesVerified}`);

// ── 2. DATES - script.js ────────────────────────────────────
console.log('\nUpdating dates in script.js...');

patchScript('Deal-card price verified date',
  /(Price verified )\d{1,2} \w+ \d{4}/, `$1${D.lastChecked}`);
patchScript('Legal modal dates',
  /(Last updated: )\w+ \d{4}( · (?:VPN Compare|bestvpn))/g, `$1${D.legalUpdated}$2`);

// ── 3. VPN PRICES - script.js ────────────────────────────────
console.log('\nUpdating VPN prices in script.js...');

const P = SITE_DATA.prices;
for (const [id, p] of Object.entries(P)) {
  const before = script;

  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?monthly:)([0-9.]+)(,\\s*annual:)([0-9.]+)(,\\s*biennial:)([0-9.]+)`),
    `$1${p.monthly.toFixed(2)}$3${p.annual.toFixed(2)}$5${p.biennial.toFixed(2)}`
  );

  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?origPrice:)([0-9.]+)`),
    `$1${p.origPrice.toFixed(2)}`
  );

  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?buyPrice:')([^']+)(', buyNote:')([^']+)(')`),
    `$1${p.buyPrice}$3${p.buyNote}$5`
  );

  changeLog.push(script !== before
    ? `  OK [script.js] ${id} prices`
    : `  -- [script.js] ${id} prices (no change)`);
}

// ── 4. VPN SCORES - script.js ────────────────────────────────
console.log('\nUpdating VPN scores in script.js...');

const SC = SITE_DATA.scores;
for (const [id, scoreVal] of Object.entries(SC)) {
  const before = script;
  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?score:)([0-9.]+)`),
    `$1${scoreVal.toFixed(1)}`
  );
  changeLog.push(script !== before
    ? `  OK [script.js] ${id} score -> ${scoreVal}`
    : `  -- [script.js] ${id} score (no change)`);
}

// ── 5. SPEED RESULTS - script.js ─────────────────────────────
console.log('\nUpdating speed results in script.js...');

const SP = SITE_DATA.speeds;
for (const [id, mbps] of Object.entries(SP)) {
  const before = script;
  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?speed:)([0-9]+)`),
    `$1${mbps}`
  );
  const icon = mbps >= 700 ? '\u26a1' : '\u{1F535}';
  script = script.replace(
    new RegExp(`(id:'${id}'[^}]+?speedLabel:')[^']*?(\\d+ Mbps)'`),
    `$1${icon} ${mbps} Mbps'`
  );
  changeLog.push(script !== before
    ? `  OK [script.js] ${id} speed -> ${mbps} Mbps`
    : `  -- [script.js] ${id} speed (no change)`);
}

// ── 6. DEALS SECTION - script.js ─────────────────────────────
console.log('\nUpdating deals array in script.js...');

const DEALS = SITE_DATA.deals;
const dealsArrayRegex = /const deals=\[[\s\S]*?\n\];/;
const currentDealsMatch = script.match(dealsArrayRegex);

let dealsChanged = true;
if (currentDealsMatch) {
  try {
    const wrapped = currentDealsMatch[0].replace(/^const deals=/, 'module.exports=');
    fs.writeFileSync('/tmp/__deals_extract.js', wrapped);
    delete require.cache[require.resolve('/tmp/__deals_extract.js')];
    const currentDeals = require('/tmp/__deals_extract.js');
    dealsChanged = JSON.stringify(currentDeals) !== JSON.stringify(DEALS);
  } catch (e) {
    dealsChanged = true;
  }
}

if (dealsChanged) {
  const newDealsArray = `const deals=[\n${DEALS.map(d => {
    const promoVal = d.promo ? `'${d.promo}'` : 'null';
    const nameStr  = d.name.includes("'")  ? `"${d.name}"`  : `'${d.name}'`;
    const badgeStr = d.badge.includes("'") ? `"${d.badge}"` : `'${d.badge}'`;
    return `  {name:${nameStr}, badge:${badgeStr}, desc:'${d.desc}', price:'${d.price}', note:'${d.note}', link:'${d.link}', guarantee:'${d.guarantee}', promo:${promoVal}},`;
  }).join('\n')}\n];`;

  const beforeDeals = script;
  script = script.replace(dealsArrayRegex, newDealsArray);
  changeLog.push(script !== beforeDeals
    ? `  OK [script.js] Deals array rebuilt (${DEALS.length} deals)`
    : `  -- [script.js] Deals array (no change)`);
} else {
  changeLog.push(`  -- [script.js] Deals array (already matches site-data.js)`);
}

// ── 7. LIVE FLAGS - script.js ─────────────────────────────────
console.log('\nUpdating live flags in script.js...');

if (SITE_DATA.live) {
  for (const [id, liveVal] of Object.entries(SITE_DATA.live)) {
    const before = script;
    script = script.replace(
      new RegExp(`(id:'${id}'[^\\n]*?live:)(true|false)`),
      `$1${liveVal}`
    );
    changeLog.push(script !== before
      ? `  OK [script.js] ${id} live -> ${liveVal}`
      : `  -- [script.js] ${id} live (no change or not found yet)`);
  }
}

// ── WRITE OUTPUT ──────────────────────────────────────────────
fs.writeFileSync(HTML_FILE, html, 'utf8');
fs.writeFileSync(SCRIPT_FILE, script, 'utf8');
fs.writeFileSync(NAV_FILE, nav, 'utf8');

// ── REPORT ────────────────────────────────────────────────────
const ok   = changeLog.filter(l => l.includes('  OK')).length;
const none = changeLog.filter(l => l.includes('  --')).length;
console.log('\n=====================================');
console.log('CHANGE LOG:');
changeLog.forEach(l => console.log(l));
console.log('=====================================');
console.log(`\nDone! ${ok} changes applied, ${none} already up to date.`);
console.log('Next step: push vpn/index.html + script.js + nav.js to GitHub.\n');
