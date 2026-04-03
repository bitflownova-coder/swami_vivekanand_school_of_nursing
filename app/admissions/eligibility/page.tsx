import Link from "next/link";
import {
  ChevronRight,
  AlertCircle,
  CheckCircle,
  FileText,
  IndianRupee,
  ClipboardList,
} from "lucide-react";

export const metadata = {
  title: "Eligibility Criteria | Admissions | Swami Vivekanand School of Nursing",
  description:
    "Check the eligibility criteria for GNM admission at Swami Vivekanand School of Nursing — education qualifications, age limits, reservation policy.",
};

const relatedLinks = [
  { label: "Overview",            href: "/admissions" },
  { label: "Documents Required",  href: "/admissions/documents",   icon: FileText },
  { label: "Fee Structure",       href: "/admissions/fees",        icon: IndianRupee },
  { label: "How to Apply",        href: "/admissions/apply",       icon: ClipboardList },
];

export default function EligibilityPage() {
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
            <span className="text-white font-semibold">Eligibility Criteria</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">GNM Admissions 2026–27</span>
          </div>
          <h1 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl mb-4 leading-tight">
            Eligibility Criteria
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Admission to the GNM programme is governed by Indian Nursing Council norms. 
            Review the academic, age, and reservation requirements before applying.
          </p>
        </div>
      </section>

      {/* â”€â”€â”€ MAIN CONTENT â”€â”€â”€ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Sticky sidebar */}
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-blue-700"></div>
                <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Eligibility</span>
              </div>
              <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-6 leading-snug">
                Admission<br />Criteria
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Admission to the GNM programme is governed by the Indian Nursing Council norms.
                Applications are accepted once per academic year for the July–June session.
              </p>
              <div className="bg-blue-700 text-white rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="h-5 w-5 text-blue-200" />
                  <span className="font-bold">Important Note</span>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Reservation is applicable only within the INC-sanctioned intake of 60 seats —
                  not above the sanctioned strength. All reservations are as per State Govt. norms.
                </p>
              </div>
              <Link
                href="/admissions/apply"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200"
              >
                Apply Now
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Criteria panels */}
            <div className="lg:col-span-3 space-y-6">

              {/* 1 — Education */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-900 text-white px-5 sm:px-7 py-4 flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <span className="font-bold text-sm sm:text-base">Minimum Education Eligibility</span>
                </div>
                <div className="p-5 sm:p-7 space-y-4">
                  {[
                    { label: "Standard Path",    text: "10+2 with English and minimum 40% marks in the qualifying examination and English individually, from any recognized board. Candidates from State Open School or NIOS are also eligible. Science is preferable." },
                    { label: "Vocational ANM",   text: "10+2 with English and 40% marks in Vocational ANM course from a school recognized by the Indian Nursing Council." },
                    { label: "Health Care Science", text: "10+2 with English and 40% marks in Vocational Stream – Health Care Science from a recognized CBSE / State / Central Board." },
                    { label: "Registered ANM",   text: "Registered ANM with pass marks is eligible for direct admission." },
                    { label: "Foreign Nationals", text: "Entry qualification equivalency (12th standard) to be obtained from the Association of Indian Universities, New Delhi.", note: true },
                  ].map(({ label, text, note }) => (
                    <div key={label} className={`flex items-start gap-4 ${note ? "opacity-70" : ""}`}>
                      <span className={`text-xs font-bold px-2 py-1 rounded mt-0.5 flex-shrink-0 ${note ? "bg-slate-100 text-slate-500" : "bg-blue-50 text-blue-700"}`}>{label}</span>
                      <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2 — Reservation */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-900 text-white px-5 sm:px-7 py-4 flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <span className="font-bold text-sm sm:text-base">Reservation Policy</span>
                </div>
                <div className="p-5 sm:p-7 space-y-4">
                  {[
                    { label: "Disability", pct: "3%",    text: "For candidates with locomotor disability of 40–50% of the lower extremity. Verified by a committee comprising a state-authorized medical officer and a nursing expert." },
                    { label: "SC / ST",   pct: "5%",    text: "5% relaxation in total marks for Scheduled Caste and Scheduled Tribe candidates." },
                    { label: "State Norms", pct: "Varies", text: "Any other reservations as applicable per State Government norms." },
                  ].map(({ label, pct, text }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-center">
                        <div className="font-playfair text-lg font-bold text-blue-700">{pct}</div>
                        <div className="text-xs text-slate-500">{label}</div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed border-l border-slate-200 pl-4">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 — Other Requirements */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-900 text-white px-5 sm:px-7 py-4 flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <span className="font-bold text-sm sm:text-base">Other Requirements</span>
                </div>
                <div className="p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Admissions Cycle", value: "Once per academic year" },
                    { label: "Medical Fitness",  value: "Students must be medically fit" },
                    { label: "Minimum Age",      value: "17 years (by 31st Dec of that year)" },
                    { label: "Maximum Age",      value: "35 years · No bar for ANM / LHV" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-4">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</div>
                      <div className="font-semibold text-slate-900 text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
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
