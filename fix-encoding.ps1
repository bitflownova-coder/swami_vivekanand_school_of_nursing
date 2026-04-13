$filePath = "app\admissions\page.tsx"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
$before = $content.Length

# Helper: build multi-char search strings (must cast EACH char individually to string!)
function Chars([int[]]$cp) { $r = ''; foreach($c in $cp){ $r += [string][char]$c }; return $r }

# en dash x2013: double-encoded as U+00E2 U+20AC U+201C
$content = $content.Replace((Chars @(0x00E2, 0x20AC, 0x201C)), (Chars @(0x2013)))
# em dash x2014: double-encoded as U+00E2 U+20AC U+201D
$content = $content.Replace((Chars @(0x00E2, 0x20AC, 0x201D)), (Chars @(0x2014)))
# rupee x20B9: double-encoded as U+00E2 U+201A U+00B9
$content = $content.Replace((Chars @(0x00E2, 0x201A, 0x00B9)), (Chars @(0x20B9)))
# bullet x2022: double-encoded as U+00E2 U+20AC U+00A2
$content = $content.Replace((Chars @(0x00E2, 0x20AC, 0x00A2)), (Chars @(0x2022)))
# middle dot xB7: double-encoded as U+00C2 U+00B7
$content = $content.Replace((Chars @(0x00C2, 0x00B7)), (Chars @(0x00B7)))
# box drawing x2500: double-encoded as U+00E2 U+201D U+20AC
$content = $content.Replace((Chars @(0x00E2, 0x201D, 0x20AC)), (Chars @(0x2500)))

$after = $content.Length
[System.IO.File]::WriteAllText($filePath, $content, (New-Object System.Text.UTF8Encoding $false))
Write-Host "Done. Length: $before -> $after (removed $($before - $after) corrupt chars)"
