# VPN Compare — Site Maintenance & Automation Guide
**bestvpncompareonline.com** · Last updated: June 2026

---

## The Core Idea

Instead of editing 2,000 lines of HTML every week, you maintain **one file** — `site-data.js` — and run **one command** — `node update-site.js` — which patches the entire site automatically in about 3 seconds.

**Your full weekly workflow is 6 steps:**
1. Open `site-data.js`
2. Update any changed prices / dates
3. Save
4. Run `node update-site.js` in Terminal
5. Check the change log it prints
6. Push to GitHub (one click in GitHub Desktop) → site is live

**Total time: 10–20 minutes per week.**

---

## File Structure

```
your-site-folder/
│
├── index.html          ← The website (don't edit dates/prices here directly)
├── site-data.js        ← YOUR MASTER UPDATE FILE (edit this weekly)
├── update-site.js      ← Automation script (run this, don't edit)
├── automation.md       ← This document
│
├── banners/
│   ├── adset1/         ← PureVPN World Cup banners set 1
│   │   ├── 728x90.png
│   │   ├── 970x90.png
│   │   ├── 300x250.png
│   │   ├── 300x600.png
│   │   ├── 160x600.png
│   │   ├── 320x50.png
│   │   └── 1200x628.png
│   └── adset2/         ← PureVPN World Cup banners set 2
│       └── (same filenames)
│
└── backups/            ← Auto-created by update script
    └── index.2026-06-15T09-00-00.html  ← Dated backup before each run
```

---

## One-Time Setup (do this once)

### 1. Install Node.js
Go to **nodejs.org** → download the LTS version → install.
Test it worked: open Terminal and type `node --version` — you should see `v20.x.x` or similar.

### 2. Install GitHub Desktop
Download from **desktop.github.com** — free, no command line needed for deploying.

### 3. MailerLite (newsletter)
1. Sign up free at **mailerlite.com** (free forever up to 1,000 subscribers)
2. Go to **Integrations → API** → copy your API token
3. Go to **Subscribers → Groups** → create a group called "VPN Compare Newsletter" → copy the numeric group ID
4. In `index.html` find these two lines near the top of the `<script>` section and paste your values:
   ```js
   const ML_API_TOKEN = 'PASTE_YOUR_MAILERLITE_API_TOKEN';
   const ML_GROUP_ID  = 'PASTE_YOUR_GROUP_ID';
   ```
5. In MailerLite **Settings → Sender** → add your Zoho domain email as the "From" address

### 4. Zoho Mail (your business email)
1. Sign up free at **zoho.com/mail**
2. During setup, choose "Add an existing domain" → enter `bestvpncompareonline.com`
3. Zoho will give you DNS records to add in GoDaddy — add them in GoDaddy DNS settings
4. You'll get `hello@bestvpncompareonline.com` (or any prefix you choose) for free
5. Use this address as your MailerLite sender and for advertise@ contact

---

## Weekly Task — Every Monday (10–20 min)

### Step 1: Check Prices (8 min)
Visit each provider's pricing page and compare to your `site-data.js` values.
Only update if the price has actually changed.

| Provider | Pricing Page | Check |
|---|---|---|
| NordVPN | nordvpn.com/pricing | Weekly — runs flash sales often |
| PureVPN | purevpn.com/vpn-pricing | Weekly — BESTVPN code — check it still works |
| ExpressVPN | expressvpn.com/order | Monthly is fine — rarely changes |
| CyberGhost | cyberghostvpn.com/en_US/buy | Monthly is fine |
| Proton VPN | protonvpn.com/pricing | Monthly is fine |
| Surfshark | surfshark.com/pricing | Monthly is fine |
| Mullvad | mullvad.net/pricing | Rarely changes — monthly check fine |

**The ones that change most often: NordVPN, PureVPN, CyberGhost.**

### Step 2: Update Dates in site-data.js (1 min)
Open `site-data.js`, update the `dates` section:
```js
dates: {
  lastChecked:    '22 June 2026',   // ← change to today's date
  tableUpdated:   '22 June 2026',   // ← same
  pricesVerified: '22 June 2026',   // ← same
  heroUpdated:    'June 2026',      // ← only change month when month changes
  legalUpdated:   'June 2026',      // ← only change when legal pages are edited
},
```

### Step 3: Update Any Changed Prices (1 min)
In `site-data.js`, update the `prices` section for any VPN with a new price.

### Step 4: Run the Update Script (10 seconds)
Open Terminal in your site folder:
```bash
node update-site.js
```
Read the change log. If you see ⚠ warnings, a pattern wasn't found — check the relevant section in index.html.

