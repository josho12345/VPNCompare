# fix2.ps1 - Appends cloud and orange ring overrides to end of style.css

$path = (Get-Item 'style.css').FullName
$css = [System.IO.File]::ReadAllText($path)
$backup = $path + '.bak'
[System.IO.File]::WriteAllText($backup, $css)
Write-Host "Backup saved"

$nl = "`r`n"

$c1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200'%3E%3Cg fill='white' opacity='.6'%3E%3Ccircle cx='50' cy='155' r='28'/%3E%3Ccircle cx='85' cy='138' r='38'/%3E%3Ccircle cx='130' cy='128' r='46'/%3E%3Ccircle cx='182' cy='126' r='44'/%3E%3Ccircle cx='230' cy='133' r='37'/%3E%3Ccircle cx='264' cy='148' r='26'/%3E%3C/g%3E%3Cg fill='white' opacity='.5'%3E%3Ccircle cx='500' cy='112' r='20'/%3E%3Ccircle cx='528' cy='97' r='28'/%3E%3Ccircle cx='562' cy='90' r='34'/%3E%3Ccircle cx='600' cy='94' r='28'/%3E%3Ccircle cx='628' cy='107' r='20'/%3E%3C/g%3E%3Cg fill='white' opacity='.38'%3E%3Ccircle cx='968' cy='72' r='15'/%3E%3Ccircle cx='990' cy='59' r='21'/%3E%3Ccircle cx='1016' cy='54' r='24'/%3E%3Ccircle cx='1043' cy='59' r='19'/%3E%3Ccircle cx='1062' cy='70' r='13'/%3E%3C/g%3E%3C/svg%3E"

$c2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 140'%3E%3Cg fill='white' opacity='.7'%3E%3Ccircle cx='38' cy='106' r='20'/%3E%3Ccircle cx='66' cy='90' r='30'/%3E%3Ccircle cx='102' cy='83' r='35'/%3E%3Ccircle cx='140' cy='87' r='29'/%3E%3Ccircle cx='166' cy='100' r='20'/%3E%3C/g%3E%3Cg fill='white' opacity='.5'%3E%3Ccircle cx='448' cy='76' r='14'/%3E%3Ccircle cx='469' cy='63' r='20'/%3E%3Ccircle cx='493' cy='57' r='22'/%3E%3Ccircle cx='517' cy='62' r='17'/%3E%3Ccircle cx='534' cy='74' r='12'/%3E%3C/g%3E%3Cg fill='white' opacity='.42'%3E%3Ccircle cx='728' cy='102' r='17'/%3E%3Ccircle cx='752' cy='87' r='25'/%3E%3Ccircle cx='781' cy='80' r='28'/%3E%3Ccircle cx='812' cy='86' r='22'/%3E%3Ccircle cx='836' cy='99' r='15'/%3E%3C/g%3E%3C/svg%3E"

$sBefore = "#quiz::before,#calculator::before,#reviews::before,#faq::before,#countries::before"
$sAfter = "#quiz::after,#calculator::after,#reviews::after,#faq::after,#countries::after"
$sRings = ".method-card,.quiz-card,.vpn-table-wrap,.calc-panel,.vpn-card,.review-card,.blog-card,.faq-item,.review-header-box,.pros-box,.cons-box,.score-bars,.review-body-text"

$block  = $nl + "/* -- CLOUD AND ORANGE FIX v2 -- */" + $nl
$block += $sBefore + "{background-image:url(""" + $c1 + """)}" + $nl
$block += $sAfter + "{background-image:url(""" + $c2 + """)}" + $nl
$block += $sRings + "{outline:2px solid rgba(204,85,0,.7);outline-offset:0}" + $nl

$css = $css.TrimEnd() + $block

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $css, $encoding)
Write-Host "Done. Run push.bat."
