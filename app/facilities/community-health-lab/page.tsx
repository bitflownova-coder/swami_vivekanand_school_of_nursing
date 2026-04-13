import Image from "next/image";
import Link from "next/link";
import { Building2, Users, BookOpen, Activity, ChevronRight, CheckCircle, Shield, Heart } from "lucide-react";
import { PhotoGallery } from "@/components/photo-gallery";

const photos = [
  { src: "/photos/community-health-lab/1.jpg", alt: "Community Health Lab – public health simulation setup" },
  { src: "/photos/pre-clinical-lab/3.jpg", alt: "Community Health Lab – health education and community training" },
];

export default function CommunityHealthLabPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0c1f35] pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 60%), radial-gradient(circle at 80% 20%, #ea580c 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom right, #0c1f35 60%, #3a1f0a)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors">
            &larr; Back to Facilities
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-orange-400" />
            <span className="text-orange-400 text-xs font-bold uppercase tracking-[0.3em]">Public Health Nursing Training</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h1 className="font-playfair font-bold text-5xl sm:text-6xl text-white leading-tight mb-4">
                Community<br />
                <span className="text-orange-400">Health Lab</span>
              </h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                Public health, epidemiology, and home-visit simulation training — equipping
                nurses to deliver healthcare beyond hospital walls into communities.
              </p>
            </div>
            <div className="flex gap-6 lg:flex-col lg:gap-4 lg:text-right shrink-0">
              {[
                { value: "PHC", label: "Setup & Tools" },
                { value: "Field", label: "Visit Training" },
                { value: "Health", label: "Education" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-orange-400">{value}</div>
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
            <span className="text-white/60">Community Health Lab</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES + PHOTO ─────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <div className="space-y-4">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-px bg-orange-600" />
                <span className="text-orange-600 text-xs font-bold uppercase tracking-[0.2em]">Infrastructure</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Equipped for Community & Public Health Training</h2>
            </div>

            {[
              { icon: Building2, title: "Epidemiology Study Aids", sub: "Disease mapping tools, outbreak investigation kits, and data analysis resources", color: "bg-orange-50", iconColor: "text-orange-700" },
              { icon: Users, title: "Health Education Materials", sub: "IEC materials, flip charts, and community health teaching resources", color: "bg-blue-50", iconColor: "text-blue-700" },
              { icon: Shield, title: "Disease Prevention Kits", sub: "Vaccination training materials and preventive health programme guides", color: "bg-green-50", iconColor: "text-green-700" },
              { icon: Heart, title: "Home Visit Simulation", sub: "PHC bag, home nursing equipment, and domiciliary care procedure guides", color: "bg-pink-50", iconColor: "text-pink-700" },
              { icon: Activity, title: "Vital Statistics Tools", sub: "Birth/death register templates, health survey forms, and reporting tools", color: "bg-purple-50", iconColor: "text-purple-700" },
              { icon: BookOpen, title: "Community Health Records", sub: "Family folders, MCH records, and community health programme documentation", color: "bg-slate-50", iconColor: "text-slate-700" },
            ].map(({ icon: Icon, title, sub, color, iconColor }) => (
              <div key={title} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition-all">
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
                src="/photos/community-health-lab/1.jpg"
                alt="Community Health Lab"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
                <span className="text-white font-semibold text-sm">Community Health Lab – PHC Setup</span>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Competencies Developed</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Community health assessment",
                  "Health education sessions",
                  "Disease surveillance",
                  "School health programs",
                  "Maternal & child health",
                  "Home nursing visits",
                  "Immunization campaigns",
                  "Environmental health surveys",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-orange-600 flex-shrink-0 mt-0.5" />
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
            <div className="w-8 h-0.5 bg-orange-600" />
            <span className="text-orange-600 text-xs font-bold uppercase tracking-[0.2em]">Gallery</span>
          </div>
          <h2 className="font-playfair font-bold text-2xl text-slate-900 mb-8">Community Health Lab in Action</h2>
          <PhotoGallery columns={2} aspect="16/9" photos={photos} />
        </div>
      </section>

      {/* ── NAVIGATION ───────────────────────────────────────────────── */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-100 pt-10 flex items-center justify-between">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-700 text-sm font-medium transition-colors group">
            <span className="group-hover:-translate-x-1 transition-transform duration-200">&larr;</span>
            Back to All Facilities
          </Link>
          <Link href="/facilities/laboratories" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-700 text-sm font-medium transition-colors group">
            View All Laboratories
            <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
