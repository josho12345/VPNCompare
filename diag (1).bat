@echo off
title VPN Compare — Diagnostics
color 0A
echo ============================================================
echo  VPN Compare — Diagnostics
echo  %DATE%  %TIME%
echo ============================================================
echo.

cd /d C:\_PROJECTS\VPNCompare

echo [1] BRANCH + LAST 3 COMMITS
echo ----------------------------------------
git branch --show-current
git log --oneline -3
echo.

echo [2] GIT STATUS
echo ----------------------------------------
git status --short
echo.

echo [3] FILE CHECKS
echo ----------------------------------------

findstr /c:"cloudDrift" style.css >nul 2>&1 && (
  echo [OK]  Clouds animation
) || echo [!!]  Clouds animation MISSING

findstr /c:"#a8c8dc" style.css >nul 2>&1 && (
  echo [OK]  Section background #a8c8dc
) || echo [!!]  Section background MISSING

findstr /c:"#0f3d6e" style.css >nul 2>&1 && (
  echo [OK]  Hero lightening #0f3d6e
) || echo [!!]  Hero lightening MISSING

findstr /c:"outline:2px solid rgba(204,85,0,.7)" style.css >nul 2>&1 && (
  echo [OK]  Orange rings 2px/70%
) || echo [!!]  Orange rings NOT updated

findstr /c:"cy='155'" style.css >nul 2>&1 && (
  echo [OK]  Cloud SVGs circles-only
) || echo [!!]  Cloud SVGs still old flat-bottom version

findstr /c:"scrollIntoView" script.js >nul 2>&1 && (
  echo [OK]  Quiz scroll fix
) || echo [!!]  Quiz scroll fix MISSING

findstr /c:"Daniel Cross" script.js >nul 2>&1 && (
  echo [OK]  Cybersecurity article
) || echo [!!]  Cybersecurity article MISSING

findstr /c:"v1.1.4" index.html >nul 2>&1 && (
  echo [OK]  Version v1.1.4
) || echo [!!]  Version v1.1.4 MISSING

echo.
echo ============================================================
echo  LIVE SITE : https://bestvpncompareonline.com
echo ============================================================
echo.
pause
