#!/usr/bin/env python3
"""
patch-live.py -- Adds live flag system to script.js
Run from VPNCompare project root: python3 patch-live.py

WHAT THIS DOES
  1. Adds live:true/false to all 13 existing VPN entries
  2. Promotes Surfshark to a featured card (card:true + tagline + features)
  3. Adds 3 new VPN entries: IPVanish, TunnelBear, Hotspot Shield
  4. Updates renderTable() and renderCards() to filter by v.live
"""

import re, sys

SCRIPT = 'script.js'

try:
    with open(SCRIPT, 'r', encoding='utf-8-sig') as f:
        content = f.read()
except FileNotFoundError:
    print(f'ERROR: {SCRIPT} not found. Run from the VPNCompare project root.')
    sys.exit(1)

original = content
changes = []

# ── STEP 1: Add live:true/false to existing VPN entries ──────
# Each entry has id:'xxx' and highlight:true/false on the same long line.
# We insert live: immediately after highlight:true/false,

live_flags = {
    'nordvpn':    True,
    'purevpn':    True,
    'surfshark':  True,
    'express':    False,
    'cyberghost': False,
    'proton':     False,
    'mullvad':    False,
    'perimeter':  False,
    'nordlayer':  False,
    'ivpn':       False,
    'pia':        False,
    'windscribe': False,
    'hidemyass':  False,
}

lines = content.split('\n')
for i, line in enumerate(lines):
    for vpn_id, live_val in live_flags.items():
        if f"id:'{vpn_id}'" in line and 'highlight:' in line and 'live:' not in line:
            flag = 'true' if live_val else 'false'
            new_line = re.sub(
                r'(highlight:(?:true|false),)',
                r'\1 live:' + flag + ',',
                line
            )
            if new_line != line:
                lines[i] = new_line
                changes.append(f'  OK  {vpn_id}: added live={flag}')
            else:
                changes.append(f'  WARN  {vpn_id}: pattern not found on line {i+1}')
content = '\n'.join(lines)

# ── STEP 2: Promote Surfshark to featured card ────────────────
# Change card:false to card:true and add tagline + features

lines = content.split('\n')
for i, line in enumerate(lines):
    if "id:'surfshark'" in line and 'card:false' in line:
        line = line.replace('card:false', 'card:true')
        line = line.replace(
            "tagline:'', features:[],",
            "tagline:'Unlimited devices — best value for families & power users', features:['Unlimited simultaneous devices','CleanWeb ad & malware blocker','NoBorders censorship bypass','Camouflage mode','30-day money-back guarantee','Surfshark One bundle available'],"
        )
        lines[i] = line
        changes.append('  OK  surfshark: promoted to card:true with tagline + features')
        break
content = '\n'.join(lines)

# ── STEP 3: Add 3 new VPN entries before closing ]; ──────────

