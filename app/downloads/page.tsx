"use client";

import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  FileText,
  FolderOpen,
  Calendar,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    id: "syllabus",
    href: "/resources/syllabus",
    Icon: BookOpen,
    label: "Curriculum",
    title: "Course Syllabus",
    description:
      "Year-wise GNM curriculum covering all subjects, clinical hours and exam patterns prescribed by the Maharashtra Nursing Council.",
    count: "1 document",
    bg: "from-blue-50 to-blue-100/50",
    border: "border-blue-100",
    iconBg: "bg-blue-600",
    badgeBg: "bg-blue-50 text-blue-700",
    btnBg: "bg-blue-600 hover:bg-blue-700",
    highlight: "All 3 Years · GNM Programme",
  },
  {
    id: "previous-year",
    href: "/resources/previous-year-questions",
    Icon: FileText,
    label: "Exam Prep",
    title: "Previous Year Questions",
    description:
      "Subject-wise previous year examination papers to understand question patterns and prepare effectively for GNM exams.",
    count: "9 papers",
    bg: "from-orange-50 to-orange-100/50",
    border: "border-orange-100",
    iconBg: "bg-orange-600",
    badgeBg: "bg-orange-50 text-orange-700",
    btnBg: "bg-orange-600 hover:bg-orange-700",
    highlight: "Nursing Foundation · Bio Science · Mental Health · Medical Surgical · Paediatric · and more",
  },
  {
    id: "question-banks",
    href: "/resources/question-banks",
    Icon: HelpCircle,
    label: "Practice Sets",
    title: "Question Banks",
    description:
      "Curated year-wise question banks covering all GNM subjects to help students practise and revise before examinations.",
    count: "3 books",
    bg: "from-emerald-50 to-emerald-100/50",
    border: "border-emerald-100",
    iconBg: "bg-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-700",
    btnBg: "bg-emerald-600 hover:bg-emerald-700",
    highlight: "1st Year · 2nd Year · 3rd Year",
  },
  {
    id: "academic-schedule",
    href: "/resources/academic-schedule",
    Icon: Calendar,
    label: "Academic Year",
    title: "Academic Schedule",
    description:
      "Complete week-by-week timetable of theory classes, clinical postings, revision weeks, examinations and vacations.",
    count: "2024–25",
    bg: "from-slate-50 to-slate-100/50",
    border: "border-slate-100",
    iconBg: "bg-slate-700",
    badgeBg: "bg-slate-100 text-slate-700",
    btnBg: "bg-slate-700 hover:bg-slate-800",
    highlight: "Theory Blocks · Clinical Postings · Examinations · Vacations",
  },
  {
    id: "exam-timetable",
    href: "/resources/exam-timetable",
    Icon: CalendarDays,
    label: "Supplementary Exams",
    title: "Exam Timetable",
    description:
      "Tentative supplementary examination timetable for GNM (1st, 2nd & 3rd Year) and ANM (2nd Year) — A.Y. 2026–27.",
    count: "2026–27",
    bg: "from-rose-50 to-rose-100/50",
    border: "border-rose-100",
    iconBg: "bg-rose-600",
    badgeBg: "bg-rose-50 text-rose-700",
    btnBg: "bg-rose-600 hover:bg-rose-700",
    highlight: "GNM Year 1 · GNM Year 2 · GNM Year 3 · ANM Year 2",
  },
  {
    id: "other",
    href: "/resources/other",
    Icon: FolderOpen,
    label: "Forms & Guides",
    title: "Other Resources",
    description:
      "Admission forms, student handbook, scholarship guidelines and other essential administrative documents.",
    count: "4+ files",
    bg: "from-violet-50 to-violet-100/50",
    border: "border-violet-100",
    iconBg: "bg-violet-600",
    badgeBg: "bg-violet-50 text-violet-700",
    btnBg: "bg-violet-600 hover:bg-violet-700",
    highlight: "Admission Form · Student Handbook · Scholarship Info",
  },
];

export default function ResourcesHubPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.25em]">Academic Portal</span>
            <div className="w-8 h-px bg-blue-400" />
          </div>
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-tight">
            Student Resources
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-12">
            All academic materials in one place — syllabus, question papers, exam prep, schedules and essential forms.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            {[
              { value: "1", label: "Course Syllabus" },
              { value: "9", label: "Previous Year Papers" },
              { value: "3", label: "Question Banks" },
              { value: "4", label: "Year Timetables" },
              { value: "4+", label: "Other Documents" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const Icon = cat.Icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className={`group relative bg-gradient-to-br ${cat.bg} rounded-3xl border ${cat.border} overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`p-3 rounded-2xl ${cat.iconBg} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${cat.badgeBg}`}>
                      {cat.count}
                    </span>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">{cat.label}</p>
                  <h2 className="font-playfair font-bold text-xl text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {cat.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{cat.description}</p>
                  <p className="text-xs text-slate-400 italic mb-5 line-clamp-1">{cat.highlight}</p>

                  <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl ${cat.btnBg} text-white text-sm font-semibold shadow-sm group-hover:shadow-md transition-all duration-200`}>
                    View All
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/20 rounded-full pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/20 rounded-full pointer-events-none" />
              </Link>
            );
          })}
        </div>

        {/* Notice */}
        <div className="mt-12 bg-white border border-slate-100 rounded-2xl p-7 flex flex-col sm:flex-row gap-5 items-start shadow-sm">
          <div className="bg-amber-50 p-3 rounded-xl shrink-0">
            <FileText className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Access Instructions</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1.5 text-slate-500 text-sm list-disc pl-4">
              <li>PDF files can be opened or downloaded directly.</li>
              <li>Google Drive links open in a new tab — no sign-in required.</li>
              <li>Files are updated at the start of each academic session.</li>
              <li>Contact the office for any restricted or missing documents.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

