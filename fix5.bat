@echo off
title VPN Compare — Orange Ring Fix v5
color 0A
echo ============================================================
echo  Removing orange from green cards, increasing gap to 6px
echo ============================================================
echo.
cd /d C:\_PROJECTS\VPNCompare
powershell -ExecutionPolicy Bypass -File fix5.ps1
echo.
pause
