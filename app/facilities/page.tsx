import Image from "next/image";
import Link from "next/link";
import {
  Microscope,
  BookOpen,
  Wifi,
  Shield,
  Utensils,
  HeartPulse,
  Baby,
  Users,
  Layers,
  Monitor,
  Library,
  FlaskConical,
  ChevronRight,
  CheckCircle,
  Building2,
  BedDouble,
} from "lucide-react";

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* --- HERO --- */}
      <section className="relative bg-slate-900 pt-10 pb-0 overflow-hidden min-h-[92vh] flex flex-col">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/photos/institute-building-front-view/1.jpg"
            alt="Swami Vivekanand School of Nursing Campus"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-blue-400" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.25em]">Our Campus</span>
            </div>
            <h1 className="font-playfair font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              Campus &amp;<br />Facilities
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl">
              Purpose-built for nursing excellence — every lab, classroom, and learning space
              is designed to build clinical confidence before students enter a hospital.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#laboratories" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-blue-900/40">
                Explore Labs <ChevronRight className="h-4 w-4" />
              </a>
              <a href="#classrooms" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">
                Classrooms &amp; Library
              </a>
            </div>
          </div>
        </div>

        {/* Stat bar pinned to bottom */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {[
            { value: "6+",      label: "Specialty Labs",       sub: "Clinical simulation labs",     img: "/photos/foundation-of-nursing-lab/1.jpg" },
            { value: "3",       label: "Lecture Halls",        sub: "Large-capacity halls",          img: "/photos/classrooms/1.jpg" },
            { value: "Library", label: "& Digital Resources",  sub: "Books, e-library, journals",   img: "/photos/labrary/1.jpg" },
            { value: "60-Bed",  label: "Practice Hospital",    sub: "Affiliated training hospital", img: "/photos/gnm-practical-posting/1.jpg" },
          ].map((s) => (
            <div key={s.label} className="relative px-8 py-8 flex flex-col justify-between min-h-[180px] overflow-hidden border-r border-white/10 last:border-r-0">
              <Image src={s.img} alt={s.label} fill className="object-cover" sizes="25vw" loading="lazy" />
              <div className="absolute inset-0 bg-slate-950/70 hover:bg-slate-950/55 transition-colors duration-300" />
              <div className="relative z-10 font-playfair font-bold text-4xl sm:text-5xl text-white drop-shadow-lg">{s.value}</div>
              <div className="relative z-10 mt-3">
                <div className="font-bold text-sm text-white">{s.label}</div>
                <div className="text-xs mt-0.5 text-slate-400">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- LABS SECTION --- */}
      <section className="py-20 bg-white" id="laboratories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Simulated Clinical Training</span>
              <div className="w-8 h-0.5 bg-blue-700" />
            </div>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
              Specialized Nursing Laboratories
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Six fully-equipped labs mirror real clinical environments, giving students 
              hands-on skill practice before hospital rotations begin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Utensils,
                color: "bg-red-50",
                iconColor: "text-red-600",
                accent: "border-red-200 group-hover:border-red-400",
                badge: "bg-red-100 text-red-700",
                title: "Nutrition Laboratory",
                desc: "Diet planning, food composition analysis, and therapeutic nutrition training.",
                points: ["Diet planning equipment", "Food composition tools", "Cooking demonstration area", "Nutritional assessment"],
                href: "/facilities/nutrition-lab",
                img: "/photos/nutrition-lab/1.jpg",
              },
              {
                icon: HeartPulse,
                color: "bg-blue-50",
                iconColor: "text-blue-700",
                accent: "border-blue-200 group-hover:border-blue-400",
                badge: "bg-blue-100 text-blue-700",
                title: "Fundamentals of Nursing Lab",
                desc: "Core nursing skills — vitals, injections, wound care — on advanced simulation models.",
                points: ["Patient care mannequins", "Vital signs monitors", "Injection practice models", "Wound care simulation"],
                href: "/facilities/fundamentals-lab",
                img: "/photos/foundation-of-nursing-lab/1.jpg",
              },
              {
                icon: Baby,
                color: "bg-green-50",
                iconColor: "text-green-700",
                accent: "border-green-200 group-hover:border-green-400",
                badge: "bg-green-100 text-green-700",
                title: "Child Health Nursing Lab",
                desc: "Pediatric care simulation from neonates to adolescents.",
                points: ["Pediatric mannequins (all ages)", "Growth monitoring equipment", "Immunization training kits", "Pediatric emergency gear"],
                href: "/facilities/child-health-lab",
                img: "/photos/child-health-lab/3.jpg",
              },
              {
                icon: Microscope,
                color: "bg-purple-50",
                iconColor: "text-purple-700",
                accent: "border-purple-200 group-hover:border-purple-400",
                badge: "bg-purple-100 text-purple-700",
                title: "Medical-Surgical Nursing Lab",
                desc: "Surgical procedure simulation and advanced patient care scenarios.",
                points: ["Surgical simulation models", "Advanced patient simulators", "Catheterization models", "Emergency response kit"],
                href: "/facilities/medical-surgical-lab",
                img: "/photos/medical-surgical-lab/1.jpg",
              },
              {
                icon: Users,
                color: "bg-pink-50",
                iconColor: "text-pink-700",
                accent: "border-pink-200 group-hover:border-pink-400",
                badge: "bg-pink-100 text-pink-700",
                title: "Maternity Nursing Lab",
                desc: "Obstetric and neonatal care training in a realistic maternal setting.",
                points: ["Delivery simulation models", "Antenatal care equipment", "Neonatal care simulators", "Breastfeeding training aids"],
                href: "/facilities/maternity-lab",
                img: "/photos/maternity-lab/1.jpg",
              },
              {
                icon: Building2,
                color: "bg-orange-50",
                iconColor: "text-orange-700",
                accent: "border-orange-200 group-hover:border-orange-400",
                badge: "bg-orange-100 text-orange-700",
                title: "Community Health Lab",
                desc: "Public health, epidemiology, and home-visit simulation training.",
                points: ["Epidemiology study aids", "Health education materials", "Disease prevention kits", "Home visit simulation"],
                href: "/facilities/community-health-lab",
                img: "/photos/community-health-lab/1.jpg",
              },
            ].map(({ icon: Icon, color, iconColor, accent, badge, title, desc, points, href, img }: any) => (
              <div
                key={title}
                className={`bg-white border ${accent} rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col`}
              >
                {img && (
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{desc}</p>
                <div className="space-y-1.5">
                  {points.map((p: string) => (
                    <div key={p} className="flex items-center gap-2">
                      <CheckCircle className={`h-3.5 w-3.5 ${iconColor} flex-shrink-0`} />
                      <span className="text-sm text-slate-600">{p}</span>
                    </div>
                  ))}
                </div>
                {href && (
                  <Link href={href} className={`mt-4 inline-flex items-center gap-2 ${iconColor} font-semibold text-sm hover:underline`}>
                    Explore {title} <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
                </div>
              </div>
            ))}
          </div>

          {/* Lab photo showcase – three sub-sections */}
          <div className="mt-16 space-y-14">

            {/* Foundation of Nursing Lab */}
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

            {/* Pre-Clinical Lab */}
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
                    <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/70 to-transparent px-4 py-3">
                      <span className="text-white text-sm font-semibold">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Lab */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-red-600" />
                <span className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">Nutrition Training</span>
              </div>
              <h3 className="font-playfair font-bold text-2xl text-slate-900 mb-5">Nutrition Laboratory</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { src: "/photos/nutrition-lab/1.jpg", label: "Nutrition Lab — Kitchen & Equipment Setup" },
                  { src: "/photos/nutrition-lab/2.jpg", label: "Nutrition Lab — Cooking Station & Charts" },
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

            {/* GNM Practical Training */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-blue-700" />
                <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">GNM Clinical Training</span>
              </div>
              <h3 className="font-playfair font-bold text-2xl text-slate-900 mb-5">GNM Practical Posting</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden shadow" style={{ aspectRatio: "1/1" }}>
                    <Image
                      src={`/photos/gnm-practical-posting/${i}.jpg`}
                      alt={`GNM Practical Training ${i}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Lab standards strip */}
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
        </div>
      </section>

      {/* --- CLASSROOMS & LEARNING SPACES --- */}
      <section className="py-20 bg-slate-50" id="classrooms">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Academic Spaces</span>
              <div className="w-8 h-0.5 bg-blue-700" />
            </div>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
              Classrooms &amp; Learning Spaces
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Well-ventilated, tech-equipped classrooms built for focused learning 
              — from large lecture sessions to small group tutorials.
            </p>
          </div>

          {/* Photo grid + features side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">

            {/* 3×3 classroom photo grid */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={`/photos/classrooms/${i}.jpg`}
                    alt={`Classroom ${i}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Feature cards stacked */}
            <div className="space-y-5">
              {/* Classroom infrastructure */}
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

              {/* Digital aids */}
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
        </div>
      </section>

      {/* --- LIBRARY --- */}
      <section className="py-20 bg-white" id="library">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Knowledge Resources</span>
              <div className="w-8 h-0.5 bg-blue-700" />
            </div>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
              Library
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A comprehensive collection of nursing and medical literature for academic excellence and research.
            </p>
          </div>

          {/* Library photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {[
              { src: "/photos/labrary/1.jpg", label: "Library — Reading & Study Area" },
              { src: "/photos/labrary/2.jpg", label: "Library — Book Collection" },
            ].map(({ src, label }) => (
              <div key={src} className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/70 to-transparent px-5 py-4">
                  <span className="text-white font-semibold text-sm">{label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feature card + link */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Library className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Library &amp; Study Areas</h3>
                  <p className="text-slate-500 text-sm">Nursing and allied health literature collection</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "Extensive nursing, medical, and paramedical literature",
                  "Digital library access and e-book portal",
                  "Quiet individual study carrels",
                  "Group discussion and seminar zones",
                  "National and international nursing journals",
                  "Reference materials and syllabus guides",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-700 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/facilities/library" className="mt-6 inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:underline">
                Explore Library <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPUTER LAB --- */}
      <section className="py-20 bg-slate-50" id="computer-lab">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Digital Learning</span>
              <div className="w-8 h-0.5 bg-blue-700" />
            </div>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
              Computer Laboratory
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Modern digital infrastructure providing students with internet access, e-learning platforms, and research tools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Computer Laboratory</h3>
                  <p className="text-slate-500 text-sm">Digital learning and research access</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "Modern computers with regularly updated software",
                  "Broadband internet for academic research",
                  "Digital learning platforms and simulations",
                  "Online exam preparation tools",
                  "Technical support and maintenance team",
                  "Printing and scanning facilities",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-blue-700 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/facilities/computer-lab" className="mt-6 inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:underline">
                Explore Computer Lab <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- NUTRITION LAB --- */}
      <section className="py-20 bg-white" id="nutrition-lab">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-red-600" />
              <span className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">Clinical Nutrition</span>
              <div className="w-8 h-0.5 bg-red-600" />
            </div>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
              Nutrition Laboratory
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A dedicated space for diet planning, food composition analysis, and therapeutic nutrition training.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Utensils className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Nutrition Laboratory</h3>
                  <p className="text-slate-500 text-sm">Diet planning and therapeutic nutrition training</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "Full kitchen setup with cooking equipment",
                  "Diet planning and calorie calculation tools",
                  "Food composition analysis resources",
                  "Educational charts for nutrition guidance",
                  "Utensils and serving ware for practicals",
                  "Faculty-guided cooking demonstrations",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/facilities/nutrition-lab" className="mt-6 inline-flex items-center gap-2 text-red-600 font-semibold text-sm hover:underline">
                Explore Nutrition Lab <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Nutrition lab photo */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={`/photos/nutrition-lab/${i}.jpg`}
                    alt={`Nutrition Lab ${i}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- HOSTEL & WELFARE --- */}
      <section className="py-20 bg-slate-50" id="hostel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Student Welfare</span>
              <div className="w-8 h-0.5 bg-blue-700" />
            </div>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
              Hostel &amp; Campus Amenities
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A safe, supportive residential environment so students can focus completely on their education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BedDouble,
                title: "Residential Hostel",
                sub: "Safe, well-maintained hostel accommodation for outstation students with 24/7 wardens.",
                color: "bg-blue-50",
                iconColor: "text-blue-700",
              },
              {
                icon: Utensils,
                title: "Canteen & Mess",
                sub: "Nutritious, hygienic meals served daily. Separate mess facility with balanced diet options.",
                color: "bg-green-50",
                iconColor: "text-green-700",
              },
              {
                icon: Shield,
                title: "Campus Security",
                sub: "24-hour security, CCTV surveillance, and restricted entry for student safety.",
                color: "bg-purple-50",
                iconColor: "text-purple-700",
              },
              {
                icon: HeartPulse,
                title: "Health & Wellness",
                sub: "On-campus first aid and access to affiliated hospital facilities for student health needs.",
                color: "bg-red-50",
                iconColor: "text-red-600",
              },
            ].map(({ icon: Icon, title, sub, color, iconColor }) => (
              <div key={title} className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all">
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INSTITUTE BUILDING --- */}
      <section className="py-20 bg-white" id="campus">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">Our Campus</span>
              <div className="w-8 h-0.5 bg-blue-700" />
            </div>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
              Institute Building
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Purpose-built for nursing education — a well-equipped campus designed
              to nurture the next generation of healthcare professionals.
            </p>
          </div>

          {/* Featured large photo */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl mb-4" style={{ aspectRatio: "21/9" }}>
            <Image
              src="/photos/institute-building-front-view/1.jpg"
              alt="Swami Vivekanand School of Nursing — Institute Building"
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <h3 className="font-playfair font-bold text-white text-2xl sm:text-3xl">Swami Vivekanand School of Nursing</h3>
              <p className="text-slate-200 text-sm mt-1">Hingoli, Maharashtra</p>
            </div>
          </div>

          {/* Remaining building photos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden shadow" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={`/photos/institute-building-front-view/${i}.jpg`}
                  alt={`Institute Building ${i}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <div className="w-8 h-0.5 bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">Come See For Yourself</span>
            <div className="w-8 h-0.5 bg-blue-400" />
          </div>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-5">
            Tour Our Campus
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            We welcome prospective students and parents to visit and experience our 
            facilities firsthand. Contact us to schedule a campus tour.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Schedule a Visit <ChevronRight className="h-5 w-5" />
            </a>
            <a
              href="/admissions"
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              Admission Details
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
