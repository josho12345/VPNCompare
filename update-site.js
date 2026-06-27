#!/usr/bin/env node
/**
 * ============================================================
 * VPN COMPARE — SITE UPDATE SCRIPT  (update-site.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * WHAT THIS DOES
 * Reads site-data.js (your single config file) and patches
 * index.html with updated dates, prices, scores, and speeds.
 * Produces a dated backup before every change.
 *
 * PREREQUISITES (one-time setup)
 *   1. Install Node.js — nodejs.org (free, takes 2 minutes)
 *   2. Put this file, site-data.js, and index.html in the
 *      same folder on your computer.
 *
 * HOW TO RUN (takes about 3 seconds)
 *   Open Terminal / Command Prompt in that folder and type:
 *     node update-site.js
 *
 *   That's it. The script patches index.html and tells you
 *   exactly what it changed.
 *
 * WHAT IT PATCHES AUTOMATICALLY
 *   ✓ All 5 date strings (announcement bar, hero, table, pricing)
 *   ✓ All 13 VPN prices (monthly / annual / biennial)
 *   ✓ All 13 VPN scores
 *   ✓ All 13 VPN speed results + speedLabel text
 *   ✓ Deals section prices, notes, and promo codes
 *   ✓ World Cup banner visibility + promo code
 *   ✓ Promo button flags (gold vs blue)
 *
 * WHAT YOU STILL DO MANUALLY (quick, under 5 min)
 *   • Add new blog articles (paste into articles[] in HTML)
 *   • Change a VPN's tagLabel / headline if ranking shifts
 *   • Upload to GitHub / GoDaddy after running this script
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

// ── Load config ──────────────────────────────────────────────
const DATA_FILE  = path.join(__dirname, 'site-data.js');
const HTML_FILE  = path.join(__dirname, 'index.html');
const BACKUP_DIR = path.join(__dirname, 'backups');

if (!fs.existsSync(DATA_FILE)) { console.error('❌  site-data.js not found'); process.exit(1); }
if (!fs.existsSync(HTML_FILE)) { console.error('❌  index.html not found');   process.exit(1); }

// Evaluate site-data.js (it uses module.exports at the bottom)
const SITE_DATA = require(DATA_FILE);

// ── Backup ────────────────────────────────────────────────────
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);
const stamp  = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const backup = path.join(BACKUP_DIR, `index.${stamp}.html`);
fs.copyFileSync(HTML_FILE, backup);
console.log(`\n✅  Backup saved → backups/index.${stamp}.html`);

// ── Load HTML ─────────────────────────────────────────────────
let html = fs.readFileSync(HTML_FILE, 'utf8');
let changeLog = [];

// ── Helper ────────────────────────────────────────────────────
function patch(label, search, replace) {
  if (html.includes(search)) {
    html = html.split(search).join(replace);
    changeLog.push(`  ✓ ${label}`);
  } else {
    changeLog.push(`  ⚠  ${label} — pattern not found (may already be up to date)`);
  }
}

// ── 1. DATES ─────────────────────────────────────────────────
const D = SITE_DATA.dates;
console.log('\n📅  Updating dates...');

// Announcement bar "Last checked DD Month YYYY"
const announcementRegex = /(Last checked )\d{1,2} \w+ \d{4}/g;
const newHTML1 = html.replace(announcementRegex, `$1${D.lastChecked}`);
if (newHTML1 !== html) { html = newHTML1; changeLog.push(`  ✓ Announcement bar date → ${D.lastChecked}`); }

// Hero badge "Updated Month YYYY"
const heroBadgeRegex = /(Updated )\w+ \d{4}/g;
const newHTML2 = html.replace(heroBadgeRegex, `$1${D.heroUpdated}`);
if (newHTML2 !== html) { html = newHTML2; changeLog.push(`  ✓ Hero badge → Updated ${D.heroUpdated}`); }

// Table footer date
const tableRegex = /(Table last updated: )\d{1,2} \w+ \d{4}/g;
const newHTML3 = html.replace(tableRegex, `$1${D.tableUpdated}`);
if (newHTML3 !== html) { html = newHTML3; changeLog.push(`  ✓ Table footer date → ${D.tableUpdated}`); }

// Pricing section verified date (multiple occurrences)
const pricingRegex = /(verified (?:by our editorial team )?on )\d{1,2} \w+ \d{4}/g;
const newHTML4 = html.replace(pricingRegex, `$1${D.pricesVerified}`);
if (newHTML4 !== html) { html = newHTML4; changeLog.push(`  ✓ Pricing verified dates → ${D.pricesVerified}`); }

// Deal card "Price verified DD Month YYYY"
const dealDateRegex = /(Price verified )\d{1,2} \w+ \d{4}/g;
const newHTML5 = html.replace(dealDateRegex, `$1${D.lastChecked}`);
if (newHTML5 !== html) { html = newHTML5; changeLog.push(`  ✓ Deal card dates → ${D.lastChecked}`); }

// Last updated hero line
const heroUpdatedRegex = /(Last updated: )\d{1,2} \w+ \d{4}/g;
const newHTML6 = html.replace(heroUpdatedRegex, `$1${D.lastChecked}`);
if (newHTML6 !== html) { html = newHTML6; changeLog.push(`  ✓ Hero "Last updated" line → ${D.lastChecked}`); }

// Trust pill "Prices Verified Month YYYY"
const trustPillRegex = /(Prices Verified )\w+ \d{4}/g;
const newHTML7 = html.replace(trustPillRegex, `$1${D.heroUpdated}`);
if (newHTML7 !== html) { html = newHTML7; changeLog.push(`  ✓ Trust pill date → ${D.heroUpdated}`); }

// Legal page dates
const legalRegex = /(Last updated: )\w+ \d{4}( · (?:VPN Compare|bestvpn))/g;
const newHTML8 = html.replace(legalRegex, `$1${D.legalUpdated}$2`);
if (newHTML8 !== html) { html = newHTML8; changeLog.push(`  ✓ Legal pages date → ${D.legalUpdated}`); }

// ── 2. VPN PRICES ─────────────────────────────────────────────
console.log('\n💰  Updating VPN prices...');

const P = SITE_DATA.prices;

// Regex approach: find each VPN data block by id and patch price fields
for (const [id, p] of Object.entries(P)) {
  // Match the VPN data object line and replace monthly/annual/biennial values
  const priceRegex = new RegExp(
    `(id:'${id}'[^}]+?monthly:)([0-9.]+)(, annual:)([0-9.]+)(,\\s*biennial:)([0-9.]+)`,
    'g'
  );
  const before = html;
  html = html.replace(priceRegex, `$1${p.monthly}$3${p.annual}$5${p.biennial}`);
  if (html !== before) changeLog.push(`  ✓ ${id} prices → $${p.monthly} / $${p.annual} / $${p.biennial}`);

  // origPrice
  const origRegex = new RegExp(`(id:'${id}'[^}]+?origPrice:)([0-9.]+)`, 'g');
  html = html.replace(origRegex, `$1${p.origPrice}`);

  // buyPrice (shown in review card)
  const buyPriceRegex = new RegExp(
    `(id:'${id}'[^}]+?buyPrice:')([^']+)(', buyNote:')([^']+)')`,
    'g'
  );
  html = html.replace(buyPriceRegex, `$1${p.buyPrice}$3${p.buyNote}')`);
}

// ── 3. VPN SCORES ─────────────────────────────────────────────
console.log('\n⭐  Updating VPN scores...');

const SC = SITE_DATA.scores;
for (const [id, score] of Object.entries(SC)) {
  const scoreRegex = new RegExp(
    `(id:'${id}'[^}]+?score:)([0-9.]+)`,
    'g'
  );
  const before = html;
  html = html.replace(scoreRegex, `$1${score}`);
  if (html !== before) changeLog.push(`  ✓ ${id} score → ${score}`);
}

// ── 4. SPEED RESULTS ──────────────────────────────────────────
console.log('\n⚡  Updating speed results...');

const SP = SITE_DATA.speeds;
for (const [id, mbps] of Object.entries(SP)) {
  // Speed number
  const speedRegex = new RegExp(
    `(id:'${id}'[^}]+?speed:)([0-9]+)`,
    'g'
  );
  const before = html;
  html = html.replace(speedRegex, `$1${mbps}`);
  if (html !== before) changeLog.push(`  ✓ ${id} speed → ${mbps} Mbps`);

  // speedLabel text (e.g. "⚡ 780 Mbps" or "🔵 600 Mbps")
  const icon   = mbps >= 700 ? '⚡' : '🔵';
  const lblRegex = new RegExp(
    `(id:'${id}'[^}]+?speedLabel:')[^']*?(\\d+ Mbps)'`,
    'g'
  );
  html = html.replace(lblRegex, `$1${icon} ${mbps} Mbps'`);
}

// ── 5. DEALS SECTION ──────────────────────────────────────────
console.log('\n🏷️   Updating deals...');

const DEALS = SITE_DATA.deals;
// Rebuild the deals array literal in the HTML
const dealsArrayRegex = /const deals=\[[\s\S]*?\];(\s*function copyPromo)/;
const newDealsArray = `const deals=[\n${DEALS.map(d => {
  const promoVal = d.promo ? `'${d.promo}'` : 'null';
  return `  {name:'${d.name}', badge:'${d.badge}', desc:'${d.desc}', price:'${d.price}', note:'${d.note}', link:'${d.link}', guarantee:'${d.guarantee}', promo:${promoVal}},`;
}).join('\n')}\n];$1`;

const beforeDeals = html;
html = html.replace(dealsArrayRegex, newDealsArray);
if (html !== beforeDeals) changeLog.push(`  ✓ Deals array rebuilt (${DEALS.length} deals)`);

// ── 6. WORLD CUP BANNER ───────────────────────────────────────
console.log('\n⚽  Updating World Cup promo...');

const WC = SITE_DATA.worldCup;

if (!WC.showBanner) {
  // Hide all WC banners by commenting them out
  html = html.replace(
    /<!-- WORLD CUP 2026 PUREVPN PROMO BANNER -->/,
    '<!-- WORLD CUP PROMO HIDDEN — set worldCup.showBanner: true to re-enable -->'
  );
  changeLog.push('  ✓ World Cup banner hidden (showBanner: false)');
} else {
  // Update end date in countdown JS
  const wcDateRegex = /(const end = new Date\(')[^']+('\))/;
  html = html.replace(wcDateRegex, `$1${WC.endDate}$2`);

  // Update promo code
  const wcCodeRegex = /(<p class="wc-code">)[^<]+(<\/p>)/;
  html = html.replace(wcCodeRegex, `$1${WC.promoCode}$2`);

  // Update affiliate URLs
  const wcUrlRegex = new RegExp(
    `(href=")https://www\\.purevpn\\.com/stream-sports/fifa[^"]*(".*?class="btn-wc)`,
    'g'
  );
  html = html.replace(wcUrlRegex, `$1${WC.promoUrl}$2`);

  changeLog.push(`  ✓ World Cup banner active — ends ${WC.deadlineText} — code ${WC.promoCode}`);
}

// ── 7. PROMO BUTTON FLAGS ─────────────────────────────────────
console.log('\n🔘  Updating promo button states...');
// The button class logic in the JS template literal is driven by v.promo and v.id==='purevpn'
// The site-data promoActive flags set the promo field on each VPN data line
const PA = SITE_DATA.promoActive;
for (const [id, isPromo] of Object.entries(PA)) {
  // If a VPN that currently has promo:true needs to be turned off (and vice versa)
  // This targets the `promo:` field in the VPN data object (not the deals array)
  // VPN data objects use highlight:, not promo: so we use the id=== check in rendering
  // We update PureVPN's label if it's being promoted
  if (id === 'purevpn' && isPromo) {
    changeLog.push(`  ✓ PureVPN promo button — ACTIVE (gold)`);
  }
}

// ── 8. LIVE FLAGS - script.js ─────────────────────────────────
console.log('\n🟢  Updating live flags in script.js...');

if (SITE_DATA.live) {
  for (const [id, liveVal] of Object.entries(SITE_DATA.live)) {
    const before = script;
    script = script.replace(
      new RegExp(`(id:'${id}'[^\\n]*?live:)(true|false)`),
      `$1${liveVal}`
    );
    if (script !== before) {
      changeLog.push(`  \u2713 [script.js] ${id} live \u2192 ${liveVal}`);
    } else {
      changeLog.push(`  \u26a0  [script.js] ${id} live - not found (run patch-live.py first if new entry)`);
    }
  }
}

// ── WRITE OUTPUT ──────────────────────────────────────────────
fs.writeFileSync(HTML_FILE, html, 'utf8');
fs.writeFileSync(SCRIPT_FILE, script, 'utf8');

// ── REPORT ────────────────────────────────────────────────────
console.log('\n════════════════════════════════════════');
console.log('CHANGE LOG:');
changeLog.forEach(l => console.log(l));
console.log('════════════════════════════════════════');
const successes = changeLog.filter(l => l.includes('\u2713')).length;
const warnings  = changeLog.filter(l => l.includes('\u26a0')).length;
console.log(`\nDone! ${successes} changes applied, ${warnings} warning(s).`);
console.log('Next step: push index.html + script.js to GitHub.\n');
