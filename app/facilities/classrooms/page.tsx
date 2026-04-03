import Image from "next/image";
import Link from "next/link";
import { Building2, Monitor, Users, Layers, CheckCircle, ChevronRight } from "lucide-react";

export default function ClassroomsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative bg-slate-900 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/photos/classrooms/1.jpg" alt="Classrooms" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            â† Back to Facilities
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.25em]">Academic Spaces</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl text-white mb-4">Classrooms &amp;<br />Learning Spaces</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Well-ventilated, tech-equipped classrooms built for focused learning — from large lecture sessions to small group tutorials.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40 mt-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/facilities" className="hover:text-white transition-colors">Facilities</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">Classrooms</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Photo grid + features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-14">
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "4/3" }}>
                <Image src={`/photos/classrooms/${i}.jpg`} alt={`Classroom ${i}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="25vw" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="space-y-5">
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-white">Classroom Infrastructure</span>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { title: "Spacious & Well-Ventilated", sub: "Large classrooms ensuring a comfortable learning environment" },
                  { title: "Natural Lighting", sub: "Optimal daylight supplemented with energy-efficient LED systems" },
                  { title: "Ergonomic Furniture", sub: "Comfortable seating designed for extended academic sessions" },
                  { title: "Climate Control", sub: "Proper ventilation and temperature management year-round" },
                ].map(({ title, sub }) => (
                  <div key={title} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{title}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center">
                  <Monitor className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-white">Digital Aids &amp; Technology</span>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { title: "Smart Boards", sub: "Interactive whiteboards for multimedia and collaborative sessions" },
                  { title: "HD Projector Systems", sub: "High-definition projectors for clear video presentation" },
                  { title: "Wi-Fi Connectivity", sub: "High-speed internet access for digital learning and research" },
                  { title: "Audio Systems", sub: "Clear PA systems for effective lecturing in all hall sizes" },
                ].map(({ title, sub }) => (
                  <div key={title} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{title}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Room type cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: Layers, title: "Lecture Halls", sub: "Large-capacity halls for theoretical sessions and guest lectures", color: "bg-green-50", iconColor: "text-green-700" },
            { icon: Users, title: "Tutorial Rooms", sub: "Small group discussion rooms for interactive case-based learning", color: "bg-blue-50", iconColor: "text-blue-700" },
            { icon: Monitor, title: "Digital Classrooms", sub: "Technology-integrated rooms with smart boards and e-learning access", color: "bg-purple-50", iconColor: "text-purple-700" },
          ].map(({ icon: Icon, title, sub, color, iconColor }) => (
            <div key={title} className="bg-white border border-slate-100 rounded-2xl p-6 text-center hover:border-blue-200 hover:shadow-sm transition-all">
              <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`h-7 w-7 ${iconColor}`} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
