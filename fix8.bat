@echo off
title VPN Compare — Fix v8 Orange Effects
color 0A
echo ============================================================
echo  Orange card effects + table lines
echo ============================================================
echo.
cd /d C:\_PROJECTS\VPNCompare
powershell -ExecutionPolicy Bypass -File fix8.ps1
echo.
pause
