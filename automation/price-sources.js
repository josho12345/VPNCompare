/**
 * ============================================================
 * VPN COMPARE — PRICE WATCH SOURCES  (price-sources.js)
 * bestvpncompareonline.com
 * ============================================================
 *
 * Separate from site-data.js on purpose: this file is about
 * WHERE to look for price changes (provider pages), not WHAT
 * the current published prices are.
 *
 * pricingUrl  = the provider's own public pricing page.
 *               Deliberately NOT the affiliate tracking link —
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
 * ⚠️  IMPORTANT — VERIFY ON FIRST RUN
 * I could not load these URLs live while building this (no
 * network access in this environment). They're my best-effort
 * guess at each provider's real pricing page based on public
 * knowledge, but several are unverified. Run the workflow
 * manually once (Actions tab → Price Watch → Run workflow)
 * and check the log/Issue for fetch errors (404s, redirects,
 * timeouts) — fix any wrong URLs here before trusting the
 * weekly schedule.
 * ============================================================
 */

const PRICE_SOURCES = {
  nordvpn:    { name: 'NordVPN',                pricingUrl: 'https://nordvpn.com/pricing/',                      domain: 'nordvpn.com' },
  purevpn:    { name: 'PureVPN',                pricingUrl: 'https://www.purevpn.com/pricing',                   domain: 'purevpn.com' },          // UNVERIFIED
  express:    { name: 'ExpressVPN',             pricingUrl: 'https://www.expressvpn.com/order/',                 domain: 'expressvpn.com' },
  cyberghost: { name: 'CyberGhost',             pricingUrl: 'https://www.cyberghostvpn.com/en_US/pricing',       domain: 'cyberghostvpn.com' },
  proton:     { name: 'Proton VPN',             pricingUrl: 'https://protonvpn.com/pricing/',                    domain: 'protonvpn.com' },
  mullvad:    { name: 'Mullvad VPN',            pricingUrl: 'https://mullvad.net/en/account/create',             domain: 'mullvad.net' },          // UNVERIFIED — may not show price tiers, flat €5/mo model
  surfshark:  { name: 'Surfshark',              pricingUrl: 'https://surfshark.com/pricing',                     domain: 'surfshark.com' },        // UNVERIFIED
  perimeter:  { name: 'Perimeter 81',           pricingUrl: 'https://sase.checkpoint.com',                       domain: 'checkpoint.com' },       // CONFIRMED rebrand to Check Point SASE
  nordlayer:  { name: 'NordLayer',              pricingUrl: 'https://nordlayer.com/pricing/',                    domain: 'nordlayer.com' },
  ivpn:       { name: 'IVPN',                   pricingUrl: 'https://www.ivpn.net/pricing/',                     domain: 'ivpn.net' },
  pia:        { name: 'Private Internet Access',pricingUrl: 'https://www.privateinternetaccess.com/buy-vpn-online', domain: 'privateinternetaccess.com' },
  windscribe: { name: 'Windscribe',             pricingUrl: 'https://windscribe.com/pricing',                    domain: 'windscribe.com' },       // UNVERIFIED
  hidemyass:  { name: 'HideMyAss',              pricingUrl: 'https://www.hidemyass.com/en-gb/index',             domain: 'hidemyass.com' },        // Site shows a cookie-consent wall before real content — simple fetch likely can't get past it; may stay in the "errors" list even with the right URL
};

if (typeof module !== 'undefined') module.exports = PRICE_SOURCES;
