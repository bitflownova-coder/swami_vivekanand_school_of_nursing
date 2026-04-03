import Image from "next/image";
import Link from "next/link";
import {
  Microscope, BookOpen, Wifi, Shield, Utensils, HeartPulse,
  Baby, Users, Building2, ChevronRight, CheckCircle,
} from "lucide-react";

export default function LaboratoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative bg-slate-900 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/photos/foundation-of-nursing-lab/1.jpg" alt="Nursing Laboratories" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            â† Back to Facilities
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.25em]">Simulated Clinical Training</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl text-white mb-4">Specialized Nursing<br />Laboratories</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Six fully-equipped labs mirror real clinical environments, giving students hands-on skill practice before hospital rotations begin.
          </p>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/40 mt-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/facilities" className="hover:text-white transition-colors">Facilities</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">Laboratories</span>
          </div>
        </div>
      </section>

      {/* LAB CARDS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Utensils, color: "bg-red-50", iconColor: "text-red-600", accent: "border-red-100 hover:border-red-300",
              badge: "bg-red-100 text-red-700", title: "Nutrition Laboratory",
              desc: "Diet planning, food composition analysis, and therapeutic nutrition training.",
              points: ["Diet planning equipment", "Food composition tools", "Cooking demonstration area", "Nutritional assessment"],
            },
            {
              icon: HeartPulse, color: "bg-blue-50", iconColor: "text-blue-700", accent: "border-blue-100 hover:border-blue-300",
              badge: "bg-blue-100 text-blue-700", title: "Fundamentals of Nursing Lab",
              desc: "Core nursing skills — vitals, injections, wound care — on advanced simulation models.",
              points: ["Patient care mannequins", "Vital signs monitors", "Injection practice models", "Wound care simulation"],
            },
            {
              icon: Baby, color: "bg-green-50", iconColor: "text-green-700", accent: "border-green-100 hover:border-green-300",
              badge: "bg-green-100 text-green-700", title: "Child Health Nursing Lab",
              desc: "Pediatric care simulation from neonates to adolescents.",
              points: ["Pediatric mannequins (all ages)", "Growth monitoring equipment", "Immunization training kits", "Pediatric emergency gear"],
            },
            {
              icon: Microscope, color: "bg-purple-50", iconColor: "text-purple-700", accent: "border-purple-100 hover:border-purple-300",
              badge: "bg-purple-100 text-purple-700", title: "Medical-Surgical Nursing Lab",
              desc: "Surgical procedure simulation and advanced patient care scenarios.",
              points: ["Surgical simulation models", "Advanced patient simulators", "Catheterization models", "Emergency response kit"],
            },
            {
              icon: Users, color: "bg-pink-50", iconColor: "text-pink-700", accent: "border-pink-100 hover:border-pink-300",
              badge: "bg-pink-100 text-pink-700", title: "Maternity Nursing Lab",
              desc: "Obstetric and neonatal care training in a realistic maternal setting.",
              points: ["Delivery simulation models", "Antenatal care equipment", "Neonatal care simulators", "Breastfeeding training aids"],
            },
            {
              icon: Building2, color: "bg-orange-50", iconColor: "text-orange-700", accent: "border-orange-100 hover:border-orange-300",
              badge: "bg-orange-100 text-orange-700", title: "Community Health Lab",
              desc: "Public health, epidemiology, and home-visit simulation training.",
              points: ["Epidemiology study aids", "Health education materials", "Disease prevention kits", "Home visit simulation"],
            },
          ].map(({ icon: Icon, color, iconColor, accent, title, desc, points }) => (
            <div key={title} className={`bg-white border ${accent} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col`}>
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{desc}</p>
              <div className="space-y-1.5">
                {points.map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <CheckCircle className={`h-3.5 w-3.5 ${iconColor} flex-shrink-0`} />
                    <span className="text-sm text-slate-600">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Photo showcase */}
        <div className="mt-16 space-y-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-blue-700" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Foundation of Nursing</span>
            </div>
            <h3 className="font-playfair font-bold text-2xl text-slate-900 mb-5">Foundation of Nursing Lab</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { src: "/photos/foundation-of-nursing-lab/1.jpg", label: "Nursing Lab — Equipment Setup" },
                { src: "/photos/foundation-of-nursing-lab/2.jpg", label: "Nursing Lab — Training Area" },
              ].map(({ src, label }) => (
                <div key={src} className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "16/9" }}>
                  <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" loading="lazy" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/70 to-transparent px-4 py-3">
                    <span className="text-white text-sm font-semibold">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-blue-700" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Pre-Clinical Training</span>
            </div>
            <h3 className="font-playfair font-bold text-2xl text-slate-900 mb-5">Pre-Clinical Laboratory</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { src: "/photos/pre-clinical-lab/1.jpg", label: "Pre-Clinical Lab" },
                { src: "/photos/pre-clinical-lab/2.jpg", label: "Clinical Skills Practice" },
                { src: "/photos/pre-clinical-lab/3.jpg", label: "Clinical Simulation" },
              ].map(({ src, label }) => (
                <div key={src} className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "4/3" }}>
                  <Image src={src} alt={label} fill className="object-cover" sizes="33vw" loading="lazy" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/70 to-transparent px-4 py-3">
                    <span className="text-white text-sm font-semibold">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-blue-700" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">GNM Clinical Training</span>
            </div>
            <h3 className="font-playfair font-bold text-2xl text-slate-900 mb-5">GNM Practical Posting</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative rounded-xl overflow-hidden shadow" style={{ aspectRatio: "1/1" }}>
                  <Image src={`/photos/gnm-practical-posting/${i}.jpg`} alt={`GNM Practical Training ${i}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="16vw" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lab standards */}
        <div className="mt-12 bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8">
          <h3 className="font-bold text-slate-900 text-center mb-6">Lab Standards &amp; Quality</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Microscope, label: "Hospital-Grade Equipment", sub: "Instruments matched to current hospital standards" },
              { icon: Shield, label: "Safety Protocols", sub: "Strict hygiene and safety guidelines enforced" },
              { icon: BookOpen, label: "Learning Resources", sub: "Charts, anatomical models, and procedure manuals" },
              { icon: Wifi, label: "Digital Integration", sub: "Smart displays and demonstration video screens" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{label}</div>
                  <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
