@echo off
title VPN Compare — style.css Inspector
color 0B
echo ============================================================
echo  style.css — Showing actual section background lines
echo ============================================================
echo.

cd /d C:\_PROJECTS\VPNCompare

echo Searching style.css for section background declarations...
echo (copying matching lines to screen)
echo.

findstr /n /c:"#quiz" /c:"#calculator" /c:"#reviews" /c:"#faq{" /c:"#countries" /c:"#methodology" /c:"#featured" style.css

echo.
echo ============================================================
echo  Done. Paste the output above back to Claude.
echo ============================================================
echo.
pause
