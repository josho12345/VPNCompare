@echo off
cd /d C:\_PROJECTS\VPNCompare

echo ============================================
echo   VPN Compare -- Scheduled Auto Sync
echo   %DATE% %TIME%
echo ============================================
echo.

echo Stamping dates...
powershell -ExecutionPolicy Bypass -File _UPDATES\stamp-date.ps1

echo.
echo Checking for changes...
git checkout main
git pull origin main

git add -A
git diff --staged --quiet && (
    echo No changes -- repo already up to date. Scheduler stays warm.
) || (
    git commit -m "Auto sync %DATE%"
    git push origin main
    echo Pushed to main.
)

echo.
echo ============================================
echo   Done: %DATE% %TIME%
echo ============================================
