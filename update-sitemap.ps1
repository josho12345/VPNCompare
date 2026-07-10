# ============================================================
# update-sitemap.ps1
#
# Scans esim/ for genuine content pages and adds any that are
# missing from sitemap.xml. Does NOT touch or reorder existing
# entries - only appends what's missing, so it's safe to run
# even if the VPN side of the sitemap is already correct.
#
# Run via update-sitemap.bat - do not run this directly.
#
# How it decides a page is "real" (not a placeholder or stub):
#   - Every file must have a <title> tag
#   - Country smart-card pages are confirmed via card-country-name
#   - index.html files (hub, destinations, region) are included
#     as long as they have a <title>
#   - Anything that doesn't meet this bar is skipped and logged,
#     not guessed at
# ============================================================

# --- EDIT THESE to match your actual setup ---
$SiteRoot = "C:\_PROJECTS\VPNCompare"
$Domain   = "https://bestvpncompareonline.com"
# ----------------------------------------------

$SitemapPath = Join-Path $SiteRoot "sitemap.xml"
$EsimRoot    = Join-Path $SiteRoot "esim"

if (-not (Test-Path $SiteRoot)) {
    Write-Host ""
    Write-Host "Folder not found: $SiteRoot" -ForegroundColor Red
    Write-Host "Edit the `$SiteRoot path at the top of update-sitemap.ps1 and try again." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}
