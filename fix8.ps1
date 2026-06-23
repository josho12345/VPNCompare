# fix8.ps1 - Convert cyan card effects + comparison table lines to orange

$path = (Get-Item 'style.css').FullName
$css = [System.IO.File]::ReadAllText($path)
$backup = $path + '.bak'
[System.IO.File]::WriteAllText($backup, $css)
Write-Host "Backup saved"

$nl = "`r`n"

$block  = $nl + "/* -- FIX v8: orange card effects + orange table lines -- */" + $nl

# Quiz card top stripe
$block += ".quiz-card::before{background:linear-gradient(90deg,rgba(204,85,0,.8),rgba(204,85,0,.25))}" + $nl

# Calc panel top stripe
$block += ".calc-panel::before{background:linear-gradient(90deg,rgba(204,85,0,.8),transparent)}" + $nl

# VPN card hover - orange border + shadow, preserve transform
$block += ".vpn-card:hover{border-color:rgba(204,85,0,.9);transform:translateY(-4px);box-shadow:0 8px 32px rgba(204,85,0,.25)}" + $nl

# Highlight card border (paid placement)
$block += ".vpn-card.highlight{border-color:rgba(204,85,0,.9)}" + $nl

# TOP PICK ribbon
$block += ".vpn-card.highlight::after{background:rgba(204,85,0,.9)}" + $nl

# Table row divider lines
$block += ".vpn-table td{border-bottom:1px solid rgba(204,85,0,.2)}" + $nl

# Table row hover tint
$block += ".vpn-table tr:hover td{background:rgba(204,85,0,.04)}" + $nl

# Scrollbar thumb
$block += ".vpn-table-wrap::-webkit-scrollbar-thumb{background:rgba(204,85,0,.4)}" + $nl
$block += ".vpn-table-wrap{scrollbar-color:rgba(204,85,0,.4) transparent}" + $nl

# Right fade overlay on table
$block += ".vpn-table-outer::after{background:linear-gradient(to right,transparent,rgba(204,85,0,.08))}" + $nl

$css = $css.TrimEnd() + $block

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $css, $encoding)
Write-Host "Done. Run push.bat."
