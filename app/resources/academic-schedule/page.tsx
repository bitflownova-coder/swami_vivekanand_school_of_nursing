"use client";

import Link from "next/link";
import { Calendar, ArrowLeft, ChevronRight } from "lucide-react";
import AcademicCalendar from "@/components/academic-calendar";

export default function AcademicCalendarPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-800 to-blue-950 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/downloads" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 rounded-2xl bg-blue-500/20">
              <Calendar className="h-8 w-8 text-blue-300" />
            </div>
            <div>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">Academic Year 2024–25</p>
              <h1 className="font-playfair font-bold text-3xl sm:text-4xl text-white">Academic Schedule</h1>
            </div>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
            Week-by-week schedule of theory blocks, clinical postings, examinations and vacations for the current academic year.
          </p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/downloads" className="hover:text-blue-600 transition-colors">Resources</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-600 font-medium">Academic Schedule</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <AcademicCalendar />
      </div>
    </div>
  );
}
