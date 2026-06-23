# fix6.ps1 - Half gap (3px), wider orange (5px) to fill the space

$path = (Get-Item 'style.css').FullName
$css = [System.IO.File]::ReadAllText($path)
$backup = $path + '.bak'
[System.IO.File]::WriteAllText($backup, $css)
Write-Host "Backup saved"

$nl = "`r`n"

$sRings = ".method-card,.quiz-card,.vpn-table-wrap,.calc-panel,.vpn-card,.review-card,.blog-card,.faq-item,.review-header-box,.cons-box,.score-bars,.review-body-text"

$block  = $nl + "/* -- FIX v6: gap 3px, width 5px to fill space -- */" + $nl
$block += $sRings + "{outline:5px solid rgba(204,85,0,.7);outline-offset:3px}" + $nl

$css = $css.TrimEnd() + $block

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $css, $encoding)
Write-Host "Done. Run push.bat."
