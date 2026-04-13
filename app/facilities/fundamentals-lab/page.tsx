import Image from "next/image";
import Link from "next/link";
import { HeartPulse, Stethoscope, BookOpen, Activity, ChevronRight, CheckCircle, Shield, Microscope } from "lucide-react";
import { PhotoGallery } from "@/components/photo-gallery";

const photos = [
  { src: "/photos/foundation-of-nursing-lab/1.jpg", alt: "Fundamentals of Nursing Lab – equipment setup and clinical simulation" },
  { src: "/photos/foundation-of-nursing-lab/2.jpg", alt: "Fundamentals of Nursing Lab – student training area" },
];

export default function FundamentalsLabPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0c1f35] pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 60%), radial-gradient(circle at 80% 20%, #1d4ed8 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom right, #0c1f35 60%, #1e3a5f)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors">
            &larr; Back to Facilities
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">Core Nursing Skills Training</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h1 className="font-playfair font-bold text-5xl sm:text-6xl text-white leading-tight mb-4">
                Fundamentals of<br />
                <span className="text-blue-400">Nursing Lab</span>
              </h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                Master core nursing procedures — vitals, injections, wound care, and patient
                hygiene — using advanced simulation models before real hospital rotations.
              </p>
            </div>
            <div className="flex gap-6 lg:flex-col lg:gap-4 lg:text-right shrink-0">
              {[
                { value: "Full", label: "Simulation Setup" },
                { value: "Core", label: "Clinical Skills" },
                { value: "Hands-on", label: "Training" },
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
            <span className="text-white/60">Fundamentals of Nursing Lab</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES + PHOTO ─────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <div className="space-y-4">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-blue-600" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em]">Infrastructure</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Equipped for Foundational Nursing Skills</h2>
            </div>

            {[
              { icon: HeartPulse, title: "Patient Care Mannequins", sub: "Full-body simulation models for bed bath, positioning, and care procedures", color: "bg-blue-50", iconColor: "text-blue-700" },
              { icon: Activity, title: "Vital Signs Monitors", sub: "BP apparatus, pulse oximeters, and thermometers for clinical measurement practice", color: "bg-green-50", iconColor: "text-green-700" },
              { icon: Stethoscope, title: "Injection Practice Models", sub: "Safe injection trainers for IM, IV, SC, and ID technique practice", color: "bg-purple-50", iconColor: "text-purple-700" },
              { icon: Shield, title: "Wound Care Simulation", sub: "Wound pads and dressing kits for sterile technique and bandaging drills", color: "bg-orange-50", iconColor: "text-orange-700" },
              { icon: Microscope, title: "Catheterization Models", sub: "Urinary catheterization simulators for male and female practice", color: "bg-teal-50", iconColor: "text-teal-700" },
              { icon: BookOpen, title: "Reference Materials", sub: "Procedure manuals, anatomical charts, and clinical skill guides", color: "bg-slate-50", iconColor: "text-slate-700" },
            ].map(({ icon: Icon, title, sub, color, iconColor }) => (
              <div key={title} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all">
                <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{title}</div>
                  <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/photos/foundation-of-nursing-lab/1.jpg"
                alt="Fundamentals of Nursing Lab"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
                <span className="text-white font-semibold text-sm">Nursing Lab – Equipment & Simulation</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Core Skills Practiced</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Bed making & patient positioning",
                  "Vital signs measurement",
                  "Intravenous therapy",
                  "Wound care & dressing",
                  "Nasogastric tube insertion",
                  "Catheterization techniques",
                  "Medication administration",
                  "Personal care procedures",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-xs leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ─────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-blue-600" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em]">Gallery</span>
          </div>
          <h2 className="font-playfair font-bold text-2xl text-slate-900 mb-8">Fundamentals Lab in Action</h2>
          <PhotoGallery columns={2} aspect="16/9" photos={photos} />
        </div>
      </section>

      {/* ── NAVIGATION ───────────────────────────────────────────────── */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-100 pt-10 flex items-center justify-between">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-700 text-sm font-medium transition-colors group">
            <span className="group-hover:-translate-x-1 transition-transform duration-200">&larr;</span>
            Back to All Facilities
          </Link>
          <Link href="/facilities/laboratories" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-700 text-sm font-medium transition-colors group">
            View All Laboratories
            <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
