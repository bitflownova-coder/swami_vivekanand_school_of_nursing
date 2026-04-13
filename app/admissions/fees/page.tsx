import Link from "next/link";
import {
  ChevronRight,
  IndianRupee,
  AlertCircle,
  FileText,
  ClipboardList,
} from "lucide-react";

export const metadata = {
  title: "Fee Structure | Admissions | Swami Vivekanand School of Nursing",
  description:
    "Government-approved GNM fee structure at Swami Vivekanand School of Nursing, Chhatrapati Sambhajinagar.",
};

const relatedLinks = [
  { label: "Overview",            href: "/admissions" },
  { label: "Eligibility Criteria", href: "/admissions/eligibility" },
  { label: "Documents Required",  href: "/admissions/documents" },
  { label: "How to Apply",        href: "/admissions/apply" },
];

export default function FeesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* â”€â”€â”€ HERO â”€â”€â”€ */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-semibold">Fee Structure</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">GNM Admissions 2026–27</span>
          </div>
          <h1 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
            Approved Fee Structure
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Fees are approved by the Nursing Diploma Course Shikshan Shulka Samiti and 
            Maharashtra Nursing Council. Scholarships are available for eligible students.
          </p>
        </div>
      </section>

      {/* â”€â”€â”€ FEE TABLE â”€â”€â”€ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700"></div>
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Fee Structure</span>
              <div className="w-8 h-0.5 bg-blue-700"></div>
            </div>
            <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-4">Annual Fee Breakdown</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Fees approved by the Nursing Diploma Course Shikshan Shulka Samiti.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-slate-900 text-white px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IndianRupee className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">Fee Structure</div>
                  <div className="text-slate-400 text-xs">Academic Years 2023–25 · GNM Program</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-300 text-sm font-semibold">Swami Vivekanand School of Nursing</div>
                <div className="text-slate-500 text-xs">Chh. Sambhajinagar</div>
              </div>
            </div>

            {/* Column Headers */}
            <div className="divide-y divide-slate-100">
              <div className="hidden sm:grid sm:grid-cols-[3rem_1fr_5rem_7rem_7rem_7rem_7rem] gap-x-4 px-6 py-3 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <span>Sr.</span>
                <span>Course</span>
                <span>Year</span>
                <span>Fee Type</span>
                <span className="text-right">Development</span>
                <span className="text-right">Tuition</span>
                <span className="text-right">Total</span>
              </div>

              {[
                { sr: 1, year: "2023-24", feeType: "Ad-hoc fee",  dev: "₹4,545",  tuition: "₹45,455", total: "₹50,000" },
                { sr: 2, year: "2024-25", feeType: "Ad-hoc fee",  dev: "₹5,225",  tuition: "₹49,775", total: "₹55,000" },
                { sr: 3, year: "2025-26", feeType: "FRA Approved", dev: "₹5,273",  tuition: "₹52,727", total: "₹58,000" },
              ].map(({ sr, year, feeType, dev, tuition, total }) => (
                <div
                  key={sr}
                  className="sm:grid sm:grid-cols-[3rem_1fr_5rem_7rem_7rem_7rem_7rem] gap-x-4 px-6 py-5 hover:bg-slate-50 transition-colors"
                >
                  {/* Mobile */}
                  <div className="sm:hidden space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-700 text-lg">GNM</span>
                        <span className="text-slate-500 text-sm">{year}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${feeType === "FRA Approved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{feeType}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 mb-0.5">Total Fee</div>
                        <div className="text-xl font-bold text-blue-700">{total}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 pt-1 border-t border-slate-100">
                      <div><span className="text-slate-400 text-xs block">Development Fee</span>{dev}</div>
                      <div><span className="text-slate-400 text-xs block">Tuition Fee</span>{tuition}</div>
                    </div>
                  </div>
                  {/* Desktop */}
                  <span className="hidden sm:block font-medium text-slate-900 self-center">{sr}</span>
                  <span className="hidden sm:block font-bold text-blue-700 self-center">GNM</span>
                  <span className="hidden sm:block text-slate-600 self-center">{year}</span>
                  <span className="hidden sm:flex self-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${feeType === "FRA Approved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{feeType}</span>
                  </span>
                  <span className="hidden sm:block text-right text-slate-700 self-center">{dev}</span>
                  <span className="hidden sm:block text-right text-slate-700 self-center">{tuition}</span>
                  <span className="hidden sm:block text-right self-center">
                    <span className="text-lg font-bold text-blue-700">{total}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 bg-amber-50 px-7 py-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-amber-800">
                  <p>• Approved by Maharashtra Nursing Council.</p>
                  <p>• Additional fees for hostel, uniform &amp; exams apply.</p>
                  <p>• Fees subject to government revision.</p>
                  <p>• Scholarship options available for eligible students.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { label: "Hostel Fees",    desc: "Separate hostel accommodation fees apply. Contact admissions office for current rates." },
              { label: "Scholarship",    desc: "Government and merit scholarships available for SC/ST/OBC/EWS and meritorious students." },
              { label: "Payment Mode",   desc: "Fees can be paid online (NEFT/UPI) or via demand draft. No cash payments at institution." },
            ].map(({ label, desc }) => (
              <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                <h4 className="font-bold text-slate-900 mb-2 text-sm">{label}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/admissions/apply"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200"
            >
              Begin Application
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-slate-300 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-semibold px-8 py-4 rounded-xl transition-colors duration-200"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ RELATED PAGES â”€â”€â”€ */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Also in Admissions</p>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:shadow-sm transition-all"
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
