@echo off
title VPN Compare — Apply style.css Cloud Changes
color 0A
echo ============================================================
echo  Applying cloud background changes to style.css
echo ============================================================
echo.

cd /d C:\_PROJECTS\VPNCompare

powershell -ExecutionPolicy Bypass -File fix_style.ps1

echo.
pause