if (-not (Test-Path $EsimRoot)) {
    Write-Host ""
    Write-Host "No esim/ folder found under $SiteRoot - nothing to scan." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# --- URL normalization: "path/index.html" and "path/" are the same real
#     page on a static site, so they must be compared as equal, not as two
#     different URLs. This was the bug that produced 6 duplicate pairs on
#     the first run (e.g. /esim/ and /esim/index.html both getting listed).
function Get-NormalizedUrl {
    param([string]$Url)
    if ($Url.EndsWith("/index.html")) {
        return $Url.Substring(0, $Url.Length - "index.html".Length)
    }
    return $Url
}

# --- Read existing sitemap, if any, and collect URLs already listed ---
$existingUrls = New-Object System.Collections.Generic.HashSet[string]
$existingUrlsNormalized = New-Object System.Collections.Generic.HashSet[string]
$existingSitemapContent = $null

if (Test-Path $SitemapPath) {
    $existingSitemapContent = Get-Content -Path $SitemapPath -Raw -Encoding UTF8
    $matches = [regex]::Matches($existingSitemapContent, '<loc>([^<]+)</loc>')
    foreach ($m in $matches) {
        $raw = $m.Groups[1].Value.Trim()
        [void]$existingUrls.Add($raw)
        [void]$existingUrlsNormalized.Add((Get-NormalizedUrl $raw))
    }
    Write-Host "Existing sitemap.xml found with $($existingUrls.Count) URL(s) already listed." -ForegroundColor White
} else {
    Write-Host "No existing sitemap.xml found - a new one will be created." -ForegroundColor Yellow
}

# --- Priority weighting by page type ---
function Get-Priority {
    param([string]$RelativePath)
    if ($RelativePath -eq "index.html")                                    { return "1.0" }
    if ($RelativePath -eq "esim/index.html" -or $RelativePath -eq "vpn/index.html") { return "0.9" }
    if ($RelativePath -eq "esim/destinations/index.html")                  { return "0.8" }
    if ($RelativePath -match '^esim/destinations/[^/]+/index\.html$')      { return "0.7" }
    return "0.6"
}

# --- Scan every .html file under esim/ ---
$allFiles = Get-ChildItem -Path $EsimRoot -Filter "*.html" -Recurse
$newEntries = @()
$skipped = @()

foreach ($f in $allFiles) {
    $content = Get-Content -Path $f.FullName -Raw -Encoding UTF8

    if ($content -notmatch '<title>') {
        $skipped += [PSCustomObject]@{ File = $f.FullName; Reason = "No <title> tag - likely a stub" }
        continue
    }

    $isIndex   = $f.Name -eq "index.html"
    $isCountry = $content.Contains('class="card-country-name"')

    if (-not $isIndex -and -not $isCountry) {
        $skipped += [PSCustomObject]@{ File = $f.FullName; Reason = "Not an index page and no card-country-name found - doesn't match expected structure" }
        continue
    }

    $relativePath = $f.FullName.Substring($SiteRoot.Length + 1).Replace("\", "/")
    $fullUrl = "$Domain/$relativePath"

    if ($existingUrlsNormalized.Contains((Get-NormalizedUrl $fullUrl))) {
        continue  # already in the sitemap under this or the equivalent trailing-slash form
    }

    $lastMod  = $f.LastWriteTime.ToString("yyyy-MM-dd")
    $priority = Get-Priority -RelativePath $relativePath

    $newEntries += [PSCustomObject]@{
        Url      = $fullUrl
        LastMod  = $lastMod
        Priority = $priority
    }
}

# --- Also check root index.html and vpn/index.html if present, same idempotent logic ---
foreach ($extra in @("index.html", "vpn\index.html")) {
    $p = Join-Path $SiteRoot $extra
    if (Test-Path $p) {
        $relativePath = $extra.Replace("\", "/")
        $fullUrl = "$Domain/$relativePath"
        if (-not $existingUrlsNormalized.Contains((Get-NormalizedUrl $fullUrl))) {
            $fi = Get-Item $p
            $newEntries += [PSCustomObject]@{
                Url      = $fullUrl
                LastMod  = $fi.LastWriteTime.ToString("yyyy-MM-dd")
                Priority = (Get-Priority -RelativePath $relativePath)
            }
        }
    }
}

Write-Host ""
Write-Host "=== DRY RUN - nothing written yet ===" -ForegroundColor Cyan
Write-Host ""

if ($skipped.Count -gt 0) {
    Write-Host "Skipped $($skipped.Count) file(s):" -ForegroundColor Yellow
    $skipped | Format-Table File, Reason -AutoSize
}

if ($newEntries.Count -eq 0) {
    Write-Host "No new URLs to add - sitemap.xml is already up to date." -ForegroundColor Green
    exit 0
}

Write-Host "$($newEntries.Count) new URL(s) will be added:" -ForegroundColor White
$newEntries | Format-Table Url, LastMod, Priority -AutoSize
Write-Host ""

$confirm = Read-Host "Type y and press Enter to write these into sitemap.xml (anything else cancels)"
if ($confirm -ne "y") {
    Write-Host "Cancelled. sitemap.xml was not touched." -ForegroundColor Yellow
    exit 0
}

# --- Build the new <url> blocks ---
$newXml = ""
foreach ($e in $newEntries) {
    $newXml += "  <url>`n    <loc>$($e.Url)</loc>`n    <lastmod>$($e.LastMod)</lastmod>`n    <priority>$($e.Priority)</priority>`n  </url>`n"
}

if ($existingSitemapContent) {
    # back up before touching
    Copy-Item -Path $SitemapPath -Destination "$SitemapPath.bak" -Force
    $closeTagIndex = $existingSitemapContent.LastIndexOf("</urlset>")
    if ($closeTagIndex -lt 0) {
        Write-Host "Could not find </urlset> in the existing sitemap.xml - stopping rather than guessing at its structure." -ForegroundColor Red
        Write-Host "Check the file manually - it may not be valid XML." -ForegroundColor Red
        exit 1
    }
    $updated = $existingSitemapContent.Substring(0, $closeTagIndex) + $newXml + $existingSitemapContent.Substring($closeTagIndex)
    Set-Content -Path $SitemapPath -Value $updated -Encoding UTF8 -NoNewline
} else {
    $fresh = "<?xml version=`"1.0`" encoding=`"UTF-8`"?>`n<urlset xmlns=`"http://www.sitemaps.org/schemas/sitemap/0.9`">`n$newXml</urlset>`n"
    Set-Content -Path $SitemapPath -Value $fresh -Encoding UTF8 -NoNewline
}

Write-Host ""
Write-Host "$($newEntries.Count) URL(s) added to sitemap.xml." -ForegroundColor Green
Write-Host "Review the file, then push.bat as usual, then resubmit in Google Search Console." -ForegroundColor Green
Write-Host ""
