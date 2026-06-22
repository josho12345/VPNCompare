/**
 * ============================================================
 * VPN COMPARE — MASTER SITE DATA  (site-data.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * v2 — retrofitted 20 June 2026 for the "3-file architecture"
 * rebuild (index.html + style.css + script.js). VPN price/
 * score/speed data and the deals array now live in script.js,
 * not index.html — update-site.js was rewritten to match.
 * World Cup section removed (promo retired in the rebuild).
 *
 * HOW TO USE THIS FILE
 * ─────────────────────
 * Single source of truth for everything that changes on the
 * site. Edit a value here, save, run `node update-site.js`
 * (see automation.md), and the site refreshes automatically.
 *
 * WHAT LIVES HERE
 *   1. DATES          — "last checked", hero date, table date
 *   2. VPN PRICES     — monthly / annual / biennial per VPN
 *   3. VPN SCORES     — overall score per VPN
 *   4. SPEED RESULTS  — Mbps per VPN from latest test
 *   5. DEALS          — deal cards (price, note, promo code)
 *   6. ARTICLES       — blog post dates (titles live in script.js)
 *
 * UPDATE SCHEDULE (see automation.md for full checklist)
 *   Weekly  → DATES, DEALS, PRICES (check for changes)
 *   Monthly → SCORES, SPEED_RESULTS, ARTICLES dates
 * ============================================================
 */

