"use client";

import Link from "next/link";
import { HelpCircle, Download, ArrowLeft, ChevronRight } from "lucide-react";

const questionBanks = [
  {
    id: "q1",
    year: "First Year",
    badge: "Year 1",
    title: "First Year Question Bank",
    description: "Covers Anatomy, Physiology, Nutrition, Biochemistry, Nursing Foundations and Microbiology.",
    link: null,
    color: "blue",
  },
  {
    id: "q2",
    year: "Second Year",
    badge: "Year 2",
    title: "Second Year Question Bank",
    description: "Includes Medical Surgical Nursing, Pharmacology, Community Health and Communicable diseases.",
    link: null,
    color: "emerald",
  },
  {
    id: "q3",
    year: "Third Year",
    badge: "Year 3",
    title: "Third Year Question Bank",
    description: "Covers Midwifery, Gynaecological Nursing, Paediatric Nursing and Mental Health Nursing.",
    link: null,
    color: "violet",
  },
];

const colorMap: Record<string, { border: string; badge: string; iconBg: string; iconText: string; }> = {
  blue:    { border: "border-blue-100",    badge: "bg-blue-50 text-blue-700",       iconBg: "bg-blue-50",    iconText: "text-blue-600"    },
  emerald: { border: "border-emerald-100", badge: "bg-emerald-50 text-emerald-700", iconBg: "bg-emerald-50", iconText: "text-emerald-600" },
  violet:  { border: "border-violet-100",  badge: "bg-violet-50 text-violet-700",   iconBg: "bg-violet-50",  iconText: "text-violet-600"  },
};

export default function QuestionBanksPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-emerald-800 to-emerald-950 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/downloads" className="inline-flex items-center gap-2 text-emerald-300 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 rounded-2xl bg-emerald-500/20">
              <HelpCircle className="h-8 w-8 text-emerald-300" />
            </div>
            <div>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">Exam Preparation</p>
              <h1 className="font-playfair font-bold text-3xl sm:text-4xl text-white">Question Banks</h1>
            </div>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
            Year-wise curated question banks covering all subjects to help students practise and prepare for end-of-year examinations.
          </p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/downloads" className="hover:text-blue-600 transition-colors">Resources</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-600 font-medium">Question Banks</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
        {questionBanks.map((item) => {
          const c = colorMap[item.color];
          return (
            <div key={item.id} className={`bg-white rounded-2xl border ${c.border} shadow-sm hover:shadow-md transition-all duration-300`}>
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className={`shrink-0 w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center`}>
                  <HelpCircle className={`h-7 w-7 ${c.iconText}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${c.badge}`}>{item.badge}</span>
                  </div>
                  <h2 className="font-semibold text-slate-900 text-lg mb-1">{item.title}</h2>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-400 font-medium text-sm cursor-not-allowed">
                    <Download className="h-4 w-4" />
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-4 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-sm text-emerald-800">
          <strong>Note:</strong> Question banks are updated each academic year. Check back regularly or contact the academic office for the latest sets.
        </div>
      </div>
    </div>
  );
}
