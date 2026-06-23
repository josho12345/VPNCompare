# fix5.ps1 - Remove orange from pros-box, increase gap to 6px

$path = (Get-Item 'style.css').FullName
$css = [System.IO.File]::ReadAllText($path)
$backup = $path + '.bak'
[System.IO.File]::WriteAllText($backup, $css)
Write-Host "Backup saved"

$nl = "`r`n"

# Same selector as before but with .pros-box removed
$sRings = ".method-card,.quiz-card,.vpn-table-wrap,.calc-panel,.vpn-card,.review-card,.blog-card,.faq-item,.review-header-box,.cons-box,.score-bars,.review-body-text"

$block  = $nl + "/* -- FIX v5: remove orange from pros-box, gap 6px -- */" + $nl
$block += $sRings + "{outline:2px solid rgba(204,85,0,.7);outline-offset:6px}" + $nl

$css = $css.TrimEnd() + $block

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $css, $encoding)
Write-Host "Done. Run push.bat."
