$siteData = 'C:\_PROJECTS\VPNCompare_DEV\site-data.js'
$vpnHtml  = 'C:\_PROJECTS\VPNCompare_DEV\vpn\index.html'
$scriptJs = 'C:\_PROJECTS\VPNCompare_DEV\script.js'
$navJs    = 'C:\_PROJECTS\VPNCompare_DEV\nav.js'
$utf8 = New-Object System.Text.UTF8Encoding $false

# Build today's date in site format: D Month YYYY and Month YYYY
$today  = Get-Date
$day    = $today.Day.ToString()
$month  = $today.ToString('MMMM')
$year   = $today.Year.ToString()
$ds     = "$day $month $year"
$ms     = "$month $year"

# Date pattern to match any existing date in same formats
$dp = '\d+\s+\w+\s+\d{4}'
$mp = '\w+\s+\d{4}'

$total = 0

# --- site-data.js ---
$c = [System.IO.File]::ReadAllText($siteData, [System.Text.Encoding]::UTF8)
$orig = $c
$c = $c -replace "lastChecked:\s*'[^']*'",    "lastChecked:    '$ds'"
$c = $c -replace "tableUpdated:\s*'[^']*'",   "tableUpdated:   '$ds'"
$c = $c -replace "pricesVerified:\s*'[^']*'", "pricesVerified: '$ds'"
if ($c -ne $orig) {
    [System.IO.File]::WriteAllText($siteData, $c, $utf8)
    Write-Host "site-data.js dates updated"
    $total++
} else {
    Write-Host "site-data.js - already up to date"
}

# --- vpn/index.html (moved from root index.html) ---
$c = [System.IO.File]::ReadAllText($vpnHtml, [System.Text.Encoding]::UTF8)
$orig = $c
$c = [regex]::Replace($c, "Table last updated: $dp",   "Table last updated: $ds")
$c = [regex]::Replace($c, "editorial team on $dp",     "editorial team on $ds")
$c = [regex]::Replace($c, "verified by our editorial team on $dp", "verified by our editorial team on $ds")
$c = [regex]::Replace($c, "Updated $mp",               "Updated $ms")
$c = [regex]::Replace($c, "Prices Verified $mp",       "Prices Verified $ms")
$c = [regex]::Replace($c, "as verified on $dp",        "as verified on $ds")
if ($c -ne $orig) {
    [System.IO.File]::WriteAllText($vpnHtml, $c, $utf8)
    Write-Host "vpn/index.html dates updated"
    $total++
} else {
    Write-Host "vpn/index.html - already up to date"
}

# --- nav.js (announce bar date now lives here, not in index.html) ---
$c = [System.IO.File]::ReadAllText($navJs, [System.Text.Encoding]::UTF8)
$orig = $c
$c = [regex]::Replace($c, "Last checked $dp", "Last checked $ds")
if ($c -ne $orig) {
    [System.IO.File]::WriteAllText($navJs, $c, $utf8)
    Write-Host "nav.js announce bar date updated"
    $total++
} else {
    Write-Host "nav.js - already up to date"
}

# --- script.js ---
$c = [System.IO.File]::ReadAllText($scriptJs, [System.Text.Encoding]::UTF8)
$orig = $c
$c = [regex]::Replace($c, "Price verified $dp", "Price verified $ds")
if ($c -ne $orig) {
    [System.IO.File]::WriteAllText($scriptJs, $c, $utf8)
    Write-Host "script.js Price verified date updated"
    $total++
} else {
    Write-Host "script.js - already up to date"
}

Write-Host ''
Write-Host "Date stamped: $ds -- $total file(s) changed"
Write-Host ''
Write-Host 'Next steps: push.bat from VPNCompare_DEV, select Dev branch'
Write-Host 'NOTE: This is the DEV version. Production stamp-date.ps1 is separate and unaffected.'
