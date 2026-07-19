/**
 * ============================================================
 * VPN COMPARE - MASTER SITE DATA  (site-data.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * HOW TO USE THIS FILE
 * This is the single source of truth for everything that
 * changes on the site. Edit a value here, save, run
 * node update-site.js, and the site refreshes.
 *
 * WHAT LIVES HERE
 *   1. DATES          - "last checked", hero date, table date
 *   2. VPN PRICES     - monthly / annual / biennial per VPN
 *   3. VPN SCORES     - overall score per VPN
 *   4. SPEED RESULTS  - Mbps per VPN from latest test
 *   5. DEALS          - deal cards (price, note, promo code)
 *   6. LIVE FLAGS     - which VPNs are visible on the site
 *   7. PROMO FLAGS    - which VPNs show gold button
 *   8. ARTICLE DATES  - blog post publish dates
 *
 * LIVE FLAG WORKFLOW
 *   Set live: true  = VPN appears in table, cards, reviews
 *   Set live: false = VPN hidden from site (pending affiliate)
 *   After editing: node update-site.js -> push
 *
 * UPDATE SCHEDULE
 *   Weekly  - DATES, DEALS, PRICES (check for changes)
 *   Monthly - SCORES, SPEED_RESULTS, ARTICLE DATES
 * ============================================================
 */

