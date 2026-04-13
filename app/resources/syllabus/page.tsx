"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Download,
  FileText,
  FlaskConical,
  Stethoscope,
  HeartPulse,
  Clock,
} from "lucide-react";

/* ─── Year Data ──────────────────────────────────────── */
const years = [
  {
    id: "year1",
    label: "1st Year G.N.M.",
    badge: "Year 1",
    semesters: "Semesters 1 & 2",
    theme: "Foundation & Basics",
    Icon: FlaskConical,
    color: {
      hero: "from-blue-800 to-blue-950",
      accent: "text-blue-400",
      tab: "bg-blue-600 text-white",
      tabInactive: "hover:bg-blue-50 hover:text-blue-700",
      headerBg: "bg-blue-600",
      cardBorder: "border-blue-100",
      iconBg: "bg-blue-50",
      iconText: "text-blue-600",
      badge: "bg-blue-50 text-blue-700",
      rowEven: "bg-blue-50/40",
      btn: "bg-blue-50 hover:bg-blue-600 border-blue-200 text-blue-700 hover:text-white hover:border-blue-600",
      btnDl: "bg-blue-600 hover:bg-blue-700",
      dot: "bg-blue-600",
    },
    subjects: [
      { code: "GNM-101", name: "Anatomy & Physiology",           hours: "120", clinical: "—" },
      { code: "GNM-102", name: "Microbiology & Nutrition",        hours: "60",  clinical: "—" },
      { code: "GNM-103", name: "Fundamentals of Nursing",         hours: "90",  clinical: "200" },
      { code: "GNM-104", name: "First Aid & Emergency Nursing",   hours: "30",  clinical: "40" },
      { code: "GNM-105", name: "Community Health Nursing – I",    hours: "60",  clinical: "80" },
      { code: "GNM-106", name: "Health Education & Comm.",        hours: "30",  clinical: "—" },
      { code: "GNM-107", name: "Environmental Hygiene",           hours: "30",  clinical: "—" },
      { code: "GNM-108", name: "Psychology",                      hours: "45",  clinical: "—" },
      { code: "GNM-109", name: "Sociology",                       hours: "30",  clinical: "—" },
    ],
    clinicalTotal: "320",
    theoryTotal: "495",
    note: "Year 1 focuses on building foundational sciences and basic nursing skills through classroom theory and bedside practice.",
  },
  {
    id: "year2",
    label: "2nd Year G.N.M.",
    badge: "Year 2",
    semesters: "Semesters 3 & 4",
    theme: "Medical & Surgical",
    Icon: Stethoscope,
    color: {
      hero: "from-emerald-800 to-emerald-950",
      accent: "text-emerald-400",
      tab: "bg-emerald-600 text-white",
      tabInactive: "hover:bg-emerald-50 hover:text-emerald-700",
      headerBg: "bg-emerald-700",
      cardBorder: "border-emerald-100",
      iconBg: "bg-emerald-50",
      iconText: "text-emerald-600",
      badge: "bg-emerald-50 text-emerald-700",
      rowEven: "bg-emerald-50/40",
      btn: "bg-emerald-50 hover:bg-emerald-600 border-emerald-200 text-emerald-700 hover:text-white hover:border-emerald-600",
      btnDl: "bg-emerald-600 hover:bg-emerald-700",
      dot: "bg-emerald-600",
    },
    subjects: [
      { code: "GNM-201", name: "Medical-Surgical Nursing – I",    hours: "90",  clinical: "240" },
      { code: "GNM-202", name: "Medical-Surgical Nursing – II",   hours: "90",  clinical: "240" },
      { code: "GNM-203", name: "Pharmacology",                    hours: "60",  clinical: "—" },
      { code: "GNM-204", name: "Pathology & Genetics",            hours: "45",  clinical: "—" },
      { code: "GNM-205", name: "Medical Jurisprudence",           hours: "30",  clinical: "—" },
      { code: "GNM-206", name: "Communicable Disease Nursing",    hours: "45",  clinical: "60" },
      { code: "GNM-207", name: "Orthopaedic Nursing",             hours: "30",  clinical: "40" },
      { code: "GNM-208", name: "Professional Trends in Nursing",  hours: "30",  clinical: "—" },
    ],
    clinicalTotal: "580",
    theoryTotal: "420",
    note: "Year 2 advances into medical and surgical nursing with intensive rotational clinical postings across hospital wards.",
  },
  {
    id: "year3",
    label: "3rd Year G.N.M.",
    badge: "Year 3",
    semesters: "Semesters 5 & 6",
    theme: "Advanced & Specialised",
    Icon: HeartPulse,
    color: {
      hero: "from-violet-800 to-violet-950",
      accent: "text-violet-400",
      tab: "bg-violet-600 text-white",
      tabInactive: "hover:bg-violet-50 hover:text-violet-700",
      headerBg: "bg-violet-700",
      cardBorder: "border-violet-100",
      iconBg: "bg-violet-50",
      iconText: "text-violet-600",
      badge: "bg-violet-50 text-violet-700",
      rowEven: "bg-violet-50/40",
      btn: "bg-violet-50 hover:bg-violet-600 border-violet-200 text-violet-700 hover:text-white hover:border-violet-600",
      btnDl: "bg-violet-600 hover:bg-violet-700",
      dot: "bg-violet-600",
    },
    subjects: [
      { code: "GNM-301", name: "Child Health Nursing (Paediatrics)",   hours: "60",  clinical: "240" },
      { code: "GNM-302", name: "Midwifery & Obstetric Nursing",        hours: "90",  clinical: "320" },
      { code: "GNM-303", name: "Community Health Nursing – II",        hours: "60",  clinical: "320" },
      { code: "GNM-304", name: "Psychiatric Nursing",                  hours: "45",  clinical: "160" },
      { code: "GNM-305", name: "Geriatric & Palliative Care",          hours: "30",  clinical: "—" },
      { code: "GNM-306", name: "Nursing Research & Statistics",        hours: "45",  clinical: "—" },
      { code: "GNM-307", name: "Supervised Internship",                hours: "—",   clinical: "960" },
    ],
    clinicalTotal: "2000+",
    theoryTotal: "330",
    note: "Year 3 covers specialised nursing disciplines and culminates in a supervised internship at affiliated hospitals.",
  },
];

