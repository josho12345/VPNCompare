#!/usr/bin/env node
/**
 * patch-live.js -- Adds live flag system to script.js
 * Run from VPNCompare project root: node patch-live.js
 *
 * WHAT THIS DOES
 *   1. Adds live:true/false to all 13 existing VPN entries
 *   2. Promotes Surfshark to featured card (card:true + tagline + features)
 *   3. Adds 3 new VPN entries: IPVanish, TunnelBear, Hotspot Shield
 *   4. Updates renderTable() and renderCards() to filter by v.live
 *
 * Run once only -- update-site.js handles live flags from then on.
 */

const fs = require('fs');
const SCRIPT = 'script.js';

if (!fs.existsSync(SCRIPT)) {
  console.error('ERROR: script.js not found. Run from the VPNCompare project root.');
  process.exit(1);
}

let content = fs.readFileSync(SCRIPT, 'utf8');
const original = content;
const changes = [];

// ── STEP 1: Add live:true/false to existing VPN entries ──────
// Each entry has id:'xxx' and highlight:true/false on the same long line.

const liveFlags = {
  nordvpn:    true,
  purevpn:    true,
  surfshark:  true,
  express:    false,
  cyberghost: false,
  proton:     false,
  mullvad:    false,
  perimeter:  false,
  nordlayer:  false,
  ivpn:       false,
  pia:        false,
  windscribe: false,
  hidemyass:  false,
};

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  for (const [vpnId, liveVal] of Object.entries(liveFlags)) {
    if (lines[i].includes(`id:'${vpnId}'`) && lines[i].includes('highlight:') && !lines[i].includes('live:')) {
      const flag = liveVal ? 'true' : 'false';
      lines[i] = lines[i].replace(
        /(highlight:(?:true|false),)/,
        `$1 live:${flag},`
      );
      changes.push(`  OK  ${vpnId}: added live=${flag}`);
    }
  }
}
content = lines.join('\n');

// ── STEP 2: Promote Surfshark to featured card ────────────────

const sharkLines = content.split('\n');
for (let i = 0; i < sharkLines.length; i++) {
  if (sharkLines[i].includes("id:'surfshark'") && sharkLines[i].includes('card:false')) {
    sharkLines[i] = sharkLines[i].replace('card:false', 'card:true');
    sharkLines[i] = sharkLines[i].replace(
      "tagline:'', features:[],",
      "tagline:'Unlimited devices — best value for families & power users', features:['Unlimited simultaneous devices','CleanWeb ad & malware blocker','NoBorders censorship bypass','Camouflage mode','30-day money-back guarantee','Surfshark One bundle available'],"
    );
    changes.push('  OK  surfshark: promoted to card:true with tagline + features');
    break;
  }
}
content = sharkLines.join('\n');

// ── STEP 3: Add 3 new VPN entries before closing ]; ──────────

