$f = "d:\Bitflow_softwares\CNE\SVS_CNE\swami_vivekanand_school_of_nursing\app\downloads\page.tsx"
$content = Get-Content $f -Raw
# Collapse 3+ consecutive newlines into exactly 2 (one blank line)
$content = [regex]::Replace($content, "(\r?\n){3,}", "`n`n")
[System.IO.File]::WriteAllText($f, $content, [System.Text.Encoding]::UTF8)
Write-Host ("Done. Lines: " + (Get-Content $f).Count)
