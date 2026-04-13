"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowLeft, ChevronRight, CalendarDays, Download } from "lucide-react";

/* ─── Timetable Data ─────────────────────────────────── */
const courses = [
  {
    id: "gnm1",
    label: "GNM – 1st Year",
    badge: "GNM 1st Year",
    examType: "Regular Supplementary Examination",
    academicYear: "A.Y. 2026–27",
    board: "Maharashtra State Board of Nursing and Paramedical Education",
    color: {
      hero: "from-blue-800 to-blue-950",
      accent: "text-blue-400",
      tab: "bg-blue-600 text-white",
      tabInactive: "hover:bg-blue-50 hover:text-blue-700",
      headerBg: "bg-blue-600",
      rowEven: "bg-blue-50/50",
      badge: "bg-blue-50 text-blue-700",
      border: "border-blue-100",
    },
    papers: [
      { date: "25/04/2026", day: "Tuesday",   time: "09:00 am – 12:00 pm", paper: "I",   subject: "Anatomy, Physiology and Microbiology" },
      { date: "26/04/2026", day: "Wednesday", time: "09:00 am – 12:00 pm", paper: "II",  subject: "Fundamentals of Nursing" },
      { date: "27/04/2026", day: "Thursday",  time: "09:00 am – 12:00 pm", paper: "III", subject: "Community Health Nursing – I & Behavioural Sciences" },
    ],
  },
  {
    id: "gnm2",
    label: "GNM – 2nd Year",
    badge: "GNM 2nd Year",
    examType: "Regular Supplementary Examination",
    academicYear: "A.Y. 2026–27",
    board: "Maharashtra State Board of Nursing and Paramedical Education",
    color: {
      hero: "from-emerald-800 to-emerald-950",
      accent: "text-emerald-400",
      tab: "bg-emerald-600 text-white",
      tabInactive: "hover:bg-emerald-50 hover:text-emerald-700",
      headerBg: "bg-emerald-600",
      rowEven: "bg-emerald-50/50",
      badge: "bg-emerald-50 text-emerald-700",
      border: "border-emerald-100",
    },
    papers: [
      { date: "25/04/2026", day: "Tuesday",   time: "09:00 am – 12:00 pm", paper: "I",   subject: "Medical Surgical Nursing – I" },
      { date: "26/04/2026", day: "Wednesday", time: "09:00 am – 12:00 pm", paper: "II",  subject: "Medical Surgical Nursing – II" },
      { date: "27/04/2026", day: "Thursday",  time: "09:00 am – 12:00 pm", paper: "III", subject: "Mental Health and Psychiatric Nursing" },
    ],
  },
  {
    id: "gnm3",
    label: "GNM – 3rd Year",
    badge: "GNM 3rd Year",
    examType: "Regular Supplementary Examination",
    academicYear: "A.Y. 2026–27",
    board: "Maharashtra State Board of Nursing and Paramedical Education",
    color: {
      hero: "from-violet-800 to-violet-950",
      accent: "text-violet-400",
      tab: "bg-violet-600 text-white",
      tabInactive: "hover:bg-violet-50 hover:text-violet-700",
      headerBg: "bg-violet-600",
      rowEven: "bg-violet-50/50",
      badge: "bg-violet-50 text-violet-700",
      border: "border-violet-100",
    },
    papers: [
      { date: "25/04/2026", day: "Tuesday",   time: "09:00 am – 12:00 pm", paper: "I",   subject: "Midwifery and Gynecology Nursing" },
      { date: "26/04/2026", day: "Wednesday", time: "09:00 am – 12:00 pm", paper: "II",  subject: "Community Health Nursing – II" },
      { date: "27/04/2026", day: "Thursday",  time: "09:00 am – 12:00 pm", paper: "III", subject: "Nursing Education and Introduction to Research" },
    ],
  },
  {
    id: "anm2",
    label: "ANM – 2nd Year",
    badge: "ANM 2nd Year",
    examType: "Regular Batch Supplementary Examination",
    academicYear: "A.Y. 2026–27",
    board: "Maharashtra State Board of Nursing and Paramedical Education",
    color: {
      hero: "from-rose-800 to-rose-950",
      accent: "text-rose-400",
      tab: "bg-rose-600 text-white",
      tabInactive: "hover:bg-rose-50 hover:text-rose-700",
      headerBg: "bg-rose-600",
      rowEven: "bg-rose-50/50",
      badge: "bg-rose-50 text-rose-700",
      border: "border-rose-100",
    },
    papers: [
      { date: "25/04/2026", day: "Tuesday",   time: "01:00 pm – 04:00 pm", paper: "I",  subject: "Midwifery" },
      { date: "26/04/2026", day: "Wednesday", time: "01:00 pm – 04:00 pm", paper: "II", subject: "Health Centre Management" },
    ],
  },
];

