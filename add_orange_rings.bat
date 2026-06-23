@echo off
title VPN Compare — Add Orange Accent Rings
color 0A
echo ============================================================
echo  Adding burnt orange accent rings to style.css
echo ============================================================
echo.

cd /d C:\_PROJECTS\VPNCompare

powershell -ExecutionPolicy Bypass -File add_orange_rings.ps1

echo.
pause
