/**
 * ============================================================
 * VPN COMPARE - PRICE WATCH SOURCES  (price-sources.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * Separate from site-data.js on purpose: this file is about
 * WHERE to look for price changes (provider pages), not WHAT
 * the current published prices are.
 *
 * pricingUrl  = the provider's own public pricing page.
 *               Deliberately NOT the affiliate tracking link --
 *               scraping price off a tracking redirect is
 *               unreliable (session/cohort-personalised
 *               landing pages). link-check.js checks the
 *               affiliate links separately for that reason.
 *
 * domain      = the hostname the affiliate link should
 *               ultimately redirect to. Used by link-check.js
 *               to catch a hijacked/expired/wrong-destination
 *               affiliate link.
 *
 * watchPrice  = config for auto-update.js
 *               field    = which site-data.js prices field to update
 *               currency = expected currency symbol on pricing page
 *               min/max  = sanity range -- reject prices outside this
 *               The auto-updater finds the LOWEST token in range
 *               (= the advertised headline "from" price).
 *               Set watchPrice: null to skip auto-update for a VPN.
 *
 * AUTO_UPDATE SWITCH
 * Controlled by AUTO_UPDATE env variable in price-watch.yml.
 * false (default) = detect changes, email you, you update manually.
 * true            = detect changes, validate, patch site-data.js,
 *                   run update-site.js, commit, email you the diff.
 *
 * VERIFY ON FIRST RUN
 * Run workflow manually (Actions > Price Watch > Run workflow)
 * and check the Issue for fetch errors -- fix wrong URLs here.
 * ============================================================
 */

const PRICE_SOURCES = {

  nordvpn: {
    name:           'NordVPN',
    pricingUrl:     'https://nordvpn.com/pricing/',
    domain:         'nordvpn.com',
    skipLinkCheck:  true,  // CDN blocks GitHub Actions IPs with 403 -- false positive
    skipPriceWatch: true,  // Same CDN block affects pricing page fetch
    watchPrice:     { field: 'biennial', currency: '$', min: 1.00, max: 8.00 },
  },

  purevpn: {
    name:       'PureVPN',
    pricingUrl: 'https://www.purevpn.com/pricing',
    domain:     'purevpn.com',
    watchPrice: { field: 'biennial', currency: '$', min: 0.99, max: 6.00 },
  },

  surfshark: {
    name:       'Surfshark',
    pricingUrl: 'https://surfshark.com/pricing',
    domain:     'surfshark.com',
    watchPrice: { field: 'biennial', currency: '$', min: 0.99, max: 6.00 },
  },

  express: {
    name:       'ExpressVPN',
    pricingUrl: 'https://www.expressvpn.com/order/',
    domain:     'expressvpn.com',
    watchPrice: { field: 'biennial', currency: '$', min: 2.00, max: 10.00 },
  },

  cyberghost: {
    name:       'CyberGhost',
    pricingUrl: 'https://www.cyberghostvpn.com/en_US/pricing',
    domain:     'cyberghostvpn.com',
    watchPrice: { field: 'biennial', currency: '$', min: 0.99, max: 6.00 },
  },

  proton: {
    name:       'Proton VPN',
    pricingUrl: 'https://protonvpn.com/pricing/',
    domain:     'protonvpn.com',
    watchPrice: { field: 'biennial', currency: '$', min: 2.00, max: 8.00 },
  },

  mullvad: {
    name:       'Mullvad VPN',
    pricingUrl: 'https://mullvad.net/en/account/create',
    domain:     'mullvad.net',
    jsRendered: true,  // Prices load via JS -- raw fetch returns zero tokens
    watchPrice: { field: 'monthly', currency: '\u20ac', min: 3.00, max: 10.00 },
  },

  pia: {
    name:       'Private Internet Access',
    pricingUrl: 'https://www.privateinternetaccess.com/buy-vpn-online',
    domain:     'privateinternetaccess.com',
    watchPrice: { field: 'biennial', currency: '$', min: 0.99, max: 6.00 },
  },

  windscribe: {
    name:       'Windscribe',
    pricingUrl: 'https://windscribe.com/pricing',
    domain:     'windscribe.com',
    jsRendered: true,  // Prices load via JS -- raw fetch returns zero tokens
    watchPrice: { field: 'annual', currency: '$', min: 2.00, max: 10.00 },
  },

  hidemyass: {
    name:       'HideMyAss',
    pricingUrl: 'https://www.hidemyass.com/en-gb/index',
    domain:     'hidemyass.com',
    jsRendered: true,  // Cookie-consent wall + JS rendering blocks raw fetch
    watchPrice: { field: 'annual', currency: '$', min: 2.00, max: 10.00 },
  },

  nordlayer: {
    name:       'NordLayer',
    pricingUrl: 'https://nordlayer.com/pricing/',
    domain:     'nordlayer.com',
    watchPrice: { field: 'annual', currency: '$', min: 3.00, max: 15.00 },
  },

  ivpn: {
    name:       'IVPN',
    pricingUrl: 'https://www.ivpn.net/pricing/',
    domain:     'ivpn.net',
    jsRendered: true,  // Prices load via JS -- raw fetch returns zero tokens
    watchPrice: { field: 'annual', currency: '$', min: 2.00, max: 12.00 },
  },

  perimeter: {
    name:       'Perimeter 81',
    pricingUrl: 'https://sase.checkpoint.com',
    domain:     'checkpoint.com',
    jsRendered: true,  // JS-rendered + B2B per-user pricing too variable for auto-update
    watchPrice: null,
  },

};

if (typeof module !== 'undefined') module.exports = PRICE_SOURCES;
