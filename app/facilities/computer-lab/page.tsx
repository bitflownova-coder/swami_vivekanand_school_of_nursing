import Image from "next/image";
import Link from "next/link";
import { Monitor, Wifi, Printer, Users, ChevronRight, CheckCircle, Cpu, Globe } from "lucide-react";
import { PhotoGallery } from "@/components/photo-gallery";

const photos = [
  { src: "/photos/computer-lab/1.jpg", alt: "Computer Laboratory – workstation row" },
  { src: "/photos/computer-lab/2.jpg", alt: "Computer Laboratory – desktop workstations" },
  { src: "/photos/computer-lab/3.jpg", alt: "Students using computers in the laboratory" },
  { src: "/photos/computer-lab/4.jpg", alt: "Computer lab session with faculty at front" },
  { src: "/photos/computer-lab/5.jpg", alt: "Students working at computers – close view" },
  { src: "/photos/computer-lab/6.jpg", alt: "Students at workstations – close up" },
  { src: "/photos/computer-lab/7.jpg", alt: "Computer lab – wide room overview with students" },
  { src: "/photos/computer-lab/8.jpg", alt: "Students at workstations with faculty supervising" },
  { src: "/photos/computer-lab/9.jpg", alt: "Computer lab – full room overview with all workstations" },
  { src: "/photos/computer-lab/10.jpg", alt: "Computer lab session in progress – full room" },
  { src: "/photos/computer-lab/11.jpg", alt: "Student at workstation with faculty in background" },
];

export default function ComputerLabPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0c1f35] pt-10 pb-20 overflow-hidden">
        {/* background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 60%), radial-gradient(circle at 80% 20%, #1d4ed8 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom right, #0c1f35 60%, #1e3a5f)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors">
            &larr; Back to Facilities
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">Digital Learning Centre</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h1 className="font-playfair font-bold text-5xl sm:text-6xl text-white leading-tight mb-4">
                Computer<br />
                <span className="text-blue-400">Laboratory</span>
              </h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                State-of-the-art digital infrastructure where nursing students develop IT competency,
                access e-learning platforms, and prepare for modern healthcare documentation.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-6 lg:flex-col lg:gap-4 lg:text-right shrink-0">
              {[
                { value: "20+", label: "Workstations" },
                { value: "24/7", label: "Internet Access" },
                { value: "1", label: "Printer & Scanner" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-blue-400">{value}</div>
                  <div className="text-slate-400 text-xs uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/30 mt-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/facilities" className="hover:text-white transition-colors">Facilities</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/60">Computer Laboratory</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES + FIRST PHOTO ───────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: feature cards */}
          <div className="space-y-4">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-blue-700" />
                <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Infrastructure</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Equipped for Modern Nursing Education</h2>
            </div>

            {[
              { icon: Cpu,     title: "Modern Computers",      desc: "Desktop workstations with updated OS, MS Office, and health informatics software." },
              { icon: Globe,   title: "Broadband Internet",    desc: "High-speed internet enabling access to PubMed, e-journals, and digital textbooks." },
              { icon: Monitor, title: "E-Learning Platforms",  desc: "Access to NIOS, IGNOU portals, and simulation-based nursing training tools." },
              { icon: Wifi,    title: "Online Exam Practice",  desc: "Dedicated preparation tools for State Board and AIIMS nursing entrance exams." },
              { icon: Printer, title: "Print & Scan Centre",   desc: "On-site printing and scanning for assignments, projects, and clinical records." },
              { icon: Users,   title: "Supervised Sessions",   desc: "Faculty-guided lab hours with technical support from dedicated staff." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                <div className="w-10 h-10 bg-blue-700/10 group-hover:bg-blue-700 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="h-5 w-5 text-blue-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm mb-0.5">{title}</div>
                  <div className="text-slate-500 text-xs leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: stacked photos */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 shadow-lg" style={{ aspectRatio: "4/3" }}>
              <Image src="/photos/computer-lab/3.jpg" alt="Students in computer lab session" fill className="object-cover" sizes="50vw" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white text-sm font-semibold drop-shadow">Hands-on IT Training</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-xl overflow-hidden bg-slate-100 shadow" style={{ aspectRatio: "4/3" }}>
                <Image src="/photos/computer-lab/1.jpg" alt="Full computer lab overview" fill className="object-cover" sizes="25vw" loading="lazy" />
              </div>
              <div className="relative rounded-xl overflow-hidden bg-slate-100 shadow" style={{ aspectRatio: "4/3" }}>
                <Image src="/photos/computer-lab/4.jpg" alt="Faculty supervising session" fill className="object-cover" sizes="25vw" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ────────────────────────────────────────────── */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-blue-700" />
          <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Gallery</h2>
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-slate-400 text-xs">{photos.length} photos • click to enlarge</span>
        </div>
        <PhotoGallery columns={3} aspect="4/3" photos={photos} />
      </section>

      {/* ── ALSO EXPLORE ─────────────────────────────────────────────── */}
      <section className="py-10 border-t border-slate-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-4">Also explore</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/facilities/library" className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:underline">
            Library &amp; Study Areas &rarr;
          </Link>
          <Link href="/facilities/classrooms" className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:underline">
            Classrooms &rarr;
          </Link>
          <Link href="/facilities/laboratories" className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:underline">
            Nursing Laboratories &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
