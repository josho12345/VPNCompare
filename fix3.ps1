# fix3.ps1 - Mirrored clouds, wider orange gap, brighter backgrounds

$path = (Get-Item 'style.css').FullName
$css = [System.IO.File]::ReadAllText($path)
$backup = $path + '.bak'
[System.IO.File]::WriteAllText($backup, $css)
Write-Host "Backup saved"

$nl = "`r`n"

# Cloud 1 - 1200x200 - mirrored top/bottom circles, no rects
$c1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200'%3E%3Cg fill='white' opacity='.58'%3E%3Ccircle cx='70' cy='85' r='28'/%3E%3Ccircle cx='115' cy='68' r='38'/%3E%3Ccircle cx='168' cy='62' r='44'/%3E%3Ccircle cx='220' cy='68' r='36'/%3E%3Ccircle cx='258' cy='82' r='24'/%3E%3Ccircle cx='70' cy='115' r='28'/%3E%3Ccircle cx='115' cy='132' r='38'/%3E%3Ccircle cx='168' cy='138' r='44'/%3E%3Ccircle cx='220' cy='132' r='36'/%3E%3Ccircle cx='258' cy='118' r='24'/%3E%3Ccircle cx='164' cy='100' r='44'/%3E%3C/g%3E%3Cg fill='white' opacity='.46'%3E%3Ccircle cx='498' cy='78' r='18'/%3E%3Ccircle cx='526' cy='66' r='24'/%3E%3Ccircle cx='558' cy='60' r='28'/%3E%3Ccircle cx='590' cy='66' r='22'/%3E%3Ccircle cx='614' cy='76' r='16'/%3E%3Ccircle cx='498' cy='98' r='18'/%3E%3Ccircle cx='526' cy='110' r='24'/%3E%3Ccircle cx='558' cy='116' r='28'/%3E%3Ccircle cx='590' cy='110' r='22'/%3E%3Ccircle cx='614' cy='100' r='16'/%3E%3Ccircle cx='556' cy='88' r='26'/%3E%3C/g%3E%3Cg fill='white' opacity='.34'%3E%3Ccircle cx='965' cy='44' r='14'/%3E%3Ccircle cx='988' cy='34' r='18'/%3E%3Ccircle cx='1014' cy='30' r='20'/%3E%3Ccircle cx='1040' cy='36' r='16'/%3E%3Ccircle cx='1058' cy='44' r='12'/%3E%3Ccircle cx='965' cy='56' r='14'/%3E%3Ccircle cx='988' cy='66' r='18'/%3E%3Ccircle cx='1014' cy='70' r='20'/%3E%3Ccircle cx='1040' cy='64' r='16'/%3E%3Ccircle cx='1058' cy='56' r='12'/%3E%3Ccircle cx='1012' cy='50' r='20'/%3E%3C/g%3E%3C/svg%3E"

# Cloud 2 - 900x140 - mirrored top/bottom circles
$c2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 140'%3E%3Cg fill='white' opacity='.68'%3E%3Ccircle cx='38' cy='58' r='18'/%3E%3Ccircle cx='64' cy='46' r='24'/%3E%3Ccircle cx='94' cy='40' r='28'/%3E%3Ccircle cx='124' cy='46' r='22'/%3E%3Ccircle cx='148' cy='58' r='16'/%3E%3Ccircle cx='38' cy='82' r='18'/%3E%3Ccircle cx='64' cy='94' r='24'/%3E%3Ccircle cx='94' cy='100' r='28'/%3E%3Ccircle cx='124' cy='94' r='22'/%3E%3Ccircle cx='148' cy='82' r='16'/%3E%3Ccircle cx='93' cy='70' r='28'/%3E%3C/g%3E%3Cg fill='white' opacity='.5'%3E%3Ccircle cx='428' cy='58' r='15'/%3E%3Ccircle cx='452' cy='48' r='19'/%3E%3Ccircle cx='476' cy='43' r='22'/%3E%3Ccircle cx='500' cy='48' r='17'/%3E%3Ccircle cx='518' cy='57' r='13'/%3E%3Ccircle cx='428' cy='82' r='15'/%3E%3Ccircle cx='452' cy='92' r='19'/%3E%3Ccircle cx='476' cy='97' r='22'/%3E%3Ccircle cx='500' cy='92' r='17'/%3E%3Ccircle cx='518' cy='83' r='13'/%3E%3Ccircle cx='474' cy='70' r='22'/%3E%3C/g%3E%3Cg fill='white' opacity='.4'%3E%3Ccircle cx='716' cy='58' r='16'/%3E%3Ccircle cx='740' cy='46' r='22'/%3E%3Ccircle cx='766' cy='40' r='26'/%3E%3Ccircle cx='792' cy='46' r='20'/%3E%3Ccircle cx='812' cy='57' r='14'/%3E%3Ccircle cx='716' cy='82' r='16'/%3E%3Ccircle cx='740' cy='94' r='22'/%3E%3Ccircle cx='766' cy='100' r='26'/%3E%3Ccircle cx='792' cy='94' r='20'/%3E%3Ccircle cx='812' cy='83' r='14'/%3E%3Ccircle cx='764' cy='70' r='26'/%3E%3C/g%3E%3C/svg%3E"

$sBefore = "#quiz::before,#calculator::before,#reviews::before,#faq::before,#countries::before"
$sAfter  = "#quiz::after,#calculator::after,#reviews::after,#faq::after,#countries::after"
$sSec    = "#quiz,#calculator,#reviews,#faq,#countries"
$sRings  = ".method-card,.quiz-card,.vpn-table-wrap,.calc-panel,.vpn-card,.review-card,.blog-card,.faq-item,.review-header-box,.pros-box,.cons-box,.score-bars,.review-body-text"

$block  = $nl + "/* -- FIX v3: mirrored clouds, orange gap, brighter bg -- */" + $nl
$block += $sBefore + "{background-image:url(""" + $c1 + """)}" + $nl
$block += $sAfter  + "{background-image:url(""" + $c2 + """)}" + $nl
$block += $sSec    + "{background:#96c8e6}" + $nl
$block += $sRings  + "{outline:2px solid rgba(204,85,0,.7);outline-offset:4px}" + $nl

$css = $css.TrimEnd() + $block

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $css, $encoding)
Write-Host "Done. Run push.bat."
