@echo off
title VPN Compare — Orange Ring Fix v6
color 0A
echo ============================================================
echo  Halving gap, widening orange to fill space
echo ============================================================
echo.
cd /d C:\_PROJECTS\VPNCompare
powershell -ExecutionPolicy Bypass -File fix6.ps1
echo.
pause
