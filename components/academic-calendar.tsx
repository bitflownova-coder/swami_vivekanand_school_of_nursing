type ActivityType = 'orientation' | 'theory' | 'clinical' | 'revision' | 'exam' | 'vacation';

interface CalendarEntry {
  weeks: string;
  dates: string;
  description: string;
  detail?: string;
  type: ActivityType;
}

interface TermData {
  term: string;
  label: string;
  headerGradient: string;
  accentText: string;
  entries: CalendarEntry[];
}

const TERMS: TermData[] = [
  {
    term: "Term I",
    label: "Foundation & Basic Theory",
    headerGradient: "from-blue-800 to-blue-900",
    accentText: "text-blue-200",
    entries: [
      { weeks: "1",     dates: "Aug 01 – 02",   description: "Orientation Program",          type: "orientation" },
      { weeks: "2–12",  dates: "Aug 04 – Oct 18", description: "Theory Block I",  detail: "11 Weeks · 414 Hours", type: "theory" },
      { weeks: "13",    dates: "Oct 20 – 25",   description: "Diwali Vacation",               type: "vacation" },
    ],
  },
  {
    term: "Term II",
    label: "Clinical Fundamentals & Mid-Term",
    headerGradient: "from-emerald-800 to-emerald-900",
    accentText: "text-emerald-200",
    entries: [
      { weeks: "14–17", dates: "Oct 27 – Nov 22", description: "Theory Block II",              detail: "4 Weeks · 160 Hours",  type: "theory" },
      { weeks: "18–25", dates: "Nov 24 – Jan 17", description: "FON Clinical Posting I",       detail: "8 Weeks · 384 Hours",  type: "clinical" },
      { weeks: "26",    dates: "Jan 19 – 24",   description: "Theory Revision",                type: "revision" },
      { weeks: "27",    dates: "Jan 26 – 31",   description: "Mid-Term Examination",           type: "exam" },
    ],
  },
  {
    term: "Term III",
    label: "Community Health & Specialised Postings",
    headerGradient: "from-violet-800 to-violet-900",
    accentText: "text-violet-200",
    entries: [
      { weeks: "28–31", dates: "Feb 02 – 28",   description: "RPH Posting",     detail: "Regional Public Health · 4 Weeks",  type: "clinical" },
      { weeks: "32",    dates: "Mar 02 – 07",   description: "Holi Vacation",                  type: "vacation" },
      { weeks: "33–36", dates: "Mar 09 – Apr 04", description: "UPH Posting",   detail: "Urban Public Health · 4 Weeks",     type: "clinical" },
      { weeks: "37–39", dates: "Apr 06 – 25",   description: "FON Clinical Posting II",  detail: "3 Weeks · 144 Hours",       type: "clinical" },
    ],
  },
  {
    term: "Term IV",
    label: "Final Preparation & University Exams",
    headerGradient: "from-slate-800 to-blue-950",
    accentText: "text-blue-300",
    entries: [
      { weeks: "40–41", dates: "Apr 27 – May 09", description: "Theory Block III",             detail: "2 Weeks · 80 Hours",   type: "theory" },
      { weeks: "42",    dates: "May 11 – 16",   description: "Pre-Final Examination",          type: "exam" },
      { weeks: "43–49", dates: "May 18 – Jul 04", description: "FON Clinical Posting III",     detail: "7 Weeks · 336 Hours",  type: "clinical" },
      { weeks: "50–51", dates: "Jul 06 – 18",   description: "Preparatory Leave & Final Exams", type: "exam" },
      { weeks: "52",    dates: "Jul 20 – 25",   description: "Summer Vacation",                type: "vacation" },
    ],
  },
];

const TYPE_CONFIG: Record<ActivityType, { badge: string; dot: string; label: string }> = {
  orientation: { badge: "bg-purple-100 text-purple-700 border border-purple-200", dot: "bg-purple-500",  label: "Orientation" },
  theory:      { badge: "bg-blue-100 text-blue-700 border border-blue-200",       dot: "bg-blue-600",    label: "Theory" },
  clinical:    { badge: "bg-emerald-100 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500", label: "Clinical" },
  revision:    { badge: "bg-slate-100 text-slate-600 border border-slate-200",    dot: "bg-slate-400",   label: "Revision" },
  exam:        { badge: "bg-red-100 text-red-700 border border-red-200",           dot: "bg-red-500",     label: "Exam" },
  vacation:    { badge: "bg-amber-100 text-amber-700 border border-amber-200",    dot: "bg-amber-400",   label: "Vacation" },
};

export default function AcademicCalendar() {
  return (
    <>
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-blue-700"></div>
          <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Academic Calendar</span>
          <div className="w-8 h-0.5 bg-blue-700"></div>
        </div>
        <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-4">
          GNM Year 1 — Academic Schedule
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Complete 52-week academic calendar covering theory blocks, clinical postings,
          examinations, and vacations for the first year of the GNM programme.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 justify-center mb-10">
        {(Object.entries(TYPE_CONFIG) as [ActivityType, (typeof TYPE_CONFIG)[ActivityType]][]).map(
          ([, cfg]) => (
            <span
              key={cfg.label}
              className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full ${cfg.badge}`}
            >
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
              {cfg.label}
            </span>
          )
        )}
      </div>

      {/* Terms — 2-column grid on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {TERMS.map((term) => (
          <div
            key={term.term}
            className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white"
          >
            {/* Term header */}
            <div className={`bg-gradient-to-r ${term.headerGradient} px-6 py-4`}>
              <div className={`text-[11px] font-bold uppercase tracking-widest mb-1 ${term.accentText}`}>
                {term.term}
              </div>
              <div className="text-white font-bold text-lg font-playfair">{term.label}</div>
            </div>

            {/* Entries */}
            <div className="divide-y divide-slate-100">
              {term.entries.map((entry, idx) => {
                const cfg = TYPE_CONFIG[entry.type];
                return (
                  <div key={idx} className="flex items-center gap-4 px-5 py-3.5">
                    {/* Week number */}
                    <div className="w-12 text-center flex-shrink-0">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Wk</div>
                      <div className="font-bold text-slate-800 text-sm leading-tight">{entry.weeks}</div>
                    </div>

                    <div className="w-px h-8 bg-slate-100 flex-shrink-0" />

                    {/* Description */}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 text-sm">{entry.description}</div>
                      {entry.detail && (
                        <div className="text-xs text-slate-400 mt-0.5">{entry.detail}</div>
                      )}
                      <div className="text-xs text-slate-400 mt-0.5">{entry.dates}</div>
                    </div>

                    {/* Type badge */}
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 uppercase tracking-wide ${cfg.badge}`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: "52",   label: "Total Weeks" },
            { value: "4",    label: "Academic Terms" },
            { value: "654+", label: "Theory Hours" },
            { value: "864+", label: "Clinical Hours" },
          ].map(({ value, label }) => (
            <div key={label} className="border-r border-white/10 last:border-0 px-4">
              <div className="font-playfair text-3xl font-bold text-blue-300 mb-1">{value}</div>
              <div className="text-sm text-slate-300">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
