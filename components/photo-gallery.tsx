"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export interface GalleryPhoto {
  src: string;
  alt: string;
}

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  columns?: 2 | 3 | 4;
  aspect?: "4/3" | "16/9" | "1/1";
}

export function PhotoGallery({ photos, columns = 2, aspect = "4/3" }: PhotoGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const prev = useCallback(() => setIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), [photos.length]);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const colClass =
    columns === 4 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" :
    columns === 3 ? "grid-cols-2 sm:grid-cols-3" :
    "grid-cols-1 sm:grid-cols-2";

  const openPhoto = (i: number) => { setIndex(i); setOpen(true); };

  const lightbox = (
    <div
      role="dialog"
      aria-modal="true"
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={close}
    >
      {/* Close */}
      <button
        onClick={close}
        style={{ position: "absolute", top: 16, right: 16, zIndex: 10000, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 12, padding: "4px 12px", borderRadius: 20 }}>
        {index + 1} / {photos.length}
      </div>

      {/* Prev */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          style={{ position: "absolute", left: 16, zIndex: 10000, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
          aria-label="Previous photo"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "90vw", maxHeight: "88vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[index].src}
          alt={photos[index].alt}
          style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 8, display: "block" }}
        />
      </div>

      {/* Next */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          style={{ position: "absolute", right: 16, zIndex: 10000, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
          aria-label="Next photo"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Caption */}
      {photos[index].alt && (
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 13, padding: "6px 16px", borderRadius: 20, maxWidth: "80vw", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {photos[index].alt}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Grid */}
      <div className={`grid ${colClass} gap-3`}>
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openPhoto(i)}
            className="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            style={{ aspectRatio: aspect, display: "block", padding: 0, border: "none", cursor: "pointer" }}
            aria-label={`View photo: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
              <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 drop-shadow transition-opacity duration-300" />
            </div>
          </button>
        ))}
      </div>

      {/* Portal Lightbox — renders directly on document.body, escapes all z-index/overflow constraints */}
      {mounted && open && createPortal(lightbox, document.body)}
    </>
  );
}
