# VPN Compare — Device Operating Guides
**bestvpncompareonline.com** · Three scenarios for near-zero-touch weekly maintenance

---

## Which Scenario Is You?

| Scenario | Best For | Weekly Hands-On Time |
|---|---|---|
| **A — Windows 7 Laptop** | Full control, runs the script locally | ~10 min |
| **B — Android Phone Only** | Travelling, no laptop access | ~15 min, no script |
| **C — Combo (Recommended)** | Best of both — phone monitors, laptop runs script | ~5 min on phone + 5 min on laptop once a week |

---

---

# SCENARIO A — Windows 7 Laptop Only

## One-Time Setup (do this once, takes about 45 minutes)

### A1. Install Node.js
1. Open Internet Explorer or Chrome on the laptop
2. Go to **nodejs.org**
3. Click the big green **LTS** download button (the "Recommended for Most Users" one)
4. Run the installer — click Next through everything, keep all defaults
5. When finished, click **Start → All Programs → Accessories → Command Prompt**
6. Type `node --version` and press Enter
7. You should see something like `v20.15.0` — if you do, Node is installed ✅
8. If you see an error, restart the laptop and try again

### A2. Install GitHub Desktop
1. Go to **desktop.github.com**
2. Download and install — it's straightforward, keep all defaults
3. Open GitHub Desktop and sign in with your GitHub account (create one free at github.com if you haven't)
4. Click **File → Clone Repository** → find your VPN Compare repo → choose a local folder like `C:\vpncompare\`
5. Click **Clone** — this downloads all your files to the laptop

### A3. Install Notepad++  *(free, much better than Notepad for editing .js files)*
1. Go to **notepad-plus-plus.org**
2. Download and install — keep all defaults
3. This is what you'll use to edit `site-data.js` each week

### A4. Create a Shortcut to Your Folder
1. Open File Explorer → navigate to `C:\vpncompare\`
2. Right-click on the folder → **Send to → Desktop (create shortcut)**
3. Now you can get to your files in one click from the desktop

### A5. Create a One-Click Update Batch File
This means you never have to type a command — just double-click a file.

1. Open Notepad (Start → All Programs → Accessories → Notepad)
2. Paste this exactly:
```
@echo off
cd /d C:\vpncompare
echo Running VPN Compare site update...
node update-site.js
echo.
echo Done! Check the output above for any warnings.
pause
```
3. Click **File → Save As**
4. Navigate to `C:\vpncompare\`
5. In the **Save as type** dropdown, choose **All Files**
6. Name it `UPDATE SITE.bat`
7. Click Save
8. Now there's a file called `UPDATE SITE.bat` in your folder — double-clicking it runs the whole update script with no typing required ✅

---

## Weekly Routine — Scenario A  *(target: 10 minutes every Monday)*

### Step 1 — Check NordVPN & PureVPN Prices  *(5 min)*
Open Chrome and check these two in tabs — they're the ones that change:

- **nordvpn.com/pricing** — note the 2-year plan price
- **purevpn.com/vpn-pricing** — confirm BESTVPN code still works (test it in the cart)

On the first Monday of each month also check the other 11 — open all their pricing pages in tabs and scan quickly.

### Step 2 — Edit site-data.js  *(2 min)*
1. Open your `C:\vpncompare\` shortcut on the desktop
2. Right-click `site-data.js` → **Edit with Notepad++**
3. Update the dates section at the top — change `lastChecked`, `tableUpdated`, `pricesVerified` to today
4. If any price changed, find that VPN in the `prices:` section and update the number
5. Press **Ctrl+S** to save

### Step 3 — Run the Update  *(10 seconds)*
Double-click `UPDATE SITE.bat` in your folder.
A black window opens, runs the script, prints the change log, then says "Done!"
Press any key to close it.

### Step 4 — Deploy  *(1 min)*
1. Open GitHub Desktop — it will show `index.html` as a changed file automatically
2. In the bottom left box, type a short commit message: `Weekly update 22 June`
3. Click **Commit to main**
4. Click **Push origin** (top right)
5. Site is live within 1–2 minutes ✅

### That's it. Four steps, ~10 minutes.

---

## Monthly Add-ons — Scenario A  *(first Monday of month, extra 20 min)*

- Open each of the 11 remaining VPN pricing pages — update any that changed in `site-data.js`
- Connect to each VPN one at a time, go to **fast.com**, note the speed — update `site-data.js → speeds`
- Run `UPDATE SITE.bat` again after all changes
- Deploy via GitHub Desktop as normal

---

## Troubleshooting — Scenario A

**"node is not recognised" error when running the .bat file**
→ Node didn't install correctly. Go back to nodejs.org, download again, restart laptop after installing.

**GitHub Desktop shows no changes after editing**
→ Make sure you saved the file in Notepad++ (Ctrl+S). Check the file is inside `C:\vpncompare\` not somewhere else.

**The .bat file flashes and closes instantly**
→ Something went wrong. Right-click `UPDATE SITE.bat` → **Edit** → on the last line change `pause` to `pause >nul`. Run again and read what it says before closing.

**Site not updating after Push**
→ Check GitHub Pages is enabled: github.com → your repo → Settings → Pages → Source should be set to `main` branch.

---

---

# SCENARIO B — Android Phone Only

## The Key Difference from Scenario A
You cannot run `node update-site.js` on Android. Instead you edit `site-data.js` directly in GitHub's website and let GitHub Actions (a free cloud service) run the script for you automatically. This requires a one-time setup on a computer first — borrow one if needed, even just for 30 minutes.

---

## One-Time Setup *(needs a computer for 30 min — borrow one if needed)*

### B1. Enable GitHub Actions on Your Repo
GitHub Actions is GitHub's free built-in automation — it can run your Node.js script in the cloud every time you push a change, so you never need to run it locally.

1. On a computer, go to **github.com** and open your VPN Compare repository
2. Click the **Actions** tab at the top
3. Click **set up a workflow yourself**
4. Delete what's in the editor and paste this:

```yaml
name: Update Site

on:
  push:
    paths:
      - 'site-data.js'

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Run update script
        run: node update-site.js

      - name: Commit updated index.html
        run: |
          git config user.name "VPN Compare Bot"
          git config user.email "bot@bestvpncompareonline.com"
          git add index.html
          git diff --staged --quiet || git commit -m "Auto-update: $(date '+%d %B %Y')"
          git push
```

5. Click **Commit changes**

**What this does:** Every time you edit and save `site-data.js` in GitHub, this workflow automatically runs `update-site.js` in the cloud, patches `index.html`, and commits the result — all without you touching a computer.

### B2. Install Apps on Your Android Phone

| App | Where | Free? | Purpose |
|---|---|---|---|
| **GitHub** (official) | Play Store | ✅ Free | Edit files, commit, see Actions running |
| **Acode** | Play Store | ✅ Free | Better code editor with syntax highlighting |
| **Chrome** | Pre-installed | ✅ Free | Check VPN pricing pages |

### B3. Bookmark These in Chrome on Your Phone
Save these as Chrome bookmarks for fast access:
- github.com/YOUR-USERNAME/YOUR-REPO (your repo)
- nordvpn.com/pricing
- purevpn.com/vpn-pricing
- mailerlite.com (newsletter stats)

---

## Weekly Routine — Scenario B  *(target: 15 minutes on your phone)*

### Step 1 — Check Prices in Chrome  *(5–8 min)*
Open your bookmarked NordVPN and PureVPN pricing pages.
Note any price changes on the Notes app on your phone.

### Step 2 — Edit site-data.js in GitHub  *(5 min)*
1. Open the GitHub app (or github.com in Chrome)
2. Navigate to your repo → tap `site-data.js`
3. Tap the **pencil icon** (Edit this file) in the top right
4. Update the date fields — find `lastChecked:` and change the date to today
5. Update any prices that changed
6. Scroll to the bottom → tap **Commit changes**
7. Type a message: `Weekly update 22 June` → tap **Commit**

### Step 3 — Wait 60 Seconds  *(hands off)*
The GitHub Actions workflow fires automatically the moment you commit.
You can watch it: in the GitHub app tap **Actions** → you'll see a yellow spinner → then a green tick ✅

That's it. `index.html` has been updated and deployed automatically. You did not run a single command.

### Step 4 — Verify  *(2 min, optional)*
Open your site in Chrome on your phone.
Pull down to refresh.
Check the announcement bar shows today's date.

---

## Monthly Add-ons — Scenario B  *(extra 15 min on phone)*

- Open all 13 VPN pricing pages in Chrome tabs, check for changes, update `site-data.js`
- Speed tests on phone are less reliable than laptop — either skip and update quarterly, or use a speed test app while connected to each VPN
- Commit the updated `site-data.js` → Actions runs automatically

---

## Troubleshooting — Scenario B

**Actions tab shows a red X (failed)**
→ Tap the failed run → read the error message. Most common cause: `update-site.js` couldn't find a pattern in `index.html`. Check that `site-data.js` edits were saved correctly.

**Can't see the pencil edit icon on GitHub**
→ You need to be logged in. Tap the profile icon → sign in.

**Changes not showing on the live site**
→ Check GitHub Pages is still set to deploy from `main` branch (Settings → Pages).

**Workflow not triggering**
→ Check the workflow file is in `.github/workflows/update-site.yml` — the path must be exact.

---

---

# SCENARIO C — Combo: Android Phone + Windows 7 Laptop  *(Recommended)*

## Why This Is the Best Setup
Your phone handles the **monitoring and light edits** throughout the week.
Your laptop handles the **monthly deeper work** where the script and speed tests run locally.
Together they give you near-zero-touch operation with a proper safety net.

---

## Division of Labour

| Task | Device | Frequency |
|---|---|---|
| Check NordVPN & PureVPN prices | 📱 Phone | Weekly — Monday morning, takes 5 min |
| Update dates in site-data.js | 📱 Phone via GitHub | Weekly — 2 min |
| Deploy updated site | ☁️ GitHub Actions automatic | Weekly — 0 min hands-on |
| Check all 13 VPN prices | 💻 Laptop | Monthly — open 13 tabs, 10 min |
| Run speed tests | 💻 Laptop | Monthly — connect to each VPN, 15 min |
| Run update-site.js locally | 💻 Laptop | Monthly — double-click .bat, 10 sec |
| Add new articles | 💻 Laptop via Notepad++ | Monthly or as needed |
| Affiliate link audit | 📱 Phone or 💻 Laptop | Monthly |
| Emergency fix | 💻 Laptop | As needed — restore from backup folder |

---

## One-Time Setup — Scenario C

Complete **both** setups:
- Follow all of **Scenario A setup** (Node.js, GitHub Desktop, Notepad++, .bat file) on the laptop
- Follow **Scenario B steps B1 and B2** (GitHub Actions workflow + phone apps)

Once both are done, the system is self-reinforcing — phone for quick weekly edits, laptop for monthly depth.

---

## Weekly Routine — Scenario C  *(target: 7 minutes total, mostly phone)*

### Monday Morning — On Your Phone  *(5 min)*

**Step 1 — Price check in Chrome** *(3 min)*
Open bookmarked NordVPN and PureVPN pricing pages.
Note any changes.

**Step 2 — Edit site-data.js via GitHub app** *(2 min)*
- Update `lastChecked` date to today
- Update any changed prices
- Commit with message `Weekly prices 22 June`

**Step 3 — Done. Go have coffee.** *(0 min)*
GitHub Actions patches and deploys `index.html` automatically in the background.
You'll get a green tick in the GitHub app within 60 seconds.

---

## First Monday of Each Month — On Laptop  *(25–30 min)*

### Step 1 — Pull Latest Changes  *(1 min)*
Open GitHub Desktop → click **Fetch origin** → **Pull origin**
This brings the phone's weekly edits down to the laptop so you're working on the latest version.

### Step 2 — Full Price Check  *(10 min)*
Open Chrome on the laptop. Open all 13 VPN pricing pages in tabs.
Update `site-data.js` in Notepad++ for any changes.

### Step 3 — Speed Tests  *(15 min)*
Connect to each VPN's UK server one at a time.
Go to **fast.com** — run test — note result — disconnect — next VPN.
Update `site-data.js → speeds` with the new Mbps figures.

### Step 4 — Run the Script  *(10 seconds)*
Double-click `UPDATE SITE.bat`
Read the change log — check for any ⚠ warnings.

### Step 5 — Deploy  *(1 min)*
GitHub Desktop → Commit → Push origin.

---

## The Failsafe — Why Combo Is Safest

If the GitHub Actions script fails for any reason (a pattern isn't found, a syntax error in your edit), the laptop is your backup. You can:

1. Pull the latest `site-data.js` from GitHub
2. Run `UPDATE SITE.bat` locally — it works with no internet connection
3. Push the fixed `index.html` from GitHub Desktop

You always have two paths to deploy. Neither depends on the other.

---

## Notification Setup — Make the Phone Tell You When Something Changes

Set up a free price-drop alert so you don't have to manually check NordVPN every week:

1. Go to **google.com/alerts** on your phone
2. Create an alert for: `NordVPN price 2026`
3. Create an alert for: `PureVPN discount code`
4. Set delivery to **As it happens** → your Zoho business email
5. Now Google emails you when pricing news appears — you only open the pricing page when alerted

Combined with the Monday date update (which takes 2 minutes regardless), this makes the weekly task almost entirely reactive — you only act when something actually changes.

---

## Summary — All Three Scenarios

```
SCENARIO A (Laptop only)
Every Monday:  Open Notepad++ → edit site-data.js → double-click .bat → GitHub Desktop push
Time: ~10 min

SCENARIO B (Phone only)
Every Monday:  Open GitHub app → edit site-data.js → commit
               GitHub Actions does the rest automatically
Time: ~7 min (no script running required)

SCENARIO C (Combo — Recommended)
Every Monday:  Phone → edit dates/prices in GitHub → commit → done (Actions auto-deploys)
Once a month:  Laptop → full check + speed tests + run .bat + push
Time: ~5 min weekly + 25 min monthly
```

The closer you get to Scenario C, the less you actually touch the site — and the more reliable it becomes.
