@echo off
title VPN Compare — Cloud and Orange Fix v2
color 0A
echo ============================================================
echo  Fixing clouds and orange rings
echo ============================================================
echo.
cd /d C:\_PROJECTS\VPNCompare
powershell -ExecutionPolicy Bypass -File fix2.ps1
echo.
pause