const SITE_DATA = {

  /* ──────────────────────────────────────────────
     1. DATES
  ────────────────────────────────────────────── */
  dates: {
    lastChecked:    '19 July 2026',
    heroUpdated:    'June 2026',
    tableUpdated:   '19 July 2026',
    pricesVerified: '19 July 2026',
    legalUpdated:   'June 2026',
  },

  /* ──────────────────────────────────────────────
     2. VPN PRICING  (all USD unless noted)
     monthly   = no-commitment monthly price
     annual    = best 1-year plan per month
     biennial  = best 2-year plan per month (lowest)
     origPrice = monthly price (strikethrough)
  ────────────────────────────────────────────── */
  prices: {
    nordvpn:       { monthly: 11.99, annual: 3.49,  biennial: 2.99, origPrice: 11.99, buyPrice: '$3.49',  buyNote: 'per month · billed $83.76 every 2 years'},
    purevpn:       { monthly: 10.95, annual: 3.74,  biennial: 2.15, origPrice: 10.95, buyPrice: '$2.15',  buyNote: 'per month · billed every 2 years' },
    express:       { monthly: 12.95, annual: 6.67,  biennial: 4.99, origPrice: 12.95, buyPrice: '$6.67',  buyNote: 'per month · billed $80.04 per year' },
    cyberghost:    { monthly: 12.99, annual: 2.19,  biennial: 2.03, origPrice: 12.99, buyPrice: '$2.03',  buyNote: 'per month · billed every 2 years' },
    proton:        { monthly: 9.99,  annual: 4.99,  biennial: 3.99, origPrice: 9.99,  buyPrice: '$4.99',  buyNote: 'per month · billed $59.88 per year' },
    mullvad:       { monthly: 5.50,  annual: 5.50,  biennial: 5.50, origPrice: 5.50,  buyPrice: '\u20ac5.00', buyNote: 'per month · no long-term contract required' },
    surfshark:     { monthly: 10.99, annual: 2.49,  biennial: 1.99, origPrice: 10.99, buyPrice: '$2.49',  buyNote: 'per month · billed $59.76 every 2 years' },
    perimeter:     { monthly: 8.00,  annual: 6.00,  biennial: 5.00, origPrice: 11.00, buyPrice: '$6.00',  buyNote: 'per user/month · billed annually · min 5 users' },
    nordlayer:     { monthly: 9.00,  annual: 7.00,  biennial: 6.00, origPrice: 9.00,  buyPrice: '$7.00',  buyNote: 'per user/month · billed annually' },
    ivpn:          { monthly: 6.00,  annual: 5.00,  biennial: 4.50, origPrice: 6.00,  buyPrice: '$5.00',  buyNote: 'per month · billed annually' },
    pia:           { monthly: 9.95,  annual: 3.33,  biennial: 2.03, origPrice: 9.95,  buyPrice: '$3.33',  buyNote: 'per month · billed annually' },
    windscribe:    { monthly: 9.00,  annual: 5.75,  biennial: 4.08, origPrice: 9.00,  buyPrice: '$5.75',  buyNote: 'per month · billed annually' },
    hidemyass:     { monthly: 11.99, annual: 4.99,  biennial: 3.99, origPrice: 11.99, buyPrice: '$4.99',  buyNote: 'per month · billed annually' },
    // New additions
    ipvanish:      { monthly: 10.99, annual: 3.99,  biennial: 3.99, origPrice: 10.99, buyPrice: '$3.99',  buyNote: 'per month · billed annually' },
    tunnelbear:    { monthly: 9.99,  annual: 3.33,  biennial: 1.67, origPrice: 9.99,  buyPrice: '$3.33',  buyNote: 'per month · billed annually' },
    hotspotshield: { monthly: 12.99, annual: 7.99,  biennial: 2.99, origPrice: 12.99, buyPrice: '$2.99',  buyNote: 'per month · billed every 3 years' },
  },

  /* ──────────────────────────────────────────────
     3. VPN OVERALL SCORES  (out of 10, 1 decimal)
     Update: monthly, after speed/feature re-test
  ────────────────────────────────────────────── */
  scores: {
    nordvpn:       9.4,
    purevpn:       8.5,
    express:       9.1,
    cyberghost:    8.6,
    proton:        8.9,
    mullvad:       9.0,
    surfshark:     8.7,
    perimeter:     9.2,
    nordlayer:     8.8,
    ivpn:          8.3,
    pia:           8.4,
    windscribe:    8.1,
    hidemyass:     7.8,
    // New additions
    ipvanish:      8.2,
    tunnelbear:    7.9,
    hotspotshield: 8.0,
  },

  /* ──────────────────────────────────────────────
     4. SPEED TEST RESULTS  (Mbps, WireGuard)
     Update: monthly (re-run speed tests)
     UK server to London endpoint at 1Gbps.
  ────────────────────────────────────────────── */
  speeds: {
    nordvpn:       780,
    purevpn:       600,
    express:       740,
    cyberghost:    680,
    proton:        620,
    mullvad:       650,
    surfshark:     710,
    perimeter:     580,
    nordlayer:     600,
    ivpn:          500,
    pia:           630,
    windscribe:    560,
    hidemyass:     520,
    // New additions
    ipvanish:      550,
    tunnelbear:    450,
    hotspotshield: 720,
  },

  /* ──────────────────────────────────────────────
     5. DEALS SECTION CARDS
     Update: weekly -- check for new promos.
     promo: null = no code. 'CODE' = shows copy badge.
     Replace placeholder links with CJ tracked links
     when affiliate applications are approved.
  ────────────────────────────────────────────── */
  deals: [
    {
      name:      'NordVPN',
      badge:     'Most Popular',
      desc:      'Best overall -- 6,400+ servers, Threat Protection AI, 10 devices, Panama jurisdiction',
      price:     '$3.49/mo',
      note:      'Billed on 2-year plan · Was $11.99/mo monthly',
      link:      'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=141394&url_id=902',
      guarantee: '30-day money-back guarantee',
      promo:     null,
    },
    {
      name:      'PureVPN',
      badge:     "Editor's Choice",
      desc:      'KPMG-audited · 6,500+ servers · 10 devices · port forwarding · BVI jurisdiction',
      price:     '$2.15/mo',
      note:      'Billed on 2-year plan · Was $10.95/mo monthly',
      link:      'https://billing.purevpn.com/aff.php?aff=49387474',
      guarantee: '31-day money-back guarantee',
      promo:     'BESTVPN',
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
    {
      name:      'IPVanish',
      badge:     'Unlimited Devices',
      desc:      'Unlimited simultaneous devices, WireGuard & IKEv2, 2,200+ servers, 30-day money-back',
      price:     '$3.49/mo',
      note:      'Billed annually · Was $10.99/mo monthly',
      link:      'https://www.ipvanish.com/',   // TODO: replace with CJ affiliate link when approved
      guarantee: '30-day money-back guarantee',
      promo:     null,
    },
  ],

  /* ──────────────────────────────────────────────
     6. LIVE FLAGS
     Controls which VPNs appear on the site.
     true  = visible in table, cards, reviews
     false = hidden (pending affiliate approval)

     WORKFLOW: change false -> true here, then
     node update-site.js -> push -> VPN goes live.
  ────────────────────────────────────────────── */
  live: {
    // Active (affiliated)
    nordvpn:       true,
    purevpn:       true,
    surfshark:     true,
    // New fillers (CJ applications in progress)
    ipvanish:      true,
    tunnelbear:    true,
    hotspotshield: true,
    // Pending affiliate approval -- flip to true when approved
    express:       false,
    cyberghost:    false,
    proton:        false,
    mullvad:       false,
    perimeter:     false,
    nordlayer:     false,
    ivpn:          false,
    pia:           false,
    windscribe:    false,
    hidemyass:     false,
  },

  /* ──────────────────────────────────────────────
     7. PROMO FLAGS
     true  = gold promo button (active deal)
     false = standard blue button
  ────────────────────────────────────────────── */
  promoActive: {
    nordvpn:       false,
    purevpn:       true,
    express:       false,
    cyberghost:    false,
    proton:        false,
    mullvad:       false,
    surfshark:     false,
    perimeter:     false,
    nordlayer:     false,
    ivpn:          false,
    pia:           false,
    windscribe:    false,
    hidemyass:     false,
    ipvanish:      false,
    tunnelbear:    false,
    hotspotshield: false,
  },

  /* ──────────────────────────────────────────────
     8. ARTICLE PUBLISH DATES
     Update: when you publish a new article.
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
     AFFILIATE NOTES
     NordVPN/NordPass/NordLayer: Impact Radius aff_id=141394
     PureVPN: aff=49387474
     Surfshark: aff_id=44853
     IPVanish, TunnelBear, Hotspot Shield: CJ Affiliate (apply)
  ────────────────────────────────────────────── */

  nordpass: {
    link:    'https://go.nordpass.io/aff_c?offer_id=488&aff_id=141394&url_id=9356',
    network: 'Impact Radius',
    note:    'Password manager -- shown in NordVPN review section',
  },

  worldCup: {
    showBanner:  true,
    endDate:     '2026-07-19T20:00:00Z',
    promoCode:   'BESTVPN',
    promoUrl:    'https://www.purevpn.com/stream-sports/fifa?aff=49387474',
    deadlineText: '19 July 2026',
  },

};

if (typeof module !== 'undefined') module.exports = SITE_DATA;
