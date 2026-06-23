@echo off
title VPN Compare — Fix v3
color 0A
echo ============================================================
echo  Mirrored clouds, wider orange gap, brighter backgrounds
echo ============================================================
echo.
cd /d C:\_PROJECTS\VPNCompare
powershell -ExecutionPolicy Bypass -File fix3.ps1
echo.
pause
