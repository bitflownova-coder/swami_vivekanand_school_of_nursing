"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Building2, Monitor, Users, Layers, ChevronRight, Wifi, Lightbulb, Wind, Volume2, X, ChevronLeft, ChevronRight as ChevronRightIcon, ZoomIn } from "lucide-react";

const galleryPhotos = [2, 3, 4, 5, 6, 7, 8, 9, 1];

function Lightbox({ index, onClose, onPrev, onNext }: { index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
        <X className="h-5 w-5" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
        <ChevronRightIcon className="h-6 w-6" />
      </button>
      <div className="relative w-full max-w-5xl mx-8 aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={`/photos/classrooms/${galleryPhotos[index]}.jpg`}
          alt={`Classroom ${galleryPhotos[index]}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
        {index + 1} / {galleryPhotos.length}
      </div>
    </div>
  );
}

export default function ClassroomsPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = useCallback(() => setLightboxIndex((i) => i === null ? null : (i - 1 + galleryPhotos.length) % galleryPhotos.length), []);
  const nextPhoto = useCallback(() => setLightboxIndex((i) => i === null ? null : (i + 1) % galleryPhotos.length), []);
  return (
    <div className="min-h-screen bg-white">
      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} onClose={closeLightbox} onPrev={prevPhoto} onNext={nextPhoto} />
      )}

      {/* HERO */}
      <section className="relative bg-slate-900 pt-10 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/photos/classrooms/1.jpg" alt="Classrooms" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/95" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            &larr; Back to Facilities
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.25em]">Academic Spaces</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-tight">
            Modern Classrooms<br />&amp; Learning Spaces
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-10 leading-relaxed">
            Well-ventilated, technology-equipped classrooms designed for focused learning — from large lecture sessions to intimate group tutorials.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { num: "10+", label: "Classrooms" },
              { num: "500+", label: "Student Capacity" },
              { num: "Smart", label: "Boards & Projectors" },
              { num: "Wi-Fi", label: "Enabled Campus" },
            ].map(({ num, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
                <span className="text-blue-400 font-bold text-base">{num}</span>
                <span className="text-white/70 text-sm">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-white/40 mt-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/facilities" className="hover:text-white transition-colors">Facilities</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">Classrooms</span>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-px bg-blue-600" />
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em]">Gallery</span>
              <div className="w-8 h-px bg-blue-600" />
            </div>
            <h2 className="font-playfair font-bold text-3xl text-slate-900">Our Classroom Spaces</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto">A look inside our spacious, well-lit classrooms designed to inspire learning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            {[2, 3].map((i, idx) => (
              <button key={i} onClick={() => openLightbox(idx)} className="relative aspect-[16/9] rounded-2xl overflow-hidden group shadow-md cursor-zoom-in text-left">
                <Image
                  src={`/photos/classrooms/${i}.jpg`}
                  alt={`Classroom ${i}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="h-4 w-4 text-white" />
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[4, 5, 6, 7, 8, 9, 1].map((i, idx) => (
              <button key={i} onClick={() => openLightbox(idx + 2)} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm cursor-zoom-in">
                <Image
                  src={`/photos/classrooms/${i}.jpg`}
                  alt={`Classroom ${i}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 14vw"
                />
                <div className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="h-4 w-4 text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-blue-600" />
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em]">Infrastructure</span>
            <div className="w-8 h-px bg-blue-600" />
          </div>
          <h2 className="font-playfair font-bold text-3xl text-slate-900">What Makes Our Classrooms Special</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-white">Physical Infrastructure</span>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Building2, title: "Spacious & Well-Ventilated", sub: "Large classrooms ensuring a comfortable learning environment" },
                { icon: Lightbulb, title: "Natural Lighting", sub: "Optimal daylight supplemented with energy-efficient LED systems" },
                { icon: Users, title: "Ergonomic Furniture", sub: "Comfortable seating designed for extended academic sessions" },
                { icon: Wind, title: "Climate Control", sub: "Proper ventilation and temperature management year-round" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{title}</div>
                    <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-6 py-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Monitor className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-white">Digital Aids &amp; Technology</span>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Monitor, title: "Smart Boards", sub: "Interactive whiteboards for multimedia and collaborative sessions" },
                { icon: Monitor, title: "HD Projectors", sub: "High-definition projectors for clear video presentations" },
                { icon: Wifi, title: "Wi-Fi Connectivity", sub: "High-speed internet access for digital learning and research" },
                { icon: Volume2, title: "Audio Systems", sub: "Clear PA systems for effective lecturing in all hall sizes" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{title}</div>
                    <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: Layers, title: "Lecture Halls", sub: "Large-capacity halls for theoretical sessions and guest lectures", iconBg: "bg-green-100", iconColor: "text-green-700", border: "hover:border-green-200" },
            { icon: Users, title: "Tutorial Rooms", sub: "Small group discussion rooms for interactive case-based learning", iconBg: "bg-blue-100", iconColor: "text-blue-700", border: "hover:border-blue-200" },
            { icon: Monitor, title: "Digital Classrooms", sub: "Technology-integrated rooms with smart boards and e-learning access", iconBg: "bg-purple-100", iconColor: "text-purple-700", border: "hover:border-purple-200" },
          ].map(({ icon: Icon, title, sub, iconBg, iconColor, border }) => (
            <div key={title} className={`bg-white border border-slate-100 ${border} rounded-2xl p-7 text-center hover:shadow-md transition-all group`}>
              <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-8 w-8 ${iconColor}`} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-base">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NAVIGATION */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-100 pt-10 flex items-center justify-between">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-700 text-sm font-medium transition-colors group">
            <span className="group-hover:-translate-x-1 transition-transform duration-200">&larr;</span>
            Back to All Facilities
          </Link>
          <Link href="/facilities/laboratories" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-700 text-sm font-medium transition-colors group">
            View Laboratories
            <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
