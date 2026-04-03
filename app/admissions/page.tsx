import Image from "next/image";
import {
  CheckCircle,
  Clock,
  FileText,
  Users,
  IndianRupee,
  Calendar,
  GraduationCap,
  MapPin,
  ChevronRight,
  Download,
  Award,
  HeartPulse,
  BookOpen,
  Shield,
  ClipboardList,
  AlertCircle,
} from "lucide-react";

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* â”€â”€â”€ HERO â”€â”€â”€ */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-10 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-l from-blue-400 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">GNM Admissions — Batch 2026–27</span>
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Open</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Begin Your Nursing Career
            </h1>
            <p className="text-xl opacity-80 leading-relaxed text-slate-300 mb-10">
              Join Swami Vivekanand School of Nursing for the GNM programme — INC-approved, 
              hospital-integrated training that transforms students into confident, 
              compassionate healthcare professionals.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { value: '60', label: 'Seats Available' },
              { value: '3 Years', label: 'Full-Time Programme' },
              { value: 'INC', label: 'Approved' },
              { value: '₹55,000', label: 'Annual Fees (2024–25)' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl min-w-[130px]">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-slate-300 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/admissions/apply" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200">
              Apply Now
              <ChevronRight className="h-5 w-5" />
            </a>
            <a
              href="https://drive.google.com/file/d/1MxykBvnYmWZQ3cqvCMbHLo9IFS6NxMjC/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              Download Brochure
            </a>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ QUICK FACTS STRIP â”€â”€â”€ */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y-0 md:divide-x divide-slate-100">
            {[
              { icon: GraduationCap, value: 'GNM',          unit: 'Programme',         label: 'General Nursing & Midwifery' },
              { icon: Clock,         value: '3',             unit: 'Years',             label: 'Full-Time Duration' },
              { icon: Users,         value: '60',            unit: 'Seats',             label: 'Per Batch Intake' },
              { icon: MapPin,        value: 'Sambhajinagar', unit: 'Maharashtra',       label: 'Chhatrapati Sambhajinagar' },
            ].map(({ icon: Icon, value, unit, label }) => (
              <div key={label} className="flex flex-col items-center text-center px-2 md:px-4 first:md:pl-0 last:md:pr-0">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-blue-700" />
                </div>
                <div className="font-playfair text-2xl font-bold text-slate-900">{value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">{unit}</div>
                <div className="text-sm text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ CAMPUS SNAPSHOT â”€â”€â”€ */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700"></div>
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Our Campus</span>
              <div className="w-8 h-0.5 bg-blue-700"></div>
            </div>
            <h2 className="font-playfair font-bold text-3xl text-slate-900 mb-3">A Campus Built for Nursing Excellence</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Take a look at our purpose-built facilities — classrooms, labs, and the institute building.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/photos/institute-building-front-view/1.jpg", label: "Institute Building" },
              { src: "/photos/classrooms/1.jpg",                    label: "Classrooms" },
              { src: "/photos/foundation-of-nursing-lab/1.jpg",    label: "Nursing Lab" },
              { src: "/photos/gnm-practical-posting/1.jpg",        label: "Clinical Posting" },
            ].map(({ src, label }) => (
              <div key={src} className="relative rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow group" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/70 to-transparent px-3 py-2">
                  <span className="text-white text-xs font-semibold">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ WHY CHOOSE US â”€â”€â”€ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700"></div>
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Why Choose Us</span>
              <div className="w-8 h-0.5 bg-blue-700"></div>
            </div>
            <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-4">A Programme Built for Excellence</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Every aspect of our GNM programme is designed to produce nurses who are 
              clinically competent, ethically grounded, and career-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                icon: Award,
                title: 'INC-Approved Curriculum',
                body: 'Our GNM programme is fully approved by the Indian Nursing Council and the State Nursing Registration Council, ensuring your qualification is nationally and internationally recognized.',
                points: ['Nationally recognized diploma', 'State & INC compliant', 'Eligible for registration', 'Government hospital jobs'],
              },
              {
                icon: HeartPulse,
                title: 'Hospital-Based Clinical Training',
                body: 'Students receive 2,000+ hours of supervised clinical practice across 10+ medical specialities at affiliated multi-specialty hospitals in the region.',
                points: ['2000+ clinical hours', 'Multi-speciality rotations', 'ICU & OT exposure', 'Direct patient care'],
              },
              {
                icon: BookOpen,
                title: 'Experienced Faculty & Support',
                body: 'Our team of qualified nurse educators, clinical coordinators, and medical faculty ensure personalized mentoring, exam readiness, and career guidance throughout the programme.',
                points: ['Qualified nurse educators', 'Simulation lab training', 'Exam preparation support', 'Placement assistance'],
              },
            ].map(({ icon: Icon, title, body, points }) => (
              <div key={title} className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
                <div className="p-8">
                  <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-700 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-blue-700 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{body}</p>
                  <div className="space-y-2">
                    {points.map((p) => (
                      <div key={p} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-700 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ ELIGIBILITY CRITERIA â”€â”€â”€ */}
      <section className="py-20 bg-white" id="eligibility">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Sticky heading */}
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
              <div className="bg-blue-700 text-white rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="h-5 w-5 text-blue-200" />
                  <span className="font-bold">Important Note</span>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Reservation is applicable only within the INC-sanctioned intake of 60 seats — 
                  not above the sanctioned strength. All reservations are as per State Govt. norms.
                </p>
              </div>
            </div>

            {/* Criteria panels */}
            <div className="lg:col-span-3 space-y-6">

              {/* 1 - Education */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-900 text-white px-5 sm:px-7 py-4 flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <span className="font-bold text-sm sm:text-base">Minimum Education Eligibility</span>
                </div>
                <div className="p-5 sm:p-7 space-y-4">
                  {[
                    { label: 'Standard Path', text: '10+2 with English and minimum 40% marks in the qualifying examination and English individually, from any recognized board. Candidates from State Open School or NIOS are also eligible. Science is preferable.' },
                    { label: 'Vocational ANM', text: '10+2 with English and 40% marks in Vocational ANM course from a school recognized by the Indian Nursing Council.' },
                    { label: 'Health Care Science', text: '10+2 with English and 40% marks in Vocational Stream – Health Care Science from a recognized CBSE / State / Central Board.' },
                    { label: 'Registered ANM', text: 'Registered ANM with pass marks is eligible for direct admission.' },
                    { label: 'Foreign Nationals', text: 'Entry qualification equivalency (12th standard) to be obtained from the Association of Indian Universities, New Delhi.', note: true },
                  ].map(({ label, text, note }) => (
                    <div key={label} className={`flex items-start gap-4 ${note ? 'opacity-70' : ''}`}>
                      <span className={`text-xs font-bold px-2 py-1 rounded mt-0.5 flex-shrink-0 ${note ? 'bg-slate-100 text-slate-500' : 'bg-blue-50 text-blue-700'}`}>{label}</span>
                      <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2 - Reservation */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-900 text-white px-5 sm:px-7 py-4 flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <span className="font-bold text-sm sm:text-base">Reservation Policy</span>
                </div>
                <div className="p-5 sm:p-7 space-y-4">
                  {[
                    { label: 'Disability', pct: '3%', text: 'For candidates with locomotor disability of 40–50% of the lower extremity. Verified by a committee comprising a state-authorized medical officer and a nursing expert.' },
                    { label: 'SC / ST', pct: '5%', text: '5% relaxation in total marks for Scheduled Caste and Scheduled Tribe candidates.' },
                    { label: 'State Norms', pct: 'Varies', text: 'Any other reservations as applicable per State Government norms.' },
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

              {/* 3 - Other */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-900 text-white px-5 sm:px-7 py-4 flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <span className="font-bold text-sm sm:text-base">Other Requirements</span>
                </div>
                <div className="p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Admissions Cycle', value: 'Once per academic year' },
                    { label: 'Medical Fitness', value: 'Students must be medically fit' },
                    { label: 'Minimum Age', value: '17 years (by 31st Dec of that year)' },
                    { label: 'Maximum Age', value: '35 years · No bar for ANM / LHV' },
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

      {/* â”€â”€â”€ DOCUMENTS REQUIRED â”€â”€â”€ */}
      <section className="py-20 bg-slate-50" id="documents">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700"></div>
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Documents</span>
              <div className="w-8 h-0.5 bg-blue-700"></div>
            </div>
            <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-4">Documents Required</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Keep the following documents ready before beginning your application.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { no: '01', doc: '10th Marksheet & Certificate' },
              { no: '02', doc: '12th Marksheet & Certificate' },
              { no: '03', doc: 'Transfer / School Leaving Certificate' },
              { no: '04', doc: 'Medical Fitness Certificate' },
              { no: '05', doc: 'Caste / Category Certificate (if applicable)' },
              { no: '06', doc: 'Disability Certificate (if applicable)' },
              { no: '07', doc: 'ANM Registration Certificate (if applicable)' },
              { no: '08', doc: 'Passport-size Photographs (4 copies)' },
              { no: '09', doc: 'Aadhar Card / Government ID Proof' },
            ].map(({ no, doc }) => (
              <div key={no} className="bg-white border border-slate-100 rounded-xl p-5 flex items-center gap-4 hover:border-blue-200 hover:shadow-sm transition-all">
                <span className="text-2xl font-playfair font-bold text-blue-700/30 flex-shrink-0 w-10">{no}</span>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-700 flex-shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">{doc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ FEE STRUCTURE â”€â”€â”€ */}
      <section className="py-20 bg-white" id="fees">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700"></div>
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Fee Structure</span>
              <div className="w-8 h-0.5 bg-blue-700"></div>
            </div>
            <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-4">Approved Fee Structure</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Fees approved by the Nursing Diploma Course Shikshan Shulka Samiti.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
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

              {/* Table */}
              <div className="divide-y divide-slate-100">
                {/* Column headers */}
                <div className="hidden sm:grid sm:grid-cols-[3rem_1fr_5rem_7rem_7rem_7rem_7rem] gap-x-4 px-6 py-3 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <span>Sr. No.</span>
                  <span>Course</span>
                  <span>Year</span>
                  <span>Fee Type</span>
                  <span className="text-right">Development</span>
                  <span className="text-right">Tuition</span>
                  <span className="text-right">Total</span>
                </div>

                {/* Row 1 — 2023-24 */}
                {[
                  { sr: 1, year: '2023-24', dev: '₹4,545', tuition: '₹45,455', total: '₹50,000' },
                  { sr: 2, year: '2024-25', dev: '₹5,225', tuition: '₹49,775', total: '₹55,000' },
                ].map(({ sr, year, dev, tuition, total }) => (
                  <div key={sr} className="sm:grid sm:grid-cols-[3rem_1fr_5rem_7rem_7rem_7rem_7rem] gap-x-4 px-6 py-5 hover:bg-slate-50 transition-colors">
                    {/* Mobile */}
                    <div className="sm:hidden space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-blue-700 text-lg">GNM</span>
                          <span className="text-slate-500 text-sm">{year}</span>
                          <span className="bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full text-xs font-bold">Ad-hoc fee</span>
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
                      <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold">Ad-hoc fee</span>
                    </span>
                    <span className="hidden sm:block text-right text-slate-700 self-center">{dev}</span>
                    <span className="hidden sm:block text-right text-slate-700 self-center">{tuition}</span>
                    <span className="hidden sm:block text-right self-center">
                      <span className="text-lg font-bold text-blue-700">{total}</span>
                    </span>
                  </div>
                ))}
              </div>

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
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ HOW TO APPLY + KEY DATES â”€â”€â”€ */}
      <section className="py-20 bg-slate-50" id="apply">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* How to Apply — 2 cols */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-blue-700"></div>
                <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Application Process</span>
              </div>
              <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-slate-900 mb-8 sm:mb-10">How to Apply</h2>
              <div className="space-y-5">
                {[
                  { step: '01', title: 'Fill Online Application',   desc: 'Complete the online admission form with your personal, academic, and contact details.', icon: ClipboardList },
                  { step: '02', title: 'Upload Documents',           desc: 'Upload scanned copies of all required documents — marksheets, certificates, ID, and photographs.', icon: FileText },
                  { step: '03', title: 'Document Verification',      desc: 'The admissions committee will verify your submitted documents and academic eligibility.', icon: CheckCircle },
                  { step: '04', title: 'Pay Admission Fee',          desc: 'On selection, pay the admission fee online to confirm and secure your seat for the batch.', icon: IndianRupee },
                ].map(({ step, title, desc, icon: Icon }) => (
                  <div key={step} className="flex gap-4 sm:gap-5 bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 hover:border-blue-200 hover:shadow-sm transition-all group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-700 group-hover:bg-blue-800 text-white rounded-xl flex items-center justify-center font-bold transition-colors">
                        {step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="h-4 w-4 text-blue-700" />
                        <h4 className="font-bold text-slate-900">{title}</h4>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Dates — 1 col */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-blue-700"></div>
                <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Timeline</span>
              </div>
              <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-slate-900 mb-8 sm:mb-10">Key Dates</h2>
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-8">
                <div className="relative border-l-2 border-blue-700 ml-3 space-y-8 py-2">
                  {[
                    { label: 'Application Opens', date: 'April 1, 2026',  color: 'bg-green-400',  ring: 'ring-slate-900' },
                    { label: 'Last Date to Apply', date: 'June 30, 2026', color: 'bg-yellow-400', ring: 'ring-slate-900' },
                    { label: 'Merit List / Interview', date: 'July 1–15, 2026', color: 'bg-orange-400', ring: 'ring-slate-900' },
                    { label: 'Session Begins',    date: 'August 1, 2026', color: 'bg-white',      ring: 'ring-slate-900' },
                  ].map((item) => (
                    <div key={item.label} className="relative pl-8">
                      <div className={`absolute -left-[5px] top-1.5 h-3 w-3 rounded-full ${item.color} ring-4 ${item.ring}`}></div>
                      <p className="text-blue-300 text-xs uppercase tracking-wider font-bold mb-0.5">{item.label}</p>
                      <p className="text-xl font-bold">{item.date}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-start gap-3 text-sm text-slate-300">
                    <Calendar className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p>Dates are indicative and may be revised. Check official notice board or contact the admissions office for updates.</p>
                  </div>
                </div>
              </div>

              {/* Contact card */}
              <div className="mt-5 bg-white border border-slate-200 rounded-2xl p-6">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-700" />
                  Admissions Office
                </h4>
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-blue-700 mt-0.5 flex-shrink-0" />
                    Chhatrapati Sambhajinagar, Maharashtra
                  </p>
                  <p className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-blue-700 mt-0.5 flex-shrink-0" />
                    Mon–Sat, 9:00 AM – 5:00 PM
                  </p>
                </div>
                <a href="/contact" className="mt-4 inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:underline">
                  Contact Us <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* â”€â”€â”€ FORMS & DOWNLOADS â”€â”€â”€ */}
      <section className="py-20 bg-white border-t border-slate-100" id="forms">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700"></div>
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Admission Forms</span>
              <div className="w-8 h-0.5 bg-blue-700"></div>
            </div>
            <h2 className="font-playfair font-bold text-4xl text-slate-900 mb-4">Apply &amp; Download Forms</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Submit your application online or download the blank forms to fill manually and submit at the college.
            </p>
          </div>

          {/* Two main options — Online vs Offline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">

            {/* Online */}
            <div className="relative border-2 border-blue-700 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white">
              <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Recommended</span>
              </div>
              <div className="p-8">
                <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <ClipboardList className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">Online Application</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Fill your GNM admission form digitally — save your progress, upload a photo, and submit directly online.
                </p>
                <ul className="space-y-2 mb-8">
                  {["Instant submission", "Upload passport photo", "Auto-calculated fields", "Digital declaration"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="h-4 w-4 text-blue-700 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/admissions/apply"
                  className="inline-flex items-center gap-2 w-full justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  Fill Online Form
                  <ChevronRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Offline */}
            <div className="border-2 border-slate-200 rounded-2xl overflow-hidden group hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white">
              <div className="p-8">
                <div className="w-14 h-14 bg-slate-100 group-hover:bg-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-all">
                  <Download className="h-7 w-7 text-slate-600 group-hover:text-blue-700 transition-colors" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">Offline Application</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Download the blank admission form, print it on A4 paper, fill manually with a pen, and submit at the college office.
                </p>
                <ul className="space-y-2 mb-8">
                  {["Print-ready A4 format", "Fill with pen", "Submit at college office", "Attach photos & documents"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/admissions/apply?mode=offline"
                  className="inline-flex items-center gap-2 w-full justify-center border-2 border-slate-300 hover:border-blue-700 hover:text-blue-700 text-slate-700 font-bold py-3 px-6 rounded-xl transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-5 w-5" />
                  Download Blank Form
                </a>
              </div>
            </div>

          </div>

          {/* Additional downloadable documents */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-0.5 bg-slate-300"></div>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Additional Documents</span>
              <div className="w-6 h-0.5 bg-slate-300"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Pratigyapatra */}
              <a
                href="/admissions/pratigyapatra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl p-5 hover:bg-amber-100 hover:border-amber-400 transition-all group"
              >
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-900 mb-0.5">à¤ªà¥à¤°à¤¤à¤¿à¤œà¥à¤žà¤¾à¤ªà¤¤à¥à¤° <span className="font-normal text-slate-500">(à¤¹à¤®à¥€à¤ªà¤¤à¥à¤°)</span></p>
                  <p className="text-xs text-slate-500 leading-relaxed">₹100 Non-Judicial Stamp Paper undertaking · Print &amp; notarise</p>
                  <span className="inline-flex items-center gap-1 text-amber-700 text-xs font-bold mt-2">
                    <Download className="h-3 w-3" /> Print / Download
                  </span>
                </div>
              </a>

              {/* Documents Checklist */}
              <a
                href="/admissions/documents"
                className="flex items-start gap-4 bg-blue-50 border border-blue-200 rounded-xl p-5 hover:bg-blue-100 hover:border-blue-400 transition-all group"
              >
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <ClipboardList className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-900 mb-0.5">Documents Checklist</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Full list of 18 required documents for GNM admission</p>
                  <span className="inline-flex items-center gap-1 text-blue-700 text-xs font-bold mt-2">
                    <ChevronRight className="h-3 w-3" /> View Checklist
                  </span>
                </div>
              </a>

              {/* Eligibility */}
              <a
                href="/admissions/eligibility"
                className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-xl p-5 hover:bg-green-100 hover:border-green-400 transition-all group"
              >
                <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-900 mb-0.5">Eligibility Criteria</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Age, qualification, and reservation requirements for GNM</p>
                  <span className="inline-flex items-center gap-1 text-green-700 text-xs font-bold mt-2">
                    <ChevronRight className="h-3 w-3" /> Check Eligibility
                  </span>
                </div>
              </a>

            </div>

            {/* Note */}
            <div className="mt-6 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <AlertCircle className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600">
                <strong>Tip:</strong> The à¤ªà¥à¤°à¤¤à¤¿à¤œà¥à¤žà¤¾à¤ªà¤¤à¥à¤° (à¤¹à¤®à¥€à¤ªà¤¤à¥à¤°) must be filled, signed, and notarised on a ₹100 Non-Judicial Stamp Paper before submission.
                Print the form, fill it with a pen, and get it notarised at your nearest notary office.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ CTA â”€â”€â”€ */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">Limited Seats — Batch 2026–27</span>
            <div className="w-8 h-0.5 bg-blue-400"></div>
          </div>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Ready to Start Your<br />Nursing Journey?
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Don&apos;t miss your opportunity to join one of Maharashtra&apos;s premier nursing 
            institutes. Only 60 seats available — applications open April 2026.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/admissions/apply" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200">
              Begin Application
              <ChevronRight className="h-5 w-5" />
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200">
              Contact Admissions
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}


