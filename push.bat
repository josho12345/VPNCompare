@echo off
:: ============================================================
:: VPN Compare -- Push Changes
:: bestvpncompareonline.com
:: ============================================================
:: GOLDEN RULE: Edit and save your files in
:: C:\_PROJECTS\VPNCompare first, then double-click this.
:: Everything from here is automatic.
:: ============================================================
:: This version checks the result of every git command and
:: STOPS if one fails. It will never tell you a push succeeded
:: when it did not.
:: ============================================================
cd /d C:\_PROJECTS\VPNCompare
if errorlevel 1 (
  echo.
  echo ERROR: Could not open C:\_PROJECTS\VPNCompare
  echo The folder may have been moved or renamed.
  echo Nothing was changed.
  echo.
  pause
  exit /b 1
)
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
if errorlevel 1 (
  echo.
  echo ============================================
  echo   STOPPED -- could not switch to %branchname%.
  echo ============================================
  echo.
  echo You are NOT on the branch you selected, so nothing
  echo has been committed or pushed. This is deliberate --
  echo continuing here could push your work to the wrong branch.
  echo.
  echo Read the git message above, or paste it to Claude.
  echo.
  pause
  exit /b 1
)
echo.
:: 2. Pull latest
echo Pulling latest from GitHub...
git pull
if errorlevel 1 (
  echo.
  echo ============================================
  echo   STOPPED -- the pull did not complete.
  echo ============================================
  echo.
  echo Nothing has been committed or pushed. Your local
  echo files are untouched.
  echo.
  echo This usually means GitHub has a change to the same
  echo file you edited, and the two versions need merging
  echo by hand.
  echo.
  echo Do NOT force push. Paste the git message above to Claude.
  echo.
  pause
  exit /b 1
)
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
if errorlevel 1 (
  echo.
  echo ============================================
  echo   STOPPED -- could not stage your changes.
  echo ============================================
  echo.
  echo Nothing has been committed or pushed.
  echo Paste the git message above to Claude.
  echo.
  pause
  exit /b 1
)
git commit -m "%msg%"
if errorlevel 1 (
  echo.
  echo ============================================
  echo   STOPPED -- the commit did not complete.
  echo ============================================
  echo.
  echo Nothing has been pushed. Your files are still saved
  echo on this laptop, they just are not recorded in git yet.
  echo.
  echo Paste the git message above to Claude.
  echo.
  pause
  exit /b 1
)
echo.
:dopush
:: 8. Confirm the remote branch is known to this laptop
::    (if it is not, skip the up-to-date check and just push)
git rev-parse --verify --quiet origin/%branchname% >nul
if errorlevel 1 (
  echo Remote branch not known locally -- pushing directly...
  goto :pushnow
)
:: 9. Check for unpushed commits
set unpushed=
for /f %%i in ('git log origin/%branchname%..%branchname% --oneline') do set unpushed=%%i
if not defined unpushed (
  echo Nothing to commit and nothing to push -- all up to date.
  pause
  exit /b 0
)
:pushnow
echo Pushing to %branchname%...
git push
if errorlevel 1 (
  echo.
  echo ============================================
  echo   PUSH FAILED -- your changes are NOT live.
  echo ============================================
  echo.
  echo Your work is committed on this laptop and is safe.
  echo It has NOT reached GitHub, so the site has NOT changed.
  echo.
  echo Do NOT force push. Read the git message above,
  echo or paste it to Claude.
  echo.
  pause
  exit /b 1
)
echo.
echo ============================================
echo   Done! Pushed to %branchname%.
if "%branchname%"=="main" (
  echo   Site redeploys in 1-2 minutes.
  echo   Check: https://bestvpncompareonline.com
)
echo ============================================
echo.
pause
