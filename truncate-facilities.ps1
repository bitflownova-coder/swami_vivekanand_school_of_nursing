$f = 'd:\Bitflow_softwares\CNE\SVS_CNE\swami_vivekanand_school_of_nursing\app\facilities\page.tsx'
$lines = Get-Content $f -Encoding UTF8
$keep = 450
$lines[0..($keep-1)] | Set-Content $f -Encoding UTF8
Write-Host "Done. New count: $((Get-Content $f).Count)"
