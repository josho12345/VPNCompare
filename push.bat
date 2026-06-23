@echo off
:: ============================================================
:: VPN Compare — Push Changes
:: bestvpncompareonline.com
:: ============================================================
:: GOLDEN RULE: Edit and save your files in
:: C:\_PROJECTS\VPNCompare first, then double-click this.
:: Everything from here is automatic.
:: ============================================================
cd /d C:\_PROJECTS\VPNCompare
echo.
echo ============================================
echo   VPN Compare -- Push Changes
echo ============================================
echo.
:: 1. Which branch?
echo Which branch are you pushing to?
echo   1 = main (live site)
echo   2 = staging (testing)
echo.
set /p branch=Enter 1 or 2: 
if "%branch%"=="1" (
  set branchname=main
) else if "%branch%"=="2" (
  set branchname=staging
) else (
  echo Invalid choice. Exiting.
  pause
  exit /b 1
)
echo.
echo Switching to %branchname%...
git checkout %branchname%
echo.
:: 2. Pull latest
echo Pulling latest from GitHub...
git pull
echo.
:: 3. Show what has changed
echo Files changed:
echo.
git status --short
echo.
:: 4. Check if there is anything to commit
set changes=
for /f %%i in ('git status --porcelain') do set changes=%%i
if not defined changes (
  echo Nothing to commit -- checking for unpushed commits...
  echo.
  goto :dopush
)
:: 5. Confirm before pushing
set /p confirm=Commit and push these changes to %branchname%? (y/n): 
if /i not "%confirm%"=="y" (
  echo Aborted -- no changes pushed.
  pause
  exit /b 0
)
:: 6. Commit message
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set dt=%%I
set commitdate=%dt:~0,4%-%dt:~4,2%-%dt:~6,2%
set /p msg=Commit message (press Enter for "Site update %commitdate%"): 
if "%msg%"=="" set msg=Site update %commitdate%
:: 7. Stage and commit
git add -A
git commit -m "%msg%"
echo.
:dopush
:: 8. Check for unpushed commits and push if any exist
set unpushed=
for /f %%i in ('git log origin/%branchname%..%branchname% --oneline') do set unpushed=%%i
if not defined unpushed (
  echo Nothing to commit and nothing to push -- all up to date.
  pause
  exit /b 0
)
echo Pushing to %branchname%...
git push
echo.
echo ============================================
echo   Done! Pushed to %branchname%.
if "%branchname%"=="main" (
  echo   Site redeploys in 1-2 minutes.
  echo   Check: https://www.bestvpncompareonline.com
)
echo ============================================
echo.
pause