const newEntries = `
  { id:'ipvanish', name:'IPVanish', speed:550, speedLabel:'\u{1F535} 550 Mbps', servers:'2,200+', nolog:true, kill:true, devices:999, monthly:10.99, annual:3.99, biennial:3.99, score:8.2, tags:['personal'], tagLabel:'', tagClass:'', card:true, highlight:false, live:true, tagline:'Unlimited devices + WireGuard - powered by Ziff Davis', features:['Unlimited simultaneous devices','WireGuard & IKEv2 protocols','2,200+ servers in 75+ countries','SOCKS5 proxy included','Zero-log policy','30-day money-back guarantee'],
    link:'https://www.ipvanish.com/', guarantee:'30-day money-back', origPrice:10.99,
    pros:['Unlimited simultaneous devices','WireGuard support for fast speeds','SOCKS5 proxy included at no extra cost','Owned by Ziff Davis - established media company','30-day money-back guarantee'],
    cons:['Based in USA (5 Eyes jurisdiction)','No independent audit published yet','App can feel feature-heavy for beginners'],
    scores:{speed:7.8,privacy:7.8,streaming:8.2,value:8.5,ease:8.0},
    review:'<h3>Overview<\\/h3><p>IPVanish is a long-standing US-based VPN provider known for its unlimited simultaneous connections and solid WireGuard implementation. Owned by Ziff Davis, it runs 2,200+ servers across 75+ countries.<\\/p><h3>Performance<\\/h3><p>In our testing, IPVanish delivered consistent speeds on WireGuard, averaging 550 Mbps on local UK servers.<\\/p>',
    buyPrice:'$3.99', buyNote:'per month · billed annually' },

  { id:'tunnelbear', name:'TunnelBear', speed:450, speedLabel:'\u{1F535} 450 Mbps', servers:'5,000+', nolog:true, kill:true, devices:999, monthly:9.99, annual:3.33, biennial:1.67, score:7.9, tags:['personal'], tagLabel:'', tagClass:'', card:true, highlight:false, live:true, tagline:'Annual Cure53 security audit - most transparent VPN available', features:['Independently audited annually by Cure53','5,000+ servers in 45+ countries','Unlimited simultaneous devices','VigilantBear kill switch','GhostBear obfuscation','Free tier (2GB/month)'],
    link:'https://www.tunnelbear.com/', guarantee:'No refunds', origPrice:9.99,
    pros:['Annual independent audit by Cure53 - results published publicly','Extremely beginner-friendly interface','Free tier with 2GB per month','Unlimited devices','GhostBear obfuscation for restricted networks'],
    cons:['Based in Canada (5 Eyes)','No money-back guarantee','Slower speeds than premium providers'],
    scores:{speed:7.0,privacy:8.5,streaming:7.5,value:8.5,ease:9.5},
    review:'<h3>Overview<\\/h3><p>TunnelBear is one of the most transparent VPNs available, commissioning annual independent security audits from Cure53 and publishing the full results publicly.<\\/p><h3>Ease of Use<\\/h3><p>Its bear-themed interface removes the technical complexity that puts beginners off VPNs, making it an excellent first VPN for non-technical users.<\\/p>',
    buyPrice:'$3.33', buyNote:'per month · billed annually' },

  { id:'hotspotshield', name:'Hotspot Shield', speed:720, speedLabel:'\u26A1 720 Mbps', servers:'3,200+', nolog:true, kill:true, devices:25, monthly:12.99, annual:7.99, biennial:2.99, score:8.0, tags:['personal'], tagLabel:'', tagClass:'', card:false, highlight:false, live:true, tagline:'', features:[], link:'https://www.hotspotshield.com/', guarantee:'45-day money-back', origPrice:12.99,
    pros:['Hydra protocol delivers class-leading speeds','45-day money-back guarantee','Strong streaming performance','One of the oldest VPN brands (since 2008)'],
    cons:['Based in USA (5 Eyes)','Hydra protocol is closed-source','Free tier is ad-supported'],
    scores:{speed:9.2,privacy:7.5,streaming:8.8,value:7.8,ease:8.5},
    review:'<h3>Overview<\\/h3><p>Hotspot Shield uses its proprietary Hydra protocol to deliver some of the fastest VPN speeds available. In our testing it averaged 720 Mbps. It has been operating since 2008 and serves over 650 million users globally.<\\/p>',
    buyPrice:'$2.99', buyNote:'per month · billed every 3 years' },`;

const vpnsClose = '\n];';
const vpnsStart = content.indexOf('const vpns = [');
if (vpnsStart !== -1) {
  const closePos = content.indexOf(vpnsClose, vpnsStart);
  if (closePos !== -1) {
    content = content.slice(0, closePos) + newEntries + content.slice(closePos);
    changes.push('  OK  Added IPVanish, TunnelBear, Hotspot Shield to vpns[]');
  } else {
    changes.push('  WARN  Could not find vpns array closing ]; -- new entries not added');
  }
} else {
  changes.push('  WARN  Could not find vpns array -- new entries not added');
}

// ── STEP 4: Update renderTable to filter by v.live ───────────

const oldTableFilter = "vpns.filter(v=>filter==='all'||v.tags.includes(filter))";
const newTableFilter = "vpns.filter(v=>v.live&&(filter==='all'||v.tags.includes(filter)))";

if (content.includes(oldTableFilter)) {
  content = content.replace(oldTableFilter, newTableFilter);
  changes.push('  OK  renderTable: added v.live filter');
} else {
  changes.push('  WARN  renderTable filter pattern not found');
}

// ── STEP 5: Update renderCards to filter by v.live ───────────

const oldCardsFilter = 'vpns.filter(v=>v.card)';
const newCardsFilter = 'vpns.filter(v=>v.live&&v.card)';

if (content.includes(oldCardsFilter)) {
  content = content.replace(oldCardsFilter, newCardsFilter);
  changes.push('  OK  renderCards: added v.live filter');
} else {
  changes.push('  WARN  renderCards filter pattern not found');
}

// ── WRITE & REPORT ────────────────────────────────────────────

if (content !== original) {
  fs.writeFileSync(SCRIPT, content, 'utf8');
  console.log(`\npatch-live.js complete -- ${changes.length} operations:`);
  changes.forEach(c => console.log(c));
  console.log('\nscript.js updated. Now run: node update-site.js');
} else {
  console.log('No changes made.');
  changes.forEach(c => console.log(c));
}
