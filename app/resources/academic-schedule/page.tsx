"use client";

import Link from "next/link";
import { Calendar, ArrowLeft, ChevronRight, Download } from "lucide-react";
import AcademicCalendar from "@/components/academic-calendar";

/* ─── PDF Generator ─────────────────────────────────── */
async function downloadSchedulePDF() {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentW = pageW - margin * 2;

  // ── Header ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("SWAMI VIVEKANAND SCHOOL OF NURSING", pageW / 2, 18, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Chhatrapati Sambhajinagar, Maharashtra", pageW / 2, 24, { align: "center" });
  doc.setDrawColor(160);
  doc.line(margin, 28, pageW - margin, 28);

  // ── Title ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Academic Schedule — A.Y. 2024–25", pageW / 2, 37, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("GNM Nursing Programme · Week-wise Plan", pageW / 2, 43, { align: "center" });

  const terms = [
    {
      term: "Term I",
      label: "Foundation & Basic Theory",
      entries: [
        { weeks: "1",     dates: "Aug 01 – 02",     description: "Orientation Program",             type: "Orientation" },
        { weeks: "2–12",  dates: "Aug 04 – Oct 18",  description: "Theory Block I (11 Wks · 414 Hrs)", type: "Theory" },
        { weeks: "13",    dates: "Oct 20 – 25",      description: "Diwali Vacation",                 type: "Vacation" },
      ],
    },
    {
      term: "Term II",
      label: "Clinical Fundamentals & Mid-Term",
      entries: [
        { weeks: "14–17", dates: "Oct 27 – Nov 22",  description: "Theory Block II (4 Wks · 160 Hrs)", type: "Theory" },
        { weeks: "18–25", dates: "Nov 24 – Jan 17",  description: "FON Clinical Posting I (8 Wks · 384 Hrs)", type: "Clinical" },
        { weeks: "26",    dates: "Jan 19 – 24",      description: "Theory Revision",                 type: "Revision" },
        { weeks: "27",    dates: "Jan 26 – 31",      description: "Mid-Term Examination",            type: "Exam" },
      ],
    },
    {
      term: "Term III",
      label: "Community Health & Specialised Postings",
      entries: [
        { weeks: "28–31", dates: "Feb 02 – 28",      description: "RPH Posting (Regional Public Health · 4 Wks)", type: "Clinical" },
        { weeks: "32",    dates: "Mar 02 – 07",      description: "Holi Vacation",                   type: "Vacation" },
        { weeks: "33–36", dates: "Mar 09 – Apr 04",  description: "UPH Posting (Urban Public Health · 4 Wks)", type: "Clinical" },
        { weeks: "37–39", dates: "Apr 06 – 25",      description: "FON Clinical Posting II (3 Wks · 144 Hrs)", type: "Clinical" },
      ],
    },
    {
      term: "Term IV",
      label: "Final Preparation & University Exams",
      entries: [
        { weeks: "40–41", dates: "Apr 27 – May 09",  description: "Theory Block III (2 Wks · 80 Hrs)", type: "Theory" },
        { weeks: "42",    dates: "May 11 – 16",      description: "Pre-Final Examination",           type: "Exam" },
        { weeks: "43–49", dates: "May 18 – Jul 04",  description: "FON Clinical Posting III (7 Wks · 336 Hrs)", type: "Clinical" },
        { weeks: "50–51", dates: "Jul 06 – 18",      description: "Preparatory Leave & Final Exams", type: "Exam" },
        { weeks: "52",    dates: "Jul 20 – 25",      description: "Summer Vacation",                 type: "Vacation" },
      ],
    },
  ];

  const typeColors: Record<string, [number, number, number]> = {
    Orientation: [147, 51, 234],
    Theory:      [37, 99, 235],
    Clinical:    [5, 150, 105],
    Revision:    [100, 116, 139],
    Exam:        [220, 38, 38],
    Vacation:    [217, 119, 6],
  };

  const rowH = 9;
  const headH = 8;
  let y = 50;

  for (const term of terms) {
    // Term header
    doc.setFillColor(30, 30, 30);
    doc.rect(margin, y, contentW, headH, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(`${term.term} — ${term.label}`, margin + 3, y + 5.5);
    y += headH;

    // Column sub-header
    doc.setFillColor(240, 242, 245);
    doc.rect(margin, y, contentW, 7, "F");
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("Wk", margin + 3, y + 5);
    doc.text("Dates", margin + 22, y + 5);
    doc.text("Activity", margin + 70, y + 5);
    doc.text("Type", margin + contentW - 28, y + 5);
    y += 7;

    for (let i = 0; i < term.entries.length; i++) {
      const e = term.entries[i];
      const bg = i % 2 === 0 ? [255, 255, 255] : [248, 250, 252];
      doc.setFillColor(bg[0], bg[1], bg[2]);
      doc.rect(margin, y, contentW, rowH, "F");
      doc.setDrawColor(220);
      doc.rect(margin, y, contentW, rowH, "S");

      doc.setTextColor(40, 40, 40);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(e.weeks, margin + 3, y + 6);
      doc.text(e.dates, margin + 22, y + 6);
      const descLines = doc.splitTextToSize(e.description, contentW - 100);
      doc.text(descLines[0], margin + 70, y + 6);

      // Type badge color dot
      const col = typeColors[e.type] ?? [100, 100, 100];
      doc.setFillColor(col[0], col[1], col[2]);
      doc.circle(margin + contentW - 30, y + 4.5, 1.5, "F");
      doc.setTextColor(col[0], col[1], col[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text(e.type, margin + contentW - 26, y + 6);

      y += rowH;
    }
    y += 5; // Gap between terms
    if (y > 270) {
      doc.addPage();
      y = 18;
    }
  }

  // Footer
  doc.setTextColor(120, 120, 120);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Swami Vivekanand School of Nursing — Academic Schedule A.Y. 2024–25", pageW / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });

  doc.save("academic-schedule-AY2024-25.pdf");
}

export default function AcademicCalendarPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Print-only styles: hide everything except the calendar table ── */}
      <style>{`
        @media print {
          header, nav { display: none !important; }
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; }
          .print-area { box-shadow: none !important; border: none !important; }
          @page { margin: 1.5cm; size: A4 landscape; }
        }
      `}</style>

      {/* HERO */}
      <section className="no-print relative bg-gradient-to-br from-slate-800 to-blue-950 pt-10 pb-16 overflow-hidden">
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
      <div className="no-print bg-white border-b border-slate-100">
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
        {/* Download button */}
        <div className="no-print flex justify-end mb-6">
          <button
            onClick={() => downloadSchedulePDF()}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-sm"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
        <div className="print-area">
          <AcademicCalendar />
        </div>
      </div>
    </div>
  );
}
