$f = "d:\Bitflow_softwares\CNE\SVS_CNE\swami_vivekanand_school_of_nursing\app\downloads\page.tsx"
$lines = Get-Content $f

# Find HERO comment line (0-based index)
$heroStart = -1
$heroEnd = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s+\{/\* HERO \*/\}' -and $heroStart -eq -1) {
        $heroStart = $i
    }
}
# Find the closing </section> after heroStart
for ($i = $heroStart; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s+</section>') {
        $heroEnd = $i
        break
    }
}

Write-Host "Hero start (0-based): $heroStart"
Write-Host "Hero end (0-based): $heroEnd"
Write-Host "Start line text: $($lines[$heroStart])"
Write-Host "End line text: $($lines[$heroEnd])"

$newHero = @'
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-6 h-px bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">Academic Portal</span>
            <div className="w-6 h-px bg-blue-400" />
          </div>
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Student Resources
          </h1>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
            Syllabi, question banks, forms and academic materials &mdash; all in one place.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search resources..."
              className="pl-12 pr-10 py-4 rounded-2xl border-0 bg-white/10 text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* 3 Category Quick-Access Cards */}
          {!searchQuery && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <a
                href="#syllabus"
                className="group flex items-center gap-4 bg-white/10 hover:bg-blue-600 border border-white/10 hover:border-blue-500 rounded-2xl px-5 py-4 transition-all duration-200"
              >
                <div className="shrink-0 p-3 rounded-xl bg-blue-500/20 group-hover:bg-white/20">
                  <BookOpen className="h-5 w-5 text-blue-300 group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">Course Syllabi</p>
                  <p className="text-slate-400 group-hover:text-blue-100 text-xs mt-0.5">4 documents</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white shrink-0" />
              </a>
              <a
                href="#question-banks"
                className="group flex items-center gap-4 bg-white/10 hover:bg-emerald-600 border border-white/10 hover:border-emerald-500 rounded-2xl px-5 py-4 transition-all duration-200"
              >
                <div className="shrink-0 p-3 rounded-xl bg-emerald-500/20 group-hover:bg-white/20">
                  <HelpCircle className="h-5 w-5 text-emerald-300 group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">Question Banks</p>
                  <p className="text-slate-400 group-hover:text-emerald-100 text-xs mt-0.5">3 documents</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white shrink-0" />
              </a>
              <a
                href="#resources"
                className="group flex items-center gap-4 bg-white/10 hover:bg-violet-600 border border-white/10 hover:border-violet-500 rounded-2xl px-5 py-4 transition-all duration-200"
              >
                <div className="shrink-0 p-3 rounded-xl bg-violet-500/20 group-hover:bg-white/20">
                  <FolderOpen className="h-5 w-5 text-violet-300 group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">Forms &amp; Guides</p>
                  <p className="text-slate-400 group-hover:text-violet-100 text-xs mt-0.5">4+ documents</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white shrink-0" />
              </a>
            </div>
          )}
        </div>
      </section>
'@

$newHeroLines = $newHero -split "`n"

# Build new file: lines before hero + new hero + lines after hero
$before = if ($heroStart -gt 0) { $lines[0..($heroStart-1)] } else { @() }
$after  = if ($heroEnd -lt ($lines.Count - 1)) { $lines[($heroEnd+1)..($lines.Count-1)] } else { @() }

$combined = $before + $newHeroLines + $after
$combined | Set-Content $f -Encoding UTF8

Write-Host "Done. Total lines: $((Get-Content $f).Count)"