### Step 5: Check the Promo Code (1 min)
Go to PureVPN and verify the BESTVPN code still applies.
If it's expired, in `site-data.js` set:
```js
promoActive: { purevpn: false }
```
And remove the promo from the deals array:
```js
{ name: 'PureVPN', ..., promo: null },
```

### Step 6: Deploy (1 min)
Open **GitHub Desktop** → you'll see the changed `index.html` → write a commit message like "Weekly update 22 June" → click **Commit** → **Push origin**.
Your site goes live automatically if GitHub Pages is enabled, or sync to GoDaddy hosting.

---

## Monthly Task — First Monday of Each Month (20–30 min)

### Speed Tests (15 min)
Run fresh speed tests and update `site-data.js → speeds`.

**Free speed test method:**
1. Connect to each VPN's UK server
2. Go to **fast.com** or **speedtest.net**
3. Run 3 tests, take the average
4. Update the Mbps value in `site-data.js`

Anything ≥700 Mbps gets the ⚡ icon, below 700 gets 🔵 — the script handles this automatically.

### Scores Review (10 min)
Review whether any score needs adjusting based on:
- New security audits published
- Major app updates or new features
- User complaints or press coverage
- Ownership changes or policy updates

Update `site-data.js → scores` if needed.

### Add a New Article (10 min)
In `index.html`, find the `articles` array (search for `const articles=[`) and add a new entry following the existing format. Add the date to `site-data.js → articleDates` array.

**Article ideas rotation (keeps Google happy with fresh content):**
- Week 1: Comparison head-to-head (NordVPN vs X)
- Week 2: Country guide update
- Week 3: Privacy / legal news
- Week 4: How-to / tutorial

### Affiliate Link Audit (5 min)
Click each affiliate link to confirm it's not 404ing or redirecting wrong.

| VPN | Affiliate Network | Check |
|---|---|---|
| NordVPN | Impact Radius | go.nordvpn.net link |
| PureVPN | Direct | billing.purevpn.com link |
| CyberGhost | Direct / CJ | cyberghostvpn.com link |
| Surfshark | get.surfshark.net | All 5 offer IDs |
| Perimeter 81 | Direct | perimeter81.com — need proper aff link |

**Outstanding: Get a proper tracked affiliate link for Perimeter 81.** Their programme is on Impact Radius — sign up at impact.com and search for "Perimeter 81".

---

## Quarterly Task (every 3 months)

- Re-run all 8 methodology test categories for the top 5 VPNs
- Update the full review content in `articles[]` for any major changes
- Review legal pages for accuracy
- Check all country guide recommendations are still current
- Update the `foundingDate` / `areaServed` in Organization schema if needed
- Review meta description and title tags for keyword freshness

---

## World Cup Promo — Expires 19 July 2026

The World Cup banner auto-hides on 19 July 2026 via the JavaScript countdown. You don't need to do anything.

After the World Cup ends:
1. In `site-data.js` set `worldCup: { showBanner: false }`
2. In `promoActive` set `purevpn: false` (unless another promo is running)
3. In `deals` array set PureVPN's `promo: null`
4. Run `node update-site.js` → deploy

---

## What's Automated vs Manual — Summary

| Task | Automated | Manual |
|---|---|---|
| Date strings (6 locations) | ✅ Script | |
| VPN prices (13 VPNs × 3 plans) | ✅ Script | |
| VPN scores (13 VPNs) | ✅ Script | |
| Speed results (13 VPNs) | ✅ Script | |
| Deals section rebuild | ✅ Script | |
| World Cup banner on/off | ✅ Script | |
| Backup before every change | ✅ Script | |
| Deploy to GitHub | | ✅ 1 click |
| Price checking (visit sites) | | ✅ 8 min |
| Speed tests | | ✅ 15 min/month |
| New articles | | ✅ As needed |
| Affiliate link audit | | ✅ Monthly |

---

## Pending Items (to action)

- [ ] **MailerLite** — create account, paste API token + group ID into index.html
- [ ] **Zoho Mail** — create free account, add DNS records to GoDaddy, get business email
- [ ] **Perimeter 81** — get proper affiliate tracking link from Impact Radius
- [ ] **GitHub Pages / GoDaddy hosting** — confirm deployment pipeline is live
- [ ] **og:image** — create a 1200×630 social share image and upload as `/images/og-vpncompare-2026.png`
- [ ] **Google Search Console** — submit sitemap, verify property, monitor indexing
- [ ] **Google Analytics** — add GA4 tracking snippet for traffic monitoring
- [ ] **World Cup banners** — upload adset1/ and adset2/ folders alongside index.html on server

---

## Emergency — Something Broke

Every time the update script runs it saves a backup to the `backups/` folder with a timestamp. To restore:
```bash
cp backups/index.2026-06-15T09-00-00.html index.html
```
Then redeploy. You will never lose more than one week's work.
