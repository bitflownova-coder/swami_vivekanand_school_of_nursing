import Image from "next/image";
import Link from "next/link";
import { Library, CheckCircle, ChevronRight } from "lucide-react";
import { PhotoGallery } from "@/components/photo-gallery";

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative bg-slate-900 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/photos/labrary/1.jpg" alt="Library" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            &larr; Back to Facilities
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.25em]">Knowledge Resources</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl sm:text-5xl text-white mb-4">Library &amp;<br />Study Areas</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            A comprehensive collection of nursing and medical literature for academic excellence and research.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40 mt-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/facilities" className="hover:text-white transition-colors">Facilities</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">Library</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Photos */}
        <div className="mb-14">
          <PhotoGallery
            columns={2}
            aspect="16/9"
            photos={[
              { src: "/photos/labrary/1.jpg", alt: "Library — Reading & Study Area" },
              { src: "/photos/labrary/2.jpg", alt: "Library — Book Collection" },
            ]}
          />
        </div>

        {/* Feature card */}
        <div className="max-w-2xl">
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
          </div>
        </div>

        {/* Link to Computer Lab */}
        <div className="mt-12 border-t border-slate-100 pt-10">
          <p className="text-slate-500 text-sm mb-3">Also explore</p>
          <Link href="/facilities/computer-lab" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline">
            View Computer Laboratory &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}