﻿import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PhotoGallery } from "@/components/photo-gallery";

export default function CampusPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative bg-slate-900 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/photos/institute-building-front-view/1.jpg" alt="Institute Building" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-slate-900/75" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            &larr; Back to Facilities
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.25em]">Our Campus</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl text-white mb-4">Institute<br />Building</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Purpose-built for nursing education — a well-equipped campus designed to nurture the next generation of healthcare professionals.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40 mt-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/facilities" className="hover:text-white transition-colors">Facilities</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">Campus Building</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured panoramic */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl mb-6" style={{ aspectRatio: "21/9" }}>
          <Image src="/photos/institute-building-front-view/1.jpg" alt="Swami Vivekanand School of Nursing — Institute Building" fill className="object-cover" sizes="100vw" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <h3 className="font-playfair font-bold text-white text-2xl sm:text-3xl">Swami Vivekanand School of Nursing</h3>
            <p className="text-slate-200 text-sm mt-1">Hingoli, Maharashtra</p>
          </div>
        </div>

        {/* Gallery grid */}
        <PhotoGallery
          columns={4}
          aspect="4/3"
          photos={[2,3,4,5,6,7,8].map((i) => ({
            src: `/photos/institute-building-front-view/${i}.jpg`,
            alt: `Institute Building ${i}`,
          }))}
        />

        <div className="mt-10 p-6 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-slate-700">
          <strong>Location:</strong> Swami Vivekanand School of Nursing, Hingoli, Maharashtra — strategically located with easy access to the affiliated 60-bed practice hospital.
        </div>
      </section>
    </div>
  );
}