new_entries = """
  { id:'ipvanish', name:'IPVanish', speed:550, speedLabel:'🔵 550 Mbps', servers:'2,200+', nolog:true, kill:true, devices:999, monthly:10.99, annual:3.99, biennial:3.99, score:8.2, tags:['personal'], tagLabel:'', tagClass:'', card:true, highlight:false, live:true, tagline:'Unlimited devices + WireGuard — powered by Ziff Davis', features:['Unlimited simultaneous devices','WireGuard & IKEv2 protocols','2,200+ servers in 75+ countries','SOCKS5 proxy included','Zero-log policy','30-day money-back guarantee'],
    link:'https://www.ipvanish.com/', guarantee:'30-day money-back', origPrice:10.99,
    pros:['Unlimited simultaneous devices','WireGuard support for fast speeds','SOCKS5 proxy included at no extra cost','Owned by Ziff Davis — established media company','30-day money-back guarantee'],
    cons:['Based in USA (5 Eyes jurisdiction)','No independent audit published yet','App can feel feature-heavy for beginners'],
    scores:{speed:7.8,privacy:7.8,streaming:8.2,value:8.5,ease:8.0},
    review:'<h3>Overview<\/h3><p>IPVanish is a long-standing US-based VPN provider known for its unlimited simultaneous connections and solid WireGuard implementation. Owned by Ziff Davis, it runs 2,200+ servers across 75+ countries.<\/h3><h3>Performance<\/h3><p>In our testing, IPVanish delivered consistent speeds on WireGuard, averaging 550 Mbps on local UK servers — competitive for its price tier. IKEv2 also performed well for mobile use.<\/p>',
    buyPrice:'$3.99', buyNote:'per month · billed annually' },

  { id:'tunnelbear', name:'TunnelBear', speed:450, speedLabel:'🔵 450 Mbps', servers:'5,000+', nolog:true, kill:true, devices:999, monthly:9.99, annual:3.33, biennial:1.67, score:7.9, tags:['personal'], tagLabel:'', tagClass:'', card:true, highlight:false, live:true, tagline:'Annual Cure53 security audit — most transparent VPN available', features:['Independently audited annually by Cure53','5,000+ servers in 45+ countries','Unlimited simultaneous devices','VigilantBear kill switch','GhostBear obfuscation','Free tier (2GB/month)'],
    link:'https://www.tunnelbear.com/', guarantee:'No refunds', origPrice:9.99,
    pros:['Annual independent audit by Cure53 — results published publicly','Extremely beginner-friendly interface','Free tier with 2GB per month','Unlimited devices','GhostBear obfuscation for restricted networks'],
    cons:['Based in Canada (5 Eyes)','No money-back guarantee','Slower speeds than premium providers'],
    scores:{speed:7.0,privacy:8.5,streaming:7.5,value:8.5,ease:9.5},
    review:'<h3>Overview<\/h3><p>TunnelBear is one of the most transparent VPNs available, commissioning annual independent security audits from Cure53 and publishing the full results publicly — a practice rare in the industry.<\/p><h3>Ease of Use<\/h3><p>TunnelBear consistently leads on user experience. Its bear-themed interface removes the technical complexity that puts beginners off VPNs, making it an excellent first VPN for non-technical users.<\/p>',
    buyPrice:'$3.33', buyNote:'per month · billed annually' },

  { id:'hotspotshield', name:'Hotspot Shield', speed:720, speedLabel:'⚡ 720 Mbps', servers:'3,200+', nolog:true, kill:true, devices:25, monthly:12.99, annual:7.99, biennial:2.99, score:8.0, tags:['personal'], tagLabel:'', tagClass:'', card:false, highlight:false, live:true, tagline:'', features:[], link:'https://www.hotspotshield.com/', guarantee:'45-day money-back', origPrice:12.99,
    pros:['Hydra protocol delivers class-leading speeds','45-day money-back guarantee','Strong streaming performance','One of the oldest VPN brands (since 2008)'],
    cons:['Based in USA (5 Eyes)','Hydra protocol is closed-source','Free tier is ad-supported'],
    scores:{speed:9.2,privacy:7.5,streaming:8.8,value:7.8,ease:8.5},
    review:'<h3>Overview<\/h3><p>Hotspot Shield uses its proprietary Hydra protocol to deliver some of the fastest VPN speeds available. In our testing it averaged 720 Mbps — second only to NordVPN. It has been operating since 2008 and serves over 650 million users globally.<\/p>',
    buyPrice:'$2.99', buyNote:'per month · billed every 3 years' },"""

# Insert before the closing ]; of the vpns array
vpns_close = '\n];'
if vpns_close in content:
    # Find the first ]; after the vpns array starts
    vpns_start = content.find('const vpns = [')
    close_pos = content.find(vpns_close, vpns_start)
    content = content[:close_pos] + new_entries + content[close_pos:]
    changes.append('  OK  Added IPVanish, TunnelBear, Hotspot Shield to vpns[]')
else:
    changes.append('  WARN  Could not find vpns array closing ]; — new entries not added')

# ── STEP 4: Update renderTable to filter by v.live ───────────

old_table_filter = 'vpns.filter(v=>filter===\'all\'||v.tags.includes(filter))'
new_table_filter = 'vpns.filter(v=>v.live&&(filter===\'all\'||v.tags.includes(filter)))'

if old_table_filter in content:
    content = content.replace(old_table_filter, new_table_filter)
    changes.append('  OK  renderTable: added v.live filter')
else:
    changes.append('  WARN  renderTable filter pattern not found')

# ── STEP 5: Update renderCards to filter by v.live ───────────

old_cards_filter = 'vpns.filter(v=>v.card)'
new_cards_filter = 'vpns.filter(v=>v.live&&v.card)'

if old_cards_filter in content:
    content = content.replace(old_cards_filter, new_cards_filter)
    changes.append('  OK  renderCards: added v.live filter')
else:
    changes.append('  WARN  renderCards filter pattern not found')

# ── WRITE OUTPUT ─────────────────────────────────────────────

if content != original:
    with open(SCRIPT, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'\npatch-live.py complete -- {len(changes)} operations:')
    for c in changes:
        print(c)
    print(f'\nscript.js updated. Run: node update-site.js')
else:
    print('No changes made. Check warnings above.')
