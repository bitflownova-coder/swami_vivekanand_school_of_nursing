"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  Building,
  Phone,
  Award,
  Heart,
  Stethoscope,
  GraduationCap,
  ArrowRight,
  MousePointerClick,
  ClipboardList,
  HeartPulse,
  FlaskConical,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export default function Home() {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) return;
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [api]);

  const carouselImages = [
    { src: "/image.png", pos: "object-center" },
    { src: "/photos/lamp-lighting-ceremony.jpg", pos: "object-top" },
    { src: "/photos/institute-building-front-view/1.jpg", pos: "object-center" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-152px)] w-full overflow-hidden bg-gray-900">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{ loop: true, align: "start" }}
        >
          <CarouselContent className="-ml-0">
            {carouselImages.map((img, idx) => (
              <CarouselItem key={idx} className="pl-0 relative w-full">
                <div className="relative w-full min-h-[calc(100vh-152px)] h-[calc(100vh-152px)]">
                  <Image
                    src={img.src}
                    alt={`Campus Life ${idx + 1}`}
                    fill
                    className={`object-cover opacity-70 ${img.pos}`}
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-gray-900/50"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden md:block">
            <CarouselPrevious className="left-10 z-30 border-white/20 bg-black/20 text-white hover:bg-blue-600 hover:border-blue-600 backdrop-blur-sm transition-all" />
            <CarouselNext className="right-10 z-30 border-white/20 bg-black/20 text-white hover:bg-blue-600 hover:border-blue-600 backdrop-blur-sm transition-all" />
          </div>
        </Carousel>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4 pointer-events-none">
          <div className="max-w-6xl mx-auto space-y-5 md:space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-1000 pointer-events-auto pb-8">

            {/* Main Heading */}
            <h1 className="font-playfair font-bold leading-[1.05] drop-shadow-2xl">
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-blue-200 mb-2">
                Welcome to
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-blue-300">
                Swami Vivekanand
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white">
                School of Nursing
              </span>
            </h1>

            {/* Sub text */}
            <div className="space-y-2">
              <p className="inline-block px-6 py-2 bg-amber-400 text-gray-900 text-base sm:text-lg md:text-xl font-bold tracking-wide rounded-full shadow-lg shadow-amber-900/40">
                Admissions Open 2026–27
              </p>
              <p className="block text-sm sm:text-base md:text-lg text-blue-100 font-semibold tracking-wide drop-shadow-md">
                GNM Nursing Programme
              </p>
              <p className="block text-sm sm:text-base text-gray-300/90 font-light tracking-wide drop-shadow-md">
                Compassion, Care, and Excellence in Nursing Education.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-1 md:pt-4">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 md:px-14 py-6 md:py-7 text-base md:text-lg font-semibold shadow-blue-900/60 shadow-xl transition-all hover:scale-105 rounded-full"
              >
                <Link href="/admissions/apply" className="flex items-center gap-2">
                  Apply Now <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white bg-white/5 hover:bg-white hover:text-blue-900 px-10 md:px-14 py-6 md:py-7 text-base md:text-lg font-semibold backdrop-blur-sm transition-all hover:scale-105 rounded-full"
              >
                <Link href="/facilities">Visit Campus</Link>
              </Button>
            </div>

          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/10 to-transparent pointer-events-none"></div>
      </section>

      {/* WELCOME SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 leading-tight">
                Shaping the Future of Healthcare<br />
                <span className="text-blue-700">in Maharashtra</span>
              </h2>

              <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed font-light">
                <p>
                  A premier institute for GNM nursing education in Maharashtra,
                  dedicated to shaping the future of healthcare. Our institution
                  combines modern facilities with experienced faculty to provide
                  students with the knowledge, skills, and values needed to
                  excel in the medical field.
                </p>
                <p>
                  We believe in nurturing not just skilled professionals, but
                  compassionate caregivers who make a real difference in
                  patients&apos; lives.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 h-12 text-base transition-all w-full sm:w-auto"
                >
                  <Link href="/about">Read Our Story</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 h-12 text-base w-full sm:w-auto justify-center"
                >
                  <Link
                    href="/vision-mission"
                    className="flex items-center gap-2"
                  >
                    Our Mission <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex-1 w-full relative group mt-8 lg:mt-0">
              <div className="absolute -inset-4 bg-blue-100 rounded-3xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="/photos/institute-building-front-view/2.jpg"
                  alt="Swami Vivekanand School of Nursing campus"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-playfair font-bold text-xl tracking-wide">
                    Swami Vivekanand School of Nursing
                  </p>
                  <p className="text-sm opacity-80 mt-0.5 tracking-widest uppercase">Aurangabad, Maharashtra</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS CARDS */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-blue-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">Discover Our Institute</span>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-5">
              Everything You Need to<br />
              <span className="text-blue-400">Excel in Nursing</span>
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "GNM Academic Programme",
                icon: BookOpen,
                badge: "3-Year Course",
                desc: "Maharashtra State Board–approved GNM curriculum blending theory, clinical skills, and professional ethics for modern healthcare.",
                link: "/academic",
                accent: "from-blue-500 to-blue-700",
                badgeColor: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
              },
              {
                title: "Admissions 2026–27",
                icon: ClipboardList,
                badge: "Now Open",
                desc: "Simple, transparent admission process. Check eligibility criteria, fee structure, required documents, and apply online today.",
                link: "/admissions",
                accent: "from-emerald-500 to-teal-700",
                badgeColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
              },
              {
                title: "Campus & Facilities",
                icon: FlaskConical,
                badge: "Modern Infrastructure",
                desc: "Fully equipped nursing labs, smart classrooms, digital library, hostel, and hospital tie-ups for real-world clinical training.",
                link: "/facilities",
                accent: "from-violet-500 to-purple-700",
                badgeColor: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
              },
            ].map((item, idx) => (
              <Link key={idx} href={item.link} className="group block">
                <div className="relative rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {/* Top gradient accent */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${item.accent}`} />

                  <div className="p-8 flex flex-col flex-grow">
                    {/* Badge */}
                    <span className={`self-start text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 ${item.badgeColor}`}>
                      {item.badge}
                    </span>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed flex-grow">{item.desc}</p>

                    {/* CTA */}
                    <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                      Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 text-xs font-bold uppercase tracking-[0.25em] mb-3">Our Strengths</span>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-5">
              Why Choose <span className="text-blue-700">SVS Nursing?</span>
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: "15+", label: "Years of Excellence" },
              { value: "500+", label: "Alumni Nurses" },
              { value: "10+", label: "Hospital Tie-ups" },
              { value: "100%", label: "Placement Support" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="text-3xl md:text-4xl font-playfair font-bold text-blue-700 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Stethoscope,
                title: "Clinical Training",
                desc: "Structured hands-on training in top affiliated hospitals with real patient care exposure from Year 1.",
                accent: "bg-blue-600",
                light: "bg-blue-50",
                text: "text-blue-600",
              },
              {
                icon: GraduationCap,
                title: "Expert Faculty",
                desc: "Experienced nursing educators and medical professionals committed to mentoring every student.",
                accent: "bg-emerald-600",
                light: "bg-emerald-50",
                text: "text-emerald-600",
              },
              {
                icon: Heart,
                title: "Holistic Growth",
                desc: "We nurture professional ethics, compassion, and strong moral values alongside clinical expertise.",
                accent: "bg-rose-500",
                light: "bg-rose-50",
                text: "text-rose-500",
              },
              {
                icon: Award,
                title: "Career Support",
                desc: "Dedicated placement cell with career counselling, resume building, and hospital recruitment drives.",
                accent: "bg-violet-600",
                light: "bg-violet-50",
                text: "text-violet-600",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-7 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 bg-white relative overflow-hidden"
              >
                {/* Hover fill */}
                <div className={`absolute inset-0 ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

                <div className="relative z-10">
                  <div className={`w-14 h-14 ${item.light} group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300`}>
                    <item.icon className={`h-7 w-7 ${item.text} group-hover:text-white transition-colors duration-300`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-white/80 text-sm leading-relaxed transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 md:py-24 bg-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-6 tracking-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 mb-10 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Join a community of dedicated professionals. Applications are now
            open for the 2026–27 academic session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-10 py-7 text-lg shadow-xl transition-transform hover:scale-105"
            >
              <Link href="/admissions/apply">Apply for Admission</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-blue-400 text-blue-600 hover:bg-blue-800 hover:text-white px-10 py-7 text-lg font-bold"
            >
              <Link
                target="_blank"
                href="https://drive.google.com/file/d/1MxykBvnYmWZQ3cqvCMbHLo9IFS6NxMjC/view"
              >
                Download Brochure
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
