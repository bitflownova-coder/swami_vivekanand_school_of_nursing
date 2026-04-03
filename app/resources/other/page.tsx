"use client";

import Link from "next/link";
import { FolderOpen, ExternalLink, Download, ArrowLeft, ChevronRight, FileText } from "lucide-react";

const otherResources = [
  {
    id: "r1",
    title: "Admission Form 2026-27",
    description: "Official admission application form for the 2026–27 academic session.",
    type: "PDF",
    category: "Form",
    link: "https://drive.google.com/file/d/1m4c9Gpc1eAazJCNpbebRbhKeCNejM7j9/view",
    color: "blue",
  },
  {
    id: "r2",
    title: "Academic Calendar 2026-2027",
    description: "Full year schedule including exams, postings and holidays.",
    type: "PDF",
    category: "Calendar",
    link: null,
    color: "emerald",
  },
  {
    id: "r3",
    title: "Student Handbook",
    description: "Rules, regulations and guidelines every enrolled student must follow.",
    type: "PDF",
    category: "Guide",
    link: null,
    color: "violet",
  },
  {
    id: "r4",
    title: "Scholarship Guidelines",
    description: "Eligibility criteria and application process for available scholarships.",
    type: "PDF",
    category: "Info",
    link: null,
    color: "amber",
  },
];

const colorMap: Record<string, { border: string; badge: string; iconBg: string; iconText: string; btn: string }> = {
  blue:    { border: "border-blue-100",    badge: "bg-blue-50 text-blue-700",       iconBg: "bg-blue-50",    iconText: "text-blue-600",    btn: "border-blue-200 text-blue-700 hover:bg-blue-600"    },
  emerald: { border: "border-emerald-100", badge: "bg-emerald-50 text-emerald-700", iconBg: "bg-emerald-50", iconText: "text-emerald-600", btn: "border-emerald-200 text-emerald-700 hover:bg-emerald-600" },
  violet:  { border: "border-violet-100",  badge: "bg-violet-50 text-violet-700",   iconBg: "bg-violet-50",  iconText: "text-violet-600",  btn: "border-violet-200 text-violet-700 hover:bg-violet-600"  },
  amber:   { border: "border-amber-100",   badge: "bg-amber-50 text-amber-700",     iconBg: "bg-amber-50",   iconText: "text-amber-600",   btn: "border-amber-200 text-amber-700 hover:bg-amber-600"   },
};

export default function OtherResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-violet-900 to-violet-950 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/downloads" className="inline-flex items-center gap-2 text-violet-300 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 rounded-2xl bg-violet-500/20">
              <FolderOpen className="h-8 w-8 text-violet-300" />
            </div>
            <div>
              <p className="text-violet-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">Student Resources</p>
              <h1 className="font-playfair font-bold text-3xl sm:text-4xl text-white">Forms & Guides</h1>
            </div>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
            Admission forms, student handbooks, scholarship guidelines and other essential administrative documents.
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
          <span className="text-slate-600 font-medium">Forms & Guides</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
        {otherResources.map((item) => {
          const c = colorMap[item.color];
          return (
            <div key={item.id} className={`bg-white rounded-2xl border ${c.border} shadow-sm hover:shadow-md transition-all duration-300`}>
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className={`shrink-0 w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center`}>
                  <FileText className={`h-7 w-7 ${c.iconText}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${c.badge}`}>{item.category}</span>
                    <span className="text-xs text-slate-400">{item.type}</span>
                  </div>
                  <h2 className="font-semibold text-slate-900 text-lg mb-1">{item.title}</h2>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
                <div className="shrink-0">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border ${c.btn} hover:text-white hover:border-transparent font-medium text-sm transition-all duration-200`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-400 font-medium text-sm cursor-not-allowed">
                      <Download className="h-4 w-4" />
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
