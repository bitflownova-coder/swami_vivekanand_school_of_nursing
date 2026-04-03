import Image from "next/image";
import Link from "next/link";
import { EVENTS } from "@/lib/gallery-data";
import { CalendarDays, Camera, ChevronRight, Images } from "lucide-react";

export const metadata = {
  title: "Events Gallery | Swami Vivekanand School of Nursing",
  description:
    "Browse event photo albums from Swami Vivekanand School of Nursing — Lamp Lighting, Independence Day, CNE Workshops, Yoga Day, and more.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* â”€â”€ Hero â”€â”€ */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">
              Events Gallery
            </span>
          </div>
          <h1 className="font-playfair font-bold text-4xl md:text-6xl mb-6 leading-tight max-w-3xl">
            Our Events &amp; Celebrations
          </h1>
          <p className="text-xl max-w-2xl opacity-80 leading-relaxed text-slate-300 mb-10">
            A pictorial journey through the events, celebrations, clinical postings, and milestones 
            that make Swami Vivekanand School of Nursing a vibrant learning community.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: `${EVENTS.length}`, label: "Event Albums" },
              { value: `${EVENTS.reduce((sum, e) => sum + e.photoCount, 0)}+`, label: "Photos" },
              { value: "2024–25", label: "Academic Year" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-white">{value}</div>
                <div className="text-blue-300 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Events grid â”€â”€ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-700" />
              <span className="text-blue-700 text-xs font-bold uppercase tracking-[0.2em]">
                Photo Albums
              </span>
              <div className="w-8 h-0.5 bg-blue-700" />
            </div>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
              Browse by Event
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Click any album to view all photos from that event.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {EVENTS.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col"
              >
                {/* Cover image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <Image
                    src={event.coverImage}
                    alt={event.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                  {/* Photo count badge */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Images className="h-3 w-3" />
                    {event.photoCount}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {event.date}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-blue-700 text-sm font-semibold">
                    View Album
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ CTA: Campus Gallery â”€â”€ */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Camera className="h-10 w-10 text-blue-700 mx-auto mb-4" />
          <h2 className="font-playfair font-bold text-3xl text-slate-900 mb-4">
            Also Explore Our Campus Gallery
          </h2>
          <p className="text-slate-500 text-lg mb-8">
            See our classrooms, labs, library, and institute building in the Campus Gallery.
          </p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-blue-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors"
          >
            View Campus Gallery
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
