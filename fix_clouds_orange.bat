@echo off
title VPN Compare — Fix Clouds and Orange Rings
color 0A
echo ============================================================
echo  Fixing cloud shapes and orange ring thickness
echo ============================================================
echo.
cd /d C:\_PROJECTS\VPNCompare
powershell -ExecutionPolicy Bypass -File fix_clouds_orange.ps1
echo.
pause