/* ─── PDF Generator ─────────────────────────────────── */
async function downloadTimetablePDF(course: typeof courses[0]) {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;
  const colW = [14, 44, 50, 16, 0]; // Sr No, Date, Time, Paper, Subject (auto)
  const contentW = pageW - margin * 2;
  colW[4] = contentW - colW[0] - colW[1] - colW[2] - colW[3];

  // ── Header ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("MAHARASHTRA STATE BOARD OF NURSING AND PARAMEDICAL EDUCATION", pageW / 2, 18, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Directorate of Medical Education and Research, 4th Floor, St. Georges Hospital Campus,", pageW / 2, 24, { align: "center" });
  doc.text("P.D'Melo Road, Fort, Mumbai-400 001  |  www.msbnpe.org  |  8652281026", pageW / 2, 29, { align: "center" });
  doc.setDrawColor(160);
  doc.line(margin, 33, pageW - margin, 33);

  // ── Title ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Tentative ${course.label} ${course.examType}`, pageW / 2, 42, { align: "center" });
  doc.setFontSize(11);
  doc.text(course.academicYear, pageW / 2, 49, { align: "center" });

  // ── Table ──
  let y = 58;
  const rowH = 12;
  const headH = 9;

  // Header row
  doc.setFillColor(30, 30, 30);
  doc.rect(margin, y, contentW, headH, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  let x = margin;
  const headers = ["Sr. No", "Date & Day", "Time", "Paper", "Subject"];
  headers.forEach((h, i) => {
    doc.text(h, x + colW[i] / 2, y + 6, { align: "center" });
    x += colW[i];
  });
  y += headH;

  // Data rows
  doc.setTextColor(30, 30, 30);
  course.papers.forEach((p, idx) => {
    const bg = idx % 2 === 0 ? [255, 255, 255] : [245, 247, 250];
    doc.setFillColor(bg[0], bg[1], bg[2]);
    doc.rect(margin, y, contentW, rowH, "F");
    doc.setDrawColor(210);
    doc.rect(margin, y, contentW, rowH, "S");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    x = margin;
    // Sr No
    doc.text(String(idx + 1), x + colW[0] / 2, y + 7, { align: "center" });
    x += colW[0];
    // Date
    doc.text(`${p.date} (${p.day})`, x + 2, y + 7);
    x += colW[1];
    // Time
    doc.text(p.time, x + 2, y + 7);
    x += colW[2];
    // Paper
    doc.text(p.paper, x + colW[3] / 2, y + 7, { align: "center" });
    x += colW[3];
    // Subject (wrap if needed)
    const lines = doc.splitTextToSize(p.subject, colW[4] - 4);
    doc.text(lines, x + 2, y + 5);

    y += rowH;
  });

  // ── Footer ──
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Registrar", pageW - margin, y, { align: "right" });
  doc.text("Maharashtra State Board of Nursing & Paramedical Education, Mumbai", pageW - margin, y + 6, { align: "right" });

  doc.save(`${course.id}-timetable-AY2026-27.pdf`);
}

export default function ExamTimetablePage() {
  const [activeId, setActiveId] = useState("gnm1");
  const current = courses.find((c) => c.id === activeId)!;
  const col = current.color;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Print styles */}
      <style>{`
        @media print {
          header, nav { display: none !important; }
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; }
          .print-area { box-shadow: none !important; }
          @page { margin: 1.5cm; size: A4; }
        }
      `}</style>

      {/* HERO */}
      <section className={`no-print relative bg-gradient-to-br ${col.hero} pt-10 pb-16 overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 rounded-2xl bg-white/10">
              <CalendarDays className="h-8 w-8 text-white/80" />
            </div>
            <div>
              <p className={`${col.accent} text-xs font-bold uppercase tracking-[0.2em] mb-1`}>
                Maharashtra State Board of Nursing
              </p>
              <h1 className="font-playfair font-bold text-3xl sm:text-4xl text-white">
                Supplementary Exam Timetable
              </h1>
            </div>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
            Tentative timetable for Regular Supplementary Examinations A.Y. 2026–27 — issued by the Maharashtra State
            Board of Nursing and Paramedical Education, Mumbai.
          </p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="no-print bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/downloads" className="hover:text-blue-600 transition-colors">Resources</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-600 font-medium">Supplementary Exam Timetable</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Tab bar + Download button */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {courses.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                  activeId === c.id
                    ? c.color.tab + " border-transparent shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 " + c.color.tabInactive
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => downloadTimetablePDF(current)}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-sm"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>

        {/* Timetable card */}
        <div className={`print-area bg-white rounded-2xl border ${col.border} shadow-sm overflow-hidden`}>
          {/* Card header */}
          <div className={`${col.headerBg} px-6 py-5`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">
                  {current.board}
                </p>
                <h2 className="text-white font-playfair font-bold text-xl sm:text-2xl">
                  Tentative {current.label} {current.examType}
                </h2>
              </div>
              <span className="whitespace-nowrap self-start sm:self-auto text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/20 text-white">
                {current.academicYear}
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-8">Sr. No</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Date & Day</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Time</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-16">Paper</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Subject</th>
                </tr>
              </thead>
              <tbody>
                {current.papers.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-slate-100 last:border-0 ${idx % 2 === 0 ? col.rowEven : "bg-white"}`}
                  >
                    <td className="px-5 py-4 text-slate-500 font-medium">{idx + 1}.</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">{row.date}</p>
                      <p className="text-slate-400 text-xs mt-0.5">({row.day})</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.time}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${col.badge}`}>
                        {row.paper}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-800">{row.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="px-6 py-4 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
            <Clock className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700">
              <strong>Note:</strong> This is a <em>tentative</em> timetable issued by the Maharashtra State Board of Nursing and
              Paramedical Education. Dates and timings are subject to change. Students are advised to verify with the
              institution&apos;s academic office before the examination.
            </p>
          </div>
        </div>

        {/* Info box */}
        <div className="no-print mt-8 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start shadow-sm">
          <div className="bg-blue-50 p-3 rounded-xl shrink-0">
            <CalendarDays className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1.5">Exam Information</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1.5 text-slate-500 text-sm list-disc pl-4">
              <li>Use the tabs above to switch between GNM and ANM year timetables.</li>
              <li>Carry your hall ticket and college ID on exam day.</li>
              <li>Report to the examination centre at least 30 minutes early.</li>
              <li>Contact the office for updates to dates or venues.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
