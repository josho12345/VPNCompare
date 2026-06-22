# fix_style.ps1
# Applies cloud background + section colour changes to style.css
# Run via fix_style.bat from C:\_PROJECTS\VPNCompare\

$path = (Get-Item 'style.css').FullName
Write-Host "Reading: $path"

$css = [System.IO.File]::ReadAllText($path)

# Backup first
$backup = $path + '.bak'
[System.IO.File]::WriteAllText($backup, $css)
Write-Host "Backup saved: style.css.bak"
Write-Host ""

# ── 5 section background replacements ──────────────────────────
Write-Host "Applying section background colour changes..."

$css = $css -replace '#quiz\{background:var\(--bg\)\}',       '#quiz{background:#a8c8dc;position:relative;overflow:hidden;z-index:0}'
$css = $css -replace '#calculator\{background:var\(--bg\)\}', '#calculator{background:#a8c8dc;position:relative;overflow:hidden;z-index:0}'
$css = $css -replace '#reviews\{background:var\(--bg\)\}',    '#reviews{background:#a8c8dc;position:relative;overflow:hidden;z-index:0}'
$css = $css -replace '#faq\{background:var\(--bg\)\}',        '#faq{background:#a8c8dc;position:relative;overflow:hidden;z-index:0}'
$css = $css -replace '#countries\{background:var\(--bg\)\}',  '#countries{background:#a8c8dc;position:relative;overflow:hidden;z-index:0}'

Write-Host "  #quiz          -> #a8c8dc + position/overflow/z-index"
Write-Host "  #calculator    -> #a8c8dc + position/overflow/z-index"
Write-Host "  #reviews       -> #a8c8dc + position/overflow/z-index"
Write-Host "  #faq           -> #a8c8dc + position/overflow/z-index"
Write-Host "  #countries     -> #a8c8dc + position/overflow/z-index"
Write-Host ""

# ── Cloud animation block ───────────────────────────────────────
Write-Host "Inserting cloud animation block..."

$cloudBlock = @'
/* -- CLOUD BACKGROUND ANIMATION -- */
@keyframes cloudDrift{from{background-position-x:0}to{background-position-x:-1200px}}
@keyframes cloudDriftSlow{from{background-position-x:0}to{background-position-x:-900px}}
#quiz::before,#calculator::before,#reviews::before,#faq::before,#countries::before,
#quiz::after,#calculator::after,#reviews::after,#faq::after,#countries::after{content:'';position:absolute;inset:0;pointer-events:none}
#quiz::before,#calculator::before,#reviews::before,#faq::before,#countries::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200'%3E%3Cg opacity='.6'%3E%3Ccircle cx='80' cy='130' r='35' fill='white'/%3E%3Ccircle cx='130' cy='112' r='44' fill='white'/%3E%3Ccircle cx='188' cy='118' r='37' fill='white'/%3E%3Ccircle cx='233' cy='130' r='28' fill='white'/%3E%3Crect x='45' y='130' width='216' height='40' fill='white'/%3E%3C/g%3E%3Cg opacity='.5'%3E%3Ccircle cx='520' cy='90' r='26' fill='white'/%3E%3Ccircle cx='558' cy='76' r='32' fill='white'/%3E%3Ccircle cx='600' cy='80' r='27' fill='white'/%3E%3Ccircle cx='630' cy='90' r='20' fill='white'/%3E%3Crect x='494' y='90' width='156' height='30' fill='white'/%3E%3C/g%3E%3Cg opacity='.4'%3E%3Ccircle cx='990' cy='55' r='20' fill='white'/%3E%3Ccircle cx='1018' cy='44' r='25' fill='white'/%3E%3Ccircle cx='1050' cy='48' r='20' fill='white'/%3E%3Ccircle cx='1072' cy='56' r='15' fill='white'/%3E%3Crect x='970' y='55' width='117' height='22' fill='white'/%3E%3C/g%3E%3C/svg%3E");background-repeat:repeat-x;background-size:1200px 200px;background-position:0 15%;animation:cloudDrift 60s linear infinite;opacity:.38;z-index:-1}
#quiz::after,#calculator::after,#reviews::after,#faq::after,#countries::after{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 140'%3E%3Cg opacity='.7'%3E%3Ccircle cx='60' cy='90' r='25' fill='white'/%3E%3Ccircle cx='95' cy='76' r='30' fill='white'/%3E%3Ccircle cx='135' cy='80' r='25' fill='white'/%3E%3Ccircle cx='163' cy='90' r='19' fill='white'/%3E%3Crect x='35' y='90' width='147' height='28' fill='white'/%3E%3C/g%3E%3Cg opacity='.55'%3E%3Ccircle cx='480' cy='60' r='18' fill='white'/%3E%3Ccircle cx='506' cy='50' r='22' fill='white'/%3E%3Ccircle cx='534' cy='54' r='18' fill='white'/%3E%3Ccircle cx='554' cy='61' r='13' fill='white'/%3E%3Crect x='462' y='61' width='105' height='20' fill='white'/%3E%3C/g%3E%3Cg opacity='.45'%3E%3Ccircle cx='760' cy='85' r='22' fill='white'/%3E%3Ccircle cx='792' cy='72' r='27' fill='white'/%3E%3Ccircle cx='826' cy='76' r='22' fill='white'/%3E%3Ccircle cx='849' cy='85' r='16' fill='white'/%3E%3Crect x='738' y='85' width='127' height='25' fill='white'/%3E%3C/g%3E%3C/svg%3E");background-repeat:repeat-x;background-size:900px 140px;background-position:0 75%;animation:cloudDriftSlow 90s linear infinite;opacity:.22;z-index:-1}
#quiz>.container,#calculator>.container,#reviews>.container,#faq>.container,#countries>.container{position:relative;z-index:1}

'@

$marker = '/* COMPARE HIGHLIGHT */'
if ($css.Contains($marker)) {
    $css = $css.Replace($marker, $cloudBlock + $marker)
    Write-Host "  Cloud block inserted before /* COMPARE HIGHLIGHT */"
} else {
    Write-Host ""
    Write-Host "WARNING: Could not find '/* COMPARE HIGHLIGHT */' in style.css"
    Write-Host "Cloud block was NOT inserted."
    Write-Host "Open style.css in Notepad++, scroll to the bottom and paste the block manually."
    Write-Host ""
}

# ── Save ────────────────────────────────────────────────────────
$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $css, $encoding)

Write-Host ""
Write-Host "============================================================"
Write-Host " style.css saved."
Write-Host " Run diag.bat to verify, then push.bat to deploy."
Write-Host "============================================================"
