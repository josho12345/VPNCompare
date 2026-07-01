@echo off
:: ============================================================
:: VPN Compare DEV — Push Changes
:: bestvpncompareonline.com (Dev branch only)
:: ============================================================
:: GOLDEN RULE: Edit and save your files in
:: C:\_PROJECTS\VPNCompare_DEV first, then double-click this.
:: This script ONLY pushes to the Dev branch. It never touches
:: production main or staging.
:: ============================================================
cd /d C:\_PROJECTS\VPNCompare_DEV
echo.
echo 
pause
============================================
echo   VPN Compare DEV -- Push Changes
echo   (Dev branch only -- production untouched)
echo ============================================
echo.
echo Switching to dev...
git checkout dev
echo.
:: Pull latest
echo Pulling latest from GitHub...
git pull origin Dev
echo.
:: Show what has changed
echo Files changed:
echo.
git status --short
echo.
:: Check if there is anything to commit
set changes=
for /f %%i in ('git status --porcelain') do set changes=%%i
if not defined changes (
  echo Nothing to commit -- checking for unpushed commits...
  echo.
  goto :dopush
)
:: Confirm before pushing
set /p confirm=Commit and push these changes to DEV branch? (y/n): 
if /i not "%confirm%"=="y" (
  echo Aborted -- no changes pushed.
  pause
  exit /b 0
)
:: Commit message
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set dt=%%I
set commitdate=%dt:~0,4%-%dt:~4,2%-%dt:~6,2%
set /p msg=Commit message (press Enter for "Dev update %commitdate%"): 
if "%msg%"=="" set msg=Dev update %commitdate%
:: Stage and commit
git add -A
git commit -m "%msg%"
echo.
:dopush
:: Check for unpushed commits and push if any exist
set unpushed=
for /f %%i in ('git log origin/Dev..dev --oneline') do set unpushed=%%i
if not defined unpushed (
  echo Nothing to commit and nothing to push -- all up to date.
  pause
  exit /b 0
)
echo Pushing to dev branch...
git push origin dev:Dev
if errorlevel 1 (
  echo.
  echo ============================================
  echo   PUSH FAILED -- see error above.
  echo   Changes are committed locally but NOT on GitHub.
  echo   Paste this output to Claude before doing anything else.
  echo ============================================
  echo.
  pause
  exit /b 1
)
echo.
echo ============================================
echo   Done! Pushed to DEV branch.
echo   Check Dev GitHub Pages URL to view changes.
echo   PRODUCTION (main) was NOT touched.
echo ============================================
echo.


pause
