# add_orange_rings.ps1
$path = (Get-Item 'style.css').FullName
Write-Host "Reading: $path"

$css = [System.IO.File]::ReadAllText($path)

$backup = $path + '.bak'
[System.IO.File]::WriteAllText($backup, $css)
Write-Host "Backup saved: style.css.bak"

if (-not $css.Contains('cloudDrift')) {
    Write-Host "ERROR: cloudDrift not found - wrong file? Aborting."
    pause
    exit 1
}

$nl = "`r`n"
$rule = $nl + $nl + "/* -- BURNT ORANGE ACCENT RINGS -- */" + $nl
$rule += ".method-card,.quiz-card,.vpn-table-wrap,.calc-panel,.vpn-card,.review-card,.blog-card,.faq-item,.review-header-box,.pros-box,.cons-box,.score-bars,.review-body-text{outline:1px solid rgba(204,85,0,.4);outline-offset:0}" + $nl

$css = $css.TrimEnd() + $rule

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $css, $encoding)

Write-Host "Done. Burnt orange accent rings added."
Write-Host "Run push.bat to deploy."
