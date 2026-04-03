import Link from "next/link";
import { BookOpen, ArrowLeft, ChevronRight, Clock } from "lucide-react";

export default function SyllabusPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-950 pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/downloads" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 rounded-2xl bg-blue-500/20">
              <BookOpen className="h-8 w-8 text-blue-300" />
            </div>
            <div>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">GNM Programme</p>
              <h1 className="font-playfair font-bold text-3xl sm:text-4xl text-white">Course Syllabi</h1>
            </div>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
            Detailed year-wise curriculum documents covering all subjects, clinical hours and examination patterns for the GNM programme.
          </p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/downloads" className="hover:text-blue-600 transition-colors">Resources</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-600 font-medium">Course Syllabi</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
          <Clock className="h-10 w-10 text-blue-400" />
        </div>
        <h2 className="font-playfair font-bold text-3xl text-slate-800 mb-3">Coming Soon</h2>
        <p className="text-slate-500 text-base max-w-md">
          Syllabus documents are being prepared and will be available here shortly. Please check back later or contact the academic office for more information.
        </p>
      </div>
    </div>
  );
}