const PDF_FILE = "/syllabus/GNM_Syllabus.pdf";

/* ─── Page ───────────────────────────────────────────── */
export default function SyllabusPage() {
  const [activeId, setActiveId] = useState("year1");
  const current = years.find((y) => y.id === activeId)!;
  const c = current.color;
  const Icon = current.Icon;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className={`relative bg-gradient-to-br ${c.hero} pt-10 pb-16 overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/downloads" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 rounded-2xl bg-white/10">
              <BookOpen className="h-8 w-8 text-white/80" />
            </div>
            <div>
              <p className={`${c.accent} text-xs font-bold uppercase tracking-[0.2em] mb-1`}>GNM Programme</p>
              <h1 className="font-playfair font-bold text-3xl sm:text-4xl text-white">Course Syllabus</h1>
            </div>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
            Year-wise curriculum covering all subjects, theory hours, clinical postings and examination patterns
            for the 3-year GNM programme.
          </p>
          {/* Quick stats */}
          <div className="flex flex-wrap gap-5 mt-8">
            {[
              { v: "3", l: "Years" },
              { v: "6", l: "Semesters" },
              { v: "2000+", l: "Clinical Hours" },
            ].map((s) => (
              <div key={s.l} className="px-5 py-3 bg-white/10 rounded-xl text-center min-w-[80px]">
                <p className="text-white font-bold text-xl">{s.v}</p>
                <p className="text-white/60 text-xs mt-0.5 uppercase tracking-wider">{s.l}</p>
              </div>
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
          <span className="text-slate-600 font-medium">Course Syllabus</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Year tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {years.map((y) => (
            <button
              key={y.id}
              onClick={() => setActiveId(y.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                activeId === y.id
                  ? y.color.tab + " border-transparent shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 " + y.color.tabInactive
              }`}
            >
              {y.label}
            </button>
          ))}
        </div>

        {/* Year card */}
        <div className={`bg-white rounded-2xl border ${c.cardBorder} shadow-sm overflow-hidden`}>

          {/* Card header */}
          <div className={`${c.headerBg} px-6 py-5`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/15">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-0.5">{current.semesters}</p>
                  <h2 className="text-white font-playfair font-bold text-xl sm:text-2xl">
                    {current.label} — {current.theme}
                  </h2>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-bold uppercase px-3 py-1.5 rounded-full bg-white/20 text-white">
                  Theory: {current.theoryTotal} hrs
                </span>
                <span className="text-xs font-bold uppercase px-3 py-1.5 rounded-full bg-white/20 text-white">
                  Clinical: {current.clinicalTotal} hrs
                </span>
              </div>
            </div>
          </div>

          {/* Subject table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Code</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Subject</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Theory Hrs</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Clinical Hrs</th>
                </tr>
              </thead>
              <tbody>
                {current.subjects.map((sub, idx) => (
                  <tr
                    key={sub.code}
                    className={`border-b border-slate-100 last:border-0 ${idx % 2 === 0 ? c.rowEven : "bg-white"}`}
                  >
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${c.badge}`}>{sub.code}</span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-800">{sub.name}</td>
                    <td className="px-5 py-3.5 text-center text-slate-600">{sub.hours}</td>
                    <td className="px-5 py-3.5 text-center text-slate-600">{sub.clinical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Year note */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <p className="text-xs text-slate-500 italic">{current.note}</p>
          </div>
        </div>

        {/* Full PDF download */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 mb-0.5">GNM Complete Syllabus (All 3 Years)</h3>
              <p className="text-sm text-slate-500">
                Official full syllabus PDF prescribed by the Indian Nursing Council — covers all years, subjects, clinical hours and examination patterns.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-3">
              <a
                href={PDF_FILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 border border-blue-200 text-blue-700 hover:text-white hover:border-blue-600 text-sm font-semibold transition-all duration-200"
              >
                <FileText className="h-4 w-4" /> View PDF
              </a>
              <a
                href={PDF_FILE}
                download
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Download className="h-4 w-4" /> Download
              </a>
            </div>
          </div>
        </div>

        {/* Info box */}
        <div className="mt-6 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start shadow-sm">
          <div className="bg-amber-50 p-3 rounded-xl shrink-0">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1.5">Notes</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1.5 text-slate-500 text-sm list-disc pl-4">
              <li>Subject codes and hours are indicative — refer to the official PDF for exact details.</li>
              <li>Clinical hours include rotational postings at affiliated hospitals.</li>
              <li>Curriculum is approved by the Indian Nursing Council (INC), New Delhi.</li>
              <li>Contact the academic office for subject-specific queries.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
