<#
.SYNOPSIS
  Copies Photos/ → public/photos/ with URL-safe numbered filenames.
  Run once initially, then re-run whenever you add more photos to Photos/.

.USAGE
  .\copy-photos.ps1
  # Or from a different directory:
  .\copy-photos.ps1 -Source ".\Photos" -Dest ".\public\photos"
#>

param(
    [string]$Source = ".\Photos",
    [string]$Dest   = ".\public\photos"
)

function ConvertTo-Slug([string]$name) {
    $s = $name.ToLower()
    $s = $s -replace '[()&+]', ''
    $s = [System.Text.RegularExpressions.Regex]::Replace($s, '[^a-z0-9\-]+', '-')
    $s = $s.Trim('-') -replace '-+', '-'
    return $s
}

Write-Host "Source : $Source" -ForegroundColor Cyan
Write-Host "Dest   : $Dest"   -ForegroundColor Cyan
Write-Host ""

New-Item -ItemType Directory -Force -Path $Dest | Out-Null

$totalFiles = 0

# ── Subfolders ──────────────────────────────────────────────────────────────
Get-ChildItem $Source -Directory | ForEach-Object {
    $folder = $_
    $slug   = ConvertTo-Slug $folder.Name
    $outDir = Join-Path $Dest $slug
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null

    $files = Get-ChildItem $folder.FullName -File |
             Where-Object { $_.Extension -match '\.(jpe?g|png|gif|webp|avif)$' } |
             Sort-Object Name

    $i = 1
    foreach ($f in $files) {
        $ext = $f.Extension.ToLower()
        if ($ext -eq '.jpeg') { $ext = '.jpg' }
        $destPath = Join-Path $outDir "$i$ext"
        Copy-Item $f.FullName $destPath -Force
        $i++
    }

    $count = $files.Count
    $totalFiles += $count
    if ($count -gt 0) {
        Write-Host ("  {0,-42} -> photos/{1,-42} ({2} files)" -f $folder.Name, $slug, $count) -ForegroundColor Green
    } else {
        Write-Host ("  {0,-42} (empty, skipped)" -f $folder.Name) -ForegroundColor DarkGray
    }
}

# ── Root-level image files ────────────────────────────────────────────────
$rootFiles = Get-ChildItem $Source -File |
             Where-Object { $_.Extension -match '\.(jpe?g|png|gif|webp|avif)$' } |
             Sort-Object Name

if ($rootFiles.Count -gt 0) {
    $rootDir = Join-Path $Dest "general"
    New-Item -ItemType Directory -Force -Path $rootDir | Out-Null
    $i = 1
    foreach ($f in $rootFiles) {
        $ext = $f.Extension.ToLower()
        if ($ext -eq '.jpeg') { $ext = '.jpg' }
        Copy-Item $f.FullName (Join-Path $rootDir "$i$ext") -Force
        $i++
    }
    $totalFiles += $rootFiles.Count
    Write-Host ("  {0,-42} -> photos/general  ({1} files)" -f "[root images]", $rootFiles.Count) -ForegroundColor Green
}

Write-Host ""
Write-Host "Done - $totalFiles total files copied to '$Dest'" -ForegroundColor Cyan
Write-Host "Re-run this script whenever you add new photos to Photos folder" -ForegroundColor DarkGray
