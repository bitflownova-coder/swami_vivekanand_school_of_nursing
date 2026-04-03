import Image from "next/image";
import Link from "next/link";
import { BedDouble, Utensils, Shield, HeartPulse, ChevronRight } from "lucide-react";

export default function HostelPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative bg-slate-900 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/photos/institute-building-front-view/3.jpg" alt="Hostel & Amenities" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            â† Back to Facilities
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.25em]">Student Welfare</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl text-white mb-4">Hostel &amp;<br />Campus Amenities</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            A safe, supportive residential environment so students can focus completely on their education.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40 mt-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/facilities" className="hover:text-white transition-colors">Facilities</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">Hostel &amp; Amenities</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {[
            {
              icon: BedDouble, title: "Residential Hostel", color: "bg-blue-50", iconColor: "text-blue-700",
              sub: "Safe, well-maintained hostel accommodation for outstation students with 24/7 wardens.",
              points: ["Furnished rooms", "24/7 warden supervision", "Secure entry system", "Common study areas"],
            },
            {
              icon: Utensils, title: "Canteen & Mess", color: "bg-green-50", iconColor: "text-green-700",
              sub: "Nutritious, hygienic meals served daily with balanced diet options.",
              points: ["Balanced daily meals", "Hygienic preparation", "Separate dining hall", "Affordable pricing"],
            },
            {
              icon: Shield, title: "Campus Security", color: "bg-purple-50", iconColor: "text-purple-700",
              sub: "24-hour security, CCTV surveillance, and restricted entry for student safety.",
              points: ["CCTV coverage", "24/7 security team", "Restricted entry", "Emergency protocols"],
            },
            {
              icon: HeartPulse, title: "Health & Wellness", color: "bg-red-50", iconColor: "text-red-600",
              sub: "On-campus first aid and access to affiliated hospital facilities for student health needs.",
              points: ["On-campus first aid", "Hospital affiliation", "Student health records", "Counselling support"],
            },
          ].map(({ icon: Icon, title, sub, color, iconColor, points }) => (
            <div key={title} className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all flex flex-col">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{sub}</p>
              <ul className="space-y-1.5">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className={`w-1.5 h-1.5 rounded-full ${color.replace("bg-", "bg-").replace("-50", "-500")} flex-shrink-0`} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl text-sm text-blue-800">
          <strong>Note:</strong> Hostel accommodation is subject to availability. Please contact the administrative office for current availability and fee details.
        </div>
      </section>
    </div>
  );
}
