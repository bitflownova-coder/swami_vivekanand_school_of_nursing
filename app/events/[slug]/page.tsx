import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EVENTS } from "@/lib/gallery-data";
import { CalendarDays, ChevronLeft, Images } from "lucide-react";

export const dynamicParams = true;

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: `${event.name} | Swami Vivekanand School of Nursing`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-950 text-white pt-10 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm font-semibold mb-8 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            All Events
          </Link>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <CalendarDays className="h-4 w-4" />
            {event.date}
          </div>
          <h1 className="font-playfair font-bold text-4xl md:text-5xl mb-5 leading-tight max-w-3xl">
            {event.name}
          </h1>
          <p className="text-lg max-w-2xl opacity-80 leading-relaxed text-slate-300 mb-6">
            {event.description}
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
            <Images className="h-4 w-4" />
            {event.photoCount} Photos
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {event.photos.map((photo, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to All Events
          </Link>
          <p className="text-slate-400 text-sm">Swami Vivekanand School of Nursing</p>
        </div>
      </section>
    </div>
  );
}

