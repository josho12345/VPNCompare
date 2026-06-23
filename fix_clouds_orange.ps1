# fix_clouds_orange.ps1
# Fixes cloud SVGs (circles only, no flat bottoms) and boosts orange rings to 2px/70%

$path = (Get-Item 'style.css').FullName
Write-Host "Reading: $path"
$css = [System.IO.File]::ReadAllText($path)

$backup = $path + '.bak'
[System.IO.File]::WriteAllText($backup, $css)
Write-Host "Backup saved: style.css.bak"

$nl = "`r`n"

# New cloud SVGs - circles only, no rects, proper rounded bottoms
$c1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200'%3E%3Cg fill='white' opacity='.6'%3E%3Ccircle cx='50' cy='155' r='28'/%3E%3Ccircle cx='85' cy='138' r='38'/%3E%3Ccircle cx='130' cy='128' r='46'/%3E%3Ccircle cx='182' cy='126' r='44'/%3E%3Ccircle cx='230' cy='133' r='37'/%3E%3Ccircle cx='264' cy='148' r='26'/%3E%3C/g%3E%3Cg fill='white' opacity='.5'%3E%3Ccircle cx='500' cy='112' r='20'/%3E%3Ccircle cx='528' cy='97' r='28'/%3E%3Ccircle cx='562' cy='90' r='34'/%3E%3Ccircle cx='600' cy='94' r='28'/%3E%3Ccircle cx='628' cy='107' r='20'/%3E%3C/g%3E%3Cg fill='white' opacity='.38'%3E%3Ccircle cx='968' cy='72' r='15'/%3E%3Ccircle cx='990' cy='59' r='21'/%3E%3Ccircle cx='1016' cy='54' r='24'/%3E%3Ccircle cx='1043' cy='59' r='19'/%3E%3Ccircle cx='1062' cy='70' r='13'/%3E%3C/g%3E%3C/svg%3E"

$c2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 140'%3E%3Cg fill='white' opacity='.7'%3E%3Ccircle cx='38' cy='106' r='20'/%3E%3Ccircle cx='66' cy='90' r='30'/%3E%3Ccircle cx='102' cy='83' r='35'/%3E%3Ccircle cx='140' cy='87' r='29'/%3E%3Ccircle cx='166' cy='100' r='20'/%3E%3C/g%3E%3Cg fill='white' opacity='.5'%3E%3Ccircle cx='448' cy='76' r='14'/%3E%3Ccircle cx='469' cy='63' r='20'/%3E%3Ccircle cx='493' cy='57' r='22'/%3E%3Ccircle cx='517' cy='62' r='17'/%3E%3Ccircle cx='534' cy='74' r='12'/%3E%3C/g%3E%3Cg fill='white' opacity='.42'%3E%3Ccircle cx='728' cy='102' r='17'/%3E%3Ccircle cx='752' cy='87' r='25'/%3E%3Ccircle cx='781' cy='80' r='28'/%3E%3Ccircle cx='812' cy='86' r='22'/%3E%3Ccircle cx='832' cy='99' r='15'/%3E%3C/g%3E%3C/svg%3E"

# Build new cloud block
$sAll = "#quiz::before,#calculator::before,#reviews::before,#faq::before,#countries::before," + $nl + "#quiz::after,#calculator::after,#reviews::after,#faq::after,#countries::after"
$sBefore = "#quiz::before,#calculator::before,#reviews::before,#faq::before,#countries::before"
$sAfter = "#quiz::after,#calculator::after,#reviews::after,#faq::after,#countries::after"
$sCont = "#quiz>.container,#calculator>.container,#reviews>.container,#faq>.container,#countries>.container"

$newCloud = "/* -- CLOUD BACKGROUND ANIMATION -- */" + $nl
$newCloud += "@keyframes cloudDrift{from{background-position-x:0}to{background-position-x:-1200px}}" + $nl
$newCloud += "@keyframes cloudDriftSlow{from{background-position-x:0}to{background-position-x:-900px}}" + $nl
$newCloud += $sAll + "{content:'';position:absolute;inset:0;pointer-events:none}" + $nl
$newCloud += $sBefore + "{background-image:url(""" + $c1 + """);background-repeat:repeat-x;background-size:1200px 200px;background-position:0 10%;animation:cloudDrift 60s linear infinite;opacity:.45;z-index:-1}" + $nl
$newCloud += $sAfter + "{background-image:url(""" + $c2 + """);background-repeat:repeat-x;background-size:900px 140px;background-position:0 70%;animation:cloudDriftSlow 90s linear infinite;opacity:.28;z-index:-1}" + $nl
$newCloud += $sCont + "{position:relative;z-index:1}" + $nl

# Replace old cloud block
$startMarker = "/* -- CLOUD BACKGROUND ANIMATION -- */"
$endMarker = "/* -- BURNT ORANGE ACCENT RINGS -- */"
$startIdx = $css.IndexOf($startMarker)
$endIdx = $css.IndexOf($endMarker)

if ($startIdx -ge 0 -and $endIdx -ge 0) {
    $before = $css.Substring(0, $startIdx)
    $after = $css.Substring($endIdx)
    $css = $before + $newCloud + $nl + $after
    Write-Host "Cloud SVGs replaced OK"
} else {
    Write-Host "ERROR: Could not find cloud block markers. Aborting."
    pause
    exit 1
}

# Fix orange rings: 1px/40% -> 2px/70%
$css = $css.Replace("outline:1px solid rgba(204,85,0,.4)", "outline:2px solid rgba(204,85,0,.7)")
Write-Host "Orange rings updated to 2px/70%"

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $css, $encoding)

Write-Host ""
Write-Host "Done. Run push.bat to deploy."
