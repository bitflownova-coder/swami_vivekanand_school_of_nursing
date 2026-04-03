"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Download, ArrowLeft, ChevronRight } from "lucide-react";

const years = [
  {
    id: "year1",
    label: "First Year G.N.M.",
    badge: "Year 1",
    color: {
      hero: "from-blue-800 to-blue-950",
      accent: "text-blue-400",
      tab: "bg-blue-600 text-white",
      tabInactive: "hover:bg-blue-50 hover:text-blue-700",
      cardBorder: "border-blue-100",
      iconBg: "bg-blue-50",
      iconText: "text-blue-600",
      badge: "bg-blue-50 text-blue-700",
      btn: "bg-blue-50 hover:bg-blue-600 border-blue-200 text-blue-700 hover:text-white hover:border-blue-600",
    },
    papers: [
      { id: "1a", title: "Nursing Foundation",    link: "/previous_questions/Nursing_foundation.pdf" },
      { id: "1b", title: "Community Health Nursing", link: "/previous_questions/Community_health_nursing.pdf" },
      { id: "1c", title: "Bio Science",            link: "/previous_questions/Bio_science.pdf" },
      { id: "1d", title: "Behavioural Sciences",   link: "/previous_questions/Behavioural_sciences.pdf" },
    ],
  },
  {
    id: "year2",
    label: "Second Year G.N.M.",
    badge: "Year 2",
    color: {
      hero: "from-emerald-800 to-emerald-950",
      accent: "text-emerald-400",
      tab: "bg-emerald-600 text-white",
      tabInactive: "hover:bg-emerald-50 hover:text-emerald-700",
      cardBorder: "border-emerald-100",
      iconBg: "bg-emerald-50",
      iconText: "text-emerald-600",
      badge: "bg-emerald-50 text-emerald-700",
      btn: "bg-emerald-50 hover:bg-emerald-600 border-emerald-200 text-emerald-700 hover:text-white hover:border-emerald-600",
    },
    papers: [
      { id: "2a", title: "Mental Health Nursing",      link: "/previous_questions/Mental_Health_Nursing.pdf" },
      { id: "2b", title: "Medical Surgical Nursing-I",  link: "/previous_questions/Medical_Surgical_Nursing_I.pdf" },
      { id: "2c", title: "Medical Surgical Nursing-II", link: "/previous_questions/Medical_Surgical_Nursing_II.pdf" },
    ],
  },
  {
    id: "year3",
    label: "Third Year G.N.M.",
    badge: "Year 3",
    color: {
      hero: "from-violet-800 to-violet-950",
      accent: "text-violet-400",
      tab: "bg-violet-600 text-white",
      tabInactive: "hover:bg-violet-50 hover:text-violet-700",
      cardBorder: "border-violet-100",
      iconBg: "bg-violet-50",
      iconText: "text-violet-600",
      badge: "bg-violet-50 text-violet-700",
      btn: "bg-violet-50 hover:bg-violet-600 border-violet-200 text-violet-700 hover:text-white hover:border-violet-600",
    },
    papers: [
      { id: "3a", title: "Paediatric Nursing",          link: "/previous_questions/Paediatric_Nursing.pdf" },
      { id: "3b", title: "Midwifery and Gynaecology",   link: "/previous_questions/Midwifery_and_Gynaecology.pdf" },
      { id: "3c", title: "Community Health Nursing",    link: "/previous_questions/Community_Health_Nursing (1).pdf" },
    ],
  },
];

export default function PreviousYearQuestionsPage() {
  const [activeYear, setActiveYear] = useState("year1");
  const current = years.find((y) => y.id === activeYear)!;
  const c = current.color;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className={`relative bg-gradient-to-br ${c.hero} pt-10 pb-16 overflow-hidden transition-all duration-300`}>
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/downloads" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-white/10">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className={`${c.accent} text-xs font-bold uppercase tracking-[0.2em] mb-1`}>GNM Programme</p>
              <h1 className="font-playfair font-bold text-3xl sm:text-4xl text-white">Previous Year Questions</h1>
            </div>
          </div>
          <p className="text-white/70 text-base max-w-2xl mb-8">
            Year-wise previous year examination papers for GNM students. Select a year to view its subject papers.
          </p>

          {/* Year Tabs inside hero */}
          <div className="flex flex-wrap gap-3">
            {years.map((y) => (
              <button
                key={y.id}
                onClick={() => setActiveYear(y.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                  activeYear === y.id
                    ? "bg-white text-slate-900 border-white shadow-lg"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
              >
                {y.label}
                <span className="ml-2 text-xs opacity-70">({y.papers.length} papers)</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/downloads" className="hover:text-blue-600 transition-colors">Resources</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-600 font-medium">Previous Year Questions</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-600 font-medium">{current.label}</span>
        </div>
      </div>

      {/* PAPERS GRID */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section heading */}
        <div className="flex items-center gap-3 mb-8">
          <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${c.badge}`}>
            {current.badge}
          </span>
          <h2 className="font-playfair font-bold text-2xl text-slate-800">{current.label}</h2>
          <span className="text-sm text-slate-400 ml-auto">{current.papers.length} papers</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {current.papers.map((paper, index) => (
            <div
              key={paper.id}
              className={`group bg-white rounded-2xl border ${c.cardBorder} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center shrink-0`}>
                    <FileText className={`h-5 w-5 ${c.iconText}`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${c.badge}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 text-base leading-snug mb-1 flex-1">{paper.title}</h3>
                <p className="text-xs text-slate-400 mb-4">{current.label} · Previous Year Paper</p>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border ${c.btn} text-sm font-medium transition-all duration-200`}
                >
                  <Download className="h-4 w-4" />
                  Open / Download
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Year navigation footer */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {years.map((y) => (
            <button
              key={y.id}
              onClick={() => setActiveYear(y.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                activeYear === y.id
                  ? `${y.color.tab} border-transparent`
                  : `border-slate-200 text-slate-600 ${y.color.tabInactive}`
              }`}
            >
              {y.label}
            </button>
          ))}
        </div>

        <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
          <strong>Tip:</strong> These papers follow the Maharashtra Nursing Council examination pattern. Practise solving within the given time limit for best results.
        </div>
      </div>
    </div>
  );
}
