import Image from "next/image";
import Link from "next/link";
import { Utensils, Flame, BookOpen, Users, ChevronRight, CheckCircle, Apple, FlaskConical } from "lucide-react";
import { PhotoGallery } from "@/components/photo-gallery";

const photos = [
  { src: "/photos/nutrition-lab/1.jpg", alt: "Nutrition Laboratory – kitchen setup with cooking equipment and utensils" },
  { src: "/photos/nutrition-lab/2.jpg", alt: "Nutrition Laboratory – cooking station and educational charts" },
];

export default function NutritionLabPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0c1f35] pt-10 pb-20 overflow-hidden">
        {/* background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #ef4444 0%, transparent 60%), radial-gradient(circle at 80% 20%, #dc2626 0%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom right, #0c1f35 60%, #1e3a5f)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors">
            &larr; Back to Facilities
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-red-400" />
            <span className="text-red-400 text-xs font-bold uppercase tracking-[0.3em]">Clinical Nutrition Training</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h1 className="font-playfair font-bold text-5xl sm:text-6xl text-white leading-tight mb-4">
                Nutrition<br />
                <span className="text-red-400">Laboratory</span>
              </h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                A dedicated space for diet planning, food composition analysis, and therapeutic
                nutrition training — essential skills for holistic patient care.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-6 lg:flex-col lg:gap-4 lg:text-right shrink-0">
              {[
                { value: "Full", label: "Kitchen Setup" },
                { value: "Diet", label: "Planning Tools" },
                { value: "Hands-on", label: "Training" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-red-400">{value}</div>
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
            <span className="text-white/60">Nutrition Laboratory</span>
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
                <div className="w-6 h-px bg-red-600" />
                <span className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">Infrastructure</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Equipped for Nutrition &amp; Dietetics Training</h2>
            </div>

            {[
              { icon: Flame,         title: "Cooking Station",         desc: "Gas burners, cooking utensils, and equipment for food preparation demonstrations." },
              { icon: Apple,         title: "Diet Planning Tools",     desc: "Charts, models, and resources for therapeutic diet planning and calorie calculation." },
              { icon: FlaskConical,  title: "Food Composition Lab",    desc: "Equipment for analyzing food groups, nutrients, and preparing balanced meal plans." },
              { icon: BookOpen,      title: "Educational Charts",      desc: "Visual aids covering pregnancy nutrition, hydrocephalus, and balanced diet planning." },
              { icon: Utensils,      title: "Kitchen Equipment",       desc: "Full kitchen setup with utensils, containers, and serving ware for practical sessions." },
              { icon: Users,         title: "Supervised Practicals",   desc: "Faculty-guided cooking and diet preparation sessions with hands-on participation." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-red-100 hover:bg-red-50/30 transition-all group">
                <div className="w-10 h-10 bg-red-600/10 group-hover:bg-red-600 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="h-5 w-5 text-red-600 group-hover:text-white transition-colors" />
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
              <Image src="/photos/nutrition-lab/1.jpg" alt="Nutrition lab kitchen setup" fill className="object-cover" sizes="50vw" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white text-sm font-semibold drop-shadow">Hands-on Nutrition Training</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-xl overflow-hidden bg-slate-100 shadow" style={{ aspectRatio: "4/3" }}>
                <Image src="/photos/nutrition-lab/1.jpg" alt="Nutrition lab kitchen setup" fill className="object-cover" sizes="25vw" loading="lazy" />
              </div>
              <div className="relative rounded-xl overflow-hidden bg-slate-100 shadow" style={{ aspectRatio: "4/3" }}>
                <Image src="/photos/nutrition-lab/2.jpg" alt="Nutrition lab cooking station" fill className="object-cover" sizes="25vw" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ────────────────────────────────────────────── */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-red-600" />
          <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Gallery</h2>
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-slate-400 text-xs">{photos.length} photos • click to enlarge</span>
        </div>
        <PhotoGallery columns={2} aspect="4/3" photos={photos} />
      </section>

      {/* ── ALSO EXPLORE ─────────────────────────────────────────────── */}
      <section className="py-10 border-t border-slate-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-4">Also explore</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/facilities/computer-lab" className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm hover:underline">
            Computer Laboratory &rarr;
          </Link>
          <Link href="/facilities/library" className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm hover:underline">
            Library &amp; Study Areas &rarr;
          </Link>
          <Link href="/facilities/classrooms" className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm hover:underline">
            Classrooms &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
