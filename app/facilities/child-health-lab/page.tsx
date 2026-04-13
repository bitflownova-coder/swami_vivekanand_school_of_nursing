import Image from "next/image";
import Link from "next/link";
import { Baby, Heart, Activity, BookOpen, ChevronRight, CheckCircle, Shield, Users } from "lucide-react";
import { PhotoGallery } from "@/components/photo-gallery";

const photos = [
  { src: "/photos/child-health-lab/3.jpg", alt: "Child Health Nursing Lab – students with children during community child health visit" },
];

export default function ChildHealthLabPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0c1f35] pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #22c55e 0%, transparent 60%), radial-gradient(circle at 80% 20%, #16a34a 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom right, #0c1f35 60%, #1a3a2a)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors">
            &larr; Back to Facilities
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-green-400" />
            <span className="text-green-400 text-xs font-bold uppercase tracking-[0.3em]">Pediatric Nursing Training</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h1 className="font-playfair font-bold text-5xl sm:text-6xl text-white leading-tight mb-4">
                Child Health<br />
                <span className="text-green-400">Nursing Lab</span>
              </h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                Comprehensive pediatric care simulation — from newborn assessment to adolescent
                health — preparing nurses for real-world child health scenarios.
              </p>
            </div>
            <div className="flex gap-6 lg:flex-col lg:gap-4 lg:text-right shrink-0">
              {[
                { value: "All Ages", label: "Pediatric Care" },
                { value: "Hands-on", label: "Simulation" },
                { value: "Field", label: "Visits Included" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-green-400">{value}</div>
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
            <span className="text-white/60">Child Health Nursing Lab</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES + PHOTO ─────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Feature cards */}
          <div className="space-y-4">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-green-600" />
                <span className="text-green-600 text-xs font-bold uppercase tracking-[0.2em]">Infrastructure</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Equipped for Pediatric Care Training</h2>
            </div>

            {[
              { icon: Baby, title: "Pediatric Mannequins", sub: "Full range from neonates to adolescents for clinical skill practice", color: "bg-green-50", iconColor: "text-green-700" },
              { icon: Activity, title: "Growth Monitoring", sub: "Anthropometric tools for height, weight, and developmental assessment", color: "bg-blue-50", iconColor: "text-blue-700" },
              { icon: Shield, title: "Immunization Training", sub: "Safe injection models and vaccine schedule charts for student practice", color: "bg-purple-50", iconColor: "text-purple-700" },
              { icon: Heart, title: "Pediatric Emergency Gear", sub: "Resuscitation models and emergency response kits for acute scenarios", color: "bg-red-50", iconColor: "text-red-600" },
              { icon: Users, title: "Community Health Visits", sub: "Structured field visits to child care centres and schools", color: "bg-orange-50", iconColor: "text-orange-700" },
              { icon: BookOpen, title: "Learning Resources", sub: "Charts, anatomical models, and child development reference guides", color: "bg-teal-50", iconColor: "text-teal-700" },
            ].map(({ icon: Icon, title, sub, color, iconColor }) => (
              <div key={title} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-green-200 hover:shadow-sm transition-all">
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

          {/* First photo large */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/photos/child-health-lab/3.jpg"
                alt="Child Health Nursing Lab – Students with children during community child health visit"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
                <span className="text-white font-semibold text-sm">Community Child Health Visit</span>
              </div>
            </div>

            {/* What students learn */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">What Students Learn</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Neonatal care & assessment",
                  "Pediatric vital signs",
                  "Immunization techniques",
                  "Child nutrition guidance",
                  "Growth & development monitoring",
                  "Pediatric first aid & CPR",
                  "School health programs",
                  "Child-friendly communication",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-green-600 flex-shrink-0 mt-0.5" />
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
            <div className="w-8 h-0.5 bg-green-600" />
            <span className="text-green-600 text-xs font-bold uppercase tracking-[0.2em]">Gallery</span>
          </div>
          <h2 className="font-playfair font-bold text-2xl text-slate-900 mb-8">Child Health Lab in Action</h2>
          <PhotoGallery columns={3} aspect="4/3" photos={photos} />
        </div>
      </section>

      {/* ── NAVIGATION ───────────────────────────────────────────────── */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-100 pt-10 flex items-center justify-between">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-slate-500 hover:text-green-700 text-sm font-medium transition-colors group">
            <span className="group-hover:-translate-x-1 transition-transform duration-200">&larr;</span>
            Back to All Facilities
          </Link>
          <Link href="/facilities/laboratories" className="inline-flex items-center gap-2 text-slate-500 hover:text-green-700 text-sm font-medium transition-colors group">
            View All Laboratories
            <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
