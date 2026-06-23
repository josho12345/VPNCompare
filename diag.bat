@echo off
title VPN Compare — Diagnostics
color 0A
echo ============================================================
echo  VPN Compare — Diagnostics
echo  %DATE%  %TIME%
echo ============================================================
echo.

cd /d C:\_PROJECTS\VPNCompare

echo [1] CURRENT BRANCH
echo ----------------------------------------
git branch --show-current
echo.

echo [2] GIT STATUS (uncommitted changes?)
echo ----------------------------------------
git status --short
echo.

echo [3] LAST 5 COMMITS
echo ----------------------------------------
git log --oneline -5
echo.

echo [4] LOCAL vs REMOTE (ahead/behind?)
echo ----------------------------------------
git fetch origin --quiet 2>nul
git status -uno
echo.

echo [5] LOCAL FILE CHECKS
echo ----------------------------------------

findstr /c:"cloudDrift" style.css >nul 2>&1 && (
  echo [OK]  style.css - cloudDrift animation FOUND
) || (
  echo [!!]  style.css - cloudDrift animation MISSING
)

findstr /c:"#a8c8dc" style.css >nul 2>&1 && (
  echo [OK]  style.css - #a8c8dc background FOUND
) || (
  echo [!!]  style.css - #a8c8dc background MISSING
)

findstr /c:"scrollIntoView" script.js >nul 2>&1 && (
  echo [OK]  script.js - scrollIntoView FOUND
) || (
  echo [!!]  script.js - scrollIntoView MISSING
)

findstr /c:"Daniel Cross" script.js >nul 2>&1 && (
  echo [OK]  script.js - Cybersecurity article FOUND
) || (
  echo [!!]  script.js - Cybersecurity article MISSING
)

echo.
echo [6] LIVE SITE CSS CHECK (fetching style.css from GitHub Pages)
echo ----------------------------------------
powershell -ExecutionPolicy Bypass -Command ^
  "try { $r = Invoke-WebRequest 'https://bestvpncompareonline.com/style.css' -UseBasicParsing -TimeoutSec 10; if ($r.Content -match 'cloudDrift') { Write-Host '[OK]  LIVE - cloudDrift found in production CSS' } else { Write-Host '[!!]  LIVE - cloudDrift NOT in production CSS (deploy may not have propagated yet)' } } catch { Write-Host '[??]  Could not reach live site: ' + $_.Exception.Message }"

echo.
echo [7] REMOTE URL
echo ----------------------------------------
git remote get-url origin
echo.

echo ============================================================
echo  LIVE SITE : https://bestvpncompareonline.com
echo  REPO      : https://github.com/josho12345/VPNCompare
echo ============================================================
echo.
pause
