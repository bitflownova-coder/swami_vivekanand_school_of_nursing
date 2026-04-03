"use client";

import Link from "next/link";
import {
  ChevronRight,
  FileText,
  CheckCircle,
  ClipboardList,
  AlertCircle,
  Printer,
} from "lucide-react";

const documents = [
  { no: 1, doc: "SSC Mark Sheet" },
  { no: 2, doc: "SSC Board Certificate" },
  { no: 3, doc: "HSC Mark Sheet" },
  { no: 4, doc: "HSC Board Certificate" },
  { no: 5, doc: "Leaving Certificate (TC)" },
  { no: 6, doc: "Gap Certificate (If applicable)" },
  { no: 7, doc: "Caste Certificate" },
  { no: 8, doc: "Income Certificate" },
  { no: 9, doc: "Nationality & Domicile Certificate" },
  { no: 10, doc: "Aadhar Card (Colour Print Laminated)" },
  { no: 11, doc: "Bank Pass Book Xerox" },
  { no: 12, doc: "Bank Receipt \u2013 Aadhar Link to A/c" },
  { no: 13, doc: 'Passport Size Photo \u2013 05 & with Apron and School uniform 2"\u00D72" (5)' },
  { no: 14, doc: "Caste Validity (If applicable)" },
  { no: 15, doc: "Undertaking for GOI Scholarship" },
  { no: 16, doc: "Medical Fitness Certificate" },
  { no: 17, doc: "Ration Card (front page and last page Student name included) Xerox" },
  { no: 18, doc: "Any Other Documents" },
];

const relatedLinks = [
  { label: "Overview",            href: "/admissions" },
  { label: "Eligibility Criteria", href: "/admissions/eligibility" },
  { label: "Fee Structure",       href: "/admissions/fees" },
  { label: "Admission Form",      href: "/admissions/apply" },
];

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          nav, header, footer, .floating-enquiry { display: none !important; }
          body { margin: 0; padding: 0; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-checklist { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; border-radius: 0 !important; padding: 10mm !important; }
        }
      `}</style>

      {/* â”€â”€â”€ HERO â”€â”€â”€ */}
      <section className="no-print relative bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-semibold">Documents Required</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">GNM Admissions 2026&ndash;27</span>
          </div>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
            Documents Required
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Keep the following documents ready before beginning your application.
            Print this checklist and bring it to the college office.
          </p>
          <button
            onClick={() => window.print()}
            className="mt-6 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
          >
            <Printer className="h-4 w-4" /> Print Checklist
          </button>
        </div>
      </section>

      {/* â”€â”€â”€ PRINTABLE CHECKLIST â”€â”€â”€ */}
      <section className="py-12 print:py-0">
        <div className="print-checklist max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Print-only header */}
          <div className="hidden print:block text-center mb-6 border-b-2 border-slate-800 pb-4">
            <p className="text-[10px] tracking-[0.15em] uppercase text-slate-500">Indrayani Pratishthan&apos;s</p>
            <p className="text-lg font-bold">Swami Vivekanand School of Nursing (GNM)</p>
            <p className="text-xs text-slate-600">Beed by Pass Road, Aurangabad</p>
            <p className="text-sm font-bold mt-3 uppercase tracking-wide">(Original Documents Submission)</p>
          </div>

          {/* Student info fields (print-only) */}
          <div className="hidden print:block mb-6 space-y-2 text-sm">
            <p><strong>Student Name:</strong> _______________________________________________</p>
            <p><strong>MAHADBT USER ID:</strong> ___________________________________________</p>
            <p><strong>MAHADBT PASSWORD:</strong> _________________________________________</p>
          </div>

          {/* Screen heading */}
          <div className="no-print text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Checklist</span>
              <div className="w-8 h-0.5 bg-blue-700" />
            </div>
            <h2 className="font-bold text-3xl text-slate-900 mb-3">Documents Checklist</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Ensure originals and attested photocopies of all applicable documents are available.
            </p>
          </div>

          {/* Checklist table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm print:rounded-none print:shadow-none">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white print:bg-slate-800">
                  <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">Document / Particular</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(({ no, doc }) => (
                  <tr key={no} className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${no % 2 === 0 ? "bg-slate-50/50" : "bg-white"}`}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4 text-slate-400 flex-shrink-0 no-print" />
                        <span className="text-sm text-slate-800 font-medium">{doc}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 border-t border-slate-200">
                  <td colSpan={1} className="px-5 py-2.5 text-xs text-slate-500 text-center">
                    Total: <strong className="text-slate-700">18 documents</strong> &mdash; Print this checklist and bring it to the admission office.
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Signature section (print-only) */}
          <div className="hidden print:grid grid-cols-2 gap-16 mt-12 px-4">
            <div className="text-center">
              <div className="h-12 border-b-2 border-slate-800 mb-2" />
              <p className="font-bold text-sm">Student Name &amp; Signature</p>
            </div>
            <div className="text-center">
              <div className="h-12 border-b-2 border-slate-800 mb-2" />
              <p className="font-bold text-sm">Parent Name &amp; Signature</p>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mt-8">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <h3 className="font-bold text-sm text-amber-900">Important Notes</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[13px] text-amber-800">
              {[
                "All documents must be self-attested by the applicant.",
                "Original documents will be verified at the time of admission.",
                "Category/disability certificates from a competent authority only.",
                "Incomplete applications may be rejected without prior notice.",
                "Keep 5 passport-size photographs with apron/uniform.",
                "\u0939\u092E\u0940\u092A\u0924\u094D\u0930 must be on \u20B9100 Non-Judicial Stamp Paper.",
              ].map((note) => (
                <div key={note} className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="no-print mt-8 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              <Printer className="h-4 w-4" /> Print / Download Checklist
            </button>
            <Link
              href="/admissions/apply"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Fill Admission Form <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ RELATED PAGES â”€â”€â”€ */}
      <section className="no-print py-10 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Also in Admissions</p>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-all"
              >
                {label}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