const SITE_DATA = {

  /* ──────────────────────────────────────────────
     1. DATES
     Update: every Monday morning
     lastChecked/tableUpdated/pricesVerified/legalUpdated
     patch index.html. dealDate + legalUpdated also patch
     matching strings inside script.js (deal cards + the
     4 legal-modal pages, which are JS template strings).
  ────────────────────────────────────────────── */
  dates: {
    lastChecked:    '15 June 2026',   // announcement bar + pricing disclaimer + deal-card date (script.js)
    heroUpdated:    'June 2026',      // hero badge "Updated [month year]" + trust pill
    tableUpdated:   '15 June 2026',   // comparison table footer timestamp
    pricesVerified: '15 June 2026',   // pricing section header + disclaimer
    legalUpdated:   'June 2026',      // legal modal pages (script.js) — privacy/cookies/terms/affiliate
  },

  /* ──────────────────────────────────────────────
     2. VPN PRICING  (all USD)
     Update: check every Monday — providers change
     sale prices regularly, especially NordVPN.
     monthly   = normal no-commitment price
     annual    = best 1-year plan price
     biennial  = best 2-year plan price (lowest shown)
     origPrice = monthly price (shown as strikethrough)
     buyPrice/buyNote = shown in deep-review buy box
     ALL PATCHES TARGET script.js (vpns array)
  ────────────────────────────────────────────── */
  prices: {
    nordvpn:    { monthly: 11.99, annual: 3.99,  biennial: 2.99, origPrice: 11.99, buyPrice: '$3.99',  buyNote: 'per month · billed $95.76 every 2 years' },
    purevpn:    { monthly: 10.95, annual: 3.74,  biennial: 1.99, origPrice: 10.95, buyPrice: '$1.99',  buyNote: 'per month · billed every 2 years' },
    express:    { monthly: 12.95, annual: 6.67,  biennial: 4.99, origPrice: 12.95, buyPrice: '$6.67',  buyNote: 'per month · billed $80.04 per year' },
    cyberghost: { monthly: 12.99, annual: 2.19,  biennial: 2.03, origPrice: 12.99, buyPrice: '$2.03',  buyNote: 'per month · billed every 2 years' },
    proton:     { monthly: 9.99,  annual: 4.99,  biennial: 3.99, origPrice: 9.99,  buyPrice: '$4.99',  buyNote: 'per month · billed $59.88 per year' },
    mullvad:    { monthly: 5.50,  annual: 5.50,  biennial: 5.50, origPrice: 5.50,  buyPrice: '€5.00',  buyNote: 'per month · no long-term contract required' },
    surfshark:  { monthly: 10.99, annual: 2.49,  biennial: 1.99, origPrice: 10.99, buyPrice: '$2.49',  buyNote: 'per month · billed $59.76 every 2 years' },
    perimeter:  { monthly: 8.00,  annual: 6.00,  biennial: 5.00, origPrice: 11.00, buyPrice: '$6.00',  buyNote: 'per user/month · billed annually · min 5 users' },
    nordlayer:  { monthly: 9.00,  annual: 7.00,  biennial: 6.00, origPrice: 9.00,  buyPrice: '$7.00',  buyNote: 'per user/month · billed annually' },
    ivpn:       { monthly: 6.00,  annual: 5.00,  biennial: 4.50, origPrice: 6.00,  buyPrice: '$5.00',  buyNote: 'per month · billed annually' },
    pia:        { monthly: 9.95,  annual: 3.33,  biennial: 2.03, origPrice: 9.95,  buyPrice: '$3.33',  buyNote: 'per month · billed annually' },
    windscribe: { monthly: 9.00,  annual: 5.75,  biennial: 4.08, origPrice: 9.00,  buyPrice: '$5.75',  buyNote: 'per month · billed annually' },
    hidemyass:  { monthly: 11.99, annual: 4.99,  biennial: 3.99, origPrice: 11.99, buyPrice: '$4.99',  buyNote: 'per month · billed annually' },
  },

  /* ──────────────────────────────────────────────
     3. VPN OVERALL SCORES  (out of 10, 1 decimal)
     Update: monthly, after speed/feature re-test
     ALL PATCHES TARGET script.js (vpns array)
  ────────────────────────────────────────────── */
  scores: {
    nordvpn:    9.4,
    purevpn:    8.5,
    express:    9.1,
    cyberghost: 8.6,
    proton:     8.9,
    mullvad:    9.0,
    surfshark:  8.7,
    perimeter:  9.2,
    nordlayer:  8.8,
    ivpn:       8.3,
    pia:        8.4,
    windscribe: 8.1,
    hidemyass:  7.8,
  },

  /* ──────────────────────────────────────────────
     4. SPEED TEST RESULTS  (Mbps, WireGuard)
     Update: monthly (re-run speed tests)
     ALL PATCHES TARGET script.js (vpns array)
     Test from UK server to London endpoint at 1Gbps.
  ────────────────────────────────────────────── */
  speeds: {
    nordvpn:    780,
    purevpn:    600,
    express:    740,
    cyberghost: 680,
    proton:     620,
    mullvad:    650,
    surfshark:  710,
    perimeter:  580,
    nordlayer:  600,
    ivpn:       500,
    pia:        630,
    windscribe: 560,
    hidemyass:  520,
  },

  /* ──────────────────────────────────────────────
     5. DEALS SECTION CARDS
     Update: weekly — check for new promos,
     price drops, or promo code expiry.
     promo: null = no code. 'CODE' = shows copy badge.
     ALL PATCHES TARGET script.js (deals array)
  ────────────────────────────────────────────── */
  deals: [
    {
      name:      'NordVPN',
      badge:     'Most Popular',
      desc:      'Best overall — 6,400+ servers, Threat Protection AI, 10 devices, Panama jurisdiction',
      price:     '$3.99/mo',
      note:      'Billed on 2-year plan · Was $11.99/mo monthly',
      link:      'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=141394&url_id=902',
      guarantee: '30-day money-back guarantee',
      promo:     null,
    },
    {
      name:      'PureVPN',
      badge:     "Editor's Choice",
      desc:      'KPMG-audited · 6,500+ servers · 10 devices · port forwarding included · BVI jurisdiction',
      price:     '$1.99/mo',
      note:      'Billed on 2-year plan · Was $10.95/mo monthly',
      link:      'https://billing.purevpn.com/aff.php?aff=49387474',
      guarantee: '31-day money-back guarantee',
      promo:     'BESTVPN',
    },
    {
      name:      'CyberGhost',
      badge:     'Best Value',
      desc:      '9,200+ servers, dedicated streaming & torrent servers, 7 devices, Romania jurisdiction',
      price:     '$2.03/mo',
      note:      'Billed on 2-year plan · Was $12.99/mo monthly',
      link:      'https://www.cyberghostvpn.com/en_US/pricing',
      guarantee: '45-day money-back guarantee',
      promo:     null,
    },
    {
      name:      'Surfshark',
      badge:     'Best for Families',
      desc:      'Unlimited simultaneous devices, CleanWeb ad blocker, NoBorders mode, Netherlands jurisdiction',
      price:     '$2.49/mo',
      note:      'Billed on 2-year plan · Was $10.99/mo monthly',
      link:      'https://get.surfshark.net/aff_c?offer_id=1249&aff_id=44853',
      guarantee: '30-day money-back guarantee',
      promo:     null,
    },
  ],

  /* ──────────────────────────────────────────────
     6. ARTICLE PUBLISH DATES
     Update: when you publish a new article.
     Titles/content live in script.js's articles[] array —
     this only patches the date field for each, by position.
  ────────────────────────────────────────────── */
  articleDates: [
    '10 June 2026',   // [0] Best VPN for Streaming
    '2 June 2026',    // [1] No-Log What It Really Means
    '28 May 2026',    // [2] Best Business VPN
    '22 May 2026',    // [3] How to Set Up a VPN on Every Device
    '15 June 2026',   // [4] UK Online Safety Act
    '8 June 2026',    // [5] NordVPN vs ExpressVPN
  ],

  /* ──────────────────────────────────────────────
     AFFILIATE LINKS — Nord ecosystem (reference only,
     not patched automatically — edit script.js directly
     if these ever change)
     NordVPN:   go.nordvpn.net/aff_c?offer_id=15&aff_id=141394&url_id=902
     NordPass:  go.nordpass.io/aff_c?offer_id=488&aff_id=141394&url_id=9356
     NordLayer: nordlayer.com/pricing/ (tracked Impact link — same account)
     All via Impact Radius · aff_id=141394
  ────────────────────────────────────────────── */

};

// Export for Node.js (update script) — browser ignores this
if (typeof module !== 'undefined') module.exports = SITE_DATA;
